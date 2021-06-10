<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Welcome to the numbers game
        </h1>

        <p class="subheading font-weight-regular">
          Get the numbers as low possible before time runs out
        </p>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
    
      >
   
        <v-col>
                <v-row justify="center">
                    <NameInput @input_name_changed="nameSet"  />
                </v-row>
        </v-col>
        <v-col>
          <v-row   no-gutters justify="center">
                <v-btn-toggle
                    v-model="difficulty"
                    mandatory
                    tile
                    color="deep-purple accent-3"
                    group
                  >
                    <v-btn id="easy_button"  :value='easy' @click="setDifficulty('easy')">
                      Easy
                    </v-btn>

                    <v-btn id="medium_button" :value='medium' @click="setDifficulty('medium')">
                      Medium
                    </v-btn>

                    <v-btn id="hard_button" :value='hard'  @click="setDifficulty('hard')">
                      Hard
                    </v-btn>

                  </v-btn-toggle>
          </v-row>
      </v-col>

      <v-col v-if='ready'>
        <v-row justify="center">
        <v-btn
              depressed
              color="primary"
              @click="setGameStore"
            >
              Start
            </v-btn>

        </v-row>
      </v-col>

      </v-col>

    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { container } from 'tsyringe';
import { defineComponent} from 'vue'
import NameInput, { UsernameType } from './components/NameInput.vue'
import GameStore from '../../stores/GameStore/gameStore';
import GameStoreDataHandler from '../../dataHandler/gameStoreDataHandler';
import { DifficultyType } from '@/stores/GameStore/gameStoreObjectInterface';
export default defineComponent({
  name: 'StartPage',
  components: {
    NameInput
  },
   setup() {
    return {
      gameStore: container.resolve(GameStore),
      gameStoreDatahandler: container.resolve(GameStoreDataHandler),
    };
  },
  data() {
    return {
      difficulty: 'easy' as DifficultyType,
      userName: '' as string,
      ready: false
     }
  },
  methods: {
    nameSet(name: UsernameType){
      if(name.isValid){
       this.userName = name.name;
      }else {
        this.userName = '';
      }
    },
    setDifficulty(difficulty: DifficultyType) {
      this.difficulty = difficulty
    },
    setGameStore() {
      this.gameStoreDatahandler.createNewGame(this.userName, this.difficulty);
      this.$router.push({name: 'MainPage'})
    }
  },
  watch: {
    userName:{
      handler(newValue) { 
          this.ready = newValue == '' ? false : true 
      }
    } 
  }
})

export type GameSetting = {
    userName: string
    difficulty: DifficultyType
}
</script>


