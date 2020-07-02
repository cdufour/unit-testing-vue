import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises' // npm i flush-promises

jest.mock('@/services/axios') // permet à jest de reproduire le service testé
beforeEach(() => {
    // purge avant chaque lancement des tests
    jest.clearAllMocks()
})

describe('MessageDisplay', () => {
    test('Appelle getMessage et affiche le message', async () => {
        // Reproduit l'appel vers l'API
        const mockMessage = 'Hello from the db!'
        getMessage.mockResolvedValueOnce({ text: mockMessage })
        const wrapper = mount(MessageDisplay)

        // Attend la résolution des promesses lancées
        await flushPromises()

        // Vérifie que l'appel a eu lieu une fois
        expect(getMessage).toHaveBeenCalledTimes(1);

        // Vérifie que le composant affiche le message
        const message = wrapper.find('[data-testid="message"]').element.textContent
        expect(message).toEqual(mockMessage)
    })

    test('Affiche une erreur quand getMessage échoue', async () => {
        // Mock the failed APU call
        const mockError = 'Oops! Something went wrong.'
        getMessage.mockRejectedValue(mockError)
        const wrapper = mount(MessageDisplay)

        // Attend la résolution des promesses lancées
        await flushPromises()

        // Vérifie que l'appel a eu lieu une fois
        expect(getMessage).toHaveBeenCalledTimes(1);

        // Vérifie que le composant affiche le message d'erreur
        const error = wrapper.find('[data-testid="message-error"]').element.textContent
        expect(error).toEqual(mockError)
    })
})