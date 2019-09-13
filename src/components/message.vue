<template>
	<div class="body">
		<div  class="userAgreementWrap">
			<confirm v-model="prompt"
					 title="用户须知"
					 :close-on-confirm=false
					 @on-cancel="onCancel"
					 @on-confirm="onConfirm"
			>
				<x-icon class="closeIcon" type="ios-close-empty" size="30" @click.native="close"  style="position: absolute;top: 5%;right: 5%;" ></x-icon>
				<div style="border-top:1px solid #DCDCDC;margin-bottom:15px;"></div>
				<div class="userAgreement">
					<div class="content">
						{{text}}
					</div>
					<!--<div style="text-align:left; margin-top:15px;">-->
						<!--<label for=""><input type="checkbox" v-model="checkState">我同意</label>-->
					<!--</div>-->
				</div>
			</confirm>
		</div>
		<div class="text-address">
			<group>
				<cell :title="query.address" value="" is-link></cell>
			</group>
		</div>
		<div>
			<group>
				<x-input title="客户编号"  :value="query.gid" is-type="label" disabled></x-input>
				<x-input title="客户姓名" name="username" v-model="username_info.gname" placeholder="请输入姓名" is-type="china-name" ></x-input>
				<x-input title="手机号码" name="phone" v-model="username_info.phone" placeholder="请输入手机号码" is-type="china-mobile"></x-input>
				<x-input title="身份证号" name="id_number" v-model="username_info.id_number" placeholder="请输入身份证号码" is-type="id_number" :max="18" :min="18"></x-input>
				<x-input title="联系电话" name="number" v-model="username_info.contact" placeholder="请输入联系电话" is-type="phone"></x-input>
			</group>
			<div v-if="this.boolean">
				<div class="idCard">身份证照片</div>
				<Photo :photo_data="[photo_data['owner_id_front'],photo_data['owner_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto" ></Photo>
			</div>

			<div class="btn">
				<button @click="service()">下一步</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Group, Cell, CellBox ,XInput,Icon, Confirm,} from 'vux'
	import Photo from './common/photo'
    export default {
        name: "message",
		data(){
        	return {
				query:"",
				username_info:{
					'gname':"",
					'phone':"",
					'id_number':'',
					'contact':'',
					'id_photo':''
				},
				text:"",
				prompt:false,
				boolean:false,
				photo_data : {
					'gas_Supply':{
						name: 'gas_Supply',
						src: '',
						loading: false
					},
					"ignition" :{
						name: 'ignition',
						src: '',
						loading: false
					},
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
				},
				page_table:"",
				meter_photo:[]
			}
		},
		components:{
			Group,
			Cell,
			CellBox,
			XInput,
			Icon,
			Confirm,
			Photo
		},
		mounted(){
        	console.log("query",this.$route.query)
			this.query = this.$route.query
			this.page_table = this.$route.query.page_table
			this.judgement(this.page_table)
			if(this.$route.query.page_table == 'put-table'){
				this.text = '该功能模块仅适用于需要安装燃气表而不需开通的用户。提醒：XXXX（该内容各公司可自行配置）'
			}else if(this.$route.query.page_table == 'ignition'){
				this.text = '本功能适用于首次申请点火通气的燃气居民客户。若已开通灶具，需要再申请开通热水器或地暖锅炉，请在绑定户号后选择补开增容业务进行申请。'
			}
		},
		methods:{
			onCancel () {
				this.$router.go(-1)

			},
			onConfirm () {
				console.log("8999")
				this.prompt = false
				console.log("3666",this.prompt)

			},
			close () {
				this.$router.go(-1)
			},
			//跳转业务
			service(){

				if(this.username_info.gname&&this.username_info.phone&&this.username_info.id_number&&this.username_info.contact&&this.meter_photo){
					let params = []
					params.push(this.query)
					params.push(this.username_info)
					params.push(this.meter_photo)

					this.$router.push({
						name:this.query.path,
						params:{
							params:params
						}
					})
				}else if(this.username_info.gname&&this.username_info.phone&&this.username_info.contact&&this.page_table == 'demolition'){
					let params = []
					params.push(this.query)
					params.push(this.username_info)
					this.$router.push({
						name:this.query.path,
						params:{
							params:params
						}
					})
				}else{
					this.$vux.toast.show({
						type:'text',
						text: '信息输入不完整！'
					})
				}
			},
			//添加图片
			onAddPhoto (index,name,src) {
				console.log("index", index, name, src)
				if (this.meter_photo[0]) {
					this.meter_photo[1] = src
				} else
				{
					this.meter_photo[0]= src
				}

				console.log("身份证照片",this.meter_photo)
			},
			//判断input是否显示
			judgement(name){
				if(name == 'put-table'|| name == 'ignition'){
					this.prompt= true
					this.boolean = true
				}else{
					this.prompt = false
					this.boolean = false
					if(this.$route.query.path == 'pipeline_replacement' || this.$route.query.path == "cancel"){
						// this.prompt= true
						this.boolean = true
					}
					console.log("87888")
				}
			},
			onDeletePhoto() {}


		}
    }
</script>

<style lang="less" scoped>
	.body{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	/deep/ .weui-cells{
		margin: 0px;
		padding: 10px 0;
	}
	/deep/ .weui-label{
		padding: 5px 0;
		font-size:16px;
		font-family:PingFang SC;
		font-weight:400;
		line-height:22px;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	/deep/ .weui-input{
		font-size:16px;
		font-family:PingFang SC;
		font-weight:400;
		line-height:22px;
		color:rgba(51,51,51,1);
		opacity:1;
		text-align: right;
	}
	.idCard{
		margin:0px 15px;
		background-color: white;
	}

.text-address {
	font-size:20px;
	font-family:PingFang SC;
	font-weight:bold;
	line-height:28px;
	color:rgba(51,51,51,1);
	opacity:1;
}
	.btn{
		margin: 50px 28px ;
		button{
			width: 100%;
			height: 45px;
			background:rgba(64,160,255,1);
			opacity:1;
			border-radius:3px;
			border: none;
			font-size:18px;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(255,255,255,1);
			opacity:1;
		}
	}
</style>
