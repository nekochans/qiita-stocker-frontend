<template>
  <div>
    <h1>アカウント作成</h1>
    <button @click="signUp">Qiitaアカウントで登録</button>
    <p v-show="permanentId">PermanentId :{{ permanentId }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

const QiitaAction = namespace("QiitaModule", Action);
const QiitaGetter = namespace("QiitaModule", Getter);

@Component
export default class SignUp extends Vue {
  @QiitaGetter
  permanentId!: string;

  @QiitaAction
  signUp!: () => void;
}
</script>
