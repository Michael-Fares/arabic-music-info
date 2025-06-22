import "./scaleInforBar.css";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay } from "../../utils";
function ScaleInfoBar({ scale, root }) {
	const notesInScale = scale.keys[root].notes;
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
	console.log("ScaleInfoBar component > notesToPlay", notesToPlay)
	return (
		<div className="scale-info-bar">
			<p>
				Scale: <span>{scale.name}</span>
			</p>
			<p>
				Key: <span>{root}</span>
			</p>
			<div>
				<span>Notes: </span>
				<ul className="notes-list">
					{notesToPlay.map((note, index:number) => (
						
						<li data-note-name={note.name} data-octave={note.octave} className={"note-pill"} key={index}>
							{note.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default ScaleInfoBar;
