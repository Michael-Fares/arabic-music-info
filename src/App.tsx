import "./App.css";

import { SCALE_DATA, INSTUMENTS } from "./constants";

import ScalePanel from "./components/scalePanel/ScalePanel";

import { useState } from "react";

import { AudioManager } from "./audio";

function App() {
	const audioManager = new AudioManager();

	const [instrument, setInstrument] = useState(INSTUMENTS.piano);
	return (
		<>
			<h1>Arabic Music Ear Trainer</h1>
			<p>Learn about microtonal Middle Eastern scales</p>
			{Object.keys(SCALE_DATA).map((scaleName) => {
				return (
					<ScalePanel
						key={scaleName}
						audioManager={audioManager}
						scale={SCALE_DATA[scaleName]}
						instrument={instrument}
					/>
				);
			})}
		</>
	);
}

export default App;
