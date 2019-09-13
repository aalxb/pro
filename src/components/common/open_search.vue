<template>
	<div class="fuzzy-search">
		<div class="input-box">
			<input id="fuzzy_addr" v-model="value" @focus="emitEvent()"
				   :placeholder="search_type == 'code' ? '请输入用户编号':'请输入街道或小区名称'">
			<span class="btn-clear" v-if="value && value.trim().length" @click="onClear">×</span>
		</div>
		<template v-if="search_type !== 'code'">
			<div class="list">
				<group title="搜索结果" v-if="areas.length && list_type == 'area'"><!--区域列表-->
					<CellBox v-for="area in areas" :key="area.AreaName.trim()" :is-link="true"
							 v-text="area.AreaName.trim()" @click.native="addrNextBuild(area.AreaGuid.trim())"></CellBox>
				</group>
				<div class="noAdress" v-if="areas.length && list_type == 'area'">
					<p>“地址错误”或“没有统一开户”</p>
					<x-button plain type="primary" style="border-radius:99px;width:50%;" @click.native="noAdress">
						手动录入  <x-icon type="ios-arrow-thin-right" size="30" style="    vertical-align: middle;"></x-icon>
					</x-button>
				</div>
				<group title="搜索结果" v-if="builds.length && list_type == 'build'"><!--小区列表-->
					<CellBox v-for="build in builds" :key="build.CommunityName" :is-link="true"
							 v-text="build.CommunityName" @click.native="addrNext(build.CommunityGuid)"></CellBox>
				</group>
				<group :title="title" v-if="floors.length && list_type == 'floor'"><!--层列表-->
					<CellBox v-for="(floor,index) in floors" :key="'floor' + index" :is-link="true"
							 v-text="floor.Address" @click.native="addrFloor(floor.Address)"></CellBox>
				</group>
				<group :title="title" v-if="rooms.length && list_type == 'room'"><!--户室列表-->
					<CellBox v-for="room in rooms" :key="room.addrCode" :is-link="true"
							 v-text="room.addr" @click.native="addrRoomFinish(room)"></CellBox>
				</group>
			</div>
		</template>
	</div>
</template>

<script>
	import {Group, CellBox,XButton} from 'vux'
	import {mapGetters, mapMutations} from "vuex";
	import {ownerIdVerify} from '../../assets/common'
	export default {
		name: "Search",
		components: {Group, CellBox,XButton},
		props:{
			search_type: {//搜索类型 new:新开户按地址搜索未开户;code:按编号搜索绑定地址;address:按地址搜索绑定地址
				type: String,
				required: false,
				default: 'address'
			},
			action: {
				type: String,
				required: false,
				default: null
			}
		},
		data() {
			return {
				selectValue: null,
				areaGuid:null,
				communityGuid:null,
				value: '',
				list_type: 'area',
				areas: [],
				builds: [],
				floors: [],
				rooms: [],
				transform: false,//地址配套情况 P:配套;L:不配套;S:配套情况不明;
				title: '',
				second: false,
				need_not_check: ['readout','appointment_install','fire','pipe','bill']

			}
		},
		computed:{
			...mapGetters([
				'getUserInfo',
				'getUid',
			]),
		},
		mounted: function () {

		},
		methods: {
			...mapMutations([
				'setUserInfo',
				'setUserInfoDetail',
				'setAdditionalInstalled'
			]),
			emitEvent() { //向上传递address，可选
				let min = (this.search_type == 'code' ? 5 : 1);
				this.getArea();
			},
			onClear (){//搜索框右侧删除按钮
				this.value = "";
				this.areas = [];
				this.list_type = 'area';
			},
			getArea() { //获取小区
				let that = this;
				var param = {
					"companyKey": 'ZN',
					"customerType":this.$parent.type
				}
				console.log(param);

				that.$http.post('/nc_interface/BasicInformationModule/getArea',param )
					.then(value => {
						if (value.Data != "[]" ) {
							that.areas = value.Data;
							that.list_type = 'area';
						}

					})
					.catch(err => {
						console.log(err);
						that.$vux.alert.show({
							title: '错误',
							content: '搜索错误，请重试！'
						})
					})
			},
			addrNextBuild(area) { //获取小区
				let that = this;
				console.log("小区ID",area)
				this.areaGuid = area
				var param = {
					"areaGuid": area,
					"customerType": this.$parent.type
				}
				console.log("参数",param)
				that.$http.post('/nc_interface/BasicInformationModule/getCommunity', param)
					.then(value => {
						console.log("326",value);

						that.builds = value.Data;
						that.list_type = 'build';
					})
					.catch(err => {
						console.log(err);
						that.$vux.alert.show({
							title: '错误',
							content: '搜索错误，请重试！'
						})
					})
			},
			addrNext(build) {//选择楼幢之后根据搜索类型，下一步显示楼层或已开户地址
				console.log("000",build)
				// let that = this;
				this.communityGuid = build
				let params={
					"companyKey":"ZN",
					"customerType":this.$parent.type,
					"communityGuid":build
				}
				this.$http.post('/nc_interface/BasicInformationModule/getIAByComID', params).then(value=>{
					console.log(value)
					this.floors=value.Data
					this.list_type = "floor"
				}).catch(err=>{
					console.log("err")
					this.$vux.alert.show({
						title: '错误',
						content: '查询地址信息错误，请重试！'
					});
				})
			},
			getAddressDetail(param) {//获取已开户地址
				console.log("已开户的参数",param)
				return this.$http.post('/BasicInformationModule/getIAByComID', this.qs.stringify(param))
			},
			isSecondOpen(param) {//城中村、景中村判断
				return this.$http.post('/TransferSystem/query/czjcInfo', this.qs.stringify(param))
			},
			onShowFloor(addr, code, characteristic, transform, isContinueNumber, czjcInfo, value) { //根据地址编码生成楼层
				let that = this;
				that.floors = [];
				let build = [];
				if (characteristic && characteristic.length > 1) {
					let floorCount = characteristic.charCodeAt(0) - 48;
					let unitCount = characteristic.length - 1;

					that.transform = transform;
					for (let i = 1; i <= floorCount; i++) {
						let iString = "" + i;
						while (iString.length < 2) {
							iString = "0" + iString;
						}
						build[i] = [];
						that.floors[i] = [];

						let continueNumber = 0;

						for (let j = 1; j <= unitCount; j++) {
							let jString = "" + j;
							while (jString.length < 3) {
								jString = "0" + jString;
							}
							build[i][j] = [];
							let roomCount = characteristic.charCodeAt(j) - 48;

							for (let k = 1; k <= roomCount; k++) {
								let kString = "" + k;
								let kCode = "" + k;
								if (isContinueNumber) {
									continueNumber++;
									kString = "" + continueNumber;
								}
								while (kString.length < 2) {
									kString = "0" + kString;
								}
								while (kCode.length < 2) {
									kCode = "0" + kCode;
								}
								build[i][j][k] = {};
								build[i][j][k].addr = addr + j + "单元" + i + kString + "室";
								build[i][j][k].addrCode = code + jString + iString + kCode + "0";
								build[i][j][k].new = true;
								for (let l = 0; l < value.length; l++) {
									let eFloor = parseInt(value[l].addrCode.trim().substr(16, 2));
									let eUnit = parseInt(value[l].addrCode.trim().substr(13, 3));
									let eRoom = parseInt(value[l].addrCode.trim().substr(18, 2));
									if (i == eFloor && j == eUnit && k == eRoom) {
										build[i][j][k].new = false;
										break;
									}
								}
								if (build[i][j][k].new || czjcInfo)
									that.floors[i].push(build[i][j][k]);
							}
						}
					}
					that.list_type = 'floor';
					that.title = addr;
				} else {

				}
			},
			addrFloor (floor, index){//设置地址列表上部标题
				console.log("floor",floor)
				// let params = {
				// 	"companyKey":"ZN",
				// 	"customerType":this.$parent.type,
				// 	"address":floor,
				// }
				console.log("floor",floor)
				this.$emit("onSendInfo",{
					address:{
						'floor':floor,
						'areaGuid':this.areaGuid,
						'communityGuid':this.communityGuid,
						'address_type':200

					},
				});
				// console.log(this);
				// this.$http.post("/nc_interface/BasicInformationModule/getIDByAddress",params).then(value=>{
				// 	console.log("用户信息",value.data)
				// 	console.log(this);
				// 	this.$emit("onSendInfo",{
				// 		address: value.data,
				// 	});
				// }).catch(err=>{

				// })

			},
			addrRoomFinish(room) {
				// console.log("55550001")
				if( this.search_type == 'new' ){//新开户，判断地址是否可开
					this.addrCheckCanInstall(room);
					// console.log("55550000")

				} else if ( this.search_type == 'code' ){//按编号绑定地址
					if( this.value && this.value.trim() && this.value.trim().length > 5 ){

						if(room == 'zm') {
							this.selectValue = 1
						} else {
							this.selectValue = 2
						}
						// console.log("555500002")

						this.addrFinished(null , this.value, null, null);
					}
				} else {//
					console.log("55550003")

					this.addrFinished(room.addr, room.code, room.addrCode, null);
				}
			},
			addrCheckCanInstall (room){  //判断用户系统是否可开户
				let that = this;
				that.$http.post('/TransferSystem/query/canOpenAccount', that.qs.stringify({addr: room.addr}))
					.then(value => {
						if (value === "true") {
							that.addrFinished(room.addr, null, room.addrCode);
						} else {
							that.$vux.confirm.show({
								title: '无法安装',
								content: '您好，该地址暂时无法申请安装。<br/>请至附近的营业网点或拨打燃气服务热线967266进行咨询。',
								onCancel() {},
								onConfirm() {}
							});
						}
					})
					.catch(err => {
						console.log(err);
						that.$vux.alert.show({
							title: '错误',
							content: '获取开户信息错误，请重试！'
						})
					})
			},
			addrFinished (addr, code, addrCode, action, callback){//选择完整地址之后，后续操作
				let that = this;
				console.log("5555000555")
				var param = {
					"companyKey":"ZN",
					"customerID": this.value
				}
				if(this.value == '') {
					that.$vux.alert.show({
						title: '错误',
						content: '请输入你的编号！'
					})
				}else {
					that.$http.post('/nc_interface/ResidentCustomerData/getCopyCusInfo', param)
						.then( (res) => {
							console.log("001111111111111111111100", res);
							if(res.Data.length == 0){
								that.$vux.alert.show({
									title: '错误',
									content: res.ErrMsg
								})
							}else{
								let Data= [
									{
										"customerName": res.Data[0].CustomerName,
										"address": res.Data[0].Address,
										'customerID':this.value
									}
								]
								this.$emit("onSendInfo",{
									address: Data,
								});

							}


						})
						.catch(err => {
							console.log(err);
							that.lock_verify = false;
							that.$vux.alert.show({
								title: '错误',
								content: '用户编号错误，请重试！'
							});
						});
				}

			},
			noAdress () {
				this.$emit("onSendInfo",[]);
			}
		},
		watch : {
			'search_type': 'onClear'
		}
	}
</script>

<style lang="less" scoped>
	.fuzzy-search {
		padding: 0 8px;

		.input-box {
			height: 50px;
			box-shadow: 0 4px 20px 0 rgba(3, 40, 63.5, 0.14);
			border-radius: 25px;
			position: relative;

			#fuzzy_addr {
				display: inline-block;
				width: 100%;
				height: 100%;
				border: none;
				vertical-align: bottom;
				border-radius: 25px;
				font-size: 15px;
				padding: 6px 25px;
				outline: none;
				color: #333;
			}

			input::-webkit-input-placeholder {
				color: #999;
				font-size: 15px;
			}

			input:-moz-placeholder {
				color: #999;
				font-size: 15px;
			}

			input::-moz-placeholder {
				color: #999;
				font-size: 15px;
			}

			input:-ms-input-placeholder {
				color: #999;
				font-size: 15px;
			}

			.btn-clear {
				position: absolute;
				right: 10px;
				top: 15px;
				height: 20px;
				width: 20px;
				text-align: center;
				line-height: 20px;
				border-radius: 10px;
				background-color: #E5E5E5;
				color: #fff;
			}
		}

		.list {
			padding-bottom: 58px;

			/deep/ .weui-cell {
				padding-top: 13px;
				padding-bottom: 13px;
				color: #333;
			}
		}
	}
	.noAdress{
		text-align: center;
		padding-top: 50px;
		color: #999999;
		p{
			padding-bottom: 20px;
		}
		/deep/ .weui-btn_plain-primary{
			color: #007BD9;
			border: 1px solid #007BD9;
		}
	}
	.vux-x-icon {
		fill: #007BD9;
	}
</style>

