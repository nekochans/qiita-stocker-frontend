<template>
  <div>
    <h1>Logging in...</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
import { IAuthorizationResponse, STORAGE_KEY_AUTH_STATE } from "@/domain/Qiita";

const QiitaAction = namespace("QiitaModule", Action);

@Component
export default class OAuthCallback extends Vue {
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
