<template>
	<view class="goodsDetails">
		<!-- 顶部自定义导航栏 -->
		<navBar textcolor="#000" :leftImg="true" :showLeft="true" :showTitle="false"></navBar>
		<!-- 轮播图 -->
		<view class="carousel" :style="'top:' + statusBarHeight">
			<swiper :indicator-dots="goodsData.bigImg.length >= 2 ? true : false" circular="true" duration="400"
				controls touchable @change="swiperchange">
				<!-- 视频  -->
				<!-- <swiper-item class="swiper-item" v-if="goodsData.videos !== ''">
					<view class="image-wrapper">
						<video id="myVideo" :controls="false" :show-center-play-btn="false" :muted="voice" loop :src="goodsData.videos"></video>
						<view class="place_tow" @click="openvideo" v-if="isshowVideo == false">
						</view>
						<view class="place_tow" v-if="isshowVideo == true">
								<image :src="goodsData.img" class="videocover" ></image>
						</view>
						<view @click="onplay"  class="playbtn" v-if="isshowVideo == true">
							<image src="/static/images/goods/bofang.png" ></image>
						</view>
						<view class="shengyin" @tap="setvoice" v-if="isshowVideo == false">
							<image src="/static/images/goods/shengyin.png" v-if="voice == false"></image>
							<image src="/static/images/goods/jingyin.png" v-if="voice == true"></image>
						</view>
					</view>
				</swiper-item> -->
				<swiper-item v-for="(item, index) in goodsData.bigImg" :key="index" class="swiper-item"
					@click="preview(goodsData.bigImg, index)">
					<view class="image-wrapper">
						<image :src="item" class="loaded" mode="aspectFill"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- <view class="carousel-mark" v-if="true">
				<text>已售罄</text>
			</view> -->
		</view>
		<!-- 占位 -->
		<view class="place" :style="'top:-' + toBar"></view>
		<!-- 商品信息 -->
		<view class="goods_info" :style="'transform: translateY(-' + toBar + ');'">
			<view class="goods_name">{{ goodsData.name }} {{ goodsData.subhead }}</view>
			<view class="goods_price">
				<text class="money">￥{{ goodsData.skus[0].activityPrice || goodsData.skus[0].salePrice }}</text>
				<text class="h_money">￥{{ goodsData.skus[0].marketPrice }}</text>
			</view>
			<view class="shoucang">
				<view class="sc_icons" @tap="setisColl">
					<text :class="['iconfont', goodsData.isCollection == true ? 'icon-shoucang1' : 'icon-shoucang']"
						:style="{ color: goodsData.isCollection == true ? colors : '' }"></text>
				</view>
				<view class="sc_text" :style="{ color: goodsData.isCollection == true ? colors : '' }">收藏</view>
			</view>
		</view>
		<view class="other" :style="'transform: translateY(-' + toBar + ');'">
			<p>快递:包邮</p>
			<!-- <p v-else>快递费:10元</p> -->
			<p>销量:{{ goodsData.skus[0].virtualSales }}</p>
		</view>
		<!-- 分享按钮 -->
		<!-- <view class="share" :style="'transform: translateY(-' + toBar + ');'"> -->
		<!-- <view class="tips" style="color: #666;">
				<text class="iconfont icon-zuanshi" style="color: #FF546E;font-size: 38upx;font-weight: 600;"></text>
				好物爱分享
			</view> -->
		<!-- #ifdef MP -->
		<!-- <view class="onshare" style="color: #FF546E;">
				<text class="iconfont icon-fenxiang"></text>
				<button open-type="share" class="share_btn">1</button>
				立即分享
			</view> -->
		<!-- #endif -->
		<!-- <view class="poster" style="color: #FF546E;" @tap="openPoster">
				<text class="iconfont icon-CombinedShape"></text>
				生成海报
			</view> -->
		<!-- </view> -->
		<!-- 店铺信息 -->
		<!-- <view class="shop" :style="'transform: translateY(-' + toBar + ');'">
			<image class="shop_img" src="/static/images/log.png" mode="aspectFill"></image>
			<view class="shop_center">
				<view class="shop_name">北京零食店店</view>
				<view class="shop_address">北京市海淀区苏家坨乡前沙润村北京市海淀区苏家坨乡前沙润村</view>
			</view> -->
		<!-- #ifdef MP -->
		<!-- <view class="shoucang go_btn" @tap="nearAddress">
				<view class="sc_icons">
					<text class="iconfont icon-dizhi"></text>
				</view>
				<view class="sc_text">到这去</view>
			</view> -->
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<!-- 直接打开地图需要传递店铺的经纬度 来获取店铺的位置 -->
		<!-- <view class="shoucang go_btn" @tap="openMap">
				<view class="sc_icons">
					<text class="iconfont icon-dizhi"></text>
				</view>
				<view class="sc_text">到这去</view>
			</view> -->
		<!-- #endif -->
		<!-- </view> -->
		<!-- 选择规格和优惠券 -->
		<view class="sku_pon" :style="'transform: translateY(-' + toBar + ');'">
			<!-- <view class="cell" @tap="openSku">
				<text class="text1">商品规格：</text>
				<text class="text2">规格...</text>
				<image src="/static/images/home/right.png"></image>
			</view> -->
			<view class="cell" style="border:none" @tap="opencoupon" v-if="couponList.length>0">
				<text class="text1">优 惠 券：</text>
				<text class="text2" :style="{color: colors}">领取优惠券</text>
				<image src="/static/images/home/right.png"></image>
			</view>
		</view>
		<!-- 商品评价 -->
		<view class="evaluate" :style="'transform: translateY(-' + toBar + ');'">
			<p class="eva_title">
				商品评价
				<text>({{ commentCount }})</text>
				<text class="seeAll" @click="seeAll">查看全部</text>
			</p>
			<view class="evaluate_box">
				<view class="pingjia">
					<view v-if="goodsEva.length !== 0">
						<view class="pingjia_box" v-for="(row, index) in goodsEva" :key="index">
							<view class="box_top">
								<image
									:src="row.user.avatar || 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1635355620,1019286978&fm=26&gp=0.jpg'"
									mode="" class="head"></image>
								<view class="right">
									<p class="name">{{ row.user.nickname || '木木' }}</p>
									<p class="p2">
										<text class="text1">{{ row.createdAt }}</text>
										<!-- <text class="text2">{{ row.goods_name }}</text> -->
									</p>
									<p class="p3">
										<image src="/static/images/home/stars.png" v-for="s in row.level" :key="s"
											mode=""></image>
										<block v-if="row.level !== 5">
											<image src="/static/images/home/star-no.png" v-for="(s, h) in 5 - row.level"
												:key="h" mode=""></image>
										</block>
									</p>
								</view>
							</view>
							<!-- <view class="tag_box" v-if="row.tags.length !== 0">
									<view class="tags" v-for="(s,x) in row.tags" :key="x">{{s}}</view>
								</view> -->
							<view class="ping_neirong">{{ row.content }}</view>
							<!-- <view class="ping_img" v-if="row.images.length !== 0">
									<image :src="s.url" mode="aspectFill" v-for="(s,x) in row.images" :key="x" @click="preview(row.images, x)"></image>
								</view> -->
							<view class="huifu" v-if="row.reply && row.reply.length > 0">商家回复：{{ row.reply[0].content }}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="details" :style="'transform: translateY(-' + toBar + ');'">
			<view class="details_title"><text style="color: #666666;margin: 0 20upx;">商品详情</text></view>
			<view class="details_content">
				<!-- <rich-text :nodes="htmlNode"></rich-text> -->
				<image style="width: 100%;" mode="widthFix" :src="item" v-for="(item, index) in goodsData.introImg"
					:key="index"></image>
			</view>
		</view>
		<!-- 底部操作栏 -->
		<view class="operation">
			<view class="home" @tap="toHome"><text class="iconfont icon-shouye"></text></view>
			<view class="cart" @tap="toCart"><text class="iconfont icon-gouwuche1"></text></view>
			<view class="btns">
				<view class="addcart" :style="'border-color:' + colors + ';color:' + colors" @tap="openSku">加入购物车</view>
				<view class="dingjin" :style="'background:' + colors" @tap="openSku">立 即 购 买</view>
			</view>
		</view>
		<!-- 规格弹出层 -->
		<sku :skuList="nowList" :showModal="showModal" :colors="colors" bottoms="0" @onhide="onhide"></sku>
		<!-- 选择优惠券弹出层 -->
		<view class="mask" catchtouchmove="preventTouchMove" v-if="couponshow == true" @tap="hidecoupon"></view>
		<view class="coupon" :style="'bottom:' + (couponshow == true ? '0px' : '')">
			<scroll-view class="scrolls" scroll-y>
				<coupon :colors="colors" :couponList="couponList" @onReceive="onReceive"></coupon>
			</scroll-view>
		</view>
		<!-- 预览视频弹窗 -->
		<view :class="'previewvideo ' + (showVideo == true ? 'onshowvideo' : '')">
			<view class="close">
				<image src="/static/images/goods/close.png" @tap="closeVideo"></image>
			</view>
			<view class="videos">
				<video class="nowvideos" id="nowVideo" :src="goodsData.videos" :autoplay="showVideo"
					show-center-play-btn="false" show-mute-btn="true" :show-fullscreen-btn="true"></video>
			</view>
		</view>
		<!-- 返回顶部按钮 -->
		<view class="go_top" :style="'right: ' + (scrollShow == true ? '3%' : '-200upx')">
			<view class="ontop" @tap="goTop">
				<image src="/static/images/home/TOP.png"></image>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="center_poter" style="margin: 0 auto;" v-if="shows">
				<poster :posterData="goodsData"></poster>
			</view>
		</uni-popup>
		<loading v-if="isShow == true"></loading>
	</view>
</template>

<script>
	var app = getApp();
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import navBar from '../../commponent/public/navBar';
	import sku from '../../commponent/public/sku';
	import coupon from '../../commponent/public/coupon';
	import loading from '../../commponent/public/loading';
	import poster from '../../commponent/goods/poster.vue';
	import {
		getToken
	} from '@/utils/auth.js';
	export default {
		data() {
			return {
				colors: '',
				shows: false,
				statusBarHeight: app.globalData.statusHeight + 'px',
				toBar: app.globalData.toBar + 'px',
				showdots: false,
				swiperList: [],
				isColl: false,
				latitude: '',
				longitude: '',
				nowList: {},
				goodsData: {
					bigImg: [],
					skus: [{}]
				},
				showModal: false,
				couponshow: false,
				isshowVideo: true,
				voice: false,
				showVideo: false,
				isShow: true,
				couponList: [],
				htmlNode: '',
				// 评论
				goodsEva: [],
				commentCount: 0, // 评论总数
				scrollShow: false
			};
		},

		components: {
			navBar,
			sku,
			coupon,
			loading,
			poster,
			uniPopup
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.setData({
				//设置主题颜色
				colors: app.globalData.newColor
			});
			this.getLocation(); //获取位置信息
			// this.setFrom(this.descriptionStr); //处理商品详情
			this.getProductInfo(options.productId); // 获取商品信息
			this.getProductComment(options.productId); // 获取评论id
			setTimeout(() => {
				this.setData({
					isShow: false
				});
			}, 600);
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {
			this.videoContext = uni.createVideoContext('myVideo');
			this.nowVideo = uni.createVideoContext('nowVideo');
			console.log(this.videoContext);
		},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},

		/**
		 * 生命周期函数--监听页面隐藏
		 */
		onHide: function() {},

		/**
		 * 生命周期函数--监听页面滚动
		 */
		onPageScroll: function(e) {
			if (e.scrollTop >= 400) {
				this.scrollShow = true;
			} else {
				this.scrollShow = false;
			}
		},

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
		onShareAppMessage: function() {
			return {
				title: this.goodsData.name + this.goodsData.subhead,
				path: '/pages/views/goods/goodsDetails?productId=' + this.goodsData.id,
				imageUrl: this.goodsData.img
			};
		},
		/**
		 * 用户点击右上角分享到朋友圈
		 */
		onShareTimeline: function() {
			return {
				title: this.goodsData.name + this.goodsData.subhead,
				path: '/pages/views/goods/goodsDetails?productId=' + this.goodsData.id,
				imageUrl: this.goodsData.img
			};
		},
		methods: {
			getLocation() {
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: res => {
						console.log('获取经纬度成功', res);
						that.setData({
							latitude: res.latitude,
							longitude: res.longitude
						});
					},
					fail: () => {
						console.log('获取经纬度失败');
						that.setData({
							latitude: '',
							longitude: ''
						});
					},
					complete: () => {
						// 解析地址
					}
				});
			},
			setFrom(html) {
				//处理富文本 让图片居中适应
				let newContent = html.replace(/\<img/gi, '<img class="rich-img" ');
				this.setData({
					htmlNode: newContent
				});
			},
			openPoster() {
				//生成海报
				if (!getToken()) {
					return uni.navigateTo({
						url: '/pages/login/login'
					});
				};
				this.shows = false;
				uni.showLoading({
					title: '海报绘制中..'
				});
				this.$refs.popup.open();
				setTimeout(() => {
					uni.hideLoading();
					this.shows = true;
				}, 600);
			},
			setisColl() {
				if (!getToken()) {
					return uni.navigateTo({
						url: '/pages/login/login'
					});
				}
				//收藏与取消收藏
				uni
					.$ajax(
						'/api/product/collection', {
							productId: this.goodsData.id,
							status: this.goodsData.isCollection ? 2 : 1
						},
						'post'
					)
					.then(result => {
						this.goodsData.isCollection = this.goodsData.isCollection ? false : true;
						if (this.goodsData.isCollection) {
							uni.showToast({
								title: '收藏成功',
								icon: 'none'
							});
						} else {
							uni.showToast({
								title: '取消收藏',
								icon: 'none'
							});
						}
					})
					.catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						});
					});
			},
			openMap() {
				//打开地图
				let that = this;
				uni.openLocation({
					latitude: 39.9,
					longitude: 116.4,
					success: e => {}
				});
			},
			nearAddress() {
				if (this.longitude !== '') {
					this.openMap();
				} else {
					const _this = this; // 处理拒绝再次打开调用设置
					uni.getSetting({
						success(res) {
							if (res && res.authSetting && res.authSetting.hasOwnProperty('scope.userLocation')) {
								uni.openSetting({
									success() {
										_this.getLocation();
									}
								});
							}
						}
					});
				}
			},
			onhide() {
				this.showModal = false;
			},
			openSku() {
				this.nowList = this.goodsData;
				this.showModal = true;
			},
			opencoupon() {
				this.couponshow = true;
			},
			hidecoupon() {
				this.couponshow = false;
			},
			toHome() {
				uni.switchTab({
					url: '/pages/views/tabBar/home'
				});
			},

			toCart() {
				uni.switchTab({
					url: '/pages/views/tabBar/cart'
				});
			},

			// 轮播图视频播放
			onplay() {
				this.setData({
					isshowVideo: false
				});
				this.videoContext.play();
			},
			setvoice() {
				//静音
				let voice = !this.voice;
				this.setData({
					voice: voice
				});
			},
			swiperchange(e) {
				if (this.videoContext) {
					if (e.detail.current != 0) {
						this.videoContext.pause();
					} else if (e.detail.current == 0) {
						// #ifdef MP
						if (this.isshowVideo == false) {
							//自动播放
							this.videoContext.play();
						}
						// #endif
					}
				}
			},
			openvideo() {
				//预览视频
				// #ifdef MP-WEIXIN
				this.setData({
					showVideo: true
				});
				setTimeout(() => {
					this.videoContext.pause();
					this.nowVideo.play();
				}, 200);
				// #endif
			},
			closeVideo() {
				//关闭视频
				this.setData({
					showVideo: false
				});
				setTimeout(() => {
					this.nowVideo.stop();
					this.videoContext.play();
				}, 300);
			},
			preview(imgs, index) {
				//预览图片
				uni.previewImage({
					current: index,
					urls: imgs
				});
			},
			goTop() {
				//返回顶部
				uni.pageScrollTo({
					scrollTop: 0
				});
			},
			onReceive(item, index) {
				//领取优惠券
				if (item.isused) {
					return;
				} else {
					uni
						.$ajax('/api/coupon/receive', {
							id: item.id
						}, 'post')
						.then(result => {
							this.couponList[index].isused = true; //领取成功
							uni.showToast({
								title: '领取成功',
								icon: 'none'
							});
						})
						.catch(err => {
							uni.showToast({
								title: 'err',
								icon: 'none'
							});
						});
					
				}
			},
			seeAll() {
				//查看全部评论
				uni.navigateTo({
					url: '/pages/views/goods/goodsEvaluate?productId=' + this.goodsData.id
				});
			},
			// 获取商品详情
			getProductInfo(id) {
				const that = this;
				uni
					.$ajax('/api/product/info', {
						productId: id
					})
					.then(result => {
						that.goodsData = result;
						that.getCoupon();
					})
					.catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						});
					});
			},
			getProductComment(id) {
				uni
					.$ajax('/api/comment/product-list', {
						productId: id,
						page: 1,
						pageSize: 2
					})
					.then(result => {
						this.goodsEva = result.items;
						this.commentCount = result.count;
					})
					.catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						});
					});
			},
			getCoupon() {
				uni
					.$ajax('/api/coupon/list', {
						productSkuId: this.goodsData.skus[0].id
					})
					.then(result => {
						console.log(result);
						this.couponList = result;
					})
					.catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						});
					});
			}
		}
	};
</script>
<style lang="scss" scoped>
	@import './goodsDetails.scss';

	/deep/.rich-img {
		width: 100%;
		height: auto;
	}
</style>
