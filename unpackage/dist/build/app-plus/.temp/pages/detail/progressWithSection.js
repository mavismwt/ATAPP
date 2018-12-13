require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([11],{59:function(e,t,s){"use strict";var i=n(s(1)),a=n(s(60));function n(e){return e&&e.__esModule?e:{default:e}}new i.default(a.default).$mount()},60:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=s(62),a=s.n(i),n=s(63);var c=function(e){s(61)},o=s(0)(a.a,n.a,c,null,null);t.default=o.exports},61:function(e,t){},62:function(e,t,s){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var i=s(3);t.default={inject:["reload"],data:function(){return{id:0,process:0,animationDataProcess:"",animationDataPerson:"",showNote:!0,isChanged:!1,schedule:{title:"",type:3,time:{start:0,now:0,end:0},sectionData:[{index:0,name:"",isFinished:!1}],note:""}}},onLoad:function(e){var t=sessionStorage.getItem("ID"),s=(0,i.getOneSchedule)(t);this.id=t,this.schedule=s,this.process=this.schedule.status.status},onReady:function(){var t=e.createAnimation({delay:300,duration:500,timingFunction:"ease"});this.animationDataProcess=t.translateX(1.4*this.process).scaleX(2.8*this.process).step().export(),t=e.createAnimation({delay:300,duration:500,timingFunction:"ease"}),this.animationDataPerson=t.translateX(2.8*this.process).step().export()},onUnload:function(){},methods:{addSection:function(){this.schedule.time.end=this.schedule.time.end+1,this.schedule.sectionData.push({index:this.schedule.time.end,name:"",isFinished:!1})},deleteSection:function(t){var s=this;e.showModal({title:"提示",content:"确定要删除该阶段吗？",success:function(e){e.confirm?(s.schedule.sectionData.splice(t.currentTarget.dataset.id,1),s.schedule.time.end=s.schedule.time.end-1,console.log(s.schedule.time.end)):e.cancel}})},navBack:function(){e.showModal({title:"提示",content:"您还未保存，确定要退出吗？",success:function(t){t.confirm?e.navigateBack():t.cancel}})},backToIndex:function(){(0,i.changeSchedule)(this.id,this.schedule);e.navigateBack(),this.$bus.$emit("change"),e.showToast({title:"保存成功",duration:1500})},deleteSchedule:function(){var t=this;e.showModal({title:"提示",content:"确定删除此任务吗？",success:function(s){if(s.confirm){(0,i.deleteSchedule)(t.id);e.navigateTo({url:"/pages/index/index"}),e.showToast({title:"删除成功",duration:1e3})}else s.cancel}})}}}}).call(t,s(2).default)},63:function(e,t,s){"use strict";var i={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("view",{staticClass:"newProgressPlus"},[s("view",{staticClass:"nav-bar-userset"},[s("image",{staticClass:"nav-bar-userset-back",attrs:{src:"/static/back-arrow.png",eventid:"alp-0"},on:{tap:e.navBack}}),s("image",{staticClass:"nav-bar-userset-sublogo",attrs:{src:"/static/sub-logo.png"}}),s("image",{staticClass:"nav-bar-userset-tick",attrs:{src:"/static/tick.png",eventid:"v9r-1"},on:{tap:e.backToIndex}})]),s("view",{staticClass:"time-process-block"},[s("view",{staticClass:"top-line"},[s("view",{staticClass:"title-line"},[s("input",{staticClass:"red-point"}),s("input",{directives:[{name:"model",rawName:"v-model",value:e.schedule.title,expression:"schedule.title"}],staticClass:"title",attrs:{maxlength:"6",eventid:"HD4-2"},domProps:{value:e.schedule.title},on:{input:function(t){t.target.composing||(e.schedule.title=t.target.value)}}})]),s("view",{staticClass:"time-name"},[e._v(e._s(e.title))]),s("view",{staticClass:"precess-percent"},[e._v(e._s(e.process)+"%")])]),s("view",{staticClass:"all-process"},[s("view",{staticClass:"little-person",attrs:{animation:e.animationDataPerson}},[s("view",{staticClass:"chat-frame"},[s("view",{staticClass:".chat-frame-content"},[e._v(e._s(e.schedule.status.toEnd))]),s("image",{staticClass:"chat-frame-image",attrs:{src:"../../static/chat-gray.png"}})]),s("image",{staticClass:"little-person-image",attrs:{src:"/static/little-person.png"}})]),s("view",{staticClass:"process-bar"},[s("view",{staticClass:"blank-bar"}),s("view",{staticClass:"finish-bar",attrs:{animation:e.animationDataProcess}})])])]),s("view",{staticClass:"sectionView"},[s("view",{staticClass:"addASection",attrs:{eventid:"02v-3"},on:{tap:e.addSection}},[e._v("添加阶段")]),e._l(e.schedule.sectionData,function(t,i){return s("view",{key:t.index,staticClass:"sectionCell",attrs:{"data-id":t.index,eventid:"oka-7-"+i},on:{longpress:e.deleteSection}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"item.name"}],staticClass:"inputSectionName",attrs:{placeholder:"输入阶段名称","placeholder-style":"placeHolder","confirm-type":"Next",eventid:"AUR-4-"+i},domProps:{value:t.name},on:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.addSection(t)},input:function(e){e.target.composing||(t.name=e.target.value)}}}),s("view",{staticClass:"setStatus"},[t.isFinished?s("image",{staticClass:"showStatus1",attrs:{src:"../../static/wancheng-copy.png",eventid:"qoV-5-"+i},on:{tap:function(s){t.isFinished=!t.isFinished,e.isChanged=!0}},model:{value:t.isFinished,callback:function(e){t.isFinished=e},expression:"item.isFinished"}}):e._e(),t.isFinished?e._e():s("image",{staticClass:"showStatus0",attrs:{src:"../../static/yuanhuan.png",eventid:"xon-6-"+i},on:{tap:function(s){t.isFinished=!t.isFinished,e.isChanged=!0}},model:{value:t.isFinished,callback:function(e){t.isFinished=e},expression:"item.isFinished"}})])])})],2),s("view",{staticClass:"addNotes"},[s("view",[e.showNote?s("textarea",{directives:[{name:"model",rawName:"v-model",value:e.schedule.note,expression:"schedule.note"}],staticClass:"Note",attrs:{placeholder:"此处输入备注",eventid:"fVU-8"},domProps:{value:e.schedule.note},on:{input:function(t){t.target.composing||(e.schedule.note=t.target.value)}}}):e._e()])]),s("view",{staticClass:"deleteView"},[s("view",{staticClass:"deleteButton",attrs:{eventid:"vil-9"},on:{tap:e.deleteSchedule}},[e._v("删除任务")]),s("view",{staticClass:"bottomView"})])])},staticRenderFns:[]};t.a=i}},[59]);