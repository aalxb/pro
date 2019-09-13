<template>
	<div>
		<x-header style="background-color:#fff; color: black">生活缴费<a slot="right">账单管理</a></x-header>
	</div>
</template>

<script>
	import { XHeader } from 'vux'
    export default {
        name: "bill",
		components:{
			XHeader
		}
    }
</script>

<style scoped>

</style>
