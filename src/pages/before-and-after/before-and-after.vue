<template lang='pug' src='./before-and-after.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'

export default {
  name: 'before-and-after',
  computed: {
    props () {
      return this.$store.state.pages['before-and-after']
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
      swiperOption1: {
        centeredSlides: true,
        loop: true,
        autoHeight: true,
        spaceBetween: 30,
        effect: 'fade',
        speed: 1500,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  }
}
</script>
