<template>
	<view>
		<navBar :showLeft="true" leftBg="#FFFFFF" :showTitle="false"></navBar>
		<view class="login">
			<view class="logo"><image src="../../static/images/login-log.png"></image></view>
			<!-- #ifdef H5 -->
			<view class="login_from">
				<input placeholder="请输入手机号" v-model="tel" type="number" maxlength="11" placeholder-style="color: #515151" />
				<view class="codes">
					<input placeholder="请输入短信验证码" v-model="smscode" maxlength="6" type="number" placeholder-style="color: #515151" />
					<view @click="getCode" :style="{ opacity: isCode == true ? '1' : '0.7' } + ';background:' + colors">{{ codeName }}</view>
				</view>
				<view class="login_btn" @click="onlogin" :style="'background:' + colors">登录</view>
			</view>
			<!-- #endif -->
			<!-- #ifdef MP-WEIXIN -->
			<view class="login_from">
				<button class="login_btn" open-type="getPhoneNumber" :style="'background:' + colors"
					@getphonenumber="getphonenumber">授权登录</button>
			</view>
			<!-- #endif -->
			<view class="explain">
				<text>全球美妆，保真优购</text>
				<!-- 登录即同意
				<view class="">
					<text :style="'color:' + colors">《用户服务协议》</text>
				</view>
				<view class="">
					<text :style="'color:' + colors">《隐私权政策》</text>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
var app = getApp();
import { setUserInfo, setToken } from '../../utils/auth';
import navBar from '../commponent/public/navBar';
export default {
	data() {
		return {
			colors: '',
			isCanUse: uni.getStorageSync('isCanUse'),
			nickName: '',
			avatarUrl: '',
			codeName: '获取验证码',
			isCode: true,
			tel: '',
			smscode: undefined,
			openid: ''
		};
	},
	props: {},

	components: {
		navBar
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
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
		this.wxlogin();
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
		async getphonenumber(e) {
			const _this = this;
			if(e.detail.encryptedData) {
				uni.$ajax('/api/login/wx', {
					openid: _this.openid,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				}, 'post').then((res) => {
					// 保存token
					setToken(res.token);
					//存储用户信息
					let user = {
						avatarUrl: res.avatar || '',
						nickName: res.nickname || ''
					}
					setUserInfo(user)
					uni.hideLoading()
					uni.showToast({
						title: '登陆成功'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 300)
				}).catch(err => {
					return uni.showToast({
						title: err,
						icon: 'none'
					});
				});
			} else {
				return uni.showToast({
					title: '授权登陆失败',
					icon: 'none'
				});
			}
		},
		async onlogin() {
			if (!this.tel || !this.smscode) {
				return uni.showToast({
					title: '手机号或验证码不能为空',
					icon: 'none'
				});
			}
			uni.showLoading({
				title: '登录中...'
			});
			// 登陆
			uni.$ajax(
				'/api/login/phone-login',
				{
					phone: this.tel,
					code: this.smscode
				},
				'post'
			)
				.then(res => {
					// 保存token
					setToken(res.token);
					//存储用户信息
					let user = {
						avatarUrl: res.avatar || 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1635355620,1019286978&fm=26&gp=0.jpg',
						nickName: res.nickname || '木木'
					};
					setUserInfo(user);
					uni.hideLoading();
					uni.showToast({
						title: '登陆成功'
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 300);
				})
				.catch(err => {
					return uni.showToast({
						title: err,
						icon: 'none'
					});
				});
		},
		getCode() {
			//获取用户短信验证码
			if (this.isCode == false) {
				return;
			}
			if (this.tel == '') {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none'
				});
				return;
			}
			if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.tel)) {
				uni.showToast({
					title: '请填写正确手机号码',
					icon: 'none'
				});
				return false;
			}
			this.isCode = false;
			this.getPhoneCode();
		},
		async getPhoneCode() {
			let timer = '';
			let date = 60;
			let that = this;
			uni.$ajax(
				'/api/common/send-sms',
				{
					phone: this.tel
				},
				'post'
			)
				.then(() => {
					uni.showToast({
						title: '验证码发送成功~',
						icon: 'none'
					});
					clearInterval(timer);
					timer = setInterval(() => {
						if (date >= 1) {
							date--;
							that.codeName = date + '秒重试';
						} else {
							that.isCode = true;
							that.codeName = '验证码';
							clearInterval(timer);
						}
					}, 1000);
				})
				.catch(err => {
					return uni.showToast({
						title: err,
						icon: 'none'
					});
				});
		},
		wxlogin() {
			const _this = this;
			uni.login({
				provider: 'weixin',
				success: function(res) {
					uni.$ajax(
						'/api/login/jscode2session',
						{
							code: res.code
						},
						'get'
					).then(res => {
						_this.openid = res.openid;
					});
				}
			});
		}
	}
};
</script>
<style scoped lang="scss">
.login {
	height: 100vh;
	width: 100%;
	background-color: #fff;
	position: absolute;
	top: 0;
}

.logo image {
	height: 520upx;
	width: 100%;
	display: block;
}

.login_from {
	width: 80vw;
	margin: 0 auto;
	margin-top: 10vh;
}

.login_from .codes {
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: space-between;
}

.login_from input {
	height: 80upx;
	line-height: 80upx;
	margin-bottom: 60upx;
	// background-color: rgba(255, 255, 255, 0.8);
	border: 1px solid #dddddd;
	box-sizing: border-box;
	padding: 0 30upx;
	border-radius: 10upx;
	font-size: 24upx;
	color: #333;
}

.codes input {
	width: 70%;
}

.codes view {
	height: 76upx;
	line-height: 80upx;
	width: 150upx;
	margin-bottom: 60upx;
	color: #ffffff;
	background-color: #fa436a;
	text-align: center;
	font-size: 24upx;
	border-radius: 10upx;
}

.login_btn {
	width: 100%;
	height: 80upx;
	margin: 0 auto;
	background-color: #fa436a;
	margin-top: 40px;
	text-align: center;
	line-height: 80upx;
	border-radius: 40upx;
	color: #fff;
}

.login_btn:active {
	opacity: 0.9;
}

.wx-login {
	height: 200upx;
	width: 100%;
	display: block;
	margin: 0 auto;
	margin-top: 120upx;
	border-radius: 50%;
}

.wx-login .login-text {
	text-align: center;
	color: #cccccc;
	font-size: 24upx;
	margin-bottom: 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.wx-login .login-text view {
	width: 160upx;
	height: 1px;
	background-color: #cccccc;
	margin: 0 10upx;
}

.wx-login image {
	height: 100upx;
	width: 100upx;
	display: block;
	z-index: 10;
	margin: 0 auto;
}

.wx-login button {
	width: 100upx !important;
	height: 100upx;
	position: absolute;
	border-radius: 50%;
	text-align: center;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 0;
	z-index: 10;
	padding: 0 !important;
}

.explain {
	width: 100%;
	display: flex;
	font-size: 24upx;
	justify-content: center;
	align-items: center;
	color: #999999;
	position: absolute;
	bottom: 60upx;
}
</style>
