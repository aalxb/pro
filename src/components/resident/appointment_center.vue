<template>
	<div class="wrap">
		<div class="banner">
			<img class="img-responsive" :src="IMG_URL + '/static/appointment_banner.png'">
		</div>
		<div class="entry">
			<group class="group">
				<cell v-for="(type,index) in types" :link="'/accounts?b=' + type.route"
					  :title="type.title" :inline-desc="type.desc" :key="type.route" is-link>
					<div slot="icon" class="left-icon-box"><span :style="{backgroundPositionX: (index * -26.5 ) + 'px'}"></span></div>
				</cell>
			</group>
		</div>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer'
	import {Group, Cell} from 'vux'
	export default {
		name: "appointmentCenter",
		components:{
			fix_footer: Footer, Group, Cell},
		data() {
			return {
				types:[
					{
						title: "预约安装",
						desc: "户内管、热水器、地热、干衣机",
						route: "appointment_install"
					},
					{
						title: "预约点火",
						desc: "已安装燃气表，且购买及安装好燃气设施",
						route: "fire"
					},
					{
						title: "预约换管",
						desc: "灶具连接管更换",
						route: "pipe"
					},
					{
						title: "工单查询",
						desc: "查询工单当前进度情况",
						route: "worksheet"
					},
				]
			}
		},
		mounted: function () {

		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.wrap {
		padding: unset;
		height: unset;
		padding-bottom: 50px;
		.entry {
			/deep/ .weui-cells:before {
				border: unset;
			}
			.left-icon-box {
				height: 50px;
				width: 50px;
				padding: 14px 12px;
				span {
					display: inline-block;
					height: 100%;
					width: 100%;
					background: url("../../../static/icon.png");
					background-size: 350px 450px;
					background-position-y: -270px;
				}
			}
		}
	}
</style>
