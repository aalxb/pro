<template>
	<div :class="[page == 'search' ? 'wrap':'no-padding-warp']" >
		<template>
			<div v-transfer-dom class="userAgreementWrap">
				<confirm v-model="prompt"
				title="用户须知"
				:close-on-confirm=false
				@on-cancel="onCancel"
				@on-confirm="onConfirm"
				>
				<x-icon class="closeIcon" type="ios-close-empty" size="30" @click.native="close"  style="position: absolute;top: 5%;right: 5%;" ></x-icon>
				<div style="border-top:1px solid #DCDCDC;margin-bottom:15px;"></div>
				<div class="userAgreement">
					<div class="content">
						一、服务条款说明

							本平台内各项电子服务的所有权和运作权归本平台所有。本平台提供的服务将完全按照其发布的服务条款和操作规则严格执行。用户需在购买前认真阅读并同意所有服务条款。本协议条款是处理双方权利义务的约定依据，除非违反国家强制性法律，否则始终有效。在支付订单时，您须同时确认接受购买该产品的规定、权利和义务，并对订单中所提供信息的真实性负责。
						一、服务条款说明

							本平台内各项电子服务的所有权和运作权归本平台所有。本平台提供的服务将完全按照其发布的服务条款和操作规则严格执行。用户需在购买前认真阅读并同意所有服务条款。本协议条款是处理双方权利义务的约定依据，除非违反国家强制性法律，否则始终有效。在支付订单时，您须同时确认接受购买该产品的规定、权利和义务，并对订单中所提供信息的真实性负责。
					</div>
					<div style="text-align:left; margin-top:15px;">
						<label for=""><input type="checkbox" v-model="checkState">我同意</label>
					</div>
				</div>
				</confirm>
			</div>
		</template>
		<template v-if="page == 'not-address'">
			<div class="page" ref="not-address">
				<group title=" ">
					<x-input v-model="todo.housing"
							 title="小区" placeholder="请输入小区名称" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.floor"
							 title="楼幢" placeholder="请输入楼幢" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.unit"
							 title="单元" placeholder='请输入单元号,如果没有输入"0" ' placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.room"
							 title="室" placeholder="请输入室" placeholder-align="right" text-align="right"></x-input>
				</group>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>


		<template v-if="page == 'search'">
			<search @onSendInfo="onSendInfo" search_type="new"></search>
		</template>
		<template v-else-if="page == 'new-owner'">
			<div class="page" ref="new-owner">
				<CellBox class="bold-address" v-text="address"></CellBox>
				<group title=" "><!--title为空则group的margin-top略大-->
					<!-- <CellBox class="bold-title" v-text="'产权人信息'"></CellBox>
					<Photo :photo_data="[photo_data['owner_id_front'],photo_data['owner_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo> -->
					<x-input v-model="todo.owner"
							 title="姓名" placeholder="请输入您的姓名" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.owner_phone"
							title="手机号" placeholder="请输入产权人手机号" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.contact"
							title="联系方式" placeholder="请输入手机号或座机号" placeholder-align="right" text-align="right"></x-input>
					<x-number  title="家庭人数" v-model="todo.number"></x-number>
					<selector ref="defaultValueRef" title="用途" :options="list" v-model="defaultValue"></selector>
					<x-switch title="低保用户" v-model="switching.user"></x-switch>
					<!--<Photo :photo_data="[photo_data['protect']]"  @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto" v-if="switching.user"></Photo>-->
					<x-switch title="已经装表" v-model="switching.table"></x-switch>
					<x-switch title="需要点火" v-model="switching.ignition "></x-switch>
				</group>
				<!-- <group title=" ">
					<CellBox class="check-box-cell">
						<span>办理人</span>
						<div class="check-box">
							<check-icon class="check-icon" :value.sync="self">产权人本人</check-icon>
							<check-icon class="check-icon" :value.sync="agent">代理人</check-icon>
						</div>
					</CellBox>
				</group>
				<group title=" " v-if="agent">
					<CellBox class="bold-title" v-text="'代理人信息'"></CellBox>
					<Photo :photo_data="[photo_data['agent_id_front'],photo_data['agent_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
					<x-input v-model="todo.agent"
							 title="代理人" placeholder="请输入代理人姓名" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.agent_id"
							 title="身份证号" placeholder="请输入代理人身份证号" placeholder-align="right" text-align="right"></x-input>
					<x-input v-model="todo.agent_phone"
							 title="手机号" placeholder="请输入代理人手机号" placeholder-align="right" text-align="right"></x-input>
				</group> -->
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" :disabled="action.loading" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>

		<template v-else-if="page == 'owner-msg'" >
			<div style="background:#fff;height:100%;">
				<group title=" " class="owner-msg"><!--title为空则group的margin-top略大-->
				<CellBox class="bold-title" v-text="'产权人信息'"></CellBox>
				<Photo :photo_data="[photo_data['owner_id_front'],photo_data['owner_id_back']]" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
				<x-input v-model="todo.owner_id"
					title="身份证号" placeholder="身份证号码" placeholder-align="right" text-align="right"></x-input>
			</group>
			<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" :disabled="action.loading" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>



		<template v-else-if="page == 'ownership'">
			<div class="page" ref="ownership">
				<group title=" ">
					<CellBox class="bold-title" v-text="'房屋产权信息'"></CellBox>
					<PopupPicker :value="ownership_type" :data="ownership_types"
								 title="产权证件" popup-title="产权证件"
								 @on-change="onOwnershipTypeSelected"></PopupPicker>
					<x-input class="ownership_number" placeholder="请输入编号" :show-clear="false" v-model="todo.ownership_number">
						<div class="slot-fix" slot="label">
							<span v-text="slot_fix[slot_fix_index].number_tip"></span>
							<span class="prefix" v-text="slot_fix[slot_fix_index].prefix"></span>
						</div>
						<div class="slot-fix" slot="right" v-text="slot_fix[slot_fix_index].suffix"></div>
					</x-input>
					<Photo :photo_data="[photo_data['ownership_1'],photo_data['ownership_2']]" :img="slot_fix[slot_fix_index].img"
						   size="large" @onAddPhoto="onAddPhoto" @onDeletePhoto="onDeletePhoto"></Photo>
				</group>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>

		<template v-else-if="page == 'open-contract'">
				<div class="page" ref="open-contract">
					<div style=" " >
						工商备案号：<input disabled class="border0" style="width: 200px;"> 合同编号：<input disabled class="border0" style="width: 200px;" >
						<h4 class="contract-body">供用气合同</h4>
						<p class="tcenter">（管道天然气居民用户）</p>
						供气方：<input disabled class="inputs" v-model="name">    (以下简称甲方)
						用气方：<input disabled class="inputs" v-model="todo.owner">身份证号码：<input disabled class="inputs" v-model="todo.owner_id">(以下简称乙方)
						乙方的安装用气地址：<input disabled class="inputs" v-model="address">
						联系电话：<input disabled class="inputs" v-model="todo.contact">手机：<input disabled class="inputs" v-model="todo.owner_phone">
						乙方因日常生活用气需要，向甲方申请和办理用气手续，经甲方审核符合条件，为依法保障天然气供应单位和用户的合法权益，特签订本合同。
						<h4 class="contract-item-title">用气申请和供气</h4>
						第一条甲方应保证燃气质量符合国家城市天然气质量标准。管道天然气进入乙方阀门前的压力为不小于1500Pa。
						第二条乙方在使用过程中需要变更天然气用途、停止使用天然气时，应当向甲方申请办理变更、停用手续；在相应变更、停用手续未办理完之前，乙方仍应按本合同约定履行义务。乙方不得擅自变更天然气用途，否则甲方有权停止供气。
						乙方开户的天然气设施所在的房屋产权如发生变更的，应在房屋产权发生变更后应办理变更、停用或过户等手续，如乙方、新的房屋产权人未在约定时间内办理相应的用户变更、停用或过户等手续的，则合同约定用气地址所发生的燃气费，乙方仍有偿付义务。
						当用气主体发生变更后，甲方有权与新的房屋产权人办理相关燃气使用手续并重新签订供用气合同，原甲方与乙方所签订的供用气合同自行终止。
						<h4 class="contract-item">气费标准、天然气表类型和结算</h4>
						第三条乙方根据本地物价部门核定的标准，按物价部门核定的气价向甲方交纳气费。
						第四条天然气表类型及计量结算方式采用下列方式（在相应方式前打勾）：
						天然气用量由甲方定期抄表计量，气费缴纳委托相应银行代扣（乙方需另行签订银行划拨结算代扣协议）。
						第五条双方确定天然气计量表具发生故障时：按上一次抄表前四个月平均用量计算月用气量（IC卡表智能电子部分故障，以基表机械读数为准，机械读数所示的乙方实际用气量超过已缴燃气气费的，乙方应予以补缴）。
						第六条采用普通膜式天然气表进行计量结算的，每期结算时，乙方应在代扣银行账户内保障足额气费，若余额不足时，乙方应在15日内及时缴纳，以避免产生违约金。
						第七条若乙双方对表具计量准确性有异议的，可申请委托当地法定计量检定机构检测，检测结果合格的，检测费用由乙方承担；检测结果不合格的，检测费用由甲方承担，并由甲方退还（补收）乙方多交（少交）部分气费，以6个月为补偿或追偿期限。
						<h4 class="contract-item">设施安装、维修和管理</h4>
						第八条乙方的管道天然气设施首次使用前，应通知甲方，由甲方派人检查并实施点火，乙方不得自行点火开通。
						第九条乙方一旦发现天然气泄漏等紧急情况，应积极采取正确应急措施，并及时通知甲方，甲方应立即派员赶赴现场抢修。甲方对供气设施发生的故障，应保证及时有效地抢修和排查。
						第十条甲方有权定期对乙方的用气设施进行安全检查，乙方必须配合甲方的安全检查和故障处理，并定期开展自行检查。
						第十一条根据政府文件对居民天然气设施产权的划分标准，属于甲方产权的天然气设施由甲方负责维修、更新，费用由甲方承担。属于乙方产权的天然气设施，乙方负责进行维修、保养和更新，费用由乙方承担。
						第十二条乙方需增加、减少、拆除、改造属甲方产权的天然气设施，必须事先向甲方提出书面申请，经甲方同意后由甲方组织实施，乙方另行承担费用。乙方不得擅自安装、拆除、改造天然气设施。
						乙方如需安装16升以上燃气热水器、燃气锅炉等耗气量大的燃气具时，须向甲方申请，经甲方同意后，进行相应改装。如擅自安装，甲方有权要求其整改，必要时可中断供气。
						<h4 class="contract-item">用气安全</h4>
						第十三条甲方必须建立安全责任制，制订有关安全使用规则；乙方必须严格遵守安全使用规定，正确使用天然气器具，保证用气安全；乙方积极配合甲方做好定期的入户安全检查工作，并落实入户安检中发现的隐患问题的整改。
						第十四条为确保用气安全，乙方应严格禁止下列行为：
						1、在天然气输配管网上直接接管安装天然气器具或者采用其他方式盗用天然气；
						2、擅自安装、拆除、改装、遮挡、覆盖管道天然气设施或将计量表具安置于密闭的箱、厨（柜）内，或在表具周围设置影响检修的障碍物；
						3、向城市天然气管道内充入任何其他介质；
						4、擅自操作公用天然气阀门；
						5、安装、使用不符合气源要求的天然气燃烧器具；
						6、在不具备安全条件的场所使用天然气；
						7、改变天然气用途或者转供天然气；
						8、将天然气设施作为负重支架堆放，悬挂物品或者将天然气管道作为电器设备的接地导体；
						9、擅自安装使用管道天然气热水器等天然气器具；
						10、擅自启封、动用、调整甲方密闭的管道天然气设施；
						11、使用未经检验合格或者已到使用年限的天然气器具、连接器；
						12、使用明火检查泄漏；
						13、以其他方式毁坏管道天然气设施和天然气器具。
						<h4 class="contract-item">违约责任</h4>
						第十五条在正常情况下，如果甲方未按规定期限向乙方供气或供气压力未达到规定的标准，乙方有权要求甲方按规定供气，并可向天然气主管部门申述和提出补偿要求，补偿额度由天然气主管部门核定。
						第十六条因城市建设、天然气设施施工、检修等原因需要调整供气量、降低供气压力或暂停供气，或者因不可抗力原因而无法正常供气的，甲方不负违约责任。
						第十七条如乙方未按约定缴纳气费，甲方可在逾期15日起每日按应缴费总额3‰加收违约金，乙方连续两期不缴纳气费，甲方有权停止供气，并在停止供气七天之前以书面、电话或张贴停气通知单等形式通知乙方。
						第十八条因欠费停气的用户，如需恢复供气应先缴清气费及相应的违约金后，甲方按新用户办理开通手续，于5个工作日内开通。
						第十九条乙方因未按《城镇燃气管理条例》、《浙江省燃气管理条例》用气或未按本合同执行而造成人身伤亡或财产损失的，均由乙方自行承担责任。
						第二十条甲方或乙方，如有违反本合同和有关法律法规规定的行为，应按国家有关法律规定及《城镇燃气管理条例》、《浙江省燃气管理条例》，承担相应法律责任。
						<h4 class="contract-item">争议的解决方法</h4>
						第二十一条本合同如有未尽事宜，须经双方协商，协商不成的，双方一致同意向甲方所在地人民法院通过诉讼途径解决。
						<h4 class="contract-item">其他</h4>
						第二十二条本合同如有未尽事宜，须经双方协商，并依法签订书面补充和条款后，方可执行。
						第二十三条如出现政府天然气政策调整，城市管网建设、国内天然气供应紧张或价格波动等情况，应视为订立合同时的情势发生变更，甲方有权对合同有关内容进行相应变更，乙方对此表示理解并愿意接受。如双方对变更内容无法达成一致的，甲方有权解除本合同。
						第二十四条如甲方因企业改制、合并、分离等情况发生主体变更的，则本合同继续有效，甲方在本合同项下的一切权利义务均由改制、合并、分立后的相应主体享受和承担。后续主体与乙方应按原合同条款另行签订供气合同。
						第二十五条乙方如违反本合同第二条、第十二条、第十四条、第十七条之规定的，甲方有权停止供气，解除合同，并要求乙方承担相应的法律责任。
						第二十六条乙方确定用气地址为相关文件、文书的送达地址，届时送达方式可以但不限于挂号信、特快专递形式，若信函寄出后未获对方答复的，即视为送达。无论信函是否退回。如地址发生变化，乙方应书面告知甲方，否则由乙方自行承担由此引起的法律后果。
						第二十七条乙方确认，卖方已经就本合同所有条款向其进行了充分解释，并确认其完全接受本合同所有条款。
						第二十八条本合同壹式贰份，甲、乙双方各执壹份，经双方签字或盖章后生效。
						<br/>
						甲方：<input disabled class="border0" >          乙方或委托人（签字）：<input disabled class="border0" v-model="todo.owner">
						身份证号码： <input disabled class="border0" v-model="todo.owner_id">
						联系电话：<input disabled class="border0" v-model="todo.owner_phone">

						签订日期： <input disabled class="border0" style="width: 150px;" v-model="time">
					</div>
				</div>
			<x-button type="primary"  @click.native="onNext" :disabled="awaitBoolean">我同意上述合同条款</x-button>
		</template>


		<template v-else-if="page == 'other'">
			<div class="page" ref="other">
				<group title=" ">
					<CellBox class="bold-title" v-text="'开通项目'"></CellBox>
					<checker v-model="install_item"
							 type="checkbox" class="install-items" default-item-class="default-install-item" selected-item-class="selected-install-item">
						<checker-item :value="item" v-for="(item, index) in install_items" :key="index">{{item.value}}</checker-item>
					</checker>
					<div class="need-transform" v-if="todo.transform == '须缴纳'">按照杭价服[2012]143号文件，您户所在住宅未缴纳管道燃气设施预埋费，须缴纳管道燃气设施改造费<strong>1000元</strong>。</div>
				</group>
				<!--<group title=" ">//放到完成页
					<CellBox class="bold-title" v-text="'安装时间'"></CellBox>
					<div class="notice-tip">审核通过后，你即可签约缴费，并预约安装，预约后五天内上门。</div>
				</group>-->
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
		<template v-else-if="page == 'notice'">
			<div class="page" ref="notice">
				<group title=" ">
					<CellBox class="bold-title" v-text="'申请信息确认'"></CellBox>
					<cell title="产权人" :value="todo.owner"></cell>
					<cell title="安装地址" :value="todo.address"></cell>
					<cell title="身份证号" :value="todo.owner_id"></cell>
					<cell title="手机号码" :value="todo.owner_phone"></cell>
					<Tip title="用户须知" content="new_install" :immediate="true" :show="false"></Tip>
				</group>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
		<template v-else-if="page == 'contract'">
			<Tip title="签约" content="contract" :immediate="contract_immediate" :show="false"></Tip>
			<div class="page contract">
				<div class="contract-title">
					<p>供 用 气 合 同</p>
					<p>（管道燃气居民用户）</p>
				</div>
				<div class="contract-body">
					<p><strong>供气方</strong>：<span v-text="name"></span>&nbsp;（以下简称<strong>甲方</strong>）</p>
					<p><strong>用气方</strong>：<span v-text="todo.owner"></span></p>
					<p><strong>身份证号</strong>：<span v-text="todo.owner_id"></span>&nbsp;&nbsp;（以下简称<strong>乙方</strong>）</p>
					<p></p>
					<p>为明确甲乙双方在燃气供应和使用中的权利、义务，确保正常供应和安全用气，保障双方的合法权益，特签订本合同，共同遵守。</p>
					<p></p>
					<p class="contract-item-title">用气申请和供气</p>
					<p></p>
					<p class="contract-item">第一条 乙方因生活需要向甲方提出用气申请，在符合用气条件的前提下，甲方予以受理，并办理用气手续。
						<br />乙方的用气地址为：<span></span>。</p>
					<p class="contract-item">第二条 甲方保证燃气质量符合国家城市燃气质量标准。
						<br />管道天然气进入乙方阀门前的最低压力不小于 1500 pa。</p>
					<p class="contract-item">第三条 <strong>乙方在使用过程中需要变更燃气用户或永久停止使用燃气时，应当向甲方申请办理相关手续（变更燃气用户的，新用户需重新签订供用气合同，老用户自新用户签订合同之日起本合同关系自动终止；永久停止使用燃气的，应办理拆表停用手续）；
						<br />乙方在使用过程中需要暂时停止使用燃气（2）个月以上的，应当告知甲方并结清相关费用；在相应手续办理完毕前，乙方仍应按本合同约定履行义务。</strong></p>
					<p class="contract-item">第四条 <strong>当乙方上述用气地址的房屋所有权（或所承租的公房的承租权）发生变动导致上述房产的用气主体发生变更时，乙方应提出终止用气申请，待停气手续办理完毕并结清费用后本合同终止。</strong>新的用气主体拟继续使用甲方燃气的，应与甲方重新签订供用气合同。
						<br />如乙方未办理终止用气手续的，应就新的用气主体此后新产生的用气费用继续承担清偿义务，但新的用气主体在其用气前已到甲方处就该用气地址重新签订过新的供用气合同的除外。</p>
					<p class="contract-item">第五条 乙方转让其房屋产权（或承租的公房的承租权发生变动）时，应就其所有的燃气设施的产权归属自行与新的产权人（或公房承租人）协商处理。上述用气地址房屋所有权（或公房承租权）发生变动后，房屋新的产权人（或承租人）持其新的房产证（或公房租赁证）到甲方处替乙方结清此前乙方的欠费，并以自己的名义重新与甲方签订供用气合同的，视为乙方与甲方关于上述用气地址的供用气合同关系已自动终止。</p>
					<p></p>
					<p class="contract-item-title">气费标准和结算</p>
					<p></p>
					<p class="contract-item">第六条 甲方按照本地政府价格行政主管部门批准的居民管道燃气价格收取燃气费，遇燃气价格调整时，按照调价文件的规定执行。</p>
					<p class="contract-item">第七条 管道燃气用量，由甲方定期抄表计量。燃气计量表具发生不工作故障或不具有计量意义的，按上一次抄表前四个月平均用量计算当月用量。但如乙方能够证明实际用气量少于按上一次抄表前四个月平均用量计算得出的当月用量的，按照实际用气量计算。
						<br />乙方如对计量表具有异议，可委托法定计量检定机构检定，检定合格，其误差在合理范围内的，由乙方缴纳检测费；检定不合格的，由甲方缴纳检测费并退还乙方多交的燃气费。</p>
					<p class="contract-item">第八条 乙方在接到甲方发出的气费缴纳通知后，应在3天后15天内向甲方缴纳气费。</p>
					<p></p>
					<p class="contract-item-title">用气安全</p>
					<p></p>
					<p class="contract-item">第九条 乙方的管道燃气设施开通使用燃气前，应通知甲方，由甲方派人检查燃气安装单位的最近一次点火记录及乙方燃气设施当前性能仍属正常后，乙方方可使用燃气，乙方不得擅自自行点火使用燃气。</p>
					<p class="contract-item">第十条 甲方负责向乙方发放燃气安全使用手册，定期对乙方的燃气设施进行安全检查，<b>乙方应当为甲方的安全检查提供方便，并承诺按照甲方的意见及时纠正影响安全用气的问题。</b></p>
					<p class="contract-item">第十一条 乙方应当认真阅读燃气安全使用手册，熟知安全使用燃气的常识，一旦发现燃气泄漏等紧急情况，应积极采取正确的应急措施，并迅速通知甲方。 </p>
					<p class="contract-item">第十二条 根据《杭州市燃气管理条例》，燃气计量表具前（含表具）的供气设施归供气单位所有，表具后的供气设施归用户所有。属于甲方产权的燃气设施由甲方负责维修、保养或更新，费用由甲方承担，乙方应予以配合；属于<b>乙方产权的燃气设施由乙方负责维修、保养或更新，费用由乙方承担。</b></p>
					<p class="contract-item">第十三条 乙方需增加、减少、拆除、改造、维修燃气设施，必须事先向甲方提出书面申请，经甲方同意后由甲方组织实施或乙方委托经甲方确认有资质的单位实施。乙方另行承担费用。乙方不得自行安装、拆除、变更、维修燃气设施。 </p>
					<p class="contract-item">第十四条 甲方必须建立安全责任制，制订有关安全使用规则，负责乙方用气的安全检查与监督；乙方已充分了解安全用气知识，并承诺接受甲方的安全用气教育与检查，严格遵守安全使用规定，正确使用符合国家标准的燃气器具，保证用气安全。乙方在出租房屋时，应保证所提供的燃气器具符合安全要求，并告知承租人安全使用燃气等有关事项和本合同下的各项权利义务及注意事项。</p>
					<p class="contract-item">第十五条 为确保用气安全，乙方应严格禁止下列行为：
						<br />1、在燃气输配管网上直接接管安装燃气器具或者采用其他方式盗用或转供燃气；
						<br />2、擅自安装、拆除、改装、遮挡、覆盖管道燃气设施或将计量表具安置于的箱、橱（柜）、墙体等密闭空间内，或在表具周围设置影响读数的障碍物；
						<br />3、向城市燃气管道内充入任何其他介质；
						<br />4、将燃气设施作为负重支架堆放，悬挂物品或者将燃气管道作为电器设备的接地导体；
						<br />5、自行安装管道燃气热水器（炉）等燃气器具；
						<br />6、擅自启封、动用、调整甲方密闭的管道燃气设施；
						<br />7、违反技术规范要求拆卸、安装、改装燃气器具及使用未经检验合格或者已到使用年限的燃气器具、连接器；
						<br />8、使用明火检查泄漏；
						<br />9、进行危害室内燃气设施安全的装饰、装修活动；
						<br />10、擅自将生活用气改为生产经营用气；
						<br />11、以其他方式毁坏管道燃气设施和燃气器具。</p>
					<p></p>
					<p class="contract-item-title">违约责任</p>
					<p></p>
					<p class="contract-item">第十六条 如果甲方在非必须情况下，未按规定期限向乙方供气或供气压力、质量未达到规定的标准，乙方有权要求甲方按规定供气，并可向政府燃气行政主管部门申告和提出补偿要求。</p>
					<p class="contract-item">第十七条 有下列情形甲方调整供气量、降低供气压力或暂停供气，或者因不可抗力原因而无法正常供气的，在不可抗力范围内免除甲方违约责任。（1）甲方计划内的燃气设施施工、例行检修并已提前48小时通知乙方；（2）因突发事件造成的应急救险等，甲方在应急同时以合理方式通知乙方。</p>
					<p class="contract-item">第十八条 如乙方未按约定缴纳气费，应在逾期之日起每日按欠费总额的万分之二支付违约金。逾期超过甲方发出的气费缴纳通知规定的缴费期限后一周仍未足额缴纳的，甲方有权停止供气。</p>
					<p class="contract-item">第十九条 <b>本合同第一条所定的用气地址即乙方的有效通讯地址，乙方变更上述通讯地址的必须以书面方式提前通知甲方，如果乙方擅自变更通讯地址或者甲方依照乙方在甲方留存的通讯地址无法送达的，乙方应自负通知不能实际送达的后果。</b></p>
					<p class="contract-item">第二十条 <b>乙方因未按《杭州市燃气管理条例》用气或未按本合同履行而造成人身伤亡或财产损失的，乙方承担相应的责任。如因乙方拒绝甲方例行安检或未能提供条件配合甲方例行安检造成隐患事故的，由乙方承担相应的责任。</b></p>
					<p class="contract-item">第二十一条 <b>乙方违反第三条、第十三条、第十四条、第十五条且对燃气安全造成严重安全隐患或造成事故的，甲方有权停止供气，解除合同，并要求乙方承担相应的法律责任。
						<br />如乙方违反上述条款，虽尚未造成安全事故，但经甲方通知整改后拒不整改的，甲方有权停止供气，解除合同，并要求乙方承担相应的法律责任。
						<br />乙方违反第十八条，经甲方催告后仍不缴纳的，甲方有权停止供气，解除合同，并要求乙方承担相应的法律责任。</b></p>
					<p></p>
					<p class="contract-item-title">争议的解决方法</p>
					<p></p>
					<p class="contract-item">第二十二条 因本合同发生的纠纷，由双方协商解决，协商不成的，双方同意以下方式解决。
						<br />（1）	提交仲裁委员会仲裁解决。
						<br />（2）	提交有管辖权的人民法院诉讼解决。</p>
					<p></p>
					<p class="contract-item-title">其他事项</p>
					<p></p>
					<p class="contract-item">第二十三条 如出现法律法规变动或政府规章调整、城市管网建设、国内燃气供应变化或价格波动等情况，应视为订立合同时的情势发生变更，甲方应对合同有关内容进行相应变更，乙方对此表示理解并愿意接受。<b>如双方对变更内容无法达成一致的，应视为双方同意解除本合同。</b></p>
					<p class="contract-item">第二十四条 如甲方因企业改制、合并、分立等情况发生主体变更的，则本合同继续有效，甲方在本合同项下的一切权利义务均由改制、合并、分立后的相应主体享有和承担，甲方应当将该变更事项及时通知乙方。</p>
					<p class="contract-item">第二十五条 本合同有效期限自签订之日起至乙方办理停气手续并结清费用后终止。合同有效期内，如甲方或乙方提出终止合同的书面申请，经对方同意，则本合同自行终止。</p>
					<p class="contract-item">第二十六条 合同期内或合同期满后，双方解除或终止合同的，应及时办理停气手续并结清费用。</p>
					<p class="contract-item">第二十七条 本电子合同自申请人点击提交确认后生效，如需纸质版签字盖章合同，可凭户主身份证原件（代办人需加带代办人身份证原件）到附近营业厅办理。</p>
				</div>
				<div class="contract-footer">
					<check-icon class="check-icon">我已阅读并同意签署该协议</check-icon>
					<div class="contract-footer-tip">
						<p>备注：“根据《关于归集公用事业单位信用信息的通知》的要求，燃气欠费信息已纳入杭州市公共信用信息平台”。</p>
					</div>
				</div>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)" :disabled="!contract1"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
		<template v-else-if="page == 'protocol'">
			<div class="page contract">
				<div class="contract-title">
					<p>民用管道燃气安装服务协议</p>
				</div>
				<div class="contract-body">
					<p><strong>供气方</strong>：杭州天然气有限公司&nbsp;&nbsp;（以下简称<strong>甲方</strong>）</p>
					<p><strong>用气方</strong>：<span v-text="contract.information.owner"></span></p>
					<p><strong>身份证号</strong>：<span v-text="contract.information.owner_id"></span>&nbsp;&nbsp;（以下简称<strong>乙方</strong>）</p>
					<p></p>
					<p>为保障甲乙双方的合法权益，根据相关法律、法规，现双方协商一致，就乙方因生活需要向甲方申请安装民用管道天然气设施事宜，签订本协议。</p>
					<p></p>
					<p class="contract-item">一、基本信息</p>
					<p></p>
					<p class="contract-item">安装地址：<span v-text="contract.information.address"></span>。</p>
					<p class="contract-item">二、安装范围</p>
					<p></p>
					<p class="contract-item">自甲方天然气管道至本协议规定的乙方燃气器具接口前的管道敷设及阀门、计量表具的安装。</p>
					<p class="contract-item">三、材料供应</p>
					<p></p>
					<p class="contract-item">1、本次安装所需的燃气管道、阀门、燃气表由甲方提供。</p>
					<p class="contract-item">2、燃气器具及灶前阀至灶具间的专用连接管由乙方自行选购提供。</p>
					<p class="contract-item">四、甲方的权利义务</p>
					<p></p>
					<p class="contract-item">1、甲方负责管道燃气设施工程的设计和施工，其质量应达到国家相关规定，提供自安装完毕起1年的质量保证服务（用户损坏除外）。</p>
					<p class="contract-item">2、如乙方安装场所或燃气器具不符合安全用气规范，甲方有权拒绝安装或点火。</p>
					<p class="contract-item">五、乙方的权利义务</p>
					<p></p>
					<p class="contract-item">1、乙方有权监督甲方的工程并配合甲方按规范完成燃气设施安装，对甲方安装人员的不规范行为可拨打甲方服务电话进行投诉。如因乙方原因延误安装工程的进度，责任由乙方承担。</p>
					<p class="contract-item">2、乙方应选用符合国家安全规范及质量规定的燃气器具。</p>
					<p class="contract-item">3、乙方应积极配合甲方安装，为甲方施工提供便利。同时应协调与周围业主的关系，如因周围业主或管线单位阻挠安装或其他原因影响安装的，应由乙方负责解决。</p>
					<p class="contract-item">4、管道燃气设施安装完毕后，如需变更管道位置或增加、减少、拆除燃气管道，需向甲方申请，经甲方同意后方可实施，费用由乙方另行支付。</p>
					<p class="contract-item">六、工程工期</p>
					<p></p>
					<p class="contract-item">甲方确保根据服务承诺的工期完成安装，但非甲方原因除外。</p>
					<p class="contract-item">七、争议解决</p>
					<p></p>
					<p class="contract-item">所有因本协议引起的或与本协议有关的争议，通过协商解决。协商不成的，向甲方所在地人民法院诉讼解决。</p>
					<p class="contract-item">八、附则</p>
					<p></p>
					<p class="contract-item">本电子协议自申请人点击提交确认后生效，如需纸质版签字盖章协议，可凭户主身份证原件（代办人需加带代办人身份证原件）到附近营业厅办理。</p>
				</div>
				<div class="contract-footer">
					<check-icon class="check-icon" :value.sync="contract2">我已阅读并同意签署该协议</check-icon>
				</div>
				<flexbox class="action-groups">
					<flexbox-item v-for="action in actions[page]" :key="action.name">
						<x-button type="primary" v-text="action.text" @click.native="onPage(action)" :disabled="action.name == 'contract-submit' && !contract2"></x-button>
					</flexbox-item>
				</flexbox>
			</div>
		</template>
	</div>
</template>

<script>
	import Search from '../common/open_search'
	import Footer from '../common/footer'
	import Photo from '../common/photo'
	import Tip from '../common/tip'
	import {XSwitch,Selector,XNumber,Group, CellBox, XInput, CheckIcon, Flexbox, FlexboxItem, XButton, PopupPicker, Checker, CheckerItem, Cell, Icon,Confirm,TransferDomDirective as TransferDom} from 'vux'
	import {mapActions, mapGetters, mapMutations} from "vuex";
	export default {
		directives: {
			TransferDom
		},
		name: "newInstall",
		components: {
			search: Search,
			fix_footer: Footer,
			Photo: Photo,
			Tip: Tip,
			Group,
			CellBox,
			XInput,
			CheckIcon,
			Flexbox,
			FlexboxItem,
			XButton,
			PopupPicker,
			Checker,
			CheckerItem,
			Cell,
			Icon,
			Confirm,
			XNumber,
			Selector,
			XSwitch
		},
		data() {
			return {
				switching: {
					user: false,
					table: true,
					ignition : true
				},
				time:"",
				name:'安吉',
				prompt:true,
                checkState : false,
				page: 'search',
				self: true,
				agent: false,
				awaitBoolean:false,
				todo: {
					housing:'',
					floor: '',
					unit:'',
					room:'',
					contact: '',
					protect:'',
					number:1,
					photo:null,
					meter_state:null,
					basic_living:null,
					ignite:null,
					id_photo:[],
					owner_photo:[],
					action: 'new_install',
					progress: 'pending',
					address: '',
					contract: 'contract',
					accepted_number: '',
					address_code: '',
					transform: '',
					owner: '',
					owner_id: '',
					owner_phone: '',
					agent: '',
					agent_id: '',
					agent_phone: '',
					ownership_type: '房产证',
					ownership_number: '',
					owner_id_front: '',
					owner_id_back: '',
					agent_id_front: '',
					agent_id_back: '',
					ownership_1: '',
					ownership_2: '',

				},
				defaultValue: '自用',
				 list: [{key: '自用', value: '自用'}, {key: '出租', value: '出租'}],
				actions: {
					'not-address':[
						// {
						// 	name: 'search',
						// 	text: '上一步',
						// 	page: 'new-owner',
						// },
						{
							name: 'new-owner',
							text: '下一步',
							page: 'new-owner',
							loading: false
						},
					],
					'new-owner': [
						// {
						// 	name: 'search',
						// 	text: '上一步',
						// 	page: 'new-owner',
						// },
						{
							name: 'owner-msg',
							text: '下一步',
							page: 'new-owner',
							loading: false
						},
					],

					'owner-msg': [
						// {
						// 	name: 'new-owner',
						// 	text: '上一步',
						// 	page: 'owner-msg',
						// },
						{
							name: 'ownership',
							text: '下一步',
							page: 'owner-msg',
							loading: false
						},
					],

					'ownership': [
						// {
						// 	name: 'owner-msg',
						// 	text: '上一步',
						// 	page: 'ownership'
						// },
						{
							name: 'open-contract',
							text: '下一步',
							page: 'ownership'
						},
					],
					'open-contract' : [
						{
							name: 'submit',
							text: '提交',
							page: 'open-contract'
						},
					]

					// 'other': [
					// 	{
					// 		name: 'ownership',
					// 		text: '上一步',
					// 		page: 'other'
					// 	},
					// 	{
					// 		name: 'notice',
					// 		text: '下一步',
					// 		page: 'other'
					// 	},
					// ],
					// 'notice': [
					// 	{
					// 		name: 'other',
					// 		text: '上一步',
					// 		page: 'notice'
					// 	},
					// 	{
					// 		name: 'submit',
					// 		text: '提交',
					// 		page: 'notice'
					// 	},
					// ],
					// 'contract': [
					// 	{
					// 		name: 'protocol',
					// 		text: '下一步',
					// 		page: 'contract'
					// 	},
					// ],
					// 'protocol': [
					// 	{
					// 		name: 'contract',
					// 		text: '上一步',
					// 		page: 'protocol'
					// 	},
					// 	{
					// 		name: 'contract-submit',
					// 		text: '提交',
					// 		page: 'notice'
					// 	},
					// ],
				},
				ownership_type: ['不动产权证'],
				ownership_types: [['不动产权证', '房屋产权证', '购房合同', '公租房合同']],
				slot_fix_index: 0,
				slot_fix : [
					{
						img : "ownership2",
						number_tip : "产权证号",
						prefix: "不动产权第",
						suffix: "号"
					},
					{
						img : "ownership1",
						number_tip : "产权证号",
						prefix: "杭房权证第",
						suffix: "号"
					},
					{
						img : "contract1",
						number_tip : "合同编号",
						prefix: "预",
						suffix: ""
					},
					{
						img : "contract2",
						number_tip : "合同编号",
						prefix: "",
						suffix: ""
					}
				],
				photo_data : {
					"protect" :{
						name: 'protect',
						src: '',
						loading: false
					},
					"owner_id_front" :{
						name: 'owner_id_front',
						src: '',
						loading: false
					},
					"owner_id_back" :{
						name: 'owner_id_back',
						src: '',
						loading: false
					},
					"agent_id_front" :{
						name: 'agent_id_front',
						src: '',
						loading: false
					},
					"agent_id_back" :{
						name: 'agent_id_back',
						src: '',
						loading: false
					},
					"ownership_1" :{
						name: 'ownership_1',
						src: '',
						loading: false
					},
					"ownership_2" :{
						name: 'ownership_2',
						src: '',
						loading: false
					}
				},
				install_item:[],
				install_items: [
					{
						key: 'gas,',
						value: '灶具开通(250元)'
					},
					{
						key: 'water_heater,',
						value: '热水器开通(200元)'
					},
					{
						key: 'hot,',
						value: '地热开通(500元)'
					},
					{
						key: 'dryer,',
						value: '干衣机(免费)'
					},
					{
						key: 'other,',
						value: '其他开通(200元)'
					},
				],
				contract: null,
				contract1: false,
				contract2: false,
				contract_immediate: true,
				type:null,
				address:'',
				areaGuid:'',
				communityGuid:'',
				address_type:'',
				jv_type:'',
				busiId:'',
				area:"",


			}
		},
		computed: {
			...mapGetters([
				'getRevoke',
				'getUid',
				'getUserId',
				'getPlatform',
				'getCompany'
			])
		},
		mounted: function () {
			console.log("info",this.$route.query.type)
			this.name=this.getCompany.title
			if(this.$route.query.type == 1){
				this.jv_type = '居民'
				this.busiId = 2
				this.area = '小区'
			}else{
				this.jv_type = '非居民'
				this.busiId = 1
				this.area = '区域'
			}
			this.type = this.$route.query.type

			if( this.$route.query.hasOwnProperty('todo') ){
				let todo = JSON.parse(decodeURIComponent(this.$route.query.todo));
				if( todo.information.progress == 'contract' ){
					this.page = 'contract';
					this.contract = todo;
				}
				if( todo.information.progress == 'revoke' ){
					this.page = 'new-owner';
					this.contract = todo;
					this.todo.address = todo.information.address;
					this.todo.address_code = todo.information.address_code;
					this.todo.transform = todo.information.transform;
					let items = todo.information.install_item.split(",");
					for ( let i = 0; i < items.length - 1; i++ ){
						let index = ["gas","water_heater","hot","dryer","other"].indexOf(items[i]);
						this.install_item.push(this.install_items[index]);
					}
					this.actions['new-owner'][0].name = "revoke";
					this.setRevoke(todo);
				}
			}
		},
		methods: {
			...mapMutations([
				'setRevoke'
			]),
			...mapActions([
				'postTodo',
				'upload',
				'finish'
			]),

			onSendInfo(info) {//接收search结果
				console.log('info',info.address);

				if (info.address == undefined ){
					this.page = "not-address";
				} else {
					this.address = info.address.floor
					this.areaGuid = info.address.areaGuid
					this.communityGuid = info.address.communityGuid
					this.address_type= info.address.address_type

					this.page = "new-owner";

				}


			},
			onAddPhoto(name, data, photo) {//接收photo返回file_path或FormData
				switch (name) {
					case "owner_id_front":
						console.log("owner_id_front",photo)
						this.todo.id_photo.push(photo)
						console.log("this.todo.id_photo",this.todo.id_photo)
						break;
					case 'owner_id_back':
						console.log("owner_id_back",photo)
						this.todo.id_photo.push(photo)
						console.log("this.todo.id_photo",this.todo.id_photo)
						break;
					case "agent_id_front":
						this.todo[name] = data.file_path;
						this.todo['agent'] = data.name;
						this.todo['agent_id'] = data.id_number;

						break;
					case "ownership_1":
						console.log("ownership_1",photo)
						this.todo.owner_photo.push(photo)
						console.log("this.todo.id_photo",this.todo.owner_photo)
						break;
					case "ownership_2":
						console.log("ownership_2",photo)
						this.todo.owner_photo.push(photo)
						console.log("this.todo.owner_photo",this.todo.owner_photo)
						break;
					default :
						this.todo[name] = data;
						break;
				}
				// this.photo_data[name] = photo;
			},
			onDeletePhoto(name) {
				this.todo[name] = '';
			},
			onPage(action) {
				let that = this;
				console.log(action.name);

				switch (action.name) {
					case "ownership"://根据产权人信息查询政务网数据

						if( this.todo.owner_id&&this.todo.id_photo.length == 2 ){//从产权人信息页下一步至产权信息页
							that.page = action.name;
						}else {
							that.$vux.alert.show({
								title: '错误',
								content: '信息输入不完整，请输入！'
							})
						}
						break;
					case "open-contract":
						if( this.todo.ownership_number&&this.todo.owner_photo.length == 2 ){//从产权人信息页下一步至产权信息页
							that.page = action.name;
							Date.prototype.Format = function (fmt) {
								var o = {
									"M+": this.getMonth() + 1, //月份
									"d+": this.getDate(), //日
									"H+": this.getHours(), //小时
									"m+": this.getMinutes(), //分
									"s+": this.getSeconds(), //秒
									"q+": Math.floor((this.getMonth() + 3) / 3), //季度
									"S": this.getMilliseconds() //毫秒
								};
								if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
								for (var k in o)
									if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
								return fmt;
							}
							var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
							this.time = time2
						}else {
							that.$vux.alert.show({
								title: '错误',
								content: '信息输入不完整，请输入！'
							})
						}
						break;
					case "notice"://未选开户项时提示
						let gas = false;
						for ( let i = 0; i < that.install_item.length; i++ ){
							if( that.install_item[i].key == 'gas,' ) {
								gas = true;
								break;
							}
						}
						if( !gas ){
							that.$vux.confirm.show({
								title: '提示',
								content: '是否需要开通灶具？',
								onCancel() {
									that.page = action.name;
								},
								onConfirm() {
									that.install_item.push(that.install_items[0]);
									that.page = action.name;
								}
							});
						} else {
							that.page = action.name;
						}
						break;
					case "other" :
						if( that.getRevoke ){
							that.page = 'notice';
						} else {
							that.page = action.name;
						}
						break;
					case "protocol" :
						that.contract_immediate = false;
						that.page = action.name;
						break;
					case "submit":
						that.onSubmit();
						break;
					case "contract-submit":
						that.onContractSubmit();
						break;
					case "revoke":
						that.$router.go(-1);
						break;
					case "not-address":
						console.log(1);
						break;
					case 'search':
						this.page = action.name
						break;
					case 'new-owner':
						// console.log(555555)
						if(this.todo.housing&&this.todo.floor&&this.todo.unit&&this.todo.room){
							this.address = this.todo.housing+this.todo.floor+this.todo.unit+this.todo.room
							this.address_type = 0
							 this.page=action.name
						}else{
							that.$vux.alert.show({
								title: '错误',
								content: '信息输入不完整，请输入！'
							})
						}
						break;
					default :
						if(action.name == 'owner-msg'){
							if(this.todo.owner&&this.todo.owner_phone&&this.todo.contact&&this.todo.number>0){
								if(this.switching.table){
									this.todo.meter_state = '需要装表'
								}else{
									this.todo.meter_state = '不需要装表'
								}
								if(this.switching.ignition){
									this.todo.ignite = '需要点火'
								}else{
									this.todo.ignite = '不需要点火'
								}
								if(this.switching.user){
									this.todo.basic_living = '是'
								}else{
									this.todo.basic_living = '否'
								}
								console.log("useage",this.defaultValue)
								console.log("todo",this.todo)
								this.page = action.name;
							}else{
								that.$vux.alert.show({
									title: '错误',
									content: '信息输入不完整，请输入！'
								})
							}

						}

						break;
				}
			},
			onOwnershipTypeSelected(value) {//产权类型变动，改变相关显示文本和示例图
				this.ownership_type = value;
				this.slot_fix_index = this.ownership_types[0].indexOf(value[0]);
				switch (value[0]) {
					case "不动产权证" :
					case "房屋产权证" :
						this.todo['ownership_type'] = '房产证';
						break;
					case "购房合同" :
						this.todo['ownership_type'] = '房屋销售合同号';
						break;
					case "公租房合同" :
						this.todo['ownership_type'] = '公房房卡';
						break;
				}
			},
			onGetHousingInformation (action){//政务网查询当前产权人房屋产权信息
				let that = this;
				that.$http.post('/TransferSystem/query/queryHousingInformation', that.qs.stringify({name:that.todo.owner,idNbr:that.todo.owner_id}))
					.then(data => {
						if( that.todo.hasOwnProperty('atuo_get') ){
							delete that.todo['atuo_get'];
						}
						if( data.rows && data.rows.length ){
							let rows = data.rows;
							let address = that.todo.address;
							for ( let i = 0; i < rows.length; i++ ){
								let hr_addr = address;
								if( rows[i].fwzl.indexOf("单元") < 0 ){
									let no_unit = address.split("1单元");
									hr_addr = no_unit[0] + no_unit[1];
								}
								if( rows[i].fwzl.indexOf(hr_addr) > -1 || hr_addr.indexOf(rows[i].fwzl) > -1 ){
									let names = rows[i].qlrmc.split(",");
									for( let n = 0; n < names.length; n++ ){
										names[n] = names[n].trim();
									}
									let syqsh = rows[i].syqzsh.split(",");
									let _ownership_number = null;
									if( syqsh[names.indexOf(that.todo.owner)] ){
										_ownership_number = syqsh[(names.indexOf(that.todo.owner))];
									} else {
										_ownership_number = syqsh[0];
									}

									that.todo.ownership_number = _ownership_number;
									that.todo["atuo_get"] = "从政务网可查询到产权信息";//增加标志
									action.loading = false;
									if( that.getRevoke ){
										that.page = 'notice';
									} else {
										that.page = 'other';
									}
									return;
								}
							}
							action.loading = false;
							that.page = action.name;
						} else {
							action.loading = false;
							that.page = action.name;
						}
					})
					.catch(err => {
						console.log(err);
						action.loading = false;
						if( that.getRevoke ){
							that.page = 'notice';
						} else {
							that.page = 'other';
						}
					})
			},
			onSubmit() {
				let that = this;
				that.upload({
					todo:that.todo,
					vue: that,
					success: function (todo) {
						let items = '';
						for ( let i = 0; i < that.install_item.length; i++ ){
							let item = that.install_item[i];
							items += item.key;
							let pay_info = {
								name: '新装燃气开通费',
								type:[],
								platform: ''
							};
							switch (item.key) {
								case "gas,":
									if( item.value == "灶具开通(250元)" ){
										pay_info.type.push("户内管开通费");
									} else {
										pay_info.type.push("二次开户费");
									}
									break;
								case "water_heater,":
									pay_info.type.push("热水器开通费");
									break;
								case "hot,":
									pay_info.type.push("地热开通费");
									break;
								case "other,":
									pay_info.type.push("其他开通费");
									break;
								case "dryer,":
									pay_info = null;
									break;
							}
							if( that.getRevoke ){
								if( that.getRevoke.information.hasOwnProperty('pay_info') && that.getRevoke.information.pay_info.type.indexOf('管道燃气设施改造费') > -1 && pay_info){
									pay_info.type.push("管道燃气设施改造费");
								}
							} else {
								if( i == 0 && todo.transform == '须缴纳' && (that.install_items[0].value == "灶具开通(250元)") && pay_info){
									pay_info.type.push("管道燃气设施改造费");
								}
							}
							(function (i) {
								if( pay_info ){
									todo['pay_info'] = pay_info;
								} else {
									delete todo['pay_info'];
								}
								todo['install_item'] = item.key;
								that.postTodo({
									url: '/todo',
									vue: that,
									todo: todo,
									success: function (message) {
										if( i == that.install_item.length - 1 ){
											message['todo'].information.install_item = items;
											that.finish({message:message,vue: that});
										}
									}
								});
							})(i);
						}
					}
				});
			},
			onContractSubmit (){
				let that = this;
				let todo = that.contract;
				let data = {};
				let filter = {};
				filter["information.progress"] = "contract";
				filter._id = todo._id;
				if( todo.information.hasOwnProperty("pay_info") ){
					data["information.progress"] = "unpaid";
				} else {
					data["information.progress"] = "accepted";
					data["need_transfer"] = true;
				}
				data["information.protocol1_agreement"] = "accept";
				data["information.protocol2_agreement"] = "accept";

				let update_data = {"filter" : filter, "update" : data};
				that.$vux.loading.show({
					text: '正在提交...'
				});
				that.$http.put("/" + that.getUid + "/todo", JSON.stringify(update_data),{headers: {'Content-Type': 'application/json; charset=utf-8'}})
					.then( message => {
						that.$router.replace({
							path:'progress',
						});
					})
					.catch( err => {
						console.log(err);
						that.$vux.alert.show({
							title:'错误',
							content:'提交失败，请重试！'
						});
					});
			},
			onCancel () {
					this.$router.go(-1)

			},
			onConfirm () {
				if (this.checkState == true) {
					this.prompt = false
				} else {
					this.$vux.toast.show({
						type:'text',
						text: '您还没有同意该协议'
						})

				}


			},
			close () {
				this.prompt = false
			},
			onNext(){
				let params= {
					'userId':this.getUserId,
					'platform':this.getPlatform,
					'busiName':'开户申请('+this.jv_type+')',
					'busiId':this.type,
					'type':this.jv_type,
					'gid':'',
					'address':this.address,
					'phone':this.todo.owner_phone,
					'idNumber':this.todo.owner_id,
					'gname':this.todo.owner,
					'area':'小区',
					'meterId':"",
					'others':{
						'details':{
							'areaGuid':this.areaGuid,
							'communityGuid':this.communityGuid,
							'ignite':this.todo.ignite,
							'owner_photo':this.todo.owner_photo,
							'peoples':this.todo.number,
							'contact':this.todo.contact,
							'address_type':this.address_type,
							'owner_number':this.todo.ownership_number,
							'id_photo':this.todo.id_photo,
							'basic_living':this.todo.basic_living,
							'meter_state':this.todo.meter_state,
							'useage':this.defaultValue,
							'contract':
								{
									"GasSupplySide":this.name,
									"GasSide":this.todo.owner,
									"CardNumber":this.todo.owner_id,
									"address":this.address,
									"phone":this.todo.contact,
									"cellPhone":this.todo.owner_phone,
									"option":"",
									"first-Side":this.name,
									"first-behalf":"",
									"B_GasSide":this.todo.owner,
									"B_CardNumber":this.todo.owner_id,
									"B_cellPhone":this.todo.owner_phone,
									"time":this.time
								}
						}

					}

				}
				console.log("params",params)
				this.awaitBoolean = true
				this.$http.post('/Zn/ProfessionalWork/Business/Addition',params).then(value=>{
					this.$vux.alert.show({
						width: '18em',
						type: 'text',
						text: '申请提交成功！'
					});
					this.$router.push({
						path:'/apply_success',
						query:params
					})
				}).catch(err=>{
					console.log('err',err)
					this.$vux.alert.show({
						title: '错误',
						content: '申请提交失败！'
					});
				})
			}
		},
		watch: {
			'agent': function () {
				this.self = !this.agent;
			},
			'self': function () {
				this.agent = !this.self;
			},
		}
	}
</script>

<style lang="less" scoped>
	input {
		background-color: rgb(255, 255, 255);
		text-align: center;
	}
	.inputs {
		border:none;
		border-bottom:#8D8D8D 1px solid;
	}
	.border0 {
		border:none;
	}
	.width100 {
		width: 100px;
	}
	.tcenter {
		text-align: center;
	}
	.no-padding-warp {
		height: 100%;
		background-color: #F3F5F7;
		/deep/ .weui-switch:checked{
			border-color: #007BD9;
   		 background-color: #007BD9;
		}
		.page {
			padding-bottom: 58px;

			.action-groups {
				padding: 25px 25px 45px 25px;
				background-color: white;

				/deep/ .weui-btn_primary {
					background-color: #40A0FF;
				}
			}

			.ownership_number {
				padding: 8.5px 15px;
				/deep/ input {
					background-color: #E5E5E5;
					height: 38px;
					border-radius: 3px;

					&::-webkit-input-placeholder {
						color: #999;
						font-size: 13px;
						text-align: center;
					}

					&:-moz-placeholder {
						color: #999;
						font-size: 13px;
						text-align: center;
					}

					&::-moz-placeholder {
						color: #999;
						font-size: 13px;
						text-align: center;
					}

					&:-ms-input-placeholder {
						color: #999;
						font-size: 13px;
						text-align: center;
					}
				}

				/deep/ .weui-cell__hd {
					width: 60%;
				}

				.slot-fix {
					color: #333;
					height: 26px;
					.prefix {
						float: right;
						margin-right: 8px;
					}
				}
			}
		}

		/deep/ .weui-cell {
			padding-top: 14.5px;
			padding-bottom: 14.5px;
			color: #333;
			background-color: #fff;
		}

		.check-box-cell {
			position: relative;

			.check-box {
				position: absolute;
				right: 15px;

				/deep/ .weui-icon-success:before {
					color: #40A0FF;
				}
			}
		}

		.install-items {
			background-color: white;
			padding: 0 10px;
			text-align: center;

			.default-install-item {
				width: 45%;
				height: 45px;
				border: 2px solid rgba(42,158,245,1);
				border-radius: 45px;
				color: #999;
				line-height: 41px;
				font-size: 15px;
				margin: 0 2.5% 24px 2.5%;
			}

			.selected-install-item {
				background:rgba(64,160,255,1);
				color: white;
			}
		}

		.need-transform {
			background-color: white;
			padding: 0 15px;
			font-size: 14px;
			font-weight: 400;
			color: #FF7C4E;
			line-height: 22px;
		}

		.contract {
			background-color: white;
			.contract-title {
				padding: 20px;
				font-weight: bold;
				font-size: 18px;
				p {
					text-align: center;
				}
			}
			.contract-body {
				padding: 15px;
				font-size: 14px;
				.contract-item-title {
					text-align:center;
					font-weight: bold;
				}
				.contract-item {
					text-indent: 2em;
				}
			}
			.contract-footer {
				text-align: center;
				.contract-footer-tip {
					font-size: 14px;
					padding: 20px;
					color: #a94442;
				}
			}
		}
		}
		.userAgreement{
			// padding-top: 15px;
			// padding-bottom: 20px;
			// border-top: 1px solid #DCDCDC;
			height: 300px;
			overflow: hidden;
			overflow-y:scroll;
			.content{
				text-align: left;
			}
		}
		.userAgreementWrap{
			/deep/ .weui-dialog__btn_primary{
				  background: #007BD9 ;
					color: #fff;
				}
		}


 .owner-msg{
	 /deep/ .weui-cells__title{
		 margin-top: 0;
	 }
	 /deep/ .weui-cell:before{
		 border: 0;
	 }
 }
</style>
