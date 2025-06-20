/**
 * Factors by which to multiply a sample of a C note (0)
 * in order to pitch shift it other needed notes in 2 ocatves
 */
export const NOTE_VALUES = [
	{
		name: "C_4",
		value: 0,
	},
	{
		name: "Db_4",
		value: 1,
	},
	{
		name: "D_4",
		value: 2,
	},
	{
		name: "Eb_4",
		value: 3,
	},
	{
		name: "E_4",
		value: 4,
	},
	{
		name: "F_4",
		value: 5,
	},
	{
		name: "Gb_4",
		value: 6,
	},
	{
		name: "G_4",
		value: 7,
	},
	{
		name: "Ab_4",
		value: 8,
	},
	{
		name: "A_4",
		value: 9,
	},
	{
		name: "Bb_4",
		value: 10,
	},
	{
		name: "B_4",
		value: 11,
	},
	{
		name: "C_5",
		value: 12,
	},
	{
		name: "Db_5",
		value: 13,
	},
	{
		name: "D_5",
		value: 14,
	},
	{
		name: "Eb_5",
		value: 15,
	},
	{
		name: "E_5",
		value: 16,
	},
	{
		name: "F_5",
		value: 17,
	},
	{
		name: "Gb_5",
		value: 18,
	},
	{
		name: "G_5",
		value: 19,
	},
	{
		name: "Ab_5",
		value: 20,
	},
	{
		name: "A_5",
		value: 21,
	},
	{
		name: "Bb_5",
		value: 22,
	},
	{
		name: "B_5",
		value: 23,
	},
	{
		name: "C_6",
		value: 24,
	},
];


export const SCALE_DATA = {
	major: {
		name: "Major",
		keys: {
			C: {
				notes: ["C", "D", "E", "F", "G", "A", "B"],
			},
			F: {
				notes: ["F", "G", "A", "Bb", "C", "D", "E"],
			},
		},
	},
	rast: {
		name: "Rast",
		keys: {
			C: {
				notes: ["C", "D", "E-hf", "F", "G", "A", "B-hf"],
			},
			F: {
				notes: ["F", "G", "A-hf", "Bb", "C", "D", "E-hf"],
			},
		},
	},
};

export const INSTUMENTS = {
	piano: `${import.meta.env.BASE_URL}audio/piano.mp3`,
};


