<template>
    <div class="wrap">
		<div class="page">
			<CellBox class="bold-address" v-text="order.address"></CellBox>
			<group title=" ">
				<PopupPicker :value="type" :data="types" title="业务类型" popup-title="业务类型"
							 placeholder="点击选择业务类型" @on-change="onTypeSelected">
				</PopupPicker>
				<template v-if="type[0] == '预约安装'">
					<div class="vux-1px-t bd-top"></div>
					<checklist v-model="install_item" :options="install_items"
							   @on-change="onInstallTypeChange" required class="install-item-checklist check-list">
					</checklist>
				</template>
				<cell title="预约时间" :value="order.date" is-link arrow-direction="down" @click.native="show_calendar = true"></cell>
				<div class="vux-1px-t bd-top"></div>
				<PopupPicker :value="role" :data="roles" title="预约人身份" popup-title="预约人身份"
							 placeholder="点击选择预约人身份" @on-change="onRoleSelected">
				</PopupPicker>
				<x-input v-model="order.otel" placeholder-align="right" text-align="right"
						 title="联系电话" placeholder="请输入您的联系电话">
				</x-input>
				<div class="vux-1px-t bd-top"></div>
				<PopupPicker :value="pipe" :data="pipes" title="金属管" popup-title="携带金属管"
							 placeholder="是否需要携带金属管" @on-change="onPipeSelected">
				</PopupPicker>
				<x-input v-model="order.comment" placeholder-align="right" text-align="right"
						 title="备注" placeholder="请输入备注(选填)" :max="100">
				</x-input>
			</group>
			<flexbox class="action-groups">
				<flexbox-item>
					<x-button type="primary" @click.native="onSubmit">提交</x-button>
				</flexbox-item>
			</flexbox>
		</div>
		<popup v-model="show_calendar" height="100%">
			<popup-header
				left-text="取消"
				title="请选择预约的日期"
				:show-bottom-border="false"
				@on-click-left="show_calendar = false">
			</popup-header>
			<Calendar type="install" :limit_hour="16" :team="order.team" @onChooseDay="onChooseDay"></Calendar>
		</popup>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer'
	import Calendar from '../common/calendar'
	import {Group, CellBox, Cell, PopupPicker, Checklist, Popup, PopupHeader, XInput, Flexbox, FlexboxItem, XButton} from 'vux'
	import {mapGetters} from "vuex";
	export default {
		name: "appointmentInstall",
		components:{
			fix_footer:Footer,
			Calendar,
			Group,
			CellBox,
			Cell,
			PopupPicker,
			Checklist,
			Popup,
			PopupHeader,
			XInput,
			Flexbox,
			FlexboxItem,
			XButton
		},
		data() {
			return {
				order:{
					huname:'',
					hucode:'',
					yicode:'',
					address: '',
					otel:'',
					team:'',
					area:'all',
					role:'产权人',
					comment:'',
					time:'',
					date:'请选择预约时间',
					type:'',
					extra:''
				},
				type:['预约安装'],
				types:[['预约安装','预约拆、改、修']],
				install_item:[],
				install_items: [
					{
						key:'户内管',
						value:'户内管 (燃气表及表后管安装)'
					},
					{
						key:'热水器',
						value:'热水器 (热水器管道安装)'
					},
					{
						key:'地热',
						value:'地热 (地热及暖气片的锅炉气管安装)'
					},
					{
						key:'其他',
						value:'其他 (干衣机及其他燃气设施管道的安装)'
					},
				],
				role:['产权人'],
				roles:[['产权人','亲属','朋友','租客','装修人员','物业开发商','其他']],
				pipe:['无需携带'],
				pipes:[['需携带','无需携带']],
				show_calendar: false
			}
		},
		computed:{
			...mapGetters([
				'getUserInfo',
				'getUser',
				'getUid'
			]),
		},
		mounted: function () {
			if( this.getUserInfo ){//判断userInfo是否存在，存在则为选地址后进入
				this.order['address'] = this.getUserInfo.address;
				this.order['hucode'] = this.getUserInfo.yhbh;
				this.order['yicode'] = this.getUserInfo.slbh;
				this.order['huname'] = (this.getUserInfo.yhxm && this.getUserInfo.yhxm.length > 0) ? this.getUserInfo["yhxm"]:this.getUserInfo["xm"];
				this.order['otel'] = this.getUser.phone;
				this.order['team'] = this.getUserInfo.dm;
				if( this.getUserInfo.hasOwnProperty("addrCode") ){
					let addrCodeHead = this.getUserInfo.addrCode.substr(0, 2);
					this.order['area'] = (addrCodeHead == "75" || addrCodeHead == "76") ? "滨江" : "营业";
				}
				this.onGetOtherInfo();
			} else if ( this.$route.query.hasOwnProperty('order') ) {

			} else {//否则为刷新，需重新进入
				this.$router.go(-1);
			}
		},
		methods: {
			onGetOtherInfo (){
				let that = this;
				let detail = this.getUserInfo;
				if( detail.yhbh ){
					that.$http.all([
						that.fixCondition({lsh: detail.slbh}),
						that.installCondition({hucode: detail.yhbh})
					]).then(that.$http.spread( (cqgInfo, azInfo) => {
						if (!cqgInfo || (cqgInfo && cqgInfo.cqgInfo && cqgInfo.cqgInfo != "已申请" && cqgInfo.cqgInfo != "已完成")) {
							that.types = [['预约安装']];
						}
						if( !azInfo || azInfo !== "err" ){//先判断热水器，再判断户内管，否则先删户内管，热水器索引会变化，无法删除
							if( !((detail.rsqzt && detail.rsqzt.trim().length > 0) || (detail.hrtk && detail.hrtk.trim().length > 0)) || azInfo.RSQ){
								that.install_items.splice(1,1);
							}
							if( !(detail.ktzt && detail.ktzt.trim().length > 0) || (azInfo.HNG && (detail.yhbh.substr(0,1) !== "E" && detail.yhbh.trim().length !== 6)) ){
								that.install_items.splice(0,1);
							}
						}
					}));
				} else {//没有受理编号时不允许拆改修
					that.types = [['预约安装']];
				}
			},
			fixCondition(param) {//获取拆改修状态
				return this.$http.post('/TransferSystem/query/cqgInfo', this.qs.stringify(param))
			},
			installCondition(param) {//获取安装状态
				return this.$http.post('/TransferSystem/query/azzt', this.qs.stringify(param))
			},
			onTypeSelected (value) {
				this.type = value;
			},
			onInstallTypeChange (){
				this.order.extra = '';
				for ( let k of this.install_item ){
					this.order.extra += "," + k;
				}
			},
			onRoleSelected (value){
				this.role = value;
				this.order.role = value[0];
			},
			onPipeSelected (value){
				this.pipe = value;
			},
			onChooseDay (data){
				this.order.date = data.date;
				this.order.time = data.time;
				this.show_calendar = false;
			},
			onSubmit (){
				if( this.type[0] == "预约安装" && this.install_item.length == 0 ){
					this.$vux.toast.show({
						width: '15em',
						type: 'text',
						text: '请选择预约项目',
						position:'middle'
					});
				} else {
					let data = Object.assign({}, this.order);
					if ( this.type[0] == "预约安装" ){
						data['type'] = this.type[0];
					} else {
						data['type'] = "预约拆、改、修";
					}
					data.extra = data.extra.substr(1);
					if( this.pipe[0] == "需携带" ){
						data.extra += "需携带";
					}
					if( data.date == "无时间要求" ){
						delete data.date;
						delete data.time;
					}
					let that = this;
					that.$http.post("/" + that.getUid + "/order/new", JSON.stringify(data),{headers:{'Content-Type': 'application/json; charset=utf-8'}})
						.then( () => {
							that.$router.replace({
								path:'success',
								query:{message:JSON.stringify({order:data})}
							});
						})
						.catch(err => {
							console.log(err);
							that.$vux.alert.show({
								title:"失败",
								content:"预约失败，请重新尝试！"
							});
						});
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.wrap{
		height: 100%;
		background-color: #F3F5F7;
		padding: unset;
		/deep/ .weui-cell {
			padding-top: 14.5px;
			padding-bottom: 14.5px;
			color: #333;
			background-color: #fff;
		}
		.page {
			padding-bottom: 58px;
			.install-item-checklist {
				/deep/ .weui-check_label {
					&:before {
						border: unset;
					}
				}
			}
		}
	}
</style>
