import "./scaleInforBar.css";

function ScaleInfoBar({ scale, root }) {
	return (
		<div className="scale-info-bar">
			<p>
				Scale: <span>{scale.name}</span>
			</p>
			<p>
				Key: <span>{root}</span>
			</p>
			<div>
				<span>Notes in this scale: </span>
				<ul className="notes-list">
					{scale.keys[root].notes.map((note) => (
						<li className={"note-pill"} key={note}>
							{note}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
export default ScaleInfoBar;
