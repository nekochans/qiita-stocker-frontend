<template>
  <div>
    <h1>Error</h1>
    <p>
      {{ errorMessage }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Error extends Vue {
  @Prop()
  errorMessage!: string;
}
</script>
