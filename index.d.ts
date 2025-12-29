interface NoteObject {
    name: string,
    value: number,
    octave: number
}

interface Maqam {
    name: string,
    descendingScaleVariantDegree: number | undefined,
    rootNotes: Record<string, { notes?: string[], descendingNotes?: string[] }>
    description: string;
}