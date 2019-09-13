<template>
	<div :class="[page == 'search' ? 'wrap':'no-padding-warp']">
		<template v-if="page == 'new-owner'">
			<div class="page" ref="new-owner">
				<CellBox class="bold-address" v-text="todo.address"></CellBox>
				<group title=" ">
					<CellBox class="bold-title" v-text="'产权人信息'"></CellBox>
					<Photo :photo_data="[photo_data['owner_id_front'],photo_data['owner_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
					<x-input v-model="todo.owner" :disabled="true"
							 title="产权人" placeholder="请输入产权人姓名" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.owner_id" :disabled="true"
							 title="身份证号" placeholder="请输入产权人身份证号" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.owner_phone"
							 title="手机号" placeholder="请输入产权人手机号" placeholder-align="right" text-align="right"></x-input>
				</group>
				<group title=" ">
					<CellBox class="check-box-cell">
						<span>办理人</span>
						<div class="check-box">
							<check-icon class="check-icon" :value.sync="self">产权人本人</check-icon>
							<check-icon class="check-icon" :value.sync="agent">代理人</check-icon>
						</div>
					</CellBox>
				</group>
				<group title=" " v-if="agent">
					<CellBox class="bold-title" v-text="'代理人信息'"></CellBox>
					<Photo :photo_data="[photo_data['agent_id_front'],photo_data['agent_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
					<x-input v-model="todo.agent"
							 title="代理人" placeholder="请输入代理人姓名" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.agent_id"
							 title="身份证号" placeholder="请输入代理人身份证号" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.agent_phone"
							 title="手机号" placeholder="请输入代理人手机号" placeholder-align="right" text-align="right"></x-input>
				</group>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
		<template v-else-if="page == 'ownership'">
			<div class="page" ref="ownership">
				<group title=" ">
					<CellBox class="bold-title" v-text="'房屋产权信息'"></CellBox>
					<PopupPicker :value="ownership_type" :data="ownership_types"
								 title="产权证件" placeholder="点击选择证件类型" popup-title="产权证件"
								 @on-change="onOwnershipTypeSelected"></PopupPicker>
					<x-input class="ownership_number" placeholder="请输入编号" :show-clear="false" v-model="todo.ownership_number">
						<div class="slot-fix" slot="label">
							<span v-text="slot_fix[slot_fix_index].number_tip"></span>
							<span class="prefix" v-text="slot_fix[slot_fix_index].prefix"></span>
						</div>
						<div class="slot-fix" slot="right" v-text="slot_fix[slot_fix_index].suffix"></div>
					</x-input>
					<Photo :photo_data="[photo_data['ownership_1'],photo_data['ownership_2']]" :img="slot_fix[slot_fix_index].img"
						   size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
				</group>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
		<template v-else-if="page == 'other'">
			<div class="page" ref="other">
				<group title=" ">
					<CellBox class="bold-title" v-text="'请选择开通项目'"></CellBox>
					<checker v-model="install_item"
							 class="install-items" default-item-class="default-install-item" selected-item-class="selected-install-item">
						<checker-item :value="item" v-for="(item, index) in install_items" :key="index">{{item.value}}</checker-item>
					</checker>
				</group>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
		<template v-else-if="page == 'notice'">
			<div class="page" ref="notice">
				<group title="">
					<CellBox class="bold-title" v-text="'请确认您的申请信息'"></CellBox>
					<cell title="产权人：" :value="todo.owner"></cell>
					<cell title="安装地址：" :value="todo.address"></cell>
					<cell title="手机号码：" :value="todo.owner_phone"></cell>
					<cell title="身份证号：" :value="todo.owner_id"></cell>
					<cell title="手机号码：" :value="todo.owner_phone"></cell>
					<cell title="开通项目：" :value="install_item.value"></cell>
				</group>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Search from '../common/search'
	import Footer from '../common/footer'
	import Photo from '../common/photo'
	import Tip from '../common/tip'
	import {Group, CellBox, XInput, CheckIcon, Flexbox, FlexboxItem, XButton, PopupPicker, Checker, CheckerItem, Cell, Icon} from 'vux'
	import {mapActions, mapGetters} from "vuex";
	export default {
		name: "additionalInstall",
		components: {
			search: Search,
			fix_footer: Footer,
			Photo: Photo,
			Tip: Tip,
			Group,
			CellBox,
			XInput,
			CheckIcon,
			Flexbox,
			FlexboxItem,
			XButton,
			PopupPicker,
			Checker,
			CheckerItem,
			Cell,
			Icon
		},
		data() {
			return {
				page: 'new-owner',
				self: true,
				agent: false,
				todo: {
					action: 'additional_install',
					appointment:'appointment',
					progress: 'pending',
					address: '',
					contract: 'contract',
					user_number: '',
					accepted_number: '',
					address_code: '',
					owner: '',
					owner_id: '',
					owner_phone: '',
					agent: '',
					agent_id: '',
					agent_phone: '',
					ownership_type: '',
					ownership_number: '',
					owner_id_front: '',
					owner_id_back: '',
					agent_id_front: '',
					agent_id_back: '',
					ownership_1: '',
					ownership_2: '',
					dm:'',
				},
				actions: {
					'new-owner': [
						{
							name: 'other',
							text: '下一步',
							page: 'new-owner'
						},
					],
					'ownership': [
						{
							name: 'new-owner',
							text: '上一步',
							page: 'ownership'
						},
						{
							name: 'other',
							text: '下一步',
							page: 'ownership'
						},
					],
					'other': [
						{
							name: 'new-owner',
							text: '上一步',
							page: 'other'
						},
						{
							name: 'notice',
							text: '提交',
							page: 'notice'
						},
					],
					'notice': [
						{
							name: 'other',
							text: '修改',
							page: 'notice'
						},
						{
							name: 'submit',
							text: '确定',
							page: 'notice'
						},
					],
				},
				ownership_type: ['不动产权证'],
				ownership_types: [['不动产权证', '房屋产权证', '购房合同', '公租房合同']],
				slot_fix_index: 0,
				slot_fix : [
					{
						img : "ownership2",
						number_tip : "产权证号",
						prefix: "不动产权第",
						suffix: "号"
					},
					{
						img : "ownership1",
						number_tip : "产权证号",
						prefix: "杭房权证第",
						suffix: "号"
					},
					{
						img : "contract1",
						number_tip : "合同编号",
						prefix: "预",
						suffix: ""
					},
					{
						img : "contract2",
						number_tip : "合同编号",
						prefix: "",
						suffix: ""
					}
				],
				photo_data : {
					"owner_id_front" :{
						name: 'owner_id_front',
						src: '',
						loading: false
					},
					"owner_id_back" :{
						name: 'owner_id_back',
						src: '',
						loading: false
					},
					"agent_id_front" :{
						name: 'agent_id_front',
						src: '',
						loading: false
					},
					"agent_id_back" :{
						name: 'agent_id_back',
						src: '',
						loading: false
					},
					"ownership_1" :{
						name: 'ownership_1',
						src: '',
						loading: false
					},
					"ownership_2" :{
						name: 'ownership_2',
						src: '',
						loading: false
					}
				},
				install_item:[],
				install_items: []
			}
		},
		computed: {
			...mapGetters([
				'getRevoke',
				'getUserInfo',
				'getUser',
				'getAdditionalInstalled'
			])
		},
		mounted: function () {
			if( this.getUserInfo ){//判断userInfo是否存在，存在则为选地址后进入
				this.todo['address'] = this.getUserInfo.address;
				this.todo['accepted_number'] = this.getUserInfo.yhbh;
				this.todo['user_number'] = this.getUserInfo.slbh;
				this.todo['owner'] = (this.getUserInfo.yhxm && this.getUserInfo.yhxm.length > 0) ? this.getUserInfo["yhxm"]:this.getUserInfo["xm"];
				this.todo['owner_id'] = this.getUserInfo.sfzh;
				this.todo['owner_phone'] = this.getUser.phone;
				this.todo['dm'] = this.getUser.dm;
				this.onGetOtherInfo();
			} else {//否则为刷新，需重新进入
				this.$router.go(-1);
			}
		},
		methods: {
			...mapActions([
				'postTodo',
				'upload',
				'finish'
			]),
			fireCondition(param) {//获取点火状态
				return this.$http.post('/TransferSystem/query/queryUserExtraInfo', this.qs.stringify(param))
			},
			installCondition(param) {//获取安装状态
				return this.$http.post('/TransferSystem/query/azzt', this.qs.stringify(param))
			},
			onGetOtherInfo () {//判断可开项
				let that = this;
				that.$http.all([
					that.fireCondition({addrCode: this.getUserInfo.addrCode}),
					that.installCondition({hucode: this.getUserInfo.yhbh})
				]).then(that.$http.spread( (_, __) => {
					let installed = that.getAdditionalInstalled;
					if(!installed.hasOwnProperty("gas") && (that.getUserInfo["yys"] != 0 && that.getUserInfo["yys"] != 2 && that.getUserInfo["yys"] != 3 && that.getUserInfo["yys"] != 4)) {
						that.install_items.push({key: 'gas', value: '灶具'});
					}
					if(!installed.hasOwnProperty("water_heater") && !__.RSQ) {//RSQ: true:已开通;false:未开通
						that.install_items.push({key: 'water_heater', value: '热水器'});
					}
					if(!installed.hasOwnProperty("hot") && _.drdh){//drdh  true:未开通;false: 已开通
						that.install_items.push({key: 'hot', value: '地热'});
					}
					if(!installed.hasOwnProperty("dryer")) {
						that.install_items.push({key: 'dryer', value: '干衣机'});
					}
					if(!installed.hasOwnProperty("other")) {
						that.install_items.push({key: 'other', value: '其他'});
					}
					let address = that.$route.query.a;
					if( address.indexOf("-1") > -1 ){
						that.todo['address'] = address.split("-1").join("");
						that.todo['addrCode'] = that.getUserInfo.addrCode.substr(0,20) + "0";
						that.todo['action'] = "new_install";
						that.actions['new-owner'][0].name = 'ownership';
						that.actions['other'][0].name = 'ownership';
					}
					if(that.install_items.length == 0) {
						that.$vux.alert.show({
							title: "提示",
							content: "您没有可以办理的业务，或业务申请正在处理中，请不要重复提交！",
							onHide: () => {
								that.$route.go(-1);
							}
						});
					}
				}));
			},
			onAddPhoto(name, data, photo) {//接收photo返回file_path或FormData
				switch (name) {
					case "owner_id_front":
						this.todo[name] = data.file_path;
						this.todo['owner'] = data.name;
						this.todo['owner_id'] = data.id_number;
						break;
					case "agent_id_front":
						this.todo[name] = data.file_path;
						this.todo['agent'] = data.name;
						this.todo['agent_id'] = data.id_number;
						break;
					default :
						this.todo[name] = data;
						break;
				}
				this.photo_data[name] = photo;
			},
			onDeletePhoto(name) {
				this.todo[name] = '';
			},
			onPage(action) {
				let that = this;
				if( action.name == 'submit' ){
					that.onSubmit();
				} else {
					that.page = action.name;
				}

			},
			onOwnershipTypeSelected(value) {//产权类型变动，改变相关显示文本和示例图
				this.ownership_type = value;
				this.slot_fix_index = this.ownership_types[0].indexOf(value[0]);
				switch (value[0]) {
					case "不动产权证" :
					case "房屋产权证" :
						this.todo['ownership_type'] = '房产证';
						break;
					case "购房合同" :
						this.todo['ownership_type'] = '房屋销售合同号';
						break;
					case "公租房合同" :
						this.todo['ownership_type'] = '公房房卡';
						break;
				}
			},
			onSubmit() {
				let that = this;
				that.upload({
					todo:that.todo,
					vue: that,
					success: function (todo) {
						let type = that.install_item.key;
						todo['install_item'] = type;
						if(type === "water_heater" && (that.getUserInfo.ktzt == null || that.getUserInfo.ktzt.trim().length == 0 || parseInt(that.getUserInfo.ktzt) < 20120701)) {
							todo.ktrq = that.getUserInfo.ktzt;
							todo.need_not_pay = true;
						} else {
							todo.pay_info = {};
							if (type === "gas") {
								todo.pay_info.type = "户内管开通费";
							} else if (type === "water_heater") {
								todo.ktrq = that.getUserInfo.ktzt;
								todo.pay_info.type = "热水器开通费";
							} else if (type === "hot") {
								todo.pay_info.type = "地热开通费";
							} else if (type === "dryer") {
								delete todo.pay_info;
							} else {
								todo.pay_info.type = "其他开通费";
							}
						}
						if( that.$route.query.a.indexOf("-1") > -1 ){
							todo["address_code"] = that.getUserInfo.addrCode;
							todo["contract"] = "contract";
							todo.install_item += ",";
						}
						that.postTodo({
							url: '/todo',
							vue: that,
							todo: todo,
						});
					}
				});
			},
		},
		watch: {
			'agent': function () {
				this.self = !this.agent;
			},
			'self': function () {
				this.agent = !this.self;
			},
		}
	}
</script>

<style lang="less" scoped>
	.no-padding-warp {
		height: 100%;
		background-color: #F3F5F7;

		.page {
			padding-bottom: 58px;

			.action-groups {
				padding: 25px 25px 45px 25px;
				background-color: white;

				/deep/ .weui-btn_primary {
					background-color: #40A0FF;
				}
			}

			.ownership_number {
				padding: 8.5px 15px;
				/deep/ input {
					background-color: #E5E5E5;
					height: 38px;
					border-radius: 3px;

					&::-webkit-input-placeholder {
						color: #999;
						font-size: 13px;
						text-align: center;
					}

					&:-moz-placeholder {
						color: #999;
						font-size: 13px;
						text-align: center;
					}

					&::-moz-placeholder {
						color: #999;
						font-size: 13px;
						text-align: center;
					}

					&:-ms-input-placeholder {
						color: #999;
						font-size: 13px;
						text-align: center;
					}
				}

				/deep/ .weui-cell__hd {
					width: 60%;
				}

				.slot-fix {
					color: #333;
					height: 26px;
					.prefix {
						float: right;
						margin-right: 8px;
					}
				}
			}
		}

		/deep/ .weui-cell {
			padding-top: 14.5px;
			padding-bottom: 14.5px;
			color: #333;
			background-color: #fff;
		}

		.check-box-cell {
			position: relative;

			.check-box {
				position: absolute;
				right: 15px;

				/deep/ .weui-icon-success:before {
					color: #40A0FF;
				}
			}
		}

		.install-items {
			background-color: white;
			padding: 0 10px;
			text-align: center;

			.default-install-item {
				width: 45%;
				height: 45px;
				border: 2px solid rgba(42,158,245,1);
				border-radius: 45px;
				color: #999;
				line-height: 41px;
				font-size: 15px;
				margin: 0 2.5% 24px 2.5%;
			}

			.selected-install-item {
				background:rgba(64,160,255,1);
				color: white;
			}
		}

		.need-transform {
			background-color: white;
			padding: 0 15px;
			font-size: 14px;
			font-weight: 400;
			color: #FF7C4E;
			line-height: 22px;
		}
	}
</style>
