<template>
  <div class="home">
     <ul>
       <li>
         <router-link to="/counter">counter</router-link>
       </li>
       <li>
         <router-link to="/weather">weather</router-link>
       </li>
       <li>
         <router-link to="/signup">sign up</router-link>
       </li>
       <li>
         <router-link to="/login">login</router-link>
       </li>
       <li>
         <router-link to="/cancel">cancel</router-link>
       </li>
     </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
