<template>
  <img class="image" :src="album.image">
</template>

<script>
export default {
  props: ['album'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.image {
  width: 100%;
  height: auto;
}
</style>
