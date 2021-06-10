import { shallowMount } from '@vue/test-utils';
import MainPage from '../../src/components/Main/Main.vue'
import router from '@/router';
describe('main screen components', () => {
    test('Main Screeen exists', () => {
        const mockRoute = {
            params: {
                userName: 'Test',
                difficulty: 'easy'

            }
        }
        const mockRouter = {
            push: jest.fn()
        }

        const input = shallowMount(MainPage, {
            global: {
                mocks: {
                    $route: mockRoute,
                    $router: mockRouter
                }
            }
        })
        expect(input.exists()).toBeTruthy();
    })

})


