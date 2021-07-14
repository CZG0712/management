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
        <el-button type="primary" @click="addFirstMenuDialog = 'true'">
          添加一级菜单项
        </el-button>
        <el-button type="primary" @click="addSecondMenuDialog = 'true'">
          添加二级菜单项
        </el-button>
      </div>
      <el-divider></el-divider>

      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- {{ props.row.name }} -->
            <el-table :data="props.row.children" style="width: 100%" border>
              <el-table-column label="二级菜单序号" prop="name" align="center">
              </el-table-column>
              <el-table-column label="菜单名称" prop="content" align="center">
              </el-table-column>
              <el-table-column label="菜单跳转链接" prop="url" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template>
                  <!-- 作用域插槽 -->
                  <!-- scope.row能够访问到本行的数据 -->
                  <!-- 修改按钮 -->
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    round
                    size="mini"
                    @click="editSecondMenuDialog = true"
                  ></el-button>
                  <!-- 删除按钮 -->
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    round
                    size="mini"
                    @click="removeMenuItemById"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="一级菜单序号" prop="name" align="center">
        </el-table-column>
        <el-table-column label="菜单名称" prop="content" align="center">
        </el-table-column>
        <el-table-column label="菜单跳转链接" prop="url" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template>
            <!-- 作用域插槽 -->
            <!-- scope.row能够访问到本行的数据 -->
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              round
              size="medium"
              @click="editFirstMenuDialog = 'true'"
            >
              编辑
            </el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              round
              size="medium"
              @click="removeMenuItemById"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 添加一级菜单项的对话框 -->
      <el-dialog
        title="添加一级菜单项信息"
        :visible.sync="addFirstMenuDialog"
        width="50%"
      >
        <el-form
          :model="addFirstMenuForm"
          :rules="menuFormRules"
          ref="editMenuFormRef"
          label-width="80px"
        >
          <el-form-item label="菜单名称" prop="Itemname">
            <el-input v-model="addFirstMenuForm.Itemname"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接" prop="Itemurl">
            <el-input v-model="addFirstMenuForm.Itemurl"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFirstMenuDialog = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑一级菜单项的对话框 -->
      <el-dialog
        title="编辑一级菜单项信息"
        :visible.sync="editFirstMenuDialog"
        width="50%"
      >
        <el-form
          :model="editFirstMenuForm"
          :rules="menuFormRules"
          ref="editMenuFormRef"
          label-width="80px"
        >
          <el-form-item label="菜单名称" prop="Itemname">
            <el-input v-model="editFirstMenuForm.Itemname"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接" prop="Itemurl">
            <el-input v-model="editFirstMenuForm.Itemurl"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editFirstMenuDialog = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加二级菜单项的对话框 -->
      <el-dialog
        title="添加二级菜单项信息"
        :visible.sync="addSecondMenuDialog"
        width="50%"
      >
        <el-form
          :model="addSecondMenuForm"
          :rules="menuFormRules"
          ref="editMenuFormRef"
          label-width="110px"
        >
          <el-form-item label="一级菜单名称">
            <el-select v-model="firstMenuContent" placeholder="请选择">
              <el-option
                v-for="item in tableData"
                :key="item.id"
                :label="item.content"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级菜单名称" prop="Itemname">
            <el-input v-model="addSecondMenuForm.Itemname"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接" prop="Itemurl">
            <el-input v-model="addSecondMenuForm.Itemurl"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addSecondMenuDialog = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改二级菜单项的对话框 -->
      <el-dialog
        title="修改二级菜单项信息"
        :visible.sync="editSecondMenuDialog"
        width="50%"
      >
        <el-form
          :model="editSecondMenuForm"
          :rules="menuFormRules"
          ref="editMenuFormRef"
          label-width="80px"
        >
          <el-form-item label="菜单名称" prop="Itemname">
            <el-input v-model="editSecondMenuForm.Itemname"></el-input>
          </el-form-item>
          <el-form-item label="跳转链接" prop="Itemurl">
            <el-input v-model="editSecondMenuForm.Itemurl"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editSecondMenuDialog = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstMenuContent: "",
      // 添加一级菜单框是否显示
      addFirstMenuDialog: false,
      // 编辑一级菜单是否显示
      editFirstMenuDialog: false,
      // 添加二级菜单框是否显示
      addSecondMenuDialog: false,
      // 编辑二级菜单是否显示
      editSecondMenuDialog: false,
      // 菜单项列表验证规则对象
      menuFormRules: {
        Itemname: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "菜单名称需要在2~10个字符之间",
            trigger: "blur",
          },
        ],
        Itemurl: [
          { required: true, message: "请输入跳转链接", trigger: "blur" },
        ],
      },
      // 添加一级单项菜单列表数据
      addFirstMenuForm: {
        Itemname: "",
        Itemurl: "",
      },
      // 修改一级单项菜单列表数据
      editFirstMenuForm: {
        Itemname: "",
        Itemurl: "",
      },
      // 添加二级单项菜单列表数据
      addSecondMenuForm: {
        Itemname: "",
        Itemurl: "",
      },
      // 修改二级单项菜单列表数据
      editSecondMenuForm: {
        Itemname: "",
        Itemurl: "",
      },
      // 菜单列表数据
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
              url: "http://www.sougou.com",
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

  methods: {
    removeMenuItemById() {
      this.$confirm("此操作将永久删除该级菜单项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).catch((err) => err);
    },
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
</style>
