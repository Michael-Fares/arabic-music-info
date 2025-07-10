import "./scaleInforBar.css";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay } from "../../utils";
function ScaleInfoBar({ audioManager, scale, root, setRoot, instrument }) {
	const notesInScale = scale.rootNotes[root].notes;
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
	const handleClickPlay = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// will need this later for DOM selection styling probably
		const parent =
			event.target instanceof Element
				? event.target.closest(
						`.scale-panel[data-scale-and-key="${scale.name}-${root}"]`
				)
				: null;

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
	console.log("ScaleInfoBar component > notesToPlay", notesToPlay);
	return (
		<div className="scale-info-bar">
			<button
				className="play-button"
				onClick={(event) => handleClickPlay(event)}
			>
				Play Scale
			</button>
			<p>
				Scale: <span>{scale.name}</span>
			</p>
			<div>
				(this probably be it's own state in the scale panel component)
			<span>Key:</span>
			<select
				name="keys"
				id="keys"
				value={root}
				onChange={(e) => {
					setRoot(e.target.value);
				}}
			>
				<option value="C">C</option>
				<option value="F">F</option>
			</select>

			</div>
			<div className="notes-info">
				<span>Notes: </span>
				<ul className="notes-list">
					{notesToPlay.map((note, index: number) => (
						<li
							data-note-name={note.name}
							data-octave={note.octave}
							className={"note-pill"}
							key={index}
						>
							{note.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default ScaleInfoBar;
