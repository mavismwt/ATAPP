<template>
	<view class="newProgressPlus">
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
				confirm-type="done"
			/>
		</view>
		<view class="sectionView">
			<view class="addASection" @tap="add">添加阶段+</view>
			<view class="sectionCell" v-for="item in schedule.sectionData"
				:key="item.index">
				<input class="inputSectionName"
					placeholder="输入阶段名称"
					placeholder-style="placeHolder"
					confirm-type="Next"
					v-model="item.name"
					@keyup.enter = "add"
				/>
				<button class="setStatus"
				    @tap="item.isFinished=!item.isFinished"
					v-model="item.isFinished"
				>{{item.isFinished}}</button>
			</view>
			
		</view>
		<view class="addNotes">
			<view class="addButton" 
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
				showNote:false,
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
							name:"",
							isFinished:false,
						},
					],
					note:"",
				}
				
			};
		},
		methods:{
			add: function(){
				this.schedule.time.end = this.schedule.time.end+1
				this.schedule.sectionData.push({index:this.schedule.time.end,name:"",isFinished:false})
				//console.log(JSON.stringify(this.sectionData))
			},
			changeStatus:function(){
				
			},
			backToIndex: function(){
				uni.navigateBack()
			},
			done: function(){
				uni.clearStorage();
				let code = addSchedule(this.schedule);
				console.log(JSON.stringify(code));
				let data = getAllSchedule();
				console.log(JSON.stringify(data));
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
	.newProgressPlus{
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
	.sectionView{
		flex-direction: column;
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