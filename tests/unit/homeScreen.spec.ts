import { mount, shallowMount } from '@vue/test-utils'
import NameInput from '@/components/Start/components/NameInput.vue'

describe('Testing home screen components', () => {
  test('Name input component mounts ', () => {
    const input = mount(NameInput, {
      props: {  }
    })
    expect(input.exists()).toBeTruthy();
  })

  test('User input name starting with 0', async () => {
    const input = mount(NameInput, {
      props: {  }
    })

    await input.setValue({inputValue: {
      name: '0test'
    }
   })

   const errorParagraph = input.find('v-card > #screen_name_error');
    expect(errorParagraph.text() ) .toBe('Must start with a letter');
  })

  
})
