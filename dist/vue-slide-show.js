!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["vue-slide-show"]=e():t["vue-slide-show"]=e()}("undefined"!=typeof self?self:this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=1)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{slides:{type:Array,required:!0},displayCount:{type:Number,default:5},animationSpeed:{type:Number,default:1e3},autoplay:{type:Boolean,default:!1},width:{type:Number,default:300},height:{type:Number,default:270},bannerWidth:{type:String,default:"100%"},disable3d:{type:Boolean,default:!1},inverseScaling:{type:Number,default:300},autoplayTimeout:{type:Number,default:2e3},space:{type:[Number,String],default:"auto"},buttonStyle:{type:Object,default:function(){return{}}},buttonBackground:{type:String,default:"rgba(255, 255, 255, .3)"},lightBackground:{type:String,default:"#01BDFF"}},data:function(){return{nowIndex:Math.floor(this.displayCount/2),constolStyleArr:[],constolDisplayArr:[]}},watch:{autoplay:function(t){t?this.startAutoplay():this.stopPlay()},autoplayTimeout:function(){this.autoplay&&(this.stopPlay(),this.startAutoplay())},displayCount:function(t){this.getContolArr(),this.nowIndex=Math.floor(this.displayCount/2)},slides:function(){this.getContolArr(),this.nowIndex=Math.floor(this.displayCount/2)}},computed:{prevIndex:function(){return 0===this.nowIndex?this.slides.length-1:this.nowIndex-1},nextIndex:function(){return this.nowIndex===this.slides.length-1?0:this.nowIndex+1},hasHiddenSlides:function(){return this.slides.length>this.displayCount}},methods:{goto:function(t){var e=t-this.nowIndex;this.hasHiddenSlides?this.constolDisplayArr=this.shiftCircle(this.constolDisplayArr,e):this.constolStyleArr=this.shiftCircle(this.constolStyleArr,-e),this.nowIndex=t,this.$emit("change-slide",t)},shiftCircle:function(t,e){return t.slice(e).concat(t.slice(0,e))},startAutoplay:function(){var t=this;this.autoplay&&(this.autoplayId=setInterval(function(){t.goto(t.nextIndex)},this.autoplayTimeout))},stopPlay:function(){this.autoplayId&&clearInterval(this.autoplayId)},setSlideStyle:function(t){var e=this,n={};if(this.hasHiddenSlides){var i=this.constolDisplayArr.slice(0,this.displayCount);i.forEach(function(i,r){i===t&&(n=e.calculatePosition(e.constolStyleArr[r]),n.visibility="visible",n.opacity=1)}),i.includes(t)||(n=this.calculatePosition(this.constolStyleArr[this.displayCount-1]),n.visibility="hidden",n.opacity=0)}else n=this.calculatePosition(this.constolStyleArr[t]);return Object.assign(n,{width:this.width+"px",height:this.height+"px",background:this.slides[t].background,transition:"all "+this.animationSpeed+"ms"})},calculatePosition:function(t){var e="auto"===this.space?t*(this.width/1.5):t*parseInt(this.space,10)/1.5,n=-23*t,i=-Math.abs(t)*this.inverseScaling;if(this.disable3d){var r=1/(Math.abs(t)+1);return{transform:"translateX("+e+"px) scale("+(1===r?1:r+.3)+")","z-index":2*(this.displayCount+1)/(Math.abs(t)+1)}}return{transform:"translateX("+e+"px) translateZ("+i+"px) rotateY("+n+"deg)"}},getContolArr:function(){this.constolStyleArr.length=0;for(var t=Math.floor(this.displayCount/2),e=0,n=this.displayCount;e<n;e++)this.constolStyleArr.push(e-t);this.constolDisplayArr.length=0;for(var i=0,r=this.slides.length;i<r;i++)this.constolDisplayArr.push(i)}},created:function(){this.getContolArr()},mounted:function(){console.log(this.nowIndex),this.autoplay&&this.startAutoplay()}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=function(t){return t&&t.__esModule?t:{default:t}}(i);e.default=r.default},function(t,e,n){"use strict";function i(t){u||n(3)}Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n.n(r);for(var s in r)"default"!==s&&function(t){n.d(e,t,function(){return r[t]})}(s);var a=n(9),u=!1,l=n(8),d=i,c=l(o.a,a.a,!1,d,"data-v-ba42e974",null);c.options.__file="src\\vue-slide-show.vue",e.default=c.exports},function(t,e,n){var i=n(4);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);n(6)("0c4acf61",i,!1)},function(t,e,n){e=t.exports=n(5)(void 0),e.push([t.i,"\n.banner[data-v-ba42e974] {\n  position: relative;\n  overflow: hidden;\n  margin: 0 auto;\n}\n.banner .wrapper[data-v-ba42e974] {\n  position: relative;\n  margin: 0 auto;\n  transform-style: preserve-3d;\n  perspective: 1000px;\n  backface-visibility:hidden;\n}\n.banner .wrapper div[data-v-ba42e974] {\n  position: absolute;\n}\n.banner .button[data-v-ba42e974] {\n  padding: 0;\n  text-align: center;\n}\n.banner .button li[data-v-ba42e974] {\n  display: inline-block;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  margin-right: 5px;\n  border: 1px solid rgba(0, 0, 0, .2);\n  cursor: pointer;\n}\n",""])},function(t,e){function n(t,e){var n=t[1]||"",r=t[3];if(!r)return n;if(e&&"function"==typeof btoa){var o=i(r);return[n].concat(r.sources.map(function(t){return"/*# sourceURL="+r.sourceRoot+t+" */"})).concat([o]).join("\n")}return[n].join("\n")}function i(t){return"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t))))+" */"}t.exports=function(t){var e=[];return e.toString=function(){return this.map(function(e){var i=n(e,t);return e[2]?"@media "+e[2]+"{"+i+"}":i}).join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<t.length;r++){var s=t[r];"number"==typeof s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(t,e,n){function i(t){for(var e=0;e<t.length;e++){var n=t[e],i=d[n.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](n.parts[r]);for(;r<n.parts.length;r++)i.parts.push(o(n.parts[r]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{for(var s=[],r=0;r<n.parts.length;r++)s.push(o(n.parts[r]));d[n.id]={id:n.id,refs:1,parts:s}}}}function r(){var t=document.createElement("style");return t.type="text/css",c.appendChild(t),t}function o(t){var e,n,i=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(i){if(h)return y;i.parentNode.removeChild(i)}if(v){var o=f++;i=p||(p=r()),e=s.bind(null,i,o,!1),n=s.bind(null,i,o,!0)}else i=r(),e=a.bind(null,i),n=function(){i.parentNode.removeChild(i)};return e(t),function(i){if(i){if(i.css===t.css&&i.media===t.media&&i.sourceMap===t.sourceMap)return;e(t=i)}else n()}}function s(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=g(e,r);else{var o=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function a(t,e){var n=e.css,i=e.media,r=e.sourceMap;if(i&&t.setAttribute("media",i),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var u="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!u)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var l=n(7),d={},c=u&&(document.head||document.getElementsByTagName("head")[0]),p=null,f=0,h=!1,y=function(){},v="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,n){h=n;var r=l(t,e);return i(r),function(e){for(var n=[],o=0;o<r.length;o++){var s=r[o],a=d[s.id];a.refs--,n.push(a)}e?(r=l(t,e),i(r)):r=[];for(var o=0;o<n.length;o++){var a=n[o];if(0===a.refs){for(var u=0;u<a.parts.length;u++)a.parts[u]();delete d[a.id]}}}};var g=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var n=[],i={},r=0;r<e.length;r++){var o=e[r],s=o[0],a=o[1],u=o[2],l=o[3],d={id:t+":"+r,css:a,media:u,sourceMap:l};i[s]?i[s].parts.push(d):n.push(i[s]={id:s,parts:[d]})}return n}},function(t,e){t.exports=function(t,e,n,i,r,o){var s,a=t=t||{},u=typeof t.default;"object"!==u&&"function"!==u||(s=t,a=t.default);var l="function"==typeof a?a.options:a;e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns,l._compiled=!0),n&&(l.functional=!0),r&&(l._scopeId=r);var d;if(o?(d=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),i&&i.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(o)},l._ssrRegister=d):i&&(d=i),d){var c=l.functional,p=c?l.render:l.beforeCreate;c?(l._injectStyles=d,l.render=function(t,e){return d.call(e),p(t,e)}):l.beforeCreate=p?[].concat(p,d):[d]}return{esModule:s,exports:a,options:l}}},function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"banner",style:{width:t.bannerWidth}},[n("div",{staticClass:"wrapper",style:{width:t.width+"px",height:t.height+"px"},on:{mouseover:t.stopPlay,mouseout:t.startAutoplay}},t._l(t.slides,function(e,i){return n("div",{key:i,style:t.setSlideStyle(i),on:{click:function(e){t.goto(i)}}})})),t._v(" "),n("ul",{staticClass:"button",style:t.buttonStyle},t._l(t.slides,function(e,i){return n("li",{key:i,style:{background:t.nowIndex===i?t.lightBackground:t.buttonBackground},on:{click:function(e){t.goto(i)}}})}))])},r=[];i._withStripped=!0;var o={render:i,staticRenderFns:r};e.a=o}])});