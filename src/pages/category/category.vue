<template lang='pug' src='./category.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'Category',
  computed: {
    props () {
      return this.$store.state.blog
    },
    propspageheader () {
      return this.$store.state.app['header']
    },
    catname () {
      return this.$route.params.slug
    },
    loading () {
      return this.$store.state.loading
    }
  },
  components: {
    Loader,
    Header,
    Footer
  }
}
</script>
