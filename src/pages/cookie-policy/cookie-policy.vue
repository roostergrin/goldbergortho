<template lang='pug' src='./cookie-policy.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'cookie-policy',
  computed: {
    // Content lives in the template; the store page is only used for the loading state, like accessibility-statement
    props () {
      return this.$store.state.pages['thank-you']
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
  },
  methods: {
    openCookiePreferences () {
      window.rgShowCookiePreferences && window.rgShowCookiePreferences()
    }
  }
}
</script>

<style lang="sass" src="../privacy-policy/privacy-policy.sass"></style>
