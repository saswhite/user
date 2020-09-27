<template>
  <div class="login">
    <div class="login-container">
      <img src="../assets/auth.png" alt="" />
      <div class="login-main">
        <div class="login-main-title">欢迎登陆</div>
        <el-form
          :model="login"
          ref="loginForm"
          class="login-main-form"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input
              v-model="login.username"
              placeholder="请输入您的用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="login.password"
              placeholder="请输入您的密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item class="jump-container">
            <span>还没有账号？</span>
            <span class="linkRegist" @click="jumpRegister">新用户注册</span>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn" @click="checkLogin">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    /* 检查登陆数据 */
    checkLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loginJump();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 发送登陆请求 */
    async loginJump() {
      let loginData = await this.routerPost("/user/login", {
        username: this.login.username,
        password: this.login.password
      });
      if (loginData.success) {
        this.$message({
          message: "登陆成功",
          type: "success"
        });
        this.loginForm = {};
        localStorage.setItem("userid", loginData.user._id);
        this.$router.push({
          name: "management"
        });
      }
    },
    /* 跳转到登陆页面 */
    jumpRegister() {
      this.$router.push({
        name: "register"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  &-container {
    height: 465px;
    width: 870px;
    box-shadow: 2px 2px 10px #ccc;
    margin: 0 auto;
    margin-top: 100px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 380px;
      height: 430px;
    }
    .login-main {
      height: 240px;
      width: 280px;
      margin-right: 30px;
      &-title {
        font-size: 24px;
        text-align: center;
      }
      &-form {
        margin-top: 20px;
        .jump-container {
          margin-top: 10px;
          text-align: center;
          color: #afafaf;
          .linkRegist {
            color: #6963d0;
            cursor: pointer;
          }
          .linkRegist:hover {
            opacity: 0.7;
          }
        }
        .login-btn {
          background-color: #6963d0;
          color: #fff;
          font-size: 16px;
          font-weight: 400;
          width: 100%;
        }
      }
    }
  }
}
</style>
