(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commponent/home/suspension"],{"236b":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{showsever:!1,iconList:[{icon:"icon-sousou",name:"搜索",link:"/pages/views/home/search"},{icon:"icon-kefu",name:"客服",link:"",tel:"123456"}]}},props:{scrollShow:{type:Boolean,default:!1},colors:{type:String}},methods:{onshowsever:function(){var n=!this.showsever;this.setData({showsever:n})},goTop:function(){n.pageScrollTo({scrollTop:0})},jumpServer:function(e){""!==e.link?n.navigateTo({url:e.link}):n.makePhoneCall({phoneNumber:e.tel})}}};e.default=t}).call(this,t("543d")["default"])},"381a":function(n,e,t){"use strict";t.r(e);var o=t("42a1"),a=t("be2d");for(var r in a)"default"!==r&&function(n){t.d(e,n,(function(){return a[n]}))}(r);t("f11b");var u,i=t("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"0fa82f0d",null,!1,o["a"],u);e["default"]=c.exports},"42a1":function(n,e,t){"use strict";var o;t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return o}));var a=function(){var n=this,e=n.$createElement;n._self._c},r=[]},"4b48":function(n,e,t){},be2d:function(n,e,t){"use strict";t.r(e);var o=t("236b"),a=t.n(o);for(var r in o)"default"!==r&&function(n){t.d(e,n,(function(){return o[n]}))}(r);e["default"]=a.a},f11b:function(n,e,t){"use strict";var o=t("4b48"),a=t.n(o);a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/commponent/home/suspension-create-component',
    {
        'pages/commponent/home/suspension-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("381a"))
        })
    },
    [['pages/commponent/home/suspension-create-component']]
]);
