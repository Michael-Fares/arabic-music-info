import { generateScale, Transformer } from "./scaleGenerator";

export const transformer = new Transformer();

/**
 * Factors by which to multiply a sample of a C note (0)
 * in order to pitch shift it other needed notes in 2 ocatves
 */
export const NOTE_VALUES = [
	{
		name: "C",
		value: 0,
		octave: 4,
	},
	{
		name: "Db",
		value: 1,
		octave: 4,
	},
	{
		name: "D",
		value: 2,
		octave: 4,
	},
	{
		name: "Eb",
		value: 3,
		octave: 4,
	},
	{
		name: "E",
		value: 4,
		octave: 4,
	},
	{
		name: "F",
		value: 5,
		octave: 4,
	},
	{
		name: "Gb",
		value: 6,
		octave: 4,
	},
	{
		name: "G",
		value: 7,
		octave: 4,
	},
	{
		name: "Ab",
		value: 8,
		octave: 4,
	},
	{
		name: "A",
		value: 9,
		octave: 4,
	},
	{
		name: "Bb",
		value: 10,
		octave: 4,
	},
	{
		name: "B",
		value: 11,
		octave: 4,
	},
	{
		name: "C",
		value: 12,
		octave: 5,
	},
	{
		name: "Db",
		value: 13,
		octave: 5,
	},
	{
		name: "D",
		value: 14,
		octave: 5,
	},
	{
		name: "Eb",
		value: 15,
		octave: 5,
	},
	{
		name: "E",
		value: 16,
		octave: 5,
	},
	{
		name: "F",
		value: 17,
		octave: 5,
	},
	{
		name: "Gb",
		value: 18,
		octave: 5,
	},
	{
		name: "G",
		value: 19,
		octave: 5,
	},
	{
		name: "Ab",
		value: 20,
		octave: 5,
	},
	{
		name: "A",
		value: 21,
		octave: 5,
	},
	{
		name: "Bb",
		value: 22,
		octave: 5,
	},
	{
		name: "B",
		value: 23,
		octave: 5,
	},
];

export const MAQAM_DATA = [
	{
		name: "Rast",
		nearestWesternScale: { asc: "major", desc: "mixolydian" },
		descendingScaleVariantDegree: 7,
		rootNotes: {
			C: {
				notes: Transformer.majorToRast(generateScale("C major")),
				descendingNotes: Transformer.mixolydianToRast(
					generateScale("C mixolydian")
				),
			},
			F: {
				notes: Transformer.majorToRast(generateScale("F major")),
				descendingNotes: Transformer.mixolydianToRast(
					generateScale("F mixolydian")
				),
			},
			G: {
				notes: Transformer.majorToRast(generateScale("G major")),
				descendingNotes: Transformer.mixolydianToRast(
					generateScale("G mixolydian")
				),
			},
		},
	},
	{
		name: "Bayati",
		nearestWesternScale: { asc: "dorian", desc: "minor" },
		descendingScaleVariantDegree: 6,
		rootNotes: {
			D: {
				notes: Transformer.dorianToBayati(generateScale("D dorian")),
				descendingNotes: Transformer.minorToBayati(generateScale("D minor")),
			},
			G: {
				notes: Transformer.dorianToBayati(generateScale("G dorian")),
				descendingNotes: Transformer.minorToBayati(generateScale("G minor")),
			},
			A: {
				notes: Transformer.dorianToBayati(generateScale("A dorian")),
				descendingNotes: Transformer.minorToBayati(generateScale("A minor")),
			},
		},
	},
	{
		name: "Hijaz",
		descendingScaleVariantDegree: 6,
		rootNotes: {
			D: {
				// add jins rast as 2nd half of ascending hijaz scale
				notes: (generateScale("D phrygian dominant") || [])
					.slice(0, 5)
					.concat(
						(Transformer.majorToRast(generateScale("G major")) || []).slice(
							0,
							4
						)
					),
				descendingNotes: generateScale("D phrygian dominant"),
			},
			G: {
				notes: (generateScale("G phrygian dominant") || [])
					.slice(0, 5)
					.concat(
						(Transformer.majorToRast(generateScale("C major")) || []).slice(
							0,
							4
						)
					),
				descendingNotes: generateScale("G phrygian dominant"),
			},
			A: {
				notes: (generateScale("A phrygian dominant") || [])
					.slice(0, 5)
					.concat(
						(Transformer.majorToRast(generateScale("D major")) || []).slice(
							0,
							4
						)
					),
				descendingNotes: generateScale("A phrygian dominant") || [],
			},
		},
	},
	{
		name: "Nahawand",
		descendingScaleVariantDegree: 7,
		rootNotes: {
			C: {
				notes: generateScale("C harmonic minor"),
				descendingNotes: generateScale("C minor"),
			},
			D: {
				notes: generateScale("D harmonic minor"),
				descendingNotes: generateScale("D minor"),
			},
			G: {
				notes: generateScale("G harmonic minor"),
				descendingNotes: generateScale("G minor"),
			},
			A: {
				notes: generateScale("A harmonic minor"),
				descendingNotes: generateScale("A minor"),
			},
		},
	},
	{
		name: "Saba",
		rootNotes: {
			D: {
				notes: (Transformer.minorToBayati(generateScale("D minor")) || [])
					.slice(0, 2)
					.concat((generateScale("F phrygian dominant") || []).slice(0, 5)),
				descendingNotes: (
					Transformer.minorToBayati(generateScale("D minor")) || []
				)
					.slice(0, 2)
					.concat((generateScale("F phrygian dominant") || []).slice(0, 5)),
			},
			G: {
				notes: (Transformer.minorToBayati(generateScale("G minor")) || [])
					.slice(0, 2)
					.concat((generateScale("Bb phrygian dominant") || []).slice(0, 5))
					.map((note) => (note === "Cb" ? "B" : note)),
				descendingNotes: (
					Transformer.minorToBayati(generateScale("G minor")) || []
				)
					.slice(0, 2)
					.concat((generateScale("Bb phrygian dominant") || []).slice(0, 5))
					.map((note) => (note === "Cb" ? "B" : note)),
			},
			A: {
				notes: (Transformer.minorToBayati(generateScale("A minor")) || [])
					.slice(0, 2)
					.concat((generateScale("C phrygian dominant") || []).slice(0, 5)),
				descendingNotes: (
					Transformer.minorToBayati(generateScale("A minor")) || []
				)
					.slice(0, 2)
					.concat((generateScale("C phrygian dominant") || []).slice(0, 5)),
			},
		},
	},
	{
		name: "Kurd",
		rootNotes: {
			D: {
				notes: generateScale("D phrygian"),
				descendingNotes: generateScale("D phrygian"),
			},
			G: {
				notes: generateScale("G phrygian"),
				descendingNotes: generateScale("G phrygian"),
			},
			A: {
				notes: generateScale("A phrygian"),
				descendingNotes: generateScale("A phrygian"),
			},
		},
	},
	{
		name: "Ajam",
		descendingScaleVariantDegree: 7,
		rootNotes: {
			C: {
				notes: generateScale("C major"),
				descendingNotes: generateScale("C mixolydian"),
			},
			F: {
				notes: generateScale("F major"),
				descendingNotes: generateScale("F mixolydian"),
			},
			G: {
				notes: generateScale("G major"),
				descendingNotes: generateScale("G mixolydian"),
			},
		},
	},
	{
		name: "Sikah",
		rootNotes: {
			// hard coded because it's clearer that sikah always starts with a half flat note
			"E-hf": {
				notes: ["E-hf", "F", "G", "Ab", "B", "C", "D", "E-hf"],
				descendingNotes: ["E-hf", "F", "G", "Ab", "B", "C", "D", "E-hf"],
			},
			"B-hf": {
				notes: ["B-hf", "C", "D", "Eb", "Gb", "G", "A", "B-hf"],
				descendingNotes: ["B-hf", "C", "D", "Eb", "Gb", "G", "A", "B-hf"],
			},
		},
	},
];

export const WESTERN_SCALES = {
	major: {
		name: "Major",
		rootNotes: {
			C: {
				notes: generateScale("C major"), // ["C", "D", "E", "F", "G", "A", "B", "C"],
			},
			F: {
				notes: generateScale("F major"), // ["F", "G", "A", "Bb", "C", "D", "E", "F"],
			},
			G: {
				notes: generateScale("G major"), // ["G", "A", "B", "C", "D", "E", "F#", "G"],
			},
		},
	},
	minor: {
		name: "Minor",
		rootNotes: {
			C: {
				notes: generateScale("C minor"),
			},
			D: {
				notes: generateScale("D minor"),
			},
			G: {
				notes: generateScale("G minor"),
			},
			A: {
				notes: generateScale("A minor"),
			},
		},
	},
};

export const INSTUMENTS = {
	piano: "piano",
	violin: "violin",
	oud: "oud",
};
