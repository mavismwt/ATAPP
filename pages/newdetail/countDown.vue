<template>
	<view class="countDown">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="backToIndex"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<view class="nav-bar-userset-add"></view>
		</view>
		<view class="titleView">预约倒计时</view>
		<view class="inputFrame">
			<view>
				<input class="inputForm" 
					placeholder="输入TP名称" 
					placeholder-class="placeHolder" 
					maxlength="6"
					confirm-type="done"/>
			</view>
			<view class="time-picker">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindEdateChange">
					<view class="time-picker-view">{{Edate}}</view>
				</picker>
			</view>
			<view class="page-section">
				<movable-area>
					<movable-view 
						v-for="(bubbleItem, bubbleIndex) in bubbleProperty" 
						:key="bubbleIndex"
						:x="bubbleItem.x" :y="bubbleItem.y"
						v-bind:style="bubbleItem.style"
						direction="all"
						scale="true"
						out-of-bounds
						inertia
						>
						<view class="movableView" :style="bubbleItem.style">
							text
						</view>
					 </movable-view>
				</movable-area>
			</view>
			<!--
			<view>
				<view class="bubbleView" 
				:for="(bubbleItem, bubbleIndex) in bubbleProperty" 
				:style="{width: bubbleItem}"></view>
			</view>
			-->
		</view>
		<view class="submitBottom">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				Edate: "预定时间",
				startDate: currentDate,
				endDate: "2019-12-12",
				bubbleProperty:[
					{
						x: 100,
						y: 100,
						style:{
							height: "300upx",
							width: "200upx",
							'border-radius': "50upx",
						}
					}
				]
			};
		},
		methods:{
			backToIndex: function(){
				uni.navigateBack()
			},
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value
			},
			bindSdateChange: function(e) {
				this.Sdate = e.target.value
				this.isDisabled = false
			},
			bindEdateChange: function(e) {
				var dataSplit = e.target.value.split("-")
				this.Edate = dataSplit[0]+"年"+dataSplit[1]+"月"+dataSplit[2]+"日"
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate() + 1;

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			},
			submitData: function(){
				var data = {
					
				}
			}
		}
	}
</script>

<style>
	.movableView{
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50upx;
		height: 200upx;
		width: 200upx;
		background-color: #007AFF;
		color: #fff;
		
		font-size: 32upx;
	}

	movable-area {
		height: 400rpx;
		width: 400rpx;
		margin: 50rpx;
		background-color: #ccc;
		overflow: hidden;
	}
	
	.submitBottom{
		position: fixed;
		bottom: 0upx;
		justify-content: center;
		padding: 40upx;
		width: 670upx;
		color: rgb(253,255,255);
		font-weight: 1000;
		background-color: rgb(233,185,203);
	}
	.titleView{
		justify-content: center;
		padding: 20upx;
		padding-top: 40upx;
		width: 710upx;
		background-color: rgb(253,205,223);
		font-size: 48upx;
		color: rgb(213,165,183);
		font-weight: 1000;
	}
	.inputFrame{
		width: 100%;
		background-color: rgb(253,205,223);
		flex-direction: column;
	}
	.inputForm{
		text-align: center;
		justify-content: center;
		font-size: 36upx;
		color: #000000;
		font-weight: 1000;
		width: 680upx;
		padding: 20upx;
		margin: 20upx 15upx;
		background-color: rgb(243,165,183);
	}
	.placeHolder{
		font-size: 36upx;
		font-weight: 1000;
		text-align: center;
	}
	.time-picker{
		width: 750upx;
	}
	.time-picker-view{
		text-align: center;
		justify-content: center;
		font-size: 36upx;
		color: #000000;
		font-weight: 1000;
		width: 680upx;
		padding: 20upx;
		margin: 20upx 15upx;
		background-color: rgb(243,165,183);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.countDown {
		position: fixed;
		display: flex;
		flex-direction: column;
		top: var(--status-bar-height);
		width: 100%;
	}
	
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

</style>
