<template>
	<div class="wrap">
		<template>
			<div v-html="messages">

			</div>
		</template>
	</div>
</template>

<script>
	/*import { } from 'vux'*/
	export default {
		name: "resident",
		components: {
		},
		data(){
			return{
				forumId: '',
				messages: [],
			}
		},
		mounted:function(){
			console.log(this.$route.meta.title)
			this.forumId = this.$route.meta.title;

			this.onGetMessage();
		},
		methods:{
			onGetMessage() {
				let that = this;
				that.$http.get("/Zn/ProfessionalWork/Articles/SelectList?forumId=" + that.forumId, null)
					.then(function (response) {
						that.messages =response[0].content;
						console.log(that.messages);
						/*alert(that.messages);*/
					})
					.catch(function (error) {
						console.log(error);
						that.$vux.toast.show({
							width: '18em',
							type: 'text',
							text: '查询错误！'
						})
					});
			},
		}
	}
</script>

<style scoped>

</style>
