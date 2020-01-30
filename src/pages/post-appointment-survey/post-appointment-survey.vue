<template lang='pug' src='./post-appointment-survey.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'
import PostAppointmentForm from 'components/form/post-appointment-form/post-appointment-form'

export default {
  name: 'post-appointment-survey',
  computed: {
    props () {
      return this.$store.state.pages['post-appointment-survey']
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
    Footer,
    PostAppointmentForm
  }
}
</script>
