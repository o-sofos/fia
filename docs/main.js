var h=void 0,t=0,I0=0,b=void 0;function e(z){if(h)z.subs.add(h),h.deps.add(z)}function z0(z){z.version=++t;let F=[...z.subs];for(let f of F)if(I0>0){if(!b)b=new Set;b.add(f)}else f.execute()}function F0(z){for(let F of z.deps)F.subs.delete(z);z.deps.clear()}function m(z){let F=!0,f={execute(){if(!F)return;F0(f);let Z=h;h=f;try{z()}finally{h=Z}},deps:new Set,cleanup(){F=!1,F0(f)}};return f.execute(),()=>f.cleanup()}function $0(z,F=!1){let f={version:t,subs:new Set},Z=z,J=function(j){if(arguments.length>0){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(Z,j))Z=j,z0(f);return}return e(f),Z};return Object.defineProperty(J,"value",{get(){return e(f),Z},set(j){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(Z,j))Z=j,z0(f)}}),J[U0]=!0,J.peek=()=>Z,J}function v0(z){let F={version:t,subs:new Set},f,Z=-1,J={execute(){F.version=++t;let Y=[...F.subs];for(let H of Y)if(I0>0){if(!b)b=new Set;b.add(H)}else H.execute()},deps:new Set,cleanup(){F0(J)}},j=()=>{F0(J);let Y=h;h=J;try{let H=z();if(!Object.is(f,H))f=H;Z=F.version}finally{h=Y}};j();let X=function(){if(Z!==F.version)j();return e(F),f};return Object.defineProperty(X,"value",{get(){return X()}}),X[U0]=!0,X.peek=()=>{if(Z!==F.version)j();return f},X}var K0=Symbol("mutable");function E(z){return{value:z,[K0]:!0}}function n(z){return z!==null&&typeof z==="object"&&z[K0]===!0}var j0=Symbol("reactive-proxy"),l=Symbol("raw");function p0(z){return z!==null&&typeof z==="object"&&j0 in z}function f0(z,F=!1){let f=new Map,Z=new WeakMap;function J(X){let Y=f.get(X);if(!Y)Y={version:0,subs:new Set},f.set(X,Y);return Y}return new Proxy(z,{get(X,Y,H){if(Y===l||Y==="$raw")return X;if(Y===j0)return!0;let K=J(Y);e(K);let L=Reflect.get(X,Y,H);if(n(L)){let W=Z.get(L);if(W?.mutable)return W.mutable;let I=L.value;if(I!==null&&typeof I==="object"){let d=f0(I,!0);if(!W)W={},Z.set(L,W);return W.mutable=d,d}return I}if(L!==null&&typeof L==="object"&&!p0(L)){let W=typeof F==="boolean"&&F||F instanceof Set&&F.has(Y),I=Z.get(L);if(I){let i=W?I.mutable:I.readonly;if(i)return i}let d=f0(L,W);if(!I)I={},Z.set(L,I);if(W)I.mutable=d;else I.readonly=d;return d}return L},set(X,Y,H,K){let L=typeof F==="boolean"&&F||F instanceof Set&&F.has(Y),W=Reflect.get(X,Y,K);if(!L&&n(W)){if(F===!1)F=new Set;if(F instanceof Set)F.add(Y);L=!0}if(!L)return!1;let I=H!==null&&typeof H==="object"&&l in H?H[l]:H,d=Array.isArray(X)&&Y==="length";if(Object.is(W,I)&&!d)return!0;if(Reflect.set(X,Y,I,K),W!==null&&typeof W==="object")Z.delete(W);let i=f.get(Y);if(i)z0(i);return!0},has(X,Y){if(Y===j0||Y===l||Y==="$raw")return!0;return Reflect.has(X,Y)},ownKeys(X){return Reflect.ownKeys(X)},getOwnPropertyDescriptor(X,Y){return Reflect.getOwnPropertyDescriptor(X,Y)},deleteProperty(X,Y){let H=typeof F==="boolean"&&F||F instanceof Set&&F.has(Y);if(!H){let W=Reflect.get(X,Y);if(n(W)){if(F===!1)F=new Set;if(F instanceof Set)F.add(Y);H=!0}}if(!H)return!1;let K=Reflect.has(X,Y),L=Reflect.deleteProperty(X,Y);if(K&&L){let W=f.get(Y);if(W)z0(W)}return L}})}function _(z,...F){if(typeof z==="function")return v0(z);if(z!==null&&typeof z==="object"&&!n(z))return f0(z,new Set(F));if(n(z)){if(typeof z.value==="object"&&z.value!==null)return f0(z.value,!0);return $0(z.value,!1)}return $0(z,!0)}var U0=Symbol("signal");function T(z){return typeof z==="function"&&z[U0]===!0}var Z0=[];function x(z){Z0.push(z)}function s(){Z0.pop()}function R(){return Z0[Z0.length-1]??document.body}var g0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),J0=new WeakMap,R0=new Set;function u0(z){let{target:F,type:f}=z;while(F){let Z=J0.get(F);if(Z&&Z[f]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:F}),Z[f](z),z.cancelBubble)break}F=F.parentElement}}function X0(z,F,f){if(g0.has(F)){if(!R0.has(F))document.addEventListener(F,u0,{capture:!1,passive:!1}),R0.add(F);let Z=J0.get(z);if(!Z)Z={},J0.set(z,Z);Z[F]=f}else z.addEventListener(F,f)}if(typeof window<"u")window.__eventHandlerMap=J0;function U(z){return(F,f)=>{let Z=document.createElement(z),J,j;if(F===void 0);else if(A(F))j=F;else if(O(F)){if(J=F,f!==void 0)j=f}if(J)V(Z,J);let X=[],Y=(H)=>X.push(H);if(j){let H=document.createDocumentFragment();x(H);try{j(Z,Y)}finally{s()}Z.appendChild(H)}if(R().appendChild(Z),X.length>0)requestAnimationFrame(()=>{for(let H of X)H()});return Z}}function Q(z){return(F,f,Z)=>{let J=document.createElement(z),j,X,Y;if(F===void 0);else if(v(F)){if(j=F,f===void 0);else if(A(f))Y=f;else if(O(f)){if(X=f,Z!==void 0)Y=Z}}else if(A(F))Y=F;else if(O(F)){if(X=F,f!==void 0&&A(f))Y=f}if(j!==void 0)p(J,j);if(X)V(J,X);let H=[],K=(L)=>H.push(L);if(Y){let L=document.createDocumentFragment();x(L);try{Y(J,K)}finally{s()}J.appendChild(L)}if(R().appendChild(J),H.length>0)requestAnimationFrame(()=>{for(let L of H)L()});return J}}function o(z){return(F,f,Z)=>{let J=document.createElement(z),j,X,Y,H;if(F===void 0);else if(v(F)){if(j=F,f===void 0);else if(_0(f))X=f;else if(A(f))H=f;else if(O(f)){if(Y=f,Z!==void 0)H=Z}}else if(A(F))H=F;else if(O(F)){if(Y=F,f!==void 0&&A(f))H=f}if(j!==void 0)p(J,j);if(X)X0(J,"click",X);if(Y)V(J,Y);let K=[],L=(W)=>K.push(W);if(H){let W=document.createDocumentFragment();x(W);try{H(J,L)}finally{s()}J.appendChild(W)}if(R().appendChild(J),K.length>0)requestAnimationFrame(()=>{for(let W of K)W()});return J}}function M(z){return(F)=>{let f=document.createElement(z);if(F)V(f,F);return R().appendChild(f),f}}function w0(){return(z,F,f)=>{let Z=document.createElement("img"),J,j,X;if(z===void 0);else if(typeof z==="string"&&O0(z)){if(J=z,F===void 0);else if(typeof F==="string"){if(j=F,f!==void 0)X=f}else if(O(F))X=F}else if(O(z))X=z;if(J!==void 0)Z.src=J;if(j!==void 0)Z.alt=j;if(X)V(Z,X);return R().appendChild(Z),Z}}function A0(){return(z,F,f)=>{let Z=document.createElement("a"),J,j,X,Y;if(z===void 0);else if(typeof z==="string"&&M0(z)){if(J=z,F===void 0);else if(v(F)){if(j=F,f!==void 0)X=f}else if(O(F))X=F}else if(A(z))Y=z;else if(O(z)){if(X=z,F!==void 0&&A(F))Y=F}if(J!==void 0)Z.href=J;if(j!==void 0)p(Z,j);if(X)V(Z,X);let H=[],K=(L)=>H.push(L);if(Y){let L=document.createDocumentFragment();x(L);try{Y(Z,K)}finally{s()}Z.appendChild(L)}if(R().appendChild(Z),H.length>0)requestAnimationFrame(()=>{for(let L of H)L()});return Z}}function v(z){return typeof z==="string"||typeof z==="number"||T(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function _0(z){if(typeof z!=="function")return!1;if(T(z))return!1;return z.length<=1}function M0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function O0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var L0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function i0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function n0(z,F,f){switch(F){case"value":if("value"in z)z.value=String(f??"");break;case"checked":if("checked"in z)z.checked=Boolean(f);break;case"selected":if("selected"in z)z.selected=Boolean(f);break;case"muted":if("muted"in z)z.muted=Boolean(f);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(f??0);break;case"volume":if("volume"in z)z.volume=Number(f??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(f);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(f??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(f);break;case"textContent":z.textContent=String(f??"");break;case"innerText":z.innerText=String(f??"");break}}function B0(z,F,f){if(F==="class"||F==="className"||F==="classList")o0(z,f);else if(F==="style")r0(z,f);else if(i0(F))n0(z,F,f);else if(typeof f==="boolean")if(f)z.setAttribute(L0[F]??F,"");else z.removeAttribute(L0[F]??F);else z.setAttribute(L0[F]??F,String(f))}function V(z,F){for(let f in F){let Z=F[f];if(Z===null||Z===void 0)continue;if(f.startsWith("on")&&typeof Z==="function"){let J=f.slice(2).toLowerCase();X0(z,J,Z)}else if(T(Z))m(()=>B0(z,f,Z.value));else B0(z,f,Z)}}function o0(z,F){if(typeof F==="string")z.className=F;else if(Array.isArray(F))z.className=F.filter(Boolean).join(" ");else if(typeof F==="object"&&F!==null){let f=!1;for(let J in F)if(T(F[J])){f=!0;break}let Z=()=>{let J=[];for(let j in F){let X=F[j];if(T(X)?X.value:X)J.push(j)}z.className=J.join(" ")};if(f)m(Z);else Z()}}function c0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function W0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let F=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${F} / ${z.alpha})`:`color(${z.space} ${F})`}case"color-mix":{let F=typeof z.color1==="object"?W0(z.color1):z.color1,f=typeof z.color2==="object"?W0(z.color2):z.color2,Z=z.percentage1!==void 0?`${z.percentage1}%`:"",J=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${F} ${Z}, ${f} ${J})`}}}function V0(z){if(z===null||z===void 0)return"";if(c0(z))return W0(z);return String(z)}function T0(z,F,f){if(F.startsWith("--")){z.setProperty(F,f);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let Z=F.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(Z,f);return}try{z[F]=f}catch{z.setProperty(F,f)}}function r0(z,F){if(typeof F==="string")z.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let f=!1;for(let Z in F)if(T(F[Z])){f=!0;break}if(f)m(()=>{for(let Z in F){let J=F[Z],j=T(J)?J.value:J;T0(z.style,Z,V0(j))}});else for(let Z in F){let J=F[Z];T0(z.style,Z,V0(J))}}}function p(z,F){if(T(F))m(()=>{z.textContent=String(F.value)});else z.textContent=String(F)}function O(z){return typeof z==="object"&&z!==null&&!T(z)&&!Array.isArray(z)}function A(z){return typeof z==="function"&&!T(z)}var C=A0(),N0=w0(),Y0=o("button"),P1=o("summary"),C1=o("option"),h1=o("optgroup"),P0=Q("h1"),C0=Q("h2"),c=Q("h3"),r=Q("h4"),x1=Q("h5"),s1=Q("h6"),g=Q("p"),G=Q("div"),d1=Q("article"),Q0=Q("section"),E1=Q("aside"),h0=Q("header"),x0=Q("footer"),k1=Q("main"),y1=Q("blockquote"),S1=Q("figcaption"),q0=Q("pre"),b1=Q("address"),w=Q("span"),m1=Q("strong"),v1=Q("em"),p1=Q("small"),g1=Q("mark"),u1=Q("code"),i1=Q("samp"),n1=Q("kbd"),o1=Q("var"),c1=Q("i"),r1=Q("b"),a1=Q("u"),l1=Q("s"),t1=Q("del"),e1=Q("ins"),z5=Q("sub"),F5=Q("sup"),f5=Q("abbr"),Z5=Q("cite"),J5=Q("dfn"),X5=Q("q"),Y5=Q("time"),Q5=Q("data"),q5=Q("bdi"),D5=Q("bdo"),G5=Q("ruby"),H5=Q("rp"),j5=Q("rt"),U5=Q("label"),L5=Q("legend"),W5=Q("output"),N5=Q("caption"),$5=Q("td"),I5=Q("th"),y=Q("li"),K5=Q("dd"),R5=Q("dt"),_5=Q("title"),w5=M("input"),O5=M("br"),A5=M("hr"),M5=M("meta"),B5=M("link"),V5=M("area"),T5=M("base"),P5=M("col"),C5=M("embed"),h5=M("source"),x5=M("track"),s5=M("wbr"),D0=U("ul"),d5=U("ol"),E5=U("menu"),k5=U("table"),y5=U("tbody"),S5=U("thead"),b5=U("tfoot"),m5=U("tr"),v5=U("colgroup"),p5=U("form"),g5=U("fieldset"),u5=U("details"),i5=U("dialog"),s0=U("nav"),n5=U("figure"),o5=U("select"),c5=U("datalist"),r5=U("dl"),a5=U("audio"),l5=U("video"),t5=U("picture"),e5=U("iframe"),zz=U("object"),Fz=U("canvas"),fz=U("map"),Zz=U("body"),Jz=U("head"),Xz=U("html"),Yz=U("hgroup"),Qz=U("template"),qz=U("slot"),Dz=U("noscript"),Gz=U("script"),Hz=U("style"),jz=U("textarea"),Uz=U("meter"),Lz=U("progress"),Wz=U("search");var d0=()=>s0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{G({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{w({style:{color:"var(--mongo-green)"},textContent:"fia"})}),G({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{C({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),C({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var E0=()=>h0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{P0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{G({textContent:"Bare Metal JavaScript"}),G({class:"text-gradient",textContent:"No JSX. Value Native."})}),g({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6",position:"relative",zIndex:"1"},textContent:"Fia is a thin abstraction layer over the native DOM. Build high-performance UIs with fine-grained signals and standard JavaScript—no weird JSX, no Virtual DOM, and absolutely zero dependencies."}),G({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{Y0({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),G({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),G({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),G({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),G({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),G({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function G0(z,F=10){let f,Z=()=>{f=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},J=(X)=>{if(!f)f=z.getBoundingClientRect();let Y=X.clientX-f.left,H=X.clientY-f.top,K=f.width/2,L=f.height/2,W=(H-L)/L*-F,I=(Y-K)/K*F;z.style.transform=`
            perspective(1000px)
            rotateX(${W}deg)
            rotateY(${I}deg)
            scale3d(1.02, 1.02, 1.02)
        `},j=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",Z),z.addEventListener("mousemove",J),z.addEventListener("mouseleave",j),()=>{z.removeEventListener("mouseenter",Z),z.removeEventListener("mousemove",J),z.removeEventListener("mouseleave",j)}}var B=(z)=>{R().appendChild(document.createTextNode(z))},k0=()=>G({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{G({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{G0(z,5),G({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let F=(J)=>w({style:{color:"var(--syntax-keyword)"},textContent:J}),f=(J)=>w({style:{color:"var(--syntax-function)"},textContent:J}),Z=(J)=>w({style:{color:"var(--syntax-string)"},textContent:J});q0({style:{transform:"translateZ(40px)"}},()=>{G(()=>{F("import"),B(" { $, div, button, Mut } "),F("from"),Z(' "fia"'),B(";")}),B(" "),G(()=>{F("const"),B(" count = "),f("$"),B("("),f("Mut"),B("(0));")}),B(" "),G(()=>{f("button"),B("("),Z('"Increment"'),B(", () => count.value++);")}),B(" "),G(()=>{f("div"),B("("),f("$"),B("(() => "),Z("`Count: ${count.value}`"),B("));")})})})});var k=(z,F,f)=>G({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(Z)=>{G0(Z,15),G({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:f}),c({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),g({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:F})}),y0=()=>Q0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{k("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),k("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),k("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),k("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),k("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),k("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),k("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),k("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var S0=()=>x0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{G({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{G({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var S=(z)=>{R().appendChild(document.createTextNode(z))},a0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((f)=>{if(f.startsWith("//"))w({style:{color:"var(--syntax-comment)"},textContent:f});else if(f.startsWith('"')||f.startsWith("'")||f.startsWith("`"))w({style:{color:"var(--syntax-string)"},textContent:f});else if(["const","import","from","function","return","if","else","true","false"].includes(f))w({style:{color:"var(--syntax-keyword)"},textContent:f});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(f))w({style:{color:"var(--syntax-function)"},textContent:f});else S(f)})},D=(z)=>G({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{G({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{G({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=_(E(!1));Y0({textContent:_(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:_(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),q0({style:{margin:"0",overflowX:"auto"}},()=>{a0(z)})}),P=(z,F,f)=>{Q0({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{G({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{G({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),C0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),f()})},$=(z,F)=>{G({style:{marginBottom:"2.5rem"}},()=>{c({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),F()})},N=(z,F)=>{G({style:{marginBottom:"1.5rem"}},()=>{r({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),F()})},q=(z)=>g({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>S(z)),a=(z)=>D0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((F)=>y({textContent:F}))}),u=(z,F="info")=>G({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>S(z)),H0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow"},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],l0=()=>{let z=_(E("intro")),F=()=>{let f=window.scrollY+150;for(let Z=H0.length-1;Z>=0;Z--){let J=document.getElementById(H0[Z].id);if(J&&J.offsetTop<=f){z.value=H0[Z].id;break}}};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",F),F()},0);return G({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{G({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{c({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),D0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{H0.forEach((f)=>{y({style:{marginBottom:"0.5rem"}},()=>{C({href:`#${f.id}`,style:{color:_(()=>z.value===f.id?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:_(()=>z.value===f.id?"600":"400"),borderLeft:_(()=>z.value===f.id?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:f.title,onclick:(Z)=>{Z.preventDefault();let J=document.getElementById(f.id);if(J){let X=J.offsetTop-100;window.scrollTo({top:X,behavior:"smooth"}),z.value=f.id}}})})})})})})},b0=()=>G({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{l0(),G({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{G({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{N0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{N0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),P("Introduction","intro",()=>{q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),P("Why Fia?","why-fia",()=>{q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),D0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{y({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),S("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),y({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),S("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),y({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),S("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),y({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),S("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),P("Getting Started","getting-started",()=>{$("Prerequisites",()=>{q("Fia is compatible with any modern JavaScript runtime."),a(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),$("Installation",()=>{q("Fia is published on JSR. Install it using your preferred package manager:"),G({style:{marginBottom:"1rem"}},()=>{r({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),D("deno add jsr:@fia/core")}),G({style:{marginBottom:"1rem"}},()=>{r({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),q('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),q("2. Install (aliased as 'fia'):"),D("bun add fia@npm:@jsr/fia__core")}),G({style:{marginBottom:"1rem"}},()=>{r({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),D("npx jsr add @fia/core")}),u("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),$("Updating",()=>{q("To update to the latest version, run the installation command again (or use your package manager's update command)."),D(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),$("Quick Start",()=>{q("Create your first reactive app in seconds."),D(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),$("Mounting",()=>{q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),D(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),P("Element API","element-api",()=>{q("Fia elements have a simple, consistent API. Functions match HTML tag names."),D(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),N("Text Content",()=>{q("Use the native textContent prop for static or reactive text."),D(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),N("Event Handlers",()=>{q("Event handlers are delegated automatically foon this pager performance."),D(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),N("Nesting Elements",()=>{q("Use a callback function to nest elements."),D(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),N("Void Elements",()=>{q("Elements like input, img, br only accept props."),D(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),N("onMount Callback",()=>{q("Access layout properties after the element is in the DOM."),D(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),P("Element Factory Types","element-factory-types",()=>{q("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),$("Standard Elements (4 overloads)",()=>{q("Used for semantic structure elements. These factories support the base patterns:"),D(`// 1. Empty element
article();

// 2. Props only
article({ id: "post-1", class: "article" });

// 3. Children only
article(() => {
  h2({ textContent: "Title" });
  p({ textContent: "Content" });
});

// 4. Props + children (most common)
article({ class: "post" }, () => {
  h2({ textContent: "Article Title" });
  p({ textContent: "Article body..." });
});`),u("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),$("Text Elements (11 overloads)",()=>{q("Optimized for elements that commonly hold text content with convenient text-first syntax."),D(`// All standard overloads plus text shortcuts:

// 5. Text content (static or reactive)
h1("Hello World");
h1($(() => \`Count: \${count.value}\`));

// 6. Text + props
h1("Hello", { class: "title", style: { color: "blue" } });

// 7. Text + children
h1("Header", () => {
  span({ textContent: " with nested content" });
});

// 8. Text + props + children (all three!)
h1("Main Title", { class: "hero" }, () => {
  span({ textContent: " subtitle", class: "sub" });
});`),u("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),$("Interactive Elements (10 overloads)",()=>{q("Special factories for interactive elements with text + click handler shorthand."),D(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`),u("Elements: button, summary, option, optgroup.")}),$("Void Elements (1 overload)",()=>{q("Self-closing elements that cannot have children."),D(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),u("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),$("Type Safety Benefits",()=>{q("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),D(`// TypeScript knows this is an HTMLInputElement
input({
  type: "email",
  oninput: (e) => {
    // e.currentTarget is HTMLInputElement
    console.log(e.currentTarget.value); // ✅ Type-safe
  }
});

// ARIA attributes with autocomplete
button({
  textContent: "Menu",
  ariaExpanded: $(false),      // "true" | "false" | "undefined"
  ariaHasPopup: "menu",         // Autocomplete shows valid values!
  onclick: () => console.log("Toggle menu")
});`)})}),P("Reactivity","reactivity",()=>{$("Signals",()=>{q("Signals are the primitive units of reactivity."),D(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),$("Reactive Stores",()=>{q("Fia stores are immutable by default for predictability."),D(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),u("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),$("Computed Values",()=>{q("Computed signals automatically track dependencies and update when they change."),D(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),$("Effects",()=>{q("Use $e() to run side effects when dependencies change."),D(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),P("Immutability","immutability",()=>{q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),$("Data Types & Behavior",()=>{N("1. Primitives (String, Number, Boolean)",()=>{q("Primitives are immutable by default. To make them mutable, use Mut."),D(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),N("2. Objects",()=>{q("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),D(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),q("Mutable Objects:"),D(`// Option A: Specific keys
const state = $({ count: 0 }, "count");
state.count++;

// Option B: Full object mutability
const config = $(Mut({ theme: "dark", debug: false }));
config.theme = "light";
config.debug = true;

// Option C: Selective Nested Mutability
const user = $({
  name: "Evan",
  settings: {
    notifications: Mut(true), // Only this property is mutable
    theme: "dark"             // Read-only
  }
});
user.settings.notifications = false; // Works!
// user.settings.theme = "light";    // Error!`)}),N("3. Arrays",()=>{q("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),D(`const list = $({ items: [1, 2, 3] });

// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
// list.items.push(4);

// ✅ Valid: Replace array
list.items = [...list.items, 4]; // Only works if 'items' key is mutable`),q("Mutable Arrays:"),D(`const todos = $(Mut({ list: [] as string[] }));

// ✅ Valid: Mutation methods work
todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),N("4. Nested Objects (Deep Reactivity)",()=>{q("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),D(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
app.settings.notifications.email = false;

// ℹ️ Pattern: Immutable Tree with Mutable Root
// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),P("Control Flow","control-flow",()=>{$("Show",()=>{q("Conditionally render content that updates when the condition changes."),D('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),$("Each",()=>{q("Reactive list rendering that re-renders efficiently."),D(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li({ textContent: item }));`)}),$("Match",()=>{q("Reactive pattern matching for switch/case logic."),D(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),P("Component Composition","components",()=>{q("In Fia, components are just functions. There is no special class or type."),$("Basic Component",()=>{D(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),$("Children & Layouts",()=>{q("To create wrapper components, pass a callback function as a child prop."),D(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),P("Performance","performance",()=>{q("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),$("Event Delegation",()=>{q("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),D(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),N("How it works",()=>{a(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),N("Benefits",()=>{a(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),D(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),$("Automatic Fragment Batching",()=>{q("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),D(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1({ textContent: "Title" });    // → Fragment
  p({ textContent: "Para 1" });     // → Fragment
  p({ textContent: "Para 2" });     // → Fragment
});
// Single appendChild(fragment)`),N("How it works",()=>{a(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),N("Benefits",()=>{a(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),D(`// Fia automatically batches 100 elements
div(() => {
  h1({ textContent: "Title" });
  ul(() => {
    for (let i = 0; i < 100; i++) {
      li({ textContent: \`Item \${i}\` });
    }
  });
  p({ textContent: "Footer" });
});
// Result: 2 reflows total
// Traditional: 102 reflows`)}),$("Fine-Grained Reactivity",()=>{q("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),D(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p({ textContent: $(() => \`Count: \${count.value}\`) }); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),$("Best Practices",()=>{N("1. Batch Multiple Updates",()=>{D(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),N("2. Use peek() for Non-Reactive Reads",()=>{D(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),N("3. Memoize Expensive Computations",()=>{D(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),P("Examples","examples",()=>{$("\uD83D\uDFE2 Beginner",()=>{N("1. Hello World",()=>{q("The simplest possible Fia code."),D('h1("Hello, World!");')}),N("2. Counter",()=>{q("Signals hold reactive state."),D(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),N("3. Toggle",()=>{q("Computed signals derive values from other signals."),D(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p("Now you see me!");
});`)}),N("4. Input Binding",()=>{q("Two-way binding is manual but explicit."),D('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),N("5. List Rendering (Static)",()=>{q("For simple static lists, forEach works fine."),D(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),$("\uD83D\uDFE1 Intermediate",()=>{N("6. Reactive Store Counter",()=>{q("Objects passed to $() become reactive stores."),D(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),N("7. Conditional Classes",()=>{q("Computed signals work in class props too."),D(`const active = $(Mut(false));

button("Toggle Active", {
  class: $(() => active.value ? "btn active" : "btn")
}, () => active.value = !active.value);`)}),N("8. Form Handling",()=>{q("Reactive stores are perfect for forms."),D(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),N("9. Computed Values",()=>{q("Track dependencies automatically."),D('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),N("10. Dynamic Styling",()=>{q("Reactive styles allow theming."),D(`const theme = $(Mut("light"));

div({
  style: {
    background: $(() => theme.value === "dark" ? "#222" : "#fff"),
    color: $(() => theme.value === "dark" ? "#fff" : "#222"),
    padding: "2rem",
  }
}, () => {
  button("Toggle Theme", () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  });
});`)})}),$("\uD83D\uDD34 Advanced",()=>{N("11. Todo App",()=>{q("A complete todo app using Each."),D(`const todos = $(Mut({ items: [] as string[], input: "" }));

div(() => {
  input({
    type: "text",
    value: $(() => todos.input),
    oninput: (e) => todos.input = e.currentTarget.value,
  });
  button("Add", () => {
      if (todos.input.trim()) {
        todos.items.push(todos.input);
        todos.input = "";
      }
    });
  ul(() => {
    Each(() => todos.items, (item, i) => {
      li(() => {
        span(item);
        button("×", () => todos.items.splice(i, 1));
      });
    });
  });
});`)}),N("12. Tabs Component",()=>{q("Track active index and conditionally render."),D(`const tabs = ["Home", "About", "Contact"];
const active = $(Mut(0));

div(() => {
  div({ class: "tabs" }, () => {
    tabs.forEach((tab, i) => {
      button(
        tab,
        { class: $(() => active.value === i ? "active" : "") },
        () => active.value = i
      );
    });
  });
  div({ class: "content" }, () => {
    // Match returns a signal, so we can use it directly in textContent!
    p(Match(() => active.value, {
        0: () => "Welcome to the Home page!",
        1: () => "About Fia Framework...",
        2: () => "Contact us at hello@fia.dev",
      })
    );
  });
});`)}),N("13. Async Data Fetching",()=>{q("Use Match for loading states."),D(`const state = $(Mut({
  status: "loading" as "loading" | "success" | "error",
  users: [] as string[]
}));

fetch("/api/users")
  .then(r => r.json())
  .then(users => {
    state.users = users;
    state.status = "success";
  })
  .catch(() => state.status = "error");

div(() => {
  Match(() => state.status, {
    loading: () => p("Loading..."),
    error: () => p("Failed to load users"),
    success: () => ul(() => Each(() => state.users, u => li(u))),
  });
});`)}),N("14. Modal Dialog",()=>{q("Modal patterns with explicit types."),D(`const modal = $(Mut({ open: false, title: "" }));

function openModal(title: string) {
  modal.title = title;
  modal.open = true;
}

button("Open Modal", () => openModal("Hello!"));

div({
  class: "modal-backdrop",
  style: { display: $(() => modal.open ? "flex" : "none") },
  onclick: () => modal.open = false,
}, () => {
  div({
    class: "modal",
    onclick: (e) => e.stopPropagation(),
  }, () => {
    h2($(() => modal.title));
    button("Close", () => modal.open = false);
  });
});`)})})})})});var m0=()=>{let z=_(E(0)),F=_(E(0)),f=_(E(0));return document.addEventListener("mousemove",(Z)=>{z.value=Z.clientX,F.value=Z.clientY,f.value=1}),document.addEventListener("mouseout",()=>{f.value=0}),G({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:_(()=>`translate(${z.value-200}px, ${F.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:_(()=>f.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var t0=()=>G({id:"landing-page"},()=>{m0(),d0(),E0(),k0(),y0(),b0(),S0()});t0();
