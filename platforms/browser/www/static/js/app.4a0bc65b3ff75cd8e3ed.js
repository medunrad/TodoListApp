webpackJsonp([1],{"8AN8":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var i=s("VU/8")({name:"App"},n,!1,function(t){s("8AN8")},null,null).exports,o=s("/ocq"),c={name:"list",data:function(){return{previousAcceleration:{x:0,y:0,z:0},newTask:!1,newTaskText:"",tasksIncomplete:[],tasksComplete:[]}},mounted:function(){document.addEventListener("deviceready",this.onDeviceReady,!1),this.getCompleteTasks(),this.getIncompleteTasks()},watch:{tasks:{handler:function(t,e){},deep:!0}},methods:{setDone:function(t,e){axios.post("http://192.168.0.103:8002/api/v1/tasks/setDone",{id:t,done:e}).then(function(t){return console.log(t)})},log:function(t,e,s){axios.post("http://192.168.0.103:8002/api/v1/tasks/log",{value:t,key:e,name:s}).then(function(t){return console.log(t)})},createNewTask:function(t,e){axios.post("http://192.168.0.103:8002/api/v1/tasks/new",{name:t,done:e}).then(function(t){return console.log(t)})},allDone:function(){axios.post("http://192.168.0.103:8002/api/v1/tasks/allDone",{}).then(function(t){return console.log(t)})},getIncompleteTasks:function(){var t=this;axios.get("http://192.168.0.103:8002/api/v1/tasks/incomplete").then(function(e){t.tasksIncomplete=JSON.parse(e.data.tasks)})},getCompleteTasks:function(){var t=this;axios.get("http://192.168.0.103:8002/api/v1/tasks/complete").then(function(e){t.tasksComplete=JSON.parse(e.data.tasks)})},onDeviceReady:function(){navigator.accelerometer.watchAcceleration(this.onSuccess,this.onError,{frequency:1e3})},onSuccess:function(t){var e={};null!==this.previousAcceleration.x&&(e.x=Math.abs(this.previousAcceleration.x-t.x),e.y=Math.abs(this.previousAcceleration.y-t.y),e.z=Math.abs(this.previousAcceleration.z-t.z)),this.previousAcceleration={x:t.x,y:t.y,z:t.z},e.x+e.y+e.z>15&&(this.allDone(),this.getIncompleteTasks(),this.getCompleteTasks())},onError:function(){},showNewTaskPopup:function(){this.newTask=!0},addNewTask:function(){if(""!==this.newTaskText){var t={name:this.newTaskText,done:!1};this.tasksIncomplete.push(t),this.createNewTask(t.name,t.done),this.log({newTask:!0},"newTask",t.name),this.newTaskText="",this.newTask=!1}},toggleDone:function(t){t.done=!t.done,this.setDone(t.id,t.done),this.log({oldDone:!t.done,newDone:t.done},"changeDone",t.name),!0===t.done?(this.$delete(this.tasksIncomplete,this.tasksIncomplete.indexOf(t)),this.tasksComplete.push(t)):(this.$delete(this.tasksComplete,this.tasksComplete.indexOf(t)),this.tasksIncomplete.unshift(t))}}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"container"},[t.newTask?s("div",{staticClass:"add-container"},[s("div",{staticClass:"add-container-inside"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newTaskText,expression:"newTaskText"}],attrs:{type:"text"},domProps:{value:t.newTaskText},on:{input:function(e){e.target.composing||(t.newTaskText=e.target.value)}}}),t._v(" "),s("div",{staticClass:"add-new-task",on:{click:t.addNewTask}},[t._v("Add")])])]):t._e(),t._v(" "),s("div",{staticClass:"list-container"},[s("transition-group",{staticClass:"task-group-container",attrs:{name:"task-group",tag:"div"}},t._l(t.tasksIncomplete,function(e){return s("div",{key:"task",staticClass:"task"},[s("div",{staticClass:"list-item-inside"},[s("div",{staticClass:"task-title"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"task-active"},[s("div",{staticClass:"checkbox",class:{active:e.done},on:{click:function(s){return t.toggleDone(e)}}})])])])}),0),t._v(" "),t.tasksComplete.length>0?s("span",[t._v("COMPLETE")]):t._e(),t._v(" "),s("transition-group",{staticClass:"task-group-container",attrs:{name:"task-group",tag:"div"}},t._l(t.tasksComplete,function(e){return s("div",{key:"task",staticClass:"task"},[s("div",{staticClass:"list-item-inside"},[s("div",{staticClass:"task-title"},[t._v(t._s(e.name))]),t._v(" "),s("div",{staticClass:"task-active"},[s("div",{staticClass:"checkbox",class:{active:e.done},on:{click:function(s){return t.toggleDone(e)}}})])])])}),0)],1),t._v(" "),s("div",{staticClass:"add-button",staticStyle:{bottom:"55px !important"},on:{click:t.showNewTaskPopup}},[t._v("Add New Task")]),t._v(" "),s("router-link",{staticClass:"add-button",staticStyle:{color:"white","text-decoration":"none"},attrs:{to:"/changeLog"}},[t._v("Change log")])],1)])},staticRenderFns:[]};var l=s("VU/8")(c,r,!1,function(t){s("yNKC")},"data-v-9e42470e",null).exports,d={name:"changeLog",data:function(){return{logs:[]}},mounted:function(){this.getLogs()},methods:{getLogs:function(){var t=this;axios.get("http://192.168.0.103:8002/api/v1/tasks/changeLog").then(function(e){t.logs=JSON.parse(e.data.logs)})}}},u={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"container"},[s("div",{staticClass:"list-container"},[s("transition-group",{staticClass:"task-group-container",attrs:{name:"task-group",tag:"div"}},t._l(t.logs,function(e){return s("div",{key:"task",staticClass:"task"},[s("div",{staticClass:"list-item-inside"},[s("div",{staticClass:"task-title"},[t._v("Task: "+t._s(e.name))]),t._v(" "),"newTask"===e.key?s("div",[s("i",[t._v("task created")])]):s("div",[s("i",[t._v("old: "+t._s(JSON.parse(e.value).oldDone)+", new "+t._s(JSON.parse(e.value).newDone))])])])])}),0)],1),t._v(" "),s("router-link",{staticClass:"add-button",staticStyle:{color:"white","text-decoration":"none"},attrs:{to:"/",class:"add-button"}},[t._v("Tasks")])],1)])},staticRenderFns:[]};var p=s("VU/8")(d,u,!1,function(t){s("oPUW")},"data-v-87798ed2",null).exports;a.a.use(o.a);var v=new o.a({routes:[{path:"/",name:"List",component:l},{path:"/changeLog",name:"ChangeLog",component:p}]});window.axios=s("mtWM"),a.a.config.productionTip=!1,new a.a({el:"#app",router:v,components:{App:i},template:"<App/>"})},oPUW:function(t,e){},yNKC:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.4a0bc65b3ff75cd8e3ed.js.map