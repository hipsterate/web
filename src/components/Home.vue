<template>
  <div class="home-container">
    <h4>Hipsterate!</h4>

    <router-link :to="{ name: 'me' }">
      <button class="dark">My Page</button>
    </router-link>
    <button class="dark" @click="signOut">Sign Out</button>
  </div>
</template>

<script>
import firebase from 'utils/firebase'
import store from 'store'

export default {
  methods: {
    signOut () {
      firebase.signOut()
      .then(result => {
        store.setUser(null)
        this.$router.push({ name: 'home' })
      })
      .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.home-container {
  padding-left: 1em;
  padding-right: 1em;
}
</style>
