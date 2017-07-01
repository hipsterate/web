<template>
  <div>
    <div v-for="(currentAlbums, i) of reversedClassifiedAlbums">
      <template v-if="currentAlbums.length">
        <div class="rating">
          <span class="label bg-dark text-white">
            <i class="left-detail">star</i> {{10 - i}}
          </span>
        </div>
        <div class="album-grid">
          <album class="album" v-for="album of currentAlbums" :key="albumKey(album)" :album="album" :isPlayCount="false"></album>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import md5 from 'blueimp-md5'
import Album from 'components/Album'

export default {
  props: ['albums'],
  components: {
    Album
  },
  data () {
    return {
      classifiedAlbums: [[], [], [], [], [], [], [], [], [], []]
    }
  },
  computed: {
    reversedClassifiedAlbums () {
      return this.classifiedAlbums.reverse()
    }
  },
  methods: {
    albumKey (album) {
      return md5(`${album.artistName}${album.name}`)
    }
  },
  created () {
    for (let album of this.albums) {
      this.classifiedAlbums[album.rating - 1].push(album)
    }
  }
}
</script>

<style scoped>
.rating {
  margin-bottom: 1em;
}

.album-grid {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: strech;
  align-content: strech;

  margin-bottom: 2em;
}

.album-grid>.album {
  flex-basis: 200px;
  flex-grow: 1;
}
</style>
