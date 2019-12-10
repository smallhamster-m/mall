<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div
        class="menu-list-item"
        v-for="(item, index) in categories"
        @click="itemClick(index)"
        :class="{ active: currentIndex === index }"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
export default {
  name: 'TabMenu',
  components: {
    Scroll
  },
  props: {
    categories: {
      type: Array,
      default: [],
      flag: false
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {

  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
      this.$emit('selectItem', index)
    }
  }
}

</script>
<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  width: 100px;
  box-sizing: border-box;
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}

.menu-list-item {
  height: 45px;
  width: 100px;
  line-height: 45px;
  text-align: center;
  font-size: 14px;
  background-color: #f6f6f6;
  touch-action: none;
}

.menu-list-item.active {
  font-weight: 700;
  color: var(--color-high-text);
  background-color: #fff;
  border-left: 3px solid var(--color-high-text);
}
</style>