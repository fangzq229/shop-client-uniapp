<template>
	<view>
		<lpainter ref="painter" width="680rpx" isRenderImage @success="painterSuccess(e)" height="1050rpx" />
		<!-- #ifdef H5 -->
		<block><image class="imgs" :style="'width:' + (windowWidth - 60) + 'px;height:520px'" :src="imgUrl" mode=""></image></block>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<view class="saveImg" @tap="saveImg" :style="'background:' + colors">保存图片</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<p class="tips">长按图片进行保存</p>
		<!-- #endif -->
	</view>
</template>

<script>
var app = getApp();
import loading from '../../commponent/public/loading';
import lpainter from '../../../components/lime-painter';
import { getUserInfo } from '@/utils/auth';
export default {
	data() {
		return {
			windowWidth: '',
			windowHeight: '',
			colors: '',
			imgUrl: '',
			userInfo: {}
		};
	},

	components: {
		loading,
		lpainter
	},
	props: {
		posterData: {
			type: Object
		}
	},
	created() {
		this.userInfo = getUserInfo();
		this.getSystem();
		this.setData({
			colors: app.globalData.newColor
		});
		this.$nextTick(() => {
			this.createImg();
		});
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {},

	methods: {
		// 获取系统宽高
		getSystem() {
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.setData({
						windowHeight: res.windowHeight,
						windowWidth: res.windowWidth
					});
				}
			});
		},
		// 成功分享图片
		async createImg() {
			const painter = this.$refs.painter;
			painter.render({
				width: '680rpx',
				height: '1050rpx',
				background: '#FFFFFF',
				borderRadius: '10rpx',
				views: [
					{
						type: 'image',
						src: this.userInfo.avatarUrl,
						css: {
							left: '40rpx',
							top: '20rpx',
							width: '120rpx',
							height: '120rpx',
							radius: '50%'
						}
					},
					{
						type: 'text',
						text: this.userInfo.nickName,
						css: {
							left: '180rpx',
							top: '45rpx',
							fontSize: '36rpx',
							color: '#333333',
							lineHeight: '36rpx'
						}
					},
					{
						type: 'text',
						text: '正品美妆，值得推荐',
						css: {
							left: '180rpx',
							top: '100rpx',
							fontSize: '28rpx',
							color: '#787779',
							lineHeight: '36rpx'
						}
					},
					{
						type: 'image',
						src: this.posterData.smallImg,
						css: {
							left: '50rpx',
							top: '180rpx',
							width: '580rpx',
							height: '580rpx',
						}
					},
					{
						type: 'text',
						text: this.posterData.name + ' ' + this.posterData.subhead,
						css: {
							maxLines: 2,
							width: '390rpx',
							color: '#535353',
							left: '30rpx',
							top: '820rpx',
							fontSize: '32rpx',
							lineHeight: '50rpx'
						}
					},
					{
						type: 'image',
						src: '../../../static/images/ewm.png',
						css: {
							left: '440rpx',
							top: '800rpx',
							width: '178rpx',
							height: '178rpx',
						}
					},
				]
			});
		},
		// 成功
		painterSuccess(e) {
			console.log(e);
		}, 
		// 保存图片到本地
		saveImg() {
			console.log(this.imgUrl);
			//保存图片
			uni.showLoading({
				title: '保存中...'
			});
			let that = this;
			uni.getSetting({
				success(res) {
					uni.hideLoading();
					console.log(res);
					if (!res.authSetting['scope.writePhotosAlbum']) {
						wx.authorize({
							scope: 'scope.writePhotosAlbum',
							success: res => {
								console.log(res);
							}
						});
					} else {
						setTimeout(() => {
							uni.saveImageToPhotosAlbum({
								filePath: that.imgUrl,
								success(re) {
									uni.hideLoading();
									uni.showToast({
										title: '保存成功',
										icon: 'success'
									});
								},
								fail(err) {
									console.log(err);
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									});
								}
							});
						}, 1000);
					}
				}
			});
		}
	}
};
</script>
<style scoped>
.mycanvas {
	margin: 0 auto;
	border-radius: 10upx;
	overflow: hidden;
}
.saveImg {
	width: 80%;
	height: 80upx;
	line-height: 80upx;
	text-align: center;
	color: #fff;
	background-color: #4db8e4;
	border-radius: 10upx;
	margin: 40upx auto 20upx;
}
.imgs {
	position: absolute;
	top: 0;
	left: 50%;
	border-radius: 10upx;
	transform: translateX(-50%);
}
.tips {
	text-align: center;
	color: #fff;
	font-size: 24upx;
	margin-top: 20upx;
}
</style>
