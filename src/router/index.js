import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: {
      name: "management"
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/management",
    name: "management",
    redirect: "/management/userCenter",
    component: () => import("../views/Management.vue"),
    children: [
      {
        path: "userCenter",
        name: "userCenter",
        component: () => import("../components/UserCenter.vue")
      },
      {
        path: "pointMall",
        name: "pointMall",
        component: () => import("../components/PointMall.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!(to.name == "login" || to.name == "register")) {
    const isLogin = localStorage.getItem("userid") || "";
    if (!isLogin) {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
