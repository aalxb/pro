<template>
  <div>
    <!-- tab栏 -->
    <tab :line-width="3" active-color="#40A0FF" v-model="tab_index" custom-bar-width="60px">
      <tab-item
        :selected="tabs[tab_index] === item"
        v-for="(item, index) in tabs"
        @click="tab_index = index"
        :key="index"
      >{{item}}</tab-item>
    </tab>
    <!-- 用户地址 -->
    <div class="tab-address" v-if="tablist != 'IC卡充值'">
      <div class="scroll" :style="{width:width}">
        <template v-if="addresses.length">
          <div
            class="address"
            v-for="(address,index) in addresses"
            :key="index"
            :ref="'address_' + index"
            @click="onSelectAddress(address)"
            :class="[(select_address && select_address.address == address.address) ? 'active' : '']">
						{{address.address}}
					</div>
        </template>
        <template v-else>
          <div class="address">暂未绑定地址</div>
        </template>
      </div>
    </div>
    <!-- 具体的页面 -->
    <swiper
      v-model="tab_index"
      :show-dots="false"
      class="swiper"
      :aspect-ratio="rate"
      @on-index-change="onTypeChange"
    >
      <swiper-item v-for="(tab, index) in tabs" :key="index" style="overflow-y: scroll;">
        <template v-if="tab == '抄表'">
          <group title=" " v-if="records.length">
            <div class="cell_record" v-for="(record,index) in records" :key="index">
              <ul>
                <li>
                  <span class="recordShow">表示数:</span>
                  <span class="recordColor">{{record.gid}}</span>
                  <span class="recordTime">{{record.createTime}}</span>
                  <!-- <span v-if="record == '咨询'">修改</span>
                  <span v-else="record == '投诉'"> </span>-->
                  <template v-if="record.yes">
                    <span class="modification" @click="onAutid()">修改</span>
                  </template>
                  <template v-else></template>
                </li>
              </ul>
            </div>
            <search v-show="false" ref="hidden"></search>
          </group>
          <empty v-else></empty>
        </template>
        <template v-if="tab == '安检'">
          <group title=" " v-if="records.length">
            <cell
              v-for="(record,index) in records"
              :key="index"
              class="cell_record"
              :title="(onSetAppointmentData(record)).title"
              :inline-desc="(onSetAppointmentData(record)).isSafety === '1' ? '安全' : '隐患'"
            >
              <span class="action">{{setAppointmentAction(record)}}</span>
            </cell>
          </group>
          <empty v-else></empty>
        </template>
        <template v-if="tab == '保险'">
          <group title=" " v-if="records.length">
						<cell
							v-for="(val,index) in records"
							:key="index"
							:inline-desc="val.address"
							:title=" '保单号:' + val.policy"
							:value="'投保日期: ' + val.createTime"
							@click.native="onGetinfo(val,index)"
						></cell>
          </group>
          <empty v-else></empty>
        </template>
        <template v-if="tab == 'IC卡充值'">
          <div v-if="records.hasOwnProperty('current')">
            <div class="security-result" :class="[records['current'].length ? 'dander':'']">
              <div class="security-title">
                <template v-if="records['current'].length">
                  <icon type="warn"></icon>隐患
                </template>
                <template v-else>
                  <icon type="success"></icon>安全
                </template>
              </div>
              <p
                class="result-items"
              >{{records['current'].length ? setSecurityTitle(records['current']) : '暂无安全隐患'}}</p>
            </div>
            <group title=" " v-if="records.hasOwnProperty('info')">
              <cell
                v-for="record in records.info"
                :key="record.ajrq"
                :title="setSecurityTitle(record.yhx)"
                :value="record.ajrq"
              ></cell>
            </group>
          </div>
          <empty v-else></empty>
        </template>
      </swiper-item>
    </swiper>
    <div v-transfer-dom>
      <popup v-model="show_popup" height="100%">
        <popup-header
          left-text="关闭"
          title="答复内容"
          :show-bottom-border="false"
          @on-click-left="show_popup = false"
        ></popup-header>
        <group gutter="0" label-width="80px">
          <cell title="咨询内容" value="123"></cell>
          <cell title="答复内容" value="123"></cell>
        </group>
      </popup>
    </div>
  </div>
</template>

<script>
import Empty from "./common/empty";
import Search from "./common/search";
import {
  Tab,
  TabItem,
  Cell,
  Group,
  Swiper,
  SwiperItem,
  Icon,
  Badge,
  Popup,
  PopupHeader,
  TransferDom,
  Masker} from "vux";
import { mapActions, mapGetters } from "vuex";
import { formatTimestamp, getObjectId } from "../assets/common";
import { log } from "util";
import { Child } from "./child";

export default {
  name: "Record",
  directives: {
    TransferDom
  },
  components: {
    Empty,
    Search,
    Tab,
    TabItem,
    Cell,
    Group,
    Swiper,
    SwiperItem,
    Icon,
    Badge,
    Popup,
    PopupHeader,
    TransferDom,
    Masker,
    Child
  },
  data() {
    return {
      tab_index: 0,
      tablist: "开户",
      tabs: ["抄表", "安检", "保险", "IC卡充值"],
      rate: (window.innerHeight - 120) / window.innerWidth,
      addresses: [],
      width: "100%",
      select_address: null,
      records: [
        {
          policy: "12365478",
          address: "保险方案1",
          ask: "士大夫士大夫是",
          createTime: "2019-08-26",
          gid: "1252",
          pic: "",
          type: "咨询",
          userId: 26,
          yes: true,
          home: "岭南雅苑456弄15号722室",
          audit: true,
          isSafety: "1"
        },
        {
          policy: "12365478",
          address: "保险方案2",
          ask: "士大夫士大夫是",
          createTime: "2019-07-26",
          gid: "15662",
          pic: "",
          type: "投诉",
          userId: 26,
          yes: false,
          home: "岭南雅苑456弄15号742室",
          audit: false,
          isSafety: "0"
        },
        {
          policy: "12323132135478",
          address: "保险方案3",
          ask: "士大夫士大夫是",
          createTime: "2019-07-26",
          gid: "15662",
          pic: "",
          type: "投诉",
          userId: 26,
          yes: false,
          home: "岭南雅苑456弄15号742室",
          audit: false,
          isSafety: "0"
        }
      ],
      show_popup: false,
      select_record: null,
    };
  },
  computed: {
    ...mapGetters(["getUid", "getUser"])
  },
  mounted: function() {
    if (this.$route.query.hasOwnProperty("type")) {
      this.tab_index = this.tabs.indexOf(this.$route.query.type);
    }
    this.onGetAddress();
    //this.setWidth();//调试代码
    // this.select_address = this.addresses[0];//调试代码
  },
  methods: {
    ...mapActions(["getClient"]),
    onGetAddress() {
      let that = this;
      that.getClient(data => {
        if (data !== "err") {
          that.addresses = data.accounts;
          that.setWidth();
          if (that.addresses.length > 0) {
            that.onSelectAddress(that.addresses[0]);
          }
        }
      });
    },
    // 跳转
		onGetinfo( val , index ){

			this.$router.push('/child')
		},

    setWidth() {
      if (this.addresses.length) {
        this.$nextTick(() => {
          let width = 0;
          for (let a in this.$refs) {
            if (this.$refs.hasOwnProperty(a)) {
              width += this.$refs[a][0].clientWidth;
            }
            width += 20;
          }
          this.width = width + "px";
        });
      }
    },
    onSelectAddress(address) {
      if (
        !this.select_address ||
        this.select_address.address !== address.address
      ) {
        this.select_address = address;

        switch (this.tabs[this.tab_index]) {
          case "抄表":
            this.onGetReports();
            break;
          case "安检":
            this.onGetAppointments();
            break;
          // case "咨询":
          // 	this.onGetConsults();
          // 	// this.onGetIndoors();
          // 	break;
          case "保险":
            this.onGetWorkSheets();
            break;
          case "IC卡充值":
            this.onGetSafetyReports();
            break;
          // case "咨询记录":
          // 	this.onGetConsults();
          // 	break;
        }
      }
    },
    can_change(readout) {
      let can = false;
      let today = new Date();
      let month =
        today.getDate() < 26 ? today.getMonth() + 1 : today.getMonth() + 2;
      let readout_time = new Date(readout.timestamp);
      let readout_month =
        readout_time.getDate() < 26
          ? readout_time.getMonth() + 1
          : readout_time.getMonth() == 11
          ? 1
          : readout_time.getMonth() + 2;
      if (
        month == readout_month &&
        today.getFullYear() ==
          readout_time.getFullYear() + (readout_time.getMonth() == 11 ? 1 : 0)
      ) {
        if (
          !readout.hasOwnProperty("updates") ||
          (readout.updates &&
            readout.updates[readout.updates.length - 1].check.status !=
              "pending")
        ) {
          can = true;
        }
      }
      return can;
    },
    onGetReports() {
      let that = this;
      that.$http
        .get(
          "/report/" +
            that.getUid +
            "/?" +
            that.qs.stringify({
              filter: JSON.stringify({
                address_detail: that.select_address.address
              }),
              trade: true,
              sort: JSON.stringify({ _id: -1 })
            })
        )
        .then(data => {
          if (data && data.reports.length) {
            that.records = data.reports;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSetAppointmentData(record) {
      // console.log('record :', record);
      let data = {
        title: record.type,
        time: "无具体预约时间"
      };
      if (["点火", "换管", "预约拆、改、修"].indexOf(record.type) == -1) {
        data.title = "安装" + record.type;
      }
      if (record.hasOwnProperty("datetime") && record.hasOwnProperty("date")) {
        data.time =
          record.date + "  " + (record.time == "AM" ? "上午" : "下午");
      }
      return data;
    },
    setAppointmentAction(record) {
      // console.log('this.records', this.records[0].createTime)
      let result = this.records[0].createTime;
      let today = new Date();
      let datetime =
        today.getFullYear() +
        "/" +
        (today.getMonth() + 1) +
        "/" +
        today.getDate();
      // if( record.hasOwnProperty("date") && new Date(record.date.split("-").join("/")).getTime() > (new Date(datetime).getTime()) ){
      // 	result = "修改/撤销";
      // } else if ( record.log[record.log.length - 1].status != "Evaluate" ){
      // 	result = "评价";
      // }
      return result;
    },
    onGetAppointments() {
      let that = this;
      that.$http
        .get("/" + that.getUid + "/order/show", {
          headers: { "Content-Type": "application/json; charset=utf-8" }
        })
        .then(data => {
          that.records = data.orders;
        });
    },
    onGetWorkSheets() {},
    getCurrentItems(param) {
      //获取当前安检隐患项
      return this.$http.post(
        "/TransferSystem/query/ajxmInfo",
        this.qs.stringify(param)
      );
    },
    getHistories(param) {
      //获取安检历史记录
      return this.$http.post(
        "/TransferSystem/query/ajrqInfo",
        this.qs.stringify(param)
      );
    },
    setSecurityTitle(yhx) {
      let result = "";
      if (yhx && yhx.length) {
        for (let i = 0; i < yhx.length; i++) {
          result += "、" + yhx[i].trim();
        }
        result = result.substr(1);
      } else {
        result = "无隐患安全";
      }
      return result;
    },
    onGetSafetyReports() {
      let that = this;
      // let data = {yhbh:that.select_address.user_number};
      that.$http
        .all([that.getCurrentItems(data), that.getHistories(data)])
        .then(
          that.$http.spread((current, history) => {
            that.records = {
              current: [],
              info: []
            };
            if (current && current.hasOwnProperty("yhx")) {
              that.records["current"] = current.yhx;
            }
            if (history && history.hasOwnProperty("ajInfo")) {
              that.records["info"] = history.ajInfo;
            }
          })
        );
    },

    onTypeChange(index) {
      this.tablist = this.tabs[index];
      switch (index) {
        case 0:
          this.onGetReports();
          break;
        case 1:
          this.onGetAppointments();
          break;
        case 2:
          this.onGetWorkSheets();
          break;
        case 3:
          this.onGetSafetyReports();
          break;
      }
    }
  }
  // created(){

  // }
};
</script>

<style lang="less" scoped>
.tab-address {
  height: 60px;
  background-color: white;
  margin-top: 10px;
  padding: 10px 10px;
  overflow-x: scroll;
  .scroll {
    height: 100%;
    .address {
      display: inline-block;
      height: 100%;
      line-height: 40px;
      padding: 0 10px;
      background-color: #e8e8e8;
      border-radius: 20px;
      color: #8e8e8e;
      margin-right: 15px;
      &.active {
        background-color: #0aaaf4;
        color: #fff;
      }
    }
  }
}

.swiper {
  margin-top: 6px;
  background-color: #fff;

  .weui-grid {
    padding: 10px 5px;

    &:after {
      border: unset;
    }
  }

  .cell_record {
    .text {
      vertical-align: middle;
    }
    .readout {
      vertical-align: middle;
      color: #ff8d13;
      font-size: 20px;
    }
    .action {
      // color: #40A0FF;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 33px;
      color: rgba(153, 153, 153, 1);
      margin-right: 15px;
    }
    .recordColor {
      font-size: 20px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 35px;
      color: rgba(254, 106, 56, 1);
      opacity: 1;
      padding-left: 5px;
    }
    .recordTime {
      float: right;
      padding: 5px 18px 0 0;
    }
    .modification {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 35px;
      color: rgba(0, 123, 217, 1);
      opacity: 1;
      padding-left: 30px;
    }
    .recordShow {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 400;
      // line-height:35px;
      // height: 35px;
      color: rgba(102, 102, 102, 1);
      opacity: 1;
      padding-left: 15px;
    }
  }

  .security-result {
    box-shadow: 0 4px 27px 0 rgba(3, 40, 63, 0.1);
    border-radius: 10px;
    text-align: center;
    height: 113px;
    margin: 0 15px 17px 15px;
    color: #00a417;
    &.danger {
      color: #ff381e;
    }

    .security-title {
      margin: 12.5px 0;
      font-size: 20px;
      font-weight: bold;
      display: inline-block;
    }
  }

  /deep/ .weui-cell {
    padding-top: 14.5px;
    padding-bottom: 14.5px;
    color: #333;
  }

  /deep/ .vux-label {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 35px;
    color: rgba(153, 153, 153, 1);
  }

  /deep/ .vux-label-desc {
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 35px;
    color: rgba(51, 51, 51, 1);
  }

  /depp/ .weui-cell__ft {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 33px;
    color: rgba(153, 153, 153, 1);
  }
}

.v-transfer-dom {
  /deep/ .weui-cell {
    padding-top: 14.5px;
    padding-bottom: 14.5px;
    color: #333;
  }
}
.action {
  color: rgba(0, 123, 217, 1);
}

/deep/ .vux-label {
  width: 65%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.onOpen {
  margin-top: 70px;
  position: relative;
  .addressforms {
    position: absolute;
    top: -55px;
    left: 14px;
    font-size: 17px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 35px;
    color: rgba(51, 51, 51, 1);
    opacity: 1;
  }
  .recordTime {
    // position: absolute;
    // top: 15px;
    padding-left: 14px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 33px;
    color: rgba(153, 153, 153, 1);
    opacity: 1;
  }
  .check {
    position: absolute;
    right: 15px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 35px;
    color: rgba(102, 102, 102, 1);
    opacity: 1;
    .checkPadding {
      padding-left: 4px;
    }
  }
}
</style>
