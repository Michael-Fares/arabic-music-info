import * as Scale from "@tonaljs/scale";

console.log("All available scale names",Scale.names());

export function generateScale(scaleKeyAndScaleName: string | null): string[] {
    if (!scaleKeyAndScaleName) {
        return []
    }
    if (typeof scaleKeyAndScaleName === "string") {
        const scale = Scale.get(scaleKeyAndScaleName);
        return [...scale.notes, ...(typeof scale.tonic === "string" ? [scale.tonic] : [])];
    }
    return [];
}

// need to clean this up some
export class Transformer {

    static minorToBayati(minorScale: string[] | null): string[] | undefined {
        const quarterToneDegrees = [2]; 
        return minorScale?.map((note, index) => {
            if (quarterToneDegrees.includes(index + 1)) {
                return note + "-hf"; // Add half-flat to the 2nd and 7th notes
            }
            return note;
        });
    }
}