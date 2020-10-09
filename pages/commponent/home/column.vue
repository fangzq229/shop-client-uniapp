<template>
 <view class="column">
    <view class="column_left">
      <image :src="dataList[0].img" @click="goto(dataList[0].url)"></image>
    </view>
    <view class="colum_right">
      <image :src="dataList[1].img" class="right_img" @click="goto(dataList[1].url)"></image>
      <image :src="dataList[2].img" style="margin-top: 12upx" class="right_img" @click="goto(dataList[2].url)"></image>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},
  props: {
	  dataList: {
	    type: Array
	  },
  },
  methods: {
	  goto(url) {
		  console.log(url);
		  uni.navigateTo({
		    url: url
		  });
	  }
  }
};
</script>
<style lang="scss" scoped>
.column{
  height: 400upx;
  width: 94%;
  overflow: hidden;
  margin: 0 3%;
  margin-top: 15upx;
}
.column_left{
  height: 100%;
  width: 40%;
  float: left;
  .left_img{
    width: 100%;
    height: 100%;
    display: block;
  }
}
.colum_right{
  float: right;
  width: 58%;
  .right_img{
    width: 100%;
    height: 196upx;
    display: block;
  }
}
</style>