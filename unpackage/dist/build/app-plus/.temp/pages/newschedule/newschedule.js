require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([2],{24:function(e,t,s){"use strict";var r=n(s(1)),a=n(s(25));function n(e){return e&&e.__esModule?e:{default:e}}new r.default(a.default).$mount()},25:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=s(27),a=s.n(r),n=s(28);var o=function(e){s(26)},i=s(0)(a.a,n.a,o,null,null);t.default=i.exports},26:function(e,t){},27:function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default={data:function(){return{scrollHeight:"",itemProperty:[{id:"countDown",title:"倒计日",describe:"重要的时间一定要记录下来",backgroundColor:"rgb(171,216,200)",fontColor:"rgb(131,176,160)"},{id:"progress",title:"进度记录",describe:"追剧、任务进度不遗忘",backgroundColor:"rgb(254,225,168)",fontColor:"rgb(214,185,128)"},{id:"check",title:"打卡计划",describe:"来养成好习惯吧",backgroundColor:"rgb(244,185,146)",fontColor:"rgb(204,145,106)"},{id:"userDefined",title:"自定义",describe:"我的时间我做主",backgroundColor:"rgb(246,196,115)",fontColor:"rgb(206,156,75)"}]}},onLoad:function(){this.scrollHeight=e.getSystemInfoSync().windowHeight+10+"px"},methods:{backToIndex:function(){e.navigateBack()},intoAddPage:function(t){switch(t){case"countDown":e.navigateTo({url:"/pages/newdetail/countDown"});break;case"progress":e.navigateTo({url:"/pages/newProgress/newProgressPlus"});break;case"check":e.navigateTo({url:"/pages/newProgress/newProgress"});break;case"userDefined":e.navigateTo({url:"/pages/newdetail/userDefined"})}}}}}).call(t,s(2).default)},28:function(e,t,s){"use strict";var r={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("view",{staticClass:"newschedule"},[s("view",{staticClass:"nav-bar-userset"},[s("image",{staticClass:"nav-bar-userset-back",attrs:{src:"/static/back-arrow.png",eventid:"yZa-0"},on:{tap:e.backToIndex}}),s("image",{staticClass:"nav-bar-userset-sublogo",attrs:{src:"/static/sub-logo.png"}}),s("view",{staticClass:"nav-bar-userset-add"})]),s("scroll-view",{staticClass:"main-view",style:{height:e.scrollHeight},attrs:{"scroll-y":"true"}},e._l(e.itemProperty,function(t,r){return s("view",{key:t,staticClass:"date-view",style:{backgroundColor:t.backgroundColor},attrs:{"data-id":t.id,eventid:"KDJ-1-"+r},on:{tap:function(s){e.intoAddPage(t.id)}}},[s("view",{staticClass:"typename"},[e._v(e._s(t.title))]),s("view",{staticClass:"typedescribe",style:{color:t.fontColor}},[e._v(e._s(t.describe))])])}))],1)},staticRenderFns:[]};t.a=r}},[24]);