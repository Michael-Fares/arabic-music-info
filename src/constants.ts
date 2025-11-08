import { generateScale, Transformer } from "./scaleGenerator";

export const transformer = new Transformer();
console.log(transformer);
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

export const SCALE_DATA = {
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
	rast: {
		name: "Rast",
		nearestWesternScale: { asc: "major", desc: "mixolydian" },
		rootNotes: {
			C: {
				notes: Transformer.majorToRast(generateScale("C major")),
			},
			F: {
				notes: Transformer.majorToRast(generateScale("F major")),
			},
			G: {
				notes: Transformer.majorToRast(generateScale("G major")),
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
	bayati: {
		name: "Bayati",
		nearestWesternScale: "Minor",
		rootNotes: {
			D: {
				notes: Transformer.minorToBayati(generateScale("D minor")),
			},
			G: {
				notes: Transformer.minorToBayati(generateScale("G minor")),
			},
			A: {
				notes: Transformer.minorToBayati(generateScale("A minor")),
			},
		},
	},
	bayati_husayni: {
		name: "Bayati Husayni",
		nearestWesternScale: "Dorian",
		rootNotes: {
			D: {
				notes: Transformer.dorianToBayatiHusayni(generateScale("D dorian")),
			},
			G: {
				notes: Transformer.dorianToBayatiHusayni(generateScale("G dorian")),
			},
			A: {
				notes: Transformer.dorianToBayatiHusayni(generateScale("A dorian")),
			},
		},
	},
};

export const INSTUMENTS = {
	piano: "piano",
	violin: "violin",
	oud: "oud",
};
