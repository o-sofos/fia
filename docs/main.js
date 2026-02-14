var h=void 0,l=0,$0=0,S=void 0;function t(z){if(h)z.subs.add(h),h.deps.add(z)}function e(z){z.version=++l;let F=[...z.subs];for(let f of F)if($0>0){if(!S)S=new Set;S.add(f)}else f.execute()}function z0(z){for(let F of z.deps)F.subs.delete(z);z.deps.clear()}function b(z){let F=!0,f={execute(){if(!F)return;z0(f);let Z=h;h=f;try{z()}finally{h=Z}},deps:new Set,cleanup(){F=!1,z0(f)}};return f.execute(),()=>f.cleanup()}function K0(z,F=!1){let f={version:l,subs:new Set},Z=z,J=function(H){if(arguments.length>0){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(Z,H))Z=H,e(f);return}return t(f),Z};return Object.defineProperty(J,"value",{get(){return t(f),Z},set(H){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(Z,H))Z=H,e(f)}}),J[W0]=!0,J.peek=()=>Z,J}function v0(z){let F={version:l,subs:new Set},f,Z=-1,J={execute(){F.version=++l;let Q=[...F.subs];for(let j of Q)if($0>0){if(!S)S=new Set;S.add(j)}else j.execute()},deps:new Set,cleanup(){z0(J)}},H=()=>{z0(J);let Q=h;h=J;try{let j=z();if(!Object.is(f,j))f=j;Z=F.version}finally{h=Q}};H();let X=function(){if(Z!==F.version)H();return t(F),f};return Object.defineProperty(X,"value",{get(){return X()}}),X[W0]=!0,X.peek=()=>{if(Z!==F.version)H();return f},X}var I0=Symbol("mutable");function E(z){return{value:z,[I0]:!0}}function N0(z){return z!==null&&typeof z==="object"&&z[I0]===!0}var G0=Symbol("reactive-proxy"),a=Symbol("raw");function p0(z){return z!==null&&typeof z==="object"&&G0 in z}function H0(z,F=!1){let f=new Map,Z=new WeakMap;function J(X){let Q=f.get(X);if(!Q)Q={version:0,subs:new Set},f.set(X,Q);return Q}return new Proxy(z,{get(X,Q,j){if(Q===a||Q==="$raw")return X;if(Q===G0)return!0;let $=J(Q);t($);let U=Reflect.get(X,Q,j);if(U!==null&&typeof U==="object"&&!p0(U)){let N=typeof F==="boolean"&&F||F instanceof Set&&F.has(Q),w=Z.get(U);if(w){let i=N?w.mutable:w.readonly;if(i)return i}let u=H0(U,N);if(!w)w={},Z.set(U,w);if(N)w.mutable=u;else w.readonly=u;return u}return U},set(X,Q,j,$){if(!(typeof F==="boolean"&&F||F instanceof Set&&F.has(Q)))return!1;let N=Reflect.get(X,Q,$),w=j!==null&&typeof j==="object"&&a in j?j[a]:j,u=Array.isArray(X)&&Q==="length";if(Object.is(N,w)&&!u)return!0;if(Reflect.set(X,Q,w,$),N!==null&&typeof N==="object")Z.delete(N);let i=f.get(Q);if(i)e(i);return!0},has(X,Q){if(Q===G0||Q===a||Q==="$raw")return!0;return Reflect.has(X,Q)},ownKeys(X){return Reflect.ownKeys(X)},getOwnPropertyDescriptor(X,Q){return Reflect.getOwnPropertyDescriptor(X,Q)},deleteProperty(X,Q){if(!(typeof F==="boolean"&&F||F instanceof Set&&F.has(Q)))return!1;let $=Reflect.has(X,Q),U=Reflect.deleteProperty(X,Q);if($&&U){let N=f.get(Q);if(N)e(N)}return U}})}function R(z,...F){if(typeof z==="function")return v0(z);if(z!==null&&typeof z==="object"&&!N0(z))return H0(z,new Set(F));if(N0(z)){if(typeof z.value==="object"&&z.value!==null)return H0(z.value,!0);return K0(z.value,!1)}return K0(z,!0)}var W0=Symbol("signal");function T(z){return typeof z==="function"&&z[W0]===!0}var F0=[];function x(z){F0.push(z)}function s(){F0.pop()}function I(){return F0[F0.length-1]??document.body}var g0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),f0=new WeakMap,R0=new Set;function u0(z){let{target:F,type:f}=z;while(F){let Z=f0.get(F);if(Z&&Z[f]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:F}),Z[f](z),z.cancelBubble)break}F=F.parentElement}}function Z0(z,F,f){if(g0.has(F)){if(!R0.has(F))document.addEventListener(F,u0,{capture:!1,passive:!1}),R0.add(F);let Z=f0.get(z);if(!Z)Z={},f0.set(z,Z);Z[F]=f}else z.addEventListener(F,f)}if(typeof window<"u")window.__eventHandlerMap=f0;function W(z){return(F,f)=>{let Z=document.createElement(z),J,H;if(F===void 0);else if(O(F))H=F;else if(_(F)){if(J=F,f!==void 0)H=f}if(J)V(Z,J);let X=[],Q=(j)=>X.push(j);if(H){let j=document.createDocumentFragment();x(j);try{H(Z,Q)}finally{s()}Z.appendChild(j)}if(I().appendChild(Z),X.length>0)requestAnimationFrame(()=>{for(let j of X)j()});return Z}}function Y(z){return(F,f,Z)=>{let J=document.createElement(z),H,X,Q;if(F===void 0);else if(m(F)){if(H=F,f===void 0);else if(O(f))Q=f;else if(_(f)){if(X=f,Z!==void 0)Q=Z}}else if(O(F))Q=F;else if(_(F)){if(X=F,f!==void 0&&O(f))Q=f}if(H!==void 0)v(J,H);if(X)V(J,X);let j=[],$=(U)=>j.push(U);if(Q){let U=document.createDocumentFragment();x(U);try{Q(J,$)}finally{s()}J.appendChild(U)}if(I().appendChild(J),j.length>0)requestAnimationFrame(()=>{for(let U of j)U()});return J}}function n(z){return(F,f,Z)=>{let J=document.createElement(z),H,X,Q,j;if(F===void 0);else if(m(F)){if(H=F,f===void 0);else if(M0(f))X=f;else if(O(f))j=f;else if(_(f)){if(Q=f,Z!==void 0)j=Z}}else if(O(F))j=F;else if(_(F)){if(Q=F,f!==void 0&&O(f))j=f}if(H!==void 0)v(J,H);if(X)Z0(J,"click",X);if(Q)V(J,Q);let $=[],U=(N)=>$.push(N);if(j){let N=document.createDocumentFragment();x(N);try{j(J,U)}finally{s()}J.appendChild(N)}if(I().appendChild(J),$.length>0)requestAnimationFrame(()=>{for(let N of $)N()});return J}}function A(z){return(F)=>{let f=document.createElement(z);if(F)V(f,F);return I().appendChild(f),f}}function _0(){return(z,F,f)=>{let Z=document.createElement("img"),J,H,X;if(z===void 0);else if(typeof z==="string"&&w0(z)){if(J=z,F===void 0);else if(typeof F==="string"){if(H=F,f!==void 0)X=f}else if(_(F))X=F}else if(_(z))X=z;if(J!==void 0)Z.src=J;if(H!==void 0)Z.alt=H;if(X)V(Z,X);return I().appendChild(Z),Z}}function O0(){return(z,F,f)=>{let Z=document.createElement("a"),J,H,X,Q;if(z===void 0);else if(typeof z==="string"&&A0(z)){if(J=z,F===void 0);else if(m(F)){if(H=F,f!==void 0)X=f}else if(_(F))X=F}else if(O(z))Q=z;else if(_(z)){if(X=z,F!==void 0&&O(F))Q=F}if(J!==void 0)Z.href=J;if(H!==void 0)v(Z,H);if(X)V(Z,X);let j=[],$=(U)=>j.push(U);if(Q){let U=document.createDocumentFragment();x(U);try{Q(Z,$)}finally{s()}Z.appendChild(U)}if(I().appendChild(Z),j.length>0)requestAnimationFrame(()=>{for(let U of j)U()});return Z}}function m(z){return typeof z==="string"||typeof z==="number"||T(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function M0(z){if(typeof z!=="function")return!1;if(T(z))return!1;return z.length<=1}function A0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function w0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var j0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function i0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function n0(z,F,f){switch(F){case"value":if("value"in z)z.value=String(f??"");break;case"checked":if("checked"in z)z.checked=Boolean(f);break;case"selected":if("selected"in z)z.selected=Boolean(f);break;case"muted":if("muted"in z)z.muted=Boolean(f);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(f??0);break;case"volume":if("volume"in z)z.volume=Number(f??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(f);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(f??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(f);break;case"textContent":z.textContent=String(f??"");break;case"innerText":z.innerText=String(f??"");break}}function B0(z,F,f){if(F==="class"||F==="className"||F==="classList")o0(z,f);else if(F==="style")r0(z,f);else if(i0(F))n0(z,F,f);else if(typeof f==="boolean")if(f)z.setAttribute(j0[F]??F,"");else z.removeAttribute(j0[F]??F);else z.setAttribute(j0[F]??F,String(f))}function V(z,F){for(let f in F){let Z=F[f];if(Z===null||Z===void 0)continue;if(f.startsWith("on")&&typeof Z==="function"){let J=f.slice(2).toLowerCase();Z0(z,J,Z)}else if(T(Z))b(()=>B0(z,f,Z.value));else B0(z,f,Z)}}function o0(z,F){if(typeof F==="string")z.className=F;else if(Array.isArray(F))z.className=F.filter(Boolean).join(" ");else if(typeof F==="object"&&F!==null){let f=!1;for(let J in F)if(T(F[J])){f=!0;break}let Z=()=>{let J=[];for(let H in F){let X=F[H];if(T(X)?X.value:X)J.push(H)}z.className=J.join(" ")};if(f)b(Z);else Z()}}function c0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function U0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let F=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${F} / ${z.alpha})`:`color(${z.space} ${F})`}case"color-mix":{let F=typeof z.color1==="object"?U0(z.color1):z.color1,f=typeof z.color2==="object"?U0(z.color2):z.color2,Z=z.percentage1!==void 0?`${z.percentage1}%`:"",J=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${F} ${Z}, ${f} ${J})`}}}function V0(z){if(z===null||z===void 0)return"";if(c0(z))return U0(z);return String(z)}function T0(z,F,f){if(F.startsWith("--")){z.setProperty(F,f);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let Z=F.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(Z,f);return}try{z[F]=f}catch{z.setProperty(F,f)}}function r0(z,F){if(typeof F==="string")z.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let f=!1;for(let Z in F)if(T(F[Z])){f=!0;break}if(f)b(()=>{for(let Z in F){let J=F[Z],H=T(J)?J.value:J;T0(z.style,Z,V0(H))}});else for(let Z in F){let J=F[Z];T0(z.style,Z,V0(J))}}}function v(z,F){if(T(F))b(()=>{z.textContent=String(F.value)});else z.textContent=String(F)}function _(z){return typeof z==="object"&&z!==null&&!T(z)&&!Array.isArray(z)}function O(z){return typeof z==="function"&&!T(z)}var C=O0(),L0=_0(),J0=n("button"),P1=n("summary"),C1=n("option"),h1=n("optgroup"),P0=Y("h1"),C0=Y("h2"),o=Y("h3"),c=Y("h4"),x1=Y("h5"),s1=Y("h6"),p=Y("p"),G=Y("div"),E1=Y("article"),X0=Y("section"),d1=Y("aside"),h0=Y("header"),x0=Y("footer"),y1=Y("main"),k1=Y("blockquote"),S1=Y("figcaption"),Y0=Y("pre"),b1=Y("address"),M=Y("span"),m1=Y("strong"),v1=Y("em"),p1=Y("small"),g1=Y("mark"),u1=Y("code"),i1=Y("samp"),n1=Y("kbd"),o1=Y("var"),c1=Y("i"),r1=Y("b"),a1=Y("u"),l1=Y("s"),t1=Y("del"),e1=Y("ins"),z5=Y("sub"),F5=Y("sup"),f5=Y("abbr"),Z5=Y("cite"),J5=Y("dfn"),X5=Y("q"),Y5=Y("time"),Q5=Y("data"),q5=Y("bdi"),D5=Y("bdo"),G5=Y("ruby"),H5=Y("rp"),W5=Y("rt"),j5=Y("label"),U5=Y("legend"),L5=Y("output"),K5=Y("caption"),N5=Y("td"),$5=Y("th"),y=Y("li"),I5=Y("dd"),R5=Y("dt"),M5=Y("title"),_5=A("input"),w5=A("br"),O5=A("hr"),A5=A("meta"),B5=A("link"),V5=A("area"),T5=A("base"),P5=A("col"),C5=A("embed"),h5=A("source"),x5=A("track"),s5=A("wbr"),Q0=W("ul"),E5=W("ol"),d5=W("menu"),y5=W("table"),k5=W("tbody"),S5=W("thead"),b5=W("tfoot"),m5=W("tr"),v5=W("colgroup"),p5=W("form"),g5=W("fieldset"),u5=W("details"),i5=W("dialog"),s0=W("nav"),n5=W("figure"),o5=W("select"),c5=W("datalist"),r5=W("dl"),a5=W("audio"),l5=W("video"),t5=W("picture"),e5=W("iframe"),zz=W("object"),Fz=W("canvas"),fz=W("map"),Zz=W("body"),Jz=W("head"),Xz=W("html"),Yz=W("hgroup"),Qz=W("template"),qz=W("slot"),Dz=W("noscript"),Gz=W("script"),Hz=W("style"),Wz=W("textarea"),jz=W("meter"),Uz=W("progress"),Lz=W("search");var E0=()=>s0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{G({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{M({style:{color:"var(--mongo-green)"},textContent:"fia"})}),G({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{C({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),C({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var d0=()=>h0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{P0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{G({textContent:"Build High-Performance UIs"}),G({class:"text-gradient",textContent:"Without the Virtual DOM"})}),p({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6",position:"relative",zIndex:"1"},textContent:"Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."}),G({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{J0({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),G({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),G({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),G({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),G({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),G({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function q0(z,F=10){let f,Z=()=>{f=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},J=(X)=>{if(!f)f=z.getBoundingClientRect();let Q=X.clientX-f.left,j=X.clientY-f.top,$=f.width/2,U=f.height/2,N=(j-U)/U*-F,w=(Q-$)/$*F;z.style.transform=`
            perspective(1000px)
            rotateX(${N}deg)
            rotateY(${w}deg)
            scale3d(1.02, 1.02, 1.02)
        `},H=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",Z),z.addEventListener("mousemove",J),z.addEventListener("mouseleave",H),()=>{z.removeEventListener("mouseenter",Z),z.removeEventListener("mousemove",J),z.removeEventListener("mouseleave",H)}}var B=(z)=>{I().appendChild(document.createTextNode(z))},y0=()=>G({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{G({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{q0(z,5),G({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let F=(J)=>M({style:{color:"var(--syntax-keyword)"},textContent:J}),f=(J)=>M({style:{color:"var(--syntax-function)"},textContent:J}),Z=(J)=>M({style:{color:"var(--syntax-string)"},textContent:J});Y0({style:{transform:"translateZ(40px)"}},()=>{G(()=>{F("import"),B(" { $, div, button, Mut } "),F("from"),Z(' "fia"'),B(";")}),B(" "),G(()=>{F("const"),B(" count = "),f("$"),B("("),f("Mut"),B("(0));")}),B(" "),G(()=>{f("button"),B("("),Z('"Increment"'),B(", () => count.value++);")}),B(" "),G(()=>{f("div"),B("("),f("$"),B("(() => "),Z("`Count: ${count.value}`"),B("));")})})})});var d=(z,F,f)=>G({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(Z)=>{q0(Z,15),G({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:f}),o({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),p({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:F})}),k0=()=>X0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{d("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),d("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),d("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),d("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),d("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),d("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),d("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),d("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var S0=()=>x0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{G({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{G({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var k=(z)=>{I().appendChild(document.createTextNode(z))},a0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((f)=>{if(f.startsWith("//"))M({style:{color:"var(--syntax-comment)"},textContent:f});else if(f.startsWith('"')||f.startsWith("'")||f.startsWith("`"))M({style:{color:"var(--syntax-string)"},textContent:f});else if(["const","import","from","function","return","if","else","true","false"].includes(f))M({style:{color:"var(--syntax-keyword)"},textContent:f});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(f))M({style:{color:"var(--syntax-function)"},textContent:f});else k(f)})},D=(z)=>G({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{G({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{G({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=R(E(!1));J0({textContent:R(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:R(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),Y0({style:{margin:"0",overflowX:"auto"}},()=>{a0(z)})}),P=(z,F,f)=>{X0({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{G({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{G({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),C0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),f()})},K=(z,F)=>{G({style:{marginBottom:"2.5rem"}},()=>{o({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),F()})},L=(z,F)=>{G({style:{marginBottom:"1.5rem"}},()=>{c({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),F()})},q=(z)=>p({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>k(z)),r=(z)=>Q0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((F)=>y({textContent:F}))}),g=(z,F="info")=>G({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>k(z)),D0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow"},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],l0=()=>{let z=R(E("intro")),F=()=>{let f=window.scrollY+150;for(let Z=D0.length-1;Z>=0;Z--){let J=document.getElementById(D0[Z].id);if(J&&J.offsetTop<=f){z.value=D0[Z].id;break}}};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",F),F()},0);return G({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{G({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{o({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),Q0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{D0.forEach((f)=>{y({style:{marginBottom:"0.5rem"}},()=>{C({href:`#${f.id}`,style:{color:R(()=>z.value===f.id?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:R(()=>z.value===f.id?"600":"400"),borderLeft:R(()=>z.value===f.id?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:f.title,onclick:(Z)=>{Z.preventDefault();let J=document.getElementById(f.id);if(J){let X=J.offsetTop-100;window.scrollTo({top:X,behavior:"smooth"}),z.value=f.id}}})})})})})})},b0=()=>G({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{l0(),G({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{G({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{L0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{L0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),P("Introduction","intro",()=>{q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),P("Why Fia?","why-fia",()=>{q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),Q0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{y({style:{marginBottom:"0.5rem"}},()=>{M({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),k("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),y({style:{marginBottom:"0.5rem"}},()=>{M({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),k("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),y({style:{marginBottom:"0.5rem"}},()=>{M({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),k("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),y({style:{marginBottom:"0.5rem"}},()=>{M({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),k("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),P("Getting Started","getting-started",()=>{K("Prerequisites",()=>{q("Fia is compatible with any modern JavaScript runtime."),r(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),K("Installation",()=>{q("Fia is published on JSR. Install it using your preferred package manager:"),G({style:{marginBottom:"1rem"}},()=>{c({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),D("deno add jsr:@fia/core")}),G({style:{marginBottom:"1rem"}},()=>{c({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),q('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),q("2. Install (aliased as 'fia'):"),D("bun add fia@npm:@jsr/fia__core")}),G({style:{marginBottom:"1rem"}},()=>{c({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),D("npx jsr add @fia/core")}),g("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),K("Updating",()=>{q("To update to the latest version, run the installation command again (or use your package manager's update command)."),D(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),K("Quick Start",()=>{q("Create your first reactive app in seconds."),D(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),K("Mounting",()=>{q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),D(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),P("Element API","element-api",()=>{q("Fia elements have a simple, consistent API. Functions match HTML tag names."),D(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),L("Text Content",()=>{q("Use the native textContent prop for static or reactive text."),D(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),L("Event Handlers",()=>{q("Event handlers are delegated automatically foon this pager performance."),D(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),L("Nesting Elements",()=>{q("Use a callback function to nest elements."),D(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),L("Void Elements",()=>{q("Elements like input, img, br only accept props."),D(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),L("onMount Callback",()=>{q("Access layout properties after the element is in the DOM."),D(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),P("Element Factory Types","element-factory-types",()=>{q("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),K("Standard Elements (4 overloads)",()=>{q("Used for semantic structure elements. These factories support the base patterns:"),D(`// 1. Empty element
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
});`),g("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),K("Text Elements (11 overloads)",()=>{q("Optimized for elements that commonly hold text content with convenient text-first syntax."),D(`// All standard overloads plus text shortcuts:

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
});`),g("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),K("Interactive Elements (10 overloads)",()=>{q("Special factories for interactive elements with text + click handler shorthand."),D(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`),g("Elements: button, summary, option, optgroup.")}),K("Void Elements (1 overload)",()=>{q("Self-closing elements that cannot have children."),D(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),g("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),K("Type Safety Benefits",()=>{q("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),D(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),P("Reactivity","reactivity",()=>{K("Signals",()=>{q("Signals are the primitive units of reactivity."),D(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),K("Reactive Stores",()=>{q("Fia stores are immutable by default for predictability."),D(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),g("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),K("Computed Values",()=>{q("Computed signals automatically track dependencies and update when they change."),D(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),K("Effects",()=>{q("Use $e() to run side effects when dependencies change."),D(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),P("Immutability","immutability",()=>{q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),K("Data Types & Behavior",()=>{L("1. Primitives (String, Number, Boolean)",()=>{q("Primitives are immutable by default. To make them mutable, use Mut."),D(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),L("2. Objects",()=>{q("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),D(`const user = $({ name: "Evan", age: 30 });

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
config.debug = true;`)}),L("3. Arrays",()=>{q("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),D(`const list = $({ items: [1, 2, 3] });

// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
// list.items.push(4);

// ✅ Valid: Replace array
list.items = [...list.items, 4]; // Only works if 'items' key is mutable`),q("Mutable Arrays:"),D(`const todos = $(Mut({ list: [] as string[] }));

// ✅ Valid: Mutation methods work
todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),L("4. Nested Objects (Deep Reactivity)",()=>{q("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),D(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
app.settings.notifications.email = false;

// ℹ️ Pattern: Immutable Tree with Mutable Root
// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),P("Control Flow","control-flow",()=>{K("Show",()=>{q("Conditionally render content that updates when the condition changes."),D('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),K("Each",()=>{q("Reactive list rendering that re-renders efficiently."),D(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li({ textContent: item }));`)}),K("Match",()=>{q("Reactive pattern matching for switch/case logic."),D(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),P("Component Composition","components",()=>{q("In Fia, components are just functions. There is no special class or type."),K("Basic Component",()=>{D(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),K("Children & Layouts",()=>{q("To create wrapper components, pass a callback function as a child prop."),D(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),P("Performance","performance",()=>{q("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),K("Event Delegation",()=>{q("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),D(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),L("How it works",()=>{r(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),L("Benefits",()=>{r(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),D(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),K("Automatic Fragment Batching",()=>{q("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),D(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1({ textContent: "Title" });    // → Fragment
  p({ textContent: "Para 1" });     // → Fragment
  p({ textContent: "Para 2" });     // → Fragment
});
// Single appendChild(fragment)`),L("How it works",()=>{r(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),L("Benefits",()=>{r(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),D(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),K("Fine-Grained Reactivity",()=>{q("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),D(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p({ textContent: $(() => \`Count: \${count.value}\`) }); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),K("Best Practices",()=>{L("1. Batch Multiple Updates",()=>{D(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),L("2. Use peek() for Non-Reactive Reads",()=>{D(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),L("3. Memoize Expensive Computations",()=>{D(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),P("Examples","examples",()=>{K("\uD83D\uDFE2 Beginner",()=>{L("1. Hello World",()=>{q("The simplest possible Fia code."),D('h1("Hello, World!");')}),L("2. Counter",()=>{q("Signals hold reactive state."),D(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),L("3. Toggle",()=>{q("Computed signals derive values from other signals."),D(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p("Now you see me!");
});`)}),L("4. Input Binding",()=>{q("Two-way binding is manual but explicit."),D('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),L("5. List Rendering (Static)",()=>{q("For simple static lists, forEach works fine."),D(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),K("\uD83D\uDFE1 Intermediate",()=>{L("6. Reactive Store Counter",()=>{q("Objects passed to $() become reactive stores."),D(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),L("7. Conditional Classes",()=>{q("Computed signals work in class props too."),D(`const active = $(Mut(false));

button("Toggle Active", {
  class: $(() => active.value ? "btn active" : "btn")
}, () => active.value = !active.value);`)}),L("8. Form Handling",()=>{q("Reactive stores are perfect for forms."),D(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),L("9. Computed Values",()=>{q("Track dependencies automatically."),D('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),L("10. Dynamic Styling",()=>{q("Reactive styles allow theming."),D(`const theme = $(Mut("light"));

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
});`)})}),K("\uD83D\uDD34 Advanced",()=>{L("11. Todo App",()=>{q("A complete todo app using Each."),D(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),L("12. Tabs Component",()=>{q("Track active index and conditionally render."),D(`const tabs = ["Home", "About", "Contact"];
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
});`)}),L("13. Async Data Fetching",()=>{q("Use Match for loading states."),D(`const state = $(Mut({
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
});`)}),L("14. Modal Dialog",()=>{q("Modal patterns with explicit types."),D(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var m0=()=>{let z=R(E(0)),F=R(E(0)),f=R(E(0));return document.addEventListener("mousemove",(Z)=>{z.value=Z.clientX,F.value=Z.clientY,f.value=1}),document.addEventListener("mouseout",()=>{f.value=0}),G({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:R(()=>`translate(${z.value-200}px, ${F.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:R(()=>f.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var t0=()=>G({id:"landing-page"},()=>{m0(),E0(),d0(),y0(),k0(),b0(),S0()});t0();
