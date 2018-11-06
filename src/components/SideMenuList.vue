<template>
  <section class="side-menu-list">
    <p class="menu-label">
      カテゴリ一覧
    </p>
    <ul class="menu-list">
      <li
        v-for="category in categories"
        :key="category.id"
      >
        <a
          :data-category="category.id"
          @click="clickHandle"
          :class="`${isActive(category.id) && 'is-active'}`"
        >
          {{ category.name }}
        </a>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategory } from "@/domain/Qiita";

@Component
export default class SideMenuList extends Vue {
  @Prop()
  categories!: ICategory[];

  clickHandle(event: any) {
    // TODO カテゴリが選択済みの場合、何もしない
    // TODO 選択されたカテゴリの記事を表示する
    console.log(`${event.target.dataset.category} clicked!!`);
  }

  isActive(id: ICategory["id"]) {
    return id === 1;
  }
}
</script>

<style scoped>
.side-menu-list {
  margin-top: 1em;
}
</style>
