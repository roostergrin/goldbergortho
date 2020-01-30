<template lang='pug' src='./post-appointment-form.pug'></template>

<script>
import api from 'api'
import axios from 'axios'
export default {
  data: () => {
    return {
      experiencePractice: '',
      experienceWithDoctor: '',
      favoritePractice: '',
      experienceEnjoyable: '',
      overallExperience: '',
      additionalComments: '',
      memberExperience: '',
      yourName: '',
      email: '',
      postUrl: api + '/rg-mail/v1/postappointmentform',
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
        experiencePractice: this.experiencePractice,
        experienceWithDoctor: this.experienceWithDoctor,
        favoritePractice: this.favoritePractice,
        experienceEnjoyable: this.experienceEnjoyable,
        overallExperience: this.overallExperience,
        additionalComments: this.additionalComments,
        memberExperience: this.memberExperience,
        yourName: this.yourName,
        email: this.email
      })
        .then(res => {
          this.formSuccess = true
          setTimeout(() => {
            window.location.href = 'http://goldbergortho.rgwplogin.com/thank-you'
          }, 400)
          setTimeout(() => {
            this.experiencePractice = ''
            this.experienceWithDoctor = ''
            this.favoritePractice = ''
            this.experienceEnjoyable = ''
            this.overallExperience = ''
            this.additionalComments = ''
            this.memberExperience = ''
            this.yourName = ''
            this.email = ''
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
