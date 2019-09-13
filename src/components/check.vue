<template>
	<div>
		<div class="plate" v-show="safes == false">
			<p class="p_icon">
				<icon type="warn"></icon>
				隐患
			</p>
			<p class="p_mes">户内管暗封、燃气表通风不良、设施密闭</p>
		</div>
		<div class="plate_safe" v-show="safes == true">
			<p class="p_icon">
				<icon type="success"></icon>
				安全
			</p>
			<p class="p_mes">暂无安全隐患</p>
		</div>
		<div class="checklist">
			<cell title="户内管暗封、燃气表通风不良、 设施密闭" value="2019-05-29"></cell>
			<cell title="户内管暗封" value="2017-05-15"></cell>
			<cell title="户内管暗封、燃气表通风不良、 设施密闭" value="2015-03-21"></cell>
		</div>
	</div>
</template>

<script>
	import {Icon, Cell} from 'vux'

	export default {
		name: "check",
		components: {
			Icon, Cell
		},
		data(){
			return{
				safes:false,
			}
		}
	}
</script>

<style scoped>
	.plate {
		box-shadow: 0px 8px 54px 0px rgba(3, 40, 63, 0.10);
		border-radius: 10px;
		text-align: center;
		height: 113px;
		margin-left: 15px;
		margin-right: 15px;
		color: #FF381E;
		margin-bottom: 17px;
	}

	.plate_safe {
		box-shadow: 0px 8px 54px 0px rgba(3, 40, 63, 0.10);
		border-radius: 10px;
		text-align: center;
		height: 113px;
		margin-left: 15px;
		margin-right: 15px;
		color: #00A417;
		margin-bottom: 17px;
	}

	.plate .p_icon {
		padding-top: 12.5px;
		font-size: 20px;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		display: inline-block;
	}

	.plate_safe .p_icon {
		padding-top: 12.5px;
		font-size: 20px;
		font-family: PingFang-SC-Bold;
		font-weight: bold;
		display: inline-block;
	}

	.plate .p_mes {
		padding-top: 7px;
		font-size: 17px;
		font-family: PingFang-SC-Medium;
	}

	.plate_safe .p_mes {
		padding-top: 7px;
		font-size: 17px;
		font-family: PingFang-SC-Medium;
	}

	.checklist > .vux-label {
		width: 225px !important;
	}

	.checklist  > .weui-cell {
		height: 60px;
		border-bottom: 1px solid #F3F3F7;
	}
</style>
