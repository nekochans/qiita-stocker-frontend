<template>
  <div>
    <ConfirmModal
      :is-show="showConfirmation"
      :message="confirmMessage"
      :confirm-button-text="confirmButtonText"
      :cancel-button-text="cancelButtonText"
      @confirmModal="confirmDestroy"
      @cancelModal="cancelDestroy"
    />
    <li>
      <div v-if="!editing">
        <a
          :data-category="category.categoryId"
          :class="`${isSelecting && 'is-active'} flexbox`"
          @click="onClickCategory"
        >
          {{ category.name }}
          <p class="edit" @click="editing = true">
            <span class="icon edit-icon">
              <i class="fas fa-pencil-alt fa-lg"></i>
            </span>
          </p>
        </a>
      </div>
      <div v-show="editing">
        <div class="edit-field">
          <input
            v-model="editCategoryName"
            v-focus="editing"
            :class="`input input-field ${isValidationError && 'is-danger'}`"
            type="text"
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
          <p class="control flexbox">
            <button
              class="button is-small is-danger"
              @click="onClickUpdateCategory"
            >
              保存
            </button>
            <a class="has-text-grey is-size-7" @click="doneEdit">キャンセル</a>
          </p>
        </div>
      </div>
    </li>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Category } from '@/domain/domain'
import { UpdateCategoryPayload } from '@/store/qiita'
import ConfirmModal from '@/components/ConfirmModal.vue'

@Component({
  components: {
    ConfirmModal
  },
  directives: {
    focus(el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
})
export default class extends Vue {
  @Prop()
  category!: Category

  editing: boolean = false
  editCategoryName = this.category.name
  isValidationError: boolean = false
  isSelecting: boolean = false

  showConfirmation: boolean = false
  confirmMessage: string = this.buildConfirmMessage(this.category.name)
  confirmButtonText: string = '削除'
  cancelButtonText: string = 'キャンセル'

  onClickCategory() {
    if (this.editing || this.isSelecting) return

    const categoryId: string = String(this.category.categoryId)
    this.$emit('clickCategory')
    this.$router.push({ path: `/stocks/categories/${categoryId}` })
  }

  doneEdit() {
    this.isValidationError = false
    this.editCategoryName = this.category.name
    this.editing = false
  }

  onClickUpdateCategory() {
    this.editCategoryName = this.editCategoryName.trim()

    if (this.category.name === this.editCategoryName) {
      this.editing = false
      return
    }

    if (this.editCategoryName === '') {
      this.isValidationError = true
      return
    }

    const updateCategoryPayload: UpdateCategoryPayload = {
      stateCategory: this.category,
      categoryName: this.editCategoryName
    }

    this.$emit('clickUpdateCategory', updateCategoryPayload)
    this.confirmMessage = this.buildConfirmMessage(this.editCategoryName)
    this.isValidationError = false
    this.editing = false
  }

  onClickDestroyCategory() {
    this.showConfirmation = true
  }

  confirmDestroy(): void {
    this.showConfirmation = false
    this.$emit('clickDestroyCategory', this.category.categoryId)

    if (this.isSelecting) {
      this.$router.push({ path: '/stocks/all' })
    }
  }

  cancelDestroy(): void {
    this.showConfirmation = false
  }

  buildConfirmMessage(categoryName: string): string {
    return `${categoryName} を削除してもよろしいですか？`
  }

  initializeIsSelecting() {
    const query: any = this.$route.params
    this.isSelecting = String(this.category.categoryId) === query.id
  }

  created() {
    this.initializeIsSelecting()
  }
}
</script>

<style scoped>
.edit {
  display: none;
  transition: color 0.2s ease-out;
}

.edit:hover {
  color: darkgray;
}

li:hover .edit {
  display: block;
}

.flexbox {
  display: flex;
  justify-content: space-between;
}

.edit-icon {
  display: contents;
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
