<template lang="pug" src="./block-covid-banner.pug"></template>

<script>
export default {
  computed: {
    props () {
      return this.$store.state.app['header']
    }
  }
}
</script>
