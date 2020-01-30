<template lang='pug' src='./home.pug'></template>

<script>
import Loader from 'components/loader/loader'
import Header from 'components/header/header'
import Footer from 'components/footer/footer'
import {UAnimateContainer, UAnimate} from 'vue-wow'

export default {
  name: 'home',
  computed: {
    props () {
      return this.$store.state.pages['home']
    },
    propstestimonial () {
      return this.$store.state.pages['testimonials']
    },
    loading () {
      return this.$store.state.loading
    }
  },
  components: {
    Loader,
    Header,
    Footer,
    UAnimateContainer,
    UAnimate
  },
  data () {
    return {
      swiperOption1: {
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        effect: 'fade',
        speed: 1000,
        autoplay: {
          delay: 3000
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      swiperOption2: {
        centeredSlides: true,
        loop: true,
        spaceBetween: 30,
        effect: 'fade',
        slidesPerGroup: 1,
        speed: 1500,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2'
        },
        debugger: true
      },
      swiperOption3: {
        slidesPerView: 2,
        spaceBetween: 0,
        grabCursor: true,
        slidesPerGroup: 1,
        loop: true,
        speed: 1500,
        autoplay: {
          delay: 10000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
            spaceBetween: 30
          }
        }
      }
    }
  }
}
</script>
