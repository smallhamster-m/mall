<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt @load="imgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      flag: false //作用： 让轮播图的图片加载完成事件只执行一次
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imgLoad() {
      if (!this.flag) {
        this.$emit("imgLoad");
      }
      this.flag = true;
    }
  }
};
</script>
<style scoped>
.swiper {
  /* margin-top: 44px; */
  padding-top: 44px;
}
</style>