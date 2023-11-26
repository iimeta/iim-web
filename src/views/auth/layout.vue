<script setup>
import { isElectronMode } from "@/utils/common";
import config from "../../../package.json";
import { GithubOne } from "@icon-park/vue-next";
</script>

<template>
  <!-- <div id="logo-name" v-if="!isElectronMode()">IIM</div> -->
  <div>
    <img class="logo" src="/logo.png" />
    <span class="logo-name">智元 IIM</span>
  </div>

  <section class="section">
    <router-view />
  </section>

  <div class="copyright">
    <span><b>Copyright © 2023 IIM. All Rights Reserved.</b></span>
    <br />
    <a href="https://github.com/iimeta/iim-client" target="_blank"
      ><span
        ><b>v{{ config.version }}</b></span
      ></a
    >
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
