<template>
  <div><h1>Logging in...</h1></div>
</template>

<script lang="ts">
import LocalStorageFactory from "@/factory/repository/LocalStorageFactory";
import { Component, Vue } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
import {
  IAuthorizationResponse,
  STORAGE_KEY_AUTH_STATE,
  STORAGE_KEY_ACCOUNT_ACTION
} from "../../../domain/qiita";

const QiitaAction = namespace("QiitaModule", Action);
const localStorage = LocalStorageFactory.create();

@Component
export default class OAuthCallback extends Vue {
  @QiitaAction
  fetchUser!: (query: object) => void;

  created() {
    const query: any = this.$route.query;
    const params: IAuthorizationResponse = {
      code: query.code,
      callbackState: query.state,
      localState: localStorage.load(STORAGE_KEY_AUTH_STATE) || undefined
    };

    this.$router.push({ query: {} });

    const accountAction: string =
      localStorage.load(STORAGE_KEY_ACCOUNT_ACTION) || "";

    this.fetchUser({ params: params, accountAction: accountAction });
  }
}
</script>
