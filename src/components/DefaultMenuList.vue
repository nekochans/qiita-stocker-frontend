<template>
  <section>
    <ul class="menu-list">
      <li>
        <a :class="`${isSelecting && 'is-active'}`" @click="handleClick">
          全てのストック
        </a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class DefaultMenuList extends Vue {
  isSelecting: boolean = false;

  handleClick() {
    this.$router.push({
      name: "stocks"
    });
  }
}
</script>
