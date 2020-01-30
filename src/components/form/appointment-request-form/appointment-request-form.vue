<template lang='pug' src='./appointment-request-form.pug'></template>

<script>
import api from 'api'
import axios from 'axios'
export default {
  data: () => {
    return {
      yourName: '',
      email: '',
      phoneNumber: '',
      message: '',
      postUrl: api + '/rg-mail/v1/appointmentform',
      formSubmitted: false,
      formSuccess: false,
      modalShowing: false
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
    closeModal () {
      this.formSuccess = false
      this.formSubmitted = false
      setTimeout(() => {
        this.modalShowing = false
      }, 150)
    },
    onSubmit () {
      this.formSubmitted = true
      axios.post(this.postUrl, {
        yourName: this.yourName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        message: this.message
      })
        .then(res => {
          this.formSuccess = true
          setTimeout(() => {
            window.location.href = 'http://goldbergortho.rgwplogin.com/thank-you'
          }, 400)
          setTimeout(() => {
            this.yourName = ''
            this.email = ''
            this.phoneNumber = ''
            this.message = ''
          }, 1000)
          setTimeout(() => {
            this.errors.clear()
          }, 1100)
        })
        .catch(e => {
          console.log(e, 'submitted')
        })
    }
  }
}
</script>
