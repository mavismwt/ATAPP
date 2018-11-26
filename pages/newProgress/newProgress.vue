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
				:style="{borderBottomColor:color}"
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
				v-model="schedule.unit"
			/>
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
				color:"rgb(140,140,140)",
				showNote:false,
				schedule:{
					title:"",
					type:2,
					time:{
						start:55,
						now:53,
						end:50,
					},
					unit:"",
					note:"",
				}
			};
		},
		methods:{
			changeBorderColor: function(){
				var animation = 
				this.color = "#DD524D"
			},
			cancelChangeBorderColor: function(){
				this.color = "rgb(112,112,112)"
			},
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
				uni.navigateBack()
			},
			done:function(){
				//uni.clearStorage();
				let code = addSchedule(this.schedule);
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
	.newProgress{
		flex-direction: column;
		width: 100%;
	}
	.inputTitle{
		flex-direction: column;
	}
	.inputForm{
		text-align: center;
		font-size: 36upx;
		color: #000000;
		width: 620upx;
		padding: 20upx;
		margin: 20upx 15upx;
		margin-left: 40upx;
		border-bottom: 4upx solid black;
	}
	.inputProgress{
		width: 100%;
		flex-direction: row;
		margin-top: 20upx;
		margin-left: 40upx;
	}
	.start{
		text-align: center;
		color: #000000;
		width: 132upx;
		padding: 40upx;
		margin-top: 20upx;
		margin-bottom: 15upx;
		border: 1upx solid black;
	}
	.now{
		text-align: center;
		color: #000000;
		width: 132upx;
		padding: 40upx;
		margin-top: 20upx;
		margin-left: 15upx;
		margin-bottom: 15upx;
		border: 1upx solid black;
	}
	.end{
		text-align: center;
		color: #000000;
		width: 132upx;
		padding: 40upx;
		margin-top: 20upx;
		margin-left: 15upx;
		margin-bottom: 15upx;
		border: 1upx solid black;
	}
	.inputUnit{
		width: 100%;
		flex-direction: column;
	}
	.unit{
		text-align: center;
		color: #000000;
		width: 585upx;
		padding: 40upx;
		mmargin-top: 40upx;
		margin-left: 40upx;
		border: 1upx solid black;
	}
	.addNotes{
		width: 100%;
		flex-direction: column;
	}
	.addButton{
		text-align: center;
		justify-content: center;
		width: 100%;
		padding-top: 40upx;
		padding-bottom: 20upx;
	}
	.editProgress{
		width: 100%;
		flex-direction: column;
	}
	.editProgressButton{
		text-align: center;
		align-content: center;
		width: 100%;
		padding-top: 40upx;
		padding-bottom: 20upx;
	}
	.Note{
		text-align: left;
		align-items: center;
		color: #000000;
		width: 640upx;
		height: 200upx;
		padding: 20upx;
		margin: 20upx 40upx 40upx 40upx;
		border: 1upx solid black;
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
