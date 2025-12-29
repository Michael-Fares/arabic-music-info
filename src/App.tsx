import "./App.css";
import { MAQAM_DATA, INSTUMENTS } from "./constants";
import ScalePanel from "./components/scalePanel/ScalePanel";
import Nav from "./components/nav/Nav";
import { useState } from "react";
import { AudioManager } from "./audio";


function App() {
	const audioManager = new AudioManager();
	const [instrument, setInstrument] = useState(INSTUMENTS.piano);
	const maqamList = Object.values(MAQAM_DATA).map((scale) => scale.name.toLowerCase());
	return (
		<>
			<h1>Arabic Music Ear Trainer</h1>
			<p>Learn about microtonal Middle Eastern scales</p>
			<div className="instrument-selector">
				<label htmlFor="instrument">Select Instrument: </label>
				<select
					id="instrument"
					value={instrument}
					onChange={(e) => setInstrument(e.target.value)}
				>
					{Object.values(INSTUMENTS).map((inst) => (
						<option key={inst} value={inst}>
							{inst.charAt(0).toUpperCase() + inst.slice(1)}
						</option>
					))}
				</select>
			</div>
			<Nav maqamList={maqamList} />
			{MAQAM_DATA.map((maqam) => {

				const rootNote = Object.keys(maqam.rootNotes)[0]; // pick the first available root note

				return (
					<ScalePanel
						key={maqam.name}
						audioManager={audioManager}
						scale={maqam}
						rootNote={rootNote}
						instrument={instrument}
					/>
				);
			})}
		</>
	);
}

export default App;
