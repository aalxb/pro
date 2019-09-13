<template>
  <div>
    <group>
      <cell title="订单编号: " :value="lists[0].num"></cell>
    </group>
    <x-button type="primary" action-type="button" @click.native="onPay">立即缴费</x-button>
  </div>
</template>

<script>
import { Group, Cell, XButton, Loading } from "vux";
export default {
  components: { Group, Cell, XButton, Loading },
  name: "payment",
  data() {
    return {
      lists: [
        {
          num: "15613216",
          date: "2019/05/12 12:48",
          modey: "156.00",
          nowinfo: "未支付"
        }
      ]
    };
  },
  methods: {
    onPay() {
      let weixin =
        "https://payapp.weixin.qq.com/life/index?showwxpaytitle=1&exportkey=Abd3WFedlcgtIC2jQ%2BNIHmo%3D&clientversion=26031e30&devicetype=android-23&pass_ticket=knyt6QdUNshxPNZISnflWYCzs5AUMiNGZDw%2BmrBigm9xQaWBiGsyDxwPl1bteumv#/agency/3/city/172";
      let alipay =
        "alipays://platformapi/startapp?appId=20000193&url=%2Fwww%2FeBill.htm%3Freferer%3DGOPAY%26instId%3DHZGAS%26subBizType%3DGAS%26billKey%3D";

      let that = this;
      that.can_pay = false;
      let data = {
        body: "ceshi",
        id: "0" + ((Math.random() * Math.pow(36, 4)) << 0),
        amount: "1",
        oid: "opeVGwS8NogGR-rke2JFfiwxRB7s",
        platform: "WX"
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
    }
  }
};
</script>

<style  lang="less" scoped>
/deep/ .weui-btn_primary {
  margin-top: 300px;
  background: linear-gradient(
    90deg,
    rgba(4, 146, 236, 1) 0%,
    rgba(0, 112, 223, 1) 100%
  );
}
</style>