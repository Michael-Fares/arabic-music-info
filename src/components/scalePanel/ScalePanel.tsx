import ScaleInfoBar from "../scaleInfoBar/ScaleInfoBar";
import "../scalePanel/scalePanel.css";
import Keyboard from "../keyboard/Keyboard";
import ScoreGroup from "../scoreGroup/ScoreGroup";

import { useRef } from "react";

interface ScalePanelProps {
    audioManager: {
        playSample: (noteValue: number, sample: any) => void;
        samples: Record<string, any>;
    };
    scale: Scale;
    rootNote: string;
    instrument: string;
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
    isComparisonPanel,
    setComparingScaleName,
}: ScalePanelProps) {
    const parentScalePanelRef = useRef<HTMLDivElement>(null);

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

            <Keyboard
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
