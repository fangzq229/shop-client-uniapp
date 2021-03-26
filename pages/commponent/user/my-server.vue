<template>
	<view class="my_server">
		<list-cell :icons="'iconfont ' + icons" :colors="colors" :rightshow="false">{{ titles }}</list-cell>
		<view class="server_box">
			<view v-for="(item, index) in serverList" :key="index" class="server_list" @tap="jumpLink(item)">
				<view><text :class="'iconfont ' + item.icon" :style="'color:' + colors"></text></view>
				<view class="server_text">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import listCell from './list-cell';
import { getToken } from '@/utils/auth';
export default {
	data() {
		return {};
	},

	components: {
		listCell
	},
	props: {
		serverList: {
			type: Array
		},
		colors: {
			type: String
		},
		titles: {
			type: String,
			default: '我的服务'
		},
		icons: {
			type: String,
			default: 'icon-fuwu'
		}
	},
	methods: {
		jumpLink(row) {
			// 是否登陆
			if (!getToken()) {
				return uni.navigateTo({
					url: '/pages/login/login'
				});
			}
			// 跳转
			if (row.url) {
				uni.navigateTo({
					url: row.url
				});
			}
			if (row.phoneNumber) {
				uni.makePhoneCall({
					phoneNumber: row.phoneNumber
				});
			}
		}
	}
};
</script>
<style scoped lang="scss">
/* 我的服务 */
.my_server {
	background-color: #fff;
	margin-bottom: 20upx;
}

.server_box {
	display: flex;
	align-items: center;
	flex-direction: row;
	flex-wrap: wrap;
	padding-bottom: 30upx;
}
.server_box::after {
	width: 25%;
	content: '';
	border: 1px solid transparent;
}
.server_list {
	max-width: 25%;
	min-width: 25%;
	text-align: center;
	margin-top: 30upx;
}
.server_list:active {
	opacity: 0.8;
}
.server_list text {
	font-size: 46upx;
	line-height: 60upx;
	display: inline-block;
}
.server_text {
	font-size: 24upx;
	color: #3c3c3c;
	margin-top: 15upx;
}
</style>
