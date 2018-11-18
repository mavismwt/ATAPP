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
					confirm-type="done"
					v-model="title"/>
			</view>
			<view class="time-picker">
				<picker mode="date" :value="date" :start="schedule.startDate" :end="schedule.endDate" @change="bindSdateChange">
					<view class="time-picker-view">{{Sdate}}</view>
				</picker>
				<picker mode="date" :value="date" :start="Sdate" :end="endDate" @change="bindEdateChange" :disabled="isDisabled">
					<view class="time-picker-view">{{Edate}}</view>
				</picker>
			</view>
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
					@tap="item.isFinished=!isFinished"
					v-model="item.isFinished"
				>{{item.isFinished}}</button>
			</view>
			
		</view>
		<view class="addNotes">
			<view class="addButton">备注</view>
			<view>
				<textarea class="Note" 
					v-model="note"
					placeholder="此处输入备注"
				>
				</textarea>
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
				showNote:false,
				schedule:{
					type:"3",
					title:"",
					startDate: currentDate,
					endDate: "2019-12-12",
					time:{
						start:0,
						now:0,
						end:0,
					},
					name:"",
					sectionData:[
						{
							name:"",
							isFinished:false,
						},
					],
					note:"",
					
				},
				isDisabled: true,
				Sdate: "开始时间",
				Edate: "结束时间",
// 				startDate: currentDate,
// 				endDate: "2019-12-12"
			};
		},
		methods:{
			add: function(){
				this.schedule.time.end = this.schedule.time.end+1
				this.schedule.sectionData.push({index:this.schedule.time.end,name:"",isFinished:false})
				//console.log(JSON.stringify(this.sectionData))
			},
			backToIndex: function(){
				uni.navigateBack();
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
	.sectionView{
		flex-direction: column;
		background-color: rgb(255,234,226);
	}
	.addASection{
		text-align: center;
		justify-content: center;
		width: 700upx;
		padding-top: 40upx;
		padding-bottom: 20upx;
		margin: 20upx;
		background-color: rgb(255,246,232) ;
	}
	.sectionCell{
		flex-direction: row;
	}
	.inputSectionName{
		text-align: left;
		justify-content: center;
		color: #000000;
		width: 580upx;
		padding: 20upx;
		margin: 0upx 15upx;
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
