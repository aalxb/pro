<template>
    <div class="wrap">
		<template v-if="page == 'manual'">
			<div class="contract">
				<div class="contract-title">
					<p>非居民客户管道燃气</p>
					<p>服务指南</p>
				</div>
				<div class="contract-body">
					<p>尊敬的客户：</p>
					<p class="content">为指导您办理、开通管道燃气，安全使用绿色、环保、经济的天然气，现将办理流程和有关注意事项特别提醒。</p>
					<p class="title">一、天然气理化特性</p>
					<p class="content">天然气是一种无色的易燃易爆气体，比空气轻，密闭空间内泄漏达到其爆炸极限（5-15%）遇火花会引起爆炸。高浓度天然气易造成人员窒息甚至死亡，使用场所应保持自然通风或强制通风。</p>
					<p class="title">二、燃气报警装置的安全性、重要性</p>
					<p class="content">根据《城镇燃气设计规范》（GB50028-2006）、《民用建筑供暖通风及空气调节设计规范》（GB20376-2012），在下列场所应设置燃气浓度检测报警器：</p>
					<p class="content">1、地下室、半地下室和地上密闭的用气空间；</p>
					<p class="content">2、厨房的通风开口有效面积小于该房间地板面积的10%，或小于0.6平方米。</p>
					<p class="content">燃气浓度检测报警器一旦检测到燃气泄漏浓度达到爆炸下限临界点时，会自动报警并关闭安装在管道上的紧急切断阀，切断气源从而降低事故风险。</p>
					<p class="title">三、开通管道燃气申请受理资料</p>
					<p class="content">1、提供营业执照副本复印件或正在办理的证明材料（事业单位、部队等无营业执照除外）；</p>
					<p class="content">2、燃气具平面布置图、燃气具设备清单（以上资料可在踏勘设计环节提供，或由设计院免费提供参考方案供认可。）</p>
					<p class="title">四、办理环节（流程）</p>
					<p>（一）登记受理</p>
					<p class="content">1、资料齐全即时受理；</p>
					<p class="content">2、填写《非居民用户燃气预埋改造受理单》。</p>
					<p>（二）踏勘设计</p>
					<p class="content">1、踏勘根据客户的预约时间，如用户无特别需求，燃气客户经理当面或电话与客户约定第二天上门踏勘；客户经理或设计人员上门踏勘时，客户做好用气场所踏勘配合。</p>
					<p class="content">2、设计人员依据客户提供的资料和现场踏勘情况，双方共同确定供气方案。</p>
					<p class="content">如客户的燃气设备设计流量16立方米以下、无须安装报警装置、从燃气架空管接气的，实行现场踏勘后直接方案报价；其他项目进行施工图设计和预算报价。</p>
					<p class="content">3、客户经理电话告知客户设计图纸及工程预埋费用（含设计费、工程直接费等）。</p>
					<p>（三）合同签订</p>
					<p class="content">1、待客户电话或来人与燃气公司确认工程费用后，双方签订《预埋改造合同》、《供用气合同》、《维保协议》；客户按照合同缴纳费用，提供缴款凭证；</p>
					<p class="content">2、在燃气设备安装到位、厨房装修完成的情况下，客户经理登记客户预约时间，通知施工单位作进场准备。</p>
					<p>（四）施工通气</p>
					<p class="content">1、施工单位根据客户需求，按照约定时间进场按图施工；用户提供施工作业面，做好配合工作（如有报警系统，应组织厂家同步安装）。</p>
					<p class="content">2、工程完工验收合格后，客户经理或项目经理组织通气，用户配合做好计量表具确认、燃气设备调试、报警系统调试等工作。</p>
					<p class="title">五、承诺服务时间</p>
					<p class="content">1、燃气具总流量在16立方米/小时（含）以下的用户用气，办理时限从正式登记受理到施工通气不超过12个工作日；</p>
					<p class="content">2、燃气具总流量在16立方米/小时以上的用户用气，办理时限从正式登记受理到施工通气原则上不超过25个工作日；</p>
					<p class="content"><strong>说明</strong>：若需接外管涉及开挖市政道路或绿化的，须到交警、市政、消防等政府审批窗口办理前期审批手续；燃气报装承诺服务时间不包含政府行政审批办理时间。</p>
					<p class="title">六、提供延伸服务</p>
					<p class="content">1、提供咨询性预约，如客户资料不齐全或场地未装修好的情况下，可接受预约（非正式受理）服务，提供现场用气技术方案；</p>
					<p class="content">2、根据客户需求，推荐、提供合格的燃气设备并组织供应商上门安装服务；</p>
					<p class="content">3、根据客户需求，推荐、提供燃气浓度报警系统产品及上门安装服务；</p>
					<p class="content">4、根据气源点接气需要，提供代办服务，帮助客户办理道路开挖审批、绿化迁移、消防报批等行政性审批事项。</p>
					<p class="title">七、收费依据及标准</p>
					<p class="content">根据杭价服[2016]151号文件、浙江省造价管理总站发布的最新定额标准及相关规定收取预埋改造费，以双方确认的合同造价为准。</p>
					<p class="title">八、咨询热线</p>
					<p>0571-89900015  0571-88163835  0571-86826538</p>
					<p class="title">九、服务监督投诉热线</p>
					<p>0571-88063558</p>
					<p class="title">十、特别提醒</p>
					<p class="content">如客户申请管道燃气开通时，提出自行建设要求时，燃气客户经理提供如下服务：</p>
					<p>(一)办理环节</p>
					<p class="content">1、登记受理</p>
					<p class="content">客户提供《营业执照》后，客户经理告知自建流程，并填写《非居民用户燃气预埋改造受理单》和《自建告知单》，与客户共同签字确认。</p>
					<p class="content">2、踏勘签约</p>
					<p class="content">客户与客户经理预约现场踏勘，客户经理告知客户接气点位置及相关事宜，提供燃气管道相关参考图纸；经客户认可接气方案后，双方签订《割接、置换、通气危险作业委托协议》、《供用气合同》、《维保协议》。</p>
					<p class="content">3、验收通气</p>
					<p class="content">工程完工后，客户通知客户经理参与现场验收；验收合格后，组织通气。</p>
					<p class="title">十一、联系我们</p>
					<x-table :full-bordered="true">
						<thead>
						<tr>
							<th>营业厅</th>
							<th>地址</th>
							<th>营业时间</th>
						</tr>
						</thead>
						<tbody>
						<tr><th>艮山东路一站式<br>服务基地</th><th>艮山东路136号</th><th>8:00﹣17:00(夏令时间)<br>8:30﹣16:30(冬令时间)<br> (周一至周五)</th></tr>
						<tr><th>江虹路一站式<br>服务基地</th><th>江虹路1249号</th><th>8:00﹣11:30 13:30﹣16:30(夏令时间)<br>8:30﹣11:30 13:30﹣16:30(冬令时间)<br> (周一至周五)</th></tr>
						<tr><th>市民之家燃气窗口</th><th>新业路311号</th><th>9:00-12:00  13:30-17:00(周一至周日)</th></tr>
						<tr><th>城投综合服务中心朝晖厅</th><th>河东路193号</th><th>8:30-17:30 (周一至周日)</th></tr>
						<tr><th>城投综合服务中心转塘厅</th><th>洙泗路与象山路交叉口（西湖交警支队转塘中队附近）</th><th>8:30-17:30 (周一至周日)</th></tr>
						<tr><th>城投综合服务中心体育场路厅</th><th>体育场路252号</th><th>8:30-17:30 (周一至周日)</th></tr>
						<tr><th>城投综合服务中心城站厅</th><th>建国南路166号</th><th>8:30-17:30 (周一至周日)</th></tr>
						<tr><th>城投综合服务中心三墩厅</th><th>长阳路409号</th><th>8:30-17:30 (周一至周日)</th></tr>
						<tr><th>城投综合服务中心蒋村厅</th><th>文一西路565号</th><th>8:30-17:30 (周一至周日)</th></tr>
						<tr><th>城投综合服务中心丁桥厅</th><th>明珠街165号</th><th>8:30-17:30 (周一至周日)</th></tr>
						<tr><th>杭燃优家客户中心<br>天目旗舰厅</th><th>天目山路32号</th><th>8:30-17:00 (周一至周日)</th></tr>
						<tr><th>绍兴路客户服务中心</th><th>绍兴路667号</th><th>8:00-17:00 (周一至周五)</th></tr>
						<tr><th>杭州市行政服务中心</th><th>解放东路18号</th><th>9:00﹣12:00 13:30﹣17:00(夏令时间)<br>9:00﹣12:00 14:00﹣17:00(冬令时间)<br> (周一至周五)</th></tr>
						<tr><th>上城区行政服务中心</th><th>秋涛路242号</th><th>9:00-12:00 13:30-17:00(周一至周五)</th></tr>
						<tr><th>之江行政服务中心</th><th>象山社区368号一楼</th><th>9:00-12:00 13:30-17:00(周一至周五)</th></tr>
						<tr><th>西湖区行政服务中心</th><th>竞舟路228号</th><th>9:00-12:00 13:30-17:00(周一至周五)</th></tr>
						<tr><th>拱墅区行政服务中心</th><th>绍兴路555号</th><th>9:00-12:00 14:00-17:00(夏令时间)<br>9:00-12:00 13:30-17:00(冬令时间)<br>(周一至周五)</th></tr>
						<tr><th>江干区行政服务中心</th><th>凤起东路888号</th><th>9:00-12:00 13:30-17:00(周一至周五)</th></tr>
						<tr><th>下城区行政服务中心</th><th>白石巷318号</th><th>9:00-12:00 13:30-17:00(周一至周五)</th></tr>
						<tr><th>滨江区行政服务中心</th><th>泰安路200号</th><th>9:00-12:00 14:00-17:00(夏令时间)<br>9:00-12:00 13:30-17:00(冬令时间)<br>(周一至周五)</th></tr>
						</tbody>
					</x-table>
				</div>
				<tip v-if="getActionList && getActionList.hasOwnProperty('non_resident') && getActionList.action.show_tip"
					 title="业务办理提示" content="non_resident" :immediate="immediate" :show="false">
				</tip>
			</div>
			<flexbox class="action-groups">
				<flexbox-item>
					<x-button type="primary" @click.native="page = 'card';immediate = false">下一步</x-button>
				</flexbox-item>
			</flexbox>
		</template>
		<template v-if="page == 'card'">
			<CellBox class="bold-title" v-text="'非居民用户用气报装登记表'"></CellBox>
			<group title=" ">
				<x-input v-model="todo.company_name" placeholder="请输入用气店名/商铺名"
						 title="用气店名/商铺名" placeholder-align="right" text-align="right"></x-input>
				<PopupPicker :value="area" :data="areas" title="行政区域"
							 popup-title="行政区域" @on-change="onAreaSelected"></PopupPicker>
				<x-input v-model="todo.address" placeholder="请输入用气地址"
						 title="用气地址" placeholder-align="right" text-align="right"></x-input>
				<x-input v-model="todo.unit" placeholder="请输入单位名称"
						 title="单位名称" placeholder-align="right" text-align="right"></x-input>
				<x-input v-model="todo.owner" placeholder="请输入联系人姓名"
						 title="联系人" placeholder-align="right" text-align="right"></x-input>
				<x-input v-model="todo.owner_phone" placeholder="请输入联系电话"
						 title="联系电话" placeholder-align="right" text-align="right"></x-input>
				<PopupPicker :value="card_licence" :data="card_licences" title="营业执照"
							 popup-title="营业执照" @on-change="onLicenceSelected"></PopupPicker>
				<PopupPicker :value="card_equipment" :data="card_equipments" title="用气设备"
							 popup-title="用气设备" @on-change="onEquipmentSelected"></PopupPicker>
				<PopupPicker :value="card_decoration" :data="card_decorations" title="装修情况"
							 popup-title="装修情况" @on-change="onDecorationSelected"></PopupPicker>
				<PopupPicker :value="bottle2pipe" :data="bottle2pipes" title="瓶改管"
							 popup-title="瓶改管" @on-change="onBottle2pipeSelected"></PopupPicker>
				<PopupPicker :value="card_pipe" :data="card_pipes" title="气源管确认"
							 popup-title="气源管确认" @on-change="onPipeSelected"></PopupPicker>
				<x-input v-model="todo.plain_time" placeholder="请输入用气计划时间"
						 title="用气计划时间" placeholder-align="right" text-align="right"></x-input>
			</group>
			<flexbox class="action-groups">
				<flexbox-item>
					<x-button type="primary" @click.native="page = 'manual'">上一步</x-button>
				</flexbox-item>
				<flexbox-item>
					<x-button type="primary" @click.native="page = 'tip'">下一步</x-button>
				</flexbox-item>
			</flexbox>
		</template>
		<template v-if="page == 'tip'">
			<div class="contract">
				<div class="contract-title">
					<p>温馨提示</p>
				</div>
				<div class="contract-body">
					<p>尊敬的客户：</p>
					<p class="content">您好！</p>
					<p class="content">为了确保后续工作的有效推进，现将有关注意事项特别提醒告知如下：</p>
					<p class="title">1、工程前期审批的注意事项</p>
					<p class="content">工程施工前，如果涉及破路、消防等前期问题，需要您负责前往城管、消防、交警、社区等部门办理相关审批手续并且取得相关的书面证明，上述事宜涉及费用不在我公司报价范围之内。期间，我公司将大力配合您办理相关的前期审批手续且不收取任何费用。</p>
					<p class="title">2、工程施工中的注意事项</p>
					<p class="content">（1）施工过程中，您有义务全面配合我公司的施工，保障施工及通气工作的顺利进行。施工及通气过程中出现与第三方的协调工作由您全面负责，如遇第三方阻挠、投诉等障碍问题一时无法解决时，我公司将暂停施工。期间，我公司积极配合您开展协调工作，待障碍问题解决后及时恢复施工。</p>
					<p class="content">（2）施工完毕后，您有义务保护施工成果和将现场恢复原状。此外，如涉及道路或绿化修复，将由您负责修复和承担费用，该费用不在我公司报价范围之内。</p>
					<p class="title">3、有关需安装燃气报警装置事宜</p>
					<p style="text-indent: 2em;font-weight: bold;">根据《GB50028-2006 城镇燃气体设计规范》和设计单位出具的施工图要求，如果须安装燃气浓度检测报警器、紧急切断装置等燃气报警设施，您可委托我公司代为采购、安装，费用含在我公司报价范围之内;若您选择自行采购、安装燃气报警设施，我公司无指定的供应商且该费用不在我公司报价范围之内。</p>
					<p class="title">4、其他注意事项</p>
					<p class="content"><span class="title">如果您申请办理的燃气工程所在场所为租赁用房，请确保房屋产权人已知晓并同意您在该场所安装和使用燃气设施。</span>我公司客户经理将竭诚为您提供高效便捷的“一站式”服务，服务监督电话：89900015、88360391。</p>
				</div>
			</div>
			<checklist title=" " :options="['我已阅读并同意']" v-model="agree"></checklist>
			<flexbox class="action-groups">
				<flexbox-item>
					<x-button type="primary" :disabled="agree.length == 0" @click.native="onSubmit">提交</x-button>
				</flexbox-item>
			</flexbox>
		</template>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer'
	import tip from  '../common/tip'
	import {XTable, Flexbox, FlexboxItem, XButton, XInput, PopupPicker, Group, CellBox, Checklist} from 'vux'
	import {mapActions, mapGetters} from "vuex";
	export default {
		name: "nonResident",
		components:{
			fix_footer: Footer,
			tip,
			XTable,
			Flexbox,
			FlexboxItem,
			XButton,
			XInput,
			PopupPicker,
			Group,
			CellBox,
			Checklist
		},
		data() {
			return {
				page: 'manual',
				immediate: true,
				todo:{
					action: 'non_resident_order',
					progress: 'pending',
					company_name: '',
					area: '上城区',
					address: '',
					unit: '',
					owner: '',
					owner_phone: '',
					card_licence: '有',
					card_equipment: '已采购',
					card_decoration: '已装修好',
					bottle2pipe: '是',
					card_pipe: '有',
					plain_time: '',
					public:{
						'service':'ApplyAccount',
						'username':'',
						'area':'',
						'location':'',
						'contact':'',
						'phone':'',
						'license':'',
						'equipment':'',
						'decoration':'',
						'bottlepipe':'',
						'haspipe':'',
						'plandate':'',
					}
				},
				area: ['上城区'],
				card_licence:['有'],
				card_equipment:['已采购'],
				card_decoration:['已装修好'],
				bottle2pipe:['是'],
				card_pipe:['有'],
				areas: [['上城区', '下城区', '江干区', '拱墅区', '西湖区', '西湖景区', '滨江区']],
				card_licences:[['有','正在办理','无']],
				card_equipments:[['已采购','未采购']],
				card_decorations:[['已装修好','装修中','尚未开始装修',]],
				bottle2pipes:[['是','否',]],
				card_pipes:[['有','无','不清楚',]],
				agree: []
			}
		},
		computed:{
			...mapGetters([
				'getActionList'
			]),
		},
		mounted: function () {
			if( this.$route.query.hasOwnProperty('type') ){
				this.immediate = false;
			}
		},
		methods: {
			...mapActions([
				'postTodo'
			]),
			onAreaSelected (value){
				this.area = value;
				this.todo['area'] = value[0];
			},
			onLicenceSelected (value){
				this.card_licence = value;
				this.todo['card_licence'] = value[0];
			},
			onEquipmentSelected (value){
				this.card_equipment = value;
				this.todo['card_equipment'] = value[0];
			},
			onDecorationSelected (value){
				this.card_decoration = value;
				this.todo['card_decoration'] = value[0];
			},
			onBottle2pipeSelected (value){
				this.bottle2pipe = value;
				this.todo['bottle2pipe'] = value[0];
			},
			onPipeSelected (value){
				this.card_pipe = value;
				this.todo['card_pipe'] = value[0];
			},
			onSubmit (){
				let that = this;
				that.todo.public['username'] = that.todo.company_name;
				that.todo.public['area'] = that.todo.area;
				that.todo.public['location'] = that.todo.address;
				that.todo.public['contact'] = that.todo.owner;
				that.todo.public['phone'] = that.todo.owner_phone;
				that.todo.public['license'] = that.todo.card_licence;
				that.todo.public['equipment'] = that.todo.card_equipment;
				that.todo.public['decoration'] = that.todo.card_decoration;
				that.todo.public['bottlepipe'] = that.todo.bottle2pipe;
				that.todo.public['haspipe'] = that.todo.card_pipe;
				that.todo.public['plandate'] = that.todo.plain_time;
				that.postTodo({
					todo:that.todo,
					vue:that,
					/*success: (result) => {//todo send message

					}*/
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		height: unset;
		padding-bottom: 50px;
		.contract {
			.contract-title {
				p {
					text-align: center
				}
			}
			.contract-body {
				padding: 15px;
				background-color: white;
				font-size: 15px;
				.title {
					font-weight: bold;
				}
				.content {
					text-indent: 2em;
				}
			}
		}
		/deep/ .weui-cell {
			padding-top: 14.5px;
			padding-bottom: 14.5px;
			color: #333;
		}
	}
</style>
