<template>
  <div>
    <h1>ログイン</h1>
    <button @click="login">Qiitaアカウントでログイン</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";

const QiitaAction = namespace("QiitaModule", Action);

@Component
export default class Login extends Vue {
  @QiitaAction
  login!: () => void;
}
</script>
