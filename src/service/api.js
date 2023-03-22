import { server } from './server'

export default {
  post: {
    card: card => server.createCard(card)
  },
  get: {
    cardList: () => server.getCardList(),
    card: id => server.getCard(id)
  },

  patch: {
    card: editingCard => server.editCard(editingCard),
    toggleStatus: (id, active) => server.toggleStatus(id, active)
  },

  delete: {
    card: card => server.deleteCard(card)
  }
}
