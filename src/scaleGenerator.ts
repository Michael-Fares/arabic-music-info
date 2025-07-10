import * as Scale from "@tonaljs/scale";

console.log("scale.get c major", );

export function generateScale(scaleKeyAndScaleName: string | null) {
    if (!scaleKeyAndScaleName) {
        return [];
    }
    return [...Scale.get(scaleKeyAndScaleName).notes, Scale.get(scaleKeyAndScaleName).tonic];
}