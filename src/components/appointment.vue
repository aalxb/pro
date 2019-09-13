<template>
<div>
	<group>
		<cell v-for="(i,index) in messages" :key="index" :title="i.name" :inline-desc='i.message'>
			<img slot="icon" width="20" style="display:block;margin-right:15px;" src="consult.png">
			<a href="javascript:void(0)" style="color: #40A0FF">评价</a>
		</cell>
	</group>
</div>
</template>

<script>
	import { Cell, Group,} from 'vux'
    export default {
        name: "appointment",
		components: {
			Group,
			Cell,
		},
		data(){
			return{
				messages:[
					{
						icon:'',
						name:'拆、改、修',
						message:'2019-05-29  上午',
						url:''
					},
					{
						icon:'',
						name:'点火',
						message:'2019-02-13  上午',
						url:''
					},
				]
			}
		}
    }
</script>

<style scoped>

</style>
