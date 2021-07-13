<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>网页顶部菜单</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <div class="func_btns">
        <el-button type="warning">放弃更改</el-button>
        <el-button type="primary">保存更改</el-button>
      </div>
      <el-divider></el-divider>

      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- {{ props.row.name }} -->
            <el-table :data="props.row.children" style="width: 100%" border>
              <el-table-column label="二级菜单序号" prop="name">
              </el-table-column>
              <el-table-column label="菜单名称" prop="content">
              </el-table-column>
              <el-table-column label="菜单链接" prop="url"> </el-table-column>
              <el-table-column label="操作">
                <template>
                  <!-- 作用域插槽 -->
                  <!-- scope.row能够访问到本行的数据 -->
                  <!-- 修改按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    round
                    size="mini"
                  ></el-button>
                  <!-- 删除按钮 -->
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    round
                    size="mini"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="一级菜单序号" prop="name"> </el-table-column>
        <el-table-column label="菜单名称" prop="content"> </el-table-column>
        <el-table-column label="菜单链接" prop="url"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <!-- 作用域插槽 -->
            <!-- scope.row能够访问到本行的数据 -->
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              round
              size="medium"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              round
              size="medium"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 编辑菜单框是否显示
      editMenuDialog: false,
      // 顶部菜单列表
      topMenuList: [
        { id: 1, name: "Item-1", content: "网站首页", url: "" },
        { id: 1, name: "Item-2", content: "公司介绍", url: "" },
        { id: 1, name: "Item-3", content: "服务支持", url: "" },
        { id: 1, name: "Item-4", content: "咨询动态", url: "" },
        { id: 1, name: "Item-5", content: "关于我们", url: "" },
      ],

      tableData: [
        {
          id: "1",
          name: "Item-1",
          content: "网站首页",
          url: "http://www.baidu.com",
          children: [
            {
              name: "Item-1-1",
              content: "网站首页-1",
              url: "http://www.baidu.com",
            },
            {
              name: "Item-1-2",
              content: "网站首页-2",
              url: "http://www.baidu.com",
            },
          ],
        },
        {
          name: "Item-2",
          content: "公司介绍",
          url: "http://www.baidu.com",
          children: [
            {
              name: "Item-2-1",
              content: "公司介绍-1",
              url: "",
            },
          ],
        },
        {
          name: "Item-3",
          content: "服务支持",
          url: "http://www.baidu.com",
        },
        {
          name: "Item-4",
          content: "咨询动态",
          url: "http://www.baidu.com",
        },
        {
          name: "Item-5",
          content: "关于我们",
          url: "http://www.baidu.com",
        },
      ],
    };
  },
};
</script>
<style scoped>
.el-table,
.el-row {
  margin-bottom: 10px;
  /* border: 1px solid rgb(147, 147, 147); */
}
.edit_items {
  font-weight: bold;
  color: rgb(165, 165, 165);
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
