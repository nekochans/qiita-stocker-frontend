<template>
  <section>
    <ul class="menu-list">
      <li>
        <a :class="`${isSelecting() && 'is-active'}`" @click="handleClick">
          全てのストック
        </a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class DefaultMenuList extends Vue {
  @Prop()
  displayCategoryId!: number;

  handleClick() {
    this.$emit("clickStocksAll");
    this.$router.push({
      name: "stocks"
    });
  }

  isSelecting() {
    return this.displayCategoryId === 0;
  }
}
</script>
