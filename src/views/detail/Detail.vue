<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleItem="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop :shop="shop"></detail-shop>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="goods" :goods="recommendList"></goods-list>
    </scroll>
    <deatil-bottom-bar @addCart="addCart"></deatil-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop" />

    <!-- <toast :message="message" v-show="isShow"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShop from './childComps/DetailShop'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailRecommendInfo from './childComps/DetailRecommendInfo'
import GoodsList from "components/content/goods/GoodsList";
import DeatilBottomBar from './childComps/DeatilBottomBar';

import Scroll from 'components/common/scroll/Scroll'

import { getDetail, Goods, Shop, GoodsParam, getRecommend } from "network/detail";
import { itemListenerMixin, backTopMixin } from 'common/mixin'

// import Toast from 'components/common/toast/Toast'

export default {
  name: 'Detail',
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    GoodsList,
    DeatilBottomBar,
    Scroll,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      TopYs: [],
      currentIndex: 0,
      // message: '',
      // isShow: false

    }
  },
  created() { //Detail组件不能用keep-alive标签包起来，否则iid是固定的一个
    // 获取每个商品对应的iid，用来请求数据
    this.iid = this.$route.params.iid
  // console.log(this.iid)
    // 获取详请数据
    getDetail(this.iid).then(res => {
      // console.log(res)
      const data = res.result
      // console.log(res)
      // console.log(data)
      // 请求轮播图的图片
      this.topImages = data.itemInfo.topImages
      // console.log(this.topImages)

      // 获取商品GoodInfo数据
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 获取店铺信息Shop
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 获取评论信息
      this.commentInfo = data.rate.list[0]
      // console.log(this.commentInfo)
    })

    // 获取推荐商品数据
    getRecommend().then(res => {
      this.recommendList = res.data.list
      console.log(res)
    })
  },
  destoryed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
  mounted() {

  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      // 在图片加载完成后获取TopY
      this.TopYs.push(0)
      this.TopYs.push(this.$refs.param.$el.offsetTop - 44)
      this.TopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.TopYs.push(this.$refs.goods.$el.offsetTop - 44)

      this.TopYs.push(Number.MAX_VALUE)
      // console.log('----')
      // console.log(this.$refs.param.$el.offsetTop)
      // console.log(this.$refs.comment.$el.offsetTop)
      // console.log(this.$refs.goods.$el.offsetTop)
    },
    contentScroll(position) {
      //1.滚动到一定的距离，backTop组件隐藏或显示
      this.listenShopBackTop(position)

      // 滚动到一定距离，对应的title变色
      const positionY = -position.y
      // console.log(positionY)
      for (let i = 0; i < this.TopYs.length - 1; i++) {
        //this.currentIndex !== i  减少重复比较的次数
        if (this.currentIndex !== i && (positionY >= this.TopYs[i] && positionY < this.TopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.TopYs[index])
    },
    addCart() {
      // 获取购物侧需要展示的信息
      const product = {}
      product.title = this.goods.title
      product.image = this.topImages[0]
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // console.log(product)

      // 将商品添加到购物车里
      // this.$store.dispatch('addCart',product)
      this.$store.dispatch('addCart', product).then((res => {
        console.log(res)

        // 普通的封装组件的方式
        // this.isShow = true
        // this.message = res
        // setTimeout(() => {
        //   this.isShow = false
        //   this.message = res
        // }, 2000);

        // 插件封装组件的方式
        this.$toast.isShow(res)


      }))

    }
  }
}

</script>
<style scoped>
#detail {
  position: relative;
  z-index: 9999;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 58px);
}
</style>