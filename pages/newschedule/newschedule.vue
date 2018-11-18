<template>
	<view class="newschedule">
		<view class="nav-bar-userset">
			<image src="/static/back-arrow.png" class="nav-bar-userset-back" @tap="backToIndex"></image>
			<image src="/static/sub-logo.png" class="nav-bar-userset-sublogo"></image>
			<view class="nav-bar-userset-add"></view>
		</view>
		<scroll-view class="main-view" scroll-y="true" :style="{ height: scrollHeight }">
			<view class="date-view" 
				v-for="item in itemProperty" 
				:data-id="item.id" 
				:key="item" 
				:style="{ backgroundColor: item.backgroundColor }"
				@tap="intoAddPage">
				<view class="typename">{{item.title}}</view>
				<view class="typedescribe" v-bind:style="{ color: item.fontColor }">{{item.describe}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollHeight: "",
				itemProperty:[
					{
						id: "countDown",
						title: "倒计时",
						describe: "重要的时间一定要记录下来！",
						backgroundColor: "rgb(171,216,200)",
						fontColor: "rgb(131,176,160)"
					},
					{
						id: "shortTimePlan",
						title: "近期计划",
						describe: "日日计、周周计生活有条不紊",
						backgroundColor: "rgb(254,225,168)",
						fontColor: "rgb(214,185,128)"
					},
					{
						id: "examPlan",
						title: "考试计划",
						describe: "备战考试就要规划的整整齐齐",
						backgroundColor: "rgb(244,185,146)",
						fontColor: "rgb(204,145,106)"
					},
					{
						id: "userDefined",
						title: "自定义",
						describe: "我的时间我做主",
						backgroundColor: "rgb(246,196,115)",
						fontColor: "rgb(206,156,75)"
					},
					{
						id: "memo",
						title: "备忘录",
						describe: "重要的事情怕忘记？记下来！",
						backgroundColor: "rgb(246,146,125)",
						fontColor: "rgb(206,106,85)"
					},
				]
			};
		},
		onLoad() {
			this.scrollHeight = uni.getSystemInfoSync().windowHeight + 10 + "px";
		},
		methods:{
			backToIndex: function(){
				uni.navigateBack()
			},
			intoAddPage: function(){
				uni.navigateTo({
					url: '/pages/newschedule/newschedule'
				})
			}
		}
	}
</script>

<style>
	.newschedule {
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

	.date-view{
		display: flex;
		flex-direction: column;
		justify-content:center;
		width: 750upx;
		height: 300upx;
	}
	.date-view .typename{
		display: flex;
		justify-content:center;
		text-align: center;
		width: 100%;
		font-size: 42upx;
		font-weight: 1000;
		color: rgb(255,255,255);
	}
	.date-view .typedescribe{
		display: flex;
		justify-content:center;
		text-align: center;
		width: 100%;
		font-size: 32upx;
		font-weight: 1000;
	}
</style>
