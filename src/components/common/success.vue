<template>
    <div class="wrap">
		<div class="tip_panel">
			<icon type="success"></icon>
			<div v-text="title[progress]" class="tip_title"></div>
			<div class="content">
				<template v-if="progress == 'pending'">
					工作人员将在<span v-text="pending_time"></span>对您的申请信息进行审核，您可以 <span class="span-route" @click="onRoute('index')">返回首页</span>
					<span v-if="!readout_change">，并选择<span class="span-route" @click="onRoute('progress')">“受理进度查询”</span>浏览最新状态。</span>
					<template v-else>。</template>
				</template>
				<template v-if="progress == 'accepted'">
					请保持电话畅通。工作人员将尽快与您联系。您可以 <span class="span-route" @click="onRoute('worksheet')">查询工单状态</span> 或者 <span class="span-route" @click="onRoute('index')">返回首页</span>。
				</template>
				<template v-if="progress == 'unpaid'">
					您需要缴纳<span v-text="todo.information.action == 'water_heater' ? '热水器开通费':'拆改修预付费'"></span>，正在为您跳转到支付页面...
				</template>
				<template v-if="progress == 'readout'">
					你可以在账单查询界面查询并支付用气账单。<span class="span-route" @click="onRoute('index')">返回首页</span>
				</template>
			</div>
		</div>
		<div class="all_info" v-if="todo">
			<div class="info_title">申请信息</div>
			<template v-for="(info, key) in infos">
				<cell v-if="todo.information && todo.information.hasOwnProperty(key) && todo.information[key].length"
					  :title="infos[key] + '：'" :value="parse_value(key)"></cell>
			</template>
		</div>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer'
	import {Icon, Cell} from 'vux'
	import {mapGetters} from "vuex";
	export default {
		name: "Success",
		components: {
			fix_footer: Footer,
			Icon,
			Cell
		},
		data() {
			return {
				todo: null,
				order: null,
				readout: null,
				progress: 'pending',
				readout_change: false,
				title: {
					'pending': '申请提交成功',
					'accepted': '申请已成功受理',
					'unpaid': '申请提交成功',
					'readout': '自助抄表成功',
				},
				infos: {
					'company_name': '店名/公司名',
					'public_company': '产权单位',
					'owner': '申请人',
					'address': '安装地址',
					'owner_id': '身份证号',
					'owner_phone': '手机号码',
					'new_property': '新产权单位',
					'old_public_company': '原用气单位',
					'new_public_company': '新用气单位',
					'agent': '代理人',
					'agent_id': '身份证号',
					'agent_phone': '手机号码',
					'ownership_type': '产权证件',
					'ownership_number': '产权号码',
					'install_item': '开通项目',
				},
				parse_name:{
					'gas': '灶具',
					'water_heater': '热水器',
					'hot': '地热',
					'dryer': '干衣机',
					'other': '其他',
				}
			}
		},
		computed:{
			...mapGetters([
				'getPlatform',
				'getUid',
				'getUserId',
			]),
			pending_time : function () {
				let time = new Date();
				let hours = time.getHours();
				return ((hours >= 8 && hours < 16) ? "2小时内" : "次日上午10:00之前")
			},
		},
		mounted: function () {
			if( this.$route.query.hasOwnProperty('message') ){
				let message = JSON.parse(this.$route.query.message);
				if( message.hasOwnProperty('todo') ){
					this.todo = message["todo"];
					this.progress = this.todo.information.progress;
					let action = this.todo.information.action;
					if( action == "public_transfer" || action == "public_precancel" || action == "complaint" || action == "consult"  ){
						this.progress = "accepted";
					}
					if( this.todo.information.hasOwnProperty("complaint_item") && this.todo.information.complaint_item == "安全隐患上报" ){
						this.infos['address'] = '上报地址';
					}
					if( action == "non_resident_order"){
						this.readout_change = true;
					}
					if( this.progress == 'unpaid' ){

					}
				}
				if ( message.hasOwnProperty('order') ){
					this.progress = "accepted";
				}
				if ( message.hasOwnProperty('readout') ){
					this.progress = "readout";
				}
				if ( message.hasOwnProperty('readout_change') ){
					this.progress = "pending";
				}
			}
		},
		methods: {
			parse_value (key) {
				if( key == 'install_item' ){
					let value = '';
					let items = this.todo.information.install_item.split(',');
					for ( let k of items ){
						if( this.parse_name[k] ){
							value += this.parse_name[k] + " ";
						}
					}
					return value;
				} else {
					return this.todo.information[key];
				}
			},
			onRoute (target){//todo
				switch (target) {
					case "index":
						this.$router.push({
							path:'index',
							query:{uid:this.getUid, user_id: this.getUserId, platform: this.getPlatform}
						});
						break;
					case "progress":
						this.$router.push({
							path:'progress',
						});
						break;
					case "worksheet":
						break;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.tip_panel {
		height: 225px;
		box-shadow:0 4px 20px 0 rgba(6,80,127,0.14);
		border-radius:10px;
		margin: 7px;
		text-align: center;
		padding: 32px 15px 20px 15px;
		.weui-icon-success {
			font-size: 43px;
			color: #2A9EF5;
		}
		.tip_title {
			font-size:20px;
			font-weight:bold;
			color:#2A9EF5;
		}
		.content {
			color: #666;
			font-size: 16px;
			padding-top: 18px;
			.span-route {
				color: #2A9EF5;
			}
		}
	}
	.all_info {
		padding: 7px;
		.info_title {
			color: #333;
			font-size: 18px;
			font-weight: bold;
		}
		/deep/ .weui-cell {
			padding: 5px 0;
			color: #333;
			&:before {
				content: unset !important;
			}
		}
	}
</style>
