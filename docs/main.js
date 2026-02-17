var _=void 0,L0=0,c0=0,c=void 0;function q0(f){if(_){if(!f.subs.includes(_))f.subs.push(_);if(!_.deps.includes(f))_.deps.push(f)}}function Q0(f){f.version=++L0;let F=[...f.subs];for(let z of F)if(c0>0){if(!c)c=[];if(!c.includes(z))c.push(z)}else z.execute()}function W0(f){for(let F=0;F<f.deps.length;F++){let z=f.deps[F],D=z.subs.indexOf(f);if(D>-1)z.subs.splice(D,1)}f.deps.length=0}function y(f){let F=!0,z={execute(){if(!F)return;W0(z);let D=_;_=z;try{f()}finally{_=D}},deps:[],cleanup(){F=!1,W0(z)}};return z.execute(),()=>z.cleanup()}function n0(f,F=!1){let z={version:L0,subs:[]},D=f,Z=function(L){if(arguments.length>0){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(D,L))D=L,Q0(z);return}return q0(z),D};return Object.defineProperty(Z,"value",{get(){return q0(z),D},set(L){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(D,L))D=L,Q0(z)}}),Z[g0]=!0,Z.peek=()=>D,Z}function wf(f){let F={version:L0,subs:[]},z,D=-1,Z={execute(){F.version=++L0;let G=[...F.subs];for(let K of G)if(c0>0){if(!c)c=[];if(!c.includes(K))c.push(K)}else K.execute()},deps:[],cleanup(){W0(Z)}},L=()=>{W0(Z);let G=_;_=Z;try{let K=f();if(!Object.is(z,K))z=K;D=F.version}finally{_=G}};L();let Q=function(){if(D!==F.version)L();return q0(F),z};return Object.defineProperty(Q,"value",{get(){return Q()}}),Q[g0]=!0,Q.peek=()=>{if(D!==F.version)L();return z},Q}var o0=Symbol("mutable");function p(f){return{value:f,[o0]:!0}}function b(f){return f!==null&&typeof f==="object"&&f[o0]===!0}var m0=Symbol("reactive-proxy"),J0=Symbol("raw");function T0(f){return f!==null&&typeof f==="object"&&m0 in f}function t(f,F=!1){let z=new Map,D=new WeakMap;function Z(G){let K=z.get(G);if(!K)K={version:0,subs:[]},z.set(G,K);return K}if(F===!1||F instanceof Set&&F.size===0){let G=!1;for(let K in f)if(b(f[K])){G=!0;break}if(Array.isArray(f)&&!G){for(let K=0;K<f.length;K++)if(b(f[K])){G=!0;break}}if(!G){if(Array.isArray(f))for(let K=0;K<f.length;K++){let j=f[K];if(j&&typeof j==="object"&&!b(j)&&!T0(j))f[K]=t(j,!1)}else for(let K in f){let j=f[K];if(j&&typeof j==="object"&&!b(j)&&!T0(j))f[K]=t(j,!1)}Object.freeze(f)}}return new Proxy(f,{get(G,K,j){if(K===J0||K==="$raw")return G;if(K===m0)return!0;let A=Z(K);q0(A);let W=Reflect.get(G,K,j);if(b(W)){let X=D.get(W);if(X?.mutable)return X.mutable;let w=W.value;if(w!==null&&typeof w==="object"){let B=t(w,!0);if(!X)X={},D.set(W,X);return X.mutable=B,B}return w}if(W!==null&&typeof W==="object"&&!T0(W)){let X=typeof F==="boolean"&&F||F instanceof Set&&F.has(K),w=D.get(W);if(w){let s=X?w.mutable:w.readonly;if(s)return s}let B=t(W,X);if(!w)w={},D.set(W,w);if(X)w.mutable=B;else w.readonly=B;return B}return W},set(G,K,j,A){let W=typeof F==="boolean"&&F||F instanceof Set&&F.has(K),X=Reflect.get(G,K,A);if(!W&&b(X)){if(X.value===null||typeof X.value!=="object"){if(F===!1)F=new Set;if(F instanceof Set)F.add(K);W=!0}}if(!W)return!1;let w=j!==null&&typeof j==="object"&&J0 in j?j[J0]:j,B=Array.isArray(G)&&K==="length";if(Object.is(X,w)&&!B)return!0;if(Reflect.set(G,K,w,A),X!==null&&typeof X==="object")D.delete(X);let s=z.get(K);if(s)Q0(s);return!0},has(G,K){if(K===m0||K===J0||K==="$raw")return!0;return Reflect.has(G,K)},ownKeys(G){return Reflect.ownKeys(G)},getOwnPropertyDescriptor(G,K){return Reflect.getOwnPropertyDescriptor(G,K)},deleteProperty(G,K){let j=typeof F==="boolean"&&F||F instanceof Set&&F.has(K);if(!j){let X=Reflect.get(G,K);if(b(X)){if(X.value===null||typeof X.value!=="object"){if(F===!1)F=new Set;if(F instanceof Set)F.add(K);j=!0}}}if(!j)return!1;let A=Reflect.has(G,K),W=Reflect.deleteProperty(G,K);if(A&&W){let X=z.get(K);if(X)Q0(X)}return W}})}function Y(f,...F){if(typeof f==="function")return wf(f);if(f!==null&&typeof f==="object"&&!b(f))return t(f,new Set(F));if(b(f)){if(typeof f.value==="object"&&f.value!==null)return t(f.value,!0);return n0(f.value,!1)}return n0(f,!0)}var g0=Symbol("signal");function E(f){return typeof f==="function"&&f[g0]===!0}var X0=[];function h(f){X0.push(f)}function x(){X0.pop()}function V(){return X0[X0.length-1]??document.body}var P0=new WeakMap,Bf=0;function $f(f,F,z){if(z)return z(f,F);if(typeof f==="object"&&f!==null){if(!P0.has(f))P0.set(f,Bf++);return`_o:${P0.get(f)}`}return`${typeof f}:${f}`}function j0(f,F,z){let D=document.createComment("Each");V().appendChild(D);let Z=[],L=new Map;y(()=>{let Q=typeof f==="function"&&!Array.isArray(f)?f():f,G=[],K=new Map,j=new Set;for(let W=0;W<Q.length;W++){let X=Q[W],w=$f(X,W,z);if(console.log({item:X,key:w}),j.has(w))console.warn(`[Each] Duplicate key: "${w}". Keys must be unique.`);j.add(w);let B=L.get(w);if(B&&(!z||B.item===X))G.push(B),K.set(w,B);else{let s=document.createDocumentFragment();h(s);try{F(X,W)}finally{x()}let S=Array.from(s.childNodes),D0={key:w,item:X,nodes:S};if(G.push(D0),K.set(w,D0),B)for(let n of B.nodes)n.parentNode?.removeChild(n)}}for(let W of Z)if(!K.has(W.key))for(let X of W.nodes)X.parentNode?.removeChild(X);let A=D;for(let W of G){let X=W.nodes[0];if(!X)continue;if(A.nextSibling!==X){let B=D.parentNode;if(!B)continue;for(let s of W.nodes)B.insertBefore(s,A.nextSibling)}A=W.nodes[W.nodes.length-1]||A}Z=G,L.clear();for(let[W,X]of K)L.set(W,X)})}var Uf=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),Y0=new WeakMap,r0=new Set;function Vf(f){let{target:F,type:z}=f;while(F){let D=Y0.get(F);if(D&&D[z]){if(Object.defineProperty(f,"currentTarget",{configurable:!0,value:F}),D[z](f),f.cancelBubble)break}F=F.parentElement}}function s0(f,F,z){if(Uf.has(F)){if(!r0.has(F))document.addEventListener(F,Vf,{capture:!1,passive:!1}),r0.add(F);let D=Y0.get(f);if(!D)D={},Y0.set(f,D);D[F]=z}else f.addEventListener(F,z)}if(typeof window<"u")window.__eventHandlerMap=Y0;function o(f){return(F,z)=>{let D=document.createElement(f),Z,L;if(F===void 0);else if(m(F))L=F;else if(T(F)){if(Z=F,z!==void 0)L=z}if(Z)k(D,Z);let Q=[],G=(K)=>Q.push(K);if(L){let K=document.createDocumentFragment();h(K);try{L(D,G)}finally{x()}D.appendChild(K)}if(V().appendChild(D),Q.length>0)requestAnimationFrame(()=>{for(let K of Q)K()});return D}}function R(f){return(F,z,D)=>{let Z=document.createElement(f),L,Q,G;if(F===void 0);else if(a(F)){if(L=F,z===void 0);else if(m(z))G=z;else if(T(z)){if(Q=z,D!==void 0)G=D}}else if(m(F))G=F;else if(T(F)){if(Q=F,z!==void 0&&m(z))G=z}if(L!==void 0)e(Z,L);if(Q)k(Z,Q);let K=[],j=(A)=>K.push(A);if(G){let A=document.createDocumentFragment();h(A);try{G(Z,j)}finally{x()}Z.appendChild(A)}if(V().appendChild(Z),K.length>0)requestAnimationFrame(()=>{for(let A of K)A()});return Z}}function l0(f){return(F,z,D)=>{let Z=document.createElement(f),L,Q,G,K;if(F===void 0);else if(a(F)){if(L=F,z===void 0);else if(t0(z))Q=z;else if(m(z))K=z;else if(T(z)){if(G=z,D!==void 0)K=D}}else if(m(F))K=F;else if(T(F)){if(G=F,z!==void 0&&m(z))K=z}if(L!==void 0)e(Z,L);if(Q)s0(Z,"click",Q);if(G)k(Z,G);let j=[],A=(W)=>j.push(W);if(K){let W=document.createDocumentFragment();h(W);try{K(Z,A)}finally{x()}Z.appendChild(W)}if(V().appendChild(Z),j.length>0)requestAnimationFrame(()=>{for(let W of j)W()});return Z}}function a0(){return(f,F,z)=>{let D=document.createElement("img"),Z,L,Q;if(f===void 0);else if(typeof f==="string"&&e0(f)){if(Z=f,F===void 0);else if(typeof F==="string"){if(L=F,z!==void 0)Q=z}else if(T(F))Q=F}else if(T(f))Q=f;if(Z!==void 0)D.src=Z;if(L!==void 0)D.alt=L;if(Q)k(D,Q);return V().appendChild(D),D}}function ff(){return(f,F,z)=>{let D=document.createElement("a"),Z,L,Q,G;if(f===void 0);else if(typeof f==="string"&&Ff(f)){if(Z=f,F===void 0);else if(a(F)){if(L=F,z!==void 0)Q=z}else if(T(F))Q=F}else if(m(f))G=f;else if(T(f)){if(Q=f,F!==void 0&&m(F))G=F}if(Z!==void 0)D.href=Z;if(L!==void 0)e(D,L);if(Q)k(D,Q);let K=[],j=(A)=>K.push(A);if(G){let A=document.createDocumentFragment();h(A);try{G(D,j)}finally{x()}D.appendChild(A)}if(V().appendChild(D),K.length>0)requestAnimationFrame(()=>{for(let A of K)A()});return D}}function a(f){return typeof f==="string"||typeof f==="number"||E(f)&&(typeof f.peek()==="string"||typeof f.peek()==="number")}function t0(f){if(typeof f!=="function")return!1;if(E(f))return!1;return f.length<=1}function Ff(f){if(typeof f!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(f)}function e0(f){if(typeof f!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(f)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(f)}var y0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function Nf(f){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(f)}function Rf(f,F,z){switch(F){case"value":if("value"in f)f.value=String(z??"");break;case"checked":if("checked"in f)f.checked=Boolean(z);break;case"selected":if("selected"in f)f.selected=Boolean(z);break;case"muted":if("muted"in f)f.muted=Boolean(z);break;case"currentTime":if("currentTime"in f)f.currentTime=Number(z??0);break;case"volume":if("volume"in f)f.volume=Number(z??1);break;case"indeterminate":if("indeterminate"in f)f.indeterminate=Boolean(z);break;case"defaultValue":if("defaultValue"in f)f.defaultValue=String(z??"");break;case"defaultChecked":if("defaultChecked"in f)f.defaultChecked=Boolean(z);break;case"textContent":f.textContent=String(z??"");break;case"innerText":f.innerText=String(z??"");break}}function zf(f,F,z){if(F==="class"||F==="className"||F==="classList")Tf(f,z);else if(F==="style")gf(f,z);else if(Nf(F))Rf(f,F,z);else if(typeof z==="boolean")if(z)f.setAttribute(y0[F]??F,"");else f.removeAttribute(y0[F]??F);else f.setAttribute(y0[F]??F,String(z))}function k(f,F){for(let z in F){let D=F[z];if(D===null||D===void 0)continue;if(z.startsWith("on")&&typeof D==="function"){let Z=z.slice(2).toLowerCase();s0(f,Z,D)}else if(E(D))y(()=>zf(f,z,D.value));else zf(f,z,D)}}function Tf(f,F){if(typeof F==="string")f.className=F;else if(Array.isArray(F))f.className=F.filter(Boolean).join(" ");else if(typeof F==="object"&&F!==null){let z=!1;for(let Z in F)if(E(F[Z])){z=!0;break}let D=()=>{let Z=[];for(let L in F){let Q=F[L];if(E(Q)?Q.value:Q)Z.push(L)}f.className=Z.join(" ")};if(z)y(D);else D()}}function mf(f){return typeof f==="object"&&f!==null&&"type"in f&&typeof f.type==="string"}function C0(f){switch(f.type){case"rgb":return f.a!==void 0?`rgba(${f.r}, ${f.g}, ${f.b}, ${f.a})`:`rgb(${f.r}, ${f.g}, ${f.b})`;case"hsl":return f.a!==void 0?`hsla(${f.h}, ${f.s}%, ${f.l}%, ${f.a})`:`hsl(${f.h}, ${f.s}%, ${f.l}%)`;case"hwb":return f.a!==void 0?`hwb(${f.h} ${f.w}% ${f.b}% / ${f.a})`:`hwb(${f.h} ${f.w}% ${f.b}%)`;case"oklch":return f.a!==void 0?`oklch(${f.l}% ${f.c} ${f.h} / ${f.a})`:`oklch(${f.l}% ${f.c} ${f.h})`;case"lab":return f.alpha!==void 0?`lab(${f.l}% ${f.a} ${f.b} / ${f.alpha})`:`lab(${f.l}% ${f.a} ${f.b})`;case"lch":return f.alpha!==void 0?`lch(${f.l}% ${f.c} ${f.h} / ${f.alpha})`:`lch(${f.l}% ${f.c} ${f.h})`;case"oklab":return f.alpha!==void 0?`oklab(${f.l}% ${f.a} ${f.b} / ${f.alpha})`:`oklab(${f.l}% ${f.a} ${f.b})`;case"hex":return f.value;case"color":{let F=f.components.join(" ");return f.alpha!==void 0?`color(${f.space} ${F} / ${f.alpha})`:`color(${f.space} ${F})`}case"color-mix":{let F=typeof f.color1==="object"?C0(f.color1):f.color1,z=typeof f.color2==="object"?C0(f.color2):f.color2,D=f.percentage1!==void 0?`${f.percentage1}%`:"",Z=f.percentage2!==void 0?`${f.percentage2}%`:"";return`color-mix(${f.method}, ${F} ${D}, ${z} ${Z})`}}}function Df(f){if(f===null||f===void 0)return"";if(mf(f))return C0(f);return String(f)}function Kf(f,F,z){if(F.startsWith("--")){f.setProperty(F,z);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let D=F.replace(/([A-Z])/g,"-$1").toLowerCase();f.setProperty(D,z);return}try{f[F]=z}catch{f.setProperty(F,z)}}function gf(f,F){if(typeof F==="string")f.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let z=!1;for(let D in F)if(E(F[D])){z=!0;break}if(z)y(()=>{for(let D in F){let Z=F[D],L=E(Z)?Z.value:Z;Kf(f.style,D,Df(L))}});else for(let D in F){let Z=F[D];Kf(f.style,D,Df(Z))}}}function e(f,F){if(E(F))y(()=>{f.textContent=String(F.value)});else f.textContent=String(F)}function T(f){return typeof f==="object"&&f!==null&&!E(f)&&!Array.isArray(f)}function m(f){return typeof f==="function"&&!E(f)}var g=ff(),K0=a0(),r=l0("button");var _0=R("h1"),Zf=R("h2"),Z0=R("h3"),G0=R("h4");var A0=R("p"),J=R("div");var M0=R("section");var Gf=R("header"),Hf=R("footer");var O0=R("pre");var O=R("span");var U=R("td"),d=R("th"),v=R("li");var f0=o("ul");var p0=o("table"),E0=o("tbody"),h0=o("thead");var i=o("tr");var Jf=o("nav");var Lf=o("canvas");var Pf=()=>{if(typeof localStorage<"u"&&localStorage.getItem("fia-theme"))return localStorage.getItem("fia-theme");if(typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark";return"dark"},u=Y(p({current:Pf()}));y(()=>{let f=u.current;if(typeof localStorage<"u")localStorage.setItem("fia-theme",f);if(typeof document<"u"){if(document.documentElement.setAttribute("data-theme",f),!document.getElementById("fia-theme-styles")){let F=document.createElement("style");F.id="fia-theme-styles",F.textContent=`
                :root {
                    /* Dark Mode (Default) - Fia Brand Colors */
                    --fia-brand: #2dd4bf;      /* Teal 400 */
                    --fia-brand-rgb: 45, 212, 191;
                    
                    --fia-primary: var(--fia-brand);
                    --fia-accent: #99f6e4;     /* Teal 200 */
                    
                    --fia-dark: #0f172a;       /* Slate 900 - deep background */
                    --fia-slate: #334155;      /* Slate 700 - borders */
                    --fia-white: #f1f5f9;      /* Slate 100 - light text */
                    --fia-gray: #e2e8f0;       /* Slate 200 - subtle backgrounds */
                    --bg-dark: #111111;
                    --bg-card: #181818;
                    --text-primary: #ffffff;
                    --text-secondary: #a0a0a0;
                    --syntax-comment: #6a9955;
                    --syntax-string: #ce9178;
                    --syntax-keyword: #569cd6;
                    --syntax-function: #dcdcaa;
                    --spacing-xl: 3rem;
                }

                [data-theme="light"] {
                    /* Light Mode Overrides - Fia Brand Colors */
                    --fia-brand: #0d9488;      /* Teal 600 */
                    --fia-brand-rgb: 13, 148, 136;
                    
                    --fia-primary: var(--fia-brand);
                    --fia-accent: #115e59;     /* Teal 800 */

                    --fia-slate: #cbd5e1;      /* Light slate for borders */
                    --fia-white: #1e293b;      /* Dark slate for text */
                    --fia-gray: #f1f5f9;       /* Very light slate */
                    --fia-dark: #f8fafc;       /* Almost white for cards */
                    --bg-dark: #FFFFFF;        /* White background */
                    --bg-card: #F7FAFC;        /* Light grey card bg */
                    --text-primary: #2D3748;   /* Dark grey text */
                    --text-secondary: #718096;

                    /* Syntax Highlighting for Light Mode */
                    --syntax-comment: #008000;
                    --syntax-string: #a31515;
                    --syntax-keyword: #0000ff;
                    --syntax-function: #795e26;
                }

                body {
                    background-color: var(--bg-dark);
                    color: var(--text-primary);
                    transition: background-color 0.3s ease, color 0.3s ease;
                    cursor: auto;
                }

                [data-theme="light"] body {
                    background-color: var(--bg-dark);
                }
            `,document.head.appendChild(F)}if(f==="dark")document.body.classList.add("dark"),document.body.classList.remove("light");else document.body.classList.add("light"),document.body.classList.remove("dark")}});var qf=()=>{u.current=u.current==="dark"?"light":"dark"};var Qf={en:{nav:{docs:"Docs",github:"GitHub",examples:"Examples"},hero:{title:"Bare Metal JavaScript",subtitle:"Value Native.",getStarted:"Get Started",viewDocs:"View Docs",features:{reactive:{title:"Fine-Grained",desc:"Signals update only what changes"},performance:{title:"Fast",desc:"Direct DOM, no virtual DOM overhead"},typescript:{title:"Type-Safe",desc:"Full TypeScript support with inference"},bundle:{title:"Tiny",desc:"~4KB gzipped, tree-shakeable"}}},features:{title:"Why Fia?",subtitle:"Everything you need, nothing you don't",items:{noVdom:{title:"Zero Virtual DOM",desc:"Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance."},signals:{title:"Fine-Grained Reactivity",desc:"Signals track dependencies automatically. Only what changes updates."},typescript:{title:"Type Safe",desc:"Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events."},accessibility:{title:"Accessibility First",desc:"WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions."},zeroDeps:{title:"Zero Dependencies",desc:"No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript."},tiny:{title:"Tiny Bundle",desc:"Only ~4KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse."},delegation:{title:"Event Delegation",desc:"Single delegated listener per event type."},batching:{title:"Fragment Batching",desc:"Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing."}}},demo:{tryIt:"Try it yourself",interactive:"Interactive counter demo"},docs:{tableOfContents:"Table of Contents",introduction:"Introduction",whyFia:"Why Fia?",gettingStarted:"Getting Started",elementApi:"Element API",elementFactoryTypes:"Element Factory Types",reactivity:"Reactivity",immutability:"Immutability",controlFlow:"Control Flow",components:"Component Composition",performance:"Performance",installation:{title:"Installation",npm:"npm",bun:"Bun",deno:"Deno"},quickStart:{title:"Quick Start"},coreApi:{title:"Core API",signals:"Signals",elements:"Elements",control:"Control Flow"},examples:{title:"Examples",counter:"Counter",todoList:"Todo List",form:"Form Validation"},bundleSizes:{title:"Bundle Sizes",description:"Fia is designed to be incredibly small while remaining feature-complete.",minimal:"Minimal",full:"Full App",notes:"Notes",tableHeaders:{framework:"Framework",minimal:"Minimal (gzip)",full:"Full App (gzip)",notes:"Notes"}},copyCode:"Copy",copied:"Copied!"},footer:{tagline:"Fine-grained reactivity for modern web",madeWith:"Made with",by:"by Evan"},common:{language:"Language",darkMode:"Dark Mode",lightMode:"Light Mode"}},de:{nav:{docs:"Dokumentation",github:"GitHub",examples:"Beispiele"},hero:{title:"Feinkörnige Reaktivität für das moderne Web",subtitle:"Keine Abhängigkeiten. Reines TypeScript. Blitzschnell.",getStarted:"Loslegen",viewDocs:"Dokumentation",features:{reactive:{title:"Feinkörnig",desc:"Signals aktualisieren nur Änderungen"},performance:{title:"Schnell",desc:"Direktes DOM, kein Virtual DOM Overhead"},typescript:{title:"Typsicher",desc:"Vollständige TypeScript-Unterstützung"},bundle:{title:"Klein",desc:"~4KB gzipped, tree-shakeable"}}},features:{title:"Warum Fia?",subtitle:"Alles was Sie brauchen, nichts was Sie nicht brauchen",items:{noVdom:{title:"Kein Virtual DOM",desc:"Fia aktualisiert das DOM direkt. Kein Diffing, kein Overhead, keine Reconciliation-Kosten. Nur pure Performance."},signals:{title:"Feinkörnige Reaktivität",desc:"Signals verfolgen Abhängigkeiten automatisch. Nur was sich ändert, wird aktualisiert."},typescript:{title:"Typsicher",desc:"Mit TypeScript gebaut, für TypeScript. Genießen Sie vollständige Autovervollständigung und Typinferenz für alle HTML-Attribute und Events."},accessibility:{title:"Barrierefreiheit Zuerst",desc:"WCAG-Konformität eingebaut. Erweiterte ARIA-Typen mit Literalwerten und rollenspezifischen Attributvorschlägen."},zeroDeps:{title:"Keine Abhängigkeiten",desc:"Keine npm-Pakete. Kein Supply-Chain-Risiko. Keine Versionskonflikte. Nur pures JavaScript."},tiny:{title:"Winziges Bundle",desc:"Nur ~4KB gzipped. Kleiner als die meisten Utility-Bibliotheken. Schnell zu laden, schnell zu parsen."},delegation:{title:"Event-Delegation",desc:"Ein einziger delegierter Listener pro Event-Typ."},batching:{title:"Fragment-Batching",desc:"Automatisches DocumentFragment-Batching. Keine Zwischenknoten oder Layout-Thrashing mehr."}}},demo:{tryIt:"Probieren Sie es selbst aus",interactive:"Interaktive Zähler-Demo"},docs:{tableOfContents:"Inhaltsverzeichnis",introduction:"Einführung",whyFia:"Warum Fia?",gettingStarted:"Erste Schritte",elementApi:"Element-API",elementFactoryTypes:"Element-Factory-Typen",reactivity:"Reaktivität",immutability:"Unveränderlichkeit",controlFlow:"Kontrollfluss",components:"Komponentenkomposition",performance:"Leistung",installation:{title:"Installation",npm:"npm",bun:"Bun",deno:"Deno"},quickStart:{title:"Schnellstart"},coreApi:{title:"Kern-API",signals:"Signals",elements:"Elemente",control:"Kontrollfluss"},examples:{title:"Beispiele",counter:"Zähler",todoList:"Aufgabenliste",form:"Formularvalidierung"},bundleSizes:{title:"Bundle-Größen",description:"Fia ist so konzipiert, dass es unglaublich klein und dennoch funktional vollständig ist.",minimal:"Minimal",full:"Vollständige App",notes:"Hinweise",tableHeaders:{framework:"Framework",minimal:"Minimal (gzip)",full:"Vollständige App (gzip)",notes:"Hinweise"}},copyCode:"Kopieren",copied:"Kopiert!"},footer:{tagline:"Feinkörnige Reaktivität für das moderne Web",madeWith:"Gemacht mit",by:"von Evan"},common:{language:"Sprache",darkMode:"Dunkler Modus",lightMode:"Heller Modus"}},el:{nav:{docs:"Τεκμηρίωση",github:"GitHub",examples:"Παραδείγματα"},hero:{title:"Λεπτομερής Αντιδραστικότητα για το Σύγχρονο Web",subtitle:"Χωρίς εξαρτήσεις. Καθαρό TypeScript. Αστραπιαία ταχύτητα.",getStarted:"Ξεκινήστε",viewDocs:"Τεκμηρίωση",features:{reactive:{title:"Λεπτομερής",desc:"Τα Signals ενημερώνουν μόνο τις αλλαγές"},performance:{title:"Γρήγορο",desc:"Άμεσο DOM, χωρίς Virtual DOM overhead"},typescript:{title:"Τυποασφαλές",desc:"Πλήρης υποστήριξη TypeScript"},bundle:{title:"Μικρό",desc:"~4KB gzipped, tree-shakeable"}}},features:{title:"Γιατί Fia;",subtitle:"Όλα όσα χρειάζεστε, τίποτα που δεν χρειάζεστε",items:{noVdom:{title:"Χωρίς Virtual DOM",desc:"Το Fia ενημερώνει το DOM απευθείας. Χωρίς diffing, χωρίς overhead, χωρίς κόστος συμφωνίας. Μόνο καθαρή απόδοση."},signals:{title:"Λεπτομερής Αντιδραστικότητα",desc:"Τα Signals παρακολουθούν τις εξαρτήσεις αυτόματα. Μόνο αυτό που αλλάζει ενημερώνεται."},typescript:{title:"Τυποασφαλές",desc:"Χτισμένο με TypeScript, για TypeScript. Απολαύστε πλήρη αυτόματη συμπλήρωση και συμπερασμό τύπων για όλα τα χαρακτηριστικά και συμβάντα HTML."},accessibility:{title:"Προσβασιμότητα Πρώτα",desc:"Ενσωματωμένη συμμόρφωση WCAG. Προηγμένοι τύποι ARIA με κυριολεκτικές τιμές και προτάσεις χαρακτηριστικών ανά ρόλο."},zeroDeps:{title:"Χωρίς Εξαρτήσεις",desc:"Χωρίς πακέτα npm. Χωρίς κίνδυνο εφοδιαστικής αλυσίδας. Χωρίς συγκρούσεις εκδόσεων. Μόνο καθαρό JavaScript."},tiny:{title:"Μικροσκοπικό Bundle",desc:"Μόνο ~4KB gzipped. Μικρότερο από τις περισσότερες βιβλιοθήκες εργαλείων. Γρήγορο στη λήψη, γρήγορο στην ανάλυση."},delegation:{title:"Ανάθεση Συμβάντων",desc:"Ένας μόνο ανατεθειμένος ακροατής ανά τύπο συμβάντος."},batching:{title:"Ομαδοποίηση Fragment",desc:"Αυτόματη ομαδοποίηση DocumentFragment. Όχι άλλοι ενδιάμεσοι κόμβοι ή thrashing διάταξης."}}},demo:{tryIt:"Δοκιμάστε το μόνοι σας",interactive:"Διαδραστική επίδειξη μετρητή"},docs:{tableOfContents:"Πίνακας Περιεχομένων",introduction:"Εισαγωγή",whyFia:"Γιατί Fia;",gettingStarted:"Ξεκινώντας",elementApi:"Element API",elementFactoryTypes:"Τύποι Element Factory",reactivity:"Αντιδραστικότητα",immutability:"Αμεταβλητότητα",controlFlow:"Ροή Ελέγχου",components:"Σύνθεση Στοιχείων",performance:"Απόδοση",installation:{title:"Εγκατάσταση",npm:"npm",bun:"Bun",deno:"Deno"},quickStart:{title:"Γρήγορη Έναρξη"},coreApi:{title:"Κύριο API",signals:"Signals",elements:"Στοιχεία",control:"Ροή Ελέγχου"},examples:{title:"Παραδείγματα",counter:"Μετρητής",todoList:"Λίστα Εργασιών",form:"Επικύρωση Φόρμας"},bundleSizes:{title:"Μεγέθη Bundle",description:"Το Fia είναι σχεδιασμένο να είναι απίστευτα μικρό ενώ παραμένει πλήρως λειτουργικό.",minimal:"Ελάχιστο",full:"Πλήρης Εφαρμογή",notes:"Σημειώσεις",tableHeaders:{framework:"Framework",minimal:"Ελάχιστο (gzip)",full:"Πλήρης Εφαρμογή (gzip)",notes:"Σημειώσεις"}},copyCode:"Αντιγραφή",copied:"Αντιγράφηκε!"},footer:{tagline:"Λεπτομερής αντιδραστικότητα για το σύγχρονο web",madeWith:"Φτιαγμένο με",by:"από τον Evan"},common:{language:"Γλώσσα",darkMode:"Σκοτεινή Λειτουργία",lightMode:"Φωτεινή Λειτουργία"}}};var yf=()=>{if(typeof localStorage<"u"){let f=localStorage.getItem("fia-language");if(f&&(f==="en"||f==="de"||f==="el"))return f}if(typeof navigator<"u"){let f=navigator.language.toLowerCase();if(f.startsWith("de"))return"de";if(f.startsWith("el"))return"el"}return"en"},Wf=Y(p({currentLanguage:yf()})),I=Y(()=>Qf[Wf.currentLanguage]);y(()=>{let f=Wf.currentLanguage;if(typeof localStorage<"u")localStorage.setItem("fia-language",f);if(typeof document<"u")document.documentElement.setAttribute("lang",f)});var Xf=()=>Jf({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{g({href:"/",style:{display:"flex",alignItems:"center",gap:"0.5rem",textDecoration:"none"}},()=>{K0({src:"/assets/logo.svg",alt:"Fia Logo",style:{width:"32px",height:"32px"}}),J({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{O({style:{color:"var(--fia-primary)"},textContent:"fia"})})}),J({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{g({href:"#docs",style:{fontWeight:"500"},textContent:Y(()=>I.value.nav.docs)}),g({href:"https://github.com/o-sofos/fia",target:"_blank",style:{fontWeight:"500"},textContent:Y(()=>I.value.nav.github)}),r({style:{background:"none",border:"none",cursor:"pointer",padding:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:Y(()=>u.current==="dark"?"var(--text-primary)":"var(--fia-primary)")},onclick:qf,title:Y(()=>u.current==="dark"?I.value.common.lightMode:I.value.common.darkMode)},()=>{O({textContent:Y(()=>u.current==="dark"?"\uD83C\uDF19":"☀️")})})})});var jf=()=>Lf({style:{position:"fixed",top:"0",left:"0",width:"100%",height:"100%",zIndex:"-1",pointerEvents:"none"}},(f)=>{let F=f.getContext("2d"),z=0,D=0,Z=-1000,L=-1000,Q=50,G=0.5,K=500,j=()=>{z=window.innerWidth,D=window.innerHeight,f.width=z,f.height=D};window.addEventListener("resize",j),j();let{scrollY:A,scrollY:W}=window;window.addEventListener("scroll",()=>{A=window.scrollY});let X=(B,s,S)=>{return B*(1-S)+s*S},w=()=>{F.clearRect(0,0,z,D);let B=u.current==="dark";F.fillStyle=B?"rgba(36, 247, 177, 1)":"rgba(0, 0, 0, 0.15)";let s=0.5;W=X(W,A,0.1);let D0=W*s%Q,n=Math.ceil(z/Q),l=Math.ceil(D/Q)+1;for(let $0=0;$0<=n;$0++)for(let U0=-1;U0<=l;U0++){let k0=$0*Q,S0=U0*Q-D0,V0=k0-Z,N0=S0-L,b0=Math.sqrt(V0*V0+N0*N0),d0=k0,v0=S0,i0=G;if(b0<K){let R0=1-b0/K,H0=R0*R0*R0;if(H0>0){let u0=Math.atan2(N0,V0);if(d0+=Math.cos(u0)*H0*15,v0+=Math.sin(u0)*H0*15,i0=G+H0*1.5,B)F.fillStyle="rgba(36, 247, 177, 1)";else F.fillStyle="rgba(36, 247, 177, 1)"}}else F.fillStyle=B?"rgba(36, 247, 177, 1)":"rgba(0, 0, 0, 0.15)";F.beginPath(),F.arc(d0,v0,i0,0,Math.PI*2),F.fill()}requestAnimationFrame(w)};w()});var Yf=()=>Gf({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{_0({style:{fontSize:"clamp(3rem, 8vw, 5rem)",lineHeight:"1.1",marginBottom:"var(--spacing-sm)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1",color:"var(--text-primary)"}},()=>{J({textContent:"Immutability by Design"})}),_0({class:"text-gradient",style:{fontSize:"clamp(2.5rem, 6vw, 4rem)",lineHeight:"1.2",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{J({textContent:"Bare Metal JavaScript"})}),J({style:{fontSize:"1.2rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",display:"flex",flexWrap:"wrap",gap:"1.5rem",justifyContent:"center",alignItems:"center",position:"relative",zIndex:"1"}},()=>{["No JSX","No Virtual DOM","No Dependencies"].forEach((F)=>{O({style:{display:"flex",alignItems:"center",gap:"0.5rem"}},()=>{O({style:{color:"var(--fia-primary)"},textContent:"✦"}),O({textContent:F})})})}),J({style:{display:"flex",gap:"1.5rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{r({class:"btn btn-primary",style:{padding:"1rem 2.5rem",fontSize:"1.1rem",borderRadius:"2rem"},textContent:Y(()=>I.value.hero.getStarted)}),g({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2.5rem",fontSize:"1.1rem",borderRadius:"2rem"},textContent:"View Source"})}),J({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--fia-primary), var(--fia-accent))",opacity:"0.2",boxShadow:"0 10px 30px rgba(var(--fia-brand-rgb),0.2)",zIndex:"0",transform:"rotate(45deg)"}}),J({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--fia-primary)",opacity:"0.1",zIndex:"0"}}),J({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--fia-primary)",opacity:"0.2",boxShadow:"0 0 20px var(--fia-primary)",zIndex:"0",animationDelay:"1s"}}),J({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--fia-primary) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),J({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function I0(f,F=10){let z,D=()=>{z=f.getBoundingClientRect(),f.style.transition="transform 0.1s ease-out"},Z=(Q)=>{if(!z)z=f.getBoundingClientRect();let G=Q.clientX-z.left,K=Q.clientY-z.top,j=z.width/2,A=z.height/2,W=(K-A)/A*-F,X=(G-j)/j*F;f.style.transform=`
            perspective(1000px)
            rotateX(${W}deg)
            rotateY(${X}deg)
            scale3d(1.02, 1.02, 1.02)
        `},L=()=>{f.style.transition="transform 0.5s ease-out",f.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return f.addEventListener("mouseenter",D),f.addEventListener("mousemove",Z),f.addEventListener("mouseleave",L),()=>{f.removeEventListener("mouseenter",D),f.removeEventListener("mousemove",Z),f.removeEventListener("mouseleave",L)}}var P=(f)=>{V().appendChild(document.createTextNode(f))},sf=()=>J({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{J({style:{borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--fia-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(f)=>{I0(f,5),J({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{J({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),J({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),J({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let F=(Z)=>O({style:{color:"var(--syntax-keyword)"},textContent:Z}),z=(Z)=>O({style:{color:"var(--syntax-function)"},textContent:Z}),D=(Z)=>O({style:{color:"var(--syntax-string)"},textContent:Z});O0({style:{transform:"translateZ(40px)"}},()=>{J(()=>{F("import"),P(" { $, div, button, Mut } "),F("from"),D(' "fia"'),P(";")}),P(" "),J(()=>{F("const"),P(" count = "),z("$"),P("("),z("Mut"),P("(0));")}),P(" "),J(()=>{z("button"),P("("),D('"Increment"'),P(", () => count.value++);")}),P(" "),J(()=>{z("div"),P("("),z("$"),P("(() => "),D("`Count: ${count.value}`"),P("));")})})})});var Af=()=>M0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{Y(()=>[{key:"noVdom",icon:"⚡"},{key:"signals",icon:"\uD83C\uDFAF"},{key:"typescript",icon:"\uD83D\uDEE1️"},{key:"accessibility",icon:"♿"},{key:"zeroDeps",icon:"\uD83D\uDCE6"},{key:"tiny",icon:"⚖️"},{key:"delegation",icon:"\uD83C\uDFAA"},{key:"batching",icon:"\uD83D\uDE80"}]).value.forEach(({key:F,icon:z})=>{let D=Y(()=>I.value.features.items[F].title),Z=Y(()=>I.value.features.items[F].desc);J({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(L)=>{I0(L,15),J({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:z}),Z0({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--fia-primary)",fontWeight:"600",transform:"translateZ(10px)"},textContent:D}),A0({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:Z})})})});var Mf=()=>Hf({style:{borderTop:"1px solid var(--fia-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{J({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{J({style:{marginBottom:"0.5rem",fontWeight:"500"},textContent:Y(()=>I.value.footer.tagline)}),J({style:{marginBottom:"1rem"},textContent:Y(()=>`${I.value.footer.madeWith} ❤️ ${I.value.footer.by}`)}),J({textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var Cf=(f)=>{V().appendChild(document.createTextNode(f))},w0=(f)=>{let A=new Set(["const","let","var","import","from","export","default","function","return","if","else","for","while","do","switch","case","break","continue","new","delete","typeof","instanceof","class","extends","implements","interface","type","enum","async","await","yield","throw","try","catch","finally","true","false","null","undefined","void","this","super","of","in","as"]),W=new Set(["string","number","boolean","object","any","never","unknown","Array","Promise","Map","Set","Record","Partial","Required","Signal","Mut","MaybeSignal"]),X=new Set(["div","button","h1","h2","h3","h4","h5","h6","p","ul","ol","li","input","span","section","article","nav","form","table","tr","td","th","a","img","pre","code","header","footer","main","aside","label","select","option","textarea","strong","em","canvas","video","audio","console","document","window","navigator","Show","Each","Match","$","Mut","setTimeout","setInterval","requestAnimationFrame","map","filter","forEach","reduce","find","some","every","push","pop","splice","slice","join","split","JSON","Math","Object","Number","String"]),w=/\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|=>|[{}()\[\];,.]|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[+\-*/%=!<>&|?:~^]+|\s+|./g,B=f.match(w)||[];B.forEach((s,S)=>{if(s.startsWith("//")||s.startsWith("/*"))O({style:{color:"var(--syntax-comment)",fontStyle:"italic"},textContent:s});else if(s.startsWith("`"))s.split(/(\$\{[^}]*\})/).forEach((n)=>{if(n.startsWith("${")){O({style:{color:"#89ddff"},textContent:"${"});let l=n.slice(2,-1);if(X.has(l)||A.has(l))O({style:{color:X.has(l)?"var(--syntax-function)":"var(--syntax-keyword)"},textContent:l});else O({style:{color:"var(--text-primary)"},textContent:l});O({style:{color:"#89ddff"},textContent:"}"})}else O({style:{color:"var(--syntax-string)"},textContent:n})});else if(s.startsWith('"')||s.startsWith("'"))O({style:{color:"var(--syntax-string)"},textContent:s});else if(s==="=>")O({style:{color:"#89ddff"},textContent:s});else if(/^\d+(\.\d+)?$/.test(s))O({style:{color:"#f78c6c"},textContent:s});else if(A.has(s))O({style:{color:"var(--syntax-keyword)",fontStyle:s==="this"?"italic":"normal"},textContent:s});else if(W.has(s))O({style:{color:"#ffcb6b"},textContent:s});else if(/^[a-zA-Z_$]/.test(s)&&B[S+1]?.trim()==="(")if(X.has(s))O({style:{color:"var(--syntax-function)"},textContent:s});else O({style:{color:"var(--syntax-function)"},textContent:s});else if(X.has(s))O({style:{color:"var(--syntax-function)"},textContent:s});else if(S>0&&B[S-1]==="."&&/^[a-zA-Z_$]/.test(s))O({style:{color:"#82aaff"},textContent:s});else if(/^[{}()\[\];,.]$/.test(s))O({style:{color:"#89ddff"},textContent:s});else if(/^[+\-*/%=!<>&|?:~^]+$/.test(s))O({style:{color:"#89ddff"},textContent:s});else Cf(s)})};var B0=(f)=>{let F=Y(p(0));J({style:{marginBottom:"1.5rem"}},()=>{J({style:{display:"flex",gap:"4px",borderBottom:"1px solid #e0e0e0",marginBottom:"1rem"}},()=>{j0(f,(z,D)=>{r({textContent:z.label,style:{padding:"8px 16px",background:Y(()=>F.value===D?"#2563eb":"transparent"),color:Y(()=>F.value===D?"white":"#666"),border:"none",borderBottom:Y(()=>F.value===D?"2px solid #2563eb":"2px solid transparent"),cursor:"pointer",fontSize:"14px",fontWeight:Y(()=>F.value===D?"600":"400"),transition:"all 0.2s"},onclick:()=>F.value=D})})}),J({style:{position:"relative"}},()=>{j0(f,(z,D)=>{J({style:{display:Y(()=>F.value===D?"block":"none"),background:"#1e1e1e",color:"#d4d4d4",padding:"1rem",borderRadius:"4px",overflow:"auto",fontFamily:"monospace",fontSize:"14px",whiteSpace:"pre"}},()=>{w0(z.code)})})})})};var z0=(f)=>{V().appendChild(document.createTextNode(f))},q=(f)=>J({class:"code-block animate-fade-up",style:{borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--fia-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{J({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{J({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{J({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),J({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),J({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=Y(p(!1));r({textContent:Y(()=>F.value?I.value.docs.copied:I.value.docs.copyCode),style:{background:"transparent",border:"1px solid var(--fia-slate)",color:Y(()=>F.value?"var(--fia-primary)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(f),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),O0({style:{margin:"0",overflowX:"auto"}},()=>{w0(f)})}),_f=(f)=>{let F=document.createElement("div");F.textContent=f,Object.assign(F.style,{position:"fixed",bottom:"2rem",left:"50%",transform:"translateX(-50%) translateY(20px)",background:"var(--fia-primary)",color:"var(--fia-dark)",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:"600",fontSize:"0.875rem",zIndex:"9999",opacity:"0",transition:"opacity 0.3s, transform 0.3s",pointerEvents:"none",boxShadow:"0 4px 20px rgba(var(--fia-brand-rgb), 0.3)"}),document.body.appendChild(F),requestAnimationFrame(()=>{F.style.opacity="1",F.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{F.style.opacity="0",F.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>F.remove(),300)},2000)},x0=(f)=>{g({href:`#${f}`,ariaLabel:"Link to this section",style:{opacity:"0",marginLeft:"0.5rem",color:"var(--text-tertiary)",textDecoration:"none",fontSize:"0.75em",transition:"opacity 0.2s, color 0.2s",cursor:"pointer",flexShrink:"0"},className:"anchor-link",textContent:"\uD83D\uDD17",onclick:(F)=>{F.preventDefault(),history.replaceState(null,"",`#${f}`);let z=window.location.href;navigator.clipboard.writeText(z).then(()=>{_f("✓ Link copied to clipboard")});let D=document.getElementById(f);if(D){let L=D.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:L,behavior:"smooth"})}}})},C=(f,F,z)=>{M0({id:F,class:"animate-fade-up heading-group",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{J({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{J({style:{width:"4px",height:"32px",background:"var(--fia-primary)",borderRadius:"2px"}}),Zf({style:{fontSize:"2rem",color:"var(--fia-white)",letterSpacing:"-0.5px"},textContent:typeof f==="function"?Y(f):f}),x0(F)}),z()})},$=(f,F,z)=>{let D=typeof F==="string"?F:f.toLowerCase().replace(/\s+/g,"-"),Z=typeof F==="function"?F:z;J({class:"heading-group",style:{marginBottom:"3rem",paddingBottom:"2rem",borderBottom:"1px solid var(--border-subtle)"}},()=>{J({style:{display:"flex",alignItems:"center",marginBottom:"1.5rem"}},()=>{Z0({id:D,style:{color:"var(--fia-primary)",fontSize:"1.5rem",scrollMarginTop:"120px"},textContent:f}),x0(D)}),Z()})},M=(f,F,z)=>{let D=typeof F==="string"?F:f.toLowerCase().replace(/\s+/g,"-"),Z=typeof F==="function"?F:z;J({class:"heading-group",style:{marginBottom:"1.5rem"}},()=>{J({style:{display:"flex",alignItems:"center",marginBottom:"0.75rem"}},()=>{G0({id:D,style:{fontSize:"1.2rem",color:"var(--fia-white)",fontWeight:"600",scrollMarginTop:"120px"},textContent:f}),x0(D)}),Z()})},H=(f)=>A0({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>z0(f)),F0=(f)=>f0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{f.forEach((F)=>v(F))}),N=(f,F="info")=>J({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(var(--fia-brand-rgb), 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--fia-primary)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--fia-primary)"}},()=>z0(f)),Of=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"bundle-sizes",title:"Bundle Sizes"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow",children:[{id:"control-flow-show",title:"Show"},{id:"control-flow-each",title:"Each"},{id:"control-flow-match",title:"Match",children:[{id:"match-strings",title:"Strings"},{id:"match-booleans",title:"Booleans"},{id:"match-numbers",title:"Numbers"}]}]},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],pf=()=>{let f=Y(p("intro")),F=[];for(let D of Of)if(F.push(D.id),D.children){for(let Z of D.children)if(F.push(Z.id),Z.children)for(let L of Z.children)F.push(L.id)}let z=()=>{let D=window.scrollY+150,Z=F[0];for(let L of F){let Q=document.getElementById(L);if(Q){if(Q.getBoundingClientRect().top+window.scrollY<=D)Z=L}}f.value=Z};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",z),z()},0);return J({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{J({style:{borderLeft:"2px solid var(--fia-slate)",paddingLeft:"1rem"}},()=>{Z0({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),f0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{let D=(Z)=>{let L=[];if(Z.children)for(let Q of Z.children)L.push(Q.id),L.push(...D(Q));return L};Of.forEach((Z)=>{let L=D(Z),Q=()=>f.value===Z.id||L.includes(f.value);v({style:{marginBottom:"0.5rem"}},()=>{if(g({href:`#${Z.id}`,style:{color:Y(()=>Q()?"var(--fia-primary)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:Y(()=>Q()?"600":"400"),borderLeft:Y(()=>Q()?"2px solid var(--fia-primary)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:Z.title,onclick:(G)=>{G.preventDefault();let K=document.getElementById(Z.id);if(K){let A=K.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:A,behavior:"smooth"}),f.value=Z.id}}}),Z.children)f0({style:{listStyle:"none",padding:"0",marginTop:"0.5rem"}},()=>{Z.children.forEach((G)=>{v({style:{marginBottom:"0.25rem"}},()=>{if(g({href:`#${G.id}`,style:{color:Y(()=>f.value===G.id?"var(--fia-primary)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.8rem",display:"block",padding:"0.25rem 0 0.25rem 1.5rem",transition:"color 0.2s",fontWeight:Y(()=>f.value===G.id?"600":"400")},textContent:G.title,onclick:(K)=>{K.preventDefault();let j=document.getElementById(G.id);if(j){let W=j.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:W,behavior:"smooth"})}f.value=G.id}}),G.children)f0({style:{listStyle:"none",padding:"0",marginTop:"0.25rem"}},()=>{G.children.forEach((K)=>{v({style:{marginBottom:"0.25rem"}},()=>{g({href:`#${K.id}`,style:{color:Y(()=>f.value===K.id?"var(--fia-primary)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.75rem",display:"block",padding:"0.25rem 0 0.25rem 3rem",transition:"color 0.2s",fontWeight:Y(()=>f.value===K.id?"600":"400")},textContent:K.title,onclick:(j)=>{j.preventDefault();let A=document.getElementById(K.id);if(A){let X=A.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:X,behavior:"smooth"})}f.value=K.id}})})})})})})})})})})})})},If=()=>J({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{pf(),J({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{J({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{g({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{K0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),g({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{K0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),C(()=>I.value.docs.introduction,"intro",()=>{H("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),C(()=>I.value.docs.whyFia,"why-fia",()=>{H("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),f0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{v({style:{marginBottom:"0.5rem"}},()=>{O({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),z0("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),v({style:{marginBottom:"0.5rem"}},()=>{O({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),z0("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),v({style:{marginBottom:"0.5rem"}},()=>{O({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),z0("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),v({style:{marginBottom:"0.5rem"}},()=>{O({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),z0("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),C(()=>I.value.docs.bundleSizes.title,"bundle-sizes",()=>{H("Fia is designed to be lightweight with excellent tree-shaking support. Import only what you need:"),J({style:{marginTop:"2rem",marginBottom:"2rem",overflowX:"auto"}},()=>{p0({style:{width:"100%",borderCollapse:"collapse",borderRadius:"0.75rem",overflow:"hidden"}},()=>{h0(()=>{i({style:{background:"rgba(0, 237, 100, 0.1)"}},()=>{d({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:"Entry Point"}),d({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"Gzip"}),d({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"Brotli"}),d({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:"Use Case"})})}),E0(()=>{i({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{U({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{O({textContent:"fia/signals"})}),U({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"1.46 KB"}),U({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"1.28 KB"}),U({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Reactive state without DOM"})}),i({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{U({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{O({textContent:"fia/control"})}),U({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"2.16 KB"}),U({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"1.90 KB"}),U({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Control flow (Show, Each)"})}),i({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{U({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{O({textContent:"fia/elements"})}),U({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"4.05 KB"}),U({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"3.58 KB"}),U({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"UI with 3 elements"})}),i({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{U({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{O({textContent:"fia/svg"})}),U({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"~4 KB"}),U({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"~3.5 KB"}),U({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"SVG graphics"})}),i(()=>{U({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{O({textContent:"fia"}),O({style:{marginLeft:"0.5rem",color:"var(--text-secondary)",fontSize:"0.875rem"},textContent:"(full)"})}),U({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"8.21 KB"}),U({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"7.25 KB"}),U({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Complete library"})})})})}),$("Framework Comparison",()=>{H("How Fia compares to other popular frameworks (minified + gzipped):"),J({style:{marginTop:"1.5rem",marginBottom:"2rem",overflowX:"auto"}},()=>{p0({style:{width:"100%",borderCollapse:"collapse",borderRadius:"0.75rem",overflow:"hidden"}},()=>{h0(()=>{i({style:{background:"rgba(0, 237, 100, 0.1)"}},()=>{d({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:Y(()=>I.value.docs.bundleSizes.tableHeaders.framework)}),d({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:Y(()=>I.value.docs.bundleSizes.tableHeaders.minimal)}),d({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:Y(()=>I.value.docs.bundleSizes.tableHeaders.full)}),d({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:Y(()=>I.value.docs.bundleSizes.tableHeaders.notes)})})}),E0(()=>{let f=[{name:"Fia",minimal:"1.46 KB",full:"~3.9 KB",notes:"Zero dependencies",highlight:!0},{name:"Preact",minimal:"~3 KB",full:"~3.5 KB",notes:"Lightweight champion",highlight:!1},{name:"Svelte",minimal:"~2-3 KB",full:"~4 KB",notes:"Compiler magic",highlight:!1},{name:"Solid",minimal:"~6-7 KB",full:"~6.5 KB",notes:"Fine-grained reactivity",highlight:!1},{name:"Vue",minimal:"~17 KB",full:"~22 KB",notes:"Tree-shakable",highlight:!1},{name:"React",minimal:"~7 KB",full:"~42 KB",notes:"Standard + VDOM",highlight:!1},{name:"Angular",minimal:"N/A",full:"~85 KB",notes:"Full framework",highlight:!1}];f.forEach((F,z)=>{i({style:{borderBottom:z<f.length-1?"1px solid var(--fia-slate)":"none"}},()=>{U({style:{padding:"1rem",color:F.highlight?"var(--fia-primary)":"var(--fia-white)",fontWeight:F.highlight?"700":"600"},textContent:F.name}),U({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:F.highlight?"600":"normal"},textContent:F.minimal}),U({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:F.highlight?"600":"normal"},textContent:F.full}),U({style:{padding:"1rem",color:"var(--text-secondary)",fontSize:"0.875rem"},textContent:F.notes})})})})})}),N("All sizes are minified + gzipped. Fia's tree-shaking ensures you only bundle what you use.","info")})}),C(()=>I.value.docs.gettingStarted,"getting-started",()=>{$("Prerequisites",()=>{H("Fia is compatible with any modern JavaScript runtime."),F0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),$("Installation",()=>{H("Fia is published on JSR. Install it using your preferred package manager:"),J({style:{marginBottom:"1rem"}},()=>{G0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Deno"}),q("deno add jsr:@fia/core")}),J({style:{marginBottom:"1rem"}},()=>{G0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Bun"}),H('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),H("2. Install (aliased as 'fia'):"),q("bun add fia@npm:@jsr/fia__core")}),J({style:{marginBottom:"1rem"}},()=>{G0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),q("npx jsr add @fia/core")}),N("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),$("Updating",()=>{H("To update to the latest version, run the installation command again (or use your package manager's update command)."),q(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),$("Quick Start",()=>{H("Create your first reactive app in seconds."),q(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),$("Mounting",()=>{H("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),q(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),C(()=>I.value.docs.elementApi,"element-api",()=>{H("Fia elements have a simple, consistent API. Functions match HTML tag names."),q(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),M("Event Handlers",()=>{H("Event handlers are delegated automatically for performance."),q(`button("Click me", () => console.log("clicked!"));

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),M("Nesting Elements",()=>{H("Use a callback function to nest elements."),q(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),M("Void Elements",()=>{H("Elements like input, img, br only accept props."),q(`input({ type: "email", placeholder: "you@example.com" });
img("/photo.jpg", "Photo");
br();`)}),M("onMount Callback",()=>{H("Access layout properties after the element is in the DOM."),q(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),C(()=>I.value.docs.elementFactoryTypes,"element-factory-types",()=>{H("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),$("Standard Elements",()=>{H("Used for semantic structure elements. Click each tab to see the different patterns for creating an article:"),B0([{label:"Empty",code:`// Empty element
article();`},{label:"Props Only",code:`// Props only
article({ 
  id: "post-1", 
  class: "article",
  role: "article"
});`},{label:"Children",code:`// Children callback only
article(() => {
  h2("Article Title");
  p("Article content goes here...");
});`},{label:"Props + Children",code:`// Props + children (most common) 
article({ class: "post" }, () => {
  h2("Article Title");
  p("Article body...");
  footer("Published: 2024");
});`}]),N("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),$("Text Elements",()=>{H("Optimized for elements that commonly hold text content. Click each tab to see different ways to create the same heading:"),B0([{label:"Empty",code:`// Empty element
h1();`},{label:"Props Only",code:`// Props only
h1({ 
  class: "title", 
  style: { color: "blue", fontSize: "32px" } 
});`},{label:"Children",code:`// Children callback
h1(() => {
  span("Welcome ");
  strong("User");
});`},{label:"Props + Children",code:`// Props + children
h1({ class: "hero" }, () => {
  span("Welcome ", { class: "greeting" });
  strong("User");
});`},{label:"Text Content",code:`// Text content shorthand 
h1("Welcome User");

// Also works with signals:
const user = $(Mut("User"));
h1($(() => \`Welcome \${user.value}\`));`},{label:"Text + Props",code:`// Text + props 
h1("Welcome User", { 
  class: "hero", 
  id: "main-heading" 
});`},{label:"Text + Children",code:`// Text + children
h1("Welcome", () => {
  strong(" User");
});`},{label:"All Three",code:`// Text + props + children 
h1("Welcome", { class: "hero" }, () => {
  strong(" User");
});`},{label:"onMount",code:`// With onMount callback
h1((el, onMount) => {
  el.textContent = "Welcome User";
  onMount(() => {
    console.log("Height:", el.offsetHeight);
  });
});

// Or with props:
h1({ class: "hero" }, (el, onMount) => {
  el.textContent = "Welcome User";
  onMount(() => el.scrollIntoView());
});`}]),N("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),$("Interactive Elements",()=>{H("Special factories for interactive elements with convenient text + click handler shorthand:"),B0([{label:"Text + Click ",code:`// Text + click handler shorthand
// The MOST convenient pattern!
button("Delete", () => {
  confirmDelete();
});

button("Save", () => save());

// Equivalent to:
button({
  textContent: "Delete",
  onclick: () => confirmDelete()
});`},{label:"Text + Props",code:`// Text + props
button("Submit", { 
  class: "btn-primary",
  type: "submit",
  disabled: false
});

// With reactive props
button("Submit", {
  class: "btn-primary",
  disabled: $(() => !isValid.value)
});`},{label:"Text + Children",code:`// Text + children callback
button("Delete", () => {
  span({ class: "icon" }, () => text("\uD83D\uDDD1️"));
});

button("Menu", () => {
  span(menuIcon);
  span("Options");
});`},{label:"Text + Props + Children",code:`// Text + props + children
button("Delete", { class: "btn-danger" }, () => {
  span({ class: "icon" }, () => text("\uD83D\uDDD1️"));
  span("Delete Item");
});`},{label:"Props Only",code:`// Props only (standard element pattern)
button({
  textContent: "Click",
  class: "btn",
  onclick: () => handleClick()
});`},{label:"Props + Children",code:`// Props + children (standard element pattern)
button({ class: "btn-danger" }, () => {
  span({ class: "icon" }, () => text("\uD83D\uDDD1️"));
  span("Delete");
});

// Note: onclick goes in props, not as 3rd arg!
button({ class: "btn", onclick: () => save() }, () => {
  span("Save");
});`}]),N("Elements: button, summary, option, optgroup.")}),$("Void Elements",()=>{H("Self-closing elements that cannot have children."),q(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),N("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),$("Type Safety Benefits",()=>{H("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),q(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),C(()=>I.value.docs.reactivity,"reactivity",()=>{$("Signals",()=>{H("Signals are the primitive units of reactivity."),q(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),$("Reactive Stores",()=>{H("Fia stores are immutable by default for predictability."),q(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),N("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),N("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),$("Computed Values",()=>{H("Computed signals automatically track dependencies and update when they change."),q(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),$("Effects",()=>{H("Use $e() to run side effects when dependencies change."),q(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),C(()=>I.value.docs.immutability,"immutability",()=>{H("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),$("Data Types & Behavior",()=>{M("1. Primitives (String, Number, Boolean)",()=>{H("Primitives are immutable by default. To make them mutable, use Mut."),q(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),M("2. Objects",()=>{H("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),q(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),H("Mutable Objects:"),q(`// Option A: Specific keys
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
    notifications: Mut(true), // Mutable Primitive: can be replaced
    theme: "dark"             // Read-only
  }
});
user.settings.notifications = false; // Works!

// Note: Mut({}) on an object makes its *properties* mutable,
// unless the parent key is also mutable.`)}),M("Secure Immutability by Design",()=>{H("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),q(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),N("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),M("3. Arrays",()=>{H("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),q(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),H("Mutable Arrays:"),q(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),M("4. Nested Objects (Deep Reactivity)",()=>{H("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),q(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),C(()=>I.value.docs.controlFlow,"control-flow",()=>{$("Show","control-flow-show",()=>{H("Conditionally render content that updates when the condition changes."),q('Show(() => isVisible.value, () => div("Hello!"));')}),$("Each","control-flow-each",()=>{H("High-performance keyed list rendering with efficient reconciliation. Each automatically assigns stable keys to items - no key function needed! Minimizes DOM operations by reusing existing nodes instead of recreating them."),M("Automatic Key Assignment",()=>{H("Each automatically assigns stable keys to both primitives and objects:"),q(`// Primitives: automatically keyed by value
const items = $({ list: ["Apple", "Banana", "Cherry"] });
Each(() => items.list, (item, index) => {
  li({ textContent: \`\${index + 1}. \${item}\` });
});

// Objects: automatically get stable internal IDs (via WeakMap)
const todos = $({ items: [
  { id: 1, text: "Learn Fia", completed: false },
  { id: 2, text: "Build app", completed: false }
] });

Each(() => todos.items, (todo) => {
  li(() => {
    input({
      type: "checkbox",
      checked: todo.completed,
      onchange: (e) => {
        todo.completed = e.currentTarget.checked;
      }
    });
    span({ textContent: todo.text });
  });
});
// ✅ No key function needed - automatic stable IDs!
// ✅ State, focus, scroll position preserved`)}),M("Custom Key Function (Optional)",()=>{H("For explicit control (e.g., database IDs), provide a custom key function:"),q(`// Optional: use database ID as key
Each(
  () => todos.items,
  (todo) => {
    li(() => {
      input({
        type: "checkbox",
        checked: todo.completed,
        onchange: (e) => {
          todo.completed = e.currentTarget.checked;
        }
      });
      span({ textContent: todo.text });
    });
  },
  (todo) => todo.id  // Optional: custom key function
);`),N("How automatic keying works: Objects/arrays get stable internal IDs via WeakMap (no memory leaks). Primitives are keyed by type:value. Custom keyFn takes precedence when provided.","info")}),M("When to Use Custom Keys",()=>{H("Automatic keying works great in most cases, but provide a custom keyFn when:"),q(`// ✅ Automatic keying works:
// - Object arrays (each gets unique ID)
// - Unique primitives: [1, 2, 3] or ["a", "b", "c"]
// - Arrays of arrays (each array reference gets unique ID)

// ⚠️ Provide custom keyFn for:
// - Duplicate primitives
const tags = ["react", "vue", "react"];  // Both "react" share key "string:react"
Each(tags, span, (tag, idx) => \`\${tag}-\${idx}\`);

// - Same object reference multiple times
const item = { x: 1 };
const items = [item, item];  // Both share same key!

// - Explicit control (database IDs, debugging)
Each(users, (user) => div(user.name), (user) => user.id);`),N(`Warning: If duplicate keys are detected, Each will log: '[Each] Duplicate key: "...". Keys must be unique.' Check the console and provide a custom keyFn if needed.`,"warning")}),M("Performance Characteristics",()=>{H("Each uses keyed reconciliation (automatic or custom) to achieve O(1) performance for common operations:"),N("Add 1 item to 1000: O(1) - creates 1 node (~0.5ms)","info"),N("Remove 1 item from 1000: O(1) - removes 1 node (~0.3ms)","info"),N("Move/reorder items: O(1) - moves nodes (~0.2ms)","info"),N("Preserves: input focus, scroll position, component state","info"),q(`// Performance comparison
const items = Array(1000).fill(0).map((_, i) => ({ id: i, value: i }));

// Old approach (no keying):
// - Adding 1 item: Recreates all 1001 nodes (~150ms) - 300x slower!
// - Input focus is lost ❌

// Fia Each (automatic keying):
// - Adding 1 item: Creates 1 node (~0.5ms)
// - Input focus is preserved ✅
// - State and scroll position preserved ✅`)}),M("Custom Key Function Best Practices",()=>{H("While automatic keying works great, you may want custom keys for specific use cases:"),q(`// ✅ Good: Database ID (explicit control)
(item) => item.id

// ✅ Good: UUID (distributed systems)
(item) => item.uuid

// ✅ Good: Composite key (multi-field uniqueness)
(item) => \`\${item.category}-\${item.slug}\`

// ❌ Bad: Index (automatic keying is better)
(item, index) => index

// ❌ Bad: Random number (never reuses nodes)
(item) => Math.random()

// ❌ Bad: Non-unique field (causes collisions)
(item) => item.category`),N("When to use custom keys: Database objects with existing IDs, cross-system synchronization, debugging (readable keys in DevTools). When automatic keying is fine: Most common cases, primitive arrays, local component state.","info")}),M("Real-World Example",()=>{H("Complete todo list with add, remove, and toggle functionality:"),q(`const state = $({
  todos: [],
  nextId: 0
}, "todos", "nextId");

div(() => {
  // Add todo form
  input({
    type: "text",
    placeholder: "New todo",
    onkeydown: (e) => {
      if (e.key === "Enter") {
        const input = e.currentTarget;
        state.todos = [
          ...state.todos,
          { id: state.nextId++, text: input.value, completed: false }
        ];
        input.value = "";
      }
    }
  });

  // Todo list with keyed Each
  ul(() => {
    Each(
      () => state.todos,
      (todo) => {
        li(() => {
          input({
            type: "checkbox",
            checked: todo.completed,
            onchange: (e) => {
              todo.completed = e.currentTarget.checked;
            }
          });
          span({ textContent: todo.text });
          button("×", () => {
            state.todos = state.todos.filter(t => t.id !== todo.id);
          });
        });
      },
      (todo) => todo.id  // Preserves checkbox state when reordering
    );
  });
});`)}),M("Performance Tips",()=>{F0(["Automatic keying works for most use cases (objects get stable IDs, primitives keyed by value)","Use custom key function for explicit control (database IDs, cross-system sync)","Custom keys are optional but useful for debugging (readable keys in DevTools)","Batch multiple updates with batch() for better performance","Same O(1) performance whether using automatic or custom keys"])})}),$("Match","control-flow-match",()=>{H("Reactive pattern matching for switch/case logic. Automatically updates rendering when the matched value changes."),H("Match accepts signals or getter functions, and returns Signal<R> with '_' default or Signal<R | undefined> without."),M("Strings","match-strings",()=>{H("Match exact string values:"),q(`const status = $(Mut("active"));

Match(status, {
  "active": () => span({ class: "success" }, () => text("Active")),
  "inactive": () => span({ class: "danger" }, () => text("Inactive")),
  "pending": () => span({ class: "warning" }, () => text("Pending")),
  _: () => span("Unknown")
});`)}),M("Booleans","match-booleans",()=>{H("Boolean values are automatically converted to string keys:"),q(`const isActive = $(Mut(true));

Match(isActive, {
  "true": () => "✅ Active",
  "false": () => "❌ Inactive"
});`)}),M("Numbers","match-numbers",()=>{H("Numbers support exact matching:"),q(`const count = $(Mut(2));

Match(count, {
  "0": () => "None",
  "1": () => "One",
  "2": () => "Two",
  _: () => "Many"
});`),H("For numeric values, Match also supports range-based comparisons using operators and interval notation:"),q(`const age = $(Mut(25));

// Comparison operators
Match(age, {
  "<18": () => "Minor",
  ">=18": () => "Adult",
  ">65": () => "Senior",
  _: () => "Invalid"
});

// Range notation (N..M is inclusive)
Match(age, {
  "0..17": () => "Child",       // 0 <= age <= 17
  "18..64": () => "Adult",      // 18 <= age <= 64
  "65..120": () => "Senior",    // 65 <= age <= 120
  _: () => "Unknown"
});

// Interval notation: [] = inclusive, () = exclusive
Match(age, {
  "(0..13)": () => "Child",     // 0 < age < 13
  "[13..18)": () => "Teen",     // 13 <= age < 18
  "[18..65)": () => "Adult",    // 18 <= age < 65
  "[65..120]": () => "Senior",  // 65 <= age <= 120
  _: () => "Unknown"
});

// Mix comparison and range patterns
Match(age, {
  "<18": () => "Minor",
  "[18..21)": () => "Young Adult",
  "[21..65)": () => "Adult",
  ">=65": () => "Senior",
  _: () => "Unknown"
});`),N("Range patterns only work with numeric values. Exact string matches are checked before range patterns.","info")})})}),C(()=>I.value.docs.components,"components",()=>{H("In Fia, components are just functions. There is no special class or type."),$("Basic Component",()=>{q(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),$("Children & Layouts",()=>{H("To create wrapper components, pass a callback function as a child prop."),q(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),C(()=>I.value.docs.performance,"performance",()=>{H("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),$("Event Delegation",()=>{H("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),q(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),M("How it works",()=>{F0(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),M("Benefits",()=>{F0(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),q(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),$("Automatic Fragment Batching",()=>{H("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),q(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),M("How it works",()=>{F0(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),M("Benefits",()=>{F0(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),q(`// Fia automatically batches 100 elements
div(() => {
  h1("Title");
  ul(() => {
    for (let i = 0; i < 100; i++) {
      li(\`Item \${i}\`);
    }
  });
  p("Footer");
});
// Result: 2 reflows total
// Traditional: 102 reflows`)}),$("Fine-Grained Reactivity",()=>{H("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),q(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),$("Best Practices",()=>{M("1. Batch Multiple Updates",()=>{q(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),M("2. Use peek() for Non-Reactive Reads",()=>{q(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),M("3. Memoize Expensive Computations",()=>{q(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),C(()=>I.value.docs.examples.title,"examples",()=>{$("\uD83D\uDFE2 Beginner",()=>{M("1. Hello World",()=>{H("The simplest possible Fia code."),q('h1("Hello, World!");')}),M("2. Counter",()=>{H("Signals hold reactive state."),q(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),M("3. Toggle",()=>{H("Computed signals derive values from other signals."),q(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
Show(visible, () => p("Now you see me!"));`)}),M("4. Input Binding",()=>{H("Two-way binding is manual but explicit."),q('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),M("5. List Rendering (Static)",()=>{H("For simple static lists, forEach works fine."),q(`const items = ["Apple", "Banana", "Cherry"];
ul(() => Each(items, li));`)})}),$("\uD83D\uDFE1 Intermediate",()=>{M("6. Reactive Store Counter",()=>{H("Objects passed to $() become reactive stores."),q(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),M("7. Conditional Classes",()=>{H("Computed signals work in class props too."),q(`const active = $(Mut(false));
button($(() => active.value ? "Deactivate" : "Activate"), () => active.value = !active.value);`)}),M("8. Form Handling",()=>{H("Reactive stores are perfect for forms."),q(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),M("9. Computed Values",()=>{H("Track dependencies automatically."),q('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),M("10. Dynamic Styling",()=>{H("Reactive styles allow theming."),q(`const theme = $(Mut("light"));

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
});`)})}),$("\uD83D\uDD34 Advanced",()=>{M("11. Control Flow Combo (Each + Show + Match)",()=>{H("A complete task manager combining all control flow components:"),q(`// Task manager example combining Each, Show, and Match
type Task = { id: number; text: string; completed: boolean };
type Filter = "all" | "active" | "completed";

const tasks = $(Mut<Task[]>([
  { id: 1, text: "Learn Fia", completed: true },
  { id: 2, text: "Build an app", completed: false },
  { id: 3, text: "Deploy to production", completed: false }
]));

const currentFilter = $(Mut<Filter>("all"));
const showCompleted = $(Mut(true));

// Computed: filtered tasks based on current filter and showCompleted toggle
const filteredTasks = $(() => {
  const filter = currentFilter.value;
  let result: typeof tasks = tasks;
  
  // Filter by completion status based on filter
  if (filter === "active") result = tasks.filter((t: Task) => !t.completed) as typeof tasks;
  else if (filter === "completed") result = tasks.filter((t: Task) => t.completed) as typeof tasks;
  
  // Additionally hide completed if showCompleted is false and filter is "all"
  if (filter === "all" && !showCompleted.value) {
    result = tasks.filter((t: Task) => !t.completed) as typeof tasks;
  }
  
  return result;
});

div({ style: { padding: "20px", maxWidth: "600px", margin: "0 auto" } }, () => {
  h2("Task Manager - Control Flow Demo");
  
  // Each: render filter buttons
  div({ style: { marginBottom: "20px", display: "flex", gap: "10px" } }, () => {
    const filters: Filter[] = ["all", "active", "completed"];
    Each(filters, (filter) => {
      button({
        textContent: filter.charAt(0).toUpperCase() + filter.slice(1),
        style: {
          padding: "8px 16px",
          background: $(() => currentFilter.value === filter ? "#4CAF50" : "#ddd"),
          color: $(() => currentFilter.value === filter ? "white" : "black"),
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        },
        onclick: () => currentFilter.value = filter
      });
    });
  });
  
  // Toggle to show/hide completed tasks
  div({ style: { marginBottom: "20px" } }, () => {
    button({
      textContent: $(() => showCompleted.value ? "Hide Completed" : "Show Completed"),
      onclick: () => showCompleted.value = !showCompleted.value
    });
    
    // Show: conditionally display completed stats
    Show(showCompleted, () => {
      const completedCount = $(() => tasks.filter((t: Task) => t.completed).length);
      p({
        style: { marginTop: "10px", padding: "10px", background: "#e3f2fd", borderRadius: "4px" },
        textContent: $(() => \`Completed: \${completedCount.value} / \${tasks.length}\`)
      });
    });
  });
  
  // Match: display different messages based on filter
  div({ style: { marginBottom: "20px", padding: "10px", background: "#fff3cd", borderRadius: "4px" } }, () => {
    p({
      style: { margin: "0", fontWeight: "bold" },
      textContent: Match(currentFilter, {
        "all": () => "\uD83D\uDCCB Showing all tasks",
        "active": () => "⚡ Showing active tasks",
        "completed": () => "✅ Showing completed tasks",
        _: () => "Unknown filter"
      })
    });
  });
  
  // Each: render the filtered task list
  ul({ style: { listStyle: "none", padding: "0" } }, () => {
    // Show: display message when no tasks match filter
    Show(() => filteredTasks.value.length === 0, () => {
      li({
        style: { padding: "20px", textAlign: "center", color: "#999" },
        textContent: Match(currentFilter, {
          "all": () => "No tasks yet!",
          "active": () => "No active tasks!",
          "completed": () => "No completed tasks!",
          _: () => "No tasks"
        })
      });
    });
    
    Each(filteredTasks, (task: Task) => {
      const taskCompleted = $(Mut(task.completed));
      li({
        style: {
          padding: "12px",
          marginBottom: "8px",
          background: $(() => taskCompleted.value ? "#f1f8f4" : "#fff"),
          border: "1px solid #ddd",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }
      }, () => {
        // Checkbox
        button({
          textContent: $(() => taskCompleted.value ? "✓" : "○"),
          style: {
            width: "24px",
            height: "24px",
            border: "2px solid #4CAF50",
            borderRadius: "50%",
            background: $(() => taskCompleted.value ? "#4CAF50" : "white"),
            color: "white",
            cursor: "pointer",
            fontSize: "14px"
          },
          onclick: () => {
            taskCompleted.value = !taskCompleted.value;
            task.completed = taskCompleted.value;
          }
        });
        
        // Task text
        p({
          style: {
            margin: "0",
            flex: "1",
            textDecoration: $(() => taskCompleted.value ? "line-through" : "none"),
            color: $(() => taskCompleted.value ? "#999" : "#333")
          },
          textContent: task.text
        });
      });
    });
  });
  
  // Add new task button
  button({
    textContent: "Add Random Task",
    style: {
      marginTop: "20px",
      padding: "10px 20px",
      background: "#2196F3",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer"
    },
    onclick: () => {
      const newTask: Task = {
        id: Date.now(),
        text: \`Task \${tasks.length + 1}\`,
        completed: false
      };
      tasks.push(newTask);
    }
  });
});`)}),M("12. Todo App",()=>{H("A complete todo app using Each."),q(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),M("12. Tabs Component",()=>{H("Track active index and conditionally render."),q(`const tabs = ["Home", "About", "Contact"];
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
});`)}),M("13. Async Data Fetching",()=>{H("Use Match for loading states."),q(`const state = $(Mut({
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
});`)}),M("14. Modal Dialog",()=>{H("Modal patterns with explicit types."),q(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var Ef=()=>J({id:"landing-page"},()=>{jf(),Xf(),Yf(),sf(),Af(),If(),Mf()});Ef();
