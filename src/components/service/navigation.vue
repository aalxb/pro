<template>
	<group title="网点信息">
		<cell v-for="hall in halls" :key="hall.id" :is-link="true" @click.native="onNavigate(hall)"
			  :title="hall.hallName" :inline-desc="hall.address + ' 营业厅说明：' + hall.note"></cell>
	</group>
</template>

<script>
	import {Group, Cell} from 'vux'
    export default {
		name: "navigation",
		components: {Group, Cell},
		data() {
			return {
				platform: this.$route.query['platform'],
				halls: null,
			}
		},
		mounted: function () {
			//this.InitWeixin();
			this.onGetMessage();
			/*if (this.platform == 'WX') {
				this.InitWeixin();
			} else {
				this.InitAlipay();
			}*/
		},
		methods: {
			InitWeixin() {
				let that = this;
				that.$http.post('/Zn/scan/signcode', {shortName:"shyh"})
					.then(function (response) {
						let r = response.data;
						let config_data = {
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: r.appId, // 必填，公众号的唯一标识
							timestamp: parseInt(r.timestamp), // 必填，生成签名的时间戳
							nonceStr: r.nonceStr, // 必填，生成签名的随机串
							signature: r.signature, // 必填，签名
							jsApiList: ['openLocation', 'getLocation'] // 必填，需要使用的JS接口列表
						};
						that.$wechat.config(config_data);
						that.$wechat.ready(function () {
							that.$wechat.checkJsApi({
								jsApiList: ['openLocation', 'getLocation'],
								success: function (res) {
									/*that.$wechat.getLocation({
										type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
										success: function (res) {
											alert(JSON.stringify(res));
										}
									});*/
								}
							});
						})
					});
			},
			InitAlipay() {
				/*if (ap) {
					ap.getLocation(function (res) {
						alert(JSON.stringify(res));
					});
				}*/
			},
			onNavigate(hall) {
				if (this.platform == 'WX') {
					this.$wechat.openLocation({
						latitude: parseFloat(hall.location.split(",")[1]), // 纬度，浮点数，范围为90 ~ -90
						longitude: parseFloat(hall.location.split(",")[0]), // 经度，浮点数，范围为180 ~ -180。
						name: hall.name, // 位置名
						address: hall.address, // 地址详情说明
						scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
					});
				} else if (this.platform == "Alipay") {
					ap.openLocation({
						latitude: parseFloat(hall.location.split(",")[1]), // 纬度，浮点数，范围为90 ~ -90
						longitude: parseFloat(hall.location.split(",")[0]), // 经度，浮点数，范围为180 ~ -180。
						name: hall.name, // 位置名
						address: hall.address, // 地址详情说明
						scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
					});
				} else {
					this.$vux.alert.show({
						title: '提示',
						content: '设备暂不支持路径查询功能',
						onShow() {
						},
						onHide() {
						}
					});
				}
			},
			onGetMessage() {
				let that = this;
				this.$http.get("/Zn/ProfessionalWork/Halls/SelectList?shortName=shyh").then( data=>{
					console.log(data);
					that.halls = data.data[0][0].hallsList;
					console.log("ss",that.halls)
				}).catch(err=>{
					console.log(err);
				})
			},

		},
		beforeRouteEnter(to, from, next) {
			let u = navigator.userAgent;
			let _path = (process.env.NODE_ENV == 'development' ? '' : '/znclientweb');
			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			if (isiOS && (_path + to.path) !== location.pathname) {
				location.assign(_path + to.fullPath)
			} else {
				next()
			}
		},
    }
</script>

<style scoped>

</style>
