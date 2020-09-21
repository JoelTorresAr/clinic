import Vue from "vue";
import VueRouter from "vue-router";
//import Middlewares from '../middleware/'

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: 'Auth',
    component: () => import("../views/Login.vue"),
    meta: {
     // middleware: [Middlewares.guest]
    }
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
        component: require('../views/Attentions.vue').default,
        meta: {
         // middleware: [Middlewares.auth]
        },
      },
      {
        path: '/matrix',
        name: 'Matrix',
        component: require('../views/Matrix3.vue').default,
        meta: {
        //  middleware: [Middlewares.auth]
        },
      },
    ]
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

function nextCheck(context, middleware, index) {
  const nextMiddleware = middleware[index];
  if (!nextMiddleware) return context.next;

  return (...parameters) => {
      context.next(...parameters);
      const nextMidd = nextCheck(context, middleware, index + 1);

      nextMiddleware({...context, next: nextMidd });
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware];

      const context = {
          from,
          next,
          router,
          to
      }
      const nextMiddleware = nextCheck(context, middleware, 1);

      return middleware[0]({...context, next: nextMiddleware })
  }
  return next();
});

export default router;
