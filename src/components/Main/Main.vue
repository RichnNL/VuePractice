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
           {{ gameStore.getGame().userName }}
           <br/>
           Difficulty: {{gameStore.getGame().difficulty}}
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
        <div v-for="(container, index) in numberContainerStore.getAll()" :key="index">
          <v-card
            class="pa-2"
            outlined
            tile
          >
          <NumberCard :parentMoves="moves"  :numbers="container" />

          </v-card>
          </div>
        </v-col>
         <v-col
          cols="7"
             align="center"
      justify="center"
        >
        <div style="height: 100%!important; width: 100%; display: flex; justify-content: center; flex-direction: column;">
        <div style="height: 40px; width: 30px;" @click="moveNumbersUp" >
          <v-icon
                large
                color="blue darken-2"
              >
                mdi-arrow-up-bold-box-outline
          </v-icon>
          </div>
           <div style=" height: 40px; width: 30px;" @click="moveNumbersDown">
                    <v-icon
                large
                color="blue darken-2"
              >
                mdi-arrow-down-bold-box-outline
          </v-icon>
          </div>


        </div>

        </v-col>
        <v-col cols="auto">
          <v-card
            v-if="!gameOver"
            class="pa-2"
            outlined
            tile
          >
           Time left:  {{timer}}
           <br/>
           Points: {{numberContainerStore.getTotalPoints()}}
          </v-card>
          <v-card
        
            class="pa-2"
            outlined
            tile
            style="background-color: blanchedalmond"
          >
           Game over
           <br/>
            <v-btn
              v-if="!saving"
              class="ma-2"
              color="primary"
              dark
              @click="saveGame"
      >
        Save Game
        <v-icon
          dark
          right
        >
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
          <v-progress-circular
          v-else
      indeterminate
      color="primary"
    ></v-progress-circular>
           Total Points : {{numberContainerStore.getTotalPoints()}}
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang='ts'>
import GameStoreDataHandler from '@/dataHandler/gameStoreDataHandler';
import GameStore from '@/stores/GameStore/gameStore';
import { container } from 'tsyringe';
import { defineComponent, ref, watch} from 'vue'
import  NumberCard  from '../Main/components/NumberCard.vue';
import NumbersContainerStore from '../../stores/NumbersContainerStore/numberContainerStore';
import NumbersContainerDataHandler from '../../dataHandler/numberContainerDataHandler';
export default defineComponent({
  name: 'MainPage',
  components: {
    NumberCard
  },
  setup() {
    const gameStore = container.resolve(GameStore);
    const  gameStoreDatahandler = container.resolve(GameStoreDataHandler);
    const numberContainerStore = container.resolve(NumbersContainerStore);
    const numberContainerDataHandler = container.resolve(NumbersContainerDataHandler);
    const gameOver = ref(false);
   watch(()=> numberContainerStore.getState().finished, (newValue, oldValue)=> {
      if(newValue){
            gameOver.value = true;
      }
    })

 
    return {gameOver, numberContainerDataHandler, numberContainerStore, gameStore, gameStoreDatahandler}
  },
  data() {
    return {
      timer: 0,
      moves: 0,
      saving: false,
      countdown:  setInterval(()=> {
        this.initTimer()
      }, 1000)
     }
  },
  methods: {
    initMain(){
       if(this.gameStore.getGame().difficulty == 'easy'){
        this.timer = 180;
          this.numberContainerDataHandler.createNumberContainer(4);
      }else if(this.gameStore.getGame().difficulty == 'medium'){
          this.timer =120;
          this.numberContainerDataHandler.createNumberContainer(3);
      } else if(this.gameStore.getGame().difficulty == 'hard'){
          this.timer = 60;
          this.numberContainerDataHandler.createNumberContainer(2);
      }
    },
    initTimer(){
      if(this.timer > 0) {
          this.timer--;
        }else  if(!this.gameOver){
          this.gameOver = true;
        }
    },
    moveNumbersUp(){
      this.numberContainerDataHandler.moveNumbersUp();
      this.moves++;
    },
    moveNumbersDown(){
      this.numberContainerDataHandler.moveNumbersDown();
      this.moves++;
    },
    async saveGame(){
      this.saving = true;
       const saved = await this.numberContainerDataHandler.saveGame(this.gameStore.getGame());
       this.saving = false;
       console.log(saved, 'saved')
    }
  },
  watch: {
    gameOver: {
      handler(newValue){
      if(newValue.value){
        this.gameStoreDatahandler.setTimeElapse(this.timer)
      }
      }
    }
  },
  created: function(){
      this.initMain()
  },
  beforeDestory: function() {
        clearInterval(this.countdown)
  }
})


</script>


