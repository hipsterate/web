<template>
  <div class="rated">
    <template v-if="albums !== null">
      <div class="classify-type">
        <q-select type="list" v-model="selectedClassifyType" :options="classifyType"></q-select>
      </div>

      <by-time v-if="selectedClassifyType === 'timeAsc'" :albums="albums" :order="'asc'"></by-time>
      <by-time v-else-if="selectedClassifyType === 'timeDesc'" :albums="albums" :order="'desc'"></by-time>
      <by-rating v-else :albums="albums"></by-rating>
    </template>
  </div>
</template>

<script>
import store from 'store'
import ByTime from 'components/me/rated/ByTime'
import ByRating from 'components/me/rated/ByRating'
import firebase from 'utils/firebase'

export default {
  components: {
    ByTime, ByRating
  },
  data () {
    return {
      albums: null,
      selectedClassifyType: 'rating',
      classifyType: [{
        label: '별점',
        value: 'rating'
      }, {
        label: '평가 시간 (내림차순)',
        value: 'timeDesc'
      }, {
        label: '평가 시간 (오름차순)',
        value: 'timeAsc'
      }]
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
</style>
