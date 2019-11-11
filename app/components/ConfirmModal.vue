<template>
  <div :class="`modal ${isShow && 'is-active'}`">
    <div class="modal-background" @click="onClickCancel"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <span class="icon"> <i class="fas fa-info-circle"></i> </span>
        </p>
      </header>
      <section class="modal-card-body">{{ message }}</section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="onClickConfirm">
          {{ confirmButtonText }}
        </button>
        <button class="button" @click="onClickCancel">
          {{ cancelButtonText }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class ConfirmModal extends Vue {
  @Prop()
  isShow!: boolean

  @Prop({ default: '処理を続けてもよろしいですか？' })
  message!: string

  @Prop({ default: 'はい' })
  confirmButtonText!: string

  @Prop({ default: 'いいえ' })
  cancelButtonText!: string

  onClickConfirm() {
    this.$emit('confirmModal')
  }

  onClickCancel() {
    this.$emit('cancelModal')
  }
}
</script>
