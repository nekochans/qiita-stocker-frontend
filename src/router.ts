import Vue from "vue";
import Router from "vue-router";
import Counter from "./views/Counter.vue";
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
    }
  ]
});
