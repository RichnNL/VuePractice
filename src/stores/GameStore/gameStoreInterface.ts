import { IGameStoreObject } from "./gameStoreObjectInterface";

export interface IGameStore   {
    setGame(game: IGameStoreObject): void
   
     getGame(): IGameStoreObject
}