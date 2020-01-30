<template lang='pug' src='./dentofacial-orthopedics.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'dentofacial-orthopedics',
  computed: {
    props () {
      return this.$store.state.pages['dentofacial-orthopedics']
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
