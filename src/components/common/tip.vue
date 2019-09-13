<template>
	<div>
		<div class="slot-tip weui-cell" v-show="show" @click="show_dialog = true">
			<icon type="info" style="font-size: 20px;"></icon>
			<span v-text="title"></span>
		</div>
		<x-dialog v-model="show_dialog" :hide-on-blur="title !== '用户须知'">
			<div class="tip-dialog">
				<div class="tip-title">
					<x-icon type="ios-close-empty" size="28" class="title-close" @click="show_dialog = false"></x-icon>
					<span v-text="title"></span>
				</div>
				<div class="tip-body">
					<p v-for="(item, index) in contents[content]" :key="index" v-text="item"></p>
					<template v-if="title == '用户须知'">
						<check-icon :value.sync="agree">我已阅读并同意</check-icon>
					</template>
				</div>
				<template v-if="title == '用户须知'">
					<div class="tip-footer" @click="onClose" :class="agree ? '':'disabled'">关闭</div>
				</template>
				<template v-else>
					<div class="tip-footer" @click="onClose">关闭</div>
				</template>
			</div>
		</x-dialog>
	</div>
</template>

<script>
	import {Icon, XDialog, CheckIcon} from 'vux'
	export default {
		name: "Tip",
		components: {Icon, XDialog, CheckIcon},
		props:{
			title:{
				type: String,
				required: true
			},
			content:{
				type: String,
				required: true
			},
			immediate: {
				type: Boolean,
				required: false,
				default: false
			},
			show: {
				type: Boolean,
				required: false,
				default: true
			}
		},
		data() {
			return {
				show_dialog: false,
				contents: {
					"new_install": [
						'1、	为不影响您后续的装修，请您选择厨房瓷砖铺设完毕后进行燃气管道的安装。',
						'2、	请勿私自改动厨房位置并保持厨房自然通风，特殊户型因涉及安全问题不能安装的工作人员会具体向您解释，请您理解；',
						'3、	在您预约时间的前一天我们会打电话或发短信告知您具体安装事项。',
						'4、	老小区涉及户外安装的用户，如有平保笼，请您自行解决拆装问题，如安装需要邻里配合的，请自行协调。',
						'5、	如您临时有事需要变更预约时间的，请您及时通过本界面进行时间调整，亦可拨打服务热线：967266。',
						'6、	为不影响下一位用户的正常安装点火，如您在约定时间15分钟内未能到现场的，请您重新预约，请您理解。',
						'7、	中午12点后不能预约当天上门服务点火，预约最长时间为15天。',
					],
					"additional_install": [
						"适用于已开通管道燃气灶具，需要申请补开热水器或地热的居民用户。已开通热水器或地热，需要预约安装的用户请拨打967266。"
					],
					"fix": [
						"适用于已开通灶具、热水器、地热的居民用户同址申请灶具或热水器改管，表移位，拆表停用等的业务受理。"
					],
					"cancel": [
						"适用于在营业厅新办理开通灶具，热水器或地热的居民用户，因无法安装等原因需要撤销的业务办理，通过微客服线上办理的业务，如需撤销，请在“受理进度”中操作。"
					],
					"heating": [
						"公司接到用户预约申请后，在两天内安排专业人员上门踏勘。踏勘内容包括：了解用户需求、测量采暖面积、估算各区域所需散热量、明确热水锅炉和暖气片的选型和安装位置、确定管线路由和开孔位置。"
					],
					"public_fix":[
						"适用于工业、公建用户申请燃气设施新增、更换、拆除、停用等的业务受理。"
					],
					"public_company_rename": [
						"产权单位更名：即产权单位发生重组、改制等情况下，可办理产权单位变更手续。"
					],
					"non_resident": [
						"本功能仅限是非居民客户(如：企业、公司、商铺等)办理非居民业务开通。如需办理一般居民业务，请返回首页，进入居民业务办理界面办理相关业务。"
					],
					"contract": [
						"您的申请已审核通过，请签署协议后付款，并预约安装时间。"
					],
				},
				agree: false
			}
		},
		mounted: function () {
			this.show_dialog = this.immediate;
		},
		methods: {
			onClose (){
				if( this.title == "用户须知" ){
					if( this.agree ){
						this.show_dialog = false;
					}
				} else {
					this.show_dialog = false;
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.tip-dialog {
		border-radius:6px;
		.tip-title {
			line-height: 25px;
			position: relative;
			padding: 10px;
			border-bottom: 1px solid #DCDCDC;
			.title-close {
				position: absolute;
				left: 10px;
			}
			span {
				color: #333;
				font-size: 20px;
				font-weight: bold;
			}
		}
		.tip-body {
			max-height: 400px;
			overflow-y: scroll;
			padding: 15px;
			p {
				margin-bottom: 15px;
				font-size: 14px;
			}
		}
		.tip-footer {
			background-color: #40A0FF;
			color: white;
			padding: 10px;
			&.disabled {
				background-color: rgba(64, 160, 255, .4);
			}
		}
	}
</style>
