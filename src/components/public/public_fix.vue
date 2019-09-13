<template>
    <div class="wrap">
		<CellBox class="bold-title" v-text="'请上传相关文件'"></CellBox>
		<photo :photo_data="[photo_data['file1']]" size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></photo>
		<div class="img-download" @click="onPreview">下载《工业、公建用户拆改申请表》</div>
		<CellBox class="bold-title" v-text="'请填写维修信息'"></CellBox>
		<group title=" ">
			<PopupPicker :value="item" :data="items" title="维修项目"
						 popup-title="维修项目" @on-change="onItemSelected"></PopupPicker>
			<x-input v-model="todo.owner" placeholder="请输入联系人姓名"
					 title="联系人" placeholder-align="right" text-align="right"></x-input>
			<x-input v-model="todo.owner_phone" placeholder="请输入联系电话"
					 title="联系电话" placeholder-align="right" text-align="right"></x-input>
		</group>
		<CellBox class="bold-title" v-text="'请选择维修单位'"></CellBox>
		<group title=" ">
			<checklist class="check-list" v-model="unit" :options="units" @on-change="onUnitChange" required></checklist>
		</group>
		<template v-if="todo.fix_item == '表具停用保留燃气设施及管道'">
			<CellBox class="bold-title" v-text="'请上传产权单位公章'"></CellBox>
			<photo :photo_data="[photo_data['picture']]" size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></photo>
			<CellBox class="bold-title" v-text="'请填写开票信息'"></CellBox>
			<group title=" ">
				<PopupPicker :value="receipt" :data="receipts" title="发票类型"
							 popup-title="发票类型" @on-change="onReceiptSelected"></PopupPicker>
				<x-input v-model="todo.receipt_invoice" placeholder="请输入发票抬头"
						 title="发票抬头" placeholder-align="right" text-align="right"></x-input>
				<x-input v-model="todo.tax_number" placeholder="请输入税号"
						 title="税号" placeholder-align="right" text-align="right"></x-input>
				<x-input v-model="todo.receipt_phone" placeholder="请输入联系电话"
						 title="联系电话" placeholder-align="right" text-align="right"></x-input>
				<template v-if="todo.receipt_type == '普通电子发票'">
					<x-input v-model="todo.receipt_owner" placeholder="请输入收件人姓名"
							 title="收件人" placeholder-align="right" text-align="right"></x-input>
				</template>
				<template v-else>
					<x-input v-model="todo.receipt_address" placeholder="请输入开户地址"
							 title="地址" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.receipt_bank" placeholder="请输入开户银行"
							 title="开户行" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.receipt_account" placeholder="请输入开户行账户"
							 title="账户" placeholder-align="right" text-align="right"></x-input>
				</template>
			</group>
		</template>
		<div class="warning-tip">*说明：普通发票会以电子发票的形式进行发送，专票则需用户前往相应营业厅网点自助打印。</div>
		<flexbox class="action-groups">
			<flexbox-item>
				<x-button type="primary" @click.native="onSubmit">提交</x-button>
			</flexbox-item>
		</flexbox>
		<div v-transfer-dom>
			<previewer :list="preview" ref="previewer" :options="preview_options"></previewer>
		</div>
		<img class="preview-img" :src="IMG_URL + '/static/public_fix.jpg'" v-show="false">
		<fix_footer :text="'咨询电话：967266'"></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer'
	import Photo from '../common/photo'
	import {Group, XInput, XButton, Flexbox, FlexboxItem, PopupPicker, Checklist, CellBox, Previewer, TransferDom} from 'vux'
	import {mapActions} from "vuex";
	export default {
		name: "publicFix",
		directives: {
			TransferDom
		},
		components:{
			fix_footer:Footer,
			photo:Photo,
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
					action:'public_fix',
					progress:'pending',
					public_hucode:'',
					public_company:'',
					address:'',
					area:'',
					fix_item:'燃气设施新增',
					owner:'',
					owner_phone:'',
					receipt_type:'普通电子发票',
					receipt_invoice:'',
					tax_number:'',
					receipt_address:'',
					receipt_bank:'',
					receipt_account:'',
					receipt_owner:'',
					receipt_phone:'',
					picture:'',
					file1:'',
					shops:[]
				},
				meters : [
					{
						"name":"G2.5、4",
						"stop":200,
						"model":["J2.5","QK2000G2.5","CG-YC-2.5","QK3000G2.5","QK2000G4","J4","CG-WLW-4","CG-WLW-2.5"]
					},
					{
						"name":"G6、G10",
						"stop":200,
						"model":["LMN-6","QK2000G6","CG-WLW-6","LMN-10","QK2000G10","QK1000G6"]
					},
					{
						"name":"G16",
						"stop":220,
						"model":["LMN-16","G16","TBQZ-25","QK2000G16","QK1000G16","LWQZ-III-25"]
					},
					{
						"name":"G25",
						"stop":350,
						"model":["LMN-25","G25","QK2000G25","QK1000G25"]
					},
					{
						"name":"G40",
						"stop":480,
						"model":["2M175","LMN-40","G40","TBQZ-50A","RM50-G40","LWQZ-III-50A"]
					},
					{
						"name":"G65",
						"stop":620,
						"model":["3M175","LMN-65","G65","LWQZ-III-50"]
					},
					{
						"name":"G100",
						"stop":810,
						"model":["5M175","G100","TBQZ-80A","LWQZ-III-80"]
					},
					{
						"name":"G160",
						"stop":810,
						"model":["7M175","G160-3","G160-4","TBQZ-80B","TBQZ-100A","Q160DN80","LWQZ-III-80","LWQZ-III-100A"]
					},
					{
						"name":"G250",
						"stop":900,
						"model":["11M175","G250","TBQZ-100B","Q250DN80","Q250DN100","LWQZ-III-100"]
					},
					{
						"name":"G400",
						"stop":900,
						"model":["16M175","G400","TM-100G400","TBQZ-150A","Q400DN150","Q400DN100","LWQZ-III-150A","LWQZ-III-100C","G400DN150"]
					},
					{
						"name":"G650",
						"stop":1300,
						"model":["TBQZ-150B","Q650DN150","LWQZ-III-150","G650DN150","QK2000G10","QK1000G6"]
					},
					{
						"name":"G1000",
						"stop":1700,
						"model":["TM150-G1000","Q1000DN200","Q1000DN150"]
					},
					{
						"name":"G1600",
						"stop":2250,
						"model":["TBQZ-200B","Q1600DN200"]
					}
				],
				item:['燃气设施新增'],
				items:[[
					'燃气设施新增',
					'燃气设施更换',
					'燃气设施及管道拆除',
					'燃气设施及管道移位',
					'表具停用不保留燃气设施及管道',
					'停用后复接手续',
					'表具停用保留燃气设施及管道',
					'故障表具维修',
					'其他',
				]],
				receipt:['普通电子发票'],
				receipts:[[
					'普通电子发票',
					'专用电子发票',
				]],
				unit: [],
				units:[],
				photo_data:{
					"file1" :{
						name: 'file1',
						src: '',
						loading: false
					},
					"picture" :{
						name: 'picture',
						src: '',
						loading: false
					},
				},
				preview:[{
					src:this.IMG_URL + '/static/public_fix.jpg',
					w:1600,
					h:2057
				}],
				preview_options:{
					getThumbBoundsFn (index) {
						let thumbnail = document.querySelectorAll('.preview-img')[index];
						let pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
						let rect = thumbnail.getBoundingClientRect();
						return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
					}
				},
				submit_userid:'',
				total_fee:0
			}
		},
		mounted: function () {
			let that = this;
			let query = that.$route.query;
			this.todo['public_hucode'] = query['pn'];
			this.todo['owner_phone'] = query['p'];
			this.todo['public_company'] = decodeURIComponent(query['cp']);
			this.todo['address'] = decodeURIComponent(query['a']);
			that.PublicInfo({
				vue:that,
				code:query.pn,
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
				'postTodo',
			]),
			onSetPublicInfo (info){
				this.todo['area'] = info.COMPANY == "08"?"滨江":"营业";
				let _meters = info.userinfo;
				for( let i = 0; i < _meters.length; i++ ){
					let stop_money = this.match_meter(_meters[i]);
					this.units.push({
						key:_meters[i].USERID.slice(-2),
						value:_meters[i].USERID.slice(-2) + '号表',
						inlineDesc:_meters[i].USERNAME.trim(),
						fee:stop_money
					});
				}
			},
			match_meter(meter) {
				let xhgg = meter.METERMODEL.trim().split(" ");
				for ( let m = 0; m < this.meters.length; m++ ){
					if( this.meters[m].model.indexOf(xhgg[0]) > -1 || this.meters[m].name.indexOf(xhgg[0]) > -1 || this.meters[m].model.indexOf(xhgg[1]) > -1){
						return this.meters[m].stop;
					}
				}
			},
			onItemSelected (value){
				this.item = value;
				this.todo.fix_item = value[0];
			},
			onReceiptSelected (value){
				this.receipt = value;
				this.todo.receipt_type = value[0];
			},
			onUnitChange (value){
				this.todo.shops = [];
				this.submit_userid = '';
				for ( let i = 0; i < value.length; i++ ){
					for ( let j = 0; j < this.units.length; j++ ){
						if ( value[i] == this.units[j].key ){
							this.todo.shops.push({
								fee:this.units[j].fee,
								name:this.units[j].inlineDesc,
								number:this.units[j].key
							});
							this.submit_userid += ("," + this.todo['public_hucode'] + this.units[j].key);
							this.total_fee += this.units[j].fee;
						}
					}
				}
			},
			onAddPhoto(name, data, photo) {
				this.todo[name] = data;
				this.photo_data[name] = photo;
			},
			onDeletePhoto(name) {
				this.todo[name] = '';
			},
			onPreview (){
				this.$refs['previewer'].show(0);
			},
			onSubmit (){
				if( this.todo.shops.length == 0 ){
					this.$vux.alert.show({
						title: '错误',
						content:'请选择需要进行维修的单位！'
					});
				} else {
					let that = this;
					that.upload({
						todo:that.todo,
						vue: that,
						success: (result) => {
							if( result.fix_item == "表具停用保留燃气设施及管道" ){
								result.amend_fee = "封堵费:" + that.total_fee;
								result.pay_info = {type:["封堵费"], name:"封堵费"};
							}
							let photos = [];
							for (let k in result){
								if( result.hasOwnProperty(k) &&  (typeof result[k] === 'string')  && result[k].indexOf('.jpg') > -1 ){
									photos.push({file:result[k]});
								}
							}
							result['public'] = {
								"service": "CreateBusi",
								"custid": that.todo.public_hucode,
								"custname":  that.todo.public_company,
								"location": that.todo.address,
								"phone": that.todo.owner_phone,
								"busitype": "拆改预约",
								"busitypeitem": that.todo.fix_item,
								"busidesc": that.todo.fix_item,
								"userid": that.submit_userid.substr(1),
								"photos": photos
							};
							that.postTodo({
								url: '/todo',
								vue: that,
								todo: result,
							});
						}
					});
				}
			}
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
