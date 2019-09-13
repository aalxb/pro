<template>
	<div class="wrap">
		<template v-if="page=='progress'">
			<div class="business-list" >
				<!--<div class="card" v-for="todo in todos" :key="todo._id.$oid" v-if="getActionList.hasOwnProperty(todo.information.action)">-->
					<!--<div class="card-title">-->
						<!--<div class="title-content">-->
							<!--<div class="icon" :style="{backgroundPosition:getActionList[todo.information.action].pos}"></div>-->
							<!--<div class="name" v-text="setTodoName(todo.information.action)"></div>&lt;!&ndash;最多6字&ndash;&gt;-->
							<!--<div class="time" v-text="formatTimestamp(todo.information.timestamp)"></div>-->
						<!--</div>-->
					<!--</div>-->
				<div class="card" v-for="(progress_deails,index) in progress" :key="index">
					<div class="card-title">
						<div class="title-content">
							<div class="icon" :style=""></div>
							<div class="name" v-text="progress_deails.busiName"></div><!--最多6字-->
							<div class="time" v-text="progress_deails.createTime"></div>
						</div>
					</div>
					<div class="card-body">
						<!--<flow>-->
							<!--<template v-for="(step,index) in getActionList[todo.information.action].milestone"-->
							<!--v-if="!(passed(todo.information.action,todo.information.progress,index) && step.indexOf(todo.information.progress) < 0)-->
							<!--|| REVOKE_PROGRESS.indexOf(todo.information.progress) < 0">-->
								<!--<template v-if="passed(todo.information.action,todo.information.progress,index) && step.indexOf(todo.information.progress) < 0">-->
									<!--<flow-state :state="index+1" :title="setStepName(step.split(',')[0], todo.information.action)"></flow-state>-->
									<!--<flow-line v-if="index < getActionList[todo.information.action].milestone.length - 1"></flow-line>-->
								<!--</template>-->
								<!--<template v-else>-->
									<!--<flow-state :state="index+1" is-done :class="[step.indexOf(todo.information.progress) >= 0 ? 'flow-big':'']"-->
									<!--:title="setStepName(step.split(',')[step.split(',').indexOf(todo.information.progress) > -1 ? step.split(',').indexOf(todo.information.progress):0], todo.information.action)"></flow-state>-->
									<!--<flow-line is-done></flow-line>-->
								<!--</template>-->
							<!--</template>-->
						<!--</flow>-->
						<flow>
							<template>
								<template v-for="(progress_step,index) in progress_deails.orderHistoriesList">
									<flow-state :state="index+1" :title="titleProgress(progress_step.progress)" is-done></flow-state>
									<flow-line is-done></flow-line>
								</template>
							</template>
						</flow>
					</div>
					<!--<template v-if="CAN_CANCEL_PROGRESS.indexOf(',' + todo.information.progress) >= 0">-->
						<!--<div class="card-action">-->
							<!--<span @click="onCancel(todo)">撤销</span>-->
							<!--<span v-text="setBtnText(todo.information.progress)" @click="onAction(todo)"></span>-->
						<!--</div>-->
					<!--</template>-->
					<!--<template v-else>-->
						<!--<div class="card-action" v-text="setBtnText(todo.information.progress)" @click="onAction(todo)"></div>-->
					<!--</template>-->
					<template>
						<div class="card-action">
							<span v-show="progress_deails.orderHistoriesList[progress_deails.orderHistoriesList.length-1].progress !='rescinded'"  @click="onDistory(progress_deails)">撤销</span>
							<span  @click="onChange(progress_deails)">查看</span>
						</div>
					</template>
					<!--<template>-->
						<!--<div class="card-action" v-text="setBtnText(todo.information.progress)" @click="onAction(todo)"></div>-->
					<!--</template>-->
				</div>
			</div>
		</template>
		<template v-if="page=='address'">
			<div>
				<template v-if="account_address ">
					<swipeout-item v-if="account.hasOwnProperty('company')" @click.native="Select(account)"
								   v-for="(account,index) in account_address" :key="'account' + index"
								   class="address" transition-mode="follow" ref="address" :auto-close-on-button-click="false">
						<div slot="content" class="content" v-text="account.address"></div>
					</swipeout-item>
				</template>
			</div>
		</template>
		<template v-if="page == 'null'">
			<empty type="record"></empty>
		</template>
		<!--<fix_footer></fix_footer>-->
	</div>
</template>

<script>
	import Empty from './common/empty'
	import Footer from './common/footer'
	import {getObjectId} from '../assets/common'
	import {Flow, FlowState, FlowLine,Swipeout,SwipeoutItem,} from 'vux'
	import {mapGetters} from "vuex"

	export default {
		name: "Progress",
		components:{
			Empty,
			fix_footer:Footer,
			Flow,
			FlowState,
			FlowLine,
			Swipeout,
			SwipeoutItem,
		},
		data () {
			return {
				todos:[
					{
						"_id":{
							"$oid":"5d44d91d3466650100fe4073"
						},
						"uid":"5933a439306336fd623ece36",
						"information":{
							"action":"new_install",
							"progress":"accepted",
							"address":"沈塘桥19弄7#1单元201室",
							"contract":"contract",
							"accepted_number":"",
							"address_code":"183500070000000102010",
							"transform":"须缴纳",
							"owner":"翁晓丽",
							"owner_id":"330108198810260226",
							"owner_phone":"18257160195",
							"agent":"",
							"agent_id":"",
							"agent_phone":"",
							"ownership_type":"房产证",
							"ownership_number":"",
							"owner_id_front":"owner_id_front_190803084155.jpg",
							"owner_id_back":"owner_id_back-1564821917.jpg",
							"agent_id_front":"",
							"agent_id_back":"",
							"ownership_1":"ownership_1-1564821916.jpg",
							"ownership_2":"ownership_2-1564821916.jpg",
							"pay_info":{
								"name":"新装燃气开通费",
								"type":["户内管开通费","管道燃气设施改造费"],
								"platform":"weixin"
							},
							"install_item":"gas,",
							"platform":"weixin",
							"area":"营业",
							"timestamp":1564793117262,
							"pending_time":1564793117262,
							"flow":[{
								"pending": {
									"$date":{
										"$numberLong":1564793117318
									}
								}
							}]
						},
						"date_time":{
							"$date":{
								"$numberLong":1564793117318
							}
						}
					}
				],
				page:"address",
				// progress:[
				// 	{
				// 		"address": "18-2-102",
				// 		"area": "岭南雅苑",
				// 		"busiId": 2,
				// 		"busiName": "装表申请",
				// 		"companyId": 1,
				// 		"createTime": "2019-07-29 00:00:00",
				// 		"gid": "1314",
				// 		"gname": "詹三",
				// 		"id": 2,
				// 		"idNumber": "610523199818182560",
				// 		"meterId": "表号(非必填)",
				// 		"orderHistoriesList": [
				// 			{
				// 				"busiName": "业务标题0",
				// 				"createTime": "2019-07-29 00:00:00",
				// 				"progress": "Toaudit",
				// 				"waitingLong": 0
				// 			}
				// 		],
				// 		"phone": "17621584459",
				// 		"platform": "/WX",
				// 		"progress": "Toaudit",
				// 		"type": "居民）",
				// 		"userId": 1
				// 	},
				// 	{
				// 		"address": "18-2-102",
				// 		"area": "岭南雅苑",
				// 		"busiId": 2,
				// 		"busiName": "装表申请",
				// 		"companyId": 1,
				// 		"createTime": "2019-07-30 00:00:00",
				// 		"gid": "1314",
				// 		"gname": "詹三",
				// 		"id": 2,
				// 		"idNumber": "610523199818182560",
				// 		"meterId": "表号(非必填)",
				// 		"orderHistoriesList": [
				// 			{
				// 				"busiName": "业务标题0",
				// 				"createTime": "2019-07-29 00:00:00",
				// 				"progress": "Toaudit",
				// 				"waitingLong": 0
				// 			},
				// 			{
				// 				"busiName": "业务标题0",
				// 				"createTime": "2019-07-30 00:00:00",
				// 				"progress": "rescinded",
				// 				"waitingLong": 0
				// 			}
				// 		],
				// 		"phone": "17621584459",
				// 		"platform": "/WX",
				// 		"progress": "Toaudit",
				// 		"type": "居民）",
				// 		"userId": 1
				// 	}
				// ],
				progress:null,
				account_address:'',
				titleDeails:{
					'Toaudit':"待审核",
				    "Besignedup":"待签约",
					"NoVia": "不通过",
					"via": "通过",
					"TobeSignIn": "待签收",
					"waitpay": "待缴费",
					"TobeReserved": "待预约",
					"TobeRevoked": "待撤销",
					"rescinded": "已撤销",
					"HaveFinished": "已完结",
					"ToBemodify": "待修改",
					"BeingApproved": "审批中",
					"BonPayment":"未支付",
					"HavePaid":"已支付",
					"RefundOf":"退款中",
					"Refunded":"已退款",
			},
				// account_address: [
				// 	{
				// 		"address": "水产嘉园和睦苑33幢2单元1801室",
				// 		"bindTime": "2019-08-20 20:34:12",
				// 		"binded": 1,
				// 		"company": 1,
				// 		"gid": "ZD1908000004",
				// 		"id": 6,
				// 		"type": "居民",
				// 		"userId": 25
				// 	},
				// 	{
				// 		"address": "金鹅山小区7幢3单元206室",
				// 		"bindTime": "2019-08-21 09:32:11",
				// 		"binded": 1,
				// 		"company": 1,
				// 		"gid": "113000041331",
				// 		"id": 7,
				// 		"type": "居民",
				// 		"userId": 25
				// 	},
				// 	{
				// 		"address": "湖景花苑1幢1单元801室",
				// 		"bindTime": "2019-08-21 10:12:45",
				// 		"binded": 1,
				// 		"company": 1,
				// 		"gid": "113000041334",
				// 		"id": 11,
				// 		"type": "居民",
				// 		"userId": 25
				// 	},
				// 	{
				// 		"address": "乾龙花园2幢3单元306室",
				// 		"bindTime": "2019-08-21 10:38:13",
				// 		"binded": 1,
				// 		"company": 1,
				// 		"gid": "113000038905",
				// 		"id": 20,
				// 		"type": "居民",
				// 		"userId": 25
				// 	}
				// ]
			}
		},
		computed: {
			...mapGetters([
				'getUid',
				'getUserId',
				'getActionList',
				'PROGRESS_LIST',
				'CAN_CANCEL_PROGRESS',
				'REVOKE_PROGRESS'
			])
		},
		mounted:function () {
			this.$vux.loading.show();
			// this.onGetTodos();
			console.log("15555")
			this.SelectList()
		},
		methods:{
			//获取地址
			SelectList(){
				let params ={
					userId:this.getUserId
				}
				console.log("params",params)

				this.$http.post("/Zn/ProfessionalWork/GasAccounts/SelectList",params).then(date=>{
					console.log("date",date)
					this.account_address = date.data
					this.$vux.loading.hide();
				}).catch(err=>{
					console.log("err",err)
					this.$vux.loading.hide();
				})
			},
			//受理进度
			Select(address){
				console.log("数据",address)
				let params ={
					'id':null,
					'userId':address.userId,
					'gid':address.gid
				}
				console.log("params",params)
				this.$http.post("/Zn/ProfessionalWork/Business/SelectOrder",params).then(value=>{
					console.log("date",value.length)
					if(value.length == 0){
						this.page = 'null'
						// console.log("是否")
					}else {
						this.page = 'progress'
						this.progress  = value
					}

				}).catch(err=>{
					console.log("err",err)
					this.$vux.toast.show({
						width: '18em',
						type: 'text',
						text: '获取地址业务受理信息失败！'
					});
				})
			},
			titleProgress(name){
				// console.log(this.titleDeails[name])
				return this.titleDeails[name]
			},
			//撤销按钮
			TobeRevoked(name){
				console.log("0000")
				if(this.titleDeails(name)){
					return false
				}else{
					return true
				}
			},
			//查看业务受理详情
			onChange(count){
				console.log("count",count)
				let params ={
					'id':count.id,
					'userId':count.userId,
					'gid':count.gid
				}
				this.$http.post("/Zn/ProfessionalWork/Business/SelectOrder",params).then(value=>{
					console.log("value",value)
					this.$router.push({
						path:'/business_detail',
						query: {count:value[0]}
					});
				}).catch(err=>{
					this.$vux.toast.show({
						width: '18em',
						type: 'text',
						text: '获取业务受理信息失败！'
					});
				})

			},
			//撤销业务
			onDistory(count){
				console.log('撤销数据',count)
				if(count.orderHistoriesList[count.orderHistoriesList.length - 1].progress == 'HaveFinished'){
					this.$vux.alert.show({
						width: '18em',
						type: 'text',
						content: '业务受理已完成，不可撤销！'
					});
					this.Select(count)
				}else{
					this.$http.get('/Zn/ProfessionalWork/Business/Backout?id='+count.id).then(value=>{
						console.log('value',value)
						this.$vux.toast.show({
							width: '18em',
							type: 'success',
							text: '撤销成功！'
						});
						this.Select(count)
					}).catch(err=>{
						console.log('err',err)
						this.$vux.alert.show({
							width: '18em',
							type: 'text',
							content: '业务撤销失败，请重新尝试！'
						});
					})
				}
			},
			onGetTodos (){
				let that = this;
				let query = {"information.progress":{"$ne": "canceled"},"information.action":{"$nin":["complaint","consult","non_resident_order"]}};
				that.$http.get('/' + that.getUid + '/todo?' + that.qs.stringify({"filter" : JSON.stringify(query), "sort" : JSON.stringify({"information.timestamp" : -1}), "limit":0}))
					.then( data => {
						that.$vux.loading.hide();
						that.todos = data.todos;
						that.todos.sort(function (a, b) {
							return that.PROGRESS_LIST[a.information.progress].level - that.PROGRESS_LIST[b.information.progress].level;
						});
					})
					.catch( err => {
						console.log(err);
						that.$vux.loading.hide();
						// that.$vux.alert.show({
						// 	title:'错误',
						// 	content:'查询出错，请重新尝试！'
						// });
					});
			},
			setTodoName(action){
				let name = this.getActionList[action].name;
				return (name.length > 6 ? name.substr(0,6) + "…" : name)
			},
			setStepName(progress, action){
				if( progress === "unpaid" && !(action === "new_install" || action === "additional_install" || action === "fix") ){
					return "待支付";
				} else {
					return this.PROGRESS_LIST[progress].tip;
				}
			},
			passed (action, progress, index){
				let milestone = this.getActionList[action].milestone;
				let progress_index = 0;
				for ( let i = 0; i < milestone.length; i++ ){
					if( milestone[i].indexOf(progress) > -1 ){
						progress_index = i;
						break;
					}
				}
				return index > progress_index;
			},
			setBtnText (progress){
				let button_tip = "查看";
				switch(progress){
					case "settled":
						button_tip = "结算";
						break;
					case "unpaid":
						button_tip = "支付";
						break;
					case "contract":
						button_tip = "签约";
						break;
					case "revoke":
						button_tip = "修改";
						break;
				}
				return button_tip;
			},
			onAction(todo){
				let todo_query = encodeURIComponent(JSON.stringify(todo));
				if(todo){
					switch(todo.information.progress){
						case "settled":
							this.$router.push({
								path:'settlement',
								query: {todo_id:getObjectId(todo)}
							});
							break;
						case "unpaid":
							if( todo.information.action == "new_install" && todo.information.transform == "须缴纳" && todo.information.pay_info.type.indexOf("管道燃气设施改造费") == -1){
								let can_pay = false;
								let todos = this.todos;
								for ( let i = 0; i < todos.length; i++ ){
									let same = todos[i];
									if( getObjectId(same) !== getObjectId(todo) && same.information.action == "new_install" && same.information.transform == "须缴纳" && same.information.pay_info.type.indexOf("管道燃气设施改造费") > -1 && same.hasOwnProperty('trades')){
										let trades = same.trades;
										for ( let t = 0; t < trades.length; t++ ){
											if( trades[t].status == "success" && trades[t].total_fee > 1000 ){
												can_pay = true;
												break;
											}
										}
									}
								}
								if ( can_pay ){
									this.$router.push({
										path:'pay',
										query: {todo_id:getObjectId(todo)}
									});
								} else {
									this.$vux.alert.show({
										title:'提示',
										content:'请先支付另一笔开户业务费用！'
									});
								}
							} else {
								this.$router.push({
									path:'pay',
									query: {todo_id:getObjectId(todo)}
								});
							}
							break;
						case "contract":
							this.$router.push({
								path:todo.information.action,
								query: {todo:todo_query}
							});
							break;
						case "revoke":
							this.$router.push({
								path:'revoke',
								query: {todo:todo_query}
							});
							break;
						case "cancel":
							this.$router.push({
								path:'detail',
								query: {todo:todo_query}
							});
							break;
						case "refunding":
							this.$router.push({
								path:'refunding',
								query: {todo:todo_query}
							});
							break;
						case "appointment":
							this.$router.push({
								path:'appointment',
								query: {todo:todo_query}
							});
							break;
						default:
							this.$router.push({
								path:'business_detail',
								query: {todo:todo_query}
							});
							break;
					}
				}
			},
			onCancel (todo){
				let that = this;
				let need_review = false;
				let confirm_content = '是否确认撤销申请？';
				let success_content = "撤销成功！";
				let fail_content = "撤销失败！";
				if( todo.information.progress === "accepted" && (todo.information.action !== "complaint" || todo.information.action !== "consult") ){
					need_review = true;
					confirm_content = '您的申请已被受理，现在撤销需要经过人工审核，是否确认撤销？';
					success_content = "申请提交成功，请等待审核结果。";
					fail_content = "申请提交失败！";
				}
				that.$vux.confirm.show({
					title:'提示',
					content:confirm_content,
					onConfirm: () => {
						let filter = {"_id":todo._id};
						filter["information.progress"] = (need_review ? "accepted" : todo.information.progress);
						let newTodo = {};
						newTodo["information.progress"] = (need_review ? "cancel" : "canceled");
						let data = {"filter":filter, "update":newTodo};

						that.$http.put("/" + that.getUid + "/todo", JSON.stringify(data),{headers: {'Content-Type': 'application/json; charset=utf-8'}})
							.then( () => {
								that.$vux.alert.show({
									title:'成功',
									content:success_content,
									onHide: () => {
										that.$vux.loading.show();
										that.onGetTodos();
									}
								});
							})
							.catch(err => {
								console.log(err);
								that.$vux.alert.show({
									title:'错误',
									content:fail_content
								});
							});
					}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.business-list {
		padding: 5px;
		.card {
			background-color: white;
			width: 100%;
			box-shadow: 0 4px 12px rgba(0,0,0,0.16);
			border-radius: 4px;
			margin-bottom: 15px;
			.card-title {
				height: 60px;
				padding: 10px 20px;
				position: relative;
				.title-content {
					border-bottom: 1px solid #DCDDE2;
					.icon {
						position: absolute;
						width: 32px;
						height: 40px;
						padding: 4px 0;
						left: 20px;
						background: url("../../static/icon-round.png");
						background-origin: content-box;
					}
					.name {
						height: 100%;
						font-size: 18px;
						line-height: 40px;
						font-weight: bold;
						padding-left: 45px;
					}
					.time {
						position: absolute;
						right: 20px;
						top: 23px;
						color: #999;
						font-size: 14px;
					}
				}
			}
			.card-body {
				padding: 20px 10px;
				border-bottom: 1px solid #E5E5E5;
				.cell {
					.key {
						margin-bottom: 10px;
						color: #666;
						.value {
							color: #333;
							padding-left: 10px;
							&.value-strong {
								color: #FF4F32;
								font-size: 15px;
							}
						}
					}
				}
				/deep/ .weui-wepay-flow {
					padding: 20px 10px 30px 10px;
				}
			}
			.card-action {
				text-align: center;
				padding: 10px 20px;
				color: #666;
				span {
					display: inline-block;
					width: 48%;
					&:first-child{
						border-right: 1px solid #DCDDE2;
					}
				}
			}
		}
	}
	.address {
		height: 70px;
		color: #333;
		box-shadow: 0 3px 14px 0 rgba(58, 70, 77, 0.14);
		margin: 10px 0 10px 8px;
		border-radius:5px;
		/deep/ .vux-swipeout-content {
			border-radius:5px;
			.content {
				font-weight: bold;
				font-size: 15px;
				line-height: 70px;
				padding-left: 20px;
			}
		}
		.menu-delete {
			background-color: #FF9800;
		}
	}
	.content{

	}
</style>
