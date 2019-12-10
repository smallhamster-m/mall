<template>
  <div id="category">
    <!-- 我是分类 -->
    <nav-bar class="nav-bar">
      <div slot="center" class="bar">商品分类</div>
    </nav-bar>

    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      <scroll
        id="tab-content"
        ref="scroll"
        :probeType="3"
        @scroll="listenScroll"
      >
        <tab-content-category
          :categoryList="categoryList"
        ></tab-content-category>
        <tab-control
          :titles="['综合', '销量', '新品']"
          @tabClick="tabClick"
        ></tab-control>
        <goods-list
          :goods="goods[currentType].list"
          @itemImgLoad="itemImgLoad"
        ></goods-list>
      </scroll>
    </div>
    <back-top
      class="backtop"
      @click.native="backClick"
      v-show="isShow"
    ></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabMenu from './childComps/TabMenu'
import TabContentCategory from './childComps/TabContentCategory'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

// 网络请求的导入
import { getCategory, getSubcategory, getCategoryDetail } from 'network/category.js'
export default {
  name: 'Category',
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll,
    TabControl,
    GoodsList,
    BackTop
  },
  data() {
    return {
      categories: [],//保存的是左边导航栏的title
      categoryList: [],//保存的是商品分类数据
      miniWallkey: 0,
      miniWallkeys: [],//保存的是左边导航栏每个item对应的miniWallkey
      goods: {
        pop: { list: [] },
        new: { list: [] },
        sell: { list: [] }
      },
      // categoryGoods: [],
      currentType: 'pop',
      currentIndex: 0,
      isShow: false
    }
  },
  computed: {

  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "sell";
          break;
        case 2:
          this.currentType = "new";
          break;

        default:
          break;
      }
      console.log(this.currentType)
    },

    itemImgLoad() {
      // console.log("图片加载完成")
      // 每次图片加载完成都调用refresh，用于计算滚动区域的高度
      this.$refs.scroll.refresh()
    },
    backClick() { //返回顶部按钮的点击事件。点击后返回顶部
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenScroll(position) { //监听滚动的距离。大于一定值，显示返回顶部按钮
      this.isShow = -position.y > 500 ? true : false
    },

    getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list
        for (let item of this.categories) {
          this.miniWallkeys.push(item.miniWallkey)
        }

        // 在这里请求第一个分类数据
        this.getSubcategory(this.categories[0].maitKey)
        // this.getCategoryDetail(this.miniWallkeys[0], 'pop')
        // this.getCategoryDetail(this.miniWallkeys[0], 'new')
        // this.getCategoryDetail(this.miniWallkeys[0], 'sell')
      })
    },
    getSubcategory(maitKey) {
      getSubcategory(maitKey).then(res => {
        this.categoryList = res.data.list

        this.getCategoryDetail(this.miniWallkeys[this.currentIndex], 'pop')
        this.getCategoryDetail(this.miniWallkeys[this.currentIndex], 'new')
        this.getCategoryDetail(this.miniWallkeys[this.currentIndex], 'sell')
        // console.log('aaaa')
      })
    },
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then(res => {
        this.goods[type].list = res
        // this.goods[this.currentType].list = res
        // console.log(this.goods[type])
      })
    },

    // 根据不同的index，请求不同的分类数据 
    selectItem(index) {
      if (this.currentIndex != index) {//防止多次点击同一个导航栏item
        this.currentIndex = index
        this.getSubcategory(this.categories[index].maitKey)
        // console.log(this.currentIndex)
      }
    }
  },
  created() {
    // 请求tabMenu的数据
    this.getCategory()
    // this.getSubcategory(this.categories[0].maitKey)-----这里请求不到第一个分类数据（因为是异步，谁先请求到）

  },
  mounted() {
    // this.$refs.scroll.on()
  }
}
</script>

<style>
.nav-bar {
  background-color: var(--color-tint);
  /* color: #fff; */
}
.bar {
  color: #fff;
}

#tab-content {
  position: absolute;
  top: 44px;
  left: 100px;
  bottom: 49px;
  overflow: hidden;
}
</style>