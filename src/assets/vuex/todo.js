import axios from "axios";

export default {
	state: {
		PROGRESS_LIST : {
			"settled": {"level": 1, "tip": "待结算"},
			"unpaid": {"level": 2, "tip": "待支付"},
			"revoke": {"level": 3, "tip": "退回"},
			"contract": {"level": 4, "tip": "待签约"},
			"unaccepted": {"level": 10, "tip": "正在受理"},
			"refunding": {"level": 5, "tip": "待退款"},
			"cancel": {"level": 6, "tip": "待撤销"},
			"accepted": {"level": 10, "tip": "已受理"},
			"pending": {"level": 20, "tip": "待审核"},
			"finished": {"level": 30, "tip": "已办结"},
			"canceled" : {"level" : 50, "tip" : "已撤销"}
		},
		CAN_CANCEL_PROGRESS : ",pending,revoke,unaccepted,unpaid,contract,accepted",
		ACTION_LIST : {
			'new_install':{
				'name':"新装燃气申请",
				'pos':'0px -86px',
				'show_tip': false,
				"milestone": ["pending", "contract,revoke", "unpaid", "accepted,unaccepted", "settled,cancel", "finished,refunding"]
			},
			'additional_install':{
				'name':"燃气补开申请",
				'pos':'-33px -86px',
				'show_tip': true,
				"milestone": ["pending", "unpaid,revoke", "accepted,unaccepted", "settled,cancel", "finished,refunding"]
			},
			'non_resident':{
				'name':"非居民业务办理",
				'pos':'-33px -86px',
				'show_tip': true
			},
			'public_fix':{
				'name':"非居民用户拆、改、修申请",
				'pos':'-33px -86px',
				'show_tip': true
			},
		},
		AdditionalInstalled : {},
		REVOKE_PROGRESS:['revoke','unaccepted','cancel']
	},
	mutations: {
		setAdditionalInstalled (state, item){
			state.AdditionalInstalled[item] = true;
		}
	},
	actions: {

	},
	getters: {
		getActionList (state){
			return state.ACTION_LIST;
		},
		getAdditionalInstalled (state) {
			return state.AdditionalInstalled;
		},
		PROGRESS_LIST (state){
			return state.PROGRESS_LIST;
		},
		CAN_CANCEL_PROGRESS (state) {
			return state.CAN_CANCEL_PROGRESS;
		},
		REVOKE_PROGRESS (state) {
			return state.REVOKE_PROGRESS;
		},
	}
}
