export default {
  // addCart(context, payload) {
  //   // 通过iid,检测是不是新的对象。如果返回undefined，则表示cartList中没有该对象。否则表示已有该对象。
  //   let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
  //   if (oldProduct) {//函数执行这里，说明cartList中已经有这个对象，只需要把该对象的count属性+1，不需要添加到cartList中。
  //     context.commit('addCounter', oldProduct)
  //   } else { //函数执行这里，说明cartList里没有这个对象。就可以把这个对象添加到cartList中。
  //     payload.count = 1
  //     context.commit('addToCart', payload)
  //   }
  // }
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
        // 通过iid,检测是不是新的对象。如果返回undefined，则表示cartList中没有该对象。否则表示已有该对象。
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
        if (oldProduct) {//函数执行这里，说明cartList中已经有这个对象，只需要把该对象的count属性+1，不需要添加到cartList中。
          context.commit('addCounter', oldProduct)
          resolve('当前商品数量+1')
        } else { //函数执行这里，说明cartList里没有这个对象。就可以把这个对象添加到cartList中。
          payload.count = 1
          context.commit('addToCart', payload)
          resolve('添加购物车成功')
        }
    })
  }
}