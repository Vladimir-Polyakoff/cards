<template>
  <div>
    <div class="prev">
      <h3>title - {{ card.title }}</h3>
      <div>des - {{ card.description }}</div>
      <div>id - {{ card.id }}</div>
      <div>active - {{ card.active ? 'да' : 'нет' }}</div>
      <div class="close" @click="$emit('close')">X</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThePreview',

  data () {
    return {
      card: {}
    }
  },
  methods: {
    setData (card) {
      this.card = card
    }
  }
}
</script>

<style scoped>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .prev {
    position: relative;
    width: 400px;
    height: 400px;
    background: white;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
    user-select: none;
  }
</style>
