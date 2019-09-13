<template>
	<div class="wrap">
		<template v-if="change_type == 'public_company_change'">
			<template v-if="page == 'default'">
				<CellBox class="bold-title" v-text="'请上传相关文件'"></CellBox>
				<photo :photo_data="[photo_data['file1'],photo_data['file2']]" size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></photo>
				<div class="img-download" @click="onPreview('public_change')">下载《非居民用户产权单位受理卡》</div>
				<div class="img-download" @click="onPreview('public_contract')">下载《三方协议书》</div>
				<flexbox class="action-groups">
					<flexbox-item>
						<x-button type="primary" @click.native="page = 'info'">下一步</x-button>
					</flexbox-item>
				</flexbox>
			</template>
			<template v-else-if="page == 'info'">
				<CellBox class="bold-title" v-text="'请填写业务办理信息'"></CellBox>
				<group title=" ">
					<PopupPicker :value="old_public_company" :data="old_public_companys" title="原用气单位"
								 popup-title="原用气单位" @on-change="onOldSelected">
					</PopupPicker>
					<x-input v-model="todo.new_public_company" placeholder="请输入新用气单位名称"
							 title="新用气单位名称" placeholder-align="right" text-align="right"></x-input>
					<photo :photo_data="[photo_data['license1'],photo_data['license2']]" size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></photo>
				</group>
				<flexbox class="action-groups">
					<flexbox-item>
						<x-button type="primary" @click.native="page = 'default'">上一步</x-button>
					</flexbox-item>
					<flexbox-item>
						<x-button type="primary" @click.native="onSubmit">提交</x-button>
					</flexbox-item>
				</flexbox>
			</template>
		</template>
		<template v-if="change_type == 'public_payment_change'">
			<template v-if="page == 'default'">
				<CellBox class="bold-title" v-text="'请选择用气单位'"></CellBox>
				<group title=" " v-if="old_public_company[0]">
					<PopupPicker :value="old_public_company" :data="old_public_companys" title="用气单位"
								 popup-title="用气单位" @on-change="onOldSelected">
					</PopupPicker>
				</group>
				<CellBox class="bold-title" v-text="'请选择变更类型'"></CellBox>
				<group title=" ">
					<PopupPicker :value="type" :data="types" title="变更类型"
								 popup-title="变更类型" @on-change="onTypeSelected">
					</PopupPicker>
					<template v-if="todo.type !== '托收改现金'">
						<x-input v-model="todo.invoice_title" placeholder="请输入抬头全称"
								 title="抬头全称" placeholder-align="right" text-align="right"></x-input>
						<x-input v-model="todo.pay_account" placeholder="请输入新托收银行账号"
								 title="托收银行账号" placeholder-align="right" text-align="right"></x-input>
					</template>
				</group>
				<flexbox class="action-groups">
					<flexbox-item>
						<x-button type="primary" @click.native="onJudge">下一步</x-button>
					</flexbox-item>
				</flexbox>
			</template>
			<template v-if="page == 'file'">
				<CellBox class="bold-title" v-text="'请上传相关文件'"></CellBox>
				<photo :photo_data="[photo_data['file1']]" size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></photo>
				<div class="img-download" @click="onPreview('public_pay')">下载《非居民用户付款方式(付款账号)申请受理卡》</div>
				<flexbox class="action-groups">
					<flexbox-item>
						<x-button type="primary" @click.native="page = 'default'">上一步</x-button>
					</flexbox-item>
					<flexbox-item>
						<x-button type="primary" @click.native="onSubmit">提交</x-button>
					</flexbox-item>
				</flexbox>
			</template>
		</template>
		<template v-if="change_type == 'public_company_rename'"></template>
		<template v-if="change_type == 'public_transfer'"></template>
		<template v-if="change_type == 'public_precancel'"></template>
		<template v-if="change_type == 'public_receipt_change'"></template>
		<div v-transfer-dom>
			<previewer :list="preview" ref="previewer" :options="preview_options"></previewer>
		</div>
		<img class="preview-img" :src="src" v-show="false">
		<fix_footer :text="'咨询电话：967266'"></fix_footer>
	</div>
</template>

<script>
	import {mapActions, mapGetters} from "vuex";
	import Photo from '../common/photo'
	import Footer from '../common/footer'
	import {
		Group,
		XInput,
		XButton,
		Flexbox,
		FlexboxItem,
		PopupPicker,
		Checklist,
		CellBox,
		Previewer,
		TransferDom
	} from 'vux'

	export default {
		name: "publicChange",
		directives: {
			TransferDom
		},
		components: {
			fix_footer: Footer,
			photo: Photo,
			Group,
			XInput,
			XButton,
			Flexbox,
			FlexboxItem,
			PopupPicker,
			Checklist,
			CellBox,
			Previewer
		},
		data() {
			return {
				todo:{
					action:'',
					progress:'pending',
					public_hucode:'',
					public_company:'',
					address:'',
					area:'',
					owner:'',
				},
				change_type: '',
				page:'default',
				photo_data: {
					"file1": {
						name: 'file1',
						src: '',
						loading: false,
						rename: 'public_company_change_1'
					},
					"file2": {
						name: 'file2',
						src: '',
						loading: false,
						rename: 'public_company_change_2'
					},
					"license1": {
						name: 'license1',
						src: '',
						loading: false,
					},
					"license2": {
						name: 'license2',
						src: '',
						loading: false,
					},
				},
				preview: [],
				preview_options: {
					getThumbBoundsFn(index) {
						let thumbnail = document.querySelectorAll('.preview-img')[0];
						let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
						let rect = thumbnail.getBoundingClientRect();
						return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
					}
				},
				src: '',
				old_public_company:[],
				old_public_companys:[[]],
				type:['现金改托收'],
				types:[['现金改托收','托收改现金','托收账号变更']],
				user_id:''
			}
		},
		computed:{
			...mapGetters([
				'getUid',
				'getUserId',
				'getPlatform',
			]),
		},
		mounted: function () {
			let that = this;
			let query = that.$route.query;
			that.change_type = query.type;
			that.onSetTodoData(query.type);
			that.todo['action'] = query.type;
			that.todo['public_hucode'] = query['pn'];
			that.todo['owner_phone'] = query['p'];
			that.todo['public_company'] = decodeURIComponent(query['cp']);
			that.todo['address'] = decodeURIComponent(query['a']);
			that.PublicInfo({
				vue: that,
				code: query.pn,
				success: (info) => {
					that.onSetPublicInfo(info);
				},
				err: () => {
					that.$router.go(-1);
				}
			});
		},
		methods: {
			...mapActions([
				'PublicInfo',
				'upload',
				'postTodo'
			]),
			onSetTodoData(type) {
				switch (type) {
					case "public_company_change":
						this.todo['old_public_company'] = '';
						this.todo['new_public_company'] = '';
						break;
					case "public_payment_change":
						this.todo['old_public_company'] = '';
						this.todo['invoice_title'] = '';
						this.todo['pay_account'] = '';
						this.todo['type'] = '';
						this.photo_data['file1'].rename = 'public_payment_change_1';
						break;
					case "public_company_rename":
						break;
					case "public_transfer":
						break;
					case "public_precancel":
						break;
					case "public_receipt_change":
						break;
				}
			},
			onSetPublicInfo(info) {
				this.todo['area'] = info.COMPANY == "08"?"滨江":"营业";
				this.todo['owner'] = info.CONTACTOR;
				let _meters = info.userinfo;
				for ( let i = 0; i < _meters.length; i++ ){
					let old = _meters[i].USERID.slice(-2) + "-" + _meters[i].USERNAME.trim();
					this.old_public_companys[0].push(old);
					if( i == 0 ){
						this.old_public_company = [old];
						this.user_id = this.todo.public_hucode + old.split('-')[0];
						if( this.todo.hasOwnProperty('old_public_company') ){
							this.todo['old_public_company'] =_meters[i].USERNAME.trim();
						}
					}
					if( this.change_type == 'public_payment_change' ){
						this.onSetType(_meters[i].PAYTYPE);
					}
				}
			},
			onSetType (type){//付款方式变更判断哪些变更类型可选
				if( type == "现金" ){
					this.type = ['现金改托收'];
					this.types = [['现金改托收']];
				} else {
					this.type = ['托收账号变更'];
					this.types = [['托收改现金','托收账号变更']];
				}
			},
			onAddPhoto(name, data, photo) {
				this.todo[name] = data;
				this.photo_data[name] = photo;
			},
			onDeletePhoto(name) {
				this.todo[name] = '';
			},
			onPreview(name) {
				let previews = {
					'public_change': {
						src: this.IMG_URL + '/static/public_change.jpg',
						w: 2481,
						h: 3508
					},
					'public_contract': {
						src: this.IMG_URL + '/static/public_contract.jpg',
						w: 2481,
						h: 3508
					},
					'public_apply': {
						src: this.IMG_URL + '/static/public_apply.jpg',
						w: 2155,
						h: 2926
					},
					'public_pay': {
						src: this.IMG_URL + '/static/public_pay.jpg',
						w: 2481,
						h: 3508
					},
				};
				this.preview.splice(0,1,previews[name]);
				this.src = this.preview[0].src;
				this.$refs['previewer'].show(0);
			},
			onSubmit (){
				let that = this;
				that.upload({
					todo:that.todo,
					vue: that,
					success: (result) => {
						let photos = [];
						for (let k in result){
							if( result.hasOwnProperty(k) &&  (typeof result[k] === 'string')  && result[k].indexOf('.jpg') > -1 ){
								photos.push({file:result[k]});
							}
						}
						result['public'] = {
							"service": "ApplyModify",
							"custid": that.todo.public_hucode,
							"userid": that.user_id,
						};
						switch (that.change_type) {
							case "public_company_change":
								result['public']['olduser'] =   that.todo.old_public_company;
								result['public']['newuser'] =  that.todo.new_public_company;
								result['public']['photos'] = photos;
								result['public']['busitype'] = '用气单位变更';
								break;
							case "public_payment_change":
								result['public']['busitype'] = '付款方式变更';
								result['public']['paytype'] = that.todo.type;
								result['public']['photos'] = photos;
								if( that.todo.type == "托收账号变更" ){
									result['public'].username = that.todo.invoice_title;
									result['public'].account = that.todo.pay_account;
								}
								break;
							case "public_company_rename":
								break;
							case "public_transfer":
								break;
							case "public_precancel":
								break;
							case "public_receipt_change":

								break;
						}
						that.postTodo({
							url: '/todo',
							vue: that,
							todo: result,
							success: function (message) {
								if( that.change_type == 'public_payment_change' ){
									that.$vux.confirm.show({
										title:'提示',
										content:'是否需要更新开票信息内容？',
										confirmText: '前往更新',
										cancelText: '取消',
										onConfirm: () => {
											let query = that.$route.query;
											query['type'] = 'public_receipt_change';
											that.$router.replace({
												path:'change',
												query:{query}
											});
										},
										onCancel: () => {
											that.finish({message:message,vue: that});
										}
									});

								} else {
									that.finish({message:message,vue: that});
								}
							}
						});
					}
				});
			},
			onOldSelected (value){
				let info = value[0].split('-');
				this.old_public_company = value;
				this.todo.old_public_company = info[1];
				this.user_id = this.todo.public_hucode + info[0];
			},
			onTypeSelected (value){
				this.type = value;
				this.todo.type = value[0];
			},
			onJudge (){
				let that = this;
				if( that.type[0] != "托收改现金"){
					if( !that.todo.pay_account || !that.todo.pay_account.trim() ){
						that.$vux.alert.show({
							title:'提示',
							content:'请输入新托收银行账号！'
						});
					} else if ( !that.todo.invoice_title || !that.todo.invoice_title.trim() ){
						that.$vux.alert.show({
							title:'提示',
							content:'请输入抬头全称！'
						});
					} else {
						that.$http.post('/platform/njdys/transmit',JSON.stringify({"service":"CheckAccount","account":that.todo.pay_account}))
							.then(data => {
								if( data ){
									if( data.state == "1" ){
										that.page = 'file';
									} else {
										that.$vux.confirm.show({
											title:'无法在线办理',
											content:'该银行账号未办理过托收业务，无法在线办理。请前往最近的杭燃营业厅领取一户通托收协议书并前往账号对应的银行受理。',
											confirmText: '查看附近营业厅',
											cancelText: '返回首页',
											onConfirm: () => {
												that.$router.replace({
													path:'info',
													query:{name:'navigation'}
												});
											},
											onCancel: () => {
												that.$router.replace({
													path:'index',
													query:{uid:that.getUid, user_id: that.getUserId, platform: that.getPlatform}
												});
											}
										});
									}
								} else {
									showAlert(data.errmsg, "错误", null);
									that.$vux.alert.show({
										title:'错误',
										content:data.errmsg
									});
								}
							})
							.catch(err => {
								console.log(err);
								that.$vux.alert.show({
									title:'错误',
									content:'网络错误，请重试！'
								});
							});
					}
				} else
					this.page = "file";
			}
		},
		beforeRouteEnter: function (to, from, next) {
			let title = '';
			switch (to.query.type) {
				case "public_company_change":
					title = '用气单位变更';
					break;
				case "public_payment_change":
					title = '付款方式变更';
					break;
				case "public_company_rename":
					title = '产权单位更名';
					break;
				case "public_transfer":
					title = '过户预约';
					break;
				case "public_precancel":
					title = '销户预约';
					break;
				case "public_receipt_change":
					title = '开票资料变更';
					break;
			}
			document.title = title;
			next();
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		height: unset;
		padding-bottom: 50px;
		/deep/ .weui-cell {
			padding-top: 14.5px;
			padding-bottom: 14.5px;
			color: #333;
		}
		.bold-title {
			&:not(:first-child) {
				&:before {
					border: unset !important;
				}
			}
		}
	}
</style>
