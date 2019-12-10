<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles"
      class="tab-control-item"
      @click="itemClick(item,index)"
      :class="{'active':currentIndex==index}"

    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      defalut() {
        return [];
      }
    }
  },
  methods: {
    itemClick(item,index) {
      this.currentIndex = index;
      // 自定义事件，把点击的index传出去
      this.$emit('tabClick',index)
    }
  }
};
</script>
<style scoped>
.tab-control {
  display: flex;
  position: sticky;
  /* padding-top: 44px; */
  top: 44px;
  z-index: 999;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
  text-align: center;
  height: 40px;
  line-height: 40px;
  touch-action: none;
}
.tab-control-item span {
  padding: 5px;
}
.active span {
  border-bottom: 3px solid var(--color-tint);
  color: var(--color-tint);
}
</style>