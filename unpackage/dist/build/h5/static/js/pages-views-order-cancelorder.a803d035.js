(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-views-order-cancelorder"],{4731:function(e,t,a){"use strict";var n=a("4ea4");a("4160"),a("159b"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a("ade3")),o=getApp(),i={data:function(){return{colors:"",remarkList:[{name:"图案不好看"},{name:"性价比太低"},{name:"态度不好"},{name:"价格不合理"},{name:"做工不行"},{name:"物流时间长"},{name:"价格优惠低"},{name:"其他原因"}],data:"",orderId:void 0}},components:{},props:{},onLoad:function(e){this.orderId=e.orderId,this.setData({colors:o.globalData.newColor})},onReady:function(){},onShow:function(){},onHide:function(){},onUnload:function(){},onPullDownRefresh:function(){},onReachBottom:function(){},onShareAppMessage:function(){},methods:{setCurrent:function(e){var t=this.remarkList[e];t.current=!t.current;var a="remarkList["+e+"]";this.setData((0,r.default)({},a,t));var n=[];this.remarkList.forEach((function(e){1==e.current&&n.push(e)})),console.log(n)}}};t.default=i},a2bb:function(e,t,a){"use strict";a.r(t);var n=a("a63e"),r=a("a993");for(var o in r)"default"!==o&&function(e){a.d(t,e,(function(){return r[e]}))}(o);a("c0bf");var i,d=a("f0c5"),c=Object(d["a"])(r["default"],n["b"],n["c"],!1,null,"4d1d443e",null,!1,n["a"],i);t["default"]=c.exports},a63e:function(e,t,a){"use strict";var n;a.d(t,"b",(function(){return r})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return n}));var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"cencal_order"},[a("v-uni-view",{staticClass:"remark"},[a("v-uni-textarea",{attrs:{maxlength:"-1",placeholder:"请在此处输入您的退单理由","placeholder-class":"textarea_p"}})],1),a("v-uni-view",{staticClass:"tag_box"},e._l(e.remarkList,(function(t,n){return a("v-uni-view",{key:n,staticClass:"tag_list",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.setCurrent(n)}}},[a("v-uni-view",{style:"color:"+(1==t.current?"#fff":"")+";background:"+(1==t.current?e.colors:"")+";border:"+(1==t.current?"none":"")},[e._v(e._s(t.name))])],1)})),1),a("v-uni-view",{staticClass:"btns",style:{background:e.colors}},[e._v("确认提交")])],1)},o=[]},a993:function(e,t,a){"use strict";a.r(t);var n=a("4731"),r=a.n(n);for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);t["default"]=r.a},b6b2:function(e,t,a){var n=a("24fb");t=n(!1),t.push([e.i,'uni-page-body[data-v-4d1d443e]{background-color:#f5f5fa}.cencal_order[data-v-4d1d443e]{padding:%?20?% 4%;background-color:#fff}.remark[data-v-4d1d443e]{background-color:#f5f5f5;-webkit-border-radius:%?10?%;border-radius:%?10?%;height:60vw;padding:%?20?%;margin-top:%?20?%}.remark uni-textarea[data-v-4d1d443e]{font-size:%?26?%;color:#797979}.textarea_p[data-v-4d1d443e]{font-size:%?24?%;color:#797979}.tag_box[data-v-4d1d443e]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;margin-top:%?40?%}.tag_box[data-v-4d1d443e]::after{content:"";width:30%}.tag_list[data-v-4d1d443e]{max-width:24%;min-width:24%;text-align:center;margin-bottom:%?30?%}.tag_list uni-view[data-v-4d1d443e]{height:%?60?%;line-height:%?60?%;-webkit-border-radius:%?30?%;border-radius:%?30?%;border:%?1?% solid #ddd;font-size:%?22?%;color:#303030}.btns[data-v-4d1d443e]{width:100%;height:%?80?%;line-height:%?80?%;font-size:%?30?%;color:#fff;text-align:center;margin-top:%?100?%;-webkit-border-radius:%?8?%;border-radius:%?8?%}body.?%PAGE?%[data-v-4d1d443e]{background-color:#f5f5fa}',""]),e.exports=t},c0bf:function(e,t,a){"use strict";var n=a("e560"),r=a.n(n);r.a},e560:function(e,t,a){var n=a("b6b2");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var r=a("4f06").default;r("43615e32",n,!0,{sourceMap:!1,shadowMode:!1})}}]);