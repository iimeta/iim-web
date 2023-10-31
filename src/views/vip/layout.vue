<script setup>
import Layout from '@/layout/index.vue'
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { User } from '@icon-park/vue-next'

const menus = [
  {
    name: '会员信息',
    path: '/vip/detail',
    icon: User,
  },
]
</script>

<template>
  <Layout :index="4">
    <SubViewLayout title="会员中心" :menus="menus" />
  </Layout>
</template>
