<template>
  <div v-show="stocksLength && !isLoading" class="navbar-menu edit-menu">
    <div class="navbar-end">
      <div v-if="isCategorizing">
        <div :class="`select edit-header ${isValidationError && 'is-danger'}`">
          <select v-model="selectedCategory">
            <option
              v-for="category in displayCategories"
              :value="category"
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
  isLoading!: boolean;

  @Prop()
  stocksLength!: number;

  @Prop()
  isCategorizing!: boolean;

  @Prop()
  displayCategories!: ICategory[];

  selectedCategory: ICategory = { categoryId: 0, name: "" };
  isValidationError: boolean = false;

  doneEdit() {
    this.isValidationError = false;
    this.$emit("clickSetIsCategorizing");
  }

  startEdit() {
    this.doneEdit();
  }

  cancel() {
    this.doneEdit();
  }

  changeCategory() {
    if (this.selectedCategory.categoryId === 0) {
      this.isValidationError = true;
      return;
    }

    this.$emit("clickCategorize", this.selectedCategory);
    this.doneEdit();
  }
}
</script>

<style scoped>
.edit-header {
  margin-right: 10px;
}

.edit-menu {
  display: block;
  box-shadow: none;
}
</style>
