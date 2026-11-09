<template lang='pug' src='./location-page.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'
import { serviceAreas } from '@/shared/data/service-areas'

// Generic layout for the location landing pages. The WordPress page slug is the route name.
export default {
  name: 'location-page',
  data () {
    return {
      serviceAreas
    }
  },
  computed: {
    props () {
      return this.$store.state.pages[this.$route.name]
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
