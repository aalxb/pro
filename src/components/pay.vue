<template>
  <div class="pay">
    <tab :line-width="2" active-color="#fc378c" v-model="index" style>
      <tab-item
        class="vux-center"
        v-for="(item, index) in list2"
        @click="demo2 = item"
        :key="index"
      >{{item}}</tab-item>
    </tab>
    <swiper v-model="index" height="100px" :show-dots="false">
      <swiper-item v-for="(item, index) in list2" :key="index">
        <!-- <div class="tab-swiper vux-center">{{item}} Container</div> -->
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import Footer from "./common/footer";
import { getObjectId } from "../assets/common";
import {
  Group,
  Cell,
  XButton,
  Flexbox,
  FlexboxItem,
  Swiper,
  SwiperItem,
  Tab,
  TabItem
} from "vux";
import { mapGetters } from "vuex";
// import { close } from 'fs';
export default {
  name: "Pay",
  components: {
    fix_footer: Footer,
    Group,
    Cell,
    XButton,
    Flexbox,
    FlexboxItem,
    Swiper,
    SwiperItem,
    Tab,
    TabItem
  },
  data() {
    return {
      list2: ["精选", "美食", "电影", "酒店", "外卖"],
      // 单位
      trade: "",
      can_pay: true,
      money: "",
      getgid: "",
      title: "",
      id: "",
      index: 0
    };
  },
  computed: {
    ...mapGetters("getUser", "getPlatform", "getUserId", "getUid", "getCompany")
  },
  mounted: function() {
    let that = this;

    let query = this.$route.query;

    const { bill, list } = query;
    // const { address, gid } = list;
    // const { je } = bill;
    that.trade = address;
    that.money = je;
    that.getgid = gid;
  },

  methods: {
    onTypeChange(index) {
      this.tablist = this.tabs[index];
      switch (index) {
        case 0:
          this.onGetReports();
          break;
        case 1:
          this.onGetAppointments();
          break;
      }
    },
    onPay() {
      let weixin =
        "https://payapp.weixin.qq.com/life/index?showwxpaytitle=1&exportkey=Abd3WFedlcgtIC2jQ%2BNIHmo%3D&clientversion=26031e30&devicetype=android-23&pass_ticket=knyt6QdUNshxPNZISnflWYCzs5AUMiNGZDw%2BmrBigm9xQaWBiGsyDxwPl1bteumv#/agency/3/city/172";
      let alipay =
        "alipays://platformapi/startapp?appId=20000193&url=%2Fwww%2FeBill.htm%3Freferer%3DGOPAY%26instId%3DHZGAS%26subBizType%3DGAS%26billKey%3D";

      let that = this;
      that.can_pay = false;
      let data = {
        shortName: that.getCompany,
        body: that.title,
        id: that.id,
        amount: that.money,
        oid: that.getUid,
        platform: that.getPlatform
      };
      that.$vux.loading.show();
      that.$http
        .post(`/Zn/Payment/Orders`, data)
        .then(message => {
          // console.log("message",message)
          that.$vux.loading.hide();
          if (that.getPlatform == "alipay") {
            const div = document.createElement("div");
            div.innerHTML = message;
            document.body.appendChild(div);
            document.forms.alipaysubmit.submit();
          } else {
            WeixinJSBridge.invoke("getBrandWCPayRequest", message, function(
              res
            ) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {
                alert("支付成功"); //todo:return.html
                //jumpTo("../alipay/return.html?is_success=T&subject=" + encodeURI($("#pay_item").text()) + "&out_trade_no=" + trade_id);
              } else {
                that.can_pay = true;
                that.$vux.alert.show({
                  title: "支付失败",
                  content: JSON.stringify(res.err_msg)
                });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          that.can_pay = true;
          that.$vux.loading.hide();
          that.$vux.alert.show({
            title: "支付失败",
            content: JSON.stringify(err)
          });
        });
    },
    // 点击每一项
    getdetails(val, index) {
      // console.log("index", val, index);
      // this.router.push({
      //   push: "/payment",
      //   query: val
      // });
      this.$router.push("/payment");
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .vux-label {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 22px;
  color: rgba(153, 153, 153, 1);
}
/deep/ .weui-cell__ft {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 22px;
  color: rgba(153, 153, 153, 1);
}
.money {
  margin-top: 46px;
  .name {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 22px;
    color: rgba(51, 51, 51, 1);
    padding-left: 15px;
    float: left;
  }
  .num {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 22px;
    color: rgba(254, 106, 56, 1);
    padding-right: 15px;
    float: right;
  }
}

/deep/ .weui-btn.weui-btn_primary {
  margin-top: 60px;
}
.pay {
  height: 100%;
  .father {
    .paid {
      float: left;
      padding: 70px 0 0 80px;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 22px;
    }
    .unpaid {
      float: right;
      padding: 70px 80px 0 0;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 22px;
    }
    #paid {
      color: rgba(0, 123, 217, 1);
    }
  }
  /deep/ .vux-swiper {
    height: 100% !important ;
  }
  /deep/ .weui-cell__ft {
    // padding-top: 10px;
    padding-bottom: 23px;
  }
  /deep/ .vux-label-desc {
  }
  /deep/ .weui-cell {
    padding-top: 0px;
  }
}
</style>
