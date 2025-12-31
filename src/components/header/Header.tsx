
import "./header.css";
import DarkmodeSwitch from "../darkmodeSwitch/DarkmodeSwitch";

function Header() {
    return (
        <header className="app-header">

            <h1>Arabic Music Ear Trainer</h1>
			<p>Learn about microtonal Arabic musical scales known as maqam.</p>
            
            <button className="start-here-button-placholder">Start Here</button>

        </header>
    );
}

export default Header;