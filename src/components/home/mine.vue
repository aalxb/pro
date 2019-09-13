<template>
	<div class="wrap">
		<div class="user_info">
			<!--<div class="address-tip">点击地址可查看用气信息</div>-->
			<div class="username">
				wkf_4578142
			</div>
			<p class="user_phone_show">
				<span class="user_phone_name">手机号：</span><span class="user_phone">{{new_phone}}</span>
			</p>
			<div class="user_name">
				<div class="img">
					<img src="" ref="img" @click="onshow">
				</div>
			</div>
			<!--<div class="user_addr">
				<div v-if="getUser">
					<template v-for="address in getUser.accounts" v-if="!address.hasOwnProperty('company')">
						<p><span class="addr" @click="onAddressDetail(address)">{{address.address}}</span></p>
					</template>
				</div>
				<p><span class="add_addr" @click="onRoute">+ 添加地址</span></p>
			</div>-->
			<div class="divider"></div>
			<div class="user_mess">
				<div class="user_mess_item" v-for="(record,index) in records" :key="record.route"   @click="onChange(record.route)">
					<div class="item_img" :style="{backgroundPosition: (index * -24.5) + 'px -304px'}"></div>
					<p v-text="record.title"></p>
				</div>
			</div>
		</div>
		<div class="user_list">
			<group>
				<cell :title="setting.title" is-link v-for="(setting, index) in settings" :key="setting.route" :link="setting.route" >
					<div slot="icon" class="list_img" :style="{backgroundPosition: (index * -26) +  'px -500px'}"></div>
				</cell>
			</group>
		</div>
	</div>
</template>

<script>
	import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
	import {mapGetters} from "vuex";
	export default {
		name: "Mine",
		components: {
			Group,
			Cell,
			CellFormPreview,
			CellBox,
			Badge
		},
		computed:{
			...mapGetters([
				'getUser',
				'getAvatar'
			]),
		},
		data() {
			return {
				new_phone:"",
				records:[
					{
						title: '通知管理',
						// route: '/message'
						route:'#'
					},
					{
						title: '受理进度',
						route: '/progress'
					},
					{
						title: '我的账单',
						// route: '/accounts'
						route: '/accounts?b=bill&&&t=燃气缴费&type=居民'
					},
				],
				settings: [
					{
						title: '已绑定地址',
						route:'/accounts?b=address'
					},
					{
						title: '建议与反馈',
						route:'/feedback'
					},
					{
						title: '我的服务记录',
						route:'/record?type=工单'
					},
					{
						title: '我的购物车',
						route:'/cart'
					},
					{
						title: '设置',
						route:'/config'
					},
				],
			}
		},
		mounted: function () {
			this.$refs['img'].src = this.getAvatar;
			let phone = '13469857898';
			this.new_phone=phone.replace(/^(\d{3})\d{4}(\d+)/,"$1****$2")
		},
		methods: {
			onRoute () {
				this.$router.push({path:'/accounts',query:{b:'address'}});
			},
			onAddressDetail (address){
				this.$router.push({path:'/address_detail',query:{code:address.user_number || address.address_code}});
			},
			onshow() {
				alert(this.$refs['img'].src);
			},
			onChange(route){
				this.$router.push({
					path:route
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		/*background: #fff no-repeat url('../../../static/mine-bg.jpg');*/
		background-size: contain;
		position: relative;
		.user_info {
			background-color: #fff;
			border-radius: 5px;
			box-shadow: 0 0 11px 1px #ccc;
			min-height: 217px;
			padding: 15px;
			margin-top: 30px;
			position: relative;
			.address-tip {
				font-size: 14px;
				color: #ccc;
			}
			.username{
				margin-top: 10px;
				font-size:14px;
				font-family:PingFang SC;
				font-weight:bold;
				line-height:25px;
				color:rgba(51,51,51,1);
				opacity:1;
			}
			.user_phone_show{
				margin-bottom: 32px;
				.user_phone_name{
					font-size:14px;
					font-family:PingFang SC;
					font-weight:bold;
					line-height:25px;
					color:rgba(51,51,51,1);
					opacity:1;
				}
				.user_phone{
					font-size:16px;
					font-family:PingFang SC;
					font-weight:400;
					line-height:30px;
					color:rgba(42,158,245,1);
					opacity:1;
				}
			}

			.user_name {
				position: absolute;
				height: 62.5px;
				width: 62.5px;
				right: 17px;
				top: -30px;
				box-shadow:0 2px 9px 0 rgba(71,71,71,0.42);
				border-radius: 50%;
				.img {
					height: 100%;
					width: 100%;
					border-radius: 50%;
					img {
						height: 100%;
						width: 100%;
						border-radius: 50%;
					}
				}
			}
			.user_addr {
				min-height: 188px;
				p {
					color:rgba(102,102,102,1);
					span {
						display: inline-block;
					}
				}
				.addr {
					background:rgba(255,255,255,1);
					border:1px solid rgba(64,160,255,1);
					padding: 5px 10px;
					border-radius: 25px;
					margin-top: 14px;
					letter-spacing: 1px;
					font-size: 16px;
					color:rgba(42,158,245,1);
				}
				.add_addr {
					padding-left: 10px;
					margin-top: 15px;
					margin-bottom: 20px;
				}
			}
			.divider {
				height:1px;
				background:rgba(238,238,238,1);
			}
			.user_mess {
				margin-top: 28px;
				display: flex;
				justify-content: space-around;
				height: 27%;
				margin-bottom: 32px;
				.item_img {
					background-image: url('../../../static/icon.png');
					background-size: 350px 450px;
					margin: 10px auto;
					width: 24px;
					height: 24px;
				}
				p {
					color: #333;
					font-weight: 400;
				}
			}
		}
		.user_list {
			/deep/ .weui-cells:before {
				content: unset;
			}
			.weui-cell {
				padding: 13px 15px;
			}
			.list_img {
				display:block;
				margin-right:5px;
				height: 24px;
				width: 24px;
				background-size: 525px 675px;
				background-image: url('../../../static/icon.png');
				background-position: 0 0;
			}
		}
	}
</style>
