<template>
  <div>
    <div class="album-container" @mouseenter="info = true" @mouseleave="info = false">

      <img class="image" :src="album.image">

      <div class="info" v-if="info">
        <h4 class="artist-title"><a :href="album.lastfmLink" target="_blank">{{ album.artistName }} - {{ album.name }}</a></h4>

        <div class="play-count" :class="{ 'display-hidden': !isPlayCount }">
          <span class="count">{{ album.playCount }}</span><span class="times">time<span v-if="album.playCount > 1">s</span></span>
        </div>

        <q-rating class="rating" v-model="rating" :max="10" @input="rate"></q-rating>
      </div>

    </div>
  </div>
</template>

<script>
import store from 'store'
import firebase from 'utils/firebase'

export default {
  props: ['album', 'isPlayCount'],
  data () {
    return {
      info: false,
      rating: 0
    }
  },
  methods: {
    rate () {
      firebase.createNewAlbumAtomic(this.album, (error, commited, snapshot) => {
        const newAlbum = Object.assign({}, this.album)
        newAlbum.rating = this.rating
        newAlbum.lastfmUsername = store.state.lastfmUsername
        newAlbum.updatedAt = firebase.timestamp
        delete newAlbum.playCount

        if (!error) {
          let updates = {}
          updates[`/user-albums/${store.state.user.uid}/${this.album.id}`] = newAlbum
          updates[`/album-users/${this.album.id}/${store.state.user.uid}`] = newAlbum

          firebase.updateDB(updates)
          .catch(error => console.log(error))
        }
      })
    }
  },
  created () {
    firebase.getDB(`/user-albums/${store.state.user.uid}/${this.album.id}`)
    .then(result => {
      const value = result.val()

      if (value) {
        this.rating = value.rating
      }
    })
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
  padding: 0.9em;

  background: #000;
  opacity: 0.7;
}

.album-container>.info>.artist-title {
  height: 10%;
  margin: 0;

  color: #fff;
  font-size: 0.9em;
  font-weight: 400;
}

.album-container>.info>.artist-title>a {
  color: #fff;
}

.album-container>.info>.play-count {
  height: 50%;
  margin: 20% 0 0 0;
  text-align: center;
}

.album-container>.info>.play-count>.count {
  color: #fff;
  font-size: 2em;
  font-weight: 600;
}

.album-container>.info>.play-count>.times {
  padding-left: 0.3em;

  color: #fff;
  font-size: 1em;
  font-weight: 300;
}

.album-container>.info>.rating {
  margin: 10% 0 0 0;
  height: 10%;

  font-size: 0.8em;
  text-align: center;
}

.display-hidden {
  visibility: hidden;
}
</style>
