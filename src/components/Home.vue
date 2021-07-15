<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="home-container_left">
        <img src="../assets/imgs/logo.png" style="border-radius:50px" />
        <span>达冠公司官网后台管理系统</span>
      </div>
      <!-- 用户信息区域 -->
      <el-button type="danger" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '200px' : '25px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i class="el-icon-ship"></i>
        </div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          :unique-opened="true"
          text-color="#fff"
          active-text-color="#409EFF"
          :router="true"
          v-if="isCollapse"
          :collapse-transition="false"
        >
          <el-menu-item index="/person" @click="saveNavState('/person')">
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[100]"></i>
              <!-- 文本 -->
              <span>个人信息</span>
            </template>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[111]"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/manager" @click="saveNavState('/manager')">
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>管理员列表</span>
              </template>
            </el-menu-item>
            <!-- 二级菜单 -->
            <el-menu-item index="/users" @click="saveNavState('/users')">
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>普通用户列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[222]"></i>
              <!-- 文本 -->
              <span>内容管理</span>
            </template>
            <!-- 二级菜单 -->
            <!-- <el-menu-item index="/topmenu"> -->
            <!-- 二级菜单的模板区域 -->
            <!-- <template slot="title"> -->
            <!-- 图标 -->
            <!-- <i class="el-icon-menu"></i> -->
            <!-- 文本 -->
            <!-- <span>网页顶部菜单</span> -->
            <!-- </template> -->
            <!-- </el-menu-item> -->
            <el-menu-item index="/slidder">
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>轮播图</span>
              </template>
            </el-menu-item>
            <el-menu-item index="/news">
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>新闻资讯</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[333]"></i>
              <!-- 文本 -->
              <span>在线客服</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/service">
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>消息列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[444]"></i>
              <!-- 文本 -->
              <span>网站留言</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item index="/message">
              <!-- 二级菜单的模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>留言列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        "100": "el-icon-medal",
        "111": "el-icon-user",
        "222": "el-icon-document",
        "333": "el-icon-service",
        "444": "el-icon-chat-line-square",
      },
      // 是否折叠
      isCollapse: true,
      // 被激活的链接地址
      acpaths: "",
    };
  },

  created() {
    this.acpaths = window.sessionStorage.getItem("acpaths");
  },
  methods: {
    saveNavState(acpaths) {
      window.sessionStorage.setItem("acpaths", acpaths);
      this.acpaths = acpaths;
    },
    // 点击按钮,切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    logout() {
      //   清空token
      window.sessionStorage.clear();
      //   编程式导航，跳转到登录页
      this.$router.push("/login");
      this.$message.success("退出成功！");
    },
  },
};
</script>

<style scoped>
.home-container {
  height: 100%;
}
.home-container_left {
  display: flex;
  align-items: center;
}
.home-container_left span {
  margin-left: 46px;
}
.home-container_left img {
  margin-left: 24px;
  width: 55px;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0px;
  align-items: center;
  color: #fff; /* 让文本为白色 */
  font-size: 20px;
}
.el-aside {
  background-color: #333744;
  transition: all 0.4s;
}
.el-menu {
  border-right: none;
}
.el-main {
  background-color: #d7e9ff;
}
.toggle-button {
  background-color: #414a6a;
  text-align: center;
  line-height: 24px;
  font-size: 10px;
  color: #fff;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
