<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/">
        Take me home.
      </RouterLink>

    </div>
  </div>
</template>

<script>
const msgs = [
  `你似乎是来找Akara的？`,
  `Akara是谁？`,
  `我是谁？你又是谁`,
  `下次再来吧，我困了`
]
export default {
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  }
}
</script>
