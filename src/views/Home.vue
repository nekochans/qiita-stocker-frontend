<template>
  <div class="home">
     <ui>
       <li>
         <router-link to="/counter">counter</router-link>
       </li>
       <li>
         <router-link to="/weather">weather</router-link>
       </li>
     </ui>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
