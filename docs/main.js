var p=void 0,L0=0,C0=0,i=void 0;function Z0(f){if(p){if(!f.subs.includes(p))f.subs.push(p);if(!p.deps.includes(f))p.deps.push(f)}}function H0(f){f.version=++L0;let F=[...f.subs];for(let z of F)if(C0>0){if(!i)i=[];if(!i.includes(z))i.push(z)}else z.execute()}function J0(f){for(let F=0;F<f.deps.length;F++){let z=f.deps[F],D=z.subs.indexOf(f);if(D>-1)z.subs.splice(D,1)}f.deps.length=0}function P(f){let F=!0,z={execute(){if(!F)return;J0(z);let D=p;p=z;try{f()}finally{p=D}},deps:[],cleanup(){F=!1,J0(z)}};return z.execute(),()=>z.cleanup()}function P0(f,F=!1){let z={version:L0,subs:[]},D=f,G=function(J){if(arguments.length>0){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(D,J))D=J,H0(z);return}return Z0(z),D};return Object.defineProperty(G,"value",{get(){return Z0(z),D},set(J){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(D,J))D=J,H0(z)}}),G[B0]=!0,G.peek=()=>D,G}function Lf(f){let F={version:L0,subs:[]},z,D=-1,G={execute(){F.version=++L0;let L=[...F.subs];for(let s of L)if(C0>0){if(!i)i=[];if(!i.includes(s))i.push(s)}else s.execute()},deps:[],cleanup(){J0(G)}},J=()=>{J0(G);let L=p;p=G;try{let s=f();if(!Object.is(z,s))z=s;D=F.version}finally{p=L}};J();let q=function(){if(D!==F.version)J();return Z0(F),z};return Object.defineProperty(q,"value",{get(){return q()}}),q[B0]=!0,q.peek=()=>{if(D!==F.version)J();return z},q}var _0=Symbol("mutable");function V(f){return{value:f,[_0]:!0}}function k(f){return f!==null&&typeof f==="object"&&f[_0]===!0}var $0=Symbol("reactive-proxy"),K0=Symbol("raw");function O0(f){return f!==null&&typeof f==="object"&&$0 in f}function r(f,F=!1){let z=new Map,D=new WeakMap;function G(L){let s=z.get(L);if(!s)s={version:0,subs:[]},z.set(L,s);return s}if(F===!1||F instanceof Set&&F.size===0){let L=!1;for(let s in f)if(k(f[s])){L=!0;break}if(Array.isArray(f)&&!L){for(let s=0;s<f.length;s++)if(k(f[s])){L=!0;break}}if(!L){if(Array.isArray(f))for(let s=0;s<f.length;s++){let Y=f[s];if(Y&&typeof Y==="object"&&!k(Y)&&!O0(Y))f[s]=r(Y,!1)}else for(let s in f){let Y=f[s];if(Y&&typeof Y==="object"&&!k(Y)&&!O0(Y))f[s]=r(Y,!1)}Object.freeze(f)}}return new Proxy(f,{get(L,s,Y){if(s===K0||s==="$raw")return L;if(s===$0)return!0;let w=G(s);Z0(w);let W=Reflect.get(L,s,Y);if(k(W)){let X=D.get(W);if(X?.mutable)return X.mutable;let O=W.value;if(O!==null&&typeof O==="object"){let U=r(O,!0);if(!X)X={},D.set(W,X);return X.mutable=U,U}return O}if(W!==null&&typeof W==="object"&&!O0(W)){let X=typeof F==="boolean"&&F||F instanceof Set&&F.has(s),O=D.get(W);if(O){let Q=X?O.mutable:O.readonly;if(Q)return Q}let U=r(W,X);if(!O)O={},D.set(W,O);if(X)O.mutable=U;else O.readonly=U;return U}return W},set(L,s,Y,w){let W=typeof F==="boolean"&&F||F instanceof Set&&F.has(s),X=Reflect.get(L,s,w);if(!W&&k(X)){if(X.value===null||typeof X.value!=="object"){if(F===!1)F=new Set;if(F instanceof Set)F.add(s);W=!0}}if(!W)return!1;let O=Y!==null&&typeof Y==="object"&&K0 in Y?Y[K0]:Y,U=Array.isArray(L)&&s==="length";if(Object.is(X,O)&&!U)return!0;if(Reflect.set(L,s,O,w),X!==null&&typeof X==="object")D.delete(X);let Q=z.get(s);if(Q)H0(Q);return!0},has(L,s){if(s===$0||s===K0||s==="$raw")return!0;return Reflect.has(L,s)},ownKeys(L){return Reflect.ownKeys(L)},getOwnPropertyDescriptor(L,s){return Reflect.getOwnPropertyDescriptor(L,s)},deleteProperty(L,s){let Y=typeof F==="boolean"&&F||F instanceof Set&&F.has(s);if(!Y){let X=Reflect.get(L,s);if(k(X)){if(X.value===null||typeof X.value!=="object"){if(F===!1)F=new Set;if(F instanceof Set)F.add(s);Y=!0}}}if(!Y)return!1;let w=Reflect.has(L,s),W=Reflect.deleteProperty(L,s);if(w&&W){let X=z.get(s);if(X)H0(X)}return W}})}function A(f,...F){if(typeof f==="function")return Lf(f);if(f!==null&&typeof f==="object"&&!k(f))return r(f,new Set(F));if(k(f)){if(typeof f.value==="object"&&f.value!==null)return r(f.value,!0);return P0(f.value,!1)}return P0(f,!0)}var B0=Symbol("signal");function h(f){return typeof f==="function"&&f[B0]===!0}var A0=[];function x(f){A0.push(f)}function E(){A0.pop()}function R(){return A0[A0.length-1]??document.body}var U0=new WeakMap,Zf=0;function Hf(f,F,z){if(z)return z(f,F);if(typeof f==="object"&&f!==null){if(!U0.has(f))U0.set(f,Zf++);return`_o:${U0.get(f)}`}return`${typeof f}:${f}`}function q0(f,F,z){let D=document.createComment("Each");R().appendChild(D);let G=[],J=new Map;P(()=>{let q=typeof f==="function"&&!Array.isArray(f)?f():f,L=[],s=new Map,Y=new Set;for(let W=0;W<q.length;W++){let X=q[W],O=Hf(X,W,z);if(console.log({item:X,key:O}),Y.has(O))console.warn(`[Each] Duplicate key: "${O}". Keys must be unique.`);Y.add(O);let U=J.get(O);if(U&&(!z||U.item===X))L.push(U),s.set(O,U);else{let Q=document.createDocumentFragment();x(Q);try{F(X,W)}finally{E()}let z0=Array.from(Q.childNodes),M0={key:O,item:X,nodes:z0};if(L.push(M0),s.set(O,M0),U)for(let o of U.nodes)o.parentNode?.removeChild(o)}}for(let W of G)if(!s.has(W.key))for(let X of W.nodes)X.parentNode?.removeChild(X);let w=D;for(let W of L){let X=W.nodes[0];if(!X)continue;if(w.nextSibling!==X){let U=D.parentNode;if(!U)continue;for(let Q of W.nodes)U.insertBefore(Q,w.nextSibling)}w=W.nodes[W.nodes.length-1]||w}G=L,J.clear();for(let[W,X]of s)J.set(W,X)})}var Jf=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),W0=new WeakMap,p0=new Set;function Af(f){let{target:F,type:z}=f;while(F){let D=W0.get(F);if(D&&D[z]){if(Object.defineProperty(f,"currentTarget",{configurable:!0,value:F}),D[z](f),f.cancelBubble)break}F=F.parentElement}}function X0(f,F,z){if(Jf.has(F)){if(!p0.has(F))document.addEventListener(F,Af,{capture:!1,passive:!1}),p0.add(F);let D=W0.get(f);if(!D)D={},W0.set(f,D);D[F]=z}else f.addEventListener(F,z)}if(typeof window<"u")window.__eventHandlerMap=W0;function n(f){return(F,z)=>{let D=document.createElement(f),G,J;if(F===void 0);else if(y(F))J=F;else if(m(F)){if(G=F,z!==void 0)J=z}if(G)d(D,G);let q=[],L=(s)=>q.push(s);if(J){let s=document.createDocumentFragment();x(s);try{J(D,L)}finally{E()}D.appendChild(s)}if(R().appendChild(D),q.length>0)requestAnimationFrame(()=>{for(let s of q)s()});return D}}function T(f){return(F,z,D)=>{let G=document.createElement(f),J,q,L;if(F===void 0);else if(t(F)){if(J=F,z===void 0);else if(y(z))L=z;else if(m(z)){if(q=z,D!==void 0)L=D}}else if(y(F))L=F;else if(m(F)){if(q=F,z!==void 0&&y(z))L=z}if(J!==void 0)l(G,J);if(q)d(G,q);let s=[],Y=(w)=>s.push(w);if(L){let w=document.createDocumentFragment();x(w);try{L(G,Y)}finally{E()}G.appendChild(w)}if(R().appendChild(G),s.length>0)requestAnimationFrame(()=>{for(let w of s)w()});return G}}function h0(f){return(F,z,D)=>{let G=document.createElement(f),J,q,L,s;if(F===void 0);else if(t(F)){if(J=F,z===void 0);else if(x0(z))q=z;else if(y(z))s=z;else if(m(z)){if(L=z,D!==void 0)s=D}}else if(y(F))s=F;else if(m(F)){if(L=F,z!==void 0&&y(z))s=z}if(J!==void 0)l(G,J);if(q)X0(G,"click",q);if(L)d(G,L);let Y=[],w=(W)=>Y.push(W);if(s){let W=document.createDocumentFragment();x(W);try{s(G,w)}finally{E()}G.appendChild(W)}if(R().appendChild(G),Y.length>0)requestAnimationFrame(()=>{for(let W of Y)W()});return G}}function E0(){return(f,F,z)=>{let D=document.createElement("img"),G,J,q;if(f===void 0);else if(typeof f==="string"&&d0(f)){if(G=f,F===void 0);else if(typeof F==="string"){if(J=F,z!==void 0)q=z}else if(m(F))q=F}else if(m(f))q=f;if(G!==void 0)D.src=G;if(J!==void 0)D.alt=J;if(q)d(D,q);return R().appendChild(D),D}}function k0(){return(f,F,z)=>{let D=document.createElement("a"),G,J,q,L;if(f===void 0);else if(typeof f==="string"&&S0(f)){if(G=f,F===void 0);else if(t(F)){if(J=F,z!==void 0)q=z}else if(m(F))q=F}else if(y(f))L=f;else if(m(f)){if(q=f,F!==void 0&&y(F))L=F}if(G!==void 0)D.href=G;if(J!==void 0)l(D,J);if(q)d(D,q);let s=[],Y=(w)=>s.push(w);if(L){let w=document.createDocumentFragment();x(w);try{L(D,Y)}finally{E()}D.appendChild(w)}if(R().appendChild(D),s.length>0)requestAnimationFrame(()=>{for(let w of s)w()});return D}}function t(f){return typeof f==="string"||typeof f==="number"||h(f)&&(typeof f.peek()==="string"||typeof f.peek()==="number")}function x0(f){if(typeof f!=="function")return!1;if(h(f))return!1;return f.length<=1}function S0(f){if(typeof f!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(f)}function d0(f){if(typeof f!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(f)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(f)}var R0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function qf(f){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(f)}function Wf(f,F,z){switch(F){case"value":if("value"in f)f.value=String(z??"");break;case"checked":if("checked"in f)f.checked=Boolean(z);break;case"selected":if("selected"in f)f.selected=Boolean(z);break;case"muted":if("muted"in f)f.muted=Boolean(z);break;case"currentTime":if("currentTime"in f)f.currentTime=Number(z??0);break;case"volume":if("volume"in f)f.volume=Number(z??1);break;case"indeterminate":if("indeterminate"in f)f.indeterminate=Boolean(z);break;case"defaultValue":if("defaultValue"in f)f.defaultValue=String(z??"");break;case"defaultChecked":if("defaultChecked"in f)f.defaultChecked=Boolean(z);break;case"textContent":f.textContent=String(z??"");break;case"innerText":f.innerText=String(z??"");break}}function b0(f,F,z){if(F==="class"||F==="className"||F==="classList")Xf(f,z);else if(F==="style")Qf(f,z);else if(qf(F))Wf(f,F,z);else if(typeof z==="boolean")if(z)f.setAttribute(R0[F]??F,"");else f.removeAttribute(R0[F]??F);else f.setAttribute(R0[F]??F,String(z))}function d(f,F){for(let z in F){let D=F[z];if(D===null||D===void 0)continue;if(z.startsWith("on")&&typeof D==="function"){let G=z.slice(2).toLowerCase();X0(f,G,D)}else if(h(D))P(()=>b0(f,z,D.value));else b0(f,z,D)}}function Xf(f,F){if(typeof F==="string")f.className=F;else if(Array.isArray(F))f.className=F.filter(Boolean).join(" ");else if(typeof F==="object"&&F!==null){let z=!1;for(let G in F)if(h(F[G])){z=!0;break}let D=()=>{let G=[];for(let J in F){let q=F[J];if(h(q)?q.value:q)G.push(J)}f.className=G.join(" ")};if(z)P(D);else D()}}function Yf(f){return typeof f==="object"&&f!==null&&"type"in f&&typeof f.type==="string"}function N0(f){switch(f.type){case"rgb":return f.a!==void 0?`rgba(${f.r}, ${f.g}, ${f.b}, ${f.a})`:`rgb(${f.r}, ${f.g}, ${f.b})`;case"hsl":return f.a!==void 0?`hsla(${f.h}, ${f.s}%, ${f.l}%, ${f.a})`:`hsl(${f.h}, ${f.s}%, ${f.l}%)`;case"hwb":return f.a!==void 0?`hwb(${f.h} ${f.w}% ${f.b}% / ${f.a})`:`hwb(${f.h} ${f.w}% ${f.b}%)`;case"oklch":return f.a!==void 0?`oklch(${f.l}% ${f.c} ${f.h} / ${f.a})`:`oklch(${f.l}% ${f.c} ${f.h})`;case"lab":return f.alpha!==void 0?`lab(${f.l}% ${f.a} ${f.b} / ${f.alpha})`:`lab(${f.l}% ${f.a} ${f.b})`;case"lch":return f.alpha!==void 0?`lch(${f.l}% ${f.c} ${f.h} / ${f.alpha})`:`lch(${f.l}% ${f.c} ${f.h})`;case"oklab":return f.alpha!==void 0?`oklab(${f.l}% ${f.a} ${f.b} / ${f.alpha})`:`oklab(${f.l}% ${f.a} ${f.b})`;case"hex":return f.value;case"color":{let F=f.components.join(" ");return f.alpha!==void 0?`color(${f.space} ${F} / ${f.alpha})`:`color(${f.space} ${F})`}case"color-mix":{let F=typeof f.color1==="object"?N0(f.color1):f.color1,z=typeof f.color2==="object"?N0(f.color2):f.color2,D=f.percentage1!==void 0?`${f.percentage1}%`:"",G=f.percentage2!==void 0?`${f.percentage2}%`:"";return`color-mix(${f.method}, ${F} ${D}, ${z} ${G})`}}}function v0(f){if(f===null||f===void 0)return"";if(Yf(f))return N0(f);return String(f)}function i0(f,F,z){if(F.startsWith("--")){f.setProperty(F,z);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let D=F.replace(/([A-Z])/g,"-$1").toLowerCase();f.setProperty(D,z);return}try{f[F]=z}catch{f.setProperty(F,z)}}function Qf(f,F){if(typeof F==="string")f.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let z=!1;for(let D in F)if(h(F[D])){z=!0;break}if(z)P(()=>{for(let D in F){let G=F[D],J=h(G)?G.value:G;i0(f.style,D,v0(J))}});else for(let D in F){let G=F[D];i0(f.style,D,v0(G))}}}function l(f,F){if(h(F))P(()=>{f.textContent=String(F.value)});else f.textContent=String(F)}function m(f){return typeof f==="object"&&f!==null&&!h(f)&&!Array.isArray(f)}function y(f){return typeof f==="function"&&!h(f)}var C=k0(),V0=E0(),u=h0("button");var u0=T("h1"),n0=T("h2"),s0=T("h3"),G0=T("h4");var a=T("p"),Z=T("div");var Y0=T("section");var c0=T("header"),o0=T("footer");var Q0=T("pre");var I=T("span");var B=T("td"),S=T("th"),b=T("li");var e=n("ul");var T0=n("table"),m0=n("tbody"),y0=n("thead");var v=n("tr");var r0=n("nav");var jf=()=>{if(typeof localStorage<"u"&&localStorage.getItem("fia-theme"))return localStorage.getItem("fia-theme");if(typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark";return"dark"},c=A(V({current:jf()}));P(()=>{let f=c.current;if(typeof localStorage<"u")localStorage.setItem("fia-theme",f);if(typeof document<"u"){if(document.documentElement.setAttribute("data-theme",f),!document.getElementById("fia-theme-styles")){let F=document.createElement("style");F.id="fia-theme-styles",F.textContent=`
                :root {
                    /* Dark Mode (Default) - Fia Brand Colors */
                    --fia-primary: #6366f1;    /* Indigo - vibrant, modern */
                    --fia-accent: #22d3ee;     /* Cyan - electric, energetic */
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
                    --fia-primary: #4f46e5;    /* Darker indigo for contrast */
                    --fia-accent: #06b6d4;     /* Darker cyan for visibility */
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
                    background-image: radial-gradient(circle, rgba(255, 255, 255, 0.25) 1px, transparent 1px);
                    background-size: 40px 40px;
                    color: var(--text-primary);
                    transition: background-color 0.3s ease, color 0.3s ease;
                    cursor: auto;
                }

                [data-theme="light"] body {
                    background-image: radial-gradient(circle, rgba(0, 0, 0, 0.5) 1px, transparent 1px);
                }
            `,document.head.appendChild(F)}if(f==="dark")document.body.classList.add("dark"),document.body.classList.remove("light");else document.body.classList.add("light"),document.body.classList.remove("dark")}});var t0=()=>{c.current=c.current==="dark"?"light":"dark"};var l0={en:{nav:{docs:"Docs",github:"GitHub",examples:"Examples"},hero:{title:"Bare Metal JavaScript",subtitle:"Value Native.",getStarted:"Get Started",viewDocs:"View Docs",features:{reactive:{title:"Fine-Grained",desc:"Signals update only what changes"},performance:{title:"Fast",desc:"Direct DOM, no virtual DOM overhead"},typescript:{title:"Type-Safe",desc:"Full TypeScript support with inference"},bundle:{title:"Tiny",desc:"~4KB gzipped, tree-shakeable"}}},features:{title:"Why Fia?",subtitle:"Everything you need, nothing you don't",items:{noVdom:{title:"Zero Virtual DOM",desc:"Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance."},signals:{title:"Fine-Grained Reactivity",desc:"Signals track dependencies automatically. Only what changes updates."},typescript:{title:"Type Safe",desc:"Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events."},accessibility:{title:"Accessibility First",desc:"WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions."},zeroDeps:{title:"Zero Dependencies",desc:"No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript."},tiny:{title:"Tiny Bundle",desc:"Only ~4KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse."},delegation:{title:"Event Delegation",desc:"Single delegated listener per event type."},batching:{title:"Fragment Batching",desc:"Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing."}}},demo:{tryIt:"Try it yourself",interactive:"Interactive counter demo"},docs:{tableOfContents:"Table of Contents",introduction:"Introduction",whyFia:"Why Fia?",gettingStarted:"Getting Started",elementApi:"Element API",elementFactoryTypes:"Element Factory Types",reactivity:"Reactivity",immutability:"Immutability",controlFlow:"Control Flow",components:"Component Composition",performance:"Performance",installation:{title:"Installation",npm:"npm",bun:"Bun",deno:"Deno"},quickStart:{title:"Quick Start"},coreApi:{title:"Core API",signals:"Signals",elements:"Elements",control:"Control Flow"},examples:{title:"Examples",counter:"Counter",todoList:"Todo List",form:"Form Validation"},bundleSizes:{title:"Bundle Sizes",description:"Fia is designed to be incredibly small while remaining feature-complete.",minimal:"Minimal",full:"Full App",notes:"Notes",tableHeaders:{framework:"Framework",minimal:"Minimal (gzip)",full:"Full App (gzip)",notes:"Notes"}},copyCode:"Copy",copied:"Copied!"},footer:{tagline:"Fine-grained reactivity for modern web",madeWith:"Made with",by:"by Evan"},common:{language:"Language",darkMode:"Dark Mode",lightMode:"Light Mode"}},de:{nav:{docs:"Dokumentation",github:"GitHub",examples:"Beispiele"},hero:{title:"Feinkörnige Reaktivität für das moderne Web",subtitle:"Keine Abhängigkeiten. Reines TypeScript. Blitzschnell.",getStarted:"Loslegen",viewDocs:"Dokumentation",features:{reactive:{title:"Feinkörnig",desc:"Signals aktualisieren nur Änderungen"},performance:{title:"Schnell",desc:"Direktes DOM, kein Virtual DOM Overhead"},typescript:{title:"Typsicher",desc:"Vollständige TypeScript-Unterstützung"},bundle:{title:"Klein",desc:"~4KB gzipped, tree-shakeable"}}},features:{title:"Warum Fia?",subtitle:"Alles was Sie brauchen, nichts was Sie nicht brauchen",items:{noVdom:{title:"Kein Virtual DOM",desc:"Fia aktualisiert das DOM direkt. Kein Diffing, kein Overhead, keine Reconciliation-Kosten. Nur pure Performance."},signals:{title:"Feinkörnige Reaktivität",desc:"Signals verfolgen Abhängigkeiten automatisch. Nur was sich ändert, wird aktualisiert."},typescript:{title:"Typsicher",desc:"Mit TypeScript gebaut, für TypeScript. Genießen Sie vollständige Autovervollständigung und Typinferenz für alle HTML-Attribute und Events."},accessibility:{title:"Barrierefreiheit Zuerst",desc:"WCAG-Konformität eingebaut. Erweiterte ARIA-Typen mit Literalwerten und rollenspezifischen Attributvorschlägen."},zeroDeps:{title:"Keine Abhängigkeiten",desc:"Keine npm-Pakete. Kein Supply-Chain-Risiko. Keine Versionskonflikte. Nur pures JavaScript."},tiny:{title:"Winziges Bundle",desc:"Nur ~4KB gzipped. Kleiner als die meisten Utility-Bibliotheken. Schnell zu laden, schnell zu parsen."},delegation:{title:"Event-Delegation",desc:"Ein einziger delegierter Listener pro Event-Typ."},batching:{title:"Fragment-Batching",desc:"Automatisches DocumentFragment-Batching. Keine Zwischenknoten oder Layout-Thrashing mehr."}}},demo:{tryIt:"Probieren Sie es selbst aus",interactive:"Interaktive Zähler-Demo"},docs:{tableOfContents:"Inhaltsverzeichnis",introduction:"Einführung",whyFia:"Warum Fia?",gettingStarted:"Erste Schritte",elementApi:"Element-API",elementFactoryTypes:"Element-Factory-Typen",reactivity:"Reaktivität",immutability:"Unveränderlichkeit",controlFlow:"Kontrollfluss",components:"Komponentenkomposition",performance:"Leistung",installation:{title:"Installation",npm:"npm",bun:"Bun",deno:"Deno"},quickStart:{title:"Schnellstart"},coreApi:{title:"Kern-API",signals:"Signals",elements:"Elemente",control:"Kontrollfluss"},examples:{title:"Beispiele",counter:"Zähler",todoList:"Aufgabenliste",form:"Formularvalidierung"},bundleSizes:{title:"Bundle-Größen",description:"Fia ist so konzipiert, dass es unglaublich klein und dennoch funktional vollständig ist.",minimal:"Minimal",full:"Vollständige App",notes:"Hinweise",tableHeaders:{framework:"Framework",minimal:"Minimal (gzip)",full:"Vollständige App (gzip)",notes:"Hinweise"}},copyCode:"Kopieren",copied:"Kopiert!"},footer:{tagline:"Feinkörnige Reaktivität für das moderne Web",madeWith:"Gemacht mit",by:"von Evan"},common:{language:"Sprache",darkMode:"Dunkler Modus",lightMode:"Heller Modus"}},el:{nav:{docs:"Τεκμηρίωση",github:"GitHub",examples:"Παραδείγματα"},hero:{title:"Λεπτομερής Αντιδραστικότητα για το Σύγχρονο Web",subtitle:"Χωρίς εξαρτήσεις. Καθαρό TypeScript. Αστραπιαία ταχύτητα.",getStarted:"Ξεκινήστε",viewDocs:"Τεκμηρίωση",features:{reactive:{title:"Λεπτομερής",desc:"Τα Signals ενημερώνουν μόνο τις αλλαγές"},performance:{title:"Γρήγορο",desc:"Άμεσο DOM, χωρίς Virtual DOM overhead"},typescript:{title:"Τυποασφαλές",desc:"Πλήρης υποστήριξη TypeScript"},bundle:{title:"Μικρό",desc:"~4KB gzipped, tree-shakeable"}}},features:{title:"Γιατί Fia;",subtitle:"Όλα όσα χρειάζεστε, τίποτα που δεν χρειάζεστε",items:{noVdom:{title:"Χωρίς Virtual DOM",desc:"Το Fia ενημερώνει το DOM απευθείας. Χωρίς diffing, χωρίς overhead, χωρίς κόστος συμφωνίας. Μόνο καθαρή απόδοση."},signals:{title:"Λεπτομερής Αντιδραστικότητα",desc:"Τα Signals παρακολουθούν τις εξαρτήσεις αυτόματα. Μόνο αυτό που αλλάζει ενημερώνεται."},typescript:{title:"Τυποασφαλές",desc:"Χτισμένο με TypeScript, για TypeScript. Απολαύστε πλήρη αυτόματη συμπλήρωση και συμπερασμό τύπων για όλα τα χαρακτηριστικά και συμβάντα HTML."},accessibility:{title:"Προσβασιμότητα Πρώτα",desc:"Ενσωματωμένη συμμόρφωση WCAG. Προηγμένοι τύποι ARIA με κυριολεκτικές τιμές και προτάσεις χαρακτηριστικών ανά ρόλο."},zeroDeps:{title:"Χωρίς Εξαρτήσεις",desc:"Χωρίς πακέτα npm. Χωρίς κίνδυνο εφοδιαστικής αλυσίδας. Χωρίς συγκρούσεις εκδόσεων. Μόνο καθαρό JavaScript."},tiny:{title:"Μικροσκοπικό Bundle",desc:"Μόνο ~4KB gzipped. Μικρότερο από τις περισσότερες βιβλιοθήκες εργαλείων. Γρήγορο στη λήψη, γρήγορο στην ανάλυση."},delegation:{title:"Ανάθεση Συμβάντων",desc:"Ένας μόνο ανατεθειμένος ακροατής ανά τύπο συμβάντος."},batching:{title:"Ομαδοποίηση Fragment",desc:"Αυτόματη ομαδοποίηση DocumentFragment. Όχι άλλοι ενδιάμεσοι κόμβοι ή thrashing διάταξης."}}},demo:{tryIt:"Δοκιμάστε το μόνοι σας",interactive:"Διαδραστική επίδειξη μετρητή"},docs:{tableOfContents:"Πίνακας Περιεχομένων",introduction:"Εισαγωγή",whyFia:"Γιατί Fia;",gettingStarted:"Ξεκινώντας",elementApi:"Element API",elementFactoryTypes:"Τύποι Element Factory",reactivity:"Αντιδραστικότητα",immutability:"Αμεταβλητότητα",controlFlow:"Ροή Ελέγχου",components:"Σύνθεση Στοιχείων",performance:"Απόδοση",installation:{title:"Εγκατάσταση",npm:"npm",bun:"Bun",deno:"Deno"},quickStart:{title:"Γρήγορη Έναρξη"},coreApi:{title:"Κύριο API",signals:"Signals",elements:"Στοιχεία",control:"Ροή Ελέγχου"},examples:{title:"Παραδείγματα",counter:"Μετρητής",todoList:"Λίστα Εργασιών",form:"Επικύρωση Φόρμας"},bundleSizes:{title:"Μεγέθη Bundle",description:"Το Fia είναι σχεδιασμένο να είναι απίστευτα μικρό ενώ παραμένει πλήρως λειτουργικό.",minimal:"Ελάχιστο",full:"Πλήρης Εφαρμογή",notes:"Σημειώσεις",tableHeaders:{framework:"Framework",minimal:"Ελάχιστο (gzip)",full:"Πλήρης Εφαρμογή (gzip)",notes:"Σημειώσεις"}},copyCode:"Αντιγραφή",copied:"Αντιγράφηκε!"},footer:{tagline:"Λεπτομερής αντιδραστικότητα για το σύγχρονο web",madeWith:"Φτιαγμένο με",by:"από τον Evan"},common:{language:"Γλώσσα",darkMode:"Σκοτεινή Λειτουργία",lightMode:"Φωτεινή Λειτουργία"}}};var If=()=>{if(typeof localStorage<"u"){let f=localStorage.getItem("fia-language");if(f&&(f==="en"||f==="de"||f==="el"))return f}if(typeof navigator<"u"){let f=navigator.language.toLowerCase();if(f.startsWith("de"))return"de";if(f.startsWith("el"))return"el"}return"en"},a0=A(V({currentLanguage:If()})),M=A(()=>l0[a0.currentLanguage]);P(()=>{let f=a0.currentLanguage;if(typeof localStorage<"u")localStorage.setItem("fia-language",f);if(typeof document<"u")document.documentElement.setAttribute("lang",f)});var e0=()=>r0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{Z({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{I({style:{color:"var(--fia-primary)"},textContent:"fia"})}),Z({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{C({href:"#docs",style:{fontWeight:"500"},textContent:A(()=>M.value.nav.docs)}),C({href:"https://github.com/o-sofos/fia",target:"_blank",style:{fontWeight:"500"},textContent:A(()=>M.value.nav.github)}),u({style:{background:"none",border:"none",cursor:"pointer",padding:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:A(()=>c.current==="dark"?"var(--text-primary)":"var(--fia-primary)")},onclick:t0,title:A(()=>c.current==="dark"?M.value.common.lightMode:M.value.common.darkMode)},()=>{I({textContent:A(()=>c.current==="dark"?"\uD83C\uDF19":"☀️")})})})});var ff=()=>c0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{u0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{Z({textContent:A(()=>M.value.hero.title)}),Z({class:"text-gradient",textContent:A(()=>M.value.hero.subtitle)})}),a({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.8",position:"relative",zIndex:"1",display:"flex",flexWrap:"wrap",gap:"0.5rem 1.5rem",justifyContent:"center",alignItems:"center"}},()=>{["Immutability by Design","No JSX","No Virtual DOM","No Dependencies"].forEach((F)=>{I({style:{display:"inline-flex",alignItems:"center",gap:"0.5rem"}},()=>{I({style:{color:"var(--fia-primary)",fontSize:"0.8em"},textContent:"✦"}),I({textContent:F})})})}),Z({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{u({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:A(()=>M.value.hero.getStarted)}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),Z({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--fia-primary), var(--fia-accent))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),Z({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--fia-primary)",opacity:"0.1",zIndex:"0"}}),Z({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--fia-primary)",opacity:"0.2",boxShadow:"0 0 20px var(--fia-primary)",zIndex:"0",animationDelay:"1s"}}),Z({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--fia-primary) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),Z({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function j0(f,F=10){let z,D=()=>{z=f.getBoundingClientRect(),f.style.transition="transform 0.1s ease-out"},G=(q)=>{if(!z)z=f.getBoundingClientRect();let L=q.clientX-z.left,s=q.clientY-z.top,Y=z.width/2,w=z.height/2,W=(s-w)/w*-F,X=(L-Y)/Y*F;f.style.transform=`
            perspective(1000px)
            rotateX(${W}deg)
            rotateY(${X}deg)
            scale3d(1.02, 1.02, 1.02)
        `},J=()=>{f.style.transition="transform 0.5s ease-out",f.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return f.addEventListener("mouseenter",D),f.addEventListener("mousemove",G),f.addEventListener("mouseleave",J),()=>{f.removeEventListener("mouseenter",D),f.removeEventListener("mousemove",G),f.removeEventListener("mouseleave",J)}}var g=(f)=>{R().appendChild(document.createTextNode(f))},Ff=()=>Z({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{Z({style:{borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--fia-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(f)=>{j0(f,5),Z({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{Z({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),Z({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),Z({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let F=(G)=>I({style:{color:"var(--syntax-keyword)"},textContent:G}),z=(G)=>I({style:{color:"var(--syntax-function)"},textContent:G}),D=(G)=>I({style:{color:"var(--syntax-string)"},textContent:G});Q0({style:{transform:"translateZ(40px)"}},()=>{Z(()=>{F("import"),g(" { $, div, button, Mut } "),F("from"),D(' "fia"'),g(";")}),g(" "),Z(()=>{F("const"),g(" count = "),z("$"),g("("),z("Mut"),g("(0));")}),g(" "),Z(()=>{z("button"),g("("),D('"Increment"'),g(", () => count.value++);")}),g(" "),Z(()=>{z("div"),g("("),z("$"),g("(() => "),D("`Count: ${count.value}`"),g("));")})})})});var zf=()=>Y0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{A(()=>[{key:"noVdom",icon:"⚡"},{key:"signals",icon:"\uD83C\uDFAF"},{key:"typescript",icon:"\uD83D\uDEE1️"},{key:"accessibility",icon:"♿"},{key:"zeroDeps",icon:"\uD83D\uDCE6"},{key:"tiny",icon:"⚖️"},{key:"delegation",icon:"\uD83C\uDFAA"},{key:"batching",icon:"\uD83D\uDE80"}]).value.forEach(({key:F,icon:z})=>{let D=A(()=>M.value.features.items[F].title),G=A(()=>M.value.features.items[F].desc);Z({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(J)=>{j0(J,15),Z({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:z}),s0({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--fia-primary)",fontWeight:"600",transform:"translateZ(10px)"},textContent:D}),a({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:G})})})});var Df=()=>o0({style:{borderTop:"1px solid var(--fia-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{Z({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{Z({style:{marginBottom:"0.5rem",fontWeight:"500"},textContent:A(()=>M.value.footer.tagline)}),Z({style:{marginBottom:"1rem"},textContent:A(()=>`${M.value.footer.madeWith} ❤️ ${M.value.footer.by}`)}),Z({textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var wf=(f)=>{R().appendChild(document.createTextNode(f))},I0=(f)=>{let w=new Set(["const","let","var","import","from","export","default","function","return","if","else","for","while","do","switch","case","break","continue","new","delete","typeof","instanceof","class","extends","implements","interface","type","enum","async","await","yield","throw","try","catch","finally","true","false","null","undefined","void","this","super","of","in","as"]),W=new Set(["string","number","boolean","object","any","never","unknown","Array","Promise","Map","Set","Record","Partial","Required","Signal","Mut","MaybeSignal"]),X=new Set(["div","button","h1","h2","h3","h4","h5","h6","p","ul","ol","li","input","span","section","article","nav","form","table","tr","td","th","a","img","pre","code","header","footer","main","aside","label","select","option","textarea","strong","em","canvas","video","audio","console","document","window","navigator","Show","Each","Match","$","Mut","setTimeout","setInterval","requestAnimationFrame","map","filter","forEach","reduce","find","some","every","push","pop","splice","slice","join","split","JSON","Math","Object","Number","String"]),O=/\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|=>|[{}()\[\];,.]|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[+\-*/%=!<>&|?:~^]+|\s+|./g,U=f.match(O)||[];U.forEach((Q,z0)=>{if(Q.startsWith("//")||Q.startsWith("/*"))I({style:{color:"var(--syntax-comment)",fontStyle:"italic"},textContent:Q});else if(Q.startsWith("`"))Q.split(/(\$\{[^}]*\})/).forEach((o)=>{if(o.startsWith("${")){I({style:{color:"#89ddff"},textContent:"${"});let D0=o.slice(2,-1);if(X.has(D0)||w.has(D0))I({style:{color:X.has(D0)?"var(--syntax-function)":"var(--syntax-keyword)"},textContent:D0});else I({style:{color:"var(--text-primary)"},textContent:D0});I({style:{color:"#89ddff"},textContent:"}"})}else I({style:{color:"var(--syntax-string)"},textContent:o})});else if(Q.startsWith('"')||Q.startsWith("'"))I({style:{color:"var(--syntax-string)"},textContent:Q});else if(Q==="=>")I({style:{color:"#89ddff"},textContent:Q});else if(/^\d+(\.\d+)?$/.test(Q))I({style:{color:"#f78c6c"},textContent:Q});else if(w.has(Q))I({style:{color:"var(--syntax-keyword)",fontStyle:Q==="this"?"italic":"normal"},textContent:Q});else if(W.has(Q))I({style:{color:"#ffcb6b"},textContent:Q});else if(/^[a-zA-Z_$]/.test(Q)&&U[z0+1]?.trim()==="(")if(X.has(Q))I({style:{color:"var(--syntax-function)"},textContent:Q});else I({style:{color:"var(--syntax-function)"},textContent:Q});else if(X.has(Q))I({style:{color:"var(--syntax-function)"},textContent:Q});else if(z0>0&&U[z0-1]==="."&&/^[a-zA-Z_$]/.test(Q))I({style:{color:"#82aaff"},textContent:Q});else if(/^[{}()\[\];,.]$/.test(Q))I({style:{color:"#89ddff"},textContent:Q});else if(/^[+\-*/%=!<>&|?:~^]+$/.test(Q))I({style:{color:"#89ddff"},textContent:Q});else wf(Q)})};var w0=(f)=>{let F=A(V(0));Z({style:{marginBottom:"1.5rem"}},()=>{Z({style:{display:"flex",gap:"4px",borderBottom:"1px solid #e0e0e0",marginBottom:"1rem"}},()=>{q0(f,(z,D)=>{u({textContent:z.label,style:{padding:"8px 16px",background:A(()=>F.value===D?"#2563eb":"transparent"),color:A(()=>F.value===D?"white":"#666"),border:"none",borderBottom:A(()=>F.value===D?"2px solid #2563eb":"2px solid transparent"),cursor:"pointer",fontSize:"14px",fontWeight:A(()=>F.value===D?"600":"400"),transition:"all 0.2s"},onclick:()=>F.value=D})})}),Z({style:{position:"relative"}},()=>{q0(f,(z,D)=>{Z({style:{display:A(()=>F.value===D?"block":"none"),background:"#1e1e1e",color:"#d4d4d4",padding:"1rem",borderRadius:"4px",overflow:"auto",fontFamily:"monospace",fontSize:"14px",whiteSpace:"pre"}},()=>{I0(z.code)})})})})};var F0=(f)=>{R().appendChild(document.createTextNode(f))},H=(f)=>Z({class:"code-block animate-fade-up",style:{borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--fia-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{Z({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{Z({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{Z({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),Z({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),Z({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=A(V(!1));u({textContent:A(()=>F.value?M.value.docs.copied:M.value.docs.copyCode),style:{background:"transparent",border:"1px solid var(--fia-slate)",color:A(()=>F.value?"var(--fia-primary)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(f),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),Q0({style:{margin:"0",overflowX:"auto"}},()=>{I0(f)})}),Mf=(f)=>{let F=document.createElement("div");F.textContent=f,Object.assign(F.style,{position:"fixed",bottom:"2rem",left:"50%",transform:"translateX(-50%) translateY(20px)",background:"var(--fia-primary)",color:"var(--fia-dark)",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:"600",fontSize:"0.875rem",zIndex:"9999",opacity:"0",transition:"opacity 0.3s, transform 0.3s",pointerEvents:"none",boxShadow:"0 4px 20px rgba(0, 237, 100, 0.3)"}),document.body.appendChild(F),requestAnimationFrame(()=>{F.style.opacity="1",F.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{F.style.opacity="0",F.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>F.remove(),300)},2000)},g0=(f)=>{C({href:`#${f}`,ariaLabel:"Link to this section",style:{opacity:"0",marginLeft:"0.5rem",color:"var(--text-tertiary)",textDecoration:"none",fontSize:"0.75em",transition:"opacity 0.2s, color 0.2s",cursor:"pointer",flexShrink:"0"},className:"anchor-link",textContent:"\uD83D\uDD17",onclick:(F)=>{F.preventDefault(),history.replaceState(null,"",`#${f}`);let z=window.location.href;navigator.clipboard.writeText(z).then(()=>{Mf("✓ Link copied to clipboard")});let D=document.getElementById(f);if(D){let J=D.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:J,behavior:"smooth"})}}})},_=(f,F,z)=>{Y0({id:F,class:"animate-fade-up heading-group",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{Z({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{Z({style:{width:"4px",height:"32px",background:"var(--fia-primary)",borderRadius:"2px"}}),n0({style:{fontSize:"2rem",color:"var(--fia-white)",letterSpacing:"-0.5px"},textContent:typeof f==="function"?A(f):f}),g0(F)}),z()})},$=(f,F,z)=>{let D=typeof F==="string"?F:f.toLowerCase().replace(/\s+/g,"-"),G=typeof F==="function"?F:z;Z({class:"heading-group",style:{marginBottom:"3rem",paddingBottom:"2rem",borderBottom:"1px solid var(--border-subtle)"}},()=>{Z({style:{display:"flex",alignItems:"center",marginBottom:"1.5rem"}},()=>{s0({id:D,style:{color:"var(--fia-primary)",fontSize:"1.5rem",scrollMarginTop:"120px"},textContent:f}),g0(D)}),G()})},j=(f,F,z)=>{let D=typeof F==="string"?F:f.toLowerCase().replace(/\s+/g,"-"),G=typeof F==="function"?F:z;Z({class:"heading-group",style:{marginBottom:"1.5rem"}},()=>{Z({style:{display:"flex",alignItems:"center",marginBottom:"0.75rem"}},()=>{G0({id:D,style:{fontSize:"1.2rem",color:"var(--fia-white)",fontWeight:"600",scrollMarginTop:"120px"},textContent:f}),g0(D)}),G()})},K=(f)=>a({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>F0(f)),f0=(f)=>e({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{f.forEach((F)=>b(F))}),N=(f,F="info")=>Z({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--fia-primary)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--fia-primary)"}},()=>F0(f)),sf=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"bundle-sizes",title:"Bundle Sizes"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow",children:[{id:"control-flow-show",title:"Show"},{id:"control-flow-each",title:"Each"},{id:"control-flow-match",title:"Match",children:[{id:"match-strings",title:"Strings"},{id:"match-booleans",title:"Booleans"},{id:"match-numbers",title:"Numbers"}]}]},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],Of=()=>{let f=A(V("intro")),F=[];for(let D of sf)if(F.push(D.id),D.children){for(let G of D.children)if(F.push(G.id),G.children)for(let J of G.children)F.push(J.id)}let z=()=>{let D=window.scrollY+150,G=F[0];for(let J of F){let q=document.getElementById(J);if(q){if(q.getBoundingClientRect().top+window.scrollY<=D)G=J}}f.value=G};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",z),z()},0);return Z({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{Z({style:{borderLeft:"2px solid var(--fia-slate)",paddingLeft:"1rem"}},()=>{s0({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),e({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{let D=(G)=>{let J=[];if(G.children)for(let q of G.children)J.push(q.id),J.push(...D(q));return J};sf.forEach((G)=>{let J=D(G),q=()=>f.value===G.id||J.includes(f.value);b({style:{marginBottom:"0.5rem"}},()=>{if(C({href:`#${G.id}`,style:{color:A(()=>q()?"var(--fia-primary)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:A(()=>q()?"600":"400"),borderLeft:A(()=>q()?"2px solid var(--fia-primary)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:G.title,onclick:(L)=>{L.preventDefault();let s=document.getElementById(G.id);if(s){let w=s.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:w,behavior:"smooth"}),f.value=G.id}}}),G.children)e({style:{listStyle:"none",padding:"0",marginTop:"0.5rem"}},()=>{G.children.forEach((L)=>{b({style:{marginBottom:"0.25rem"}},()=>{if(C({href:`#${L.id}`,style:{color:A(()=>f.value===L.id?"var(--fia-primary)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.8rem",display:"block",padding:"0.25rem 0 0.25rem 1.5rem",transition:"color 0.2s",fontWeight:A(()=>f.value===L.id?"600":"400")},textContent:L.title,onclick:(s)=>{s.preventDefault();let Y=document.getElementById(L.id);if(Y){let W=Y.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:W,behavior:"smooth"})}f.value=L.id}}),L.children)e({style:{listStyle:"none",padding:"0",marginTop:"0.25rem"}},()=>{L.children.forEach((s)=>{b({style:{marginBottom:"0.25rem"}},()=>{C({href:`#${s.id}`,style:{color:A(()=>f.value===s.id?"var(--fia-primary)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.75rem",display:"block",padding:"0.25rem 0 0.25rem 3rem",transition:"color 0.2s",fontWeight:A(()=>f.value===s.id?"600":"400")},textContent:s.title,onclick:(Y)=>{Y.preventDefault();let w=document.getElementById(s.id);if(w){let X=w.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:X,behavior:"smooth"})}f.value=s.id}})})})})})})})})})})})})},Gf=()=>Z({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{Of(),Z({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{Z({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{V0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{V0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),_(()=>M.value.docs.introduction,"intro",()=>{K("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),_(()=>M.value.docs.whyFia,"why-fia",()=>{K("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),e({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{b({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),F0("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),b({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),F0("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),b({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),F0("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),b({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),F0("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),_(()=>M.value.docs.bundleSizes.title,"bundle-sizes",()=>{K("Fia is designed to be lightweight with excellent tree-shaking support. Import only what you need:"),Z({style:{marginTop:"2rem",marginBottom:"2rem",overflowX:"auto"}},()=>{T0({style:{width:"100%",borderCollapse:"collapse",borderRadius:"0.75rem",overflow:"hidden"}},()=>{y0(()=>{v({style:{background:"rgba(0, 237, 100, 0.1)"}},()=>{S({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:"Entry Point"}),S({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"Gzip"}),S({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"Brotli"}),S({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:"Use Case"})})}),m0(()=>{v({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{B({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{I({textContent:"fia/signals"})}),B({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"1.46 KB"}),B({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"1.28 KB"}),B({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Reactive state without DOM"})}),v({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{B({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{I({textContent:"fia/control"})}),B({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"2.16 KB"}),B({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"1.90 KB"}),B({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Control flow (Show, Each)"})}),v({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{B({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{I({textContent:"fia/elements"})}),B({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"4.05 KB"}),B({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"3.58 KB"}),B({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"UI with 3 elements"})}),v({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{B({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{I({textContent:"fia/svg"})}),B({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"~4 KB"}),B({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"~3.5 KB"}),B({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"SVG graphics"})}),v(()=>{B({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{I({textContent:"fia"}),I({style:{marginLeft:"0.5rem",color:"var(--text-secondary)",fontSize:"0.875rem"},textContent:"(full)"})}),B({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"8.21 KB"}),B({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"7.25 KB"}),B({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Complete library"})})})})}),$("Framework Comparison",()=>{K("How Fia compares to other popular frameworks (minified + gzipped):"),Z({style:{marginTop:"1.5rem",marginBottom:"2rem",overflowX:"auto"}},()=>{T0({style:{width:"100%",borderCollapse:"collapse",borderRadius:"0.75rem",overflow:"hidden"}},()=>{y0(()=>{v({style:{background:"rgba(0, 237, 100, 0.1)"}},()=>{S({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:A(()=>M.value.docs.bundleSizes.tableHeaders.framework)}),S({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:A(()=>M.value.docs.bundleSizes.tableHeaders.minimal)}),S({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:A(()=>M.value.docs.bundleSizes.tableHeaders.full)}),S({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:A(()=>M.value.docs.bundleSizes.tableHeaders.notes)})})}),m0(()=>{let f=[{name:"Fia",minimal:"1.46 KB",full:"~3.9 KB",notes:"Zero dependencies",highlight:!0},{name:"Preact",minimal:"~3 KB",full:"~3.5 KB",notes:"Lightweight champion",highlight:!1},{name:"Svelte",minimal:"~2-3 KB",full:"~4 KB",notes:"Compiler magic",highlight:!1},{name:"Solid",minimal:"~6-7 KB",full:"~6.5 KB",notes:"Fine-grained reactivity",highlight:!1},{name:"Vue",minimal:"~17 KB",full:"~22 KB",notes:"Tree-shakable",highlight:!1},{name:"React",minimal:"~7 KB",full:"~42 KB",notes:"Standard + VDOM",highlight:!1},{name:"Angular",minimal:"N/A",full:"~85 KB",notes:"Full framework",highlight:!1}];f.forEach((F,z)=>{v({style:{borderBottom:z<f.length-1?"1px solid var(--fia-slate)":"none"}},()=>{B({style:{padding:"1rem",color:F.highlight?"var(--fia-primary)":"var(--fia-white)",fontWeight:F.highlight?"700":"600"},textContent:F.name}),B({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:F.highlight?"600":"normal"},textContent:F.minimal}),B({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:F.highlight?"600":"normal"},textContent:F.full}),B({style:{padding:"1rem",color:"var(--text-secondary)",fontSize:"0.875rem"},textContent:F.notes})})})})})}),N("All sizes are minified + gzipped. Fia's tree-shaking ensures you only bundle what you use.","info")})}),_(()=>M.value.docs.gettingStarted,"getting-started",()=>{$("Prerequisites",()=>{K("Fia is compatible with any modern JavaScript runtime."),f0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),$("Installation",()=>{K("Fia is published on JSR. Install it using your preferred package manager:"),Z({style:{marginBottom:"1rem"}},()=>{G0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Deno"}),H("deno add jsr:@fia/core")}),Z({style:{marginBottom:"1rem"}},()=>{G0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Bun"}),K('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),K("2. Install (aliased as 'fia'):"),H("bun add fia@npm:@jsr/fia__core")}),Z({style:{marginBottom:"1rem"}},()=>{G0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),H("npx jsr add @fia/core")}),N("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),$("Updating",()=>{K("To update to the latest version, run the installation command again (or use your package manager's update command)."),H(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),$("Quick Start",()=>{K("Create your first reactive app in seconds."),H(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),$("Mounting",()=>{K("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),H(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),_(()=>M.value.docs.elementApi,"element-api",()=>{K("Fia elements have a simple, consistent API. Functions match HTML tag names."),H(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),j("Event Handlers",()=>{K("Event handlers are delegated automatically for performance."),H(`button("Click me", () => console.log("clicked!"));

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),j("Nesting Elements",()=>{K("Use a callback function to nest elements."),H(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),j("Void Elements",()=>{K("Elements like input, img, br only accept props."),H(`input({ type: "email", placeholder: "you@example.com" });
img("/photo.jpg", "Photo");
br();`)}),j("onMount Callback",()=>{K("Access layout properties after the element is in the DOM."),H(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),_(()=>M.value.docs.elementFactoryTypes,"element-factory-types",()=>{K("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),$("Standard Elements",()=>{K("Used for semantic structure elements. Click each tab to see the different patterns for creating an article:"),w0([{label:"Empty",code:`// Empty element
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
});`}]),N("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),$("Text Elements",()=>{K("Optimized for elements that commonly hold text content. Click each tab to see different ways to create the same heading:"),w0([{label:"Empty",code:`// Empty element
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
});`}]),N("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),$("Interactive Elements",()=>{K("Special factories for interactive elements with convenient text + click handler shorthand:"),w0([{label:"Text + Click ",code:`// Text + click handler shorthand
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
});`}]),N("Elements: button, summary, option, optgroup.")}),$("Void Elements",()=>{K("Self-closing elements that cannot have children."),H(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),N("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),$("Type Safety Benefits",()=>{K("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),H(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),_(()=>M.value.docs.reactivity,"reactivity",()=>{$("Signals",()=>{K("Signals are the primitive units of reactivity."),H(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),$("Reactive Stores",()=>{K("Fia stores are immutable by default for predictability."),H(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),N("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),N("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),$("Computed Values",()=>{K("Computed signals automatically track dependencies and update when they change."),H(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),$("Effects",()=>{K("Use $e() to run side effects when dependencies change."),H(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),_(()=>M.value.docs.immutability,"immutability",()=>{K("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),$("Data Types & Behavior",()=>{j("1. Primitives (String, Number, Boolean)",()=>{K("Primitives are immutable by default. To make them mutable, use Mut."),H(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),j("2. Objects",()=>{K("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),H(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),K("Mutable Objects:"),H(`// Option A: Specific keys
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
// unless the parent key is also mutable.`)}),j("Secure Immutability by Design",()=>{K("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),H(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),N("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),j("3. Arrays",()=>{K("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),H(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),K("Mutable Arrays:"),H(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),j("4. Nested Objects (Deep Reactivity)",()=>{K("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),H(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),_(()=>M.value.docs.controlFlow,"control-flow",()=>{$("Show","control-flow-show",()=>{K("Conditionally render content that updates when the condition changes."),H('Show(() => isVisible.value, () => div("Hello!"));')}),$("Each","control-flow-each",()=>{K("High-performance keyed list rendering with efficient reconciliation. Each automatically assigns stable keys to items - no key function needed! Minimizes DOM operations by reusing existing nodes instead of recreating them."),j("Automatic Key Assignment",()=>{K("Each automatically assigns stable keys to both primitives and objects:"),H(`// Primitives: automatically keyed by value
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
// ✅ State, focus, scroll position preserved`)}),j("Custom Key Function (Optional)",()=>{K("For explicit control (e.g., database IDs), provide a custom key function:"),H(`// Optional: use database ID as key
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
);`),N("How automatic keying works: Objects/arrays get stable internal IDs via WeakMap (no memory leaks). Primitives are keyed by type:value. Custom keyFn takes precedence when provided.","info")}),j("When to Use Custom Keys",()=>{K("Automatic keying works great in most cases, but provide a custom keyFn when:"),H(`// ✅ Automatic keying works:
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
Each(users, (user) => div(user.name), (user) => user.id);`),N(`Warning: If duplicate keys are detected, Each will log: '[Each] Duplicate key: "...". Keys must be unique.' Check the console and provide a custom keyFn if needed.`,"warning")}),j("Performance Characteristics",()=>{K("Each uses keyed reconciliation (automatic or custom) to achieve O(1) performance for common operations:"),N("Add 1 item to 1000: O(1) - creates 1 node (~0.5ms)","info"),N("Remove 1 item from 1000: O(1) - removes 1 node (~0.3ms)","info"),N("Move/reorder items: O(1) - moves nodes (~0.2ms)","info"),N("Preserves: input focus, scroll position, component state","info"),H(`// Performance comparison
const items = Array(1000).fill(0).map((_, i) => ({ id: i, value: i }));

// Old approach (no keying):
// - Adding 1 item: Recreates all 1001 nodes (~150ms) - 300x slower!
// - Input focus is lost ❌

// Fia Each (automatic keying):
// - Adding 1 item: Creates 1 node (~0.5ms)
// - Input focus is preserved ✅
// - State and scroll position preserved ✅`)}),j("Custom Key Function Best Practices",()=>{K("While automatic keying works great, you may want custom keys for specific use cases:"),H(`// ✅ Good: Database ID (explicit control)
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
(item) => item.category`),N("When to use custom keys: Database objects with existing IDs, cross-system synchronization, debugging (readable keys in DevTools). When automatic keying is fine: Most common cases, primitive arrays, local component state.","info")}),j("Real-World Example",()=>{K("Complete todo list with add, remove, and toggle functionality:"),H(`const state = $({
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
});`)}),j("Performance Tips",()=>{f0(["Automatic keying works for most use cases (objects get stable IDs, primitives keyed by value)","Use custom key function for explicit control (database IDs, cross-system sync)","Custom keys are optional but useful for debugging (readable keys in DevTools)","Batch multiple updates with batch() for better performance","Same O(1) performance whether using automatic or custom keys"])})}),$("Match","control-flow-match",()=>{K("Reactive pattern matching for switch/case logic. Automatically updates rendering when the matched value changes."),K("Match accepts signals or getter functions, and returns Signal<R> with '_' default or Signal<R | undefined> without."),j("Strings","match-strings",()=>{K("Match exact string values:"),H(`const status = $(Mut("active"));

Match(status, {
  "active": () => span({ class: "success" }, () => text("Active")),
  "inactive": () => span({ class: "danger" }, () => text("Inactive")),
  "pending": () => span({ class: "warning" }, () => text("Pending")),
  _: () => span("Unknown")
});`)}),j("Booleans","match-booleans",()=>{K("Boolean values are automatically converted to string keys:"),H(`const isActive = $(Mut(true));

Match(isActive, {
  "true": () => "✅ Active",
  "false": () => "❌ Inactive"
});`)}),j("Numbers","match-numbers",()=>{K("Numbers support exact matching:"),H(`const count = $(Mut(2));

Match(count, {
  "0": () => "None",
  "1": () => "One",
  "2": () => "Two",
  _: () => "Many"
});`),K("For numeric values, Match also supports range-based comparisons using operators and interval notation:"),H(`const age = $(Mut(25));

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
});`),N("Range patterns only work with numeric values. Exact string matches are checked before range patterns.","info")})})}),_(()=>M.value.docs.components,"components",()=>{K("In Fia, components are just functions. There is no special class or type."),$("Basic Component",()=>{H(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),$("Children & Layouts",()=>{K("To create wrapper components, pass a callback function as a child prop."),H(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),_(()=>M.value.docs.performance,"performance",()=>{K("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),$("Event Delegation",()=>{K("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),H(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),j("How it works",()=>{f0(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),j("Benefits",()=>{f0(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),H(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),$("Automatic Fragment Batching",()=>{K("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),H(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),j("How it works",()=>{f0(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),j("Benefits",()=>{f0(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),H(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),$("Fine-Grained Reactivity",()=>{K("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),H(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),$("Best Practices",()=>{j("1. Batch Multiple Updates",()=>{H(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),j("2. Use peek() for Non-Reactive Reads",()=>{H(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),j("3. Memoize Expensive Computations",()=>{H(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),_(()=>M.value.docs.examples.title,"examples",()=>{$("\uD83D\uDFE2 Beginner",()=>{j("1. Hello World",()=>{K("The simplest possible Fia code."),H('h1("Hello, World!");')}),j("2. Counter",()=>{K("Signals hold reactive state."),H(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),j("3. Toggle",()=>{K("Computed signals derive values from other signals."),H(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
Show(visible, () => p("Now you see me!"));`)}),j("4. Input Binding",()=>{K("Two-way binding is manual but explicit."),H('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),j("5. List Rendering (Static)",()=>{K("For simple static lists, forEach works fine."),H(`const items = ["Apple", "Banana", "Cherry"];
ul(() => Each(items, li));`)})}),$("\uD83D\uDFE1 Intermediate",()=>{j("6. Reactive Store Counter",()=>{K("Objects passed to $() become reactive stores."),H(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),j("7. Conditional Classes",()=>{K("Computed signals work in class props too."),H(`const active = $(Mut(false));
button($(() => active.value ? "Deactivate" : "Activate"), () => active.value = !active.value);`)}),j("8. Form Handling",()=>{K("Reactive stores are perfect for forms."),H(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),j("9. Computed Values",()=>{K("Track dependencies automatically."),H('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),j("10. Dynamic Styling",()=>{K("Reactive styles allow theming."),H(`const theme = $(Mut("light"));

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
});`)})}),$("\uD83D\uDD34 Advanced",()=>{j("11. Control Flow Combo (Each + Show + Match)",()=>{K("A complete task manager combining all control flow components:"),H(`// Task manager example combining Each, Show, and Match
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
});`)}),j("12. Todo App",()=>{K("A complete todo app using Each."),H(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),j("12. Tabs Component",()=>{K("Track active index and conditionally render."),H(`const tabs = ["Home", "About", "Contact"];
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
});`)}),j("13. Async Data Fetching",()=>{K("Use Match for loading states."),H(`const state = $(Mut({
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
});`)}),j("14. Modal Dialog",()=>{K("Modal patterns with explicit types."),H(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var Kf=()=>{let f=A(V(0)),F=A(V(0)),z=A(V(0));return document.addEventListener("mousemove",(D)=>{f.value=D.clientX,F.value=D.clientY,z.value=1}),document.addEventListener("mouseout",()=>{z.value=0}),Z({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:A(()=>`translate(${f.value-200}px, ${F.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:A(()=>z.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var $f=()=>Z({id:"landing-page"},()=>{Kf(),e0(),ff(),Ff(),zf(),Gf(),Df()});$f();
