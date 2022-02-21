<template lang='pug' src='./app.pug'></template>

<script>
import BaseBaseAccess from 'components/base-access/index'

export default {
  async created () {
    this.$store.dispatch('GET_PAGES')
    this.$store.dispatch('GET_APP')
    this.$store.dispatch('VIEW_NAV', false)
    this.$store.dispatch('VIEW_BODY', false)
    this.$store.dispatch('VIEW_TYPES', 0)
    this.$store.dispatch('VIEW_SHOWMODAL', false)
    this.$store.dispatch('VIEW_MODALCONTENT', false)
  },
  components: {
    BaseBaseAccess
  },
  name: 'app'
}
</script>

<-- styles have been moved to main.sass file -->
<style src='../main.sass' lang='sass'></style>
