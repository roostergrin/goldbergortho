<template lang='pug' src='./meet-the-team.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'meet-the-team',
  computed: {
    props () {
      return this.$store.state.pages['meet-the-team']
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
    Footer
  }
}
</script>
