<template>
	<view class="newProgressPlus">
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
			<view v-for="item in sectionData"
				:key="item.index">
				<input class="sectionCell"
					placeholder="输入阶段名称"
					placeholder-style="placeHolder"
					confirm-type="Next"
					v-model="item.name"
					@keyup.enter = "add"
				/>
			</view>
			
		</view>
		<view class="addNotes">
			<view class="addButton" 
				v-on:click="showNote=!showNote"
				>
				备注信息
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
		text-align: left;
		justify-content: center;
		color: #000000;
		width: 680upx;
		padding: 20upx;
		margin: 0upx 15upx;
		border: 1upx solid gray;
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
	}
	.placeHolder{
		font-size: 36upx;
		text-align: center;
	}
</style>