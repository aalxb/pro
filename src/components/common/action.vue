<template>
	<flexbox class="action-groups">
		<flexbox-item v-for="action in actions" :key="action.page">
			<x-button type="primary" v-text="action.text" @click.native="onPageAction(action)"></x-button>
		</flexbox-item>
	</flexbox>
</template>

<script>
	import { Flexbox, FlexboxItem, XButton } from 'vux'
	export default {
		name: "Action",
		components: {
			Flexbox,
			FlexboxItem,
			XButton
		},
		props:{
			actions: {
				type: Array,
				required: true
			}
		},
		data() {
			return {}
		},
		mounted: function () {

		},
		methods: {
			onPageAction (action){
				this.$emit('on-Action', action.name);
			}
		}
	}
</script>

<style lang="less" scoped>
	.action-groups {
		padding: 55px 25px;
		background-color: white;
		/deep/ .weui-btn_primary {
			background-color: #40A0FF;
		}
	}
</style>
