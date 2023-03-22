export const server = {
  getCardList: () => ({
    status: true,
    data: JSON.parse(localStorage.getItem('cardList')) || []
  }),

  saveCardList: cardList => localStorage.setItem('cardList', JSON.stringify(cardList)),

  createCard: card => {
    const { status, data } = server.getCardList()

    if (!status) { return { status: false, error: 'не удалось загрузить карточки' } }

    let updatedData = []

    if (data.length) {
      data.forEach(dataCard => {
        if (dataCard.id === card.id) {
          return { status: false, error: 'такая карточка уже существует' }
        }

        updatedData = [...data, card]
      })
    } else {
      updatedData = [card]
    }
    server.saveCardList(updatedData)

    return { status: true }
  },

  toggleStatus: (id, active) => {
    const { status, data } = server.getCardList()

    if (status) { return { status: false } }

    const editing = data.find(card => card.id === id)
    editing.active = active

    server.saveCardList(data)

    return { status: true }
  },

  getCard: id => {
    const { status, data } = server.getCardList()

    if (!status) { return { status: false, error: 'не удалось загрузить карточку' } }

    const card = data.find(card => card.id === id)

    return { status: true, data: card }
  },

  editCard: editingCard => {
    const { status, data } = server.getCardList()

    if (!status) { return { status: false, error: 'не удалось загрузить карточки' } }

    for (const [index, card] of data.entries()) {
      if (card.id === editingCard.id) {
        data[index] = editingCard

        server.saveCardList(data)

        return { status: true }
      }
    }

    return { status: false, error: 'не удалось редактировать карточку' }
  },

  deleteCard: card => {
    const { status, data } = server.getCardList()

    if (!status) { return { status: false, error: 'не удалось загрузить карточки' } }

    const updatedData = data.filter(dataCard => dataCard.id !== card.id)

    server.saveCardList(updatedData)

    return { status: true }
  }

}
