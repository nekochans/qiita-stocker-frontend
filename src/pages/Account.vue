<template>
  <section>
    <Header />
    <main class="container">
      <div class="columns">
        <div class="column is-2">
          <SideMenu :categories="categories" />
        </div>
        <div class="column is-10">
          <MediaList />
          <Pagination />
        </div>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import SideMenu from "@/components/SideMenu.vue";
import MediaList from "@/components/MediaList.vue";
import Pagination from "@/components/Pagination.vue";
import { ICategory } from "@/domain/Qiita";

@Component({
  components: {
    Header,
    SideMenu,
    MediaList,
    Pagination
  }
})
export default class Account extends Vue {
  categories: ICategory[] = [
    {
      id: 1,
      name: "設計"
    },
    {
      id: 2,
      name: "テスト"
    },
    {
      id: 3,
      name: "ドメイン駆動設計"
    }
  ];
}
</script>

<style scoped>
.container {
  padding-top: 2rem;
}
</style>
