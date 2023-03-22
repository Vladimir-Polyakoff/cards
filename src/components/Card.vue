<script>
import SelectedList from '@/components/SelectedList'
import Toggle from '@/components/Toggle'

export default {
  name: 'TheCard',

  components: {
    Toggle,
    SelectedList
  },

  props: {
    card: { type: Object, required: true },
    actions: { type: Array, required: false }
  },

  methods: {
    toggleStatus () {
      this.$refs.Toggle.toggle()
    }
  }

}
</script>

<template>
  <div>
      <div
        class="card"
      >
        <toggle
        v-if="$router.currentRoute.name === 'card-list'"
          ref="Toggle"
          class="toggle"
          :value="card.active"
          @change="v => $emit('toggleStatus', { id: card.id, active: Number(v) })"
        />
        <selected-list
          v-if="card.id"
          class="selected"
          :list="actions"
          @action="action => $emit(action, card)"
        ></selected-list>
        <h3 class="title cw">{{ card.title }}</h3>
        <div class="description cw">{{ card.description }}</div>
        <div class="img cw">{{ card.id }}</div>
      </div>
  </div>
</template>

<style scoped>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    max-width: 300px;
    border: 1px solid #ccc;
    border-radius: 6px;
    margin: 10px;
    padding: 10px;
  }
  .cw {
    max-width: 270px;
    word-wrap: break-word;
    text-transform: uppercase;
  }
  .title  {
    font-size: 20px;
    letter-spacing: 3px;
    padding: 10px;
    margin: 0px;
  }
  .description {
    font-size: 14px;
    margin-bottom: 10px;
    padding-inline: 20px;
  }
  .img {
    padding: 10px;
    background: #ccc;
    /* max-width: 280px; */
    width: 280px;
    height: 200px;
  }
  .toggle {
    position: absolute;
    top: 12px;
    left: 12px;
    cursor: pointer;
  }
  .selected {
    position: absolute;
    top: 6px;
    right: 8px;
}
</style>
