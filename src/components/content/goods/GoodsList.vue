<template>
  <div class="goods">
    <goods-item v-for="item in goods" :goods-item="item" @itemImgLoad='itemImgLoad'/>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem";
export default {
  name: "GoodsList",
  components: {
    GoodsItem
  },
  props: {
    goods: {
      type: Array,
      default() {
        return[]
      }
    }
  },
  methods: {
    itemImgLoad() {
      this.$emit('itemImgLoad')
    }
  }
};
</script>
<style scoped>
.goods {
  margin: 0 2px;
  display: flex;
  flex-wrap: wrap; /* 让弹性盒元素在必要的时候拆行： */
  justify-content: space-around;
}
</style>