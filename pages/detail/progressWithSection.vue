<template>
	<view class="newProgressPlus">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="backToIndex"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<view class="nav-bar-userset-add"></view>
		</view>
		<scroll-view class="main-view" scroll-y="true" :style="{ height: scrollHeight }">
		<view class="time-process-block">
			<view class="top-line" >
				<input class="red-point" v-model="schedule.title">
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
		<view class="sectionView">
			<view class="sectionCell" 
				v-for="item in schedule.sectionData"
				:key="item.index"
				@longpress="deleteSection" :data-id="item.index" >
				<input class="inputSectionName"
					placeholder="添加新的阶段"
					placeholder-style="placeHolder"
					confirm-type="Next"
					v-model="item.name"
					@keyup.enter = "addSection"
				/>
				<view class="setStatus"
				    @tap="item.isFinished=!item.isFinished"
					v-model="item.isFinished"
				>{{item.isFinished}}</view>
			</view>
			<view class="addASection" @tap="addSection">添加阶段+</view>
		</view>
		<view class="addNotes">
			<!-- <view class="addButton" 
				v-if="!showNote" 
				v-on:click="showNote=!showNote"
			>
				显示备注
			</view>
			<view class="addButton" 
				v-if="showNote"
				v-on:click="showNote=!showNote"
			>
				收起备注
			</view> -->
			<view>
				<textarea class="Note" 
					v-if="showNote"
					v-model="schedule.note"
					placeholder="此处输入备注"
				>
				</textarea>
			</view>
		</view>
		</scroll-view>
		<view class="confirm">
			<button class="confirmButton" v-on:click="done">删除任务</button>
		</view>
	</view>
</template>

<script>
	import {addSchedule,changeSchedule,deleteSchedule,getAllSchedule,getOneSchedule} from "../../js/schedule.js"
	export default {
		data() {
			return {
				id:0,
				process:0,
				animationDataProcess:"",
				animationDataProcessLength:"",
				animationDataPerson:"",
				showNote:true,
				schedule : {
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
		onLoad: function() {//传入
			let data = getAllSchedule()
			for (var item in data) {
				this.id = item	
				this.schedule = getOneSchedule(item)
				this.process = this.schedule.status.status
// 				for (var index in one.sectionData){
// 					this.schedule.sectionData[index].name = one.sectionData[index].name
// 					this.schedule.sectionData[index].isFinished = one.sectionData[index].isFinished
// 					this.schedule.sectionData.push({name:"",isFinished:false,})
// 				}
			}
			
		},
		onReady() {
			var animation = uni.createAnimation({
				delay: 300,
				duration: 500,
				timingFunction: 'ease',
			})
			this.animationDataProcess = animation.translateX(this.process*1.5)
														.scaleX(this.process*4.5)
 														.step()
 														.export()
			animation = uni.createAnimation({
				delay: 300,
				duration: 500,
				timingFunction: 'ease',
			})
			this.animationDataPerson = animation.translateX(this.process*3).step().export()
		},
		onUnload() {
			let status = changeSchedule(this.id,this.schedule)
			console.log(JSON.stringify(status))
		},
		methods:{
			addSection: function(){
				this.schedule.time.end = this.schedule.time.end+1
				this.schedule.sectionData.push({index:this.schedule.time.end,name:"",isFinished:false})
				//console.log(JSON.stringify(this.sectionData))
			},
			deleteSection: function(e){
				let data = this.schedule.sectionData
				uni.showModal({
					title: '提示',
					content: '确定要删除该阶段吗？',
					success: function (res) {
						if (res.confirm) {
							data.splice(e.currentTarget.dataset.id,1)
							//console.log('点击确定')
						} else if (res.cancel) {
							//console.log('点击取消');
						}
					},
				})
				this.schedule.sectionData = data
			},
			backToIndex: function(){
				uni.navigateBack()
			},
			done: function(){
				//uni.clearStorage();
				let data = getOneSchedule(this.id);
				console.log(JSON.stringify(data));
				let code = deleteSchedule(this.id);
				console.log(JSON.stringify(code));
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
</script>

<style>
	.nav-bar-userset{
		justify-content: space-between;
		display: flex;
		/* background-color: rgb(255,230,206); */
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
	.newProgressPlus{
		flex-direction: column;
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
		flex-direction: column;
		background-color: rgb(255,255,255);
	}
	.top-line{
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 36upx;
		margin: 35upx 0upx 0upx 30upx;
	}
	.top-line .red-point{
		display: inline-block;
		align-content: left;
		text-align: left;
		width: 600upx;
		margin: 0upx 0upx 20upx 0upx;
		height: 80upx;
		/* width: 10upx;
		height: 10upx;
		border-radius: 5upx; */
	}
	/* .top-line .time-name{
		display: inline-block;
		margin-left: 15upx;
		color: rgb(255,255,255);
		font-size:30upx;
		font-weight: 1000;
	} */
	.top-line .precess-percent{
		text-align: center;
		width: 680upx;
		color: rgb(10,10,10);
		display: inline-block;
		font-size:66upx;
		margin: 40upx 0upx 40upx 0upx;
		font-weight: 1000;
	}
	.all-process{
		z-index: 10;
		display: flex;
		flex-direction: column;
		margin: 150upx 0upx 0upx 0upx ;
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
		color: #707070;
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
	/* .process-bar .start-text{
		display: inline-block;
		text-align: center;
		margin: 0upx 0upx 0upx 0upx;
		width: 50upx;
		font-size:24upx;
		font-weight: 1000;
		color: rgb(255,255,255);
	}
	.process-bar .end-text{
		display: inline-block;
		text-align: center;
		margin: 0upx 0upx 0upx 0upx;
		width: 50upx;
		font-size:24upx;
		font-weight: 1000;
		color: rgb(255,255,255);
	} */
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
		text-align: center;
		justify-content: center;
		width: 720upx;
		padding-top: 40upx;
		padding-bottom: 20upx;
	}
	.sectionCell{
		flex-direction: row;
	}
	.setStatus{
		text-align: center;
		justify-content: center;
		width: 60upx;
		height: 80upx;
		margin-left: 15upx;
		padding-top: 15upx;
		padding-left: 10upx;
		background-color: #FFFFFF;
		font-size: 20upx;
	}
	.inputSectionName{
		text-align: left;
		justify-content: center;
		color: #000000;
		width: 580upx;
		padding: 20upx;
		margin: 0upx 15upx;
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
		width: 680upx;
		height: 200upx;
		padding: 20upx;
		margin-top: 0upx;
		margin-left: 15upx;
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
		color: #DD524D;
		background-color: rgb(255,230,206);
		border: hidden;
	}
	.placeHolder{
		font-size: 36upx;
		text-align: center;
	}
</style>
