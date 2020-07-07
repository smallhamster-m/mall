<template>
  <div id="home">
    <nav-bar class="home-nar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTopShow"
    ></tab-control>
    <!-- 通过ref='scroll来获取scroll组件对象 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @imgLoad="imgLoad"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- j监听组件的事件必须加 .native修饰符才能监听  -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
// import Swiper from "components/common/swiper/Swiper";
// import SwiperItem from "components/common/swiper/SwiperItem";
// import { Swiper, SwiperItem } from "components/common/swiper/index";
import HomeSwiper from "./childComps/HomeSwiper"; //不关心主要逻辑，把主要逻辑重新封装到另一个组件中
import HomeRecommend from "./childComps/HomeRecommend";
import HomeFeature from "./childComps/HomeFeature";
import TabControl from "components/content/tabControl/TabControl/";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
// import BackTop from "components/content/backTop/BackTop"-------------------;

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from 'common/utils'
import { itemListenerMixin, backTopMixin } from 'common/mixin'


export default {
  name: "Home",
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // isShowBackTop: false -------------,
      tabOffsetTop: 0,
      isTopShow: false,
      saveY: 0
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop-------------------
  },
  created() {
    //  getHomeMultidata().then(res => {==========================这里把方法抽到methods中
    //     this.banners = res.data.banner.list;
    //     this.recommends = res.data.recommend.list;
    //   });
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //在创建组件完成后请求数据。created()函数并没有挂载元素
    // 处理网络请求
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // this.itemImgListener = () => { refresh() }
    // // 在mounted()钩子函数中监听 itemImgLoad
    // this.$bus.$on("itemImgLoad", this.itemImgListener
    //   // 每次加载完一张图片后我都重新计算scrollHeight
    //   // 确定img加载完成后调用scroll对象里的refresh()方法来重新计算scrollHeight的高度。
    //   // this.$refs.scroll.refresh();//----有可能this.$refs.scroll为null，所以多加一个判断条件
    //   // this.$refs.scroll && this.$refs.scroll.refresh(); //如果这段代码写在created()函数中，这里的this.$refs.scroll可能为null，就会报错。

    // );
  },
  methods: {
    tabClick(index) {
      //点击tabClick的某一项，切换对应的商品列表
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;

        default:
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //1.滚动到一定的距离，backTop组件隐藏或显示
      // this.isShowBackTop = -position.y > 1000-------------------;
      this.listenShopBackTop(position)
      // 2.另一个tabControl是否显示
      this.isTopShow = -position.y > this.tabOffsetTop;
      

    },
   
    loadMore() {
      //触发上拉事件，加载更多商品
      // console.log("呵呵");
      this.getHomeGoods(this.currentType);

      // 每次触发上拉事件后，在回调函数的最后，都应该调用 finishPullUp() 方法,这样才能再次上拉，否则只能上拉一次。
      this.$refs.scroll.finishPullUp();
    },
    imgLoad() {
      // 要在轮播图的图片加载完成后获取tabControl距离顶部的距离
      // console.log("我触发了几次呢"); 图片加载成功
      // console.log(this.$refs.tabControl.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /* 网络请求的方法 */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
        // console.log(res)
      });
    },
    getHomeGoods(type) {
      getHomeGoods(type, this.goods[type].page + 1).then(res => {
        //把获取到的数据全部添加到数组中
  
        this.goods[type].list.push(...res.data.list);
        // console.log(this.goods[type].list)
        this.goods[type].page++;
      });
    }
  },
  activated() { //当组件处于活跃时，调用scroll的scrollTo方法定位到上次离开的位置
    // keep-alive 组件激活时调用。
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()

  },
  deactivated() { //当组件处于不活跃状态时，记录scroll 的位置
    // console.log('deactivated')
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)

    // 销毁itemImgLoad事件
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  }
};
</script>

<style scoped>
/* .swiper{
  margin-top: 44px;
} */
#home {
  /* position: relative; */
  height: 100vh;
  position: relative;
}
/* 当使用BScroll时，这个就不需要了。 */
.home-nar {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
}
</style>