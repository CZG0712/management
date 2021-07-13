<template>
  <div class="login_container">
    <div class="welcomewords">
      欢迎使用武汉达冠公司官网后台管理系统
    </div>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/imgs/logo.png" />
      </div>
      <!-- 登录表单区域 -->
      <!-- 需要进行相关数据绑定 -->
      <el-form
        label-width="0px"
        :rules="loginFormRules"
        ref="loginFormRef"
        class="login_form"
        :model="loginForm"
      >
        <!-- ref引用，其值loginFormRef是该组件的实例对象 -->
        <!-- props作用是选择对应的验证规则 -->
        <el-form-item prop="username">
          <!-- 用户名 -->
          <!-- 输入框需要进行数据绑定 -->
          <el-input
            prefix-icon="el-icon-user"
            v-model="loginForm.username"
            placeholder="用户名"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 密码 -->
          <!-- 输入框需要进行数据绑定 -->
          <el-input
            prefix-icon="el-icon-lock"
            v-model="loginForm.password"
            show-password
            placeholder="密码"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <!-- 按钮区域 -->
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetloginFormRef">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  // 数据部分，必须是函数的形式
  data() {
    return {
      // 这是登录表单的数据绑定对象,
      loginForm: {
        username: "admin",
        password: "123456",
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          // 一个规则就是一个对象
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
          // required: true：是必填项；message:提示信息 ；trigger: "blur"：输入框失焦的时候触发
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          // 一个规则就是一个对象
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 点击重置按钮，对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    resetloginFormRef() {
      // console.log(this);
      // 打印实例对象，找到表单所在位置，调用重置函数
      this.$refs.loginFormRef.resetFields();
    },
    // 表单的预验证
    login() {
      this.$router.push("/home");
      this.$message.success("登陆成功!");
      // // 如果某个方法的返回值是promise,可以用await async 进行简化
      // //await 只用用在被async 修饰的方法中
      // this.$refs.loginFormRef.validate(async (valid) => {
      //   // console.log(valid);
      //   if (!valid) return;
      //   // 解构赋值data并重命名为res对象
      //   const { data: res } = await this.$http.post("login", this.loginForm);
      //   // console.log(res);
      //   if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      //   // 使用message弹窗提醒，注意使用方法，以及使用前的导入和全局挂载
      //   this.$message.success(res.meta.msg);
      //   // 登录成功之后做些什么？
      //   // 1.将登录成功之后的token，保存到客户端的sessionStorage中
      //   // (localStorage:持久化的存储机制，sessionStorage:会话期间的存储机制)
      //   //   1.1 项目中除了登陆之外的API接口，必须在登录之后才能访问
      //   //   1.2 token只应在当前网页打开期间生效，所以将token保存在sessionStorage中
      //   // console.log(res);
      //   window.sessionStorage.setItem("token", res.data.token);
      //   // 2.通过编程式导航跳转到后台主页，路由地址是/home
      //   this.$router.push("/home");
      //   // 这是编程式导航
      // });
    },
  },
};
</script>

// scoped的作用是将css样式的作用范围限制在本文件
<style lang="css" scoped>
.welcomewords {
  display: flex;
  justify-content: center;
  /* position: absolute; */
  padding-top: 50px;
  font-size: 50px;
  color: #0771ce;
}
.login_container {
  background: #184878;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid rgb(236, 236, 236);
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px rgb(216, 210, 210);
  background-color: rgb(255, 255, 255);
  position: absolute;
  left: 50%; /* 父级(login_box)的50% */
  transform: translate(-50%, -50%); /* avatar_box自身的50% */
}
.avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: rgb(241, 241, 241);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
