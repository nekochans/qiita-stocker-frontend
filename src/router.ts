import Vue from "vue";
import Router from "vue-router";
import Counter from "./components/Counter.vue";
import Weather from "./components/Weather.vue";
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
    }
  ]
});
