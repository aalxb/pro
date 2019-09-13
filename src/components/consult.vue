<template>
	<div>
	<!--<div class="consultlist">
		<div style="float: left">
			<badge></badge><span style="margin-left: 10px">已回复</span>
			<p>更名过户大概多久可以办完，已经...</p>
		</div>
	</div>
		<div class="consultlist">
			<div style="float: left">
				<span style>未回复</span>
				<p>我家有六口人，燃气费怎么算，是...</p>
			</div>
			<div style="float: right;line-height: 60px;">
				<a href="javasctipt:void(0)" style="color: #40A0FF">撤销</a>
			</div>
		</div>-->
			<group>
				<cell>
					<span slot="title"><span style="vertical-align:middle;">更名过户大概多久可以办完，已经...</span></span>
					<a href="javascript:void(0)" style="color: #40A0FF">修改</a>
					<span slot="inline-desc"><badge></badge><span style="margin-left: 10px">未回复</span></span>
				</cell>
			</group>
	</div>
</template>

<script>
	import {Badge, Group, Cell} from 'vux'

	export default {
		name: "consult",
		components: {
			Badge,
			Group,
			Cell
		}
	}
</script>

<style scoped>
.consultlist{
	margin-left: 15px;margin-right: 15px;height: 60px;
	border-bottom: 1px solid #F3F3F7;margin-top: 5px;
}
	.consultlist span{
		font-size: 12px;
		color: #999999;
	}
	.consultlist p{
		font-size: 17px;
		color: #333333;
	}
</style>
