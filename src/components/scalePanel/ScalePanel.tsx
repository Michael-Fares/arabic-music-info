import ScaleInfoBar from "../scaleInfoBar/ScaleInfoBar";
import "../scalePanel/scalePanel.css";
import Keyboard from "../keyboard/Keyboard";
import ScoreGroup from "../scoreGroup/ScoreGroup";
import classNames from "classnames";

import { useRef } from "react";

interface ScalePanelProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: Scale;
	rootNote: string;
	instrument: string;
	pianoId: string;
	pianoIsTyping: boolean;
	activePiano: string | null;
	setActivePiano: React.Dispatch<React.SetStateAction<string | null>>;
	isComparisonPanel?: boolean;
	setComparingScaleName?: React.Dispatch<
		React.SetStateAction<
			| "major"
			| "mixolydian"
			| "minor"
			| "dorian"
			| "harmonic minor"
			| "phrygian"
			| "phrygian dominant"
			| "rast"
			| "bayati"
			| "hijaz"
			| null
		>
	>;
}

function ScalePanel({
	audioManager,
	scale,
	rootNote,
	instrument,
	pianoId,
	activePiano,
	setActivePiano,
	isComparisonPanel,
	setComparingScaleName,
}: ScalePanelProps) {
	const parentScalePanelRef = useRef<HTMLDivElement>(null);

	const pianoIsTyping = activePiano === pianoId;

	const handleClickMusicalTypingToggle = () => {
		if (pianoId === activePiano) {
			setActivePiano(null);
		} else {
			setActivePiano(pianoId);
		}
	};

	return (
		<div
			className="scale-panel"
			ref={parentScalePanelRef as React.RefObject<HTMLDivElement>}
		>
			<ScaleInfoBar
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
				parentScalePanelRef={
					parentScalePanelRef as React.RefObject<HTMLDivElement>
				}
				isComparisonPanel={isComparisonPanel}
				setComparingScaleName={setComparingScaleName}
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
			<p>
				Click any staff note or piano key to hear it. <span className="musical-typing-invite">Or{" "}
				<button
					className={classNames({
						"musical-typing-toggle-button": true,
						pressed: pianoIsTyping,
					})}
					onClick={handleClickMusicalTypingToggle}
				>
					toggle musical typing
				</button></span>
			</p>
			{pianoIsTyping ? (
				<p className="musical-typing-instructions">
					Musical typing on. Press these keys on your keyboard to automatically
					play the scale!
				</p>
			) : null}
			<Keyboard
				pianoId={pianoId}
				pianoIsTyping={pianoIsTyping}
				audioManager={audioManager}
				scale={scale}
				rootNote={rootNote}
				instrument={instrument}
				parentScalePanelRef={
					parentScalePanelRef as React.RefObject<HTMLDivElement>
				}
			/>
		</div>
	);
}
export default ScalePanel;
