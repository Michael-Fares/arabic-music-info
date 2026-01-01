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
				parentScalePanelRef={
					parentScalePanelRef as React.RefObject<HTMLDivElement>
				}
			/>
			<div className="score-container">
				<Score
					audioManager={audioManager}
					scale={scale}

					direction="asc"
					rootNote={rootNote}
					instrument={instrument}
					parentScalePanelRef={
						parentScalePanelRef as React.RefObject<HTMLDivElement>
					}
				/>
				<Score
					audioManager={audioManager}
					scale={scale}

					direction="desc"
					rootNote={rootNote}
					instrument={instrument}
					parentScalePanelRef={
						parentScalePanelRef as React.RefObject<HTMLDivElement>
					}
				/>
			</div>

			<Keyboard
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
				parentScalePanelRef={
					parentScalePanelRef as React.RefObject<HTMLDivElement>
				}
			/>

			<div className="description"> 
				{scale.comparisonWesternScaleNames && 
			<p>
					{scale.name} is like a <button style={{'backgroundColor': 'red', "padding": "1rem"}}>{scale?.comparisonWesternScaleNames?.asc?.name}</button> {` `}scale when played ascending with the {scale?.comparisonWesternScaleNames?.asc?.withDegreesAsQuarterTones?.join(" and ")} degrees lowered by a quarter tone.
			</p>}

			</div>
		</div>
	);
}
export default ScalePanel;
