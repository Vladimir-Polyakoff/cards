<script>
export default {
  name: 'SelectedList',

  props: {
    list: { type: Array, required: false }
  },

  data () {
    return {
      showActions: false
    }
  },

  mounted () {
    document.addEventListener('click', this.bodyClick)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.bodyClick)
  },

  methods: {
    bodyClick () {
      this.showActions = false
    }
  }
}
</script>

<template>
  <div>
    <div class="icon-menu" @click.stop="showActions = true">|||</div>
    <div v-if="showActions" class="actions">
      <button
      class="buttons"
        v-for="(button, index) in list"
        :key="index"
        @click="$emit('action', button.action)"
      >
        {{ button.title }}
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .icon-menu {
    transform: rotate(90deg);
    user-select: none;
    cursor: pointer;
  }
  .actions {
    width: 110px;
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1101;
    top: 24px;
    left: -95px;
    border: 1px solid #000;
    border-radius: 4px;
  }
  .buttons {
    border: none;
    background: white;
    text-align: right;
    padding: 6px;
  }
  .buttons:hover {
    background: #ccc;
  }
</style>
