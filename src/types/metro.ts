export type MetroStation = {
    id: string,
    name: string
}

export type MetroLines = {
    stations: MetroStation[],
    id: string, 
}

export type Metro = {
    lines: MetroLines[]
}
