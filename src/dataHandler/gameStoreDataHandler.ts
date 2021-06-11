import GameStore from '@/stores/GameStore/gameStore';
import { IGameStore } from '@/stores/GameStore/gameStoreInterface';
import { DifficultyType,  } from '@/stores/GameStore/gameStoreObjectInterface';
import { inject, singleton } from 'tsyringe';

@singleton()
export default class GameStoreDataHandler {

  constructor(@inject(GameStore) protected GameStore: IGameStore) {}

  createNewGame(userName: string, difficulty: DifficultyType){
      const newGameId = Math.floor(Math.random() * 999) + 1;
      this.GameStore.setGame({
          id: newGameId,
          userName,
          difficulty,
          timeElapsed: 0
      })
  }

  setTimeElapse(time: number){
    this.GameStore.setGame({...this.GameStore.getGame(), timeElapsed: time})
  }

}
