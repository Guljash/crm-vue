import { createRouter, createWebHistory } from "vue-router";
import * as firebase from "firebase/app";

const routes = [
  {
    path: "/",
    name: "Home",
    meta: { layout: "main", auth: true, title: "Счета" },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "empty", title: "Логин" },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "empty", title: "Регистрация" },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "main", auth: true, title: "Категории" },
    component: () => import("../views/Categories.vue"),
  },
  {
    path: "/detail-record/:id",
    name: "detail-record",
    meta: { layout: "main", auth: true, title: "Детали" },
    component: () => import("../views/DetailRecord.vue"),
  },
  {
    path: "/history",
    name: "history",
    meta: { layout: "main", auth: true, title: "История" },
    component: () => import("../views/History.vue"),
  },
  {
    path: "/planning",
    name: "planning",
    meta: { layout: "main", auth: true, title: "Планирование" },
    component: () => import("../views/Planning.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: { layout: "main", auth: true, title: "Профиль" },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/record",
    name: "record",
    meta: { layout: "main", auth: true, title: "Запись" },
    component: () => import("../views/Record.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.default.auth().currentUser
  const requireAuth = to.matched.some(r => r.meta.auth)
  document.title = to.meta.title
  console.log(from);

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  }else {
    next()
  }
})

export default router;
