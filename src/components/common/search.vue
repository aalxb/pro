<template>
	<div class="fuzzy-search">
		<div class="input-box">
			<input id="fuzzy_addr" v-model="value" @focus="emitEvent()"
				   :placeholder="search_type == 'code' ? '请输入用户编号':'请输入街道或小区名称'">
			<span class="btn-clear" v-if="value && value.trim().length" @click="onClear">×</span>
		</div>
		<template v-if="search_type !== 'code'">
			<div class="list">
				<!--<div class="noAdress" v-if="areas.length === 0">-->
					<!--<p>“地址错误”或“没有统一开户”</p>-->
					<!--<x-button plain type="primary" style="border-radius:99px;width:50%;" @click.native="noAdress">手动录入  <x-icon type="ios-arrow-thin-right" size="30" style="    vertical-align: middle;"></x-icon></x-button>-->
				<!--</div>-->
				<group title="搜索结果" v-if="areas.length && list_type == 'area'"><!--区域列表-->
					<CellBox v-for="area in areas" :key="area.AreaName.trim()" :is-link="true"
							 v-text="area.AreaName.trim()" @click.native="addrNextBuild(area.AreaGuid.trim())"></CellBox>
				</group>
				<group title="搜索结果" v-if="builds.length && list_type == 'build'"><!--小区列表-->
					<CellBox v-for="build in builds" :key="build.CommunityName" :is-link="true"
							 v-text="build.CommunityName" @click.native="addrNext(build.CommunityGuid)"></CellBox>
				</group>
				<group :title="title" v-if="floors.length && list_type == 'floor'"><!--层列表-->
					<CellBox v-for="(floor,index) in floors" :key="'floor' + index" :is-link="true"
							 v-text="floor.Address" @click.native="addrFloor(floor.Address,index)"></CellBox>
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
				// if (this.value && this.value.trim() && this.value.trim().length > min) {
				// 	this.$nextTick(() => {
				// 		if( this.search_type !== 'code' ){//输入地址模式下自动触发，否则手动下一步
				// 			this.getArea();
				// 		}
				// 	})
				// }
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
					"customerType":this.$parent.tab_demo
				}
				console.log(param);

				that.$http.post('/nc_interface/BasicInformationModule/getArea',param )
					.then(value => {
						if (value.Data !== "[]" ) {
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
				// that.$http.post('/TransferSystem/query/fuzzyBuildArea', that.qs.stringify({areaName: that.value}))
				// 	.then(value => {
				// 		console.log(value);

				// 		that.areas = value;
				// 		that.list_type = 'area';
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 		that.$vux.alert.show({
				// 			title: '错误',
				// 			content: '搜索错误，请重试！'
				// 		})
				// 	})
			},
			addrNextBuild(area) { //获取小区
				let that = this;
				console.log("this.$parent.tab_demo",this.$parent.tab_demo)
				var param = {
					"areaGuid": area,
					"customerType": this.$parent.tab_demo
				}
				console.log("参数",param)
				that.$http.post('/nc_interface/BasicInformationModule/getCommunity', param)
					.then(value => {
						// console.log("hsuh",value)
						// console.log("326",value.Data.length);
						if(!value.ErrMsg){
							console.log(0)
							that.builds = value.Data;
							that.list_type = 'build';
						}else{
							console.log(1)
							that.$vux.alert.show({
								title: '错误',
								content: value.ErrMsg
							})

						}

					})
					.catch(err => {
						console.log(err);
						that.$vux.alert.show({
							title: '错误',
							content: '搜索错误，请重试！'
						})
					})
				// that.$http.post('/TransferSystem/query/fuzzyBuild', that.qs.stringify({fuzzyBuildName: area}))
				// 	.then(value => {
				// 		that.builds = value;
				// 		that.list_type = 'build';
				// 	})
				// 	.catch(err => {
				// 		console.log(err);
				// 		that.$vux.alert.show({
				// 			title: '错误',
				// 			content: '搜索错误，请重试！'
				// 		})
				// 	})
			},
			addrNext(build) {//选择楼幢之后根据搜索类型，下一步显示楼层或已开户地址
				console.log("000",build)
				// let that = this;
				let params={
					"companyKey":"ZN",
					"customerType":this.$parent.tab_demo,
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
				// if( this.search_type == 'new' ){//新开户搜地址 //获取已开户地址、同时进行城中村判断，根据结果推导出楼层
				// 	that.$http.all([that.getAddressDetail({buildCode: build.code}), that.isSecondOpen({zscode: build.code})])
				// 		.then(that.$http.spread( (value, czjcInfo) => {//value:已开户地址，czjcInfo:城中村信息,T为城中村，否则不是
				// 			let addr = build.addr.trim();
				// 			let code = build.code;
				// 			let zte = JSON.stringify(build.zte);
				// 			let characteristic = zte.substr(1, zte.length - 2);
				// 			let transform = build.pt;
				// 			let isContinueNumber = (build.hasOwnProperty("bak") && build["bak"].indexOf("连号") != -1);
				// 			if (czjcInfo && czjcInfo.result == "T") {
				// 				that.$http.post('/TransferSystem/query/jbyhCounts', that.qs.stringify({code0: build.code}))
				// 					.then(openCount => {
				// 						if (openCount.count == 1) {
				// 							that.second = true;
				// 							that.onShowFloor(addr, code, characteristic, transform, isContinueNumber, true);
				// 						} else {
				// 							that.onShowFloor(addr, code, characteristic, transform, isContinueNumber, false);
				// 						}
				// 					})
				// 					.catch(err => {
				// 						console.log(err);
				// 						that.$vux.alert.show({
				// 							title: '错误',
				// 							content: '查询地址信息错误，请重试！'
				// 						});
				// 						//that.onShowFloor(addr, code, characteristic, transform, isContinueNumber, false);
				// 					})
				// 			} else {
				// 				that.onShowFloor(addr, code, characteristic, transform, isContinueNumber, false, value);
				// 			}
				// 		}));
				// } else  {//绑定地址 //取已开户地址并显示
				// 	that.$http.all([that.getAddressDetail({buildCode: build.code})])
				// 		.then(that.$http.spread(function (value) {
				// 			if (value && value.length) {
				// 				that.rooms = [];
				// 				for (let v = 0; v < value.length; v++) {
				// 					let temp = value[v].addr.trim();
				// 					let code = parseInt(value[v].addrCode[value[v].addrCode.length - 1]);
				// 					if(code > 0){
				// 						if(v < code || parseInt(value[v - code].addrCode[value[v - code].addrCode.length - 1]) != 0) {
				// 							let ind = temp.lastIndexOf("-" + code);
				// 							let pre_temp = temp.substr(0, ind) + temp.substr(ind + 2);
				// 							that.rooms.push({
				// 								addr: pre_temp,
				// 								code: value[v].code,
				// 								addrCode: value[v].addrCode.substr(0, value[v].addrCode.length - 2) + "0"
				// 							});
				// 						}
				// 					}
				// 					that.rooms.push({
				// 						addr: temp,
				// 						code: value[v].code,
				// 						addrCode: value[v].addrCode
				// 					});
				// 				}
				// 				that.list_type = 'room';
				// 				that.title = build.addr.trim();
				// 			} else {
				// 				that.$vux.alert.show({
				// 					title: '错误',
				// 					content: '该楼幢无用户数据！'
				// 				})
				// 			}
				// 		}));
				// }
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
					/*$("#address_list ul").html(list_str);
					$("#address_detail").text(addr);*/
				} else {
					/*$("#address").val(addr);
					$("#address_fuzzy").text(addr);
					$("#address_tail").show();
					window.location.hash = "#" + $("#address_list").attr("next");*/
				}
			},
			addrFloor (floor, index){//设置地址列表上部标题
				// this.rooms = floor;
				// this.list_type = 'room';
				// this.title = this.title + " " + index + "层";
				console.log("floor",floor)
				let params = {
					"companyKey":"ZN",
					"customerType":this.$parent.tab_demo,
					"address":floor,
				}
				console.log(this);
				this.$http.post("/nc_interface/BasicInformationModule/getIDByAddress",params).then(value=>{
					console.log("用户信息",value.data)
					console.log(this);
					this.$emit("onSendInfo",{
						address: value.data,
					});
				}).catch(err=>{

				})

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
				// if( code == null ){//仅在开户时传null
					// if (that.transform == "S") {
					// 	that.$vux.confirm.show({
					// 		title: '无法安装',
					// 		content: '您地址的燃气配套情况不明，无法在线申请安装。<br/>请至附近的营业网点或拨打燃气服务热线967266进行咨询。',
					// 		onCancel() {},
					// 		onConfirm() {}
					// 	});
					// } else {
					// 	that.$http.get("/todo/check?" + that.qs.stringify({ "address": addr, "action": "new_install" }))//判断19厅是否可开户
					// 		.then( v => {
					// 			if (v) {//可以开户，向上传递数据
					// 				that.$emit("onSendInfo",{addr:addr,addrCode:addrCode,transform:that.transform,second:that.second});
					// 			} else {
					// 				that.$vux.confirm.show({
					// 					title: '错误',
					// 					content: '您的业务申请正在处理中，请不要重复提交。',
					// 					'confirm-text': '前往查看',
					// 					onCancel() {},
					// 					onConfirm() {}//todo
					// 				});
					// 			}
					// 		} );
					// }
				// } else {//所有(除开户外)选完地址之后进入
					// console.log(this.selectValue);
					var param = {
						"companyKey":"ZN",
						// "customerType": this.$parent.tab_demo,
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
									// var params = {
									// 	"companyKey":"PH",
									// 	"customerType": this.$parent.tab_demo,
									// 	"address": res.Data[0].Address
									// }
									// this.$http.post("/nc_interface/BasicInformationModule/getIDByAddress",params).then(value=>{
									// 	console.log("用户信息",value.data)
									// 	console.log(this);
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
									// }).catch(err=>{
									// 	that.$vux.alert.show({
									// 		title: '错误',
									// 		content: '信息获取错误！'
									// 	})
									// })
								}
								// that.$vux.confirm.show({
								// 	title: '错误',
								// 	content: '您的业务申请正在处理中，请不要重复提交。',
								// 	'confirm-text': '前往查看',
								// 	onCancel() {},
								// 	onConfirm() {}//todo
								// });

								// that.$emit("onSendInfo",{
								// 	address: res.Data[0].Address,
								// });

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

					// 	that.$http.post('/TransferSystem/query/userInfo', that.qs.stringify({uCode: code}))
					// 		.then(value => {
					// 			if( value ){
					// 				that.setUserInfo(value);
					// 				let userInfo = that.getUserInfo;
					// 				if(userInfo.yhxm && userInfo.yhxm.length > 0){
					// 					let name = "";
					// 					for(let xmi = 0; xmi < userInfo.yhxm.length; xmi++){
					// 						if(userInfo.yhxm[xmi] == " " || userInfo.yhxm[xmi] == "　")
					// 							continue;
					// 						name += userInfo.yhxm[xmi];
					// 					}
					// 					that.setUserInfoDetail({key:'yhxm',value:name});
					// 				} else {
					// 					that.setUserInfoDetail({key:'yhxm',value:''});
					// 				}
					// 				if(userInfo.xm && userInfo.xm.length > 0){
					// 					let name = "";
					// 					for(let xmi = 0; xmi < userInfo.xm.length; xmi++){
					// 						if(userInfo.xm[xmi] == " " || userInfo.xm[xmi] == "　")
					// 							continue;
					// 						name += userInfo.xm[xmi];
					// 					}
					// 					that.setUserInfoDetail({key:'xm',value:name});
					// 				} else {
					// 					that.setUserInfoDetail({key:'xm',value:userInfo.yhxm});
					// 				}
					// 				if(addr != null && addrCode == null && addr !== userInfo.addrCode){
					// 					that.setUserInfoDetail({key:'address',value:addr});
					// 					that.setUserInfoDetail({key:'addr',value:addr});
					// 				} else {
					// 					addr = userInfo.address;
					// 					userInfo.addr = addr;
					// 				}
					// 				that.setUserInfoDetail({key:'uCode',value:code});
					// 				that.setUserInfoDetail({key:'sfzh_update',value:false});
					// 				if(addrCode != null)
					// 					that.setUserInfoDetail({key:'addrCode',value:addrCode});
					// 				//todo:退户信息核对
					// 				if(userInfo.sfzh != null && userInfo.sfzh.length > 0){
					// 					let id_type = userInfo.sfzh.substr(0, 1);
					// 					switch(id_type){
					// 						case "B":
					// 							that.setUserInfoDetail({key:'sfzh',value:userInfo.sfzh.substr(1)});
					// 							id_type = "军官证";
					// 							break;
					// 						case "C":
					// 							that.setUserInfoDetail({key:'sfzh',value:userInfo.sfzh.substr(1)});
					// 							id_type = "护照";
					// 							break;
					// 						default:
					// 							id_type = "身份证";
					// 							if(isNaN(parseInt(userInfo.sfzh.substr(0, 1), 10)))
					// 								that.setUserInfoDetail({key:'sfzh',value:userInfo.sfzh.substr(1)});
					// 							if(userInfo.sfzh.length == 15){
					// 								that.setUserInfoDetail({key:'sfzh_update',value:true});
					// 								userInfo.sfzh = ownerIdVerify(userInfo.sfzh.substr(0, 6) + "19" + userInfo.sfzh.substr(6));
					// 							}
					// 							break;
					// 					}
					// 					that.setUserInfoDetail({key:'id_type',value:id_type});
					// 				} else {
					// 					that.setUserInfoDetail({key:'id_type',value:"无"});
					// 					that.setUserInfoDetail({key:'sfzh',value:"无"});
					// 				}
					// 				//$("#id_type").val(id_type);
					// 				//todo:
					// 				if( (that.getUserInfo.sfzh == null || that.getUserInfo.sfzh.length == 0) ){
					// 					that.$vux.alert.show({
					// 						title: '缺少身份证件信息',
					// 						content: '您的用户信息不完整，缺少身份证件信息，无法在线办理业务。您可以前往任意营业网点更新完善您的用户信息。'
					// 					});
					// 				} else {
					// 					/*if(gQueryList.hasOwnProperty("")){

					// 				} else*/
					// 					if( action && that.need_not_check.indexOf(action) == -1){
					// 						if( action == 'additional_install' ){
					// 							that.$http.get('/' + that.getUid + '/todo?' + that.qs.stringify({
					// 								"oid": 0, "filter": JSON.stringify({
					// 									"information.progress": {"$nin": ["canceled", "finished"]},
					// 									"information.action": "additional_install",
					// 									"information.address": addr
					// 								})
					// 							}))
					// 								.then( data => {
					// 									let todos = data.todos;
					// 									if(todos && todos.length) {
					// 										for(let i = 0; i < todos.length; i++){
					// 											that.setAdditionalInstalled(todos[i].information.install_item);
					// 										}
					// 									}
					// 									if( callback ){
					// 										callback();
					// 									}
					// 								})
					// 								.catch(err => {
					// 									console.log(err);
					// 									that.$vux.alert.show({
					// 										title:'错误！',
					// 										content: '网络错误，请稍后重试！'
					// 									});
					// 								});
					// 						} else if ( action == 'transfer' ){

					// 						} else {

					// 						}
					// 					} else {
					// 						if( callback ){//选地址进入业务详情页
					// 							callback();
					// 						} else {//查询用户信息，绑定时进入
					// 							that.$emit("onSendInfo",{
					// 								address:that.getUserInfo.addr,
					// 								owner:(that.getUserInfo.yhxm && that.getUserInfo.yhxm.length > 0) ? that.getUserInfo["yhxm"]:that.getUserInfo["xm"],
					// 								accepted_number:that.getUserInfo.yhbh,
					// 								orig_phone:that.getUserInfo.dh,
					// 								user_number:that.getUserInfo.uCode,
					// 								id_type:that.getUserInfo.id_type
					// 							});
					// 						}
					// 					}
					// 				}
					// 			} else {
					// 				that.$vux.alert.show({
					// 					title: '错误',
					// 					content: '未查找到用户数据！'
					// 				})
					// 			}
					// 		})
					// 		.catch(err => {
					// 			console.log(err);
					// 			that.$vux.alert.show({
					// 				title: '错误',
					// 				content: '未查找到用户数据！'
					// 			})
					// 		})
				// }
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
