<template>
  <div class="register">
    <div class="register-container">
      <img src="../assets/auth.png" alt="" />
      <div class="register-main">
        <div class="register-main-title">欢迎登陆</div>
        <el-form
          :model="register"
          ref="registerForm"
          class="register-main-form"
          :rules="rules"
        >
          <el-form-item prop="username">
            <el-input
              v-model="register.username"
              placeholder="用户名:六位以上数字和字母组成"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="register.password"
              placeholder="密码"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="school">
            <el-input v-model="register.school" placeholder="学校"></el-input>
          </el-form-item>
          <el-form-item prop="nickName">
            <el-input v-model="register.nickName" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input
              v-model.number="register.age"
              placeholder="请输入年龄"
            ></el-input>
          </el-form-item>
          <el-form-item prop="gender">
            <el-select
              v-model="register.gender"
              placeholder="请选择"
              class="select"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="jump-container">
            <span>已有账号？去</span>
            <span class="linkLogin" @click="jumpLogin">登陆</span>
          </el-form-item>
          <el-form-item>
            <el-button class="register-btn" @click="checkData">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      register: {
        username: "",
        password: "",
        school: "",
        nickName: "",
        age: "",
        gender: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        school: [{ required: true, message: "请输入学校", trigger: "blur" }],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        age: [
          { required: true, message: "请输入年龄", trigger: "blur" },
          { type: "number", message: "请输入正确的格式", trigger: "change" }
        ],
        gender: [{ required: true, message: "请输入性别" }]
      },
      options: [
        {
          value: 0,
          label: "女"
        },
        {
          value: 1,
          label: "男"
        }
      ]
    };
  },
  methods: {
    /* 检查注册数据 */
    checkData() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.registerJump();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /* 发送注册请求，跳转登陆页面 */
    async registerJump() {
      let registerData = await this.routerPost("/user/regist", {
        username: this.register.username,
        password: this.register.password,
        school: this.register.school,
        nickname: this.register.nickName,
        age: this.register.age,
        gender: this.register.gender
      });
      console.log(registerData);
      try {
        if (registerData.success) {
          this.$message({
            message: "注册成功",
            type: "success"
          });
          this.register = {}; //清空输入框数据
          this.$router.push({
            name: "login"
          });
        }
      } catch (err) {
        alert(err);
      }
    },
    /* 跳转登陆页面 */
    jumpLogin() {
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  &-container {
    height: 650px;
    width: 900px;
    box-shadow: 2px 2px 10px #ccc;
    margin: 0 auto;
    margin-top: 100px;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      height: 550px;
      width: 400px;
    }
    .register-main {
      width: 270px;
      margin-right: 10px;
      &-title {
        text-align: center;
        margin-bottom: 15px;
        font-size: 24px;
      }
      .register-btn {
        background-color: #6963d0;
        color: #fff;
        font-size: 16px;
        font-weight: 400;
        width: 100%;
      }
      &-form {
        .jump-container {
          text-align: center;
          .linkLogin {
            color: #6963d0;
            cursor: pointer;
          }
          .linkLogin:hover {
            opacity: 0.7;
          }
        }
        .select {
          width: 100%;
        }
      }
    }
  }
}
</style>
