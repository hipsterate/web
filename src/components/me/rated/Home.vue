<template>
  <div class="rated">
    <template v-if="albums !== null">
      <div class="classify-type">
        <q-select type="list" v-model="selectedClassifyType" :options="classifyType"></q-select>
      </div>

      <by-time v-if="isByTime" :albums="albums" :order="byTimeOrder"></by-time>
      <by-rating v-else :albums="albums"></by-rating>
    </template>
  </div>
</template>

<script>
import md5 from 'blueimp-md5'
import store from 'store'
import firebase from 'utils/firebase'
import Album from 'components/Album'
import ByTime from 'components/me/rated/ByTime'
import ByRating from 'components/me/rated/ByRating'

export default {
  components: {
    Album, ByTime, ByRating
  },
  data () {
    return {
      albums: null,
      selectedClassifyType: 'timeDsc',
      classifyType: [{
        label: '평가 시간 (내림차순)',
        value: 'timeDsc'
      }, {
        label: '평가 시간 (오름차순)',
        value: 'timeAsc'
      }, {
        label: '별점',
        value: 'rating'
      }]
    }
  },
  computed: {
    isByTime () {
      if (this.selectedClassifyType === 'timeAsc' || this.selectedClassifyType === 'timeAsc') {
        return true
      }

      return false
    },
    byTimeOrder () {
      return this.selectedClassifyType.substr(-3).toLowerCase()
    }
  },
  methods: {
    albumKey (album) {
      return md5(`${album.artistName}${album.name}`)
    }
  },
  created () {
    firebase.getDB(`/user-albums/${store.state.user.uid}`)
    .then(result => {
      const value = result.val()

      if (value) {
        this.albums = Object.keys(value).map(key => {
          return value[key]
        })
      }
    })
  }
}
</script>

<style scoped>
.rated {
  position: relative;
  overflow: visible;
}

.classify-type {
  position: absolute;
  top: -4em;
  right: 2em;
}

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
