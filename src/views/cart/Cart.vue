<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="scroll" ref="scroll">
      <cart-list class="cart-list" :cart-list='cartList'></cart-list>
    </scroll>
   <cart-bottom></cart-bottom>
   
  </div>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import CartList from './childComps/CartList'
import CartBottom from './childComps/CartBottom'

export default {
  name: 'Cart',
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottom
  },
  activated() {
    this.$refs.scroll.refresh()
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length
    },
    cartList() {
      return this.$store.state.cartList
    }

  }

}
</script>

<style scoped>
.cart {
  height: 100vh;
  position: relative;
}
.scroll {
  position: absolute;
  width: 100%;
  top: 44px;
  bottom: 89px;
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
</style>