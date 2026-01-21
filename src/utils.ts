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
export function getNotesToPlay(noteValues: NoteObject[], notesInScale: string[]): NoteObject[] {
	
	const isSikah = notesInScale[0]?.includes("-hf");
	const firstNote = isSikah ? notesInScale[0].split("-")[0] : notesInScale[0];
	
	const startIndex = noteValues.findIndex(
		(note: NoteObject) => note.name === firstNote || quarterize(note).name === firstNote
	);
	

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
		
	return notesToPlay;
}

export function uppercase(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
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

/**
 * return an array of all "safe" keyboard notes in the current scale or maqam
 * which will be an array of length 14 if no descending variant, and an array of length 16 otherwise.
 */
export function getAutoMusicalTypingNoteSet(noteValues: NoteObject[], notesInScale: string[] | any[], descendingNotesInScale: string[] | any[]) : NoteObject[] | undefined {
	if (!notesInScale.length) return
	let result;
	/**
	 * filter the needed set of 14 or 16
	 */
	if (!descendingNotesInScale.length) {
		result = noteValues.filter((note: NoteObject) => {
			const { name } = note;
			return notesInScale.includes(name) || notesInScale.includes(name + "-hf");
		})
	} else {
		result = noteValues.filter((note: NoteObject) => {
			const { name } = note;
			// const descendingVariantNoteName = descendingNotesInScale.find(noteName => !notesInScale.includes(noteName))
			return notesInScale.includes(name) || notesInScale.includes(name + "-hf") || descendingNotesInScale.includes(name) || descendingNotesInScale.includes(name + "-hf");
		})
	}
	/**
	 * use map to apply quarterize the note value if it is half-flat / a quater tone 
	 */
	return result.map((note: NoteObject) => (isHalfFlat(notesInScale, note) ? quarterize(note) : note));	
}
