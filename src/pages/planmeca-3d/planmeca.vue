<template lang='pug' src='./planmeca.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'planmeca-3d',
  computed: {
    props () {
      return this.$store.state.pages['planmeca-3d']
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

<style lang="sass" src="./planmeca.sass"></style>
