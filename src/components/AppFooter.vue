<template>
  <footer class="footer">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item breadcrumb">
            <ul>
              <li><a href="/terms">利用規約</a></li>
              <li><a href="/privacy">プライバシーポリシー</a></li>
              <li>
                <a href="https://twitter.com/mindexer_org">公式Twitter</a>
              </li>
              <li><a href="/cancel">退会</a></li>
            </ul>
          </div>
        </div>
        <div class="level-right">
          <div class="content has-text-centered">
            <p>Copyright (c) 2018 nekochans</p>
          </div>
        </div>
      </nav>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AppFooter extends Vue {}
</script>
