<template lang='pug' src='./form.pug'></template>

<script>
import api from 'api'
import axios from 'axios'
export default {
  data: () => {
    return {
      fullname: '',
      phone: '',
      email: '',
      message: '',
      postUrl: api + '/rg-mail/v1/contact',
      formSubmitted: false,
      formSuccess: false
    }
  },
  methods: {
    validate () {
      this.$validator.validateAll()
      .then(result => {
        if (result) {
          this.onSubmit()
        }
      })
      .catch((e) => {
        console.log(e)
      })
    },
    onSubmit () {
      this.formSubmitted = true
      axios.post(this.postUrl, {
        fullname: this.fullname,
        phone: this.phone,
        email: this.email,
        message: this.message,
      })
      .then(res => {
        this.formSubmitted = false
        this.formSuccess = true
        setTimeout(() => {
          this.$el.children[0].reset()
        }, 500)
        this.fullname: '',
        this.phone: '',
        this.email: '',
        this.message: '',
      })
      .catch(e => { console.log(e) })
    }
  }
}
</script>
