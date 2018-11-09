<template>
	<scroll-view class="memo" scroll-y="true" :style="{ height: scrollHeight }">
		<view class="memo-column">
			<view class="memo-item"
				v-for="(item, index) in memoPropertyFirst"
				:key="index"
				:style="{backgroundColor: item.backgroundColor, boxShadow: item.boxShadow}"
				:data-id="index">
				<view class="memo-textarea">{{item.message}}</view>
			</view>
		</view>
		<view class="memo-column">
			<view class="memo-item"
				v-for="(item, index) in memoPropertySecond"
				:key="index"
				:style="{backgroundColor: item.backgroundColor, boxShadow: item.boxShadow}"
				:data-id="index">
				<view class="memo-textarea">{{item.message}}</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "memo",
		data() {
			return {
				scrollHeight: "",
				memoPropertyFirst:[
					{
						backgroundColor: "rgb(153,189,255)",
						boxShadow: "5px 5px 10px rgb(153,189,255)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(188,189,255)",
						boxShadow: "5px 5px 10px rgb(188,189,255)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,169,155)",
						boxShadow: "5px 5px 10px rgb(253,169,155)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(193,113,223)",
						boxShadow: "5px 5px 10px rgb(193,113,223)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,129,85)",
						boxShadow: "5px 5px 10px rgb(253,129,85)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,199,35)",
						boxShadow: "5px 5px 10px rgb(253,199,35)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,179,105)",
						boxShadow: "5px 5px 10px rgb(253,179,105)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,109,175)",
						boxShadow: "5px 5px 10px rgb(253,109,175)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					}
				],
				memoPropertySecond:[
					{
						backgroundColor: "rgb(193,113,223)",
						boxShadow: "5px 5px 10px rgb(193,113,223)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,129,85)",
						boxShadow: "5px 5px 10px rgb(253,129,85)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,199,35)",
						boxShadow: "5px 5px 10px rgb(253,199,35)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(153,189,255)",
						boxShadow: "5px 5px 10px rgb(153,189,255)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(188,189,255)",
						boxShadow: "5px 5px 10px rgb(188,189,255)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,169,155)",
						boxShadow: "5px 5px 10px rgb(253,169,155)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,179,105)",
						boxShadow: "5px 5px 10px rgb(253,179,105)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					},
					{
						backgroundColor: "rgb(253,109,175)",
						boxShadow: "5px 5px 10px rgb(253,109,175)",
						message: "今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习，今天我要好好学习"
					}
				]
			};
		},
		onLoad(){
			this.scrollHeight = uni.getSystemInfoSync().windowHeight + 10 + "px";
		}
	}
</script>

<style>
.memo{
	width: 100%;
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: flex-start;
}
.memo-column{
	display: inline-block;
	width: 50%;
}
.memo-item{
	width: 92%;
	font-size: 28upx;
	color: rgb(255,255,255);
	margin: 10upx 4% 10upx 4%;
	border-radius: 8upx;
}
.memo-textarea{
	margin: 20upx;
}
</style>
