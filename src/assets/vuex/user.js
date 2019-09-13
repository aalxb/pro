import axios from 'axios'
import { cookie } from 'vux'
export default {
	state: {
		platform: 'alipay',
		user: {"_id":{"$oid":"5d43ead83466650100f80bcb"},"user_ids":["opeVGwT8JenEtvma4QPfQ_4NMlc8"],"phone":"17775737136","accounts":[{"address":"服务测试小区2幢2单元301室","name":"蒯雨阳","credentials_type":"身份证","credentials_number":"342625199509103151","relationship":"本人","src":"Y","area":"营业","phone":"17775737136,undefined","address_code":"E37196   ","user_number":"E37196","create_datetime":{"$date":{"$numberLong":1564732180204}}},{"address":"服务测试小区3幢1单元101室","name":"蒯雨阳","credentials_type":"身份证","credentials_number":"342625199509103160","relationship":"本人","src":"Y","area":"营业","phone":"17775737136,undefined","address_code":"E37589   ","user_number":"E37589","create_datetime":{"$date":{"$numberLong":1564732661901}}}],"account_count":2,"company_count":0,"create_datetime":{"$date":{"$numberLong":1564732120665}}},
		uid: null,
		user_id: null,
		readout_init: false,
		guides: '',
		userInfo: null,
		revoke: null,
		publicInfo: null,
		avatar:'/static/default_user.png',
		company: null,
	},
	mutations: {
		setPlatform (state, platform) {
			state.platform = (localStorage.platform == platform) ? localStorage.platform : platform;
			localStorage.platform = state.platform;
		},
		setUser (state, user) {
			state.user = user;
		},
		setUid (state, uid) {
			state.uid = (localStorage.uid == uid) ? localStorage.uid : uid;
			localStorage.uid = state.uid;
		},
		setUserId (state, user_id) {
			state.user_id = (localStorage.user_id == user_id) ? localStorage.user_id : user_id;
			localStorage.user_id = state.user_id;
		},
		setReadoutInit (state, readout_init) {
			state.readout_init = (localStorage.readout_init == readout_init) ? localStorage.readout_init : readout_init;
			localStorage.readout_init = state.readout_init;
		},
		setGuides (state, guides) {
			state.guides = (localStorage.guides == guides) ? localStorage.guides : guides;
			localStorage.guides = state.guides;
		},
		setUserInfo (state, userInfo ) {
			state.userInfo = userInfo;
		},
		setUserInfoDetail (state, detail) {
			state.userInfo[detail.key] = detail.value;
		},
		setRevoke (state, revoke){
			state.revoke = revoke;
		},
		setPublicInfo (state, info){
			state.publicInfo = info;
		},
		setAvatar (state, avatar) {
			state.avatar = (localStorage.avatar == avatar) ? localStorage.avatar : avatar;
			localStorage.avatar = state.avatar;
		},
		setCompany (state, company) {
			state.company = company;
			document.title = company.title;
		}
	},
	actions: {
		getClient ({getters, commit}, callback){
			axios.get('/client/' + getters.getUid)
				.then( data => {
					commit('setUser', data);
					if( callback )
						callback(data);
				})
				.catch( err => {
					console.log(err);
				});
		},
		postTodo ({state, dispatch, commit}, params) {
			let url = params.url || '/todo';
			let todo = params.todo || {};
			let success = params.success;
			let vue = params.vue;
			todo["platform"] = state.platform;
			if( todo.hasOwnProperty('pay_info') ){
				todo['pay_info'].platform = state.platform;
			}
			if (state.userInfo) {
				if (state.userInfo.hasOwnProperty("slbh"))
					todo["user_number"] = state.userInfo.slbh;

				if (!todo.hasOwnProperty("area")) {
					if(state.userInfo.hasOwnProperty("addrCode")) {
						let addrCodeHead = state.userInfo.addrCode.substr(0, 2);
						todo["area"] = (addrCodeHead == "75" || addrCodeHead == "76") ? "滨江" : "营业";
					} else {
						todo["area"] = "all";
					}
				}
			} else {
				if( todo.hasOwnProperty("address_code") && todo["address_code"].length > 0) {
					let addrCodeHead = todo["address_code"].substr(0, 2);
					todo["area"] = (addrCodeHead == "75" || addrCodeHead == "76") ? "滨江" : "营业";
				} else if (!todo.hasOwnProperty("area")){
					todo["area"] = "all";
				}
			}
			let method = state.revoke ? "put":"post";
			if( state.revoke ){
				todo.progress = "pending";
				let filter = {};
				filter._id = state.revoke._id;
				let info = state.revoke.information;
				let newTodo = {};
				for (let key in todo) {
					if (info.hasOwnProperty(key) && info[key] === todo[key])
						continue;
					newTodo["information." + key] = todo[key];
				}
				newTodo["information.pending_time"] = (new Date()).getTime();
				todo = {"filter" : filter, "update" : newTodo};
			} else {
				todo['timestamp'] = (new Date()).getTime();
				todo['pending_time'] = todo['timestamp'];
				if(state.userInfo && state.userInfo.dm)
					todo['dm'] = state.userInfo.dm;
			}
			vue.$vux.loading.show({
				text: '正在提交...'
			});
			axios[method]("/" + state.uid + url, JSON.stringify(todo),{headers: {'Content-Type': 'application/json; charset=utf-8'}})
				.then(message => {
					vue.$vux.loading.hide();
					if( state.revoke ){
						commit('setRevoke', null);
					}
					if (Object.prototype.toString.call(message)==='[object Object]') {
						if (success && Object.prototype.toString.call(success)==='[object Function]') {
							success(message);
						} else {
							dispatch('finish',{message:message,vue:vue});
						}
					} else {
						dispatch('finish',{message:null, vue:vue});
					}
				})
				.catch(err => {
					console.log(err);
					vue.$vux.loading.hide();
					vue.$vux.alert.show({
						title: '提交失败',
						content: '业务提交失败，请重试！'
					});
				});
		},
		upload ({state, dispatch}, params){
			let todo = params.todo || {};
			let success = params.success || function () {};
			let err = params.err;
			let type = params.type || 'credentials';
			let vue = params.vue;
			let formData = new FormData();
			let hasFile = false;
			let timer = null;
			if ( (typeof type == 'string') ){
				for ( let k in todo ){
					if( todo.hasOwnProperty(k) && Object.prototype.toString.call(todo[k]) === '[object FormData]' ){
						hasFile = true;
						formData.append(k, todo[k].get(k));
					}
				}
				if( !hasFile ){
					success(todo);
					return;
				}
			}
			if( type == 'reports' ){
				let count = 30;
				timer = setInterval(() => {
					vue.$vux.loading.show({
						text: count + 's'
					});
					if( count == 0 ){
						clearInterval(timer);
						vue.$vux.loading.hide();
						err("timeout");
					}
					count--;
				},1000);
			} else {
				vue.$vux.loading.show({
					text: '正在上传...'
				});
			}
			axios.post("/" + state.uid + "/" + type + "/file/new", formData)
				.then( data => {
					vue.$vux.loading.hide();
					if(Object.prototype.toString.call(data) === "[object String]"){
						data = JSON.parse(data);
					}
					let files = data.files;
					if( files && files.length ){
						for (let i = 0; i < files.length; i++) {
							let paths = files[i].split("/");
							let key = paths[paths.length - 1].split("-")[0];
							todo[key] = files[i];
						}
						if( timer ){
							clearInterval(timer);
						}
						success(todo);
					} else {
						vue.$vux.alert.show({
							title: '上传失败',
							content: '照片上传失败，请重试！'
						});
					}
				})
				.catch( error => {
					console.log(error);
					if( timer ){
						clearInterval(timer);
					}
					vue.$vux.loading.hide();
					vue.$vux.alert.show({
						title: '上传失败',
						content: '照片上传失败，请重试！'
					});
				});
		},
		finish ({state}, payload){
			if (payload.message) {
				payload.vue.$router.replace({
					path: 'success',
					query: {message: JSON.stringify(payload.message)}
				});
			}
			else
				payload.vue.$router.replace({path: 'success'});
		},
		PublicInfo ({getters, commit}, param){
			axios.post('/platform/njdys/transmit', JSON.stringify({"service":"QueryCustomer","custid":param.code}),{headers:{'Content-Type': 'application/json; charset=utf-8'}})
				.then( data => {
					if( !data || !data.hasOwnProperty('custinfo')){
						param.vue.$vux.alert.show({
							title: '编号错误',
							content: "编号错误！未查询到用户信息！请重新输入！",
							onHide: () => {
								if( param.hasOwnProperty('err') ){
									param.err();
								}
							}
						});
					} else {
						commit('setPublicInfo', data.custinfo);
						if( param.hasOwnProperty('success') ){
							param.success(data.custinfo);
						}
					}

				})
				.catch( err => {
					console.log(err);
					param.vue.$vux.alert.show({
						title: '编号错误',
						content: '编号错误！未查询到用户信息！请重新输入！',
						onHide: () => {
							if( param.hasOwnProperty('err') ){
								param.err();
							}
						}
					});
				});
		}
	},
	getters: {
		getPlatform (state){
			if(localStorage.hasOwnProperty("platform") && localStorage.platform){
				state.platform = localStorage.platform;
			} else if(sessionStorage.hasOwnProperty("platform") && sessionStorage.platform){
				state.platform = sessionStorage.platform;
			} else if( cookie.get('platform') ) {
				state.platform = cookie.get('platform');
			}
			return state.platform;
		},
		getUid (state){
			if (state.uid == null){
				if(localStorage.hasOwnProperty("uid") && localStorage.uid){
					state.uid = localStorage.uid;
				} else if(sessionStorage.hasOwnProperty("uid") && sessionStorage.uid){
					state.uid = sessionStorage.uid;
				} else if( cookie.get('uid') ) {
					state.uid = cookie.get('uid');
				}
			}
			return state.uid;
		},
		getUserId (state){
			if (state.user_id == null){
				if(localStorage.hasOwnProperty("user_id") && localStorage.user_id){
					state.user_id = localStorage.user_id;
				} else if(sessionStorage.hasOwnProperty("user_id") && sessionStorage.user_id){
					state.user_id = sessionStorage.user_id;
				} else if( cookie.get('user_id') ) {
					state.user_id = cookie.get('user_id');

				}
			}
			return state.user_id;
		},
		getUser (state){
			return state.user;
		},
		getReadoutInit (state){
			return state.readout_init;
		},
		getGuides (state){
			return state.guides;
		},
		getUserInfo (state){
			return state.userInfo;
		},
		getRevoke (state){
			return state.revoke;
		},
		getPublicInfo (state){
			return state.publicInfo;
		},
		getAvatar (state){
			return localStorage.avatar || state.avatar;
		},
		getCompany (state){
			return state.company;
		},
	}
}
