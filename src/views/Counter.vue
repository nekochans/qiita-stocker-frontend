<template>
  <div>
    <p>{{ counter }}</p>
    <button @click="increment">increment!</button>
    <button @click="decrement">decrement!</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import { CounterState } from "@/types/counter";

const CounterGetter = namespace("CounterModule", Getter);
const CounterAction = namespace("CounterModule", Action);

@Component
export default class Counter extends Vue {
  @CounterGetter
  counter!: CounterState["counter"];

  @CounterAction
  increment!: () => void;
  @CounterAction
  decrement!: () => void;
}
</script>
