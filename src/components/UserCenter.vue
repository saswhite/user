<template>
  <div class="user">
    <div class="user-title">
      <div
        :class="[
          'user-title-section',
          isChange == 'UserCenterInfo' ? 'bb' : ''
        ]"
        @click="change('UserCenterInfo')"
      >
        个人信息
      </div>
      <div
        :class="[
          'user-title-section',
          isChange == 'ExchangeRecords' ? 'bb' : ''
        ]"
        @click="change('ExchangeRecords')"
      >
        兑换记录
      </div>
    </div>
    <div class="user-main">
      <component :is="isChange" :userinfo="list"></component>
    </div>
  </div>
</template>

<script>
import UserCenterInfo from "../components/UserCenterInfo";
import ExchangeRecords from "../components/ExchangeRecords";
import { mapState } from "vuex";
export default {
  name: "UserCenter",
  data() {
    return {
      isChange: "UserCenterInfo",
      list: []
    };
  },
  computed: {
    getUserinfo() {
      return this.$route;
    },
    ...mapState({
      userinfo: "list"
    })
  },
  components: {
    UserCenterInfo,
    ExchangeRecords
  },
  methods: {
    change(name) {
      this.isChange = name;
    },
    /*获取用户信息 */
    getUserInfo() {
      this.list = this.userinfo;
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  &-title {
    display: flex;
    &-section {
      cursor: pointer;
      height: 60px;
      width: 100px;
      text-align: center;
      line-height: 60px;
      font-size: 24px;
      margin-left: 40px;
      box-sizing: border-box;
    }
    &-section:hover {
      border-bottom: 3px solid #bd62e2;
    }
    .bb {
      border-bottom: 3px solid #bd62e2;
    }
  }
  &-main {
    width: 1000px;
    height: 600px;
    border: 1px solid #ccc;
    margin: 20px auto 0;
    padding: 50px 80px;
    box-sizing: border-box;
    overflow: auto;
  }
}
</style>
