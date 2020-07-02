import AppHeader from '@/components/AppHeader'
import { mount } from '@vue/test-utils'

describe('AppHeader', () => {
    test('Si utilisateur pas loggué, ne pas afficher le bouton logout', () => {
        //expect(true).toBe(true) // vrai dans tous les cas => test réussit
        const wrapper = mount(AppHeader)
        //expect(wrapper.find('button').isVisible()).toBe(false)
        expect(wrapper.find('button').isVisible()).toBe(false)
    })
    test('Si utilisateur loggué, afficher le bouton logout', async () => {
        const wrapper = mount(AppHeader)
        wrapper.setData({ loggedIn: true }) // modification dynamique des data

        await wrapper.vm.$nextTick() // attente de la résoluttion du prochain
        // traitement asynch || await rapper.setData ...
        expect(wrapper.find('button').isVisible()).toBe(true)
    })
})