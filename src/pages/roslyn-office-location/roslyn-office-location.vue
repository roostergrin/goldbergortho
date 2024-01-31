<template lang='pug' src='./roslyn-office-location.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'roslyn-office-location',
  computed: {
    props () {
      return this.$store.state.pages['roslyn-office-location']
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
    calculateAllowed3 () {
      document.getElementById('NR4BranchIFrameCheckIn3').src = 'https://pplpractice-reviews.com/GolRoslyn/contact-me'
    }
  },
  created: function () {
  },
  mounted: function () {
    this.calculateAllowed3()
  }
}
</script>
