<template>
  <section>
    <button v-if="!editing" class="button view" @click="editing = true">
      カテゴリを追加
    </button>
    <div v-show="editing">
      <div class="field">
        <input
          v-model="category"
          v-focus="editing"
          :class="`input ${isValidationError && 'is-danger'}`"
          type="text"
          @input="setCategory"
        />
        <p v-if="isValidationError" class="help is-danger">
          カテゴリを入力してください。
        </p>
      </div>
      <div class="field">
        <p class="control flexbox">
          <button
            class="button is-small is-danger"
            @click="onClickSaveCategory"
          >
            カテゴリを追加
          </button>
          <a class="has-text-grey is-size-7" @click="doneEdit">キャンセル</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})
export default class extends Vue {
  editing: boolean = false

  category: string = ''

  isValidationError: boolean = false

  doneEdit() {
    this.isValidationError = false
    this.category = ''
    this.editing = false
  }

  onClickSaveCategory() {
    this.category = this.category.trim()
    if (this.category === '') {
      this.isValidationError = true
      return
    }

    this.$emit('clickSaveCategory', this.category)
    this.doneEdit()
  }

  setCategory(event: any) {
    this.category = event.target.value
  }
}
</script>

<style scoped>
.flexbox {
  display: flex;
  justify-content: space-between;
}
</style>
