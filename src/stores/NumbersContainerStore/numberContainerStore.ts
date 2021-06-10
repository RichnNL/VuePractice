import { singleton } from 'tsyringe';
import { Store } from '../store';
import { INumberContainerStore } from './numberContainerStoreInterface';
import { INumberContainerStoreObject, NumberContainer } from './numberStoreObjectInterface';

@singleton()
export default class NumbersContainerStore extends Store<INumberContainerStoreObject> implements INumberContainerStore {
  protected data(): INumberContainerStoreObject {
    return {
        numberContainer: []
    };
  }

  setContainer(numberContainer: NumberContainer) {
      let foundIndex = this.state.numberContainer.findIndex(x => x.index == numberContainer.index);
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
}
