<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>新闻资讯</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <div class="topSearch">
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
            <div style="margin-top:10px">标题：</div>
            <div style="margin-right:30px">
              <el-input
                v-model="queryInfo.queryItem.title"
                placeholder="按照标题查找"
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
        </div>
        <div class="postNewNews">
          <!-- 查找资讯 -->
          <el-button type="primary">查找</el-button>
          <el-button type="primary" @click="addDialogVisible = true"
            >发布资讯</el-button
          >
        </div>
      </div>
      <el-divider></el-divider>

      <!-- 新闻资讯列表区域 -->
      <el-table
        :data="newsList"
        :stripe="true"
        border
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <!-- 索引列表 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          label="日期"
          prop="date"
          align="center"
          sortable
        ></el-table-column>
        <el-table-column
          label="标题"
          prop="title"
          align="center"
        ></el-table-column>
        <el-table-column
          label="内容"
          prop="content"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 作用域插槽 -->
          <!-- scope.row能够访问到本行的数据 -->
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            round
            @click="editDialogVisible = true"
            >编辑</el-button
          >
          <!-- 删除按钮 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            round
            @click="removeNews"
            >删除</el-button
          >
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="3"
      >
      </el-pagination>

      <!-- 添加新的资讯的对话框 -->
      <el-dialog
        title="添加新的资讯"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!-- 内容主体区域 -->
        <el-form :model="addNewsForm" ref="addNewsFormRef" label-width="90px">
          <el-form-item label="标题:">
            <el-input
              v-model="addNewsForm.title"
              :height="200"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="内容:">
            <el-input
              v-model="addNewsForm.content"
              type="textarea"
              autosize
              placeholder="请输入内容"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="资讯配图:">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <!--  -->
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary">
            发 布
          </el-button>
        </span>
      </el-dialog>

      <!-- 修改资讯的对话框 -->
      <el-dialog title="编辑资讯" :visible.sync="editDialogVisible" width="50%">
        <!-- 内容主体区域 -->
        <el-form :model="addNewsForm" ref="editNewsFormRef" label-width="80px">
          <el-form-item label="标题:">
            <el-input
              v-model="newsList[0].title"
              :height="200"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="内容:">
            <el-input
              v-model="newsList[0].content"
              type="textarea"
              autosize
              placeholder="请输入内容"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="资讯配图:">
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <!--  -->
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary">
            确 定
          </el-button>
        </span>
      </el-dialog>
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
        queryItem: {
          date: "",
          title: "",
          content: "",
        },
        // 当前的页数
        pagenum: 1,
        // 每一页的数据数
        pagesize: 5,
      },
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //
      addNewsForm: {
        title: "",
        content: "",
      },
      // 添加咨询对话框的显示与不显示
      addDialogVisible: false,
      editDialogVisible: false,
      newsList: [
        {
          date: "2021-7-1",
          title: "测试01",
          content:
            "达冠公司后台管理系统达冠公司后台管理系统达冠公司后达冠公司后台管理系统达冠公司后台管理系统达冠公司后达冠公司后台管理系统达冠公司后台管理系统达冠公司后达冠公司后台管理系统达冠公司后台管理系统达冠公司后台管理系统达冠公司后台管理系统达冠公司后台管理系统",
        },
        {
          date: "2021-7-2",
          title: "测试02",
          content:
            "测试02测试02测试02测试02测试02测试02测试02测试02测试02测试02测试02测试02测试02测试02测试02测试02测试02",
        },
      ],
    };
  },
  methods: {
    //监听添加用户对话框的关闭
    addDialogClosed() {
      // 重置区域
      this.$refs.addNewsFormRef.resetFields();
      console.log("123123");
    },
    removeNews() {
      this.$confirm("此操作将永久删除该资讯, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).catch((err) => err);
    },

    //目前上传资讯图片的区域
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
};
</script>
<style scoped>
.topSearch {
  display: flex;
  justify-content: space-between;
}
.searchPart {
  display: flex;
  /* justify-content: space-between; */
}
.searchItem {
  display: flex;
}
</style>
