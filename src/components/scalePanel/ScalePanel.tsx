import ScaleInfoBar from "../scaleInfoBar/ScaleInfoBar";
import "../scalePanel/scalePanel.css";
import Keyboard from "../keyboard/Keyboard";
import Score from "../score/Score";
import { useState, useRef } from "react";

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
	
	const parentScalePanelRef = useRef<HTMLDivElement>(null);
	
	const [rootNote, setRootNote] = useState(Object.keys(scale.rootNotes)[0]);
	
	const { notes, descendingNotes } = scale.rootNotes[rootNote];
	const id = `${scale.name.toLowerCase()}`;
	return (
		<div
			className="scale-panel"
			id={id}
			data-scale-and-key={`${id}-${rootNote}`}
			ref={parentScalePanelRef as React.RefObject<HTMLDivElement>}
		>
			<ScaleInfoBar
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				setRootNote={setRootNote}
				instrument={instrument}
				parentScalePanelRef={parentScalePanelRef as React.RefObject<HTMLDivElement>}
			/>
			<div className="score-container">
			<Score
				audioManager={audioManager}
				scale={scale}
				notes={notes}
				direction="asc"
				rootNote={rootNote}
				instrument={instrument}
				parentScalePanelRef={parentScalePanelRef as React.RefObject<HTMLDivElement>}
			/>
			{descendingNotes && (
				<Score
					audioManager={audioManager}
					scale={scale}
					notes={descendingNotes}	
					direction="desc"
					rootNote={rootNote}
					instrument={instrument}
					parentScalePanelRef={parentScalePanelRef as React.RefObject<HTMLDivElement>}
				/>
			)}
			</div>

			<Keyboard
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
				parentScalePanelRef={parentScalePanelRef as React.RefObject<HTMLDivElement>}
			/>
			{/* DESCRIPTION PLACEHOLDER RESTING HERE */}
			<div className="description"> {scale.description ?? null}</div>
		</div>
	);
}
export default ScalePanel;
