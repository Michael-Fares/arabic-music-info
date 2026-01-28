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
    pianoId: ScaleId;
    pianoIsTyping: boolean;
    activePiano: ScaleId;
    setActivePiano: React.Dispatch<React.SetStateAction<ScaleId>>;
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
                Click any staff note or piano key to hear it. Or{" "}
                <button className="musical-typing-toggle-button"
                    onClick={() => setActivePiano(pianoId)}
                >
                    Click here to toggle musical typing
                </button>
            </p>
            <Keyboard
                pianoId={pianoId}
                pianoIsTyping={activePiano === pianoId}
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
