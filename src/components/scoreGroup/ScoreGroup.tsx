import "./scoreGroup.css";
import Score from "../score/Score";
interface ScoreGroupProps {
	audioManager: {
		playSample: (noteValue: number, sample: any) => void;
		samples: Record<string, any>;
	};
	scale: Scale
	rootNote: string;
	instrument: string;
    parentScalePanelRef: React.RefObject<HTMLDivElement> | null;
}
function ScoreGroup({
	audioManager,
	scale,
	rootNote,
	instrument,
	parentScalePanelRef,
}: ScoreGroupProps) {
	return (
		<div className="score-group-container">
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
	);
}
export default ScoreGroup;
