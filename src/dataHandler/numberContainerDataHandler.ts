import { IGameStoreObject } from '@/stores/GameStore/gameStoreObjectInterface';
import NumbersContainerStore from '@/stores/NumbersContainerStore/numberContainerStore';
import { INumberContainerStore } from '@/stores/NumbersContainerStore/numberContainerStoreInterface';
import { inject, singleton } from 'tsyringe';
import axios from 'axios';

@singleton()
export default class NumberContainersDataHandler {

  constructor(@inject(NumbersContainerStore) protected numbersContainerStore: INumberContainerStore) {}
  

  createNumberContainer(amount: number){
      for(let index = 0; index  < amount; index++ ){
          const mainNumber = Math.floor(Math.random() * 90) + 10;
            this.numbersContainerStore.setContainer({
                mainNumber,
                additionNumber: Math.floor(Math.random() * mainNumber) + 1,
                subtractionNumber: Math.floor(Math.random() * mainNumber) + 1,
                mulitplicationNumber: Math.floor((Math.random() * mainNumber) / 3) + 1,
                divisionNumber: Math.floor((Math.random() * mainNumber) / 3) + 2,
                index,
                points: 0,
                finished: false
            });
      }
  }
  switchAddSubtract(index: number): boolean {
    const container = this.numbersContainerStore.getContainer(index);
    if(container){
      const tempValue = container.additionNumber;
      container.additionNumber = container.subtractionNumber;
      container.subtractionNumber = tempValue;
      return true;
    }

    return false;
  }

  switchSubtractMultiply(index: number) {
    const container = this.numbersContainerStore.getContainer(index);
    if(container){
      const tempValue = container.mulitplicationNumber;
      container.mulitplicationNumber = container.subtractionNumber;
      container.subtractionNumber = tempValue;
      return true;
    }

    return false;
  }

  switchMultiplyDivide(index: number) {
    const container = this.numbersContainerStore.getContainer(index);
    if(container){
      const tempValue = container.mulitplicationNumber;
      container.mulitplicationNumber = container.divisionNumber;
      container.divisionNumber = tempValue;
      return true;
    }
    return false;
  }

  pointsChanged(index: number, points: number) {
    const container = this.numbersContainerStore.getContainer(index);
    if(container){
      container.points = points;
      const totalPoints  = this.numbersContainerStore.getAll().map(x => x.points).reduce((current, next) => current + next, 0);
      this.numbersContainerStore.setTotalPoints(totalPoints);
      this.numbersContainerStore.setContainer(container);
      return true;
    }
    return false;
  }

  addNumber(index: number){
    const container = this.numbersContainerStore.getContainer(index);
    if(container){
      container.mainNumber = container.mainNumber + container.additionNumber;
      this.numbersContainerStore.setContainer(container);
    }
  }

  subtractNumber(index: number){
    const container = this.numbersContainerStore.getContainer(index);
    if(container){
      container.mainNumber = container.mainNumber - container.subtractionNumber;
      this.numbersContainerStore.setContainer(container);
    }
  }
  multiplyNumber(index: number){
    const container = this.numbersContainerStore.getContainer(index);
    if(container){
      container.mainNumber = container.mainNumber * container.mulitplicationNumber;
      this.numbersContainerStore.setContainer(container);
    }
  }
  divideNumber(index: number){
    const container = this.numbersContainerStore.getContainer(index);
    if(container){
      container.mainNumber = container.mainNumber % container.divisionNumber;
      this.numbersContainerStore.setContainer(container);
    }
  }
  moveNumbersUp(){
    const containers = this.numbersContainerStore.getAll();
    if(containers.length < 0){
      return;
    }

    const tempFirst = containers[0].additionNumber;
    for(let i = 0; i < containers.length; i++){
        const tempContainer = containers[i];
       tempContainer.additionNumber = containers[i].subtractionNumber;
       tempContainer.subtractionNumber = containers[i].mulitplicationNumber;
        tempContainer.mulitplicationNumber = containers[i].divisionNumber;
        if(i == containers.length - 1 ){
          tempContainer.divisionNumber = tempFirst;
        }else {
          tempContainer.divisionNumber = containers[i + 1].additionNumber;
        }
        this.numbersContainerStore.setContainer(tempContainer);
    }
    this.numbersContainerStore.setTotalPoints(this.numbersContainerStore.getTotalPoints() - containers.length)
  }
  moveNumbersDown(){
    const containers = this.numbersContainerStore.getAll();
    if(containers.length < 0){
      return;
    }

    const tempLast = containers[containers.length - 1].divisionNumber;
    for(let i = containers.length - 1; i >=  0 ; i--){
        const tempContainer = containers[i];
       tempContainer.divisionNumber = containers[i].mulitplicationNumber;
       tempContainer.mulitplicationNumber = containers[i].subtractionNumber;
        tempContainer.subtractionNumber = containers[i].additionNumber;
        if(i == 0 ){
          tempContainer.additionNumber = tempLast;
        }else {
          tempContainer.additionNumber = containers[i - 1].divisionNumber;
        }
        this.numbersContainerStore.setContainer(tempContainer);
    }
    this.numbersContainerStore.setTotalPoints(this.numbersContainerStore.getTotalPoints() - containers.length)
  }

  finished(index: number){
    const container = this.numbersContainerStore.getContainer(index);
    if(container == undefined){
      return;
    }

    this.numbersContainerStore.setContainer({...container, finished: true});
    const notFinished = this.numbersContainerStore.getAll().findIndex(x => !x.finished);
    if(notFinished == -1){
      this.numbersContainerStore.setFinished();
    }
  }

  async saveGame(game: IGameStoreObject){
     const response = await axios.post("https://localhost:44384/GameHistory", {...game,  points: this.numbersContainerStore.getTotalPoints(), totalMoves: 0});
      if(!(response.status >= 200 && response.status < 300)){
          return false;
        }
      return response.data
  }



}
