<script setup>
import Layout from '@/layout/index.vue'
import SubViewLayout from '@/layout/SubViewLayout.vue'
import { User,VipOne,People } from '@icon-park/vue-next'

const menus = [
  {
    name: '会员信息',
    path: '/vip/detail',
    icon: User,
    size: 18,
  },
  {
    name: '会员权益',
    path: '/vip/vip',
    icon: VipOne,
    size: 18,
  },
  {
    name: '邀请好友',
    path: '/vip/invite',
    icon: People,
    size: 18,
  },
]
</script>

<template>
  <Layout :index="4">
    <SubViewLayout title="会员中心" :menus="menus" />
  </Layout>
</template>
