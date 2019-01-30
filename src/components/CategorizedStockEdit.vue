<template>
  <div v-show="stocksLength && !isLoading">
    <AlertModal
      :isShow="showAlert"
      :message="alertMessage"
      @closeModal="closeModal"
    />
    <div class="navbar-menu edit-menu">
      <div class="navbar-end">
        <div v-if="!isCategorizing" class="cancel-categorization-margin">
          <button
            :class="
              `button is-light button-margin ${isCancelingCategorizing &&
                'is-link'}`
            "
            @click="setIsCancelingCategorizing"
          >
            カテゴライズを解除する
          </button>
        </div>
        <div v-if="isCategorizing">
          <div
            :class="`select edit-header ${isValidationError && 'is-danger'}`"
          >
            <select
              v-model="selectedCategory"
              @change="isValidationError = false;"
            >
              <option
                v-for="category in displayCategories"
                :value="category"
                :key="category.categoryId"
                >{{ category.name }}</option
              >
            </select>
          </div>
          <button
            class="button is-danger button-margin"
            @click="changeCategory"
          >
            保存
          </button>
          <button
            class="button is-white has-text-grey button-margin"
            @click="cancel"
          >
            キャンセル
          </button>
        </div>
        <div v-show="!isCancelingCategorizing" v-else>
          <button class="button is-light button-margin" @click="startEdit">
            カテゴリに分類する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategory } from "@/domain/qiita";
import AlertModal from "@/components/AlertModal.vue";

@Component({
  components: {
    AlertModal
  }
})
export default class CategorizedStockEdit extends Vue {
  @Prop()
  isLoading!: boolean;

  @Prop()
  stocksLength!: number;

  @Prop()
  isCategorizing!: boolean;

  @Prop()
  isCancelingCategorizing!: boolean;

  @Prop()
  displayCategories!: ICategory[];

  @Prop()
  checkedStockArticleIds!: string[];

  selectedCategory: ICategory = { categoryId: 0, name: "" };
  isValidationError: boolean = false;
  showAlert: boolean = false;
  alertMessage: string = "ストックを1つ以上選択してください。";

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
    if (!this.selectedCategory.categoryId)
      return (this.isValidationError = true);

    if (!this.checkedStockArticleIds.length) return (this.showAlert = true);

    this.$emit("clickCategorize", this.selectedCategory);
    this.doneEdit();
  }

  setIsCancelingCategorizing() {
    this.$emit("clickSetIsCancelingCategorizing");
  }

  closeModal() {
    this.showAlert = false;
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

.cancel-categorization-margin {
  margin-right: 0.5rem;
}

.button-margin {
  margin-bottom: 0.5rem;
}
</style>
