import { createRouter, createWebHashHistory } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => DefaultLayout,
    redirect: '/projects-observatory',
    children: [
      {
        path: "/projects-observatory",
        name: "Project Observatory",
        redirect: '/projects-observatory/statistic',
        children: [
          {
            path: "/projects-observatory/statistic", 
            name: "Statistic",
            component: () => import('@/pages/Statistic.vue')
          },
          {
            path: '/projects-observatory/diff',
            name: "Diffs",
            component: () => import('@/pages/Diff.vue')
          }
        ],
      },
      {
        path: '/packages-observatory',
        name: 'Package Observatory',
        redirect: '/packages-observatory/search',
        children: [
          {
            path: '/packages-observatory/search',
            name: "Search",
            component: () => import('@/pages/Search.vue')
          }
        ]
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }; // always scroll to top
  },
});

export default router;
