<template>
	<view style="background: #F8F8F8;overflow: hidden;">
		<!-- 宫格类样式 -->
		<view class="recommend_goods" v-if="modes == true">
			<view class="item" v-for="(item, index) in newList" :key="index">
				<view  class="goods">
					<view class="top" @tap="jumpDetails(item)">
						<image class="cover" lazy-load="true"  :src="item.smallImg" mode="aspectFill"></image>
						<!-- <image class="tags" lazy-load="true" v-if="item.baoyou" :src="tagImg[0]"></image> -->
					</view>
					<view class="bottom">
						<view class="goods_name" @tap="jumpDetails(item)">
							{{item.name}} {{ item.subhead }}
						</view>
						<view class="price"  @tap="jumpDetails(item)">
							<text class="text1">￥ {{item.skus[0].salePrice}}</text>
							<text class="text2">￥ {{item.skus[0].marketPrice}}</text>
						</view>
						<view class="goumai">
							<view class="g_left" @tap="jumpDetails(item)">
								<text v-for="(l, index) in item.label" :key="index">
									{{ l.name }}
								</text>
							</view>
							<view class="g_right" @tap="addCart(item)">
								<text class="iconfont icon-gouwuche"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 列表类样式 -->
		<view class="list_mode" v-if="modes == false">
			<view class="goods_list" v-if="newList.length !== 0">
				<view v-for="(item, index) in newList" :key="index" class="goods_item">
					<image :src="item.smallImg" mode="aspectFill" lazy-load="true" @tap="jumpDetails(item)"></image>
					<!-- 商品标签 -->
					<!-- <image class="tags" :src="tagImg[item.type-1]"></image> -->
					<view class="goods_right">
						<view class="goods_name" @tap="jumpDetails(item)">{{item.name}} {{ item.subhead }}</view>
						<view class="numbers" @tap="jumpDetails(item)">
							<text v-for="(l, index) in item.label" :key="index">
								{{ l.name }}
							</text>
						</view>
						<view class="price">
							<text class="money" @tap="jumpDetails(item)">￥ {{item.skus[0].salePrice}}</text>
							<text class="hx_money" @tap="jumpDetails(item)">￥ {{item.skus[0].marketPrice}}</text>
							<text class="iconfont icon-gouwuche gouwuche" @tap="addCart(item)"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<nodata :colors="colors" title="暂无商品" v-if="newList.length == 0"></nodata>
		<view class="loading" v-if="loading == true">加载中...</view>
		<view class="loading" v-if="loading == false && newList.length > 0">—— 到底啦 ——</view>
		<!-- 选择规格 -->
		<sku :skuList="nowList" :showModal="showModal" :colors="colors" @onhide="onhide" :bottoms="bottoms"></sku>
	</view>
</template>

<script>
	const app = getApp();
	import {
		setCart,
		getCart
	} from '@/utils/auth.js'
	import sku from '../public/sku.vue'
	export default {
		components: {
			sku
		},
		data() {
			return {
				showModal: false,
				nowList: {},
				newList: [],
				sku: "",
				tagImg: [
					'/static/images/home/five.png',
				],
			};
		},
		props: {
			colors: {
				type: String
			},
			dataList: {
				type: Array
			},
			modes: {
				//控制显示宫格类样式或者列表类样式
				type: Boolean,
				default: true
			},
			loading: {
				type: Boolean,
				default: true
			},
			bottoms: {
				type: String,
				default: '0'
			}
		},
		created() {
			this.setDataList(this.dataList)
		},
		watch: {
			dataList(value) {
				this.setDataList(value)
			}
		},
		methods: {
			setDataList(newVal) {
				this.setData({
					newList: newVal
				});
			},
			onhide() {
				this.showModal = false
			},
			addCart(item) {
				//加入购物车弹出对话框
				this.showModal = true
				this.nowList = item
			},
			jumpDetails(e) {
				uni.navigateTo({
					url: '/pages/views/goods/goodsDetails?productId=' + e.id
				});
			}
		}
	};
</script>
<style scoped lang="scss">
	.loading {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		color: #ccc;
		font-size: 24upx;
		width: 100%;
		margin-bottom: 20upx;
	}
	.recommend_goods {
		width: 95%;
		margin: 0 auto;
		column-count: 2;
		column-gap: 20upx;
		padding-top: 20upx;
		
	}
	.goods {
		width: 100%;
		display: flex;
		break-inside: avoid;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 20upx;
		border-radius: 10upx;
		
	}

	.goods .top {
		height: 45vw;
		width: 100%;
		overflow: hidden;
		position: relative;
		background-color: #ffffff;
		border-top-right-radius: 10upx;
		border-top-left-radius: 10upx;
	}
	.goods .top image {
		width: 100%;
		height: 100%;
	}

	.top .cover {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.top .tags {
		width: 65upx;
		height: 65upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.bottom {
		width: 100%;
		padding: 15upx;
		background-color: #ffffff;
		overflow: hidden;
	}

	.goods_name {
		/* height: 66upx; */
		font-size: 24upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.bottom .price {
		margin-top: 15upx;
	}

	.bottom .price .text1 {
		font-size: 32upx;
		font-weight: bold;
		color: $mycolor;
	}

	.bottom .price .text2 {
		font-size: 22upx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 15upx;
	}

	.goumai {
		margin-top: 10upx;
	}

	.g_left {
		font-size: 24upx;
		float: left;
		align-items: center;
	}

	.g_left text {
		display: inline-block;
		height: 35upx;
		line-height: 35upx;
		padding: 0 10upx;
		background-color: #FAEFF7;
		border-radius: 10upx;
		margin-right: 20upx;
		color: $mycolor;
	}

	.g_right {
		float: right;
		font-size: 28upx;
		color: $mycolor;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: #000;
		z-index: 900;
		opacity: 0.7;
	}

	.sku {
		width: 100vw;
		min-height: 30vh;
		position: fixed;
		bottom: -100%;
		z-index: 910;
		left: 0;
		background-color: #ffffff;
		padding: 20upx 4%;
		border-top-left-radius: 10upx;
		border-top-right-radius: 10upx;
		border-bottom: 1upx solid #eee;
		transition: all 0.3s;
	}

	.shows {
		/* #ifdef MP */
		bottom: 0 !important;
		/* #endif */
		/* #ifdef H5 */
		bottom: 100upx !important;
		/* #endif */
		transition: all 0.3s;
	}

	.sku_top {
		overflow: hidden;
	}

	.sku_top image {
		height: 170upx;
		width: 170upx;
		float: left;
		margin-right: 15upx;
		border-radius: 8upx;
	}

	.sku_top .sku_title {
		font-size: 24upx;
		line-height: 35upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-weight: bold;
	}

	.sku_top .moneys {
		font-size: 28upx;
		line-height: 40upx;
		overflow: hidden;
		margin-top: 20upx;
	}

	.sku_top .kucun {
		font-size: 24upx;
		color: #999;
		overflow: hidden;
	}

	.sku_list {
		margin-top: 20upx;
		overflow: hidden;
		margin-bottom: 40upx;
	}

	.sku_name {
		font-size: 24upx;
		color: #666;
		overflow: hidden;
	}

	.sku_tag {
		overflow: hidden;
		margin-top: 20upx;
	}

	.sku_tag .tag_s {
		height: 50upx;
		line-height: 50upx;
		padding: 0 20upx;
		text-align: center;
		font-size: 22upx;
		color: #333;
		background-color: #F5F5F5;
		border: 1upx solid rgba(0, 0, 0, .05);
		float: left;
		border-radius: 30upx;
		margin-right: 20upx;
		transition: all 0.2s;
		margin-bottom: 20upx;
	}

	.number {
		margin-top: 10upx;
		border-top: 1upx solid #ccc;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		padding-top: 10upx;
	}

	.number .n_left {
		float: left;
		font-size: 28upx;
		color: #333;
	}

	.number .n_right {
		float: right;
		height: 60upx;
		width: 200upx;
		background-color: #F5F5F5;
		margin-top: 10upx;
		border-radius: 5upx;
	}

	.n_right .jian,
	.jia {
		width: 60upx;
		height: 60upx;
		text-align: center;
		line-height: 60upx;
		font-size: 42upx;
	}

	.jian {
		float: left;
	}

	.jia {
		float: right;
	}

	.jian:active {
		background-color: #eee;
	}

	.jia:active {
		background-color: #eee;
	}

	.n_right input {
		width: 76upx;
		float: left;
		text-align: center;
		margin-top: 6upx;
	}

	.btn_box {
		margin-top: 40upx;
	}

	.btn_box .addcart_btn,
	.submit {
		width: 40vw;
		height: 56upx;
		line-height: 56upx;
		border-radius: 42upx;
		font-size: 24upx;
		text-align: center;
		color: #ffffff;
		float: left;
		margin-left: 30upx;
		margin-bottom: 30upx;
	}

	.btn_box view:active {
		opacity: 0.8;
	}

	/* 列表类样式 */
	.list_mode {
		z-index: 10;
		padding-top: 10px;
	}

	.goods_list {
		overflow: hidden;
		padding: 10upx 4% 0upx;
		background-color: #FFFFFF;
	}

	.goods_list .goods_item {
		align-items: center;
		border-bottom: 1upx solid #eee;
		padding-bottom: 10upx;
		margin-bottom: 15upx;
		overflow: hidden;
		position: relative;

		&:last-of-type {
			border-bottom: none;
		}
	}

	.goods_item image {
		width: 200upx;
		height: 200upx;
		float: left;
		border-radius: 10upx;
		margin-right: 5upx;
	}

	.goods_item .tags {
		width: 60upx;
		height: 60upx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.goods_right {
		/* float: left; */
		padding: 0 10upx;
		overflow: hidden;
	}

	.goods_right .goods_name {
		font-size: 28upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		color: #333;
		min-height: 50upx;
	}

	.goods_right .numbers {
		font-size: 20upx;
		line-height: 30upx;
		overflow: hidden;
		margin-top: 30upx;
		display: flex;
		align-content: center;
	}

	.goods_right .numbers text {
		display: inline-block;
		height: 35upx;
		line-height: 35upx;
		padding: 0 10upx;
		background-color: #FAEFF7;
		border-radius: 10upx;
		margin-right: 20upx;
		color: $mycolor;
	}

	.goods_right .price {
		line-height: 40upx;
		font-size: 24upx;
		overflow: hidden;
		margin-top: 20upx;
	}

	.price .money {
		margin-right: 20upx;
		font-size: 32upx;
		font-weight: bold;
		color: $mycolor;
	}

	.hx_money {
		text-decoration: line-through;
		color: #999;
		font-size: 22upx;
	}

	.gouwuche {
		font-size: 32upx;
		float: right;
		margin-right: 20upx;
		color: $mycolor;
	}

	.nodata {
		color: #999;
		text-align: center;
		font-size: 24upx;
		margin-top: 20upx;
		height: calc(100vh - 240upx);
		line-height: 80upx;
	}
</style>
