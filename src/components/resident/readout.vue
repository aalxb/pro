<template>
    <div class="wrap">
		<template v-if="page == 'readout'">
			<CellBox class="bold-address" v-text="readout.address_detail"></CellBox>
			<group title=" ">
				<flexbox>
					<flexbox-item><div class="last-data">最近一次抄表日期：<span v-text="last.lastReadDate"></span></div></flexbox-item>
				</flexbox>
				<flexbox>
					<flexbox-item :span="6"><div class="last-data">抄表指数：<span v-text="last.lastReadout"></span></div></flexbox-item>
					<flexbox-item :span="6"><div class="last-data">消费量：<span v-text="last.lastUsed"></span></div></flexbox-item>
				</flexbox>
				<x-input v-model="readout.readout" ref="readout" :is-type="isReadout"
						 placeholder="请输入黑色数字部分读数" placeholder-align="right" text-align="right">
					<div slot="label">
						<span>表上读数</span>
						<!--<x-icon type="ios-help" size="18" class="question"></x-icon>-->
					</div>
				</x-input>
				<cell-box>
					<img class="img-responsive img-border" :src="IMG_URL + '/static/meter_sample.png'">
				</cell-box>
				<Photo :photo_data="[photo_data['photo']]"
					   size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
			</group>
			<flexbox class="action-groups">
				<flexbox-item v-if="$route.query.hasOwnProperty('type')">
					<x-button type="primary" @click.native="page = 'search'">上一步</x-button>
				</flexbox-item>
				<flexbox-item>
					<x-button type="primary" @click.native="onSubmit">提交</x-button>
				</flexbox-item>
			</flexbox>
		</template>
		<template v-if="page =='search'">
			<div class="page">
				<group title="请选择信息查询方式"></group>
				<div class="bind-content">
					<tab :line-width=0 active-color='#40A0FF' default-color="#999">
						<tab-item active-class="tab-active" :selected="bind_type === type"
								  v-for="(type, index) in bind_types" @on-item-click="onTabClick" :key="index">{{type}}</tab-item>
					</tab>
					<div class="search-box">
						<search ref="search" @onSendInfo="onSendInfo" :search_type="bind_type == '用户编号绑定' ? 'code':'address'"></search>
					</div>
					<div class="sample-box">
						<img class="img-responsive" :src="IMG_URL +'/static/user_number_cut.png'" alt="参考样张" v-show="bind_type == '用户编号绑定'">
						<x-button v-if="bind_type == '用户编号绑定'" @click.native="onCodeNext" class="bind-btn-next" type="primary">下一步</x-button>
					</div>
				</div>
			</div>
		</template>
		<template v-if="page == 'owner'">
			<div style="padding: 8px 8px 0 8px;">
				<group title="请核对并补充产权人信息">
					<x-input v-model="owner" ref="owner" title="产权人" placeholder="请输入产权人姓名"></x-input>
				</group>
				<flexbox class="action-groups">
					<flexbox-item>
						<x-button type="primary" @click.native="page = 'search'">上一步</x-button>
					</flexbox-item>
					<flexbox-item>
						<x-button type="primary" @click.native="onVerify">下一步</x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer'
	import Photo from '../common/photo'
	import Search from '../common/search'
	import {Group, Cell, CellBox, XInput, Flexbox, FlexboxItem, XButton, Tab, TabItem,} from 'vux'
	import {mapGetters} from "vuex";
	import {getObjectId} from '../../assets/common'
	export default {
		name: "Readout",
		components:{
			fix_footer: Footer,
			Photo: Photo,
			search: Search,
			Group,
			Cell,
			CellBox,
			XInput,
			Flexbox,
			FlexboxItem,
			XButton,
			Tab,
			TabItem,
		},
		data() {
			return {
				readout: {
					uid:'',
					address_code:'',
					address_detail:"",
					readout:'',
					owner_phone:'',
					owner:'',
					user_number:'',
					diff:'',
					area:'',
					photo: null
				},
				photo_data : {
					"photo" :{
						name: 'photo',
						src: '',
						loading: false
					},
				},
				last:{
					lastReadDate:'',
					lastReadout:'',
					lastUsed:'',
				},
				page: 'readout',
				base: null,
				isJudge: false,
				preMonthReadout: null,
				preYearUsed: null,
				bind_type: '用户编号绑定',
				bind_types:['用户编号绑定','用气地址绑定'],
				owner: '',
				isReadout : function (value) {
					return {
						valid:(new RegExp(/^\d+$/)).test(value),
						msg: '表上读数格式错误',
					}
				}
			}
		},
		computed:{
			...mapGetters([
				'getUserInfo',
				'getUid',
				'getUserId',
				'getPlatform',
			]),
		},
		mounted: function () {
			this.$vux.loading.show({
				text:'正在获取抄表信息...',
				width:'9.6em'
			});
			if( this.getUserInfo ){//判断userInfo是否存在，存在则为选地址后进入
				this.readout['address_detail'] = this.getUserInfo.address;
				this.readout['address_code'] = this.getUserInfo.yhbh;
				if( !this.$route.query.hasOwnProperty("p") ){
					this.readout['owner_phone'] = this.getUser.phone;
				} else {
					this.readout.owner_phone = this.$route.query["p"];
				}
				this.readout['owner'] = (this.getUserInfo.yhxm && this.getUserInfo.yhxm.length > 0) ? this.getUserInfo["yhxm"]:this.getUserInfo["xm"];
				this.readout['user_number'] = this.getUserInfo.slbh;
				this.readout.uid = this.getUid;
				if( this.$route.hash.substr(0, 11) === "#doFinished" ){
					let params = this.$route.hash.substr(12).split(",");
					this.onFinished(params[0], params[1]);
				} else {
					this.onGetOtherInfo(this.getUserInfo);
				}
			} else if ( this.$route.query.hasOwnProperty('type') ){//快捷抄表入口
				this.$vux.loading.hide();
				this.page = 'search';
			} else if ( this.$route.query.hasOwnProperty('readout') ){//todo

			} else {//否则为刷新，需重新进入
				this.onGoBack();
			}
		},
		methods: {
			onGoBack() {
				if( this.$route.query.hasOwnProperty('type') ){
					this.page = 'search';
				} else {
					this.$router.go(-1);
				}
			},
			onGetReports (param){//获取本月度抄表次数
				let uid = this.getUid;
				if( this.$route.query.hasOwnProperty('uid') ){
					uid = this.$route.query.uid;
				}
				return this.$http.get("/report/" + uid + this.qs.stringify(param));
			},
			onGetBill (param){//获取账单
				return this.$http.post('/TransferSystem/query/bill',this.qs.stringify(param));
			},
			onDecideReadingStateInfo (param){//获取是否可抄表
				return this.$http.post('/TransferSystem/query/decideReadingStateInfo',this.qs.stringify(param));
			},
			onQueryUserGroup() {//获取是否银行托收
				let that = this;
				that.$http.post('/TransferSystem/query/judgeGroupOfUsers',that.qs.stringify({hucode: that.getUserInfo.slbh}))
					.then( result => {
						that.isJudge = result;
					})
					.catch(err => {
						console.log(err);
					});
			},
			onGetOtherInfo (detail){
				let that = this;
				let query = this.$route.query;
				if (detail) {
					let filter = {};
					let now = new Date();
					let month = now.getMonth() + 1;
					let thisMonth = now.getFullYear() + "" + (month > 9 ? month : "0" + month);
					let preYear = (now.getFullYear() - 1) + "" + (month > 9 ? month : "0" + month);
					if( query.hasOwnProperty("type") && query["type"] == "direct" ){
						filter = {
							count:true,
							filter:JSON.stringify({uid:query["uid"],month:thisMonth})
						}
					}
					that.$http.all([
						that.onGetReports(filter),
						that.onGetBill({uCode: that.getUserInfo.slbh, billType: 1}),
						that.onDecideReadingStateInfo({huCode: this.getUserInfo.slbh})
					]).then(that.$http.spread( (_, bill, state) => {
						that.$vux.loading.hide();
						if( query.hasOwnProperty("type") && query["type"] == "direct" && _.count >= 10 ){
							that.$vux.alert.show({
								title: '提示',
								content: '您本月抄表次数过多，请下月再试！',
								onHide: that.onGoBack
							});
							return null;
						}
						if (that.getUserInfo.slbh != null && (that.getUserInfo.hgdd && that.getUserInfo.hgdd.trim().length != 0)) {
							if (bill && bill.length > 0) {
								let count = 0;
								for (let i = 0; i < bill.length; i++) {
									let r = bill[i];
									let old_month = parseInt(r["cbrq"].substr(0, 6));
									if (i == 0) {
										that.last.lastReadout = parseInt(r["cbzs"]);
										that.last.lastReadDate = r["cbrq"].substr(0, 4) + "-" + r["cbrq"].substr(4, 2) + "-" + r["cbrq"].substr(6, 2);
										that.last.lastUsed = parseInt(r["xfl"]);
									}
									if (old_month == parseInt(thisMonth)) {
										count++;
									}
									if (count >= 2) {
										that.$vux.alert.show({
											title: '提示',
											content: '您本月抄表次数过多，请下月再试！',
											onHide: that.onGoBack
										});
									}
									if (that.preMonthReadout == null && old_month < parseInt(thisMonth)) {
										that.preMonthReadout = parseInt(r["cbzs"]);
									}
									if (old_month == parseInt(preYear)) {
										that.preYearUsed += parseInt(r["xfl"]);
									}
								}
							}
							let result = state.allow;
							that.base = state.base;
							if (result === "false" || result == null) {
								that.$vux.alert.show({
									title: '提示',
									content: '当前非抄表窗口期或本月度已抄表！',
									onHide: that.onGoBack
								});
								return null;
							} else if (result === "true") {
								that.onQueryUserGroup();
							} else {
								let year = parseInt(result.substr(0, 4));
								let month = parseInt(result.substr(4, 2));
								let day = parseInt(result.substr(6, 2));
								let max = 31;
								if (month == 4 || month == 6 || month == 9 || month == 11) {
									max = 30;
								} else if (month == 2) {
									if ((year % 400) == 0 || ((year % 4) == 0 && (year % 100) != 0))
										max = 29;
									else
										max = 28;
								}
								day += 5;
								if (day > max) {
									day -= max;
									month++;
									if (month > 12) {
										month = 1;
										year++;
									}
								}
								that.$vux.alert.show({
									title: '提示',
									content: "你的地址区域已开始入户抄表，若您无法进行入户抄表请在" + year + "年" + month + "月" + day + "日后再进行自助抄表！",
									onHide: that.onGoBack
								});
								return null;
							}
						} else {
							that.$vux.alert.show({
								title: '错误',
								content: '该地址尚未点火！',
								onHide: that.onGoBack
							});
							return null;
						}
					}));
				} else {
					this.$vux.loading.hide();
					this.$vux.alert.show({
						title:'错误',
						content: '该受理编号不存在。',
						onHide: that.onGoBack
					});
				}
			},
			onAddPhoto(name, data, photo) {//接收photo返回file_path或FormData
				this.readout[name] = data;
				this.photo_data[name] = photo;
			},
			onDeletePhoto(name) {
				this.readout[name] = null;//必须重置为null
			},
			onFinished (id, system_no){
				let that = this;
				that.$vux.loading.hide();
				that.$vux.confirm.show({
					title:'抄表完成',
					content:'自助抄表成功，是否立即查看账单？',
					onCancel : () => {
						if (that.isJudge) {
							that.$vux.alert.show({
								title:'提示',
								content:'自助抄表成功，您账户的燃气费用为银行托收，请注意在您的银行卡中预留足够的余额。',
								onHide: () => {
									that.$router.replace({
										path:'success',
										query:{readout:1}
									});
								}
							});
						} else {
							that.$router.replace({
								path:'success',
								query:{readout:1}
							});
						}
					},
					onConfirm : () =>{
						that.$vux.loading.show({
							text:'正在生成账单...'
						});
						that.onQueryBill(id, system_no);
					}
				});
			},
			onQueryBill (id, system_no){
				let that = this;
				that.$http.post('/TransferSystem/query/readingRecord',that.qs.stringify({lsh:system_no}))
					.then( item => {
						if (item && item.length == 1 && item[0].jsrq) {
							let amount = item[0].jsrq;
							let data = {};
							data.report_id = id;
							data.total_fee = amount.trim();
							data.type = "用户自助抄表";
							that.$http.post('/report/bill/' + that.getUid + '/new', JSON.stringify(data),{headers:{'Content-Type': 'application/json; charset=utf-8'}})
								.then( data => {
									let query = that.$route.query;
									that.$router.replace({
										path:'success',
										query:{
											a:encodeURIComponent(query['a']),
											ac:encodeURIComponent(query['ac']),
											p:encodeURIComponent(query['p']),
											r:encodeURIComponent(id),
											ju:that.isJudge ? "1":"0"
										}
									});
								})
								.catch(err => {
									console.log(err);
									that.$vux.alert.show({
										title:'网络错误',
										content:'创建账单失败！',
										onHide: () => {
											that.$router.replace({
												path:'success',
												query:{readout:1}
											});
										}
									});
								});
						} else {
							setTimeout(() => {
								that.onQueryBill(id, system_no);
							}, 500);
						}
					})
					.catch(err => {
						console.log(err);
						that.$vux.alert.show({
							title:'未知错误',
							content:'创建账单失败！',
							onHide: () => {
								that.$router.replace({
									path:'success',
									query:{readout:1}
								});
							}
						});
					});
			},
			onSubmit() {
				let that = this;
				let query = this.$route.query;
				let data = {};
				if (that.readout.readout && that.$refs.readout.valid) {
					if( that.readout.photo == null ){
						that.$vux.alert.show({
							title:'提示',
							content:'请先上传抄表照片。'
						});
					} else {
						if( query.hasOwnProperty("readout") ){//修改指数
							that.$vux.confirm.show({
								title:'提示',
								content:'是否确认修改抄表信息？',
								onConfirm : () =>{
									that.$vux.loading.show();
									data.readout = that.readout.readout;
									data.photo = that.readout.photo;
									that.$http.put('/report/' + query.oid, JSON.stringify(data))
										.then( message => {
											that.$vux.loading.hide();
											if( message == "success" ){
												that.$vux.alert.show({
													title:'完成',
													content:'修改提交成功！',
													onHide: () => {
														that.$router.replace({
															path:'record',
															query:{type:'readout'}
														});
													}
												});
											} else {
												that.$router.replace({
													path:'success',
													query:{readout_change:true}
												});
											}
										})
										.catch(err => {
											that.$vux.loading.hide();
											that.$vux.alert.show({
												title:'错误',
												content:'提交修改失败，请重新尝试！'
											});
										});
								}
							});
						} else {//抄表
							data = that.readout;
							if( query.hasOwnProperty('type') ){
								data['type'] = query.type;
							}

							if(that.base > 9500 && data.readout < 100){
								that.base = that.base - 10000;
							}

							let used = data.readout - that.base;
							if (data.readout < parseInt(that.base)) {
								that.$vux.alert.show({
									title:'输入错误',
									content:"上次抄表指数为：" + that.base + "m³，本次抄表指数为：" + data.readout + "m³，用量为负数，请重新输入正确指数。"
								});
								return;
							}
							if (that.preYearUsed > 0)
								data.diff = Math.abs(used - that.preYearUsed) / that.preYearUsed;
							else
								data.diff = 0;
							let addrCodeHead = that.getUserInfo.addrCode.substr(0, 2);
							data.area = (addrCodeHead == "75" || addrCodeHead == "76") ? "滨江" : "营业";

							let confirm_str = "上次抄表指数为：" + lastReadout +
								"m³，本次抄表指数为：" + data.readout +
								"m³，用量为：" + (data.readout - parseInt(base)) + "m³。";
							if (that.preYearUsed > 0 && data.diff > 0.5) {
								confirm_str += "本次抄表结果，用量与往年同期相比相差较大，请确认输入是否正确？";
							} else {
								confirm_str += "请确认输入是否正确？";
							}
							that.$vux.confirm.show({
								title: '提示',
								content: confirm_str,
								onConfirm: () => {
									that.onSend(data);
								}
							});
						}
					}
				}
			},
			onSend (data){
				let that = this;
				that.$vux.loading.show();
				that.$http.post('/report/new',JSON.stringify(data),{headers:{'Content-Type': 'application/json; charset=utf-8'}})
					.then( report => {
						that.$vux.loading.hide();
						report = report["report"];
						let id = getObjectId(report);
						let system_no = report.system_no;
						let time = new Date();
						let _month = time.getFullYear().toString().substr(2,2) + (((time.getMonth()) >= 9)?(time.getMonth() + 1):("0" + (time.getMonth() + 1)));
						let user_key = data.user_number + _month;
						let extra = {
							"address":data.address,
							"phone":data["phone"] || that.$route.query.p,
							"name":that.getUserInfo["xm"]
						};
						let gift = {
							uid: that.getUid,
							type:'1807readout',
							user_key:user_key,
							extra:extra
						};
						that.$http.post('/hraddon/gift/new',JSON.stringify(gift),{headers:{'Content-Type': 'application/json; charset=utf-8'}})
							.then( res => {
								location.hash = "#doFinished?" + id + "," + system_no;
								that.$router.push({
									path:'scratch',
									query:{user_key:user_key,address:data.address}
								});
							})
							.catch(err => {
								that.onFinished(id, system_no);
							});
					})
					.catch(err => {
						that.$vux.loading.hide();
						if (err.response.data && (err.response.data.indexOf("reach max limit") > -1)) {
							that.$vux.alert.show({
								title:'提交失败',
								content:'当前地址本月度已完成抄表。',
								onHide: () => {
									that.$router.replace({
										path:'index',
										query:{uid:that.getUid, user_id: that.getUserId, platform: that.getPlatform}
									});
								}
							});
						} else {
							that.$vux.alert.show({
								title:'提交失败',
								content:'提交失败，请重新尝试。'
							});
						}
					});
			},
			onSendInfo (info){
				this.readout['address_detail'] = info.address;
				this.readout['address_code'] = info.accepted_number;
				this.readout['owner_phone'] = info.orig_phone;
				this.readout['owner'] = info.owner;
				this.readout['user_number'] = info.user_number;
				this.readout.uid = this.$route.query.uid;
				this.owner = info.owner.substr(0,1);
				this.page = 'owner';
			},
			onTabClick (index){
				this.bind_type = this.bind_types[index];
			},
			onCodeNext () {
				this.$refs['search'].addrRoomFinish();
			},
			onVerify (){
				if( this.readout.owner == this.owner ){
					this.page = 'readout';
					this.onGetOtherInfo(this.getUserInfo);
				} else {
					this.$vux.alert.show({
						title:'错误',
						content:'产权人姓名输入错误或不完整！'
					});
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	.wrap {
		padding: unset;
		background-color: #fbf9fe;
		.question {
			fill: #FF9A36;
		}
		.last-data {
			padding: 5px 15px;
			font-size: 14px;
			color: #999;
		}
		.img-border {
			border: 1px dashed #BFBFBF;
		}
		.page {
			padding: 8px 8px 0 8px;
			background-color: #fff;
			.bind-content {
				min-height: 350px;
				box-shadow:0 4px 20px 0 rgba(6,80,127,0.14);
				padding-bottom: 35px;
				.search-box {
					padding: 30px 15px 15px 15px;
				}
				.sample-box {
					padding: 10px;
					.bind-btn-next {
						height: 45px;
						background: #40A0FF;
						border-radius:5px;
						margin-top: 30px;
						width: 90%;
					}
				}
				/deep/ .vux-tab .vux-tab-item {
					background-color: #F3F5F7;
					background-image: unset;
					font-size: 18px;
				}
				.tab-active {
					background-color: #fff !important;
					border-top-left-radius: 10px;
					border-top-right-radius: 10px;
					font-weight: bold;
				}
			}
		}
	}
</style>
