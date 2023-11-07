export default {
  path: '/vip',
  name: 'vip',
  redirect: '/vip/info',
  component: () => import('@/views/vip/layout.vue'),
  children: [
    {
      path: '/vip/info',
      meta: { requiresAuth: true },
      component: () => import('@/views/vip/info.vue'),
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
