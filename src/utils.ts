/**
 *
 * Check if a scale is half flat or not
 *
 */
export function isHalfFlat(notesInScale, note) {
	return notesInScale.includes(note.name + "-hf");
}

/**
 *
 * Given a Note Object from NOTE_VALUES
 * Transform it into it's corresponding quarter tone
 * E.g. make it half flat
 */

export function quarterize(note) {
	return {
		...note,
		name: note.name + "-hf",
		value: note.value - 0.5,
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
export function getNotesToPlay(noteValues, notesInScale: Array<string>) {
	const firstNote = notesInScale[0];
	const startIndex = noteValues.findIndex(
		(note) => note.name === firstNote || quarterize(note.name) === firstNote
	);

	const notesToPlay = noteValues
		.filter((note, index) => {
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
		.map((note) => (isHalfFlat(notesInScale, note) ? quarterize(note) : note));
	return notesToPlay;
}
