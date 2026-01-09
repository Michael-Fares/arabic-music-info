import classNames from "classnames";
import Accidental from "../icons/Accidental";
import { Fragment } from "react/jsx-runtime";

function NoteList({
    uniqueNotesForForDisplay,
    scale,
}: {
    uniqueNotesForForDisplay: NoteObject[];
    scale: Scale;
}) {
    return (
        <Fragment>
            <p>Notes:</p>
            <ul className="notes-list">
                {uniqueNotesForForDisplay.map(
                    (note: NoteObject, index: number) => {
                        const isDescendingVariantNote =
                            uniqueNotesForForDisplay.indexOf(note) + 1 ===
                            scale.descendingScaleVariantDegree;
                        const stringAccidental = note.name.substring(1);
                        const isNatural = note.name.length === 1;
                        const isFlat = stringAccidental === "b";
                        const isHalfFlat = stringAccidental === "-hf";
                        const isFlatHalfFlat = stringAccidental === "b-hf";
                        const noteLetter = note.name.charAt(0);
                        let jsx;
                        if (isNatural) {
                            jsx = <>{note.name}</>;
                        } else if (isFlat) {
                            jsx = (
                                <>
                                    {noteLetter}
                                    <Accidental type="flat" />
                                </>
                            );
                        } else if (isHalfFlat) {
                            jsx = (
                                <>
                                    {noteLetter}
                                    <Accidental type="half-flat" />
                                </>
                            );
                        } else if (isFlatHalfFlat) {
                            jsx = (
                                <>
                                    {noteLetter}
                                    <Accidental type="half-flat" />
                                    <Accidental type="flat" />
                                </>
                            );
                        }
                        return (
                            <li
                                data-note-name={note.name}
                                data-octave={note.octave}
                                className={classNames("note-pill", {
                                    "descending-variant":
                                        isDescendingVariantNote,
                                })}
                                key={index}
                            >
                                {jsx}
                            </li>
                        );
                    }
                )}
            </ul>
        </Fragment>
    );
}
export default NoteList;
