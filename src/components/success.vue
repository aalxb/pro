<template>
    <div>
		<div class="icon">
			<icon type="success" is-msg></icon>
		</div>
		<div class="icon-success">申请提交成功</div>
		<div class="icon-title">工作人员将及时对您申请的业务进行审核</div>
		<div class="apply">
			申请信息
		</div>
		<div class="title">
			<cell-form-preview :list="list"></cell-form-preview>
		</div>
		<div class="btn">
			<button @click = 'index'>返回首页</button>
		</div>
	</div>
</template>

<script>
	import { Box, Icon ,CellFormPreview, Group, Cell} from 'vux'
    export default {
        name: "success",
		components: {
			Box, Icon,CellFormPreview, Group, Cell
		},
		data(){
        	return {
				list: [{
					label: '类型',
					value: ''
				}, {
					label: '申请人',
					value: ''
				}, {
					label: '地址',
					value: ''
				}, {
					label: '手机号',
					value: ''
				}]
			}
		},
		mounted(){
        	console.log("数据",this.$route.query)
			this.list[0].value=this.$route.query.busiName
			this.list[1].value=this.$route.query.gname
			this.list[2].value=this.$route.query.address
			this.list[3].value=this.$route.query.phone

		},
		methods:{
        	index(){
        		this.$router.push("/index")
			}
		}
    }
</script>

<style lang="less" scoped>
	/deep/.weui-icon-success{
		color: rgba(0, 123, 217, 1);
	}
	/deep/ .weui-form-preview__label{
		font-size:16px;
		font-family:PingFang SC;
		font-weight:600;
		line-height:28px;
		color:rgba(51,51,51,1);
		opacity:1;
		padding: 5px 0;
	}
	/deep/ .weui-form-preview__value{
		font-size:14px;
		font-family:PingFang SC;
		font-weight:400;
		line-height:22px;
		color:rgba(102,102,102,1);
		opacity:1;
	}
	.apply{
		margin: 50px 15px 20px 15px;
		padding:0px 0px 0px 10px;
		height: 18px;
		font-size: 15px;
		line-height: 18px;
		font-weight: 600;
		border-left: 4px solid rgba(0, 123, 217, 1);;
	}
	.icon{
		width: 93px;
		height: 93px;
		margin:35px auto;
	}
	.icon-success{
		text-align: center;
		color: rgba(0, 123, 217, 1);
		font-weight:800 ;
		font-size: 18px;
	}
	.icon-title{
		text-align: center;
		font-size: 14px;
		margin-top: 10px;
		color: gray;
	}
	.title{
		margin: 0px 15px;
		background:rgba(255,255,255,1);
		box-shadow:0px 3px 12px rgba(30,36,67,0.05);
		opacity:1;
		border-radius:4px;
	}
	.btn{
		width: 98px;
		height: 40px;
		border: 1px solid rgba(0, 123, 217, 1);
		border-radius: 10px;
		margin:45px auto;
		button{
			background-color: rgba(245, 245, 245, 1);
			width: 100%;
			height: 100%;
			color: rgba(0, 123, 217, 1);
			border: none;
			border-radius: 10px;
		}
	}
</style>
