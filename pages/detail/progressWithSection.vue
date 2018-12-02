<template>
	<view class="newProgressPlus">
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
		<view class="sectionView">
			<view class="addASection" @tap="addSection">添加阶段</view>
			<view class="sectionCell" 
				v-for="item in schedule.sectionData"
				:key="item.index"
				@longpress="deleteSection" :data-id="item.index" >
				<input class="inputSectionName"
					placeholder="输入阶段名称"
					placeholder-style="placeHolder"
					confirm-type="Next"
					v-model="item.name"
					@keyup.enter = "addSection"
				/>
				<view class="setStatus">
					<image class="showStatus1"
						v-if="item.isFinished"
						src="../../static/wancheng-copy.png"
						@tap="item.isFinished=!item.isFinished,isChanged=true"
						v-model="item.isFinished"
					></image>
					<image class="showStatus0"
						v-if="!item.isFinished"
						src="../../static/yuanhuan.png"
						@tap="item.isFinished=!item.isFinished,isChanged=true"
						v-model="item.isFinished"
					></image>
				</view>
			</view>
		</view>
		<view class="addNotes">
			<view>
				<textarea class="Note" 
					v-if="showNote"
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
		<!-- <view class="confirm">
			<button class="confirmButton" v-on:click="backToIndex">保存并退出</button>
		</view> -->
	</view>
</template>

<script>
	import {addSchedule,changeSchedule,deleteSchedule,getAllSchedule,getOneSchedule} from "../../js/schedule.js"
	export default {
		inject:["reload"],
		data() {
			return {
				id:0,
				process:0,
				animationDataProcess:"",
				animationDataPerson:"",
				showNote:true,
				isChanged:false,
				schedule: {
					title:"",
					type:3,
					time:{
						start:0,
						now:0,
						end:0,
					},
					sectionData:[
						{
							index:0,
							name:"",
							isFinished:false,
						},
					],
					note:"",
				}
				
			};
		},
		onLoad: function(option) {//传入
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
// 			this.animationDataProcess = animation.translateX(this.process*2)
// 														.scaleX(this.process*6.3)
//  														.step()
//  														.export()
			animation = uni.createAnimation({
				delay: 300,
				duration: 500,
				timingFunction: 'ease',
			})
			this.animationDataPerson = animation.translateX(this.process*2.8).step().export()
		},
		onUnload() {
			
		},
		methods:{
			addSection: function(){
				this.schedule.time.end = this.schedule.time.end+1
				this.schedule.sectionData.push({index:this.schedule.time.end,name:"",isFinished:false})
				//console.log(JSON.stringify(this.sectionData))
			},
			deleteSection: function(e){
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定要删除该阶段吗？',
					success: function (res) {
						if (res.confirm) {
							that.schedule.sectionData.splice(e.currentTarget.dataset.id,1)
							//data.splice(e.currentTarget.dataset.id,1)
							that.schedule.time.end = that.schedule.time.end-1
							console.log(that.schedule.time.end)
						} else if (res.cancel) {
							//console.log('点击取消');
						}
					},
				})
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
							let code = deleteSchedule(that.id)
							uni.navigateTo({
								url:'/pages/index/index'
							})
							//console.log('点击确定')
							uni.showToast({
								title:'删除成功',
								duration:1000,
							})
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
	.newProgressPlus{
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
	.main-view{
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		display: flex;
		width: 750upx;
	}
	.time-process-block{
		z-index: 10;
		display: flex;
		/* margin-top: 150upx; */
		flex-direction: column;
		/* background-color: rgb(250,240,240); */
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
		margin: 80upx 0upx 0upx 0upx;
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
	.sectionView{
		flex-direction: column;
		margin-top: 40upx;
	}
	.addASection{
		margin-left: 580upx;
		margin-bottom: 40upx;
	}
	.sectionCell{
		flex-direction: row;
	}
	.setStatus{
		text-align: center;
		justify-content: center;
		width: 50upx;
		height: 80upx;
		padding: 5upx;
		margin-right: 0upx;
		background-color: #FFFFFF;
		font-size: 20upx;
	}
	.showStatus1{
		width: 45upx;
		height: 45upx;
	}
	.showStatus0{
		width: 50upx;
		height: 50upx;
	}
	.inputSectionName{
		text-align: left;
		justify-content: center;
		color: #000000;
		width: 580upx;
		padding: 5upx;
		margin-left: 40upx;
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
		border-radius: 5upx;
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
	.nav-bar-userset{
		position: sticky;
		justify-content: space-between;
		display: flex;
		background-color: rgb(255,255,255);
		width: 750upx;
		height: 150upx;
		top: var(--status-bar-height)
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
	.placeHolder{
		font-size: 36upx;
		text-align: center;
	}
</style>
