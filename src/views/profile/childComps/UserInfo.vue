<template>
  <div id="user-info">
    <a href="#">
      <div class="user-icon">
        <img src="~assets/img/profile/avatar.svg" alt="">
        <!-- <img src="~assets/img/profile/shopping.svg" alt=""> -->
      </div>
      <div class="user-login">
        <div class="login">登录/注册</div>
        <div class="phone">
          <span class="phone-icon">
            <img src="~assets/img/profile/phone.svg" alt="">
          </span>
          暂无绑定手机号</div>
      </div>
      <div class="arrow">></div>
    </a>
  </div>
</template>

<script>

  export default {
    name:'UserInfo',
  }

</script>
<style scoped>
#user-info {
  height: 90px;
  background-color: var(--color-tint);
  /* float: left; */
}
#user-info a{
  width: 100%;
  height: 100%;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding: 15px;
  color: #fff;
  font-size: 15px;
  position: relative;
}
.user-icon {
  margin-right: 10px;
}
.user-icon img {
  height: 60px;
  width: 60px;
}
.user-login .login{
  margin-bottom: 5px;
  padding-left: 24px;
}
.phone-icon img{
 width: 20px;
 /* font-size: 30px; */
 vertical-align: bottom;
}
.arrow {
  position: absolute;
  right: 20px;
  font-weight: 700;
}
</style>