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
				v-model="schedule.title"
			/>
		</view>
		<view class="sectionView">
			<!-- <view class="addASection" @tap="add">添加阶段+</view> -->
			<view class="sectionCell" 
			v-for="item in schedule.sectionData"
			:key="item.index"
			@longpress="deleteSection" :data-id="item.index" >
				<input class="inputSectionName"
					placeholder="输入阶段名称"
					placeholder-style="placeHolder"
					confirm-type="Next"
					v-model="item.name"
					@keyup.enter = "add"
				/>
				<view class="addSection">
					<image src="../../static/add1.png" class="addSectionImg" @tap="add"></image>
				</view>
			</view>
			
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
				id:0,
				showNote:false,
				schedule : {
					title:"很长很长很长的名字",
					type:3,
					time:{
						start:0,
						now:0,
						end:1,
					},
					sectionData:[
// 						{
// 							index:0,
// 							name:"阶段一",
// 							isFinished:true,
// 						},
// 						{
// 							index:1,
// 							name:"阶段二",
// 							isFinished:false,
// 						},
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
		methods:{
			add: function(){
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
				let code = addSchedule(this.schedule);
				console.log(JSON.stringify(code));
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
	.nav-bar-userset-add{
		margin-top: 55upx;
		margin-right: 50upx;
		width: 30upx;
		height: 40upx;
	}
	.newProgressPlus{
		flex-direction: column;
		width: 100%;
		height: 100%;
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
	.sectionView{
		flex-direction: column;
		margin-top: 40upx;
	}
	.sectionCell{
		flex-direction: row;
	}
	.addSection{
		text-align: center;
		justify-content: center;
		width: 50upx;
		height: 80upx;
		padding: 5upx;
		margin-right: 0upx;
		background-color: #FFFFFF;
		font-size: 20upx;
	}
	.addSectionImg{
		width: 40upx;
		height: 40upx;
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
	.placeHolder{
		font-size: 36upx;
		text-align: center;
	}
</style>