<template>
	<div class="photos" :class="[size == 'small' ? 'small-photos':'large-photos']">
		<template>
			<div class="photo" v-for="(photo,index) in photos" :key="photo.name">
				<div class="sample" v-if="size == 'large' && img">
					<img :src="IMG_URL +'/static/' + img + (index + 1) + '_mini.png'">
				</div>
				<div :class="[size == 'small' ? 'small-sample':(img ? 'sample':'large-sample')]">
					<template v-if="photo.loading">
						<Spinner type="bubbles" class="loading"></Spinner>
					</template>
					<template v-else-if="photo.src">
						<img :src="photo.src" :alt="photo.name" class="img">
						<span class="btn-clear" @click="onClear(photo)">×</span>
					</template>
					<template v-else>
						<span class="icon-add"><input type="file" :ref="photo.name" :id="photo.name" accept="image/*" @change="change(photo.name,index)"></span>
						<span :class="[size == 'small' ? '':'middle']" v-html="description[photo.rename ? photo.rename: photo.name].text"></span>
					</template>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	import { Spinner } from 'vux'
	import {mapActions, mapGetters} from "vuex";

	export default {
		name: "Photo",
		components: {
			Spinner
		},
		props: {
			photo_data: {
				type: Array,
				required: true,
				default: ["photo"]
			},
			img: {
				type: String,
				required: false,
			},
			size: {
				type: String,
				required: false,
				default: "small"
			}
		},
		created() {
			this.onSetPhotos();
		},
		data() {
			return {
				photos: [],
				description: {
					'gas_Supply':{
							text: '上传供气合同照片'
					},
					'ignition': {
							text: '上传表具图片'
					},
					'protect': {
						text: '上传低保照片'
					},


					'owner_id_front': {
						text: '人像面照片'
					},
					'owner_id_back': {
						text: '国徽面照片'
					},
					'agent_id_front': {
						text: '人像面照片'
					},
					'agent_id_back': {
						text: '国徽面照片'
					},
					'ownership_1': {
						text: '上传不动产权证<br/>第1页照片'
					},
					'ownership_2': {
						text: '上传不动产权证<br/>第2页照片'
					},
					'photo': {
						text: '上传仪表读数照片<br/><span class="sub-text">请确保照片读数清晰完整，能清晰辨认。</span>'
					},
					'file1': {
						text: '请点击下方按钮查看并长按保存《工业、公建用户拆改申请表》，打印后，正确填写并在对应的位置正确盖章后拍照上传。'
					},
					'picture': {
						text: '点击上传公章照片'
					},
					'public_company_change_1': {
						text: '请点击下方按钮查看并长按保存《非居民用户产权单位受理卡》，打印后，正确填写并在对应的位置正确盖章后拍照上传。'
					},
					'public_company_change_2': {
						text: '请点击下方按钮查看并长按保存《非居民用户产权单位受理卡》，打印后，正确填写并在对应的位置正确盖章后拍照上传。'
					},
					'license1':{
						text:'请上传产权单位营业执照'
					},
					'license2':{
						text:'请上传用气单位营业执照'
					},
					'public_payment_change_1':{
						text:'请点击下方按钮查看并长按保存《非居民用户付款方式（付款账号）申请受理卡》，打印后，正确填写并在对应的位置正确盖章后拍照上传。'
					},
				},
			}
		},
		computed: {
			...mapGetters([
				'getUserId',
				'getUid'
			])
		},
		mounted: function () {

		},
		methods: {
			...mapActions([
				'upload'
			]),
			onSetPhotos() {
				this.photos = this.photo_data;
			},
			change(name, i) {
				let that = this;
				let file = this.$refs[name][0].files[0];
				if (file) {
					that.photos[i].loading = true;
					that.lrz(file, {quality: 0.7,fieldName:name})
						.then(function (res) {
							// switch (name) {
								// case "agent_id_front":
								// 	that.$http.post('/hraddon/3rd/clients/idcard?userId=' + that.getUid, res.formData)
								// 		.then(idInfo => {
								// 			if( idInfo && idInfo.data && idInfo.data.error_code == 0 && idInfo.data.type == '第二代身份证'){
								// 				that.photos[i].loading = false;
								// 				that.photos[i].src = res.base64;
								// 				idInfo.data.file_path += ".jpg";
                                //
								// 				that.$emit('onAddPhoto', name, idInfo.data, that.photos[i]);
								// 			} else {
								// 				that.photos[i].loading = false;
								// 				that.$vux.toast.show({
								// 					width: '18em',
								// 					type: 'text',
								// 					text: '照片识别失败，请重试！'
								// 				});
								// 			}
								// 		})
								// 		.catch(err => {
								// 			console.log(err);
								// 			that.photos[i].loading = false;
								// 			that.$vux.toast.show({
								// 				width: '18em',
								// 				type: 'text',
								// 				text: '照片识别失败，请重试！'
								// 			});
								// 		});
								// 	break;
								// case "photo":
								// 	that.upload({
								// 		todo:{photo:res.formData},
								// 		type:'reports',
								// 		vue:that,
								// 		success: (result) =>{//只能在回调中取消加载和显示图片
								// 			that.photos[i].loading = false;
								// 			that.photos[i].src = res.base64;
								// 			let photo = result.photo;
								// 			that.$emit('onAddPhoto', name, photo, that.photos[i]);
								// 		},
								// 		err:(error) => {
								// 			that.photos[i].loading = false;
								// 			that.photos[i].src = res.base64;
								// 			if( error == 'timeout' ){
								// 				that.$emit('onAddPhoto', name, ' ', that.photos[i]);
								// 			}
								// 		}
								// 	});
								// 	break;
								// default :
									that.photos[i].loading = false;
									that.photos[i].src = res.base64;
									console.log("图片",that.photos[i].src)
									let params = {
										'Bes64':that.photos[i].src
									}
									that.$http.post('/Zn/ProfessionalWork/image/Upload',params).then(value=>{
										console.log("value",value)
										console.log("name",name)
										that.$emit('onAddPhoto', name, res.formData, value);
									}).catch(err=>{
										console.log("err",err)
										that.$vux.alert.show({
											width: '18em',
											type: 'text',
											text: '图片上传失败，请重试！'
										});
									})

									// break;
							// }
						})
						.catch(function (err) {
							that.photos[i].loading = false;
							that.$vux.toast.show({
								width: '18em',
								type: 'text',
								text: '图片压缩失败，请重试！'
							});
						});
				}
			},
			onClear (photo){
				photo.src = "";
				this.$emit('onDeletePhoto', photo.name);
			}
		},
		watch: {
			'photo_data': function (value, oldValue) {
				for ( let i = 0; i < value.length; i++){
					if( value[i].name !== oldValue[i].name ){
						this.onSetPhotos();
						break;
					}
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@small-height: 125px;
	@large-height: 225px;
	.photos {
		padding: 5px 15px;

		.photo {
			flex: 1;
			border: 1px dashed #BFBFBF;
			border-radius: 10px;
			text-align: center;
			color: #666;
			padding: 5px;
			position: relative;

			.icon-add {
				margin: 36px auto 12.5px auto;
				display: block;
				width: 30px;
				height: 30px;
				background: url("../../../static/icon.png");
				background-size: 1050px 1350px;
				background-position: -18px -1069.667px;
				position: relative;

				input {
					/*height: 30px;*/
					/*width: 30px;*/
					/*font-size: 100px;*/
					/*position: absolute;*/
					/*right: 0;*/
					/*top: 0;*/
					/*opacity: 0;*/
					/*filter: alpha(opacity=0);*/
					/*cursor: pointer*/
					height: 45px;
					width: 47px;
					font-size: 23px;
					position: absolute;
					right: 0px;
					top: 0;
					opacity: 0;
					filter: alpha(opacity=0);
					cursor: pointer;
				}
			}

			.img {
				width: 100%;
				height: 100%;
				border-radius: 10px;
			}

			.btn-clear {
				position: absolute;
				right: 0;
				top: -3px;
				height: 20px;
				width: 20px;
				text-align: center;
				line-height: 17.5px;
				border-radius: 10px;
				background-color: #5b5b5b;
				color: #fff;
			}

			.sample {
				display: inline-block;
				width: 50%;
				height: 100%;


				img {
					height: 100%;
				}

				&:first-child {
					float: left;
				}

				&:last-child {
					float: right;
				}

				.middle {
					display: inline-block;
					padding-top: 25px;

					.sub-text {
						color: #999;
					}
				}
			}

			.small-sample {
				height: 100%;
			}

			.large-sample {
				height: 100%;
			}
		}
	}

	.small-photos {
		display: flex;
		justify-content: space-around;

		.photo {
			height: @small-height;

			&:last-child {
				margin-left: 8px;
			}

			.loading {
				line-height: @small-height;
			}
		}
	}

	.large-photos {
		.photo {
			height: @large-height;

			&:last-child {
				margin-top: 15px;
			}

			.loading {
				line-height: @large-height;
			}
		}
	}
</style>
