<template>
  <div class="cart-bottom">
    <div class="bottom-left">
      <check-button
        class="check"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="bottom-center">合计： ￥{{ total }}</div>
    <div class="bottom-right">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {

  name: 'CartBottom',
  components: {
    CheckButton,
  },
  computed: {
    total() {
      return this.$store.state.cartList.filter(item => {
        return item.isChecked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.isChecked
      }).length
    },
    isSelectAll() {
      // if (this.$store.state.cartList.length === 0){
      //   return false
      // }
      //   return this.$store.state.cartList.length === this.$store.state.cartList.filter(item => {
      //   return item.isChecked
      // }).length
      // 
      return this.$store.state.cartList.length === 0 ?
        false : this.$store.state.cartList.length === this.$store.state.cartList.filter(item => {
          return item.isChecked
        }).length
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.isChecked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.isChecked = true)

      }
    }
  }
}

</script>
<style scoped>
.cart-bottom {
  height: 40px;
  width: 100%;
  background-color: #eee;
  display: flex;
  position: absolute;
  bottom: 49px;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-size: 14px;
}
.bottom-left {
  width: 80px;
  display: flex;
  justify-content: center;

  /* border-right: 1px solid #ccc */
}
.bottom-left .check {
  line-height: 40px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}
.bottom-left img {
  vertical-align: bottom;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  /* background-color: red; */
}
.bottom-center {
  flex: 1;
}

.bottom-right {
  width: 90px;
  background-color: var(--color-tint);
  color: #fff;
  border-radius: 10px;
}
</style>