import "./keyboard.css";
import classNames from "classnames";

import { NOTE_VALUES } from "../../constants";
import { isHalfFlat } from "../../utils";

function Keyboard({ audioManager, scale, root, instrument }) {
	const notesInScale = scale.keys[root].notes;
	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// one possible mechanism is to handle the quarter tone based on class
		const noteValue = Number(
			(event.target as HTMLButtonElement).getAttribute("data-note-value")
		);
		audioManager
			.loadSample(instrument)
			.then((sample: AudioBuffer) =>
				audioManager.playSample(noteValue, sample)
			);
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
									scale.keys[root].notes.includes(name) ||
									scale.keys[root].notes.includes(name + "-hf"),
								quarter: scale.keys[root].notes.includes(
									name.split("_")[0] + "-hf"
								),
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
