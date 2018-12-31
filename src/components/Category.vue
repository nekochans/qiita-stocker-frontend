<template>
  <li>
    <div v-if="!editing">
      <a
        :data-category="category.categoryId"
        @click="onClickCategory"
        :class="`${isActive(category.categoryId) && 'is-active'}`"
      >
        {{ category.name }}
        <p class="edit" @click="editing = true;">編集</p>
      </a>
    </div>
    <div v-show="editing">
      <div class="field">
        <input
          :class="`input edit-field ${isValidationError && 'is-danger'}`"
          type="text"
          v-focus="editing"
          v-model="editCategoryName"
        />
        <a class="has-text-grey is-size-7 destroy">削除</a>
        <p v-if="isValidationError" class="help is-danger">
          カテゴリを入力してください。
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button
            class="button is-small is-danger"
            @click="onClickUpdateCategory"
          >
            保存
          </button>
          <a class="has-text-grey is-size-7 cancel" @click="doneEdit"
            >キャンセル</a
          >
        </p>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/qiita";

@Component({
  directives: {
    focus: function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
})
export default class Category extends Vue {
  @Prop()
  category!: ICategory;

  editing: boolean = false;
  editCategoryName = this.category.name;
  isValidationError: boolean = false;

  onClickCategory() {
    if (this.editing) {
      return;
    }
    console.log(`${this.category.categoryId} clicked!!`);
  }

  isActive(id: ICategory["categoryId"]) {
    return id === 1;
  }

  doneEdit() {
    this.isValidationError = false;
    this.editCategoryName = this.category.name;
    this.editing = false;
  }

  onClickUpdateCategory() {
    this.editCategoryName = this.editCategoryName.trim();
    if (this.editCategoryName === "") {
      this.isValidationError = true;
      return;
    }

    const updateCategoryPayload: IUpdateCategoryPayload = {
      stateCategory: this.category,
      categoryName: this.editCategoryName
    };

    this.$emit("clickUpdateCategory", updateCategoryPayload);
    this.doneEdit();
  }
}
</script>

<style scoped>
.edit {
  float: right;
  display: none;
  transition: color 0.2s ease-out;
}

.edit:hover {
  color: darkgray;
}

li:hover .edit {
  display: block;
}

.cancel {
  float: right;
}

.edit-field {
  width: auto;
}

.destroy {
  float: right;
}
</style>
