<template>
  <div class="manage">
    <div class="manage-container">
      <div class="aside">
        <div class="aside-user">
          <img :src="list.avatar" alt="" class="aside-user-avatar" />
          <div class="aside-user-nickName">
            {{ list.nickname }}
          </div>
        </div>
        <div class="aside-section-container">
          <div
            :class="['aside-section', isClick == 'userCenter' ? 'bg' : '']"
            @click="change('userCenter')"
          >
            个人中心
          </div>
          <div
            :class="['aside-section', isClick == 'pointMall' ? 'bg' : '']"
            @click="change('pointMall')"
          >
            积分商城
          </div>
          <div class="aside-section" @click="isQuit = true">退出</div>
        </div>
      </div>
      <div class="manage-main">
        <router-view></router-view>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="isQuit" width="30%">
      <span>确认要退出吗</span>
      <span slot="footer">
        <el-button @click="quit">确定</el-button>
        <el-button @click="isQuit = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Management",
  data() {
    return {
      isClick: this.$route.name,
      list: {},
      isQuit: false
    };
  },
  methods: {
    getInfo() {
      this.getUserInfo().then(res => {
        this.list = res;
      });
    },
    /* 跳转子路由 */
    change(name) {
      this.$router.push({
        name: name
      });
      this.isClick = name;
    },
    /* 退出 */
    quit() {
      this.isQuit = false;
      localStorage.removeItem("userid");
      this.$router.replace({
        name: "login"
      });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
.manage {
  width: 100vw;
  height: 100vh;
  &-container {
    width: 100%;
    height: 100%;
    display: flex;
    .aside {
      width: 400px;
      height: 100%;
      background-color: #333333;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &-user {
        margin-bottom: 50px;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-avatar {
          margin-bottom: 20px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
        &-nickName {
          color: #fff;
        }
      }
      &-section-container {
        margin-bottom: 200px;
        .aside-section {
          cursor: pointer;
          color: #fff;
          font-size: 20px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          width: 100%;
        }
        .aside-section:hover {
          background-color: #7e3299;
          color: #fff;
        }
      }
    }
    .manage-main {
      width: 100%;
    }
    .bg {
      background-color: #7e3299;
      color: #fff;
    }
  }
}
</style>
