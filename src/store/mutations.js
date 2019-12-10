const mutations = {
  addCounter(state, payload) {
    payload.count++
  },
  addToCart(state, payload) {
    payload.isChecked = false
    state.cartList.push(payload)

  }
}

export default mutations