<template>
<view class="content">
		<view class="search-box">
			<view class="input-box">
				<input type="text" adjust-position="true" v-model="keyword" placeholder="请输入您想搜索的内容" placeholder-class="search_text" @confirm="doSearch" data-key="false" confirm-type="search"></input>
				<!-- <image src="/static/images/search/close.png" mode="aspectFill" @tap="clears" v-if="shows == true"></image> -->
			</view>
			<view class="search-btn" @tap="doSearch" data-key="false" :style="'background:' + colors">搜索</view> 
		</view>
		<view class="search-keyword">
			<view class="">
				<scroll-view class="keyword-box" scroll-y>
					<view class="keyword-block" v-if="oldKeywordList.length>0">
						<view class="keyword-list-header">
							<view>历史搜索</view>
							<view>
								<image @tap="oldDelete" src="/static/images/search/delete.png"></image>
							</view>
						</view>
						<view class="keyword">
							<view v-for="(item, index) in oldKeywordList" :key="index" @tap="ondoSearch(item)">{{item}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="">
				<scroll-view class="keyword-box" scroll-y>
					<view class="keyword-block" v-if="hotKeywordList.length>0">
						<view class="keyword-list-header">
							<view>热门搜索</view>
						</view>
						<view class="keyword">
							<view v-for="(item, index) in hotKeywordList" :key="index" @tap="ondoSearch(item)">{{item}}</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
</view>
</template>

<script>
var app = getApp();
export default {
  data() {
    return {
      defaultKeyword: "",
      keyword: "",
      oldKeywordList: [],
      hotKeywordList: [],
      forbid: '',
      isShowKeywordList: false,
      shows: false,
      colors: ''
    };
  },

  components: {},
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      colors: app.globalData.newColor
    });
    this.init();
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
  methods: {
    init() {
	  // 历史搜索记录本地缓存
      this.loadOldKeyword();
	  // 热门搜索记录
	  uni.$ajax('/api/product/keyword').then((result) => {
		  this.hotKeywordList = result.map(item => {
			  return item.keyword;
		  })
	  }).catch(err => {
		  uni.showToast({
		  	title: '获取热门搜索失败',
			icon: 'none'
		  })
	  });
    },

    //加载历史搜索,自动读取本地Storage
    loadOldKeyword() {
      uni.getStorage({
        key: 'OldKeys',
        success: res => {
          var OldKeys = JSON.parse(res.data);
          this.setData({
            oldKeywordList: OldKeys
          });
        }
      });
    },

    doSearch() {
      if (this.keyword == '') {
        uni.showToast({
          title: '请输入要搜索的内容',
          icon: 'none'
        });
        return;
      }
      if (this.keyword && this.keyword !== '') {
        this.saveKeyword(this.keyword); //保存为历史
      }
	  // 跳转商品搜索页面
	  uni.navigateTo({
	    url: '/pages/views/home/classList?search=' + this.keyword
	  });
    },

    //保存关键字到历史记录
    saveKeyword(keyword) {
      uni.getStorage({
        key: 'OldKeys',
        success: res => {
          var OldKeys = JSON.parse(res.data);
          var findIndex = OldKeys.indexOf(keyword);

          if (findIndex == -1) {
            OldKeys.unshift(keyword);
          } else {
            OldKeys.splice(findIndex, 1);
            OldKeys.unshift(keyword);
          } //最多10个纪录
          OldKeys.length > 10 && OldKeys.pop();
          uni.setStorage({
            key: 'OldKeys',
            data: JSON.stringify(OldKeys)
          });
          this.setData({
            oldKeywordList: OldKeys //更新历史搜索

          });
        },
        fail: e => {
          var OldKeys = [keyword];
          uni.setStorage({
            key: 'OldKeys',
            data: JSON.stringify(OldKeys)
          });
          this.setData({
            oldKeywordList: OldKeys //更新历史搜索

          });
        }
      });
    },

    oldDelete() {
      uni.showModal({
        content: '确定清除历史搜索记录？',
        success: res => {
          if (res.confirm) {
            console.log('用户点击确定');
            this.setData({
              oldKeywordList: []
            });
            uni.removeStorage({
              key: 'OldKeys'
            });
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
    // clears() {
    //   this.setData({
    //     keyword: '',
    //     keywordList: [],
    //   });
    // },
    ondoSearch(item) { //点击历史记录搜索
		// 跳转商品搜索页面
		uni.navigateTo({
		  url: '/pages/views/home/classList?search=' + item
		});
    }
  }
};
</script>
<style scoped lang="scss">
	view{display:block;}
	.search-box {background-color:rgb(242,242,242);padding:15upx 2.5%;display:flex;justify-content:space-between;position:sticky;top: 0;}
	.search-box .mSearch-input-box{width: 100%;}
	.search-box .input-box {width:85%;flex-shrink:1;display:flex;justify-content:center;align-items:center;}
	.search-box .search-btn {width:15%;margin:0 0 0 2%;display:flex;justify-content:center;align-items:center;flex-shrink:0;font-size:24upx;color:#fff;background:linear-gradient(to right,#4492EB,#3F92EE);border-radius:60upx;}
	.search-box .input-box>input {width:95%;height:60upx;font-size:24upx;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin:0;background-color:#ffffff;}
	.placeholder-class {color:#9e9e9e;}
	.search-keyword {width:100%;background-color:rgb(242,242,242);}
	.keyword-list-box {height:calc(100vh - 110upx);padding-top:10upx;border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-entry-tap {background-color:#eee;}
	.keyword-entry {width:94%;height:80upx;margin:0 3%;font-size:30upx;color:#333;display:flex;justify-content:space-between;align-items:center;border-bottom:solid 1upx #e7e7e7;}
	.keyword-entry image {width:60upx;height:60upx;}
	.keyword-entry .keyword-text,.keyword-entry .keyword-img {height:80upx;display:flex;align-items:center;}
	.keyword-entry .keyword-text {width:90%;}
	.keyword-entry .keyword-img {width:10%;justify-content:center;}
	.keyword-box {border-radius:20upx 20upx 0 0;background-color:#fff;}
	.keyword-box .keyword-block {padding:10upx 0;}
	.keyword-box .keyword-block .keyword-list-header {width:94%;padding:20upx 3%;font-size:27upx;color:#333;display:flex;justify-content:space-between;}
	.keyword-box .keyword-block .keyword-list-header image {width:30upx;height:30upx;}
	.keyword-box .keyword-block .keyword {width:94%;padding:3px 3%;display:flex;flex-flow:wrap;justify-content:flex-start;}
	.keyword-box .keyword-block .hide-hot-tis {display:flex;justify-content:center;font-size:28upx;color:#6b6b6b;}
  .keyword-box .keyword-block .keyword>view {display:flex;justify-content:center;align-items:center;border-radius:38upx;padding:0 20upx;margin:10upx 20upx 10upx 0;height:60upx;font-size:24upx;background-color:rgb(242,242,242);color:#6b6b6b;line-height: 60upx;}
  .search_text{
		font-size: 24upx;
		color: #B6B6C6;
	}
	.input-box{
		position: relative;
		height: 60upx;
		font-size: 24upx;
		border: 0;
		border-radius: 60upx;
		-webkit-appearance: none;
		appearance: none;
		padding: 0 3%;
		margin: 0;
		background-color: #ffffff;
  }
  .input-box image{
    height: 40upx;
    width: 40upx;
    float: right;
    position: absolute;
    right: 2%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
  }
</style>