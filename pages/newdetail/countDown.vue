<template>
	<view class="countDown">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="backToIndex"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<view class="nav-bar-userset-add"></view>
		</view>
		<view class="main-view">
		<view class="inputFrame">
			<input class="inputForm" 
				placeholder="输入TP名称" 
				placeholder-class="placeHolder" 
				maxlength="6"
				confirm-type="done"
				v-model="schedule.title"/>
		</view>
		<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindEdateChange">
			<view class="Edate">{{Edate}}</view>
		</picker>
		<view class="time-picker">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindEdateChange">
				<view class="time-picker-view">设定倒计日</view>
			</picker>
			<!-- <picker mode="time" :value="date" :start="startDate" :end="endDate" @change="bindEdate2Change">
				<view class="time-picker-view">{{Edate2}}</view>
			</picker> -->
		</view>
		<view class="addNotes">
			<view class="addButton"
				v-on:click="showNote=!showNote"
			>
			添加备注
			</view>
			<view>
				<textarea class="Note" 
					v-if="showNote"
					v-model="schedule.note"
					placeholder="此处输入备注"
				>
				</textarea>
			</view>
		</view>
		</view>
		<view class="confirm">
			<button class="confirmButton" v-on:click="done">完成</button>
		</view>
	</view>
</template>

<script>
	import {addSchedule,changeSchedule,deleteSchedule,getAllSchedule,getOneSchedule} from "../../js/schedule.js"
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				schedule:{
					type:1,
					isUserDefined:false,
					title:"",
					time:{
						start:{
							year:"",
							month:"",
							day:"",
							hour:0,
							minute:0,
							second:0,
						},
						end:{
							year:"",
							month:"",
							day:"",
							hour:0,
							minute:0,
							second:0,
						},
						now:{},
					},
					note:"",
				},
				showNote:false,
				Edate:currentDate,
				startDate: currentDate,
				endDate: "2019-12-12",
				bubbleProperty:[
					{
						x: 100,
						y: 100,
						style:{
							height: "300upx",
							width: "200upx",
							'border-radius': "50upx",
						}
					}
				]
			};
		},
		onLoad() {
			var dataSplit = this.Edate.split("-")
			this.Edate = dataSplit[0]+"年"+dataSplit[1]+"月"+dataSplit[2]+"日"
			this.schedule.time.start.year = dataSplit[0]
			this.schedule.time.start.month = dataSplit[1]
			this.schedule.time.start.day = dataSplit[2]
			this.schedule.time.end.year = dataSplit[0]
			this.schedule.time.end.month = dataSplit[1]
			this.schedule.time.end.day = dataSplit[2]
		},
		methods:{
			backToIndex: function(){
				uni.navigateBack()
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindSdateChange: function(e) {
				this.Sdate = e.target.value
				this.isDisabled = false
			},
			bindEdateChange: function(e) {
				var dataSplit = e.target.value.split("-")
				this.Edate = dataSplit[0]+"年"+dataSplit[1]+"月"+dataSplit[2]+"日"
				this.schedule.time.end.year = dataSplit[0]
				this.schedule.time.end.month = dataSplit[1]
				this.schedule.time.end.day = dataSplit[2]
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}, 
			done: function(){
				//uni.clearStorage();
				let code = addSchedule(this.schedule);
				let data = getAllSchedule();
				uni.navigateTo({
					url:'/pages/index/index'
				})
				uni.showToast({
					title: '新建成功',
					duration: 1500
				});
			}
		}
	}
</script>

<style>
	.nav-bar-userset{
		position: sticky;
		justify-content: space-between;
		display: flex;
		background-color: rgb(255,255,255);
		width: 750upx;
		height: 150upx;
		top: var(--status-bar-height);
	}
	.nav-bar-userset-sublogo{
		margin-top: 55upx;
		width: 100upx;
		height: 45upx;
	}
	.nav-bar-userset-back{
		margin-top: 55upx;
		margin-left: 50upx;
		width: 25upx;
		height: 40upx;
	}
	.nav-bar-userset-add{
		margin-top: 55upx;
		margin-right: 50upx;
		width: 30upx;
		height: 40upx;
	}
	.inputTitle{
		width: 100%;
		flex-direction: column;
		margin-top: 80upx;
	}
	.inputForm{
		text-align: center;
		justify-content: center;
		font-size: 36upx;
		color: #000000;
		width: 620upx;
		padding: 20upx;
		margin: 20upx 15upx;
		margin-left: 40upx;
		border-bottom: 4upx solid gray;
	}
	.placeHolder{
		font-size: 36upx;
		font-weight: 1000;
		text-align: center;
	}
	.Edate{
		text-align: center;
		justify-content: center; 
		font-size: 36upx;
		color: #000000;
		font-weight: 1000;
		width: 620upx;
		padding: 40upx 20upx;
		margin: 20upx 15upx;
		margin-left: 40upx;
		border: 2upx solid black;
	}
	.time-picker{
		width: 750upx;
		flex-direction: column;
	}
	.time-picker-view{
		text-align: center;
		justify-content: center; 
		font-size: 36upx;
		color: #FFFFFF;
		font-weight: 1000;
		width: 620upx;
		padding: 20upx;
		margin: 20upx 15upx;
		margin-left: 40upx;
		background-color: #DD524D;
		border-radius: 5upx;
	}
	.countDown {
		display: flex;
		flex-direction: column;
		top: var(--status-bar-height);
		width: 100%;
	}
	.addNotes{
		width: 100%;
		flex-direction: column;
	}
	.addButton{
		text-align: center;
		justify-content: center;
		width: 720upx;
		padding-top: 40upx;
		padding-bottom: 20upx;
	}
	.Note{
		text-align: left;
		justify-content: center;
		color: #000000;
		width: 640upx;
		height: 200upx;
		padding: 20upx;
		margin: 20upx 40upx 40upx 40upx;
		border: 1upx solid gray;
	}
	.confirm{
		position: fixed;
		bottom: 0upx;
	}
	.confirmButton{
		position: fixed;
		bottom: 0upx;
		align-content: center;
		width: 100%;
		height: 80upx;
		color: #FFFFFF;
		background-color: #DD524D;
		font-size: 36upx;
		font-weight: 300;
		border: hidden;
		border-radius: 0upx;
	}	
	.main-view{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		display: flex;
		width: 750upx;
		height: 1080upx;
		/* background-color: rgb(255,240,240,0.8); */
	}
</style>
