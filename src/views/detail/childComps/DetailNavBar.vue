<template>
  <nav-bar>
    <div slot="center" class="title">
      <div
        v-for="(item, index) in titles"
        class="title-item"
        @click="titleItem(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ item }}
      </div>
    </div>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt />
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'


export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  components: {
    NavBar
  },
  methods: {
    titleItem(index) {
      this.currentIndex = index
      this.$emit('titleItem', index)
    },
    backClick() {
      this.$router.back()
    }
  }
}

</script>
<style scoped>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-tint);
}
.back {
  text-align: center;
  position: relative;
}
.back img {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -11px;
  transform: translateY(50%);
}
</style>