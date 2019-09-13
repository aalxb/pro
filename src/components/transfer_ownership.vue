<!-- 过户 -->
<template>
	<div class='wraps'>
		<div class="title" v-if="transfer">
		  <h3>{{transfer.address}}</h3>
		</div>
		<div style="height:8px;background:rgba(243,245,247,1);"></div>
		<div class="main" v-if="page=='next'">
		  <div>
			<h3>新用户身份证</h3>
			<Photo :photo_data="[photo_data['owner_id_front'],photo_data['owner_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
			<x-input v-model="todo.owner_id"
			  title="身份证号" placeholder="身份证号码" placeholder-align="right" text-align="right"></x-input>
		  </div>
		  <div class="table">
			<h3>表具信息</h3>
			<x-input v-model="todo.owner_id"
			  title="表上指数" placeholder="请输入黑色部分读数" placeholder-align="right" text-align="right"></x-input>
			<div class="img">
			   <img class="img-responsive img-border" :src="IMG_URL + '/static/meter_sample.png'">
			</div>
			<Photo :photo_data="[photo_data['photo']]"
						   size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
		  </div>
		  <x-button style="width:80%;background:linear-gradient(90deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);opacity:1;color:#fff;margin-top:50px;">提交</x-button>
		</div>
		<template v-else-if="page == 'new-owner'">
			<div class="page" ref="">
				<group title=" "><!--title为空则group的margin-top略大-->
					<!-- <CellBox class="bold-title" v-text="'产权人信息'"></CellBox>
					<Photo :photo_data="[photo_data['owner_id_front'],photo_data['owner_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo> -->
					<x-input v-model="todo.owner"
							 title="姓名" placeholder="请输入您的姓名" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.owner_phone"
							 title="手机号" placeholder="请输入产权人手机号" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.contact"
							 title="联系方式" placeholder="请输入手机号或座机号" placeholder-align="right" text-align="right"></x-input>
					<x-number  title="家庭人数" v-model="todo.number"></x-number>
					<selector ref="defaultValueRef" title="用途" :options="list" v-model="defaultValue"></selector>
					<x-switch title="低保用户" v-model="switching.user"></x-switch>
					<!--<Photo :photo_data="[photo_data['protect']]"  @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto" v-if="switching.user"></Photo>-->
					<x-switch title="已经装表" v-model="switching.table"></x-switch>
					<x-switch title="需要点火" v-model="switching.ignition "></x-switch>
				</group>

				<!--<flexbox class="action-groups">-->
					<!--<flexbox-item v-for="action in actions[page]" :key="action.name">-->
						<x-button type="primary"  @click.native="onPage()">下一步</x-button>
					<!--</flexbox-item>-->
				<!--</flexbox>-->
			</div>
		</template>

    </div>
</template>

<script>
	//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
	//例如：import 《组件名称》 from '《组件路径》';
   import Photo from './common/photo'
  import {Group, XButton,XNumber,XSwitch,Selector ,XInput} from 'vux'
	export default {
		//import引入的组件需要注入到对象中才能使用
		components: {
		   Photo: Photo,
		   XInput,
		   Group,
		   XButton,
			XSwitch,
			Selector,
			XNumber
		},
		data() {
			//这里存放数据
			return {
				page:"new-owner",
				switching:{
					user: false,
					table: true,
					ignition : true
				},
				todo: {
				    owner_id:'',
					owner_id_front: '',
					owner_id_back: '',
					owner:"",
					owner_phone:"",
					contact:"",
					number:1,
					basic_living:null,
					meter_state:null,


				},
				photo_data : {
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
							"photo" :{
								name: 'photo',
								src: '',
								loading: false
							},
						},
				transfer:null,
				defaultValue: '自用',
				list: [{key: '自用', value: '自用'}, {key: '出租', value: '出租'}],

      }
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			onPage(){
				if(action.name == 'owner-msg'){
					if(this.todo.owner&&this.todo.owner_phone&&this.todo.contact&&this.todo.number>0){
						if(this.switching.table){
							this.todo.meter_state = '需要装表'
						}else{
							this.todo.meter_state = '不需要装表'
						}
						if(this.switching.ignition){
							this.todo.ignite = '需要点火'
						}else{
							this.todo.ignite = '不需要点火'
						}
						if(this.switching.user){
							this.todo.basic_living = '是'
						}else{
							this.todo.basic_living = '否'
						}
						console.log("useage",this.defaultValue)
						console.log("todo",this.todo)
						this.page = action.name;
					}else{
						that.$vux.alert.show({
							title: '错误',
							content: '信息输入不完整，请输入！'
						})
					}

				}
			},
		   onAddPhoto () {

		   },
		  onDeletePhoto() {}
		},
		//生命周期 - 创建完成（可以访问当前this实例）
		created() {

		},
		//生命周期 - 挂载完成（可以访问DOM元素）
		mounted() {
			this.transfer = this.$route.query
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
    // height: 100%;
    background: #fff;
  }
  .title{
    width: 90% ;
    margin: 0 auto;
    padding: 15px 0;
  }
  .main{
    width: 90%;
    margin: 0 auto;
    height: 100%;
    padding-bottom: 50px;
    h3{
      padding: 15px 0;
      font-size:18px;;
    }
    /deep/ .weui-cell:before{
      border-top: none;
    }
     /deep/ .weui-cell:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #ECECEC;
        color: #D9D9D9;
        transform-origin: 0 0;
        transform: scaleY(0.5);
        left: 15px
     }
     .table{
       /deep/ .weui-cell:after{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #DCDCDC;
        color: #D9D9D9;
        transform-origin: 0 0;

        transform: scaleY(0.5);
        left: 15px;

      }
      .img{
          border: 1px dashed #707070
        }
     }
  }
</style>
