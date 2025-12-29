import { useEffect, useRef } from "react";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay, formatNotesForVexflowScore } from "../../utils";
import VexFlow from "vexflow";
import "./score.css";

interface ScoreProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: {
		rootNotes: Record<string, { notes: string[] }>;
		name: string;
	};
	notes: string[];
	direction?: "asc" | "desc";
	rootNote: string;
	instrument: string;
}

function Score({ audioManager, notes, scale, rootNote, instrument, direction }: ScoreProps) {
	
	let rendered = false;
	const notesInScale = notes;
	
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
	const vexFlowContainerRef = useRef<HTMLDivElement>(null);
	const vfnotes = direction === "desc" ? formatNotesForVexflowScore(notesToPlay).reverse() : formatNotesForVexflowScore(notesToPlay);
	interface NoteSVGElement extends SVGElement {
		getAttribute(name: string): string | null;
		classList: DOMTokenList;
	}

	interface HandleNoteClick {
		(svg: NoteSVGElement): void;
	}

	const handleNoteClick: HandleNoteClick = (svg) => {
		const noteValue = Number(svg.getAttribute("data-note-value"));
		audioManager.playSample(noteValue, audioManager.samples[instrument]);
	};
	useEffect(() => {
		if (vexFlowContainerRef.current !== null && !rendered) {
			const container = vexFlowContainerRef.current;
			VexFlow.loadFonts("Bravura", "Academico").then(() => {
				VexFlow.setFonts("Bravura", "Academico");
				const factory = new VexFlow.Factory({
					renderer: { elementId: container.id, width: 330, height: 110 },
				});
				const system = factory.System({ width: 310 });
				
				
				// Create the notes for the score
				const notes = vfnotes.map((note) => {
					const { vfnote, accidental } = note;
					if (accidental && accidental !== "flat-half-flat") {
						return factory
							.StaveNote({
								keys: [vfnote],
								duration: "q",
							
							})
							.addModifier(factory.Accidental({ type: accidental }));
					}
					/** hack: use 2 accidentals for a flat note made half flat
					 * e.g flat accidental "b" followed by half flat accidental "bs"
					 * because I don't like VexFlow 5's flat half flat symbol "db" / it's unclear
					 */
					if (accidental && accidental === "flat-half-flat") {
						const FLAT = "b";
						const HALF_FLAT = "bs";
						return factory
							.StaveNote({
								keys: [vfnote],
								duration: "q",
							
							})
							.addModifier(factory.Accidental({ type: FLAT }))
							.addModifier(factory.Accidental({ type: HALF_FLAT }));
					}
					return factory.StaveNote({
						keys: [vfnote],
						duration: "q",
					
					});
				});

				// IMPORTANT need to pass {time:'8/4'} just to get 8 notes to render
				const voice = factory.Voice({ time: "8/4"});
				voice.addTickables(notes);
				system
					.addStave({
						voices: [voice],
					})
					.addClef("treble")
					.addTimeSignature("4/4");
				factory.draw();

				// slightly offset flat half flat notes
				const flatHalfFlatNotes = container.querySelectorAll(
					".vf-notehead text:first-child:nth-last-child(3) ~ text:nth-child(3)"
				);
				flatHalfFlatNotes.forEach((note) => {
					note.setAttribute("dx", "1%");
				});
				notes.forEach((note, index) => {
					const svg = note.getSVGElement();
		
					// Add a class to the SVG element for styling
					svg?.setAttribute("data-note-name", `${vfnotes[index].dataNoteName}`);
					svg?.setAttribute("data-note-value", `${vfnotes[index].dataNoteValue}`);
					svg?.setAttribute("data-octave", `${vfnotes[index].dataOctave}`);
					svg?.classList.add("vf-note");

					if (svg) {
						// listen to whatever event you want here
						svg.addEventListener("click", () => handleNoteClick(svg), false);
					}
				});

				
			});
			rendered = true; // Set rendered to true to prevent re-rendering
		}
		// Cleanup function to remove the SVG elements when the component unmounts
		return () => {
			if (vexFlowContainerRef.current) {
				vexFlowContainerRef.current
					.querySelectorAll(".vf-note")
					.forEach((note) => {
						note.removeEventListener("click", () =>
							handleNoteClick(note as NoteSVGElement)
						);
					});
				vexFlowContainerRef.current.innerHTML = "";
			}
		};
	}, [scale, rootNote]);

	return (
		<div
			className="score"
			data-direction={direction}
			id={`${scale.name}-${rootNote}-${direction}`}
			ref={vexFlowContainerRef}
		/>
	);
}
export default Score;
