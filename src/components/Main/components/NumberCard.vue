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
        <div :class="{ math_block: !gameOver && !perfectScore , math_block_disabled:  gameOver || perfectScore }" @click="add">
          {{ numbers.additionNumber }}
        </div>
        <div>+</div>
      </div>
      <div class="math_sign">
        <div  :class="{ math_block: subtractable  ||  (!gameOver && !perfectScore), math_block_disabled: !subtractable ||  gameOver || perfectScore }" @click="subtract">
          {{ numbers.subtractionNumber }}
        </div>
        <div>-</div>
      </div>
      <div class="math_sign">
        <div :class="{ math_block: !gameOver && !perfectScore , math_block_disabled:  gameOver || perfectScore }" @click="multiply">
          {{ numbers.mulitplicationNumber }}
        </div>
        <div>x</div>
      </div>
      <div class="math_sign">
        <div
          :class="{ math_block: divisble ||  (!gameOver && !perfectScore), math_block_disabled: !divisble ||  gameOver || perfectScore }"
          @click="divide"
        >
          {{ numbers.divisionNumber }}
        </div>
        <div>÷</div>
      </div>
    </div>
    <div class="side_container">
      <div :class="{ math_block:  !gameOver && !perfectScore, math_block_disabled:  gameOver || perfectScore }" @click="switchAddSubtract">Switch</div>
      <div :class="{ math_block:  !gameOver && !perfectScore, math_block_disabled:  gameOver || perfectScore }" @click="switchSubtractMultiply">Switch</div>
      <div :class="{ math_block:  !gameOver && !perfectScore, math_block_disabled:  gameOver || perfectScore }" @click="switchMultiplyDivide">Switch</div>
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
    parentMoves: Number,
    gameOver: Boolean
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
      perfectScore: false,
    };
  },
  methods: {
    switchAddSubtract() {
      if(this.gameOver || this.perfectScore){
        return;
      }
      if (
        this.numberContainerDataHandler.switchAddSubtract(this.numbers!.index)
      ) {
        this.moves++;
        this.checkNumber()
      }
    },
    switchSubtractMultiply() {
        if(this.gameOver || this.perfectScore){
        return;
      }
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
        if(this.gameOver || this.perfectScore){
        return;
      }
      if (this.numberContainerDataHandler.switchMultiplyDivide(this.numbers!.index)) {
        this.moves++;
        this.checkNumber()
      }
    },
    add(){  
        if(this.gameOver || this.perfectScore){
        return;
      }
      this.numberContainerDataHandler.addNumber(this.numbers!.index)
         this.checkNumber()
    },
    subtract(){
        if(this.gameOver || this.perfectScore){
        return;
      }
      if(this.subtractable){
        this.numberContainerDataHandler.subtractNumber(this.numbers!.index)
           this.checkNumber()
      }
    },
    multiply(){
        if(this.gameOver || this.perfectScore){
        return;
      }
      this.numberContainerDataHandler.multiplyNumber(this.numbers!.index)
         this.checkNumber()
    },
    divide(){
        if(this.gameOver || this.perfectScore){
        return;
      }
      if(this.divisble){
        this.numberContainerDataHandler.divideNumber(this.numbers!.index)
        this.checkNumber()
      }
    },
    calculatePoint() {
          if(this.numbers == undefined){
            return;
          }
          let points = 0; 
          if (this.numbers.mainNumber == 0) {
            points = 100;
            this.perfectScore = true;
            this.numberContainerDataHandler.finished(this.numbers.index)
          } else if (this.numbers.mainNumber == 1) {
            points = 80;
          } else if (this.numbers.mainNumber > 1 && this.numbers.mainNumber <= 5) {
            points = 60;
          } else if (this.numbers.mainNumber >= 24 && this.numbers.mainNumber <= this.numbers.mainNumber / 4) {
            points = 40;
          } else if (this.numbers.mainNumber >= 14 && this.numbers.mainNumber <= this.numbers.mainNumber / 2) {
            points = 20;
          } 
          points = points - this.moves;
          this.numberContainerDataHandler.pointsChanged(this.numbers!.index, points)
    },
    checkNumber(){
          if(this.numbers == undefined) {
                return
          }
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
          this.moves++;
          this.calculatePoint();
        }
  },
  watch: {
    numbers: {
      immediate: true,
      handler() {
        console.log("")
      },
    },
    parentMoves: {
      immediate: true,
      handler(newValue){
        if(newValue > 0){
          this.moves++;
        }
      },
    },
      gameOver: {
      immediate: true,
      handler(newValue){
        this.calculatePoint();
      },
    },
      perfectScore: {
      immediate: true,
      handler(newValue){
         
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


