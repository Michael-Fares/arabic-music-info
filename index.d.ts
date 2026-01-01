interface NoteObject {
    name: string,
    value: number,
    octave: number
}

interface Scale {
    name: string,
    isMaqam: boolean;
    descendingScaleVariantDegree: number | undefined,
    rootNotes: Record<string, { notes?: string[], descendingNotes?: string[] }>
    description: string;
    comparisonWesternScaleNames?: Partial<comparisonWesternScaleNames>;
}


type Direction = "asc" | "desc" | "both";

type comparisonWesternScaleNames = Partial<Record<Direction, {
    name: string;
    same: boolean;
    withDegreesAsQuarterTones?: string[];
}>>;



