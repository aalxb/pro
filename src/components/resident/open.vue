<template>
	<div class="wrap">
		<div class="card" v-for="card in cards" :key="card.name" :style="{backgroundColor:card.background}" @click="onRoute(card.name)">
			<div class="title">{{card.title}}</div>
			<div class="desc" v-html="card.desc"></div>
		</div>
		<div class="card-tip">已开通热水器或地热，需要预约安装的用户请拨打967266，或前往 <span @click="onRoute('appointment')"> 预约中心 </span> 进行预约。</div>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer'
	export default {
		name: "Open",
		components:{
			fix_footer : Footer
		},
		data() {
			return {
				cards: [
					{
						name: 'new_install',
						title: '燃气新开',
						desc: '仅限首次开通燃气<br/>未与我公司签订《供用气合同》的居民用户。',
						background: '#3F71D6'
					},
					// {
					// 	name: 'additional_install',
					// 	title: '燃气补开',
					// 	desc: '已开通管道燃气灶具<br/>需要申请补开热水器或地热的居民用户。',
					// 	background: '#428FE5'
					// },
				],
				type:null
			}
		},
		mounted: function () {
			console.log("info",this.$route.query.type)
			if(this.$route.query.type == '居民'){
				this.type = 1
			}else{
				this.type = 2
			}

			/*this.$vux.alert.show({
				title: '提示',
				content: '适用于居民客户首次开通管道燃气或申请补开其他燃气项目（户内管、热水器、地热等）的业务受理。'
			})*/
		},
		methods: {
			onRoute (name) {
				let type = {
					type:this.type
				}
				this.$router.push({
					path:name,
					query:type
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		.card {
			margin: 30px 8px;
			border-radius:10px;
			min-height: 120px;
			text-align: center;
			color: #fff;
			box-shadow: 0 6px 6.5px 1.5px rgba(182,199,235,1);
			.title {
				font-size: 20px;
				font-weight: bold;
				padding-top: 18px;
			}
			.desc {
				font-size: 14px;
				padding: 10px;
			}
		}
		.card-tip {
			padding: 0 8px;
			color: #999;
			span {
				color: #40A0FF;
			}
		}
	}
</style>
