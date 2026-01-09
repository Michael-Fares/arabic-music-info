import "./scaleInforBar.css";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay, uppercase } from "../../utils";
import NoteList from "./NoteList";

interface ScaleInfoBarProps {
    audioManager: {
        playSample: (noteValue: number, sample: any) => void;
        samples: Record<string, any>;
    };
    scale: Scale;
    rootNote: string;
    instrument: string;
    parentScalePanelRef: React.RefObject<HTMLDivElement> | null;
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
function ScaleInfoBar({
    audioManager,
    scale,
    rootNote,
    instrument,
    parentScalePanelRef,
    isComparisonPanel,
    setComparingScaleName,
}: ScaleInfoBarProps) {
    const notesInScale = scale.rootNotes[rootNote]?.notes || [];

    const descendingNotesInScale =
        scale.rootNotes[rootNote]?.descendingNotes ??
        scale.rootNotes[rootNote]?.notes?.toReversed();
    const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);

    const descendingNotesToPlay = getNotesToPlay(
        NOTE_VALUES,
        descendingNotesInScale || []
    ).reverse();

    const allNotesToPlay = [
        ...notesToPlay,
        ...descendingNotesToPlay.toReversed(),
    ].map((note) => JSON.stringify(note));

    const uniqueNotesForForDisplay = Array.from(new Set(allNotesToPlay))
        .map((note) => JSON.parse(note))
        .sort((a, b) => a.value - b.value);

    const handleClickPlay = () => {
        const parent = parentScalePanelRef?.current;

        const notesInScale = scale.rootNotes[rootNote]?.notes || [];

        const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);

        notesToPlay.forEach((note, index: number) => {
            const { name, value, octave } = note;

            setTimeout(() => {
                audioManager.playSample(
                    value,
                    audioManager.samples[instrument]
                );
                const notePillNameToHighlight = parent?.querySelector(
                    `.note-pill[data-note-name="${name}"][data-octave="${octave}"]`
                );
                const keyboardKeyToHilight = parent?.querySelector(
                    `.key[data-note-name="${name}"][data-octave="${octave}"]`
                );
                const scoreNoteToHighlight = parent?.querySelector(
                    `div.score[data-direction="asc"] .vf-note[data-note-name="${name}"][data-octave="${octave}"]`
                );
                notePillNameToHighlight?.classList.add("highlight");
                keyboardKeyToHilight?.classList.add("highlight");
                scoreNoteToHighlight?.classList.add("highlight");
                setTimeout(() => {
                    notePillNameToHighlight?.classList.remove("highlight");
                    keyboardKeyToHilight?.classList.remove("highlight");
                    scoreNoteToHighlight?.classList.remove("highlight");
                }, 500);
            }, 500 * index);
        });
        setTimeout(() => {
            descendingNotesToPlay.forEach((note, index: number) => {
                const { name, value, octave } = note;

                setTimeout(() => {
                    audioManager.playSample(
                        value,
                        audioManager.samples[instrument]
                    );
                    const notePillNameToHighlight = parent?.querySelector(
                        `.note-pill[data-note-name="${name}"][data-octave="${octave}"]`
                    );
                    const keyboardKeyToHilight = parent?.querySelector(
                        `.key[data-note-name="${name}"][data-octave="${octave}"]`
                    );
                    const scoreNoteToHighlight = parent?.querySelector(
                        `div.score[data-direction="desc"] .vf-note[data-note-name="${name}"][data-octave="${octave}"]`
                    );
                    notePillNameToHighlight?.classList.add("highlight");
                    keyboardKeyToHilight?.classList.add("highlight");
                    scoreNoteToHighlight?.classList.add("highlight");
                    setTimeout(() => {
                        notePillNameToHighlight?.classList.remove("highlight");
                        keyboardKeyToHilight?.classList.remove("highlight");
                        scoreNoteToHighlight?.classList.remove("highlight");
                    }, 500);
                }, 500 * index);
            });
        }, notesToPlay.length * 500 + 1000);
    };
    const handleComparingPanelClose = () => {
        if (setComparingScaleName) {
            setComparingScaleName(null);
        } else {
            return;
        }
    };
    const scaleTitle = scale.isMaqam ? (
        <b>Maqam {uppercase(scale.name)}</b>
    ) : (
        <span>
            This is the <b>{uppercase(scale.name)} Scale</b>
        </span>
    );
    return (
        <div className="scale-info-bar">
            <div className="top-row">
                <button
                    className="play-button"
                    onClick={() => handleClickPlay()}
                >
                    Hear It!
                </button>
                <p>{scaleTitle}</p>
                {isComparisonPanel ? (
                    <button
                        className="ok-button"
                        onClick={handleComparingPanelClose}
                    >
                        OK!
                    </button>
                ) : null}
            </div>
            <div className="notes-info">
                <NoteList
                    uniqueNotesForForDisplay={uniqueNotesForForDisplay}
                    scale={scale}
                />
            </div>
        </div>
    );
}
export default ScaleInfoBar;
