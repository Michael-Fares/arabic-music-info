/**
 *
 * Check if a scale is half flat or not
 *
 */
export function isHalfFlat(notesInScale: Array<string>, note: { name: string }) {
	return notesInScale.includes(note.name + "-hf");
}

/**
 *
 * Given a Note Object from NOTE_VALUES
 * Transform it into it's corresponding quarter tone
 * E.g. make it half flat
 */
export function quarterize(note: NoteObject): NoteObject {
	return {
		name: note.name + "-hf",
		value: note.value - 0.5,
		octave: note.octave,
	};
}

/**
 *
 * Given a array of Note Objects (NOTE_VALUES),
 * return only the ones that should be played by the scalePanel play button
 * e.g. return only the "run" of 8 notes in the scale in order to be played
 * starting from it's root in the 4th octave
 *
 * noteValues  is an array of notes always same as NOTE_VALUES constant
 *
 * */
export function getNotesToPlay(noteValues: NoteObject[], notesInScale: Array<string>): NoteObject[] {
	console.log("notesInScale[0]", notesInScale[0]);
	const isSikah = notesInScale[0]?.includes("-hf");
	const firstNote = isSikah ? notesInScale[0].split("-")[0] : notesInScale[0];
	console.log("firstNote", firstNote);
	const startIndex = noteValues.findIndex(
		(note: NoteObject) => note.name === firstNote || quarterize(note).name === firstNote
	);
	console.log("startIndex", startIndex);

	const notesToPlay = noteValues
		.filter((note: NoteObject, index: number) => {
			if (index >= startIndex && index <= startIndex + 12) {
				if (
					notesInScale.includes(note.name) ||
					notesInScale.includes(quarterize(note).name)
				) {
					return true;
				}
			}
			return false;
		})
		.map((note: NoteObject) => (isHalfFlat(notesInScale, note) ? quarterize(note) : note));
		console.log("notesToPlay before return", notesToPlay);
	return notesToPlay;
}

// fix the any type for notesToPlay later
export function formatNotesForVexflowScore(notesToPlay: NoteObject[]) {
	const vfnotes = notesToPlay.map((note: NoteObject) => {
		const { name, octave, value } = note;
		const vfnote = `${name[0]}/${octave}`;
		let accidental = null;
		if (name.includes("b")) {
			accidental = "b";
		} 
		if (name.includes("hf") && !name.includes("b")) {
			accidental = "bs";
		} 
		if (name.includes("hf") && name.includes("b")) {
			// If it's half flat and also has a flat, we use a specific accidental
			// e.g "flat half flat" c
			accidental = "flat-half-flat";
		}
		return {
			vfnote,
			accidental,
			dataNoteName: name,
			dataNoteValue: value,
			dataOctave: octave,
		};
	});
	return vfnotes;
}
