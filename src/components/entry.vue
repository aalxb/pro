<template>
	<div class="entry">
		<div class="entry-top" >
			<div class="entry-top-color">
				<div class="search-value">
					<div class="search-index-icon">
						<img src="../../static/search_index.png" alt="">
					</div>
					<input type="text" class="search-index-input" placeholder="全部应用">
				</div>
				<tab :line-width='3' active-color='#40A0FF' v-model="tab_index" custom-bar-width="60px">
					<!--<tab-item class="vux-center" :selected="tabs[tab_index] === item" v-for="(item, index) in tabs" @click="tab_index = index" :key="index">{{item}}</tab-item>-->
					<tab-item class="vux-center" :selected="tabs[tab_index] === item" v-for="(item, index) in tabs" @click="tab_index = index" :key="index"  @on-item-click="switchTabItem('#box-'+index)">{{item}}</tab-item>
				</tab>
			</div>
		</div>
		<div class="categorization" id="categorization">
			<div v-for="(menu,m) in categorization" :id=" 'box-'+m ">
				<div class="menu-title">{{menu.title}}</div>
				<grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
					<grid-item :link="list.href" v-for="(list,l) in menu.list" :key="list.img" class="menu_after">
						<div slot="icon" class="cell-menu" >
							<div class="img-box" :style="{backgroundPosition: (l * -33) + 'px ' + ((m) * -42 ) + 'px'}"></div>
						</div>
						<span class="name" slot="label" v-html="list.name"></span>
					</grid-item>
				</grid>
			</div>
		</div>
		<tabbar @on-index-change="onChangeTab" style="position: fixed;">
			<tabbar-item v-for="tab in current_tabs" :key="tab.name" @on-item-click="onReadout"
						 :selected="current_tab == tab.name" :link="tab.link">
				<div class="footer-icon" :class="tab.name" slot="icon"></div>
				<div class="footer-icon" :class="tab.name + '-active'" slot="icon-active"></div>
				<span slot="label">{{tab.text}}</span>
			</tabbar-item>
		</tabbar>
	</div>
</template>

<script>
	import { Tab, TabItem, Swiper, SwiperItem, Grid, GridItem ,Tabbar, TabbarItem,} from 'vux'
	export default {
		name: "Entry",
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			Grid,
			GridItem,
			Tabbar,
			TabbarItem,
		},
		data() {
			return {
				tab_index:0,
				// tabs:['居民业务', '非居民业务','地下管业务', '燃气账单', '上门服务', '建议反馈'],
				// tabs:['居民业务', '非居民业务','地下管业务', '便民服务',"建议和反馈"],
				tabs:['居民业务', '非居民业务', '便民服务'],
				rate:((window.innerHeight - 50)/window.innerWidth),
				menus : [
					{
						name:"resident",
						title:"居民业务",
						list:[
							{href:"./open",color:["#2D78D8","#71AFFE"],"name":"开户申请","img":"business"},
							{href:"/accounts?b=fix",color:["#F08C5A","#FCC08B"],"name":"管道拆改","img":"fix"},
							{href:"/accounts?b=cancel",color:["#00AB91","#00E9AF"],"name":"燃气退户","img":"cancel"},
							{href:"/accounts?b=check",color:["#8865EE","#91A1F3"],"name":"校表申请","img":"check"},
							{href:"/accounts?b=repair",color:["#8865EE","#91A1F3"],"name":"灶具维修","img":"repair"},
							{href:"/accounts?b=info_change",color:["#71AFFE","#2D78D8"],"name":"信息更改","img":"info_change"},
							{href:"/accounts?b=heating",color:["#F08C5A","#FCC08B"],"name":"采暖踏勘","img":"heating"},
							{href:"/accounts?b=population",color:["#2D78D8","#71AFFE"],"name":"一户多人口","img":"population"},
							{href:"/accounts?b=receipt",color:["#00AB91","#00E9AF"],"name":"电子发票","img":"receipt"},
						]
					},
					{
						name:"public",
						title:"非居民业务",
						list:[
							{href:"#",color:["#2D78D8","#71AFFE"],"name":"燃气安装","img":"public_open"},
							{href:"/accounts?b=public_fix",color:["#00AB91","#00E9AF"],"name":"燃气拆改","img":"public_fix"},
							{href:"/accounts?b=public_change",color:["#8865EE","#91A1F3"],"name":"信息变更","img":"public_change"},
							{href:"/accounts?b=public_bill",color:["#08cb98","#00E9AF"],"name":"账单查询","img":"public_bill"},
							{href:"/accounts?b=public_bill_online",color:["#F08C5A","#FCC08B"],"name":"燃气缴费","img":"public_bill_online"},
							{href:"/accounts?b=public_receipt",color:["#129CEC","#1DCEE8"],"name":"电子发票","img":"public_receipt"},
							{href:"/accounts?b=public_apply",color:["#2D78D8","#71AFFE"],"name":"非居民报装<br/>(通气)","img":"public_apply"},
							{href:"/accounts?b=public_manual",color:["#8865EE","#91A1F3"],"name":"用户手册","img":"public_manual"},
						]
					},
					{
						name:"under_pipe",
						title:"地下管业务",
						list:[
							{href:"#",color:["#129CEC","#1DCEE8"],"name":"地下管<br/>施工监护","img":"public_monitor"},
							{href:"#",color:["#8865EE","#91A1F3"],"name":"地下管<br/>施工拆改","img":"public_under_fix"},
						]
					},
					{
						name:"bill",
						title:"其他",
						list:[
							{href:"#",color:["#2D78D8","#71AFFE"],"name":"账单查询","img":"bill"},
							{href:"#",color:["#00AB91","#00E9AF"],"name":"燃气缴费","img":"pay"},
						]
					},
					{
						name:"indoor",
						list:[
							{href:"#",color:["#8865EE","#91A1F3"],"name":"员工识别","img":"verify"},
							{href:"#",color:["#F08C5A","#FCC08B"],"name":"员工入口","img":"entry"},
						]
					},
					{
						name:"consult",
						list:[
							{href:"#",color:["#2D78D8","#71AFFE"],"name":"咨询投诉","img":"consult"},
							{href:"#",color:["#00AB91","#00E9AF"],"name":"隐患上报","img":"safety"},
						]
					},
				],
				categorization : [
					{
						name:"resident",
						title:"居民业务",
						list:[
							{href:"/open?type=居民",color:["#2D78D8","#71AFFE"],"name":"开户","img":"business"},
							{href:"/accounts?b=public_business&&t=拆改申请&&type=居民",color:["#2D78D8","#71AFFE"],"name":"拆改","img":"business2"},
							{href:"/accounts?b=public_business&&t=点火申请&&type=居民",color:["#F08C5A","#FCC08B"],"name":"点火","img":"fix"},
							{href:"/accounts?b=public_business&&t=装表申请&&type=居民",color:["#8865EE","#91A1F3"],"name":"装表","img":"repair"},
							{href:"/accounts?b=public_business&&t=补开增容&&type=居民",color:["#00AB91","#00E9AF"],"name":"新增用气设备","img":"receipt"},
							{href:"/accounts?b=pipeline_replacement&&type=居民",color:["#2D78D8","#71AFFE"],"name":"灶具管更换","img":"population"},
							{href:"/accounts?b=cancel&&t=安检申请&&type=居民",color:["#F08C5A","#FCC08B"],"name":"安检","img":"fix1"},
							{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"安检隐患闭环","img":"cancel"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"自助抄表","img":"check1"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"我的账单","img":"check2"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"燃气缴费","img":"heating"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"资料完善","img":"heating1"},
							{href:"accounts?b=transfer_ownership&&t=过户申请&&type=居民",color:["#71AFFE","#2D78D8"],"name":"过户","img":"info_change"},
							{href:"/accounts?b=cancel&&t=销户申请&&type=居民",color:["#2D78D8","#71AFFE"],"name":"销户","img":"business1"},
							{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"电子发票","img":"cancel1"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"保险","img":"repair1"},
						]
					},
					{
						name:"public",
						title:"非居民业务",
						list:[
							{href:"/index/mall",color:["#2D78D8","#71AFFE"],"name":"报装","img":"business"},
							{href:"/index/mall",color:["#2D78D8","#71AFFE"],"name":"拆改","img":"business2"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"点火","img":"fix"},
							{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"新增用气设备","img":"receipt"},
							{href:"/index/mall",color:["#2D78D8","#71AFFE"],"name":"灶具管更换","img":"population"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"安检","img":"fix1"},
							{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"安检隐患闭环","img":"cancel"},
								{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"信息变更","img":"cancel2"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"我的账单","img":"check2"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"燃气缴费","img":"heating"},
							// {href:"#",color:["#F08C5A","#FCC08B"],"name":"资料完善","img":"heating1"},
							{href:"/index/mall",color:["#71AFFE","#2D78D8"],"name":"过户","img":"info_change"},
							{href:"/index/mall",color:["#2D78D8","#71AFFE"],"name":"销户","img":"business1"},
							{href:"/index/mall",color:["#00AB91","#00E9AF"],"name":"电子发票","img":"cancel1"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"保险","img":"repair1"},
						]
					},
					// {
					// 	name:"under_pipe",
					// 	title:"地下管业务",
					// 	list:[
					// 		{href:"#",color:["#129CEC","#1DCEE8"],"name":"施工监护","img":"public_monitor"},
					// 		{href:"#",color:["#8865EE","#91A1F3"],"name":"施工拆改","img":"public_under_fix"},
					// 	]
					// },
					{
						name:"indoor",
						title:"便民服务",
						list:[
							{href:"/navigation",color:["#8865EE","#91A1F3"],"name":"服务网点","img":"verify"},
							{href:"/phone",color:["#F08C5A","#FCC08B"],"name":"热线电话","img":"entry"},
							{href:"/resident",color:["#8865EE","#91A1F3"],"name":"居民业务指南","img":"verify115"},
							{href:"/commerce",color:["#8865EE","#91A1F3"],"name":"工商报装指南","img":"verify15"},
							{href:"/fee",color:["#F08C5A","#FCC08B"],"name":"收费标准","img":"entry3"},
							{href:"/gas",color:["#F08C5A","#FCC08B"],"name":"阶梯气价","img":"entry4"},
							{href:"/promise",color:["#8865EE","#91A1F3"],"name":"服务承诺","img":"verify4"},
							{href:"/charge",color:["#8865EE","#91A1F3"],"name":"缴费指南","img":"verify5"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"提起通知","img":"verify6"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"员工识别","img":"verify7"},
							{href:"/questions",color:["#8865EE","#91A1F3"],"name":"百问百答","img":"verify8"},
							{href:"/safe",color:["#8865EE","#91A1F3"],"name":"安全知识","img":"verify9"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"隐患举报","img":"verify10"},
							{href:"/index/mall",color:["#8865EE","#91A1F3"],"name":"咨询投诉","img":"verify11"},
							{href:"/index/mall",color:["#F08C5A","#FCC08B"],"name":"IC卡充值","img":"entry1"},
							{href:"/record",color:["#8865EE","#91A1F3"],"name":"业务记录","img":"verify2"},
						]
					},
					// {
					// 	name:"consult",
					// 	title:"建议和反馈",
					// 	list:[
					// 		{href:"#",color:["#2D78D8","#71AFFE"],"name":"咨询投诉","img":"consult"},
					// 		{href:"#",color:["#00AB91","#00E9AF"],"name":"隐患举报","img":"safety"},
					// 	]
					// },
				],
				current_tab:'home',
				current_tabs : [
					{
						name: 'information',
						text: '服务资讯',
						link: '/index/information',
					},
					{
						name: 'mall',
						text: '商城',
						link: '/index/mall',
					},
					{
						name: 'home',
						text: '',
						// link: '/accounts?b=readout',
						link:"/"
					},
					{
						name: 'service',
						text: '智能客服',
						link: '/index/service',
					},
					{
						name: 'mine',
						text: '我的',
						link: '/index/mine',
					},
				],
			}
		},
		mounted: function () {
			if( this.$route.query.hasOwnProperty('tab') ){
				this.$nextTick(() => {
					this.tab_index = parseInt(this.$route.query.tab);
					console.log(	this.tab_index );

					this.switchTabItem('#box-'+ parseInt(this.$route.query.tab))
				});
			}
		},
		methods: {
			switchTabItem(val){
				let anchor = this.$el.querySelector(val);
				this.$nextTick(() => {
					document.querySelector(".categorization").scrollTop = anchor.offsetTop -80;
				});

			},
			onChangeTab (i){
				this.current_tab = this.current_tabs[i].name;
			},
			onReadout (){

			},
		}
	}
</script>

<style lang="less" scoped>
	#categorization{
		overflow-y:scroll;
		height: 100%;
	}

	.entry{
		width: 100%;
		height: 100%;
		.entry-top{
			padding: 0px 15px;
			background-color: white;
			border-bottom: 1px solid rgba(243,243,247,1);
			.entry-top-color{
				width: 92%;
				margin: auto;
				padding:12px 0px 0px 0px;
			}
		}
		.categorization /deep/ {
			width: 100%;
			background-color: white;
			padding-bottom: 60px;
			margin: 6px 0px 0px 0px;
			/deep/ .weui-grid__icon {
				width: 42px;
				height: 42px;
			}
			.weui-grid:after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				border: none;

			}
			/deep/ .weui-grid:after {
				content: " ";
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
			}
			.weui-grids:before {
				border: unset;
				height: 0;
			}
			.main_br {
				width: 93%;
				height: 0px;
				border: 1px solid rgba(220, 221, 226, 0.53);
				opacity: 1;
				margin: 14px 11px 0px 14px;
			}
			.menu-title {
				font-size: 20px;
				font-weight: bold;
				color: #333;
				padding: 15px 0 0 15px;
			}
			.cell-menu {
				height: 100%;
				width: 100%;
				display: block;
				margin: 0 auto;
				/*border-radius: 25px;*/
				.img-box{
					height: 100%;
					width: 100%;
					margin: 0 auto;
					padding: 5px;
					position: relative;
					background-image: url("../../static/zheneng-all.png");
					background-position: 0 0;
					background-origin: content-box;
					background-clip: content-box;
					// background-color: red;
				}
			}
			.name {
				font-size: 12px;
				font-family: PingFang SC;
				font-weight: 400;
				text-align: center;
				color: rgba(51, 51, 51, 1);
				opacity: 1;
			}
			.menu_other {
				width: 100%;
				padding: 10px 0 0 15px;
				margin: 8px 0;
				.img-fj {
					width: 12px;
					height: 12px;
				}
				.menu-other-title {
					width: 130px;
					font-size: 21px;
					font-weight: bold;
					line-height: 25px;
					color: #333;

				}
				.menu-other-icon {
					float: right;
					margin-right: 15px;
					width: 14px;
					height: 14px;
					color: rgba(68, 68, 68, 1);
					opacity: 1;
				}
			}
		}
	}
	.search-value{
		width: 100%;
		height:36px;
		background:rgba(229,229,229,1);
		opacity:0.53;
		border-radius:25px;
		.search-index-icon{
			width: 16px;
			height: 16px;
			padding: 8px 3px 10px 15px;
			float: left;
		}
		input::-webkit-input-placeholder {
			color:rgba(106,114,138,1);
			font-size: 15px;
		}

		input:-moz-placeholder {
			color:rgba(106,114,138,1);
			font-size: 15px;
		}

		input::-moz-placeholder {
			color:rgba(106,114,138,1);
			font-size: 15px;
		}

		input:-ms-input-placeholder {
			color:rgba(106,114,138,1);
			font-size: 15px;
		}
		.search-index-input{
			width: 90%;
			border:none;
			outline:none;
			padding: 8px 0px 7px 8px;
			float: right;
			font-size:15px;
			font-family:PingFang SC;
			font-weight:400;
			line-height:19px;
			background:rgba(229,229,229,0.53);
			color:rgba(106,114,138,1);
			border-radius: 25px;
		}
	}
	.swiper {
		margin-top: 6px;
		background-color: #fff;
		.weui-grid {
			padding: 10px 5px;
			&:after {
				border: unset;
			}
		}
		.cell-menu {
			height: 100%;
			width: 100%;
			display: block;
			margin: 0 auto;
			border-radius: 25px;
			.img-box {
				height: 100%;
				width: 100%;
				margin: 0 auto;
				padding: 9px;
				position: relative;
				background-image: url("../../static/icon.png");
				background-size: 350px 450px;
				background-position: 0 0;
				background-origin: content-box;
				background-clip: content-box;
			}
		}
		.name {
			font-family: 黑体;
			font-size: 12px;
			color: #333;
			text-align: center;
		}
	}
	/deep/ .weui-tabbar__icon {
		display: inline-block;
		width: 33px;
		height: 33px;
	}
	.footer-icon {

		width: 34px;
		height: 34px;
		background: url("../../static/icon-index.png");
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
			background-position: -205px -309px;
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
</style>
