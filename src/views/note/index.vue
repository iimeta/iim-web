<script setup>
import { computed } from 'vue'
import Layout from '@/layout/index.vue'
import NoteMenu from './inner/NoteMenu.vue'
import NoteList from './inner/NoteList.vue'
import NoteView from './inner/NoteView.vue'
import NoteEmpty from './inner/NoteEmpty.vue'
import { useNoteStore } from '@/store/note'

const noteStore = useNoteStore()

const loadId = computed(() => noteStore.view.loadId)
</script>

<template>
  <Layout :index="2">
    <section class="el-container height100">
      <aside class="el-aside" style="width: 230px"><NoteMenu /></aside>
      <aside class="el-aside" style="width: 350px" v-dropsize="{ min: 200, max: 500, direction: 'right' }">
        <NoteList />
      </aside>
      <main class="el-main" v-if="loadId > 0"><NoteView /></main>
      <main class="el-main" v-else><NoteEmpty /></main>
    </section>
  </Layout>
</template>

<style lang="less" scoped></style>
