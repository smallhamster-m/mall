<template>
  <div class="cart-list">
    <cart-item
      v-for="(item, index) in cartList"
      :key="index"
      :item-info="item"
    ></cart-item>
  </div>
</template>

<script>
import CartItem from './CartItem'

export default {
  name: 'CartList',
  components: {
    CartItem
  },
  props: {
    cartList: {
      type: Array,
      default: []
    }
  },

  mounted() {
    //  this.$refs.scroll.refresh()
  }
}

</script>
<style scoped>
</style>