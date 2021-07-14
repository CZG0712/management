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
        <el-carousel-item v-for="item in slideImgs" :key="item.id">
          <h3 class="medium">{{ item.id }}</h3>
        </el-carousel-item>
      </el-carousel>
      <!-- 文件上传 -->
      <el-divider></el-divider>
      <el-row>
        <div class="clear_tips">上传图片区域:</div>
      </el-row>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <div slot="tip" class="el-upload__tip">
          只能上传JPG文件，且不超过2MB
        </div>
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
      imageUrl: "",
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
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  /* border: 1px solid grey; */
  width: 140px;
  height: 30px;
  border-radius: 10px;
  padding: 5px 2px 1px 10px;
  margin-top: -5px;
  color: rgb(55, 66, 62);
  background-color: rgb(115, 178, 233);
  margin-bottom: 5px;
  box-shadow: 0 0 10px rgba(67, 136, 233, 0.8);
}
/* 上传图片区域的样式 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed rgb(123, 123, 123);
  border-radius: 30px;
  margin-top: 10px;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
