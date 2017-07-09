<template>
  <div>
    <div class="home-container">
      <div class="info">
        <h3 class="title">Hipsterate</h3>
        <p class="description"><a href="https://www.last.fm" target="_blank">Last.fm</a> 을 통해 들은 앨범에 별점을 주세요!</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.$emit('toolbarStyle', 'home')
  }
}
</script>

<style scoped>
.home-container {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  padding: 1em 2em 2em 2em;
  background-color: rgba(0, 0, 0, 1);
}

.home-container>.info {
  padding: 2em 10em;
  color: white;
}

.home-container>.info>.title {
  font-weight: 500;
}

.home-container>.info>.description {
}
</style>

<style>
#video-background {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
}
</style>
