import "./keyboard.css";
import classNames from "classnames";

import { NOTE_VALUES } from "../../constants";
import { isHalfFlat, getNotesToPlay } from "../../utils";

interface KeyboardProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: Scale;
	rootNote: string;
	instrument: string;
	parentScalePanelRef: React.RefObject<HTMLDivElement> | null;
}

function Keyboard({
	audioManager,
	scale,
	rootNote,
	instrument,
	parentScalePanelRef,
}: KeyboardProps) {
	// all notes in the scale anywhere on the keyboard
	const notesInScale = scale.rootNotes[rootNote]?.notes || [];
	const descendingNotesInScale =
		scale.rootNotes[rootNote]?.descendingNotes || [];

	// the 8 notes of the scale, in order, starting from the root note on the keyboard
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);

	const handleKeyClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const noteValue = Number(
			(event.target as HTMLButtonElement).getAttribute("data-note-value")
		);
		audioManager.playSample(noteValue, audioManager.samples[instrument]);
	};
	const handleKeyMouseDown = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const parentScalePanel = parentScalePanelRef?.current;
		const keyPressed = event.target as HTMLButtonElement;
		const vexflowScoreNoteToHighlight = parentScalePanel?.querySelector(
			`svg .vf-note[data-note-name="${keyPressed.getAttribute(
				"data-note-name"
			)}"][data-octave="${keyPressed.getAttribute("data-octave")}"]`
		);
		const notePillToHighlight = parentScalePanel?.querySelector(
			`.note-pill[data-note-name="${keyPressed.getAttribute(
				"data-note-name"
			)}"][data-octave="${keyPressed.getAttribute("data-octave")}"]`
		);
		vexflowScoreNoteToHighlight?.classList.add("highlight");
		notePillToHighlight?.classList.add("highlight");
	};
	const handleKeyMouseUp = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		const parentScalePanel = parentScalePanelRef?.current;
		const keyPressed = event.target as HTMLButtonElement;
		const vexflowScoreNoteToHighlight = parentScalePanel?.querySelector(
			`svg .vf-note[data-note-name="${keyPressed.getAttribute(
				"data-note-name"
			)}"][data-octave="${keyPressed.getAttribute("data-octave")}"]`
		);
		const notePillToHighlight = parentScalePanel?.querySelector(
			`.note-pill[data-note-name="${keyPressed.getAttribute(
				"data-note-name"
			)}"][data-octave="${keyPressed.getAttribute("data-octave")}"]`
		);
		notePillToHighlight?.classList.remove("highlight");
		vexflowScoreNoteToHighlight?.classList.remove("highlight");
	};
	return (
		<div className="keyboard-container">
			<div className="keyboard">
				{NOTE_VALUES.map((note) => {
					const { name, value, octave } = note;

					return (
						<button
							data-note-name={
								isHalfFlat(notesInScale, note) ? name + "-hf" : name
							}
							data-note-value={
								isHalfFlat(notesInScale, note) ? value - 0.5 : value
							}
							data-octave={octave}
							key={value}
							className={classNames({
								key: true,
								blackKey: name.includes("b"),
								whiteKey: !name.includes("b"),
								"no-offset": name.includes("C") || name.includes("F"),
								"in-current-scale":
									notesInScale.includes(name) ||
									notesInScale.includes(name + "-hf"),
								quarter: notesInScale.includes(name.split("_")[0] + "-hf"),
								"in-current-run": notesToPlay.some(
									(note) =>
										(note.name === name || note.name === name + "-hf") &&
										note.octave === octave
								),
								"descending-variant":
									descendingNotesInScale.includes(name) &&
									!notesInScale.includes(name),
							})}
							onClick={(event) => handleKeyClick(event)}
							onMouseDown={(event) => handleKeyMouseDown(event)}
							onMouseUp={(event) => handleKeyMouseUp(event)}
						></button>
					);
				})}
			</div>
		</div>
	);
}
export default Keyboard;
