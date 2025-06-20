import "./keyboard.css";
import classNames from "classnames";

import { NOTE_VALUES } from "../../constants";


function Keyboard({ audioManager, scale, root, instrument }) {
	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// one possible mechanism is to handle the quarter tone based on class
		const noteValue = Number(
			(event.target as HTMLButtonElement).getAttribute("data-note-value")
		);
		const shouldPlayQuarterTone: boolean = (
			event.target as HTMLButtonElement
		).classList.contains("quarter");
		audioManager.loadSample(instrument).then((sample: AudioBuffer) =>
			shouldPlayQuarterTone
				? audioManager.playSample(noteValue - 0.5, sample)
				: audioManager.playSample(noteValue, sample)
		);
	};
	return (
		<div className="keyboard-widget">

			<div className="keyboard">
				{NOTE_VALUES.map((note) => {
					const { name, value } = note;

					return (
						<button
							data-note-name={name}
							data-note-value={value}
							key={value}
							className={classNames({
								key: true,
								blackKey: name.includes("b"),
								whiteKey: !name.includes("b"),
								"no-offset": name.includes("C") || name.includes("F"),
								"in-current-scale":
									scale.keys[root].notes.includes(name.split("_")[0]) ||
									scale.keys[root].notes.includes(name.split("_")[0] + "-hf"),
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
