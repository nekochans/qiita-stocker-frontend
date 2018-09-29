<template>
  <div>
    <h1>ログイン</h1>
    <button @click="login">Qiitaアカウントでログイン</button>
    <p v-show="permanentId">PermanentId :{{ permanentId }}</p>
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
  @QiitaGetter
  permanentId!: string;

  @QiitaAction
  login!: () => void;

  @QiitaAction
  issueAccessToken!: (query: object) => void;

  created(): void {
    const query: any = this.$route.query;
    const params: IAuthorizationResponse = {
      code: query.code,
      callbackState: query.state,
      localState: window.localStorage.getItem(STORAGE_KEY_AUTH_STATE)
    };

    this.$router.push({ query: {} });
    this.issueAccessToken(params);
  }
}
</script>
