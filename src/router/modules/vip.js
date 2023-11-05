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
    {
      path: '/vip/vip',
      meta: { requiresAuth: true },
      component: () => import('@/views/vip/vip.vue'),
    },
    {
      path: '/vip/invite',
      meta: { requiresAuth: true },
      component: () => import('@/views/vip/invite.vue'),
    },
  ],
}
