import { singleton } from 'tsyringe';
import { Store } from '../store';
import { INumberContainerStore } from './numberContainerStoreInterface';
import { INumberContainerStoreObject, NumberContainer } from './numberStoreObjectInterface';

@singleton()
export default class NumbersContainerStore extends Store<INumberContainerStoreObject> implements INumberContainerStore {
  protected data(): INumberContainerStoreObject {
    return {
        numberContainer: [],
        points: 0,
        finished: false
    };
  }

  setContainer(numberContainer: NumberContainer) {
      const foundIndex = this.state.numberContainer.findIndex(x => x.index == numberContainer.index);
      if(foundIndex == -1) {
        this.state.numberContainer.push()
        this.state.numberContainer.push(numberContainer);
      }else {
        this.state.numberContainer[foundIndex] = numberContainer;
      }
  }

  getContainer(index: number): NumberContainer | undefined{
    return this.state.numberContainer.find(x => x.index == index)
  }

  getAll(): NumberContainer[] {
    return this.state.numberContainer;
  }

  setTotalPoints(points: number) {
    this.state.points = points;
  }

  getTotalPoints(){
    return this.state.points;
  }
  setFinished(){
    this.state.finished = true;
  }
}
