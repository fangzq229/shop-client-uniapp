(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/views/order/evaluate"],{"031c":function(t,e,n){},"47a6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n("a34a")),a=n("0703");function o(t){return t&&t.__esModule?t:{default:t}}function i(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=s(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,u=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return i=t.done,t},e:function(t){u=!0,o=t},f:function(){try{i||null==n.return||n.return()}finally{if(u)throw o}}}}function s(t,e){if(t){if("string"===typeof t)return u(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function c(t,e,n,r,a,o,i){try{var s=t[o](i),u=s.value}catch(c){return void n(c)}s.done?e(u):Promise.resolve(u).then(r,a)}function l(t){return function(){var e=this,n=arguments;return new Promise((function(r,a){var o=t.apply(e,n);function i(t){c(o,r,a,i,s,"next",t)}function s(t){c(o,r,a,i,s,"throw",t)}i(void 0)}))}}var f=getApp(),d={data:function(){return{value:5,comment:"",updataImg:[],imgUrl:[],urls:[],colors:"",stars:[{id:1,types:!0,img:"../../../static/images/home/stars.png"},{id:2,types:!0,img:"../../../static/images/home/stars.png"},{id:3,types:!0,img:"../../../static/images/home/stars.png"},{id:4,types:!0,img:"../../../static/images/home/stars.png"},{id:5,types:!0,img:"../../../static/images/home/stars.png"}],starNoImg:"../../../static/images/home/star-no.png",starImg:"../../../static/images/home/stars.png",starValue:5,productDetail:{}}},onLoad:function(t){this.getOrderProdcut(t.orderProductId),this.setData({colors:f.globalData.newColor})},methods:{delImg:function(t){this.imgUrl.splice(t,1),this.updataImg.splice(t,1)},addImg:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(){var n=l(r.default.mark((function n(o){var s,u,c,l,f,d,p;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!(o.tempFiles.length>0)){n.next=28;break}t.showLoading({title:"上传中..."}),s=i(o.tempFiles),n.prev=3,s.s();case 5:if((u=s.n()).done){n.next=20;break}if(c=u.value,c.name,l=c.name.split("."),f=l.length,d=l[f-1],"png"==d||"jpg"==d||"jpeg"==d){n.next=14;break}return t.showToast({title:"图片上传失败,格式错误",icon:"none"}),n.abrupt("return");case 14:return n.next=16,(0,a.pathToBase64)(c.path);case 16:p=n.sent,t.$ajax("/api/common/upload-img64",{data:p,suffix:d},"post").then((function(n){t.hideLoading(),e.urls.push(n.url+"?id="+n.id),e.imgUrl.push(n.img)})).catch((function(e){t.hideLoading(),t.showToast({title:e,icon:"none"})}));case 18:n.next=5;break;case 20:n.next=25;break;case 22:n.prev=22,n.t0=n["catch"](3),s.e(n.t0);case 25:return n.prev=25,s.f(),n.finish(25);case 28:case"end":return n.stop()}}),n,null,[[3,22,25,28]])})));function o(t){return n.apply(this,arguments)}return o}()})},setStar:function(t,e){var n=this;if(0==t.types)for(var r=0;r<=e;r++)console.log(n.stars[r].types),n.stars[r].types=!0,n.stars[r].img=n.starImg;else for(r=e+1;r<n.stars.length;r++)console.log(n.stars[r].types),n.stars[r].types=!1,n.stars[r].img=n.starNoImg;this.$forceUpdate();var a=this.stars.filter((function(t){return 1==t.types}));this.starValue=a.length},submit:function(){if(!this.comment.length)return t.showToast({title:"评论内容不能为空",icon:"none"});var e={content:this.comment,level:this.starValue,imgs:this.urls,orderId:this.productDetail.orderId,orderProductId:this.productDetail.id,productId:this.productDetail.productId,productSkuId:this.productDetail.productSkuId};t.$ajax("/api/comment/add",e,"post").then((function(e){t.showToast({title:"感谢您的评价"}),setTimeout((function(){t.navigateBack(-1)}),1e3)})).catch((function(e){t.showToast({title:e,icon:"none"})}))},getOrderProdcut:function(e){var n=this;t.$ajax("/api/order/product",{orderProductId:e}).then((function(t){n.productDetail=t,console.log(n.productDetail)})).catch((function(e){t.showToast({title:e,icon:"none"})}))}},onShow:function(){}};e.default=d}).call(this,n("543d")["default"])},"5de7":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"7bcf":function(t,e,n){"use strict";n.r(e);var r=n("5de7"),a=n("87be");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("afae"),n("89f6");var i,s=n("f0c5"),u=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,"df7a33c4",null,!1,r["a"],i);e["default"]=u.exports},"87be":function(t,e,n){"use strict";n.r(e);var r=n("47a6"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},"89f6":function(t,e,n){"use strict";var r=n("f8ae"),a=n.n(r);a.a},afae:function(t,e,n){"use strict";var r=n("031c"),a=n.n(r);a.a},f5c1:function(t,e,n){"use strict";(function(t){n("fffe");r(n("66fd"));var e=r(n("7bcf"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},f8ae:function(t,e,n){}},[["f5c1","common/runtime","common/vendor"]]]);