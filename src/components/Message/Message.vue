<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>网站留言</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 留言表格区域 -->
      <el-table
        :data="MessageList"
        height="300"
        border
        style="width: 100%"
        :stripe="true"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="108"
          align="center"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="120" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="168" align="center">
        </el-table-column>
        <el-table-column prop="msg_content" label="留言内容" align="center">
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="9"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // 查询信息
        query: "",
        // 当前的页数
        pagenum: 1,
        // 每一页的数据数
        pagesize: 5,
      },
      MessageList: [
        {
          date: "2021-5-21",
          username: "ak116",
          mobile: "18588888888",
          email: "123@asd.com",
          msg_content: "你们公司资质怎么样？",
        },
        {
          date: "2021-6-21",
          username: "ak1996",
          mobile: "18588888888",
          email: "123@asd.com",
          msg_content: "请问你们公司在哪里？",
        },
        {
          date: "2020-5-11",
          username: "ak116",
          mobile: "18588888888",
          email: "123@asd.com",
          msg_content: "请问你们公司联系方式是多少？",
        },
        {
          date: "2020-4-23",
          username: "ak116",
          mobile: "18588888888",
          email: "123@asd.com",
          msg_content: "请问你们公司联系方式是多少？",
        },
        {
          date: "2021-6-30",
          username: "dg9090kl",
          mobile: "15678787878",
          email: "kijhh@163.com",
          msg_content: "你们公司有哪些业务？",
        },
        {
          date: "2021-3-20",
          username: "dg9090kl",
          mobile: "15678787878",
          email: "kijhh@163.com",
          msg_content: "你们公司有哪些业务？",
        },
        {
          date: "2021-8-18",
          username: "dg9090kl",
          mobile: "15678787878",
          email: "kijhh@163.com",
          msg_content: "你们公司能干些什么？",
        },
        {
          date: "2021-6-16",
          username: "dg9090kl",
          mobile: "15678787878",
          email: "kijhh@163.com",
          msg_content: "周期要多长",
        },
        {
          date: "2021-9-31",
          username: "dg9090kl",
          mobile: "15678787878",
          email: "kijhh@163.com",
          msg_content: "怎么收费的？",
        },
      ],
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log("123");
    },
    handleCurrentChange(val) {},
  },
};
</script>
