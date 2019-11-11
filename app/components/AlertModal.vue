<template>
  <div :class="`modal ${isShow && 'is-active'}`">
    <div class="modal-background" @click="onClickClose"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <span class="icon">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </p>
      </header>
      <section class="modal-card-body">{{ message }}</section>
      <footer class="modal-card-foot">
        <button class="button is-primary" @click="onClickClose">OK</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class AlertModal extends Vue {
  @Prop()
  isShow!: boolean

  @Prop()
  message!: string

  onClickClose() {
    this.$emit('closeModal')
  }
}
</script>
