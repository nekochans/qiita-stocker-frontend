<template>
  <div>
    <Media />
    <Media />
    <Media />
    <Media />
    <Media />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Media from "@/components/Media.vue";

@Component({
  components: {
    Media
  }
})
export default class MediaList extends Vue {}
</script>
