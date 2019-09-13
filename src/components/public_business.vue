<!-- 装表 点火 通气 燃气拆改  新增用气设备   -->
<template>
	<div>
	<div class='wraps'>
    <div class="addres-title" v-if="public_business">
      <p>{{public_business[0].address}}</p>
    </div>
    <div style="height:8px;background:rgba(243,245,247,1);"></div>
    <div class="main">
      <template class="put-table" v-if=" this.page == 'put-table' ">
         <div class="box clearfix">
          <h3>开通项目</h3>
          <checker v-model="Checkbox" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" v-for="(item,index) in putTableList" :key="index">
            <checker-item :value="item">{{item}}</checker-item>
          </checker>
          <x-textarea v-model="others"  name="detail" placeholder="别的要求可以在这里备注哦!" :show-counter="false" :height="135"></x-textarea>
        </div>
        <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:30px;" @click.native="onBusiness" :disabled="awaitBoolean">提交</x-button>
      </template>
      <template class="ignition" v-else-if=" this.page == 'ignition'">
         <div class="box clearfix">
          <h3>开通项目</h3>
          <checker v-model="Checkbox" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" v-for="(item,index) in ignitionList" :key="index">
            <checker-item :value="item">{{item}}</checker-item>
          </checker>
          <x-textarea v-model="others"  name="detail" placeholder="别的要求可以在这里备注哦!" :show-counter="false" :height="135"></x-textarea>
          <x-switch title="已开通表具" v-model="switching"></x-switch>
          <Photo :photo_data="[photo_data['ignition']]"  @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto" v-if="switching"></Photo>
        </div>
        <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:30px;" @click.native="onIgnition" :disabled="awaitBoolean">提交</x-button>
      </template>
      <template class="ventilation" v-else-if=" this.page == 'ventilation'">
        	<group title=" ">
            	<selector ref="defaultValueRef" title="省份" :options="list" v-model="defaultValue"></selector>
          	<x-input v-model="todo.housing"
							 title="小区" placeholder="请输入小区名称" placeholder-align="right" text-align="right"></x-input>
          </group>

         <div class="box clearfix">
          <h3>通气设备</h3>
          <checker v-model="Checkbox" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" v-for="(item,index) in ignitionList" :key="index">
            <checker-item :value="item">{{item}}</checker-item>
          </checker>
          <group >
            <h3>身份证信息</h3>
            <Photo :photo_data="[photo_data['owner_id_front'],photo_data['owner_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
            <x-input v-model="todo.owner_id"
              title="身份证号" placeholder="身份证号码" placeholder-align="right" text-align="right"></x-input>
          </group>
            <h3>供气合同</h3>
            <Photo :photo_data="[photo_data['gas_Supply']]"  @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto" ></Photo>
             <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:30px;" :disabled="awaitBoolean">提交</x-button>
        </div>

      </template>
      <template class="demolition" v-else-if=" this.page == 'demolition'">
        <div class="box clearfix">
          <h3>拆改类型</h3>
          <checker v-model="demolitionList_Checkbox" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" v-for="(item,index) in demolitionList" :key="index">
            <checker-item :value="item">{{item}}</checker-item>
          </checker>
          <x-textarea v-model="others"  name="detail" placeholder="别的要求可以在这里备注哦!" :show-counter="false" :height="135"></x-textarea>
        </div>
        <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:30px;" @click.native="demolition" :disabled="awaitBoolean">提交</x-button>

      </template>
      <template class="demolition" v-else-if=" this.page == 'new-gas'">
        <div class="box clearfix">
          <h3>开通项目</h3>
          <checker v-model="Checkbox" type="checkbox" default-item-class="demo1-item" selected-item-class="demo1-item-selected" v-for="(item,index) in ignitionList" :key="index">
            <checker-item :value="item">{{item}}</checker-item>
          </checker>
			<x-textarea v-model="others"  name="detail" placeholder="别的要求可以在这里备注哦!" :show-counter="false" :height="135"></x-textarea>
          <Photo :photo_data="[photo_data['ignition']]"  @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto" ></Photo>
        </div>
        <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:50px;" @click.native="newGas" :disabled="awaitBoolean">提交</x-button>

      </template>
    </div>

  </div>
  </div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
  import {Group, Checker, CheckerItem,  Flexbox, FlexboxItem,XTextarea,XButton,	XSwitch,Selector ,XInput} from 'vux'
	import {mapActions, mapGetters, mapMutations} from "vuex";
  import Photo from './common/photo'
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
      Checker,
      CheckerItem,
       Flexbox, FlexboxItem,XTextarea,XButton,	XSwitch,Selector,XInput,Group,
      Photo: Photo,
    },
		data() {
			//这里存放数据
			return {
				todo: {
				  housing:'',
				  owner_id:'',
				  owner_id_front: '',
							owner_id_back: '',
				},
				public_business:"",
				page:'put-table',
				area:"",
				switching:false,
				awaitBoolean:false,
				Checkbox:['灶具'],
				demolitionList_Checkbox:['燃气表仪位置'],
				putTableList: ['灶具','热水器','地暖','其他'],
				ignitionList:['灶具','热水器(<16L)','热水器(>16L)','热水器(=16L)','地暖(<32kw)','地暖(≥32kw)','其他'],
				demolitionList:['燃气表移位','热水器移位','表后管改动','拆热水器气管','表前管改动','其他'],
				others:"",
				busiName:"",
				busiId:1,
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
				defaultValue: 'gd',
				list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
				meter_photo:""

			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {

			console.log("c参数",this.$route.params)
			// this.page = this.$route.query.page_table
			this.public_business = this.$route.params.params
			this.page = this.public_business[0].page_table
			this.area = '小区'
			if(this.public_business[0].page_table == 'put-table'){
				this.busiName='装表申请(居民)'
				this.busiId= 5
			}else if(this.public_business[0].page_table=='ignition'){
					this.busiName='点火申请(居民)'
					this.busiId= 6

			}else if(this.public_business[0].page_table=='demolition'){
				this.busiName='燃气拆改(居民)'
				this.busiId= 3

			}else if(this.public_business[0].page_table=='new-gas'){
				this.busiName='补开增容(居民)'
				this.busiId= 10

			}

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
			])
		},
		methods:{
			onBusiness(){
				console.log("Checkbox",this.Checkbox)
				let params= {
					'userId':this.getUserId,
					'platform':this.getPlatform,
					'busiName':this.busiName,
					'busiId':this.busiId,
					'type':this.public_business[0].type,
					'gid':this.public_business[0].gid,
					'address':this.public_business[0].address,
					'phone':this.public_business[1].phone,
					'idNumber':this.public_business[1].id_number,
					'gname':this.public_business[1].gname,
					'area':this.area,
					'meterId':"",
					'others':{
						'details':{
							'contact':this.public_business[1].contact,
							'devices':{
								'options':this.Checkbox
							},
							'other_device':this.others,
							'id_photo':this.public_business[2]
						}

					}

				}
				console.log("数据",params)
				this.awaitBoolean = true
				this.$http.post('/Zn/ProfessionalWork/Business/Addition',params).then(value=>{
					this.$vux.alert.show({
						width: '18em',
						type: 'text',
						text: '申请提交成功！'
					});
					this.$router.push({
						path:'/apply_success',
						query:params
					})
				}).catch(err=>{
					console.log('err',err)
					this.$vux.alert.show({
						title: '错误',
						content: '申请提交失败！'
					});
				})

			},
			onIgnition(){
				console.log("Checkbox",this.Checkbox)
				console.log("switching",this.switching)
				this.awaitBoolean = true

				let meter = ''
				if(this.switching && this.meter_photo){
					meter = '已安装'
				}else{
					meter = '未安装'
				}
				let params= {
					'userId':this.getUserId,
					'platform':this.getPlatform,
					'busiName':this.busiName,
					'busiId':this.busiId,
					'type':this.public_business[0].type,
					'gid':this.public_business[0].gid,
					'address':this.public_business[0].address,
					'phone':this.public_business[1].phone,
					'idNumber':this.public_business[1].id_number,
					'gname':this.public_business[1].gname,
					'area':this.area,
					'meterId':"",
					'others':{
						'details':{
							'contact':this.public_business[1].contact,
							'devices':{
								'options':this.Checkbox
							},
							'other_device':this.others,
							'id_photo':this.public_business[2],
							'meter_photo':this.meter_photo,
							'meter':meter
						}

					}

				}
				console.log("数据",params)
				this.$http.post('/Zn/ProfessionalWork/Business/Addition',params).then(value=>{
					this.$vux.alert.show({
						width: '18em',
						type: 'text',
						text: '申请提交成功！'
					});
					this.$router.push({
						path:'/apply_success',
						query:params
					})
				}).catch(err=>{
					console.log('err',err)
					this.$vux.alert.show({
						title: '错误',
						content: '申请提交失败！'
					});
				})
				// this.$router.push({
				// 	path:'/apply_success',
				// 	query:params
				// })
			},
			demolition(){
				console.log("Checkbox",this.Checkbox)
				this.awaitBoolean = true
				let params= {
					'userId':this.getUserId,
					'platform':this.getPlatform,
					'busiName':this.busiName,
					'busiId':this.busiId,
					'type':this.public_business[0].type,
					'gid':this.public_business[0].gid,
					'address':this.public_business[0].address,
					'phone':this.public_business[1].phone,
					'idNumber':this.public_business[1].id_number,
					'gname':this.public_business[1].gname,
					'area':this.area,
					'meterId':"",
					'others':{
						'details':{
							'contact':this.public_business[1].contact,
							'devices':{
								'options':this.demolitionList_Checkbox
							},
							'other_device':this.others,
						}

					}

				}
				console.log("数据",params)
				this.$http.post('/Zn/ProfessionalWork/Business/Addition',params).then(value=>{
					this.$vux.alert.show({
						width: '18em',
						type: 'text',
						text: '申请提交成功！'
					});
					this.$router.push({
						path:'/apply_success',
						query:params
					})
				}).catch(err=>{
					console.log('err',err)
					this.$vux.alert.show({
						title: '错误',
						content: '申请提交失败！'
					});
				})
			},
			newGas(){
				console.log("Checkbox",this.Checkbox)
				console.log("switching",this.switching)
				this.awaitBoolean = true
				let params= {
					'userId':this.getUserId,
					'platform':this.getPlatform,
					'busiName':this.busiName,
					'busiId':this.busiId,
					'type':this.public_business[0].type,
					'gid':this.public_business[0].gid,
					'address':this.public_business[0].address,
					'phone':this.public_business[1].phone,
					'idNumber':this.public_business[1].id_number,
					'gname':this.public_business[1].gname,
					'area':this.area,
					'meterId':"",
					'others':{
						'details':{
							'contact':this.public_business[1].contact,
							'devices':{
								'options':this.Checkbox
							},
							'other_device':this.others,
							'device_photo':this.meter_photo,
						}

					}

				}
				console.log("数据",params)
				if(this.meter_photo == ''){
					this.$vux.alert.show({
						width: '18em',
						type: 'text',
						text: '请上传图片！'
					});
				}else{
					this.$http.post('/Zn/ProfessionalWork/Business/Addition',params).then(value=>{
						this.$vux.alert.show({
							width: '18em',
							type: 'text',
							text: '申请提交成功！'
						});
						this.$router.push({
							path:'/apply_success',
							query:params
						})
					}).catch(err=>{
						console.log('err',err)
						this.$vux.alert.show({
							title: '错误',
							content: '申请提交失败！'
						});
					})
				}

			},
			onAddPhoto (index,name,n) {
				console.log("index",index,name,n)
				this.meter_photo= n
			},
			onDeletePhoto() {}

		},
		beforeCreate() {}, //生命周期 - 创建之前
		beforeMount() {}, //生命周期 - 挂载之前
		beforeUpdate() {}, //生命周期 - 更新之前
		updated() {}, //生命周期 - 更新之后
		beforeDestroy() {}, //生命周期 - 销毁之前
		destroyed() {}, //生命周期 - 销毁完成
		activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
	}

</script>
<style lang='less' scoped>
  //@import url(); 引入公共css类
  .wraps{
    height: 100%;
    background: #fff;
  }
  .addres-title{
    background: #fff;
    p{
        width: 90%;
      margin: 0 auto;
      font-size:20px;
      padding: 15px 0;
      font-weight:bold;
    }
  }
  .main{
    background: #fff;
    // margin-top: 10px;
        padding-bottom: 30px;
  }
  .box{
    width: 90%;
    margin: 0 auto;
    h3{
      padding: 10px 0;
    }
    /deep/ .vux-checker-box{
      display: inline-block;
      width: 48%;;
    }
    /deep/ .weui-cell{
      padding: 0;
      margin-top: 20px;
      margin-bottom: 10px;
      &::before{
        border: none;
      }
    /deep/ .weui-switch:checked{
      background: #007BD9;
      border-color:#007BD9;
    }

    }

    // /deep/ .weui-cells__title{
    //   font-size:18px;
    //   font-weight:bold;
    //   color:rgba(51,51,51,1);
    // }

    /deep/ .weui-cell__bd{
      textarea{
         background:rgba(249,249,249,1)
      }

    }
    div:nth-child(2n){
      margin-right: 2%;
      margin-bottom: 2%;
    }
  }
  .clearfix::after{
    content:"";
    display:block;
    height: 0;
    visibility: hidden;
    clear:both;
  }
  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
    background: #E4EDF3;
    color: #838A98;
    width: 100%;
    text-align: center;
    font-size:16px;
    border-radius: 3px;
  }
  .demo1-item-selected {
    background: #007BD9;
    color: #fff;
  }
</style>
