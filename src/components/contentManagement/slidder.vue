<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card>
      <!-- 轮播图预览区域 -->
      <el-row>
        <div class="clear_tips">当前官网轮播图:</div>
      </el-row>
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="item in slideImgs" :key="item">
          <h3 class="medium">{{ item.id }}</h3>
        </el-carousel-item>
      </el-carousel>
      <!-- 文件上传 -->
      <el-divider></el-divider>
      <el-row>
        <div class="clear_tips">上传图片区域:</div>
      </el-row>
      <el-upload action="#" list-type="picture-card" :auto-upload="false">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
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
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slideImgs: [
        { id: "Img-1", src: "123123" },
        { id: "Img-2", src: "123123" },
        { id: "Img-3", src: "123123" },
        { id: "Img-4", src: "123123" },
        { id: "Img-5", src: "123123" },
        { id: "Img-6", src: "123123" },
      ],
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  display: flex;
  justify-content: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.clear_tips {
  font-size: 18px;
  font-weight: 100px;
  border: 1px solid grey;
  width: 140px;
  height: 30px;
  border-radius: 10px;
  padding: 5px 2px 1px 10px;
  color: rgb(55, 66, 62);
  background-color: rgb(115, 178, 233);
  margin-bottom: 5px;
}
</style>
