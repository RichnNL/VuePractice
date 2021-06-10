import {NumberContainer } from "./numberStoreObjectInterface";

export interface INumberContainerStore   {
         setContainer(game: NumberContainer): void
   
         getContainer(index: number): NumberContainer | undefined
}