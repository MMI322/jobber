export type Station = {
    id: string,
    name: string
}

export type Lines = {
    stations: Station[],
    id: string, 
}

export type Metro = {
    lines: Lines[]
}
