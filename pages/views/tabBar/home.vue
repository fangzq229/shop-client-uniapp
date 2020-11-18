<template>
	<view class="home">
		<!-- 顶部 -->
		<headers :colors="colors" :locations="locations" :swiperList="swiperList"></headers>
		<!-- 推荐分类菜单 与tab分类中不同 -->
		<classList :categoryList="categoryList"></classList>
		<!-- 公告 -->
		<notice :colors="colors" :noticeList="noticeList"></notice>
		<!-- 栏目专题 -->
		<column :dataList="columnList"></column>
		<!-- 广告图 -->
		<!-- <banner></banner> -->
		<!-- 热门标题 -->
		<hotstitle :colors="colors"></hotstitle>
		<!-- 推荐商品列表 -->
		<recommend :colors="colors" :modes="false" :dataList="dataList" :loading="loading" bottoms="100"></recommend>
		<!-- 右侧悬浮菜单栏 -->
		<suspension :scrollShow="scrollShow" :colors="colors"></suspension>
	</view>
</template>

<script>
var app = getApp();
import headers from '../../commponent/home/header';
import classList from '../../commponent/home/classList';
import notice from '../../commponent/home/notice';
import column from '../../commponent/home/column';
import banner from '../../commponent/home/banner';
import hotstitle from '../../commponent/home/hotstitle';
import recommend from '../../commponent/home/recommend';
import suspension from '../../commponent/home/suspension';
import { getlocation, getToken } from '@/utils/auth.js';
export default {
	data() {
		return {
			colors: '',
			scrollShow: false, //是否显示悬浮菜单
			categoryList: [],
			// 商品列表
			page: 1,
			pageSize: 10,
			dataList: [],
			locations: {},
			loading: true,
			columnList: [],
			swiperList: [],
			noticeList: [
				{
					id: 1,
					title: '甜品港湾,恬美生活'
				},
				{
					id: 2,
					title: '将来有太多未知的甜等待你去尝试'
				}
			]
		};
	},
	components: {
		headers,
		classList,
		notice,
		column,
		banner,
		hotstitle,
		recommend,
		suspension
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		if(getToken()){
			this.setTabBarBadge();
		}
		this.setData({
			colors: app.globalData.newColor
		});
		uni.setNavigationBarColor({
			//设置标题栏颜色
			backgroundColor: app.globalData.newColor,
			frontColor: '#ffffff'
		});
		// #ifdef H5
		let locations = getlocation(); //获取位置信息
		if (locations && locations.latlng) {
			this.locations = locations;
		}
		// #endif

		// 获取首页配置数据
		this.getHomeData();
		// 获取热销商品
		this.getHostProduct()
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
	onReachBottom: function() {
		if(this.loading) {
			this.page = this.page + 1;
			this.getHostProduct();
		}
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {},
	methods: {
		onPageScroll: function(e) {
			if (e.scrollTop >= 500) {
				this.setData({
					scrollShow: true
				});
			} else {
				this.setData({
					scrollShow: false
				});
			}
		},

		// 获取首页配置数据
		async getHomeData() {
			const result = await uni.$ajax('/api/home/index', {}).catch(err => {
				uni.showToast({
					title: err,
					icon: 'none'
				});
			});
			// 轮播图
			this.swiperList = result.banner;
			// 推荐类
			this.categoryList = result.category;
			// 栏目专题
			this.columnList = result.recommend;
		},
		
		// 获取热销商品
		async getHostProduct() {
			if(this.page === 1) { 
				this.dataList = [];
			};
			uni.$ajax('/api/product/list', 
				{
					page: this.page, 
					pageSize: this.pageSize,
				},
			).then((result) => {
				if(result.list.length === 0 || result.list.length < this.pageSize ) {
					this.loading = false;
				}
				this.dataList =this.dataList.concat(result.list);
			}).catch(err => {
				uni.showToast({
					title: err,
					icon: 'none'
				});
			});
		}
	}
};
</script>
<style scoped lang="scss">
.home {
	margin-bottom: 40rpx;
}
</style>
