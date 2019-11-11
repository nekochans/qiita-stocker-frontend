<template>
  <Login />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Login from '@/components/pages/Login.vue'

@Component({
  components: {
    Login
  }
})
export default class extends Vue {}
</script>
