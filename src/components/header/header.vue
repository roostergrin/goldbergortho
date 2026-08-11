<template lang='pug' src='./header.pug'></template>

<script>
import Icon from 'components/icon/icon'
// import COVIDBanner from 'components/block/block-covid-banner/block-covid-banner'

export default {
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    props () {
      return this.$store.state.app['header'] || { acf: {} }
    }
  },
  components: {
    Icon
    // COVIDBanner
  }
}
</script>
