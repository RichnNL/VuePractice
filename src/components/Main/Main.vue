<template>
  <div class="ma-5 pa-5" >
    <v-container class="grey lighten-5">
      <v-row>
        <v-col md="4">

        </v-col>
        <v-col
          md="4"
          class="ml-auto"
        >
          <v-card
            class="pa-2"
            outlined
            tile
            style="background-color: azure"
          >
           {{ $route.params.userName }}
           <br/>
           Difficulty: {{$route.params.difficulty}}
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="3"
          class="ml-md-auto"
        >
    
        </v-col>
        <v-col
          md="3"
          class="ml-md-auto"
        >
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="auto"
          class="mr-auto"
        >
        <div v-for="(item, index) in numberComponentCount" :key="index">
          <v-card
            class="pa-2"
            outlined
            tile
          >
          <NumberCard @number_points_changed=pointsChanged  :index=index />

          </v-card>
          </div>
        </v-col>
        <v-col cols="auto">
          <v-card
            class="pa-2"
            outlined
            tile
          >
           Time left:  {{timer}}
           <br/>
           Points: {{points}}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router';
import  NumberCard, { NumberCardType }  from '../Main/components/NumberCard.vue'
export default defineComponent({
  name: 'MainPage',
  components: {
    NumberCard
  },
  setup() {
    const gameNumber  =  Math.floor(Math.random() *1000);
    const timer = ref();
    const points = ref(0);
    const gameover = ref(false)
    const route = useRoute();
    const numbrComponents= ref<NumberCardType[] >([]);
    let numberComponentCount = 0;
      if(route.params?.difficulty == 'easy'){
          timer.value = 180;
          numberComponentCount = 4;
      }else if(route.params?.difficulty == 'medium'){
          timer.value =120;
          numberComponentCount = 3;
      } else if(route.params?.difficulty == 'hard'){
          timer.value = 60;
          numberComponentCount = 2;
      }
      const countdown = setInterval(()=> {
        if(timer.value > 0) {
          timer.value--;
        }else  if(!gameover.value){
          gameover.value = true;
        }
      }, 1000)
  
      onBeforeUnmount(()=> {
        clearInterval(countdown)
      }) 

      const pointsChanged = (numberComponent: NumberCardType) => {
        const index = numbrComponents.value.findIndex(i => i.index == numberComponent.index);
        if(index > -1){
          numbrComponents.value[index].points = numberComponent.points;
        }else {
          numbrComponents.value.push(numberComponent);
        }

        points.value = numbrComponents.value.map(x => x.points).reduce((a, b) => a + b, 0);

      }
  

      
    return {gameNumber, timer, points, numberComponentCount, pointsChanged}
  }

})


export type DifficultyType = 'easy' | 'medium' | 'hard'
</script>


