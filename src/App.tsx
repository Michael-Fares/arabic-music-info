import "./App.css";
import useLocalStorage from "use-local-storage";
import { SCALE_DATA, INSTUMENTS } from "./constants";
import MaqamBoard from "./components/maqamBoard/MaqamBoard";
import Nav from "./components/nav/Nav";
import Header from "./components/header/Header";
import DarkmodeSwitch from "./components/darkmodeSwitch/DarkmodeSwitch";
import InstrumentSelector from "./components/instrumentSelector/InstrumentSelector";
import { useState } from "react";
import { AudioManager } from "./audio";
import Legend from "./components/legend/Legend";


function App() {
	const audioManager = new AudioManager();
	const [instrument, setInstrument] = useState(INSTUMENTS.piano);
	const [isDark, setIsDark] = useLocalStorage("isDark", false);

	const maqams = SCALE_DATA.filter((scale) => scale.isMaqam);
	const maqamList = maqams.map((maqam) => maqam.name.toLowerCase());

	let showInstSelector = false;

	return (
		<div className="App" data-theme={isDark ? "dark" : "light"}>
			<DarkmodeSwitch
				isChecked={isDark}
				handleChange={() => setIsDark(!isDark)}
			/>
			<Header />
			{/* placeholder add this in later if needed, probably piano is enough for now */}
			{showInstSelector && (
				<InstrumentSelector
					instrument={instrument}
					setInstrument={setInstrument}
					instruments={INSTUMENTS}
				/>
			)}

			<Nav maqamList={maqamList} />

			{/* <Legend /> */}

			{maqams.map((scale: Scale) => {
				return (
					<MaqamBoard
						key={scale.name}
						audioManager={audioManager}
						scale={scale}
						instrument={instrument}
					/>
				);
			})}
		</div>
	);
}

export default App;
