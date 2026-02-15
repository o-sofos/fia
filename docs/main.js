var E=void 0,f0=0,W0=0,u=void 0;function Z0(z){if(E)z.subs.add(E),E.deps.add(z)}function J0(z){z.version=++f0;let F=[...z.subs];for(let f of F)if(W0>0){if(!u)u=new Set;u.add(f)}else f.execute()}function X0(z){for(let F of z.deps)F.subs.delete(z);z.deps.clear()}function S(z){let F=!0,f={execute(){if(!F)return;X0(f);let Z=E;E=f;try{z()}finally{E=Z}},deps:new Set,cleanup(){F=!1,X0(f)}};return f.execute(),()=>f.cleanup()}function R0(z,F=!1){let f={version:f0,subs:new Set},Z=z,X=function(G){if(arguments.length>0){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(Z,G))Z=G,J0(f);return}return Z0(f),Z};return Object.defineProperty(X,"value",{get(){return Z0(f),Z},set(G){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(Z,G))Z=G,J0(f)}}),X[$0]=!0,X.peek=()=>Z,X}function i0(z){let F={version:f0,subs:new Set},f,Z=-1,X={execute(){F.version=++f0;let D=[...F.subs];for(let J of D)if(W0>0){if(!u)u=new Set;u.add(J)}else J.execute()},deps:new Set,cleanup(){X0(X)}},G=()=>{X0(X);let D=E;E=X;try{let J=z();if(!Object.is(f,J))f=J;Z=F.version}finally{E=D}};G();let H=function(){if(Z!==F.version)G();return Z0(F),f};return Object.defineProperty(H,"value",{get(){return H()}}),H[$0]=!0,H.peek=()=>{if(Z!==F.version)G();return f},H}var w0=Symbol("mutable");function x(z){return{value:z,[w0]:!0}}function d(z){return z!==null&&typeof z==="object"&&z[w0]===!0}var I0=Symbol("reactive-proxy"),F0=Symbol("raw");function L0(z){return z!==null&&typeof z==="object"&&I0 in z}function p(z,F=!1){let f=new Map,Z=new WeakMap;function X(D){let J=f.get(D);if(!J)J={version:0,subs:new Set},f.set(D,J);return J}if(F===!1||F instanceof Set&&F.size===0){let D=!1;for(let J in z)if(d(z[J])){D=!0;break}if(Array.isArray(z)&&!D){for(let J=0;J<z.length;J++)if(d(z[J])){D=!0;break}}if(!D){if(Array.isArray(z))for(let J=0;J<z.length;J++){let L=z[J];if(L&&typeof L==="object"&&!d(L)&&!L0(L))z[J]=p(L,!1)}else for(let J in z){let L=z[J];if(L&&typeof L==="object"&&!d(L)&&!L0(L))z[J]=p(L,!1)}Object.freeze(z)}}return new Proxy(z,{get(D,J,L){if(J===F0||J==="$raw")return D;if(J===I0)return!0;let _=X(J);Z0(_);let $=Reflect.get(D,J,L);if(d($)){let N=Z.get($);if(N?.mutable)return N.mutable;let O=$.value;if(O!==null&&typeof O==="object"){let y=p(O,!0);if(!N)N={},Z.set($,N);return N.mutable=y,y}return O}if($!==null&&typeof $==="object"&&!L0($)){let N=typeof F==="boolean"&&F||F instanceof Set&&F.has(J),O=Z.get($);if(O){let l=N?O.mutable:O.readonly;if(l)return l}let y=p($,N);if(!O)O={},Z.set($,O);if(N)O.mutable=y;else O.readonly=y;return y}return $},set(D,J,L,_){let $=typeof F==="boolean"&&F||F instanceof Set&&F.has(J),N=Reflect.get(D,J,_);if(!$&&d(N)){if(N.value===null||typeof N.value!=="object"){if(F===!1)F=new Set;if(F instanceof Set)F.add(J);$=!0}}if(!$)return!1;let O=L!==null&&typeof L==="object"&&F0 in L?L[F0]:L,y=Array.isArray(D)&&J==="length";if(Object.is(N,O)&&!y)return!0;if(Reflect.set(D,J,O,_),N!==null&&typeof N==="object")Z.delete(N);let l=f.get(J);if(l)J0(l);return!0},has(D,J){if(J===I0||J===F0||J==="$raw")return!0;return Reflect.has(D,J)},ownKeys(D){return Reflect.ownKeys(D)},getOwnPropertyDescriptor(D,J){return Reflect.getOwnPropertyDescriptor(D,J)},deleteProperty(D,J){let L=typeof F==="boolean"&&F||F instanceof Set&&F.has(J);if(!L){let N=Reflect.get(D,J);if(d(N)){if(N.value===null||typeof N.value!=="object"){if(F===!1)F=new Set;if(F instanceof Set)F.add(J);L=!0}}}if(!L)return!1;let _=Reflect.has(D,J),$=Reflect.deleteProperty(D,J);if(_&&$){let N=f.get(J);if(N)J0(N)}return $}})}function R(z,...F){if(typeof z==="function")return i0(z);if(z!==null&&typeof z==="object"&&!d(z))return p(z,new Set(F));if(d(z)){if(typeof z.value==="object"&&z.value!==null)return p(z.value,!0);return R0(z.value,!1)}return R0(z,!0)}var $0=Symbol("signal");function P(z){return typeof z==="function"&&z[$0]===!0}var Y0=[];function k(z){Y0.push(z)}function s(){Y0.pop()}function w(){return Y0[Y0.length-1]??document.body}var n0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),Q0=new WeakMap,O0=new Set;function o0(z){let{target:F,type:f}=z;while(F){let Z=Q0.get(F);if(Z&&Z[f]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:F}),Z[f](z),z.cancelBubble)break}F=F.parentElement}}function j0(z,F,f){if(n0.has(F)){if(!O0.has(F))document.addEventListener(F,o0,{capture:!1,passive:!1}),O0.add(F);let Z=Q0.get(z);if(!Z)Z={},Q0.set(z,Z);Z[F]=f}else z.addEventListener(F,f)}if(typeof window<"u")window.__eventHandlerMap=Q0;function U(z){return(F,f)=>{let Z=document.createElement(z),X,G;if(F===void 0);else if(M(F))G=F;else if(A(F)){if(X=F,f!==void 0)G=f}if(X)T(Z,X);let H=[],D=(J)=>H.push(J);if(G){let J=document.createDocumentFragment();k(J);try{G(Z,D)}finally{s()}Z.appendChild(J)}if(w().appendChild(Z),H.length>0)requestAnimationFrame(()=>{for(let J of H)J()});return Z}}function Y(z){return(F,f,Z)=>{let X=document.createElement(z),G,H,D;if(F===void 0);else if(i(F)){if(G=F,f===void 0);else if(M(f))D=f;else if(A(f)){if(H=f,Z!==void 0)D=Z}}else if(M(F))D=F;else if(A(F)){if(H=F,f!==void 0&&M(f))D=f}if(G!==void 0)n(X,G);if(H)T(X,H);let J=[],L=(_)=>J.push(_);if(D){let _=document.createDocumentFragment();k(_);try{D(X,L)}finally{s()}X.appendChild(_)}if(w().appendChild(X),J.length>0)requestAnimationFrame(()=>{for(let _ of J)_()});return X}}function a(z){return(F,f,Z)=>{let X=document.createElement(z),G,H,D,J;if(F===void 0);else if(i(F)){if(G=F,f===void 0);else if(A0(f))H=f;else if(M(f))J=f;else if(A(f)){if(D=f,Z!==void 0)J=Z}}else if(M(F))J=F;else if(A(F)){if(D=F,f!==void 0&&M(f))J=f}if(G!==void 0)n(X,G);if(H)j0(X,"click",H);if(D)T(X,D);let L=[],_=($)=>L.push($);if(J){let $=document.createDocumentFragment();k($);try{J(X,_)}finally{s()}X.appendChild($)}if(w().appendChild(X),L.length>0)requestAnimationFrame(()=>{for(let $ of L)$()});return X}}function B(z){return(F)=>{let f=document.createElement(z);if(F)T(f,F);return w().appendChild(f),f}}function M0(){return(z,F,f)=>{let Z=document.createElement("img"),X,G,H;if(z===void 0);else if(typeof z==="string"&&B0(z)){if(X=z,F===void 0);else if(typeof F==="string"){if(G=F,f!==void 0)H=f}else if(A(F))H=F}else if(A(z))H=z;if(X!==void 0)Z.src=X;if(G!==void 0)Z.alt=G;if(H)T(Z,H);return w().appendChild(Z),Z}}function V0(){return(z,F,f)=>{let Z=document.createElement("a"),X,G,H,D;if(z===void 0);else if(typeof z==="string"&&T0(z)){if(X=z,F===void 0);else if(i(F)){if(G=F,f!==void 0)H=f}else if(A(F))H=F}else if(M(z))D=z;else if(A(z)){if(H=z,F!==void 0&&M(F))D=F}if(X!==void 0)Z.href=X;if(G!==void 0)n(Z,G);if(H)T(Z,H);let J=[],L=(_)=>J.push(_);if(D){let _=document.createDocumentFragment();k(_);try{D(Z,L)}finally{s()}Z.appendChild(_)}if(w().appendChild(Z),J.length>0)requestAnimationFrame(()=>{for(let _ of J)_()});return Z}}function i(z){return typeof z==="string"||typeof z==="number"||P(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function A0(z){if(typeof z!=="function")return!1;if(P(z))return!1;return z.length<=1}function T0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function B0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var N0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function c0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function r0(z,F,f){switch(F){case"value":if("value"in z)z.value=String(f??"");break;case"checked":if("checked"in z)z.checked=Boolean(f);break;case"selected":if("selected"in z)z.selected=Boolean(f);break;case"muted":if("muted"in z)z.muted=Boolean(f);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(f??0);break;case"volume":if("volume"in z)z.volume=Number(f??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(f);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(f??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(f);break;case"textContent":z.textContent=String(f??"");break;case"innerText":z.innerText=String(f??"");break}}function P0(z,F,f){if(F==="class"||F==="className"||F==="classList")l0(z,f);else if(F==="style")t0(z,f);else if(c0(F))r0(z,F,f);else if(typeof f==="boolean")if(f)z.setAttribute(N0[F]??F,"");else z.removeAttribute(N0[F]??F);else z.setAttribute(N0[F]??F,String(f))}function T(z,F){for(let f in F){let Z=F[f];if(Z===null||Z===void 0)continue;if(f.startsWith("on")&&typeof Z==="function"){let X=f.slice(2).toLowerCase();j0(z,X,Z)}else if(P(Z))S(()=>P0(z,f,Z.value));else P0(z,f,Z)}}function l0(z,F){if(typeof F==="string")z.className=F;else if(Array.isArray(F))z.className=F.filter(Boolean).join(" ");else if(typeof F==="object"&&F!==null){let f=!1;for(let X in F)if(P(F[X])){f=!0;break}let Z=()=>{let X=[];for(let G in F){let H=F[G];if(P(H)?H.value:H)X.push(G)}z.className=X.join(" ")};if(f)S(Z);else Z()}}function a0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function K0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let F=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${F} / ${z.alpha})`:`color(${z.space} ${F})`}case"color-mix":{let F=typeof z.color1==="object"?K0(z.color1):z.color1,f=typeof z.color2==="object"?K0(z.color2):z.color2,Z=z.percentage1!==void 0?`${z.percentage1}%`:"",X=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${F} ${Z}, ${f} ${X})`}}}function C0(z){if(z===null||z===void 0)return"";if(a0(z))return K0(z);return String(z)}function x0(z,F,f){if(F.startsWith("--")){z.setProperty(F,f);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let Z=F.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(Z,f);return}try{z[F]=f}catch{z.setProperty(F,f)}}function t0(z,F){if(typeof F==="string")z.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let f=!1;for(let Z in F)if(P(F[Z])){f=!0;break}if(f)S(()=>{for(let Z in F){let X=F[Z],G=P(X)?X.value:X;x0(z.style,Z,C0(G))}});else for(let Z in F){let X=F[Z];x0(z.style,Z,C0(X))}}}function n(z,F){if(P(F))S(()=>{z.textContent=String(F.value)});else z.textContent=String(F)}function A(z){return typeof z==="object"&&z!==null&&!P(z)&&!Array.isArray(z)}function M(z){return typeof z==="function"&&!P(z)}var h=V0(),_0=M0(),o=a("button"),d1=a("summary"),E1=a("option"),k1=a("optgroup"),h0=Y("h1"),d0=Y("h2"),t=Y("h3"),e=Y("h4"),s1=Y("h5"),y1=Y("h6"),c=Y("p"),q=Y("div"),S1=Y("article"),q0=Y("section"),m1=Y("aside"),E0=Y("header"),k0=Y("footer"),b1=Y("main"),v1=Y("blockquote"),g1=Y("figcaption"),D0=Y("pre"),p1=Y("address"),W=Y("span"),u1=Y("strong"),i1=Y("em"),n1=Y("small"),o1=Y("mark"),c1=Y("code"),r1=Y("samp"),l1=Y("kbd"),a1=Y("var"),t1=Y("i"),e1=Y("b"),z5=Y("u"),F5=Y("s"),f5=Y("del"),Z5=Y("ins"),J5=Y("sub"),X5=Y("sup"),Y5=Y("abbr"),Q5=Y("cite"),j5=Y("dfn"),q5=Y("q"),D5=Y("time"),G5=Y("data"),H5=Y("bdi"),U5=Y("bdo"),L5=Y("ruby"),I5=Y("rp"),$5=Y("rt"),N5=Y("label"),K5=Y("legend"),_5=Y("output"),R5=Y("caption"),W5=Y("td"),w5=Y("th"),v=Y("li"),O5=Y("dd"),A5=Y("dt"),M5=Y("title"),B5=B("input"),V5=B("br"),T5=B("hr"),P5=B("meta"),C5=B("link"),x5=B("area"),h5=B("base"),d5=B("col"),E5=B("embed"),k5=B("source"),s5=B("track"),y5=B("wbr"),G0=U("ul"),S5=U("ol"),m5=U("menu"),b5=U("table"),v5=U("tbody"),g5=U("thead"),p5=U("tfoot"),u5=U("tr"),i5=U("colgroup"),n5=U("form"),o5=U("fieldset"),c5=U("details"),r5=U("dialog"),s0=U("nav"),l5=U("figure"),a5=U("select"),t5=U("datalist"),e5=U("dl"),zz=U("audio"),Fz=U("video"),fz=U("picture"),Zz=U("iframe"),Jz=U("object"),Xz=U("canvas"),Yz=U("map"),Qz=U("body"),jz=U("head"),qz=U("html"),Dz=U("hgroup"),Gz=U("template"),Hz=U("slot"),Uz=U("noscript"),Lz=U("script"),Iz=U("style"),$z=U("textarea"),Nz=U("meter"),Kz=U("progress"),_z=U("search");var e0=()=>{if(typeof localStorage<"u"&&localStorage.getItem("fia-theme"))return localStorage.getItem("fia-theme");if(typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark";return"dark"},r=R(x({current:e0()}));S(()=>{let z=r.current;if(typeof localStorage<"u")localStorage.setItem("fia-theme",z);if(typeof document<"u"){if(document.documentElement.setAttribute("data-theme",z),!document.getElementById("fia-theme-styles")){let F=document.createElement("style");F.id="fia-theme-styles",F.textContent=`
                :root {
                    /* Dark Mode (Default) */
                    --mongo-green: #00ED64;
                    --mongo-forest: #00684A;
                    --mongo-slate: #1C2D38; /* Slate / Dark Blue-Grey */
                    --mongo-white: #E3E3E3; 
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
                    /* Light Mode Overrides */
                    --mongo-green: #00A344; /* Darker green for light bg */
                    --mongo-forest: #E0F2F1; /* Very light teal for backgrounds */
                    --mongo-slate: #E2E8F0;  /* Light grey for borders */
                    --mongo-white: #1a202c;  /* Dark text for headers */
                    --bg-dark: #FFFFFF;      /* White background */
                    --bg-card: #F7FAFC;      /* Light grey card bg */
                    --text-primary: #2D3748; /* Dark grey text */
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
            `,document.head.appendChild(F)}if(z==="dark")document.body.classList.add("dark"),document.body.classList.remove("light");else document.body.classList.add("light"),document.body.classList.remove("dark")}});var y0=()=>{r.current=r.current==="dark"?"light":"dark"};var S0=()=>s0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{q({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{W({style:{color:"var(--mongo-green)"},textContent:"fia"})}),q({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{h({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),h({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),o({style:{background:"none",border:"none",cursor:"pointer",padding:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:R(()=>r.current==="dark"?"var(--text-primary)":"var(--mongo-green)")},onclick:y0},()=>{W({textContent:R(()=>r.current==="dark"?"\uD83C\uDF19":"☀️")})}),h({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var m0=()=>E0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{h0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{q({textContent:"Bare Metal JavaScript"}),q({class:"text-gradient",textContent:"No JSX. Value Native."})}),c({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.8",position:"relative",zIndex:"1",display:"flex",flexWrap:"wrap",gap:"0.5rem 1.5rem",justifyContent:"center",alignItems:"center"}},()=>{["Almost Native DOM","Signals Immutable by Design","No JSX","No Virtual DOM","No Dependencies"].forEach((F,f)=>{W({style:{display:"inline-flex",alignItems:"center",gap:"0.5rem"}},()=>{W({style:{color:"var(--mongo-green)",fontSize:"0.8em"},textContent:"✦"}),W({textContent:F})})})}),q({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{o({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),h({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),q({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),q({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),q({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),q({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),q({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function H0(z,F=10){let f,Z=()=>{f=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},X=(H)=>{if(!f)f=z.getBoundingClientRect();let D=H.clientX-f.left,J=H.clientY-f.top,L=f.width/2,_=f.height/2,$=(J-_)/_*-F,N=(D-L)/L*F;z.style.transform=`
            perspective(1000px)
            rotateX(${$}deg)
            rotateY(${N}deg)
            scale3d(1.02, 1.02, 1.02)
        `},G=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",Z),z.addEventListener("mousemove",X),z.addEventListener("mouseleave",G),()=>{z.removeEventListener("mouseenter",Z),z.removeEventListener("mousemove",X),z.removeEventListener("mouseleave",G)}}var V=(z)=>{w().appendChild(document.createTextNode(z))},b0=()=>q({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{q({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{H0(z,5),q({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let F=(X)=>W({style:{color:"var(--syntax-keyword)"},textContent:X}),f=(X)=>W({style:{color:"var(--syntax-function)"},textContent:X}),Z=(X)=>W({style:{color:"var(--syntax-string)"},textContent:X});D0({style:{transform:"translateZ(40px)"}},()=>{q(()=>{F("import"),V(" { $, div, button, Mut } "),F("from"),Z(' "fia"'),V(";")}),V(" "),q(()=>{F("const"),V(" count = "),f("$"),V("("),f("Mut"),V("(0));")}),V(" "),q(()=>{f("button"),V("("),Z('"Increment"'),V(", () => count.value++);")}),V(" "),q(()=>{f("div"),V("("),f("$"),V("(() => "),Z("`Count: ${count.value}`"),V("));")})})})});var m=(z,F,f)=>q({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(Z)=>{H0(Z,15),q({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:f}),t({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),c({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:F})}),v0=()=>q0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{m("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),m("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),m("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),m("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),m("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),m("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),m("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),m("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var g0=()=>k0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{q({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{q({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var g=(z)=>{w().appendChild(document.createTextNode(z))},z1=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((f)=>{if(f.startsWith("//"))W({style:{color:"var(--syntax-comment)"},textContent:f});else if(f.startsWith('"')||f.startsWith("'")||f.startsWith("`"))W({style:{color:"var(--syntax-string)"},textContent:f});else if(["const","import","from","function","return","if","else","true","false"].includes(f))W({style:{color:"var(--syntax-keyword)"},textContent:f});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(f))W({style:{color:"var(--syntax-function)"},textContent:f});else g(f)})},j=(z)=>q({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{q({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{q({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=R(x(!1));o({textContent:R(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:R(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),D0({style:{margin:"0",overflowX:"auto"}},()=>{z1(z)})}),C=(z,F,f)=>{q0({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{q({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{q({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),d0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),f()})},K=(z,F)=>{q({style:{marginBottom:"2.5rem"}},()=>{t({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),F()})},I=(z,F)=>{q({style:{marginBottom:"1.5rem"}},()=>{e({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),F()})},Q=(z)=>c({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>g(z)),z0=(z)=>G0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((F)=>v(F))}),b=(z,F="info")=>q({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>g(z)),U0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow"},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],F1=()=>{let z=R(x("intro")),F=()=>{let f=window.scrollY+150;for(let Z=U0.length-1;Z>=0;Z--){let X=document.getElementById(U0[Z].id);if(X&&X.offsetTop<=f){z.value=U0[Z].id;break}}};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",F),F()},0);return q({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{q({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{t({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),G0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{U0.forEach((f)=>{v({style:{marginBottom:"0.5rem"}},()=>{h({href:`#${f.id}`,style:{color:R(()=>z.value===f.id?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:R(()=>z.value===f.id?"600":"400"),borderLeft:R(()=>z.value===f.id?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:f.title,onclick:(Z)=>{Z.preventDefault();let X=document.getElementById(f.id);if(X){let H=X.offsetTop-100;window.scrollTo({top:H,behavior:"smooth"}),z.value=f.id}}})})})})})})},p0=()=>q({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{F1(),q({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{q({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{h({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{_0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),h({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{_0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),C("Introduction","intro",()=>{Q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),C("Why Fia?","why-fia",()=>{Q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),G0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{v({style:{marginBottom:"0.5rem"}},()=>{W({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),g("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),v({style:{marginBottom:"0.5rem"}},()=>{W({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),g("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),v({style:{marginBottom:"0.5rem"}},()=>{W({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),g("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),v({style:{marginBottom:"0.5rem"}},()=>{W({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),g("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),C("Getting Started","getting-started",()=>{K("Prerequisites",()=>{Q("Fia is compatible with any modern JavaScript runtime."),z0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),K("Installation",()=>{Q("Fia is published on JSR. Install it using your preferred package manager:"),q({style:{marginBottom:"1rem"}},()=>{e({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),j("deno add jsr:@fia/core")}),q({style:{marginBottom:"1rem"}},()=>{e({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),Q('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),Q("2. Install (aliased as 'fia'):"),j("bun add fia@npm:@jsr/fia__core")}),q({style:{marginBottom:"1rem"}},()=>{e({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),j("npx jsr add @fia/core")}),b("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),K("Updating",()=>{Q("To update to the latest version, run the installation command again (or use your package manager's update command)."),j(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),K("Quick Start",()=>{Q("Create your first reactive app in seconds."),j(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p(() => \`Count: \${state.count}\`);
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),K("Mounting",()=>{Q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),j(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),C("Element API","element-api",()=>{Q("Fia elements have a simple, consistent API. Functions match HTML tag names."),j(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),I("Text Content",()=>{Q("Use the native textContent prop for static or reactive text."),j(`// Static text
h1("Hello World");

// Reactive text
const name = $("Evan");
p(name);

// Computed text
p(() => \`Hello, \${name.value}!\`);`)}),I("Event Handlers",()=>{Q("Event handlers are delegated automatically for performance."),j(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),I("Nesting Elements",()=>{Q("Use a callback function to nest elements."),j(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),I("Void Elements",()=>{Q("Elements like input, img, br only accept props."),j(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),I("onMount Callback",()=>{Q("Access layout properties after the element is in the DOM."),j(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),C("Element Factory Types","element-factory-types",()=>{Q("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),K("Standard Elements (4 overloads)",()=>{Q("Used for semantic structure elements. These factories support the base patterns:"),j(`// 1. Empty element
article();

// 2. Props only
article({ id: "post-1", class: "article" });

// 3. Children only
article(() => {
  h2("Title");
  p("Content");
});

// 4. Props + children (most common)
article({ class: "post" }, () => {
  h2("Article Title");
  p("Article body...");
});`),b("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),K("Text Elements (11 overloads)",()=>{Q("Optimized for elements that commonly hold text content with convenient text-first syntax."),j(`// All standard overloads plus text shortcuts:

// 5. Text content (static or reactive)
h1("Hello World");
h1($(() => \`Count: \${count.value}\`));

// 6. Text + props
h1("Hello", { class: "title", style: { color: "blue" } });

// 7. Text + children
h1("Header", () => {
  span("with nested content");
});

// 8. Text + props + children (all three!)
h1("Main Title", { class: "hero" }, () => {
  span("subtitle", { class: "sub" });
});`),b("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),K("Interactive Elements (10 overloads)",()=>{Q("Special factories for interactive elements with text + click handler shorthand."),j(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`),b("Elements: button, summary, option, optgroup.")}),K("Void Elements (1 overload)",()=>{Q("Self-closing elements that cannot have children."),j(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),b("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),K("Type Safety Benefits",()=>{Q("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),j(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),C("Reactivity","reactivity",()=>{K("Signals",()=>{Q("Signals are the primitive units of reactivity."),j(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),K("Reactive Stores",()=>{Q("Fia stores are immutable by default for predictability."),j(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),b("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),b("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),K("Computed Values",()=>{Q("Computed signals automatically track dependencies and update when they change."),j(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),K("Effects",()=>{Q("Use $e() to run side effects when dependencies change."),j(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),C("Immutability","immutability",()=>{Q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),K("Data Types & Behavior",()=>{I("1. Primitives (String, Number, Boolean)",()=>{Q("Primitives are immutable by default. To make them mutable, use Mut."),j(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),I("2. Objects",()=>{Q("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),j(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),Q("Mutable Objects:"),j(`// Option A: Specific keys
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
// unless the parent key is also mutable.`)}),I("Secure Immutability by Design",()=>{Q("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),j(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),b("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),I("3. Arrays",()=>{Q("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),j(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),Q("Mutable Arrays:"),j(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),I("4. Nested Objects (Deep Reactivity)",()=>{Q("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),j(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),C("Control Flow","control-flow",()=>{K("Show",()=>{Q("Conditionally render content that updates when the condition changes."),j('Show(() => isVisible.value, () => div("Hello!"));')}),K("Each",()=>{Q("Reactive list rendering that re-renders efficiently."),j(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li(item));`)}),K("Match",()=>{Q("Reactive pattern matching for switch/case logic."),j(`Match(() => status.value, {
  loading: () => p("Loading..."),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),C("Component Composition","components",()=>{Q("In Fia, components are just functions. There is no special class or type."),K("Basic Component",()=>{j(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),K("Children & Layouts",()=>{Q("To create wrapper components, pass a callback function as a child prop."),j(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),C("Performance","performance",()=>{Q("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),K("Event Delegation",()=>{Q("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),j(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),I("How it works",()=>{z0(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),I("Benefits",()=>{z0(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),j(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),K("Automatic Fragment Batching",()=>{Q("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),j(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),I("How it works",()=>{z0(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),I("Benefits",()=>{z0(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),j(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),K("Fine-Grained Reactivity",()=>{Q("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),j(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),K("Best Practices",()=>{I("1. Batch Multiple Updates",()=>{j(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),I("2. Use peek() for Non-Reactive Reads",()=>{j(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),I("3. Memoize Expensive Computations",()=>{j(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),C("Examples","examples",()=>{K("\uD83D\uDFE2 Beginner",()=>{I("1. Hello World",()=>{Q("The simplest possible Fia code."),j('h1("Hello, World!");')}),I("2. Counter",()=>{Q("Signals hold reactive state."),j(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),I("3. Toggle",()=>{Q("Computed signals derive values from other signals."),j(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p("Now you see me!");
});`)}),I("4. Input Binding",()=>{Q("Two-way binding is manual but explicit."),j('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),I("5. List Rendering (Static)",()=>{Q("For simple static lists, forEach works fine."),j(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li(item)));`)})}),K("\uD83D\uDFE1 Intermediate",()=>{I("6. Reactive Store Counter",()=>{Q("Objects passed to $() become reactive stores."),j(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),I("7. Conditional Classes",()=>{Q("Computed signals work in class props too."),j(`const active = $(Mut(false));

button("Toggle Active", {
  class: $(() => active.value ? "btn active" : "btn")
}, () => active.value = !active.value);`)}),I("8. Form Handling",()=>{Q("Reactive stores are perfect for forms."),j(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),I("9. Computed Values",()=>{Q("Track dependencies automatically."),j('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),I("10. Dynamic Styling",()=>{Q("Reactive styles allow theming."),j(`const theme = $(Mut("light"));

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
});`)})}),K("\uD83D\uDD34 Advanced",()=>{I("11. Todo App",()=>{Q("A complete todo app using Each."),j(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),I("12. Tabs Component",()=>{Q("Track active index and conditionally render."),j(`const tabs = ["Home", "About", "Contact"];
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
});`)}),I("13. Async Data Fetching",()=>{Q("Use Match for loading states."),j(`const state = $(Mut({
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
});`)}),I("14. Modal Dialog",()=>{Q("Modal patterns with explicit types."),j(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var u0=()=>{let z=R(x(0)),F=R(x(0)),f=R(x(0));return document.addEventListener("mousemove",(Z)=>{z.value=Z.clientX,F.value=Z.clientY,f.value=1}),document.addEventListener("mouseout",()=>{f.value=0}),q({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:R(()=>`translate(${z.value-200}px, ${F.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:R(()=>f.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var f1=()=>q({id:"landing-page"},()=>{u0(),S0(),m0(),b0(),v0(),p0(),g0()});f1();
