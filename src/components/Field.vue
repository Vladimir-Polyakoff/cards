
<script>
export default {
  name: 'TheField',
  props: {
    value: { type: String, required: false, default: '' },
    placeholder: { type: String, required: true }
  },

  computed: {
    model: {
      get () { return this.value },
      set (value) { this.$emit('input', value) }
    }
  }
}
</script>

<template>
  <div>
    <input
      v-model="model"
      :placeholder="placeholder"
      >
  </div>
</template>

<style scoped>
  input {
    width: 100px;
  }
</style>
