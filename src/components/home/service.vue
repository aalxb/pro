<template>
	<div class="wrap">
		<div class="header">
			<div class="interior" @click="onChat">
				<span class="photo-1"></span>
				<p>您有什么问题？跟我说吧！</p>
				<span class="photo-2"></span>
			</div>
		</div>
		<div class="conter">
			<div class="section-1">
				<div class="item" v-for="(item,index) in list" @click="onRouteInfo(item)" :key="index">
					<span></span>
					<p>{{item.text}}</p>
				</div>
			</div>
			<div class="section-2">
				<h3 style="padding-left:15px;margin-top:30px;">常见问题</h3>
				<group>
					<cell :title="item.text" is-link v-for="(item,index) in issue" :key="index"
						  @click.native="onRouteInfo(item)"></cell>
				</group>
			</div>
		</div>
	</div>
</template>

<script>
	import {Grid, GridItem, GroupTitle, Cell, Group, Tabbar, TabbarItem,} from 'vux'

	export default {
		name: "Service",
		components: {Grid, GridItem, GroupTitle, Group, Cell, Tabbar, TabbarItem,},
		data() {
			return {
				list:[
					{
						link:'navigation',
						text: '服务网点'
					},
					{
						link:'charge',
						text: '收费标准'
					},
					{
						link:'pay',
						text: '缴费指南'
					},
				],
				issue:[
					{
						link:'tel',
						text: '电话热线'
					},
					{
						link:'population',
						text: '一户多人口'
					},
					{
						link:'SP',
						text: '阶梯气价'
					},
					{
						link:'commitment',
						text: '服务承诺'
					},
					{
						link:'question',
						text: '百问百答'
					}
				],
			}
		},
		mounted: function () {

		},
		methods: {
			onRouteInfo(item){
				this.$router.push({path:'/info', query:{name:item.link}})
			},
			onChat () {
				this.$router.push({path:'/chat'})
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		padding: unset;
		.header {
			background: rgba(64, 160, 255, 1);
			height: 242/2px - 10px;
			line-height: 242/2px - 10px;

			.interior {
				display: flex;
				justify-content: space-around;
				align-items: center;
				letter-spacing: 2px;

				font-size: 40/2px;
				font-weight: bold;
				color: rgba(255, 255, 255, 1);

				span {
					display: block;
				}

				.photo-1 {
					width: 87/2px;
					height: 83/2px;
					background: url("../../../static/robot.png");
					background-size: cover;
					// background-position: 0px -373px;
				}

				.photo-2 {
					width: 60/2px;
					height: 60/2px;
					background: url("../../../static/icon.png");
					background-size: 350px 450px;
					background-position: -60px -400px;
				}
			}
		}

		.conter {
			background: #fff;
		}

		.section-1 {
			display: flex;
			justify-content: space-around;
			text-align: center;
			align-items: center;
			color: rgba(64, 160, 255, 1);
			padding: 15px 0;

			.item {
				width: 94px;
				font-size: 12px;
				font-weight: bold;

				span {
					display: block;
					width: 20px;
					height: 27px;
					margin: 10px auto;
					background: url("../../../static/icon.png");
					background-size: 350px 450px;
				}
			}

			div:nth-child(1) {
				span {
					background-position: 0px -400px;
				}

			}

			div:nth-child(2) {
				span {
					width: 25px;
					background-position: -19px -400px;
				}

			}

			div:nth-child(3) {
				span {

					background-position: -43px -400px;
				}

			}
		}

		.section-2 {
			color: rgba(102, 102, 102, 1);
		}

		.vux-cell-bd {
			.vux-label {
				color: rgba(102, 102, 102, 1) !important;
			}
		}

		.footer-icon {
			width: 27px;
			height: 27px;
			background: url("../../../static/icon.png");
			background-size: 350px 450px;
			background-position: 0px -373px;

			&.home, &.home-active {
				background-size: 336px 407.55px;
				position: absolute;
				height: 48px;
				width: 52px;
				left: -13.5px;
			}

			&.home {
				background-position: -219px -315px;
			}

			&.home-active {
				background-position: -273px -315px;
			}

			&.mall {
				background-position: -27.5px -373px;
			}

			&.service {
				background-position: -55px -373px;
			}

			&.mine {
				background-position: -82.5px -373px;
			}

			&.information-active {
				background-position: -110px -373px;
			}

			&.mall-active {
				background-position: -137.5px -373px;
			}

			&.service-active {
				background-position: -165px -373px;
			}

			&.mine-active {
				background-position: -192.5px -373px;
			}
		}
	}

</style>
