<template>
  <div class="welcome_page">
    <div class="title">
      <h1>欢迎使用武汉达冠公司官网后台管理系统!</h1>
    </div>
    <div class="logo">
      <img src="../assets/imgs/logo.png" />
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.welcome_page {
  display: block;
  justify-content: center;

  margin: -20px -20px -30px -20px;
}
.title {
  display: flex;
  justify-content: center;
  font-size: 45px;
}
.logo img {
  width: 300px;
  border-radius: 20px;
  box-shadow: 0px 0px 8px 8px rgba(181, 181, 181, 0.2);
}
.logo {
  display: flex;
  justify-content: center;
  margin-top: -20px;
}
</style>
