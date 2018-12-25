import Vue from "vue";
import Router from "vue-router";
import Counter from "./pages/Counter.vue";
import Weather from "./pages/Weather.vue";
import SignUp from "./pages/SignUp.vue";
import Login from "./pages/Login.vue";
import Account from "./pages/Stocks.vue";
import OAuthCallback from "./pages/oAuth/callback/OAuthCallback.vue";
import Cancel from "./pages/cencel/Cancel.vue";
import CancelComplete from "./pages/cencel/complete/CancelComplete.vue";
import Error from "./pages/Error.vue";
import NotFound from "./pages/NotFound.vue";
import Home from "./pages/Home.vue";
import { STORAGE_KEY_SESSION_ID } from "@/domain/qiita";
import LocalStorageFactory from "@/factory/repository/LocalStorageFactory";

const localStorage = LocalStorageFactory.create();

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/counter",
      name: "counter",
      component: Counter
    },
    {
      path: "/weather",
      name: "weather",
      component: Weather
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/stocks/all",
      name: "stocks",
      component: Account,
      meta: { requiresAuth: true }
    },
    {
      path: "/oauth/callback",
      name: "oAuthCallback",
      component: OAuthCallback
    },
    {
      path: "/cancel",
      name: "cancel",
      component: Cancel,
      meta: { requiresAuth: true }
    },
    {
      path: "/cancel/complete",
      name: "cancelComplete",
      component: CancelComplete,
      meta: { requiresAuth: true }
    },
    {
      path: "/error",
      name: "error",
      component: Error,
      props: true
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.load(STORAGE_KEY_SESSION_ID) || "";

  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    isLoggedIn === ""
  ) {
    next({ path: "/", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
