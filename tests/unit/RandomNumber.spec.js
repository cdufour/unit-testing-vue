import RandomNumber from '@/components/RandomNumber'
import { mount } from '@vue/test-utils'

describe('RandomNumber', () => {
    test('Par défault, la valeur de data sera 0', () => {
        const wrapper = mount(RandomNumber)
        expect(wrapper.html()).toContain('<span>0</span>')
    })
    test('Si le bouton est cliqué, randomNumber sera entre 1 et 10', async () => {
        const wrapper = mount(RandomNumber)
        wrapper.find('button').trigger('click') // déclenchement du clic

        await wrapper.vm.$nextTick() // attente du re-render

        const randomNumber = parseInt(wrapper.find('span').element.textContent)
        expect(randomNumber).toBeGreaterThanOrEqual(1)
        expect(randomNumber).toBeLessThanOrEqual(10)

    })
    test('Si le bouton est cliqué, randomNumber sera entre 200 et 300', async () => {
        const wrapper = mount(RandomNumber, {
            propsData: {
                min: 200,
                max: 300
            }
        })

        wrapper.find('button').trigger('click') // déclenchement du clic
        await wrapper.vm.$nextTick() // attente du re-render
        const randomNumber = parseInt(wrapper.find('span').element.textContent)
        expect(randomNumber).toBeGreaterThanOrEqual(200)
        expect(randomNumber).toBeLessThanOrEqual(300)
    })
})