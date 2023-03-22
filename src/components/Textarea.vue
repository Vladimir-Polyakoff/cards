<script>
export default {
  name: 'TheTextarea',
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
    <textarea
      v-model="model"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>
