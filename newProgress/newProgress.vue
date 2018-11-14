<template>
	<view class="newProgress">
		<view class="inputTitle">
			<input class="inputForm" 
				placeholder="输入TP名称" 
				placeholder-class="placeHolder" 
				maxlength="6"
				confirm-type="done"
			/>
		</view>
		<view class="inputProgress">
			<input class="start" 
				type="number"
				placeholder="开始"
				placeholder-class="placeHolder"
			/>
			<input class="now"
				type="number"
				placeholder="现在"
				placeholder-class="placeHolder"
			/>
			<input class="end"
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
		<view class="addNotes">
			<button class="addButton" v-on:click="showNotes=!showNotes">{{title}}</button>
			<view>
				<textarea class="Note" 
					v-if="showNotes" 
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
				showNotes:false,
				title:"备注",
				
			};
		},
		method:{
			done: function(){
				uni.navigateBack()
			}
		}
}

</script>

<style>
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
		align-content: center;
		width: 720upx;
		height: 80upx;
		margin-top: 40upx;
		margin-left: 15upx;
	}
	.Note{
		text-align: left;
		justify-content: center;
		font-size: 24upx;
		color: #000000;
		width: 680upx;
		height: 200upx;
		padding: 20upx;
		margin-top: 40upx;
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
