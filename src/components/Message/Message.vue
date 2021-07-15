<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>网站留言</el-breadcrumb-item>
      <el-breadcrumb-item>留言列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索与添加区域 -->
      <el-drawer
        title="更多搜索条件"
        :visible.sync="drawer"
        :direction="direction"
      >
        <!-- :before-close="handleClose" -->
        <div class="searchPart" style="justify-content:center">
          <div class="searchItem">
            <div style="margin-top:10px">电话：</div>
            <div style="margin-right:30px">
              <el-input
                v-model="queryInfo.queryItem.mobile"
                placeholder="按照电话查找"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="searchItem">
            <div style="margin-top:10px">邮箱：</div>
            <div style="margin-right:30px">
              <el-input
                v-model="queryInfo.queryItem.email"
                placeholder="按照邮箱查找"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="Search_Msg">
            <!-- 查找资讯 -->
            <el-button type="primary">查找</el-button>
          </div>
        </div>
      </el-drawer>
      <div class="searchPart">
        <div class="searchItem">
          <div style="margin-top:10px">日期：</div>
          <div style="margin-right:30px">
            <el-date-picker
              v-model="queryInfo.queryItem.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="searchItem">
          <div style="margin-top:10px">用户名：</div>
          <div style="margin-right:30px">
            <el-input
              v-model="queryInfo.queryItem.username"
              placeholder="按照用户名查找"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="searchItem">
          <div style="margin-top:10px">内容：</div>
          <div style="margin-right:30px">
            <el-input
              v-model="queryInfo.queryItem.content"
              placeholder="按照内容查找"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="extend_searchBtn">
          <div @click="drawer = true" type="primary">
            ^点击展开更多搜索条件
          </div>
        </div>
        <div class="Search_Msg">
          <!-- 查找资讯 -->
          <el-button type="primary">查找</el-button>
        </div>
      </div>
      <el-divider></el-divider>
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
          label="留言日期"
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
      //抽屉相关的数据
      drawer: false,
      direction: "ttb",
      // 获取用户列表的参数对象
      queryInfo: {
        // 查询信息
        queryItem: {
          date: "",
          content: "",
          username: "",
          mobile: "",
          email: "",
        },
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
    // 抽屉关闭的函数
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
  },
};
</script>
<style scoped>
.searchItem {
  display: flex;
}
.searchPart {
  display: flex;
  justify-content: space-between;
}
.extend_searchBtn {
  margin-top: 14px;
  margin-left: -20px;
  font-size: 14px;
  color: rgb(16, 151, 235);
  cursor: pointer;
}
</style>
