<template>
	<view class="newProgress">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="backToIndex"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<view class="nav-bar-userset-add"></view>
		</view>
		<view class="inputTitle">
			<input class="inputForm" 
				placeholder="输入TP名称" 
				placeholder-class="placeHolder" 
				maxlength="6"
				confirm-type="backToIndex"
				v-model="title"
			/>
		</view>
		<view class="inputProgress">
			<input class="start" 
				v-model="schedule.time.start" 
				type="number"
				placeholder="开始"
				placeholder-class="placeHolder"
			/>
			<input class="now" 
				v-model="schedule.time.now" 
				type="number"
				placeholder="现在"
				placeholder-class="placeHolder"
			/>
			<input class="end"
				v-model="schedule.time.end" 
				type="number"
				placeholder="结束"
				placeholder-class="placeHolder"
			/>
		</view>
		<view class="inputUnit">
			<input class="unit"
				placeholder="单位"
				placeholder-class="placeHolder"
			/>
		</view>
		<view class="editProgress">
			<view class="editProgressButton" 
				v-on:click="editProgress">
				打卡
			</view>
			<!-- <view class="editProgressButton" 
				v-if="schedule.time.end<schedule.time.start" 
				v-on:click="minusProgress">
				打卡
			</view> -->
		</view>
		<view class="addNotes">
			<view class="addButton" 
				v-if="!showNote" 
				v-on:click="showNote=!showNote"
				v-model="schedule.note"
			>
				显示备注
			</view>
			<view class="addButton" 
				v-if="showNote"
				v-on:click="showNote=!showNote"
			>
				收起备注
			</view>
			<view>
				<textarea class="Note" 
					v-if="showNote" 
					placeholder="此处输入备注"
				>
				</textarea>
			</view>
		</view>
		<view></view>
		<view class="confirm">
			<button class="confirmButton" v-on:click="done">完成</button>
		</view>
	</view>
</template>

<script>
	import {addSchedule,changeSchedule,deleteSchedule,getAllSchedule,getOneSchedule} from "../../js/schedule.js"
	export default {
		data() {
			return {
				title:"",
				showNote:true,
				schedule:{
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
		methods:{
			editProgress: function(){
				let data = this.schedule.time
				if (data.end>data.start&&data.now<data.end) {
					data.now=data.now+1
				} else if (data.end<data.start&&data.now>data.end){
					data.now=data.now-1
				}
				//schedule.time.now<schedule.time.end?schedule.time.now=schedule.time.now+1:schedule.time.now=schedule.time.now
				//let code = changeSchedule(,this.schedule)
				//console.log(JSON.stringify(code))
			},
			minusProgress: function(){
				this.schedule.time.now=this.schedule.time.now-1
			},
			backToIndex: function(){
// 				uni.showModal({
// 					title: '提示',
// 					content: '您还未保存，确定要退出吗',
// 					success: function (res) {
// 						if (res.confirm) {
// 							uni.navigateBack()
// 						} else if (res.cancel) {
// 							console.log('点击取消');
// 						}
// 					}
// 				})
				uni.navigateBack()
			},
			done:function(){
				//uni.clearStorage();
				let code = addSchedule(this.schedule);
				console.log(JSON.stringify(code));
				let data = getAllSchedule();
				console.log(JSON.stringify(data))
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
		background-color: rgb(255,230,206);
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
	.newProgress{
		flex-direction: column;
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
		width: 680upx;
		padding: 20upx;
		margin: 20upx 15upx;
		border-bottom: 4upx solid gray;
	}
	.inputProgress{
		width: 100%;
		flex-direction: row;
	}
	.start{
		text-align: center;
		justify-content: center;
		color: #000000;
		width: 140upx;
		padding: 40upx;
		margin: 20upx 15upx;
		border: 1upx solid black;
	}
	.now{
		text-align: center;
		justify-content: center;
		color: #000000;
		width: 140upx;
		padding: 40upx;
		margin: 20upx 15upx;
		border: 1upx solid black;
	}
	.end{
		text-align: center;
		justify-content: center;
		color: #000000;
		width: 140upx;
		padding: 40upx;
		margin: 20upx 15upx;
		border: 1upx solid black;
	}
	.inputUnit{
		width: 100%;
		flex-direction: column;
	}
	.unit{
		text-align: center;
		justify-content: center;
		color: #000000;
		width: 640upx;
		padding: 40upx;
		mmargin-top: 40upx;
		margin-left: 15upx;
		border: 1upx solid black;
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
	.editProgress{
		width: 100%;
		flex-direction: column;
	}
	.editProgressButton{
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
