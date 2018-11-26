<template>
	<view class="countDown">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="backToIndex"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<view class="nav-bar-userset-add"></view>
		</view>
		<view class="time-process-block">
			<view class="top-line" >
				<view class="title-line">
					<input class="red-point" >
					<input class="title" v-model="schedule.title">
				</view>
				<view class="time-name">{{title}}</view>
				<view class="precess-percent">{{process}}%</view>
			</view>
			<view class="all-process" >
				<view class="little-person" :animation="animationDataPerson">
					<view class="chat-frame">
						<view class=".chat-frame-content">{{schedule.status.toEnd}}</view>
						<image src="/static/chat-frame.png" class="chat-frame-image"></image>
					</view>
					<image src="/static/little-person.png" class="little-person-image"/>
				</view>
				<view class="process-bar">
					<view class="blank-bar"></view>
					<view class="finish-bar" :animation="animationDataProcess"></view>
				</view>
			</view>
		</view>
		<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindEdateChange">
			<view class="Edate">{{Edate}}</view>
		</picker>
		<view class="time-picker">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindEdateChange">
				<view class="time-picker-view">更改倒计日</view>
			</picker>
		</view>
		<view class="addNotes">
			<view>
				<textarea class="Note" 
					v-model="schedule.note"
					placeholder="此处输入备注"
				>
				</textarea>
			</view>
		</view>
		<view class="deleteView">
			<view class="deleteButton" @tap="deleteSchedule">删除任务</view>
			<view class="bottomView"></view>
		</view>
		<view class="confirm">
			<button class="confirmButton" v-on:click="done">保存并退出</button>
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
				id:0,
				process:0,
				animationDataProcess:"",
				animationDataPerson:"",
				schedule:{
					type:1,
					title:"",
					time:{
						start:{
							year:"",
							month:"",
							day:"",
							hour:"",
							minute:"",
							second:"",
						},
						end:{
							year:"",
							month:"",
							day:"",
							hour:"",
							minute:"",
							second:"",
						},
						now:{},
					},
					note:"",
				},
				Edate:"重新设定倒计时",
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
			const scheduleID = sessionStorage.getItem('ID')
			let item = getOneSchedule(scheduleID)
			console.log(JSON.stringify(item))
			this.id = scheduleID
			this.schedule = item
			this.process = this.schedule.status.status
			this.Edate = this.schedule.time.end.year+"年"+this.schedule.time.end.month+"月"+this.schedule.time.end.day+"日"
		},
		onReady() {
			var animation = uni.createAnimation({
				delay: 300,
				duration: 500,
				timingFunction: 'ease',
			})
			this.animationDataProcess = animation.translateX(this.process*1.5)
																	.scaleX(this.process*3)
																	.step()
																	.export()
			// 			this.animationDataProcess = animation.translateX(this.process*2)
			// 														.scaleX(this.process*6.3)
			//  														.step()
			//  														.export()
			animation = uni.createAnimation({
				delay: 300,
				duration: 500,
				timingFunction: 'ease',
			})
			this.animationDataPerson = animation.translateX(this.process*3).step().export()
		},
		methods:{
			backToIndex: function(){
				let status = changeSchedule(this.id,this.schedule)
				//console.log(JSON.stringify(status))
				uni.navigateBack()
				this.$bus.$emit('change')
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
			deleteSchedule: function(){
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定删除此任务吗？',
					success: function (res) {
						if (res.confirm) {
							let code = deleteSchedule(that.id)
							uni.navigateTo({
								url:'/pages/index/index'
							})
							//console.log('点击确定')
						} else if (res.cancel) {
							//console.log('点击取消');
						}
					},
				})
			}
		}
	}
</script>

<style>
	.nav-bar-userset{
		position:sticky;
		top: 0upx;
		justify-content: space-between;
		display: flex;
		background-color: rgb(255,255,255);
		width: 750upx;
		height: 150upx;
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
	.time-process-block{
		z-index: 10;
		display: flex;
		flex-direction: column;
		background-color: rgb(255,255,255);
	}
	.top-line{
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 36upx;
		margin: 30upx 0upx 0upx 30upx;
	}
	.top-line .title-line{
		flex-direction: row;
	}
	.top-line .red-point{
		display: inline-block;
		align-content: left;
		width: 10upx;
		height: 10upx;
		margin-top: 20upx;
		margin-left: 40upx;
		border-radius: 5upx;
		background-color: rgb(245,0,0);
	}
	.top-line .title{
		display: inline-block;
		align-content: left;
		text-align: left;
		font-size: 36upx;
		width: 680upx;
		margin-left: 20upx;
		height: 80upx;
	}
	.top-line .precess-percent{
		text-align: center;
		width: 680upx;
		color: rgb(10,10,10);
		display: inline-block;
		font-size: 80upx;
		margin: 40upx 0upx 0upx 0upx;
		font-weight: 1000;
		color: #707070;
	}
	.all-process{
		z-index: 10;
		display: flex;
		flex-direction: column;
		margin: 155upx 0upx 0upx 0upx ;
		border: 0;
		padding: 0;
		position: relative;
		bottom: 40upx;
		width: 100%;
	}
	.little-person{
		z-index: 10;
		position: relative;
		top: 20upx;
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100upx;
		margin: 0upx 0upx 0upx 45upx;
	}
	.little-person .little-person-image{
		display: inline-block;
		width: 40upx;
		height: 80upx;
	}
	.little-person .chat-frame{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.little-person .chat-frame-image{
		display: inline-block;
		margin-bottom: 10upx;
		width: 100upx;
		height: 45upx;
	}
	.little-person .chat-frame-content{
		position: relative;
		top: 33upx;
		font-weight: 1000;
		font-size: 24upx;
	}
	
	.process-bar{
		z-index: 5;
		display: flex;
		align-items: center;
		margin: 0upx 0upx 0upx 30upx;
	}
	.process-bar .blank-bar{
		display: inline-block;
		margin: 36upx 20upx 0upx 20upx;
		height: 18upx;
		width: 580upx;
		background-color: rgb(255,255,255);
	}
	.process-bar .finish-bar{
		flex-wrap: nowrap;
		align-items: flex-start;
		position: relative;
		right: 560upx;
		margin: 36upx 0upx 0upx 0upx;
		height: 18upx;
		width: 1upx;
		background-color: rgb(255,0,0);
	}
	.inputTitle{
		width: 100%;
		flex-direction: column;
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
	.deleteView{
		flex-direction: column;
	}
	.deleteButton{
		text-align: center;
		justify-content: center; 
		font-size: 36upx;
		color: #FFFFFF;
		font-weight: 1000;
		width: 640upx;
		padding: 20upx;
		margin: 0upx 15upx;
		margin-left: 40upx;
		/* margin-bottom: 100upx; */
		background-color: #DD524D;
		border-radius: 8upx;
	}
	.bottomView{
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
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
	}.confirm{
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
</style>
