import "./App.css";
import useLocalStorage from "use-local-storage";
import { MAQAM_DATA, INSTUMENTS } from "./constants";
import ScalePanel from "./components/scalePanel/ScalePanel";
import Nav from "./components/nav/Nav";
import Header from "./components/header/Header";
import DarkmodeSwitch from "./components/darkmodeSwitch/DarkmodeSwitch";
import InstrumentSelector from "./components/intstumentSelector/InstrumentSelector";
import { useState } from "react";
import { AudioManager } from "./audio";
import { normalizeMaqam } from "./utils";


function App() {
	const audioManager = new AudioManager();
	const [instrument, setInstrument] = useState(INSTUMENTS.piano);
	const maqamList = Object.values(MAQAM_DATA).map((scale) => scale.name.toLowerCase());
	let showInstSelector  = false;

	const [isDark, setIsDark] = useLocalStorage("isDark", false)
	return (
		<div className="App" data-theme={isDark ? "dark" : "light"}>
			<DarkmodeSwitch isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
			<Header />
			{/* placeholder add this in later if needed, probably piano is enough for now */}
			{showInstSelector && <InstrumentSelector instrument={instrument} setInstrument={setInstrument} instruments={INSTUMENTS} />}

			<Nav maqamList={maqamList} />
			{MAQAM_DATA.map((maqam) => {

				const rootNote = Object.keys(maqam.rootNotes)[0]; // pick the first available root note

				const normalized = normalizeMaqam(maqam) as Maqam;
				const safeScale = {
					...normalized,
					rootNotes: Object.fromEntries(
						Object.entries(normalized.rootNotes).map(([k, v]) => [
							k,
							{ notes: v.notes ?? [], descendingNotes: v.descendingNotes },
						])
					),
				};

				return (
					<ScalePanel
						key={maqam.name}
						audioManager={audioManager}
						scale={safeScale}
						rootNote={rootNote}
						instrument={instrument}
					/>
				);
			})}
		</div>
	);
}

export default App;
