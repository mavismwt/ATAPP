<template>
	<view class="userDefined">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="backToIndex"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<view class="nav-bar-userset-add"></view>
		</view>
		<view class="inputFrame">
			<view>
				<input class="inputForm" 
					placeholder="输入TP名称" 
					placeholder-class="placeHolder" 
					maxlength="6"
					confirm-type="done"/>
			</view>
			<view class="time-picker">
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindSdateChange">
					<view class="time-picker-view">{{Sdate}}</view>
				</picker>
				<picker mode="date" :value="date" :start="Sdate" :end="endDate" @change="bindEdateChange" :disabled="isDisabled">
					<view class="time-picker-view">{{Edate}}</view>
				</picker>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				isDisabled: true,
				Sdate: "开始时间",
				Edate: "结束时间",
				startDate: currentDate,
				endDate: "2019-12-12"
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
				this.Edate = e.target.value
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	.inputFrame{
		width: 100%;
		background-color: rgb(253,205,223);
		flex-direction: column;
	}
	.inputForm{
		justify-content: center;
		text-align: center;
		font-size: 36upx;
		color: #000000;
		font-weight: 1000;
		width: 680upx;
		padding: 20upx;
		padding-right: 60upx;
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
		font-size: 36upx;
		justify-content: center;
		color: #000000;
		font-weight: 1000;
		width: 312upx;
		padding: 20upx;
		margin: 0upx 15upx 15upx 15upx;
		background-color: rgb(243,165,183);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	.userDefined {
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
