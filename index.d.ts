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
}