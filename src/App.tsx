import "./App.css";

// NEED TO THINK about how the hell exactly this is supposed to work with state
import { SCALE_DATA, INSTUMENTS } from "./constants";

import ScalePanel from "./components/scalePanel/ScalePanel";

import { useState } from "react";

import { AudioManager } from "./audio";

function App() {
	const audioManager = new AudioManager();
	// mock of state
	const [scale, setScale] = useState(SCALE_DATA.major);
	// root means "key" to not to collide with react key
	const [root, setRoot] = useState("C");
	const [instrument, setInstrument] = useState(INSTUMENTS.piano);
	return (
		<>
			<h1>Arabic Music Ear Trainer</h1>
			<p>Learn about microtonal Middle Eastern scales</p>
			<span>Scale:</span>
			<select
				name="scales"
				id="scales"
				value={scale.name}
				onChange={(e) => {
					const scaleName = e.target.value;
					setScale(
						Object.values(SCALE_DATA).find((scale) => scale.name === scaleName)
					);
				}}
			>
				<option value="Major">Major</option>
				<option value="Rast">Rast</option>
			</select>

			<span>Key:</span>
			<select
				name="keys"
				id="keys"
				value={root}
				onChange={(e) => {
					setRoot(e.target.value);
				}}
			>
				<option value="C">C</option>
				<option value="F">F</option>
			</select>
			<ScalePanel
				audioManager={audioManager}
				scale={scale}
				root={root}
				instrument={instrument}
			/>
		</>
	);
}

export default App;
