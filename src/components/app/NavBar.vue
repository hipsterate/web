<template>
  <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Hipsterate</el-menu-item>
  </el-menu>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class NavBar extends Vue {
  activeIndex = 1;

  handleSelect(key: string) {
    console.log(key);
  }
}
</script>


