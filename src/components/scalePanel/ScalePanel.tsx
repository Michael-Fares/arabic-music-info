import ScaleInfoBar from "../scaleInfoBar/ScaleInfoBar";
import Keyboard from "../keyboard/Keyboard";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay } from "../../utils";

function ScalePanel({ audioManager, scale, root, instrument }) {
	const handleClickPlay = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// will need this later for DOM selection styling probably
		const parent = event.currentTarget.parentNode;
		console.log(parent);

		const notesInScale = scale.keys[root].notes;

		const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
		console.log("notesToPlay", notesToPlay);

		notesToPlay.forEach((note, index) => {
			const { name, value, octave } = note;

			setTimeout(() => {
				audioManager.playSample(value, audioManager.samples[instrument]);
				const notePillNameToHighlight = parent?.querySelector(
					`.note-pill[data-note-name="${name}"][data-octave="${octave}"]`
				);
				const keyboardKeyToHilight = parent?.querySelector(
					`.key[data-note-name="${name}"][data-octave="${octave}"]`
				);
				notePillNameToHighlight?.classList.add("highlight");
				keyboardKeyToHilight?.classList.add("highlight");
				setTimeout(() => {
					notePillNameToHighlight?.classList.remove("highlight");
					keyboardKeyToHilight?.classList.remove("highlight");
				}, 500);
			}, 500 * index);
		});
	};
	return (
		<div className="scale-panel" data-scale-and-key={`${scale.name}-${root}`}>
			<button
				className="play-button"
				onClick={(event) => handleClickPlay(event)}
			>
				SCALE PANEL PLAY
			</button>
			<ScaleInfoBar scale={scale} root={root} />
			<Keyboard
				audioManager={audioManager}
				scale={scale}
				root={root}
				instrument={instrument}
			/>
		</div>
	);
}
export default ScalePanel;
