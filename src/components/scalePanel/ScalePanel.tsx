import ScaleInfoBar from "../scaleInfoBar/ScaleInfoBar";
import '../scalePanel/scalePanel.css';
import Keyboard from "../keyboard/Keyboard";


function ScalePanel({ audioManager, scale, root, setRoot, instrument }) {
	return (
		<div className="scale-panel" id={`${scale.name.split(" ").join("-").toLowerCase()}`} data-scale-and-key={`${scale.name}-${root}`}>
			<ScaleInfoBar
				audioManager={audioManager}
				scale={scale}
				root={root}
				setRoot={setRoot}
				instrument={instrument}
			/>
			<Keyboard
				audioManager={audioManager}
				scale={scale}
				root={root}
				instrument={instrument}
			/>
		</div>
	);
}
export default ScalePanel;
