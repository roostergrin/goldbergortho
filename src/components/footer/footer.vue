<template lang='pug' src='./footer.pug'></template>

<script>
import Icon from 'components/icon/icon'

export default {
  computed: {
    props () {
      return this.$store.state.app['footer'] || { acf: {} }
    },
    propsheader () {
      return this.$store.state.app['header'] || { acf: {} }
    }
  },
  components: {
    Icon
  }
}
</script>
