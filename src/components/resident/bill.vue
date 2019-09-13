<template>
  <div class="no-padding-wrap">
    <template>
      <div class="page">
        <CellBox class="bold-address" v-text="list.address" v-if="list"></CellBox>
          <group title=" ">
            <flexbox>
              <flexbox-item>
                <div class="current-data">
                  用户编号：
                  <span class="current-info" v-text="current.hucode"></span>
                </div>
              </flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item>
                <div class="current-data">
                  结算日期: 
                  <span class="current-info" v-text="current.info"></span>
                </div>
              </flexbox-item>
            </flexbox>
            <flexbox>
              <flexbox-item>
                <div class="current-data">
                  当前用量: 
                  <span class="dosage" v-text="current.dosage">
                  </span>
                </div>
              </flexbox-item>
            </flexbox>
            <div v-if="data.length">
              <v-chart :data="data">
                <v-scale x :tick-count="3" />
                <v-tooltip :show-item-marker="false" show-x-value />
                <v-point :style="{stroke: '#fff',lineWidth: 1}" shape="smooth" />
                <v-line />
              </v-chart>
            </div>
          </group>
        <group class="bill-table" title=" ">
          <x-table :cell-bordered="false">
            <thead>
              <tr>
                <th>抄表日期</th>
                <th>指数</th>
                <th>消费量</th>
                <th>单价</th>
                <th>金额</th>
                <th>缴费日期</th>
                <th>缴费情况</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="bills.length">
                <tr v-for="(bill,index) in bills" :key="index">
                  <td>{{bill.cbrq}}</td>
                  <td>{{bill.cbzs}}</td>
                  <td>{{bill.xfl}}</td>
                  <td>{{bill.dj}}</td>
                  <td>{{bill.je}}</td>
                  <td>{{bill.jfrq.trim().length ? bill.jfrq : '-'}}</td>
                  <td
                    v-if="!(parseFloat(bill.je) > 0) || (bill.jfrq && bill.jfrq.trim().length == 8)"
                  >已缴</td>
                  <template v-else>
                    <td v-if="isJudge">未缴</td>
                    <td v-else>
                      <x-button type="primary" mini class="pay" @click.native="onPay(bill,index)">缴费</x-button>
                    </td>
                  </template>
                </tr>
              </template>
              <tr v-else>
                <td colspan="7">暂无账单信息</td>
              </tr>
            </tbody>
          </x-table>
        </group>
      </div>
    </template>
    <fix_footer></fix_footer>
  </div>
</template>

<script>
import Footer from "../common/footer";
import {
  Group,
  CellBox,
  Flexbox,
  FlexboxItem,
  XTable,
  XButton,
  VChart,
  VTooltip,
  VLine,
  VScale,
  VPoint
} from "vux";
import { mapGetters } from "vuex";
import { getObjectId } from "../../assets/common";
export default {
  name: "Bill",
  components: {
    fix_footer: Footer,
    Group,
    CellBox,
    Flexbox,
    FlexboxItem,
    XTable,
    XButton,
    VChart,
    VTooltip,
    VLine,
    VScale,
    VPoint
  },
  data() {
    return {
      current: {
        hucode: "1515648",
        info: '2013-15-65',
        dosage:'第一档 , 剩余156立方米'
      },
      isJudge: false,
      // 数字
      bills: [
        {
          cbrq: "20170306",
          cbzs: "115",
          xfl: "54",
          dj: "3.58",
          je: "15",
          jfrq: "160605"
        },
        {
          cbrq: "20170306",
          cbzs: "115",
          xfl: "54",
          dj: "3.58",
          je: "0.01",
          jfrq: "251"
        },
        {
          cbrq: "20170306",
          cbzs: "115",
          xfl: "54",
          dj: "3.58",
          je: "588",
          jfrq: "251"
        },
        {
          cbrq: "20170306",
          cbzs: "115",
          xfl: "54",
          dj: "3.58",
          je: "588",
          jfrq: "251"
        }
      ],
      data: [
        { date: "20170306", value: 45 },
        { date: "20170606", value: 65 },
        { date: "20170906", value: 54 },
        { date: "20171206", value: 59 }
      ],
      list: null
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getUid", "getPlatform", "getUserId"])
  },
  mounted: function() {
    this.list = this.$route.query;
    if (this.getUserInfo) {
      if (this.getUserInfo.slbh && this.getUserInfo.slbh.length > 0) {
        this.current.hucode = this.getUserInfo.slbh;
        this.onGetData();
      } else {
        this.$vux.alert.show({
          title: "错误",
          content: "暂无该用户的账单信息！",
          onHide: () => {
            this.$router.go(-1);
          }
        });
      }
    } else if (this.$route.query.hasOwnProperty("search")) {
      //跳过绑定进入
      //this.$vux.loading.hide();
      this.page = "search";
    } else {
      // this.$router.go(-1);
    }
  },
  methods: {
    getList(){
      let params = {
        'id':null,
        'usetId':$this.store.getUserId
      }
      this.$http.post("/Zn/ProfessionalWork/Trades/SelectList",params).then(data=>{
          console.log("查询账单",data)
      }).catch(err=>{
        console.log('查询账单失败 :', err);
      })
    },
    onPay(bill, index) {
			let that = this;
			let list = that.list
      let obj = { bill , list};
      this.$router.push({
        path: "/pay",
        query: obj
      });

    }
  }
};
</script>

<style lang="less" scoped>
.no-padding-wrap {
  .page {
    padding-bottom: 58px;

    .current-data {
      padding: 5px 15px;
      font-size: 15px;
      color: #333;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:400;
      line-height:21px;
      color:rgba(153,153,153,1);

      .current {
        color: #ff3939;
      }
    }

    .bill-table {
      /deep/ .weui-cells {
        overflow-x: auto;
      }
      .vux-table td,
      .vux-table th {
        padding: 8px;
        white-space: nowrap;
      }
      /deep/ .weui-btn_primary {
        background-color: #0aaaf4;
      }
    }
  }
}
.vux-table.vux-table-no-cell-bordered {
  font-size: 11px;
  font-family: Arial;
  font-weight: 400;
  line-height: 19px;
  color: rgba(51, 51, 51, 1);
}
.dosage{
  font-size:16px;
  font-family:PingFang SC;
  font-weight:bold;
  line-height:21px;
  color:rgba(255,83,38,1);
}
.current-info{
  font-size:16px;
  font-family:PingFang SC;
  font-weight:400;
  line-height:18px;
  color:rgba(51,51,51,1);
}
</style>