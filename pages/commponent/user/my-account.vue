<template>
	<view class="my_money">
		<list-cell icons="icon-qianbao" :colors="colors" :rightshow="false">我的账户</list-cell>
		<view class="menu_btnbox">
			<!-- <view class="menu_btns" @tap="nextPage('/pages/views/withdrawal/withdrawal')">
				<view class="p1">{{balance}}</view>
				<view class="p2">余额</view>
			</view> -->
			<view class="menu_btns" @tap="nextPage('/pages/views/user/mycoupon')">
				<view class="p1">{{coupon}}</view>
				<view class="p2">优惠券</view>
			</view>
			<view class="menu_btns" @tap="nextPage('/pages/views/user/mypoints')">
				<view class="p1">{{integral}}</view>
				<view class="p2">积分</view>
			</view>
		</view>
	</view>
</template>

<script>
	import listCell from "./list-cell";
	import { getToken } from '@/utils/auth';

	export default {
		data() {
			return {};
		},

		components: {
			listCell
		},
		props: {
			balance: {
				//余额
				type: Number,
				default: 0
			},
			coupon: {
				//优惠券
				type: Number,
				default: 0
			},
			integral: {
				//积分
				type: Number,
				default: 0
			},
			colors: {
				type: String
			}
		},
		methods: {
			nextPage (page) {
				if(!getToken()) {
					uni.navigateTo({
						url: '/pages/login/login'
					});
				}else {
					uni.navigateTo({
						url: page
					});
				}
			},
			padding() {
				return uni.showToast({
					title: '开发中，敬请期待',
					icon: 'none'
				});
			}
		}
	};
</script>
<style lang="scss" scoped>
	.my_money {
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.menu_btnbox {
		display: flex;
		align-items: center;
	}

	.menu_btns {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		margin: 30upx 0;
		font-size: 24upx;
		color: #75787d;
		line-height: 40upx;
	}

	.menu_btns .p1 {
		font-size: 30upx;
		font-weight: bold;
	}
</style>
