import { debounce } from './utils'
import BackTop from "components/content/backTop/BackTop";

// 定义一个混入对象
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgListener = () => { refresh() }
    // 在mounted()钩子函数中监听 itemImgLoad
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      // 点击backTop，返回顶部
      //把方法封装在Scroll组件中的methods中
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0, 0, 500);
      console.log('mixin点击了')
    },
    listenShopBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  }
}