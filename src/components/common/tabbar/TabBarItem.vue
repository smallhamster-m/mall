<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!-- <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div>-->
    <!-- <div :style="{color:"red"}">
     =============================================上面style需要一个对象，下面我activeColor直接返回一个对象
    </div>-->
    <div :style="activeColor" class="text">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    afColor: {
      type: String,
      default: "#ff697a"
    }
  },
  computed: {
    // 决定活跃图标颜色的计算属性
    isActive() {
      return this.$route.path.indexOf(this.path) != -1;
    },
    // 决定活跃字体颜色的计算属性
    activeColor() {
      return this.isActive ? { color: this.afColor } : {};
    }
  },
  methods: {
    itemClick() {
      // console.log(this.path)
      // catch()解决多次点击切换路由抛出的异常
      this.$router.replace(this.path).catch(err => {
        err;
        // console.log(err)
      });
    }
  }
};
</script>

<style>
.tab-bar-item {
  font-size: 14px;
  flex: 1;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
/* .active {
  color: #ff697a;
} */
.text{
  margin-top: 3px;
}
</style>