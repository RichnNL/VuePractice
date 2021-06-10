
export interface IGameStoreObject extends Object {
    id: number
    difficulty: DifficultyType 
    userName: string
    timeElapsed: number
    [selector: string]: string | unknown[] | unknown;
}

export type DifficultyType = 'easy' | 'medium' | 'hard'
