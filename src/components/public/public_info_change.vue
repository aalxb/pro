<template>
    <div class="wrap">
		<group title=" ">
			<CellBox is-link v-for="type in types" :key="type.name" v-text="type.title" :link="'/accounts?b=' + type.name"></CellBox>
		</group>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer';
	import {Group, CellBox} from 'vux'
	export default {
		name: "publicInfoChange",
		components:{
			fix_footer: Footer,
			Group,
			CellBox
		},
		data() {
			return {
				types:[
					{
						title:'用气单位变更',
						name:'public_company_change'
					},
					{
						title:'付款方式变更',
						name:'public_payment_change'
					},
					{
						title:'产权单位更名',
						name:'public_company_rename'
					},
					{
						title:'过户预约',
						name:'public_transfer'
					},
					{
						title:'销户预约',
						name:'public_precancel'
					},
					{
						title:'开票资料变更',
						name:'public_receipt_change'
					}
				]
			}
		},
		mounted: function () {

		},
		methods: {}
	}
</script>

<style lang="less" scoped>

</style>
