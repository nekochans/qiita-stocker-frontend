<template>
  <div class="navbar-menu">
    <div class="navbar-end">
      <div v-if="isCategorizing">
        <div class="select edit-header">
          <select v-model="selectedCategoryId">
            <option
              v-for="category in categories"
              :value="category.categoryId"
              :key="category.categoryId"
              >{{ category.name }}</option
            >
          </select>
        </div>
        <button class="button is-danger" @click="changeCategory">保存</button>
        <button class="button is-white has-text-grey" @click="cancel">
          キャンセル
        </button>
      </div>
      <div v-else>
        <button class="button is-light" @click="startEdit">
          カテゴリに分類する
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategory } from "@/domain/qiita";

@Component
export default class StockEdit extends Vue {
  @Prop()
  isCategorizing!: boolean;

  @Prop()
  categories!: ICategory[];

  selectedCategoryId: number = 0;

  doneEdit() {
    this.$emit("clickSetIsCategorizing");
  }

  startEdit() {
    this.doneEdit();
  }

  cancel() {
    this.doneEdit();
  }

  changeCategory() {
    // TODO カテゴリが選択されていなかった場合エラーを表示する
    this.$emit("clickCategorize", this.selectedCategoryId);
    this.doneEdit();
  }
}
</script>

<style scoped>
.edit-header {
  margin-right: 10px;
}
</style>
