import Vue from "vue";
import Router from "vue-router";
import Counter from "./components/Counter.vue";
import Weather from "./components/Weather.vue";
import SignUp from "./components/SignUp.vue";
import Login from "./components/Login.vue";
import OAuthCallback from "./components/OAuthCallback.vue";
import Cancel from "./components/Cancel.vue";
import Error from "./components/Error.vue";
import Home from "./views/Home.vue";

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
      path: "/error",
      name: "error",
      component: Error,
      props: true
    }
  ]
});
