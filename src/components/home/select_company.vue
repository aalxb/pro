<template>
	<popup v-model="show" height="100%">
		<div class="company">
			<div class="banner">
				<img :src="IMG_URL + '/static/company_bg.png'">
				<span class="back" @click="onCancel">返回</span>
			</div>
			<div class="company-list">
				<div class="title">选择你所在地区</div>
				<group gutter="0">
					<template v-if="cities.length" v-for="city in cities">
						<cell :title="city.name" is-link :arrow-direction="city.show ? 'up' : 'down'"
							  :border-intent="false" @click.native="city.show = !city.show">
						</cell>
						<div class="content" :class="city.show?'animate':''">
							<cell v-for="company in city.company" :key="company.shortName"
								  :title="company.title" is-link @click.native="onSetCompany(company)">
							</cell>
						</div>
					</template>
					<template v-else>
						<cell title="暂无数据"></cell>
					</template>
				</group>
			</div>
		</div>
	</popup>
</template>

<script>
	import {Popup, Group, Cell} from 'vux'
	import {mapMutations} from "vuex";
	export default {
		name: "selectCompany",
		props:{
			show:{
				type:Boolean,
				required:true,
			},
			ShortName:{
				type:String,
				required:false,
			},
		},
		components:{
			Popup,
			Group,
			Cell
		},
		data() {
			return {
				cities:[]
			}
		},
		mounted: function () {
			this.onGetCompanys();
		},
		methods: {
			...mapMutations([
				'setCompany',
			]),
			onGetCompanys(){
				this.$http.get("/Zn/ProfessionalWork/Halls/SelectList").then( data=>{
					data = data.data[0];
					let city = [];
					for ( let i = 0; i < data.length; i++ ){
						let index = city.indexOf(data[i].city);
						if( index == -1 ){
							city.push(data[i].city);
							this.cities.push({
								name:data[i].city,
								company:[{
									title:data[i].title,
									shortName:data[i].shortName,
									shortTitle:data[i].shortTitle
								}],
								show:false
							});
						} else {
							this.cities[index]['company'].push({
								title:data[i].title,
								shortName:data[i].shortName,
								shortTitle:data[i].shortTitle
							});
						}
						if( data[i].shortName == this.ShortName ){
							this.setCompany(data[i]);
						}
					}
				}).catch(err=>{
					console.log(err);
				})
			},
			onCancel(){
				this.$emit('onCancelCompany');
			},
			onSetCompany(company){
				this.setCompany(company);
				this.$emit('onCancelCompany');
			}
		}
	}
</script>

<style lang="less" scoped>
	.company {
		background:linear-gradient(293deg,rgba(4,146,236,1) 0%,rgba(0,112,223,1) 100%);
		padding: 40px 0;
		height: 100%;
		overflow: auto;
		.banner {
			text-align: center;
			position: relative;
			img	{
				width: 70%;
				margin: 0 auto;
			}
			.back {
				color: white;
				position: absolute;
				right: 15px;
				top: -15px;
			}
		}
		.company-list {
			margin: 0 12px;
			border-radius:6px;
			background-color: white;
			padding: 20px 6px 30px 6px;
			.title {
				text-align: center;
				color: #333;
				font-size: 18px;
				margin-bottom: 20px;
			}
			.content {
				overflow: hidden;
				max-height: 0;
				transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
				background-color: #f3f3f3;
				font-size: 14px;
			}
			.animate {
				max-height: 9999px;
				transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
				transition-delay: 0s;
			}
		}
	}
</style>
