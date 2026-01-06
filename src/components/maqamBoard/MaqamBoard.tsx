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
    instrument: string;
}

function MaqamBoard({ audioManager, scale, instrument }: MaqamBoardProps) {
    const [rootNote, setRootNote] = useState(Object.keys(scale.rootNotes)[0]);
    const [comparingScaleName, setComparingScaleName] = useState<
        ComparisonWesternScale | ComparisonMaqam | null
    >(null);

    const scaleToCompare: Scale | undefined =
        SCALE_DATA.find((s) => s.name === comparingScaleName) ?? undefined;

    return (
        <div className="maqam-board" id={scale.name}>
            <h2>{uppercase(scale.name)}</h2>
            <div>
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

            <ScalePanel
                audioManager={audioManager}
                scale={scale}
                rootNote={rootNote}
                instrument={instrument}
            />

            {scaleToCompare ? (
                <div className="comparing-scale-panel">
                    <ScalePanel
                        audioManager={audioManager}
                        scale={scaleToCompare}
                        rootNote={rootNote}
                        instrument={instrument}
                    />
                </div>
            ) : null}

            <Description
                scale={scale}
                comparingScaleName={comparingScaleName}
                setComparingScaleName={setComparingScaleName}
            />
        </div>
    );
}
export default MaqamBoard;
