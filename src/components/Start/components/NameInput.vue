<template>
    <v-card
  elevation="2"
  outlined
  shaped
  :class="{valid : inputValue.isValid && inputValue.name.length > 0,  invalid: !inputValue.isValid && inputValue.name.length > 0}" 
    >
    <p class='screen_name_label'>Screen name:</p>
    <input  type='text'  v-model="inputValue.name" />
     <p v-if="!inputValue.isValid" id="screen_name_error" class='screen_name_label' >{{inputValue.errorMessage}}</p>
</v-card>
</template>
<script lang="ts">
import Vue, { defineComponent, reactive, watch } from 'vue'
export default defineComponent({
    name: 'NameInput',
    setup(props, {emit}) {
        let  inputValue = reactive({
            name: '',
            isValid: false,
            errorMessage: ""
        })
        function validateName(name: string): string | true {
             const startsWithLetter = new RegExp(/^[a-zA-Z]+$/);
            const hasSpeicalCharcaters = new RegExp(/^[\w]+$/);

            if(!startsWithLetter.test(name) ) {
              return "Must start with a letter"
            } 
            if(!hasSpeicalCharcaters.test(name)) {
             return "No special charcaters"
            } 

            return true;
        }
        watch(()=> inputValue.name, (newValue, oldValue)=> { 
            const validationMessage = validateName(newValue);
            let isValid = false;
            if(validationMessage != true){
                    inputValue.isValid = false;
                    inputValue.errorMessage = validationMessage;
            }else {
                inputValue.errorMessage = '';
                inputValue.isValid = true;
                isValid = true;
            }

            emit('input_name_changed',  {name: newValue, isValid } as UsernameType)
            })

        return {inputValue}
    }
})

export type UsernameType = {
    name: string
    isValid: boolean
}
</script>

<style scoped>
    .screen_name_label {
          text-align: start;
          font-size: small;
          font-style: italic;
    }

    #screen_name_error {
          color: red

    }

    .valid {
        border-color: #67ac45
    }

    .invalid {
         border-color: red
    }
</style>