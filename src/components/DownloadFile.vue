<script>
export default {
  name: 'DownloadFile',

  data () {
    return {
      img: null
    }
  },

  methods: {
    addPhoto () {
      console.log('add')
      const reader = new FileReader()
      reader.onload = () => {
        const photo = {
          id: Date.now(),
          url: reader.result
        }
        this.img = photo
        this.$emit('addPhoto', this.img)
      }
      reader.readAsDataURL(this.img)
    }
  }
}
</script>

<template>
  <div>
    <input
      type="file"
      @click="addPhoto"
    >
  </div>
</template>

<style scoped>
  input {
    width: 118px;
  }
</style>
