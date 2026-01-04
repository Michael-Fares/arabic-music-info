import "./scaleInforBar.css";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay, uppercase } from "../../utils";
import classNames from "classnames";
interface ScaleInfoBarProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: Scale;
	rootNote: string;
	setRootNote: (note: string) => void;
	instrument: string;
	parentScalePanelRef: React.RefObject<HTMLDivElement> | null;
}
function ScaleInfoBar({
	audioManager,
	scale,
	rootNote,
	setRootNote,
	instrument,
	parentScalePanelRef
}: ScaleInfoBarProps) {

	const notesInScale = scale.rootNotes[rootNote]?.notes || [];

	const descendingNotesInScale =
		scale.rootNotes[rootNote]?.descendingNotes ?? scale.rootNotes[rootNote]?.notes?.toReversed();
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
	
	const descendingNotesToPlay = getNotesToPlay(
		NOTE_VALUES,
		descendingNotesInScale || []
	).reverse();
	
	

	const allNotesToPlay = [...notesToPlay, ...descendingNotesToPlay.toReversed()].map(
		(note) => JSON.stringify(note)
	);

	const uniqueNotesForForDisplay = Array.from(new Set(allNotesToPlay)).map((note) =>
		JSON.parse(note)
	).sort((a, b) => a.value - b.value);
	

	
	const handleClickPlay = (

	) => {
		
		const parent = parentScalePanelRef?.current;

		const notesInScale = scale.rootNotes[rootNote]?.notes || [];

		const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
		

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
	
	return (
		<div className="scale-info-bar">
			<button
				className="play-button"
				onClick={() => handleClickPlay()}
			>
				Hear It!
			</button>
			<p>
				Maqam: <b>{uppercase(scale.name)}</b>
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
