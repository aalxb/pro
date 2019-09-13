<template>
	<div class="wrap">
		<!--<group title=" ">-->
			<!--<CellBox class="bold-title">业务详情</CellBox>-->
			<!--<template v-for="(value,key) in list" v-if="todo.information.hasOwnProperty(key) && todo.information[key] != null && todo.information[key].toString().length > 0">-->
				<!--<cell :title="value" :value="parse_list.hasOwnProperty('parse_' + key) ? parse_list['parse_' + key](todo.information[key]):todo.information[key]"></cell>-->
			<!--</template>-->
		<!--</group>-->
		<!--<group title=" ">-->
			<!--<CellBox class="bold-title">受理信息</CellBox>-->
			<!--<template v-if="have_conclusion(todo.information)">-->
				<!--<template v-for="(value,key) in conclusions"-->
						  <!--v-if="todo.information.hasOwnProperty(key) && todo.information[key] != null && todo.information[key].toString().length > 0">-->
					<!--<cell :title="value" :value="todo.information[key]"></cell>-->
				<!--</template>-->
			<!--</template>-->
			<!--<template v-else>-->
				<!--<cell title="暂无受理信息"></cell>-->
			<!--</template>-->
		<!--</group>-->
		<!--<fix_footer></fix_footer>-->

		<group title=" " v-if="count !=null ? true:false">
			<CellBox class="bold-title">业务详情</CellBox>
			<template v-for="(value,key) in count_list" v-if="onChangeValue(key)">
				<cell :title="value" :value='count[key]'></cell>
			</template>
		</group>
		<group title=" ">
			<CellBox class="bold-title">受理信息</CellBox>
			<!--<template>-->
				<!--<template>-->
					<!--<cell :title="99" :value="33"></cell>-->
				<!--</template>-->
			<!--</template>-->
			<template>
				<cell title="暂无受理信息"></cell>
			</template>
		</group>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from './common/footer'
	import {Group, Cell, CellBox } from 'vux'
	import {formatTimestamp} from '../assets/common'
	import {mapGetters} from "vuex";
	export default {
		name: "businessDetail",
		components:{
			fix_footer:Footer,
			Group,
			Cell,
			CellBox
		},
		data() {
			return {
				todo: null,
				count:null,
				titleDeails:{
					'Toaudit':"待审核",
					'via':"通过"
				},
				count_list:{
					'busiName':"业务类型",
					'createTime':"申请时间",
					'area':"所属区域",
					'address':"房间",
					'gname':"姓名",
					'idNumber':'身份证号码',
					'phone':"电话",
				},
				list:{
					'action':"业务类型",
					'timestamp':"申请时间",
					'area':"所属区域",
					'accepted_number':"受理编号",
					'install_item':"开通项目",
					'transform':"管道燃气设施改造费",
					'type':"业务种类",
					'detail':"改动描述",
					'volume':"当前读数",
					'volume_photo':"当前读数照片",
					'meter':"燃气表",
					'fire':"点火状态",
					'no_receipt':"发票状态",
					'receipt_number':"发票号码",
					'receipt':"开户发票照片",
					'hall':"领款营业厅",
					'self_prepare':"连接管",
					'stove':"灶具类型",
					'company_name':"店名/公司名",
					'complaint_name':"姓名",
					'name':"姓名",
					'owner':"姓名",
					'complaint_phone':"电话",
					'phone':"电话",
					'owner_phone':"电话",
					'address':"地址",
					'public_company':"产权单位",
					'old_public_company':"原用气单位",
					'new_public_company':"新用气单位",
					'geothermal':"地热",
					'complaint_content':"咨询与投诉内容",
				},
				conclusions:{
					'conclusion':'受理结果',
					'review':'审核失败原因',
					'failCause':'失败原因',
					'reply_time':'答复时间',
					'reply':'答复内容',
				},
				parse_list : {
					"parse_timestamp" : (v) => {
						return formatTimestamp(v, 'long');
					},
					"parse_reply_time" : (v) => {
						return formatTimestamp(v, 'long');
					},
					"parse_progress" : (v) => {
						return this.PROGRESS_LIST[v].tip;
					},
					"parse_action" : (v) => {
						return this.getActionList[v].name;
					},
					"parse_no_receipt" : function(v) {
						return v === "true" ? "未开发票或发票丢失" : "发票正常";
					},
					"parse_self_prepare" : (v) => {
						return v === "true" ? "用户自备连接管" : "现场购买连接管";
					},
					"parse_stove" : (v) => {
						return v === "plat" ? "嵌入式灶具" : "台式灶具";
					},
					"parse_geothermal" : (v) => {
						return v === "opened" ? "已开通" : "未开通";
					},
					"parse_install_item" : function(v) {
						let values = [];
						let items = {
							"gas" : "灶具",
							"water_heater": "热水器",
							"hot": "地热",
							"dryer": "干衣机",
							"other": "其他"
						};
						v.split(",").forEach(function(s){
							if(items.hasOwnProperty(s))
								values.push(items[s]);
						});
						return values.join("，");
					},
				},
			}
		},computed: {
			...mapGetters([
				'PROGRESS_LIST',
				'getActionList',
			])
		},
		mounted: function () {
			// console.log("count",this.$route.query.count)
			this.count=this.$route.query.count
			console.log("count",this.count)
			// this.todo = JSON.parse(decodeURIComponent(this.$route.query.todo));
			// if( todo.information.hasOwnProperty("complaint_item") && todo.information.complaint_item == "安全隐患上报" ){
			// 	this.list['complaint_content'] = "上报内容";
			// }
		},
		methods: {
			have_conclusion(information){
				let result = false;
				for ( let k in this.conclusions ) {
					if( this.conclusions.hasOwnProperty(k) && information.hasOwnProperty(k) ){
						result = true;
					}
				}
				return result;
			},
			onChangeValue(key){
				if(this.count[key]){
					return true
				}else{
					return false
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		/deep/ .weui-cell {
			padding-top: 14.5px;
			padding-bottom: 14.5px;
			color: #333;
			background-color: #fff;
		}
	}
</style>
