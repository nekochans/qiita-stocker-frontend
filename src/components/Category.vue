<template>
  <li>
    <div v-if="!editing">
      <a
        :data-category="category.categoryId"
        @click="onClickCategory"
        :class="`${isSelecting && 'is-active'}`"
      >
        {{ category.name }}

        <p class="edit" @click="editing = true;">
          <span class="icon"> <i class="fas fa-pencil-alt fa-lg"></i> </span>
        </p>
      </a>
    </div>
    <div v-show="editing">
      <div class="edit-field">
        <input
          :class="`input input-field ${isValidationError && 'is-danger'}`"
          type="text"
          v-focus="editing"
          v-model="editCategoryName"
        />
        <a
          class="has-text-grey is-size-7 destroy"
          @click="onClickDestroyCategory"
        >
          <span class="icon"> <i class="far fa-trash-alt fa-2x"></i> </span>
        </a>
        <p v-if="isValidationError" class="help is-danger">
          カテゴリを入力してください。
        </p>
      </div>
      <div class="edit-field">
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
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
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

  @Watch("$route")
  onRouteChanged() {
    this.initializeIsSelecting();
  }

  editing: boolean = false;
  editCategoryName = this.category.name;
  isValidationError: boolean = false;
  isSelecting: boolean = false;

  onClickCategory() {
    if (this.editing || this.isSelecting) return;

    const categoryId: string = String(this.category.categoryId);
    this.$emit("clickCategory");
    this.$router.push({
      name: "stockCategories",
      params: { id: categoryId }
    });
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

  onClickDestroyCategory() {
    this.$emit("clickDestroyCategory", this.category.categoryId);
    this.doneEdit();

    if (this.isSelecting) {
      this.$router.push({
        name: "stocks"
      });
    }
  }

  initializeIsSelecting() {
    const query: any = this.$route.params;
    this.isSelecting = String(this.category.categoryId) === query.id;
  }

  created() {
    this.initializeIsSelecting();
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
  margin-bottom: 0.3rem;
}

.input-field {
  width: auto;
}

.destroy {
  float: right;
}
</style>
