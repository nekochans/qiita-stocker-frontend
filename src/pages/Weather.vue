<template>
  <div>
    <p>{{ weather }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import { WeatherState } from "../types/weather";

const WeatherGetter = namespace("WeatherModule", Getter);
const WeatherAction = namespace("WeatherModule", Action);

@Component
export default class Weather extends Vue {
  @WeatherGetter
  weather!: WeatherState["weather"];

  @WeatherAction
  fetchWeather!: () => void;

  created(): void {
    this.fetchWeather();
  }
}
</script>
