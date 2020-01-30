export const showModal = {
  methods: {
    showModal () {
      this.$store.dispatch('VIEW_SHOWMODAL', true)
      this.$store.state.showModal ? document.body.classList.add('body-stop') : document.body.classList.remove('body-stop')
    }
  }
}

export const showModalType = {
  methods: {
    showModal (i) {
      this.$store.dispatch('VIEW_SHOWMODAL', true)
      this.$store.dispatch('VIEW_MODALCONTENT', i)
      this.$store.state.showModal ? document.body.classList.add('body-stop') : document.body.classList.remove('body-stop')
    }
  }
}

export const closeModal = {
  methods: {
    closeModal () {
      this.$store.dispatch('VIEW_SHOWMODAL', false)
      this.$store.dispatch('VIEW_MODALCONTENT', false)
      document.body.classList.remove('body-stop')
    }
  }
}

export const toggleNav = {
  data () {
    return {
      navActive: false
    }
  },
  methods: {
    toggleNav () {
      this.navActive = !this.navActive
      this.navActive ? document.body.classList.add('body-stop') : document.body.classList.remove('body-stop')
    }
  }
}

export const toggleAcive = {
  methods: {
    toggleAcive (i) {
      this.$parent.active = i
    }
  }
}

export const showMenu = {
  data () {
    return {
      menu: false
    }
  },
  methods: {
    showMenu () {
      this.menu = true
      this.menu ? document.body.classList.add('body-stop') : document.body.classList.remove('body-stop')
    }
  }
}

export const closeMenu = {
  methods: {
    closeMenu () {
      this.menu = false
      this.menu ? document.body.classList.add('body-stop') : document.body.classList.remove('body-stop')
    }
  }
}

export const scrollNav = {
  methods: {
    onScrollInNav () {
      this.$store.dispatch('VIEW_NAV', true)
    },
    onScrollOutNav () {
      this.$store.dispatch('VIEW_NAV', false)
    }
  }
}

export const showTab = {
  data () {
    return {
      tab: 0
    }
  },
  methods: {
    showTab (i) {
      this.tab = i
    }
  }
}

export const showAccordion = {
  data () {
    return {
      accordion: false
    }
  },
  methods: {
    showAccordion (i) {
      this.accordion === i ? this.accordion = false : this.accordion = i
    }
  }
}

export const getPosition = {
  data () {
    return {
      styleLeft: '',
      styleTop: ''
    }
  },
  computed: {
    styleObject () {
      return {
        left: this.styleLeft,
        top: this.styleTop
      }
    }
  },
  methods: {
    mouseEnter (e) {
      this.styleLeft = e.offsetX + 'px'
      this.styleTop = e.offsetY + 'px'
    }
  }
}

export const buttonOver = {
  methods: {
    buttonAnimate (e) {
      this.styleLeft = e.offsetX + 'px'
      this.styleTop = e.offsetY + 'px'
    }
  },
  data () {
    return {
      styleLeft: '',
      styleTop: ''
    }
  },
  computed: {
    styleObject () {
      return {
        left: this.styleLeft,
        top: this.styleTop
      }
    }
  }
}
