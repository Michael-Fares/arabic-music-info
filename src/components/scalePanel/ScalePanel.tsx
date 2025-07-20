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
		rootNotes: Record<string, { notes: string[] }>;
	};
	rootNote: string;
	instrument: string;
}

function ScalePanel({ audioManager, scale, instrument }: ScalePanelProps) {
	const [rootNote, setRootNote] = useState(Object.keys(scale.rootNotes)[0]);
	console.log("ScalePanel component > scale", scale);
	return (
		<div
			className="scale-panel"
			id={`${scale.name.split(" ").join("-").toLowerCase()}`}
			data-scale-and-key={`${scale.name}-${rootNote}`}
		>
			<ScaleInfoBar
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				setRootNote={setRootNote}
				instrument={instrument}
			/>
			<Score
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
			/>
			<Keyboard
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
			/>
		</div>
	);
}
export default ScalePanel;
