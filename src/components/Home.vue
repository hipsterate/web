<template>
  <div class="home">
    <div class="home-container">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videoUrl: 'https://www.youtube.com/embed/TZD7CNRSq28'
    }
  },
  computed: {
    optionedVideoUrl () {
      let options = '?'
      options += 'autoplay=1'
      options += '&loop=1'
      options += '&rel=0'
      options += '&controls=0'
      options += '&disablekb=1'
      return this.videoUrl + options
    }
  }
}
</script>

<style>
.home-container {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  padding: 1em 2em 2em 2em;
  background-color: rgba(0, 0, 0, 0.8);
}

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
