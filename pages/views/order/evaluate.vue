<template>
	<view>
		<view class="evaluate">
			<view class="goods_data">
				<image :src="productDetail.smallImage" mode="aspectFill"></image>
				<view class="right">
					<p class="goods_name">{{ productDetail.name }} {{ productDetail.subhead }}</p>
					<p class="goods_sku">{{ productDetail.goods_sku_text }}</p>
					<p class="goods_price">
						<text style="font-size: 24upx;">数量x{{ productDetail.quantity }}</text>
						<text :style="{ color: colors }">￥{{ productDetail.salePrice }}</text>
					</p>
				</view>
			</view>
			<view class="Rate">
				<p>整体评价</p>
				<view class="star"><image :src="item.img" mode="" v-for="(item, index) in stars" :key="index" @click="setStar(item, index)"></image></view>
			</view>
			<view class="pingjia_box"><textarea placeholder="请输入您的评价..." maxlength="-1" v-model="comment" /></view>
			<p class="youhui" style="border-bottom: none;">
				<text class="text1">上传图片</text>
				<text class="text3">(最多3张)</text>
			</p>
			<view class="img_box">
				<view class="img_list" v-for="(item, index) in imgUrl" :key="index">
					<image :src="item" class="imgs" mode="aspectFit"></image>
					<image src="/static/images/close1.png" mode="aspectFit" class="close" @tap="delImg(index)"></image>
				</view>
				<view class="addImg" @tap="addImg" v-if="imgUrl.length < 3">
					<image src="/static/images/shexiang.png" mode=""></image>
					<p>添加图片</p>
				</view>
			</view>
		</view>
		<view class="btns" :style="{ background: colors }" @click="submit">提交评价</view>
	</view>
</template>
<script>
var app = getApp();
import { pathToBase64, base64ToPath } from '@/utils/image-tools.js'
export default {
	data() {
		return {
			value: 5,
			comment: '',
			updataImg: [],
			imgUrl: [],
			urls: [],
			colors: '',
			stars: [
				{ id: 1, types: true, img: '../../../static/images/home/stars.png' },
				{ id: 2, types: true, img: '../../../static/images/home/stars.png' },
				{ id: 3, types: true, img: '../../../static/images/home/stars.png' },
				{ id: 4, types: true, img: '../../../static/images/home/stars.png' },
				{ id: 5, types: true, img: '../../../static/images/home/stars.png' }
			],
			starNoImg: '../../../static/images/home/star-no.png',
			starImg: '../../../static/images/home/stars.png',
			starValue: 5,
			productDetail: {}
		};
	},
	onLoad(options) {
		this.getOrderProdcut(options.orderProductId);
		this.setData({
			colors: app.globalData.newColor
		});
	},
	methods: {
		delImg(index) {
			//删除图片
			this.imgUrl.splice(index, 1);
			this.updataImg.splice(index, 1);
		},
		addImg() {
			let that = this;
			uni.chooseImage({
				//该方法是调出选择图片的方法
				count: 1, //数量限制
				sizeType: ['original', 'compressed'], //可选 原图 或缩略图
				sourceType: ['album', 'camera'], //从相册选择
				success: async res => {
					if (res.tempFiles.length > 0) {
						uni.showLoading({
							title: '上传中...'
						});
						for (let item of res.tempFiles) {
							let name = item.name;
							let names = item.name.split('.');
							let leng = names.length;
							let suffix = names[leng - 1];
							if (suffix != 'png' && suffix != 'jpg' && suffix != 'jpeg') {
								uni.showToast({
									title: '图片上传失败,格式错误',
									icon: 'none'
								});
								return;
							}
							// 获取base64
							let base = await pathToBase64(item.path);
							uni.$ajax('/api/common/upload-img64', {
								data: base,
								suffix: suffix
							}, 'post').then((res) => {
								uni.hideLoading()
								this.urls.push(res.url + '?id=' + res.id);
								this.imgUrl.push(res.img);
							}).catch((err) => {
								uni.hideLoading()
								uni.showToast({
									title: err,
									icon: 'none'
								});
							})
						}
					}
				}
			});
		},
		setStar(item, index) {
			let that = this;
			if (item.types == false) {
				for (var i = 0; i <= index; i++) {
					console.log(that.stars[i].types);
					that.stars[i].types = true;
					that.stars[i].img = that.starImg;
				}
			} else {
				for (var i = index + 1; i < that.stars.length; i++) {
					console.log(that.stars[i].types);
					that.stars[i].types = false;
					that.stars[i].img = that.starNoImg;
				}
			}
			this.$forceUpdate();
			let value = this.stars.filter(e => {
				return e.types == true;
			});
			this.starValue = value.length;
		},
		// 获取订单商品信息
		getOrderProdcut(id) {
			uni.$ajax('/api/order/product', { orderProductId: id })
				.then(result => {
					this.productDetail = result;
					console.log(this.productDetail);
				})
				.catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					});
				});
		}
	},
	onShow() {}
};
</script>

<style lang="scss" scoped>
.evaluate {
	margin: 0 4%;
	background-color: #ffffff;
	box-shadow: 0upx 0upx 10upx #dddddd;
	border-radius: 8upx;
	position: relative;
	top: 20upx;
	.goods_data {
		padding: 20upx 30upx;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		overflow: hidden;
		image {
			width: 120upx;
			height: 120upx;
			border-radius: 8upx;
		}
		.right {
			margin-left: 20upx;
			width: 80%;
			.goods_name {
				font-size: 24upx;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.goods_sku {
				font-size: 24upx;
				color: #999999;
				margin-top: 5upx;
			}
			.goods_price {
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28upx;
				text-align: right;
				color: #999;
				margin-top: 5upx;
			}
		}
	}
	.Rate {
		padding: 0upx 30upx 30upx;
		background-color: #ffffff;
		border-bottom: 1upx solid #eee;
		p {
			height: 60upx;
			line-height: 60upx;
			font-size: 30upx;
			color: #333;
		}
		.star {
			margin-top: 30upx;
			display: flex;
			align-items: center;
			margin-left: 20upx;
			image {
				height: 40upx;
				width: 40upx;
				display: inline-block;
				margin-right: 20upx;
			}
		}
	}
	.pingjia_box {
		min-height: 300upx;
		box-sizing: border-box;
		background-color: #ffffff;
		padding: 20upx 30upx;
		border-bottom: 1upx solid #eee;
		p {
			font-size: 28upx;
			color: #999;
			margin-bottom: 20upx;
		}
		textarea {
			min-height: 200upx;
			width: 100%;
			border-radius: 8upx;
			overflow: hidden;
			padding: 0 20upx;
			box-sizing: border-box;
			font-size: 26upx;
		}
	}
}
.btns {
	width: 80%;
	margin: 0 auto;
	border-radius: 10upx;
	height: 80upx;
	color: #ffffff;
	font-size: 30upx;
	line-height: 80upx;
	text-align: center;
	margin-top: 100upx;
	margin-bottom: 50upx;
}
.used {
	overflow: hidden;
	background-color: #ffffff;
	margin-top: 20upx;
}
.historylist {
	background-color: #ffffff;
	padding: 30upx;
	border-radius: 15upx;
	.left {
		height: 160upx;
		border-radius: 8upx;
		overflow: hidden;
		width: 200upx;
		position: relative;
		float: left;
		.fm {
			height: 160upx;
			width: 200upx;
		}
		.zzc {
			height: 140upx;
			width: 180upx;
			position: absolute;
			background-color: rgba($color: #000000, $alpha: 0.4);
			top: 0;
			left: 0;
		}
		.bf {
			height: 30upx;
			width: 30upx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
	.right {
		padding-left: 20upx;
		overflow: hidden;
		.p1 {
			font-size: 28upx;
			color: #000;
			height: 50upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.p2 {
			width: 60upx;
			float: left;
			.text1 {
				font-size: 32upx;
				color: rgba(255, 94, 102, 1);
				font-weight: bold;
			}
			.text2 {
				font-size: 24upx;
				color: rgba(255, 94, 102, 1);
				margin-left: 10upx;
			}
		}
		.p3 {
			// float: right;
			margin-top: 10upx;
			margin-bottom: 10upx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			image {
				height: 30upx;
				width: 30upx;
				float: left;
			}
			text {
				font-size: 24upx;
				color: #a1a1a1;
				margin-left: 10upx;
				float: left;
			}
		}
		.p4 {
			width: 100%;
			overflow: hidden;
			height: 60upx;
			padding-top: 20upx;
			.text1 {
				padding: 6upx 16upx;
				border: 1px solid #f64031;
				color: rgba(255, 94, 102, 1);
				width: 160upx;
				font-weight: bold;
				float: left;
				height: 60upx;
				text-align: center;
				line-height: 50upx;
				box-sizing: border-box;
				border-radius: 15upx;
				font-size: 24upx;
				background-color: #ffffff;
				margin-left: 80upx;
			}
			.text2 {
				padding: 6upx 16upx;
				border: 1px solid rgba(255, 94, 102, 1);
				color: rgba(255, 94, 102, 1);
				width: 160upx;
				float: right;
				font-weight: bold;
				height: 60upx;
				text-align: center;
				line-height: 50upx;
				box-sizing: border-box;
				border-radius: 15upx;
				font-size: 24upx;
				background-color: #ffffff;
			}
		}
	}
	.top {
		/deep/.van-cell {
			padding: 0;
		}
		/deep/.van-cell__value {
			text-align: left;
			font-size: 30upx;
			color: #000000;
			font-weight: bold;
			margin-left: 20upx;
		}
		margin-bottom: 20upx;
		image {
			width: 50upx;
			height: 50upx;
			float: left;
			border-radius: 50%;
			transform: translateY(-5upx);
		}
	}
}
.youhui {
	height: 40upx;
	line-height: 40upx;
	padding: 20upx 30upx;
	border-bottom: 1upx solid #f2f2f2;
	box-sizing: content-box;
	.text1 {
		font-size: 28upx;
		color: #333333;
	}
	.text2 {
		float: right;
		color: #999999;
		font-size: 28upx;
		margin-right: 5upx;
		margin-top: 2upx;
	}
	.text3 {
		font-size: 24upx;
		color: #999999;
		margin-left: 10upx;
	}
	image {
		float: right;
		width: 12upx;
		height: 22upx;
		margin-top: 12upx;
		margin-left: 10upx;
	}
}
.img_box {
	overflow: hidden;
	padding: 20upx 30upx;
	.addImg {
		width: 184upx;
		height: 184upx;
		background: #f2f2f2;
		// background-color: pink;
		border-radius: 20upx;
		overflow: hidden;
		transition: all 0.3s;
		image {
			width: 51upx;
			height: 42upx;
			display: block;
			margin: 0 auto;
			margin-top: 45upx;
		}
		p {
			font-size: 24upx;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: rgba(255, 94, 102, 1);
			text-align: center;
			margin-top: 20upx;
		}

		&:active {
			transform: scaleX(0.96);
		}
	}
}
.img_list {
	width: 184upx;
	height: 184upx;
	border-radius: 20upx;
	float: left;
	margin-right: 20upx;
	position: relative;
	.imgs {
		width: 100%;
		height: 100%;
		display: block;
		border-radius: 20upx;
	}
	.close {
		width: 40upx;
		height: 40upx;
		position: absolute;
		top: 0upx;
		right: 0upx;
	}
}
</style>
<style>
page {
	background-color: #f8f8f8;
}
</style>
