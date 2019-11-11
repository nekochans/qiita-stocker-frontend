module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint'
  ],
  plugins: [
    'prettier'
  ],
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'camelcase': 0,
    'vue/no-v-html': 0,
    'no-console': 0
  }
}
