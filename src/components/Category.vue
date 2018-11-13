<template>
  <li>
    <div v-if="!editing">
      <a
        :data-category="category.id"
        @click="clickHandle"
        :class="`${isActive(category.id) && 'is-active'}`"
      >
        {{ category.name }}
        <p class="edit" @click="editing = true;">編集</p>
      </a>
    </div>
    <div v-show="editing">
      <div class="field">
        <input
          class="input edit-field"
          type="text"
          v-focus="editing"
          :value="category.name"
        />
        <a class="has-text-grey is-size-7 destroy">削除</a>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-small is-danger" @click="doneEdit">
            カテゴリを追加
          </button>
          <a class="has-text-grey is-size-7 cancel" @click="cancelEdit"
            >キャンセル</a
          >
        </p>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { ICategory } from "@/types/login";

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

  clickHandle(event: any) {
    // TODO 選択されたカテゴリの記事を表示する
    console.log(`${event.target.dataset.category} clicked!!`);
  }

  isActive(id: ICategory["id"]) {
    return id === "1";
  }

  doneEdit() {
    this.editing = false;
  }

  cancelEdit() {
    this.editing = false;
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
