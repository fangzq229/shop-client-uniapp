<template>
<view class="login" :style="'background: url(' + bgImg[imgIndex] + '); background-size: cover;background-repeat:no-repeat; background-position: center;'">
  <view class="logo">
    <!-- <image src="/static/images/log.png"></image> -->
  </view>
  <view class="login_from">
      <input placeholder="请输入手机号" v-model="tel" type="number" maxlength="11" placeholder-style="color: #515151"></input>
      <view class="codes">
      	<input placeholder="请输入短信验证码" v-model="smscode"  maxlength="6" type="number" placeholder-style="color: #515151"></input>
		<view @click="getCode" :style="{opacity: isCode == true ? '1':'0.8'}">{{codeName}}</view>
      </view>
      <view class="login_btn" @click="onlogin">登录</view>
  </view>
  <view class="wxLogin">
      <view>—— 快速登录 ——</view>
      <image src="/static/images/wx.png"></image>
      <!-- #ifdef MP -->
      <button open-type="getUserInfo" @getuserinfo="getUserInfo">1</button>
      <!-- #endif -->
	  <!-- #ifdef H5 -->
	  <button open-type="getUserInfo" @click="onAuthorize"></button>
	  <!-- #endif -->
  </view>
</view>
</template>

<script>
import { setUserInfo,setToken } from "../../utils/auth";
export default {
  data() {
    return {
      isCanUse: uni.getStorageSync('isCanUse'),
      nickName: '',
      avatarUrl: '',
      bgImg: [],
      imgTime: '',
      imgIndex: 0,
	  codeName: '获取验证码',
      isCode: true,
	  tel:'',
	  smscode: undefined
    };
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // #ifdef MP-WEIXIN
    this.wxlogin(); //小程序获取用户code
    // #endif
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setbImg();  //动态切换背景
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.imgTime);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.imgTime);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    getUserInfo() {
      console.log('点了');
      let _this = this;
      uni.getUserInfo({
        provider: 'weixin',
        success: function (infoRes) {
          console.log(infoRes);
          _this.setData({
            nickName: infoRes.userInfo.nickName,
            //昵称
            avatarUrl: infoRes.userInfo.avatarUrl //头像
          });
		  let date = new Date().getTime()
		  setToken(date)  //模拟存储token
          setUserInfo(infoRes.userInfo);  //模拟存储用户信息
          try {
            uni.setStorageSync('isCanUse', 1); //记录是否第一次授权  false:表示不是第一次授权
            uni.switchTab({
              url: '/pages/views/tabBar/home'
            });
          } catch (e) {
            console.log('缓存失败');
          }
        },

        fail(res) {}

      });
    },

    setbImg() {
      clearInterval(this.imgTime);
      let that = this;
      console.log('执行了');
      let imgTime = setInterval(() => {
        let imgIndex = that.imgIndex + 1;
        if (imgIndex >= that.bgImg.length) {
          imgIndex = 0;
        }
        that.setData({
          imgIndex: imgIndex
        });
      }, 15000);
      this.setData({
        imgTime: imgTime
      });
    },
	async onlogin(){
		if(!this.tel || !this.smscode) {
			return uni.showToast({
				title: '手机号或验证码不能为空',
				icon: 'none'
			});
		}
		uni.showLoading({
			title:'登录中...'
		});
		// 登陆
		const res = await uni.$ajax('/api/login/phone-login', {
			phone: this.tel,
			code: this.smscode
		}, 'post').catch(err => {
			return uni.showToast({
				title: err,
				icon: 'none'
			});
		});
		// 保存token
		setToken(res.token);
		//存储用户信息
		let user = {  
			avatarUrl: res.avatar || 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1635355620,1019286978&fm=26&gp=0.jpg',
			nickName: res.nickname || '木木'
		}
		setUserInfo(user)
		setTimeout(()=>{
			uni.hideLoading()
			uni.showToast({
				title:'登陆成功'
			})
		}, 500)
		setTimeout(()=>{
			uni.navigateBack()
		},500)
	},
	getCode() { //获取用户短信验证码
		if(this.isCode == false){
			return
		}
		if (this.tel == '') {
			uni.showToast({
				title: '请输入手机号',
				icon: 'none'
			})
			return
		}
		if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.tel)) {
			uni.showToast({
				title: '请填写正确手机号码',
				icon: 'none'
			});
			return false;
		}
		this.getPhoneCode()
	},
	async getPhoneCode() {
		let timer = ''
		let date = 120
		let that = this
		// 获取手机号
		await uni.$ajax('/api/common/send-sms', {
			phone: this.tel
		}, 'post').catch(err => {
			return uni.showToast({
				title: err,
				icon: 'none'
			});
		});
		if (that.isCode == true) {
			uni.showToast({
				title: '验证码发送成功~',
				icon: 'none'
			})
			clearInterval(timer)
			setInterval(() => {
				if (date >= 1) {
					date--
					that.codeName = date + '秒重试'
					that.isCode = false
				} else {
					that.isCode = true
					that.codeName = '验证码'
					clearInterval(timer)
				}
			}, 1000)
		}
	},
	wxlogin() {
	  // 1.wx获取登录用户code
	  uni.login({
	    provider: 'weixin',
	    success: function (loginRes) {
	      console.log('这是用户的code', loginRes);
	    }
	  });
	},
	onAuthorize(){ //微信公众号授权登录
		uni.showToast({
			title:'对接你的公众号登录方法',
			icon:"none"
		})
	}
  }
};
</script>
<style scoped lang="scss">
.login{
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.6s ease-in-out;
  background-color: #333;
}
.logo image{
  height: 160upx;
  width: 160upx;
  display: block;
  border-radius: 50%;
  margin: 0 auto;
  margin-top: 150upx;
}
.login_from{
  width: 80vw;
  margin: 0 auto;
  margin-top: 10vh;
}
.login_from .codes{
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: space-between;
}
.login_from input{
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
.codes input{
	width: 70%;
}
.codes view{
	height: 80upx;
	line-height: 80upx;
	width: 150upx;
	margin-bottom: 60upx;
	color: #FFFFFF;
	background-color: #fa436a;
	text-align: center;
	font-size: 24upx;
	border-radius: 10upx;
}
.login_btn{
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
.login_btn:active{
  opacity: 0.9;
}
.wxLogin{
  height: 200upx;
  width: 300upx;
  display: block;
  margin: 0 auto;
  border-radius: 50%;
  position: fixed;
  bottom: 5vh;
  left: 50%;
  transform: translateX(-50%);
}
.wxLogin view{
  text-align: center;
  color: #FFFFFF;
  font-size: 24upx;
  margin-bottom: 20upx;
}
.wxLogin image{
  height: 100upx;
  width: 100upx;
  display: block;
  z-index: 10;
  margin: 0 auto;
}
.wxLogin button{
  width: 100upx!important;
  height: 100upx;
  position: absolute;
  border-radius: 50%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  z-index: 10;
  padding: 0!important;
}
</style>