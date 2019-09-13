<!-- 销户  安检 -->
<template>
	<div class='wraps'>
    <div class="title" v-if="cancel">
      <h3>{{cancel[0].address}}</h3>
    </div>
     <div style="height:8px;background:rgba(243,245,247,1);"></div>
    <div class="main">
      <template v-if=" this.page == 'cancel'">
        <!--<x-input v-model="todo.phone"-->
					 <!--title="联系方式" placeholder="请输入你的联系方式" placeholder-align="right" text-align="right"></x-input>-->
        <x-textarea v-model="others"  name="detail" placeholder="您销户的原因!" :show-counter="false" :height="135"></x-textarea>
		  <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:50px;" @click.native="onSeclctCancel" :disabled="awaitBoolean">提交</x-button>
      </template>
      <template v-else>
        <x-textarea v-model="others"  name="detail" placeholder="安检内容!" :show-counter="false" :height="135"></x-textarea>
		  <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:50px;" @click.native="onSeclct" :disabled="awaitBoolean">提交</x-button>

      </template>

    </div>
  </div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
  import {XButton,XInput,XTextarea} from 'vux'
	import {mapActions, mapGetters, mapMutations} from "vuex";

	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
      XButton,XInput,XTextarea
    },
		data() {
			//这里存放数据
			return {
				page:'cancels',
				todo:{
				  phone: ''
				},
				cancel:null,
				area:'',
				busiName:"",
				busiId:1,
				others:"",
				awaitBoolean : false

			};
		},
		//监听属性 类似于data概念
		computed: {
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
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			onSeclct(){
				let params= {
					'userId':this.getUserId,
					'platform':this.getPlatform,
					'busiName':this.busiName+'('+this.cancel[0].type+')',
					'busiId':this.busiId,
					'type':this.cancel[0].type,
					'gid':this.cancel[0].gid,
					'address':this.cancel[0].address,
					'phone':this.cancel[1].phone,
					'idNumber':this.cancel[1].id_number,
					'gname':this.cancel[1].gname,
					'area':this.area,
					'meterId':"",
					'others':{
						'details':{
							'contact':this.cancel[1].contact,
							'other_device':this.others,
							'id_photo':this.cancel[2]
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
			onSeclctCancel(){
				let params= {
					'userId':this.getUserId,
					'platform':this.getPlatform,
					'busiName':this.busiName+'('+this.cancel[0].type+')',
					'busiId':this.busiId,
					'type':this.cancel[0].type,
					'gid':this.cancel[0].gid,
					'address':this.cancel[0].address,
					'phone':this.cancel[1].phone,
					'idNumber':this.cancel[1].id_number,
					'gname':this.cancel[1].gname,
					'area':this.area,
					'meterId':"",
					'others':{
						'details':{
							'contact':this.cancel[1].contact,
							'other_device':this.others,
							'id_photo':this.cancel[2]
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
			}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			console.log("data",this.$route.params.params)
			this.cancel = this.$route.params.params
			this.page = this.cancel[0].page_table
			this.area = '小区'
			if(this.cancel[0].page_table == 'cancel'){
				this.busiName='销户申请'
				this.busiId= 13
			}else {
				this.busiName='安检申请'
				this.busiId= 15
			}
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
  .title{

    padding: 15px ;
  }
  .main{
    height: 100%;
    background: #fff;
    // width: 90%;
    // margin: 0 auto;
     /deep/ .weui-cell__bd{
      textarea{
        margin-top: 15px;
         background:rgba(249,249,249,1)
      }
    /deep/ .vux-x-switch::after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid red;
        color: #D9D9D9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 15px;
    }
    }
  }
</style>
