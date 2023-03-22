<template>
  <div>
    <button @click="$emit('create')">Добавить</button>
  </div>
</template>

<script>
export default {
  name: 'TheButton'
}
</script>

<style scoped>
  button {
    padding: 8px 12px;
    border-radius: 4px;
    border: none;
    color: white;
    background: rgba(124, 70, 175, 0.718);
    cursor: pointer;
  }

</style>
