import ScaleInfoBar from "../scaleInfoBar/ScaleInfoBar";
import "../scalePanel/scalePanel.css";
import Keyboard from "../keyboard/Keyboard";
import ScoreGroup from "../scoreGroup/ScoreGroup";

import Description from "../description/Description";
import { useState, useRef } from "react";


interface ScalePanelProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: Scale
	rootNote: string;
	instrument: string;
	setComparingScaleName: (value: ComparisonWesternScale | ComparisonMaqam | null) => void;
}

function ScalePanel({ audioManager, scale, instrument, setComparingScaleName }: ScalePanelProps) {
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

			<ScoreGroup
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
				parentScalePanelRef={
					parentScalePanelRef as React.RefObject<HTMLDivElement>
				}
			/>

			<Keyboard
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
				parentScalePanelRef={
					parentScalePanelRef as React.RefObject<HTMLDivElement>
				}
			/>

			<Description scale={scale} />
		</div>
	);
}
export default ScalePanel;
