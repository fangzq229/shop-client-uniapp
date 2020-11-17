<template>
	<view>
		<view class="order_list">
			<view style="background-color: #FFFFFF;">
				<navBar :showLeft="true" navTitle="退换/售后" textcolor="#000" :leftBg="false"></navBar>
			</view>
			<!-- 顶部tab -->
			<view class="nav_top" style="border-bottom: 1upx solid #F8F8F8;">
				<tabs :colors="colors" :tabList="tabList" :active="active" @setTabs="setTabs"></tabs>
			</view>
			<scroll-view class="list_box" :scroll-y="true" @scrolltolower="ongetMoreList">
				<block>
					<view class="lists" v-if="commentList.length > 0" v-for="(row, index) in commentList" :key="index">
						<view  class="top">
							<view class="top_box">
								<image class="cover" :src="row.smallImage" mode="aspectFill"></image>
								<view class="top_right">
									<view class="order_name">{{row.name}} {{ row.subhead }}</view>
									<view class="sku">规格：{{ formatAttr(row.attributeJson) }}</view>
									<view class="price">
										<view class="t1">￥{{row.salePrice}}</view>
										<view class="t3">
											x{{row.quantity}}
										</view>
									</view>
								</view>
							</view>
							<view class="bottom" v-if="row.comment.length == 0">
								<view class="btns" @click="onevaluate(row)" :style="'background:' + colors + ';color:#FFF;'">去评论</view>
							</view>
							<view class="comment-text" v-else @click="commentDetail(item)">
								<span>评价内容：</span> {{ row.comment[0].content }}
							</view>
						</view>
					</view>
					<view class="nodata" v-if="commentList.length >= 3">—— 到底啦 ——</view>
					<nodata :colors="colors" title="暂无可评论商品" v-if="commentList.length == 0 && active ==0"></nodata>
					<nodata :colors="colors" title="暂无已评论商品" v-if="commentList.length == 0 && active ==1"></nodata>
				</block>
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
					name: '待评价',
					id: 0
				}, {
					name: '已评价',
					id: 1
				}],
				active: 0,
				commentList: [],
				isShow: true,
				colors: "",
				page: 1,
				pageSize: 10
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
			this.commentList = [];
			this.getCommentList();
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
			// 获取评论列表
			getCommentList() {
				const type = this.active + 1;
				uni.$ajax('/api/comment/list', {page: this.page, pageSize: this.pageSize, type: type }).then((result) => {
					console.log(result);
					this.commentList = this.commentList.concat(result.items);
				}).catch((err) => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				})
			},
			// 去评价
			onevaluate(item) {
				//去评价
				uni.navigateTo({
					url: '/pages/views/order/evaluate?orderProductId='+ item.id
				});
			},
			// 评论详情
			commentDetail() {
				
			},
			// 切换
			setTabs(item, index) {
				this.setData({
					active: item.id
				});
				this.page = 1;
				this.commentList = [];
				this.getCommentList();
			},
			
			// onwithdraw() {
			// 	uni.showModal({
			// 		title: '确认要删除评论吗?',
			// 		confirmColor: this.colors,
			// 		success: (res) => {
			// 			if (res.confirm) {
			// 				console.log('取消成功')
			// 			}
			// 		}
			// 	})
			// },
			//上拉获取更多商品列表
			ongetMoreList() { 
				console.log('触发到底事件')
			},
			// 格式化属性
			formatAttr(attrs) {
				return JSON.parse(attrs).map(i => {
						return i.val;
					}).join(' | ');
			},
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
		margin-bottom: 20upx;

		.top_box {
			display: flex;
			align-content: center;
		}

		&:last-of-type {
			margin-bottom: 0;
		}
	}

	.lists .top .cover {
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
	.lists .top .comment-text {
		font-size: 24upx;
		padding-top: 20upx;
		color: #535353;
	}
	
	.lists .top .comment-text span {
		color: #c1c1c1;
	}

	.bottom {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 10upx;
		margin-bottom: 10upx;

		view {
			padding: 8upx 15upx;
			border-radius: 8upx;
			text-align: center;
			font-size: 24upx;
			border: 1upx solid #eee;
			overflow: hidden;
		}

		.success {
			border: none;
			width: 100%;
			background-color: #F7F7F7;
			height: 80upx;
			line-height: 80upx;
			display: flex;
			align-items: center;
			margin-top: 10upx;
			justify-content: space-between;
			.success_type {
				margin-right: 20upx;
				width: 60upx;
			}
			.success_t2 {
				color: #999;
				transform: translateX(-100upx);
			}
			.right_img{
				width: 40upx;
				height: 40upx;
				float: right;

			}
			&:active{
				opacity: 0.8;
			}
		}
	}

	.price .t1 {
		font-size: 30upx;
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

	.nodata {
		color: #ccc;
		text-align: center;
		font-size: 24upx;
		margin-bottom: 30upx;
		height: 80upx;
		line-height: 80upx;
	}
</style>
