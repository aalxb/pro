<template>
	<div class='wrap'>
		<div class="tel" v-if="name == 'tel' ">
			<img :src="IMG_URL + '/static/tel.jpg'">
			<div class="item">
				<a :href=" 'tel:' + item.number" v-for="(item,index) in telList">
					<span>{{item.text}}</span>
					<p>{{item.number}}</p>
				</a>
			</div>
		</div>
		<div class="population" v-else-if="name == 'population'">
			<img :src="IMG_URL + '/static/population.jpg'">
			<div class="one-img">
				<img :src="IMG_URL + '/static/population1.jpg'">
			</div>
		</div>
		<div class="SP" v-else-if="name == 'SP'">
			<img :src="IMG_URL + '/static/SP.jpg'">
		</div>
		<div class="charge" v-else-if="name == 'charge'">
			<img :src="IMG_URL + '/static/charge.jpg'">
		</div>
		<div class="pay" v-else-if="name == 'pay'">
			<img :src="IMG_URL + '/static/pay1.jpg'">
			<div class="one-img">
				<img :src="IMG_URL + '/static/pay.jpg'">
			</div>
		</div>
		<div v-else-if="name =='question'">
			<img :src="IMG_URL + '/static/question.jpg'">
			<group title=" ">
				<template v-for="question in questions">
					<cell :title="question.title" is-link :arrow-direction="question.show ? 'up' : 'down'"
						  :border-intent="false" @click.native="question.show = !question.show">
					</cell>
					<div class="content" :class="question.show?'animate':''">
						<template v-if="question.content" v-for="content in question.content">
							<p v-html="content"></p>
							<div class="x-table" v-if="question.table">
								<x-table :full-bordered="true">
									<thead>
										<tr>
											<th>阶梯</th>
											<th>户年用气量（立方米）</th>
											<th>含税价格（元/立方米）</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>第一档</td>
											<td>0-276（含）</td>
											<td>3.10</td>
										</tr>
										<tr>
											<td>第二档</td>
											<td>276-480（含）</td>
											<td>3.72</td>
										</tr>
										<tr>
											<td>第三档</td>
											<td>480以上</td>
											<td>4.65</td>
										</tr>
									</tbody>
								</x-table>
							</div>
						</template>
					</div>
				</template>

			</group>
		</div>
		<div v-else-if="name == 'navigation'">
			<group title="服务网点">
				<cell v-for="hall in halls" @click.native="onOpenMap(hall)"
					  :title="hall.name" :inline-desc="hall.address" is-link :key="hall.location"></cell>
			</group>
		</div>
		<div class="commitment" v-else>
			<img :src="IMG_URL + '/static/commitment1.jpg'">
			<div class="one-img">
				<img :src="IMG_URL + '/static/commitment.jpg'">
			</div>

		</div>
	</div>
</template>

<script>
	import { Group, Cell, XTable} from 'vux'
	export default {
		name: "infoImage",
		components:{
			Group,
			Cell,
			XTable
		},
		data() {
			return {
				name: null,
				telList: [
					{
						number: '0571-967266',
						text: '热线电话: '
					},
					{
						number: '0571-85356666',
						text: '	抢修电话：'
					},
					{
						number: '0571-967266',
						text: '杭州燃气灶具连接管更换电话：'
					},
					{
						number: '0571-88196025',
						text: '杭州燃气用户经营有限公司燃气用具维修电话：'
					}
				],
				halls:[],
				questions:[
					{
						title:'居民管道燃气开户申请业务办理',
						show:false,
						content: [
							"受理事项",
							"&nbsp;&nbsp;&nbsp;&nbsp;1．必要材料:产权人有效身份证明原件(身份证,护照,军官证)；如代办人申请,同时提供代办人有效身份证明原件。",
							"&nbsp;&nbsp;&nbsp;&nbsp;2．补充材料:有效房产证明、残疾证或在有效期内由市民政局颁发的困难家庭救助证、户口簿等",
							"受理业务类型及收费标准:",
							"&nbsp;&nbsp;&nbsp;&nbsp;① 户内管安装服务费:250元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;② 热水器安装服务费:200元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;③ 地热安装服务费:500元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;④ 干衣机、燃气烤箱燃气管材料:按实收费；",
							"&nbsp;&nbsp;&nbsp;&nbsp;⑤ 所属区域房产未缴纳过燃气设施预埋费的客户申请开通管道燃气户内管安装服务时需同步交纳燃气设施改造费:1000元/户",
							"注：",
							"&nbsp;&nbsp;&nbsp;&nbsp;1.未缴纳过燃气设施预埋费是指房屋建设时未实施燃气设施配套并未缴纳预埋费的住宅。",
							"&nbsp;&nbsp;&nbsp;&nbsp;2.灶前阀至灶具间连接金属软管的材料费用由用户承担。",
						],
					},
					{
						title:'居民用户户内管道拆改业务办理',
						show:false,
						content:[
							"申请材料目录",
							"&nbsp;&nbsp;&nbsp;&nbsp;1,燃气开户人有效身份证明原件(身份证,护照,军官证):如代办人申请,同时提供代办人有效身份证明原件；",
							"&nbsp;&nbsp;&nbsp;&nbsp;2、拆表停用,表热同拆业务需提供表具度数照片。",
							"受理业务类型及收费标准",
							"&nbsp;&nbsp;&nbsp;&nbsp;1、拆表停用：30元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;2、拆热水器气管:30元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;3、表热同拆:30元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;4、燃气表移位；",
							"&nbsp;&nbsp;&nbsp;&nbsp;5、表后管改动；",
							"&nbsp;&nbsp;&nbsp;&nbsp;6、热水器移位；",
							"&nbsp;&nbsp;&nbsp;&nbsp;7、表前管改动申请。",
						],
					},
					{
						title:'居民用户管道燃气退户业务办理',
						show:false,
						content:[
							"受理事项",
							"&nbsp;&nbsp;&nbsp;&nbsp;1、2012年7月1日前申请开户。未安装或已安装未点火的管道燃气用户要求办理燃气退户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;2、2012年7月1日后已办理管道燃气开户手续,未安装用户需要撤销退户。",
							"申请材科目录",
							"&nbsp;&nbsp;&nbsp;&nbsp;1、必要材料:燃气开户人有效身份证明原件(身份证、护照、军宫证):如代办人申请同时提供代办人有效身份证明原件；",
							"&nbsp;&nbsp;&nbsp;&nbsp;2.补充材料:发票原件或电子发票(若纸质发票遗失需提交相关情况说明,电子发票营业厅查询)。",
							"受理业务类型及收（退）费标准:",
							"&nbsp;&nbsp;&nbsp;&nbsp;1、户内管：",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（1）2012年7月1日前开户已安装未点火，收取30元拆表费，凭有效发票退还当年缴纳的开户费；",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（2）2012年7月1日前开户未安装,凭有效发票退还当年缴纳的开户费；",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（3）2012年7月1后开户未安装,凭有效发票退还缴纳的安装服务费；",
							"&nbsp;&nbsp;&nbsp;&nbsp;2、热水器气管未安装,退费200元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;3、地热气管未安装,退费500元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;4、2019年3月1日前开通干衣机未安装，退费200元/户；",
							"&nbsp;&nbsp;&nbsp;&nbsp;5、未配套小区燃气设施改造费,未点火退费1000元/户。",
						],
					},
					{
						title:'终止或重新签订《供用气合同》',
						show:false,
						content:[
							"&nbsp;&nbsp;&nbsp;&nbsp;定义：因房屋产权发生变更，原房屋产权人应及时提出终止用气申请，以规避因安全、经济问题而承担的责任。下列情形，用于终止或重新签定《供用气合同》：",
							"&nbsp;&nbsp;&nbsp;&nbsp;1．房屋产权人凭身份证原件、有效房产证明原件，提出终止使用申请、签定《终止供用气协议》、结清气款、缴纳相关拆除费用，天然气公司落实停气措施后，双方供用气合同终止。",
							"&nbsp;&nbsp;&nbsp;&nbsp;2．原房屋产权人与现产权人达成变更使用意向，结清气费后，现产权人与天然气公司重新签定《供用气合同》，原《供用气合同》终止。",
							"&nbsp;&nbsp;&nbsp;&nbsp;3．因房屋产权发生变更，现房屋产权人凭身份证及有效房产证明原件，向天然气公司申请继续使用户内管道燃气设施，并愿意承担原房屋产权人所签定的《供用气合同》中明确的责任义务，现产权人与天然气公司重新签定《供用气合同》，原《供用气合同》终止。",
						],
					},
					{
						title:'居民用户管道燃气多人口业务',
						show:false,
						content:[
							"受理事项",
							"&nbsp;&nbsp;&nbsp;&nbsp;管道燃气居民用户地址对应的户人口在4人(不含4人)以上,4人以上每增加度用气量60立方米,有效期2年,2年到期应提前2个月中请再次办理。",
							"申请材科目录",
							"&nbsp;&nbsp;&nbsp;&nbsp;1、必要材料:然气开户人有效身份证明原件(身份证、护照、军官证)，如代办人申请同时提供代办人有效身份证明原件；",
							"&nbsp;&nbsp;&nbsp;&nbsp;2、补充材料:居住证、临时居住证或属地流动人口服务处开具证明,对应户籍人口的身份信息通过杭州市公共数据其享平台查询。",
						],
					},
					{
						title:'燃气阶梯气价',
						show:false,
						content:[
							"&nbsp;&nbsp;&nbsp;&nbsp;实行阶梯气价后，计量周期采用“抄表年”，一个“抄表年”作为一个年度阶梯气价结算周期。根据《杭州市物价局关于杭州市区居民生活用管道天然气实行价格改革的通知》（杭价资〔2015〕145号）文件，分档气量和价格见下表：",
						],
						table:true
					},
					{
						title:'燃气费用缴纳方式',
						show:false,
						content:[
							"(一).至公司营业网点缴费;",
							"(二).网上缴费",
							"&nbsp;&nbsp;&nbsp;&nbsp;1.打开支付宝或杭州天然气有限公司微信号(提前加关注哦);",
							"&nbsp;&nbsp;&nbsp;&nbsp;2.点击底部“19服务厅”并进入;",
							"&nbsp;&nbsp;&nbsp;&nbsp;3.点击“燃气缴费”按钮进行缴费操作;",
							"(三).用户第一次在营业厅缴费后，拿缴费单到指定银行办理代扣，可绑定代扣的银行有：工商、建行、农行、杭州银行、浦发、招商、中国、中信实业、华夏、邮政、交通、联合、深发展银行;",
							"(四).用户可通过银行进行现金缴费，可接受现金缴费的银行有：中国工商银行、杭州银行、中国银行、民生银行、浦发银行、联合银行;",
						],
					},
					{
						title:'软管更换、灶具维修电话',
						show:false,
						content:[
							"&nbsp;&nbsp;&nbsp;&nbsp;杭州燃气灶具连接管更换电话：0571-967266；",
							"&nbsp;&nbsp;&nbsp;&nbsp;燃气具维修电话：88196025。"
						],
					},
					{
						title:'服务承诺',
						show:false,
						content:[
							"&nbsp;&nbsp;&nbsp;&nbsp;(一).稳定供气：向用户提供不间断的燃气供应服务，因例行检修等情况需要暂停供气的，提前48小吋向社会公告。",
							"&nbsp;&nbsp;&nbsp;&nbsp;(二).安全服务：开展户内管道天然气设施安检。非居民用户一年，居民用户两年安检一次，为到访不遇的用户提供预约安检服务。燃气抢修电话85356666 24小时值守。抢修三分钟出车，维修6小时内修复。",
							"&nbsp;&nbsp;&nbsp;&nbsp;(三).服务方便性：为用户提供热线、19网上服务和营业网点等多种服务方式。受理用户咨询、业务预约/办理、投诉、意见建议等服务。",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、 杭州天然气967266服务热线，24小时向用户提供服务（8: 00-21 : 00提供人工服务，其余时间提供语音留言服务）。",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、 燃气19网上服务厅审核： 8:00-16:00之间办理的，两小时内审核反馈用户；16:00-次日8:00，在次日10:00之前审核完毕。",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、 燃气营业网点的营业时间具体可在19网上服务厅以及公司网站查询。",
							"&nbsp;&nbsp;&nbsp;&nbsp;(四).服务效率：",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、 燃气安装、点火、拆改、灶具连接管更换：按照用户预约成功的日期上门，并会提前一天联系确认具体上门时间(精确到上、下午及小时)。",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;预约途径：",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、进入燃气19网上服务厅预约。",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、拨打燃气热线967266预约。",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3、至燃气营业服务网点预约。",
							"&nbsp;&nbsp;&nbsp;&nbsp;(五).其它优质服务承诺：",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1、 定制化采暖服务： “12341”服务（1天受理，2天上门踏勘，签订合同后3天内安装完成，24小时上门维修 、上门人员统一挂牌、统一服装）。",
							"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、 非居民用户一站式开户服务：小共建(用气量在16方/小时及以下）项目，从正式受理8天内安装完成，由施工单位代办或用户自已填写《非居民用户管道燃气报装(通气)业务申请表》，按受理要求实施通气。用气量在16方/小时以上普通公建(非配套或预埋)项目，从正式受理19天内安装完成，由施工单位代办或用户自己填写《非居民用户管道燃气报装(通气)业务申请表》，按受理要求实施通气。",
						],
					},
				],
				showQuestion:false
			};
		},
		mounted: function () {
			this.name = this.$route.query.name;
			if( this.name == 'navigation' ){
				let that = this;
				this.$http.get('/platform/weixin/jsapi_signature',{})
					.then(data => {
						let r = data;
						that.$wechat.config({
							debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							appId: r.app_id, // 必填，公众号的唯一标识
							timestamp: r.timestamp, // 必填，生成签名的时间戳
							nonceStr: r.noncestr, // 必填，生成签名的随机串
							signature: r.signature, // 必填，签名
							jsApiList: ["openLocation", "getLocation"], // 必填，需要使用的JS接口列表
						});
					});
				that.$wechat.ready(function () {
					that.$wechat.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function (res) {
							that.get_halls(res);
						}
					});
				});
			}
		},
		methods: {
			get_halls (res){
				let that = this;
				that.$http.get('/manager/hall/info')
					.then( result => {
						that.halls = result.halls;
						let data = {};
						data.url = ["v3","distance"];
						data.origins = "";
						data.destination = Number(res.longitude).toFixed(6) + "," + Number(res.latitude).toFixed(6);
						for( let j = 0; j < that.halls.length; j++ ){
							data.origins += that.halls[j].location + "|";
						}
						data.origins.substr(0,data.origins.length - 1);
						data.type = 1;
						that.$http.post('/TransferSystem/gaode',JSON.stringify(data),{headers:{'Content-Type': 'application/json; charset=utf-8'}})
							.then( response => {
								if( response.status == "1" ){
									let results = response.results;
									for( let k = 0; k < results.length; k++ ){
										that.halls[k].distance = results[k].distance;
									}
									that.halls.sort(function (a, b) {
										return a.distance - b.distance;
									});
								} else {
									that.$vux.alert.show({
										title:'错误',
										content:'获取距离当前位置最近营业厅信息失败！'
									})
								}
							})
							.catch( err => {
								console.log(err);
								that.$vux.alert.show({
									title:'错误',
									content:'获取距离当前位置最近营业厅信息失败！'
								})
							});
					})
					.catch( err => {
						console.log(err);
					});
			},
			onOpenMap (hall){
				this.$wechat.openLocation({
					latitude: parseFloat(hall.location.split(",")[1]), // 纬度，浮点数，范围为90 ~ -90
					longitude: parseFloat(hall.location.split(",")[0]), // 经度，浮点数，范围为180 ~ -180。
					name: hall.name, // 位置名
					address: hall.address, // 地址详情说明
					scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
				});
				/*if ( weixinReady ){
					wx.openLocation({
						latitude: parseFloat(halls[index].location.split(",")[1]), // 纬度，浮点数，范围为90 ~ -90
						longitude: parseFloat(halls[index].location.split(",")[0]), // 经度，浮点数，范围为180 ~ -180。
						name: halls[index].name, // 位置名
						address: halls[index].address, // 地址详情说明
						scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
					});
				} else if ( getPlatform() == "alipay" ){
					ap.openLocation({
						latitude: parseFloat(halls[index].location.split(",")[1]), // 纬度，浮点数，范围为90 ~ -90
						longitude: parseFloat(halls[index].location.split(",")[0]), // 经度，浮点数，范围为180 ~ -180。
						name: halls[index].name, // 位置名
						address: halls[index].address, // 地址详情说明
						scale: 15, // 地图缩放级别,整形值,范围从1~28。默认为最大
					});
				} else {
					showAlert("暂不支持路径查询功能！", null, null);
				}*/
			}
		},
		beforeRouteEnter(to, from, next) {
			let u = navigator.userAgent;
			let _path = (process.env.NODE_ENV == 'development' ? '/web/ui' : '/web/ui');
			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

			if (isiOS && (_path + to.path) !== location.pathname) {
				location.assign(_path + to.fullPath)
			} else {
				next()
			}
		},
	}
</script>

<style lang="less" scoped>
	.wrap {
		img {
			width: 100%;
		}
		.tel {
			.item {
				a {
					display: inline-block;
					padding: 10px 0 10px 10px;
					width: 100%;
					background: #f2f9ff;
					margin-bottom: 10px;
					font-size: 15px;
					color: #333;

					p {
						color: #0e91ff;
						font-size: 18px;
					}
				}

			}
		}
		/deep/ .weui-cell {
			padding: 14.5px 8px;
			color: #333;
		}
	}

	.one-img {
		img {
			border: none;
			vertical-align: middle;
			max-width: 100%;
		}
	}

	.content {
		/*padding: 10px 8px;*/
		overflow: hidden;
		max-height: 0;
		transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
		background-color: #f3f3f3;
		font-size: 14px;
		p {
			margin: 0 8px 5px 8px;
			color: #666;
			&:first-child {
				margin-top: 10px;
			}
			&:last-child {
				margin-bottom: 10px;
			}
		}
		.x-table {
			padding: 5px 8px;
		}
	}

	.animate {
		max-height: 9999px;
		transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
		transition-delay: 0s;
	}
</style>
