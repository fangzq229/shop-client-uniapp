<template>
<view>
<view class="editaddress">
		<view class="content">
			<view class="row">
				<view class="nominal">收件人</view>
				<view class="input"><input placeholder="请输入收件人姓名" v-model="consignee" type="text"></input></view>
			</view>
			<view class="row">
				<view class="nominal">电话号码</view>
				<view class="input"><input placeholder="请输入收件人电话号码" v-model="phone" type="number" maxlength="11"></input></view>
			</view>
			<view class="row">
				<view class="nominal">所在地区</view>
				<view class="input selectcity" @tap="openPicker">
          <input placeholder="请选择省市区" disabled type="text" :value="district"></input>
          <image src="/static/images/home/right.png" class="rights"></image>
        </view>
			</view>
			<view class="row">
				<view class="nominal">详细地址</view>
				<view class="input"><textarea class="detailed-address-style" v-model="detailedAddress" auto-height="true" placeholder="输入详细地址"></textarea></view>
			</view>
			<view class="row">
				<view class="nominal" style="color: #999;margin-top: 10upx;">设为默认地址</view>
				<view class="input switch"><switch :color="colors" style="transform:scale(0.8)" @change="switchChange" :checked="isDefault"></switch></view>
			</view>
		</view>
		<view class="save"><view class="btn" :style="'background:' + colors">保存地址</view></view>
    <!-- 省市区选择 -->
    <setcity :show="show" @sureSelectArea="onsetCity" @hideShow="onhideShow"></setcity>
	</view>
	<loading v-if="isShow == true"></loading>
</view>
</template>

<script>
var app = getApp();
import setcity from "../../../commponent/public/setCity/nyz_area_picker";
import loading from "../../../commponent/public/loading";

export default {
  data() {
    return {
      colors: '',
      show: false,
	  id: '',
      consignee: '',
      phone: '',
	  district: '',
      detailedAddress: '',
      isDefault: false,
      isShow: true
    };
  },

  components: {
    setcity,
    loading
  },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	if(options.addressId) {
		this.getAddress(options.addressId);
	}
    this.setData({
      colors: app.globalData.newColor
    });
    setTimeout(() => {
      this.setData({
        isShow: false
      });
    }, 500);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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
	  
	async getAddress(id) {
		const res = await uni.$ajax('/api/address/info?id=' + id).catch((err) => {
			return uni.showToast({
				title: err,
				icon: 'none'
			});
		});
		this.id = res.id;
		this.consignee = res.consignee;
		this.phone =  res.phone;
		this.district = res.district;
		this.detailedAddress = res.detailedAddress;
		this.isDefault = res.isDefault == 2 ? true: false;
	},
    openPicker() {
      this.setData({
        show: true
      });
    },

    onhideShow() {
      this.setData({
        show: false
      });
    },

    onsetCity(e) {
      let data = e.detail.target.dataset;
      this.district = data.province + data.city + data.area;
	  this.setData({
	    show: false
	  });
    },

    switchChange(e) {
      this.setData({
        checked: e.detail.value
      });
    }

  }
};
</script>
<style lang="scss" scoped>
.save {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120upx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.save view {
  display: flex;
}

.save .btn {
  box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
  width: 70%;
  height: 80upx;
  border-radius: 80upx;
  background-color: #f23a3a;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 30upx;
}

.save .btn .icon {
  height: 80upx;
  color: #fff;
  font-size: 30upx;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40upx;
}

.content view {
  display: flex;
}

.content .row {
  width: 92%;
  margin: 0 4%;
  border-bottom: solid 1upx #eee;
}

.content .row .nominal {
  width: 30%;
  height: 80upx;
  font-size: 28upx;
  font-family: Droid Sans Fallback;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  align-items: center;
}

.content .row .input {
  width: 70%;
  padding: 20upx 0;
  align-items: center;
  font-size: 28upx;

}

.content .row .input input {
  font-size: 28upx;
  color: #333333;
}

.content .row .switch {
  justify-content: flex-end;
}

.content .row .input .textarea {
  margin: 20upx 0;
  min-height: 80upx;
}

.content .del_box {
  width: 100%;
  display: block;
  overflow: hidden;
  margin-right: 30upx;
}

.content .del {
  width: 240upx;
  height: 80upx;
  float: right;
  justify-content: center;
  align-items: center;
  font-size: 28upx;
  color: #F23A3A;
  margin: 0 auto;
  margin-top: 50upx;
  border-radius: 38upx;
  background-color: rgba(255, 0, 0, 0.05);
  border-bottom: solid 1upx #eee;
}
.selectcity input{
  width: 90%;
}
.selectcity image{
  width: 40upx;
  height: 40upx;
  float: right;
}
.detailed-address-style{
	font-size: 28upx;
	word-break: break-all;/*属性规定自动换行的处理方法。normal(使用浏览器默认的换行规则。),break-all(允许在单词内换行。),keep-all(只能在半角空格或连字符处换行。)*/
	text-overflow: ellipsis;
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 3;/** 显示的行数 **/
	 overflow: hidden;
}
</style>