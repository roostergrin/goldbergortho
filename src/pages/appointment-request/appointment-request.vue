<template lang='pug' src='./appointment-request.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'
import AppointmentRequestForm from 'components/form/appointment-request-form/appointment-request-form'

export default {
  name: 'appointment-request',
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    props () {
      return this.$store.state.pages['appointment-request']
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
    Footer,
    AppointmentRequestForm
  },
  methods: {
    calculateAllowed2 () {
      document.getElementById('NR4BranchIFrameCheckIn2').src = 'https://pplpractice-reviews.com/GolRoslyn/in-person'
    }
  },
  created: function () {
  },
  mounted: function () {
    this.calculateAllowed2()
  }
}
</script>
