<script>
import Button from '@/components/Button'
import Card from '@/components/Card'
import Preview from '@/components/Preview'

import Api from '@/service/api.js'

export default {
  name: 'CardList',
  components: {
    Button,
    Card,
    Preview
  },

  data () {
    return {
      cardList: [],
      actionsList: [
        { title: 'Редактировать', action: 'edit' },
        { title: 'Удалить', action: 'delete' },
        { title: 'Предпросмотр', action: 'preview' }
      ],
      showPreview: false
    }
  },

  created () {
    this.getCardList()
  },

  methods: {
    getCardList () {
      const { status, data } = Api.get.cardList()
      status ? this.cardList = data : alert('ошибка при получение карточек')
    },

    toggleStatus ({ id, active }) {
      setTimeout(() => {
        const { status } = Api.patch.toggleStatus(id, active)
        if (status) {
          const edeited = this.cardList.find(card => card.id === id)
          edeited.active = active
        } else {
          alert('Ошибка при изменение статуса')
          this.$refs['Card-' + id][0].toggleStatus()
        }
      }, 2000)
    },

    showDeleteAlert (card, index) {
      if (window.confirm(`вы действительно хотите удалить ${card.title}`)) {
        this.deleteCard(card, index)
      }
    },

    deleteCard (card, index) {
      const { status, error } = Api.delete.card(card)

      if (status) {
        this.cardList.splice(index, 1)
      } else {
        alert(error)
      }
    },

    editCard ({ id }) {
      this.$router.push({ name: 'additing-card', params: { id } })
    },

    previewCard (card) {
      this.showPreview = true

      this.$nextTick(() => { this.$refs.Preview.setData(card) })
    }
  }

}
</script>

<template>
  <div class="container">
    <div class="actions">
      <Button @create="$router.push({ name: 'additing-card', params: { id: 'create' } })"></Button>
    </div>
    <div class="card">
      <card
        :ref="'Card-' + card.id"
        v-for="(card, index) in cardList"
        :key="card.id"
        :card="card"
        :actions="actionsList"
        @toggleStatus="toggleStatus"
        @delete="card => showDeleteAlert(card, index)"
        @edit="editCard"
        @preview="previewCard"
      >
      </card>
      <preview
        v-if="showPreview"
        ref="Preview"
        class="preview"
        @close="showPreview = false"
      ></preview>
    </div>
  </div>
</template>

<style scoped>
  .container {
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .card {
    display: flex;
    flex-wrap: wrap;
  }
  .preview {
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 100%s;
    background: #cccccc99;
    z-index: 111;
  }
</style>
