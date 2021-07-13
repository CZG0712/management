<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>在线客服</el-breadcrumb-item>
      <el-breadcrumb-item>消息列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <el-row :gutter="1">
        <!-- 左侧聊天区域 -->
        <el-col :span="18">
          <div class="chatBox">
            <div class="chatBox_title">当前正与xxx聊天...</div>
          </div>
          <!-- 消息显示区域 -->
          <div class="chatBox_body"></div>
          <!-- 发送消息区域 -->
          <div class="sendMsgBox">
            <!-- 左侧编辑消息区域 -->
            <el-col></el-col>
            <!-- 右侧操作按钮区域 -->
            <el-col></el-col>
          </div>
        </el-col>
        <!-- 右侧用户列表区域 -->
        <el-col :span="6"
          ><div class="customer_list">
            <div class="chatBox_title">消息列表</div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
/* 分隔 */
.chatBox_title {
  border: 1px solid red;
  display: flex;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 8px;
  border-bottom: 1px solid black;
  font-size: 16px;
  background-color: rgba(99, 172, 245, 0.918);
  border-radius: 4px 4px 0 0;
}
.chatBox_body {
  border: 1px solid blue;
  height: 300px;
}
.sendMsgBox {
  border: 1px solid green;
  height: 80px;
}
.customer_list {
  border: 1px solid black;
  height: 418px;
}
</style>
