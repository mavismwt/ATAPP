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
			/>
		</view>
		<view class="inputProgress">
			<input class="start" 
				v-model="pro.start" 
				type="number"
				placeholder="开始"
				placeholder-class="placeHolder"
			/>
			<input class="now" 
				v-model="pro.now" 
				type="number"
				placeholder="现在"
				placeholder-class="placeHolder"
			/>
			<input class="end"
				v-model="pro.end" 
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
			<button class="editProgressButton" v-if="pro.end>pro.start" v-on:click="pro.now<pro.end?pro.now=pro.now+1:pro.now=pro.now">打卡</button>
			<button class="editProgressButton" v-if="pro.end<pro.start" v-on:click="pro.now<pro.start?pro.now=pro.now-1:pro.now=pro.now">打卡</button>
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
					placeholder="此处输入备注"
				>
				</textarea>
			</view>
		</view>
		<view class="confirm">
			<button class="confirmButton" v-on:click="done" >完成</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height:0,
				showNote:false,
				title:"备注",
				pro:{
					start:0,
					now:0,
					end:0,
				}
			};
		},
		method:{
			backToIndex: function(){
				uni.navigateBack()
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
		align-content: center;
		width: 720upx;
		height: 80upx;
		margin-top: 40upx;
		margin-left: 15upx;
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
