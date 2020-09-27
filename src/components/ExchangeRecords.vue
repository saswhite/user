<template>
  <div class="point">
    <div class="point-section">
      <div
        v-for="item in list"
        :key="JSON.stringify(item)"
        class="point-section-container"
      >
        <div class="point-section-name">{{ item.name }}</div>
        <div class="point-section-created">
          {{ item.exchangeDate | timeFilter }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExchangeRecords",
  data() {
    return {
      list: []
    };
  },
  methods: {
    async getRecords() {
      let userid = localStorage.getItem("userid");
      let exchangeData = await this.routerGet("/shop/exchangedRecord", {
        params: {
          id: userid
        }
      });

      this.list = exchangeData;
      console.log(exchangeData);
    }
  },
  created() {
    this.getRecords();
  }
};
</script>

<style lang="scss" scoped>
.point {
  padding-top: 50px;
  overflow: auto;
  &-section {
    &-container {
      padding-top: 30px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #ccc;
      line-height: 20px;
      .point-section-name {
        display: inline-block;
        width: 600px;
        word-wrap: break-word;
        color: #555555;
        font-size: 16px;
      }
      .point-section-created {
        color: #9d9d9d;
      }
    }
  }
}
</style>
