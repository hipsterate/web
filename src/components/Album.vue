<template>
  <div>
    <div class="album-container" @mouseenter="info = true" @mouseleave="info = false">
      <div class="info" v-if="info"></div>
      <img class="image" :src="album.image">
    </div>
  </div>
</template>

<script>
export default {
  props: ['album'],
  data () {
    return {
      info: false
    }
  }
}
</script>

<style scoped>
.album-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.album-container .info {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.5;
}

.album-container .image {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
