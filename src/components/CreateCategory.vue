<template>
  <section>
    <button v-if="!editing" @click="editing = true;" class="button view">
      カテゴリを追加
    </button>
    <div v-show="editing">
      <div class="field">
        <input class="input" type="text" v-focus="editing" />
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-small is-danger" @click="saveCategory">
            カテゴリを追加
          </button>
          <a class="has-text-grey is-size-7 cancel" @click="cancelEdit"
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

  cancelEdit() {
    this.editing = false;
  }

  saveCategory() {
    this.editing = false;
  }
}
</script>

<style scoped>
.cancel {
  float: right;
}
</style>
