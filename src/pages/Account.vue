<template>
  <section>
    <AppHeader />
    <main class="container">
      <div class="columns">
        <div class="column is-3"><SideMenu :categories="categories" /></div>
        <div class="column is-9">
          <MediaList :qiitaItems="qiitaItems" /> <Pagination />
        </div>
      </div>
    </main>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "@/components/AppHeader.vue";
import SideMenu from "@/components/SideMenu.vue";
import MediaList from "@/components/MediaList.vue";
import Pagination from "@/components/Pagination.vue";
import { ICategory, IQiitaItem } from "@/domain/Qiita";

@Component({
  components: {
    AppHeader,
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

  qiitaItems: IQiitaItem[] = [
    {
      id: "c0a2609ae61a72dcc60f",
      title: "CORSについて理解してLaravel5.6で対応する",
      created_at: "2018/09/30",
      tags: ["CORS", "laravel5.6", "laravel", "php"],
      userId: "kobayashi-m42",
      profile_image_url: "https://avatars3.githubusercontent.com/u/32682645?v=4"
    },
    {
      id: "1",
      title: "CORSについて理解してLaravel5.6で対応する",
      created_at: "2018/09/30",
      tags: ["CORS", "laravel5.6", "laravel", "php"],
      userId: "kobayashi-m42",
      profile_image_url: "https://avatars3.githubusercontent.com/u/32682645?v=4"
    },
    {
      id: "2",
      title: "CORSについて理解してLaravel5.6で対応する",
      created_at: "2018/09/30",
      tags: ["CORS", "laravel5.6", "laravel", "php"],
      userId: "kobayashi-m42",
      profile_image_url: "https://avatars3.githubusercontent.com/u/32682645?v=4"
    }
  ];
}
</script>

<style scoped>
.container {
  padding-top: 2rem;
}
</style>
