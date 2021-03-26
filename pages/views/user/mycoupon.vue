<template>
	<view>
		<view v-for="(item, index) in couponList" :key="index" class="coupon_box">
			<view class="left">
				<view class="left_top">
					<text class="hui" :style="'background:' + colors">惠</text>
					<text class="hui_name">{{item.title}}</text>
				</view>
				<view class="left_bottom">
					<text>有效期：{{item.startDate}} 至 {{item.endDate}}</text>
				</view>
			</view>
			<image src="/static/images/user/ysy.png" class="ysy" v-if="item.status == 2"></image>
			<image src="/static/images/user/ygq.png" class="ysy" v-if="item.status == 3 || item.status == 4"></image>
			<view class="right" :style="'background:' + (item.status == 1 ? colors:'')">
				<view class="money">￥{{item.discountAmount}}</view>
				<text>满{{item.limitAmount}}可用</text>
				<text class="shiyong" v-if="item.status == 1" @click="jumpNext(item)">去使用</text>
			</view>
		</view>
		<nodata :colors="colors" title="暂无优惠券" v-if="couponList.length == 0"></nodata>
		<loading v-if="isShow == true"></loading>
	</view>
</template>

<script>
	var app = getApp();
	import loading from "../../commponent/public/loading";

	export default {
		data() {
			return {
				colors: '',
				couponList: [],
				isShow: true,
				page: 1,
				pageSize: 10,
			};
		},

		components: {
			loading
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				colors: app.globalData.newColor
			});
			setTimeout(() => {
				this.setData({
					isShow: false
				});
			}, 600);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getCoupon()
		},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面卸载
		 */
		onUnload: function() {},

		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {},

		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom: function() {},

		/**
		 * 用户点击右上角分享
		 */
		onShareAppMessage: function() {},
		methods: {
			getCoupon() {
				uni.$ajax('/api/coupon/user-list', {
					page: this.page,
					pageSize: this.pageSize
				}, 'get').then((res) => {
					console.log(res);
					if (this.page > 1) {
						this.couponList = this.couponList.concat(res.items)
					} else {
						this.couponList = res.items;
					}
				}).catch((err) => {
					return uni.showToast({
						title: err,
						icon: 'none'
					});
				});
			},
			jumpNext(i) {
				if(i.useRange == 1) {
					return uni.switchTab({
						url:'/pages/views/tabBar/category'
					})
				} 
				return uni.navigateTo({
					url: '/pages/views/home/classList?couponId='+ i.id
				})
				
			}
		}
	};
</script>
<style lang="scss" scoped>
	.coupon_box {
		margin: 20upx;
		box-shadow: 0upx 0upx 10upx #ddd;
		position: relative;
		border-radius: 10upx;
		overflow: hidden;
	}

	.coupon_box .left {
		width: 70%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 20upx;
		float: left;
	}

	.coupon_box .left .hui {
		width: 40upx;
		height: 40upx;
		font-size: 20upx;
		color: #fff;
		background-color: #EC1818;
		border-radius: 8upx;
		line-height: 40upx;
		text-align: center;
		display: inline-block;
		transform: translateY(-5upx);
	}

	.coupon_box .left .left_top {
		width: 60vw;
		display: block;
		font-size: 26upx;
		font-weight: bold;

	}

	.left_top .hui_name {
		line-height: 60upx;
		height: 60upx;
		margin-left: 20upx;
		display: inline-block;
	}

	.left_bottom {
		font-size: 24upx;
		font-weight: bold;
		color: #333;
		height: 60upx;
		line-height: 60upx;
	}

	.coupon_box .right {
		text-align: center;
		height: 160upx;
		width: 180upx;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		background-color: #A8A8A8;
		float: right;
	}

	.coupon_box .right .shiyong {
		height: 40upx;
		line-height: 40upx;
		background-color: #fff;
		border-radius: 20upx;
		padding: 0 20upx;
		color: #A8A8A8;
	}

	.coupon_box .right .money {
		font-size: 45upx;
		color: #fff;
	}

	.coupon_box .right text {
		font-size: 24upx;
		color: #fff;
		height: 40upx;
		line-height: 34upx;
	}

	.coupon_box .bottom {
		height: 60upx;
		line-height: 60upx;
		display: flex;
		align-content: flex-start;
		font-size: 24upx;
		margin-top: 10upx;
	}

	.coupon_box .bottom view {
		margin-right: 20upx;
		color: #888;
		font-weight: bold;
	}

	.ysy {
		width: 80upx;
		height: 80upx;
		position: absolute;
		top: 20upx;
		right: 200upx;
	}
</style>
