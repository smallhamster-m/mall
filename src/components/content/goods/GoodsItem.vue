<template>
  <div class="goods-item" @click="itemClick">
    <!-- @load="imgLoad"  @load：监听图片是否加载完成 -->
    <img v-lazy="showImg" alt @load="imgLoad" />
    <div class="item-info">
      <p>{{ goodsItem.title }}</p>
      <div>
        <span class="price">￥{{ goodsItem.price }}</span>
        <span class="collect">{{ goodsItem.cfav }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    goodsItem: {
      type: Object,
      defalut() {
        return {};
      }
    }
  },
  computed: {
    showImg() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img //为什么这里一定要按照顺序写。
    }
  },
  methods: {
    imgLoad() {
      // console.log('img加载完成')
      // 通过事件总线$bus（bus的名字可以随便起）把事件发射给home组件。（非父子组件的通信）
      this.$bus.$emit('itemImgLoad')
      this.$emit('itemImgLoad')

    },
    itemClick() {
      // console.log(this.goodsItem.iid)
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
};
</script>
<style scoped>
.goods-item {
  float: left;
  width: 50%;
  padding: 8px 3px 38px;
  /* height: 250px; */
  position: relative;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
  /* width: 152px;
  height: 228px; */
}
.item-info {
  margin-top: 3px;
  font-size: 12px;
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -3px;
  padding: 3px;
}
.item-info div {
  margin-top: 3px;
}
.item-info .collect {
  position: relative;
  padding-left: 22px;
}
.collect::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 0px;
  width: 14px;
  height: 14px;
  background: url('~assets/img/common/collect.svg') 0 0/14px 14px;
  vertical-align: bottom;
}
.item-info .price {
  color: var(--color-tint);
}
.item-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* padding: 5px 0; */
}
</style>