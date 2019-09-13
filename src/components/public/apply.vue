<!-- 报装 -->
<template>
	<div class=''>
      <div class="main">
        <div>
          <h3>基本信息</h3>
          <x-input v-model="todo.phone"
          title="用户名称" placeholder="请输入用户名称" placeholder-align="right" text-align="right"></x-input>
          <x-input v-model="todo.phone"
          title="店/商铺" placeholder="请输入店/商铺名称" placeholder-align="right" text-align="right"></x-input>
          <x-input v-model="todo.phone"
          title="地址" placeholder="请输入你店/商地址" placeholder-align="right" text-align="right"></x-input>   
          <x-input v-model="todo.phone"
          title="联系电话" placeholder="请输入联系电话" placeholder-align="right" text-align="right"></x-input>
        </div>
        <div>
          <h3>营业执照</h3>
          <photo :photo_data="[photo_data['license1']]" size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></photo>
        </div>
        <div>
          <h3>法定代表人身份证信息</h3>
          <Photo :photo_data="[photo_data['owner_id_front'],photo_data['owner_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
          <x-input v-model="todo.owner_id"
            title="身份证号" placeholder="身份证号码" placeholder-align="right" text-align="right"></x-input>
        </div>
        <div>
          <h3>经办人身份信息</h3>
          	<Photo :photo_data="[photo_data['agent_id_front'],photo_data['agent_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
            <x-input v-model="todo.owner_id"
            title="身份证号" placeholder="身份证号码" placeholder-align="right" text-align="right"></x-input>
        </div>
        <div class="consent" style="text-align:center; margin-top:15px;"> 
						<label for=""><input type="checkbox">我已阅读<span>《服务指南》,</span><span>《燃气安装须知》</span></label>
					</div>
         <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:50px;">提交</x-button>    
      </div>
  </div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
    import {XButton,XSwitch,XInput,Group} from 'vux'
     import Photo from '../common/photo'
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
      XButton,XSwitch,XInput,Group,
        Photo: Photo,
    },
		data() {
			//这里存放数据
			return {
        todo:{
          phone:'',
          owner_id:''
        },
        photo_data: {
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
					"agent_id_front" :{
						name: 'agent_id_front',
						src: '',
						loading: false
					},
					"agent_id_back" :{
						name: 'agent_id_back',
						src: '',
						loading: false
					},
					"license1": {
						name: 'license1',
						src: '',
						loading: false,
					}
				},
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
      onAddPhoto(){},
      onDeletePhoto(){}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
   
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
  .main{
    background: #fff;
    padding-bottom: 30px;
    h3{
      padding: 15px;
    }
    .consent{
      span{
        color: #007BD9;
      }
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
