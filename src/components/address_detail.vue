<template>
    <group title="地址信息" v-if="info">
		<cell title="地址" :value="info.address"></cell>
		<cell title="产权人" :value="info.xm || info.yhxm"></cell>
		<cell title="身份证号码" :value="parseId(info.sfzh)"></cell>
		<cell title="用户编号" :value="info.slbh"></cell>
		<cell title="受理编号" :value="info.yhbh"></cell>
		<cell title="开通日期" :value="info.ktzt"></cell>
	</group>
</template>

<script>
	import {ownerIdVerify} from '../assets/common'
	import {Group, Cell} from 'vux'
	export default {
		name: "",
		components:{
			Group,
			Cell
		},
		data() {
			return {
				code: '',
				info: null
			}
		},
		mounted: function () {
			this.code = this.$route.query.code;
			this.onGetAddressDetail()
		},
		methods: {
			onGetAddressDetail (){
				let that = this;
				that.$http.post('/TransferSystem/query/userInfo', that.qs.stringify({uCode: that.code}))
					.then(value => {
						if( value ){
							that.info = value;
						} else {
							that.$vux.alert.show({
								title: '错误',
								content: '未查找到用户数据！'
							})
						}
					})
					.catch(err => {
						console.log(err);
						that.$vux.alert.show({
							title: '错误',
							content: '未查找到用户数据！'
						})
					})
			},
			parseId (id){
				if( isNaN(parseInt(id.substr(0, 1), 10)) ){
					id = id.substr(1);
				}
				if( id.length == 15 ){
					id = ownerIdVerify(id.substr(0, 6) + "19" + id.substr(6));
				}
				return id.replace(/^(\d{2})\d{12}(\d{4})$/, '$1************$2');
			}
		}
	}
</script>

<style lang="less" scoped>

</style>
