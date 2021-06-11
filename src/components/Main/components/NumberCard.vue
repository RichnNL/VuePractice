<template>
  <div class="container">
    <div
      :class="{
        color_100: numbers.points == 100,
        color_80: numbers.points == 80,
        color_60: numbers.points == 60,
        color_40: numbers.points == 40,
        color_20: numbers.points == 20,
        color_0: numbers.points == 0,
        main_number: true,
      }"
    > 
      <p>{{ numbers.mainNumber }}</p>
    </div>
    <div class="inner_container">
      <div class="math_sign">
        <div class="math_block" @click="add">
          {{ numbers.additionNumber }}
        </div>
        <div>+</div>
      </div>
      <div class="math_sign">
        <div  :class="{ math_block: subtractable, math_block_disabled: !subtractable }" @click="subtract">
          {{ numbers.subtractionNumber }}
        </div>
        <div>-</div>
      </div>
      <div class="math_sign">
        <div class="math_block" @click="multiply">
          {{ numbers.mulitplicationNumber }}
        </div>
        <div>x</div>
      </div>
      <div class="math_sign">
        <div
          :class="{ math_block: divisble, math_block_disabled: !divisble }"
          @click="divide"
        >
          {{ numbers.divisionNumber }}
        </div>
        <div>÷</div>
      </div>
    </div>
    <div class="side_container">
      <div class="math_block" @click="switchAddSubtract">Switch</div>
      <div class="math_block" @click="switchSubtractMultiply">Switch</div>
      <div class="math_block" @click="switchMultiplyDivide">Switch</div>
    </div>
    <div
      style="
        display: inline-block;
        position: absolute;
        right: 10px;
        white-space: nowrap;
        align-self: flex-end;
      "
    >
      Moves: {{ moves }}
    </div>
  </div>
</template>

<script lang='ts'>
import NumberContainersDataHandler from "@/dataHandler/numberContainerDataHandler";
import { NumberContainer } from "@/stores/NumbersContainerStore/numberStoreObjectInterface";
import { container } from "tsyringe";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "NumberCard",
  props: {
    numbers: Object as PropType<NumberContainer>,
    parentMoves: Number
  },
  setup() {
    const numberContainerDataHandler = container.resolve(
      NumberContainersDataHandler
    );

    return { numberContainerDataHandler };
  },
  data() {
    return {
      moves: 0,
      divisble: true,
      subtractable: true,
    };
  },
  methods: {
    switchAddSubtract() {
      if (
        this.numberContainerDataHandler.switchAddSubtract(this.numbers!.index)
      ) {
        this.moves++;
        this.checkNumber()
      }
    },
    switchSubtractMultiply() {
      if (
        this.numberContainerDataHandler.switchSubtractMultiply(
          this.numbers!.index
        )
      ) {
        this.moves++;
        this.checkNumber()
      }
    },
    switchMultiplyDivide() {
      if (this.numberContainerDataHandler.switchMultiplyDivide(this.numbers!.index)) {
        this.moves++;
        this.checkNumber()
      }
    },
    add(){  
      this.numberContainerDataHandler.addNumber(this.numbers!.index)
         this.checkNumber()
    },
    subtract(){
      if(this.subtractable){
        this.numberContainerDataHandler.subtractNumber(this.numbers!.index)
           this.checkNumber()
      }
    },
    multiply(){
      this.numberContainerDataHandler.multiplyNumber(this.numbers!.index)
         this.checkNumber()
    },
    divide(){
      if(this.divisble){
        this.numberContainerDataHandler.divideNumber(this.numbers!.index)
        this.checkNumber()
      }
    },
    checkNumber(){
if(this.numbers ) {
          const dividedResult = this.numbers.mainNumber / this.numbers!.divisionNumber;
          if (dividedResult % 1 == 0 && dividedResult != Infinity) {
            this.divisble = true;
          } else {
            this.divisble = false;
          }
  
          if(this.numbers.mainNumber - this.numbers!.subtractionNumber < 0){
            this.subtractable = false;
          }else {
            this.subtractable = true;
          }
  
          let points = 0; 
          this.moves++;
          if (this.numbers.mainNumber == 0) {
            points = 100;
          } else if (this.numbers.mainNumber == 1) {
            points = 80;
          } else if (this.numbers.mainNumber > 1 && this.numbers.mainNumber <= 5) {
            points = 60;
          } else if (this.numbers.mainNumber >= 24 && this.numbers.mainNumber <= this.numbers.mainNumber / 4) {
            points = 40;
          } else if (this.numbers.mainNumber >= 14 && this.numbers.mainNumber <= this.numbers.mainNumber / 2) {
            points = 20;
          } 
  
          this.numberContainerDataHandler.pointsChanged(this.numbers!.index, points)

        }
    }
  },
  watch: {
    numbers: {
      immediate: true,
      handler(newValue, oldValue) {
        console.log()
      },
    },
    parentMoves: {
      immediate: true,
      handler(newValue){
        this.moves++;
      },
    }
  },
});


</script>

<style>
.container {
  display: flex;
  height: 200px;
  width: 300px;
}

.color_100 {
  background-color: #67ac45;
}

.color_80 {
  background-color: #29e429;
}

.color_60 {
  background-color: #42a5df;
}

.color_40 {
  background-color: #808fd3;
}

.color_20 {
  background-color: #9b70df;
}

.color_0 {
  background-color: #dad8dd;
}
.main_number {
  border-style: dotted;
  height: 100%;
  width: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.math_block_disabled {
  background-color: darkgrey;
  border-width: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  width: 55px;
  height: 35px;
  text-align: center;
  margin: 2px;
}

.main_number > p {
  font-size: xxx-large;
}

.inner_container {
  display: flex;
  flex-direction: column;
  margin: 5px;
  justify-content: center;
}

.math_block {
  border-color: darkcyan;
  border-width: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-style: solid;
  width: 55px;
  height: 35px;
  text-align: center;
  margin: 2px;
}

.math_block:hover {
  border-color: rgb(0, 56, 56);
  background-color: chartreuse;
}

.math_sign {
  display: flex;
  align-items: baseline;
}

.side_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>


