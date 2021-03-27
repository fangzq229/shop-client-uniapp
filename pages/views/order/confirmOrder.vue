<template>
	<view class="order">
		<!-- 选择配送方式 -->
		<!-- <view class="mode" @tap="selectMode">
				<text class="text1">配送方式</text>
				<text class="text2">{{modes || "请选择配送方式"}}</text>
				<image src="/static/images/home/right.png"></image>
			  </view> -->
		<!-- 收货地址 -->
		<view class="order_address" v-if="tapIndex == 0">
			<image src="/static/images/home/bottom.png"></image>
			<view class="address_box" @tap="setAddress">
				<view class="weizhi_icon"><text class="iconfont icon-dizhi" :style="'color:' + colors"></text></view>
				<block v-if="address.id">
					<view class="center">
						<view class="name">
							<text class="text1">{{ address.consignee }}</text>
							<text class="phones">{{ address.phone }}</text>
						</view>
						<view class="address_name">{{ address.district }} {{ address.detailedAddress }}</view>
					</view>
				</block>
				<view class="noaddress" v-else>请添加收货地址</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view v-for="(item, index) in goodsList" :key="index" class="goods">
			<view class="goods_data">
				<image :src="item.smallImage" mode="aspectFill"></image>
				<view class="goods_title">
					<view class="g_name">{{ item.name }} {{ item.subhead }}</view>
					<view class="goods_sku" v-if="item.attributeJson !== '[]'">
						规格:
						<text style="margin-right: 10upx;">{{ formatAttr(item.attributeJson) }}</text>
					</view>
					<view class="price">
						<view class="t1" :style="'color:' + colors">￥{{ item.activityPrice || item.salePrice }}</view>
						<view class="t2">
							<text>￥{{ item.marketPrice }}</text>
						</view>
						<view class="t3">x{{ item.quantity }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单详情 -->
		<view class="order_more">
			<view class="morelist">
				<text class="title">商品总价</text>
				<view class="right_title">￥{{ sumprice }}</view>
			</view>
			<view class="morelist">
				<view class="title">
					<text class="quan" :style="'background:' + colors">运</text>
					<text>运费</text>
				</view>
				<view class="right_title">￥0.00</view>
			</view>
			<view class="morelist" style="border-bottom:none" v-if="couponList.length > 0">
				<view class="title">
					<text class="quan" :style="'background:' + colors">券</text>
					<text>优惠券</text>
				</view>
				<view class="right_title" :style="'color:' + colors + ';font-size:24upx'" @tap="openCoupon()">
					<text>{{ discountPrice > 0 ? '-¥ ' + discountPrice: '请选择优惠券' }}</text>
					<image style="width: 40rpx;height: 40rpx;" src="/static/images/home/right.png"></image>
				</view>
			</view>
			<view class="morelist">
				<text class="title">实付款</text>
				<view class="right_title" :style="'color:' + colors + ';'">￥{{ nowprice }}</view>
			</view>
			<!-- <view class="tips">
				<view class="tips_name">备注信息</view>
				<view class="textarea_box"><textarea placeholder="请输入备注信息" placeholder-class="font-size: 24upx" maxlength="-1" v-if="couponshow == false"></textarea></view>
			</view> -->
		</view>
		<view class="bottom_btn">
			<view class="moneys">
				合计:
				<text :style="'color:' + colors + ';'">￥{{ nowprice }}</text>
			</view>
			<view class="btns" :style="'background:' + colors + ';'" @tap="submit">提交订单</view>
		</view>
		<!-- 优惠券弹出层 -->
		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px' : '')">
			<scroll-view class="scrolls" scroll-y>
				<coupon :couponList="couponList" @onReceive="onReceive"></coupon>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	import coupon from '../../commponent/public/coupon';
	import {
		getGoodsData,
		removeAddress
	} from '@/utils/auth.js';
	export default {
		data() {
			return {
				colors: '',
				couponshow: false,
				modes: '',
				tapIndex: 0,
				goodsList: [],
				couponIndex: 0,
				nowprice: 0, //临时存储总金额的变量 用于计算优惠券
				sumprice: 0,
				discountPrice: 0, // 优惠价格
				address: {},
				addressId: undefined,
				couponList: []

			};
		},

		components: {
			coupon
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			removeAddress(); //清空存储的地址
			this.setData({
				colors: app.globalData.newColor
			});
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.getCheckOrder();
			//获取默认选择的地址
			this.getAddress();
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
			getCheckOrder() {
				const res = getGoodsData();
				const products = res.map(i => {
					const data = {
						productId: i.productId,
						productSkuId: i.productSkuId,
						quantity: i.quantity
					}
					if (i.id) {
						Object.assign(data, {
							id: i.id
						});
					}
					return data;
				})
				uni.$ajax('/api/order/check', {
					products: products
				}, 'post').then((res) => {
					this.goodsList = res.products;
					this.couponList = res.coupons;
					// 计算所有的商品总价
					this.getSumPrice();
				})

			},
			// 获取默认地址
			getAddress() {
				const pages = getCurrentPages();
				const currPage = pages[pages.length - 1]; //当前页面
				// #ifdef MP
				let addressId = currPage.data.addressId;
				// #endif
				// #ifdef H5
				let addressId = currPage._data.addressId;
				// #endif
				const param = {};
				if (addressId) {
					Object.assign(param, {
						id: addressId
					});
				}
				uni
					.$ajax('/api/address/info', param)
					.then(res => {
						this.addressId = addressId || res.id;
						this.address = res;
					})
					.catch(err => {
						return uni.showToast({
							title: err,
							icon: 'none'
						});
					});
			},
			// 计算价格
			getSumPrice() {
				let sumprice = 0;
				let discountAmount = 0;
				// 全局优惠劵 价格

				this.goodsList.forEach(e => {
					const price = e.activityPrice || e.salePrice;
					sumprice = sumprice + (price * 100 * e.quantity) / 100;
					// 计算优惠劵价格
					const coupons = this.couponList.filter(i => {
						return i.products[0] && i.products[0].productSkuId == e.productSkuId
					});
					if (coupons.length > 0) {
						const coupon = coupons.sort((m, n) => {
							return n.discountAmount - m.discountAmount
						})[0];
						coupon.isCheck = true;
						discountAmount = discountAmount + coupon.discountAmount;
					}
				});
				this.discountPrice = discountAmount.toFixed(2);
				this.sumprice = sumprice.toFixed(2);
				this.nowprice = (sumprice - discountAmount).toFixed(2);
			},
			openCoupon(index) {
				this.setData({
					couponshow: true,
					couponIndex: index
				});
			},

			hidecoupon() {
				this.setData({
					couponshow: false
				});
			},

			async submit() {
				if (!this.addressId) {
					return uni.showToast({
						title: '请选择您的收货地址',
						icon: 'none'
					});
				}
				const coupons = this.couponList.filter(i => i.isCheck).map(c => c.id);
				const products = this.goodsList.map(item => {
					const obj = {
						productId: item.productId,
						productSkuId: item.productSkuId,
						quantity: item.quantity
					};
					if (item.id) {
						Object.assign(obj, {
							id: item.id
						});
					}
					return obj;
				});
				const obj = {
					addressId: this.addressId,
					products: products
				};
				if (coupons.length) {
					obj.coupons = coupons;
				}
				uni
					.$ajax(
						'/api/order/create',
						obj,
						'post'
					)
					.then(result => {
						this.pay(result.orderId);
					})
					.catch(err => {
						return uni.showToast({
							title: err,
							icon: 'none'
						});
					});
			},

			selectMode() {
				let that = this;
				let list = ['物流寄送', '到店自提'];
				uni.showActionSheet({
					itemList: list,
					success: function(res) {
						that.setData({
							modes: list[res.tapIndex],
							tapIndex: res.tapIndex
						});
					}
				});
			},

			setAddress() {
				uni.navigateTo({
					url: '/pages/views/user/myaddress?type=' + 'select'
				});
			},
			onReceive(item, index) {
				const product = this.goodsList.find(i => {
					return item.products[0] && item.products[0].productSkuId == i.productSkuId
				})
				if (item.isCheck) {
					this.nowprice = (Number(this.nowprice) + item.discountAmount).toFixed(2);
					this.discountPrice = (Number(this.discountPrice) - item.discountAmount).toFixed(2);
				} else {
					if (product) {
						this.couponList = this.couponList.map(i => {
							if (i.products[0] && i.products[0].productSkuId == product.productSkuId && i.isCheck ==
								true) {
								this.nowprice = (Number(this.nowprice) + i.discountAmount).toFixed(2);
								this.discountPrice = (Number(this.discountPrice) - i.discountAmount).toFixed(2);
								i.isCheck = false
							}
							return i;
						});
					}
					this.nowprice = (Number(this.nowprice) - item.discountAmount).toFixed(2);
					this.discountPrice = (Number(this.discountPrice) + item.discountAmount).toFixed(2);
				}
				this.couponList[index].isCheck = item.isCheck ? false : true;
			},
			// 格式化属性
			formatAttr(attrs) {
				return JSON.parse(attrs)
					.map(i => {
						return i.val;
					})
					.join(' | ');
			},

			// 拉起支付
			pay(orderId) {
				uni.$ajax('/api/pay/wx-xcx', {
					orderId: orderId
				}, 'post').then((payParamRes) => {
					uni.requestPayment({
						provider: 'wxpay',
						...payParamRes,
						success: function(payRes) {
							// 支付成功
							uni.navigateTo({
								url: '/pages/views/order/success?orderId=' + orderId
							});
						},
						fail: function(err) {
							uni.showToast({
								title: '支付失败',
								icon: 'none'
							});
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/views/order/orderdetails?orderId=' +
										orderId
								});
							}, 2000);
						}
					});
				}).catch((err) => {
					return uni.showToast({
						title: '支付繁忙',
						icon: 'none'
					});
				})
			}
		}
	};
</script>
<style lang="scss" scoped>
	page {
		background-color: #ffffff;
	}

	.order {
		padding: 20upx 4%;
	}

	.mode {
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		padding: 0 20upx;
		border-radius: 10upx;
		align-items: center;
		margin-bottom: 20upx;
		box-shadow: 0upx 0upx 10upx #ddd;
	}

	.mode:active {
		background-color: #f5f5f5;
	}

	.mode .text1 {
		color: #999;
		font-size: 24upx;
	}

	.mode .text2 {
		font-size: 24upx;
		color: #333;
		display: block;
		width: 50%;
		font-weight: bold;
	}

	.mode image {
		width: 40upx;
		height: 40upx;
		display: block;
	}

	.order_address {
		height: 150upx;
		width: 100%;
		background-color: #fff;
		border-radius: 10upx;
		overflow: hidden;
		position: relative;
		box-shadow: 0upx 0upx 10upx #ddd;
	}

	.order_address image {
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.address_box {
		width: 100%;
		height: 100%;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		box-sizing: border-box;
		padding: 20upx;
		display: flex;
		align-items: center;
	}

	.weizhi_icon text {
		font-size: 40upx;
		margin-left: 10upx;
	}

	.address_box .center {
		margin-left: 20upx;
	}

	.address_box .center .name {
		height: 60upx;
		line-height: 60upx;
	}

	.address_box .center .name .text1 {
		font-size: 26upx;
		font-weight: bold;
		color: #333;
		display: inline-block;
		margin-right: 20upx;
	}

	.phones {
		font-size: 24upx;
		color: #999;
		z-index: 0;
	}

	.address_box .address_name {
		font-size: 26upx;
		font-weight: bold;
		color: #333;
	}

	.noaddress {
		margin-left: 40upx;
		font-weight: bold;
		color: #333;
		font-size: 26upx;
	}

	.goods {
		background-color: #fff;
		margin-top: 20upx;
		box-shadow: 0upx 0upx 10upx #ddd;
		border-radius: 10upx;
		padding: 20upx;
		padding-bottom: 10upx;
	}

	.goods_data {
		width: 100%;
		display: flex;
		margin-bottom: 15upx;
	}

	.goods_data image {
		min-width: 150upx;
		max-width: 150upx;
		height: 150upx;
		display: block;
		border-radius: 10upx;
	}

	.goods_title {
		margin-left: 20upx;
		line-height: 40upx;
		width: 100%;
	}

	.goods_title .price {
		width: 100%;
		display: flex;
		height: 40upx;
		line-height: 40upx;
		margin-top: 20upx;
		position: relative;
	}

	.goods_title .price .t1 {
		font-size: 30upx;
		font-weight: bold;
		display: block;
	}

	.goods_title .price .t2 {
		font-size: 24upx;
		margin-left: 15upx;
		display: block;
		color: #999;
		text-decoration: line-through;
	}

	.goods_title .price .t3 {
		float: right;
		font-weight: bold;
		font-size: 28upx;
		color: #999;
		position: absolute;
		right: 0upx;
		top: 0;
	}

	.goods_title .g_name {
		font-size: 26upx;
		font-weight: bold;
		max-height: 80upx;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.goods_title .goods_sku {
		color: #999;
		/* margin-top: 20upx; */
	}

	.numbers {
		/* text-align: right; */
	}

	.shop {
		margin-top: 20upx;
		font-size: 24upx;
		color: #333;
		display: flex;
		align-content: center;
	}

	.shop .iconfont {
		margin-right: 20upx;
	}

	.order_more {
		padding: 0 2%;
		margin-top: 20upx;
	}

	.morelist {
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx dashed #eee;
	}

	.morelist .title {
		color: #333;
		font-size: 26upx;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.morelist .title .quan {
		font-size: 20upx;
		width: 35upx;
		height: 35upx;
		line-height: 36upx;
		text-align: center;
		border-radius: 8upx;
		margin-right: 10upx;
		align-items: center;
		color: #fff;
	}

	.morelist .right_title {
		color: #999;
		display: flex;
		align-items: center;
	}

	.tips {
		padding: 10upx 0;
		margin-bottom: 120upx;
	}

	.tips .tips_name {
		font-size: 26upx;
		font-weight: bold;
		line-height: 60upx;
	}

	.textarea_box {
		min-height: 100upx;
		width: 100%;
		border: 1upx solid #eee;
		border-radius: 10upx;
		padding: 20upx;
	}

	.textarea_box textarea {
		font-size: 24upx;
		height: 150upx;
	}

	.bottom_btn {
		height: 100upx;
		width: 100vw;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		line-height: 100upx;
		display: flex;
		justify-content: flex-end;
		padding: 0 30upx;
		z-index: 100;
		font-weight: bold;
	}

	.bottom_btn .moneys {
		font-size: 28upx;
		font-weight: bold;
		margin-right: 100upx;
	}

	.bottom_btn .btns {
		font-size: 28upx;
		color: #fff;
		height: 60upx;
		line-height: 60upx;
		padding: 0 25upx;
		text-align: center;
		border-radius: 40upx;
		margin-top: 20upx;
		font-weight: bold;
	}

	/* 优惠券 */
	.coupon {
		background-color: #fff;
		border-radius: 10upx 10upx 0 0;
		position: fixed;
		left: 0;
		bottom: -1000upx;
		z-index: 150;
		transition: all 0.3s;
	}

	.coupon .buyong {
		line-height: 80upx;
		padding: 0 4%;
		text-align: right;
		color: #999;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		z-index: 10;
		opacity: 0.7;
	}

	.scrolls {
		width: 100vw;
		height: 55vh;
		z-index: 500;
	}
</style>
