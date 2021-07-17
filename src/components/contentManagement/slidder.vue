<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      <el-breadcrumb-item>轮播图</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片区域 -->
    <el-card style="text-align:center;">
      <!-- 轮播图预览区域 -->
      <el-row>
        <div class="clear_tips">当前官网轮播图:</div>
      </el-row>
      <el-carousel :interval="3000" arrow="always" type="card">
        <el-carousel-item v-for="item in slideImgs" :key="item.id">
          <img :src="item.src" width="100%" height="100%" />
        </el-carousel-item>
      </el-carousel>
      <!-- 文件上传 -->
      <el-divider></el-divider>
      <el-row>
        <div class="clear_tips">上传图片区域:</div>
      </el-row>
      <!--  -->
      <el-upload
        class="upload-demo"
        action
        drag
        :auto-upload="false"
        :show-file-list="false"
        :on-change="changeUpload"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>

      <!-- html部分 -->
      <el-dialog
        title="剪切图片"
        :visible.sync="cropper_visible"
        width="50%"
        :modal="false"
      >
        <div class="cropper-content">
          <!-- 剪切图 -->
          <div class="cropper" style="text-align:center">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.size"
              :outputType="option.outputType"
              :info="true"
              :full="option.full"
              :canMove="option.canMove"
              :canMoveBox="option.canMoveBox"
              :canScale="option.canScale"
              :original="option.original"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCroppHeight"
              :fixed="option.fixed"
              :fixedNumber="option.fixedNumber"
              :centerBox="option.centerBox"
              :infoTrue="option.infoTrue"
              :fixedBox="option.fixedBox"
              @realTime="realTime"
            ></vueCropper>
            <div style="margin-top:10px;">
              <el-button
                type="primary"
                icon="el-icon-plus"
                circle
                @click="$refs.cropper.changeScale(1)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-minus"
                circle
                @click="$refs.cropper.changeScale(-1)"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-refresh-right"
                circle
                @click="$refs.cropper.rotateRight()"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-refresh-left"
                circle
                @click="$refs.cropper.rotateLeft()"
              ></el-button>
            </div>
          </div>
          <!-- 预览图 -->
          <!-- 预览图跟着动 -->
          <!-- :style="{'width': previews.w + 40 + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}" -->
          <div
            class="show-preview"
            style="border:1px solid red;margin-top:28px"
            :style="{
              width: previews.w + 'px',
              height: previews.h + 'px',
              transform: `scale(calc(280 / ${previews.w}),calc(280 / ${previews.h}`,
              overflow: 'hidden',
            }"
          >
            <!-- class="preview" //预览图跟着变化 :style="{ width: previews.w + 'px'
            , height: previews.h + 'px' , transform:`scale(calc(280 /
            ${previews.w}),calc(280 / ${previews.h}))`, overflow: 'hidden', }"
            style="transform-origin:0 0" > -->

            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="cropper_visible = false">取 消</el-button>
          <el-button type="primary" @click="finish">上传图片</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cropper_visible: false,
      previews: {},
      option: {
        img: "", // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "jpeg", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 400, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [2, 2], // 截图框的宽高比例
        full: false, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        canMove: false,
      },
      filename: "",

      //
      imageUrl: "",
      slideImgs: [
        {
          id: "Img-1",
          src: "http://p18.qhimg.com/bdr/__85/d/_open360/pet01081/7.jpg",
        },
        { id: "Img-2", src: "http://pic.pc6.com/up/2016-3/201635174246.jpg" },
        {
          id: "Img-3",
          src:
            "http://img2.jqw.com/2014/07/23/1424004/product/b201407291815310134.jpg",
        },
        {
          id: "Img-4",
          src:
            "https://img.zcool.cn/community/017e755b1e7800a80121bbecf2960b.jpg@2o.jpg",
        },
        {
          id: "Img-5",
          src:
            "http://img5.pcpop.com/ArticleImages/picshow/900x675/20140225/2014022517222006977.jpg",
        },
        {
          id: "Img-6",
          src:
            "https://fs.zhenjiang365.cn/bbsatt/day_190913/qn_1568373248270795907rs.jpg",
        },
      ],
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
    };
  },
  methods: {
    // 上传按钮   限制图片大小
    changeUpload(file, fileList) {
      let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isJPG = testmsg === "jpg";
      const isPNG = testmsg === "png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
        return;
      }
    },
    // 添加预览
    realTime(data) {
      this.previews = data;
    },
    // 上传图片到裁剪部分
    changeUpload(file, fileList) {
      // 获取文件名，后面上传的时候需要知道文件名来知道格式
      this.filename = file.name;
      // 判断图片格式
      const isIMG = ["jpg", "png"].some((r) => file.name.endsWith(r));
      if (!isIMG) {
        this.$message.error("请上传正确的图片格式!");
        return false;
      }
      // 判断图片大小不能大于2M
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("图片大小不能超过2MB!");
        return false;
      }
      //赋值的代码放到异步
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.cropper_visible = true;
        // 上传预览图片  是个临时的缓存地址
        this.option.img = URL.createObjectURL(file.raw);
      });
    },

    // 上传图片到后台
    finish() {
      // 获取当前数据流
      this.$refs.cropper.getCropBlob(async (data) => {
        // 创造一个formdata 上传都需要formdata
        let frm = new FormData();
        // file为后台接收的参数名
        frm.append("file", data, this.filename);
        // 上传到后台
        let res = await this.$post(this.COMMON_UPLOAD_POST_URL, frm);
        //后台返回重命名后的图片名称
        this.info.img = res;
        let upload = document.getElementsByClassName("el-upload-dragger")[0];
        upload.style.border = "none";
        // 关闭弹窗
        this.cropper_visible = false;
      });
    },
  },
};
</script>
<style scoped>
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

/* 图片裁剪的css样式 */
.cropper-content {
  display: flex;
}
.cropper {
  width: 280px;
  height: 280px;
}
.vue-cropper {
  background: rgb(155, 152, 152);
}
.show-preview {
  margin-left: 50px;
  align-items: center;
}
.preview {
  overflow: hidden;
  background: #cccccc;
}
</style>
