<template>
	<view>
		<view class="order_list">
			<view style="background-color: #FFFFFF;">
				<navBar :showLeft="true" navTitle="订单列表" textcolor="#000" :leftBg="false"></navBar>
			</view>
			<!-- 顶部tab -->
			<view class="nav_top" style="border-bottom: 1upx solid #F8F8F8;">
				<tabs :colors="colors" :tabList="tabList" :active="active" @setTabs="setTabs"></tabs>
			</view>
			<scroll-view class="list_box" :scroll-y="true" @scrolltolower="ongetMoreList">
				<view v-for="(item, index) in orderList" :key="index" class="lists">
					<view class="type">
						<text class="order_id">订单编号:{{item.code}}</text>
						<text class="order_type" :style="'color:' + colors">
							{{ formOrderTabName(item) }}
						</text>
					</view>
					<view v-for="(row, index2) in item.orderProduct" :key="index2" class="top" @tap="jumpDetails(item)">
						<image :src="row.smallImage" mode="aspectFill"></image>
						<view class="top_right">
							<view class="order_name">{{row.name}} {{ row.subhead }}</view>
							<view class="sku" v-if="row.attributeJson !== '[]'">规格：{{ formatAttr(row.attributeJson) }}</view>
							<view class="price">
								<view class="t1">￥{{row.salePrice}}</view>
								<view class="t3">
									x{{row.quantity}}
								</view>
							</view>
						</view>
					</view>
					<view class="bottom">
						<!-- <view class="address">店铺地址：北京市海淀区苏家坨乡前沙涧村</view> -->
						<view class="btns">
							<block v-if="item.payStatus == 10 && item.status == 10" >
								<view class="pay" :style="'color:#fff;background:' + colors+ ';border-color:' + colors" @tap="jumpDetails(item)">去付款</view>
							</block>
							<block v-if="item.payStatus == 10 && item.status == 10" >
								<view class="pay shouhou" :style="'color:' + colors + ';border-color:' + colors" @tap="cancelOrder(item, index)">取消订单</view>
							</block>
							<!-- <block v-if="item.payStatus == 20 && item.deliverStatus == 10 && item.status == 10">
								<view class="pay shouhou"  @tap="onRefund(item)">申请退款</view>
							</block> -->
							<block v-if="item.payStatus == 20 && item.deliverStatus == 10 && item.status == 10">
								<view class="pay shouhou" :style="'color: #b7b4b9'">发货中</view>
							</block>
							<block v-if="item.payStatus == 20 && item.status == 20 && item.deliverStatus == 20">
								<view class="pay" :style="'color:#fff;background:' + colors+ ';border-color:' + colors" @tap="confirmOrder(item, index)">确认收货</view>
							</block>
							<block v-if="item.payStatus == 20 && item.deliverStatus == 40 && item.status == 50 && item.isComment">
								<view class="pay shouhou" :style="'color:' + colors + ';border-color:' + colors" @tap="jumpDetails(item)">订单评价</view>
							</block>
							<!-- <block v-if="item.payStatus == 20 && item.deliverStatus == 40 && item.status == 50">
								<view class="pay shouhou" @tap="jumpAfterSale(item)">申请售后</view>
							</block> -->
							<block v-if="item.status == 40">
								<view class="pay shouhou" @tap="delOrder(item, index)">删除订单</view>
							</block>
						</view>
					</view>
				</view>
				<view class="nodata" v-if="orderList.length >= 3">—— 到底啦 ——</view>
				<nodata :colors="colors" title="暂无订单信息" v-if="orderList.length == 0"></nodata>
			</scroll-view>
		</view>
		<loading v-if="isShow == true"></loading>
	</view>
</template>

<script>
	var app = getApp();
	import tabs from "../../commponent/public/tabs";
	import loading from "../../commponent/public/loading";
	import navBar from '../../commponent/public/navBar.vue'
	export default {
		data() {
			return {
				statusBarHeight: app.globalData.statusHeight + 'px',
				toBarHeight: app.globalData.toBar + 'px',
				tabList: [{
					name: '全部',
					id: 0
				}, {
					name: '待付款',
					id: 1
				}, {
					name: '待收货',
					id: 2
				},{
					name: '已完成',
					id: 3
				},
				{
					name: '已取消',
					id: 4
				}],
				active: 0,
				orderList:[],
				isShow: true,
				colors: "",
				page: 1,
				pageSize: 10,
				key: 0,
				isMore: true
			};
		},
			
		components: {
			tabs,
			loading,
			navBar
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				active: Number(options.tabIndex)
			});
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
			this.orderList = [];
			this.page = 1;
			this.key = this.active;
			this.isMore = true;
			this.getOrderList();
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
		onPullDownRefresh: function() {
			console.log('=========');
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
			// tab选择
			setTabs(item, index) {
				this.orderList = [];
				this.page = 1;
				this.key = index;
				this.isMore = true;
				this.setData({
					active: item.id
				});
				this.getOrderList();
			},
			// 获取订单列表
			getOrderList(key) {
				uni.$ajax('/api/order/list', {
					status: this.key,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					if(res.items.length > 0 ) {
						this.orderList = this.orderList.concat(res.items);
					} else {
						this.isMore = false;
					}
				}).catch((err)=> {
					return uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			//跳转订单详情
			jumpDetails(item) { 
				uni.navigateTo({
					url: '/pages/views/order/orderdetails?orderId=' + item.id
				});
			},
			// 售后处理
			jumpAfterSale() {
				uni.navigateTo({
					url: '/pages/views/order/afterSaleList'
				})
			},
			// 取消订单
			cancelOrder(item, index) {
				uni.showModal({
					title:'确认要取消该订单吗?',
					confirmColor:this.colors,
					success: (res) => {
						if(res.confirm){
							uni.$ajax('/api/order/cancel', {id: item.id}).then((res) => {
								this.orderList.splice(index, 1);
							}).catch((err) => {
								return uni.showToast({
									title: err,
									icon: 'none'
								});
							})
						}
					}
				})
			},
			// 删除订单
			delOrder(item, index) {
				uni.showModal({
					title:'确认要删除该订单吗?',
					confirmColor:this.colors,
					success: (res) => {
						if(res.confirm){
							uni.$ajax('/api/order/del', {id: item.id}).then((res) => {
								this.orderList.splice(index, 1);
							}).catch((err) => {
								return uni.showToast({
									title: err,
									icon: 'none'
								});
							})
						}
					}
				})
			},
			// 确认收货
			confirmOrder(item, index) {
				uni.showModal({
					title:'请确认已签收次订单?',
					confirmColor:this.colors,
					success: (res) => {
						if(res.confirm){
							uni.$ajax('/api/order/confirm', {id: item.id}).then((res) => {
								this.orderList.splice(index, 1);
							}).catch((err) => {
								return uni.showToast({
									title: err,
									icon: 'none'
								});
							})
						}
					}
				})
			},
			// 申请退款
			onRefund(item){
				// 申请退款
				uni.navigateTo({
					url: '/pages/views/order/cancelorder?orderId=' + item.id
				});
			},
			ongetMoreList() { 
				//上拉获取更多商品列表
				if(this.isMore) {
					this.page = this.page + 1;
					this.getOrderList();
				}
			},
			// 格式化属性
			formatAttr(attrs) {
				return JSON.parse(attrs).map(i => {
						return i.val;
					}).join(' | ');
			},
		    // 格式化订单tab name
			formOrderTabName(item) {
				let text = '';
				if(item.status == 40) {
					text = '已取消'
				}
				if(item.status == 10 && item.payStatus == 10) {
					text = '待付款'
				}
				if((item.status == 10 || item.status == 20) && item.payStatus == 20 && ((item.deliverStatus == 10 || item.deliverStatus == 20))) {
					text = '待收货'
				}
				if(item.status == 50  && item.payStatus == 20 && item.deliverStatus == 40) {
					text = '已完成'
				}
				return text;
			}
		}
	};
</script>
<style scoped lang="scss">
	.order_list {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}

	.list_box {
		padding: 0 3%;
		box-sizing: border-box;
		height: calc(100vh - 160upx);
		overflow: hidden;
		/* #ifdef MP */
		padding-bottom: 50upx;
		/* #endif */
		width: 100%;
		padding-top: 20upx;
	}

	.lists {
		margin: 0 auto;
		padding: 20upx;
		margin-top: 5upx;
		background-color: #ffffff;
		border-radius: 10upx;
		margin-bottom: 20upx;
		box-shadow: 0upx 0upx 10upx #EDEDED;
		box-sizing: border-box;
		width: 98%;
	}

	.type {
		height: 50upx;
		font-size: 26upx;
		line-height: 50upx;
		font-weight: bold;
		text-align: right;
		display: flex;
		justify-content: space-between;
	}

	.type .order_id {
		font-weight: 600;
		color: #999;
		font-size: 24upx;
	}

	.lists .top {
		display: flex;
		align-content: center;
		margin-bottom: 20upx;
	}

	.lists .top image {
		min-width: 180upx;
		max-width: 180upx;
		height: 180upx;
		display: block;
		border-radius: 10upx;
	}

	.lists .top .top_right {
		margin-left: 20upx;
		width: 100%;
	}

	.lists .top .order_name {
		line-height: 40upx;
		height: 80upx;
		font-size: 26upx;
		font-weight: bold;
		color: #333;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.lists .top .sku {
		height: 40upx;
		line-height: 40upx;
		font-size: 24upx;
		border-radius: 8upx;
		padding: 0 10upx;
		color: #A7A7A7;
		background-color: #F7F7F7;
	}

	.lists .top .price {
		width: 100%;
		display: flex;
		align-items: center;
		height: 40upx;
		line-height: 40upx;
		margin-top: 20upx;
		position: relative;
	}

	.price .t1 {
		font-size: 30upx;
		// font-weight: bold;
		display: block;
		color: $mycolor;
	}

	.price .t2 {
		font-size: 24upx;
		margin-left: 15upx;
		display: block;
		color: #C5C5C5;
		text-decoration: line-through;
	}

	.price .t3 {
		float: right;
		font-weight: bold;
		font-size: 28upx;
		color: #999;
		position: absolute;
		right: 0upx;
		top: 0;
	}

	.list_box .bottom {
		margin-top: 20upx;
	}

	.list_box .bottom .address {
		font-size: 24upx;
		color: #696969;
	}

	.list_box .bottom .btns {
		margin-top: 15upx;
		overflow: hidden;
	}

	.list_box .bottom .btns .pay {
		padding: 8upx 15upx;
		border-radius: 8upx;
		text-align: center;
		font-size: 24upx;
		float: right;
		margin-left: 20upx;
		box-sizing: border-box;
		border: 1upx solid #ddd;
	}

	.pay:active {
		opacity: .8;
	}

	.nodata {
		color: #ccc;
		text-align: center;
		font-size: 24upx;
		margin-bottom: 30upx;
		height: 80upx;
		line-height: 80upx;
	}
</style>
