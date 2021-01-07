<template lang='pug' src='./blog.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'
import BlogLists from 'components/custom/blog-lists/blog-lists'

export default {
  name: 'Blog',
  computed: {
    props () {
      return this.$store.state.pages['blog']
    },
    propspageheader () {
      return this.$store.state.app['header']
    },
    loading () {
      return this.$store.state.loading
    }
  },
  components: {
    Loader,
    Header,
    Footer,
    BlogLists
  }
}
</script>
