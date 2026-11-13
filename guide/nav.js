(()=>{var Yh=Object.create;var Wl=Object.defineProperty;var Zh=Object.getOwnPropertyDescriptor;var em=Object.getOwnPropertyNames;var tm=Object.getPrototypeOf,nm=Object.prototype.hasOwnProperty;var kt=(e,t)=>()=>(e&&(t=e(e=0)),t);var Nt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),rm=(e,t)=>{for(var n in t)Wl(e,n,{get:t[n],enumerable:!0})},om=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of em(t))!nm.call(e,o)&&o!==n&&Wl(e,o,{get:()=>t[o],enumerable:!(r=Zh(t,o))||r.enumerable});return e};var Tt=(e,t,n)=>(n=e!=null?Yh(tm(e)):{},om(t||!e||!e.__esModule?Wl(n,"default",{value:e,enumerable:!0}):n,e));var ic=Nt(W=>{"use strict";/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nr=Symbol.for("react.element"),im=Symbol.for("react.portal"),lm=Symbol.for("react.fragment"),am=Symbol.for("react.strict_mode"),sm=Symbol.for("react.profiler"),um=Symbol.for("react.provider"),cm=Symbol.for("react.context"),dm=Symbol.for("react.forward_ref"),fm=Symbol.for("react.suspense"),pm=Symbol.for("react.memo"),hm=Symbol.for("react.lazy"),qu=Symbol.iterator;function mm(e){return e===null||typeof e!="object"?null:(e=qu&&e[qu]||e["@@iterator"],typeof e=="function"?e:null)}var Qu={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Yu=Object.assign,Zu={};function Xn(e,t,n){this.props=e,this.context=t,this.refs=Zu,this.updater=n||Qu}Xn.prototype.isReactComponent={};Xn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Xn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ec(){}ec.prototype=Xn.prototype;function jl(e,t,n){this.props=e,this.context=t,this.refs=Zu,this.updater=n||Qu}var Gl=jl.prototype=new ec;Gl.constructor=jl;Yu(Gl,Xn.prototype);Gl.isPureReactComponent=!0;var Ju=Array.isArray,tc=Object.prototype.hasOwnProperty,$l={current:null},nc={key:!0,ref:!0,__self:!0,__source:!0};function rc(e,t,n){var r,o={},i=null,l=null;if(t!=null)for(r in t.ref!==void 0&&(l=t.ref),t.key!==void 0&&(i=""+t.key),t)tc.call(t,r)&&!nc.hasOwnProperty(r)&&(o[r]=t[r]);var s=arguments.length-2;if(s===1)o.children=n;else if(1<s){for(var a=Array(s),u=0;u<s;u++)a[u]=arguments[u+2];o.children=a}if(e&&e.defaultProps)for(r in s=e.defaultProps,s)o[r]===void 0&&(o[r]=s[r]);return{$$typeof:Nr,type:e,key:i,ref:l,props:o,_owner:$l.current}}function gm(e,t){return{$$typeof:Nr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Vl(e){return typeof e=="object"&&e!==null&&e.$$typeof===Nr}function vm(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Ku=/\/+/g;function Ul(e,t){return typeof e=="object"&&e!==null&&e.key!=null?vm(""+e.key):t.toString(36)}function $o(e,t,n,r,o){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(i){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case Nr:case im:l=!0}}if(l)return l=e,o=o(l),e=r===""?"."+Ul(l,0):r,Ju(o)?(n="",e!=null&&(n=e.replace(Ku,"$&/")+"/"),$o(o,t,n,"",function(u){return u})):o!=null&&(Vl(o)&&(o=gm(o,n+(!o.key||l&&l.key===o.key?"":(""+o.key).replace(Ku,"$&/")+"/")+e)),t.push(o)),1;if(l=0,r=r===""?".":r+":",Ju(e))for(var s=0;s<e.length;s++){i=e[s];var a=r+Ul(i,s);l+=$o(i,t,n,a,o)}else if(a=mm(e),typeof a=="function")for(e=a.call(e),s=0;!(i=e.next()).done;)i=i.value,a=r+Ul(i,s++),l+=$o(i,t,n,a,o);else if(i==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return l}function Go(e,t,n){if(e==null)return e;var r=[],o=0;return $o(e,r,"","",function(i){return t.call(n,i,o++)}),r}function ym(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Oe={current:null},Vo={transition:null},bm={ReactCurrentDispatcher:Oe,ReactCurrentBatchConfig:Vo,ReactCurrentOwner:$l};function oc(){throw Error("act(...) is not supported in production builds of React.")}W.Children={map:Go,forEach:function(e,t,n){Go(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Go(e,function(){t++}),t},toArray:function(e){return Go(e,function(t){return t})||[]},only:function(e){if(!Vl(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};W.Component=Xn;W.Fragment=lm;W.Profiler=sm;W.PureComponent=jl;W.StrictMode=am;W.Suspense=fm;W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=bm;W.act=oc;W.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Yu({},e.props),o=e.key,i=e.ref,l=e._owner;if(t!=null){if(t.ref!==void 0&&(i=t.ref,l=$l.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(a in t)tc.call(t,a)&&!nc.hasOwnProperty(a)&&(r[a]=t[a]===void 0&&s!==void 0?s[a]:t[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){s=Array(a);for(var u=0;u<a;u++)s[u]=arguments[u+2];r.children=s}return{$$typeof:Nr,type:e.type,key:o,ref:i,props:r,_owner:l}};W.createContext=function(e){return e={$$typeof:cm,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:um,_context:e},e.Consumer=e};W.createElement=rc;W.createFactory=function(e){var t=rc.bind(null,e);return t.type=e,t};W.createRef=function(){return{current:null}};W.forwardRef=function(e){return{$$typeof:dm,render:e}};W.isValidElement=Vl;W.lazy=function(e){return{$$typeof:hm,_payload:{_status:-1,_result:e},_init:ym}};W.memo=function(e,t){return{$$typeof:pm,type:e,compare:t===void 0?null:t}};W.startTransition=function(e){var t=Vo.transition;Vo.transition={};try{e()}finally{Vo.transition=t}};W.unstable_act=oc;W.useCallback=function(e,t){return Oe.current.useCallback(e,t)};W.useContext=function(e){return Oe.current.useContext(e)};W.useDebugValue=function(){};W.useDeferredValue=function(e){return Oe.current.useDeferredValue(e)};W.useEffect=function(e,t){return Oe.current.useEffect(e,t)};W.useId=function(){return Oe.current.useId()};W.useImperativeHandle=function(e,t,n){return Oe.current.useImperativeHandle(e,t,n)};W.useInsertionEffect=function(e,t){return Oe.current.useInsertionEffect(e,t)};W.useLayoutEffect=function(e,t){return Oe.current.useLayoutEffect(e,t)};W.useMemo=function(e,t){return Oe.current.useMemo(e,t)};W.useReducer=function(e,t,n){return Oe.current.useReducer(e,t,n)};W.useRef=function(e){return Oe.current.useRef(e)};W.useState=function(e){return Oe.current.useState(e)};W.useSyncExternalStore=function(e,t,n){return Oe.current.useSyncExternalStore(e,t,n)};W.useTransition=function(){return Oe.current.useTransition()};W.version="18.3.1"});var qn=Nt((Gv,lc)=>{"use strict";lc.exports=ic()});var gc=Nt(Z=>{"use strict";/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function Kl(e,t){var n=e.length;e.push(t);e:for(;0<n;){var r=n-1>>>1,o=e[r];if(0<Xo(o,t))e[r]=t,e[n]=o,n=r;else break e}}function dt(e){return e.length===0?null:e[0]}function Jo(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;e:for(var r=0,o=e.length,i=o>>>1;r<i;){var l=2*(r+1)-1,s=e[l],a=l+1,u=e[a];if(0>Xo(s,n))a<o&&0>Xo(u,s)?(e[r]=u,e[a]=n,r=a):(e[r]=s,e[l]=n,r=l);else if(a<o&&0>Xo(u,n))e[r]=u,e[a]=n,r=a;else break e}}return t}function Xo(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}typeof performance=="object"&&typeof performance.now=="function"?(ac=performance,Z.unstable_now=function(){return ac.now()}):(Xl=Date,sc=Xl.now(),Z.unstable_now=function(){return Xl.now()-sc});var ac,Xl,sc,Ct=[],Xt=[],wm=1,Ze=null,Le=3,Ko=!1,Sn=!1,Ar=!1,dc=typeof setTimeout=="function"?setTimeout:null,fc=typeof clearTimeout=="function"?clearTimeout:null,uc=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function Ql(e){for(var t=dt(Xt);t!==null;){if(t.callback===null)Jo(Xt);else if(t.startTime<=e)Jo(Xt),t.sortIndex=t.expirationTime,Kl(Ct,t);else break;t=dt(Xt)}}function Yl(e){if(Ar=!1,Ql(e),!Sn)if(dt(Ct)!==null)Sn=!0,ea(Zl);else{var t=dt(Xt);t!==null&&ta(Yl,t.startTime-e)}}function Zl(e,t){Sn=!1,Ar&&(Ar=!1,fc(Dr),Dr=-1),Ko=!0;var n=Le;try{for(Ql(t),Ze=dt(Ct);Ze!==null&&(!(Ze.expirationTime>t)||e&&!mc());){var r=Ze.callback;if(typeof r=="function"){Ze.callback=null,Le=Ze.priorityLevel;var o=r(Ze.expirationTime<=t);t=Z.unstable_now(),typeof o=="function"?Ze.callback=o:Ze===dt(Ct)&&Jo(Ct),Ql(t)}else Jo(Ct);Ze=dt(Ct)}if(Ze!==null)var i=!0;else{var l=dt(Xt);l!==null&&ta(Yl,l.startTime-t),i=!1}return i}finally{Ze=null,Le=n,Ko=!1}}var Qo=!1,qo=null,Dr=-1,pc=5,hc=-1;function mc(){return!(Z.unstable_now()-hc<pc)}function ql(){if(qo!==null){var e=Z.unstable_now();hc=e;var t=!0;try{t=qo(!0,e)}finally{t?Fr():(Qo=!1,qo=null)}}else Qo=!1}var Fr;typeof uc=="function"?Fr=function(){uc(ql)}:typeof MessageChannel<"u"?(Jl=new MessageChannel,cc=Jl.port2,Jl.port1.onmessage=ql,Fr=function(){cc.postMessage(null)}):Fr=function(){dc(ql,0)};var Jl,cc;function ea(e){qo=e,Qo||(Qo=!0,Fr())}function ta(e,t){Dr=dc(function(){e(Z.unstable_now())},t)}Z.unstable_IdlePriority=5;Z.unstable_ImmediatePriority=1;Z.unstable_LowPriority=4;Z.unstable_NormalPriority=3;Z.unstable_Profiling=null;Z.unstable_UserBlockingPriority=2;Z.unstable_cancelCallback=function(e){e.callback=null};Z.unstable_continueExecution=function(){Sn||Ko||(Sn=!0,ea(Zl))};Z.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):pc=0<e?Math.floor(1e3/e):5};Z.unstable_getCurrentPriorityLevel=function(){return Le};Z.unstable_getFirstCallbackNode=function(){return dt(Ct)};Z.unstable_next=function(e){switch(Le){case 1:case 2:case 3:var t=3;break;default:t=Le}var n=Le;Le=t;try{return e()}finally{Le=n}};Z.unstable_pauseExecution=function(){};Z.unstable_requestPaint=function(){};Z.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=Le;Le=e;try{return t()}finally{Le=n}};Z.unstable_scheduleCallback=function(e,t,n){var r=Z.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?r+n:r):n=r,e){case 1:var o=-1;break;case 2:o=250;break;case 5:o=1073741823;break;case 4:o=1e4;break;default:o=5e3}return o=n+o,e={id:wm++,callback:t,priorityLevel:e,startTime:n,expirationTime:o,sortIndex:-1},n>r?(e.sortIndex=n,Kl(Xt,e),dt(Ct)===null&&e===dt(Xt)&&(Ar?(fc(Dr),Dr=-1):Ar=!0,ta(Yl,n-r))):(e.sortIndex=o,Kl(Ct,e),Sn||Ko||(Sn=!0,ea(Zl))),e};Z.unstable_shouldYield=mc;Z.unstable_wrapCallback=function(e){var t=Le;return function(){var n=Le;Le=t;try{return e.apply(this,arguments)}finally{Le=n}}}});var yc=Nt((Vv,vc)=>{"use strict";vc.exports=gc()});var Ep=Nt(Qe=>{"use strict";/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sm=qn(),Je=yc();function S(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Td=new Set,ao={};function On(e,t){mr(e,t),mr(e+"Capture",t)}function mr(e,t){for(ao[e]=t,e=0;e<t.length;e++)Td.add(t[e])}var Ut=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ka=Object.prototype.hasOwnProperty,xm=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,bc={},wc={};function Em(e){return ka.call(wc,e)?!0:ka.call(bc,e)?!1:xm.test(e)?wc[e]=!0:(bc[e]=!0,!1)}function km(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Tm(e,t,n,r){if(t===null||typeof t>"u"||km(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Fe(e,t,n,r,o,i,l){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=l}var Ee={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){Ee[e]=new Fe(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];Ee[t]=new Fe(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){Ee[e]=new Fe(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){Ee[e]=new Fe(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){Ee[e]=new Fe(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){Ee[e]=new Fe(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){Ee[e]=new Fe(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){Ee[e]=new Fe(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){Ee[e]=new Fe(e,5,!1,e.toLowerCase(),null,!1,!1)});var gs=/[\-:]([a-z])/g;function vs(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(gs,vs);Ee[t]=new Fe(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(gs,vs);Ee[t]=new Fe(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(gs,vs);Ee[t]=new Fe(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){Ee[e]=new Fe(e,1,!1,e.toLowerCase(),null,!1,!1)});Ee.xlinkHref=new Fe("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){Ee[e]=new Fe(e,1,!1,e.toLowerCase(),null,!0,!0)});function ys(e,t,n,r){var o=Ee.hasOwnProperty(t)?Ee[t]:null;(o!==null?o.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Tm(t,n,o,r)&&(n=null),r||o===null?Em(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):o.mustUseProperty?e[o.propertyName]=n===null?o.type===3?!1:"":n:(t=o.attributeName,r=o.attributeNamespace,n===null?e.removeAttribute(t):(o=o.type,n=o===3||o===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var Vt=Sm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Yo=Symbol.for("react.element"),Qn=Symbol.for("react.portal"),Yn=Symbol.for("react.fragment"),bs=Symbol.for("react.strict_mode"),Ta=Symbol.for("react.profiler"),Cd=Symbol.for("react.provider"),Ld=Symbol.for("react.context"),ws=Symbol.for("react.forward_ref"),Ca=Symbol.for("react.suspense"),La=Symbol.for("react.suspense_list"),Ss=Symbol.for("react.memo"),Jt=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");var Md=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Sc=Symbol.iterator;function Hr(e){return e===null||typeof e!="object"?null:(e=Sc&&e[Sc]||e["@@iterator"],typeof e=="function"?e:null)}var se=Object.assign,na;function qr(e){if(na===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);na=t&&t[1]||""}return`
`+na+e}var ra=!1;function oa(e,t){if(!e||ra)return"";ra=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var o=u.stack.split(`
`),i=r.stack.split(`
`),l=o.length-1,s=i.length-1;1<=l&&0<=s&&o[l]!==i[s];)s--;for(;1<=l&&0<=s;l--,s--)if(o[l]!==i[s]){if(l!==1||s!==1)do if(l--,s--,0>s||o[l]!==i[s]){var a=`
`+o[l].replace(" at new "," at ");return e.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",e.displayName)),a}while(1<=l&&0<=s);break}}}finally{ra=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?qr(e):""}function Cm(e){switch(e.tag){case 5:return qr(e.type);case 16:return qr("Lazy");case 13:return qr("Suspense");case 19:return qr("SuspenseList");case 0:case 2:case 15:return e=oa(e.type,!1),e;case 11:return e=oa(e.type.render,!1),e;case 1:return e=oa(e.type,!0),e;default:return""}}function Ma(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Yn:return"Fragment";case Qn:return"Portal";case Ta:return"Profiler";case bs:return"StrictMode";case Ca:return"Suspense";case La:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ld:return(e.displayName||"Context")+".Consumer";case Cd:return(e._context.displayName||"Context")+".Provider";case ws:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ss:return t=e.displayName||null,t!==null?t:Ma(e.type)||"Memo";case Jt:t=e._payload,e=e._init;try{return Ma(e(t))}catch{}}return null}function Lm(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ma(t);case 8:return t===bs?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function cn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Pd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Mm(e){var t=Pd(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(l){r=""+l,i.call(this,l)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(l){r=""+l},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Zo(e){e._valueTracker||(e._valueTracker=Mm(e))}function Rd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Pd(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Li(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Pa(e,t){var n=t.checked;return se({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function xc(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=cn(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Bd(e,t){t=t.checked,t!=null&&ys(e,"checked",t,!1)}function Ra(e,t){Bd(e,t);var n=cn(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Ba(e,t.type,n):t.hasOwnProperty("defaultValue")&&Ba(e,t.type,cn(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ec(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Ba(e,t,n){(t!=="number"||Li(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Jr=Array.isArray;function ur(e,t,n,r){if(e=e.options,t){t={};for(var o=0;o<n.length;o++)t["$"+n[o]]=!0;for(n=0;n<e.length;n++)o=t.hasOwnProperty("$"+e[n].value),e[n].selected!==o&&(e[n].selected=o),o&&r&&(e[n].defaultSelected=!0)}else{for(n=""+cn(n),t=null,o=0;o<e.length;o++){if(e[o].value===n){e[o].selected=!0,r&&(e[o].defaultSelected=!0);return}t!==null||e[o].disabled||(t=e[o])}t!==null&&(t.selected=!0)}}function _a(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(S(91));return se({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function kc(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(S(92));if(Jr(n)){if(1<n.length)throw Error(S(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:cn(n)}}function _d(e,t){var n=cn(t.value),r=cn(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Tc(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function zd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function za(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?zd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ei,Od=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ei=ei||document.createElement("div"),ei.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ei.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function so(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Yr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Pm=["Webkit","ms","Moz","O"];Object.keys(Yr).forEach(function(e){Pm.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Yr[t]=Yr[e]})});function Id(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Yr.hasOwnProperty(e)&&Yr[e]?(""+t).trim():t+"px"}function Nd(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,o=Id(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,o):e[n]=o}}var Rm=se({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Oa(e,t){if(t){if(Rm[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(S(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(S(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(S(61))}if(t.style!=null&&typeof t.style!="object")throw Error(S(62))}}function Ia(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Na=null;function xs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Fa=null,cr=null,dr=null;function Cc(e){if(e=Lo(e)){if(typeof Fa!="function")throw Error(S(280));var t=e.stateNode;t&&(t=tl(t),Fa(e.stateNode,e.type,t))}}function Fd(e){cr?dr?dr.push(e):dr=[e]:cr=e}function Ad(){if(cr){var e=cr,t=dr;if(dr=cr=null,Cc(e),t)for(e=0;e<t.length;e++)Cc(t[e])}}function Dd(e,t){return e(t)}function Hd(){}var ia=!1;function Wd(e,t,n){if(ia)return e(t,n);ia=!0;try{return Dd(e,t,n)}finally{ia=!1,(cr!==null||dr!==null)&&(Hd(),Ad())}}function uo(e,t){var n=e.stateNode;if(n===null)return null;var r=tl(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(S(231,t,typeof n));return n}var Aa=!1;if(Ut)try{Jn={},Object.defineProperty(Jn,"passive",{get:function(){Aa=!0}}),window.addEventListener("test",Jn,Jn),window.removeEventListener("test",Jn,Jn)}catch{Aa=!1}var Jn;function Bm(e,t,n,r,o,i,l,s,a){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(f){this.onError(f)}}var Zr=!1,Mi=null,Pi=!1,Da=null,_m={onError:function(e){Zr=!0,Mi=e}};function zm(e,t,n,r,o,i,l,s,a){Zr=!1,Mi=null,Bm.apply(_m,arguments)}function Om(e,t,n,r,o,i,l,s,a){if(zm.apply(this,arguments),Zr){if(Zr){var u=Mi;Zr=!1,Mi=null}else throw Error(S(198));Pi||(Pi=!0,Da=u)}}function In(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Ud(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Lc(e){if(In(e)!==e)throw Error(S(188))}function Im(e){var t=e.alternate;if(!t){if(t=In(e),t===null)throw Error(S(188));return t!==e?null:e}for(var n=e,r=t;;){var o=n.return;if(o===null)break;var i=o.alternate;if(i===null){if(r=o.return,r!==null){n=r;continue}break}if(o.child===i.child){for(i=o.child;i;){if(i===n)return Lc(o),e;if(i===r)return Lc(o),t;i=i.sibling}throw Error(S(188))}if(n.return!==r.return)n=o,r=i;else{for(var l=!1,s=o.child;s;){if(s===n){l=!0,n=o,r=i;break}if(s===r){l=!0,r=o,n=i;break}s=s.sibling}if(!l){for(s=i.child;s;){if(s===n){l=!0,n=i,r=o;break}if(s===r){l=!0,r=i,n=o;break}s=s.sibling}if(!l)throw Error(S(189))}}if(n.alternate!==r)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?e:t}function jd(e){return e=Im(e),e!==null?Gd(e):null}function Gd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Gd(e);if(t!==null)return t;e=e.sibling}return null}var $d=Je.unstable_scheduleCallback,Mc=Je.unstable_cancelCallback,Nm=Je.unstable_shouldYield,Fm=Je.unstable_requestPaint,de=Je.unstable_now,Am=Je.unstable_getCurrentPriorityLevel,Es=Je.unstable_ImmediatePriority,Vd=Je.unstable_UserBlockingPriority,Ri=Je.unstable_NormalPriority,Dm=Je.unstable_LowPriority,Xd=Je.unstable_IdlePriority,Qi=null,Rt=null;function Hm(e){if(Rt&&typeof Rt.onCommitFiberRoot=="function")try{Rt.onCommitFiberRoot(Qi,e,void 0,(e.current.flags&128)===128)}catch{}}var gt=Math.clz32?Math.clz32:jm,Wm=Math.log,Um=Math.LN2;function jm(e){return e>>>=0,e===0?32:31-(Wm(e)/Um|0)|0}var ti=64,ni=4194304;function Kr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Bi(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,l=n&268435455;if(l!==0){var s=l&~o;s!==0?r=Kr(s):(i&=l,i!==0&&(r=Kr(i)))}else l=n&~o,l!==0?r=Kr(l):i!==0&&(r=Kr(i));if(r===0)return 0;if(t!==0&&t!==r&&!(t&o)&&(o=r&-r,i=t&-t,o>=i||o===16&&(i&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-gt(t),o=1<<n,r|=e[n],t&=~o;return r}function Gm(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function $m(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,o=e.expirationTimes,i=e.pendingLanes;0<i;){var l=31-gt(i),s=1<<l,a=o[l];a===-1?(!(s&n)||s&r)&&(o[l]=Gm(s,t)):a<=t&&(e.expiredLanes|=s),i&=~s}}function Ha(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function qd(){var e=ti;return ti<<=1,!(ti&4194240)&&(ti=64),e}function la(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function To(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-gt(t),e[t]=n}function Vm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var o=31-gt(n),i=1<<o;t[o]=0,r[o]=-1,e[o]=-1,n&=~i}}function ks(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-gt(n),o=1<<r;o&t|e[r]&t&&(e[r]|=t),n&=~o}}var q=0;function Jd(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Kd,Ts,Qd,Yd,Zd,Wa=!1,ri=[],tn=null,nn=null,rn=null,co=new Map,fo=new Map,Qt=[],Xm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Pc(e,t){switch(e){case"focusin":case"focusout":tn=null;break;case"dragenter":case"dragleave":nn=null;break;case"mouseover":case"mouseout":rn=null;break;case"pointerover":case"pointerout":co.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":fo.delete(t.pointerId)}}function Wr(e,t,n,r,o,i){return e===null||e.nativeEvent!==i?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]},t!==null&&(t=Lo(t),t!==null&&Ts(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,o!==null&&t.indexOf(o)===-1&&t.push(o),e)}function qm(e,t,n,r,o){switch(t){case"focusin":return tn=Wr(tn,e,t,n,r,o),!0;case"dragenter":return nn=Wr(nn,e,t,n,r,o),!0;case"mouseover":return rn=Wr(rn,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return co.set(i,Wr(co.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":return i=o.pointerId,fo.set(i,Wr(fo.get(i)||null,e,t,n,r,o)),!0}return!1}function ef(e){var t=kn(e.target);if(t!==null){var n=In(t);if(n!==null){if(t=n.tag,t===13){if(t=Ud(n),t!==null){e.blockedOn=t,Zd(e.priority,function(){Qd(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function vi(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Ua(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Na=r,n.target.dispatchEvent(r),Na=null}else return t=Lo(n),t!==null&&Ts(t),e.blockedOn=n,!1;t.shift()}return!0}function Rc(e,t,n){vi(e)&&n.delete(t)}function Jm(){Wa=!1,tn!==null&&vi(tn)&&(tn=null),nn!==null&&vi(nn)&&(nn=null),rn!==null&&vi(rn)&&(rn=null),co.forEach(Rc),fo.forEach(Rc)}function Ur(e,t){e.blockedOn===t&&(e.blockedOn=null,Wa||(Wa=!0,Je.unstable_scheduleCallback(Je.unstable_NormalPriority,Jm)))}function po(e){function t(o){return Ur(o,e)}if(0<ri.length){Ur(ri[0],e);for(var n=1;n<ri.length;n++){var r=ri[n];r.blockedOn===e&&(r.blockedOn=null)}}for(tn!==null&&Ur(tn,e),nn!==null&&Ur(nn,e),rn!==null&&Ur(rn,e),co.forEach(t),fo.forEach(t),n=0;n<Qt.length;n++)r=Qt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<Qt.length&&(n=Qt[0],n.blockedOn===null);)ef(n),n.blockedOn===null&&Qt.shift()}var fr=Vt.ReactCurrentBatchConfig,_i=!0;function Km(e,t,n,r){var o=q,i=fr.transition;fr.transition=null;try{q=1,Cs(e,t,n,r)}finally{q=o,fr.transition=i}}function Qm(e,t,n,r){var o=q,i=fr.transition;fr.transition=null;try{q=4,Cs(e,t,n,r)}finally{q=o,fr.transition=i}}function Cs(e,t,n,r){if(_i){var o=Ua(e,t,n,r);if(o===null)pa(e,t,r,zi,n),Pc(e,r);else if(qm(o,e,t,n,r))r.stopPropagation();else if(Pc(e,r),t&4&&-1<Xm.indexOf(e)){for(;o!==null;){var i=Lo(o);if(i!==null&&Kd(i),i=Ua(e,t,n,r),i===null&&pa(e,t,r,zi,n),i===o)break;o=i}o!==null&&r.stopPropagation()}else pa(e,t,r,null,n)}}var zi=null;function Ua(e,t,n,r){if(zi=null,e=xs(r),e=kn(e),e!==null)if(t=In(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Ud(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return zi=e,null}function tf(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Am()){case Es:return 1;case Vd:return 4;case Ri:case Dm:return 16;case Xd:return 536870912;default:return 16}default:return 16}}var Zt=null,Ls=null,yi=null;function nf(){if(yi)return yi;var e,t=Ls,n=t.length,r,o="value"in Zt?Zt.value:Zt.textContent,i=o.length;for(e=0;e<n&&t[e]===o[e];e++);var l=n-e;for(r=1;r<=l&&t[n-r]===o[i-r];r++);return yi=o.slice(e,1<r?1-r:void 0)}function bi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function oi(){return!0}function Bc(){return!1}function Ke(e){function t(n,r,o,i,l){this._reactName=n,this._targetInst=o,this.type=r,this.nativeEvent=i,this.target=l,this.currentTarget=null;for(var s in e)e.hasOwnProperty(s)&&(n=e[s],this[s]=n?n(i):i[s]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?oi:Bc,this.isPropagationStopped=Bc,this}return se(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=oi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=oi)},persist:function(){},isPersistent:oi}),t}var xr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ms=Ke(xr),Co=se({},xr,{view:0,detail:0}),Ym=Ke(Co),aa,sa,jr,Yi=se({},Co,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ps,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==jr&&(jr&&e.type==="mousemove"?(aa=e.screenX-jr.screenX,sa=e.screenY-jr.screenY):sa=aa=0,jr=e),aa)},movementY:function(e){return"movementY"in e?e.movementY:sa}}),_c=Ke(Yi),Zm=se({},Yi,{dataTransfer:0}),e0=Ke(Zm),t0=se({},Co,{relatedTarget:0}),ua=Ke(t0),n0=se({},xr,{animationName:0,elapsedTime:0,pseudoElement:0}),r0=Ke(n0),o0=se({},xr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),i0=Ke(o0),l0=se({},xr,{data:0}),zc=Ke(l0),a0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},s0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},u0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function c0(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=u0[e])?!!t[e]:!1}function Ps(){return c0}var d0=se({},Co,{key:function(e){if(e.key){var t=a0[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=bi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?s0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ps,charCode:function(e){return e.type==="keypress"?bi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?bi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),f0=Ke(d0),p0=se({},Yi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Oc=Ke(p0),h0=se({},Co,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ps}),m0=Ke(h0),g0=se({},xr,{propertyName:0,elapsedTime:0,pseudoElement:0}),v0=Ke(g0),y0=se({},Yi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),b0=Ke(y0),w0=[9,13,27,32],Rs=Ut&&"CompositionEvent"in window,eo=null;Ut&&"documentMode"in document&&(eo=document.documentMode);var S0=Ut&&"TextEvent"in window&&!eo,rf=Ut&&(!Rs||eo&&8<eo&&11>=eo),Ic=" ",Nc=!1;function of(e,t){switch(e){case"keyup":return w0.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lf(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Zn=!1;function x0(e,t){switch(e){case"compositionend":return lf(t);case"keypress":return t.which!==32?null:(Nc=!0,Ic);case"textInput":return e=t.data,e===Ic&&Nc?null:e;default:return null}}function E0(e,t){if(Zn)return e==="compositionend"||!Rs&&of(e,t)?(e=nf(),yi=Ls=Zt=null,Zn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return rf&&t.locale!=="ko"?null:t.data;default:return null}}var k0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Fc(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!k0[e.type]:t==="textarea"}function af(e,t,n,r){Fd(r),t=Oi(t,"onChange"),0<t.length&&(n=new Ms("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var to=null,ho=null;function T0(e){yf(e,0)}function Zi(e){var t=nr(e);if(Rd(t))return e}function C0(e,t){if(e==="change")return t}var sf=!1;Ut&&(Ut?(li="oninput"in document,li||(ca=document.createElement("div"),ca.setAttribute("oninput","return;"),li=typeof ca.oninput=="function"),ii=li):ii=!1,sf=ii&&(!document.documentMode||9<document.documentMode));var ii,li,ca;function Ac(){to&&(to.detachEvent("onpropertychange",uf),ho=to=null)}function uf(e){if(e.propertyName==="value"&&Zi(ho)){var t=[];af(t,ho,e,xs(e)),Wd(T0,t)}}function L0(e,t,n){e==="focusin"?(Ac(),to=t,ho=n,to.attachEvent("onpropertychange",uf)):e==="focusout"&&Ac()}function M0(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Zi(ho)}function P0(e,t){if(e==="click")return Zi(t)}function R0(e,t){if(e==="input"||e==="change")return Zi(t)}function B0(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var yt=typeof Object.is=="function"?Object.is:B0;function mo(e,t){if(yt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var o=n[r];if(!ka.call(t,o)||!yt(e[o],t[o]))return!1}return!0}function Dc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Hc(e,t){var n=Dc(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Dc(n)}}function cf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?cf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function df(){for(var e=window,t=Li();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Li(e.document)}return t}function Bs(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function _0(e){var t=df(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&cf(n.ownerDocument.documentElement,n)){if(r!==null&&Bs(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var o=n.textContent.length,i=Math.min(r.start,o);r=r.end===void 0?i:Math.min(r.end,o),!e.extend&&i>r&&(o=r,r=i,i=o),o=Hc(n,i);var l=Hc(n,r);o&&l&&(e.rangeCount!==1||e.anchorNode!==o.node||e.anchorOffset!==o.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(t=t.createRange(),t.setStart(o.node,o.offset),e.removeAllRanges(),i>r?(e.addRange(t),e.extend(l.node,l.offset)):(t.setEnd(l.node,l.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var z0=Ut&&"documentMode"in document&&11>=document.documentMode,er=null,ja=null,no=null,Ga=!1;function Wc(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Ga||er==null||er!==Li(r)||(r=er,"selectionStart"in r&&Bs(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),no&&mo(no,r)||(no=r,r=Oi(ja,"onSelect"),0<r.length&&(t=new Ms("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=er)))}function ai(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var tr={animationend:ai("Animation","AnimationEnd"),animationiteration:ai("Animation","AnimationIteration"),animationstart:ai("Animation","AnimationStart"),transitionend:ai("Transition","TransitionEnd")},da={},ff={};Ut&&(ff=document.createElement("div").style,"AnimationEvent"in window||(delete tr.animationend.animation,delete tr.animationiteration.animation,delete tr.animationstart.animation),"TransitionEvent"in window||delete tr.transitionend.transition);function el(e){if(da[e])return da[e];if(!tr[e])return e;var t=tr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ff)return da[e]=t[n];return e}var pf=el("animationend"),hf=el("animationiteration"),mf=el("animationstart"),gf=el("transitionend"),vf=new Map,Uc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function fn(e,t){vf.set(e,t),On(t,[e])}for(si=0;si<Uc.length;si++)ui=Uc[si],jc=ui.toLowerCase(),Gc=ui[0].toUpperCase()+ui.slice(1),fn(jc,"on"+Gc);var ui,jc,Gc,si;fn(pf,"onAnimationEnd");fn(hf,"onAnimationIteration");fn(mf,"onAnimationStart");fn("dblclick","onDoubleClick");fn("focusin","onFocus");fn("focusout","onBlur");fn(gf,"onTransitionEnd");mr("onMouseEnter",["mouseout","mouseover"]);mr("onMouseLeave",["mouseout","mouseover"]);mr("onPointerEnter",["pointerout","pointerover"]);mr("onPointerLeave",["pointerout","pointerover"]);On("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));On("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));On("onBeforeInput",["compositionend","keypress","textInput","paste"]);On("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));On("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));On("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Qr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),O0=new Set("cancel close invalid load scroll toggle".split(" ").concat(Qr));function $c(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Om(r,t,void 0,e),e.currentTarget=null}function yf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],o=r.event;r=r.listeners;e:{var i=void 0;if(t)for(var l=r.length-1;0<=l;l--){var s=r[l],a=s.instance,u=s.currentTarget;if(s=s.listener,a!==i&&o.isPropagationStopped())break e;$c(o,s,u),i=a}else for(l=0;l<r.length;l++){if(s=r[l],a=s.instance,u=s.currentTarget,s=s.listener,a!==i&&o.isPropagationStopped())break e;$c(o,s,u),i=a}}}if(Pi)throw e=Da,Pi=!1,Da=null,e}function te(e,t){var n=t[Ja];n===void 0&&(n=t[Ja]=new Set);var r=e+"__bubble";n.has(r)||(bf(t,e,2,!1),n.add(r))}function fa(e,t,n){var r=0;t&&(r|=4),bf(n,e,r,t)}var ci="_reactListening"+Math.random().toString(36).slice(2);function go(e){if(!e[ci]){e[ci]=!0,Td.forEach(function(n){n!=="selectionchange"&&(O0.has(n)||fa(n,!1,e),fa(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[ci]||(t[ci]=!0,fa("selectionchange",!1,t))}}function bf(e,t,n,r){switch(tf(t)){case 1:var o=Km;break;case 4:o=Qm;break;default:o=Cs}n=o.bind(null,t,n,e),o=void 0,!Aa||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(o=!0),r?o!==void 0?e.addEventListener(t,n,{capture:!0,passive:o}):e.addEventListener(t,n,!0):o!==void 0?e.addEventListener(t,n,{passive:o}):e.addEventListener(t,n,!1)}function pa(e,t,n,r,o){var i=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var l=r.tag;if(l===3||l===4){var s=r.stateNode.containerInfo;if(s===o||s.nodeType===8&&s.parentNode===o)break;if(l===4)for(l=r.return;l!==null;){var a=l.tag;if((a===3||a===4)&&(a=l.stateNode.containerInfo,a===o||a.nodeType===8&&a.parentNode===o))return;l=l.return}for(;s!==null;){if(l=kn(s),l===null)return;if(a=l.tag,a===5||a===6){r=i=l;continue e}s=s.parentNode}}r=r.return}Wd(function(){var u=i,f=xs(n),g=[];e:{var h=vf.get(e);if(h!==void 0){var y=Ms,b=e;switch(e){case"keypress":if(bi(n)===0)break e;case"keydown":case"keyup":y=f0;break;case"focusin":b="focus",y=ua;break;case"focusout":b="blur",y=ua;break;case"beforeblur":case"afterblur":y=ua;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=_c;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=e0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=m0;break;case pf:case hf:case mf:y=r0;break;case gf:y=v0;break;case"scroll":y=Ym;break;case"wheel":y=b0;break;case"copy":case"cut":case"paste":y=i0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Oc}var v=(t&4)!==0,P=!v&&e==="scroll",c=v?h!==null?h+"Capture":null:h;v=[];for(var d=u,p;d!==null;){p=d;var m=p.stateNode;if(p.tag===5&&m!==null&&(p=m,c!==null&&(m=uo(d,c),m!=null&&v.push(vo(d,m,p)))),P)break;d=d.return}0<v.length&&(h=new y(h,b,null,n,f),g.push({event:h,listeners:v}))}}if(!(t&7)){e:{if(h=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",h&&n!==Na&&(b=n.relatedTarget||n.fromElement)&&(kn(b)||b[jt]))break e;if((y||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,y?(b=n.relatedTarget||n.toElement,y=u,b=b?kn(b):null,b!==null&&(P=In(b),b!==P||b.tag!==5&&b.tag!==6)&&(b=null)):(y=null,b=u),y!==b)){if(v=_c,m="onMouseLeave",c="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(v=Oc,m="onPointerLeave",c="onPointerEnter",d="pointer"),P=y==null?h:nr(y),p=b==null?h:nr(b),h=new v(m,d+"leave",y,n,f),h.target=P,h.relatedTarget=p,m=null,kn(f)===u&&(v=new v(c,d+"enter",b,n,f),v.target=p,v.relatedTarget=P,m=v),P=m,y&&b)t:{for(v=y,c=b,d=0,p=v;p;p=Kn(p))d++;for(p=0,m=c;m;m=Kn(m))p++;for(;0<d-p;)v=Kn(v),d--;for(;0<p-d;)c=Kn(c),p--;for(;d--;){if(v===c||c!==null&&v===c.alternate)break t;v=Kn(v),c=Kn(c)}v=null}else v=null;y!==null&&Vc(g,h,y,v,!1),b!==null&&P!==null&&Vc(g,P,b,v,!0)}}e:{if(h=u?nr(u):window,y=h.nodeName&&h.nodeName.toLowerCase(),y==="select"||y==="input"&&h.type==="file")var x=C0;else if(Fc(h))if(sf)x=R0;else{x=M0;var C=L0}else(y=h.nodeName)&&y.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(x=P0);if(x&&(x=x(e,u))){af(g,x,n,f);break e}C&&C(e,h,u),e==="focusout"&&(C=h._wrapperState)&&C.controlled&&h.type==="number"&&Ba(h,"number",h.value)}switch(C=u?nr(u):window,e){case"focusin":(Fc(C)||C.contentEditable==="true")&&(er=C,ja=u,no=null);break;case"focusout":no=ja=er=null;break;case"mousedown":Ga=!0;break;case"contextmenu":case"mouseup":case"dragend":Ga=!1,Wc(g,n,f);break;case"selectionchange":if(z0)break;case"keydown":case"keyup":Wc(g,n,f)}var E;if(Rs)e:{switch(e){case"compositionstart":var k="onCompositionStart";break e;case"compositionend":k="onCompositionEnd";break e;case"compositionupdate":k="onCompositionUpdate";break e}k=void 0}else Zn?of(e,n)&&(k="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(k="onCompositionStart");k&&(rf&&n.locale!=="ko"&&(Zn||k!=="onCompositionStart"?k==="onCompositionEnd"&&Zn&&(E=nf()):(Zt=f,Ls="value"in Zt?Zt.value:Zt.textContent,Zn=!0)),C=Oi(u,k),0<C.length&&(k=new zc(k,e,null,n,f),g.push({event:k,listeners:C}),E?k.data=E:(E=lf(n),E!==null&&(k.data=E)))),(E=S0?x0(e,n):E0(e,n))&&(u=Oi(u,"onBeforeInput"),0<u.length&&(f=new zc("onBeforeInput","beforeinput",null,n,f),g.push({event:f,listeners:u}),f.data=E))}yf(g,t)})}function vo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Oi(e,t){for(var n=t+"Capture",r=[];e!==null;){var o=e,i=o.stateNode;o.tag===5&&i!==null&&(o=i,i=uo(e,n),i!=null&&r.unshift(vo(e,i,o)),i=uo(e,t),i!=null&&r.push(vo(e,i,o))),e=e.return}return r}function Kn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Vc(e,t,n,r,o){for(var i=t._reactName,l=[];n!==null&&n!==r;){var s=n,a=s.alternate,u=s.stateNode;if(a!==null&&a===r)break;s.tag===5&&u!==null&&(s=u,o?(a=uo(n,i),a!=null&&l.unshift(vo(n,a,s))):o||(a=uo(n,i),a!=null&&l.push(vo(n,a,s)))),n=n.return}l.length!==0&&e.push({event:t,listeners:l})}var I0=/\r\n?/g,N0=/\u0000|\uFFFD/g;function Xc(e){return(typeof e=="string"?e:""+e).replace(I0,`
`).replace(N0,"")}function di(e,t,n){if(t=Xc(t),Xc(e)!==t&&n)throw Error(S(425))}function Ii(){}var $a=null,Va=null;function Xa(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var qa=typeof setTimeout=="function"?setTimeout:void 0,F0=typeof clearTimeout=="function"?clearTimeout:void 0,qc=typeof Promise=="function"?Promise:void 0,A0=typeof queueMicrotask=="function"?queueMicrotask:typeof qc<"u"?function(e){return qc.resolve(null).then(e).catch(D0)}:qa;function D0(e){setTimeout(function(){throw e})}function ha(e,t){var n=t,r=0;do{var o=n.nextSibling;if(e.removeChild(n),o&&o.nodeType===8)if(n=o.data,n==="/$"){if(r===0){e.removeChild(o),po(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=o}while(n);po(t)}function on(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Jc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Er=Math.random().toString(36).slice(2),Pt="__reactFiber$"+Er,yo="__reactProps$"+Er,jt="__reactContainer$"+Er,Ja="__reactEvents$"+Er,H0="__reactListeners$"+Er,W0="__reactHandles$"+Er;function kn(e){var t=e[Pt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[jt]||n[Pt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Jc(e);e!==null;){if(n=e[Pt])return n;e=Jc(e)}return t}e=n,n=e.parentNode}return null}function Lo(e){return e=e[Pt]||e[jt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function nr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(S(33))}function tl(e){return e[yo]||null}var Ka=[],rr=-1;function pn(e){return{current:e}}function ne(e){0>rr||(e.current=Ka[rr],Ka[rr]=null,rr--)}function ee(e,t){rr++,Ka[rr]=e.current,e.current=t}var dn={},Be=pn(dn),We=pn(!1),Pn=dn;function gr(e,t){var n=e.type.contextTypes;if(!n)return dn;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={},i;for(i in n)o[i]=t[i];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=o),o}function Ue(e){return e=e.childContextTypes,e!=null}function Ni(){ne(We),ne(Be)}function Kc(e,t,n){if(Be.current!==dn)throw Error(S(168));ee(Be,t),ee(We,n)}function wf(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var o in r)if(!(o in t))throw Error(S(108,Lm(e)||"Unknown",o));return se({},n,r)}function Fi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||dn,Pn=Be.current,ee(Be,e),ee(We,We.current),!0}function Qc(e,t,n){var r=e.stateNode;if(!r)throw Error(S(169));n?(e=wf(e,t,Pn),r.__reactInternalMemoizedMergedChildContext=e,ne(We),ne(Be),ee(Be,e)):ne(We),ee(We,n)}var At=null,nl=!1,ma=!1;function Sf(e){At===null?At=[e]:At.push(e)}function U0(e){nl=!0,Sf(e)}function hn(){if(!ma&&At!==null){ma=!0;var e=0,t=q;try{var n=At;for(q=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}At=null,nl=!1}catch(o){throw At!==null&&(At=At.slice(e+1)),$d(Es,hn),o}finally{q=t,ma=!1}}return null}var or=[],ir=0,Ai=null,Di=0,et=[],tt=0,Rn=null,Dt=1,Ht="";function xn(e,t){or[ir++]=Di,or[ir++]=Ai,Ai=e,Di=t}function xf(e,t,n){et[tt++]=Dt,et[tt++]=Ht,et[tt++]=Rn,Rn=e;var r=Dt;e=Ht;var o=32-gt(r)-1;r&=~(1<<o),n+=1;var i=32-gt(t)+o;if(30<i){var l=o-o%5;i=(r&(1<<l)-1).toString(32),r>>=l,o-=l,Dt=1<<32-gt(t)+o|n<<o|r,Ht=i+e}else Dt=1<<i|n<<o|r,Ht=e}function _s(e){e.return!==null&&(xn(e,1),xf(e,1,0))}function zs(e){for(;e===Ai;)Ai=or[--ir],or[ir]=null,Di=or[--ir],or[ir]=null;for(;e===Rn;)Rn=et[--tt],et[tt]=null,Ht=et[--tt],et[tt]=null,Dt=et[--tt],et[tt]=null}var qe=null,Xe=null,oe=!1,mt=null;function Ef(e,t){var n=nt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Yc(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,qe=e,Xe=on(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,qe=e,Xe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=Rn!==null?{id:Dt,overflow:Ht}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=nt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,qe=e,Xe=null,!0):!1;default:return!1}}function Qa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ya(e){if(oe){var t=Xe;if(t){var n=t;if(!Yc(e,t)){if(Qa(e))throw Error(S(418));t=on(n.nextSibling);var r=qe;t&&Yc(e,t)?Ef(r,n):(e.flags=e.flags&-4097|2,oe=!1,qe=e)}}else{if(Qa(e))throw Error(S(418));e.flags=e.flags&-4097|2,oe=!1,qe=e}}}function Zc(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;qe=e}function fi(e){if(e!==qe)return!1;if(!oe)return Zc(e),oe=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Xa(e.type,e.memoizedProps)),t&&(t=Xe)){if(Qa(e))throw kf(),Error(S(418));for(;t;)Ef(e,t),t=on(t.nextSibling)}if(Zc(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Xe=on(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Xe=null}}else Xe=qe?on(e.stateNode.nextSibling):null;return!0}function kf(){for(var e=Xe;e;)e=on(e.nextSibling)}function vr(){Xe=qe=null,oe=!1}function Os(e){mt===null?mt=[e]:mt.push(e)}var j0=Vt.ReactCurrentBatchConfig;function Gr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(S(309));var r=n.stateNode}if(!r)throw Error(S(147,e));var o=r,i=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===i?t.ref:(t=function(l){var s=o.refs;l===null?delete s[i]:s[i]=l},t._stringRef=i,t)}if(typeof e!="string")throw Error(S(284));if(!n._owner)throw Error(S(290,e))}return e}function pi(e,t){throw e=Object.prototype.toString.call(t),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function ed(e){var t=e._init;return t(e._payload)}function Tf(e){function t(c,d){if(e){var p=c.deletions;p===null?(c.deletions=[d],c.flags|=16):p.push(d)}}function n(c,d){if(!e)return null;for(;d!==null;)t(c,d),d=d.sibling;return null}function r(c,d){for(c=new Map;d!==null;)d.key!==null?c.set(d.key,d):c.set(d.index,d),d=d.sibling;return c}function o(c,d){return c=un(c,d),c.index=0,c.sibling=null,c}function i(c,d,p){return c.index=p,e?(p=c.alternate,p!==null?(p=p.index,p<d?(c.flags|=2,d):p):(c.flags|=2,d)):(c.flags|=1048576,d)}function l(c){return e&&c.alternate===null&&(c.flags|=2),c}function s(c,d,p,m){return d===null||d.tag!==6?(d=xa(p,c.mode,m),d.return=c,d):(d=o(d,p),d.return=c,d)}function a(c,d,p,m){var x=p.type;return x===Yn?f(c,d,p.props.children,m,p.key):d!==null&&(d.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Jt&&ed(x)===d.type)?(m=o(d,p.props),m.ref=Gr(c,d,p),m.return=c,m):(m=Ci(p.type,p.key,p.props,null,c.mode,m),m.ref=Gr(c,d,p),m.return=c,m)}function u(c,d,p,m){return d===null||d.tag!==4||d.stateNode.containerInfo!==p.containerInfo||d.stateNode.implementation!==p.implementation?(d=Ea(p,c.mode,m),d.return=c,d):(d=o(d,p.children||[]),d.return=c,d)}function f(c,d,p,m,x){return d===null||d.tag!==7?(d=Mn(p,c.mode,m,x),d.return=c,d):(d=o(d,p),d.return=c,d)}function g(c,d,p){if(typeof d=="string"&&d!==""||typeof d=="number")return d=xa(""+d,c.mode,p),d.return=c,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Yo:return p=Ci(d.type,d.key,d.props,null,c.mode,p),p.ref=Gr(c,null,d),p.return=c,p;case Qn:return d=Ea(d,c.mode,p),d.return=c,d;case Jt:var m=d._init;return g(c,m(d._payload),p)}if(Jr(d)||Hr(d))return d=Mn(d,c.mode,p,null),d.return=c,d;pi(c,d)}return null}function h(c,d,p,m){var x=d!==null?d.key:null;if(typeof p=="string"&&p!==""||typeof p=="number")return x!==null?null:s(c,d,""+p,m);if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Yo:return p.key===x?a(c,d,p,m):null;case Qn:return p.key===x?u(c,d,p,m):null;case Jt:return x=p._init,h(c,d,x(p._payload),m)}if(Jr(p)||Hr(p))return x!==null?null:f(c,d,p,m,null);pi(c,p)}return null}function y(c,d,p,m,x){if(typeof m=="string"&&m!==""||typeof m=="number")return c=c.get(p)||null,s(d,c,""+m,x);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case Yo:return c=c.get(m.key===null?p:m.key)||null,a(d,c,m,x);case Qn:return c=c.get(m.key===null?p:m.key)||null,u(d,c,m,x);case Jt:var C=m._init;return y(c,d,p,C(m._payload),x)}if(Jr(m)||Hr(m))return c=c.get(p)||null,f(d,c,m,x,null);pi(d,m)}return null}function b(c,d,p,m){for(var x=null,C=null,E=d,k=d=0,O=null;E!==null&&k<p.length;k++){E.index>k?(O=E,E=null):O=E.sibling;var T=h(c,E,p[k],m);if(T===null){E===null&&(E=O);break}e&&E&&T.alternate===null&&t(c,E),d=i(T,d,k),C===null?x=T:C.sibling=T,C=T,E=O}if(k===p.length)return n(c,E),oe&&xn(c,k),x;if(E===null){for(;k<p.length;k++)E=g(c,p[k],m),E!==null&&(d=i(E,d,k),C===null?x=E:C.sibling=E,C=E);return oe&&xn(c,k),x}for(E=r(c,E);k<p.length;k++)O=y(E,c,k,p[k],m),O!==null&&(e&&O.alternate!==null&&E.delete(O.key===null?k:O.key),d=i(O,d,k),C===null?x=O:C.sibling=O,C=O);return e&&E.forEach(function(D){return t(c,D)}),oe&&xn(c,k),x}function v(c,d,p,m){var x=Hr(p);if(typeof x!="function")throw Error(S(150));if(p=x.call(p),p==null)throw Error(S(151));for(var C=x=null,E=d,k=d=0,O=null,T=p.next();E!==null&&!T.done;k++,T=p.next()){E.index>k?(O=E,E=null):O=E.sibling;var D=h(c,E,T.value,m);if(D===null){E===null&&(E=O);break}e&&E&&D.alternate===null&&t(c,E),d=i(D,d,k),C===null?x=D:C.sibling=D,C=D,E=O}if(T.done)return n(c,E),oe&&xn(c,k),x;if(E===null){for(;!T.done;k++,T=p.next())T=g(c,T.value,m),T!==null&&(d=i(T,d,k),C===null?x=T:C.sibling=T,C=T);return oe&&xn(c,k),x}for(E=r(c,E);!T.done;k++,T=p.next())T=y(E,c,k,T.value,m),T!==null&&(e&&T.alternate!==null&&E.delete(T.key===null?k:T.key),d=i(T,d,k),C===null?x=T:C.sibling=T,C=T);return e&&E.forEach(function(R){return t(c,R)}),oe&&xn(c,k),x}function P(c,d,p,m){if(typeof p=="object"&&p!==null&&p.type===Yn&&p.key===null&&(p=p.props.children),typeof p=="object"&&p!==null){switch(p.$$typeof){case Yo:e:{for(var x=p.key,C=d;C!==null;){if(C.key===x){if(x=p.type,x===Yn){if(C.tag===7){n(c,C.sibling),d=o(C,p.props.children),d.return=c,c=d;break e}}else if(C.elementType===x||typeof x=="object"&&x!==null&&x.$$typeof===Jt&&ed(x)===C.type){n(c,C.sibling),d=o(C,p.props),d.ref=Gr(c,C,p),d.return=c,c=d;break e}n(c,C);break}else t(c,C);C=C.sibling}p.type===Yn?(d=Mn(p.props.children,c.mode,m,p.key),d.return=c,c=d):(m=Ci(p.type,p.key,p.props,null,c.mode,m),m.ref=Gr(c,d,p),m.return=c,c=m)}return l(c);case Qn:e:{for(C=p.key;d!==null;){if(d.key===C)if(d.tag===4&&d.stateNode.containerInfo===p.containerInfo&&d.stateNode.implementation===p.implementation){n(c,d.sibling),d=o(d,p.children||[]),d.return=c,c=d;break e}else{n(c,d);break}else t(c,d);d=d.sibling}d=Ea(p,c.mode,m),d.return=c,c=d}return l(c);case Jt:return C=p._init,P(c,d,C(p._payload),m)}if(Jr(p))return b(c,d,p,m);if(Hr(p))return v(c,d,p,m);pi(c,p)}return typeof p=="string"&&p!==""||typeof p=="number"?(p=""+p,d!==null&&d.tag===6?(n(c,d.sibling),d=o(d,p),d.return=c,c=d):(n(c,d),d=xa(p,c.mode,m),d.return=c,c=d),l(c)):n(c,d)}return P}var yr=Tf(!0),Cf=Tf(!1),Hi=pn(null),Wi=null,lr=null,Is=null;function Ns(){Is=lr=Wi=null}function Fs(e){var t=Hi.current;ne(Hi),e._currentValue=t}function Za(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function pr(e,t){Wi=e,Is=lr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(He=!0),e.firstContext=null)}function ot(e){var t=e._currentValue;if(Is!==e)if(e={context:e,memoizedValue:t,next:null},lr===null){if(Wi===null)throw Error(S(308));lr=e,Wi.dependencies={lanes:0,firstContext:e}}else lr=lr.next=e;return t}var Tn=null;function As(e){Tn===null?Tn=[e]:Tn.push(e)}function Lf(e,t,n,r){var o=t.interleaved;return o===null?(n.next=n,As(t)):(n.next=o.next,o.next=n),t.interleaved=n,Gt(e,r)}function Gt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Kt=!1;function Ds(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Mf(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Wt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function ln(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,V&2){var o=r.pending;return o===null?t.next=t:(t.next=o.next,o.next=t),r.pending=t,Gt(e,n)}return o=r.interleaved,o===null?(t.next=t,As(r)):(t.next=o.next,o.next=t),r.interleaved=t,Gt(e,n)}function wi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ks(e,n)}}function td(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var o=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var l={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?o=i=l:i=i.next=l,n=n.next}while(n!==null);i===null?o=i=t:i=i.next=t}else o=i=t;n={baseState:r.baseState,firstBaseUpdate:o,lastBaseUpdate:i,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function Ui(e,t,n,r){var o=e.updateQueue;Kt=!1;var i=o.firstBaseUpdate,l=o.lastBaseUpdate,s=o.shared.pending;if(s!==null){o.shared.pending=null;var a=s,u=a.next;a.next=null,l===null?i=u:l.next=u,l=a;var f=e.alternate;f!==null&&(f=f.updateQueue,s=f.lastBaseUpdate,s!==l&&(s===null?f.firstBaseUpdate=u:s.next=u,f.lastBaseUpdate=a))}if(i!==null){var g=o.baseState;l=0,f=u=a=null,s=i;do{var h=s.lane,y=s.eventTime;if((r&h)===h){f!==null&&(f=f.next={eventTime:y,lane:0,tag:s.tag,payload:s.payload,callback:s.callback,next:null});e:{var b=e,v=s;switch(h=t,y=n,v.tag){case 1:if(b=v.payload,typeof b=="function"){g=b.call(y,g,h);break e}g=b;break e;case 3:b.flags=b.flags&-65537|128;case 0:if(b=v.payload,h=typeof b=="function"?b.call(y,g,h):b,h==null)break e;g=se({},g,h);break e;case 2:Kt=!0}}s.callback!==null&&s.lane!==0&&(e.flags|=64,h=o.effects,h===null?o.effects=[s]:h.push(s))}else y={eventTime:y,lane:h,tag:s.tag,payload:s.payload,callback:s.callback,next:null},f===null?(u=f=y,a=g):f=f.next=y,l|=h;if(s=s.next,s===null){if(s=o.shared.pending,s===null)break;h=s,s=h.next,h.next=null,o.lastBaseUpdate=h,o.shared.pending=null}}while(!0);if(f===null&&(a=g),o.baseState=a,o.firstBaseUpdate=u,o.lastBaseUpdate=f,t=o.shared.interleaved,t!==null){o=t;do l|=o.lane,o=o.next;while(o!==t)}else i===null&&(o.shared.lanes=0);_n|=l,e.lanes=l,e.memoizedState=g}}function nd(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],o=r.callback;if(o!==null){if(r.callback=null,r=n,typeof o!="function")throw Error(S(191,o));o.call(r)}}}var Mo={},Bt=pn(Mo),bo=pn(Mo),wo=pn(Mo);function Cn(e){if(e===Mo)throw Error(S(174));return e}function Hs(e,t){switch(ee(wo,t),ee(bo,e),ee(Bt,Mo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:za(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=za(t,e)}ne(Bt),ee(Bt,t)}function br(){ne(Bt),ne(bo),ne(wo)}function Pf(e){Cn(wo.current);var t=Cn(Bt.current),n=za(t,e.type);t!==n&&(ee(bo,e),ee(Bt,n))}function Ws(e){bo.current===e&&(ne(Bt),ne(bo))}var le=pn(0);function ji(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ga=[];function Us(){for(var e=0;e<ga.length;e++)ga[e]._workInProgressVersionPrimary=null;ga.length=0}var Si=Vt.ReactCurrentDispatcher,va=Vt.ReactCurrentBatchConfig,Bn=0,ae=null,pe=null,be=null,Gi=!1,ro=!1,So=0,G0=0;function Me(){throw Error(S(321))}function js(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!yt(e[n],t[n]))return!1;return!0}function Gs(e,t,n,r,o,i){if(Bn=i,ae=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Si.current=e===null||e.memoizedState===null?q0:J0,e=n(r,o),ro){i=0;do{if(ro=!1,So=0,25<=i)throw Error(S(301));i+=1,be=pe=null,t.updateQueue=null,Si.current=K0,e=n(r,o)}while(ro)}if(Si.current=$i,t=pe!==null&&pe.next!==null,Bn=0,be=pe=ae=null,Gi=!1,t)throw Error(S(300));return e}function $s(){var e=So!==0;return So=0,e}function Mt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return be===null?ae.memoizedState=be=e:be=be.next=e,be}function it(){if(pe===null){var e=ae.alternate;e=e!==null?e.memoizedState:null}else e=pe.next;var t=be===null?ae.memoizedState:be.next;if(t!==null)be=t,pe=e;else{if(e===null)throw Error(S(310));pe=e,e={memoizedState:pe.memoizedState,baseState:pe.baseState,baseQueue:pe.baseQueue,queue:pe.queue,next:null},be===null?ae.memoizedState=be=e:be=be.next=e}return be}function xo(e,t){return typeof t=="function"?t(e):t}function ya(e){var t=it(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var r=pe,o=r.baseQueue,i=n.pending;if(i!==null){if(o!==null){var l=o.next;o.next=i.next,i.next=l}r.baseQueue=o=i,n.pending=null}if(o!==null){i=o.next,r=r.baseState;var s=l=null,a=null,u=i;do{var f=u.lane;if((Bn&f)===f)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var g={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(s=a=g,l=r):a=a.next=g,ae.lanes|=f,_n|=f}u=u.next}while(u!==null&&u!==i);a===null?l=r:a.next=s,yt(r,t.memoizedState)||(He=!0),t.memoizedState=r,t.baseState=l,t.baseQueue=a,n.lastRenderedState=r}if(e=n.interleaved,e!==null){o=e;do i=o.lane,ae.lanes|=i,_n|=i,o=o.next;while(o!==e)}else o===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function ba(e){var t=it(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var r=n.dispatch,o=n.pending,i=t.memoizedState;if(o!==null){n.pending=null;var l=o=o.next;do i=e(i,l.action),l=l.next;while(l!==o);yt(i,t.memoizedState)||(He=!0),t.memoizedState=i,t.baseQueue===null&&(t.baseState=i),n.lastRenderedState=i}return[i,r]}function Rf(){}function Bf(e,t){var n=ae,r=it(),o=t(),i=!yt(r.memoizedState,o);if(i&&(r.memoizedState=o,He=!0),r=r.queue,Vs(Of.bind(null,n,r,e),[e]),r.getSnapshot!==t||i||be!==null&&be.memoizedState.tag&1){if(n.flags|=2048,Eo(9,zf.bind(null,n,r,o,t),void 0,null),we===null)throw Error(S(349));Bn&30||_f(n,t,o)}return o}function _f(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ae.updateQueue,t===null?(t={lastEffect:null,stores:null},ae.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function zf(e,t,n,r){t.value=n,t.getSnapshot=r,If(t)&&Nf(e)}function Of(e,t,n){return n(function(){If(t)&&Nf(e)})}function If(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!yt(e,n)}catch{return!0}}function Nf(e){var t=Gt(e,1);t!==null&&vt(t,e,1,-1)}function rd(e){var t=Mt();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:xo,lastRenderedState:e},t.queue=e,e=e.dispatch=X0.bind(null,ae,e),[t.memoizedState,e]}function Eo(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=ae.updateQueue,t===null?(t={lastEffect:null,stores:null},ae.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Ff(){return it().memoizedState}function xi(e,t,n,r){var o=Mt();ae.flags|=e,o.memoizedState=Eo(1|t,n,void 0,r===void 0?null:r)}function rl(e,t,n,r){var o=it();r=r===void 0?null:r;var i=void 0;if(pe!==null){var l=pe.memoizedState;if(i=l.destroy,r!==null&&js(r,l.deps)){o.memoizedState=Eo(t,n,i,r);return}}ae.flags|=e,o.memoizedState=Eo(1|t,n,i,r)}function od(e,t){return xi(8390656,8,e,t)}function Vs(e,t){return rl(2048,8,e,t)}function Af(e,t){return rl(4,2,e,t)}function Df(e,t){return rl(4,4,e,t)}function Hf(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Wf(e,t,n){return n=n!=null?n.concat([e]):null,rl(4,4,Hf.bind(null,t,e),n)}function Xs(){}function Uf(e,t){var n=it();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&js(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function jf(e,t){var n=it();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&js(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Gf(e,t,n){return Bn&21?(yt(n,t)||(n=qd(),ae.lanes|=n,_n|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,He=!0),e.memoizedState=n)}function $0(e,t){var n=q;q=n!==0&&4>n?n:4,e(!0);var r=va.transition;va.transition={};try{e(!1),t()}finally{q=n,va.transition=r}}function $f(){return it().memoizedState}function V0(e,t,n){var r=sn(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Vf(e))Xf(t,n);else if(n=Lf(e,t,n,r),n!==null){var o=Ne();vt(n,e,r,o),qf(n,t,r)}}function X0(e,t,n){var r=sn(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Vf(e))Xf(t,o);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=t.lastRenderedReducer,i!==null))try{var l=t.lastRenderedState,s=i(l,n);if(o.hasEagerState=!0,o.eagerState=s,yt(s,l)){var a=t.interleaved;a===null?(o.next=o,As(t)):(o.next=a.next,a.next=o),t.interleaved=o;return}}catch{}finally{}n=Lf(e,t,o,r),n!==null&&(o=Ne(),vt(n,e,r,o),qf(n,t,r))}}function Vf(e){var t=e.alternate;return e===ae||t!==null&&t===ae}function Xf(e,t){ro=Gi=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function qf(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,ks(e,n)}}var $i={readContext:ot,useCallback:Me,useContext:Me,useEffect:Me,useImperativeHandle:Me,useInsertionEffect:Me,useLayoutEffect:Me,useMemo:Me,useReducer:Me,useRef:Me,useState:Me,useDebugValue:Me,useDeferredValue:Me,useTransition:Me,useMutableSource:Me,useSyncExternalStore:Me,useId:Me,unstable_isNewReconciler:!1},q0={readContext:ot,useCallback:function(e,t){return Mt().memoizedState=[e,t===void 0?null:t],e},useContext:ot,useEffect:od,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,xi(4194308,4,Hf.bind(null,t,e),n)},useLayoutEffect:function(e,t){return xi(4194308,4,e,t)},useInsertionEffect:function(e,t){return xi(4,2,e,t)},useMemo:function(e,t){var n=Mt();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Mt();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=V0.bind(null,ae,e),[r.memoizedState,e]},useRef:function(e){var t=Mt();return e={current:e},t.memoizedState=e},useState:rd,useDebugValue:Xs,useDeferredValue:function(e){return Mt().memoizedState=e},useTransition:function(){var e=rd(!1),t=e[0];return e=$0.bind(null,e[1]),Mt().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=ae,o=Mt();if(oe){if(n===void 0)throw Error(S(407));n=n()}else{if(n=t(),we===null)throw Error(S(349));Bn&30||_f(r,t,n)}o.memoizedState=n;var i={value:n,getSnapshot:t};return o.queue=i,od(Of.bind(null,r,i,e),[e]),r.flags|=2048,Eo(9,zf.bind(null,r,i,n,t),void 0,null),n},useId:function(){var e=Mt(),t=we.identifierPrefix;if(oe){var n=Ht,r=Dt;n=(r&~(1<<32-gt(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=So++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=G0++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},J0={readContext:ot,useCallback:Uf,useContext:ot,useEffect:Vs,useImperativeHandle:Wf,useInsertionEffect:Af,useLayoutEffect:Df,useMemo:jf,useReducer:ya,useRef:Ff,useState:function(){return ya(xo)},useDebugValue:Xs,useDeferredValue:function(e){var t=it();return Gf(t,pe.memoizedState,e)},useTransition:function(){var e=ya(xo)[0],t=it().memoizedState;return[e,t]},useMutableSource:Rf,useSyncExternalStore:Bf,useId:$f,unstable_isNewReconciler:!1},K0={readContext:ot,useCallback:Uf,useContext:ot,useEffect:Vs,useImperativeHandle:Wf,useInsertionEffect:Af,useLayoutEffect:Df,useMemo:jf,useReducer:ba,useRef:Ff,useState:function(){return ba(xo)},useDebugValue:Xs,useDeferredValue:function(e){var t=it();return pe===null?t.memoizedState=e:Gf(t,pe.memoizedState,e)},useTransition:function(){var e=ba(xo)[0],t=it().memoizedState;return[e,t]},useMutableSource:Rf,useSyncExternalStore:Bf,useId:$f,unstable_isNewReconciler:!1};function pt(e,t){if(e&&e.defaultProps){t=se({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function es(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:se({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var ol={isMounted:function(e){return(e=e._reactInternals)?In(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ne(),o=sn(e),i=Wt(r,o);i.payload=t,n!=null&&(i.callback=n),t=ln(e,i,o),t!==null&&(vt(t,e,o,r),wi(t,e,o))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ne(),o=sn(e),i=Wt(r,o);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=ln(e,i,o),t!==null&&(vt(t,e,o,r),wi(t,e,o))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ne(),r=sn(e),o=Wt(n,r);o.tag=2,t!=null&&(o.callback=t),t=ln(e,o,r),t!==null&&(vt(t,e,r,n),wi(t,e,r))}};function id(e,t,n,r,o,i,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,i,l):t.prototype&&t.prototype.isPureReactComponent?!mo(n,r)||!mo(o,i):!0}function Jf(e,t,n){var r=!1,o=dn,i=t.contextType;return typeof i=="object"&&i!==null?i=ot(i):(o=Ue(t)?Pn:Be.current,r=t.contextTypes,i=(r=r!=null)?gr(e,o):dn),t=new t(n,i),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=ol,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=o,e.__reactInternalMemoizedMaskedChildContext=i),t}function ld(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&ol.enqueueReplaceState(t,t.state,null)}function ts(e,t,n,r){var o=e.stateNode;o.props=n,o.state=e.memoizedState,o.refs={},Ds(e);var i=t.contextType;typeof i=="object"&&i!==null?o.context=ot(i):(i=Ue(t)?Pn:Be.current,o.context=gr(e,i)),o.state=e.memoizedState,i=t.getDerivedStateFromProps,typeof i=="function"&&(es(e,t,i,n),o.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(t=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),t!==o.state&&ol.enqueueReplaceState(o,o.state,null),Ui(e,n,o,r),o.state=e.memoizedState),typeof o.componentDidMount=="function"&&(e.flags|=4194308)}function wr(e,t){try{var n="",r=t;do n+=Cm(r),r=r.return;while(r);var o=n}catch(i){o=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:t,stack:o,digest:null}}function wa(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ns(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Q0=typeof WeakMap=="function"?WeakMap:Map;function Kf(e,t,n){n=Wt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){Xi||(Xi=!0,fs=r),ns(e,t)},n}function Qf(e,t,n){n=Wt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var o=t.value;n.payload=function(){return r(o)},n.callback=function(){ns(e,t)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){ns(e,t),typeof r!="function"&&(an===null?an=new Set([this]):an.add(this));var l=t.stack;this.componentDidCatch(t.value,{componentStack:l!==null?l:""})}),n}function ad(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Q0;var o=new Set;r.set(t,o)}else o=r.get(t),o===void 0&&(o=new Set,r.set(t,o));o.has(n)||(o.add(n),e=dg.bind(null,e,t,n),t.then(e,e))}function sd(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function ud(e,t,n,r,o){return e.mode&1?(e.flags|=65536,e.lanes=o,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Wt(-1,1),t.tag=2,ln(n,t,1))),n.lanes|=1),e)}var Y0=Vt.ReactCurrentOwner,He=!1;function Ie(e,t,n,r){t.child=e===null?Cf(t,null,n,r):yr(t,e.child,n,r)}function cd(e,t,n,r,o){n=n.render;var i=t.ref;return pr(t,o),r=Gs(e,t,n,r,i,o),n=$s(),e!==null&&!He?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,$t(e,t,o)):(oe&&n&&_s(t),t.flags|=1,Ie(e,t,r,o),t.child)}function dd(e,t,n,r,o){if(e===null){var i=n.type;return typeof i=="function"&&!tu(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=i,Yf(e,t,i,r,o)):(e=Ci(n.type,null,r,t,t.mode,o),e.ref=t.ref,e.return=t,t.child=e)}if(i=e.child,!(e.lanes&o)){var l=i.memoizedProps;if(n=n.compare,n=n!==null?n:mo,n(l,r)&&e.ref===t.ref)return $t(e,t,o)}return t.flags|=1,e=un(i,r),e.ref=t.ref,e.return=t,t.child=e}function Yf(e,t,n,r,o){if(e!==null){var i=e.memoizedProps;if(mo(i,r)&&e.ref===t.ref)if(He=!1,t.pendingProps=r=i,(e.lanes&o)!==0)e.flags&131072&&(He=!0);else return t.lanes=e.lanes,$t(e,t,o)}return rs(e,t,n,r,o)}function Zf(e,t,n){var r=t.pendingProps,o=r.children,i=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},ee(sr,Ve),Ve|=n;else{if(!(n&1073741824))return e=i!==null?i.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,ee(sr,Ve),Ve|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,ee(sr,Ve),Ve|=r}else i!==null?(r=i.baseLanes|n,t.memoizedState=null):r=n,ee(sr,Ve),Ve|=r;return Ie(e,t,o,n),t.child}function ep(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function rs(e,t,n,r,o){var i=Ue(n)?Pn:Be.current;return i=gr(t,i),pr(t,o),n=Gs(e,t,n,r,i,o),r=$s(),e!==null&&!He?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~o,$t(e,t,o)):(oe&&r&&_s(t),t.flags|=1,Ie(e,t,n,o),t.child)}function fd(e,t,n,r,o){if(Ue(n)){var i=!0;Fi(t)}else i=!1;if(pr(t,o),t.stateNode===null)Ei(e,t),Jf(t,n,r),ts(t,n,r,o),r=!0;else if(e===null){var l=t.stateNode,s=t.memoizedProps;l.props=s;var a=l.context,u=n.contextType;typeof u=="object"&&u!==null?u=ot(u):(u=Ue(n)?Pn:Be.current,u=gr(t,u));var f=n.getDerivedStateFromProps,g=typeof f=="function"||typeof l.getSnapshotBeforeUpdate=="function";g||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==r||a!==u)&&ld(t,l,r,u),Kt=!1;var h=t.memoizedState;l.state=h,Ui(t,r,l,o),a=t.memoizedState,s!==r||h!==a||We.current||Kt?(typeof f=="function"&&(es(t,n,f,r),a=t.memoizedState),(s=Kt||id(t,n,s,r,h,a,u))?(g||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(t.flags|=4194308)):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=a),l.props=r,l.state=a,l.context=u,r=s):(typeof l.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{l=t.stateNode,Mf(e,t),s=t.memoizedProps,u=t.type===t.elementType?s:pt(t.type,s),l.props=u,g=t.pendingProps,h=l.context,a=n.contextType,typeof a=="object"&&a!==null?a=ot(a):(a=Ue(n)?Pn:Be.current,a=gr(t,a));var y=n.getDerivedStateFromProps;(f=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(s!==g||h!==a)&&ld(t,l,r,a),Kt=!1,h=t.memoizedState,l.state=h,Ui(t,r,l,o);var b=t.memoizedState;s!==g||h!==b||We.current||Kt?(typeof y=="function"&&(es(t,n,y,r),b=t.memoizedState),(u=Kt||id(t,n,u,r,h,b,a)||!1)?(f||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(r,b,a),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(r,b,a)),typeof l.componentDidUpdate=="function"&&(t.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=b),l.props=r,l.state=b,l.context=a,r=u):(typeof l.componentDidUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||s===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),r=!1)}return os(e,t,n,r,i,o)}function os(e,t,n,r,o,i){ep(e,t);var l=(t.flags&128)!==0;if(!r&&!l)return o&&Qc(t,n,!1),$t(e,t,i);r=t.stateNode,Y0.current=t;var s=l&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&l?(t.child=yr(t,e.child,null,i),t.child=yr(t,null,s,i)):Ie(e,t,s,i),t.memoizedState=r.state,o&&Qc(t,n,!0),t.child}function tp(e){var t=e.stateNode;t.pendingContext?Kc(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Kc(e,t.context,!1),Hs(e,t.containerInfo)}function pd(e,t,n,r,o){return vr(),Os(o),t.flags|=256,Ie(e,t,n,r),t.child}var is={dehydrated:null,treeContext:null,retryLane:0};function ls(e){return{baseLanes:e,cachePool:null,transitions:null}}function np(e,t,n){var r=t.pendingProps,o=le.current,i=!1,l=(t.flags&128)!==0,s;if((s=l)||(s=e!==null&&e.memoizedState===null?!1:(o&2)!==0),s?(i=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(o|=1),ee(le,o&1),e===null)return Ya(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(l=r.children,e=r.fallback,i?(r=t.mode,i=t.child,l={mode:"hidden",children:l},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=l):i=al(l,r,0,null),e=Mn(e,r,n,null),i.return=t,e.return=t,i.sibling=e,t.child=i,t.child.memoizedState=ls(n),t.memoizedState=is,e):qs(t,l));if(o=e.memoizedState,o!==null&&(s=o.dehydrated,s!==null))return Z0(e,t,l,r,s,o,n);if(i){i=r.fallback,l=t.mode,o=e.child,s=o.sibling;var a={mode:"hidden",children:r.children};return!(l&1)&&t.child!==o?(r=t.child,r.childLanes=0,r.pendingProps=a,t.deletions=null):(r=un(o,a),r.subtreeFlags=o.subtreeFlags&14680064),s!==null?i=un(s,i):(i=Mn(i,l,n,null),i.flags|=2),i.return=t,r.return=t,r.sibling=i,t.child=r,r=i,i=t.child,l=e.child.memoizedState,l=l===null?ls(n):{baseLanes:l.baseLanes|n,cachePool:null,transitions:l.transitions},i.memoizedState=l,i.childLanes=e.childLanes&~n,t.memoizedState=is,r}return i=e.child,e=i.sibling,r=un(i,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function qs(e,t){return t=al({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function hi(e,t,n,r){return r!==null&&Os(r),yr(t,e.child,null,n),e=qs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Z0(e,t,n,r,o,i,l){if(n)return t.flags&256?(t.flags&=-257,r=wa(Error(S(422))),hi(e,t,l,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(i=r.fallback,o=t.mode,r=al({mode:"visible",children:r.children},o,0,null),i=Mn(i,o,l,null),i.flags|=2,r.return=t,i.return=t,r.sibling=i,t.child=r,t.mode&1&&yr(t,e.child,null,l),t.child.memoizedState=ls(l),t.memoizedState=is,i);if(!(t.mode&1))return hi(e,t,l,null);if(o.data==="$!"){if(r=o.nextSibling&&o.nextSibling.dataset,r)var s=r.dgst;return r=s,i=Error(S(419)),r=wa(i,r,void 0),hi(e,t,l,r)}if(s=(l&e.childLanes)!==0,He||s){if(r=we,r!==null){switch(l&-l){case 4:o=2;break;case 16:o=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:o=32;break;case 536870912:o=268435456;break;default:o=0}o=o&(r.suspendedLanes|l)?0:o,o!==0&&o!==i.retryLane&&(i.retryLane=o,Gt(e,o),vt(r,e,o,-1))}return eu(),r=wa(Error(S(421))),hi(e,t,l,r)}return o.data==="$?"?(t.flags|=128,t.child=e.child,t=fg.bind(null,e),o._reactRetry=t,null):(e=i.treeContext,Xe=on(o.nextSibling),qe=t,oe=!0,mt=null,e!==null&&(et[tt++]=Dt,et[tt++]=Ht,et[tt++]=Rn,Dt=e.id,Ht=e.overflow,Rn=t),t=qs(t,r.children),t.flags|=4096,t)}function hd(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Za(e.return,t,n)}function Sa(e,t,n,r,o){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}function rp(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail;if(Ie(e,t,r.children,n),r=le.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&hd(e,n,t);else if(e.tag===19)hd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(ee(le,r),!(t.mode&1))t.memoizedState=null;else switch(o){case"forwards":for(n=t.child,o=null;n!==null;)e=n.alternate,e!==null&&ji(e)===null&&(o=n),n=n.sibling;n=o,n===null?(o=t.child,t.child=null):(o=n.sibling,n.sibling=null),Sa(t,!1,o,n,i);break;case"backwards":for(n=null,o=t.child,t.child=null;o!==null;){if(e=o.alternate,e!==null&&ji(e)===null){t.child=o;break}e=o.sibling,o.sibling=n,n=o,o=e}Sa(t,!0,n,null,i);break;case"together":Sa(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Ei(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function $t(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),_n|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(S(153));if(t.child!==null){for(e=t.child,n=un(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=un(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function eg(e,t,n){switch(t.tag){case 3:tp(t),vr();break;case 5:Pf(t);break;case 1:Ue(t.type)&&Fi(t);break;case 4:Hs(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,o=t.memoizedProps.value;ee(Hi,r._currentValue),r._currentValue=o;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(ee(le,le.current&1),t.flags|=128,null):n&t.child.childLanes?np(e,t,n):(ee(le,le.current&1),e=$t(e,t,n),e!==null?e.sibling:null);ee(le,le.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return rp(e,t,n);t.flags|=128}if(o=t.memoizedState,o!==null&&(o.rendering=null,o.tail=null,o.lastEffect=null),ee(le,le.current),r)break;return null;case 22:case 23:return t.lanes=0,Zf(e,t,n)}return $t(e,t,n)}var op,as,ip,lp;op=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};as=function(){};ip=function(e,t,n,r){var o=e.memoizedProps;if(o!==r){e=t.stateNode,Cn(Bt.current);var i=null;switch(n){case"input":o=Pa(e,o),r=Pa(e,r),i=[];break;case"select":o=se({},o,{value:void 0}),r=se({},r,{value:void 0}),i=[];break;case"textarea":o=_a(e,o),r=_a(e,r),i=[];break;default:typeof o.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Ii)}Oa(n,r);var l;n=null;for(u in o)if(!r.hasOwnProperty(u)&&o.hasOwnProperty(u)&&o[u]!=null)if(u==="style"){var s=o[u];for(l in s)s.hasOwnProperty(l)&&(n||(n={}),n[l]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(ao.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var a=r[u];if(s=o?.[u],r.hasOwnProperty(u)&&a!==s&&(a!=null||s!=null))if(u==="style")if(s){for(l in s)!s.hasOwnProperty(l)||a&&a.hasOwnProperty(l)||(n||(n={}),n[l]="");for(l in a)a.hasOwnProperty(l)&&s[l]!==a[l]&&(n||(n={}),n[l]=a[l])}else n||(i||(i=[]),i.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,s=s?s.__html:void 0,a!=null&&s!==a&&(i=i||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(i=i||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(ao.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&te("scroll",e),i||s===a||(i=[])):(i=i||[]).push(u,a))}n&&(i=i||[]).push("style",n);var u=i;(t.updateQueue=u)&&(t.flags|=4)}};lp=function(e,t,n,r){n!==r&&(t.flags|=4)};function $r(e,t){if(!oe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function Pe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags&14680064,r|=o.flags&14680064,o.return=e,o=o.sibling;else for(o=e.child;o!==null;)n|=o.lanes|o.childLanes,r|=o.subtreeFlags,r|=o.flags,o.return=e,o=o.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function tg(e,t,n){var r=t.pendingProps;switch(zs(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Pe(t),null;case 1:return Ue(t.type)&&Ni(),Pe(t),null;case 3:return r=t.stateNode,br(),ne(We),ne(Be),Us(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(fi(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,mt!==null&&(ms(mt),mt=null))),as(e,t),Pe(t),null;case 5:Ws(t);var o=Cn(wo.current);if(n=t.type,e!==null&&t.stateNode!=null)ip(e,t,n,r,o),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(S(166));return Pe(t),null}if(e=Cn(Bt.current),fi(t)){r=t.stateNode,n=t.type;var i=t.memoizedProps;switch(r[Pt]=t,r[yo]=i,e=(t.mode&1)!==0,n){case"dialog":te("cancel",r),te("close",r);break;case"iframe":case"object":case"embed":te("load",r);break;case"video":case"audio":for(o=0;o<Qr.length;o++)te(Qr[o],r);break;case"source":te("error",r);break;case"img":case"image":case"link":te("error",r),te("load",r);break;case"details":te("toggle",r);break;case"input":xc(r,i),te("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},te("invalid",r);break;case"textarea":kc(r,i),te("invalid",r)}Oa(n,i),o=null;for(var l in i)if(i.hasOwnProperty(l)){var s=i[l];l==="children"?typeof s=="string"?r.textContent!==s&&(i.suppressHydrationWarning!==!0&&di(r.textContent,s,e),o=["children",s]):typeof s=="number"&&r.textContent!==""+s&&(i.suppressHydrationWarning!==!0&&di(r.textContent,s,e),o=["children",""+s]):ao.hasOwnProperty(l)&&s!=null&&l==="onScroll"&&te("scroll",r)}switch(n){case"input":Zo(r),Ec(r,i,!0);break;case"textarea":Zo(r),Tc(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=Ii)}r=o,t.updateQueue=r,r!==null&&(t.flags|=4)}else{l=o.nodeType===9?o:o.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=zd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=l.createElement(n,{is:r.is}):(e=l.createElement(n),n==="select"&&(l=e,r.multiple?l.multiple=!0:r.size&&(l.size=r.size))):e=l.createElementNS(e,n),e[Pt]=t,e[yo]=r,op(e,t,!1,!1),t.stateNode=e;e:{switch(l=Ia(n,r),n){case"dialog":te("cancel",e),te("close",e),o=r;break;case"iframe":case"object":case"embed":te("load",e),o=r;break;case"video":case"audio":for(o=0;o<Qr.length;o++)te(Qr[o],e);o=r;break;case"source":te("error",e),o=r;break;case"img":case"image":case"link":te("error",e),te("load",e),o=r;break;case"details":te("toggle",e),o=r;break;case"input":xc(e,r),o=Pa(e,r),te("invalid",e);break;case"option":o=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},o=se({},r,{value:void 0}),te("invalid",e);break;case"textarea":kc(e,r),o=_a(e,r),te("invalid",e);break;default:o=r}Oa(n,o),s=o;for(i in s)if(s.hasOwnProperty(i)){var a=s[i];i==="style"?Nd(e,a):i==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Od(e,a)):i==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&so(e,a):typeof a=="number"&&so(e,""+a):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(ao.hasOwnProperty(i)?a!=null&&i==="onScroll"&&te("scroll",e):a!=null&&ys(e,i,a,l))}switch(n){case"input":Zo(e),Ec(e,r,!1);break;case"textarea":Zo(e),Tc(e);break;case"option":r.value!=null&&e.setAttribute("value",""+cn(r.value));break;case"select":e.multiple=!!r.multiple,i=r.value,i!=null?ur(e,!!r.multiple,i,!1):r.defaultValue!=null&&ur(e,!!r.multiple,r.defaultValue,!0);break;default:typeof o.onClick=="function"&&(e.onclick=Ii)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return Pe(t),null;case 6:if(e&&t.stateNode!=null)lp(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(S(166));if(n=Cn(wo.current),Cn(Bt.current),fi(t)){if(r=t.stateNode,n=t.memoizedProps,r[Pt]=t,(i=r.nodeValue!==n)&&(e=qe,e!==null))switch(e.tag){case 3:di(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&di(r.nodeValue,n,(e.mode&1)!==0)}i&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[Pt]=t,t.stateNode=r}return Pe(t),null;case 13:if(ne(le),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(oe&&Xe!==null&&t.mode&1&&!(t.flags&128))kf(),vr(),t.flags|=98560,i=!1;else if(i=fi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!i)throw Error(S(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(S(317));i[Pt]=t}else vr(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Pe(t),i=!1}else mt!==null&&(ms(mt),mt=null),i=!0;if(!i)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||le.current&1?he===0&&(he=3):eu())),t.updateQueue!==null&&(t.flags|=4),Pe(t),null);case 4:return br(),as(e,t),e===null&&go(t.stateNode.containerInfo),Pe(t),null;case 10:return Fs(t.type._context),Pe(t),null;case 17:return Ue(t.type)&&Ni(),Pe(t),null;case 19:if(ne(le),i=t.memoizedState,i===null)return Pe(t),null;if(r=(t.flags&128)!==0,l=i.rendering,l===null)if(r)$r(i,!1);else{if(he!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(l=ji(e),l!==null){for(t.flags|=128,$r(i,!1),r=l.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)i=n,e=r,i.flags&=14680066,l=i.alternate,l===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=l.childLanes,i.lanes=l.lanes,i.child=l.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=l.memoizedProps,i.memoizedState=l.memoizedState,i.updateQueue=l.updateQueue,i.type=l.type,e=l.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return ee(le,le.current&1|2),t.child}e=e.sibling}i.tail!==null&&de()>Sr&&(t.flags|=128,r=!0,$r(i,!1),t.lanes=4194304)}else{if(!r)if(e=ji(l),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),$r(i,!0),i.tail===null&&i.tailMode==="hidden"&&!l.alternate&&!oe)return Pe(t),null}else 2*de()-i.renderingStartTime>Sr&&n!==1073741824&&(t.flags|=128,r=!0,$r(i,!1),t.lanes=4194304);i.isBackwards?(l.sibling=t.child,t.child=l):(n=i.last,n!==null?n.sibling=l:t.child=l,i.last=l)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=de(),t.sibling=null,n=le.current,ee(le,r?n&1|2:n&1),t):(Pe(t),null);case 22:case 23:return Zs(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?Ve&1073741824&&(Pe(t),t.subtreeFlags&6&&(t.flags|=8192)):Pe(t),null;case 24:return null;case 25:return null}throw Error(S(156,t.tag))}function ng(e,t){switch(zs(t),t.tag){case 1:return Ue(t.type)&&Ni(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return br(),ne(We),ne(Be),Us(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ws(t),null;case 13:if(ne(le),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(S(340));vr()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return ne(le),null;case 4:return br(),null;case 10:return Fs(t.type._context),null;case 22:case 23:return Zs(),null;case 24:return null;default:return null}}var mi=!1,Re=!1,rg=typeof WeakSet=="function"?WeakSet:Set,M=null;function ar(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ue(e,t,r)}else n.current=null}function ss(e,t,n){try{n()}catch(r){ue(e,t,r)}}var md=!1;function og(e,t){if($a=_i,e=df(),Bs(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var o=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var l=0,s=-1,a=-1,u=0,f=0,g=e,h=null;t:for(;;){for(var y;g!==n||o!==0&&g.nodeType!==3||(s=l+o),g!==i||r!==0&&g.nodeType!==3||(a=l+r),g.nodeType===3&&(l+=g.nodeValue.length),(y=g.firstChild)!==null;)h=g,g=y;for(;;){if(g===e)break t;if(h===n&&++u===o&&(s=l),h===i&&++f===r&&(a=l),(y=g.nextSibling)!==null)break;g=h,h=g.parentNode}g=y}n=s===-1||a===-1?null:{start:s,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(Va={focusedElem:e,selectionRange:n},_i=!1,M=t;M!==null;)if(t=M,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,M=e;else for(;M!==null;){t=M;try{var b=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(b!==null){var v=b.memoizedProps,P=b.memoizedState,c=t.stateNode,d=c.getSnapshotBeforeUpdate(t.elementType===t.type?v:pt(t.type,v),P);c.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var p=t.stateNode.containerInfo;p.nodeType===1?p.textContent="":p.nodeType===9&&p.documentElement&&p.removeChild(p.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(S(163))}}catch(m){ue(t,t.return,m)}if(e=t.sibling,e!==null){e.return=t.return,M=e;break}M=t.return}return b=md,md=!1,b}function oo(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&e)===e){var i=o.destroy;o.destroy=void 0,i!==void 0&&ss(t,n,i)}o=o.next}while(o!==r)}}function il(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function us(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function ap(e){var t=e.alternate;t!==null&&(e.alternate=null,ap(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[Pt],delete t[yo],delete t[Ja],delete t[H0],delete t[W0])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function sp(e){return e.tag===5||e.tag===3||e.tag===4}function gd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||sp(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function cs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Ii));else if(r!==4&&(e=e.child,e!==null))for(cs(e,t,n),e=e.sibling;e!==null;)cs(e,t,n),e=e.sibling}function ds(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(ds(e,t,n),e=e.sibling;e!==null;)ds(e,t,n),e=e.sibling}var Se=null,ht=!1;function qt(e,t,n){for(n=n.child;n!==null;)up(e,t,n),n=n.sibling}function up(e,t,n){if(Rt&&typeof Rt.onCommitFiberUnmount=="function")try{Rt.onCommitFiberUnmount(Qi,n)}catch{}switch(n.tag){case 5:Re||ar(n,t);case 6:var r=Se,o=ht;Se=null,qt(e,t,n),Se=r,ht=o,Se!==null&&(ht?(e=Se,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):Se.removeChild(n.stateNode));break;case 18:Se!==null&&(ht?(e=Se,n=n.stateNode,e.nodeType===8?ha(e.parentNode,n):e.nodeType===1&&ha(e,n),po(e)):ha(Se,n.stateNode));break;case 4:r=Se,o=ht,Se=n.stateNode.containerInfo,ht=!0,qt(e,t,n),Se=r,ht=o;break;case 0:case 11:case 14:case 15:if(!Re&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){o=r=r.next;do{var i=o,l=i.destroy;i=i.tag,l!==void 0&&(i&2||i&4)&&ss(n,t,l),o=o.next}while(o!==r)}qt(e,t,n);break;case 1:if(!Re&&(ar(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(s){ue(n,t,s)}qt(e,t,n);break;case 21:qt(e,t,n);break;case 22:n.mode&1?(Re=(r=Re)||n.memoizedState!==null,qt(e,t,n),Re=r):qt(e,t,n);break;default:qt(e,t,n)}}function vd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new rg),t.forEach(function(r){var o=pg.bind(null,e,r);n.has(r)||(n.add(r),r.then(o,o))})}}function ft(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var o=n[r];try{var i=e,l=t,s=l;e:for(;s!==null;){switch(s.tag){case 5:Se=s.stateNode,ht=!1;break e;case 3:Se=s.stateNode.containerInfo,ht=!0;break e;case 4:Se=s.stateNode.containerInfo,ht=!0;break e}s=s.return}if(Se===null)throw Error(S(160));up(i,l,o),Se=null,ht=!1;var a=o.alternate;a!==null&&(a.return=null),o.return=null}catch(u){ue(o,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)cp(t,e),t=t.sibling}function cp(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ft(t,e),Lt(e),r&4){try{oo(3,e,e.return),il(3,e)}catch(v){ue(e,e.return,v)}try{oo(5,e,e.return)}catch(v){ue(e,e.return,v)}}break;case 1:ft(t,e),Lt(e),r&512&&n!==null&&ar(n,n.return);break;case 5:if(ft(t,e),Lt(e),r&512&&n!==null&&ar(n,n.return),e.flags&32){var o=e.stateNode;try{so(o,"")}catch(v){ue(e,e.return,v)}}if(r&4&&(o=e.stateNode,o!=null)){var i=e.memoizedProps,l=n!==null?n.memoizedProps:i,s=e.type,a=e.updateQueue;if(e.updateQueue=null,a!==null)try{s==="input"&&i.type==="radio"&&i.name!=null&&Bd(o,i),Ia(s,l);var u=Ia(s,i);for(l=0;l<a.length;l+=2){var f=a[l],g=a[l+1];f==="style"?Nd(o,g):f==="dangerouslySetInnerHTML"?Od(o,g):f==="children"?so(o,g):ys(o,f,g,u)}switch(s){case"input":Ra(o,i);break;case"textarea":_d(o,i);break;case"select":var h=o._wrapperState.wasMultiple;o._wrapperState.wasMultiple=!!i.multiple;var y=i.value;y!=null?ur(o,!!i.multiple,y,!1):h!==!!i.multiple&&(i.defaultValue!=null?ur(o,!!i.multiple,i.defaultValue,!0):ur(o,!!i.multiple,i.multiple?[]:"",!1))}o[yo]=i}catch(v){ue(e,e.return,v)}}break;case 6:if(ft(t,e),Lt(e),r&4){if(e.stateNode===null)throw Error(S(162));o=e.stateNode,i=e.memoizedProps;try{o.nodeValue=i}catch(v){ue(e,e.return,v)}}break;case 3:if(ft(t,e),Lt(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{po(t.containerInfo)}catch(v){ue(e,e.return,v)}break;case 4:ft(t,e),Lt(e);break;case 13:ft(t,e),Lt(e),o=e.child,o.flags&8192&&(i=o.memoizedState!==null,o.stateNode.isHidden=i,!i||o.alternate!==null&&o.alternate.memoizedState!==null||(Qs=de())),r&4&&vd(e);break;case 22:if(f=n!==null&&n.memoizedState!==null,e.mode&1?(Re=(u=Re)||f,ft(t,e),Re=u):ft(t,e),Lt(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!f&&e.mode&1)for(M=e,f=e.child;f!==null;){for(g=M=f;M!==null;){switch(h=M,y=h.child,h.tag){case 0:case 11:case 14:case 15:oo(4,h,h.return);break;case 1:ar(h,h.return);var b=h.stateNode;if(typeof b.componentWillUnmount=="function"){r=h,n=h.return;try{t=r,b.props=t.memoizedProps,b.state=t.memoizedState,b.componentWillUnmount()}catch(v){ue(r,n,v)}}break;case 5:ar(h,h.return);break;case 22:if(h.memoizedState!==null){bd(g);continue}}y!==null?(y.return=h,M=y):bd(g)}f=f.sibling}e:for(f=null,g=e;;){if(g.tag===5){if(f===null){f=g;try{o=g.stateNode,u?(i=o.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(s=g.stateNode,a=g.memoizedProps.style,l=a!=null&&a.hasOwnProperty("display")?a.display:null,s.style.display=Id("display",l))}catch(v){ue(e,e.return,v)}}}else if(g.tag===6){if(f===null)try{g.stateNode.nodeValue=u?"":g.memoizedProps}catch(v){ue(e,e.return,v)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;f===g&&(f=null),g=g.return}f===g&&(f=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:ft(t,e),Lt(e),r&4&&vd(e);break;case 21:break;default:ft(t,e),Lt(e)}}function Lt(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(sp(n)){var r=n;break e}n=n.return}throw Error(S(160))}switch(r.tag){case 5:var o=r.stateNode;r.flags&32&&(so(o,""),r.flags&=-33);var i=gd(e);ds(e,i,o);break;case 3:case 4:var l=r.stateNode.containerInfo,s=gd(e);cs(e,s,l);break;default:throw Error(S(161))}}catch(a){ue(e,e.return,a)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ig(e,t,n){M=e,dp(e,t,n)}function dp(e,t,n){for(var r=(e.mode&1)!==0;M!==null;){var o=M,i=o.child;if(o.tag===22&&r){var l=o.memoizedState!==null||mi;if(!l){var s=o.alternate,a=s!==null&&s.memoizedState!==null||Re;s=mi;var u=Re;if(mi=l,(Re=a)&&!u)for(M=o;M!==null;)l=M,a=l.child,l.tag===22&&l.memoizedState!==null?wd(o):a!==null?(a.return=l,M=a):wd(o);for(;i!==null;)M=i,dp(i,t,n),i=i.sibling;M=o,mi=s,Re=u}yd(e,t,n)}else o.subtreeFlags&8772&&i!==null?(i.return=o,M=i):yd(e,t,n)}}function yd(e){for(;M!==null;){var t=M;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:Re||il(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!Re)if(n===null)r.componentDidMount();else{var o=t.elementType===t.type?n.memoizedProps:pt(t.type,n.memoizedProps);r.componentDidUpdate(o,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=t.updateQueue;i!==null&&nd(t,i,r);break;case 3:var l=t.updateQueue;if(l!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}nd(t,l,n)}break;case 5:var s=t.stateNode;if(n===null&&t.flags&4){n=s;var a=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var g=f.dehydrated;g!==null&&po(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(S(163))}Re||t.flags&512&&us(t)}catch(h){ue(t,t.return,h)}}if(t===e){M=null;break}if(n=t.sibling,n!==null){n.return=t.return,M=n;break}M=t.return}}function bd(e){for(;M!==null;){var t=M;if(t===e){M=null;break}var n=t.sibling;if(n!==null){n.return=t.return,M=n;break}M=t.return}}function wd(e){for(;M!==null;){var t=M;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{il(4,t)}catch(a){ue(t,n,a)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var o=t.return;try{r.componentDidMount()}catch(a){ue(t,o,a)}}var i=t.return;try{us(t)}catch(a){ue(t,i,a)}break;case 5:var l=t.return;try{us(t)}catch(a){ue(t,l,a)}}}catch(a){ue(t,t.return,a)}if(t===e){M=null;break}var s=t.sibling;if(s!==null){s.return=t.return,M=s;break}M=t.return}}var lg=Math.ceil,Vi=Vt.ReactCurrentDispatcher,Js=Vt.ReactCurrentOwner,rt=Vt.ReactCurrentBatchConfig,V=0,we=null,fe=null,xe=0,Ve=0,sr=pn(0),he=0,ko=null,_n=0,ll=0,Ks=0,io=null,De=null,Qs=0,Sr=1/0,Ft=null,Xi=!1,fs=null,an=null,gi=!1,en=null,qi=0,lo=0,ps=null,ki=-1,Ti=0;function Ne(){return V&6?de():ki!==-1?ki:ki=de()}function sn(e){return e.mode&1?V&2&&xe!==0?xe&-xe:j0.transition!==null?(Ti===0&&(Ti=qd()),Ti):(e=q,e!==0||(e=window.event,e=e===void 0?16:tf(e.type)),e):1}function vt(e,t,n,r){if(50<lo)throw lo=0,ps=null,Error(S(185));To(e,n,r),(!(V&2)||e!==we)&&(e===we&&(!(V&2)&&(ll|=n),he===4&&Yt(e,xe)),je(e,r),n===1&&V===0&&!(t.mode&1)&&(Sr=de()+500,nl&&hn()))}function je(e,t){var n=e.callbackNode;$m(e,t);var r=Bi(e,e===we?xe:0);if(r===0)n!==null&&Mc(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&Mc(n),t===1)e.tag===0?U0(Sd.bind(null,e)):Sf(Sd.bind(null,e)),A0(function(){!(V&6)&&hn()}),n=null;else{switch(Jd(r)){case 1:n=Es;break;case 4:n=Vd;break;case 16:n=Ri;break;case 536870912:n=Xd;break;default:n=Ri}n=bp(n,fp.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function fp(e,t){if(ki=-1,Ti=0,V&6)throw Error(S(327));var n=e.callbackNode;if(hr()&&e.callbackNode!==n)return null;var r=Bi(e,e===we?xe:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=Ji(e,r);else{t=r;var o=V;V|=2;var i=hp();(we!==e||xe!==t)&&(Ft=null,Sr=de()+500,Ln(e,t));do try{ug();break}catch(s){pp(e,s)}while(!0);Ns(),Vi.current=i,V=o,fe!==null?t=0:(we=null,xe=0,t=he)}if(t!==0){if(t===2&&(o=Ha(e),o!==0&&(r=o,t=hs(e,o))),t===1)throw n=ko,Ln(e,0),Yt(e,r),je(e,de()),n;if(t===6)Yt(e,r);else{if(o=e.current.alternate,!(r&30)&&!ag(o)&&(t=Ji(e,r),t===2&&(i=Ha(e),i!==0&&(r=i,t=hs(e,i))),t===1))throw n=ko,Ln(e,0),Yt(e,r),je(e,de()),n;switch(e.finishedWork=o,e.finishedLanes=r,t){case 0:case 1:throw Error(S(345));case 2:En(e,De,Ft);break;case 3:if(Yt(e,r),(r&130023424)===r&&(t=Qs+500-de(),10<t)){if(Bi(e,0)!==0)break;if(o=e.suspendedLanes,(o&r)!==r){Ne(),e.pingedLanes|=e.suspendedLanes&o;break}e.timeoutHandle=qa(En.bind(null,e,De,Ft),t);break}En(e,De,Ft);break;case 4:if(Yt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,o=-1;0<r;){var l=31-gt(r);i=1<<l,l=t[l],l>o&&(o=l),r&=~i}if(r=o,r=de()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*lg(r/1960))-r,10<r){e.timeoutHandle=qa(En.bind(null,e,De,Ft),r);break}En(e,De,Ft);break;case 5:En(e,De,Ft);break;default:throw Error(S(329))}}}return je(e,de()),e.callbackNode===n?fp.bind(null,e):null}function hs(e,t){var n=io;return e.current.memoizedState.isDehydrated&&(Ln(e,t).flags|=256),e=Ji(e,t),e!==2&&(t=De,De=n,t!==null&&ms(t)),e}function ms(e){De===null?De=e:De.push.apply(De,e)}function ag(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var o=n[r],i=o.getSnapshot;o=o.value;try{if(!yt(i(),o))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Yt(e,t){for(t&=~Ks,t&=~ll,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-gt(t),r=1<<n;e[n]=-1,t&=~r}}function Sd(e){if(V&6)throw Error(S(327));hr();var t=Bi(e,0);if(!(t&1))return je(e,de()),null;var n=Ji(e,t);if(e.tag!==0&&n===2){var r=Ha(e);r!==0&&(t=r,n=hs(e,r))}if(n===1)throw n=ko,Ln(e,0),Yt(e,t),je(e,de()),n;if(n===6)throw Error(S(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,En(e,De,Ft),je(e,de()),null}function Ys(e,t){var n=V;V|=1;try{return e(t)}finally{V=n,V===0&&(Sr=de()+500,nl&&hn())}}function zn(e){en!==null&&en.tag===0&&!(V&6)&&hr();var t=V;V|=1;var n=rt.transition,r=q;try{if(rt.transition=null,q=1,e)return e()}finally{q=r,rt.transition=n,V=t,!(V&6)&&hn()}}function Zs(){Ve=sr.current,ne(sr)}function Ln(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,F0(n)),fe!==null)for(n=fe.return;n!==null;){var r=n;switch(zs(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Ni();break;case 3:br(),ne(We),ne(Be),Us();break;case 5:Ws(r);break;case 4:br();break;case 13:ne(le);break;case 19:ne(le);break;case 10:Fs(r.type._context);break;case 22:case 23:Zs()}n=n.return}if(we=e,fe=e=un(e.current,null),xe=Ve=t,he=0,ko=null,Ks=ll=_n=0,De=io=null,Tn!==null){for(t=0;t<Tn.length;t++)if(n=Tn[t],r=n.interleaved,r!==null){n.interleaved=null;var o=r.next,i=n.pending;if(i!==null){var l=i.next;i.next=o,r.next=l}n.pending=r}Tn=null}return e}function pp(e,t){do{var n=fe;try{if(Ns(),Si.current=$i,Gi){for(var r=ae.memoizedState;r!==null;){var o=r.queue;o!==null&&(o.pending=null),r=r.next}Gi=!1}if(Bn=0,be=pe=ae=null,ro=!1,So=0,Js.current=null,n===null||n.return===null){he=1,ko=t,fe=null;break}e:{var i=e,l=n.return,s=n,a=t;if(t=xe,s.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,f=s,g=f.tag;if(!(f.mode&1)&&(g===0||g===11||g===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var y=sd(l);if(y!==null){y.flags&=-257,ud(y,l,s,i,t),y.mode&1&&ad(i,u,t),t=y,a=u;var b=t.updateQueue;if(b===null){var v=new Set;v.add(a),t.updateQueue=v}else b.add(a);break e}else{if(!(t&1)){ad(i,u,t),eu();break e}a=Error(S(426))}}else if(oe&&s.mode&1){var P=sd(l);if(P!==null){!(P.flags&65536)&&(P.flags|=256),ud(P,l,s,i,t),Os(wr(a,s));break e}}i=a=wr(a,s),he!==4&&(he=2),io===null?io=[i]:io.push(i),i=l;do{switch(i.tag){case 3:i.flags|=65536,t&=-t,i.lanes|=t;var c=Kf(i,a,t);td(i,c);break e;case 1:s=a;var d=i.type,p=i.stateNode;if(!(i.flags&128)&&(typeof d.getDerivedStateFromError=="function"||p!==null&&typeof p.componentDidCatch=="function"&&(an===null||!an.has(p)))){i.flags|=65536,t&=-t,i.lanes|=t;var m=Qf(i,s,t);td(i,m);break e}}i=i.return}while(i!==null)}gp(n)}catch(x){t=x,fe===n&&n!==null&&(fe=n=n.return);continue}break}while(!0)}function hp(){var e=Vi.current;return Vi.current=$i,e===null?$i:e}function eu(){(he===0||he===3||he===2)&&(he=4),we===null||!(_n&268435455)&&!(ll&268435455)||Yt(we,xe)}function Ji(e,t){var n=V;V|=2;var r=hp();(we!==e||xe!==t)&&(Ft=null,Ln(e,t));do try{sg();break}catch(o){pp(e,o)}while(!0);if(Ns(),V=n,Vi.current=r,fe!==null)throw Error(S(261));return we=null,xe=0,he}function sg(){for(;fe!==null;)mp(fe)}function ug(){for(;fe!==null&&!Nm();)mp(fe)}function mp(e){var t=yp(e.alternate,e,Ve);e.memoizedProps=e.pendingProps,t===null?gp(e):fe=t,Js.current=null}function gp(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=ng(n,t),n!==null){n.flags&=32767,fe=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{he=6,fe=null;return}}else if(n=tg(n,t,Ve),n!==null){fe=n;return}if(t=t.sibling,t!==null){fe=t;return}fe=t=e}while(t!==null);he===0&&(he=5)}function En(e,t,n){var r=q,o=rt.transition;try{rt.transition=null,q=1,cg(e,t,n,r)}finally{rt.transition=o,q=r}return null}function cg(e,t,n,r){do hr();while(en!==null);if(V&6)throw Error(S(327));n=e.finishedWork;var o=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(S(177));e.callbackNode=null,e.callbackPriority=0;var i=n.lanes|n.childLanes;if(Vm(e,i),e===we&&(fe=we=null,xe=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||gi||(gi=!0,bp(Ri,function(){return hr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=rt.transition,rt.transition=null;var l=q;q=1;var s=V;V|=4,Js.current=null,og(e,n),cp(n,e),_0(Va),_i=!!$a,Va=$a=null,e.current=n,ig(n,e,o),Fm(),V=s,q=l,rt.transition=i}else e.current=n;if(gi&&(gi=!1,en=e,qi=o),i=e.pendingLanes,i===0&&(an=null),Hm(n.stateNode,r),je(e,de()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)o=t[n],r(o.value,{componentStack:o.stack,digest:o.digest});if(Xi)throw Xi=!1,e=fs,fs=null,e;return qi&1&&e.tag!==0&&hr(),i=e.pendingLanes,i&1?e===ps?lo++:(lo=0,ps=e):lo=0,hn(),null}function hr(){if(en!==null){var e=Jd(qi),t=rt.transition,n=q;try{if(rt.transition=null,q=16>e?16:e,en===null)var r=!1;else{if(e=en,en=null,qi=0,V&6)throw Error(S(331));var o=V;for(V|=4,M=e.current;M!==null;){var i=M,l=i.child;if(M.flags&16){var s=i.deletions;if(s!==null){for(var a=0;a<s.length;a++){var u=s[a];for(M=u;M!==null;){var f=M;switch(f.tag){case 0:case 11:case 15:oo(8,f,i)}var g=f.child;if(g!==null)g.return=f,M=g;else for(;M!==null;){f=M;var h=f.sibling,y=f.return;if(ap(f),f===u){M=null;break}if(h!==null){h.return=y,M=h;break}M=y}}}var b=i.alternate;if(b!==null){var v=b.child;if(v!==null){b.child=null;do{var P=v.sibling;v.sibling=null,v=P}while(v!==null)}}M=i}}if(i.subtreeFlags&2064&&l!==null)l.return=i,M=l;else e:for(;M!==null;){if(i=M,i.flags&2048)switch(i.tag){case 0:case 11:case 15:oo(9,i,i.return)}var c=i.sibling;if(c!==null){c.return=i.return,M=c;break e}M=i.return}}var d=e.current;for(M=d;M!==null;){l=M;var p=l.child;if(l.subtreeFlags&2064&&p!==null)p.return=l,M=p;else e:for(l=d;M!==null;){if(s=M,s.flags&2048)try{switch(s.tag){case 0:case 11:case 15:il(9,s)}}catch(x){ue(s,s.return,x)}if(s===l){M=null;break e}var m=s.sibling;if(m!==null){m.return=s.return,M=m;break e}M=s.return}}if(V=o,hn(),Rt&&typeof Rt.onPostCommitFiberRoot=="function")try{Rt.onPostCommitFiberRoot(Qi,e)}catch{}r=!0}return r}finally{q=n,rt.transition=t}}return!1}function xd(e,t,n){t=wr(n,t),t=Kf(e,t,1),e=ln(e,t,1),t=Ne(),e!==null&&(To(e,1,t),je(e,t))}function ue(e,t,n){if(e.tag===3)xd(e,e,n);else for(;t!==null;){if(t.tag===3){xd(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(an===null||!an.has(r))){e=wr(n,e),e=Qf(t,e,1),t=ln(t,e,1),e=Ne(),t!==null&&(To(t,1,e),je(t,e));break}}t=t.return}}function dg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=Ne(),e.pingedLanes|=e.suspendedLanes&n,we===e&&(xe&n)===n&&(he===4||he===3&&(xe&130023424)===xe&&500>de()-Qs?Ln(e,0):Ks|=n),je(e,t)}function vp(e,t){t===0&&(e.mode&1?(t=ni,ni<<=1,!(ni&130023424)&&(ni=4194304)):t=1);var n=Ne();e=Gt(e,t),e!==null&&(To(e,t,n),je(e,n))}function fg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),vp(e,n)}function pg(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,o=e.memoizedState;o!==null&&(n=o.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(S(314))}r!==null&&r.delete(t),vp(e,n)}var yp;yp=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||We.current)He=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return He=!1,eg(e,t,n);He=!!(e.flags&131072)}else He=!1,oe&&t.flags&1048576&&xf(t,Di,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Ei(e,t),e=t.pendingProps;var o=gr(t,Be.current);pr(t,n),o=Gs(null,t,r,e,o,n);var i=$s();return t.flags|=1,typeof o=="object"&&o!==null&&typeof o.render=="function"&&o.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ue(r)?(i=!0,Fi(t)):i=!1,t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,Ds(t),o.updater=ol,t.stateNode=o,o._reactInternals=t,ts(t,r,e,n),t=os(null,t,r,!0,i,n)):(t.tag=0,oe&&i&&_s(t),Ie(null,t,o,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Ei(e,t),e=t.pendingProps,o=r._init,r=o(r._payload),t.type=r,o=t.tag=mg(r),e=pt(r,e),o){case 0:t=rs(null,t,r,e,n);break e;case 1:t=fd(null,t,r,e,n);break e;case 11:t=cd(null,t,r,e,n);break e;case 14:t=dd(null,t,r,pt(r.type,e),n);break e}throw Error(S(306,r,""))}return t;case 0:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:pt(r,o),rs(e,t,r,o,n);case 1:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:pt(r,o),fd(e,t,r,o,n);case 3:e:{if(tp(t),e===null)throw Error(S(387));r=t.pendingProps,i=t.memoizedState,o=i.element,Mf(e,t),Ui(t,r,null,n);var l=t.memoizedState;if(r=l.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},t.updateQueue.baseState=i,t.memoizedState=i,t.flags&256){o=wr(Error(S(423)),t),t=pd(e,t,r,n,o);break e}else if(r!==o){o=wr(Error(S(424)),t),t=pd(e,t,r,n,o);break e}else for(Xe=on(t.stateNode.containerInfo.firstChild),qe=t,oe=!0,mt=null,n=Cf(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(vr(),r===o){t=$t(e,t,n);break e}Ie(e,t,r,n)}t=t.child}return t;case 5:return Pf(t),e===null&&Ya(t),r=t.type,o=t.pendingProps,i=e!==null?e.memoizedProps:null,l=o.children,Xa(r,o)?l=null:i!==null&&Xa(r,i)&&(t.flags|=32),ep(e,t),Ie(e,t,l,n),t.child;case 6:return e===null&&Ya(t),null;case 13:return np(e,t,n);case 4:return Hs(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=yr(t,null,r,n):Ie(e,t,r,n),t.child;case 11:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:pt(r,o),cd(e,t,r,o,n);case 7:return Ie(e,t,t.pendingProps,n),t.child;case 8:return Ie(e,t,t.pendingProps.children,n),t.child;case 12:return Ie(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,o=t.pendingProps,i=t.memoizedProps,l=o.value,ee(Hi,r._currentValue),r._currentValue=l,i!==null)if(yt(i.value,l)){if(i.children===o.children&&!We.current){t=$t(e,t,n);break e}}else for(i=t.child,i!==null&&(i.return=t);i!==null;){var s=i.dependencies;if(s!==null){l=i.child;for(var a=s.firstContext;a!==null;){if(a.context===r){if(i.tag===1){a=Wt(-1,n&-n),a.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?a.next=a:(a.next=f.next,f.next=a),u.pending=a}}i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),Za(i.return,n,t),s.lanes|=n;break}a=a.next}}else if(i.tag===10)l=i.type===t.type?null:i.child;else if(i.tag===18){if(l=i.return,l===null)throw Error(S(341));l.lanes|=n,s=l.alternate,s!==null&&(s.lanes|=n),Za(l,n,t),l=i.sibling}else l=i.child;if(l!==null)l.return=i;else for(l=i;l!==null;){if(l===t){l=null;break}if(i=l.sibling,i!==null){i.return=l.return,l=i;break}l=l.return}i=l}Ie(e,t,o.children,n),t=t.child}return t;case 9:return o=t.type,r=t.pendingProps.children,pr(t,n),o=ot(o),r=r(o),t.flags|=1,Ie(e,t,r,n),t.child;case 14:return r=t.type,o=pt(r,t.pendingProps),o=pt(r.type,o),dd(e,t,r,o,n);case 15:return Yf(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,o=t.pendingProps,o=t.elementType===r?o:pt(r,o),Ei(e,t),t.tag=1,Ue(r)?(e=!0,Fi(t)):e=!1,pr(t,n),Jf(t,r,o),ts(t,r,o,n),os(null,t,r,!0,e,n);case 19:return rp(e,t,n);case 22:return Zf(e,t,n)}throw Error(S(156,t.tag))};function bp(e,t){return $d(e,t)}function hg(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function nt(e,t,n,r){return new hg(e,t,n,r)}function tu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function mg(e){if(typeof e=="function")return tu(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ws)return 11;if(e===Ss)return 14}return 2}function un(e,t){var n=e.alternate;return n===null?(n=nt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ci(e,t,n,r,o,i){var l=2;if(r=e,typeof e=="function")tu(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case Yn:return Mn(n.children,o,i,t);case bs:l=8,o|=8;break;case Ta:return e=nt(12,n,t,o|2),e.elementType=Ta,e.lanes=i,e;case Ca:return e=nt(13,n,t,o),e.elementType=Ca,e.lanes=i,e;case La:return e=nt(19,n,t,o),e.elementType=La,e.lanes=i,e;case Md:return al(n,o,i,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Cd:l=10;break e;case Ld:l=9;break e;case ws:l=11;break e;case Ss:l=14;break e;case Jt:l=16,r=null;break e}throw Error(S(130,e==null?e:typeof e,""))}return t=nt(l,n,t,o),t.elementType=e,t.type=r,t.lanes=i,t}function Mn(e,t,n,r){return e=nt(7,e,r,t),e.lanes=n,e}function al(e,t,n,r){return e=nt(22,e,r,t),e.elementType=Md,e.lanes=n,e.stateNode={isHidden:!1},e}function xa(e,t,n){return e=nt(6,e,null,t),e.lanes=n,e}function Ea(e,t,n){return t=nt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function gg(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=la(0),this.expirationTimes=la(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=la(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null}function nu(e,t,n,r,o,i,l,s,a){return e=new gg(e,t,n,s,a),t===1?(t=1,i===!0&&(t|=8)):t=0,i=nt(3,null,null,t),e.current=i,i.stateNode=e,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ds(i),e}function vg(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Qn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function wp(e){if(!e)return dn;e=e._reactInternals;e:{if(In(e)!==e||e.tag!==1)throw Error(S(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ue(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(S(171))}if(e.tag===1){var n=e.type;if(Ue(n))return wf(e,n,t)}return t}function Sp(e,t,n,r,o,i,l,s,a){return e=nu(n,r,!0,e,o,i,l,s,a),e.context=wp(null),n=e.current,r=Ne(),o=sn(n),i=Wt(r,o),i.callback=t??null,ln(n,i,o),e.current.lanes=o,To(e,o,r),je(e,r),e}function sl(e,t,n,r){var o=t.current,i=Ne(),l=sn(o);return n=wp(n),t.context===null?t.context=n:t.pendingContext=n,t=Wt(i,l),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=ln(o,t,l),e!==null&&(vt(e,o,l,i),wi(e,o,l)),l}function Ki(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ed(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ru(e,t){Ed(e,t),(e=e.alternate)&&Ed(e,t)}function yg(){return null}var xp=typeof reportError=="function"?reportError:function(e){console.error(e)};function ou(e){this._internalRoot=e}ul.prototype.render=ou.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(S(409));sl(e,t,null,null)};ul.prototype.unmount=ou.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;zn(function(){sl(null,e,null,null)}),t[jt]=null}};function ul(e){this._internalRoot=e}ul.prototype.unstable_scheduleHydration=function(e){if(e){var t=Yd();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Qt.length&&t!==0&&t<Qt[n].priority;n++);Qt.splice(n,0,e),n===0&&ef(e)}};function iu(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function cl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function kd(){}function bg(e,t,n,r,o){if(o){if(typeof r=="function"){var i=r;r=function(){var u=Ki(l);i.call(u)}}var l=Sp(t,r,e,0,null,!1,!1,"",kd);return e._reactRootContainer=l,e[jt]=l.current,go(e.nodeType===8?e.parentNode:e),zn(),l}for(;o=e.lastChild;)e.removeChild(o);if(typeof r=="function"){var s=r;r=function(){var u=Ki(a);s.call(u)}}var a=nu(e,0,!1,null,null,!1,!1,"",kd);return e._reactRootContainer=a,e[jt]=a.current,go(e.nodeType===8?e.parentNode:e),zn(function(){sl(t,a,n,r)}),a}function dl(e,t,n,r,o){var i=n._reactRootContainer;if(i){var l=i;if(typeof o=="function"){var s=o;o=function(){var a=Ki(l);s.call(a)}}sl(t,l,e,o)}else l=bg(n,t,e,o,r);return Ki(l)}Kd=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Kr(t.pendingLanes);n!==0&&(ks(t,n|1),je(t,de()),!(V&6)&&(Sr=de()+500,hn()))}break;case 13:zn(function(){var r=Gt(e,1);if(r!==null){var o=Ne();vt(r,e,1,o)}}),ru(e,1)}};Ts=function(e){if(e.tag===13){var t=Gt(e,134217728);if(t!==null){var n=Ne();vt(t,e,134217728,n)}ru(e,134217728)}};Qd=function(e){if(e.tag===13){var t=sn(e),n=Gt(e,t);if(n!==null){var r=Ne();vt(n,e,t,r)}ru(e,t)}};Yd=function(){return q};Zd=function(e,t){var n=q;try{return q=e,t()}finally{q=n}};Fa=function(e,t,n){switch(t){case"input":if(Ra(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var o=tl(r);if(!o)throw Error(S(90));Rd(r),Ra(r,o)}}}break;case"textarea":_d(e,n);break;case"select":t=n.value,t!=null&&ur(e,!!n.multiple,t,!1)}};Dd=Ys;Hd=zn;var wg={usingClientEntryPoint:!1,Events:[Lo,nr,tl,Fd,Ad,Ys]},Vr={findFiberByHostInstance:kn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Sg={bundleType:Vr.bundleType,version:Vr.version,rendererPackageName:Vr.rendererPackageName,rendererConfig:Vr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Vt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=jd(e),e===null?null:e.stateNode},findFiberByHostInstance:Vr.findFiberByHostInstance||yg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Xr=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Xr.isDisabled&&Xr.supportsFiber))try{Qi=Xr.inject(Sg),Rt=Xr}catch{}var Xr;Qe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wg;Qe.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!iu(t))throw Error(S(200));return vg(e,t,null,n)};Qe.createRoot=function(e,t){if(!iu(e))throw Error(S(299));var n=!1,r="",o=xp;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(o=t.onRecoverableError)),t=nu(e,1,!1,null,null,n,!1,r,o),e[jt]=t.current,go(e.nodeType===8?e.parentNode:e),new ou(t)};Qe.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=jd(t),e=e===null?null:e.stateNode,e};Qe.flushSync=function(e){return zn(e)};Qe.hydrate=function(e,t,n){if(!cl(t))throw Error(S(200));return dl(null,e,t,!0,n)};Qe.hydrateRoot=function(e,t,n){if(!iu(e))throw Error(S(405));var r=n!=null&&n.hydratedSources||null,o=!1,i="",l=xp;if(n!=null&&(n.unstable_strictMode===!0&&(o=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(l=n.onRecoverableError)),t=Sp(t,null,e,1,n??null,o,!1,i,l),e[jt]=t.current,go(e),r)for(e=0;e<r.length;e++)n=r[e],o=n._getVersion,o=o(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,o]:t.mutableSourceEagerHydrationData.push(n,o);return new ul(t)};Qe.render=function(e,t,n){if(!cl(t))throw Error(S(200));return dl(null,e,t,!1,n)};Qe.unmountComponentAtNode=function(e){if(!cl(e))throw Error(S(40));return e._reactRootContainer?(zn(function(){dl(null,null,e,!1,function(){e._reactRootContainer=null,e[jt]=null})}),!0):!1};Qe.unstable_batchedUpdates=Ys;Qe.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!cl(n))throw Error(S(200));if(e==null||e._reactInternals===void 0)throw Error(S(38));return dl(e,t,n,!1,r)};Qe.version="18.3.1-next-f1338f8080-20240426"});var Cp=Nt((qv,Tp)=>{"use strict";function kp(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(kp)}catch(e){console.error(e)}}kp(),Tp.exports=Ep()});var Mp=Nt(lu=>{"use strict";var Lp=Cp();lu.createRoot=Lp.createRoot,lu.hydrateRoot=Lp.hydrateRoot;var Jv});function Rp(e,t){if(e.match(/^[a-z]+:\/\//i))return e;if(e.match(/^\/\//))return window.location.protocol+e;if(e.match(/^[a-z]+:/i))return e;let n=document.implementation.createHTMLDocument(),r=n.createElement("base"),o=n.createElement("a");return n.head.appendChild(r),n.body.appendChild(o),t&&(r.href=t),o.href=e,o.href}function bt(e){let t=[];for(let n=0,r=e.length;n<r;n++)t.push(e[n]);return t}function hl(e={}){return kr||(e.includeStyleProperties?(kr=e.includeStyleProperties,kr):(kr=bt(window.getComputedStyle(document.documentElement)),kr))}function pl(e,t){let r=(e.ownerDocument.defaultView||window).getComputedStyle(e).getPropertyValue(t);return r?parseFloat(r.replace("px","")):0}function xg(e){let t=pl(e,"border-left-width"),n=pl(e,"border-right-width");return e.clientWidth+t+n}function Eg(e){let t=pl(e,"border-top-width"),n=pl(e,"border-bottom-width");return e.clientHeight+t+n}function ml(e,t={}){let n=t.width||xg(e),r=t.height||Eg(e);return{width:n,height:r}}function _p(){let e,t;try{t=process}catch{}let n=t&&t.env?t.env.devicePixelRatio:null;return n&&(e=parseInt(n,10),Number.isNaN(e)&&(e=1)),e||window.devicePixelRatio||1}function zp(e){(e.width>Ye||e.height>Ye)&&(e.width>Ye&&e.height>Ye?e.width>e.height?(e.height*=Ye/e.width,e.width=Ye):(e.width*=Ye/e.height,e.height=Ye):e.width>Ye?(e.height*=Ye/e.width,e.width=Ye):(e.width*=Ye/e.height,e.height=Ye))}function Op(e,t={}){return e.toBlob?new Promise(n=>{e.toBlob(n,t.type?t.type:"image/png",t.quality?t.quality:1)}):new Promise(n=>{let r=window.atob(e.toDataURL(t.type?t.type:void 0,t.quality?t.quality:void 0).split(",")[1]),o=r.length,i=new Uint8Array(o);for(let l=0;l<o;l+=1)i[l]=r.charCodeAt(l);n(new Blob([i],{type:t.type?t.type:"image/png"}))})}function Tr(e){return new Promise((t,n)=>{let r=new Image;r.onload=()=>{r.decode().then(()=>{requestAnimationFrame(()=>t(r))})},r.onerror=n,r.crossOrigin="anonymous",r.decoding="async",r.src=e})}async function kg(e){return Promise.resolve().then(()=>new XMLSerializer().serializeToString(e)).then(encodeURIComponent).then(t=>`data:image/svg+xml;charset=utf-8,${t}`)}async function Ip(e,t,n){let r="http://www.w3.org/2000/svg",o=document.createElementNS(r,"svg"),i=document.createElementNS(r,"foreignObject");return o.setAttribute("width",`${t}`),o.setAttribute("height",`${n}`),o.setAttribute("viewBox",`0 0 ${t} ${n}`),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("x","0"),i.setAttribute("y","0"),i.setAttribute("externalResourcesRequired","true"),o.appendChild(i),i.appendChild(e),kg(o)}var Bp,kr,Ye,_e,Nn=kt(()=>{Bp=(()=>{let e=0,t=()=>`0000${(Math.random()*36**4<<0).toString(36)}`.slice(-4);return()=>(e+=1,`u${t()}${e}`)})();kr=null;Ye=16384;_e=(e,t)=>{if(e instanceof t)return!0;let n=Object.getPrototypeOf(e);return n===null?!1:n.constructor.name===t.name||_e(n,t)}});function Tg(e){let t=e.getPropertyValue("content");return`${e.cssText} content: '${t.replace(/'|"/g,"")}';`}function Cg(e,t){return hl(t).map(n=>{let r=e.getPropertyValue(n),o=e.getPropertyPriority(n);return`${n}: ${r}${o?" !important":""};`}).join(" ")}function Lg(e,t,n,r){let o=`.${e}:${t}`,i=n.cssText?Tg(n):Cg(n,r);return document.createTextNode(`${o}{${i}}`)}function Np(e,t,n,r){let o=window.getComputedStyle(e,n),i=o.getPropertyValue("content");if(i===""||i==="none")return;let l=Bp();try{t.className=`${t.className} ${l}`}catch{return}let s=document.createElement("style");s.appendChild(Lg(l,n,o,r)),t.appendChild(s)}function Fp(e,t,n){Np(e,t,":before",n),Np(e,t,":after",n)}var Ap=kt(()=>{Nn()});function Pg(e){let t=/\.([^./]*?)$/g.exec(e);return t?t[1]:""}function Cr(e){let t=Pg(e).toLowerCase();return Mg[t]||""}var Dp,Hp,Mg,gl=kt(()=>{Dp="application/font-woff",Hp="image/jpeg",Mg={woff:Dp,woff2:Dp,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:Hp,jpeg:Hp,gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml",webp:"image/webp"}});function Rg(e){return e.split(/,/)[1]}function Bo(e){return e.search(/^(data:)/)!==-1}function uu(e,t){return`data:${t};base64,${e}`}async function cu(e,t,n){let r=await fetch(e,t);if(r.status===404)throw new Error(`Resource "${r.url}" not found`);let o=await r.blob();return new Promise((i,l)=>{let s=new FileReader;s.onerror=l,s.onloadend=()=>{try{i(n({res:r,result:s.result}))}catch(a){l(a)}},s.readAsDataURL(o)})}function Bg(e,t,n){let r=e.replace(/\?.*/,"");return n&&(r=e),/ttf|otf|eot|woff2?/i.test(r)&&(r=r.replace(/.*\//,"")),t?`[${t}]${r}`:r}async function Lr(e,t,n){let r=Bg(e,t,n.includeQueryParams);if(su[r]!=null)return su[r];n.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+new Date().getTime());let o;try{let i=await cu(e,n.fetchRequestInit,({res:l,result:s})=>(t||(t=l.headers.get("Content-Type")||""),Rg(s)));o=uu(i,t)}catch(i){o=n.imagePlaceholder||"";let l=`Failed to fetch resource: ${e}`;i&&(l=typeof i=="string"?i:i.message),l&&console.warn(l)}return su[r]=o,o}var su,_o=kt(()=>{su={}});async function _g(e){let t=e.toDataURL();return t==="data:,"?e.cloneNode(!1):Tr(t)}async function zg(e,t){if(e.currentSrc){let i=document.createElement("canvas"),l=i.getContext("2d");i.width=e.clientWidth,i.height=e.clientHeight,l?.drawImage(e,0,0,i.width,i.height);let s=i.toDataURL();return Tr(s)}let n=e.poster,r=Cr(n),o=await Lr(n,r,t);return Tr(o)}async function Og(e,t){var n;try{if(!((n=e?.contentDocument)===null||n===void 0)&&n.body)return await zo(e.contentDocument.body,t,!0)}catch{}return e.cloneNode(!1)}async function Ig(e,t){return _e(e,HTMLCanvasElement)?_g(e):_e(e,HTMLVideoElement)?zg(e,t):_e(e,HTMLIFrameElement)?Og(e,t):e.cloneNode(Wp(e))}async function Fg(e,t,n){var r,o;if(Wp(t))return t;let i=[];return Ng(e)&&e.assignedNodes?i=bt(e.assignedNodes()):_e(e,HTMLIFrameElement)&&(!((r=e.contentDocument)===null||r===void 0)&&r.body)?i=bt(e.contentDocument.body.childNodes):i=bt(((o=e.shadowRoot)!==null&&o!==void 0?o:e).childNodes),i.length===0||_e(e,HTMLVideoElement)||await i.reduce((l,s)=>l.then(()=>zo(s,n)).then(a=>{a&&t.appendChild(a)}),Promise.resolve()),t}function Ag(e,t,n){let r=t.style;if(!r)return;let o=window.getComputedStyle(e);o.cssText?(r.cssText=o.cssText,r.transformOrigin=o.transformOrigin):hl(n).forEach(i=>{let l=o.getPropertyValue(i);i==="font-size"&&l.endsWith("px")&&(l=`${Math.floor(parseFloat(l.substring(0,l.length-2)))-.1}px`),_e(e,HTMLIFrameElement)&&i==="display"&&l==="inline"&&(l="block"),i==="d"&&t.getAttribute("d")&&(l=`path(${t.getAttribute("d")})`),r.setProperty(i,l,o.getPropertyPriority(i))})}function Dg(e,t){_e(e,HTMLTextAreaElement)&&(t.innerHTML=e.value),_e(e,HTMLInputElement)&&t.setAttribute("value",e.value)}function Hg(e,t){if(_e(e,HTMLSelectElement)){let n=t,r=Array.from(n.children).find(o=>e.value===o.getAttribute("value"));r&&r.setAttribute("selected","")}}function Wg(e,t,n){return _e(t,Element)&&(Ag(e,t,n),Fp(e,t,n),Dg(e,t),Hg(e,t)),t}async function Ug(e,t){let n=e.querySelectorAll?e.querySelectorAll("use"):[];if(n.length===0)return e;let r={};for(let i=0;i<n.length;i++){let s=n[i].getAttribute("xlink:href");if(s){let a=e.querySelector(s),u=document.querySelector(s);!a&&u&&!r[s]&&(r[s]=await zo(u,t,!0))}}let o=Object.values(r);if(o.length){let i="http://www.w3.org/1999/xhtml",l=document.createElementNS(i,"svg");l.setAttribute("xmlns",i),l.style.position="absolute",l.style.width="0",l.style.height="0",l.style.overflow="hidden",l.style.display="none";let s=document.createElementNS(i,"defs");l.appendChild(s);for(let a=0;a<o.length;a++)s.appendChild(o[a]);e.appendChild(l)}return e}async function zo(e,t,n){return!n&&t.filter&&!t.filter(e)?null:Promise.resolve(e).then(r=>Ig(r,t)).then(r=>Fg(e,r,t)).then(r=>Wg(e,r,t)).then(r=>Ug(r,t))}var Ng,Wp,Up=kt(()=>{Ap();Nn();gl();_o();Ng=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SLOT",Wp=e=>e.tagName!=null&&e.tagName.toUpperCase()==="SVG"});function $g(e){let t=e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1");return new RegExp(`(url\\(['"]?)(${t})(['"]?\\))`,"g")}function Vg(e){let t=[];return e.replace(jp,(n,r,o)=>(t.push(o),n)),t.filter(n=>!Bo(n))}async function Xg(e,t,n,r,o){try{let i=n?Rp(t,n):t,l=Cr(t),s;if(o){let a=await o(i);s=uu(a,l)}else s=await Lr(i,l,r);return e.replace($g(t),`$1${s}$3`)}catch{}return e}function qg(e,{preferredFontFormat:t}){return t?e.replace(Gg,n=>{for(;;){let[r,,o]=jg.exec(n)||[];if(!o)return"";if(o===t)return`src: ${r};`}}):e}function du(e){return e.search(jp)!==-1}async function vl(e,t,n){if(!du(e))return e;let r=qg(e,n);return Vg(r).reduce((i,l)=>i.then(s=>Xg(s,l,t,n)),Promise.resolve(r))}var jp,jg,Gg,fu=kt(()=>{Nn();gl();_o();jp=/url\((['"]?)([^'"]+?)\1\)/g,jg=/url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g,Gg=/src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g});async function Mr(e,t,n){var r;let o=(r=t.style)===null||r===void 0?void 0:r.getPropertyValue(e);if(o){let i=await vl(o,null,n);return t.style.setProperty(e,i,t.style.getPropertyPriority(e)),!0}return!1}async function Jg(e,t){await Mr("background",e,t)||await Mr("background-image",e,t),await Mr("mask",e,t)||await Mr("-webkit-mask",e,t)||await Mr("mask-image",e,t)||await Mr("-webkit-mask-image",e,t)}async function Kg(e,t){let n=_e(e,HTMLImageElement);if(!(n&&!Bo(e.src))&&!(_e(e,SVGImageElement)&&!Bo(e.href.baseVal)))return;let r=n?e.src:e.href.baseVal,o=await Lr(r,Cr(r),t);await new Promise((i,l)=>{e.onload=i,e.onerror=t.onImageErrorHandler?(...a)=>{try{i(t.onImageErrorHandler(...a))}catch(u){l(u)}}:l;let s=e;s.decode&&(s.decode=i),s.loading==="lazy"&&(s.loading="eager"),n?(e.srcset="",e.src=o):e.href.baseVal=o})}async function Qg(e,t){let r=bt(e.childNodes).map(o=>pu(o,t));await Promise.all(r).then(()=>e)}async function pu(e,t){_e(e,Element)&&(await Jg(e,t),await Kg(e,t),await Qg(e,t))}var Gp=kt(()=>{fu();Nn();_o();gl()});function $p(e,t){let{style:n}=e;t.backgroundColor&&(n.backgroundColor=t.backgroundColor),t.width&&(n.width=`${t.width}px`),t.height&&(n.height=`${t.height}px`);let r=t.style;return r!=null&&Object.keys(r).forEach(o=>{n[o]=r[o]}),e}var Vp=kt(()=>{});async function qp(e){let t=Xp[e];if(t!=null)return t;let r=await(await fetch(e)).text();return t={url:e,cssText:r},Xp[e]=t,t}async function Jp(e,t){let n=e.cssText,r=/url\(["']?([^"')]+)["']?\)/g,i=(n.match(/url\([^)]+\)/g)||[]).map(async l=>{let s=l.replace(r,"$1");return s.startsWith("https://")||(s=new URL(s,e.url).href),cu(s,t.fetchRequestInit,({result:a})=>(n=n.replace(l,`url(${a})`),[l,a]))});return Promise.all(i).then(()=>n)}function Kp(e){if(e==null)return[];let t=[],n=/(\/\*[\s\S]*?\*\/)/gi,r=e.replace(n,""),o=new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})","gi");for(;;){let a=o.exec(r);if(a===null)break;t.push(a[0])}r=r.replace(o,"");let i=/@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi,l="((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})",s=new RegExp(l,"gi");for(;;){let a=i.exec(r);if(a===null){if(a=s.exec(r),a===null)break;i.lastIndex=s.lastIndex}else s.lastIndex=i.lastIndex;t.push(a[0])}return t}async function Yg(e,t){let n=[],r=[];return e.forEach(o=>{if("cssRules"in o)try{bt(o.cssRules||[]).forEach((i,l)=>{if(i.type===CSSRule.IMPORT_RULE){let s=l+1,a=i.href,u=qp(a).then(f=>Jp(f,t)).then(f=>Kp(f).forEach(g=>{try{o.insertRule(g,g.startsWith("@import")?s+=1:o.cssRules.length)}catch(h){console.error("Error inserting rule from remote css",{rule:g,error:h})}})).catch(f=>{console.error("Error loading remote css",f.toString())});r.push(u)}})}catch(i){let l=e.find(s=>s.href==null)||document.styleSheets[0];o.href!=null&&r.push(qp(o.href).then(s=>Jp(s,t)).then(s=>Kp(s).forEach(a=>{l.insertRule(a,l.cssRules.length)})).catch(s=>{console.error("Error loading remote stylesheet",s)})),console.error("Error inlining remote css file",i)}}),Promise.all(r).then(()=>(e.forEach(o=>{if("cssRules"in o)try{bt(o.cssRules||[]).forEach(i=>{n.push(i)})}catch(i){console.error(`Error while reading CSS rules from ${o.href}`,i)}}),n))}function Zg(e){return e.filter(t=>t.type===CSSRule.FONT_FACE_RULE).filter(t=>du(t.style.getPropertyValue("src")))}async function ev(e,t){if(e.ownerDocument==null)throw new Error("Provided element is not within a Document");let n=bt(e.ownerDocument.styleSheets),r=await Yg(n,t);return Zg(r)}function Qp(e){return e.trim().replace(/["']/g,"")}function tv(e){let t=new Set;function n(r){(r.style.fontFamily||getComputedStyle(r).fontFamily).split(",").forEach(i=>{t.add(Qp(i))}),Array.from(r.children).forEach(i=>{i instanceof HTMLElement&&n(i)})}return n(e),t}async function hu(e,t){let n=await ev(e,t),r=tv(e);return(await Promise.all(n.filter(i=>r.has(Qp(i.style.fontFamily))).map(i=>{let l=i.parentStyleSheet?i.parentStyleSheet.href:null;return vl(i.cssText,l,t)}))).join(`
`)}async function Yp(e,t){let n=t.fontEmbedCSS!=null?t.fontEmbedCSS:t.skipFonts?null:await hu(e,t);if(n){let r=document.createElement("style"),o=document.createTextNode(n);r.appendChild(o),e.firstChild?e.insertBefore(r,e.firstChild):e.appendChild(r)}}var Xp,Zp=kt(()=>{Nn();_o();fu();Xp={}});var yl={};rm(yl,{getFontEmbedCSS:()=>lv,toBlob:()=>iv,toCanvas:()=>Oo,toJpeg:()=>ov,toPixelData:()=>nv,toPng:()=>rv,toSvg:()=>eh});async function eh(e,t={}){let{width:n,height:r}=ml(e,t),o=await zo(e,t,!0);return await Yp(o,t),await pu(o,t),$p(o,t),await Ip(o,n,r)}async function Oo(e,t={}){let{width:n,height:r}=ml(e,t),o=await eh(e,t),i=await Tr(o),l=document.createElement("canvas"),s=l.getContext("2d"),a=t.pixelRatio||_p(),u=t.canvasWidth||n,f=t.canvasHeight||r;return l.width=u*a,l.height=f*a,t.skipAutoScale||zp(l),l.style.width=`${u}`,l.style.height=`${f}`,t.backgroundColor&&(s.fillStyle=t.backgroundColor,s.fillRect(0,0,l.width,l.height)),s.drawImage(i,0,0,l.width,l.height),l}async function nv(e,t={}){let{width:n,height:r}=ml(e,t);return(await Oo(e,t)).getContext("2d").getImageData(0,0,n,r).data}async function rv(e,t={}){return(await Oo(e,t)).toDataURL()}async function ov(e,t={}){return(await Oo(e,t)).toDataURL("image/jpeg",t.quality||1)}async function iv(e,t={}){let n=await Oo(e,t);return await Op(n)}async function lv(e,t={}){return hu(e,t)}var bl=kt(()=>{Up();Gp();Vp();Zp();Nn()});var Oh=Nt(Ll=>{"use strict";/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Cv=qn(),Lv=Symbol.for("react.element"),Mv=Symbol.for("react.fragment"),Pv=Object.prototype.hasOwnProperty,Rv=Cv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Bv={key:!0,ref:!0,__self:!0,__source:!0};function zh(e,t,n){var r,o={},i=null,l=null;n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(l=t.ref);for(r in t)Pv.call(t,r)&&!Bv.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:Lv,type:e,key:i,ref:l,props:o,_owner:Rv.current}}Ll.Fragment=Mv;Ll.jsx=zh;Ll.jsxs=zh});var Hn=Nt((Oy,Ih)=>{"use strict";Ih.exports=Oh()});var vn=Tt(qn()),Dh=Tt(Mp());var I=Tt(qn());var ce=Tt(qn());/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/var Po=[768,48],au=8,Ro=64,Pp=`#version 300 es
layout(location = 0) in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,fl=`#version 300 es
precision highp float;

#define FILM_MAX ${3e3.toFixed(1)}
#define NOISE_PERIOD ${au.toFixed(1)}
#define PI 3.14159265

uniform vec2 uResolution;      // drawing buffer, device pixels
uniform vec2 uCenter;          // bubble centre, device pixels from the bottom left
uniform float uRadius;         // short half side, device pixels
uniform vec2 uExtent;          // half size in radii (x >= 1 for a pill)
uniform float uCorner;         // corner radius in radii (1 is fully round)
uniform float uBevel;          // glass bevel width in radii
uniform vec4 uModeBasis;       // l=2 amplitude \xD7 (cos, sin) of twice its angle, l=3 \xD7 thrice its
uniform vec2 uSquash;          // press squash and stretch
uniform float uPressScale;    // native press swell, independent of glyph size
uniform vec4 uJoin0;           // nearby button centre xy and half size zw, in radii
uniform vec4 uJoin1;
uniform vec4 uJoin2;
uniform vec4 uJoin3;
uniform vec4 uJoinCorners;
uniform vec4 uJoinAmounts;     // smooth-union radius; zero disables the contact
uniform vec4 uJoinTint0;
uniform vec4 uJoinTint1;
uniform vec4 uJoinTint2;
uniform vec4 uJoinTint3;
uniform float uTime;
uniform float uFlow;           // film flow clock
uniform float uThickness;
uniform float uIridescence;
uniform float uOilOpacity;
uniform float uDrainage;
uniform float uSwirl;
uniform float uFilmScale;      // size of the film's colour bands
uniform float uReflectivity;
uniform float uMirage;
uniform float uSeeThrough;     // share of the covered bubbles seen through the film
uniform float uCoveredBend;    // how far they bend, relative to the backdrop's refraction
uniform bool uHasCovered;
uniform sampler2D uCovered;    // the backdrop with its bubbles in it
uniform float uFloorLight;
uniform float uReach;         // radius of the reflected surroundings, in radii
uniform float uRefraction;
uniform float uGlass;          // 0 soap film, 1 liquid glass
uniform float uDispersion;
uniform float uSeed;
uniform int uEnvironment;      // 0 studio, 1 window, 2 sky, 3 soft
uniform mat3 uEnvRotation;
// Interference reflectance precomputed over thickness (x, 0 to FILM_MAX nm)
// and the cosine of incidence (y): the spectral integral costs one lookup.
uniform sampler2D uFilmTable;
uniform mediump sampler3D uNoise;
uniform float uOilCoverage;    // share of the film that shows oil colours
uniform float uOilEdge;        // device px from the rim the oil reaches; 0 is everywhere
uniform float uOilLarge;       // 0 for small controls, 1 for large panels and bars
uniform float uClearCenter;    // where the oil fades, also drop the reflected haze
uniform vec4 uTint;            // CSS colour and opacity, applied under the film
uniform vec4 uSoapColor;       // film palette; resolved from tint when auto
uniform bool uCustomSoapPalette;
uniform vec4 uSoapPaletteRed;
uniform vec4 uSoapPaletteGold;
uniform vec4 uSoapPaletteGreen;
uniform vec4 uSoapPaletteCyan;
uniform vec4 uSoapPaletteBlue;
uniform vec4 uSoapPaletteViolet;
uniform vec4 uSoapShadeColor;  // darker faces, inner reflection and shade
uniform vec4 uSoapHighlightColor; // reflected room, bevel and window light
uniform bool uLightTheme;      // keep the original oil rendering in dark themes
uniform bool uWindowLight;     // the intro's window, along the top edge
uniform float uSpark;          // which small glint this bubble's window has, 0\u20131
uniform float uWindowSize;     // thickness of the window and its glint, 1 as drawn
uniform float uWindowIntensity;// brightness of the window and its twin
uniform int uWindowStyle;      // 0 runs along the edge, 1 the intro's bean as it first was
uniform float uWindowLength;   // how far the window runs, 1 as drawn
uniform float uWindowMargin;   // how far in from the edge it sits, 1 as drawn
uniform float uWindowBend;     // how closely it follows a long shape's curve, 0 straight to 1 the edge
uniform float uTopLength;      // how far the overhead light's highlight runs, 1 as drawn
uniform float uTopTail;        // how its far end thins to a point or stays blunt, 1 as drawn
uniform float uTopFade;        // how long the overhead light's highlight along a top edge fades
uniform float uWindowGradient; // how much the window fades towards its right end, 0.24 as drawn
uniform float uWindowWidth;    // thickness of the window band alone, 1 as drawn
uniform float uWindowHead;     // thickness of its thick left end against the rest, 1 as drawn
uniform float uWindowTail;     // thickness of its far end: low is pointed, high is blunt
uniform int uGlintShape;       // 0 auto, 1 dot, 2 dash, 3 pair, 4 none
uniform float uGlintSize;
uniform float uGlintIntensity;
uniform vec2 uGlintOffset;     // along the window and inwards, 0 as drawn
uniform bool uWindowTwin;      // the window's inverted twin on the far wall
uniform int uTwinShape;        // 0 arc, 1 crescent, 2 streak, 3 dot, 4 mirror
uniform bool uKeyLight;        // the room's key light (window, softbox or sun)
uniform bool uBottomShade;     // soft band on the far, lower wall
uniform vec4 uShadeColor;      // its straight RGBA colour; alpha below 0 follows the theme
uniform float uOilFade;        // 0\u20131 clears the middle of large panels, above 1 also narrows the rim band

uniform sampler2D uBackdrop;
uniform bool uHasBackdrop;
uniform vec2 uBackdropOrigin;  // bubble centre in backdrop UV
uniform vec2 uBackdropScale;   // one radius in backdrop UV
uniform vec2 uBackdropSize;    // texels

// A flat coloured layer under the bubble, such as a switch or slider track,
// in radii around the bubble centre: centre, half size, corner radius and the
// x where the fill ends. Thumbs refract it like any other backdrop.
uniform bool uHasLayer;
uniform vec4 uLayerRect;       // centre xy, half size zw
uniform float uLayerCorner;
uniform float uLayerFill;
uniform vec4 uLayerTrack;      // straight RGBA
uniform vec4 uLayerFrom;
uniform vec4 uLayerTo;


out vec4 outColor;

const float WATER = 1.333;

// ---------------------------------------------------------------- noise

// Gradient noise in [-1, 1], baked into a tiling 3D texture that repeats
// every NOISE_PERIOD units: one lookup instead of eight hashed gradients.
float noise(vec3 p) {
  return textureLod(uNoise, p / NOISE_PERIOD, 0.0).r * 2.0 - 1.0;
}

float fbm(vec3 p) {
  float sum = 0.0;
  float amplitude = 0.55;
  for (int i = 0; i < 3; i++) {
    sum += amplitude * noise(p);
    p = p * 2.03 + vec3(1.7, -3.1, 2.3);
    amplitude *= 0.5;
  }
  return sum;
}

vec3 rotateY(vec3 p, float a) {
  float c = cos(a), s = sin(a);
  return vec3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

// ---------------------------------------------------------------- film

// Thickness of the film at a point of the shell. Gravity drains water to the
// bottom, so the cap thins towards black film while the base stays thick and
// pale. Marangoni flow stirs the film into swirls that drift around the
// vertical axis and rise as thin patches.
float filmThickness(vec3 p, float scale, float seed) {
  float t = uFlow;
  float below = clamp(0.5 - 0.5 * p.y, 0.0, 1.0);
  float profile = mix(1.0, 0.18 + 1.9 * pow(below, 1.6), uDrainage);
  vec3 q = rotateY(p, t * 0.11 + seed) * (1.35 / uFilmScale) + vec3(seed * 3.1, -t * 0.06, uSeed);
  vec3 warp = vec3(noise(q + vec3(0.0, t * 0.05, 0.0)), noise(q + vec3(5.2, 1.3, -t * 0.04)),
                   noise(q + vec3(-3.7, 9.2, 2.8)));
  q += warp * (0.45 + 1.1 * uSwirl);
  // Bands stay roughly horizontal: gravity stratifies the film.
  float swirl = fbm(q * vec3(1.0, 1.0 + 1.6 * uDrainage, 1.0));
  float cells = noise(q * 3.1 + vec3(0.0, -t * 0.18, 0.0));
  float variation = swirl * (0.35 + 0.55 * uSwirl) + cells * 0.12 * uSwirl;
  return max(0.0, uThickness * scale * profile * (1.0 + variation));
}

// Reflectance of the film in linear sRGB. oil (0\u20131) is how much of the
// interference shows at this point; elsewhere the film reflects without
// colour, like clear water between oil slicks.
vec3 film(float thickness, float cosI, float oil) {
  cosI = clamp(cosI, 1e-4, 1.0);
  float sin2 = 1.0 - cosI * cosI;
  float cosT = sqrt(max(0.0, 1.0 - sin2 / (WATER * WATER)));
  float rs = (cosI - WATER * cosT) / (cosI + WATER * cosT);
  float rp = (WATER * cosI - cosT) / (WATER * cosI + cosT);
  float rs2 = rs * rs, rp2 = rp * rp;
  vec2 cell = vec2(${Po.join(".0, ")}.0);
  vec2 uv = (vec2(clamp(thickness / FILM_MAX, 0.0, 1.0), cosI) * (cell - 1.0) + 0.5) / cell;
  vec3 interference = textureLod(uFilmTable, uv, 0.0).rgb;
  float incoherent = 0.5 * (2.0 * rs2 / (1.0 + rs2) + 2.0 * rp2 / (1.0 + rp2));
  float strength = uIridescence * oil * uOilOpacity;
  vec3 colour = mix(vec3(incoherent), interference, clamp(strength, 0.0, 1.0));
  float luma = dot(colour, vec3(0.2126, 0.7152, 0.0722));
  colour = max(vec3(0.0), luma + (colour - luma) * max(1.0, strength));
  return min(colour * uReflectivity, vec3(1.0));
}

// Where the oil colours show. Coverage below 1 leaves clear film between
// broad slicks the size of the film's bands.
float oilMask(vec3 p, float seed) {
  if (uOilCoverage >= 0.999) return 1.0;
  vec3 q = rotateY(p, uFlow * 0.05 + seed) * (0.9 / uFilmScale) + vec3(uSeed * 1.3, -uFlow * 0.03, seed);
  float n = 0.5 + 0.5 * (noise(q) * 0.7 + noise(q * 2.1 + 4.2) * 0.3);
  float edge = 1.0 - uOilCoverage;
  return smoothstep(edge - 0.12, edge + 0.12, n);
}

// ---------------------------------------------------------------- lighting

float roundedRect(vec2 p, vec2 halfSize, float r) {
  vec2 d = abs(p) - halfSize + r;
  return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
}

// A light panel seen in direction dir: axis is where it hangs, its plane is
// spanned by right and up, size is the gnomonic half extent.
float panel(vec3 dir, vec3 axis, vec2 size, float panes, float soft, float tail) {
  float facing = dot(dir, axis);
  if (facing <= 0.05) return 0.0;
  vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), axis));
  vec3 up = cross(axis, right);
  vec2 q = vec2(dot(dir, right), dot(dir, up)) / facing;
  // soft draws the panel's ends out sideways into a long, gentle falloff,
  // for diffusers whose light fades away; its top and bottom stay crisp.
  vec2 reach = size + vec2(soft * 0.6, 0.0);
  // tail narrows (below 1) or widens (above 1) the panel towards its ends,
  // so the highlight it lays along a top edge thins to a point or stays blunt.
  float taper = clamp((abs(q.x) - size.x * 0.3) / max(reach.x - size.x * 0.3, 1e-4), 0.0, 1.0);
  reach.y *= mix(1.0, tail, taper);
  float edge = roundedRect(q, reach, min(size.x, reach.y) * 0.18);
  float body = 1.0 - smoothstep(-0.02, 0.02, edge);
  if (soft > 0.0) {
    float beyond = clamp((abs(q.x) - (size.x - soft * 0.6)) / (soft * 1.2), 0.0, 1.0);
    body *= 1.0 - beyond * beyond * (3.0 - 2.0 * beyond);
  }
  if (panes > 0.0) {
    // Window bars between the panes.
    vec2 cell = (0.5 - abs(fract(q / size * panes * 0.5) - 0.5)) * size * 2.0 / panes;
    float bars = smoothstep(0.012, 0.022, min(cell.x, cell.y));
    body *= mix(1.0, bars, step(edge, -0.03));
    // Daylight is brighter towards the top of the window.
    body *= 0.75 + 0.35 * clamp(q.y / size.y, -1.0, 1.0);
  } else {
    body *= 0.85 + 0.15 * smoothstep(0.0, -0.25, edge);
  }
  return body;
}

// Radiance of the surroundings. Directions with z > 0 point at the room in
// front of the screen, where the lights are; z < 0 points behind the bubble.
vec3 environment(vec3 dir) {
  dir = uEnvRotation * dir;
  float up = dir.y;
  if (uEnvironment == 2) {
    vec3 zenith = vec3(0.12, 0.32, 0.85);
    vec3 horizon = vec3(0.78, 0.86, 0.98);
    vec3 ground = vec3(0.16, 0.2, 0.12);
    vec3 sky = mix(horizon, zenith, pow(clamp(up, 0.0, 1.0), 0.55));
    vec3 colour = up > 0.0 ? sky : mix(horizon * 0.55, ground, smoothstep(0.0, 0.25, -up));
    vec3 sun = normalize(vec3(-0.55, 0.62, 0.56));
    float s = max(dot(dir, sun), 0.0);
    if (uKeyLight) colour += vec3(1.0, 0.92, 0.78) * (pow(s, 900.0) * 40.0 + pow(s, 24.0) * 0.6);
    // Soft clouds.
    float cloud = smoothstep(0.1, 0.6, fbm(vec3(dir.xz / max(up, 0.08) * 0.9, 3.0)) + 0.1);
    colour = mix(colour, vec3(1.15), cloud * 0.55 * smoothstep(0.02, 0.2, up));
    return colour;
  }
  vec3 colour;
  if (uEnvironment == 3) {
    // A bright, diffuse room for light interfaces: pale walls and floor as
    // light as the page, so no dark line traces the lower rim, and a soft key
    // panel overhead.
    colour = mix(vec3(0.86, 0.87, 0.9), vec3(1.0, 1.0, 1.02), smoothstep(-0.7, 0.6, up));
    // The overhead panel is a broad diffuser: its light fades out towards
    // its border, so the long highlight it lays along a top edge does too.
    colour += vec3(1.4) * panel(dir, normalize(vec3(-0.3, 0.75, 0.6)), vec2(0.5 * uTopLength, 0.32), 0.0, uTopFade, uTopTail);
    // The mirror inner reflection turns this highlight round too, fainter,
    // along the bottom edge.
    if (uWindowLight && uWindowTwin && uTwinShape == 4)
      colour += vec3(0.6) * panel(dir, normalize(vec3(0.3, -0.75, 0.6)), vec2(0.5 * uTopLength, 0.32), 0.0, uTopFade, uTopTail);
    colour += vec3(0.5, 0.55, 0.65) * panel(dir, normalize(vec3(0.8, 0.1, 0.5)), vec2(0.08, 0.6), 0.0, 0.0, 1.0);
    // The bright window and its small companion that give bubbles their
    // crisp white highlights: radiant enough that even a thin film's few
    // percent of reflectance clips to white, with oil colours at the edges.
    if (uKeyLight) colour += vec3(48.0) * panel(dir, normalize(vec3(-0.6, 0.6, 0.53)), vec2(0.22, 0.16), 2.0, 0.0, 1.0);
    colour += vec3(28.0) * panel(dir, normalize(vec3(0.5, -0.38, 0.78)), vec2(0.08, 0.06), 0.0, 0.0, 1.0);
    return colour;
  }
  if (uEnvironment == 1) {
    // A bright room with one large window.
    colour = mix(vec3(0.22, 0.2, 0.19), vec3(0.42, 0.42, 0.44), smoothstep(-0.6, 0.8, up));
    colour = mix(colour, vec3(0.12, 0.1, 0.09), smoothstep(-0.1, -0.6, up));
    if (uKeyLight) colour += vec3(2.8, 2.95, 3.2) * panel(dir, normalize(vec3(-0.46, 0.4, 0.79)), vec2(0.36, 0.46), 2.0, 0.0, 1.0);
    colour += vec3(0.9, 0.85, 0.8) * panel(dir, normalize(vec3(0.82, 0.05, 0.35)), vec2(0.22, 0.6), 0.0, 0.0, 1.0);
    return colour;
  }
  // Studio: dark cyclorama, a large key softbox, a strip light and a kicker.
  colour = mix(vec3(0.018, 0.02, 0.026), vec3(0.06, 0.065, 0.08), smoothstep(-0.8, 0.9, up));
  if (uKeyLight) colour += vec3(4.0) * panel(dir, normalize(vec3(-0.5, 0.48, 0.72)), vec2(0.3, 0.24), 0.0, 0.0, 1.0);
  if (uKeyLight && uWindowLight && uWindowTwin && uTwinShape == 4)
    colour += vec3(1.6) * panel(dir, normalize(vec3(0.5, -0.48, 0.72)), vec2(0.3, 0.24), 0.0, 0.0, 1.0);
  colour += vec3(1.8, 1.9, 2.05) * panel(dir, normalize(vec3(0.7, 0.05, 0.71)), vec2(0.06, 0.55), 0.0, 0.0, 1.0);
  colour += uFloorLight * vec3(0.45, 0.5, 0.6) * panel(dir, normalize(vec3(0.1, -0.8, 0.3)), vec2(0.7, 0.2), 0.0, 0.0, 1.0);
  return colour;
}

vec3 toLinear(vec3 c) { return pow(c, vec3(2.2)); }

// Recolour an optical contribution without flattening its light/dark detail.
// A transparent palette is an exact no-op, preserving the original material.
vec3 soapPalette(vec3 source, vec4 palette) {
  float peak = max(max(source.r, source.g), source.b);
  return mix(source, toLinear(palette.rgb) * peak, palette.a);
}

// A soap film is a spectrum, not a painted fill. Grade its wavelengths with
// a gentle colour filter instead of replacing every pixel with the same hue.
// Even an opaque palette keeps every spectral channel and the moving bands.
vec3 soapSpectrum(vec3 source, vec4 palette) {
  if (palette.a <= 0.0) return source;
  vec3 colourFilter = mix(vec3(1.0), vec3(0.85) + 0.15 * toLinear(palette.rgb), palette.a);
  vec3 graded = source * colourFilter;
  float peak = max(max(source.r, source.g), source.b);
  float gradedPeak = max(max(graded.r, graded.g), graded.b);
  return graded * (peak / max(gradedPeak, 1e-5));
}

// Remap the existing spectral hue families, keeping the film's spatial
// bands and optical shading. Natural mode bypasses the palette exactly.
vec3 soapFilmPalette(vec3 source) {
  if (!uCustomSoapPalette) return soapSpectrum(source, uSoapColor);
  float peak = max(max(source.r, source.g), source.b);
  float low = min(min(source.r, source.g), source.b);
  float chroma = peak - low;
  if (chroma < 1e-5) return soapSpectrum(source, uSoapColor);
  float hue = source.r == peak ? (source.g - source.b) / chroma
            : source.g == peak ? 2.0 + (source.b - source.r) / chroma
            : 4.0 + (source.r - source.g) / chroma;
  hue = mod(hue + 6.0, 6.0);
  float t = fract(hue);
  vec4 palette = hue < 1.0 ? mix(uSoapPaletteRed, uSoapPaletteGold, t)
               : hue < 2.0 ? mix(uSoapPaletteGold, uSoapPaletteGreen, t)
               : hue < 3.0 ? mix(uSoapPaletteGreen, uSoapPaletteCyan, t)
               : hue < 4.0 ? mix(uSoapPaletteCyan, uSoapPaletteBlue, t)
               : hue < 5.0 ? mix(uSoapPaletteBlue, uSoapPaletteViolet, t)
               : mix(uSoapPaletteViolet, uSoapPaletteRed, t);
  vec3 chosen = toLinear(palette.rgb);
  vec3 mapped = mix(vec3(peak), chosen * peak, chroma / max(peak, 1e-5));
  return soapSpectrum(mix(source, mapped, palette.a), uSoapColor);
}

// What a ray from a point of the bubble sees. Rays heading into the page
// meet the things around the bubble, modelled as a dome of radius uReach
// standing on the page: a grazing reflection at the rim sees the page right
// behind it, and the reflection reaches further out towards the horizon.
// Texture lookups run after a per-pixel early exit, where implicit
// derivatives are undefined, so every lookup chooses its level explicitly:
// spread is how many radii of page one radius of shell sweeps over.
float backdropLod(float spread) {
  float texels = uBackdropScale.x * uBackdropSize.x / uRadius;
  return log2(max(texels * spread, 1.0));
}

vec3 radiance(vec3 origin, vec3 dir, float mirage, float spread) {
  vec3 room = environment(dir);
  if (!uHasBackdrop || dir.z > -0.005) return room;
  vec2 hit = origin.xy + dir.xy * uReach;
  vec2 uv = uBackdropOrigin + vec2(hit.x, -hit.y) * uBackdropScale;
  vec2 inside = step(vec2(0.0), uv) * step(uv, vec2(1.0));
  vec2 edge = min(uv, 1.0 - uv);
  float fade = inside.x * inside.y * smoothstep(0.0, 0.03, min(edge.x, edge.y));
  // Grazing rays meet the page far away and at a shallow angle.
  fade *= smoothstep(0.0, 0.2, -dir.z) * min(mirage, 1.0);
  vec3 page = toLinear(textureLod(uBackdrop, clamp(uv, 0.0, 1.0), backdropLod(spread)).rgb) *
              max(mirage, 1.0);
  return mix(room, page, clamp(fade, 0.0, 1.0));
}

// The layer at a point, premultiplied.
vec4 layerAt(vec2 xy) {
  if (!uHasLayer) return vec4(0.0);
  vec2 local = xy - uLayerRect.xy;
  float r = min(uLayerCorner, min(uLayerRect.z, uLayerRect.w));
  float edge = 0.75 / uRadius;
  float track = roundedRect(local, uLayerRect.zw, r);
  vec4 colour = uLayerTrack;
  float left = uLayerRect.x - uLayerRect.z;
  float fillHalf = max(0.0, 0.5 * (uLayerFill - left));
  // The fill is a pill of its own that ends in a round cap.
  float fill = roundedRect(xy - vec2(left + fillHalf, uLayerRect.y), vec2(fillHalf, uLayerRect.w),
                           min(r, fillHalf));
  float along = clamp((xy.x - left) / max(2.0 * uLayerRect.z, 1e-4), 0.0, 1.0);
  vec4 tint = mix(uLayerFrom, uLayerTo, along);
  colour = mix(colour, tint, clamp(0.5 - fill / edge, 0.0, 1.0) * step(1e-4, fillHalf));
  float a = colour.a * clamp(0.5 - track / edge, 0.0, 1.0);
  return vec4(colour.rgb * a, a);
}

vec3 pageThrough(vec2 xy) {
  vec2 uv = uBackdropOrigin + vec2(xy.x, -xy.y) * uBackdropScale;
  return toLinear(textureLod(uBackdrop, clamp(uv, 0.0, 1.0), backdropLod(1.0)).rgb);
}

// What lies behind a point of the bubble, in linear light. Over a captured
// backdrop it is opaque; over the live page only the layer is known, so the
// result is premultiplied with the layer's coverage as alpha.
vec4 behindAt(vec2 xy) {
  vec4 layer = layerAt(xy);
  vec3 tint = layer.a > 0.0 ? toLinear(layer.rgb / layer.a) : vec3(0.0);
  if (uHasBackdrop) return vec4(mix(pageThrough(xy), tint, layer.a), 1.0);
  return vec4(tint * layer.a, layer.a);
}

// ---------------------------------------------------------------- shape

// A point in the shape's rest frame, after undoing wobble and squash.
// The modes' cos(2(\u03B8 - a)) and cos(3(\u03B8 - b)) come from the direction's own
// double and triple angle, which need no atan or cos; at rest there is no
// wobble to undo.
vec2 restPoint(vec2 p) {
  float swell = uPressScale > 0.0 ? uPressScale : 1.0;
  p /= (uExtent + swell - 1.0) / uExtent;
  p /= uSquash;
  if (uModeBasis == vec4(0.0)) return p;
  vec2 d = p * inversesqrt(max(dot(p, p), 1e-30));
  vec2 d2 = vec2(d.x * d.x - d.y * d.y, 2.0 * d.x * d.y);
  vec2 d3 = vec2(d2.x * d.x - d2.y * d.y, d2.y * d.x + d2.x * d.y);
  float wobble = 1.0 + dot(d2, uModeBasis.xy) + dot(d3, uModeBasis.zw);
  return p / wobble;
}

/* CUSTOM_OUTLINE */

// Signed distance to the outline, in radii, after wobble and squash.
float ownOutline(vec2 p) {
  // Contacts use the same analytic geometry on both canvases. Independent
  // wobble modes would otherwise disagree about the position of the seam.
  if (any(greaterThan(uJoinAmounts, vec4(0.0)))) {
    float swell = uPressScale > 0.0 ? uPressScale : 1.0;
    return roundedRect(p, uExtent + swell - 1.0, clamp(uCorner, 0.0, 1.0) * swell);
  }
  return (/* OUTLINE_DISTANCE */ roundedRect(restPoint(p), uExtent, clamp(uCorner, 0.0, 1.0))) * (uPressScale > 0.0 ? uPressScale : 1.0);
}

float joinedDistance(float a, vec2 p, vec4 other, float corner, float amount) {
  if (amount <= 0.0) return a;
  float b = roundedRect(p - other.xy, other.zw, corner);
  float h = clamp(0.5 + 0.5 * (b - a) / amount, 0.0, 1.0);
  return mix(b, a, h) - amount * h * (1.0 - h);
}

float outline(vec2 p) {
  float d = ownOutline(p);
  d = joinedDistance(d, p, uJoin0, uJoinCorners.x, uJoinAmounts.x);
  d = joinedDistance(d, p, uJoin1, uJoinCorners.y, uJoinAmounts.y);
  d = joinedDistance(d, p, uJoin2, uJoinCorners.z, uJoinAmounts.z);
  return joinedDistance(d, p, uJoin3, uJoinCorners.w, uJoinAmounts.w);
}

// Each canvas paints its own half of a shared liquid neck. The partition
// never enters the SDF, so no glass bevel is drawn down the seam.
bool ownsContact(vec2 p) {
  float d = ownOutline(p);
  // A small opaque overlap covers the two canvases' different pixel grids.
  // Feathering both halves would composite two half-alphas and expose the
  // page as a light or dark hairline.
  float overlap = max(2.0 / uRadius, 0.06);
  if (uJoinAmounts.x > 0.0 && roundedRect(p - uJoin0.xy, uJoin0.zw, uJoinCorners.x) < d - overlap) return false;
  if (uJoinAmounts.y > 0.0 && roundedRect(p - uJoin1.xy, uJoin1.zw, uJoinCorners.y) < d - overlap) return false;
  if (uJoinAmounts.z > 0.0 && roundedRect(p - uJoin2.xy, uJoin2.zw, uJoinCorners.z) < d - overlap) return false;
  if (uJoinAmounts.w > 0.0 && roundedRect(p - uJoin3.xy, uJoin3.zw, uJoinCorners.w) < d - overlap) return false;
  return true;
}

vec4 contactTint(vec4 tint, vec2 p, vec4 other, float corner, float amount, vec4 otherTint) {
  if (amount <= 0.0) return tint;
  float a = ownOutline(p);
  float b = roundedRect(p - other.xy, other.zw, corner);
  float peer = clamp(0.5 - 0.5 * (b - a) / amount, 0.0, 1.0);
  // Transparent tint can contain white or black RGB depending on theme.
  // Mix premultiplied colour so that invisible RGB never paints a divider.
  float alpha = mix(tint.a, otherTint.a, peer);
  vec3 colour = mix(tint.rgb * tint.a, otherTint.rgb * otherTint.a, peer);
  return vec4(alpha > 1e-5 ? colour / alpha : vec3(0.0), alpha);
}

// A film stretched over a rounded frame bulges only as far in as its corner
// radius: a sphere for a circle, a pillow edge for a panel. Glass narrows
// that into a bevel.
float bevelWidth() {
  float soap = clamp(uCorner, 0.04, 1.0);
  return mix(soap, min(soap, clamp(uBevel, 0.04, 1.0)), uGlass);
}

float shellInset(float sdf) {
  return clamp(-sdf / bevelWidth(), 0.0, 1.0);
}

// Height of the shell across its edge, 0 at the rim and 1 where the face
// turns flat. A free film is a sphere (circular arc). Glass follows the
// squircle that liquid glass uses, flatter where it meets the face so the
// bevel reads thinner.
float profile(float x) {
  x = clamp(x, 0.0, 1.0);
  float circle = sqrt(max(0.0, 1.0 - (1.0 - x) * (1.0 - x)));
  float r = 1.0 - x;
  float squircle = sqrt(sqrt(max(0.0, 1.0 - r * r * r * r)));
  return mix(circle, squircle, uGlass);
}

float shellLift(float inset) {
  return bevelWidth() * profile(inset);
}

// Outward-facing normal of the shell: the profile's slope by central
// difference, turned into a tilt along the outline gradient.
vec3 shellNormal(float inset, vec2 gradient, float side) {
  float d = 0.002;
  float slope = (profile(inset + d) - profile(max(inset - d, 0.0))) / (inset + d - max(inset - d, 0.0));
  return normalize(vec3(gradient * slope, side));
}

// Blend the soap film towards a glass surface: Schlick Fresnel for n = 1.5
// carrying the film's colour variation as an oil coating.
vec3 surface(vec3 soap, float cosI) {
  if (uGlass <= 0.0) return soap;
  float fresnel = 0.04 + 0.96 * pow(1.0 - cosI, 5.0);
  float luma = dot(soap, vec3(0.2126, 0.7152, 0.0722));
  vec3 coated = max(vec3(0.0), fresnel * uReflectivity + (soap - luma) * 0.8);
  return min(mix(soap, coated, uGlass), vec3(1.0));
}

// The glint past the window, as a distance in its own units (about 0.09
// across): a dot, a short dash, a pair of dots, or none.
float glintShape(vec2 local, int shape) {
  if (shape == 1) return (length(local / vec2(0.09, 0.07)) - 1.0) * 0.07;
  if (shape == 2) {
    vec2 dash = vec2(clamp(local.x, -0.12, 0.08), 0.0);
    return length(local - dash) - mix(0.05, 0.03, (local.x + 0.12) / 0.2);
  }
  if (shape == 3) {
    vec2 second = local - vec2(0.15, 0.05);
    return min(length(local / vec2(0.07, 0.055)) - 1.0, length(second / vec2(0.045, 0.04)) - 1.0) * 0.05;
  }
  return 1.0;
}

// The window of the promo's intro bubbles, seen in a shape's top-left edge:
// a band with round ends set in from that edge and following it, with a
// small spark past its end. q is in radii, in the shape's rest frame; side
// is +1 for the window and -1 for its inverted twin on the far wall, which
// is seen through the film: blurred, without frame or glint.
// Returns its light and how far across the band the point lies.
vec2 windowLight(vec2 q, float rc, float pixel, float side) {
  // The mirror twin is the front window itself, turned round: it takes the
  // same shape, gradient and motion rather than the twin's blurred arc.
  bool twin = side < 0.0 && uTwinShape != 4;
  q *= side;
  // It follows the shape's own curve: an arc on a round bubble, a pill's
  // rounded end and then its top, a panel's corner.
  float depth = -roundedRect(q, uExtent, rc);
  float left = -uExtent.x;
  float straight = max(0.0, 2.0 * (uExtent.x - rc));
  // On a round bubble it spans the cartoon's arc, from 126 to 72 degrees.
  // On a long shape its tip reaches further round the rounded end, down
  // towards the left; a round bubble keeps the cartoon's arc.
  float elongated = clamp((uExtent.x / uExtent.y - 1.0) * 2.0, 0.0, 1.0);
  float from = left + mix(0.59, 0.5, elongated) * rc;
  float to = from + ((1.22 - 0.59) * rc + min(straight * 0.3, 1.2 * rc)) * uWindowLength;
  // Light moves along a glossy surface, not across it: as the room turns the
  // window slides along the edge, keeping to its curve, and draws in or out
  // a little; the twin, on the far wall, moves the other way.
  vec3 facing = uEnvRotation * vec3(0.0, 0.0, 1.0);
  float slide = -facing.x * 0.9 * rc * side;
  from += slide;
  to += slide;
  // The twin can take another shape: a thin crescent near the rim, a short
  // straight streak, or a soft dot.
  int style = twin ? uTwinShape : 0;
  // On a long shape the window keeps clear of the rim's curve: its depth is
  // partly measured from the straight top instead, so it bends less.
  float flatDepth = uExtent.y - q.y;
  float windowDepth = mix(depth, flatDepth, twin ? 0.0 : (1.0 - uWindowBend) * elongated);
  vec2 here = vec2(q.x, style == 2 ? flatDepth : windowDepth);
  float h = clamp((here.x - from) / max(to - from, 1e-4), 0.0, 1.0);
  // Set in a little further from the edge than the cartoon, for margin.
  float inward = facing.y * 0.15 * side;
  vec2 core = vec2(mix(from, to, h), (style == 1 ? 0.13 : twin ? 0.3 : 0.35 * uWindowMargin + inward) * rc);
  // Thick at the left, where it faces the light, thinner along the tail and
  // foreshortened at both ends, where the surface turns away.
  float ends = 1.0 - 0.25 * pow(abs(h * 2.0 - 1.0), 3.0);
  float halfWidth = (style == 1 ? 0.055 : style == 2 ? 0.07 : twin ? mix(0.17, 0.12, h)
      : mix(0.14 * uWindowHead, 0.1 * uWindowTail, h) * uWindowSize * uWindowWidth) * rc * ends;
  if (style == 3) {
    core = vec2(mix(from, to, 0.45), 0.3 * rc);
    halfWidth = 0.11 * rc;
  }
  float offset = length(here - core);
  float band = offset - halfWidth;
  // The small glint past the window. On auto it differs from bubble to
  // bubble: a dot, a short dash along the window, a pair of dots, or none.
  // Smaller than the cartoon's, so it does not read as a dot first.
  vec2 sparkAt = vec2(to + (0.22 + 0.3 * uGlintOffset.x) * rc, (0.4 + 0.15 * uGlintOffset.y) * rc);
  float sparkScale = 0.75 * rc * uWindowSize * uGlintSize;
  int sparkShape = uGlintShape != 0 ? uGlintShape
      : uSpark < 0.35 ? 1 : uSpark < 0.7 ? 2 : uSpark < 0.86 ? 3 : 4;
  float spark = glintShape((here - sparkAt) / sparkScale, sparkShape) * sparkScale;
  // Crisp towards the rim, where the surface turns away fast; melting
  // towards the middle of the face.
  float feather = max(pixel, (twin ? (style == 0 ? 0.09 : 0.05) : 0.03) * rc);
  float edge = feather * mix(1.0, 3.0, step(core.y, here.y));
  float shape = 1.0 - smoothstep(-edge, edge * 0.6, band);
  float across = clamp(offset / halfWidth, 0.0, 1.0);
  float glow = 1.0 - 0.28 * across * across;
  // A faint, soft frame bar part way along.
  float run = abs(h - 0.42) * (to - from) / rc;
  float bar = twin ? 1.0 : 1.0 - 0.15 * (1.0 - smoothstep(0.0, 0.05, run));
  // Towards its right end the window dims by the gradient: 0 keeps it even.
  float pane = shape * glow * bar * 0.92 * (1.0 - (twin ? 0.24 : uWindowGradient) * h);
  float glint = twin ? 0.0 : min(1.0, (1.0 - smoothstep(-feather * 0.6, feather * 0.6, spark)) * 0.6 * uGlintIntensity);
  return vec2(max(pane, glint), across);
}

// The window as it first was: the intro's bean and its round glint, drawn
// on a dome so it slides with the room and rides the wobble. The drawing is
// the original's, unchanged; only the circle it was drawn on is wrapped
// round the shape's real outline: round the top-left rounding by angle and
// along a straight top by distance, so on a round bubble it is exactly the
// original and on a pill it bends with the pill. Returns its light and how
// far across the bean the point lies.
vec2 bubbleWindow(vec2 rest, float rc, float pixel) {
  vec2 corner = vec2(-(uExtent.x - rc), uExtent.y - rc);
  vec2 fromCorner = rest - corner;
  // Round the rounding: angle about its centre and depth in from its rim.
  float angle = atan(fromCorner.y, fromCorner.x);
  float depth = 1.0 - length(fromCorner) / rc;
  // Over the straight part of the top: distance along it stands for angle,
  // and depth is measured down from the top edge.
  if (rest.x > corner.x && rest.x < uExtent.x - rc) {
    // Held at the bottom once past the bean, so it never comes round again.
    angle = max(0.5 * PI - (rest.x - corner.x) / rc, -0.5 * PI);
    depth = (uExtent.y - rest.y) / rc;
  }
  vec2 curve = (1.0 - depth) * vec2(cos(angle), sin(angle));
  const float flatness = 0.6;
  vec2 tilt = curve * flatness;
  vec3 dome = vec3(tilt, sqrt(max(0.0, 1.0 - dot(tilt, tilt))));
  vec3 ray = uEnvRotation * reflect(vec3(0.0, 0.0, -1.0), dome);
  vec2 u = ray.xy / max(ray.z + 1.0, 0.05) / flatness;
  float px = pixel / rc;
  vec2 d = u - vec2(-0.05, -0.22);
  // Length opens the arch about its middle; margin draws it inwards.
  float span = 0.15 * PI * uWindowLength;
  float radius = 0.8 - 0.12 * (uWindowMargin - 1.0);
  float a = clamp(atan(d.y, d.x), 0.55 * PI - span, 0.55 * PI + span);
  float toward = (a - (0.55 * PI - span)) / max(2.0 * span, 1e-4);
  float thick = 0.17 * uWindowSize * uWindowWidth * mix(uWindowTail, uWindowHead, toward);
  float offset = length(d - radius * vec2(cos(a), sin(a)));
  float arch = offset - thick;
  // Its glint is the original dot unless another shape is chosen; distance
  // moves it on round the arch and height in towards the middle.
  float sparkScale = uWindowSize * uGlintSize;
  vec2 sparkAt = vec2(0.5 + 0.25 * uGlintOffset.x, 0.42 - 0.12 * uGlintOffset.y);
  vec2 s = (u - sparkAt) / sparkScale;
  s = mat2(cos(0.6), -sin(0.6), sin(0.6), cos(0.6)) * s;
  float spark = glintShape(s, uGlintShape == 0 ? 1 : uGlintShape) * sparkScale;
  float feather = max(px, 0.04);
  float head = (a - (0.55 * PI - span)) / max(2.0 * span, 1e-4);
  // Towards its right end it dims by the gradient: 0 keeps it even.
  float window = (1.0 - smoothstep(-feather, feather, arch)) * 0.96 * (1.0 - uWindowGradient * 1.04 * (1.0 - head));
  float glint = min(1.0, (1.0 - smoothstep(-feather * 0.6, feather * 0.6, spark)) * 0.85 * uGlintIntensity);
  // Only near the top-left, inside the outline.
  float inside = 1.0 - smoothstep(0.95, 1.05, length(curve));
  return vec2(max(window, glint) * inside, clamp(offset / thick, 0.0, 1.0));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 p = (frag - uCenter) / uRadius;
  float pixel = 1.0 / uRadius;
  float sdf = outline(p);
  float coverage = clamp(0.5 - sdf / pixel, 0.0, 1.0);
  // Around the bubble only the layer is drawn, flat and unrefracted.
  vec4 outside = layerAt(p);
  if (coverage <= 0.0 || !ownsContact(p)) {
    outColor = outside;
    return;
  }
  // Where two rims become one surface, the old individual rims must stop
  // reflecting. Keep the real outer edge, but clear the internal bevel,
  // window and oil ring that would otherwise divide the liquid neck.
  float contactOptics = 1.0 - smoothstep(0.002, 0.06, ownOutline(p) - sdf)
    * smoothstep(0.01, 0.1, -sdf);
  vec2 e = vec2(pixel * 0.75, 0.0);
  vec2 gradient = vec2(outline(p + e.xy) - outline(p - e.xy), outline(p + e.yx) - outline(p - e.yx));
  gradient /= max(length(gradient), 1e-5);
  // The shell is the dome over the outline: an exact sphere for a circle.
  // Towards liquid glass the dome becomes a slab with a flat face and the
  // curvature gathers into a bevel around the edge.
  float inset = shellInset(sdf);
  float lift = shellLift(inset);
  vec3 front = shellNormal(inset, gradient, 1.0);
  vec3 back = vec3(front.xy, -front.z);
  vec3 frontPoint = vec3(p, lift);
  vec3 backPoint = vec3(p, -lift);
  vec3 view = vec3(0.0, 0.0, -1.0);
  float cosI = max(front.z, 0.0);

  // Film colour at both walls of the shell; glass trades the film for the
  // Fresnel reflectance of a solid surface, keeping the film's hues as an
  // oily coating when Oil film is up.
  // On large panels and bars the oil gathers near the rim and the middle
  // stays clear; small controls keep it all over.
  float band = uOilEdge / max(1.0, uOilFade);
  float rimOil = uOilEdge > 0.0
      ? mix(1.0, 1.0 - smoothstep(band * 0.5, band * 1.5, -sdf * uRadius),
            uOilLarge * min(uOilFade, 1.0))
      : 1.0;
  float frontOil = oilMask(frontPoint, 0.0) * rimOil * contactOptics;
  vec3 naturalSoap = film(filmThickness(frontPoint, 1.0, 0.0), cosI, frontOil);
  vec3 frontSoap = soapFilmPalette(naturalSoap);
  float paletteBrightness = uCustomSoapPalette
      ? max(max(frontSoap.r, frontSoap.g), frontSoap.b) /
        max(max(max(naturalSoap.r, naturalSoap.g), naturalSoap.b), 1e-5)
      : 1.0;
  vec3 frontFilm = surface(frontSoap, cosI);
  vec3 backFilm = surface(soapFilmPalette(film(filmThickness(backPoint, 1.0, 0.0), cosI, oilMask(backPoint, 0.0) * rimOil)), cosI);
  // Clear centre also works on small controls and with Oil edge at zero.
  // A radius-relative window keeps the oily rim at every scale; large panels
  // retain their existing, narrower pixel-sized oil band.
  float clearRim = min(rimOil, 1.0 - smoothstep(0.12, 0.55, -sdf));
  float clarity = mix(1.0, clearRim, uClearCenter);
  frontFilm *= clarity * contactOptics;
  backFilm *= clarity * contactOptics;

  // Outer wall: convex mirror, upright image. Inner wall: concave mirror seen
  // through the front film, inverted image. Solid glass has no thin back
  // wall to mirror, so that image fades with the glass.
  vec3 frontRay = reflect(view, front);
  vec3 backRay = reflect(view, -back);
  // The reflected direction turns twice as fast as the normal, which turns
  // as 1 / n.z towards the rim.
  float spread = 2.0 * uReach / max(front.z, 0.03);
  vec3 frontReflection = frontFilm * radiance(frontPoint, frontRay, uMirage, spread);
  vec3 backReflection = backFilm * (1.0 - frontFilm) * (1.0 - frontFilm) * (1.0 - 0.7 * uGlass) *
                        radiance(backPoint, backRay, uMirage, spread);
  frontReflection = soapSpectrum(frontReflection, uSoapHighlightColor);
  backReflection = soapSpectrum(backReflection, uSoapShadeColor);

  // Light from behind, refracted only if the film is given body. The ray is
  // followed across the shell to where it meets the back wall, so rays near
  // the rim cross a long chord just as they do in a ball lens.
  vec3 behind = vec3(0.0);
  float behindAlpha = uHasBackdrop ? 1.0 : 0.0;
  vec3 covered = vec3(0.0);
  float coveredWeight = 0.0;
  if (uHasBackdrop || uHasLayer) {
    vec2 exitXY = p;
    vec3 outward = view;
    float exitZ = -lift;
    float eta = 1.0 + 0.333 * uRefraction + 0.25 * uGlass;
    // A flat face passes light straight through: only the bevel is traced.
    if (eta > 1.0003 && inset < 0.999) {
      vec3 ray = refract(view, front, 1.0 / eta);
      // Distance along the ray at which it leaves through the back wall.
      float near = 0.0;
      float far = (lift + 1.0) / max(-ray.z, 0.05);
      for (int i = 0; i < 10; i++) {
        float mid = 0.5 * (near + far);
        vec3 x = frontPoint + ray * mid;
        float sd = outline(x.xy);
        if (x.z > -shellLift(shellInset(sd)) && sd < 0.0) near = mid; else far = mid;
      }
      vec3 x = frontPoint + ray * near;
      exitXY = x.xy;
      exitZ = x.z;
      vec2 exitGradient = vec2(outline(x.xy + e.xy) - outline(x.xy - e.xy),
                               outline(x.xy + e.yx) - outline(x.xy - e.yx));
      exitGradient /= max(length(exitGradient), 1e-5);
      float exitInset = shellInset(outline(x.xy));
      vec3 exitNormal = shellNormal(exitInset, exitGradient, -1.0);
      outward = refract(ray, -exitNormal, eta);
      if (dot(outward, outward) < 1e-4) outward = reflect(ray, -exitNormal);
    }
    float t = (-1.3 - exitZ) / min(outward.z, -0.05);
    vec2 target = exitXY + outward.xy * t;
    // Glass disperses: red bends less than blue.
    vec2 shift = target - p;
    float split = 0.12 * uGlass * uDispersion;
    vec4 green = behindAt(target);
    behind = green.rgb;
    behindAlpha = green.a;
    if (split > 1e-4 && dot(shift, shift) > 1e-8) {
      behind.r = behindAt(p + shift * (1.0 - split)).r;
      behind.b = behindAt(p + shift * (1.0 + split)).b;
    }
    // The bubbles this one covers, which the backdrop leaves out, seen along
    // the same ray bent as far as asked.
    if (uHasCovered) {
      vec2 bent = p + shift * uCoveredBend;
      vec2 uv = uBackdropOrigin + vec2(bent.x, -bent.y) * uBackdropScale;
      covered = toLinear(textureLod(uCovered, clamp(uv, 0.0, 1.0), 0.0).rgb);
      // Only where a bubble lies: over the bare page the film stays whole.
      vec3 page = toLinear(textureLod(uBackdrop, clamp(uv, 0.0, 1.0), 0.0).rgb);
      vec3 apart = abs(covered - page);
      coveredWeight = smoothstep(0.01, 0.06, max(max(apart.r, apart.g), apart.b));
    }
  }
  // User-controlled tint under the film, independent of the page theme.
  // Premultiplied compositing also works without a captured backdrop.
  vec4 bodyTint = contactTint(uTint, p, uJoin0, uJoinCorners.x, uJoinAmounts.x, uJoinTint0);
  bodyTint = contactTint(bodyTint, p, uJoin1, uJoinCorners.y, uJoinAmounts.y, uJoinTint1);
  bodyTint = contactTint(bodyTint, p, uJoin2, uJoinCorners.z, uJoinAmounts.z, uJoinTint2);
  bodyTint = contactTint(bodyTint, p, uJoin3, uJoinCorners.w, uJoinAmounts.w, uJoinTint3);
  behind = behind * (1.0 - bodyTint.a) + toLinear(bodyTint.rgb) * bodyTint.a;
  behindAlpha = behindAlpha * (1.0 - bodyTint.a) + bodyTint.a;

  // Back wall and whatever lies behind it.
  vec3 colour = behind * (1.0 - backFilm) + backReflection;
  vec3 through = 1.0 - backFilm;

  colour = colour * (1.0 - frontFilm) + frontReflection;
  through *= 1.0 - frontFilm;

  // The oil is an outer coating, separate from the base tint. Give that
  // coating its own spectral colour so an opaque tint cannot fill its colour
  // bands away. Only light themes use this extra coating: dark themes keep
  // their original spectral reflections and transmission unchanged.
  if (uLightTheme) {
    float oilCoat = min(uIridescence * 0.3, 0.65) * uGlass * frontOil * clarity * uOilOpacity;
    float oilPeak = max(max(frontSoap.r, frontSoap.g), frontSoap.b);
    vec3 oilHue = frontSoap / max(oilPeak, 1e-4);
    float baseLight = max(0.1, dot(colour, vec3(0.2126, 0.7152, 0.0722)));
    colour = mix(colour, oilHue * baseLight * paletteBrightness, oilCoat);
    through *= 1.0 - oilCoat;
  }

  // Liquid glass catches light along its bevel: a bright upper-left rim and
  // a fainter one opposite.
  if (uGlass > 0.0) {
    float bevel = pow(1.0 - cosI, 3.0) * smoothstep(0.0, 0.08, inset);
    vec2 side = normalize(front.xy + 1e-5);
    float lit = pow(max(dot(side, normalize(vec2(-0.6, 0.8))), 0.0), 2.0) +
                0.45 * pow(max(dot(side, normalize(vec2(0.6, -0.8))), 0.0), 2.0);
    colour += soapPalette(vec3(0.9, 0.95, 1.0), uSoapHighlightColor) * uGlass * uReflectivity * 0.55 * bevel * lit * contactOptics;
  }

  // Roll off reflected highlights, leaving a cleared centre's page colours intact.
  colour = colour / (1.0 + max(colour - 0.85, 0.0) * 0.6 * clarity);
  float darkFace = (1.0 - smoothstep(0.08, 0.6, max(max(colour.r, colour.g), colour.b))) * clarity;
  colour = mix(colour, soapSpectrum(colour, uSoapShadeColor), darkFace);

  // The bubbles of the promo's intro: a soft band where the far, lower wall
  // catches the light (a shade on light pages, a glow on dark ones), and
  // the room's key light mirrored large across the top.
  if (uBottomShade) {
    // Measured from the shape's own rounding, raised a little: a crescent
    // inside a round bubble, a band along the whole bottom of a pill.
    float rc = clamp(uCorner, 0.05, 1.0);
    vec2 raised = restPoint(p) - vec2(0.0, 0.4 * rc);
    vec2 inner = max(uExtent - rc, 0.0);
    float t = length(raised - clamp(raised, -inner, inner)) / (1.35 * rc);
    float band = t < 0.6 ? 0.0
      : t < 0.88 ? (t - 0.6) / 0.28
      : mix(1.0, 0.35, (t - 0.88) / 0.12);
    band = clamp(band, 0.0, 1.0);
    // The theme's shade, a soft shadow on light pages and a glow on dark
    // ones, unless a colour is given; its opacity sets the strength.
    bool themed = uShadeColor.a < 0.0;
    vec3 shade = themed ? (uLightTheme ? vec3(0.0) : vec3(1.0)) : toLinear(uShadeColor.rgb);
    shade = mix(shade, toLinear(uSoapShadeColor.rgb), uSoapShadeColor.a);
    float strength = (themed ? (uLightTheme ? 0.16 : 0.2) : uShadeColor.a * 0.35) * contactOptics;
    colour = mix(colour, shade, band * strength);
    through *= 1.0 - band * strength;
  }
  // Keep the spectral coating above an opaque base and its coloured shades.
  // Oil opacity, not Tint alpha or spectral saturation, controls its opacity.
  // Coverage and Clear centre keep defining where the spectrum lies.
  // An explicitly transparent soap colour keeps legacy base-only accents
  // (such as the green +) from gaining an additional spectral coating.
  float tintPresent = uCustomSoapPalette ? 1.0 : smoothstep(0.0, 0.2, uSoapColor.a);
  float tintedOil = tintPresent * smoothstep(0.0, 0.05, uIridescence) * 0.95 *
                    uOilOpacity * frontOil * clarity;
  if (tintedOil > 0.0) {
    vec3 spectrum = frontSoap;
    float peak = max(max(spectrum.r, spectrum.g), spectrum.b);
    vec3 hue = spectrum / max(peak, 1e-4);
    float baseLight = max(0.1, dot(colour, vec3(0.2126, 0.7152, 0.0722)));
    colour = mix(colour, hue * baseLight * paletteBrightness, tintedOil);
    through *= 1.0 - tintedOil;
  }
  if (uWindowLight) {
    // The intro's window, set in from and following the top-left edge (an
    // arc on a round bubble, the end and then the top of a pill, a panel's
    // corner), and its inverted twin, small and faint, on the far wall at
    // the bottom right, as on a real bubble. Both slide as the pointer turns
    // the room and ride the wobble, so they read as reflections.
    float rc = clamp(uCorner, 0.05, 1.0);
    // The edge window and its twin move along the edge themselves; only the
    // wobble moves the shape under them.
    vec2 q = restPoint(p);
    vec2 near = uWindowStyle == 1 ? bubbleWindow(q, rc, pixel) : windowLight(q, rc, pixel, 1.0);
    vec2 far = windowLight(uTwinShape == 4 ? q : q * 1.35, rc, pixel, -1.0);
    float light = min(1.0, near.x * uWindowIntensity) * smoothstep(0.05, 0.35, gradient.y) * contactOptics;
    // Thin shapes need more light to read at all.
    float twinStrength = uTwinShape == 0 ? 0.16 : uTwinShape == 2 ? 0.26 : uTwinShape == 4 ? 0.45 : 0.3;
    float twin = uWindowTwin ? min(1.0, far.x * twinStrength * uWindowIntensity) * smoothstep(0.05, 0.35, -gradient.y) * contactOptics : 0.0;
    // The film's oil colours show at the window's edges, as on a bubble.
    float peak = max(max(frontSoap.r, frontSoap.g), frontSoap.b);
    vec3 hue = frontSoap / max(peak, 1e-4);
    float fringe = clamp(near.y * 1.2 - 0.3, 0.0, 1.0) * min(uIridescence, 1.5) * 0.3;
    vec3 reflected = mix(vec3(1.0), hue, fringe) * light + vec3(twin);
    reflected = soapPalette(reflected, uSoapHighlightColor);
    // Reflected light adds to what is there rather than covering it.
    colour = 1.0 - (1.0 - colour) * (1.0 - min(reflected, vec3(1.0)));
    through *= 1.0 - max(light, twin);
  }
  // Laid over the film rather than under it, so See-through reads the same
  // on a light page, where the film's bright reflections would bury it.
  if (uHasCovered) {
    // What lies behind, so a solid body (Opacity) hides it as it hides the page.
    colour = mix(colour, covered, uSeeThrough * coveredWeight * (1.0 - uTint.a));
  }
  vec3 encoded = pow(max(colour, 0.0), vec3(1.0 / 2.2));
  vec4 bubble;
  if (uHasBackdrop) {
    bubble = vec4(encoded, 1.0);
  } else {
    // Over live page content: the page is seen undistorted through the film,
    // dimmed by what the film reflects away.
    float alpha = 1.0 - dot(through, vec3(0.2126, 0.7152, 0.0722)) * (1.0 - behindAlpha);
    bubble = vec4(encoded, clamp(alpha, 0.0, 1.0));
    bubble.a = max(bubble.a, max(max(bubble.r, bubble.g), bubble.b));
  }
  outColor = bubble * coverage + outside * (1.0 - coverage);
}
`;/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/function uv(e){let t=(n,r,o)=>{let i=(e-n)*(e<n?r:o);return Math.exp(-.5*i*i)};return[.362*t(442,.0624,.0374)+1.056*t(599.8,.0264,.0323)-.065*t(501.1,.049,.0382),.821*t(568.8,.0213,.0247)+.286*t(530.9,.0613,.0322),1.217*t(437,.0845,.0278)+.681*t(459,.0385,.0725)]}function cv(){let e=16,t=385,r=(715-t)/e,o=new Float32Array(e),i=new Float32Array(e),l=new Float32Array(e*3),s=[0,0,0];for(let a=0;a<e;a++){let u=t+(a+.5)*r,[f,g,h]=uv(u),y=[3.2406*f-1.5372*g-.4986*h,-.9689*f+1.8758*g+.0415*h,.0557*f-.204*g+1.057*h];o[a]=u,i[a]=r/u;for(let b=0;b<3;b++)l[a*3+b]=y[b],s[b]+=y[b]}for(let a=0;a<e;a++)for(let u=0;u<3;u++)l[a*3+u]/=s[u];return{lambda:o,bandwidth:i,weights:l}}var Fn=1.333,th=(e,t)=>2*e*(1-t)/(1+e*e-2*e*t);function dv(){let{lambda:e,bandwidth:t,weights:n}=cv(),[r,o]=Po,i=e.length,l=new Float32Array(r*o*4),s=new Float64Array(i),a=new Float64Array(i),u=new Float64Array(i),f=new Float64Array(i),g=new Float64Array(i),h=new Float64Array(i),y=new Float64Array(i),b=new Float64Array(i),v=new Float64Array(i);for(let P=0;P<o;P++){let c=Math.max(1e-4,P/(o-1)),d=1-c*c,p=Math.sqrt(Math.max(0,1-d/(Fn*Fn))),m=(c-Fn*p)/(c+Fn*p),x=(Fn*c-p)/(Fn*c+p),C=m*m,E=x*x,k=4*Math.PI*Fn*3e3*p/(r-1);for(let T=0;T<i;T++){let D=k/e[T],R=.5*D*t[T];s[T]=1,a[T]=0,u[T]=Math.cos(D),f[T]=Math.sin(D),g[T]=1,h[T]=0,y[T]=Math.cos(R),b[T]=Math.sin(R),v[T]=R}let O=P*r*4;for(let T=0;T<r;T++){let D=0,R=0,U=0;for(let L=0;L<i;L++){let j=T*v[L],J=j<.001?1:h[L]/j,H=s[L]*J,K=.5*(th(C,H)+th(E,H));D+=K*n[L*3],R+=K*n[L*3+1],U+=K*n[L*3+2];let re=s[L];s[L]=re*u[L]-a[L]*f[L],a[L]=a[L]*u[L]+re*f[L];let B=g[L];g[L]=B*y[L]-h[L]*b[L],h[L]=h[L]*y[L]+B*b[L]}l[O++]=Math.max(0,D),l[O++]=Math.max(0,R),l[O++]=Math.max(0,U),l[O++]=1}}return l}function fv(){let e=au,t=Ro,n=625341585,r=()=>(n^=n<<13,n^=n>>>17,n^=n<<5,(n>>>0)/4294967296),o=new Float64Array(e**3*3);for(let h=0;h<o.length;h+=3){let y=r()*2-1,b=r()*Math.PI*2,v=Math.sqrt(1-y*y);o[h]=v*Math.cos(b),o[h+1]=v*Math.sin(b),o[h+2]=y}let i=h=>h*h*h*(h*(h*6-15)+10),l=e/t,s=new Int32Array(t*2),a=new Float64Array(t*2),u=new Float64Array(t*2);for(let h=0;h<t;h++){let y=h*l,b=Math.floor(y),v=y-b,P=i(v);for(let c=0;c<2;c++)s[h*2+c]=((b+c)%e+e)%e,a[h*2+c]=v-c,u[h*2+c]=c?P:1-P}let f=new Uint8Array(t**3),g=0;for(let h=0;h<t;h++)for(let y=0;y<t;y++)for(let b=0;b<t;b++){let v=0;for(let P=0;P<8;P++){let c=b*2+(P&1),d=y*2+(P>>1&1),p=h*2+(P>>2&1),m=3*(s[c]+e*(s[d]+e*s[p])),x=o[m]*a[c]+o[m+1]*a[d]+o[m+2]*a[p];v+=x*(u[c]*u[d]*u[p])}f[g++]=Math.round(Math.min(1,Math.max(0,.5+.5*v*1.6))*255)}return f}var pv=["uCenter","uRadius","uExtent","uCorner","uBevel","uModeBasis","uSquash","uPressScale","uJoin0","uJoin1","uJoin2","uJoin3","uJoinCorners","uJoinAmounts","uJoinTint0","uJoinTint1","uJoinTint2","uJoinTint3","uTime","uFlow","uThickness","uIridescence","uDrainage","uSwirl","uOilCoverage","uOilOpacity","uOilEdge","uOilLarge","uOilFade","uClearCenter","uTint","uSoapColor","uCustomSoapPalette","uSoapPaletteRed","uSoapPaletteGold","uSoapPaletteGreen","uSoapPaletteCyan","uSoapPaletteBlue","uSoapPaletteViolet","uSoapShadeColor","uSoapHighlightColor","uLightTheme","uWindowLight","uKeyLight","uWindowTwin","uWindowWidth","uWindowGradient","uTopFade","uTopTail","uTopLength","uWindowHead","uWindowTail","uGlintShape","uGlintSize","uGlintIntensity","uGlintOffset","uWindowStyle","uWindowLength","uWindowMargin","uWindowBend","uWindowSize","uWindowIntensity","uTwinShape","uSpark","uBottomShade","uShadeColor","uFilmScale","uReflectivity","uMirage","uSeeThrough","uCoveredBend","uHasCovered","uFloorLight","uReach","uRefraction","uGlass","uDispersion","uSeed","uEnvironment","uEnvRotation","uBackdrop","uHasBackdrop","uBackdropOrigin","uBackdropScale","uBackdropSize","uHasLayer","uLayerRect","uLayerCorner","uLayerFill","uLayerTrack","uLayerFrom","uLayerTo"];function hv(e){let t=new Map,n=(o,i)=>{let l=t.get(o);return l||t.set(o,l=new Float64Array(i).fill(Number.NaN)),l},r=(o,i,l,s,a)=>{if(!o)return;let u=n(o,4);u[0]===i&&u[1]===l&&u[2]===s&&u[3]===a||(u[0]=i,u[1]=l,u[2]=s,u[3]=a,e.uniform4f(o,i,l,s,a))};return{f1(o,i){if(!o)return;let l=n(o,1);l[0]!==i&&(l[0]=i,e.uniform1f(o,i))},f2(o,i,l){if(!o)return;let s=n(o,2);s[0]===i&&s[1]===l||(s[0]=i,s[1]=l,e.uniform2f(o,i,l))},f4:r,v4:(o,i)=>r(o,i[0],i[1],i[2],i[3]),i1(o,i){if(!o)return;let l=n(o,1);l[0]!==i&&(l[0]=i,e.uniform1i(o,i))},m3(o,i){if(!o)return;let l=n(o,9),s=!0;for(let a=0;a<9;a++)l[a]!==i[a]&&(s=!1,l[a]=i[a]);s||e.uniformMatrix3fv(o,!1,Array.from(i))}}}var Io,gu=new Map;function ku(e){let t=gu.get(e);return t||gu.set(e,t=e.getBoundingClientRect()),t}function ih(){return Io===void 0&&(Io=uh(fl,{paced:!0})),Io}var mv=typeof navigator<"u"&&(/iP(hone|ad|od)/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1),gv=12,No=new Map,vu=0,vv=typeof FinalizationRegistry=="function"?new FinalizationRegistry(()=>{vu--}):null;function lh(e){let t=No.get(e);if(t){No.delete(e);for(let n of Dn.values())n.uploads.delete(t.gl);t.gl.getExtension("WEBGL_lose_context")?.loseContext()}}function ah(e){if(!mv)return null;let t=No.get(e);if(t)return t;for(let r of No.keys())r.isConnected||lh(r);if(vu>=gv)return null;let n=uh(fl,{surface:e});return n?(No.set(e,n),vu++,vv?.register(n.gl,null),n):null}function sh(e){window.setTimeout(()=>{e.isConnected||lh(e)})}function uh(e=fl,{paced:t=!1,surface:n}={}){let r=n??(typeof OffscreenCanvas=="function"?new OffscreenCanvas(1024,512):Object.assign(document.createElement("canvas"),{width:1024,height:512})),o=r.getContext("webgl2",{premultipliedAlpha:!0,alpha:!0,antialias:!1,preserveDrawingBuffer:!t||!!n});if(!o)return null;let i=t||n?o.getExtension("KHR_parallel_shader_compile"):null,l=(R,U)=>{let L=o.createShader(R);return o.shaderSource(L,U),o.compileShader(L),L},s=o.createProgram(),a=l(o.VERTEX_SHADER,Pp),u=l(o.FRAGMENT_SHADER,e);o.attachShader(s,a),o.attachShader(s,u),o.linkProgram(s);let f=o.createTexture();o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,f),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texImage2D(o.TEXTURE_2D,0,o.RGBA16F,Po[0],Po[1],0,o.RGBA,o.FLOAT,dv());let g=o.createTexture();o.activeTexture(o.TEXTURE2),o.bindTexture(o.TEXTURE_3D,g),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_3D,o.TEXTURE_MAG_FILTER,o.LINEAR);for(let R of[o.TEXTURE_WRAP_S,o.TEXTURE_WRAP_T,o.TEXTURE_WRAP_R])o.texParameteri(o.TEXTURE_3D,R,o.REPEAT);o.pixelStorei(o.UNPACK_ALIGNMENT,1),o.texImage3D(o.TEXTURE_3D,0,o.R8,Ro,Ro,Ro,0,o.RED,o.UNSIGNED_BYTE,fv()),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.activeTexture(o.TEXTURE0);let h={},y=!1,b=!1,v=()=>{if(!o.getProgramParameter(s,o.LINK_STATUS)){let R=[a,u].map(U=>o.getShaderParameter(U,o.COMPILE_STATUS)?"":o.getShaderInfoLog(U)).find(Boolean)||o.getProgramInfoLog(s);throw o.deleteShader(a),o.deleteShader(u),o.deleteProgram(s),new Error(R||"Soap Bubble program failed to link.")}o.deleteShader(a),o.deleteShader(u),o.useProgram(s);for(let R of pv)h[R]=o.getUniformLocation(s,R);o.uniform1i(h.uBackdrop,0),o.uniform1i(o.getUniformLocation(s,"uFilmTable"),1),o.uniform1i(o.getUniformLocation(s,"uNoise"),2),o.uniform1i(o.getUniformLocation(s,"uCovered"),3),y=!0};i||v();let P=o.createVertexArray();o.bindVertexArray(P),o.bindBuffer(o.ARRAY_BUFFER,o.createBuffer()),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW),o.enableVertexAttribArray(0),o.vertexAttribPointer(0,2,o.FLOAT,!1,0,0);let c=ph(o);o.texImage2D(o.TEXTURE_2D,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,new Uint8Array(4)),o.generateMipmap(o.TEXTURE_2D);let d={gl:o,canvas:r,u:h,set:hv(o),emptyTexture:c,flush:()=>D(),ready(){if(y)return!0;if(b||!o.getProgramParameter(s,i.COMPLETION_STATUS_KHR))return!1;try{v()}catch{b=!0}return y},inFlight(R){for(;O.length&&(o.isContextLost()?o.SIGNALED:o.getSyncParameter(O[0].sync,o.SYNC_STATUS))===o.SIGNALED;){let L=O.shift();o.deleteSync(L.sync),Sv(R-L.at)}return O.length},begin(R,U,L){if(n)return o.viewport(0,0,R,U),L?(o.enable(o.SCISSOR_TEST),o.scissor(L.x,U-L.y-L.height,L.width,L.height)):o.disable(o.SCISSOR_TEST),[0,0];let j=L??{x:0,y:0,width:R,height:U},[J,H]=T(j.width,j.height),K=J-j.x,re=H-(U-j.y-j.height);return o.viewport(K,re,R,U),L?(o.enable(o.SCISSOR_TEST),o.scissor(J,H,j.width,j.height)):o.disable(o.SCISSOR_TEST),E={x:J,y:H,width:j.width,height:j.height,left:j.x,top:j.y},[K,re]},present(R){R&&p.push({target:R,...E}),k||(k=!0,queueMicrotask(D))}},p=[],m={x:0,y:0,shelf:0,right:0},x={width:0,height:0,frames:0},C=(R,U)=>{let L=j=>Math.min(8192,Math.max(64,Math.ceil(j/64)*64));r.width!==L(R)&&(r.width=L(R)),r.height!==L(U)&&(r.height=L(U))},E={x:0,y:0,width:0,height:0,left:0,top:0},k=!1,O=[],T=(R,U)=>{if(m.x+R>r.width&&(m.x=0,m.y+=m.shelf,m.shelf=0),m.y+U>r.height||R>r.width){let j=m.y+U;D(),C(Math.max(r.width,R),Math.max(r.height,j))}let L=[m.x,m.y];return m.x+=R,m.shelf=Math.max(m.shelf,U),m.right=Math.max(m.right,m.x),L},D=()=>{k=!1,gu.clear();let R=m.right,U=m.y+m.shelf;if(m.x=0,m.y=0,m.shelf=0,m.right=0,!!p.length){if(t&&O.length<4){let L=o.fenceSync(o.SYNC_GPU_COMMANDS_COMPLETE,0);L&&O.push({sync:L,at:performance.now()})}for(let{target:L,x:j,y:J,width:H,height:K,left:re,top:B}of p)L.clearRect(re,B,H,K),L.drawImage(r,j,r.height-J-K,H,K,re,B,H,K);p.length=0,x.width=Math.max(x.width,R),x.height=Math.max(x.height,U),!(++x.frames<60)&&(x.width*x.height*2<r.width*r.height&&C(x.width,x.height),x.width=0,x.height=0,x.frames=0)}};return d}function ch(e,t){let n=t;return fh(e,n.uploads,n.source,n.version,!0)}function dh(e,t,n){let r=t.covered.get(n);return r?.canvas?fh(e,r.uploads,r.canvas,r.version,!1):null}function Fo(e,t,n,r){let o=e,i=o.covered.get(t);if(!i){if(n<=0)return;o.covered.set(t,i={canvas:null,version:0,uploads:new Map,wanted:0,shown:0}),o.layer.canvas&&bh(o,t,i)}if(i.wanted+=n,i.shown+=r,i.wanted>0)return Tu(o);yu(i.uploads),o.covered.delete(t)}function yu(e){for(let[t,n]of e)t.isContextLost()||t.deleteTexture(n.texture)}function fh(e,t,n,r,o){let i=t.get(e);return i||t.set(e,i={texture:ph(e,o),version:0}),n&&i.version!==r&&(e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,i.texture),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,n),o&&e.generateMipmap(e.TEXTURE_2D),i.version=r),i.texture}function ph(e,t=!0){let n=e.createTexture();return e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,n),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,t?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),n}var Dn=new Map,hh="[data-soap-bubble], [data-soap-bubble-group]",yv=e=>(e instanceof Element?e:e.parentElement)?.closest(hh)!=null,El="[data-soap-bubble-group]",mh=e=>(e instanceof Element?e:e.parentElement)?.closest(El)!=null;function gh(e,t){let n=Dn.get(e);if(!n){let i={element:e,source:null,version:0,uploads:new Map,covered:new Map,layer:{canvas:null,stale:!0,capturing:!1,timer:0},fontEmbedCSS:null,size:null,failed:!1,listeners:new Set,capturing:!1,dirty:!1,timer:0,mutations:new MutationObserver(l=>{l.some(s=>!yv(s.target))&&bu(i),l.some(s=>!mh(s.target)&&s.attributeName!=="data-backdrop")&&wu(i)}),resize:new ResizeObserver(()=>{bu(i),wu(i)})};i.mutations.observe(e,{subtree:!0,childList:!0,characterData:!0,attributes:!0}),i.resize.observe(e),Dn.set(e,i),n=i,vh(i)}let r=n,o=()=>t(r);return r.listeners.add(o),(r.size||r.failed)&&o(),()=>{if(r.listeners.delete(o),!r.listeners.size){window.clearTimeout(r.timer),r.mutations.disconnect(),r.resize.disconnect(),yu(r.uploads),window.clearTimeout(r.layer.timer);for(let i of r.covered.values())yu(i.uploads);Dn.delete(e)}}}function bu(e){window.clearTimeout(e.timer),e.timer=window.setTimeout(()=>void vh(e),180)}async function vh(e){if(e.capturing){e.dirty=!0;return}e.capturing=!0,e.dirty=!1;let{element:t}=e;try{let n=t.getBoundingClientRect();if(n.width<1||n.height<1)throw new Error("Empty backdrop");let r;if(t instanceof HTMLImageElement)await t.decode(),r=t;else if(t instanceof HTMLCanvasElement)r=t;else{await document.fonts?.ready;let{toCanvas:o}=await Promise.resolve().then(()=>(bl(),yl));r=await o(t,{width:n.width,height:n.height,pixelRatio:Math.min(1.5,window.devicePixelRatio||1),includeQueryParams:!0,fontEmbedCSS:await yh(e),style:{transform:"none"},filter:i=>!(i instanceof Element&&i.matches(hh))})}if(Dn.get(t)!==e)return;e.source=r,e.version++,e.size=r instanceof HTMLImageElement?[r.naturalWidth,r.naturalHeight]:[r.width,r.height],e.failed=!1,wu(e)}catch{e.failed=!e.size}finally{e.capturing=!1,e.listeners.forEach(n=>n()),e.dirty&&Dn.get(t)===e&&bu(e)}}function yh(e){return e.fontEmbedCSS??(e.fontEmbedCSS=Promise.resolve().then(()=>(bl(),yl)).then(({getFontEmbedCSS:t})=>t(e.element)).catch(()=>"")),e.fontEmbedCSS}function wu(e){e.layer.stale=!0,Tu(e)}function Tu(e){let{layer:t}=e;!e.covered.size||!t.stale||!e.source||t.canvas&&![...e.covered.values()].some(n=>n.shown>0)||(window.clearTimeout(t.timer),t.timer=window.setTimeout(()=>void bv(e),700))}async function bv(e){let{element:t,layer:n}=e;if(!(n.capturing||!e.covered.size||!e.source)){n.capturing=!0,n.stale=!1;try{let r=t.getBoundingClientRect();if(r.width<1||r.height<1)return;let o;if(t instanceof HTMLImageElement||t instanceof HTMLCanvasElement)o=Object.assign(document.createElement("canvas"),{width:e.size[0],height:e.size[1]});else{let{toCanvas:i}=await Promise.resolve().then(()=>(bl(),yl));o=await i(t,{width:r.width,height:r.height,pixelRatio:Math.min(1.5,window.devicePixelRatio||1),includeQueryParams:!0,fontEmbedCSS:`${await yh(e)}
${El}, ${El} * { visibility: hidden !important; }`,style:{transform:"none",background:"transparent"},filter:l=>!(l instanceof Element&&l.localName==="canvas")})}if(Dn.get(t)!==e)return;n.canvas=o;for(let[i,l]of e.covered)bh(e,i,l);e.listeners.forEach(i=>i())}catch{}finally{n.capturing=!1,n.stale&&Tu(e)}}}function bh(e,t,n){let{element:r,layer:o}=e;if(!o.canvas||!e.source)return;let i=r.getBoundingClientRect(),l=o.canvas.width/Math.max(1,i.width),s=Object.assign(document.createElement("canvas"),{width:o.canvas.width,height:o.canvas.height}),a=s.getContext("2d");if(!a)return;a.drawImage(o.canvas,0,0);let u=[...r.querySelectorAll(El),...t?[t]:[]];t&&!mh(t)&&wv(a,t,i,l),a.globalCompositeOperation="destination-over";for(let f of r.querySelectorAll("[data-soap-bubble] canvas")){if(!f.width||u.some(h=>h.contains(f)))continue;let g=f.getBoundingClientRect();a.drawImage(f,(g.left-i.left)*l,(g.top-i.top)*l,g.width*l,g.height*l)}a.drawImage(e.source,0,0,s.width,s.height),n.canvas=s,n.version++}function wv(e,t,n,r){let o=document.createTreeWalker(t,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT),i=document.createRange();for(let l=o.currentNode;l;l=o.nextNode()){let s;if(l.nodeType===Node.TEXT_NODE){if(!l.textContent?.trim())continue;i.selectNodeContents(l),s=i.getClientRects()}else if(l instanceof SVGSVGElement||l instanceof HTMLImageElement)s=[l.getBoundingClientRect()];else continue;for(let a of s)e.clearRect((a.left-n.left)*r-1,(a.top-n.top)*r-1,a.width*r+2,a.height*r+2)}}var kl=new Set,Tl=0;function wh(e){kl.add(e),Tl||(Tl=requestAnimationFrame(Ch))}function Sh(e){kl.delete(e)}var nh=new Set,rh=0,Su=!1,xh=()=>Su,Eh=[1,.8,.65,.5],xu=0,Eu=new Set,kh=()=>Eh[xu];function Th(e){return Eu.add(e),()=>{Eu.delete(e)}}var An=[],mu=0,oh=0,wl=0,Sl=0,xl=0;function Sv(e){An.push(e)}function xv(e,t){if(e-oh>250&&(mu=e,wl=0,Sl=0,An.length=0),oh=e,Sl++,t&&wl++,e-mu<1e3)return;An.sort((o,i)=>o-i),xl=(An.length>=8?An[An.length>>1]:0)>34||wl*3>Sl?xl+1:0,mu=e,wl=0,Sl=0,An.length=0,xl>=2&&xu<Eh.length-1&&(xl=0,xu++,Eu.forEach(o=>o()))}function Ch(e){Tl=0;let t=(Io?.inFlight(e)??0)>=2;if(Io&&xv(e,t),t){Tl=requestAnimationFrame(Ch);return}Su=e-rh>=31,Su&&(rh=e);let n=kl;kl=nh,nh=n;for(let r of n)r(e);n.clear()}/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/function Lh(e,t){let n=Math.min(e.radius,e.width/2,e.height/2)+Math.min(t.radius,t.width/2,t.height/2),r=Math.abs(e.x-t.x)-(e.width+t.width)/2+n,o=Math.abs(e.y-t.y)-(e.height+t.height)/2+n,i=Math.max(0,Math.hypot(Math.max(r,0),Math.max(o,0))+Math.min(Math.max(r,o),0)-n),l=Math.min(e.width,e.height,t.width,t.height),s=Math.min(1,Math.max(0,(i/l-.25)/.07));return 1-s*s*(3-2*s)}function Mh(e,t,n){let r=t?1250:420,o=t?40:16,i=Math.max(1,Math.ceil(n*240)),l=n/i;for(let s=0;s<i;s++)e.velocity+=((Number(t)-e.value)*r-e.velocity*o)*l,e.value+=e.velocity*l;Math.abs(Number(t)-e.value)+Math.abs(e.velocity)<.001&&(e.value=Number(t),e.velocity=0)}/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/var Cl=["studio","window","sky","soft"],Ev=[...Cl,"auto"],Lu=["edge","bubble"],Mu=["auto","dot","dash","pair","none"],Pu=["arc","crescent","streak","dot","mirror"],Bh={radius:9999,bevel:24,thickness:520,iridescence:1,drainage:.6,swirl:.65,filmScale:1,oilOpacity:1,oilCoverage:1,oilEdge:0,oilEdgeFade:1,clearCenter:0,tint:"#ffffff00",soapColor:"auto",soapPalette:"natural",soapPaletteRed:"#ff6685",soapPaletteGold:"#f6d365",soapPaletteGreen:"#83e8a9",soapPaletteCyan:"#60dce9",soapPaletteBlue:"#7799ff",soapPaletteViolet:"#c084fc",soapShadeColor:"auto",soapHighlightColor:"auto",reflectivity:1.6,mirage:1,seeThrough:0,seeThroughBend:.3,opacity:-1,floorLight:1,windowLight:!1,windowStyle:"edge",windowLength:1,windowMargin:1,windowBend:.6,windowSize:1,windowWidth:1,windowGradient:.24,topFade:.4,topTail:1,topLength:1,windowHead:1,windowTail:1,glintShape:"auto",glintSize:1,glintIntensity:1,glintDistance:0,glintHeight:0,windowIntensity:1,windowTwin:!0,windowTwinShape:"mirror",keyLight:!0,bottomShade:!1,bottomShadeColor:"auto",reach:2.6,refraction:.08,glass:0,dispersion:1,environment:"studio",tilt:1,wobble:1,speed:1,paused:!1,seed:7,maxDpr:2},N=(e,t,n,r)=>Math.min(n,Math.max(t,Number.isFinite(e)?e:r)),Cu=["soapPaletteRed","soapPaletteGold","soapPaletteGreen","soapPaletteCyan","soapPaletteBlue","soapPaletteViolet"],Ph=["uSoapPaletteRed","uSoapPaletteGold","uSoapPaletteGreen","uSoapPaletteCyan","uSoapPaletteBlue","uSoapPaletteViolet"];function Ru(e){let t=Bh,n={...t,...e};return{radius:N(n.radius,0,9999,t.radius),bevel:N(n.bevel,2,200,t.bevel),thickness:N(n.thickness,0,2400,t.thickness),iridescence:N(n.iridescence,0,3,t.iridescence),drainage:N(n.drainage,0,1,t.drainage),swirl:N(n.swirl,0,1,t.swirl),filmScale:N(n.filmScale,.2,6,t.filmScale),oilOpacity:N(n.oilOpacity,0,1,t.oilOpacity),oilCoverage:N(n.oilCoverage,0,1,t.oilCoverage),oilEdge:N(n.oilEdge,0,400,t.oilEdge),oilEdgeFade:N(n.oilEdgeFade,0,3,t.oilEdgeFade),clearCenter:N(n.clearCenter,0,1,t.clearCenter),tint:typeof n.tint=="string"&&n.tint.trim()?n.tint:t.tint,soapColor:typeof n.soapColor=="string"&&n.soapColor.trim()?n.soapColor:t.soapColor,soapPalette:n.soapPalette==="custom"?"custom":"natural",...Object.fromEntries(Cu.map(r=>[r,typeof n[r]=="string"&&n[r].trim()?n[r]:t[r]])),soapShadeColor:typeof n.soapShadeColor=="string"&&n.soapShadeColor.trim()?n.soapShadeColor:t.soapShadeColor,soapHighlightColor:typeof n.soapHighlightColor=="string"&&n.soapHighlightColor.trim()?n.soapHighlightColor:t.soapHighlightColor,reflectivity:N(n.reflectivity,0,6,t.reflectivity),mirage:N(n.mirage,0,3,t.mirage),seeThrough:N(n.seeThrough,0,1,t.seeThrough),seeThroughBend:N(n.seeThroughBend,0,2,t.seeThroughBend),opacity:N(n.opacity,-1,1,t.opacity),floorLight:N(n.floorLight,0,1,t.floorLight),windowLight:!!n.windowLight,windowStyle:Lu.includes(n.windowStyle)?n.windowStyle:t.windowStyle,windowLength:N(n.windowLength,.3,2,t.windowLength),windowMargin:N(n.windowMargin,.4,2.2,t.windowMargin),windowBend:N(n.windowBend,0,1,t.windowBend),windowSize:N(n.windowSize,.4,2,t.windowSize),windowWidth:N(n.windowWidth,.3,2.5,t.windowWidth),windowGradient:N(n.windowGradient,0,1,t.windowGradient),topFade:N(n.topFade,0,1,t.topFade),topTail:N(n.topTail,.05,2,t.topTail),topLength:N(n.topLength,.2,2.5,t.topLength),windowHead:N(n.windowHead,.3,2,t.windowHead),windowTail:N(n.windowTail,.05,2.5,t.windowTail),glintShape:Mu.includes(n.glintShape)?n.glintShape:t.glintShape,glintSize:N(n.glintSize,0,3,t.glintSize),glintIntensity:N(n.glintIntensity,0,2,t.glintIntensity),glintDistance:N(n.glintDistance,-1,2,t.glintDistance),glintHeight:N(n.glintHeight,-1.5,1.5,t.glintHeight),windowIntensity:N(n.windowIntensity,0,2,t.windowIntensity),windowTwin:n.windowTwin!==!1,windowTwinShape:Pu.includes(n.windowTwinShape)?n.windowTwinShape:t.windowTwinShape,keyLight:n.keyLight!==!1,bottomShade:!!n.bottomShade,bottomShadeColor:typeof n.bottomShadeColor=="string"&&n.bottomShadeColor.trim()?n.bottomShadeColor:t.bottomShadeColor,reach:N(n.reach,.5,8,t.reach),refraction:N(n.refraction,0,1,t.refraction),glass:N(n.glass,0,1,t.glass),dispersion:N(n.dispersion,0,3,t.dispersion),environment:Cl.includes(n.environment)?n.environment:t.environment,tilt:N(n.tilt,0,2,t.tilt),wobble:N(n.wobble,0,3,t.wobble),speed:N(n.speed,0,4,t.speed),paused:!!n.paused,seed:N(n.seed,0,9999,t.seed),maxDpr:N(n.maxDpr,.5,3,t.maxDpr)}}var Ao=new Map,lt=null,Rh=new Map;function mn(e){let t=Rh.get(e);if(t)return t;if(lt??(lt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!lt)return[0,0,0,0];lt.clearRect(0,0,1,1),lt.fillStyle="#000",lt.fillStyle=e,lt.fillRect(0,0,1,1);let[n,r,o,i]=lt.getImageData(0,0,1,1).data,l=[n/255,r/255,o/255,i/255];return Rh.set(e,l),l}var kv=[0,0,0,0];function Tv(e){if(lt??(lt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0})),!lt)return[1,1,1];lt.fillStyle="#000",lt.fillStyle=e;let t=String(lt.fillStyle),n=t.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})/i);if(n)return[1,2,3].map(o=>parseInt(n[o],16)/255);let r=t.match(/[\d.]+/g)?.map(Number)??[255,255,255];return[r[0]/255,r[1]/255,r[2]/255]}function _h(e,t,n,r){let o=ah(e),i=o??ih(),l=o?null:e.getContext("2d");if(!i||!o&&!l)return null;let{gl:s,u:a,set:u}=i,f=n,g=w=>w.tint.trim().toLowerCase()==="auto"?[...C?[1,1,1]:[0,0,0],Math.max(0,w.opacity)]:w.opacity<0?mn(w.tint):[...Tv(w.tint),w.opacity],h=w=>w.trim().toLowerCase()==="auto"?kv:mn(w),y=h(n.soapColor),b=h(n.soapShadeColor),v=h(n.soapHighlightColor),P=Cu.map(w=>mn(n[w])),c=w=>({glintShape:Mu.indexOf(w.glintShape),windowStyle:Lu.indexOf(w.windowStyle),twinShape:Pu.indexOf(w.windowTwinShape),environment:Cl.indexOf(w.environment)}),d=w=>w.bottomShadeColor.trim().toLowerCase()==="auto"?[0,0,0,-1]:mn(w.bottomShadeColor),p=c(n),m=d(n),x=t.closest("[data-theme]")?.getAttribute("data-theme"),C=x==="light"||x!=="dark"&&!matchMedia("(prefers-color-scheme: dark)").matches,E=g(n),k=!1,O=!1,T=!0,D=0,R=0,U=0,L=Math.random(),j=!0,J=!1,H=1,K=1,re=1,B=null,Q=1,ie=1,_=1,Y=null,at=1,st=1,yn=window.matchMedia?.("(prefers-reduced-motion: reduce)"),ut=yn?.matches??!1,ve=Array.from({length:4},()=>({value:0,velocity:0})),ct={value:0,velocity:0},Rr=!1,_t={value:0,velocity:0},Un=t.classList.contains("soap-bubble-button"),Do=()=>Un&&!ut?_t.value*Math.min(1.6,f.wobble/.4):0,Br=()=>1+.36*Do(),jn=[0,0],zt=[0,0],Ge={x:0,y:0,inside:!1,time:0},Uh=()=>{let w=Math.min(Q,st);return[Q/w,st/w]},jh=w=>{let F=2*Math.PI*2.1,$=F*Math.sqrt(30/12),A=.09;ve.forEach((z,St)=>{let Ae=St<2?F:$;z.velocity+=(-Ae*Ae*z.value-2*A*Ae*z.velocity)*w,z.value+=z.velocity*w});let ke=2*Math.PI*3.2,Te=Rr&&!Un?.075*f.wobble:0;ct.velocity+=(-ke*ke*(ct.value-Te)-2*.22*ke*ct.velocity)*w,ct.value+=ct.velocity*w;for(let z=0;z<2;z++)zt[z]+=(jn[z]-zt[z])*Math.min(1,w*4)},wt=new Float32Array(9),ze=null,Ho=null,Rl=()=>{},bn=e.closest("[data-soap-bubble]")??t,$e,Gh=w=>{let F=bn.getBoundingClientRect();for(let $ of w.querySelectorAll("[data-soap-bubble]")){if($===bn||$.contains(bn)||bn.contains($)||!$.querySelector("canvas"))continue;let A=$.getBoundingClientRect(),ke=Math.max(F.left,A.left),Te=Math.min(F.right,A.right),z=Math.max(F.top,A.top),St=Math.min(F.bottom,A.bottom);if(ke>=Te||z>=St)continue;let Ae=document.elementsFromPoint((ke+Te)/2,(z+St)/2),xt=Ae.findIndex(Vn=>bn.contains(Vn)),zr=Ae.findIndex(Vn=>$.contains(Vn));if(xt>=0&&(zr<0||xt<zr))return!0}return!1},wn=!1,Gn=()=>{let w,F=j&&!document.hidden;if(ze&&f.seeThrough>0&&E[3]<1){let A=bn.closest("[data-soap-bubble-group]")!=null;A&&!F?w=null:Gh(ze.element)&&(w=A?null:bn)}let $=w!==void 0&&F;w===$e&&$===wn||(ze&&$e!==void 0&&Fo(ze,$e,-1,wn?-1:0),$e=w,wn=$,ze&&$e!==void 0&&Fo(ze,$e,1,wn?1:0))},$n=(w=!1)=>{if(k)return!1;if(!i.ready())return ye(),!1;let[F,$]=Uh(),A=Math.min(Q,st)/2,ke=A*H,Te=e.getBoundingClientRect(),z=t.getBoundingClientRect(),St=Te.width?K/Te.width:1,Ae=z.width/ie,xt=z.height/_,zr=Y?Y.x+Y.width/2:ie/2,Vn=Y?Y.y+Y.height/2:_/2,Or=(z.left+zr*Ae-Te.left)*St,jo=(z.top+Vn*xt-Te.top)*St,Du=null;if(w){let X=2*H,Ce=Math.max(0,Math.floor((Or-Q/2)*H-X)),G=Math.max(0,Math.floor((jo-st/2)*H-X)),Et=Math.min(e.width,Math.ceil((Or+Q/2)*H+X)),It=Math.min(e.height,Math.ceil((jo+st/2)*H+X));Et>Ce&&It>G&&(Du={x:Ce,y:G,width:Et-Ce,height:It-G})}let[Xh,qh]=i.begin(e.width,e.height,Du);u.f2(a.uCenter,Xh+Or*H,qh+e.height-jo*H),u.f1(a.uRadius,ke),u.f2(a.uExtent,F,$),u.f1(a.uPressScale,Br());let _l=[];if(Un&&!ut&&!t.parentElement?.matches(".soap-bubble-menu[data-open]")){for(let[X,Ce]of Ao){if(X===t||!X.isConnected||Ce.scope()!==Ho||X.parentElement?.matches(".soap-bubble-menu[data-open]")||Math.max(Do(),Ce.strength())<=.001)continue;let G=ku(X);if(!G.width||!G.height)continue;let Et=Lh({x:z.left+z.width/2,y:z.top+z.height/2,width:z.width,height:z.height,radius:f.radius*at*Math.min(Ae,xt)},{x:G.left+G.width/2,y:G.top+G.height/2,width:G.width,height:G.height,radius:Ce.corner()*Math.min(Ae,xt)});if(Et===0)continue;let It=Math.abs(z.left+z.width/2-G.left-G.width/2),Ir=Math.abs(z.top+z.height/2-G.top-G.height/2),Xu=Math.hypot(Math.max(0,It-(z.width+G.width)/2-Math.min(z.width,z.height)/2*(Br()-1)-Math.min(G.width,G.height)/2*(Ce.scale()-1)),Math.max(0,Ir-(z.height+G.height)/2-Math.min(z.width,z.height)/2*(Br()-1)-Math.min(G.width,G.height)/2*(Ce.scale()-1)));Xu<Math.min(z.width,z.height,G.width,G.height)*.4&&_l.push({box:G,entry:Ce,distance:Xu,spacing:Et})}_l.sort((X,Ce)=>X.distance-Ce.distance)}let Hu=[0,0,0,0],Wu=[0,0,0,0],Jh=[a.uJoin0,a.uJoin1,a.uJoin2,a.uJoin3],Kh=[a.uJoinTint0,a.uJoinTint1,a.uJoinTint2,a.uJoinTint3];for(let X=0;X<4;X++){let Ce=_l[X];if(!Ce)continue;let{box:G,entry:Et}=Ce,It=Math.min(G.width/Ae,G.height/xt)/2,Ir=Et.scale();u.f4(Jh[X],(G.left+G.width/2-z.left-z.width/2)/Ae/A,-(G.top+G.height/2-z.top-z.height/2)/xt/A,(G.width/Ae/2+It*(Ir-1))/A,(G.height/xt/2+It*(Ir-1))/A),Hu[X]=Math.min(It,Et.corner())*Ir/A,Wu[X]=.8*Math.min(1,It/A)*Math.min(1,Math.max(Do(),Et.strength()))*Ce.spacing,u.v4(Kh[X],Et.tint())}u.v4(a.uJoinCorners,Hu),u.v4(a.uJoinAmounts,Wu),u.f1(a.uCorner,Math.min(1,f.radius*at/A)),u.f1(a.uBevel,f.bevel*at/A),u.f1(a.uFilmScale,f.filmScale),u.f1(a.uOilOpacity,f.oilOpacity),u.f1(a.uOilCoverage,f.oilCoverage),u.f1(a.uOilEdge,f.oilEdge*at*H),u.f1(a.uOilFade,f.oilEdgeFade),u.f1(a.uClearCenter,f.clearCenter),u.v4(a.uTint,E),u.v4(a.uSoapColor,y),u.v4(a.uSoapShadeColor,b),u.v4(a.uSoapHighlightColor,v),u.i1(a.uCustomSoapPalette,f.soapPalette==="custom"?1:0);for(let X=0;X<Ph.length;X++)u.v4(a[Ph[X]],P[X]);u.i1(a.uLightTheme,C?1:0),u.i1(a.uWindowLight,f.windowLight?1:0),u.i1(a.uKeyLight,f.keyLight?1:0),u.i1(a.uWindowTwin,f.windowTwin?1:0),u.f1(a.uWindowSize,f.windowSize),u.f1(a.uWindowWidth,f.windowWidth),u.f1(a.uWindowGradient,f.windowGradient),u.f1(a.uTopFade,f.topFade),u.f1(a.uTopTail,f.topTail),u.f1(a.uTopLength,f.topLength),u.f1(a.uWindowHead,f.windowHead),u.f1(a.uWindowTail,f.windowTail),u.i1(a.uGlintShape,p.glintShape),u.f1(a.uGlintSize,f.glintSize),u.f1(a.uGlintIntensity,f.glintIntensity),u.f2(a.uGlintOffset,f.glintDistance,f.glintHeight),u.i1(a.uWindowStyle,p.windowStyle),u.f1(a.uWindowLength,f.windowLength),u.f1(a.uWindowMargin,f.windowMargin),u.f1(a.uWindowBend,f.windowBend),u.f1(a.uWindowIntensity,f.windowIntensity),u.i1(a.uTwinShape,p.twinShape),u.f1(a.uSpark,L),u.i1(a.uBottomShade,f.bottomShade?1:0),u.v4(a.uShadeColor,m);let Qh=Math.max(Q,st)/(16*at),zl=Math.min(1,Math.max(0,(Qh-8)/6));u.f1(a.uOilLarge,zl*zl*(3-2*zl));let Ol=Math.hypot(ve[0].value,ve[1].value),Il=Math.hypot(ve[2].value,ve[3].value),Uu=Ol>0?Math.min(.12,Ol)/Ol:0,ju=Il>0?Math.min(.08,Il)/Il:0;u.f4(a.uModeBasis,ve[0].value*Uu,ve[1].value*Uu,ve[2].value*ju,ve[3].value*ju);let Gu=ct.value;u.f2(a.uSquash,1+Gu*.7,1-Gu),u.f1(a.uTime,R),u.f1(a.uFlow,U),u.f1(a.uThickness,f.thickness),u.f1(a.uIridescence,f.iridescence),u.f1(a.uDrainage,f.drainage),u.f1(a.uSwirl,f.swirl),u.f1(a.uReflectivity,f.reflectivity),u.f1(a.uMirage,f.mirage),u.f1(a.uSeeThrough,f.seeThrough),u.f1(a.uFloorLight,f.floorLight),u.f1(a.uReach,f.reach),u.f1(a.uRefraction,f.refraction),u.f1(a.uGlass,f.glass),u.f1(a.uDispersion,f.dispersion),u.f1(a.uSeed,f.seed%97*.731),u.i1(a.uEnvironment,p.environment);let $u=(zt[0]*.35+Math.sin(R*.13)*.05)*f.tilt,Vu=(zt[1]*.25+Math.cos(R*.11)*.03)*f.tilt,Nl=Math.cos($u),Fl=Math.sin($u),Al=Math.cos(Vu),Dl=Math.sin(Vu);wt[0]=Nl,wt[1]=Fl*Dl,wt[2]=-Fl*Al,wt[3]=0,wt[4]=Al,wt[5]=Dl,wt[6]=Fl,wt[7]=-Nl*Dl,wt[8]=Nl*Al,u.m3(a.uEnvRotation,wt);let Ot=ze?.size?ze:null;u.i1(a.uHasBackdrop,Ot?1:0);let Hl=Ot&&$e!==void 0?dh(s,Ot,$e):null;if(u.i1(a.uHasCovered,Hl?1:0),Hl&&(u.f1(a.uCoveredBend,f.seeThroughBend),s.activeTexture(s.TEXTURE3),s.bindTexture(s.TEXTURE_2D,Hl)),s.activeTexture(s.TEXTURE0),s.bindTexture(s.TEXTURE_2D,Ot?ch(s,Ot):i.emptyTexture),Ot){let X=ku(Ot.element);u.f2(a.uBackdropOrigin,(z.left+zr*Ae-X.left)/Math.max(1,X.width),(z.top+Vn*xt-X.top)/Math.max(1,X.height)),u.f2(a.uBackdropSize,Ot.size[0],Ot.size[1]),u.f2(a.uBackdropScale,A/Math.max(1,X.width),A/Math.max(1,X.height))}return u.i1(a.uHasLayer,B?1:0),B&&(u.f4(a.uLayerRect,(B.x+B.width/2-Or)/A,-(B.y+B.height/2-jo)/A,B.width/2/A,B.height/2/A),u.f1(a.uLayerCorner,B.radius/A),u.f1(a.uLayerFill,(B.x+B.width*Math.min(1,Math.max(0,B.fill))-Or)/A),u.v4(a.uLayerTrack,mn(B.track)),u.v4(a.uLayerFrom,mn(B.from)),u.v4(a.uLayerTo,mn(B.to??B.from))),s.drawArrays(s.TRIANGLES,0,3),i.present(l),J||(J=!0,r?.()),!0},Ou=()=>j&&!ut&&!document.hidden,$h=()=>!f.paused&&Ou(),Iu=()=>Ou()&&(Rr||Math.abs(_t.value)+Math.abs(_t.velocity)>1e-4||Math.abs(ct.value)+Math.abs(ct.velocity)>1e-4||ve.some(w=>Math.abs(w.value)+Math.abs(w.velocity)*.1>1e-4)||zt.some((w,F)=>Math.abs(w-jn[F])>.001)),Nu=w=>{O=!1;let F=$h(),$=Iu();if(F&&!$&&!T&&!xh()){ye();return}let A=D?Math.min(1/20,(w-D)/1e3):1/60;if(D=w,Un&&!ut){let ke=_t.value;if(Mh(_t,Rr,A),ke!==_t.value){t.style.setProperty("--soap-bubble-press",String(Math.max(0,_t.value))),T=!0;for(let[Te,z]of Ao)Te!==t&&z.invalidate()}}if(F&&(R+=A*f.speed,U+=A*f.speed),$){let ke=Math.max(1,Math.ceil(A*240)),Te=f.paused?1:Math.max(.25,f.speed);for(let z=0;z<ke;z++)jh(A*Te/ke)}$n(F&&!$&&!T)&&(T=!1),F||Iu()?ye():D=0};function ye(){O||k||(O=!0,wh(Nu))}let Wo=()=>{let w=getComputedStyle(e);K=Math.max(1,Number.parseFloat(w.width)||e.clientWidth),re=Math.max(1,Number.parseFloat(w.height)||e.clientHeight),ie=Math.max(1,t.clientWidth),_=Math.max(1,t.clientHeight),Q=Y?Y.width:ie,st=Y?Y.height:_,at=(Number.parseFloat(getComputedStyle(t).fontSize)||16)/16;let F=Math.min(window.devicePixelRatio||1,f.maxDpr);H=Math.max(Math.min(1,F),F*kh()),H=Math.min(H,Math.sqrt(8e5/(K*re)));let $=Math.max(1,Math.round(K*H)),A=Math.max(1,Math.round(re*H));e.width!==$&&(e.width=$),e.height!==A&&(e.height=A),Gn(),$n(),ye()},Bl=new ResizeObserver(Wo);Bl.observe(e),Bl.observe(t);let Fu=new IntersectionObserver(([w])=>{j=w?.isIntersecting??!0,Gn(),D=0,j&&ye()});Fu.observe(e);let Vh=Th(Wo),Uo=()=>{ut=yn?.matches??!1,Gn(),ut&&(_t.value=_t.velocity=0,t.style.removeProperty("--soap-bubble-press")),D=0,ye()},Au=()=>{(ze?.size||B)&&ye()};yn?.addEventListener?.("change",Uo),document.addEventListener("visibilitychange",Uo),window.addEventListener("scroll",Au,{passive:!0,capture:!0}),Un&&Ao.set(t,{scale:Br,strength:Do,corner:()=>f.radius*at,tint:()=>E,scope:()=>Ho,invalidate:()=>{T=!0,ye()}}),Wo();let _r=(w,F)=>{if(ut)return;let $=w*f.wobble;ve[0].velocity+=Math.cos(F*2)*$,ve[1].velocity+=Math.sin(F*2)*$,ve[2].velocity+=Math.cos(F*3)*$*.5,ve[3].velocity+=Math.sin(F*3)*$*.5,ye()};return{update(w){f=w,E=g(w),Gn(),y=h(w.soapColor),b=h(w.soapShadeColor),v=h(w.soapHighlightColor),P=Cu.map(F=>mn(w[F])),p=c(w),m=d(w),D=0,Wo()},setBackdrop(w){w!==Ho&&(ze&&$e!==void 0&&Fo(ze,$e,-1,wn?-1:0),$e=void 0,wn=!1,Rl(),Ho=w,ze=null,delete e.dataset.backdrop,Rl=w?gh(w,F=>{ze=F,Gn();let $=F.size?"captured":"failed";e.dataset.backdrop!==$&&(e.dataset.backdrop=$),$n(),ye()}):()=>{},$n(),ye())},setLightTheme(w){C!==w&&(C=w,E=g(f),Gn(),T=!0,ye())},setLayer(w){B=w,$n()},invalidate(){T=!0,ye()},pointer(w,F,$){let A=performance.now();if($){let ke=Math.max(16,A-Ge.time)/1e3,Te=Ge.inside?(w-Ge.x)/ke:0,z=Ge.inside?(F-Ge.y)/ke:0;if(!Ge.inside)_r(.35,Math.atan2(F,w));else{let St=Math.min(6,Math.hypot(Te,z));St>.2&&_r(St*.02,Math.atan2(z,Te))}jn[0]=w,jn[1]=F}else Ge.inside&&_r(.25,Math.atan2(Ge.y,Ge.x)),jn[0]=0,jn[1]=0;Ge.x=w,Ge.y=F,Ge.inside=$,Ge.time=A,ye()},motion(){return{pressScale:Br(),time:R,spark:L,flow:U,modes:ve.map(w=>({...w})),squash:{...ct},tilt:[zt[0],zt[1]]}},adopt(w){R=w.time,L=w.spark,U=w.flow,w.modes.forEach((F,$)=>Object.assign(ve[$],F)),Object.assign(ct,w.squash),zt[0]=w.tilt[0],zt[1]=w.tilt[1],T=!0,ye()},setShape(w){Y=w,Q=Math.max(1,w?w.width:ie),st=Math.max(1,w?w.height:_),$n(),ye()},rebound(){ut||(_r(1.4,Math.PI/5),ct.velocity-=.7*f.wobble,ye())},press(w){w!==Rr&&(Rr=w,w||_r(.6,Math.PI/2),ye())},dispose(){if(k=!0,Un){Ao.delete(t),t.style.removeProperty("--soap-bubble-press");for(let w of Ao.values())w.invalidate()}o&&sh(e),Sh(Nu),ze&&$e!==void 0&&Fo(ze,$e,-1,wn?-1:0),Rl(),Bl.disconnect(),Fu.disconnect(),Vh(),yn?.removeEventListener?.("change",Uo),document.removeEventListener("visibilitychange",Uo),window.removeEventListener("scroll",Au,{capture:!0})}}}var Nh=Tt(Hn());/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/var _v=["radius","bevel","thickness","iridescence","drainage","swirl","filmScale","oilOpacity","oilCoverage","oilEdge","oilEdgeFade","clearCenter","tint","soapColor","soapPalette","soapPaletteRed","soapPaletteGold","soapPaletteGreen","soapPaletteCyan","soapPaletteBlue","soapPaletteViolet","soapShadeColor","soapHighlightColor","reflectivity","mirage","seeThrough","seeThroughBend","opacity","floorLight","reach","refraction","glass","dispersion","environment","tilt","wobble","speed","paused","windowLight","keyLight","windowStyle","windowLength","windowMargin","windowBend","windowSize","windowWidth","windowGradient","topFade","topTail","topLength","windowHead","windowTail","glintShape","glintSize","glintIntensity","glintDistance","glintHeight","windowIntensity","windowTwin","windowTwinShape","bottomShade","bottomShadeColor","seed","maxDpr"],zv=new Set([..._v,"backdrop"]);function Pr(e){let t={},n={};for(let[r,o]of Object.entries(e))zv.has(r)?o!==void 0&&(t[r]=o):n[r]=o;return[t,n]}var Bu=(0,ce.createContext)({});function _u({children:e,...t}){let n=(0,ce.useContext)(Bu),[r]=Pr(t);return(0,Nh.jsx)(Bu.Provider,{value:{...n,...r},children:e})}function Ov(e){let[t,n]=(0,ce.useState)("light");return(0,ce.useEffect)(()=>{let r=matchMedia("(prefers-color-scheme: dark)"),o=()=>{let l=e.current?.closest("[data-theme]")?.getAttribute("data-theme");n(l==="dark"||l!=="light"&&r.matches?"dark":"light")};o();let i=new MutationObserver(o);return i.observe(document.documentElement,{attributes:!0,subtree:!0,attributeFilter:["data-theme"]}),r.addEventListener("change",o),()=>{i.disconnect(),r.removeEventListener("change",o)}},[e]),t}function Ml({host:e,canvas:t,defaults:n,material:r,interactive:o=!0,pointerTarget:i,adjust:l}){let s=(0,ce.useContext)(Bu),{backdrop:a,...u}=r,{backdrop:f,...g}=s,h=Ov(e),y={...n,...g,...u},b=Ru({...y,environment:y.environment==="auto"?h==="dark"?"studio":"soft":y.environment}),v=l?Ru({...b,...l(b)}):b,P=a!==void 0?a:f,c=(0,ce.useRef)(null),[d,p]=(0,ce.useState)(!1),m=(0,ce.useRef)(v);m.current=v;let x=JSON.stringify(v);(0,ce.useLayoutEffect)(()=>{e.current?.style.setProperty("--soap-bubble-tint",v.tint.trim().toLowerCase()==="auto"?"transparent":v.tint);for(let[E,k]of[["soap-color",v.soapColor],["soap-shade-color",v.soapShadeColor],["soap-highlight-color",v.soapHighlightColor]])e.current?.style.setProperty(`--soap-bubble-${E}`,k.trim().toLowerCase()==="auto"?"transparent":k)},[e,v.tint,v.soapColor,v.soapShadeColor,v.soapHighlightColor]),(0,ce.useLayoutEffect)(()=>{let E=[v.soapPaletteRed,v.soapPaletteGold,v.soapPaletteGreen,v.soapPaletteCyan,v.soapPaletteBlue,v.soapPaletteViolet],k=[...E,E[0]].map(O=>`color-mix(in srgb, ${O} ${v.oilOpacity*60}%, transparent)`);e.current?.style.setProperty("--soap-bubble-custom-palette",v.soapPalette==="custom"?`conic-gradient(from 45deg, ${k.join(", ")})`:"linear-gradient(transparent, transparent)")},[e,v.soapPalette,v.oilOpacity,v.soapPaletteRed,v.soapPaletteGold,v.soapPaletteGreen,v.soapPaletteCyan,v.soapPaletteBlue,v.soapPaletteViolet]),(0,ce.useLayoutEffect)(()=>{e.current?.style.setProperty("--soap-bubble-wobble",String(v.wobble))},[e,v.wobble]),(0,ce.useEffect)(()=>{if(!t.current||!e.current)return;let E=null;try{E=_h(t.current,e.current,m.current,()=>p(!0))}catch{E=null}return c.current=E,()=>{E?.dispose(),c.current=null}},[t,e]),(0,ce.useEffect)(()=>{let E=e.current?.closest("[data-theme]")?.getAttribute("data-theme"),k=E==="light"||E!=="dark"&&!matchMedia("(prefers-color-scheme: dark)").matches;c.current?.setLightTheme(k)},[h,e]),(0,ce.useLayoutEffect)(()=>c.current?.update(m.current),[x]);let C=P&&"current"in P?P.current:P??null;return(0,ce.useEffect)(()=>{c.current?.setBackdrop(C)}),(0,ce.useEffect)(()=>{if(!o)return;let E=(i??e).current,k=e.current;if(!E||!k)return;let O=B=>{let Q=k.getBoundingClientRect(),ie=Math.max(1,Math.min(k.clientWidth,k.clientHeight)/2);return[(B.clientX-Q.left-Q.width/2)/ie,-(B.clientY-Q.top-Q.height/2)/ie]},T=()=>E.disabled===!0,D=B=>{let[Q,ie]=O(B);c.current?.pointer(Q,ie,!0)},R=B=>{let[Q,ie]=O(B);c.current?.pointer(Q,ie,!1),c.current?.press(!1)},U=()=>{T()||c.current?.press(!0)},L=()=>c.current?.press(!1),j=B=>B.target?.matches?.("input, textarea, [contenteditable]")===!0,re=[["pointermove",D],["pointerenter",D],["pointerleave",R],["pointercancel",R],["pointerdown",U],["pointerup",L],["keydown",B=>{j(B)||(B.key===" "||B.key==="Enter")&&!B.repeat&&!T()&&c.current?.press(!0)}],["keyup",B=>{j(B)||(B.key===" "||B.key==="Enter")&&c.current?.press(!1)}],["blur",()=>c.current?.press(!1)]];return re.forEach(([B,Q])=>E.addEventListener(B,Q)),()=>re.forEach(([B,Q])=>E.removeEventListener(B,Q))},[o,e,i]),{ready:d,tuning:v,engine:c,setLayer:E=>c.current?.setLayer(E)}}var me=Tt(Hn());/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/var Pl={glass:.95,iridescence:2,filmScale:4.85,oilCoverage:1,oilEdge:18,thickness:480,drainage:.35,swirl:.5,refraction:.15,dispersion:1,reflectivity:1.3,mirage:.7,seeThrough:.3,seeThroughBend:.3,reach:2,bevel:14,environment:"auto",wobble:.4},Iv=e=>e/.8;function Fh(e){let t=(0,I.useRef)(0),n=(0,I.useRef)(0);return(0,I.useEffect)(()=>()=>cancelAnimationFrame(n.current),[]),(0,I.useCallback)((r=600)=>{if(t.current=performance.now()+r,n.current)return;let o=()=>{e.current?.invalidate(),n.current=performance.now()<t.current?requestAnimationFrame(o):0};n.current=requestAnimationFrame(o)},[e])}var gn=e=>`${e}px`,Wn=(0,I.forwardRef)(function({as:t="div",interactive:n=!1,reboundKey:r,rendererRef:o,className:i="",style:l,children:s,...a},u){let[f,g]=Pr(a),h=(0,I.useRef)(null),y=(0,I.useRef)(null);(0,I.useImperativeHandle)(u,()=>h.current,[]);let{ready:b,tuning:v,engine:P}=Ml({host:h,canvas:y,material:f,interactive:n!==!1&&n!==0,defaults:{...Pl,radius:24},adjust:typeof n=="number"?p=>({wobble:p.wobble*n}):void 0});(0,I.useEffect)(()=>{if(o)return o.current=P.current,()=>{o.current=null}},[o,P]);let c=(0,I.useRef)(r);return(0,I.useEffect)(()=>{c.current!==r&&(c.current=r,P.current?.rebound())},[r,P]),(0,me.jsxs)(t,{...g,ref:h,"data-soap-bubble":"","data-soap-bubble-ready":b||void 0,className:`soap-bubble-surface ${i}`.trim(),style:{"--soap-bubble-radius":`${v.radius/16}em`,...l},children:[(0,me.jsx)("canvas",{ref:y,className:"soap-bubble-surface-canvas","aria-hidden":"true"}),t==="button"?(0,me.jsx)("span",{className:"soap-bubble-button-content",children:s}):s]})}),Ah=(0,I.forwardRef)(function({className:t="",type:n="button",radius:r=9999,...o},i){return(0,me.jsx)(Wn,{...o,ref:i,as:"button",type:n,radius:r,interactive:!0,className:`soap-bubble-button ${t}`.trim()})}),Nv=(0,I.forwardRef)(function({checked:t,defaultChecked:n=!1,onCheckedChange:r,color:o="#34c759",scale:i=1,className:l="",style:s,onClick:a,onPointerDown:u,...f},g){let[h,y]=Pr(f),[b,v]=(0,I.useState)(n),P=t??b,c=(0,I.useRef)(null),d=(0,I.useRef)(null),p=(0,I.useRef)(null);(0,I.useImperativeHandle)(g,()=>c.current,[]);let[m,x]=(0,I.useState)(!1),[C,E]=(0,I.useState)(!1),k=m||C,O=Math.min(12,Math.max(.5,i)),{ready:T,engine:D,setLayer:R,tuning:U}=Ml({host:d,canvas:p,material:h,pointerTarget:c,defaults:{...Pl,bevel:9}}),L=Fh(D),j=(0,I.useRef)(1);j.current=Iv(U.wobble);let J={width:64*O,height:28*O},H={width:38*O,height:24*O},K=(J.height-H.height)/2,re=14*O,B=J.width-H.width-K*2,Q=(0,I.useRef)({position:P?1:0,velocity:0,frame:0}),ie=(0,I.useCallback)(()=>{let{position:_}=Q.current,Y=K+H.width/2+_*B;d.current&&(d.current.style.transform=`translate(${Y}px, -50%) translateX(-50%)`),R({x:re,y:re,width:J.width,height:J.height,radius:J.height/2,fill:Math.min(1,Math.max(0,_)),track:"rgb(120 120 128 / 0.22)",from:o})},[K,H.width,B,re,J.width,J.height,o,R]);return(0,I.useLayoutEffect)(ie,[ie,T]),(0,I.useEffect)(()=>L(450),[k,L]),(0,I.useEffect)(()=>{if(!m)return;let _=()=>x(!1);return window.addEventListener("pointerup",_),window.addEventListener("pointercancel",_),()=>{window.removeEventListener("pointerup",_),window.removeEventListener("pointercancel",_)}},[m]),(0,I.useEffect)(()=>{let _=Q.current,Y=P?1:0;if(matchMedia("(prefers-reduced-motion: reduce)").matches||Math.abs(Y-_.position)+Math.abs(_.velocity)<.001){_.position=Y,_.velocity=0,ie();return}E(!0);let at=0,st=yn=>{let ut=at?Math.min(.03333333333333333,(yn-at)/1e3):.016666666666666666;at=yn;let ve=Math.max(10,32-12*j.current);if(_.velocity+=((Y-_.position)*260-_.velocity*ve)*ut,_.position+=_.velocity*ut,ie(),Math.abs(Y-_.position)<.02&&Math.abs(_.velocity)<.35&&E(!1),Math.abs(Y-_.position)+Math.abs(_.velocity)<.001){_.position=Y,_.velocity=0,ie(),_.frame=0,E(!1);return}_.frame=requestAnimationFrame(st)};return cancelAnimationFrame(_.frame),_.frame=requestAnimationFrame(st),()=>cancelAnimationFrame(_.frame)},[P,ie]),(0,me.jsxs)("button",{...y,ref:c,type:"button",role:"switch","aria-checked":P,"data-soap-bubble":"","data-soap-bubble-ready":T||void 0,"data-lens":k||void 0,className:`soap-bubble-toggle ${l}`.trim(),style:{width:J.width,height:J.height,fontSize:gn(16*O),"--soap-bubble-control-bleed":gn(re),"--soap-bubble-toggle-color":o,"--soap-bubble-thumb-width":gn(H.width),"--soap-bubble-thumb-height":gn(H.height),...s},onPointerDown:_=>{u?.(_),!_.defaultPrevented&&!f.disabled&&x(!0)},onClick:_=>{a?.(_),!_.defaultPrevented&&(t===void 0&&v(!P),r?.(!P))},children:[(0,me.jsx)("canvas",{ref:p,className:"soap-bubble-control-canvas","aria-hidden":"true"}),(0,me.jsx)("span",{ref:d,className:"soap-bubble-toggle-thumb"})]})}),Fv=(0,I.forwardRef)(function({value:t,defaultValue:n=50,min:r=0,max:o=100,step:i=1,onValueChange:l,from:s="#0a84ff",to:a,disabled:u,label:f="Value",scale:g=1,className:h="",style:y,...b},v){let[P,c]=Pr(b),[d,p]=(0,I.useState)(n),m=Math.min(o,Math.max(r,t??d)),x=(0,I.useRef)(null),C=(0,I.useRef)(null),E=(0,I.useRef)(null);(0,I.useImperativeHandle)(v,()=>x.current,[]);let[k,O]=(0,I.useState)(0),[T,D]=(0,I.useState)(!1),R=Math.min(12,Math.max(.5,g)),{ready:U,engine:L,setLayer:j}=Ml({host:C,canvas:E,material:P,pointerTarget:x,defaults:{...Pl,bevel:8}}),J=Fh(L),H={width:38*R,height:26*R},K=6*R,re=44*R,B=16*R,Q=o>r?(m-r)/(o-r):0,ie=H.width/2+Q*Math.max(0,k-H.width);return(0,I.useLayoutEffect)(()=>{let _=x.current,Y=new ResizeObserver(()=>O(_.clientWidth));return Y.observe(_),O(_.clientWidth),()=>Y.disconnect()},[]),(0,I.useLayoutEffect)(()=>{k&&(j({x:B,y:B+(re-K)/2,width:k,height:K,radius:K/2,fill:ie/k,track:"rgb(120 120 128 / 0.2)",from:s,to:a}),J(T?400:250))},[k,ie,s,a,re,K,B,j,U,J,T]),(0,I.useEffect)(()=>{if(!T)return;J(400);let _=()=>D(!1);return window.addEventListener("pointerup",_),window.addEventListener("pointercancel",_),()=>{window.removeEventListener("pointerup",_),window.removeEventListener("pointercancel",_)}},[T,J]),(0,me.jsxs)("div",{...c,ref:x,"data-soap-bubble":"","data-soap-bubble-ready":U||void 0,"data-active":T||void 0,"data-disabled":u||void 0,className:`soap-bubble-slider ${h}`.trim(),style:{height:re,fontSize:gn(16*R),"--soap-bubble-control-bleed":gn(B),"--soap-bubble-thumb-width":gn(H.width),"--soap-bubble-thumb-height":gn(H.height),...y},children:[(0,me.jsx)("canvas",{ref:E,className:"soap-bubble-control-canvas","aria-hidden":"true"}),(0,me.jsx)("span",{ref:C,className:"soap-bubble-slider-thumb",style:{left:ie}}),(0,me.jsx)("input",{type:"range",className:"soap-bubble-slider-input","aria-label":f,min:r,max:o,step:i,value:m,disabled:u,onChange:_=>{let Y=Number(_.target.value);t===void 0&&p(Y),l?.(Y)},onPointerDown:()=>D(!0),onPointerUp:()=>D(!1),onPointerCancel:()=>D(!1),onBlur:()=>D(!1)})]})}),zu=(0,I.forwardRef)(function({className:t="",...n},r){return(0,me.jsx)(Ah,{...n,ref:r,className:`soap-bubble-icon-button ${t}`.trim()})}),Av=(0,I.forwardRef)(function({className:t="",style:n,placeholder:r="Search","aria-label":o,...i},l){let[s,a]=Pr(i);return(0,me.jsxs)(Wn,{...s,radius:s.radius??9999,interactive:.4,className:`soap-bubble-search ${t}`.trim(),style:n,children:[(0,me.jsxs)("svg",{className:"soap-bubble-search-icon",viewBox:"0 0 24 24","aria-hidden":"true",children:[(0,me.jsx)("circle",{cx:"10.5",cy:"10.5",r:"6.5"}),(0,me.jsx)("path",{d:"m15.5 15.5 5 5"})]}),(0,me.jsx)("input",{...a,ref:l,type:"search",placeholder:r,"aria-label":o??r,className:"soap-bubble-search-input"})]})});/*!
ReactDrops Component License 1.0

Copyright (c) 2026 ReactDrops

1. Scope and definitions

This license applies to ReactDrops software and associated documentation that
expressly carry this license or are distributed under a LICENSE file containing
it (the "Software"). "Licensor" means the copyright holder granting rights in
the Software, and only to the extent that holder has authority to grant them.
"You" means the individual or entity exercising these rights.

An "End Product" is a website, application, service, or other finished project
whose primary purpose is something other than providing reusable components,
source code, templates, or development assets to others.

2. Permitted uses

Subject to this license, Licensor grants You a worldwide, non-exclusive,
royalty-free license to use, copy, modify, and incorporate the Software into
unlimited personal, internal, and commercial End Products. You may charge for
End Products, subscriptions, development services, and work for clients.

You may distribute the Software as an integrated part of an End Product,
including in browser-delivered JavaScript. You may provide End Product source
code to a client, and share the Software with employees and contractors who
need it to develop or maintain End Products. Those recipients may use the
Software for those purposes subject to this license. This permission does not
authorize them to redistribute the Software as a reusable development asset.

3. Restricted redistribution

Unless You obtain separate written permission from Licensor, You may not sell,
sublicense, publish, share, or otherwise redistribute the Software, or a
substantial portion of it, whether unchanged or modified:

(a) as a standalone component, component library, UI kit, source-code bundle,
    registry, or other collection of reusable development assets;
(b) as part of a theme, template, starter project, or similar product offered
    to multiple recipients for reuse in their own projects; or
(c) through a builder or generation service that offers the Software as
    reusable blocks or source-code exports for others' projects.

These restrictions apply to paid and free redistribution. Renaming, restyling,
repackaging, translating, or modifying the Software does not remove them.
Building separate finished websites or applications for multiple clients is
permitted; offering a reusable template or kit containing the Software is not.

Public source-code hosting by Licensor is not permission to republish the
Software under another license. This license does not override any separate
rights granted directly by Licensor or applicable code-hosting terms.

4. Notices and ownership

Retain this license and applicable copyright and third-party notices in source
copies of the Software and permitted source distributions. No visible credit
or ReactDrops logo is required in an End Product's user interface.

Licensor retains ownership of its Software. You retain rights in Your own
contributions, subject to the license for any incorporated Software. No rights
to trademarks, trade names, or logos are granted by this license.

5. Third-party materials and separate grants

Dependencies, fonts, images, videos, and other third-party materials remain
subject to their respective licenses. Separately identified third-party code
is licensed under its stated terms, and these restrictions do not limit rights
granted by its copyright holders. Retain all required third-party notices.
Demo media are not licensed by this document; obtain Your own permission or
replace them with media You are entitled to use.

This license does not revoke rights granted under other valid licenses. It does
not assert ownership of third-party work or grant rights Licensor lacks.

6. Termination

The permissions granted here continue unless terminated for a material breach.
If You fail to cure a material breach within 30 days after receiving written
notice from Licensor, Your permissions terminate. On termination, cease uses
and distributions requiring this license. Rights under independently granted
licenses and rights that applicable law does not allow to be restricted remain
unaffected. Sections 3 through 7 survive termination.

7. Disclaimer

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. TO THE MAXIMUM EXTENT
PERMITTED BY APPLICABLE LAW, LICENSOR AND CONTRIBUTORS SHALL NOT BE LIABLE FOR
ANY CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT, OR OTHERWISE,
ARISING FROM, OUT OF, OR IN CONNECTION WITH THE SOFTWARE OR ITS USE.

This license does not limit rights or exceptions that applicable law makes
non-waivable. No other permissions are granted by implication.
*/var ge=Tt(Hn()),Hh={glass:.95,iridescence:.5,filmScale:4.85,oilOpacity:1,oilCoverage:.73,oilEdge:18,oilEdgeFade:2.33,clearCenter:.57,thickness:480,drainage:.35,swirl:.5,reflectivity:1.3,refraction:.15,dispersion:1,bevel:14},Wh={iridescence:.18,oilOpacity:.3,oilCoverage:.35,oilEdgeFade:3,clearCenter:.88,reflectivity:.55,dispersion:.35,refraction:.08,swirl:.25},Dv={...Hh,...Wh,iridescence:.28},Hv={windowLength:1.3,windowMargin:.85,windowBend:.75,windowSize:.75,windowWidth:.8,windowGradient:.96,windowHead:.7,windowTail:.6,glintSize:1.65,glintIntensity:0,glintDistance:-.45,glintHeight:.65,windowIntensity:.4,windowTwin:!1};function Wv({api:e,logo:t}){let[n,r]=(0,vn.useState)({groups:[],active:-1,now:"olways",idx:"01",dark:!0,prog:0,hidden:!1}),o=(0,vn.useRef)(null),[i,l]=(0,vn.useState)({left:0,width:0});(0,vn.useEffect)(()=>{window.__olwaysNav=a=>r(u=>({...u,...a})),window.__olwaysNavReady?.()},[]),(0,vn.useEffect)(()=>{let a=o.current?.querySelectorAll(".gl")[n.active];a&&l({left:a.offsetLeft,width:a.offsetWidth})},[n.active,n.groups.length]);let s={...n.dark?Dv:{...Hh,...Wh},...Hv,bottomShadeColor:n.dark?"#0b2a3a":"#ffffff"};return(0,ge.jsx)(_u,{...s,children:(0,ge.jsxs)("div",{className:`sbnav${n.dark?" dk":""}${n.hidden?" hide":""}`,children:[(0,ge.jsx)(Wn,{className:"sbbar",radius:9999,interactive:.35,children:(0,ge.jsxs)("div",{className:"sbin",ref:o,children:[(0,ge.jsx)("button",{className:"lg","aria-label":"\uCC98\uC74C\uC73C\uB85C",onClick:e.onLogo,dangerouslySetInnerHTML:{__html:t}}),n.active>=0&&(0,ge.jsx)(Wn,{className:"sbind",radius:9999,interactive:!0,"aria-hidden":!0,style:{transform:`translateX(${i.left}px)`,width:i.width},reboundKey:n.active}),n.groups.map((a,u)=>(0,ge.jsx)("button",{className:`gl${u===n.active?" on":""}`,onClick:()=>e.onGroup(u),children:a},a))]})}),(0,ge.jsxs)("div",{className:"sbrt",children:[(0,ge.jsx)(Wn,{className:"sbnow",radius:9999,reboundKey:n.now,children:(0,ge.jsxs)("span",{className:"sbnowi",children:[(0,ge.jsx)("i",{children:n.idx}),n.now]})}),(0,ge.jsxs)(zu,{"aria-label":"\uB2E4\uC74C \uC139\uC158",className:"sbgo",onClick:e.onNext,style:{"--prog":n.prog},children:[(0,ge.jsx)("svg",{className:"ring",viewBox:"0 0 44 44","aria-hidden":!0,children:(0,ge.jsx)("circle",{cx:"22",cy:"22",r:"20"})}),(0,ge.jsx)("svg",{className:"ar",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":!0,children:(0,ge.jsx)("path",{d:"M12 5v14M6 13l6 6 6-6"})})]})]})]})})}window.mountOlwaysNav=(e,t,n)=>(0,Dh.createRoot)(e).render((0,ge.jsx)(Wv,{api:t,logo:n}));})();
