<template>
  <div v-show="stocksLength && !isLoading">
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
        <CategorizeButton
          :isCategorizing="isCategorizing"
          :isCancelingCategorizing="isCancelingCategorizing"
          :displayCategories="displayCategories"
          :checkedStockArticleIds="checkedStockArticleIds"
          @clickSetIsCategorizing="onSetIsCategorizing"
          @clickCategorize="onClickCategorize"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategory } from "@/domain/qiita";
import CategorizeButton from "@/components/CategorizeButton.vue";

@Component({
  components: {
    CategorizeButton
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

  setIsCancelingCategorizing() {
    this.$emit("clickSetIsCancelingCategorizing");
  }

  onSetIsCategorizing() {
    this.$emit("clickSetIsCategorizing");
  }

  onClickCategorize(category: ICategory) {
    this.$emit("clickCategorize", category);
  }
}
</script>

<style scoped>
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
