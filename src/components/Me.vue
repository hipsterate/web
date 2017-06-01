<template>
  <div>
    <h1>My Page</h1>
    <button class="dark" @click="lastfmSignIn">Please signin with Last.fm!</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    lastfmSignIn: function () {
      window.open(`${process.env.LASTFM_AUTH_PAGE}/auth/?api_key=${process.env.LASTFM_API_KEY}&cb=${process.env.LASTFM_SIGNIN_CB}`)
    }
  }
}
</script>
