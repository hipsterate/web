<template>
  <div>
    <div class="album-grid">
      <album class="album" v-for="album of rateds" :key="album.mbid" :album="album" :isPlayCount="false"></album>
    </div>
  </div>
</template>

<script>
import store from 'store'
import { firebase } from 'utils/api'
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
    firebase.getDB(`/user-albums/${store.state.user.uid}`)
    .then(result => {
      const value = result.val()

      if (value) {
        const rateds = Object.keys(value).map(key => {
          value[key].id = key
          return value[key]
        })

        this.rateds = rateds.sort((a, b) => b.updatedAt - a.updatedAt)
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
