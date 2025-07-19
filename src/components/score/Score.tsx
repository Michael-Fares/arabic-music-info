import { useEffect, useRef } from "react";
import { NOTE_VALUES } from "../../constants";
import { getNotesToPlay, formatNotesForVexflowScore } from "../../utils";
import Vex from "vexflow";

function Score({ scale, rootNote }) {
	const notesInScale = scale.rootNotes[rootNote].notes;
	const notesToPlay = getNotesToPlay(NOTE_VALUES, notesInScale);
	const vexFlowContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (vexFlowContainerRef.current !== null) {
			const container = vexFlowContainerRef.current;
            const vfnotes = formatNotesForVexflowScore(notesToPlay);
		}
	});

	return (
		<div
            id={`${scale.name}-${rootNote}`}
			ref={vexFlowContainerRef}
		/>
	);
}
export default Score;
