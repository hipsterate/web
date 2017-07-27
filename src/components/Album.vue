<template>
  <div>
    <div :id="key" class="album-container" @mouseenter="info = true" @mouseleave="info = false" @touchstart="info = !info">

      <img class="image" :src="album.image">

      <div class="info" v-if="info">
        <h4 class="artist-title"><a :href="album.lastfmLink" target="_blank">{{ album.artistName }} - {{ album.name }}</a></h4>

        <div class="play-count" :class="{ 'display-hidden': !isPlayCount }">
          <span class="count">{{ album.playCount }}</span><span class="times">time<span v-if="album.playCount > 1">s</span></span>
        </div>

        <fieldset class="rating">
          <i :class="star10" class="star rating10" @click="rate(10)"></i>
          <i :class="star9" class="star rating9 half" @click="rate(9)"></i>
          <i :class="star8" class="star rating8" @click="rate(8)"></i>
          <i :class="star7" class="star rating7 half" @click="rate(7)"></i>
          <i :class="star6" class="star rating6" @click="rate(6)"></i>
          <i :class="star5" class="star rating5 half" @click="rate(5)"></i>
          <i :class="star4" class="star rating4" @click="rate(4)"></i>
          <i :class="star3" class="star rating3 half" @click="rate(3)"></i>
          <i :class="star2" class="star rating2" @click="rate(2)"></i>
          <i :class="star1" class="star rating1 half" @click="rate(1)"></i>
        </fieldset>
      </div>

    </div>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import store from 'store'
import firebase from 'utils/firebase'

export default {
  props: ['album', 'isPlayCount'],
  data () {
    return {
      info: false,
      rating: 0,
      star10: { selected: false },
      star9: { selected: false },
      star8: { selected: false },
      star7: { selected: false },
      star6: { selected: false },
      star5: { selected: false },
      star4: { selected: false },
      star3: { selected: false },
      star2: { selected: false },
      star1: { selected: false }
    }
  },
  computed: {
    key () {
      return md5(`${this.album.artistName}${this.album.name}`)
    }
  },
  methods: {
    rate (rating) {
      if (this.rating !== rating) {
        const from = this.rating
        const to = rating
        this.$emit('changeRate', this.album, from, to)
      }

      this.rating = rating

      for (let i of Array(10).keys()) {
        if (i + 1 === rating) {
          this[`star${i + 1}`].selected = true
        }
        else {
          this[`star${i + 1}`].selected = false
        }
      }

      firebase.createNewAlbumAtomic(this.album, (error, commited, snapshot) => {
        const newAlbum = Object.assign({}, this.album)
        newAlbum.rating = rating
        newAlbum.lastfmUsername = store.state.lastfmUsername
        newAlbum.updatedAt = firebase.timestamp
        delete newAlbum.playCount

        if (!error) {
          let updates = {}
          updates[`/user-albums/${store.state.user.uid}/${this.key}`] = newAlbum
          updates[`/album-users/${this.key}/${store.state.user.uid}`] = newAlbum

          firebase.updateDB(updates)
          .catch(error => console.log(error))
        }
      })
    }
  },
  created () {
    firebase.getDB(`/user-albums/${store.state.user.uid}/${this.key}`)
    .then(result => {
      const value = result.val()

      if (value) {
        this.rating = value.rating

        for (let i of Array(10).keys()) {
          if (i + 1 === value.rating) {
            this[`star${i + 1}`].selected = true
          }
          else {
            this[`star${i + 1}`].selected = false
          }
        }
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

.display-hidden {
  visibility: hidden;
}

.album-container>.info>.play-count {
  height: 45%;
  margin: 30% 0 0 0;
  text-align: center;
}

.album-container>.info>.play-count>.count {
  color: #fff;
  font-size: 1.5em;
  font-weight: 600;
}

.album-container>.info>.play-count>.times {
  padding-left: 0.3em;

  color: #fff;
  font-size: 1em;
  font-weight: 300;
}

@import url(//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css);

.rating {
  margin: 0;
  padding: 0;
  border: none;
}

.rating>.star:before {
  display: inline-block;
  margin: 0.2em;
  font-size: 1.25em;
  font-family: FontAwesome;
  content: "\f005";
}

.rating>.star.half:before {
  position: absolute;
  content: "\f089";
}

.rating>.star {
  float: right;
  cursor: pointer;
}

.rating>.star.selected,
.rating>.star.selected~.star,
.rating>.star:hover,
.rating>.star:hover~.star {
  color: #FFD700;
}
</style>
