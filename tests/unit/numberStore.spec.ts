import 'reflect-metadata';
import NumbersContainerStore from "@/stores/NumbersContainerStore/numberContainerStore";
import { container } from "tsyringe";
import NumberContainersDataHandler from '@/dataHandler/numberContainerDataHandler';

const numbersContainerStore = container.resolve(NumbersContainerStore);
const numberContainersDataHandler = container.resolve(NumberContainersDataHandler);




describe('Numbers Container store', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    numbersContainerStore.resetStore();
  });

  it('should add addition number to main number', () => {
    // Arrange
    numberContainersDataHandler.createNumberContainer(1);
    const number = numbersContainerStore.getContainer(0)?.mainNumber;
    const additionNumber = numbersContainerStore.getContainer(0)?.additionNumber;

    // Act
    numberContainersDataHandler.addNumber(0);

    // Assert
    expect(number).not.toBeNull();
    expect(additionNumber).not.toBeNull();
    expect(numbersContainerStore.getContainer(0)?.mainNumber).toEqual(number! + additionNumber!);
  });

  it('moving up numbers should make the first number the last number of the last container', () => {
    // Arrange
    numberContainersDataHandler.createNumberContainer(1);
    const additionNumber = numbersContainerStore.getContainer(0)?.additionNumber;

    // Act
    numberContainersDataHandler.moveNumbersUp();

    // Assert
    expect(additionNumber).not.toBeNull();
    expect(numbersContainerStore.getContainer(0)?.divisionNumber).not.toBeNull();
    expect(numbersContainerStore.getContainer(0)?.divisionNumber).toEqual(additionNumber!);
  });
});
