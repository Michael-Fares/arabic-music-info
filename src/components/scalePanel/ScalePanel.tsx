import ScaleInfoBar from "../scaleInfoBar/ScaleInfoBar";
import "../scalePanel/scalePanel.css";
import Keyboard from "../keyboard/Keyboard";
import Score from "../score/Score";
import { useState } from "react";

interface ScalePanelProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: {
		name: string;
		descendingScaleVariantDegree: number | undefined;
		rootNotes: Record<string, { notes: string[]; descendingNotes?: string[] }>;
		description: string;
	};
	rootNote: string;
	instrument: string;
}

function ScalePanel({ audioManager, scale, instrument }: ScalePanelProps) {
	
	console.log("description.split", scale.description?.split("|"));
	
	const [rootNote, setRootNote] = useState(Object.keys(scale.rootNotes)[0]);
	
	const { notes, descendingNotes } = scale.rootNotes[rootNote];
	const id = `${scale.name.toLowerCase()}`;
	return (
		<div
			className="scale-panel"
			id={id}
			data-scale-and-key={`${id}-${rootNote}`}
		>
			<ScaleInfoBar
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				setRootNote={setRootNote}
				instrument={instrument}
			/>
			<div className="score-container">
			<Score
				audioManager={audioManager}
				scale={scale}
				notes={notes}
				direction="asc"
				rootNote={rootNote}
				instrument={instrument}
			/>
			{descendingNotes && (
				<Score
					audioManager={audioManager}
					scale={scale}
					notes={descendingNotes}	
					direction="desc"
					rootNote={rootNote}
					instrument={instrument}
				/>
			)}
			</div>

			<Keyboard
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
			/>
			{/* DESCRIPTION PLACEHOLDER RESTING HERE */}
			<div className="description"> {scale.description ?? null}</div>
		</div>
	);
}
export default ScalePanel;
