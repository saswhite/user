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
          <div class="aside-section" @click="quit">退出</div>
        </div>
      </div>
      <div class="manage-main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Management",
  data() {
    return {
      isClick: this.$route.name,
      list: {}
    };
  },
  methods: {
    ...mapActions(["getPoint"]),
    /* 获取用户信息 */
    async getUserInfo() {
      let userid = localStorage.getItem("userid");
      let params = {
        id: userid
      };
      let userinfo = await this.routerGet("/user/userinfo", {
        params
      });
      this.getPoint(userinfo.integration);
      this.list = userinfo;
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
      this.$router.replace({
        name: "login"
      });
      localStorage.removeItem("userid");
    }
  },
  created() {
    this.getUserInfo();
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
