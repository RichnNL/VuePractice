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

    await input.setValue({inputValue: {name: '0Test'}})

   const errorParagraph = await input.get('#screen_name_error');
    expect(errorParagraph.text() ) .toBe('Must start with a letter');
  })

  test('Medium difficulty selected', async () => {
    const input = mount(NameInput, {
      props: {  }
    })
    const button = input.findAll("button").filter(button => button.attributes("value") == 'medium')[0];
    expect(button?.exists()).toBeTruthy();
  })

  test('Name set trigger on input ', async () => {
    const input = mount(NameInput, {
      props: {  }
    })
    const spy = jest.spyOn(input.vm, "nameSet");
    input.trigger('input', {target: {value: 'Test'}})
    expect(spy).toBeCalled();
  })

  
})
