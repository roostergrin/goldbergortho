<template lang='pug' src='./accessibility-statement.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'thank-you',
  computed: {
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
  data () {
    return {
      companyName: 'Goldberg Orthodontics', // Fill this in
      domain: "<a href='https://www.goldbergortho.com'>goldbergortho.com</a>", // Fill this in
      email: "<a href='mailto:drgoldberg@goldbergortho.com'>drgoldberg@goldbergortho.com</a>", // Fill this in
      phone: "<a href='tel:+15164841123'>(516) 484-1123</a>", // Fill this in
      formattedEmail: ''
    }
  },
  mounted () {
    this.formatEmail()
  },
  methods: {
    formatEmail () {
      this.formattedEmail = '<a aria-label="email ' + this.email + '" href="mailto:' + this.email + '">' + this.email + '</a>'
    }
  }
}
</script>
