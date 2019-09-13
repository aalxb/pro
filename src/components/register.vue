<template>
	<div class="wrap">
		<div class="banner">
			<img :src="IMG_URL + '/static/zhenenglogo.png'">
		</div>
		<div class="register-area">
			<group>
				<h3 slot="title">手机号注册</h3>
				<x-input is-type="china-mobile" type="tel" placeholder="请输入手机号" ref="phone" v-model="verify.phone">
					<div slot="label" class="left-icon-box"><span class="phone"></span></div>
				</x-input>
				<x-input placeholder="验证码" v-model="reg_data.code">
					<div slot="label" class="left-icon-box"><span class="code"></span></div>
					<span slot="right" v-if="count_down == 60" class="send-code" @click="onSendVerifyCode">发送验证码</span>
					<span slot="right" v-else class="send-code active" v-text="'(' + count_down + 's)'"></span>
				</x-input>
			</group>
			<x-button class="login" @click.native="onLogin">登录</x-button>
		</div>
		<!-- <fix_footer></fix_footer> -->
	</div>
</template>

<script>
	import Footer from './common/footer'
	import {XInput, Group, XButton,} from 'vux'
	export default {
		name: "Register",
		components: {
			fix_footer: Footer,XInput, Group, XButton,
		},
		data() {
			return {
				ps: null,
				verify:{
					phone: "",
					type:"register"
				},
				reg_data :{
					user_id: "",
					phone: "",
					code: ""
				},
				count_down: 60,
				query: null,
				lock_verify: false
			}
		},
		beforeDestroy () {
			this.destroy()
		},
		mounted: function () {
			console.log(JSON.parse(this.$route.query.platformAccounts))
			// var s = unescape('http://zn.cloud-scale.cn/znclientweb/register/?platformAccounts=%7B%22oid%22%3A%22opeVGwb-EQcUg5dJUSbUg_tvfOk8%22,%22oimg%22%3A%22http%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FjDwTqZkwWicdoN8hZkFprpial3zvdaVQkH0Qd9YccQ0DH0ib954xicYQQAX0PwXz7IarX8ltqibwO8tFA8LwQZOzg4g%2F132%22,%22oname%22%3A%22ReallyLove%22,%22platform%22%3A%22WX%22%7D')
			this.ps = JSON.parse(this.$route.query.platformAccounts)
			// var p = {}
			// for (let index = 0; index < s.split(',').length; index++) {
			// //  console.log( s.split(',')[index].split('=') );
			// p[s.split(',')[index].split('=')[0].trim()] = s.split(',')[index].split('=')[1]
				
			// }
			// this.openId = p.oid
			// this.oname = p.oname
			// this.oimg = p.oimg
			// this.platform = p.platform
			// alert(this.openId)
			// alert(this.oname)


			// this.query = this.$route.query;

			// this.reg_data['user_id'] = this.query['user_id'];
			// if (this.query.hasOwnProperty("billkeys") && this.query["billkeys"].length > 0) {
			// 	let billkeys = this.query["billkeys"].split("-");
			// 	let user_numbers = [];
			// 	for(let i = 0; i < billkeys.length; i++){
			// 		if(billkeys[i].length === 6){
			// 			user_numbers.push(billkeys[i]);
			// 		}
			// 	}
			// 	if(user_numbers.length > 0){
			// 		this.reg_data['billkeys'] = user_numbers;
			// 	}
			// }
		},
		methods: {
			onSendVerifyCode (){
				let that = this;
				if( !that.lock_verify ){
					if( that.verify.phone && that.$refs.phone.valid ){
						that.lock_verify = true;
						console.log(that.verify.phone);
						
						that.$http.get('/Zn/Login/VerificationCode/'+ that.verify.phone )
							.then( (res) => {
								console.log(res);

								(() =>{
									let timer = setInterval(function () {
										that.count_down--;
										if (that.count_down == 0) {
											that.count_down = 60;
											clearInterval(timer);
											that.lock_verify = false;
										}
									}, 1000);
								})();
							})
							.catch(err => {
								console.log(err);
								that.lock_verify = false;
								that.$vux.alert.show({
									title: '错误',
									content: '验证码发送失败，请稍后重试！'
								});
							});
						// that.$http.post('/public/verify_code',JSON.stringify(that.verify),{headers: {'Content-Type': 'application/json; charset=utf-8'}})
						// 	.then( () => {
						// 		(() =>{
						// 			let timer = setInterval(function () {
						// 				that.count_down--;
						// 				if (that.count_down == 0) {
						// 					that.count_down = 60;
						// 					clearInterval(timer);
						// 					that.lock_verify = false;
						// 				}
						// 			}, 1000);
						// 		})();
						// 	})
						// 	.catch(err => {
						// 		console.log(err);
						// 		that.lock_verify = false;
						// 		that.$vux.alert.show({
						// 			title: '错误',
						// 			content: '验证码发送失败，请稍后重试！'
						// 		});
						// 	});
					}
				}
			},
			onLogin (){
				let that = this;
				if( that.reg_data.phone && that.$refs.phone.valid ){
					if( that.reg_data.code && that.reg_data.code.trim().length ){
						that.$vux.loading.show();
						var param = {
									"phone":that.reg_data.phone,
									"openId": that.ps.oid,
									"oname":that.ps.oname,
									"oimg": that.ps.oimg,
									"platform": that.ps.platform,
								}


						that.$http.post('/Zn/Login/verify', param)
							.then( (message) => {
								// alert(JSON.stringify(message))
								// alert(message.data[0].oimg)
								this.$router.push({path:'/index', query:{ userId:message.data[0].userid, oimg:message.data[0].oimg,oname:message.data[0].oname,platform:message.data[0].platform}});
								
							})
							.catch(err => {
								console.log(err);
								that.$vux.loading.hide();
								that.$vux.alert.show({
									title: '注册失败',
									content: '请检查手机号码以及验证码是否正确！'
								});
							});
					} else {
						that.$vux.toast.show({
							width: '18em',
							type: 'text',
							text: '请输入验证码！'
						});
					}
				}
			},
			destroy () {
				this.timer && clearInterval(this.timer)
			},
		},
		watch:{
			'verify.phone': function () {
				this.reg_data['phone'] = this.verify.phone;
			}
		}
	}
</script>

<style lang="less" scoped>
	.banner {
		width: 85%;
		margin: 0 auto;
		margin-bottom: 27.5px;
		margin-top: 50px;
		img {
			display: block;
			// width: 100%;
			border-radius: 10px;
		}
	}
	.register-area {
		padding: 20px 10px;
		/deep/ .weui-cells {
			margin-top: 0;
			&:before, &:after{
				border: unset;
			}
		}
		/deep/ .weui-cell {
			padding: 17px 15px;
			margin-bottom: 15px;
			box-shadow:0 5px 8px rgba(68,75,86,0.1);
			border-radius: 30px;
			&:before {
				border: unset;
			}
			input::-webkit-input-placeholder {
				color: #999;
				font-size: 15px;
				padding-left: 5px;
			}
			input:-moz-placeholder {
				color: #999;
				font-size: 15px;
				padding-left: 5px;
			}
			input::-moz-placeholder {
				color: #999;
				font-size: 15px;
				padding-left: 5px;
			}
			input:-ms-input-placeholder {
				color: #999;
				font-size: 15px;
				padding-left: 5px;
			}
		}
		.left-icon-box {
			width: 25px;
			height: 25px;
			padding: 2px 3.5px;
			span {
				display: inline-block;
				width: 100%;
				height: 100%;
				background: url("../../static/icon.png");
				background-size: 350px 450px;
				&.phone {
					background-position: -80px -352px;
				}
				&.code {
					background-position: -101px -352px;
				}
			}
		}
		.send-code {
			font-size: 16px;
			color: #40A0FF;
			&.active {
				color: #aaa;
			}
		}
		.login {
			border-radius: 30px;
			height: 54px;
			background:linear-gradient(134deg,rgba(42,158,245,1) 0%,rgba(21,125,240,1) 48%,rgba(0,91,235,1) 100%);
			opacity:0.9;
			color: #fff;
			box-shadow:0 5px 8px rgba(68,75,86,0.1);
			margin: 10px 0;
			&:after {
				content: unset;
			}
			&:active {
				color: #fff;
			}
		}
	}
</style>
