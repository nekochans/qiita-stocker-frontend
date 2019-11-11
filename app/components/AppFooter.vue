<template>
  <footer class="footer">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item breadcrumb">
            <ul>
              <li>
                <nuxt-link to="/terms">利用規約</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/privacy">プライバシーポリシー</nuxt-link>
              </li>
              <li>
                <a href="https://twitter.com/mindexer_org">公式Twitter</a>
              </li>
              <li><nuxt-link to="/cancel">退会</nuxt-link></li>
            </ul>
          </div>
        </div>
        <div class="level-right">
          <div class="content has-text-centered">
            <p>Copyright (c) 2018-2019 nekochans</p>
          </div>
        </div>
      </nav>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class AppFooter extends Vue {}
</script>
