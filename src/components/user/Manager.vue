<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <div style="display:flex;justify-content:space-between">
        <div>
          <el-input
            placeholder="输入用户名进行查询"
            v-model="queryInfo.queryItems"
            clearable
          >
            <el-button slot="append" icon="el-icon-search"> </el-button>
          </el-input>
        </div>
        <div>
          <el-button type="primary" @click="addDialogVisible = true"
            >添加管理员</el-button
          >
        </div>
      </div>

      <!-- 用户列表区域 -->
      <el-table :data="managerList" :stripe="true" border>
        <!-- 下拉栏区域 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <el-col :span="3">当前在线状态:</el-col>
              <el-col :span="3">{{ props.row.onlineState }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="3">最后登录时间：</el-col>
              <el-col :span="4">{{ props.row.lastLogin }}</el-col>
            </el-row>
            <el-col :span="3">注册时间：</el-col>
            <el-col :span="4">{{ props.row.registTime }}</el-col>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          label="姓名"
          prop="nickname"
          align="center"
        ></el-table-column>
        <el-table-column
          label="用户名"
          prop="username"
          align="center"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          align="center"
        ></el-table-column>
        <el-table-column
          label="电话"
          prop="mobile"
          align="center"
        ></el-table-column>
        <el-table-column
          label="角色"
          prop="role_name"
          align="center"
        ></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <!-- 作用域插槽 -->
            <!-- scope.row能够访问到本行的数据 -->
            <!-- {{ scope.row }} -->
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="userStateChanged(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180px">
          <template>
            <!-- 作用域插槽 -->
            <!-- scope.row能够访问到本行的数据 -->
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              round
              @click="showEditDialog"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              round
              @click="removeUserById"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="2"
      >
      </el-pagination>

      <!-- 添加用户的对话框 -->
      <el-dialog
        title="添加普通管理员"
        :visible.sync="addDialogVisible"
        width="50%"
        @close="addDialogClosed"
      >
        <!-- 内容主体区域 -->
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="addFormRef"
          label-width="70px"
        >
          <el-form-item label="姓名" prop="nickname">
            <el-input v-model="addForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <!-- <el-form-item label="权限" prop="mg_roles">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="showEditDialog">
            确 定
          </el-button>
        </span>
      </el-dialog>

      <!-- 修改用户的对话框 -->
      <el-dialog
        title="修改用户基本信息"
        :visible.sync="editDialogVisible"
        width="50%"
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="editFormRef"
          label-width="70px"
        >
          <el-form-item label="姓名" prop="nickname">
            <el-input v-model="managerList[0].nickname"></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="managerList[0].username" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="managerList[0].password"></el-input>
          </el-form-item>
          <!-- <el-form-item label="权限" prop="mg_roles">
            <el-select v-model="value" placeholder="超级管理员">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="managerList[0].email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="managerList[0].mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    //验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb();
      }
      cb(new Error("请输入合法的邮箱"));
    };
    //验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式;
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        // 查询信息
        queryItems: "",
        // 当前的页数
        pagenum: 1,
        // 每一页的数据数
        pagesize: 5,
      },
      // 管理员信息列表
      managerList: [
        {
          nickname: "小红",
          username: "admin",
          password: "123123",
          mobile: "18588888888",
          email: "123@asd.com",
          mg_state: true,
          role_name: "超级管理员",
          onlineState: "在线",
          lastLogin: "2021-6-30",
          registTime: "2021-6-29",
        },
        {
          nickname: "花花",
          username: "user12138",
          password: "qwe123456",
          mobile: "15678787878",
          email: "kijhh@163.com",
          mg_state: true,
          role_name: "普通管理员",
          onlineState: "离线",
          lastLogin: "2021-7-12",
          registTime: "2021-7-3",
        },
      ],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        mg_roles: "",
      },
      // 权限管理
      // options: [
      //   {
      //     value: "选项一",
      //     label: "超级管理员",
      //   },
      //   {
      //     value: "选项二",
      //     label: "普通管理员",
      //   },
      //   {
      //     value: "选项三",
      //     label: "普通用户",
      //   },
      // ],

      // 添加表单的验证规则对象
      addFormRules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度需在3~10个字符之间",
            trigger: "blur",
          },
        ],
        mg_roles: [{ required: true, message: "请设置权限", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度需在3~10个字符之间",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度需在6~15个字符之间",
            trigger: "blur",
          },
        ],
        email: [
          {
            validator: checkEmail,
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          {
            validator: checkMobile,
            trigger: ["blur", "change"],
          },
        ],
      },
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      //查询到的用户信息对象
      editForm: {},

      //修改表单的验证对象
      editFormRules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            validator: checkEmail,
            trigger: ["blur", "change"],
          },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            validator: checkMobile,
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },

  methods: {
    //监听添加用户对话框的关闭
    addDialogClosed() {
      // 重置区域
      this.$refs.addFormRef.resetFields();
    },
    showEditDialog() {
      this.editDialogVisible = true;
    },
    removeUserById() {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).catch((err) => err);
    },
  },
};
</script>
