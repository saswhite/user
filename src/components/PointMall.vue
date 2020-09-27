<template>
  <div class="point">
    <div class="point-header">商城</div>
    <div class="point-main">
      <div class="point-main-header">
        <div class="point-main-header-title">当前积分</div>
        <div class="point-main-header-point">{{ point }}</div>
      </div>
      <div class="point-main-commodity">
        <div class="point-main-commodity-title">商品列表</div>
        <div
          class="point-main-commodity-container"
          v-for="item in list"
          :key="JSON.stringify(item)"
        >
          <div class="point-main-commodity-container-section">
            <img :src="item.image" alt="" class="info-img" />
            <div class="title">{{ item.name }}</div>
            <div class="info">
              <div class="info-point-box">
                <img src="../assets/img5.png" alt="" class="info-coin" />
                <span class="info-point">{{ item.price }}积分</span>
              </div>
              <button class="info-btn" @click="checkEx(item._id)">兑换</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="exchangeV" width="30%">
      <span>确定兑换这个商品吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exchangeV = false">取 消</el-button>
        <el-button type="primary" @click="exchangeRecords(false)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "PointMall",
  data() {
    return {
      list: [],
      exchangeV: false,
      id: ""
    };
  },
  computed: {
    ...mapState({
      point: "point"
    })
  },
  methods: {
    ...mapActions(["getPoint"]),
    /* 获取积分 */
    async getNewPoint() {
      let userid = localStorage.getItem("userid");
      let pointData = await this.routerGet("/user/userinfo", {
        params: {
          id: userid
        }
      });
      this.getPoint(pointData.integration);
    },
    /* 获取商品列表 */
    async getShopList() {
      let userid = localStorage.getItem("userid");
      let shopList = await this.routerGet("/shop/shopList", {
        id: userid
      });
      if (shopList) {
        this.list = shopList;
      }
    },
    /* 检查是否兑换 */
    checkEx(id) {
      let timer = null;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        this.id = id;
        this.exchangeV = true;
      }, 1000);
    },
    /* 确认兑换商品 */
    exchangeRecords(bool) {
      this.exchangeV = bool;
      this.exchange(this.id);
    },
    /* 兑换商品 */
    async exchange() {
      let exchangeData = await this.routerPut("/shop/exchange", {
        id: this.id
      });
      if (exchangeData) {
        this.$message({
          message: "兑换成功",
          type: "success"
        });
        this.getNewPoint();
      }
    }
  },
  created() {
    this.getShopList();
  }
};
</script>

<style lang="scss" scoped>
.point {
  &-header {
    height: 50px;
    width: 100%;
    line-height: 50px;
    padding-left: 50px;
    box-sizing: border-box;
    box-shadow: 0px 5px 5px #eae9e9;
  }
  &-main {
    width: 1000px;
    height: 650px;
    margin: 50px auto 0;
    &-header {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: url("../assets/jifen-background.png") no-repeat;
      background-size: contain;
      height: 180px;
      color: #fff;
      &-title {
        font-size: 24px;
      }
      &-point {
        font-size: 50px;
      }
    }
    &-commodity {
      margin-top: 40px;
      width: 100%;
      height: 400px;
      overflow: auto;
      &-title {
        padding-left: 50px;
        height: 40px;
        line-height: 40px;
      }
      &-container {
        display: inline-block;
        margin-top: 40px;
        margin-right: 50px;
        margin-left: 30px;
        margin-bottom: 10px;
        &-section {
          width: 250px;
          height: 360px;
          box-shadow: 0 2px 10px #aaa;
          .info-img {
            width: 100%;
            height: 285px;
          }
          .title {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #8a8a8a;
            height: 30px;
            line-height: 30px;
            padding-left: 5px;
            box-sizing: border-box;
          }
          .info {
            width: 100%;
            height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 8px;
            padding: 0 5px;
            box-sizing: border-box;
            &-point-box {
              display: flex;

              .info-coin {
                width: 20px;
                height: 20px;
              }
              .info-point {
                margin-left: 5px;
                color: #7e7bd8;
                font-size: 12px;
                line-height: 24px;
              }
            }
            &-btn {
              width: 50px;
              height: 25px;
              border-radius: 5px;
              background-color: #6964d1;
              color: #fff;
              outline: none;
              border: none;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
