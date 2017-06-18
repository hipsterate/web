<template>
  <div>
    <div class="album-container" @mouseenter="info = true" @mouseleave="info = false">

      <img class="image" :src="album.image">

      <div class="info" v-if="info">
        <h4 class="artist-title"><a :href="album.lastfmLink" target="_blank">{{ album.artistName }} - {{ album.name }}</a></h4>

        <div class="play-count">
          <span class="count">{{ album.playCount }}</span><span class="times">time<span v-if="album.playCount > 1">s</span></span>
        </div>

        <q-rating class="rating" v-model="rating" :max="10" @input="rate"></q-rating>
      </div>

    </div>
  </div>
</template>

<script>
import store from '../store'
import firebase from '../utils/firebase'

export default {
  props: ['album'],
  data () {
    return {
      info: false,
      rating: 0
    }
  },
  methods: {
    rate () {
      firebase.database().ref('/albums').child(this.album.id)
      .transaction(album => {
        if (album === null) {
          const newAlbum = Object.assign({}, this.album)
          delete newAlbum.playCount
          return newAlbum
        }
      }, (error, commited, snapshot) => {
        this.updateRecords(error, commited, snapshot)
      })
    },
    updateRecords (error, commited, snapshot) {
      if (!error) {
        let updates = {}
        updates[`/user-albums/${store.state.user.uid}/${this.album.id}`] = {
          rating: this.rating,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }
        updates[`/album-users/${this.album.id}/${store.state.user.uid}`] = {
          rating: this.rating,
          lastfmUsername: store.state.lastfmUsername,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }

        firebase.database().ref().update(updates)
        .catch(error => console.log(error))
      }
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
</style>
