<template>
	<div class="wrap-index">
		<div v-show="current_tab == 'home'">
			<div class="main">
				<div class="mani_top">
					<div class="main_icon" @click="show_select_company = true">
						<div class="main_icon_top">

						</div>
						<!--<img :src="IMG_URL + '/static/logo.png'" class="img-logo">-->
						<span class="main_icon_name">{{getCompany ? getCompany.shortTitle : ""}}</span>
						<div class="main_icon_sico">
							<img src="../../../static/deil.png" alt="">
						</div>
					</div>
					<div class="main_search" @click="search">
						<img :src="IMG_URL + '/static/top-seach.png'" class="btn">
						<span  class="search">一户多口人</span>
					</div>
				</div>
				<div class="itemize">
					<grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
						<grid-item v-for="(item,m) in itemize" :key="m" class="asd">
							<div slot="icon" class="cell-itemize" :style="{backgroundPosition: (m*-33) + 'px ' + ((0) * -42 ) + 'px'}">
							</div>
							<span class="itemize_name" slot="label">{{item.name}}</span>
						</grid-item>
					</grid>
				</div>
			</div>
			<div class="top_back"></div>
			<div class="main_menu">
				<div class="lead">
					<div class="lead-gas"> <span class="lead-gas-blue">服务</span> <span class="lead-gas-red">资讯</span></div>
					<div class="lead-border-right"></div>
					<div class="lead-content">
						<div class="lead-content-top">
							<div class="lead-content-top-gas">燃气通知</div>
							送温暖进万家活动开始啦，赶快参加报...
						</div>
						<div class="lead-content-bottom">
							<span class="lead-content-bottom-gas">快乐厨房</span>
							西湖区燃气断气通知，请相互转告，并...
						</div>
					</div>
				</div>
				<template v-for="(menu,m) in categorization">
					<div class="menu-title">{{menu.title}}</div>
					<grid :cols="5" :show-lr-borders="false" :show-vertical-dividers="false">
						<grid-item :link="list.href" v-for="(list,l) in menu.list" :key="list.img">
							<div slot="icon" class="cell-menu" :style="{backgroundPosition: (l*-33) + 'px ' + ((m+1) * -42 ) + 'px'}">
							</div>
							<span class="name" slot="label" v-html="list.name"></span>
						</grid-item>
					</grid>
					<div class="main_br" v-if="m < 2"></div>
				</template>
				<!--<div class="menu_other">-->
				<!--<span class="menu-other-title">其他业务</span>-->
				<!--<span class="menu-other-icon"> <img :src="IMG_URL + '/static/fj.png'" class="img-fj"> </span>-->
				<!--</div>-->
			</div>
			<div class="top_back"></div>
			<div class="self">
				<div class="self-service">
					<img src="../../../static/self.png" alt="" class="self-img">
				</div>
			</div>
			<div class="top_back"></div>
			<div class="business-list">
				<!--<div class="lead">-->
				<!--<div class="lead-gas">燃气头条</div>-->
				<!--<div class="lead-border-right"></div>-->
				<!--<div class="lead-content">-->
				<!--<div class="lead-content-top">杭州燃气送温暖进万家活动开始啦，赶快....</div>-->
				<!--<div class="lead-content-bottom">西湖区燃气断气通知，请相互转告。</div>-->
				<!--</div>-->
				<!--<div class="lead-border-right"></div>-->
				<!--<div class="lead-more">更多</div>-->
				<!--</div>-->

				<div class="card">
					<swiper :auto="false" :loop="false" height="236px" :show-dots="false" :index="demo_index" @on-index-change="demo_onIndexChange">
						<swiper-item class="">
							<div >
								<div class="card-title">
									<span class="icon"><img :src="IMG_URL + '/static/contri.png'" class="img-responsive"></span>
									<span class="name">代缴费账单</span>
									<span class="time">2019-07-01</span>
								</div>
								<div class="card-body">
									<div class="cell">
										<div class="key">用户编号： <span class="value">E30505</span></div>
										<div class="key">用户地址： <span class="value">普升福邸11幢3单元803室</span></div>
										<div class="key">消费量： <span class="value value-strong">45m³</span>单价： <span class="value value-money">13/m³</span></div>
										<!--<div class="key"></div>-->
									</div>
								</div>
								<div class="card-action">
									<div class="card-value">金额: <span class="card-money">139. <span class="card-money-max">24</span></span> </div>
									<div class="card-btn">
										<div class="card-btn-right">
											立即缴费
										</div>

									</div>
								</div>
							</div>
						</swiper-item>
						<swiper-item class="">
							<div >
								<div class="card-title">
									<span class="icon"><img :src="IMG_URL + '/static/new-bill.png'" class="img-responsive"></span>
									<span class="name">最新账单</span>
									<span class="time">2019-07-01</span>
								</div>
								<div class="card-body">
									<div class="cell">
										<div class="key">用户编号： <span class="value">E30505</span></div>
										<div class="key">用户地址： <span class="value">普升福邸11幢3单元803室</span></div>
										<div class="key">消费量： <span class="value value-strong">55m³</span>单价： <span class="value value-money">13/m³</span></div>
										<!--<div class="key"></div>-->
									</div>
								</div>
								<div class="card-action">
									<span class="card-value">金额: <span class="card-money">139. <span class="card-money-max">24</span></span> </span>
									<div class="card-btn">
										<div class="card-btn-right">
											立即缴费
										</div>

									</div>
								</div>
							</div>
						</swiper-item>
						<swiper-item class="">
							<div >
								<div class="card-title">
									<span class="icon"><img :src="IMG_URL + '/static/new-bill.png'" class="img-responsive"></span>
									<span class="name">最新账单</span>
									<span class="time">2019-07-01</span>
								</div>
								<div class="card-body">
									<div class="cell">
										<div class="key">用户编号： <span class="value">E30505</span></div>
										<div class="key">用户地址： <span class="value">普升福邸11幢3单元803室</span></div>
										<div class="key">消费量： <span class="value value-strong">66m³</span>单价： <span class="value value-money">13/m³</span></div>
										<!--<div class="key"></div>-->
									</div>
								</div>
								<div class="card-action">
									<span class="card-value">金额: <span class="card-money">139. <span class="card-money-max">24</span></span> </span>
									<div class="card-btn">
										<div class="card-btn-right">
											立即缴费
										</div>

									</div>
								</div>
							</div>
						</swiper-item>
					</swiper>
				</div>
				<div class="card-show-dots">
					<div :class="[demo_index == 0 ? 'show-dots' : 'no-show-dots']"></div>
					<div :class="[demo_index == 1 ? 'show-dots' : 'no-show-dots']"></div>
					<div :class="[demo_index == 2 ? 'show-dots' : 'no-show-dots']"></div>
				</div>




				<div class="card">
					<swiper :auto="false" :loop="false" height="204px" :show-dots="false" :index="demo1_index" @on-index-change="demo1_onIndexChange">
						<swiper-item>
							<div class="card-title">
								<span class="icon" style="height: 22px;"><img :src="IMG_URL + '/static/new-fire.png'" class="img-bottom"></span>
								<span class="name">点火申请</span>
								<span class="time">2019-06-26</span>
							</div>
							<div class="card-body">
								<flow>
									<flow-state state="1" title="待审核" is-done></flow-state>
									<flow-line is-done></flow-line>
									<flow-state state="2" is-done>
										<span slot="title">待缴费</span>
									</flow-state>
									<flow-line is-done></flow-line>
									<flow-state state="3" title="已受理" is-done></flow-state>
									<flow-line></flow-line>
									<flow-state state="4" title="待结算"></flow-state>
									<flow-line></flow-line>
									<flow-state state="5" title="已办结"></flow-state>
								</flow>
							</div>
							<div class="action">

								<div class="card-action-out">
									撤销
								</div>
								<div class="card-action-find">
									查看
								</div>
							</div>
						</swiper-item>
						<swiper-item>
							<div class="card-title">
								<span class="icon" style="height: 22px;"><img :src="IMG_URL + '/static/new-fire.png'" class="img-bottom"></span>
								<span class="name">点火申请</span>
								<span class="time">2019-06-26</span>
							</div>
							<div class="card-body">
								<flow>
									<flow-state state="1" title="待审核" is-done></flow-state>
									<flow-line is-done></flow-line>
									<flow-state state="2" is-done>
										<span slot="title">待缴费</span>
									</flow-state>
									<flow-line is-done></flow-line>
									<flow-state state="3" title="已受理" is-done></flow-state>
									<flow-line></flow-line>
									<flow-state state="4" title="待结算"></flow-state>
									<flow-line></flow-line>
									<flow-state state="5" title="已办结"></flow-state>
								</flow>
							</div>
							<div class="action">

								<div class="card-action-out">
									撤销
								</div>
								<div class="card-action-find">
									查看
								</div>
							</div>
						</swiper-item>
						<swiper-item>
							<div class="card-title">
								<span class="icon" style="height: 22px;"><img :src="IMG_URL + '/static/new-fire.png'" class="img-bottom"></span>
								<span class="name">点火申请</span>
								<span class="time">2019-06-26</span>
							</div>
							<div class="card-body">
								<flow>
									<flow-state state="1" title="待审核" is-done></flow-state>
									<flow-line is-done></flow-line>
									<flow-state state="2" is-done>
										<span slot="title">待缴费</span>
									</flow-state>
									<flow-line is-done></flow-line>
									<flow-state state="3" title="已受理" is-done></flow-state>
									<flow-line></flow-line>
									<flow-state state="4" title="待结算"></flow-state>
									<flow-line></flow-line>
									<flow-state state="5" title="已办结"></flow-state>
								</flow>
							</div>
							<div class="action">

								<div class="card-action-out">
									撤销
								</div>
								<div class="card-action-find">
									查看
								</div>
							</div>
						</swiper-item>
					</swiper>
					<div class="card-show-dots-top">
						<div :class="[demo1_index == 0 ? 'show-dots-top' : 'no-show-dots-top']"></div>
						<div :class="[demo1_index == 1 ? 'show-dots-top' : 'no-show-dots-top']"></div>
						<div :class="[demo1_index == 2 ? 'show-dots-top' : 'no-show-dots-top']"></div>
					</div>
				</div>
			</div>
			<company :show="show_select_company" :ShortName="$route.query.ShortName" @onCancelCompany="onCancelCompany"></company>
		</div>
		<template v-if="current_tab == 'service'">
			<service></service>
		</template>
		<template v-if="current_tab == 'information'">
			<information></information>
		</template>
		<template v-if="current_tab == 'mine'">
			<mine></mine>
		</template>
		<template v-if="current_tab == 'mall'">
			<mall></mall>
		</template>
		<tabbar @on-index-change="onChangeTab" style="position: fixed;">
			<tabbar-item v-for="tab in tabs" :key="tab.name" @on-item-click="onReadout"
						 :selected="current_tab == tab.name" :link="tab.link">
				<div class="footer-icon" :class="tab.name" slot="icon"></div>
				<div class="footer-icon" :class="tab.name + '-active'" slot="icon-active"></div>
				<span slot="label">{{tab.text}}</span>
			</tabbar-item>
		</tabbar>

		<!--<div class="robot"><img src="../../../static/new-robot.png" alt=""></div>-->
	</div>
</template>

<script>
	import {Tabbar, TabbarItem,SwiperItem, Swiper, Grid, GridItem, Flow, FlowState, FlowLine ,Search } from 'vux'
	import {mapActions, mapGetters, mapMutations} from "vuex";
	import service from './service'
	import information from './information'
	import mine from './mine'
	import mall from './mall'
	import selectCompany from './select_company'

	export default {
		name: "Index",
		components: {
			Tabbar,
			TabbarItem,
			Swiper,
			SwiperItem,
			Grid,
			GridItem,
			service,
			information,
			mine,
			Flow,
			FlowState,
			FlowLine,
			Search,
			mall,
			company:selectCompany
		},
		data() {
			return {
				swiper_list:[
					{
						url: 'javascript:;',
						img: this.IMG_URL + '/static/banner.jpg',
						title: ''
					},
					{
						url: 'javascript:;',
						img: this.IMG_URL + '/static/banner.jpg',
						title: ''
					},
				],
				current_tab:'home',
				tabs : [
					{
						name: 'information',
						text: '服务资讯',
						link: '/index/information',
					},
					{
						name: 'mall',
						text: '商城',
						// link: 'http://test.cloud-scale.cn/hangrano2oweb/?platform=',
						link:'/index/mall',
					},
					{
						name: 'home',
						text: '',
						// link: '/accounts?b=readout',
						link:"/entry?tab=0"
					},
					{
						name: 'service',
						text: '智能客服',
						// link: '/index/service',
						link:'/index/mall',
					},
					{
						name: 'mine',
						text: '我的',
						link: '/index/mine',
					},
				],
				itemize:[
					{
						href:"/entry?tab=2","img":"zwatch",'url':"../../../static/zwatch.png","name":"电子发票"
					},
					{
						href:"/entry?tab=2","img":"jmoney",'url':"../../../static/jmoney.png","name":"燃气缴费"
					},
					{
						href:"/entry?tab=2","img":"search",'url':"../../../static/search.png","name":"我的账单"
					},
					{
						href:"/entry?tab=2","img":"center",'url':"../../../static/center.png","name":"员工识别"
					}
				],
				menus : [
					{
						name:"resident",
						title:"居民业务",
						list:[
							{href:"/entry?tab=0",color:["#2D78D8","#71AFFE"],"name":"业务办理","img":"business"},
							{href:"/appointment_center",color:["#F08C5A","#FCC08B"],"name":"预约中心","img":"appointment_center"},
							{href:"/accounts?b=bill",color:["#00AB91","#00E9AF"],"name":"我的账单","img":"bill"},
							{href:"https://payapp.weixin.qq.com/life/index?showwxpaytitle=1&exportkey=Abd3WFedlcgtIC2jQ%2BNIHmo%3D&clientversion=26031e30&devicetype=android-23&pass_ticket=knyt6QdUNshxPNZISnflWYCzs5AUMiNGZDw%2BmrBigm9xQaWBiGsyDxwPl1bteumv#/agency/3/city/172",color:["#8865EE","#91A1F3"],"name":"燃气缴费","img":"pay"},
							{href:"#",color:["#2A9EF5","#007EFF"],"name":"隐患举报","img":"safety"},
							{href:"/accounts?b=receipt",color:["#F08C5A","#FCC08B"],"name":"电子发票","img":"receipt"},
							{href:"#",color:["#8865EE","#91A1F3"],"name":"员工识别","img":"indoor"},
							{href:"#",color:["#71AFFE","#2D78D8"],"name":"咨询投诉","img":"consult"},
							{href:"#",color:["#00AB91","#00E9AF"],"name":"业务记录","img":"business_record"},
							{href:"/entry",color:["#2D78D8","#71AFFE"],"name":"更多","img":"more"},
						]
					},
					{
						name:"public",
						title:"非居民业务",
						list:[
							{href:"#",color:["#2D78D8","#71AFFE"],"name":"业务办理","img":"public_business"},
							{href:"/accounts?b=public_bill",color:["#00AB91","#00E9AF"],"name":"我的账单","img":"public_bill"},
							{href:"#",color:["#F08C5A","#FCC08B"],"name":"电子发票","img":"public_receipt"},
							{href:"#",color:["#8865EE","#91A1F3"],"name":"信息变更","img":"public_info"},
							{href:"/entry",color:["#2D78D8","#71AFFE"],"name":"更多","img":"public_more"},
						]
					},
				],
				categorization:[
					{
						name:"resident",
						title:"居民业务",
						list:[
							{href:"/entry?tab=0",color:["#2D78D8","#71AFFE"],"name":"业务办理","img":"business",'url':"../../../static/business.png"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"隐患举报","img":"danger",'url':"../../../static/danger.png"},
							{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"电子发票","img":"invoice",'url':"../../../static/invoice.png"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"IC卡充值","img":"staff",'url':"../../../static/staff.png"},
							{href:"/entry?tab=0",color:["#2A9EF5","#007EFF"],"name":"更多","img":"more",'url':"../../../static/more.png"},
						]
					},
					{
						name:"public",
						title:"非居民业务",
						list:[
							{href:"/entry?tab=1",color:["#2D78D8","#71AFFE"],"name":"业务办理","img":"public_business",'url':"../../../static/business.png"},
							{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"账单查询","img":"public_bill",'url':"../../../static/public_bill.png"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"电子发票","img":"public_receipt",'url':"../../../static/invoice.png"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"信息变更","img":"public_info",'url':"../../../static/public_info.png"},
							{href:"/entry?tab=1",color:["#2D78D8","#71AFFE"],"name":"更多","img":"public_more",'url':"../../../static/more.png"},
						]
					},
					{
						name:"more",
						title:"便民服务",
						list:[
							{href:"/entry?tab=2",color:["#2D78D8","#71AFFE"],"name":"营业网点","img":"public_business",'url':"../../../static/business.png"},
							{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"燃气知识","img":"public_bill",'url':"../../../static/public_bill.png"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"停气通知","img":"public_receipt",'url':"../../../static/invoice.png"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"收费标准","img":"public_info",'url':"../../../static/public_info.png"},
							{href:"/entry?tab=2",color:["#2D78D8","#71AFFE"],"name":"更多","img":"public_more",'url':"../../../static/more.png"},
						]
					}
				],
				fix: 2,
				demo_index:0,
				demo1_index:0,
				show_select_company:false
			}
		},
		computed: {
			...mapGetters([
				'getUser',
				'getPlatform',
				'getUserId',
				'getUid',
				'getCompany',
			]),
		},
		beforeDestroy () {
			this.destroy()
		},
		mounted: function () {

		 // console.log("user",this.$route.query.userId);



			// let vue = this;
			if(this.getUserId){

			}else{
				this.setUserId(this.$route.query.userId);
				this.setPlatform(this.$route.query.platform)
				this.setUid(this.$route.query.openId);
			}
			// vue.tabs[1].link += vue.getPlatform + "&user_id=" + vue.getUserId + "&uid=" + vue.getUid;
			// vue.getClient();
			// setTimeout(function () {
			// 	vue.broadcast();
			// }, 2000);
		},
		methods: {
			...mapMutations([
				'setPlatform',
				'setUser',
				'setUid',
				'setUserId',
				'setReadoutInit',
				'setGuides',
			]),
			...mapActions([
				'getClient',
				'getUserId',
			]),
			//获取参数函数
			GetQueryString (name) {

				var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
					var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
				if(r!=null)return  unescape(r[2]); return null;

			},



			onChangeTab (i){
				this.current_tab = this.tabs[i].name;
				// console.log("userId",this.getUserId)
			},
			broadcast() {
				let vue = this;
				if( this.$refs['broadcast-content'] ){
					let broadcast = this.$refs['broadcast'];
					let end = this.$refs['broadcast-content'].clientWidth - 520;
					let step = (-end / 15);
					let left = 0;
					this.timer = setInterval(function () {
						if( -left < end ){
							left = 0;
							vue.timer && clearInterval(vue.timer);
							setTimeout(function () {
								broadcast.style.left = '0px';
								setTimeout(function () {
									vue.broadcast();
								},1000);
							},2000);
						} else {
							broadcast.style.left = -(++left) + 'px';
						}
					},step * 5);
				}
			},
			destroy () {
				this.timer && clearInterval(this.timer)
			},
			onReadout (){

			},
			demo_onIndexChange(index){
				this.demo_index = index
			},
			demo1_onIndexChange(index){
				this.demo1_index = index
			},
			search(){
				this.$router.push("/search_index")

			},
			onCancelCompany(){
				this.show_select_company = false;
			}
		},
		watch:{
			'$route': function () {
				let path = this.$route.path.split("/");
				if( path.length == 3 && path[2] ){
					this.current_tab = path[2];
				} else if ( path.length == 2 && path[1] == 'index' ){
					this.current_tab = 'home';
				}
			},
			'current_tab' : function () {
				if( this.current_tab == 'home' ){
					// this.tabs[2].link = '/accounts?b=readout';
					this.tabs[2].link = '/entry?tab=0'
				} else {
					this.tabs[2].link = "../index?user_id=" + this.getUserId + "&uid=" + this.getUid + "&platform=" + this.getPlatform;
				}
			}
		},
		beforeRouteEnter (to, from, next) {
			let path = to.path.split("/");
			if( path.length == 3 ){
				next( vm => {
					vm.current_tab = path[2];
				});
			} else {
				next();
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/ .weui-grid__icon{
		width: 42px;
		height: 42px;
		margin: 0 auto;
		padding: 5px;
	}
	/deep/ .weui-tabbar__icon{
		width: 33px;
		height: 33px;
	}
	.wrap-index {
		.img-logo{
			margin: 2px auto;
		}
		padding-bottom: 53px;
		/deep/.weui-bar__item_on {
			.weui-tabbar__label {
				color: #2a9ef5;
			}
		}
		/deep/ .weui-tabbar__label {
			color: #A4A7A9;
		}
		.weui-grid {
			padding: 10px 5px;
			&:after {
				border: unset;
			}
		}
	}
	.footer-icon {

		width: 34px;
		height: 34px;
		background: url("../../../static/icon-index.png");
		/*background-size: 350px 450px;*/
		background-position: 0px -336px;
		&.home,&.home-active {
			/*background-size: 336px 407.55px;*/
			position: absolute;
			height: 57px;
			width: 53px;
			left: -13.5px;
			top: 0px;
		}
		&.home {
			background-position: -205px -309px;
		}
		&.home-active{
			background-position: -139px -309px;
		}
		&.mall {
			background-position: -33px -336px;
		}
		&.service {
			background-position: -66px -336px;
		}
		&.mine {
			background-position: -99px -336px;
		}

		&.information-active {
			background-position: -0px -336px;
		}
		&.mall-active {
			background-position: -33px -336px;
		}
		&.service-active {
			background-position: -66px -336px;
		}
		&.mine-active {
			background-position: -99px -336px;
		}
	}
	.main_menu /deep/ {
		width: 100%;
		background-color: white;
		padding-bottom: 10px;
		.weui-grids:before {
			border: unset;
			height: 0;
		}
		.main_br{
			width:93%;
			height:0px;
			border-bottom:1px solid rgba(220,221,226,0.53);
			opacity:1;
			margin: 14px 11px 0px 14px;
		}
		.menu-title {
			font-size:20px;
			font-weight:bold;
			color:#333;
			padding: 15px 0 0 15px;
		}
		.cell-menu {
			height: 100%;
			width: 100%;
			display: block;
			margin: 0 auto;
			padding: 5px;
			/*border-radius: 25px;*/
			background-image: url("../../../static/icon-index.png");
		}
		.name {
			font-size:12px;
			font-family:PingFang SC;
			font-weight:400;
			text-align: center;
			color:rgba(51,51,51,1);
			opacity:1;
		}
		.menu_other{
			width: 100%;
			padding: 10px 0 0 15px;
			margin:8px 0;
			.img-fj{
				width: 12px;
				height: 12px;
			}
			.menu-other-title{
				width: 130px;
				font-size:21px;
				font-weight:bold;
				line-height: 25px;
				color:#333;

				/*border:1px solid red;*/
			}
			.menu-other-icon{
				float: right;
				margin-right: 15px;
				width:14px;
				height:14px;
				color:rgba(68,68,68,1);
				opacity:1;
			}
		}
	}
	.self{
		width: 100%;
		height: 86px;
		background-color: white;
		.self-img{
			width: 100%;
			height: 86px;
		}
	}
	.broadcast {
		background-color: white;
		padding: 12px 0;
		position: relative;
		border-top: 1px solid #f2f3f5;
		.title {
			position: absolute;
			width: 70px;
			height: 25px;
			padding: 5.5px 12px;
			background: url("../../../static/icon.png");
			background-size: 350px 450px;
			background-position: -16.5px -354.5px;
			background-origin: content-box;
			background-clip: content-box;
		}
		.broadcast-content {
			overflow: hidden;
			margin: 0 10px 0 70px;
			position: relative;
			span {
				display: block;
				position: relative;
				width: 500px;
				font-size: 13px;
				line-height: 25px;
				height: 25px;
				left: 0;
			}
		}
	}
	.business-list {
		padding: 15px;
		background-color: white;
		.card-show-dots{
			width: 50px;
			height: 10px;
			/*border: 1px solid red;*/
			/*margin-top: 20px;*/
			margin:-16px auto 25px;

			.show-dots{
				width:17px;
				height:5px;
				background:rgba(64,160,255,1);
				opacity:1;
				/*border: 1px solid red;*/
				display: inline-block;
			}
			.no-show-dots{
				display: inline-block;
				width:7px;
				height:5px;
				background:rgba(199,199,199,1);
				opacity:1;
			}
		}
		.card {
			background-color: white;
			width: 100%;
			box-shadow: 0 4px 20px 0 rgba(6, 80, 127, 0.14);
			border-radius:10px;
			margin-bottom: 15px;
			margin-top: 18px;
			.card-show-dots-top{
				width: 50px;
				height: 10px;
				margin: -16px auto 25px;
				padding: 5px 0px 0px 0px;
				.show-dots-top{
					width:17px;
					height:5px;
					background:rgba(64,160,255,1);
					opacity:1;
					display: inline-block;
				}
				.no-show-dots-top{
					display: inline-block;
					width:7px;
					height:5px;
					background:rgba(199,199,199,1);
					opacity:1;
				}

			}
			.action{
				padding: 4px 0px;
				.card-action-out{
					padding: 8px;
					width: 49%;
					display: inline-block;
					text-align: center;
					font-size:14px;
					font-family:PingFang SC;
					font-weight:400;
					line-height:20px;
					color:rgba(153,153,153,1);
					border-right: 1px solid  rgba(220,221,226,1);
					opacity:1;
				}
				.card-action-find{
					padding: 8px;
					width: 49%;
					display: inline-block;
					text-align: center;
					font-size:14px;
					font-family:PingFang SC;
					font-weight:400;
					line-height:20px;
					color:rgba(153,153,153,1);
					opacity:1;
				}
			}
			.card-title {
				height: 50px;
				padding: 0 15px;
				line-height: 50px;
				border-bottom: 1px solid #E5E5E5;
				.img-bottom{
					margin: -3px auto;
				}
				span {
					display: inline-block;
				}
				.icon {
					width: 28px;
					height: 16px;
				}
				.name {
					color: #333;
					font-size: 18px;
					margin-left: 15px;
					font-weight: bold;
				}
				.time {
					float: right;
					padding-right: 15px;
					color: #999;
					font-size: 14px;
				}
			}
			.card-body {

				/deep/ .weui-wepay-flow__li_done .weui-wepay-flow__state{
					background-color:#40A0FF;
				}
				/deep/ .weui-wepay-flow__process{
					background-color:#40A0FF;
				}
				padding:8px 3%;
				border-bottom: 1px solid #E5E5E5;
				.cell {
					.key {
						margin-bottom: 10px;
						color: #666;
						.value {
							padding-left: 2px;
							height: 21px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							&.value-strong {
								color: #FF4F32;
								font-size: 15px;
								margin-right: 10%;
								font-family:PingFang SC;
								font-weight:400;
								line-height:21px;
								color:rgba(255,119,0,1);
								opacity:1;
							}
							&.value-money{
								color: #FF4F32;
								font-size: 15px;
								font-family:PingFang SC;
								font-weight:400;
								line-height:21px;
								color:rgba(255,119,0,1);
								opacity:1;
							}
						}
					}
				}
				/deep/ .weui-wepay-flow {
					padding: 27px 31px 45px 31px;
				}
			}
			.card-action {
				padding: 20px 20px;
				color: #666;
				.card-value{
					display: inline-block;
					width: 48%;
				}
				.card-money{
					padding-left: 3px;
					font-size:20px;
					font-family:PingFang SC;
					font-weight:800;
					line-height:22px;
					color:rgba(255,119,0,1);
					opacity:1;
					.card-money-max{
						font-size:16px;
						font-family:PingFang SC;
						font-weight:800;
						line-height:22px;
						color:rgba(255,119,0,1);
						opacity:1;
					}
				}
				.card-btn{
					width: 33%;
					/* display: inline-block; */
					float: right;
					margin: -6px 0px 0px 0px;

					.card-btn-right{
						width: 100%;
						height:36px;
						background:rgba(64,160,255,1);
						opacity:1;
						border-radius:21px;
						font-size:16px;
						font-family:PingFang SC;
						font-weight:400;
						color:rgba(255,255,255,1);
						margin: 0px 14px 0px 0px;
						text-align: center;
						line-height: 36px;

					}
				}

			}
		}

	}
	.main {
		width:100%;
		height:145px;
		background:linear-gradient(133deg,rgba(64,160,255,1) 0%,rgba(44,128,255,1) 100%);
		opacity:1;
		.mani_top{
			.main_icon{
				width:115px;
				height:29px;
				float: left;
				/*background:rgba(255,255,255,1);*/
				opacity:0.82;
				margin: 12px 0px 1px 17px;
				text-align: center;
				.main_icon_top{
					width: 30px;
					height: 30px;
					background-image: url("../../../static/logo-top.png");
					float: left;
					margin: 0px
				}
				.main_icon_name{
					line-height: 28px;
					/*border: 1px solid red;*/
					float: left;
					margin-left: 10px;
					color:rgba(255, 255, 255, 1);
					font-size: 15px;
				}
				.main_icon_sico{

				}
				/*.main_icon_sico{*/
				/*width: 0px;*/
				/*height:0px;*/
				/*background-color: white;*/
				/*float: left;*/
				/*margin: 10px 0;*/
				/*border-right:4px solid transparent;*/
				/*border-left:4px solid transparent;*/
				/*border-top:4px solid white;*/
				/*}*/
			}
			.main_search{
				width:52.8%;
				height:36px;
				float: right;
				background:rgba(255, 255, 255, 0.53);
				border-radius:25px;
				margin: 12px 20px 1px 0px;

				input::-webkit-input-placeholder {
					color: #fff;
					font-size: 15px;
				}

				input:-moz-placeholder {
					color: #fff;
					font-size: 15px;
				}

				input::-moz-placeholder {
					color: #fff;
					font-size: 15px;
				}

				input:-ms-input-placeholder {
					color: #fff;
					font-size: 15px;
				}


				.search{
					/*width:75px;*/
					height:21px;color: #fff;
					font-size: 15px;
					font-size:15px;
					font-family:PingFang SC;
					font-weight:400;
					line-height:36px;
					outline: none;
					opacity:1;
					margin: 7px 0 8px 10px;
					border: 1px solid transparent;
					background-color: transparent;
				}
				.btn{
					width:16px;
					height:16px;
					float: left;
					border:2px solid rgba(255,255,255,1);
					/*border-radius:50%;*/
					opacity:1;
					margin: 9px 0 11px 18px;
					border: none;
					outline: none;
					cursor: pointer;
				}
			}
		}
		.itemize {
			width: 100%;
			float: left;
			margin: 11px 0px 0px 0px;
			.weui-grids:before {
				border: unset;
				height: 0;
			}
			.cell-itemize{
				height: 100%;
				width: 100%;
				display: block;
				/*margin: 0 auto;*/
				/*border-radius: 25px;*/
				float: left;
				background-image: url("../../../static/icon-index.png");
				/*.img-itemize{*/
				/*height: 100%;*/
				/*width: 100%;*/
				/*margin: 0 auto;*/
				/*padding: 9px;*/
				/*position: relative;*/
				/*border: 1px solid red;*/
				/*}*/

			}
			.itemize_name{
				width:48px;
				height:17px;
				font-size:12px;
				font-family:PingFang SC;
				font-weight:400;
				line-height:17px;
				color:rgba(255,255,255,1);
				opacity:1;
			}
		}

	}
	.top_back{
		width: 100%;
		height:9px;
		background:rgba(241,241,243,1);
		opacity:1;
	}
	.lead{
		/*width: 100%;*/
		/*float: left;*/
		margin: 0px 15px;
		/*margin: auto;*/
		height:70px;
		border-bottom:1px solid rgba(220, 221, 226, 0.7);

		/*.asddd{*/
			/*border-bottom:1px solid rgba(220, 221, 226, 1);*/
			/*width: 93%;*/
			/*!*margin: auto;*!*/
			/*margin: 12px 0px 14px 0;*/
			/*clear: both;*/
		/*}*/
		.lead-gas{
			float: left;
			width:38px;
			height:40px;
			/*border:1px solid red;*/
			margin: 10px 0px 10px 0px;
			font-size:17px;
			font-family:TRENDS;
			font-weight:600;
			line-height:22px;
			color:rgba(255,75,75,1);
			opacity:1;
			display: inline-block;
			.lead-gas-blue {
				color: rgba(0, 123, 217, 1)
			}
			.lead-gas-red{
				color:rgba(255, 83, 38, 1)
			}
		}
		.lead-border-right{
			float: left;
			width:0px;
			height:27px;
			border:1px solid rgba(184,184,184,0.4);
			opacity:1;
			line-height: 27px;
			margin: 21px 0px 11px 8px;
			display: inline-block;
		}
		.lead-content{
			float: left;
			width: 73.6%;
			margin: 11px 0px 10px 13px;
			display: inline-block;
			.lead-content-top{
				width: 100%;
				height: 21px;
				font-size:13px;
				font-family:PingFang SC;
				font-weight:400;
				line-height:18px;
				color:rgba(102,102,102,1);
				opacity:1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				margin: 3px 0px;
				.lead-content-top-gas{
					padding:0px 5px 2px;
					/*width: 45px;*/
					height: 19px;
					display: inline-block;
					border:1px solid red;
					border-radius: 3px;
					color: rgba(255, 83, 38, 1);
					font-size: 9px;
				}
			}
			.lead-content-bottom{
				width: 100%;
				height: 21px;
				font-size:13px;
				font-family:PingFang SC;
				font-weight:400;
				line-height:18px;
				color:rgba(102,102,102,1);
				opacity:1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				.lead-content-bottom-gas{
					padding:0px 5px 2px;
					/*width: 45px;*/
					height: 19px;
					display: inline-block;
					border:1px solid red;
					border-radius: 3px;
					color: rgba(255, 83, 38, 1);
					font-size: 9px;
				}
			}
		}
		.lead-more{
			display: inline-block;
			width:24px;
			height:17px;
			font-size:12px;
			font-family:PingFang SC;
			font-weight:400;
			color:rgba(102,102,102,1);
			opacity:1;
			margin: 10px 0px 0px 0px;
			float: right;
		}
	}
	.robot{
		width: 48px;
		height: 52px;
		position: fixed;
		right: 9px;
		bottom: 103px;
	}


</style>
