<template>
  <v-toolbar>
    <v-toolbar-title>Hipsterate</v-toolbar-title>
    <v-spacer />
    <v-toolbar-items> <v-btn flat>username</v-btn> </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NavBar extends Vue {
  activeIndex = 1;

  created() {
    console.log('navbar created');
  }

  handleSelect(key: string) {
    console.log(key);
  }
}
</script>
