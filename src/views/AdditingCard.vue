<script>
import Field from '@/components/Field'
import Textarea from '@/components/Textarea'
import Card from '@/components/Card'

import Api from '@/service/api.js'

export default {
  name: 'AdditingCard',
  components: {
    Field,
    Textarea,
    Card
  },

  data () {
    return {
      card: {
        title: '',
        description: ''
      },
      titleError: '',
      descriptionError: ''
    }
  },

  computed: {
    id () {
      return this.$router.currentRoute.params.id
    },
    editMode () {
      return this.id !== 'create'
    }
  },

  mounted () {
    if (this.editMode) {
      this.setCard(this.id)
    }
  },

  methods: {
    addCard () {
      // if (!this.isValidCard) { return false }

      const { status, error } = Api.post.card({
        id: new Date(),
        title: this.card.title,
        description: this.card.description
      })

      if (status) {
        this.$router.push('/')
      } else {
        alert(error)
      }
    },

    setCard (id) {
      const { status, error, data: { title, description } } = Api.get.card(id)

      if (status) {
        this.card.title = title
        this.card.description = description
      } else {
        alert(error)
      }
    },

    editCard () {
      // if (!this.isValidCard()) { return false }

      if (this.isEqualCard(Api.get.card(this.id))) {
        alert('Данные карточки не изменились')

        return
      }

      const { status, error } = Api.patch.card({
        id: this.id,
        title: this.card.title,
        description: this.card.description
      })

      if (status) {
        this.$router.push('/')
      } else {
        alert(error)
      }
    },

    isEqualCard ({ data: { title, description } }) {
      if (this.card.title !== title || this.card.description !== description) {
        return false
      }

      return true
    }

    // isValidCard () {
    //   let isValid = true

    //   if (!this.card.title) {
    //     this.titleError = 'заполните title'
    //     isValid = false
    //   }

    //   if (!this.card.description) {
    //     this.descriptionError = 'заполните description'
    //     isValid = false
    //   }

    //   return isValid
    // }
  }
}
</script>

<template>
  <div class="container">
    <div class="actions">
      <field
        class="field"
        placeholder="title"
        :value="card.title"
        @input="value => { card.title = value }"
      >
      </field>
      <Textarea
        placeholder="description"
        v-model="card.description"
      >
      </Textarea>
    </div>
    <card calss="card-form" :card="card"></card>
    <button class="add-card" @click="editMode ? editCard() : addCard()">
      {{ editMode ? 'Редактировать карточку' : 'Добавить карточку' }}
    </button>

    <pre>{{ card }}</pre>
  </div>
</template>

<style scoped>
  * {
    margin-block: 8px;
  }
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .actions {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 4px;
  }
  .field {
    text-align: left;
  }
  .file {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 280px;
    height: 280px;
    border-radius: 4px;
    background: #ccc;
  }
  .file-input {
    text-align: left;
  }
  .add-card {
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    color: white;
    background: rgba(124, 70, 175, 0.718);
    cursor: pointer;
  }
  .cw {
    max-width: 270px;
    word-wrap: break-word;
    text-transform: uppercase;
  }
</style>
