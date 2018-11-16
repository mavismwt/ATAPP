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
			<view class="sectionCell" v-for="item in sectionData"
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
					v-model="note"
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
		export default {
			data() {
				return {
					note:"",
					showNote:false,
					sectionData:[
						{
							index:1,
							name:"",
							isFinished:false,
						}
					],
					
				};
			},
			method:{
				add: function(){
					this.sectionData.push({index:item.index+1,name:"",isFinished:false})
				},
				done: function(){
					uni.navigateBack()
				}
			}
	}
	
</script>

<style>
	.newProgressPlus{
		flex-direction: column;
	}
	.nav-bar-userset{
		justify-content: space-between;
		display: flex;
		background-color: rgb(255,230,206);
		width: 750upx;
		height: 120upx;
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