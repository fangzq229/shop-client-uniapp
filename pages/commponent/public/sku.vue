<template>
	<!-- 弹出规格选项 -->
	<view class="popup">
		<view class="mask" @touchmove.stop.prevent="moveHandle" v-if="showModal" @tap="onhide"></view>
		<view @touchmove.stop.prevent="moveHandle" :class="'sku ' + (showModal==true ? 'shows':'')" :style="{bottom: showModal == true ? bottoms+'upx': ''}">
			<view class="sku_top">
				<image :src="currentSku.skuSmallImg || nowList.smallImg"  mode="aspectFill" class="top_img"></image>
				<view class="sku_title">
					{{nowList.name}} {{ nowList.subhead }}
				</view>
				<view class="moneys">
					<!-- 这里的价格是选择完规格后计算的价格 -->
					￥{{(Number(currentSku.activityPrice || currentSku.salePrice) * number).toFixed(2)}}
				</view>
				<view class="kucun">
					<!-- 这里的价格是选择完规格后计算的库存 -->
					库存: {{currentSku.activityStock || currentSku.stock}}
				</view>
			</view>
			<block v-if="nowList.skuArr && nowList.skuArr.length !== 0">
				<view class="sku_list">
					<view class="sku_name">
						规格
					</view>
					<view class="sku_tag">
						<button v-for="(item, index) in nowList.skuArr" :key="index" class="tag_s" :class="{'ondisabled': item.disabled == true}"
						 :disabled="item.disabled == true" @tap="setTag(item)" :style="{color: JSON.stringify(currentArr) == JSON.stringify(item) ? colors :'#333333',background:JSON.stringify(currentArr) == JSON.stringify(item) ? '#fff' :'',borderColor:JSON.stringify(currentArr) == JSON.stringify(item) ? colors :''}">
							{{ formatAttr(item) }}
						</button>
					</view>
				</view>
			</block>
			<view class="number">
				<view class="n_left">购买数量</view>
				<view class="n_right">
					<text class="jian" @tap="onreduce">－</text>
					<input :value="number" disabled type="number" maxlength="2" class="inputs"></input>
					<text class="jia" @tap="onadd">＋</text>
				</view>
			</view>
			<view class="btn_box">
				<view class="addcart_btn" :style="'background-color:' + colors" @tap="onsubmit('add')">加入购物车</view>
				<view class="submit" :style="'background-color:' + colors" @tap="onsubmit('pay')">立即购买</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCart,
		setCart,
		setGoodsData,
		getToken
	} from '@/utils/auth.js'
	export default {
		data() {
			return {
				number: 1,
				current: "",
				currentArr: {}, //当前选中的规格
				currentSku: {}, //选择后的规格详情
				update: true,
				nowList: {}
			};
		},
		components: {},
		props: {
			colors: {
				type: String
			},
			showModal: {
				type: Boolean,
				default: false
			},
			skuList: {
				type: Object
			},
			bottoms: {
				type: String,
				default: ''
			}
		},
		computed: {
			skuArr() {
				return this.nowList.skuArr;
			}
		},
		watch: {
			skuList(value) {
				//监听商品规格变化 来清空之前所选的规格
				this.currentArr = value.skuArr.length > 0 ? [ ...value.skuArr[0] ] : [];
				this.nowList = value // 商品对象
			},
			// 选择的数组
			currentArr: { 
			     deep:true, //深度监听设置为 true
			     handler: function(newV,oldV) {
				   // sku 选择
				   if(newV.length > 0) {
						this.searchSku(newV);
				   } else {
					   this.currentSku = this.nowList.skus[0];
				   }
			     }
		   }
		},
		methods: {
			moveHandle() {
				return
			},
			
			// 根据选择条件匹配sku
			searchSku(val) {
				this.currentSku = this.nowList.skus.find(item => {
					return item.attributeJson === JSON.stringify(val);
				}) || {}
			},
			
			// 切换选择
			setTag(attribute) {
				this.currentArr = attribute;
			},
			
			// 格式化属性
			formatAttr(attrs) {
				return attrs.map(i => {
					return i.val
				}).join(' | ')
			},
			
			// 隐藏对话框
			onhide() {
				//隐藏规格对话框
				this.$emit('onhide');
			},

            // 添加数量
			onadd() {
				//加
				let data = this.number + 1;
				this.setData({
					number: data
				});
			},
			
			// 减数量
			onreduce() {
				//减
				if (this.number <= 1) {
					return;
				} else {
					let data = this.number - 1;
					this.setData({
						number: data
					});
				}
			},

			// 确认订单
			async onsubmit(value) {
				// 此处应该判断是否登录 如果没登录 跳转到登录页
				if (!getToken()) {
					uni.navigateTo({ //登录
						url: '/pages/login/login'
					})
					return
				}
				//提交购物车
				if (!this.currentSku.id) { 
					//如果没有选择sku 提示
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					});
				} else {
					//此处应调用接口来添加购物车 现模拟添加到购物车
					let datas = { selectSku: this.currentSku, number: this.number, ...this.nowList };
					if (value == 'add') { 
						//如果是添加购物车
						const res = await uni.$ajax('/api/cart/add', {
							productId: this.nowList.id,
						    productSkuId: this.currentSku.id,
						    quantity: this.number,
						    type: 1
						}, 'post').catch((err) => {
							return uni.showToast({
								title: err,
								icon: 'none'
							});
						});
						uni.showToast({
							title: '加入购物车成功 !',
							icon: 'none'
						});
						uni.setTabBarBadge({
							//给tabBar添加角标
							index: 2,
							text: String(res.count)
						});
					} else { //如果是购买商品
						let goods = []
						goods.push(datas)
						setGoodsData(goods) //存储商品信息和商品规格
						uni.navigateTo({ //提交订单
							url: '/pages/views/order/confirmOrder'
						})
					}
					setTimeout(() => {
						this.$emit('onhide')
					}, 800);
				}
			}
		}
	};
</script>
<style scoped lang="scss">
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
		bottom: 0;
		transition: all 0.3s;
	}

	.sku_top {
		overflow: hidden;
		margin-top: 20upx;
	}

	.sku_top .top_img {
		height: 170upx;
		width: 170upx;
		float: left;
		margin-right: 15upx;
		border-radius: 8upx;
	}

	.sku_top .sku_title {
		font-size: 30upx;
		line-height: 35upx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.sku_top .moneys {
		font-size: 30upx;
		line-height: 40upx;
		overflow: hidden;
		margin-top: 20upx;
		font-weight: bold;
		color: $mycolor;
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
		height: 60upx;
		line-height: 60upx;
		align-items: center;
		padding: 0 20upx;
		text-align: center;
		font-size: 26upx;
		color: #202020;
		background-color: #F5F5F5;
		border: 1upx solid #F5F5F5;
		float: left;
		border-radius: 40upx;
		margin-right: 20upx;
		transition: all 0.2s;
		margin-bottom: 20upx;
		font-weight: 500;

		&::after {
			border: none;
		}
	}

	.number {
		margin-top: 50upx;
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

	.n_right .inputs {
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
		height: 60upx;
		line-height: 60upx;
		border-radius: 42upx;
		font-size: 26upx;
		text-align: center;
		color: #ffffff;
		float: left;
		margin-left: 30upx;
		margin-bottom: 30upx;
	}

	.btn_box .addcart_btn:active {
		opacity: 0.8;
	}

	.btn_box .submit:active {
		opacity: 0.8;
	}

	.ondisabled {
		background-color: #F9F9F9;
		opacity: 0.5;
	}
</style>
