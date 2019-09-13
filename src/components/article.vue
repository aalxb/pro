<template>
	<div class="wrap" v-if="article">
		<img :src="article.img" class="img-responsive">
		<div class="" v-html="article.content"></div>
	</div>

</template>

<script>
	export default {
		name: "Article",
		data() {
			return {
				article: null
			}
		},
		mounted: function () {
			this.onGetArticle(this.$route.query.id);
		},
		methods: {
			onGetArticle (id){
				let that = this;
				let filter = {
					"_id" : {"$oid":id}
				};
				that.$http.get('/news/article/show',{
					params:{
						"filter": JSON.stringify(filter)
					}
				}).then( data => {
					that.article = data.articles[0];
					document.title = that.article.title;
				})
					.catch( err => {
						console.log(err);
					});
			},
		}
	}
</script>

<style lang="less" scoped>

</style>
