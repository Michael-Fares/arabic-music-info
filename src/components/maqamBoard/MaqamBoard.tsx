import "./maqamBoard.css";
import { useState } from "react";
import { SCALE_DATA } from "../../constants";
import ScalePanel from "../scalePanel/ScalePanel";
import Description from "../description/Description";

import { uppercase } from "../../utils"; 

interface MaqamBoardProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: Scale;
	rootNote: string;
	instrument: string;
}

function MaqamBoard({
	audioManager,
	scale,
	rootNote,
	instrument,
}: MaqamBoardProps) {
	const [comparingScaleName, setComparingScaleName] = useState<
		ComparisonWesternScale | ComparisonMaqam | null
	>(null);

	const scaleToCompare: Scale | undefined =
		SCALE_DATA.find((s) => s.name === comparingScaleName) ?? undefined;

	return (
		<div className="maqam-board" id={scale.name}>
			<h2>{uppercase(scale.name)}</h2>

			<ScalePanel
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}

			/>
        <Description scale={scale} comparingScaleName={comparingScaleName} setComparingScaleName={setComparingScaleName}/>

				{scaleToCompare ? (
					<ScalePanel
						audioManager={audioManager}
						scale={scaleToCompare}
						rootNote={rootNote}
						instrument={instrument}
					/>
				) : null}
		</div>
	);
}
export default MaqamBoard;
