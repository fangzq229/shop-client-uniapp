<template>
	<view class="nav_abr">
		<view class="status_bar" :style="'height: '+ statusBarHeight"></view>
		<view class="toBar" :style="'height:'+toBarHeight">
			<block v-if="showLeft == true">
				<image src="/static/images/home/lefts.png" v-if="leftImg" class="left_img"  @tap="toback"></image>
				<view class="backTo" @tap="toback" :style="'color: '+ leftBg" v-else>
					<text class="iconfont icon-fanhui" style="font-size: 38rpx;"></text>
				</view>
			</block>
			<!-- #ifdef MP -->
			<text class="title" :style="'color:' + textcolor" v-if="showTitle == true">{{navTitle}}</text>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<text class="title bolds" :style="'color:' + textcolor" v-if="showTitle == true">{{navTitle}}</text>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	const app = getApp();

	export default {
		data() {
			return {
				statusBarHeight: app.globalData.statusHeight + 'px',
				toBarHeight: app.globalData.toBar + 'px'
			};
		},

		components: {},
		props: {
			textcolor: {
				type: String,
				default: '#fff'
			},
			showTitle: {
				type: Boolean,
				default: true
			},
			showLeft: {
				type: Boolean,
				default: false
			},
			navTitle: {
				type: String,
				default: '登录'
			},
			leftBg: {
				type: String,
				default: '#202020'
			},
			leftImg: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			toback() {
				uni.navigateBack({
					delta: 1
				});
			}

		}
	};
</script>
<style lang="scss" scoped>
	.status_bar {
		width: 100vw;
		overflow: hidden;
		display: block;
	}

	.toBar {
		width: 100vw;
		position: relative;
		display: flex;
		align-items: center;
	}

	.toBar .title {
		text-align: center;
		color: #fff;
		font-size: 30upx;
		display: block;
		margin: 0 auto;
	}

	.left_img {
		width: 50upx;
		height: 50upx;
		position: absolute;
		padding: 10upx;
		left: 20upx;
		top: 50%;
		transform: translateY(-50%);
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.4);
		border-radius: 50%;
	}

	.bolds {
		font-weight: bold;
	}

	.backTo {
		z-index: 20;
		padding-left: 20rpx;
		height: 50rpx;
		width: 50rpx;
	}
</style>
