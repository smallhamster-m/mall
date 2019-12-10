<template>
 <div class="recommend-info">
    <div class="info-header">热门推荐</div>
  
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
import GoodsItem from "components/content/goods/GoodsItem";

export default {
  name: 'DetailRecommendInfo',
  props: {
    recommendList: {
      type: Array
    }
  },
  components: {
    GoodsList,
    GoodsItem
  }
}

</script>
<style scoped>
.recommend-info {
  padding: 5px;
}

.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>