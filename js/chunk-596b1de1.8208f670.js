(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-596b1de1"],{7769:function(e,t,r){"use strict";r.r(t);r("a4d3"),r("e01a");var c=r("7a23"),n={key:1},o={class:"breadcrumb-wrap"},a=Object(c["i"])("История"),i={class:"row"},d={class:"col s12 m6"},s={class:"card-content white-text"},b={key:2,class:"center"};function u(e,t,r,u,l,j){var O=Object(c["H"])("Loader"),p=Object(c["H"])("router-link");return Object(c["z"])(),Object(c["f"])("div",null,[l.loading?(Object(c["z"])(),Object(c["d"])(O,{key:0})):l.record?(Object(c["z"])(),Object(c["f"])("div",n,[Object(c["g"])("div",o,[Object(c["j"])(p,{to:"/history",class:"breadcrumb"},{default:Object(c["S"])((function(){return[a]})),_:1}),Object(c["g"])("a",{onClick:t[0]||(t[0]=Object(c["V"])((function(){}),["prevent"])),class:"breadcrumb"},Object(c["L"])("income"===l.record.type?"Доход":"Расход"),1)]),Object(c["g"])("div",i,[Object(c["g"])("div",d,[Object(c["g"])("div",{class:Object(c["s"])(["card",{red:"outcome"===l.record.type,green:"income"===l.record.type}])},[Object(c["g"])("div",s,[Object(c["g"])("p",null,"Описание: "+Object(c["L"])(l.record.description),1),Object(c["g"])("p",null,"Сумма: "+Object(c["L"])(l.record.amount),1),Object(c["g"])("p",null,"Категория: "+Object(c["L"])(l.record.categoryName),1),Object(c["g"])("small",null,Object(c["L"])(l.record.date),1)])],2)])])])):(Object(c["z"])(),Object(c["f"])("p",b,"Запись с id="+Object(c["L"])(e.$route.params.id)+" не найдена",1))])}var l=r("5530"),j=r("1da1"),O=(r("96cf"),{name:"detail",data:function(){return{record:null,loading:!0}},mounted:function(){var e=this;return Object(j["a"])(regeneratorRuntime.mark((function t(){var r,c,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$route.params.id,t.next=3,e.$store.dispatch("fetchRecordById",r);case 3:return c=t.sent,t.next=6,e.$store.dispatch("fetchCategoryById",c.categoryId);case 6:n=t.sent,e.record=Object(l["a"])(Object(l["a"])({},c),{},{categoryName:n.title}),e.loading=!1;case 9:case"end":return t.stop()}}),t)})))()}});O.render=u;t["default"]=O},e01a:function(e,t,r){"use strict";var c=r("23e7"),n=r("83ab"),o=r("da84"),a=r("5135"),i=r("861d"),d=r("9bf2").f,s=r("e893"),b=o.Symbol;if(n&&"function"==typeof b&&(!("description"in b.prototype)||void 0!==b().description)){var u={},l=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof l?new b(e):void 0===e?b():b(e);return""===e&&(u[t]=!0),t};s(l,b);var j=l.prototype=b.prototype;j.constructor=l;var O=j.toString,p="Symbol(test)"==String(b("test")),f=/^Symbol\((.*)\)[^)]+$/;d(j,"description",{configurable:!0,get:function(){var e=i(this)?this.valueOf():this,t=O.call(e);if(a(u,e))return"";var r=p?t.slice(7,-1):t.replace(f,"$1");return""===r?void 0:r}}),c({global:!0,forced:!0},{Symbol:l})}}}]);
//# sourceMappingURL=chunk-596b1de1.8208f670.js.map