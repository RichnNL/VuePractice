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
                    v-model="difficulty"
                    tile
                    color="deep-purple accent-3"
                    group
                  >
                    <v-btn id="easy_button"  value="easy">
                      Easy
                    </v-btn>

                    <v-btn id="medium_button" value="medium">
                      Medium
                    </v-btn>

                    <v-btn id="hard_button" value="hard">
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
              @click="()=> this.$router.push({ name: 'MainPage',  params: { userName, difficulty }})"
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
  setup(){
    let userName = ref('')
    let difficulty = ref<DifficultyType>('easy')
    let ready = ref(false)

    function nameSet(name: UsernameType){
      if(name.isValid){
        userName.value = name.name;
      }else {
        userName.value = '';
      }
    }

  

    watch(()=> userName.value, (newValue, oldValue)=> { ready.value = newValue == '' ? false : true })

    return {nameSet, userName, difficulty, ready}
  }
})

export type GameSetting = {
    userName: string
    difficulty: DifficultyType
}
export type DifficultyType = 'easy' | 'medium' | 'hard'
</script>


