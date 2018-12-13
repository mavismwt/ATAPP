<template>
	<view class="userDefined">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="backToIndex"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<view class="nav-bar-userset-add"></view>
		</view>
		<view class="inputFrame">
			<input class="inputForm" 
				placeholder="输入TP名称" 
				placeholder-class="placeHolder" 
				maxlength="6"
				confirm-type="done"
				v-model="schedule.title"/>
		</view>
		<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindEdateChange">
			<view class="Edate">{{Edate}}</view>
		</picker>
		<view class="time-picker">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindEdateChange">
				<view class="time-picker-view">设定倒计日</view>
			</picker>
			<!-- <picker mode="time" :value="date" :start="startDate" :end="endDate" @change="bindEdate2Change">
				<view class="time-picker-view">{{Edate2}}</view>
			</picker> -->
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
			const currentDate = this.getDate({
				format: true
			});
			return {
				showNote:true,
				schedule:{
					type:"1",
					isUserDefined:true,
					title:"",
					time:{
						start:{
							year:"",
							month:"",
							day:"",
							hour:0,
							minute:0,
							second:0,
						},
						end:{
							year:"",
							month:"",
							day:"",
							hour:0,
							minute:0,
							second:0,
						},
						now:{},
						sectionNumber:1,
					},
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
				Edate: currentDate,
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
		onLoad() {
			var dataSplit = this.Edate.split("-")
			this.Edate = dataSplit[0]+"年"+dataSplit[1]+"月"+dataSplit[2]+"日"
			this.schedule.time.start.year = dataSplit[0]
			this.schedule.time.start.month = dataSplit[1]
			this.schedule.time.start.day = dataSplit[2]
			this.schedule.time.end.year = dataSplit[0]
			this.schedule.time.end.month = dataSplit[1]
			this.schedule.time.end.day = dataSplit[2]
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
				this.schedule.time.end.year = dataSplit[0]
				this.schedule.time.end.month = dataSplit[1]
				this.schedule.time.end.day = dataSplit[2]
			},
			bindTimeChange: function(e) {
				this.time = e.target.value
			},
			add: function(){
				this.schedule.time.sectionNumber = this.schedule.sectionNumber+1
				this.schedule.sectionData.push({index:this.schedule.time.sectionNumber,name:"",isFinished:false})
				//console.log(JSON.stringify(this.sectionData))
			},
			deleteSection: function(e){
				var taht = this
				let data = this.schedule.sectionData
				uni.showModal({
					title: '提示',
					content: '确定要删除该阶段吗？',
					success: function (res) {
						if (res.confirm) {
							data.splice(e.currentTarget.dataset.id,1)
							//console.log('点击确定')
							that.schedule.time.end = that.schedule.time.end-1
							console.log(that.schedule.time.end)
						} else if (res.cancel) {
							//console.log('点击取消');
						}
					},
				})
				this.schedule.sectionData = data
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
					month = month > 9 ? month : '0' + month;
					day = day > 9 ? day : '0' + day;
			
					return `${year}-${month}-${day}`;
				}, 
			done: function(){
				//uni.clearStorage();
				let code = addSchedule(this.schedule);
				console.log(code)
// 				let data = getAllSchedule();
// 				console.log(JSON.stringify(data))
				uni.navigateTo({
					url:'/pages/index/index',
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
		/* top: var(--status-bar-height) */
	}
	.nav-bar-userset-sublogo{
		margin-top: 65upx;
		width: 100upx;
		height: 45upx;
	}
	.nav-bar-userset-back{
		margin-top: 65upx;
		margin-left: 50upx;
		width: 25upx;
		height: 40upx;
	}
	.nav-bar-userset-add{
		margin-top: 65upx;
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
	.placeHolder{
		font-size: 36upx;
		font-weight: 1000;
		text-align: center;
	}
	.Edate{
		text-align: center;
		justify-content: center; 
		font-size: 36upx;
		color: #000000;
		font-weight: 1000;
		width: 620upx;
		padding: 40upx 20upx;
		margin: 20upx 15upx;
		margin-left: 40upx;
		border: 2upx solid black;
	}
	.time-picker{
		width: 750upx;
		flex-direction: column;
	}
	.time-picker-view{
		text-align: center;
		justify-content: center; 
		font-size: 36upx;
		color: #FFFFFF;
		font-weight: 1000;
		width: 620upx;
		padding: 20upx;
		margin: 20upx 15upx;
		margin-left: 40upx;
		background-color: #DD524D;
		border-radius: 5upx;
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
	.userDefined {
		position: fixed;
		display: flex;
		flex-direction: column;
		/* top: var(--status-bar-height); */
		width: 100%;
	}

</style>
