<template>
  <div class="container">
    <div :class="{color_100 : points == 100, color_80 : points == 80, color_60 : points == 60, color_40 : points == 40, color_20 : points == 20,  color_0 : points == 0, main_number : true}"  >
      <p>{{ number }}</p>
    </div>
    <div class="inner_container">
      <div class="math_sign">
        <div class="math_block" @click="add">
          {{ mathActions.plus }}
        </div>
        <div>+</div>
      </div>
      <div class="math_sign">
        <div class="math_block" @click="subtract">
          {{ mathActions.subtract }}
        </div>
        <div>-</div>
      </div>
      <div class="math_sign">
        <div class="math_block" @click="multiply">
          {{ mathActions.multiply }}
        </div>
        <div>x</div>
      </div>
      <div class="math_sign">
        
        <div :class="{math_block: divisble, math_block_disabled: !divisble}" @click="divide">
          {{ mathActions.divide }}
        </div>
        <div>÷</div>
      </div>
    </div>
    <div class="side_container">
      <div class="math_block" @click="switchAddSubtract">Switch</div>
      <div class="math_block" @click="switchSubtractMultiply">Switch</div>
      <div class="math_block" @click="switchMultiplyDivide">Switch</div>
    </div>
        <div style="display: inline-block;  position: absolute; right: 10px; white-space: nowrap;align-self: flex-end;">
          Moves: {{count}}
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType , reactive, ref, watch } from "vue";
export default defineComponent({
  name: "NumberCard",
 props: {
        index: Number,
        numberAction: Object as PropType<NumberAction>,
    },
  setup(props, {emit}) {
    const number = ref(Math.floor(Math.random() * 90) + 10);
    let count = ref(0)
    let divisble = ref(false)

    let points = ref(0)
    let mathActions = reactive({
      plus: Math.floor(Math.random() * number.value) + 1,
      subtract: Math.floor(Math.random() * number.value) + 1,
      divide: Math.floor((Math.random() * number.value) / 3) + 2,
      multiply: Math.floor((Math.random() * number.value) / 3) + 1,
    });

    const originalValue = number.value;

     if(  (number.value/mathActions.divide) % 1 == 0){
        divisble.value = true; 
       }

    const add = () => {
      number.value = mathActions.plus + number.value;
    }

    const subtract = () => {
        number.value =  number.value - mathActions.subtract;
    }

        const divide = () => {
            number.value = Math.floor(number.value/mathActions.divide)
    }
        const multiply = () => {
        number.value =  mathActions.multiply * number.value;
    }

    const switchAddSubtract = () => {
      const previousValue = mathActions.plus;
      mathActions.plus = mathActions.subtract;
      mathActions.subtract = previousValue;
      count.value++;
    }

     const switchSubtractMultiply = () => {
      const previousValue = mathActions.multiply;
      mathActions.multiply = mathActions.subtract;
      mathActions.subtract = previousValue;
      count.value++;
    }

    const switchMultiplyDivide = () => {
      const previousValue = mathActions.multiply;
      mathActions.multiply = mathActions.divide;
      mathActions.divide = previousValue;
      count.value++;
    }
    watch(()=> number.value, (newValue, oldValue) => {
      const dividedResult = number.value/mathActions.divide;
       if( dividedResult % 1 == 0 && dividedResult != Infinity ){
        divisble.value = true; 
       }else {
         divisble.value = false;
       }
      count.value++;
      if(number.value == 0){
          points.value = 100;
      }else if(number.value == 1){
         points.value = 80;
      }else if(number.value > 1 && number.value <= 5){
         points.value = 60;
      }
      else if(originalValue >= 24 && number.value <= (originalValue/4) ){
         points.value = 40;
      } else if(originalValue >= 14 && number.value <= (originalValue/2)){
         points.value = 20;
      }
      else {
         points.value = 0;
      }

           emit('number_points_changed',  { points: points.value, index: props.index })
    })

    watch(()=> props.numberAction, (newValue) => {
      console.log(newValue, 'props number action')
      if(newValue?.kind == 'up'){
        emit('numbers_moved_up' , {index: props.index, value: mathActions.plus});
        mathActions.plus = mathActions.subtract;
        mathActions.subtract = mathActions.multiply;
        mathActions.multiply = mathActions.divide;
        count.value++;
      } else if(newValue?.kind == 'down') {
         emit('numbers_moved_down' , {index: props.index, value: mathActions.divide});
        mathActions.divide = mathActions.multiply;
        mathActions.multiply = mathActions.subtract;
        mathActions.subtract = mathActions.plus;
        count.value++;
      }else if(newValue?.kind == 'getDown' && newValue.index == props.index){
        mathActions.plus = newValue.value;
      }
      else if(newValue?.kind == 'getUp' && newValue.index == props.index){
        mathActions.divide = newValue.value;
      }
    })

    return { points, number, mathActions, count ,switchMultiplyDivide,  add, subtract, divide, multiply, divisble, originalValue, switchAddSubtract, switchSubtractMultiply, };
  },
});

type Props = {
  index: number
 
}

export type NumberAction  = {kind: 'up'}  |  {kind: 'down'} | {kind: 'getDown', value: number, index: number} | {kind: 'getUp', value: number, index: number} |  {kind: 'set'}

export type NumberCardType =Props & {
  points: number
}
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


