import { generateScale } from "./scaleGenerator";


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
	{
		name: "C",
		value: 24,
		octave: 6,
	},
];

export const SCALE_DATA = {
	major: {
		name: "Major",
		rootNotes: {
			C: {
				notes: generateScale("C major") // ["C", "D", "E", "F", "G", "A", "B", "C"],
			},
			F: {
				notes: generateScale("F major") // ["F", "G", "A", "Bb", "C", "D", "E", "F"],
			},
		},
	},
	rast: {
		name: "Rast",
		rootNotes: {
			C: {
				notes: ["C", "D", "E-hf", "F", "G", "A", "B-hf", "C"],
			},
			F: {
				notes: ["F", "G", "A-hf", "Bb", "C", "D", "E-hf", "F"],
			},
		},
	},
};

export const INSTUMENTS = {
	piano: "piano",
};

