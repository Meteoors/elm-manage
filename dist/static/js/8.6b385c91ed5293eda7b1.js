webpackJsonp([8],{Qx8T:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),c=a("exGp"),o=a.n(c),s=a("bBUo"),i=a("i84Q"),l={data:function(){return{tableData:[],totalCount:0,offset:0}},mounted:function(){this.initData()},components:{headTop:s.a},methods:{initData:function(){var t=this;return o()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(i.y)();case 2:1===(a=e.sent).status?t.totalCount=a.count:console.log("获取管理员总数失败"),t.getAdmins();case 5:case"end":return e.stop()}},e,t)}))()},getAdmins:function(){var t=this;return o()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.tableData=[],e.prev=1,e.next=4,Object(i.g)(t.offset);case 4:if(1!==(a=e.sent).status){e.next=9;break}a.data.forEach(function(e){var a={};a.user_name=e.user_name,a.create_time=e.create_time,a.city=e.city,a.admin=e.admin,t.tableData.push(a)}),e.next=10;break;case 9:throw new Error(a.message);case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.log("获取管理员列表失败",e.t0);case 15:case"end":return e.stop()}},e,t,[[1,12]])}))()},currentChange:function(t){this.offset=20*(t-1),this.initData()}}},u={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"adminlist"}},[a("head-top"),t._v(" "),a("div",{staticClass:"wrapper"},[a("el-table",{attrs:{data:t.tableData}},[a("el-table-column",{attrs:{prop:"user_name",label:"姓名",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"create_time",label:"注册日期",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"city",label:"地址",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"admin",label:"权限",align:"center"}})],1)],1),t._v(" "),a("el-pagination",{staticStyle:{"margin-left":"40px","margin-bottom":"40px"},attrs:{"page-size":20,total:t.totalCount,background:"",layout:"prev, pager, next, total"},on:{"current-change":t.currentChange}})],1)},staticRenderFns:[]};var p=a("VU/8")(l,u,!1,function(t){a("vgGZ")},"data-v-2b2d2bc4",null);e.default=p.exports},vgGZ:function(t,e){}});
//# sourceMappingURL=8.6b385c91ed5293eda7b1.js.map