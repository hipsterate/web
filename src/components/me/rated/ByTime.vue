<template>
  <div>
    <div class="album-grid" v-if="albums.length">
      <album class="album" v-for="album of sortedAlbums" :key="albumKey(album)" :album="album" :isPlayCount="false"></album>
    </div>
    <div v-else>
      아직 평가한 앨범이 없어요 ㅜㅅㅜ<br>
      위의 "최근 들은 앨범" 메뉴로 이동해서 평가를 시작하세요!
    </div>
  </div>
</template>

<script>
export default {
  props: ['albums', 'order'],
  created () {
    if (this.order === 'asc') {
      this.sortedAlbums = this.albums.sort((a, b) => a.updatedAt - b.updatedAt)
    }
    else {
      this.sortedAlbums = this.albums.sort((a, b) => b.updatedAt - a.updatedAt)
    }
  }
}
</script>
