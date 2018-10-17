<template>
  <div>
    <h1>Logging in...</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
import {
  IAuthorizationResponse,
  STORAGE_KEY_AUTH_STATE,
  STORAGE_KEY_ACCOUNT_ACTION
} from "@/domain/Qiita";

const QiitaAction = namespace("QiitaModule", Action);

@Component
export default class OAuthCallback extends Vue {
  @QiitaAction
  fetchUser!: (query: object) => void;

  @QiitaAction
  createAccount!: () => void;

  @QiitaAction
  issueLoginSession!: () => void;

  async created(): Promise<void> {
    const query: any = this.$route.query;
    const params: IAuthorizationResponse = {
      code: query.code,
      callbackState: query.state,
      localState:
        window.localStorage.getItem(STORAGE_KEY_AUTH_STATE) || undefined
    };

    this.$router.push({ query: {} });

    await this.fetchUser(params);

    const accountAction: string =
      window.localStorage.getItem(STORAGE_KEY_ACCOUNT_ACTION) || "";

    switch (accountAction) {
      case "signUp":
        this.createAccount();
        break;
      case "login":
        this.issueLoginSession();
        break;
      default:
        // TODO エラー処理を追加
        console.log("ERROR!");
    }
  }
}
</script>
