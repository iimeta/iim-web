<script setup>
import { isElectronMode } from "@/utils/common";
import config from "../../../package.json";
import { GithubOne } from "@icon-park/vue-next";
</script>

<template>
  <div>
    <img class="logo" src="/logo.png" />
    <span class="logo-name">智元 IIM</span>
  </div>
  <div>
    <div class="slogan1">IIM 你的专属助手</div>
    <div class="slogan2">激发创意  让工作与生活更轻松</div>
  </div>
  <section class="section">
    <router-view />
  </section>
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
