<template>
	<div class="wrap" :class="[page == 'add' ? 'no-height-warp':'']">

		<div v-transfer-dom>
			<confirm v-model="selectType"
					 title="用户类型"
					 @on-cancel="onCancel"
					 @on-confirm="onConfirm"
			>
				<!--<selector ref="defaultValueRef" title="用户类型" :options="list" v-model="defaultValue"></selector>-->

					<checklist :options="user_type_tabs" v-model="user_type_tab"  :max="1" @on-change="change"></checklist>
					<!--<checker-item v-for="(user_type_tab,index) in user_type_tabs" :key="index" :value="index">{{user_type_tab}}</checker-item>-->
			</confirm>
		</div>



		<template v-if="page == 'list'">
			<div class="edit">
				<tip v-if="getActionList && getActionList.hasOwnProperty(action) && getActionList.action.show_tip"
					 title="业务说明" :content="action" :immediate="immediate">
				</tip>
				<span><x-icon type="ios-arrow-thin-left" size="18"></x-icon>左滑解绑</span>
			</div>
			<tab :line-width=2 custom-bar-width="60px" active-color='#40A0FF' default-color="#999" v-if="address_type == 'user' && account_address && onCheckCanEdit['edit']">
				<tab-item active-class="tab-active" :selected="user_type === type"
						  v-for="(type, index) in user_types" @on-item-click="onTabUserClick" :key="index">{{type}}</tab-item>
			</tab>
			<swipeout>
				<template v-if="address_type == 'user' && account_address && onCheckCanEdit['edit']">

					<swipeout-item v-if="account.hasOwnProperty('company') && user_type =='居民用户'" @click.native="onSelect(account)"
								   v-for="(account,index) in jvmin" :key="'account' + index"
								   class="address" transition-mode="follow" ref="address" :auto-close-on-button-click="false">
						<div slot="right-menu">
							<swipeout-button class="menu-delete"  @click.native.stop="unBind(account)" type="primary">解绑</swipeout-button>
						</div>
						<div slot="content" class="content" v-text="account.address"></div>
					</swipeout-item>
					<swipeout-item v-if="account.hasOwnProperty('company') && user_type =='非居民用户'" @click.native="onSelect(account)"
								   v-for="(account,index) in noJvmin" :key="'account' + index"
								   class="address" transition-mode="follow" ref="address" :auto-close-on-button-click="false">
						<div slot="right-menu">
							<swipeout-button class="menu-delete"  @click.native.stop="unBind(account)" type="primary">解绑</swipeout-button>
						</div>
						<div slot="content" class="content" v-text="account.address"></div>
					</swipeout-item>
				</template>
				<template v-else-if="address_type == 'public' && account_address_type ">
					<swipeout-item v-if="account.hasOwnProperty('company')" @click.native="Select(account)"
								   v-for="(account,index) in account_address_type" :key="'account' + index"
								   class="address" transition-mode="follow" ref="address" :auto-close-on-button-click="false">
						<div slot="right-menu">
							<swipeout-button class="menu-delete" @click.native.stop="unBind(account)" type="primary">解绑</swipeout-button>
						</div>
						<div slot="content" class="content" v-text="account.address"></div>
					</swipeout-item>
				</template>
				<template v-else>
					<empty type="address" text="暂无地址"></empty>
				</template>
			</swipeout>
			<div class="bind-box">
				<x-button v-if="onCheckCanEdit['bind']" @click.native="onNew" class="bind-btn" type="primary">绑定新地址</x-button>
				<!-- <x-button v-if="action == 'bill'" class="bind-btn step_over" type="primary">跳过绑定流程</x-button> -->
			</div>
			<search v-show="false" ref="hidden"></search>
		</template>
		<template v-if="page == 'add'">
			<group-title>请选择地址绑定方式<span class="right-cancel" @click="onCancel">取消</span></group-title>
			<div class="bind-content">
				<tab :line-width=0 active-color='#40A0FF' default-color="#999">
					<tab-item active-class="tab-active" :selected="bind_type === type"
							  v-for="(type, index) in bind_types" @on-item-click="onTabClick" :key="index">{{type}}</tab-item>
				</tab>
				<div class="search-box">
					<search ref="search" @onSendInfo="onSendInfo" :search_type="bind_type == '用户编号绑定' ? 'code':'address'" :props="tab_demo"></search>
				</div>
				<div class="sample-box">
					<img class="img-responsive" :src="IMG_URL +'/static/user_number_cut.png'" alt="参考样张" v-show="bind_type == '用户编号绑定'">
					<x-button v-if="bind_type == '用户编号绑定'" @click.native="onCodeNext" class="bind-btn-next" type="primary">下一步</x-button>
				</div>
			</div>
		</template>
		<template v-if="page == 'public_add'">
			<CellBox class="bold-address">请输入产权单位编号<span class="right-cancel" @click="onCancel">取消</span></CellBox>
			<group title=" " class="owner-verify">
				<x-input v-model="public_number" title="编号" placeholder="请输入产权单位编号"
						 placeholder-align="right" text-align="right" :max="5"></x-input>
				<template v-if="getPublicInfo">
					<cell title="单位名称" :value="getPublicInfo.CUSTNAME"></cell>
					<cell title="单位地址" :value="getPublicInfo.ADDRDETAIL"></cell>
				</template>
			</group>
			<flexbox class="action-groups">
				<flexbox-item v-for="action in actions[page]" :key="action.name">
					<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
				</flexbox-item>
			</flexbox>
		</template>
		<template v-if="page == 'owner'">
			<CellBox class="bold-address">验证信息<span class="right-cancel" @click="onCancel">取消</span></CellBox>
			<group title=" " class="owner-verify">
				<cell title="用气地址" :value="check_info.address"></cell>
				<cell :title="'燃气产权人'"><input class="customerName-xing" type="text" disabled :value="check_info.customerName.substr(0,1)"><input class="customerName-ming" v-model="name" type="text" placeholder="请补全产权人姓名"></cell>
				<!-- <x-input v-model="check_info.owner" title="燃气产权人" placeholder="请输入产权人姓名"
						 placeholder-align="right" text-align="left"></x-input>
				<popup-picker title="与产权人关系" :data="relations" v-model="relation"></popup-picker> -->
			</group>
			<flexbox class="action-groups">
				<flexbox-item v-for="action in actions[page]" :key="action.name">
					<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
				</flexbox-item>
			</flexbox>
		</template>
		<template v-if="page == 'verify'">
			<CellBox class="bold-address">补充用户信息</CellBox>
			<group title=" " class="owner-verify">
				<x-input title="手机号" is-type="china-mobile" type="tel" placeholder="请输入手机号" ref="phone" v-model="verify.phone"></x-input>
				<x-input title="验证码" placeholder="验证码" v-model="verify.verify_code">
					<span slot="right" v-if="count_down == 60" class="send-code" @click="onSendVerifyCode">发送验证码</span>
					<span slot="right" v-else class="send-code active" v-text="'(' + count_down + 's)'"></span>
				</x-input>
			</group>
			<flexbox class="action-groups">
				<flexbox-item v-for="action in actions[page]" :key="action.name">
					<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
				</flexbox-item>
			</flexbox>
		</template>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from './common/footer'
	import Search from './common/search'
	import Empty from './common/empty'
	import Tip from './common/tip'
	import {
		Swipeout,
		SwipeoutItem,
		SwipeoutButton,
		XButton,
		Tab,
		TabItem,
		GroupTitle,
		Group,
		Cell,
		XInput,
		CellBox,
		PopupPicker,
		Flexbox,
		FlexboxItem,
		Checker,
		CheckerItem,
		Confirm,TransferDomDirective as TransferDom,Selector,Checklist
	} from 'vux'
	import {mapActions, mapGetters, mapMutations} from "vuex";
	export default {
		name: "Accounts",
		directives: {
			TransferDom
		},
		components: {
			fix_footer: Footer,
			search: Search,
			empty: Empty,
			tip: Tip,
			Swipeout,
			SwipeoutItem,
			SwipeoutButton,
			XButton,
			Tab,
			TabItem,
			GroupTitle,
			Group,
			Cell,
			XInput,
			CellBox,
			PopupPicker,
			Flexbox,
			FlexboxItem,
			Confirm,Selector,
			Checker, CheckerItem,Checklist
		},
		data() {
			return {
				tab_demo:1,
				user_type_tab:['居民'],
				user_type_tabs:["居民","非居民"],
				selectType: false,
				defaultValue: 'zm',
				list: [{key: 'zm', value: '居民'}, {key: 'fzm', value: '非居民'}],
				page: 'list',
				name:"",
				edit: false,
				address_type: 'user',
				user_type:"居民用户",
				user_types:['居民用户','非居民用户'],
				bind_type: '用户编号绑定',
				bind_types:['用户编号绑定','用气地址绑定'],
				check_info:{
					address: '',
					owner: '',
					type: '本人',
					address_code:'',
					orig_phone: '',
					user_number: '',
					id_type: '',
					customerName:"",
					customerID:""
				},
				relation:['本人'],
				relations: [['本人','家属','租客','其他']],
				actions: {
					'add': [
						{
							name: 'list',
							text: '上一步',
						},
						{
							name: 'owner',
							text: '下一步',
						},
					],
					'owner': [
						{
							name: 'add',
							text: '上一步',
						},
						{
							name: 'submit',
							text: '验证绑定',
						},
					],
					'public_add': [
						{
							name: 'submit',
							text: '绑定',
						}
					],
					'verify': [
						{
							name: 'verify',
							text: '提交',
						}
					]
				},
				action: null,
				public_number:'',
				immediate: true,
				verify:{
					phone: '',
					verify_code:''
				},
				count_down: 60,
				page_table:'',
				jvmin:[],
				noJvmin:[],
				account_address:'',
				// account_address_type:[],
				account_address_type: [
					{
						"address": "水产嘉园和睦苑33幢2单元1801室",
						"bindTime": "2019-08-20 20:34:12",
						"binded": 1,
						"company": 1,
						"gid": "ZD1908000004",
						"id": 6,
						"type": "居民",
						"userId": 25
					},
					{
						"address": "金鹅山小区7幢3单元206室",
						"bindTime": "2019-08-21 09:32:11",
						"binded": 1,
						"company": 1,
						"gid": "113000041331",
						"id": 7,
						"type": "居民",
						"userId": 25
					},
					{
						"address": "湖景花苑1幢1单元801室",
						"bindTime": "2019-08-21 10:12:45",
						"binded": 1,
						"company": 1,
						"gid": "113000041334",
						"id": 11,
						"type": "居民",
						"userId": 25
					},
					{
						"address": "乾龙花园2幢3单元306室",
						"bindTime": "2019-08-21 10:38:13",
						"binded": 1,
						"company": 1,
						"gid": "113000038905",
						"id": 20,
						"type": "居民",
						"userId": 25
					}
				]
			}
		},
		mounted: function () {
			let that = this;
			this.getClient( (data) =>{

				if( data && data.hasOwnProperty('phone') && data.phone.length !== 11 ){
					that.immediate = false;
					that.$vux.alert.show({
						title: '提示',
						content:'当前账户预留手机号码错误！请及时进行修改！',
						onHide: () => {
							that.page = 'verify';
						}
					});
				}else {

				}
			});
			if( this.$route.query.hasOwnProperty('b') ){
				this.action = this.$route.query.b;
				console.log("8798",this.$route.query)
				if ( this.$route.query.b == "public_business" && this.$route.query.t == "装表申请"){
					this.page_table = 'put-table'
				}else if(this.$route.query.b == "public_business" && this.$route.query.t == "点火申请"){
					this.page_table = 'ignition'
				}else if(this.$route.query.b == "public_business" && this.$route.query.t == "拆改申请"){
					this.page_table = 'demolition'
				}else if(this.$route.query.b == "public_business" && this.$route.query.t == "补开增容"){
					this.page_table = 'new-gas'
				}else if(this.$route.query.b == "cancel" && this.$route.query.t == "安检申请"){
					this.page_table = 'cancels'
				}else if(this.$route.query.b == "cancel" && this.$route.query.t == "销户申请"){
					this.page_table = 'cancel'
				}
				// console.log("action",this.action.indexOf('public') > -1)
				if(this.$route.query.b != 'address'){
					this.address_type = "public"
				}
				if ( this.$route.query.b == 'address' ){
					// this.address_type = 'public';
					this.address_type = 'user';
				}
				console.log("user",this.getUserId)

			}
			this.SelectList()


		},
		computed:{
			...mapGetters([
				'getUser',
				'getUserInfo',
				'getPlatform',
				'getUserId',
				'getUid',
				'getPublicInfo',
				'getActionList'
			]),

			onCheckCanEdit (){
				let can = {
					edit: false,
					bind: true
				};
				let account_count = 0;
				if( this.getUser ){
					console.log( this.getUser);

					let accounts = this.getUser.accounts;
					for ( let i = 0; i < accounts.length; i++ ){
						if( this.address_type == 'user' && accounts[i].hasOwnProperty('credentials_type')){
							can['edit'] = true;
							account_count++
						}
						if( this.address_type == 'public' && accounts[i].hasOwnProperty('company')){
							can['edit'] = true;
							break;
						}
					}
					if( account_count == 5 ){
						can.bind = false;
					}
					// this.SelectList()
				}
				return can;
			}
		},
		methods: {
			...mapMutations([
				'setPublicInfo'
			]),
			...mapActions([
				'getClient',
				'PublicInfo'
			]),
			change(val, label){
				console.log("44",val)
				if(val[0] != '居民'){
					this.tab_demo = 2
				}
			},
			onNew(){
				this.address_type = 'user' ? this.page = 'add':this.page = 'public_add'
				this.selectType = true
			},
			//获取地址
			SelectList(){
				this.jvmin=[]
				this.noJvmin=[]
				// this.account_address_type =[]
				let params ={
					userId:this.getUserId
				}
				console.log("params",params)

				this.$http.post("/Zn/ProfessionalWork/GasAccounts/SelectList",params).then(date=>{
					console.log("date",date)
					this.account_address = date.data
					if(this.$route.query.hasOwnProperty('type')){
						for(let j = 0;j<this.account_address.length;j++){
							if(this.account_address[j].type == this.$route.query.type){
								this.account_address_type.push(this.account_address[j])
							}

						}
					}else{
						for(let i = 0;i<this.account_address.length;i++){
							if(this.account_address[i].type == '居民'){
								this.jvmin.push(this.account_address[i])
								// alert("0000")
							}else {
								this.noJvmin.push(this.account_address[i])
							}
						}
					}



				}).catch(err=>{
					console.log("err",err)
				})
			},

			onCancel () {
				this.page = 'list';
				this.public_number = '';
				if( this.PublicInfo ){
					this.setPublicInfo(null);
				}
			},
			onSendInfo (info){
				console.log("传值",info);
				this.page = 'owner'
				this.check_info.address = info.address[0].address;
				this.check_info.customerName = info.address[0].customerName;
				this.check_info.customerID = info.address[0].customerID

			},
			onTabClick (index){
				this.bind_type = this.bind_types[index];
			},
			onTabUserClick(index){
				this.user_type = this.user_types[index]
				console.log("user_type",this.user_type)
			},
			onCodeNext () {

				// this.selectType = true
				// console.log('55')
				this.$refs['search'].addrFinished();
			},
			onCheckName (){
				let result = true;
				let xm = this.getUserInfo.xm.trim();
				let yhxm = '';
				if(this.getUserInfo.hasOwnProperty("yhxm")){
					yhxm = this.getUserInfo.yhxm.trim();
					if(yhxm.length == 0){
						yhxm = xm;
					}
				} else {
					yhxm = xm;
				}
				if (this.check_info.owner !== xm && this.check_info.owner !== yhxm) {
					result = false;
				}
				return result;
			},
			onPage(action) {
				switch (action.name) {
					case "submit":
						this.onSubmit();
						break;
					case "verify":
						this.onUpdatePhone();
						break;
					default :
						this.page = action.name;
						break;
				}
			},
			onSubmit() {
				console.log(this.address_type);
				// this.address_type = 'user'
				if(this.name == this.check_info.customerName.substr(1,2)){
					console.log("userID",this.getUserId)
					let params = {
						'gid':this.check_info.customerID,
						'userId':this.getUserId,
						'address':this.check_info.address,
						"type":this.user_type_tab[0]
					}
					this.$http.post("/Zn/ProfessionalWork/GasAccounts/Addition",params).then(value=>{
						this.name=""
						if(this.$route.query.b != 'address'){
							this.address_type = 'public'
						}else{
							this.address_type = 'user'
						}
						this.page = 'list'
						this.$vux.alert.show({
							title: '绑定成功',
						});
						this.SelectList()


					}).catch(err=>{
						console.log("err",err)
						this.$vux.alert.show({
							title: '绑定失败',
							content: "产权人姓名与地址不符合！"
						});
					})
				}else{
					this.$vux.alert.show({
						title: '验证失败',
						content: "产权人姓名输入错误或不完整！"
					});
				}
				// let data = {};
				// if( this.address_type == 'user' ){
				// 	if( !this.onCheckName() ){
				// 		this.$vux.alert.show({
				// 			title: '验证失败',
				// 			content: "产权人姓名输入错误或不完整！"
				// 		});
				// 	} else {
				// 		data.name = this.check_info.owner;
				// 		data.address_code = this.check_info.address_code;
				// 		data.address = this.check_info.address;
				// 		data.user_number = this.getUserInfo.slbh;
				// 		data.credentials_type = this.check_info.id_type;
				// 		data.credentials_number = this.getUserInfo.sfzh;
				// 		data.relationship = this.relation[0];
				// 		data.phone = this.getUser.phone;
				// 		let addrCodeHead = this.getUserInfo.addrCode.substr(0, 2);
				// 		data.area = (addrCodeHead == "75" || addrCodeHead == "76") ? "滨江" : "营业";
				// 		data.update = false;
				// 		if( this.getPlatform === "alipay" ){
				// 			data.src = "Z";
				// 		} else {
				// 			data.src = "Y";
				// 		}
				// 		if (this.relation[0] === "本人" && this.getUser.phone !== this.check_info.orig_phone) {
				// 			data.update = true;
				// 			data.phone += "," + this.check_info.orig_phone;
				// 		}

				// 		if (this.getUserInfo.sfzh_update) {
				// 			data.update = true;
				// 		}
				// 		this.onBind(data);
				// 	}
				// } else {
				// 	let that = this;
				// 	if( that.getPublicInfo.hasOwnProperty('CONTACTOR') && that.getPublicInfo.CONTACTOR ){
				// 		that.$vux.confirm.show({
				// 			title:'提示',
				// 			content:'是否确认绑定该地址？',
				// 			onConfirm: () => {
				// 				data.address = that.getPublicInfo.ADDRDETAIL;
				// 				data.name = that.getPublicInfo.CONTACTOR;
				// 				data.relationship = "公建";
				// 				data.area = (that.getPublicInfo.COMPANY == "08"?"滨江":"营业");
				// 				data.phone = that.getPublicInfo.PHONE;
				// 				data.number = that.public_number;
				// 				data.address_code = that.public_number;
				// 				data.company = that.getPublicInfo.CUSTNAME;
				// 				that.onBind(data);
				// 			}
				// 		});
				// 	} else {
				// 		that.$vux.alert.show({
				// 			title: '信息缺失',
				// 			content: '缺少联系人，无法绑定！'
				// 		});
				// 	}
				// }
			},
			onBind (data){
				let that = this;
				that.$vux.loading.show();
				that.$http.post('/client/' + that.getUserId + "/bind", JSON.stringify(data),{headers:{'Content-Type': 'application/json; charset=utf-8'}})
					.then( data =>{
						that.$vux.loading.hide();
						that.$vux.alert.show({
							title: '绑定成功',
							content: '地址绑定成功！',
							onHide () {
								that.onCancel();
								that.getClient();
							}
						});
					})
					.catch(err => {
						console.log(err);
						that.$vux.loading.hide();
						let content = "";
						if( err && err.response.status == 400 && err.response.data.indexOf('this address have binded max count accouts') > -1 ){
							content = "该用户地址已达到绑定次数上限！";
						} else if ( err && err.response.status == 400 && err.response.data.indexOf("record not exist yet") > -1){
							content = "该电话号码和受理编号已经绑定";
						} else {
							content = "绑定异常，请重试！";
						}
						that.$vux.alert.show({
							title: '绑定失败',
							content: content
						});
					});

			},
			unBind(account) {
				let that = this;
				that.$vux.confirm.show({
					title: '提示',
					content: '是否确认解绑位于' + account.address + '的地址？',
					onCancel : () => {},
					onConfirm : () =>{
						let data = {
							"address": account.address,
							"phone": account.phone,
							"user_number": (account.user_number || account.address_code)
						};
						if( account.hasOwnProperty("company") ){
							data["company"] = account.company;
						}
						// that.$http.post('/client/' + that.getUserId + '/unbind', JSON.stringify(data),{headers:{'Content-Type': 'application/json; charset=utf-8'}})
						// 	.then( data => {
						// 		that.getClient(()=> {
						// 			that.onSetUnbindButton();
						// 		});
						// 	})
						// 	.catch(err => {
						// 		console.log(err);
						// 		that.$vux.alert.show({
						// 			title: '错误',
						// 			content: "解绑失败，请重试！"
						// 		});
						// 	});
						this.$http.get("/Zn/ProfessionalWork/GasAccounts/untie?id="+account.id).then(value=>{
							that.$vux.alert.show({
								title: '成功',
								content: "解绑成功！"
							});
							this.SelectList()
						}).catch(err=>{
							console.log(err);
									that.$vux.alert.show({
										title: '错误',
										content: "解绑失败，请重试！"
									});
						})
					}
				});
			},
			onSelect (account){
				console.log(account);
				// console.log(this.action)

				let that = this;
				if( this.action != "address" ){
					let query = null;
					console.log( this.action.indexOf("public") == -1 )
					if( this.action.indexOf("public") == -1 ){

						query = {
							a:encodeURIComponent(account.address),
							ac:encodeURIComponent(account.address_code),
							p:this.getUser.phone,
							an:encodeURIComponent(account.name),
							uc:encodeURIComponent(account.user_number)
						};
						this.$refs['hidden'].addrFinished(account.address, account.address_code, null, this.action, () => {
							that.$router.push({
								path: that.action,
								query: account
							});
						});
					} else {
						query = {
							a:encodeURIComponent(account.address),
							cp:encodeURIComponent(account.company),
							p:this.getUser.phone,
							pn:encodeURIComponent(account.number),
							page_table:this.page_table
						};
						that.onCheckPublicDuplicate(account.address, this.action , (result) => {
							if( result ) {
								let path = '';
								let public_info_change = ['public_company_change','public_payment_change','public_company_rename','public_transfer','public_precancel','public_receipt_change'];
								if( public_info_change.indexOf(this.action) > -1){
									path = 'change';
									query['type'] = this.action;
								} else {
									path = this.action;
								}
								console.log("2222",query)
								this.$router.push({
									path: path,
									query: query
								});
							} else {
								that.$vux.alert.show({
									title:'提示',
									content:'您的业务申请正在处理中，请不要重复提交。'
								});
							}
						});

					}
				}
			},
			Select(account){
				console.log(account);
				account.page_table = this.page_table
				account.path = this.action
				// console.log(this.action)
				if(this.action == 'transfer_ownership' || this.action == 'bill'){
					this.$router.push({
						path: this.action,
						query: account
					});
				}else{
					this.$router.push({
						path: '/message',
						query: account
					});
				}

			},
			onSendVerifyCode (){
				let that = this;
				if( that.verify.phone && that.$refs.phone.valid ){
					if( that.reg_data.code && that.reg_data.code.trim().length ){
						that.$http.post('/public/verify_code',JSON.stringify(that.verify),{headers: {'Content-Type': 'application/json; charset=utf-8'}})
							.then( () => {
								(() =>{
									let timer = setInterval(function () {
										that.count_down--;
										if (that.count_down == 0) {
											that.count_down = 60;
											clearInterval(timer);
										}
									}, 1000);
								})();
							})
							.catch(err => {
								console.log(err);
								that.$vux.alert.show({
									title: '错误',
									content: '验证码发送失败，请稍后重试！'
								});
							});
					} else {
						that.$vux.toast.show({
							width: '18em',
							type: 'text',
							text: '请输入验证码！'
						});
					}

				}
			},
			onUpdatePhone (){
				let that = this;
				that.$vux.loading.show();
				that.$http.put("/client/" + that.getUid + "/update", JSON.stringify(that.verify),{headers: {'Content-Type': 'application/json; charset=utf-8'}})
					.then( () => {
						that.$vux.loading.hide();
						that.$vux.alert.show({
							title: '成功',
							content: '信息修改成功！',
							onHide: () => {
								that.$router.reload(true);
							}
						});
					})
					.catch(err => {
						console.log(err);
						that.$vux.loading.hide();
						that.$vux.alert.show({
							title: '更新失败',
							content: '号码更新失败,请检查手机号码以及验证码是否正确！',
						});
					});
			},
			onSetUnbindButton (){
				if( this.$refs.hasOwnProperty('address') ){
					let addresses = this.$refs['address'];
					for ( let a of addresses ) {
						if( this.edit ){
							a.open('right');
						} else {
							a.close();
						}
					}
				}
			},
			onCheckPublicDuplicate (address, action , callback){
				let that = this;
				that.$http.get('/todo/check?' + that.qs.stringify({"address": address, "action": action}))
					.then(res => {
						callback(res);
					})
					.catch(err => {
						console.log(err);
						callback(true);
					});
			},
			onCancel () {
				this.$router.go(-1)
			},
			onConfirm() {

				var that = this
				if (this.defaultValue == 'zm') {
					this.$refs['search'].addrRoomFinish("zm");

				}else {
					this.$refs['search'].addrRoomFinish('fzm');

				}
			}
		},
		watch: {
			'edit': 'onSetUnbindButton',
			'public_number' : function () {
				if( this.public_number && this.public_number.trim().length == 5 && /^\d+$/.test(this.public_number)){
					this.PublicInfo({code:this.public_number,vue:this});
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		&.no-height-warp {
			height: unset;
		}
		.edit {
			clear: both;
			position: relative;
			min-height: 25px;
			&:before, &:after {
				display: table;
				content: " ";
			}
			span {
				position: absolute;
				right: 0;
				top: 0;
			}
		}
		.right-cancel {
			position: absolute;
			right: 15px;
			color: #999;
			font-size: 15px;
			font-weight: unset;
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
		.bind-box {
			padding: 40px 10px;
			background-color: white;
			.bind-btn {
				height: 47px;
				border-radius: 47px;
				background-color: white;
				border: 1px solid #BFBFBF;
				color: #666;
				font-size: 15px;
				&.step_over {
					border: unset;
					&:after {
						border: unset;
					}
				}
			}
		}
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
		.owner-verify {
			box-shadow: -3px 4px 5px 0 rgba(6,80,127,0.14),3px -4px 5px 0 rgba(6,80,127,0.14);
			margin-bottom: 15px;
			/deep/ .weui-cell {
				padding-top: 14.5px;
				padding-bottom: 14.5px;
				color: #333;
			}
			.customerName-xing{
				width:20px;
				height:22px;
				font-size:16px;
				font-family:PingFang SC;
				font-weight:400;
				line-height:25px;
				color:rgba(51,51,51,1);
				opacity:1;
				border: none;
				background: white;
			}
			.customerName-ming{
				width:120px;
				height:20px;
				font-size:14px;
				font-family:PingFang SC;
				font-weight:400;
				line-height:25px;
				color:rgba(153,153,153,1);
				opacity:1;
				border: none;
				outline:none;
			}
			.send-code {
				font-size: 16px;
				color: #40A0FF;
				&.active {
					color: #aaa;
				}
			}
		}
		.action-groups {
			padding: 25px 25px 45px 25px;
			background-color: white;

			/deep/ .weui-btn_primary {
				background-color: #40A0FF;
			}
		}
	}
	.demo5-item {
		width: 100px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		border-radius: 3px;
		border: 1px solid #ccc;
		background-color: #fff;
		margin-right: 6px;
	}
	.demo5-item-selected {
		/*background: #ffffff url(../assets/demo/checker/active.png) no-repeat right bottom;*/
		border-color: #ff4a00;
	}
</style>
