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


			{/* <span>Key:</span>
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
			</select> */}


			{/* POC of how to map over and render a scale panel
			For each scale in SCALE_DATA, render a ScalePanel component
			by SCALE NAME and then the scale panel will have a dorpdown to select the root note
			e.g select the key
			by default the root note will be C
			but might be good to default it to something else based on the tonality of the scale
			like Bayati is usually in D
			so the root note will be D
			Also, the instrument will be a dropdown to select the instrument
			*/}

			{Object.keys(SCALE_DATA).map((scaleName) => {
				return (
					<ScalePanel
						key={scaleName}
						audioManager={audioManager}
						scale={SCALE_DATA[scaleName]}
						root={root}
						setRoot={setRoot}
						instrument={instrument}
					/>
				);
			})}
		</>
	);
}

export default App;
