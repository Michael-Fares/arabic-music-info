
import "./header.css";


function Header() {
    return (
        <header className="app-header">

            <h1>Arabic Music Ear Trainer</h1>
			<b className="description">Learn about microtonal Arabic musical scales known as maqam.</b>
            <p className="call-to-action"><span className="see">See,</span> <span className="hear">Hear,</span> <span className="play">Play, </span><span className="compare">Compare</span> <span className="rest">to Western Scales and Modes</span></p>

        </header>
    );
}

export default Header;