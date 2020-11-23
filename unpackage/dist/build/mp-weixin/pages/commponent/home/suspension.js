(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/commponent/home/suspension"],{"236b":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{showsever:!1,iconList:[{icon:"icon-sousou",name:"搜索",link:"/pages/views/home/search"},{icon:"icon-kefu",name:"客服",link:"",tel:"18811126599"}]}},props:{scrollShow:{type:Boolean,default:!1},colors:{type:String}},methods:{onshowsever:function(){var n=!this.showsever;this.setData({showsever:n})},goTop:function(){n.pageScrollTo({scrollTop:0})},jumpServer:function(e){""!==e.link?n.navigateTo({url:e.link}):n.makePhoneCall({phoneNumber:e.tel})}}};e.default=t}).call(this,t("543d")["default"])},"381a":function(n,e,t){"use strict";t.r(e);var o=t("67ea"),r=t("be2d");for(var u in r)"default"!==u&&function(n){t.d(e,n,(function(){return r[n]}))}(u);t("53b9");var a,c=t("f0c5"),i=Object(c["a"])(r["default"],o["b"],o["c"],!1,null,"7bfc95cc",null,!1,o["a"],a);e["default"]=i.exports},"53b9":function(n,e,t){"use strict";var o=t("78c5"),r=t.n(o);r.a},"67ea":function(n,e,t){"use strict";var o;t.d(e,"b",(function(){return r})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return o}));var r=function(){var n=this,e=n.$createElement;n._self._c},u=[]},"78c5":function(n,e,t){},be2d:function(n,e,t){"use strict";t.r(e);var o=t("236b"),r=t.n(o);for(var u in o)"default"!==u&&function(n){t.d(e,n,(function(){return o[n]}))}(u);e["default"]=r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/commponent/home/suspension-create-component',
    {
        'pages/commponent/home/suspension-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("381a"))
        })
    },
    [['pages/commponent/home/suspension-create-component']]
]);
