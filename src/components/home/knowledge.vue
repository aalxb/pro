<template>
	<div class='wrap'>
		<div v-for="item in list" class="box">
			<h3>{{item.subject}}</h3>
			<p>{{item.content}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Knowledge",
		data() {
			return {
				keyword:null,
				type: null,
				list:null
			}
		},
		mounted: function () {
			console.log(this.$route.query.keyword);
			this.keyword = this.$route.query.keyword;
			this.$http.get('/hraddon/talkman/knowledge?' + this.qs.stringify({
				keyword: this.keyword,
			})).then(data => {
					console.log(data.list);
					this.list = data.list
				})
				.catch(err => {
					console.log(err);
				})
		},
		methods: {}
	}
</script>

<style lang="less" scoped>
	.box{
		h3{
			text-align: center;
		}
		p{
			font-size: 14px;
			word-wrap:break-word;
			padding:15px 15px;
		}
	}
</style>
