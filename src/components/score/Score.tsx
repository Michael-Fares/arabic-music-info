import { useEffect, useRef } from "react";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay, formatNotesForVexflowScore } from "../../utils";
import VexFlow from "vexflow";

interface ScoreProps {
	scale: {
		name: string;
		rootNotes: Record<string, { notes: string[] }>;
	};
	rootNote: string;
}

function Score({ scale, rootNote }: ScoreProps) {
	const notesInScale = scale.rootNotes[rootNote].notes;
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
	const vexFlowContainerRef = useRef<HTMLDivElement>(null);
	const vfnotes = formatNotesForVexflowScore(notesToPlay);
	useEffect(() => {
		if (vexFlowContainerRef.current !== null) {
			const container = vexFlowContainerRef.current;
			VexFlow.loadFonts("Bravura", "Academico").then(() => {
				VexFlow.setFonts("Bravura", "Academico");
				const factory = new VexFlow.Factory({
					renderer: { elementId: container.id, width: 500, height: 200 },
				});
				const system = factory.System({ width: 400 });
				// Create the notes for the score
				const notes = vfnotes.map((note) => {
					const { vfnote, accidental } = note;
					if (accidental) {
						return factory
							.StaveNote({
								keys: [vfnote],
								duration: "q",
							})
							.addModifier(factory.Accidental({ type: accidental }));
					} else {
						return factory.StaveNote({
							keys: [vfnote],
							duration: "q",
						});
					}
				});

				// IMPORTANT need to pass {time:'8/4'} just to get 8 notes to render
				const voice = factory.Voice({ time: "8/4" });
				voice.addTickables(notes);
				system
					.addStave({
						voices: [voice],
					})
					.addClef("treble")
					.addTimeSignature("4/4");
				factory.draw();

				for (let note of notes) {
					const svg = note.getSVGElement();
					console.log(
						"note.getSVGElement() > can do what you want with this, e.g add classes",
						svg
					);
					// Add a class to the SVG element for styling
					svg?.classList.add("added-class-test");
					if (svg) {
						// listen to whatever event you want here
						svg.addEventListener(
							"click",
							() => {
								toggleDescendantColors(svg);
							},
							false
						);
					}
				}

				// parentItem: SVGElement
				const toggleDescendantColors = (parentItem) => {
					const isSelected = parentItem.classList.contains("selected");
					// Choose the color based on whether it’s selected or not.
					const newColor = isSelected ? "black" : "red";

					// Toggle the colors on all child elements.
					parentItem.querySelectorAll("*").forEach((child) => {
						child.setAttribute("fill", newColor);
						child.setAttribute("stroke", newColor);
					});

					// Update the selection state on the parent element.
					if (isSelected) {
						parentItem.classList.remove("selected");
					} else {
						parentItem.classList.add("selected");
					}
				};
			});
		}
		// Cleanup function to remove the SVG elements when the component unmounts
		return () => {
			if (vexFlowContainerRef.current) {
				vexFlowContainerRef.current.innerHTML = "";
			}
		};
	}, [scale, rootNote]);

	return <div id={`${scale.name}-${rootNote}`} ref={vexFlowContainerRef} />;
}
export default Score;
