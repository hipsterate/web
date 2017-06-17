<template>
  <div>
    <div class="album-container" @mouseenter="info = true" @mouseleave="info = false">

      <img class="image" :src="album.image">

      <div class="info" v-if="info">
        <h4 class="artist-title"><a :href="album.lastfmLink" target="_blank">{{ album.artistName }} - {{ album.name }}</a></h4>

        <div class="play-count">
          <div class="count">{{ album.playCount }}</div>
          <div class="times">time<span v-if="album.playCount > 1">s</span></div>
        </div>

        <div class="rating">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
// import firebase from '../utils/firebase'

export default {
  props: ['album'],
  data () {
    return {
      info: false,
      rating: null
    }
  },
  methods: {
    rate () {
      // firbase.database().ref()
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

.album-container>.image {
  position: relative;
  width: 100%;
  height: 100%;
}

.album-container>.info {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  width: 100%;
  height: 100%;
  padding-left: 15px;
  padding-right: 15px;

  background: #000;
  opacity: 0.7;
}

.album-container>.info>.artist-title {
  color: #fff;
  font-size: 13px;
  font-weight: 300;
}

.album-container>.info>.artist-title>a {
  color: #fff;
}

.album-container>.info>.play-count>.count {
  color: #fff;
  font-size: 50px;
  font-weight: 600;
  text-align: center;
}

.album-container>.info>.play-count>.times {
  color: #fff;
  font-size: 13px;
  font-weight: 300;
  text-align: center;
}
</style>
