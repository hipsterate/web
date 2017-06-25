<template>
  <div>
    <div class="album-grid">
      <album class="album" v-for="album of rateds" :key="album.mbid" :album="album" :isPlayCount="false"></album>
    </div>
  </div>
</template>

<script>
import store from 'store'
import firebase from 'utils/firebase'
import Album from 'components/Album'

export default {
  components: {
    Album
  },
  data () {
    return {
      rateds: []
    }
  },
  created () {
    firebase.database().ref(`/user-albums/${store.state.user.uid}`)
    .once('value')
    .then(snapshot => {
      let result = snapshot.val()
      if (result) {
        result = Object.keys(result).map(k => {
          result[k].id = k
          return result[k]
        })
        this.rateds = result.sort((a, b) => b.updatedAt - a.updatedAt)
      }
    })
  }
}
</script>

<style scoped>
.album-grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: strech;
  align-content: strech;
}

.album-grid>.album {
  flex-basis: 200px;
  flex-grow: 1;
}
</style>
