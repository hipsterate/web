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
      if (this.selectedClassifyType === 'timeAsc' || this.selectedClassifyType === 'timeDsc') {
        return true
      }

      return false
    },
    byTimeOrder () {
      return this.selectedClassifyType.substr(-3).toLowerCase()
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
