import "./App.css";
import useLocalStorage from "use-local-storage";
import { SCALE_DATA, INSTUMENTS } from "./constants";
import MaqamBoard from "./components/maqamBoard/MaqamBoard";
import Nav from "./components/nav/Nav";
import Header from "./components/header/Header";
import DarkmodeSwitch from "./components/darkmodeSwitch/DarkmodeSwitch";
import InstrumentSelector from "./components/instrumentSelector/InstrumentSelector";
import { useState, useEffect } from "react";
import { AudioManager } from "./audio";
import Legend from "./components/legend/Legend";


function App() {
	const audioManager = new AudioManager();
	const [instrument, setInstrument] = useState(INSTUMENTS.piano);
	const [isDark, setIsDark] = useLocalStorage("isDark", false);

	const [activePiano, setActivePiano] = useState<ScaleId>(null);

	const maqams = SCALE_DATA.filter((scale) => scale.isMaqam);
	const maqamList = maqams.map((maqam) => maqam.name.toLowerCase());

	let showInstSelector = false;

	useEffect(() => {
		const handleGlobalKeyDown = (event: KeyboardEvent) => {
		  // If no piano is selected, do nothing
		  if (!activePiano) return;
	
		  // Logic to trigger sound based on activePiano ID
		  console.log(`Global listener triggering ${activePiano} with key: ${event.key}`);
		};
	
		window.addEventListener('keydown', handleGlobalKeyDown);
	
		// Cleanup: Remove listener if component unmounts or activePiano changes
		return () => {
		  window.removeEventListener('keydown', handleGlobalKeyDown);
		};
	  }, [activePiano]); // Re-run effect when activePiano changes

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
						activePiano={activePiano}
						setActivePiano={setActivePiano}
					/>
				);
			})}
		</div>
	);
}

export default App;
