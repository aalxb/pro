<template>
	<div id="app">
		<router-view></router-view>
		<!--<Robot @onRobot="onRobot" v-if="$route.path !== '/chat' && $route.path !== '/register'">-->
			<!--<div class="img" slot="icon"></div>-->
		<!--</Robot>-->
	</div>
</template>

<script>
	import Robot from './components/robot'
	export default {
		name: 'app',
		components:{
			Robot
		},
		methods:{
			onRobot (){
				this.$router.push({
					path:'chat'
				});
			}
		}
	}
</script>

<style lang="less">
	@import '~vux/src/styles/1px.less';
	@import '~vux/src/styles/reset.less';
	* {
		box-sizing: border-box;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}

	html, body {
		height: 100%;
		background-color: #fbf9fe;
	}
	#app {
		height: 100%;
	}
	.wrap {
		height: 100%;
		padding: 8px 8px 0 8px;
		background-color: #fff;
	}
	.img-responsive {
		display: block;
		max-width: 100%;
		height: auto;
		margin: 0 auto;
	}
	.main_menu .weui-grid__icon, .swiper .weui-grid__icon {
		height: 42px;
		width: 42px;
	}
	.main_menu .weui-grid__icon, .contant .weui-grid__icon {
		height: 42px;
		width: 42px;
	}
	.bold-address {
		font-weight: bold;
		font-size: 17px;
		background-color: #fff;
	}
	.bold-title {
		font-weight: bold;
		font-size: 16px;
	}
	.page .weui-cells:before,
	.page .weui-cells:after {
		border: unset;
	}
	.notice-tip {
		padding: 0 15px;
	}
	.slot-tip {
		color: #40A0FF;
	}
	.slot-tip span {
		display: inline-block;
		font-size: 14px;
		vertical-align: middle;
	}

	.action-groups {
		padding: 25px 25px 45px 25px;
		background-color: white;
	}
	.action-groups .weui-btn_primary {
		background-color: #40A0FF;
	}
	.action-groups .weui-btn_disabled.weui-btn_primary {
		background-color: #80b6ea;
	}
	.img-download {
		height: 50px;
		line-height: 50px;
		color: #2a9ef5;
		border: 1px solid #e5e5e5;
		margin: 10px 15px 0 15px;
		font-size: 14px;
		text-align: center;
	}
	.check-list .weui-cells_checkbox .weui-check:checked + .vux-checklist-icon-checked:before{
		color: #40A0FF;
	}
	.warning-tip {
		font-size: 14px;
		color: red;
		padding: 10px;
	}
	.bd-top {
		height: 1px;
		left: 15px;
	}
	.card-body .flow-big {
		width: 18px;
		height: 18px;
	}
	.card-body .flow-big .weui-wepay-flow__state {
		background-color: #40A0FF;
		width: 18px;
		height: 18px;
		border-radius: 9px;
		line-height: 18px;
	}
	.card-body .weui-wepay-flow__line_done .weui-wepay-flow__process,
	.card-body .weui-wepay-flow__li_done .weui-wepay-flow__state {
		background-color: #40A0FF;
	}
	.card-body .weui-wepay-flow__line_done:last-child {
		display: none;
	}

	// 7/29
	// .weui-dialog__ft{
	// 	.weui-dialog__btn_primary}
	// 		background: #007BD9 !important;
	// 		color: #fff;
	// 	}
	// }
</style>
