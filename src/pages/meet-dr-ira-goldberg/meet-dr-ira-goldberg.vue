<template lang='pug' src='./meet-dr-ira-goldberg.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'meet-dr-ira-goldberg',
  computed: {
    props () {
      return this.$store.state.pages['meet-dr-ira-goldberg']
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
