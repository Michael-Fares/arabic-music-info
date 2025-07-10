import * as Scale from "@tonaljs/scale";

console.log("All available scale names",Scale.names());

export function generateScale(scaleKeyAndScaleName: string | null) {
    if (!scaleKeyAndScaleName) {
        return [];
    }
    return [...Scale.get(scaleKeyAndScaleName).notes, Scale.get(scaleKeyAndScaleName).tonic];
}