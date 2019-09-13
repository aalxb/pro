<template>
    <div class="fix-footer">
		<a href="javascript:;" v-text="text"></a>
	</div>
</template>

<script>
	export default {
		name: "Footer",
		props:{
			text:{
				type: String,
				required: false,
				default: ''
			}
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
	.fix-footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
		background-color: white;
		z-index: 10;
		border-top: 1px solid #efefef;
		text-align: center;
		a {
			color: #333;
			display: inline-block;
			padding: 5px 0;
			font-size: 14px;
		}
	}
</style>
