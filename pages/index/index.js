Page({
  data: {
    active: 0
  },
  onChange(e) {
    this.setData({
      active: e.detail
    })
  }
})
