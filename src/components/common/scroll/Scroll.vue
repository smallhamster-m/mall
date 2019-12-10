<template>
  <!-- 通过ref 来绑定元素或者组件 为了准确的获取对应的元素或组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      defalut: 0
    },
    pullUpLoad: {
      type: Boolean,
      defalut: false
    }
  },
  methods: {
    // home组件中 点击backTop组件调用的事件
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
      // console.log("哈哈");
    },
    //img加载完成后调用的refresh()方法来重新计算scrollHeight的高度
    refresh() {
      // console.log('-----------')
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  mounted() {
    //初始化BScroll，并把bs实例对象保存起来
    //渲染完html（挂载元素完成）之后开始执行
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // probeType:3  不要写死，最好是能自己传过来
      probeType: this.probeType, //是否监听滚动
      pullUpLoad: this.pullUpLoad //是否监听上拉
    });

    // 监听滚动的位置
    this.scroll.on("scroll", position => {
      this.$emit("scroll", position);
    });
    //监听上拉事件
    this.scroll.on("pullingUp", () => {
      // console.log("呵呵呵");
      // 把事件传出去，这样home组件才知道你拉到底部了。
      // 每次触发上拉事件后，在回调函数的最后，都应该调用 finishPullUp() 方法。
      this.$emit("pullingUp");
    });
  }
};
</script>
<style scoped>
</style>