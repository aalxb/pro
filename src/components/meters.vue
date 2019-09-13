<template>
    <div>
		<group>
			<cell inline-desc='2019-05-29'>
				<span slot="title"><span style="vertical-align:middle;">指数：</span><span style="vertical-align:middle;color: #FF8D13;font-size: 20px">{{nums}}</span> </span>
				<a href="javascript:void(0)" style="color: #40A0FF">修改</a>
			</cell>
		</group>
	</div>
</template>

<script>
	import { Cell, Group,} from 'vux'
    export default {
        name: "meters",
		components: {
			Group,
			Cell,
		},
		data(){
        	return{
        		nums:1994,
			}
		}
    }
</script>

<style scoped>

</style>
