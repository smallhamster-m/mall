<template>
  <div class="toast" v-show="show">
    <div>{{ message }}</div>
  </div>
</template>

<script>

export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: "添加购物车成功"
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // }
  data() {
    return {
      message: '',
      show: false
    }
  },
  methods: {
    isShow(message = '我是默认值', time = 2000) {
      this.message = message
      this.show = true

      const timer = setInterval(() => {
        this.show = false
        this.message = ''

        clearInterval(timer)

      }, time);


    }
  }
}

</script>
<style scoped>
.toast {
  width: 150px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.6);
  text-align: center;
  line-height: 50px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  color: aliceblue;
  z-index: 99999;
}
.toast div {
  width: 100%;
  height: 100%;
}
</style>