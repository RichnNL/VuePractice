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
                  <NameInput @input_name_changed="nameSet" />
                </v-row>
        </v-col>
        <v-col>
          <v-row   no-gutters justify="center">
                <v-btn-toggle
                    v-model="gameSettings.difficulty"
                    tile
                    color="deep-purple accent-3"
                    group
                  >
                    <v-btn  value="easy">
                      Easy
                    </v-btn>

                    <v-btn value="medium">
                      Medium
                    </v-btn>

                    <v-btn value="hard">
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
              @click="()=> this.$router.push({ path: '/main', query: { ...gameSettings} })"
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
import { defineComponent, reactive, ref, watch } from 'vue'
import NameInput, { UsernameType } from './components/NameInput.vue'
export default defineComponent({
  name: 'StartPage',
  components: {
    NameInput
  },
  setup(props){
   let gameSettings = reactive<GameSetting>({
      userName: '',
      difficulty: 'easy' as DifficultyType
    })

    let ready = ref(false)

    function nameSet(name: UsernameType){
      if(name.isValid){
        gameSettings.userName = name.name;
      }else {
        gameSettings.userName = '';
      }
    }

  

    watch(()=> gameSettings.userName, (newValue, oldValue)=> { ready.value = newValue == '' ? false : true })

    return {nameSet, gameSettings, ready}
  }
})

export type GameSetting = {
    userName: string
      difficulty: DifficultyType
}
export type DifficultyType = 'easy' | 'medium' | 'hard'
</script>


