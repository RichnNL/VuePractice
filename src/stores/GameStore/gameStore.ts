import { singleton } from 'tsyringe';
import { Store } from '../store';
import { IGameStore } from './gameStoreInterface';
import { IGameStoreObject } from './gameStoreObjectInterface';

@singleton()
export default class GameStore extends Store<IGameStoreObject> implements IGameStore {
  protected data(): IGameStoreObject {
    return {
        id: 0,
        difficulty: 'easy' ,
        userName: '',
        timeElapsed: 0
    };
  }

  setGame(game: IGameStoreObject) {
     this.state = game;
  }

  getGame() {
    return this.state;
  }
}
