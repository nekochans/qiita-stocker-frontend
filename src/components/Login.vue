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

  @QiitaAction
  createAccount!: (query: object) => void;

  created(): void {
    const query: any = this.$route.query;
    const params: IAuthorizationResponse = {
      code: query.code,
      callbackState: query.state,
      localState:
        window.localStorage.getItem(STORAGE_KEY_AUTH_STATE) || undefined
    };

    this.$router.push({ query: {} });
    this.createAccount(params);
  }
}
</script>
