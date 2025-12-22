import "./scaleInforBar.css";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay } from "../../utils";
import classNames from "classnames";
interface ScaleInfoBarProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: {
		name: string;
		descendingScaleVariantDegree: number;
		rootNotes: Record<string, { notes: string[]; descendingNotes?: string[] }>;
	};
	rootNote: string;
	setRootNote: (note: string) => void;
	instrument: string;
}
function ScaleInfoBar({
	audioManager,
	scale,
	rootNote,
	setRootNote,
	instrument,
}: ScaleInfoBarProps) {
	console.log("ScaleInfoBar component > scale", scale);
	const notesInScale = scale.rootNotes[rootNote].notes;
	console.log("ScaleInfoBar component > notesInScale", notesInScale);
	const descendingNotesInScale =
		scale.rootNotes[rootNote].descendingNotes || [];
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
	console.log("ScaleInfoBar component > notesToPlay", notesToPlay);
	const descendingNotesToPlay = getNotesToPlay(
		NOTE_VALUES,
		descendingNotesInScale
	).reverse();
	console.log("ScaleInfoBar component > notesToPlay", notesToPlay);
	console.log(
		"ScaleInfoBar component > descendingNotesToPlay",
		descendingNotesToPlay
	);
	const allNotesToPlay = [...notesToPlay, ...descendingNotesToPlay.toReversed()].map(
		(note) => JSON.stringify(note)
	);

	const uniqueNotesForForDisplay = Array.from(new Set(allNotesToPlay)).map((note) =>
		JSON.parse(note)
	).sort((a, b) => a.value - b.value);
	console.log("ScaleInfoBar component > uniqueNotesForForDisplay", uniqueNotesForForDisplay);

	console.log("ScaleInfoBar component > allNotesToPlay", allNotesToPlay);
	const handleClickPlay = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		// will need this later for DOM selection styling probably
		const parent =
			event.target instanceof Element
				? event.target.closest(
						`.scale-panel[data-scale-and-key="${scale.name}-${rootNote}"]`
				  )
				: null;

		const notesInScale = scale.rootNotes[rootNote].notes;

		const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
		console.log("notesToPlay", notesToPlay);

		notesToPlay.forEach((note, index: number) => {
			const { name, value, octave } = note;

			setTimeout(() => {
				audioManager.playSample(value, audioManager.samples[instrument]);
				const notePillNameToHighlight = parent?.querySelector(
					`.note-pill[data-note-name="${name}"][data-octave="${octave}"]`
				);
				const keyboardKeyToHilight = parent?.querySelector(
					`.key[data-note-name="${name}"][data-octave="${octave}"]`
				);
				const scoreNoteToHighlight = parent?.querySelector(
					`div.score[data-direction="asc"] .vf-note[data-note-name="${name}"][data-octave="${octave}"]`
				);
				notePillNameToHighlight?.classList.add("highlight");
				keyboardKeyToHilight?.classList.add("highlight");
				scoreNoteToHighlight?.classList.add("highlight");
				setTimeout(() => {
					notePillNameToHighlight?.classList.remove("highlight");
					keyboardKeyToHilight?.classList.remove("highlight");
					scoreNoteToHighlight?.classList.remove("highlight");
				}, 500);
			}, 500 * index);
		});
		setTimeout(() => {
			descendingNotesToPlay.forEach((note, index: number) => {
				const { name, value, octave } = note;

				setTimeout(() => {
					audioManager.playSample(value, audioManager.samples[instrument]);
					const notePillNameToHighlight = parent?.querySelector(
						`.note-pill[data-note-name="${name}"][data-octave="${octave}"]`
					);
					const keyboardKeyToHilight = parent?.querySelector(
						`.key[data-note-name="${name}"][data-octave="${octave}"]`
					);
					const scoreNoteToHighlight = parent?.querySelector(
						`div.score[data-direction="desc"] .vf-note[data-note-name="${name}"][data-octave="${octave}"]`
					);
					notePillNameToHighlight?.classList.add("highlight");
					keyboardKeyToHilight?.classList.add("highlight");
					scoreNoteToHighlight?.classList.add("highlight");
					setTimeout(() => {
						notePillNameToHighlight?.classList.remove("highlight");
						keyboardKeyToHilight?.classList.remove("highlight");
						scoreNoteToHighlight?.classList.remove("highlight");
					}, 500);
				}, 500 * index);
			});
		}, notesToPlay.length * 500 + 1000);
	};
	console.log("ScaleInfoBar component > notesToPlay", notesToPlay);
	return (
		<div className="scale-info-bar">
			<button
				className="play-button"
				onClick={(event) => handleClickPlay(event)}
			>
				Play Maqam
			</button>
			<p>
				Maqam: <b>{scale.name}</b>
			</p>
			<div>
				<label htmlFor="keys">Key: {` `}</label>
				<select
					name="keys"
					id="keys"
					value={rootNote}
					onChange={(e) => {
						setRootNote(e.target.value);
					}}
				>
					{Object.keys(scale.rootNotes).map((key) => (
						<option value={key} key={key}>
							{key}
						</option>
					))}
				</select>
			</div>
			<div className="notes-info">
				<p>Notes: </p>
				<ul className="notes-list">
					{uniqueNotesForForDisplay.map((note, index: number) => {
						const isDescendingVariantNote = uniqueNotesForForDisplay.indexOf(note) + 1 === scale.descendingScaleVariantDegree
						return (
							<li
								data-note-name={note.name}
								data-octave={note.octave}
								className={classNames("note-pill", {
									"descending-variant": isDescendingVariantNote,
								})}
							key={index}
						>
							{note.name}
						</li>
					);
				})}
				</ul>
			</div>
		</div>
	);
}
export default ScaleInfoBar;
