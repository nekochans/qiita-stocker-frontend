import Vue from "vue";
import Router from "vue-router";
import Counter from "./pages/Counter.vue";
import Weather from "./pages/Weather.vue";
import SignUp from "./pages/SignUp.vue";
import Login from "./pages/Login.vue";
import Account from "./pages/Account.vue";
import OAuthCallback from "./pages/oAuth/callback/OAuthCallback.vue";
import Cancel from "./pages/cencel/Cancel.vue";
import CancelComplete from "./pages/cencel/complete/CancelComplete.vue";
import Error from "./pages/Error.vue";
import NotFound from "./pages/NotFound.vue";
import Home from "./pages/Home.vue";

Vue.use(Router);

export default new Router({
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
      component: Account
    },
    {
      path: "/oauth/callback",
      name: "oAuthCallback",
      component: OAuthCallback
    },
    {
      path: "/cancel",
      name: "cancel",
      component: Cancel
    },
    {
      path: "/cancel/complete",
      name: "cancelComplete",
      component: CancelComplete
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
