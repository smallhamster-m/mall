<template>
  <div class="content-category">
    <div class="category-item" v-for="item in categoryList">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TabContentCategory',
  props: {
    categoryList: {
      type: Array,
      default: []
    }
  }
}

</script>
<style scoped>
.content-category {
  width: 100%;
  display: flex;
  /*  让弹性盒子在必要的时候换行*/
  flex-wrap: wrap;
  /* align-content: center; */
  padding: 10px 5px;
}
.category-item {
  width: 33.33%;
  height: 80px;
  margin: 8px 0;
}
.category-item a {
  display: block;
  height: 100%;
  width: 100%;
  text-align: center;
  font-size: 12px;
}
.category-item img {
  width: 75%;
  margin-bottom: 10px;
}
</style>