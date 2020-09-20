import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: 'Auth',
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/",
    name: "Home",
    redirect: 'Attentions',
    component: () => import("../layouts/default.vue"),
    children: [
      {
        path: '/',
        name: 'Attentions',
        component: require('../views/Attentions.vue').default
      },
      {
        path: '/matrix',
        name: 'Matrix',
        component: require('../views/Matrix3.vue').default
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
