type NoteObject = {
    name: string,
    value: number,
    octave: number
}

type Scale = {
    name: string,
    isMaqam: boolean;
    descendingScaleVariantDegree?: number | undefined,
    rootNotes: Record<string, { notes?: string[], descendingNotes?: string[] }>
}

type ComparisonWesternScale = "major" | "mixolydian" | "minor" |  "dorian" | "harmonic minor" | "phrygian" | "phrygian dominant" | null;
type ComparisonMaqam = "rast" | "bayati" | "hijaz" | null;

