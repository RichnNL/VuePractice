
export interface INumberContainerStoreObject extends Object {
    numberContainer: NumberContainer[]
    points: number,
    finished: boolean,
    [selector: string]: string | unknown[] | unknown;
}

export interface  NumberContainer {
    mainNumber: number
    additionNumber: number
    subtractionNumber: number
    mulitplicationNumber: number
    divisionNumber: number
    index: number
    points : number
    finished: boolean
}
