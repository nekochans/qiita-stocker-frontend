<template>
  <section>
    <button v-if="!editing" @click="editing = true;" class="button view">
      カテゴリを追加
    </button>
    <div v-show="editing">
      <div class="field">
        <input
          class="input"
          type="text"
          v-focus="editing"
          v-model="category"
          @input="setCategory"
        />
      </div>
      <div class="field">
        <p class="control">
          <button
            class="button is-small is-danger"
            @click="onClickSaveCategory"
          >
            カテゴリを追加
          </button>
          <a class="has-text-grey is-size-7 cancel" @click="doneEdit"
            >キャンセル</a
          >
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ICategory } from "@/domain/Qiita";

@Component({
  directives: {
    focus: function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
})
export default class CreateCategory extends Vue {
  editing: boolean = false;
  category: string = "";

  doneEdit() {
    this.category = "";
    this.editing = false;
  }

  onClickSaveCategory() {
    // TODO バリデーションを追加する
    this.$emit("clickSaveCategory", this.category);
    this.doneEdit();
  }

  setCategory(event: any) {
    this.category = event.target.value;
  }
}
</script>

<style scoped>
.cancel {
  float: right;
}
</style>
