<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-row>
      <el-col class="user_pic" :span="8">
        <div class="demo-fit">
          <div class="block">
            <!-- 用户头像区域 -->
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div class="func_btn">
            <div>
              <el-button
                type="warning"
                plain
                size="medium"
                @click="editUserpassword = 'true'"
                >修改密码</el-button
              >
            </div>
            <div>
              <el-button type="success" plain size="medium">保存修改</el-button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <el-card>
          <el-row class="person_item">
            <el-col :span="3">
              权限：
            </el-col>
            <el-col :span="16">
              <el-input
                v-model="user.role_name"
                :disabled="true"
                size="medium"
              ></el-input>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row class="person_item">
            <el-col :span="3">昵称:</el-col>
            <el-col :span="16">
              <el-input
                v-model="user.nickname"
                clearable
                size="medium"
              ></el-input>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row class="person_item">
            <el-col :span="3">账号：</el-col>
            <el-col :span="16">
              <el-input
                v-model="user.username"
                clearable
                size="medium"
              ></el-input>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row class="person_item">
            <el-col :span="3">邮箱：</el-col>
            <el-col :span="16">
              <el-input v-model="user.email" clearable size="medium"></el-input>
            </el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row class="person_item">
            <el-col :span="3"> 电话：</el-col>
            <el-col :span="16">
              <el-input
                v-model="user.mobile"
                clearable
                size="medium"
              ></el-input>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 修改密码的对话框 -->
    <el-dialog title="修改密码" :visible.sync="editUserpassword" width="50%">
      <el-form
        :model="editPasswordForm"
        :rules="editPasswordRules"
        ref="editPasswordRef"
        label-width="70px"
      >
        <el-form-item label="旧密码" prop="prePassword">
          <el-input
            v-model="editPasswordForm.prePassword"
            placeholder="请输入旧密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="editPasswordForm.newPassword"
            placeholder="请输入新密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="renewPassword">
          <el-input
            v-model="editPasswordForm.renewPassword"
            placeholder="请再次输入新密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="valicationCode">
          <el-input
            v-model="editPasswordForm.valicationCode"
            placeholder="请输入验证码"
            clearable
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserpassword = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl:
        "http://img.wxcha.com/m00/b0/94/6b74cf0e11b9ede2c213b48eefe062f0.jpg",
      //修改用户头像框的显示与否
      editUserImg: false,
      //修改密码框的显示与否
      editUserpassword: false,
      user: {
        nickname: "小红",
        username: "admin",
        password: "123123",
        mobile: "18588888888",
        email: "123@asd.com",
        mg_state: true,
        role_name: "超级管理员",
      },
      editPasswordForm: {
        id: "",
        prePassword: "",
        newPassword: "",
        renewPassword: "",
        valicationCode: "",
      },
      editPasswordRules: {
        prePassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        renewPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
        valicationCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
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
.el-row {
  display: flex;
}
.el-col {
  font-size: 18px;
  /* display: flex; */
  justify-content: center;
}

.user_pic img {
  width: 160px;
  border-radius: 80px;
  /* border: 1px solid red; */
}
.func_btn {
  display: block;
  /* margin-left: 14%; */
}
.el-button {
  margin-top: 10px;
  font-weight: bolder;
}
.demo-fit {
  width: 200px;
  text-align: center;
  margin-left: 24%;
  margin-top: 20%;
}
/* 头像框的样式 */
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
}
.avatar {
  width: 165px;
  height: 170px;
  display: block;
}
</style>
