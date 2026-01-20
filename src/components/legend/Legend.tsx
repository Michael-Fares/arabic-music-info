import "./legend.css";

function Legend() {

    return(
        <div className="legend">
            <ul className="legend-list">
                <li className="legend-list-item">
                    <div className="color-square quarter-tone"></div>
                    <p>This note is flattened by a <i>quarter tone</i></p>
                </li>
                <li className="legend-list-item">
                    <div className="color-square in-current-run"></div>
                    <p>This note is in the current 8 note run on the piano, starting from the key signature</p>
                </li>
                <li className="legend-list-item">
                    <div className="color-square descending-variant"></div>
                    <p>When improvising on the maqam, this note can be played instead of the one directly to the right of it.</p>
                </li>
                <li className="legend-list-item">
                    <div className="color-square in-current-scale-color"></div>
                    <p>This note is in the current scale or Maqam, and so is a "safe" note to play on the keyboard to get a feel for how the maqam sounds beyond a 1 octave 8-note range.</p>
                </li>

            </ul>
        </div>
    )
}

export default Legend;