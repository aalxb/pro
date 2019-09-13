<template>
  <div>
    <template>
      <group>
        <cell :inline-desc="'保单号:'" :title=" '保险方案名' " :value="'已过期'"></cell>
      </group>
      <div class="info">
        <span class="border"></span>
        <span class="basic">基本信息</span> 
      </div>
      <!-- <group  v-if="redults.length" v-for="(redult , index) in redults" :key="idnex">
        <cell :title="  " :value="'NO.156156413156'">
        </cell>
      </group> -->
    </template>
  </div>
</template>
<script>
import { CellFormPreview, Group, Cell } from "vux";

export default {
  components: {
    CellFormPreview,
    Group,
    Cell
  },
  data() {
    return {
      redults: [
        {
          "usernumber": "NO.156436",
          "price": "125" ,
          "number" : "15",
          "insurance":"2000",
          "pay" :  "缴费方式",
          "paydate" : "2019年8月2日至2019年9月11号",
          "checkcode" : 'QD45456W1F56EW4'
        },
      ]
    };
  },

  mounted() {
    getListrudult();
  },
  methods: {
    getListrudult() {
      let that = this;
     
    } 
    
  }
};
</script>

<style lang="less" scoped>

  .info{
    position: relative;
    .border{
    display: block;
    width:3px;
    height:16px;
    background:rgba(0,123,217,1);
    opacity:1;
    border-radius:2px;
    position: absolute;
    top: 3px;
    left: 15px;
    }
    .basic{
      display: block;
      margin: 40px 0 0 20px;
      padding-left: 10px;
      font-size:16px;
      font-family:PingFang SC;
      font-weight:600;
      line-height:22px;
      color:rgba(51,51,51,1);
      opacity:1;
    }
  }

</style>