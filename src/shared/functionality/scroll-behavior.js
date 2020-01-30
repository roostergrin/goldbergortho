const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return { x: 0, y: 0 }
  } else {
    if (to.hash) {
      return {
        selector: to.hash,
        offset: { x: 0, y: 200 }
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
}

export default scrollBehavior
