<script setup>
import { isElectronMode } from "@/utils/common";
</script>

<template>
  <!-- <div id="logo-name" v-if="!isElectronMode()">IIM</div> -->
  <img class="logo" src="/logo.png" />

  <section class="section">
    <router-view />
  </section>

  <div class="copyright">
    <span>Copyright © 2023 IIM. All Rights Reserved.</span>
    <br />
    <span>v1.0.0</span>
  </div>

  <div class="fly-box">
    <div class="fly bg-fly-circle1"></div>
    <div class="fly bg-fly-circle2"></div>
    <div class="fly bg-fly-circle3"></div>
    <div class="fly bg-fly-circle4"></div>
  </div>
</template>

<style lang="less" scoped>
body {
  -webkit-app-region: drag;
}
@import "@/assets/css/login.less";

.section {
  height: 100vh;
  width: 100vw;
}
</style>
