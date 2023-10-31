export default {
  path: '/vip',
  name: 'vip',
  redirect: '/vip/detail',
  component: () => import('@/views/vip/layout.vue'),
  children: [
    {
      path: '/vip/detail',
      meta: { requiresAuth: true },
      component: () => import('@/views/vip/detail.vue'),
    },
  ],
}
