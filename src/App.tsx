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
			{Object.keys(SCALE_DATA).map((scaleName) => {
				const scale = SCALE_DATA[scaleName as keyof typeof SCALE_DATA];
				const rootNote = Object.keys(scale.rootNotes)[0]; // pick the first available root note
				// Filter out nulls from notes arrays to satisfy type requirements
				const filteredScale = {
					...scale,
					rootNotes: Object.fromEntries(
						Object.entries(scale.rootNotes).map(([note, data]) => [
							note,
							{ notes: data.notes.filter((note): note is string => note !== null) },
						])
					),
				};
				return (
					<ScalePanel
						key={scaleName}
						audioManager={audioManager}
						scale={filteredScale}
						rootNote={rootNote}
						instrument={instrument}
					/>
				);
			})}
		</>
	);
}

export default App;
