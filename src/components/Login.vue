<template>
  <div>
    <h1>ログイン</h1>
    <button @click="login">Qiitaアカウントでログイン</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import { IAuthorizationResponse, STORAGE_KEY_AUTH_STATE } from "@/domain/Qiita";

const QiitaAction = namespace("QiitaModule", Action);
const QiitaGetter = namespace("QiitaModule", Getter);

@Component
export default class Login extends Vue {
  @QiitaAction
  login!: () => void;
}
</script>
