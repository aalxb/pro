<template>
	<div class="wrap">
		<grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
			<grid-item :link="{ path: 'notification'}" v-for="(block,index) in blocks" :key="block.route">
				<div slot="icon" class="cell-menu">
					<div class="img-box" :style="{backgroundPosition: (index * -27.5) + 'px -231px'}"></div>
				</div>
				<span class="name" slot="label" v-text="block.title"></span>
			</grid-item>
		</grid>
		<div class="menu-title">生活精彩</div>
		<scroller lock-y :scrollbar-x=false>
			<div class="scroll-box">
				<div class="scroll-item" v-for="(image, index) in images" :key="index">
					<img class="img-responsive" :src="image">
				</div>
			</div>
		</scroller>
		<div>
			<div class="menu-title">猜你喜欢</div>
			<flexbox v-for="(article, index) in articles" :key="index"  @click.native="onViewDetail(article)"
					 class="flex-box" v-if="article.hasOwnProperty('img')">
				<flexbox-item>
					<div class="flex-left">
						<div class="flex_title">
							{{article.title}}
						</div>
						<div class="flex_time">
							<span class="flex_time_date">{{setDate(article.created_at.$date.$numberLong)}}</span><span>{{article.board}}</span>
						</div>
					</div>
				</flexbox-item>
				<flexbox-item :span="4">
					<div class="flex-img"><img class="img-responsive" :src="article.img"></div>
				</flexbox-item>
			</flexbox>
		</div>
	</div>
</template>

<script>
	import {Grid, GridItem, GroupTitle, XButton, Scroller, Flexbox, FlexboxItem, dateFormat} from 'vux'
	export default {
		name: "Information",
		components: {
			Grid,
			GridItem,
			GroupTitle,
			XButton,
			Scroller,
			Flexbox,
			FlexboxItem
		},
		data() {
			return {
				blocks:[
					{
						title:'燃气通知',
						route:'notice',
					},
					{
						title:'生活资讯',
						route:'life',
					},
					{
						title:'快乐厨房',
						route:'kitchen',
					},
					{
						title:'用气知识',
						route:'knowledge',
					},
				],
				articles: [],
				images: []
			}
		},
		mounted: function () {
			this.onGetArticle();
		},
		methods: {
			onGetArticle (){
				let that = this;
				let filter = {
					"title":{"$nin":["board-tag"]}
				};
				that.$http.get('/news/article/show',{
						params:{
							"filter": JSON.stringify(filter)
						}
					}).then( data => {
						that.articles = data.articles;
						for ( let i = 0; i < 7; i++ ){
							let index = i % 2;
							that.images.push(that.articles[index].img);
						}
					})
					.catch( err => {
						console.log(err);
					});
			},
			setDate (timestamp) {
				return (dateFormat(timestamp, 'YYYY-MM-DD'));
			},
			onViewDetail (article){
				this.$router.push({
					path:'/article',
					query:{id:article._id.$oid}
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		.cell-menu {
			height: 100%;
			width: 100%;
			display: block;
			margin: 0 auto;
			border-radius: 25px;
			.img-box {
				height: 100%;
				width: 100%;
				margin: 0 auto;
				padding: 0.5px;
				position: relative;
				background-image: url("../../../static/icon.png");
				background-size: 350px 450px;
				background-position: 0 0;
				background-origin: content-box;
				background-clip: content-box;
			}
		}
		.name {
			font-size: 12px;
			color: #333;
			text-align: center;
			font-weight: bold;
		}
		.menu-title {
			font-size: 20px;
			font-weight: bold;
			color: #333;
			padding: 32px 0 15px 0;
		}
		.scroll-box {
			height: 150px;
			position: relative;
			width: 1490px;
			.scroll-item {
				width: 200px;
				height: 150px;
				display: inline-block;
				margin-left: 15px;
				float: left;
				text-align: center;
				line-height: 100px;
				&:first-child {
					margin-left: 0;
				}
				img {
					border-radius: 10px;
					height: 100%;
					width: 100%;
				}
			}
		}
		.flex-box {
			margin-bottom: 10px;
			.flex-left {
				.flex_title {
					font-size: 16px;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					padding-bottom: 30px;
				}
				.flex_time {
					font-size: 13px;
					font-weight: 500;
					color: rgba(153, 153, 153, 1);
					.flex_time_date {
						margin-right: 12px
					}
				}
			}
			.flex-img {
				color: #fff;
				background-clip: padding-box;
				width: 100%;
				height: 97.5px;
				border-radius: 10px;
			}
		}
		.weui-grids {
			border-radius: 5px;
			box-shadow: 0 4px 14px 0 rgba(40, 42, 42, 0.14);
			margin: 10px 7px 0 0;
			a {
				text-decoration: none !important;
			}
		}
	}

</style>
