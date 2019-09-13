<template>
	<div class="wrap">
		<div class="make_record pd">
			<div>
				<h3>预约安装</h3>
			</div>
			<div class="row_flow">
				<flow>
					<flow-state state="1" :title="'预约'" is-done></flow-state>
					<flow-line is-done></flow-line>
					<flow-state state="2" is-done>
						<span slot="title">{{ '派单' }}</span>
					</flow-state>
					<flow-line is-done></flow-line>
					<flow-state state="3" :title="'接单'"></flow-state>
					<flow-line></flow-line>
					<flow-state state="4" :title="'完成'"></flow-state>
					<flow-line></flow-line>
					<flow-state state="5" :title="'评价'"></flow-state>
				</flow>
			</div>
			<div>
				<h5>工单流转记录</h5>
			</div>
			<div class="cloum_flow timeline-demo">
				<timeline>
					<timeline-item>
						<h4> 景秀家园2幢2单元1302室-预约成功</h4>
						<p>联系电话： 13845845456</p>
						<p>2019-06-17 10:23:00</p>
					</timeline-item>
					<timeline-item>
						<h4 class="recent">【热线】 热线1 已派单</h4>
						<p class="recent">2019-06-17 12:00:00</p>
					</timeline-item>
					<timeline-item>
						<h4>接单</h4>
						<p>-</p>
					</timeline-item>
					<timeline-item>
						<h4>完成</h4>
						<p>-</p>
					</timeline-item>
					<timeline-item>
						<h4>评价</h4>
						<p>-</p>
					</timeline-item>
				</timeline>
			</div>
		</div>
		<div class="divider"></div>
	</div>
</template>

<script>
	import { Flow, FlowState, FlowLine, Timeline, TimelineItem, XButton } from 'vux'
	export default {
		name: "Worksheet",
		components: {
			Flow,
			FlowState,
			FlowLine,
			Timeline,
			TimelineItem,
			XButton
		},
		data() {
			return {}
		},
		mounted: function () {

		},
		methods: {}
	}
</script>

<style lang="less" scoped>

</style>
