<!-- 聊天界面 -->
<template>
	<div class='chat-box'>
		<!-- 聊天内容 -->
		<div class="container">
			<div class="container-wrap" id="container-wrap">
				<div class="chat-con" id="chat-con">
					<div v-for="(item,index) in chattingRecords">
						<div class="con-msg clearfix" v-if="item.mediaType == 2">
							<div class="botui" :class="[item.type == 0 ? 'user':'labour']">
								<div>{{item.text}}</div>
							</div>
						</div>
						<div class="con-msg clearfix" v-if="item.mediaType == 4">
							<div class="botui" :class="[item.type == 0 ? 'user':'labour']">
								<div>{{item.text}}</div>
							</div>
						</div>
						<div class="con-msg clearfix" v-if="item.mediaType == 3">
							<div class="botui" :class="[item.type == 0 ? 'user':'labour']">
								<div>
									<!-- <img src="../../../static/FAQ/add.png" alt=""> -->
									<img
										:src="'http://test.cloud-scale.cn/file/talk/' + item.userId + '/ ' + item.mediaId+ '.jpg'"
										alt="">
								</div>
							</div>
						</div>
						<div class="con-msg clearfix" v-if="item.mediaType == 5">
							<div class="botui" :class="[item.type == 0 ? 'user':'labour']">
								<div>
									<div>【{{item.text}}】</div>
									<div v-for="(menuItem,menuItemIndex) in item.menu">
										<span style="color:#40A0FF;margin-bottom:15px;;display:block" @click="labours"
											  v-if="menuItem.action == 5">{{menuItem.text}}</span>
										<span v-else-if="menuItem.action == 0 || menuItem.action == 1"
											  @click="linkKnowledge(menuItem)"
											  style="color:#40A0FF;margin-bottom:15px;;display:block"><strong>{{menuItemIndex+1}},</strong>
											{{menuItem.text}}
											</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 发送框 -->
		<div class="footer">
			<div class="footer-item" @click="VoiceSwitch">
				<i class="voiceIcon" v-if="chatTool.voice"></i>
				<i v-else class="keybor"></i>
			</div>
			<div class="footer-item">
				<div v-if="chatTool.voice" style="text-align:center;color:black;padding:10px 15px"
					 @touchstart="gotouchstart" @touchend="gotouchend" @touchmove="gotouchmove">
					按住 说话
				</div>
				<div v-else>
					<x-input placeholder="请输入你的问题" v-model="msg" :show-clear="false" @on-focus="focusValue"
							 @on-blur="blurValue">
					</x-input>
				</div>

			</div>

			<div class="footer-item" @click="sendMsg">
				<span class="sendBtn">发送</span>
			</div>
			<div class="footer-item" @click="addImg">
				<i></i>
			</div>
		</div>
		<div class="voiceMaxIcon" v-if="voiceMaxIcon">
			<img :src="IMG_URL + '/static/voiceMax.png'">
		</div>
	</div>
</template>

<script>
	import {
		XInput,
		Group,
		XButton,
		Cell,
		Spinner,
		AlertModule,
		Rater,
		Range,
		Popup,
		PopupHeader,
		TransferDom,
		XHeader
	} from "vux";

	export default {
		name: 'Chat',
		components: {
			XInput,
			Group,
			XButton,
			Cell,
			Spinner,
			AlertModule,
			Rater,
			Range,
			Popup,
			PopupHeader,
			XHeader
		},
		data() {
			//这里存放数据
			return {
				chattingRecords: null, //聊天记录
				msg: null,
				timer: null,
				timerInput: null, //定时器
				chatTool: {
					voice: false
				},
				voiceMaxIcon: false, // 语音图标
				localId: null, //音频id
				ImglocalIds: null, //图片id
			};
		},
		//监听属性 类似于data概念
		computed: {},
		//监控data中的数据变化
		watch: {},
		//方法集合
		methods: {
			labours() {
				let that = this;
				this.$http.post('/hraddon/talkman/say', JSON.stringify({
					OpenId: 'obpaYvx9-o6HPEqu8IgI22f4aV5k',
					InHall: true,
					Platform: 'weixin',
					MsgType: 'text',
					Content: '转为人工服务'
				}), {
					headers: {
						'Content-Type': 'application/json; charset=utf-8'
					}
				})
					.then(data => {
						that.msg = "";
						that.circulation();
					})
					.catch(err => {
						console.log(err);
					})
			},
			//语音切换
			VoiceSwitch() {
				this.chatTool.voice = !this.chatTool.voice;
			},
			//循环数据
			circulation() {
				let that = this;
				that.loadData(true);
				if (that.timer == null)
					that.timer = setInterval(function () {
						that.loadData(false);
					}, 2000);
			},
			//发送文字
			sendMsg() {
				let that = this;
				if (this.msg !== '' && this.msg !== null) {
					this.$http.post('/hraddon/talkman/say', JSON.stringify({
						OpenId: 'obpaYvx9-o6HPEqu8IgI22f4aV5k',
						InHall: true,
						Platform: 'weixin',
						MsgType: 'text',
						Content: this.msg
					}), {
						headers: {
							'Content-Type': 'application/json; charset=utf-8'
						}
					})
						.then(data => {
							that.msg = "";
							that.circulation();
						})
						.catch(err => {
							console.log(err);
						})
				}
			},
			//长按事件
			gotouchstart() {
				let that = this
				clearTimeout(this.timeOutEvent)
				this.timeOutEvent = 0;
				this.timeOutEvent = setTimeout(function () {
					that.voiceMaxIcon = true
					that.$wechat.startRecord({
						success: function (res) {
							// alert(JSON.stringify(res) )
						}
					});
				}, 600)

			},
			//释放事件
			gotouchend() {
				let that = this
				this.voiceMaxIcon = false
				clearTimeout(this.timeOutEvent);
				this.$wechat.stopRecord({
					success: function (res) {
						that.localId = res.localId; // 返回音频的本地ID
						that.uploadVoiceRed()

					}
				});
				if (this.timeOutEvent != 0) {
					//这里写要执行的内容（尤如onclick事件）
					this.voiceMaxIcon = false

				}

			},
			//上传语音
			uploadVoiceRed() {
				let that = this
				this.$wechat.uploadVoice({
					localId: that.localId, // 需要上传的音频的本地ID，由stopRecord接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						let serverId = res.serverId; // 返回音频的服务器端ID\
						// alert(JSON.stringify(serverId))
						that.$http.post('/hraddon/talkman/say', JSON.stringify({
							OpenId: 'obpaYvx9-o6HPEqu8IgI22f4aV5k',
							InHall: true,
							Platform: 'weixin',
							MsgType: 'voice',
							MediaId: serverId
						}), {
							headers: {
								'Content-Type': 'application/json; charset=utf-8'
							}
						})
							.then(data => {
								that.circulation()
							})
							.catch(err => {
								// alert(err)
							})

					}
				});
			},
			gotouchmove() {
				clearTimeout(this.timeOutEvent); //清除定时器
				this.timeOutEvent = 0;
			},
			//添加图片
			addImg() {
				let that = this
				this.$wechat.chooseImage({
					count: 1, // 默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
					success: function (res) {
						that.ImglocalIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						that.uploadImageLad()
					}
				});
			},
			//上传图片
			uploadImageLad() {
				let that = this
				let localIds = this.ImglocalIds
				this.$wechat.uploadImage({
					localId: localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
					isShowProgressTips: 1, // 默认为1，显示进度提示
					success: function (res) {
						let serverId = res.serverId; // 返回图片的服务器端ID
						that.$http.post('/hraddon/talkman/say', JSON.stringify({
							OpenId: 'obpaYvx9-o6HPEqu8IgI22f4aV5k',
							InHall: true,
							Platform: 'weixin',
							MsgType: 'image',
							MediaId: serverId
						}), {
							headers: {
								'Content-Type': 'application/json; charset=utf-8'
							}
						})
							.then(data => {
								that.circulation()
							})
							.catch(err => {
								// alert(err)
							})
					}
				});
			},
			//input focues
			focusValue() {
				let that = this;
				this.timerInput = setInterval(() => {
					// window.scrollTo(0, document.body.scrollHeight);
					document.body.scrollTop = document.body.scrollHeight;
				}, 100);
			},
			//input blur
			blurValue() {
				clearInterval(this.timerInput);
				document.body.scrollTop = this.bfscrolltop;
				this.timerInput = null;
			},
			//滚动聊天内容到底部
			scrollToBottom() {
				this.$nextTick(() => {
					let boxHeight = document.getElementById('container-wrap');
					let box1 = document.getElementById('chat-con').offsetHeight
					boxHeight.scrollTop = box1;

				});
			},
			//加载数据
			loadData(needScorll) {
				let that = this;
				this.$http.get('/hraddon/talkman/talks?' + this.qs.stringify({
					openid: 'obpaYvx9-o6HPEqu8IgI22f4aV5k',
					platform: 'weixin',
					// page: 0,
					// pageSize: 60
				}))
					.then(data => {
						console.log(data);
						// let datas = data.reverse()
						that.chattingRecords = data.list.reverse()
						that.scrollToBottom()
					})
					.catch(err => {
						console.log(err);
					})
			},
			//跳转到知识内容
			linkKnowledge(item) {
				console.log(item);
				if (item.param) {
					window.location.href = item.param;
				} else {
					this.$router.push({path: '/knowledge', query: {keyword: item.text}})
				}

			}
		},
		created() {
			let that = this
			this.$http.get('/platform/weixin/jsapi_signature', {})
				.then(data => {
					let r = data;
					that.$wechat.config({
						debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
						appId: r.app_id, // 必填，公众号的唯一标识
						timestamp: r.timestamp, // 必填，生成签名的时间戳
						nonceStr: r.noncestr, // 必填，生成签名的随机串
						signature: r.signature, // 必填，签名
						jsApiList: ["openLocation", "getLocation", "chooseImage", "stopRecord", "playVoice", "startRecord", "uploadVoice", "uploadImage"], // 必填，需要使用的JS接口列表
					});
				})
		},
		mounted() {
			let that = this;
			setTimeout(function () {
				that.loadData(true);
			}, 500);
			if (that.$route.query.hasOwnProperty('keyword')) {
				that.msg = that.$route.query['keyword'];
				that.sendMsg();
			}
		},
		beforeRouteEnter(to, from, next) {
			let u = navigator.userAgent;
			let _path = (process.env.NODE_ENV == 'development' ? '/web/ui' : '/web/ui');
			let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

			if (isiOS && (_path + to.path) !== location.pathname) {
				location.assign(_path + to.fullPath)
			} else {
				next()
			}
		},
	}

</script>

<style lang='less' scoped>
	//@import url(); 引入公共css类
	* {
		user-select: none;
	}

	.clearfix:after {
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.chat-box {
		width: 100%;
		height: 100%;
		background: #F3F3F7;
	}

	.vux-header {
		background: #40A0FF !important;
	}

	.container {
		width: 100%;
		height: 100%;
		padding-top: 20px;
		padding-bottom: 75px;
		// border: 1px solid red;
		overflow: hidden;

		.container-wrap {
			padding: 0 15px;
			overflow-y: auto;
			height: 100%;

			.user {
				background-color: #fff;
				float: right;
				white-space: normal;
				margin-bottom: 10px;
				background: #40A0FF;
				color: #fff;
			}

			.botui {
				padding: 5px 10px;
				border-radius: 5px;
				// background-color: #fff;
				width: auto;
				max-width: 85%;
				display: inline-block;
				border: 1px solid #e8e8e8;
				word-wrap: break-word;

			}

			.labour {
				margin-bottom: 10px;
				background: #fff;
			}
		}

	}

	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 55px;
		background-color: #fff;
		border-top: 1px solid #d8d8d8;

		z-index: 99;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.footer-item {

			.sendBtn {
				display: block;
				width: 50px;
				height: 32px;
				color: #333;
				font-size: 14px;
				text-align: center;
				line-height: 32px;
				border-radius: 4px;
				border: 1px solid #ccc;
			}

			i {
				display: block;
				width: 32px;
				height: 32px;;
			}
		}

		.footer-item:nth-child(1) {
			.voiceIcon {
				background-image: url("../../../static/keybor.png");
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}

			.keybor {
				background-image: url("../../../static/voice.png");
				background-repeat: no-repeat;
				background-size: contain;
			}
		}

		.footer-item:nth-child(2) {
			width: 60%;
		}

		// .footer-item:nth-child(3){

		// }
		.footer-item:nth-child(4) {
			i {
				background-image: url("../../../static/add.png");
				background-repeat: no-repeat;
				background-size: cover;
			}
		}
	}

	.voiceMaxIcon {
		position: absolute;
		width: 100px;
		height: 100px;
		left: 50%;
		margin-left: -100/2px;
		top: 50%;
		margin-top: -100/2px;
		background: rgba(0, 0, 0, .6);

		div {
			width: 64px;
			height: 64px;
			margin: 15px auto;
			line-height: 64px;

		}

		img {
			display: block;
			width: 100%;
			height: auto;

		}
	}

</style>
