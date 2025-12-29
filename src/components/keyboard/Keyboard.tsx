import "./keyboard.css";
import classNames from "classnames";

import { NOTE_VALUES } from "../../constants";
import { isHalfFlat, getNotesToPlay } from "../../utils";

interface KeyboardProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: {
		descendingScaleVariantDegree: number | undefined;
		rootNotes: Record<string, { notes: string[]; descendingNotes?: string[] }>;
	};
	rootNote: string;
	instrument: string;
}

function Keyboard({ audioManager, scale, rootNote, instrument }: KeyboardProps) {
	// all notes in the scale anywhere on the keyboard
	const notesInScale = scale.rootNotes[rootNote].notes;
	const descendingNotesInScale =
		scale.rootNotes[rootNote].descendingNotes || [];
	
	
	// the 8 notes of the scale, in order, starting from the root note on the keyboard
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);



	

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// one possible mechanism is to handle the quarter tone based on class
		const noteValue = Number(
			(event.target as HTMLButtonElement).getAttribute("data-note-value")
		);
		audioManager.playSample(noteValue, audioManager.samples[instrument]);
	};
	return (
		<div className="keyboard-widget">
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
								quarter: notesInScale.includes(
									name.split("_")[0] + "-hf"
								),
								"in-current-run": notesToPlay.some(
									(note) =>
										(note.name === name || note.name === name + "-hf") &&
										note.octave === octave
								),
								"descending-variant": descendingNotesInScale.includes(name) && !notesInScale.includes(name),
							})}
							onClick={(event) => handleClick(event)}
						></button>
					);
				})}
			</div>
		</div>
	);
}
export default Keyboard;
