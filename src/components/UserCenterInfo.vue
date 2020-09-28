<template>
  <div class="info">
    <div class="info-avatar">
      <img :src="userInfo.avatar" alt="" class="info-img" />
    </div>
    <div class="info-main">
      <div class="info-main-section">
        姓名：
        <span>{{ userInfo.username }}</span>
      </div>
      <div class="info-main-section">
        学校：
        <span>{{ userInfo.school }}</span>
      </div>
      <div class="info-main-section">
        昵称：
        <span>{{ userInfo.nickname }}</span>
      </div>
      <div class="info-main-section">
        性别：
        <span>{{ userInfo.gender | genderFilter }}</span>
      </div>
      <div class="info-main-section">
        密码：
        <span>{{ passwordStar }}</span>
        <span class="change-btn" @click="show">修改</span>
      </div>
    </div>

    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="50%"
      @close="clear"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input v-model="ruleForm.oldPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(false)">保存</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form></el-dialog
    >
  </div>
</template>

<script>
export default {
  name: "UserCenterInfo",
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        oldPass: ""
      },
      rules: {
        pass: [{ required: true, message: "输入框为空", trigger: "blur" }],
        checkPass: [
          { validator: validatePass, message: "输入框为空", trigger: "blur" }
        ],
        oldPass: [{ required: true, message: "输入框为空", trigger: "blur" }]
      },
      dialogVisible: false,
      userInfo: []
    };
  },
  methods: {
    clear() {
      this.ruleForm = {};
      this.$refs.ruleForm.clearValidate();
    },
    getInfo() {
      this.getUserInfo().then(res => {
        this.userInfo = res;
      });
    },
    /* 显示更改密码窗口 */
    show() {
      this.dialogVisible = !this.dialogVisible;
    },
    /* 检查更改密码信息 */
    submitForm(bool) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.exchangePassword();
          this.dialogVisible = bool;
        } else {
          return false;
        }
      });
    },
    /* 修改密码 */
    async exchangePassword() {
      let list = JSON.parse(JSON.stringify(this.ruleForm));
      let data = await this.routerPut("/user/changePassword", {
        oldPassword: list.oldPass,
        newPassword: list.pass
      });
      if (data) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.ruleForm = {};
        this.getInfo();
      }
    }
  },
  computed: {
    passwordStar() {
      return ("" + this.userInfo.password).replace(/./g, "*");
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  &-avatar {
    .info-img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  &-main {
    margin-left: 50px;
    width: 400px;
    height: 400px;
    &-section {
      display: inline-block;
      width: 200px;
      height: 50px;
      line-height: 50px;
      font-size: 16px;
      color: #666666;
      span {
        margin-left: 20px;
      }
      .change-btn {
        cursor: pointer;
        color: #8e87de;
      }
    }
  }
}
</style>
