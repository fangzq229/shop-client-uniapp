(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-views-user-mypoints"],{"03a2":function(t,e,i){"use strict";var a=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("ef74")),o=getApp(),s={data:function(){return{logList:[{name:"购买商品",type:0,number:18},{name:"兑换商品",type:1,number:18},{name:"兑换商品",type:1,number:18},{name:"兑换商品",type:1,number:18},{name:"兑换商品",type:1,number:18},{name:"兑换商品",type:1,number:18}],isShow:!0,colors:""}},components:{loading:n.default},props:{},onLoad:function(t){var e=this;this.setData({colors:o.globalData.newColor}),uni.setNavigationBarColor({backgroundColor:o.globalData.newColor,frontColor:"#ffffff"}),setTimeout((function(){e.setData({isShow:!1})}),600)},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){},methods:{onexchange:function(){uni.navigateTo({url:"/pages/views/user/exchange/exchange"})}}};e.default=s},"0ced":function(t,e,i){var a=i("6c83");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("d1a061dc",a,!0,{sourceMap:!1,shadowMode:!1})},"33f9":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".mypoints[data-v-6fa637cf]{padding-bottom:%?20?%}.top_box[data-v-6fa637cf]{width:100vw;height:28vw;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:0 4%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.top_box .left .p1[data-v-6fa637cf]{font-size:%?26?%;color:#fff;line-height:%?60?%}.top_box .left .p2[data-v-6fa637cf]{font-size:%?36?%;color:#fff;line-height:%?80?%}.top_box .right[data-v-6fa637cf]{display:-webkit-box;display:-webkit-flex;display:flex}.top_box .right uni-view[data-v-6fa637cf]{height:%?60?%;line-height:%?60?%;padding:0 %?20?%;color:#fff;border:%?1?% solid #fff;-webkit-border-radius:%?40?%;border-radius:%?40?%;margin-top:%?60?%}.jilu[data-v-6fa637cf]{margin:0 4%;padding:%?20?%;-webkit-box-shadow:%?0?% %?0?% %?10?% #aaa;box-shadow:%?0?% %?0?% %?10?% #aaa;-webkit-border-radius:%?10?%;border-radius:%?10?%;margin-top:%?20?%}.jilu_title[data-v-6fa637cf]{display:-webkit-box;display:-webkit-flex;display:flex;height:%?80?%;line-height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:%?1?% solid #eee}.jilu_title .place[data-v-6fa637cf]{width:%?10?%;height:%?50?%;background-color:#3e7e8b;margin-right:%?20?%;-webkit-border-radius:%?15?%;border-radius:%?15?%}.jilu_title .texts[data-v-6fa637cf]{font-size:%?30?%;color:#333;font-weight:500}.jilu_box[data-v-6fa637cf]{min-height:%?220?%;padding-bottom:%?20?%}.jilu_box .jilu_list[data-v-6fa637cf]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:100%;padding:%?20?% 0;border-bottom:%?1?% solid #eee}.jilu_list uni-text[data-v-6fa637cf]{display:block;height:%?50?%;line-height:%?50?%}.daodi[data-v-6fa637cf]{text-align:center;color:#ccc;font-size:%?24?%;margin-top:%?20?%}",""]),t.exports=e},"52e6":function(t,e,i){"use strict";i.r(e);var a=i("03a2"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"61bc":function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"mypoints"},[i("v-uni-view",{staticClass:"top_box",style:"background:"+t.colors},[i("v-uni-view",{staticClass:"left"},[i("v-uni-view",{staticClass:"p1"},[t._v("总积分")]),i("v-uni-view",{staticClass:"p2"},[t._v("1273")])],1),i("v-uni-view",{staticClass:"right"},[i("v-uni-view",{on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.onexchange.apply(void 0,arguments)}}},[t._v("兑换礼品")])],1)],1),i("v-uni-view",{staticClass:"jilu"},[i("v-uni-view",{staticClass:"jilu_title"},[i("v-uni-view",{staticClass:"place",style:"background:"+t.colors}),i("v-uni-view",{staticClass:"texts"},[t._v("消费记录")])],1),i("v-uni-view",{staticClass:"jilu_box"},[t._l(t.logList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"jilu_list"},[i("v-uni-view",{staticClass:"list_left"},[i("v-uni-text",{staticStyle:{color:"#333"}},[t._v(t._s(e.name))]),i("v-uni-text",{staticStyle:{color:"#999","font-size":"24upx"}},[t._v("2020-08-025 19：52")])],1),0==e.type?i("v-uni-view",{staticClass:"list_right",staticStyle:{"font-size":"30upx",color:"#10D3EA"}},[t._v("+"+t._s(e.number))]):t._e(),1==e.type?i("v-uni-view",{staticClass:"list_right",staticStyle:{"font-size":"30upx",color:"#EC1818"}},[t._v("-"+t._s(e.number))]):t._e()],1)})),t.logList.length>=5?i("v-uni-view",{staticClass:"daodi"},[t._v("—— 到底啦 ——")]):t._e(),0==t.logList.length?i("nodata",{attrs:{colors:t.colors,title:"暂无消费记录"}}):t._e()],2)],1)],1),1==t.isShow?i("loading"):t._e()],1)},o=[]},"6c83":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".loading[data-v-1db9e888]{width:100%;height:100%;position:fixed;top:0;left:0;z-index:999;background-color:#fff;opacity:.9}.bg-white[data-v-1db9e888]{width:100%;height:100%}.bg-white uni-image[data-v-1db9e888]{width:100%;height:60%;display:block}",""]),t.exports=e},"73ea":function(t,e,i){"use strict";var a=i("0ced"),n=i.n(a);n.a},"856e":function(t,e,i){"use strict";i.r(e);var a=i("61bc"),n=i("52e6");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("88cf");var s,c=i("f0c5"),r=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"6fa637cf",null,!1,a["a"],s);e["default"]=r.exports},"88cf":function(t,e,i){"use strict";var a=i("ba00"),n=i.n(a);n.a},a4b9:function(t,e,i){"use strict";var a;i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"loading"},[i("v-uni-view",{staticClass:"bg-white"},[i("v-uni-image",{staticClass:"gif-white response",attrs:{src:"https://wpamelia.com/wp-content/uploads/2018/11/ezgif-2-6d0b072c3d3f.gif",mode:"aspectFit"}})],1)],1)},o=[]},b74c:function(t,e,i){"use strict";i.r(e);var a=i("dc4a"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},ba00:function(t,e,i){var a=i("33f9");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("c0cf408a",a,!0,{sourceMap:!1,shadowMode:!1})},dc4a:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{}},components:{},props:{},methods:{}};e.default=a},ef74:function(t,e,i){"use strict";i.r(e);var a=i("a4b9"),n=i("b74c");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("73ea");var s,c=i("f0c5"),r=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,"1db9e888",null,!1,a["a"],s);e["default"]=r.exports}}]);