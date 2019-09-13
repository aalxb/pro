<template>
	<div class="container">
		<table>
			<thead>
			<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>
			</thead>
			<tbody>
			<template v-for="(month,key) in months">
				<tr><td colspan="7" class="title_month" v-if="month.length">{{key == 'pre' ? set_month(1):set_month(0)}}</td></tr>
				<template v-for="(_week,w) in month">
					<tr>
						<td v-for="(day,d) in _week" @click="show_detail(key,w,d,day)">
							{{day?day.day:''}}
							<span v-if="day" :class="[(((day.counts.am + day.counts.pm) <= 0) || ((day.counts.am + day.counts.pm) >= limit)) ? 'full_booked':'']"
								  :ref="'day-' + day.day" :data-key="key" :data-w="w" :data-d="d"
							>{{ (((day.counts.am + day.counts.pm) <= 0) || ((day.counts.am + day.counts.pm) >= limit)) ? "已约满" :  (day.counts.am + day.counts.pm)}}</span>
						</td>
					</tr>
				</template>
			</template>
			</tbody>
		</table>
		<div class="btn-no-time">
			<span @click="onChooseDay('noTime')">无时间要求</span>
		</div>
		<div v-transfer-dom>
			<confirm v-model="show_popup" ref="confirm" class="calendar_confirm" :title="confirm_title" :close-on-confirm="false"
					 @on-hide="onResetChoose" @on-cancel="onResetChoose" @on-confirm="onChooseDay">
				<div class="calendar_body" v-model="select_day" v-if="select_day">
					<flexbox class="flex-box">
						<flexbox-item>
							<check-icon :value.sync="choose_am" :class="[choose_am ? '':'uncheck']">上午
								<div class="subtitle" v-if="select_day.counts.am > 0">可预约量: {{select_day.counts.am}}</div>
								<div class="subtitle full_booked" v-else>已约满</div>
							</check-icon>
						</flexbox-item>
						<flexbox-item>
							<check-icon :value.sync="choose_pm" :class="[choose_pm ? '':'uncheck']">下午
								<div class="subtitle" v-if="select_day.counts.pm > 0">可预约量: {{select_day.counts.pm}}</div>
								<div class="subtitle full_booked" v-else>已约满</div>
							</check-icon>
						</flexbox-item>
					</flexbox>
				</div>
			</confirm>
		</div>
	</div>
</template>

<script>
	import { Popup, Group, TransferDomDirective as TransferDom, Confirm, CheckIcon, Flexbox, FlexboxItem} from 'vux'
	export default {
		name: 'calendar',
		directives: {
			TransferDom
		},
		components:{
			Popup,
			Group,
			Confirm,
			CheckIcon,
			Flexbox,
			FlexboxItem
		},
		props:{
			type:{
				type:String,
				required:true,
			},
			default_date:{
				type:Date,
				required:false,
				default:function () {
					return new Date();
				}
			},
			limit_hour:{
				type:Number,
				required: false,
				default:0
			},
			team:{
				type:String,
				required: true,
				default:"2"
			},
		},
		data() {
			return {
				day_range:[],
				week:[],
				months:{
					pre:[],
					next:[]
				},
				hour_tick:86400000,
				pre_days:0,
				show_popup:false,
				max: 150,
				limit:0,
				default_am: 0,
				default_pm:0,
				start_date:'',
				end_date:'',
				confirm_title:'',
				choose_am: false,
				choose_pm: false,
				select_day: null,
			}
		},
		mounted: function () {
			this.get_days(this.default_date);
			let i = 0;
			let j = 0;
			for( i; i < this.months.pre.length; i++ ){
				if( this.months.pre[i].length < 7 ){
					let lack = 7 - this.months.pre[i].length;
					for( j; j < lack; j++ ){
						this.months.pre[i].push(0);
					}
				}
			}
			i = 0;
			j = 0;
			for( i; i < this.months.next.length; i++ ){
				if( this.months.next[i].length < 7 ){
					let lack = 7 - this.months.next[i].length;
					for( j; j < lack; j++ ){
						this.months.next[i].push(0);
					}
				}
			}
			this.onGetMax();
		},
		methods: {
			close () {
				this.show_popup = false;
			},
			submit () {

			},
			get_days (date) {
				let hour = date.getHours();
				if( this.limit_hour && hour >= this.limit_hour){
					date = new Date(date.getTime() + this.hour_tick * 2);
				} else {
					date = new Date(date.getTime() + this.hour_tick);
				}
				let start_date = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
				this.start_date = start_date;
				let end_date = null;
				let year = null;
				if (date.getMonth() == 11) {
					end_date = (date.getFullYear() + 1) + "/1/" + date.getDate();
				} else if( date.getMonth() == 0 ){
					if( date.getDate() == 29){
						if( (date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) || date.getFullYear() % 100 == 0 ){
							end_date = date.getFullYear() + "/2/"+ date.getDate();
						} else {
							end_date = date.getFullYear() + "/3/1";
						}
					} else if (date.getDate() == 30 || date.getDate() == 31) {
						end_date = date.getFullYear() + "/3/1";
					} else {
						end_date = date.getFullYear() + "/2/"+ date.getDate();
					}
				} else {
					end_date = date.getFullYear() + "/" + (date.getMonth() + 2) + "/" + date.getDate();
				}
				this.end_date = end_date;
				let time = new Date(end_date) - new Date(start_date);
				let days = time / 86400000;
				let i = new Date(start_date).getDate();
				let j = 1;
				let month = new Date(start_date).getMonth();
				if( i !== 1 ){
					if (month == 1) {
						year = new Date(start_date).getFullYear();
						if( (year % 4 == 0 && year % 100 != 0) || year % 100 == 0 ){
							for (i; i <= 29; i++) {
								if( i == 29){
									this.day_to_week(new Date(start_date),i,true,true);
								} else {
									this.day_to_week(new Date(start_date),i,true);
								}
							}
						} else {
							for (i; i <= 28; i++) {
								if( i == 28 ){
									this.day_to_week(new Date(start_date),i,true,true);
								} else {
									this.day_to_week(new Date(start_date),i,true);
								}
							}
						}
					} else if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
						for (i; i <= 31; i++) {
							if( i == 31){
								this.day_to_week(new Date(start_date),i,true,true);
							} else {
								this.day_to_week(new Date(start_date),i,true);
							}

						}
					} else if (month == 3 || month == 5 || month == 8 || month == 10) {
						for (i; i <= 30; i++) {
							if( i == 30 ){
								this.day_to_week(new Date(start_date),i,true,true);
							} else {
								this.day_to_week(new Date(start_date),i,true);
							}
						}
					}
				}

				if( month == 1 ){
					year = new Date(end_date).getFullYear();
					if( (year % 4 == 0 && year % 100 != 0) || year % 100 == 0 ){
						for (j; j <= 29 - this.pre_days; j++) {
							if( j == 29 - this.pre_days ){
								this.day_to_week(new Date(end_date),j,false,true);
							} else {
								this.day_to_week(new Date(end_date),j);
							}
						}
					} else {
						for (j; j <= 28 - this.pre_days; j++) {
							if( j == 28 - this.pre_days ){
								this.day_to_week(new Date(end_date),j,false,true);
							} else {
								this.day_to_week(new Date(end_date),j);
							}
						}
					}
				} else {
					if( i !== 1 ){
						for (j; j <= days - this.pre_days; j++) {
							if( j == days - this.pre_days ){
								this.day_to_week(new Date(end_date),j,false,true);
							} else {
								this.day_to_week(new Date(end_date),j);
							}
						}
					} else {
						for ( j; j <= days; j++ ){
							if( j == days ){
								this.day_to_week(new Date(start_date),j,true,true);
							} else {
								this.day_to_week(new Date(start_date),j,true);
							}
						}
					}
				}
			},
			day_to_week (date,day,is_pre,end){
				date = new Date(date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + day);
				if( day == 1 && (is_pre === undefined || !is_pre)){
					this.months.pre = this.day_range;
					this.day_range = [];
					this.week = [];
				}

				if( date.getDay() == 0){
					this.week = [];
					this.week.push({day:day,counts:{am:this.default_am,pm:this.default_pm}});
				} else {
					this.week[date.getDay()] = {day:day,counts:{am:this.default_am,pm:this.default_pm}};
				}

				if( is_pre ){
					this.pre_days++;
				}
				if( date.getDay() == 6 || end){
					this.day_range.push(this.week);
					if( end && is_pre ){
						this.months.pre = this.day_range;
					} else if( end && !is_pre ){
						this.months.next = this.day_range;
					}
				}
			},
			set_month (is_pre){
				if( is_pre ){
					if (this.default_date.getMonth() + 1 < 10 ) {
						return (this.default_date.getFullYear() + "年" + '0' + (this.default_date.getMonth() + 1) + "月");
					} else {
						return (this.default_date.getFullYear() + "年" + (this.default_date.getMonth() + 1) + "月");
					}
				} else {
					if( this.default_date.getMonth() == 11 ){
						return ((this.default_date.getFullYear() + 1) + "年1月");
					} else {
						if ( this.default_date.getMonth() + 2 < 10) {
							return (this.default_date.getFullYear() + "年" + '0' + (this.default_date.getMonth() + 2) + "月");
						} else {
							return (this.default_date.getFullYear() + "年" + (this.default_date.getMonth() + 2) + "月");
						}
					}
				}
			},
			show_detail (key,week,day,days){
				if( days && ((days.counts.am + days.counts.pm) > 0 || (days.counts.am + days.counts.pm) < this.limit)){
					let number = (Number(days.day) < 10) ? '0' + days.day : days.day;
					this.confirm_title = this.set_month( key == 'pre' ? 1 : 0) + number + '日';
					this.select_day = days;
					this.show_popup = true;
				}
			},
			set_counts (day,counts){
				let set = 0;
				for( let p = 0; p < this.months.pre.length; p++ ){
					let p_week = this.months.pre[p];
					for( let pw = 0; pw < p_week.length; pw ++ ){
						if( p_week[pw] && p_week[pw].day == day ){
							// this.$set(this.months.pre[p][pw],"counts",counts);
							this.$set(this.months.pre[p][pw],"counts",counts);
							//p_week[pw].counts = counts;
							set = 1;
							break;
						}
					}
				}
				if( !set ){
					for( let n = 0; n < this.months.next.length; n++ ){
						let n_week = this.months.next[n];
						for( let nw = 0; nw < n_week.length; nw ++ ){
							if( n_week[nw] && n_week[nw].day == day ){
								this.$set(this.months.next[n][nw],"counts",counts);
								//n_week[nw].counts = counts;
								break;
							}
						}
					}
				}
			},
			onGetMax (){
				if( this.type == "pipe" ){
					this.get_order_info();
				} else {
					let that = this;
					that.$http.all([
						that.onGetTypeLimit(),
						that.onGetTypeMax()
					]).then(that.$http.spread( (limit, max) => {
						that.limit = limit.limit;
						that.max = max.max;
						that.get_order_info();
					}));
				}
			},
			get_order_info (){
				let that = this;
				let s_stamp = new Date(that.start_date).getTime() - new Date(that.start_date).getTimezoneOffset() * 60000;
				let e_stamp = new Date(that.end_date).getTime() - new Date(that.end_date).getTimezoneOffset() * 60000;
				let filter = {
					date: {$lt:{$date:{$numberLong:e_stamp}},$gte:{$date:{$numberLong:s_stamp}}},
					team:that.team
				};
				that.$http.all([
					that.onGetDayLimit({team:that.team}),
					that.onGetOrdered({filter: JSON.stringify(filter)})
				]).then(that.$http.spread( (limit, info) => {
					that.default_am = limit.am;
					that.default_pm = limit.pm;
					that.$nextTick( () => {
						that.onSetOrders(info);
					});
				}));
			},
			onGetDayLimit(param) {//获取默认上下午预约量
				return this.$http.get('/order/limit?' + this.qs.stringify(param))
			},
			onGetOrdered(param) {//获取已预约信息
				return this.$http.get('/order/info?' + this.qs.stringify(param))
			},
			onGetTypeMax() {//获取默认上下午预约量
				return this.$http.get('/manager/order/' + this.type + '/max')
			},
			onGetTypeLimit() {//获取已预约信息
				return this.$http.get('/order/' + this.type + '/limit')
			},
			onSetOrders (info){
				for ( let key in this.months ){
					if( this.months.hasOwnProperty(key) ){
						let month = this.months[key];
						for ( let w = 0; w < month.length; w++ ){
							let week = month[w];
							for ( let d = 0; d < week.length; d++ ){
								let day = week[d];
								if( day ){
									day['counts']['am'] = this.default_am;
									day['counts']['pm'] = this.default_pm;
									for ( let i = 0; i < info.length; i++ ){
										let _day = new Date(info[i].date.$date.$numberLong).getDate();
										let isFirst = ((_day-( new Date().getHours() >= this.limit_hour ? 2 : 1 )) == new Date().getDate());
										if( day.day == _day ){
											if( info[i].time == "AM" ){
												day['counts']['am'] = info[i].limit - info[i].ordered;
											} else {
												day['counts']['pm'] = info[i].limit - info[i].ordered;
											}
											if( isFirst ){
												day['first'] = true;
											}
											break;
										}
									}
								}
							}
						}
					}
				}
			},
			onResetChoose (){
				this.choose_am = false;
				this.choose_pm = false;
			},
			onChooseDay( noTime ) {
				if( noTime && noTime == 'noTime'){
					this.$emit('onChooseDay', {time:"AM",date:"无时间要求"});
				} else {
					if( this.choose_am || this.choose_pm ){
						let date = this.confirm_title;
						date = date.replace(/年|月/g, "-");
						date = date.replace(/日/g, '');
						let data = {
							date: date,
							time: this.choose_am ? "AM" : "PM",
						};
						this.$emit('onChooseDay', data);
						this.show_popup = false;
					} else {
						this.$vux.toast.show({
							width: '15em',
							type: 'text',
							text: '请选择预约时间',
							position:'middle'
						});
					}
				}
			}
		},
		watch: {
			'choose_am': function () {
				if( this.select_day.counts.am > 0 ){
					this.choose_pm = !this.choose_am;
				} else {
					this.choose_am = false;
				}
			},
			'choose_pm': function () {
				if( this.select_day.counts.pm > 0 ){
					this.choose_am = !this.choose_pm;
				} else {
					this.choose_pm = false;
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.container {
		background-color: white;
		height: 100%;
		table {
			width: 100%;
			border-collapse: collapse;
			border-spacing: 0;
			th,td {
				text-align: center;
				font-size:16px;
			}
			th {
				padding: 5px 0;
				background-color: #F2F3F5;
				&:first-child,&:last-child {
					color: #73b9ea;
				}
			}
			td {
				padding: 15px 0 10px;
				font-weight:bold;
				color: #333;
				&.title_month {
					padding: 5px 0 0;
				}
				span {
					display: block;
					font-size: 12px;
					font-weight: normal;
					color: #2A9EF5;
					&.full_booked {
						color: #FF8D13;
					}
				}
			}
			tbody {
				background-color: white;
			}
		}
	}
	.calendar_confirm {
		/deep/ .weui-dialog__btn_primary {
			color: #2A9EF5;
		}
		.calendar_body {
			.flex-box {
				height: 110px;
				font-size: 20px;

				/deep/ .weui-icon-success:before {
					color: #40A0FF;
				}

				/deep/ .vux-check-icon {
					span {
						color: #2A9EF5;
						font-weight: bold;
					}
					.full_booked {
						color: #FF8D13;
					}
				}
				/deep/ .vux-check-icon.uncheck {
					span {
						color: #999;
					}
				}
				.subtitle {
					padding: 5px 0 5px 30px;
					font-size: 12px;
					font-weight: normal;
				}
			}
		}
	}
	.btn-no-time {
		text-align: center;
		span {
			display: inline-block;
			color: #40A0FF;
			width: 150px;
			height: 45px;
			border: 1px solid #40A0FF;
			border-radius: 45px;
			line-height: 40px;
			margin-top: 20px;
		}
	}
</style>
