import NumbersContainerStore from '@/stores/NumbersContainerStore/numberContainerStore';
import { INumberContainerStore } from '@/stores/NumbersContainerStore/numberContainerStoreInterface';
import { inject, singleton } from 'tsyringe';

@singleton()
export default class NumberContainersDataHandler {

  constructor(@inject(NumbersContainerStore) protected NumbersContainerStore: INumberContainerStore) {}

  createNumberContainer(amount: number){
      for(var index = 0; index  < amount; index++ ){
          const mainNumber = Math.floor(Math.random() * 90) + 10;
            this.NumbersContainerStore.setContainer({
                mainNumber,
                additionNumber: Math.floor(Math.random() * mainNumber) + 1,
                subtractionNumber: Math.floor(Math.random() * mainNumber) + 1,
                mulitplicationNumber: Math.floor((Math.random() * mainNumber) / 3) + 1,
                divisionNumber: Math.floor((Math.random() * mainNumber) / 3) + 2,
                index
            });
      }
  }

}
