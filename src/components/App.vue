<template>
  <!-- <q-app>
    <q-layout :class="{ transperent: isHome }">
      <div slot="header" class="toolbar bg-blue-grey-10">
        <router-link class="go-home" :to="{ name: 'home' }">
          <q-toolbar-title :padding="0">Hipsterate</q-toolbar-title>
        </router-link>
        <button v-if="!user" @click="signInDialog">
          <i>supervisor_account</i>
          로그인
        </button>
        <button v-else @click="goMe">{{ user.email.split('@')[0] }}</button>
      </div>

    </q-layout>
  </q-app>-->
  <!-- <router-view
    class="layout-view content"
    @:toolbarStyle="changeToolbarStyle"
  ></router-view>-->
  <NavBar />
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import NavBar from './app/NavBar.vue';

@Component({
  components: { NavBar },
})
export default class App extends Vue {
  // data
  // store = store;
  isHome = true;

  // lifecycle
  created() {
    console.log('hello world');
    // firebase.onAuthChanged().then(user => {
    //   store.setUser(user);
    // });
  }

  // computed
  get user() {
    return null;
    // return this.store.state.user;
  }

  // method
  signInDialog() {
    // const vm = this;
    // Dialog.create({
    //   title: "로그인",
    //   message: "로그인 할 계정 타입을 선택해주세요!",
    //   stackButtons: true,
    //   buttons: [
    //     {
    //       label: "Google",
    //       handler() {
    //         console.log("google");
    //         vm.signIn("google");
    //       }
    //     },
    //     {
    //       label: "Facebook",
    //       handler() {
    //         vm.signIn("facebook");
    //       }
    //     }
    //   ]
    // });
  }

  signIn() {
    // firebase
    //   .signIn(provider)
    //   .then(result => {
    //     store.setUser(result.user);
    //     this.$router.push({ name: "me" });
    //   })
    //   .catch(error => console.log(error));
  }

  goMe() {
    // this.$router.push({ name: "me" });
  }

  changeToolbarStyle() {
    // if (where === "home") {
    //   this.isHome = true;
    // } else {
    //   this.isHome = false;
    // }
  }
}
</script>

<style scoped lang="scss">
// .go-home {
//   color: #fff;
// }

// .transperent {
//   opacity: 0.7;
// }
//
</style>
