import "./maqamBoard.css";
import { useState } from "react";
import { SCALE_DATA } from "../../constants";
import ScalePanel from "../scalePanel/ScalePanel";
import Description from "../description/Description";
import { Fragment } from "react";

import { uppercase } from "../../utils";

interface MaqamBoardProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: Scale;
	instrument: string;
	activePiano: string | null;
	setActivePiano: React.Dispatch<React.SetStateAction<string | null>>;
}

function MaqamBoard({ audioManager, scale, instrument, activePiano, setActivePiano }: MaqamBoardProps) {
	const [rootNote, setRootNote] = useState(Object.keys(scale.rootNotes)[0]);
	const [comparingScaleName, setComparingScaleName] = useState<
		ComparisonWesternScale | ComparisonMaqam | null
	>(null);



	const scaleToCompare: Scale | undefined =
		SCALE_DATA.find((s) => s.name === comparingScaleName) ?? undefined;

	

	function handleComparisonScaleRootNote(
		mainMaqamName: string,
		mainMaqamRootNote: string,
		comparingScaleName: string | null,
	): string {
		if (mainMaqamName === "hijaz" && comparingScaleName === "rast") {
			if (mainMaqamRootNote === "D") {
				return "G";
			} else if (mainMaqamRootNote === "G") {
				return "C";
			} else if (mainMaqamRootNote === "A") {
				return "D";
			}
		} else if (mainMaqamName === "sikah" && comparingScaleName === "harmonic minor") {
			if (mainMaqamRootNote === "E-hf") {
				return "C";
			} else if (mainMaqamRootNote === "B-hf") {
				return "G";
			}
		} else {
			return rootNote;
		}
		return rootNote;
	}
	const comparisonScaleRootNote = handleComparisonScaleRootNote(
		scale.name,
		rootNote,
		comparingScaleName
	);
	return (
		<Fragment>

			<div className="header">
				<h2 className="maqam-title">{uppercase(scale.name)}</h2>
				<div className="key-picker">
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
			</div>

			<div className="scale-panel-group-wrapper">
				<div className="main-scale-panel">
					<ScalePanel
						audioManager={audioManager}
						scale={scale}
						rootNote={rootNote}
						instrument={instrument}
						pianoId={scale.name}
						pianoIsTyping={activePiano === scale.name}
						activePiano={activePiano}
						setActivePiano={setActivePiano}
					/>
				</div>

				{scaleToCompare ? (
					<div className="comparing-scale-panel">
						<ScalePanel
							audioManager={audioManager}
							scale={scaleToCompare}
							rootNote={comparisonScaleRootNote}
							instrument={instrument}
							pianoId={`${scale.name}-${scaleToCompare.name}`}
							pianoIsTyping={activePiano === scaleToCompare.name}
							activePiano={activePiano}
							setActivePiano={setActivePiano}
							isComparisonPanel={comparingScaleName === scaleToCompare?.name}
							setComparingScaleName={setComparingScaleName}
						/>
					</div>
				) : null}
			</div>
			<Description
				scale={scale}
				comparingScaleName={comparingScaleName}
				setComparingScaleName={setComparingScaleName}
			/>
		</Fragment>

	
	);
}
export default MaqamBoard;
