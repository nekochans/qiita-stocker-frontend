<template>
  <div>
    <h1>退会</h1>
    <button @click="cancel">退会する</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";

const QiitaAction = namespace("QiitaModule", Action);

@Component
export default class Cancel extends Vue {
  @QiitaAction
  cancel!: () => void;
}
</script>
