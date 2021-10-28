<template>
	<!-- 弹出规格选项 -->
	<view class="popup">
		<view class="mask" @touchmove.stop.prevent="moveHandle" v-if="showModal" @tap="onhide"></view>
		<view @touchmove.stop.prevent="moveHandle" :class="'userProfile-box  ' + (showModal==true ? 'shows':'')">
			<button class="btn"  :style="'background:' + colors" hover-class="none" @tap="getUserProfile">授权完善用户信息</button>
		</view>
	</view>
</template>
<script>
	import { setUserInfo } from '../../../utils/auth.js';
	export default {
		data() {
			return {};
		},
		components: {},
		props: {
			colors: {
				type: String
			},
			showModal: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			// 隐藏对话框
			onhide() {
				//隐藏规格对话框
				this.$emit('onhide');
			},
			getUserProfile() {
				this.onhide();
				uni.getUserProfile({
					desc: '用于完善会员资料',
					lang: 'zh_CN',
					success: (res) => {
						const params = {
							avatar: res.userInfo.avatarUrl,
							nickname: res.userInfo.nickName,
							gender: res.userInfo.gender,
							province: res.userInfo.province,
							city: res.userInfo.city,
						}
						for(let key in params) {
							if(!params[key]) {
								delete params[key]
							}
						}
						uni.$ajax('/api/user/updated', params, 'post')
							.then(result => {
								if(result) {
									const userInfo = {
										nickName: res.userInfo.nickName,
										avatarUrl: res.userInfo.avatarUrl
									}
									setUserInfo(userInfo)
									this.$emit('success', userInfo)
								}
							})
							.catch(err => {
								uni.showToast({
									title: err,
									icon: 'none'
								});
							});
						console.log(res);
					}
				})
				
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

	.userProfile-box {
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
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.shows {
		bottom: 0;
		transition: all 0.3s;
	}
	.btn {
		width: 80%;
		height: 80upx;
		background-color: #fa436a;
		text-align: center;
		line-height: 80upx;
		border-radius: 40upx;
		color: #fff;
		font-size: 16px;
	}
</style>
