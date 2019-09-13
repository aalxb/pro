<template>
    <div class="wrap" v-if="todo">
		<group title=" ">
			<CellBox class="bold-title">您的申请因以下原因被退回</CellBox>
			<cell :title="todo.information.review"></cell>
		</group>
		<group title=" ">
			<CellBox class="bold-title">基本信息</CellBox>
			<template v-for="(value,key) in list" v-if="todo.information.hasOwnProperty(key) && todo.information[key] != null && todo.information[key].toString().length > 0">
				<cell :title="value" :value="todo.information[key]"></cell>
			</template>
		</group>
		<flexbox class="action-groups">
			<flexbox-item>
				<x-button type="primary" @click.native="onRevoke">修改资料</x-button>
			</flexbox-item>
		</flexbox>
		<fix_footer></fix_footer>
	</div>
</template>

<script>
	import Footer from '../common/footer'
	import {Group, Cell, CellBox, Flexbox, FlexboxItem, XButton} from 'vux'
	export default {
		name: "Revoke",
		components:{
			fix_footer:Footer,
			Group,
			Cell,
			CellBox,
			Flexbox,
			FlexboxItem,
			XButton
		},
		data() {
			return {
				todo:null,
				list:{
					'public_hucode':'公建编号',
					'project_name':'工程名称',
					'public_company':'业主单位',
					'construction_owner':'施工单位联系人',
					'construction_owner_phone':'施工单位联系电话',
					'accepted_number':'受理编号',
					'address':'地址',
					'owner':'申请人',
					'install_items':'开通项目',
					'owner_phone':'联系电话',
					'type':'业务类型',
					'population':'人口数量',
				}
			}
		},
		mounted: function () {
			this.todo = JSON.parse(decodeURIComponent(this.$route.query.todo));
			if( this.todo.information.hasOwnProperty('install_item') ){
				let values = [];
				let items = {
					"gas" : "灶具",
					"water_heater": "热水器",
					"hot": "地热",
					"dryer": "干衣机",
					"other": "其他"
				};
				this.todo.information.install_item.split(",").forEach(function(s){
					if(items.hasOwnProperty(s))
						values.push(items[s]);
				});
				this.todo.information.install_items = values.join("，");
			}
		},
		methods: {
			onRevoke (){
				if( this.todo ){
					let path = this.todo.information.action;
					if( this.todo.information.action == "tuning" ){
						path = "check";
					} else if ( this.todo.information.action == "change" ){
						path = "transfer";
					}
					this.$router.replace({
						path:path,
						query:{todo:encodeURIComponent(JSON.stringify(this.todo))}
					});
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		/deep/ .weui-cell {
			padding-top: 14.5px;
			padding-bottom: 14.5px;
			color: #333;
			background-color: #fff;
		}
	}
</style>
