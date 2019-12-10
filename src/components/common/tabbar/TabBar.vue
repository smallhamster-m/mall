<template>
  <div id='tab-bar'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
#tab-bar {
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  height: 49px;
  text-align: center;
  background-color:#eee;
  box-shadow: 0px -1px 1px rgba(100, 100, 100, 0.1);
  z-index: 1000;
}
</style>