<template lang='pug' src='./smilesnap.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'smilesnap',
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    props () {
      return this.$store.state.pages['virtual-consultation']
    },
    propspageheader () {
      return this.$store.state.app['header'] || { acf: {} }
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
    calculateAllowed () {
      document.getElementById('NR4BranchIFrameCheckIn').src = 'https://pplpractice-reviews.com/GolRoslyn/virtual-assessment'
    }
  },
  created: function () {
  },
  mounted: function () {
    this.calculateAllowed()
  }
}
</script>
