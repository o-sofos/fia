var y=void 0,q0=0,y0=0,d=void 0;function G0(z){if(y){if(!z.subs.includes(y))z.subs.push(y);if(!y.deps.includes(z))y.deps.push(z)}}function D0(z){z.version=++q0;let Z=[...z.subs];for(let J of Z)if(y0>0){if(!d)d=[];if(!d.includes(J))d.push(J)}else J.execute()}function H0(z){for(let Z=0;Z<z.deps.length;Z++){let J=z.deps[Z],X=J.subs.indexOf(z);if(X>-1)J.subs.splice(X,1)}z.deps.length=0}function m(z){let Z=!0,J={execute(){if(!Z)return;H0(J);let X=y;y=J;try{z()}finally{y=X}},deps:[],cleanup(){Z=!1,H0(J)}};return J.execute(),()=>J.cleanup()}function E0(z,Z=!1){let J={version:q0,subs:[]},X=z,Q=function(H){if(arguments.length>0){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(X,H))X=H,D0(J);return}return G0(J),X};return Object.defineProperty(Q,"value",{get(){return G0(J),X},set(H){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(X,H))X=H,D0(J)}}),Q[N0]=!0,Q.peek=()=>X,Q}function Q1(z){let Z={version:q0,subs:[]},J,X=-1,Q={execute(){Z.version=++q0;let q=[...Z.subs];for(let Y of q)if(y0>0){if(!d)d=[];if(!d.includes(Y))d.push(Y)}else Y.execute()},deps:[],cleanup(){H0(Q)}},H=()=>{H0(Q);let q=y;y=Q;try{let Y=z();if(!Object.is(J,Y))J=Y;X=Z.version}finally{y=q}};H();let F=function(){if(X!==Z.version)H();return G0(Z),J};return Object.defineProperty(F,"value",{get(){return F()}}),F[N0]=!0,F.peek=()=>{if(X!==Z.version)H();return J},F}var S0=Symbol("mutable");function P(z){return{value:z,[S0]:!0}}function v(z){return z!==null&&typeof z==="object"&&z[S0]===!0}var w0=Symbol("reactive-proxy"),j0=Symbol("raw");function M0(z){return z!==null&&typeof z==="object"&&w0 in z}function n(z,Z=!1){let J=new Map,X=new WeakMap;function Q(q){let Y=J.get(q);if(!Y)Y={version:0,subs:[]},J.set(q,Y);return Y}if(Z===!1||Z instanceof Set&&Z.size===0){let q=!1;for(let Y in z)if(v(z[Y])){q=!0;break}if(Array.isArray(z)&&!q){for(let Y=0;Y<z.length;Y++)if(v(z[Y])){q=!0;break}}if(!q){if(Array.isArray(z))for(let Y=0;Y<z.length;Y++){let W=z[Y];if(W&&typeof W==="object"&&!v(W)&&!M0(W))z[Y]=n(W,!1)}else for(let Y in z){let W=z[Y];if(W&&typeof W==="object"&&!v(W)&&!M0(W))z[Y]=n(W,!1)}Object.freeze(z)}}return new Proxy(z,{get(q,Y,W){if(Y===j0||Y==="$raw")return q;if(Y===w0)return!0;let O=Q(Y);G0(O);let L=Reflect.get(q,Y,W);if(v(L)){let K=X.get(L);if(K?.mutable)return K.mutable;let U=L.value;if(U!==null&&typeof U==="object"){let N=n(U,!0);if(!K)K={},X.set(L,K);return K.mutable=N,N}return U}if(L!==null&&typeof L==="object"&&!M0(L)){let K=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(Y),U=X.get(L);if(U){let f=K?U.mutable:U.readonly;if(f)return f}let N=n(L,K);if(!U)U={},X.set(L,U);if(K)U.mutable=N;else U.readonly=N;return N}return L},set(q,Y,W,O){let L=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(Y),K=Reflect.get(q,Y,O);if(!L&&v(K)){if(K.value===null||typeof K.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(Y);L=!0}}if(!L)return!1;let U=W!==null&&typeof W==="object"&&j0 in W?W[j0]:W,N=Array.isArray(q)&&Y==="length";if(Object.is(K,U)&&!N)return!0;if(Reflect.set(q,Y,U,O),K!==null&&typeof K==="object")X.delete(K);let f=J.get(Y);if(f)D0(f);return!0},has(q,Y){if(Y===w0||Y===j0||Y==="$raw")return!0;return Reflect.has(q,Y)},ownKeys(q){return Reflect.ownKeys(q)},getOwnPropertyDescriptor(q,Y){return Reflect.getOwnPropertyDescriptor(q,Y)},deleteProperty(q,Y){let W=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(Y);if(!W){let K=Reflect.get(q,Y);if(v(K)){if(K.value===null||typeof K.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(Y);W=!0}}}if(!W)return!1;let O=Reflect.has(q,Y),L=Reflect.deleteProperty(q,Y);if(O&&L){let K=J.get(Y);if(K)D0(K)}return L}})}function I(z,...Z){if(typeof z==="function")return Q1(z);if(z!==null&&typeof z==="object"&&!v(z))return n(z,new Set(Z));if(v(z)){if(typeof z.value==="object"&&z.value!==null)return n(z.value,!0);return E0(z.value,!1)}return E0(z,!0)}var N0=Symbol("signal");function S(z){return typeof z==="function"&&z[N0]===!0}var F0=[];function k(z){F0.push(z)}function h(){F0.pop()}function R(){return F0[F0.length-1]??document.body}var R0=new WeakMap,j1=0;function q1(z,Z,J){if(J)return J(z,Z);if(typeof z==="object"&&z!==null){if(!R0.has(z))R0.set(z,j1++);return`_o:${R0.get(z)}`}return`${typeof z}:${z}`}function L0(z,Z,J){let X=document.createComment("Each");R().appendChild(X);let Q=[],H=new Map;m(()=>{let F=typeof z==="function"&&!Array.isArray(z)?z():z,q=[],Y=new Map,W=new Set;for(let L=0;L<F.length;L++){let K=F[L],U=q1(K,L,J);if(console.log({item:K,key:U}),W.has(U))console.warn(`[Each] Duplicate key: "${U}". Keys must be unique.`);W.add(U);let N=H.get(U);if(N&&(!J||N.item===K))q.push(N),Y.set(U,N);else{let f=document.createDocumentFragment();k(f);try{Z(K,L)}finally{h()}let J0=Array.from(f.childNodes),U0={key:U,item:K,nodes:J0};if(q.push(U0),Y.set(U,U0),N)for(let o of N.nodes)o.parentNode?.removeChild(o)}}for(let L of Q)if(!Y.has(L.key))for(let K of L.nodes)K.parentNode?.removeChild(K);let O=X;for(let L of q){let K=L.nodes[0];if(!K)continue;if(O.nextSibling!==K){let N=X.parentNode;if(!N)continue;for(let f of L.nodes)N.insertBefore(f,O.nextSibling)}O=L.nodes[L.nodes.length-1]||O}Q=q,H.clear();for(let[L,K]of Y)H.set(L,K)})}var G1=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),K0=new WeakMap,k0=new Set;function D1(z){let{target:Z,type:J}=z;while(Z){let X=K0.get(Z);if(X&&X[J]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:Z}),X[J](z),z.cancelBubble)break}Z=Z.parentElement}}function W0(z,Z,J){if(G1.has(Z)){if(!k0.has(Z))document.addEventListener(Z,D1,{capture:!1,passive:!1}),k0.add(Z);let X=K0.get(z);if(!X)X={},K0.set(z,X);X[Z]=J}else z.addEventListener(Z,J)}if(typeof window<"u")window.__eventHandlerMap=K0;function i(z){return(Z,J)=>{let X=document.createElement(z),Q,H;if(Z===void 0);else if(_(Z))H=Z;else if(T(Z)){if(Q=Z,J!==void 0)H=J}if(Q)b(X,Q);let F=[],q=(Y)=>F.push(Y);if(H){let Y=document.createDocumentFragment();k(Y);try{H(X,q)}finally{h()}X.appendChild(Y)}if(R().appendChild(X),F.length>0)requestAnimationFrame(()=>{for(let Y of F)Y()});return X}}function V(z){return(Z,J,X)=>{let Q=document.createElement(z),H,F,q;if(Z===void 0);else if(r(Z)){if(H=Z,J===void 0);else if(_(J))q=J;else if(T(J)){if(F=J,X!==void 0)q=X}}else if(_(Z))q=Z;else if(T(Z)){if(F=Z,J!==void 0&&_(J))q=J}if(H!==void 0)l(Q,H);if(F)b(Q,F);let Y=[],W=(O)=>Y.push(O);if(q){let O=document.createDocumentFragment();k(O);try{q(Q,W)}finally{h()}Q.appendChild(O)}if(R().appendChild(Q),Y.length>0)requestAnimationFrame(()=>{for(let O of Y)O()});return Q}}function h0(z){return(Z,J,X)=>{let Q=document.createElement(z),H,F,q,Y;if(Z===void 0);else if(r(Z)){if(H=Z,J===void 0);else if(m0(J))F=J;else if(_(J))Y=J;else if(T(J)){if(q=J,X!==void 0)Y=X}}else if(_(Z))Y=Z;else if(T(Z)){if(q=Z,J!==void 0&&_(J))Y=J}if(H!==void 0)l(Q,H);if(F)W0(Q,"click",F);if(q)b(Q,q);let W=[],O=(L)=>W.push(L);if(Y){let L=document.createDocumentFragment();k(L);try{Y(Q,O)}finally{h()}Q.appendChild(L)}if(R().appendChild(Q),W.length>0)requestAnimationFrame(()=>{for(let L of W)L()});return Q}}function b0(){return(z,Z,J)=>{let X=document.createElement("img"),Q,H,F;if(z===void 0);else if(typeof z==="string"&&v0(z)){if(Q=z,Z===void 0);else if(typeof Z==="string"){if(H=Z,J!==void 0)F=J}else if(T(Z))F=Z}else if(T(z))F=z;if(Q!==void 0)X.src=Q;if(H!==void 0)X.alt=H;if(F)b(X,F);return R().appendChild(X),X}}function p0(){return(z,Z,J)=>{let X=document.createElement("a"),Q,H,F,q;if(z===void 0);else if(typeof z==="string"&&s0(z)){if(Q=z,Z===void 0);else if(r(Z)){if(H=Z,J!==void 0)F=J}else if(T(Z))F=Z}else if(_(z))q=z;else if(T(z)){if(F=z,Z!==void 0&&_(Z))q=Z}if(Q!==void 0)X.href=Q;if(H!==void 0)l(X,H);if(F)b(X,F);let Y=[],W=(O)=>Y.push(O);if(q){let O=document.createDocumentFragment();k(O);try{q(X,W)}finally{h()}X.appendChild(O)}if(R().appendChild(X),Y.length>0)requestAnimationFrame(()=>{for(let O of Y)O()});return X}}function r(z){return typeof z==="string"||typeof z==="number"||S(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function m0(z){if(typeof z!=="function")return!1;if(S(z))return!1;return z.length<=1}function s0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function v0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var B0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function H1(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function F1(z,Z,J){switch(Z){case"value":if("value"in z)z.value=String(J??"");break;case"checked":if("checked"in z)z.checked=Boolean(J);break;case"selected":if("selected"in z)z.selected=Boolean(J);break;case"muted":if("muted"in z)z.muted=Boolean(J);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(J??0);break;case"volume":if("volume"in z)z.volume=Number(J??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(J);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(J??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(J);break;case"textContent":z.textContent=String(J??"");break;case"innerText":z.innerText=String(J??"");break}}function g0(z,Z,J){if(Z==="class"||Z==="className"||Z==="classList")L1(z,J);else if(Z==="style")W1(z,J);else if(H1(Z))F1(z,Z,J);else if(typeof J==="boolean")if(J)z.setAttribute(B0[Z]??Z,"");else z.removeAttribute(B0[Z]??Z);else z.setAttribute(B0[Z]??Z,String(J))}function b(z,Z){for(let J in Z){let X=Z[J];if(X===null||X===void 0)continue;if(J.startsWith("on")&&typeof X==="function"){let Q=J.slice(2).toLowerCase();W0(z,Q,X)}else if(S(X))m(()=>g0(z,J,X.value));else g0(z,J,X)}}function L1(z,Z){if(typeof Z==="string")z.className=Z;else if(Array.isArray(Z))z.className=Z.filter(Boolean).join(" ");else if(typeof Z==="object"&&Z!==null){let J=!1;for(let Q in Z)if(S(Z[Q])){J=!0;break}let X=()=>{let Q=[];for(let H in Z){let F=Z[H];if(S(F)?F.value:F)Q.push(H)}z.className=Q.join(" ")};if(J)m(X);else X()}}function K1(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function V0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let Z=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${Z} / ${z.alpha})`:`color(${z.space} ${Z})`}case"color-mix":{let Z=typeof z.color1==="object"?V0(z.color1):z.color1,J=typeof z.color2==="object"?V0(z.color2):z.color2,X=z.percentage1!==void 0?`${z.percentage1}%`:"",Q=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${Z} ${X}, ${J} ${Q})`}}}function d0(z){if(z===null||z===void 0)return"";if(K1(z))return V0(z);return String(z)}function u0(z,Z,J){if(Z.startsWith("--")){z.setProperty(Z,J);return}if(Z.startsWith("webkit")||Z.startsWith("moz")||Z.startsWith("ms")||Z.startsWith("o")){let X=Z.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(X,J);return}try{z[Z]=J}catch{z.setProperty(Z,J)}}function W1(z,Z){if(typeof Z==="string")z.setAttribute("style",Z);else if(typeof Z==="object"&&Z!==null){let J=!1;for(let X in Z)if(S(Z[X])){J=!0;break}if(J)m(()=>{for(let X in Z){let Q=Z[X],H=S(Q)?Q.value:Q;u0(z.style,X,d0(H))}});else for(let X in Z){let Q=Z[X];u0(z.style,X,d0(Q))}}}function l(z,Z){if(S(Z))m(()=>{z.textContent=String(Z.value)});else z.textContent=String(Z)}function T(z){return typeof z==="object"&&z!==null&&!S(z)&&!Array.isArray(z)}function _(z){return typeof z==="function"&&!S(z)}var C=p0(),T0=b0(),u=h0("button");var c0=V("h1"),i0=V("h2"),Y0=V("h3"),Q0=V("h4");var a=V("p"),G=V("div");var f0=V("section");var o0=V("header"),n0=V("footer");var $0=V("pre");var A=V("span");var w=V("td"),p=V("th"),s=V("li");var t=i("ul");var P0=i("table"),_0=i("tbody"),C0=i("thead");var g=i("tr");var r0=i("nav");var f1=()=>{if(typeof localStorage<"u"&&localStorage.getItem("fia-theme"))return localStorage.getItem("fia-theme");if(typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark";return"dark"},e=I(P({current:f1()}));m(()=>{let z=e.current;if(typeof localStorage<"u")localStorage.setItem("fia-theme",z);if(typeof document<"u"){if(document.documentElement.setAttribute("data-theme",z),!document.getElementById("fia-theme-styles")){let Z=document.createElement("style");Z.id="fia-theme-styles",Z.textContent=`
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
            `,document.head.appendChild(Z)}if(z==="dark")document.body.classList.add("dark"),document.body.classList.remove("light");else document.body.classList.add("light"),document.body.classList.remove("dark")}});var l0=()=>{e.current=e.current==="dark"?"light":"dark"};var a0=()=>r0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{G({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{A({style:{color:"var(--fia-primary)"},textContent:"fia"})}),G({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{C({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),C({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),u({style:{background:"none",border:"none",cursor:"pointer",padding:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:I(()=>e.current==="dark"?"var(--text-primary)":"var(--fia-primary)")},onclick:l0},()=>{A({textContent:I(()=>e.current==="dark"?"\uD83C\uDF19":"☀️")})}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var t0=()=>o0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{c0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{G({textContent:"Bare Metal JavaScript"}),G({class:"text-gradient",textContent:"No JSX. Value Native."})}),a({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.8",position:"relative",zIndex:"1",display:"flex",flexWrap:"wrap",gap:"0.5rem 1.5rem",justifyContent:"center",alignItems:"center"}},()=>{["Immutability by Design","No JSX","No Virtual DOM","No Dependencies"].forEach((Z)=>{A({style:{display:"inline-flex",alignItems:"center",gap:"0.5rem"}},()=>{A({style:{color:"var(--fia-primary)",fontSize:"0.8em"},textContent:"✦"}),A({textContent:Z})})})}),G({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{u({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),G({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--fia-primary), var(--fia-accent))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),G({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--fia-primary)",opacity:"0.1",zIndex:"0"}}),G({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--fia-primary)",opacity:"0.2",boxShadow:"0 0 20px var(--fia-primary)",zIndex:"0",animationDelay:"1s"}}),G({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--fia-primary) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),G({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function A0(z,Z=10){let J,X=()=>{J=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},Q=(F)=>{if(!J)J=z.getBoundingClientRect();let q=F.clientX-J.left,Y=F.clientY-J.top,W=J.width/2,O=J.height/2,L=(Y-O)/O*-Z,K=(q-W)/W*Z;z.style.transform=`
            perspective(1000px)
            rotateX(${L}deg)
            rotateY(${K}deg)
            scale3d(1.02, 1.02, 1.02)
        `},H=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",X),z.addEventListener("mousemove",Q),z.addEventListener("mouseleave",H),()=>{z.removeEventListener("mouseenter",X),z.removeEventListener("mousemove",Q),z.removeEventListener("mouseleave",H)}}var x=(z)=>{R().appendChild(document.createTextNode(z))},e0=()=>G({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{G({style:{borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--fia-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{A0(z,5),G({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let Z=(Q)=>A({style:{color:"var(--syntax-keyword)"},textContent:Q}),J=(Q)=>A({style:{color:"var(--syntax-function)"},textContent:Q}),X=(Q)=>A({style:{color:"var(--syntax-string)"},textContent:Q});$0({style:{transform:"translateZ(40px)"}},()=>{G(()=>{Z("import"),x(" { $, div, button, Mut } "),Z("from"),X(' "fia"'),x(";")}),x(" "),G(()=>{Z("const"),x(" count = "),J("$"),x("("),J("Mut"),x("(0));")}),x(" "),G(()=>{J("button"),x("("),X('"Increment"'),x(", () => count.value++);")}),x(" "),G(()=>{J("div"),x("("),J("$"),x("(() => "),X("`Count: ${count.value}`"),x("));")})})})});var c=(z,Z,J)=>G({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(X)=>{A0(X,15),G({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:J}),Y0({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--fia-primary)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),a({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:Z})}),z1=()=>f0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{c("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),c("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),c("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),c("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),c("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),c("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),c("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),c("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var Z1=()=>n0({style:{borderTop:"1px solid var(--fia-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{G({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{G({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var $1=(z)=>{R().appendChild(document.createTextNode(z))},O0=(z)=>{let O=new Set(["const","let","var","import","from","export","default","function","return","if","else","for","while","do","switch","case","break","continue","new","delete","typeof","instanceof","class","extends","implements","interface","type","enum","async","await","yield","throw","try","catch","finally","true","false","null","undefined","void","this","super","of","in","as"]),L=new Set(["string","number","boolean","object","any","never","unknown","Array","Promise","Map","Set","Record","Partial","Required","Signal","Mut","MaybeSignal"]),K=new Set(["div","button","h1","h2","h3","h4","h5","h6","p","ul","ol","li","input","span","section","article","nav","form","table","tr","td","th","a","img","pre","code","header","footer","main","aside","label","select","option","textarea","strong","em","canvas","video","audio","console","document","window","navigator","Show","Each","Match","$","Mut","setTimeout","setInterval","requestAnimationFrame","map","filter","forEach","reduce","find","some","every","push","pop","splice","slice","join","split","JSON","Math","Object","Number","String"]),U=/\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|=>|[{}()\[\];,.]|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[+\-*/%=!<>&|?:~^]+|\s+|./g,N=z.match(U)||[];N.forEach((f,J0)=>{if(f.startsWith("//")||f.startsWith("/*"))A({style:{color:"var(--syntax-comment)",fontStyle:"italic"},textContent:f});else if(f.startsWith("`"))f.split(/(\$\{[^}]*\})/).forEach((o)=>{if(o.startsWith("${")){A({style:{color:"#89ddff"},textContent:"${"});let X0=o.slice(2,-1);if(K.has(X0)||O.has(X0))A({style:{color:K.has(X0)?"var(--syntax-function)":"var(--syntax-keyword)"},textContent:X0});else A({style:{color:"var(--text-primary)"},textContent:X0});A({style:{color:"#89ddff"},textContent:"}"})}else A({style:{color:"var(--syntax-string)"},textContent:o})});else if(f.startsWith('"')||f.startsWith("'"))A({style:{color:"var(--syntax-string)"},textContent:f});else if(f==="=>")A({style:{color:"#89ddff"},textContent:f});else if(/^\d+(\.\d+)?$/.test(f))A({style:{color:"#f78c6c"},textContent:f});else if(O.has(f))A({style:{color:"var(--syntax-keyword)",fontStyle:f==="this"?"italic":"normal"},textContent:f});else if(L.has(f))A({style:{color:"#ffcb6b"},textContent:f});else if(/^[a-zA-Z_$]/.test(f)&&N[J0+1]?.trim()==="(")if(K.has(f))A({style:{color:"var(--syntax-function)"},textContent:f});else A({style:{color:"var(--syntax-function)"},textContent:f});else if(K.has(f))A({style:{color:"var(--syntax-function)"},textContent:f});else if(J0>0&&N[J0-1]==="."&&/^[a-zA-Z_$]/.test(f))A({style:{color:"#82aaff"},textContent:f});else if(/^[{}()\[\];,.]$/.test(f))A({style:{color:"#89ddff"},textContent:f});else if(/^[+\-*/%=!<>&|?:~^]+$/.test(f))A({style:{color:"#89ddff"},textContent:f});else $1(f)})};var I0=(z)=>{let Z=I(P(0));G({style:{marginBottom:"1.5rem"}},()=>{G({style:{display:"flex",gap:"4px",borderBottom:"1px solid #e0e0e0",marginBottom:"1rem"}},()=>{L0(z,(J,X)=>{u({textContent:J.label,style:{padding:"8px 16px",background:I(()=>Z.value===X?"#2563eb":"transparent"),color:I(()=>Z.value===X?"white":"#666"),border:"none",borderBottom:I(()=>Z.value===X?"2px solid #2563eb":"2px solid transparent"),cursor:"pointer",fontSize:"14px",fontWeight:I(()=>Z.value===X?"600":"400"),transition:"all 0.2s"},onclick:()=>Z.value=X})})}),G({style:{position:"relative"}},()=>{L0(z,(J,X)=>{G({style:{display:I(()=>Z.value===X?"block":"none"),background:"#1e1e1e",color:"#d4d4d4",padding:"1rem",borderRadius:"4px",overflow:"auto",fontFamily:"monospace",fontSize:"14px",whiteSpace:"pre"}},()=>{O0(J.code)})})})})};var Z0=(z)=>{R().appendChild(document.createTextNode(z))},D=(z)=>G({class:"code-block animate-fade-up",style:{borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--fia-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{G({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{G({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let Z=I(P(!1));u({textContent:I(()=>Z.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--fia-slate)",color:I(()=>Z.value?"var(--fia-primary)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),Z.value=!0,setTimeout(()=>Z.value=!1,2000)}})}),$0({style:{margin:"0",overflowX:"auto"}},()=>{O0(z)})}),A1=(z)=>{let Z=document.createElement("div");Z.textContent=z,Object.assign(Z.style,{position:"fixed",bottom:"2rem",left:"50%",transform:"translateX(-50%) translateY(20px)",background:"var(--fia-primary)",color:"var(--fia-dark)",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:"600",fontSize:"0.875rem",zIndex:"9999",opacity:"0",transition:"opacity 0.3s, transform 0.3s",pointerEvents:"none",boxShadow:"0 4px 20px rgba(0, 237, 100, 0.3)"}),document.body.appendChild(Z),requestAnimationFrame(()=>{Z.style.opacity="1",Z.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{Z.style.opacity="0",Z.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>Z.remove(),300)},2000)},x0=(z)=>{C({href:`#${z}`,ariaLabel:"Link to this section",style:{opacity:"0",marginLeft:"0.5rem",color:"var(--text-tertiary)",textDecoration:"none",fontSize:"0.75em",transition:"opacity 0.2s, color 0.2s",cursor:"pointer",flexShrink:"0"},className:"anchor-link",textContent:"\uD83D\uDD17",onclick:(Z)=>{Z.preventDefault(),history.replaceState(null,"",`#${z}`);let J=window.location.href;navigator.clipboard.writeText(J).then(()=>{A1("✓ Link copied to clipboard")});let X=document.getElementById(z);if(X){let H=X.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:H,behavior:"smooth"})}}})},E=(z,Z,J)=>{f0({id:Z,class:"animate-fade-up heading-group",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{G({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{G({style:{width:"4px",height:"32px",background:"var(--fia-primary)",borderRadius:"2px"}}),i0({style:{fontSize:"2rem",color:"var(--fia-white)",letterSpacing:"-0.5px"},textContent:z}),x0(Z)}),J()})},M=(z,Z,J)=>{let X=typeof Z==="string"?Z:z.toLowerCase().replace(/\s+/g,"-"),Q=typeof Z==="function"?Z:J;G({class:"heading-group",style:{marginBottom:"3rem",paddingBottom:"2rem",borderBottom:"1px solid var(--border-subtle)"}},()=>{G({style:{display:"flex",alignItems:"center",marginBottom:"1.5rem"}},()=>{Y0({id:X,style:{color:"var(--fia-primary)",fontSize:"1.5rem",scrollMarginTop:"120px"},textContent:z}),x0(X)}),Q()})},$=(z,Z,J)=>{let X=typeof Z==="string"?Z:z.toLowerCase().replace(/\s+/g,"-"),Q=typeof Z==="function"?Z:J;G({class:"heading-group",style:{marginBottom:"1.5rem"}},()=>{G({style:{display:"flex",alignItems:"center",marginBottom:"0.75rem"}},()=>{Q0({id:X,style:{fontSize:"1.2rem",color:"var(--fia-white)",fontWeight:"600",scrollMarginTop:"120px"},textContent:z}),x0(X)}),Q()})},j=(z)=>a({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>Z0(z)),z0=(z)=>t({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((Z)=>s(Z))}),B=(z,Z="info")=>G({style:{background:Z==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${Z==="warning"?"#ffbd2e":"var(--fia-primary)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:Z==="warning"?"#ffbd2e":"var(--fia-primary)"}},()=>Z0(z)),J1=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"bundle-sizes",title:"Bundle Sizes"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow",children:[{id:"control-flow-show",title:"Show"},{id:"control-flow-each",title:"Each"},{id:"control-flow-match",title:"Match",children:[{id:"match-strings",title:"Strings"},{id:"match-booleans",title:"Booleans"},{id:"match-numbers",title:"Numbers"}]}]},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],O1=()=>{let z=I(P("intro")),Z=[];for(let X of J1)if(Z.push(X.id),X.children){for(let Q of X.children)if(Z.push(Q.id),Q.children)for(let H of Q.children)Z.push(H.id)}let J=()=>{let X=window.scrollY+150,Q=Z[0];for(let H of Z){let F=document.getElementById(H);if(F){if(F.getBoundingClientRect().top+window.scrollY<=X)Q=H}}z.value=Q};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",J),J()},0);return G({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{G({style:{borderLeft:"2px solid var(--fia-slate)",paddingLeft:"1rem"}},()=>{Y0({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),t({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{let X=(Q)=>{let H=[];if(Q.children)for(let F of Q.children)H.push(F.id),H.push(...X(F));return H};J1.forEach((Q)=>{let H=X(Q),F=()=>z.value===Q.id||H.includes(z.value);s({style:{marginBottom:"0.5rem"}},()=>{if(C({href:`#${Q.id}`,style:{color:I(()=>F()?"var(--fia-primary)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:I(()=>F()?"600":"400"),borderLeft:I(()=>F()?"2px solid var(--fia-primary)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:Q.title,onclick:(q)=>{q.preventDefault();let Y=document.getElementById(Q.id);if(Y){let O=Y.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:O,behavior:"smooth"}),z.value=Q.id}}}),Q.children)t({style:{listStyle:"none",padding:"0",marginTop:"0.5rem"}},()=>{Q.children.forEach((q)=>{s({style:{marginBottom:"0.25rem"}},()=>{if(C({href:`#${q.id}`,style:{color:I(()=>z.value===q.id?"var(--fia-primary)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.8rem",display:"block",padding:"0.25rem 0 0.25rem 1.5rem",transition:"color 0.2s",fontWeight:I(()=>z.value===q.id?"600":"400")},textContent:q.title,onclick:(Y)=>{Y.preventDefault();let W=document.getElementById(q.id);if(W){let L=W.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:L,behavior:"smooth"})}z.value=q.id}}),q.children)t({style:{listStyle:"none",padding:"0",marginTop:"0.25rem"}},()=>{q.children.forEach((Y)=>{s({style:{marginBottom:"0.25rem"}},()=>{C({href:`#${Y.id}`,style:{color:I(()=>z.value===Y.id?"var(--fia-primary)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.75rem",display:"block",padding:"0.25rem 0 0.25rem 3rem",transition:"color 0.2s",fontWeight:I(()=>z.value===Y.id?"600":"400")},textContent:Y.title,onclick:(W)=>{W.preventDefault();let O=document.getElementById(Y.id);if(O){let K=O.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:K,behavior:"smooth"})}z.value=Y.id}})})})})})})})})})})})})},X1=()=>G({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{O1(),G({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{G({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{T0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{T0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),E("Introduction","intro",()=>{j("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),E("Why Fia?","why-fia",()=>{j("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),t({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{s({style:{marginBottom:"0.5rem"}},()=>{A({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),Z0("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),s({style:{marginBottom:"0.5rem"}},()=>{A({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),Z0("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),s({style:{marginBottom:"0.5rem"}},()=>{A({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),Z0("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),s({style:{marginBottom:"0.5rem"}},()=>{A({style:{color:"var(--fia-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),Z0("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),E("Bundle Sizes","bundle-sizes",()=>{j("Fia is designed to be lightweight with excellent tree-shaking support. Import only what you need:"),G({style:{marginTop:"2rem",marginBottom:"2rem",overflowX:"auto"}},()=>{P0({style:{width:"100%",borderCollapse:"collapse",borderRadius:"0.75rem",overflow:"hidden"}},()=>{C0(()=>{g({style:{background:"rgba(0, 237, 100, 0.1)"}},()=>{p({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:"Entry Point"}),p({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"Gzip"}),p({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"Brotli"}),p({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:"Use Case"})})}),_0(()=>{g({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{w({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{A({textContent:"fia/signals"})}),w({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"1.46 KB"}),w({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"1.28 KB"}),w({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Reactive state without DOM"})}),g({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{w({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{A({textContent:"fia/control"})}),w({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"2.16 KB"}),w({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"1.90 KB"}),w({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Control flow (Show, Each)"})}),g({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{w({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{A({textContent:"fia/elements"})}),w({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"4.05 KB"}),w({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"3.58 KB"}),w({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"UI with 3 elements"})}),g({style:{borderBottom:"1px solid var(--fia-slate)"}},()=>{w({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{A({textContent:"fia/svg"})}),w({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"~4 KB"}),w({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"~3.5 KB"}),w({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"SVG graphics"})}),g(()=>{w({style:{padding:"1rem",fontFamily:"'JetBrains Mono', monospace",color:"var(--fia-primary)"}},()=>{A({textContent:"fia"}),A({style:{marginLeft:"0.5rem",color:"var(--text-secondary)",fontSize:"0.875rem"},textContent:"(full)"})}),w({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"8.21 KB"}),w({style:{padding:"1rem",textAlign:"center",color:"var(--text-secondary)"},textContent:"7.25 KB"}),w({style:{padding:"1rem",color:"var(--text-secondary)"},textContent:"Complete library"})})})})}),M("Framework Comparison",()=>{j("How Fia compares to other popular frameworks (minified + gzipped):"),G({style:{marginTop:"1.5rem",marginBottom:"2rem",overflowX:"auto"}},()=>{P0({style:{width:"100%",borderCollapse:"collapse",borderRadius:"0.75rem",overflow:"hidden"}},()=>{C0(()=>{g({style:{background:"rgba(0, 237, 100, 0.1)"}},()=>{p({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:"Framework"}),p({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"Minimal"}),p({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:"600"},textContent:"Hello World"}),p({style:{padding:"1rem",textAlign:"left",color:"var(--fia-white)",fontWeight:"600"},textContent:"Notes"})})}),_0(()=>{let z=[{name:"Fia",minimal:"1.46 KB",full:"~3.9 KB",notes:"Zero dependencies",highlight:!0},{name:"Preact",minimal:"~3 KB",full:"~3.5 KB",notes:"Lightweight champion",highlight:!1},{name:"Svelte",minimal:"~2-3 KB",full:"~4 KB",notes:"Compiler magic",highlight:!1},{name:"Solid",minimal:"~6-7 KB",full:"~6.5 KB",notes:"Fine-grained reactivity",highlight:!1},{name:"Vue",minimal:"~17 KB",full:"~22 KB",notes:"Tree-shakable",highlight:!1},{name:"React",minimal:"~7 KB",full:"~42 KB",notes:"Standard + VDOM",highlight:!1},{name:"Angular",minimal:"N/A",full:"~85 KB",notes:"Full framework",highlight:!1}];z.forEach((Z,J)=>{g({style:{borderBottom:J<z.length-1?"1px solid var(--fia-slate)":"none"}},()=>{w({style:{padding:"1rem",color:Z.highlight?"var(--fia-primary)":"var(--fia-white)",fontWeight:Z.highlight?"700":"600"},textContent:Z.name}),w({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:Z.highlight?"600":"normal"},textContent:Z.minimal}),w({style:{padding:"1rem",textAlign:"center",color:"var(--fia-white)",fontWeight:Z.highlight?"600":"normal"},textContent:Z.full}),w({style:{padding:"1rem",color:"var(--text-secondary)",fontSize:"0.875rem"},textContent:Z.notes})})})})})}),B("All sizes are minified + gzipped. Fia's tree-shaking ensures you only bundle what you use.","info")})}),E("Getting Started","getting-started",()=>{M("Prerequisites",()=>{j("Fia is compatible with any modern JavaScript runtime."),z0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),M("Installation",()=>{j("Fia is published on JSR. Install it using your preferred package manager:"),G({style:{marginBottom:"1rem"}},()=>{Q0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Deno"}),D("deno add jsr:@fia/core")}),G({style:{marginBottom:"1rem"}},()=>{Q0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Bun"}),j('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),j("2. Install (aliased as 'fia'):"),D("bun add fia@npm:@jsr/fia__core")}),G({style:{marginBottom:"1rem"}},()=>{Q0({style:{color:"var(--fia-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),D("npx jsr add @fia/core")}),B("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),M("Updating",()=>{j("To update to the latest version, run the installation command again (or use your package manager's update command)."),D(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),M("Quick Start",()=>{j("Create your first reactive app in seconds."),D(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),M("Mounting",()=>{j("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),D(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),E("Element API","element-api",()=>{j("Fia elements have a simple, consistent API. Functions match HTML tag names."),D(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),$("Event Handlers",()=>{j("Event handlers are delegated automatically for performance."),D(`button("Click me", () => console.log("clicked!"));

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),$("Nesting Elements",()=>{j("Use a callback function to nest elements."),D(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),$("Void Elements",()=>{j("Elements like input, img, br only accept props."),D(`input({ type: "email", placeholder: "you@example.com" });
img("/photo.jpg", "Photo");
br();`)}),$("onMount Callback",()=>{j("Access layout properties after the element is in the DOM."),D(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),E("Element Factory Types","element-factory-types",()=>{j("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),M("Standard Elements",()=>{j("Used for semantic structure elements. Click each tab to see the different patterns for creating an article:"),I0([{label:"Empty",code:`// Empty element
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
});`}]),B("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),M("Text Elements",()=>{j("Optimized for elements that commonly hold text content. Click each tab to see different ways to create the same heading:"),I0([{label:"Empty",code:`// Empty element
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
});`}]),B("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),M("Interactive Elements",()=>{j("Special factories for interactive elements with convenient text + click handler shorthand:"),I0([{label:"Text + Click ",code:`// Text + click handler shorthand
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
  span({ class: "icon" }, () => t("\uD83D\uDDD1️"));
});

button("Menu", () => {
  span(menuIcon);
  span("Options");
});`},{label:"Text + Props + Children",code:`// Text + props + children
button("Delete", { class: "btn-danger" }, () => {
  span({ class: "icon" }, () => t("\uD83D\uDDD1️"));
  span("Delete Item");
});`},{label:"Props Only",code:`// Props only (standard element pattern)
button({
  textContent: "Click",
  class: "btn",
  onclick: () => handleClick()
});`},{label:"Props + Children",code:`// Props + children (standard element pattern)
button({ class: "btn-danger" }, () => {
  span({ class: "icon" }, () => t("\uD83D\uDDD1️"));
  span("Delete");
});

// Note: onclick goes in props, not as 3rd arg!
button({ class: "btn", onclick: () => save() }, () => {
  span("Save");
});`}]),B("Elements: button, summary, option, optgroup.")}),M("Void Elements",()=>{j("Self-closing elements that cannot have children."),D(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),B("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),M("Type Safety Benefits",()=>{j("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),D(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),E("Reactivity","reactivity",()=>{M("Signals",()=>{j("Signals are the primitive units of reactivity."),D(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),M("Reactive Stores",()=>{j("Fia stores are immutable by default for predictability."),D(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),B("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),B("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),M("Computed Values",()=>{j("Computed signals automatically track dependencies and update when they change."),D(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),M("Effects",()=>{j("Use $e() to run side effects when dependencies change."),D(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),E("Immutability","immutability",()=>{j("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),M("Data Types & Behavior",()=>{$("1. Primitives (String, Number, Boolean)",()=>{j("Primitives are immutable by default. To make them mutable, use Mut."),D(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),$("2. Objects",()=>{j("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),D(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),j("Mutable Objects:"),D(`// Option A: Specific keys
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
// unless the parent key is also mutable.`)}),$("Secure Immutability by Design",()=>{j("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),D(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),B("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),$("3. Arrays",()=>{j("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),D(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),j("Mutable Arrays:"),D(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),$("4. Nested Objects (Deep Reactivity)",()=>{j("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),D(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),E("Control Flow","control-flow",()=>{M("Show","control-flow-show",()=>{j("Conditionally render content that updates when the condition changes."),D('Show(() => isVisible.value, () => div("Hello!"));')}),M("Each","control-flow-each",()=>{j("High-performance keyed list rendering with efficient reconciliation. Each automatically assigns stable keys to items - no key function needed! Minimizes DOM operations by reusing existing nodes instead of recreating them."),$("Automatic Key Assignment",()=>{j("Each automatically assigns stable keys to both primitives and objects:"),D(`// Primitives: automatically keyed by value
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
// ✅ State, focus, scroll position preserved`)}),$("Custom Key Function (Optional)",()=>{j("For explicit control (e.g., database IDs), provide a custom key function:"),D(`// Optional: use database ID as key
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
);`),B("How automatic keying works: Objects/arrays get stable internal IDs via WeakMap (no memory leaks). Primitives are keyed by type:value. Custom keyFn takes precedence when provided.","info")}),$("When to Use Custom Keys",()=>{j("Automatic keying works great in most cases, but provide a custom keyFn when:"),D(`// ✅ Automatic keying works:
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
Each(users, (user) => div(user.name), (user) => user.id);`),B(`Warning: If duplicate keys are detected, Each will log: '[Each] Duplicate key: "...". Keys must be unique.' Check the console and provide a custom keyFn if needed.`,"warning")}),$("Performance Characteristics",()=>{j("Each uses keyed reconciliation (automatic or custom) to achieve O(1) performance for common operations:"),B("Add 1 item to 1000: O(1) - creates 1 node (~0.5ms)","info"),B("Remove 1 item from 1000: O(1) - removes 1 node (~0.3ms)","info"),B("Move/reorder items: O(1) - moves nodes (~0.2ms)","info"),B("Preserves: input focus, scroll position, component state","info"),D(`// Performance comparison
const items = Array(1000).fill(0).map((_, i) => ({ id: i, value: i }));

// Old approach (no keying):
// - Adding 1 item: Recreates all 1001 nodes (~150ms) - 300x slower!
// - Input focus is lost ❌

// Fia Each (automatic keying):
// - Adding 1 item: Creates 1 node (~0.5ms)
// - Input focus is preserved ✅
// - State and scroll position preserved ✅`)}),$("Custom Key Function Best Practices",()=>{j("While automatic keying works great, you may want custom keys for specific use cases:"),D(`// ✅ Good: Database ID (explicit control)
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
(item) => item.category`),B("When to use custom keys: Database objects with existing IDs, cross-system synchronization, debugging (readable keys in DevTools). When automatic keying is fine: Most common cases, primitive arrays, local component state.","info")}),$("Real-World Example",()=>{j("Complete todo list with add, remove, and toggle functionality:"),D(`const state = $({
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
});`)}),$("Performance Tips",()=>{z0(["Automatic keying works for most use cases (objects get stable IDs, primitives keyed by value)","Use custom key function for explicit control (database IDs, cross-system sync)","Custom keys are optional but useful for debugging (readable keys in DevTools)","Batch multiple updates with batch() for better performance","Same O(1) performance whether using automatic or custom keys"])})}),M("Match","control-flow-match",()=>{j("Reactive pattern matching for switch/case logic. Automatically updates rendering when the matched value changes."),j("Match accepts signals or getter functions, and returns Signal<R> with '_' default or Signal<R | undefined> without."),$("Strings","match-strings",()=>{j("Match exact string values:"),D(`const status = $(Mut("active"));

Match(status, {
  "active": () => span({ class: "success" }, () => t("Active")),
  "inactive": () => span({ class: "danger" }, () => t("Inactive")),
  "pending": () => span({ class: "warning" }, () => t("Pending")),
  _: () => span("Unknown")
});`)}),$("Booleans","match-booleans",()=>{j("Boolean values are automatically converted to string keys:"),D(`const isActive = $(Mut(true));

Match(isActive, {
  "true": () => "✅ Active",
  "false": () => "❌ Inactive"
});`)}),$("Numbers","match-numbers",()=>{j("Numbers support exact matching:"),D(`const count = $(Mut(2));

Match(count, {
  "0": () => "None",
  "1": () => "One",
  "2": () => "Two",
  _: () => "Many"
});`),j("For numeric values, Match also supports range-based comparisons using operators and interval notation:"),D(`const age = $(Mut(25));

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
});`),B("Range patterns only work with numeric values. Exact string matches are checked before range patterns.","info")})})}),E("Component Composition","components",()=>{j("In Fia, components are just functions. There is no special class or type."),M("Basic Component",()=>{D(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),M("Children & Layouts",()=>{j("To create wrapper components, pass a callback function as a child prop."),D(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),E("Performance","performance",()=>{j("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),M("Event Delegation",()=>{j("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),D(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),$("How it works",()=>{z0(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),$("Benefits",()=>{z0(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),D(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),M("Automatic Fragment Batching",()=>{j("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),D(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),$("How it works",()=>{z0(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),$("Benefits",()=>{z0(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),D(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),M("Fine-Grained Reactivity",()=>{j("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),D(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),M("Best Practices",()=>{$("1. Batch Multiple Updates",()=>{D(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),$("2. Use peek() for Non-Reactive Reads",()=>{D(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),$("3. Memoize Expensive Computations",()=>{D(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),E("Examples","examples",()=>{M("\uD83D\uDFE2 Beginner",()=>{$("1. Hello World",()=>{j("The simplest possible Fia code."),D('h1("Hello, World!");')}),$("2. Counter",()=>{j("Signals hold reactive state."),D(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),$("3. Toggle",()=>{j("Computed signals derive values from other signals."),D(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
Show(visible, () => p("Now you see me!"));`)}),$("4. Input Binding",()=>{j("Two-way binding is manual but explicit."),D('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),$("5. List Rendering (Static)",()=>{j("For simple static lists, forEach works fine."),D(`const items = ["Apple", "Banana", "Cherry"];
ul(() => Each(items, li));`)})}),M("\uD83D\uDFE1 Intermediate",()=>{$("6. Reactive Store Counter",()=>{j("Objects passed to $() become reactive stores."),D(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),$("7. Conditional Classes",()=>{j("Computed signals work in class props too."),D(`const active = $(Mut(false));
button($(() => active.value ? "Deactivate" : "Activate"), () => active.value = !active.value);`)}),$("8. Form Handling",()=>{j("Reactive stores are perfect for forms."),D(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),$("9. Computed Values",()=>{j("Track dependencies automatically."),D('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),$("10. Dynamic Styling",()=>{j("Reactive styles allow theming."),D(`const theme = $(Mut("light"));

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
});`)})}),M("\uD83D\uDD34 Advanced",()=>{$("11. Control Flow Combo (Each + Show + Match)",()=>{j("A complete task manager combining all control flow components:"),D(`// Task manager example combining Each, Show, and Match
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
});`)}),$("12. Todo App",()=>{j("A complete todo app using Each."),D(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),$("12. Tabs Component",()=>{j("Track active index and conditionally render."),D(`const tabs = ["Home", "About", "Contact"];
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
});`)}),$("13. Async Data Fetching",()=>{j("Use Match for loading states."),D(`const state = $(Mut({
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
});`)}),$("14. Modal Dialog",()=>{j("Modal patterns with explicit types."),D(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var Y1=()=>{let z=I(P(0)),Z=I(P(0)),J=I(P(0));return document.addEventListener("mousemove",(X)=>{z.value=X.clientX,Z.value=X.clientY,J.value=1}),document.addEventListener("mouseout",()=>{J.value=0}),G({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:I(()=>`translate(${z.value-200}px, ${Z.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:I(()=>J.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var I1=()=>G({id:"landing-page"},()=>{Y1(),a0(),t0(),e0(),z1(),X1(),Z1()});I1();
