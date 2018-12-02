<template>
	<view class="newProgress">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="navBack"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<image src="/static/tick.png" class="nav-bar-userset-tick" @tap="backToIndex"></image>
		</view>
		<view class="time-process-block">
			<view class="top-line" >
				<view class="title-line">
					<input class="red-point" >
					<input class="title" v-model="schedule.title" maxlength="6">
				</view>
				<view class="time-name">{{title}}</view>
				<view class="precess-percent">{{process}}%</view>
			</view>
			<view class="all-process" >
				<view class="little-person" :animation="animationDataPerson">
					<view class="chat-frame">
						<view class=".chat-frame-content">{{schedule.status.toEnd}}</view>
						<image src="../../static/chat-gray.png" class="chat-frame-image"></image>
					</view>
					<image src="/static/little-person.png" class="little-person-image"/>
				</view>
				<view class="process-bar">
					<view class="blank-bar"></view>
					<view class="finish-bar" :animation="animationDataProcess"></view>
				</view>
			</view>
		</view>
		<view class="inputProgress">
			<view class="sectionInfo">
				<view class="sectionTag">开始于</view>
				<input class="time" 
					v-model="schedule.time.start" 
					type="number"
					placeholder="开始"
					placeholder-class="placeHolder"
				/>
				<view class="unitTag">{{schedule.unit}}</view>
			</view>
			<view class="sectionInfo">
				<view class="sectionTag">现处于</view>
				<input class="time" 
					v-model="schedule.time.now" 
					type="number"
					placeholder="现在"
					placeholder-class="placeHolder"
				/>
				<view class="unitTag">{{schedule.unit}}</view>
			</view>
			<view class="sectionInfo">
				<view class="sectionTag">目标为</view>
				<input class="time"
					v-model="schedule.time.end" 
					type="number"
					placeholder="结束"
					placeholder-class="placeHolder"
				/>
				<view class="unitTag">{{schedule.unit}}</view>
			</view>
		</view>
		<view class="editProgress">
			<button class="editProgressButton" 
				v-on:click="editProgress">
				打卡
			</button>
			<!-- <view class="editProgressButton" 
				v-if="schedule.time.end<schedule.time.start" 
				v-on:click="minusProgress">
				打卡
			</view> -->
		</view>
		<view class="addNotes">
			<view>
				<textarea class="Note" 
					v-if="showNote" 
					placeholder="此处输入备注"
					v-model="schedule.note"
				>
				</textarea>
			</view>
		</view>
		<view class="deleteView">
			<button class="deleteButton" v-on:click="deleteSchedule">删除任务</button>
			<view class="bottomView"></view>
		</view>
		<!-- <view class="confirm">
			<button class="confirmButton" v-on:click="backToIndex">保存并退出</button>
		</view> -->
	</view>
</template>

<script>
	import {addSchedule,changeSchedule,deleteSchedule,getAllSchedule,getOneSchedule} from "../../js/schedule.js"
	export default {
		data() {
			return {
				process:0,
				animationDataProcess:"",
				animationDataPerson:"",
				showNote:true,
				schedule:{
					title:"",
					type:2,
					time:{
						start:10,
						now:9,
						end:5,
					},
					unit:"",
					note:"",
				}
			};
		},
		onLoad:function(){//传入
			const scheduleID = sessionStorage.getItem('ID')
			let item = getOneSchedule(scheduleID)
			this.id = scheduleID
			this.schedule = item
			this.process = this.schedule.status.status
		},
		onReady() {
			var animation = uni.createAnimation({
				delay: 300,
				duration: 500,
				timingFunction: 'ease',
			})
			this.animationDataProcess = animation.translateX(this.process*1.4)
																	.scaleX(this.process*2.8)
																	.step()
																	.export()
// 						this.animationDataProcess = animation.translateX(this.process*2)
// 																	.scaleX(this.process*6.3)
// 			 														.step()
// 			 														.export()
			animation = uni.createAnimation({
				delay: 300,
				duration: 500,
				timingFunction: 'ease',
			})
			this.animationDataPerson = animation.translateX(this.process*2.8).step().export()
		},
		onUnload() {
			let status = changeSchedule(this.id,this.schedule)
			console.log(JSON.stringify(status))
		},
		methods:{
			editProgress: function(){
				let data = this.schedule.time
				if (data.end>data.start&&data.now<data.end) {
					data.now=parseInt(data.now)+parseInt(1)
				} else if (data.end<data.start&&data.now>data.end){
					data.now=data.now-1
				}
				//schedule.time.now<schedule.time.end?schedule.time.now=schedule.time.now+1:schedule.time.now=schedule.time.now
				//let code = changeSchedule(,this.schedule)
				//console.log(JSON.stringify(code))
			},
			navBack: function(){
				uni.showModal({
					title: '提示',
					content: '您还未保存，确定要退出吗？',
					success: function (res) {
						if (res.confirm) {
							uni.navigateBack()
							//console.log('点击确定')
						} else if (res.cancel) {
							//console.log('点击取消');
						}
					},
				})
			},
			backToIndex: function(){
				let status = changeSchedule(this.id,this.schedule)
				//console.log(JSON.stringify(status))
				uni.navigateBack()
				this.$bus.$emit('change')
				uni.showToast({
					title: '保存成功',
					duration: 1500
				});
			},
			deleteSchedule: function(){
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定删除此任务吗？',
					success: function (res) {
						if (res.confirm) {
							let code = deleteSchedule(that.id);
							console.log(JSON.stringify(code));
							uni.navigateTo({
								url:'/pages/index/index'
							})
							//console.log('点击确定')
						} else if (res.cancel) {
							//console.log('点击取消');
						}
					},
				})
				//uni.clearStorage();
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
	.nav-bar-userset-tick{
		margin-top: 55upx;
		margin-right: 50upx;
		width: 40upx;
		height: 40upx;
	}
	.newProgress{
		flex-direction: column;
		width: 100%;
		height: 100%;
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
		margin: 80upx 0upx 40upx 0upx;
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
	.inputProgress{
		width: 100%;
		flex-direction: column;
		margin-top: 40upx;
	}
	.sectionInfo{
		align-items: center;
		flex-direction: row;
	}
	.sectionTag{
		padding: 20upx;
		margin-left: 90upx;
		margin-top: 10upx;
	}
	.time{
		text-align: center;
		justify-content: center;
		color: #000000;
		width: 300upx;
		padding: 20upx;
		margin: 10upx 5upx 20upx 0upx;
		border: 1upx solid black;
	}
	.unitTag{
		padding: 20upx;
		margin-left: 20upx;
		margin-top: 10upx;
	}
	.editProgress{
		width: 100%;
		flex-direction: column;
	}
	.editProgressButton{
		align-content: center;
		width: 640upx;
		height: 80upx;
		margin-top: 40upx;
		color: #FFFFFF;
		background-color: #DD524D;
		font-size: 36upx;
		font-weight: 300;
		border: hidden;
		border-radius: 10upx;
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
		margin: 40upx 40upx 40upx 40upx;
		border: 1upx solid gray;
	}
	.deleteView{
		width: 100%;
		flex-direction: column;
	}
	.deleteButton{
		text-align: center;
		align-content: center;
		width: 640upx;
		height: 80upx;
		margin-top: 40upx;
		color: #FFFFFF;
		background-color: #DD524D;
		font-size: 36upx;
		font-weight: 300;
		border: hidden;
		border-radius: 10upx;
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
	}
	.placeHolder{
		font-size: 36upx;
		text-align: center;
	}
</style>
