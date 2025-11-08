import * as Scale from "@tonaljs/scale";
import * as Note from "@tonaljs/note";

// console.log("All available scale names", Scale.names());

export function generateScale(scaleKeyAndScaleName: string | null): string[] {
	if (!scaleKeyAndScaleName) {
		return [];
	}
	if (typeof scaleKeyAndScaleName === "string") {
		const scale = Scale.get(scaleKeyAndScaleName);
		return [
			...scale.notes.map((note) => {
				// conver #'s to nearest flat note
				// e.g. "C#" to "Db"
				return note.includes("#") ? Note.enharmonic(note) : note;
			}),
			...(typeof scale.tonic === "string" ? [scale.tonic] : []),
		];
	}
	return [];
}

// need to clean this up some
export class Transformer {
	static quarterToneDegreesMajorToRast = [3, 7];
	static quarterToneDegreesMixolydianToRast = [3];
	static quarterToneDegreesMinorToBayati = [2];
	static quarterToneDegreesDorianToBayati = [2, 6];
	static transform(
		degrees: number[],
		scale: string[] | null
	): string[] | undefined {
		if (!scale) return undefined;
		return scale.map((note, index) => {
			if (degrees.includes(index + 1)) {
				return note + "-hf"; // Add half-flat to the note at the specified degree
			}
			return note;
		});
	}
	static majorToRast(majorScale: string[] | null): string[] | undefined {
		return this.transform(this.quarterToneDegreesMajorToRast, majorScale);
	}
	static mixolydianToRast(mixolydianScale: string[] | null): string[] | undefined {
		return this.transform(this.quarterToneDegreesMixolydianToRast, mixolydianScale);
	}
	static minorToBayati(minorScale: string[] | null): string[] | undefined {
		return this.transform(this.quarterToneDegreesMinorToBayati, minorScale);
	}
	static dorianToBayati(dorianScale: string[] | null): string[] | undefined {
		return this.transform(this.quarterToneDegreesDorianToBayati, dorianScale);
	}
}
