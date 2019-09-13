import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: '/znclientweb/',
	routes: [{
			path: '*',
			component: resolve => require(['../components/home/index'], resolve)
		},
		{
			path: '/index',
			name: 'HomeIndex',
			component: resolve => require(['../components/home/index'], resolve),
			children: [{
					path: '/information',
					name: 'Information',
					component: resolve => require(['../components/home/information'], resolve),
				},
				{
					path: '/service',
					name: 'Service',
					component: resolve => require(['../components/home/service'], resolve),
				},

				{
					path: '/mall',
					name: 'Mall',
					component: resolve => require(['../components/home/mall'], resolve),
				},
			]
		},
		{
			path: '/entry',
			name: 'Entry',
			component: resolve => require(['../components/entry'], resolve),
			meta: {
				title: '全部业务'
			}
		},
		{
			path: '/open',
			name: 'Open',
			component: resolve => require(['../components/resident/open'], resolve),
			meta: {
				title: '燃气开户'
			}
		},
		{
			path: '/new_install',
			name: 'newInstall',
			component: resolve => require(['../components/resident/new_install'], resolve),
			meta: {
				title: '新装燃气申请'
			}
		},
		{
			path: '/additional_install',
			name: 'additionalInstall',
			component: resolve => require(['../components/resident/additional_install'], resolve),
			meta: {
				title: '燃气补开申请'
			}
		},
		{
			path: '/success',
			name: 'Success',
			component: resolve => require(['../components/common/success'], resolve),
			meta: {
				title: '申请提交成功'
			}
		},
		{
			path: '/accounts',
			name: 'accounts',
			component: resolve => require(['../components/accounts'], resolve),
			meta: {
				title: '我的地址'
			}
		},
		{
			path: '/register',
			name: 'Register',
			component: resolve => require(['../components/register'], resolve),
			meta: {
				title: '浙能城燃'
			}
		},
		{
			path: '/appointment_center',
			name: 'appointmentCenter',
			component: resolve => require(['../components/resident/appointment_center'], resolve),
			meta: {
				title: '预约中心'
			}
		},
		{
			path: '/appointment_install',
			name: 'appointmentInstall',
			component: resolve => require(['../components/resident/appointment_install'], resolve),
			meta: {
				title: '预约安装'
			}
		},
		{
			path: '/info',
			name: 'infoImage',
			component: resolve => require(['../components/common/info_image'], resolve),
		},
		{
			path: '/chat',
			name: 'Chat',
			component: resolve => require(['../components/home/chat'], resolve),
			meta: {
				title: '智能客服'
			}
		},
		{
			path: '/knowledge',
			name: 'Knowledge',
			component: resolve => require(['../components/home/knowledge'], resolve),
			meta: {
				title: '详情'
			}
		},
		{
			path: '/article',
			name: 'Article',
			component: resolve => require(['../components/article'], resolve),
			meta: {
				title: ''
			}
		},
		{
			path: '/record',
			name: 'Record',
			component: resolve => require(['../components/record'], resolve),
			meta: {
				title: '业务记录'
			}
		},
		{
			path: '/address_detail',
			name: 'addressDetail',
			component: resolve => require(['../components/address_detail'], resolve),
			meta: {
				title: '地址详情'
			}
		},
		{
			path: '/readout',
			name: 'Readout',
			component: resolve => require(['../components/resident/readout'], resolve),
			meta: {
				title: '自助抄表'
			}
		},
		{
			path: '/non_resident',
			name: 'nonResident',
			component: resolve => require(['../components/public/non_resident'], resolve),
			meta: {
				title: '非居民管道燃气开户预约'
			}
		},
		{
			path: '/public_fix',
			name: 'publicFix',
			component: resolve => require(['../components/public/public_fix'], resolve),
			meta: {
				title: '拆改业务申请'
			}
		},
		{
			path: '/public_info_change',
			name: 'publicInfoChange',
			component: resolve => require(['../components/public/public_info_change'], resolve),
			meta: {
				title: '非居民用户信息变更'
			}
		},
		{
			path: '/change',
			name: 'publicChange',
			component: resolve => require(['../components/public/change'], resolve),
		},
		{
			path: '/progress',
			name: 'Progress',
			component: resolve => require(['../components/progress'], resolve),
			meta: {
				title: '受理进度查询'
			}
		},
		{
			path: '/pay',
			name: 'Pay',
			component: resolve => require(['../components/pay'], resolve),
			meta: {
				title: '费用支付'
			}
		},
		{
			path: '/revoke',
			name: 'Revoke',
			component: resolve => require(['../components/common/revoke'], resolve),
			meta: {
				title: '修改业务信息'
			}
		},
		{
			path: '/business_detail',
			name: 'businessDetail',
			component: resolve => require(['../components/business_detail'], resolve),
			meta: {
				title: '业务详情'
			}
		},
		{
			path: '/bill',
			name: 'Bill',
			component: resolve => require(['../components/resident/bill'], resolve),
			meta: {
				title: '账单查询'
			}
		},
		{
			path: '/public_business',
			name: 'public_business',
			component: resolve => require(['../components/public_business'], resolve),
			// meta: {
			// 	title: '装表'
			// }
		},
		{
			path: '/transfer_ownership',
			name: 'transfer_ownership',
			component: resolve => require(['../components/transfer_ownership'], resolve),
			meta: {
				title: '过户'
			}
		},
		{
			path: '/cancel',
			name: 'cancel',
			component: resolve => require(['../components/cancel'], resolve),
			// meta: {
			// 	title: '装表'
			// }
		},
		{
			path: '/pipeline_replacement',
			name: 'pipeline_replacement',
			component: resolve => require(['../components/pipeline_replacement'], resolve),
			meta: {
				title: '灶具管更换'
			}
		},
		{
			path: '/apply',
			name: 'apply',
			component: resolve => require(['../components/public/apply'], resolve),
			meta: {
				title: '报装'
			}
		},
		{
			path: '/bill_pay',
			name: 'bill_pay',
			component: resolve => require(['../components/bill'], resolve),
			meta: {
				title: '生活缴费'
			}
		},
		{
			path: '/message',
			name: 'message',
			component: resolve => require(['../components/message'], resolve),
			meta: {
				title: '信息填写'
			}
		},
		{
			path: '/apply_success',
			name: 'apply_success',
			component: resolve => require(['../components/success'], resolve),
			meta: {
				title: '浙江城燃'
			}
		},
		{
			path: '/charge',
			name: 'charge',
			component: resolve => require(['../components/service/charge'], resolve),
			meta: {
				title: '缴费指南'
			}
		},
		{
			path: '/promise',
			name: 'promise',
			component: resolve => require(['../components/service/promise'], resolve),
			meta: {
				title: '服务承诺'
			}
		},
		{
			path: '/resident',
			name: 'resident',
			component: resolve => require(['../components/service/resident'], resolve),
			meta: {
				title: '居民业务指南'
			}
		},
		{
			path: '/safe',
			name: 'safe',
			component: resolve => require(['../components/service/safe'], resolve),
			meta: {
				title: '安全知识'
			}
		},
		{
			path: '/record',
			name: 'record',
			component: resolve => require(['../components/record'], resolve),
			meta: {
				title: '业务记录'
			}
		},
		{
			path: '/commerce',
			name: 'commerce',
			component: resolve => require(['../components/service/commerce'], resolve),
			meta: {
				title: '工商报装指南'
			}
		},
		{
			path: '/questions',
			name: 'questions',
			component: resolve => require(['../components/service/questions'], resolve),
			meta: {
				title: '百问百答'
			}
		},
		{
			path: '/phone',
			name: 'phone',
			component: resolve => require(['../components/service/phone'], resolve),
			meta: {
				title: '热线电话'
			}
		},
		{
			path: '/gas',
			name: 'gas',
			component: resolve => require(['../components/service/gas'], resolve),
			meta: {
				title: '阶梯气价'
			}
		},
		{
			path: '/fee',
			name: 'fee',
			component: resolve => require(['../components/service/fee'], resolve),
			meta: {
				title: '收费标准'
			}
		},
		{
			path: '/navigation',
			name: 'navigation',
			component: resolve => require(['../components/service/navigation'], resolve),
			meta: {
				title: '服务网点'
			}
		},
		{
			path: '/child',
			name: 'child',
			component: resolve => require(['../components/child'], resolve),
			meta: {
				title: '保险'
			}
		},
		{
			path: '/payment',
			name: 'payment',
			component: resolve => require(['../components/payment'], resolve),
			meta: {
				title: '订单详情'
			}
		},
		{
			path: '/bill',
			name: 'bill',
			component: resolve => require(['../components/resident/bill'], resolve),
			children:[{
				path: '/pay',
				name: 'pay',
				component: resolve => require(['../components/pay'], resolve),
				meta: {
					title: '燃气账单'
				}
			}]
		},
	]
})
