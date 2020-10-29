<template>
	<!--pages/views/tabBar/category.wxml-->
	<view class="category">
		<!-- 搜索 -->
		<view class="search">
			<search class="search_box"></search>
			<!-- <view class="hierarchy" @tap="onswitch"> -->
				<!-- 此处切换二级或三级分类 可根据需求选择一种分类方式 -->
				<!-- <text class="iconfont icon-erji" v-if="classLevel == true" :style="'font-size: 44upx;color:' + colors"></text>
				<text class="iconfont icon-sanji" v-if="classLevel == false" :style="'font-size: 44upx;color:' + colors"></text>
			</view> -->
		</view>
		<!-- 二级类型的分类菜单 -->
		/**
		* hideShow 显示销量与价格筛选条件
		*/
		<twostage :colors="colors" :current="currentTwo" :dataList="dataList" :classList="categoryList" v-if="classLevel == true"
		 :hideShow="true" @setTwo="setTwo"></twostage>
		<!-- 三级类型的分类菜单 -->
		<!-- <threestage :colors="colors" :current="currentThere" :classList="categoryList" :classData="classData" @setThere="setThere"
		 v-if="classLevel == false"></threestage> -->
	</view>
</template>

<script>
	var app = getApp();
	import search from "../../commponent/public/search";
	import twostage from "../../commponent/cate/twostage";
	import threestage from "../../commponent/cate/threestage";

	export default {
		data() {
			return {
				classLevel: true, //控制显示分类菜单  true：二级分类菜单   false：三级分类菜单
				colors: "",
				current: "",
				scrollTop: "",
				categoryList: [],
				classData: [
					{ //三级菜单分类
						name: '奥利奥',
						img: "//img30.360buyimg.com/popshop/jfs/t11845/334/820275483/7333/9f90acff/59f8a38eN8d63b2bc.png"
					}, {
						name: '三只松鼠',
						img: "//img20.360buyimg.com/popshop/jfs/t4702/64/3954700922/7363/12853e7c/5907f2ddN0a96cf54.jpg"
					}, {
						name: '良品铺子',
						img: "//img30.360buyimg.com/popshop/jfs/t3472/26/559250389/5485/27928c27/580da7e0Nb2583823.jpg"
					}, {
						name: '达利园',
						img: "//img20.360buyimg.com/popshop/jfs/t2884/157/722435011/5877/a029e06c/57233313Nbb5585a4.jpg"
					}, {
						name: '稻香村',
						img: "//img30.360buyimg.com/popshop/jfs/t4684/82/3914974292/6978/65085974/5907f2c5N4fbef2f6.jpg"
					}, {
						name: '百草味',
						img: "//img20.360buyimg.com/popshop/jfs/t2887/304/855683637/4953/8cf426e2/572966eeN007d6ad3.jpg"
					}, {
						name: '盼盼',
						img: "//img30.360buyimg.com/popshop/jfs/t2632/87/866057601/8941/50435bf/57296832Nbc33fdaf.jpg"
					}, {
						name: '徐福记',
						img: "//img20.360buyimg.com/popshop/jfs/t27217/50/2596273954/4783/c9a93e75/5c05e719Nd0cb6633.jpg"
					}, 
				],
				// 二级菜单目录
				dataList: [],
				currentTwo: 0,
				currentThere: 0,
				page: 1,
				pageSize: 10
			};
		},

		components: {
			search,
			twostage,
			threestage
		},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.getCategory();
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {
			this.setData({
				colors: app.globalData.newColor
			});
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
			// 获取分类数据
			async getCategory() {
				const result = await uni.$ajax('/api/category/list').catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					});
				});
				this.categoryList = result;
				this.getProducts(result[0].id);
			},
			
			// 获取商品数据
			async getProducts(categoryId) {
				const result = await uni.$ajax('/api/product/list',
					{
						page: this.page, 
						pageSize: this.pageSize,
						categoryId: categoryId
					},
				).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					});
				});
				console.log(result.list);
				this.dataList =this.dataList.concat(result.list);
			},
			
			setCurrent(e) {
				//设置tab
				let index = e.currentTarget.dataset.index;
				let items = e.currentTarget.dataset.item;
				let scrollTop = index * 20;

				if (index <= 2) {
					scrollTop = 0;
				}

				this.setData({
					current: index,
					scrollTop: scrollTop
				});
			},
			onswitch() {
				this.setData({
					classLevel: !this.classLevel
				});
			},
			setThere(item) { //获取选择的三级tab
				console.log(item)
			},
			setTwo(item) { //获取选择的二级tab
				console.log(item.id);
				this.dataList = [];
				this.page = 1;
				this.getProducts(item.id);
			}
		}
	};
</script>
<style scoped lang="scss">
	.category {
		background-color: #ffffff;
		position: fixed;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		top: 0;
		bottom: 0;
	}

	.search {
		padding: 10upx 10upx;
		padding-left: 10upx;
		background-color: #ffffff;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.search_box {
		width: 100%;
	}

	.hierarchy {
		width: 10%;
		height: 60upx;
		font-size: 32upx;
		text-align: right;
	}
</style>
