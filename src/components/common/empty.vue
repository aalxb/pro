<template>
    <div class="empty">
		<img :src="IMG_URL + '/static/empty_' + type + '.png'">
		<span v-text="text"></span>
	</div>
</template>

<script>
	export default {
		name: "Empty",
		props:{
			type:{
				type: String,
				required: false,
				default: 'record'
			},
			text:{
				type: String,
				required: false,
				default: '暂无记录'
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
	.empty {
		width: 80%;
		margin: 0 auto;
		background-color: white;
		text-align: center;
		position: relative;
		img {
			max-width: 100%;
		}
		span {
			position: absolute;
			left: 50%;
			margin-left: -32px;
			bottom: 20px;
			color: #999;
		}
	}
</style>
