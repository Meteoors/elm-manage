webpackJsonp([11],{"9WhN":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Dd8w"),r=a.n(n),s=a("Xxa5"),o=a.n(s),i=a("exGp"),u=a.n(i),l=a("bBUo"),c=a("i84Q"),d={data:function(){return{tableData:[],totalCount:0,offset:0}},mounted:function(){this.initData()},components:{headTop:l.a},methods:{initData:function(){var t=this;return u()(o.a.mark(function e(){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(c.z)();case 2:1===(a=e.sent).status?t.totalCount=a.count:console.log("获取订单总数失败"),t.getOrders();case 5:case"end":return e.stop()}},e,t)}))()},getOrders:function(){var t=this;return u()(o.a.mark(function e(){var a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.tableData=[],e.next=3,Object(c.t)(t.offset);case 3:(a=e.sent)instanceof Array&&a.forEach(function(e,a){var n={};n.id=e.id,n.total_amount=e.total_amount,n.status=e.status_bar.title,n.user_id=e.user_id,n.restaurant_name=e.restaurant_name,n.address_id=e.address_id,n.restaurant_id=e.restaurant_id,n.index=a,t.tableData.push(n)});case 5:case"end":return e.stop()}},e,t)}))()},expand:function(t,e){var a=this;return u()(o.a.mark(function n(){return o.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e.length>1&&e.shift(),1===e.length&&a.getExpandData(t);case 2:case"end":return n.stop()}},n,a)}))()},getExpandData:function(t){var e=this;return u()(o.a.mark(function a(){var n,s,i;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Object(c.E)(t.user_id);case 2:return n=a.sent,a.next=5,Object(c.d)(t.address_id);case 5:return s=a.sent,a.next=8,Object(c.v)(t.restaurant_id);case 8:i=a.sent,e.tableData.splice(t.index,1,r()({},t,{user_name:n.username,address:s.address,restaurant_address:i.address}));case 10:case"end":return a.stop()}},a,e)}))()},currentChange:function(t){this.offset=20*(t-1),this.initData()}}},p={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"orderlist"}},[a("head-top"),t._v(" "),a("div",{staticClass:"table-wrapper"},[a("el-table",{attrs:{data:t.tableData,"row-key":function(t){return t.index}},on:{"expand-change":t.expand}},[a("el-table-column",{attrs:{type:"expand"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-form",{staticClass:"form",attrs:{"label-position":"left",inline:""}},[a("el-form-item",{attrs:{label:"用户名"}},[a("span",[t._v(t._s(e.row.user_name))])]),t._v(" "),a("el-form-item",{attrs:{label:"店铺名称"}},[a("span",[t._v(t._s(e.row.restaurant_name))])]),t._v(" "),a("el-form-item",{attrs:{label:"收货地址"}},[a("span",[t._v(t._s(e.row.address))])]),t._v(" "),a("el-form-item",{attrs:{label:"店铺 ID"}},[a("span",[t._v(t._s(e.row.restaurant_id))])]),t._v(" "),a("el-form-item",{attrs:{label:"店铺地址"}},[a("span",[t._v(t._s(e.row.restaurant_address))])])],1)]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"id",label:"订单 ID",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"total_amount",label:"总价格",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"订单状态",align:"center"}})],1)],1),t._v(" "),a("el-pagination",{staticStyle:{"margin-left":"40px","margin-bottom":"40px"},attrs:{background:"",layout:"prev, pager, next, total",total:t.totalCount,"page-size":20},on:{"current-change":t.currentChange}})],1)},staticRenderFns:[]};var f=a("VU/8")(d,p,!1,function(t){a("JC39")},"data-v-0b154123",null);e.default=f.exports},JC39:function(t,e){}});
//# sourceMappingURL=11.a0d05c75122822f21318.js.map