<!-- 管道更换 -->
<template>
	<div class='wraps '>
    <div class="title" v-if="pipeline">
      <h3>{{pipeline[0].address}}</h3>
    </div>
      <div style="height:8px;background:rgba(243,245,247,1);"></div>
    <div class="main">

      <x-switch title="连接管已准备" v-model="switching"></x-switch>
		<div v-if="!switching">
			<div style="margin-right: 10px; ">
			<span class="title">
			连接管长度：
		</span>

				<div class="piple">
					<checker
						v-model="demo5"
						default-item-class="demo5-item"
						selected-item-class="demo5-item-selected"
					>
						<checker-item v-for="value in putTableList" :key="value" :value="value">{{value}}</checker-item>
					</checker>
				</div>
			</div>

			<div class="input">
				<input v-model="others" type="text" placeholder="自定义长度">米
			</div>
		</div>



      <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:100px;" @click.native="onSeclct" :disabled="disabled">提交</x-button>

    </div>
  </div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
  import {XButton,XSwitch,XInput,Group,Checker, CheckerItem,} from 'vux'
	import {mapActions, mapGetters, mapMutations} from "vuex";
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
      XButton,XSwitch,XInput,Group,Checker, CheckerItem,
    },
		data() {
			//这里存放数据
			return {
				todo:{
				  phone:''
				},
				switching:true,
				demo5: '',
				putTableList: ['1米','1.5米','2米'],
				pipeline:null,
				area:'小区',
				busiName:'灶具链接管更换',
			    busiId: 16,
				others:"",
				disabled:false
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
				let pipe= '';
				if(this.switching){
					pipe = '已准备'
				}else{
					pipe = '未准备'
				}
				this.disabled = true
				let params= {
					'userId':this.getUserId,
					'platform':this.getPlatform,
					'busiName':this.busiName+'('+this.pipeline[0].type+')',
					'busiId':this.busiId,
					'type':this.pipeline[0].type,
					'gid':this.pipeline[0].gid,
					'address':this.pipeline[0].address,
					'phone':this.pipeline[1].phone,
					'idNumber':this.pipeline[1].id_number,
					'gname':this.pipeline[1].gname,
					'area':this.area,
					'meterId':"",
					'others':{
						'details':{
							'contact':this.pipeline[1].contact,
							'pipe':pipe,
							'pipe_len':this.demo5,
							'other_pipe_len':this.others,
							'id_photo':this.pipeline[2]
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
			console.log("c参数",this.$route.params)
			// this.page = this.$route.query.page_table
			this.pipeline = this.$route.params.params
			this.area = '小区'
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
	.piple{
		width: 56%;
		display: inline-block;
	}
	.input{
		width: 110px;
		margin: 10px;
		/*border: 1px solid red;*/
		float: right;
		margin-top: 20px;
		input{


			opacity:1;
			width: 80px;
			height: 30px;
			margin-right: 5px;
			border: none;
			border-bottom:1px solid rgba(212,212,212,1);
			outline: none;
			text-align: right;
		}
	}
	.demo5-item {
		width: 28%;
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
  .main{
     /deep/ .weui-switch:checked{
      background: #007BD9;
      border-color:#007BD9;
    }
    /deep/ .weui-cell:before{
      border-top: none;
    }
    .weui-cell:after{
          content: " ";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #D9D9D9;
      color: #D9D9D9;
      -webkit-transform-origin: 0 0;
      transform-origin: 0 0;
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      left: 15px;
    }
  }
</style>
