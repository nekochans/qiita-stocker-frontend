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
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class extends Vue {
  @Prop()
  displayCategoryId!: number

  handleClick() {
    if (this.isSelecting()) return
    this.$emit('clickStocksAll')
    this.$router.push({ path: '/stocks/all' })
  }

  isSelecting() {
    return this.displayCategoryId === 0
  }
}
</script>
