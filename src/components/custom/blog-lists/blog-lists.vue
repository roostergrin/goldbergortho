<template lang="pug" src="./blog-lists.pug"></template>

<script>
export default {
  computed: {
    props () {
      return this.$store.state.blog
    }
  },
  data () {
    return {
      pages: 2,
      posts: false
    }
  },
  async mounted () {
    this.props ? this.posts = true : ''
  }
}
</script>
