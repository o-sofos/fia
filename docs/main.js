var S=void 0,F0=0,$0=0,i=void 0;function J0(z){if(S)z.subs.add(S),S.deps.add(z)}function X0(z){z.version=++F0;let Z=[...z.subs];for(let F of Z)if($0>0){if(!i)i=new Set;i.add(F)}else F.execute()}function Y0(z){for(let Z of z.deps)Z.subs.delete(z);z.deps.clear()}function h(z){let Z=!0,F={execute(){if(!Z)return;Y0(F);let J=S;S=F;try{z()}finally{S=J}},deps:new Set,cleanup(){Z=!1,Y0(F)}};return F.execute(),()=>F.cleanup()}function A0(z,Z=!1){let F={version:F0,subs:new Set},J=z,Y=function(U){if(arguments.length>0){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(J,U))J=U,X0(F);return}return J0(F),J};return Object.defineProperty(Y,"value",{get(){return J0(F),J},set(U){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(J,U))J=U,X0(F)}}),Y[W0]=!0,Y.peek=()=>J,Y}function c0(z){let Z={version:F0,subs:new Set},F,J=-1,Y={execute(){Z.version=++F0;let G=[...Z.subs];for(let X of G)if($0>0){if(!i)i=new Set;i.add(X)}else X.execute()},deps:new Set,cleanup(){Y0(Y)}},U=()=>{Y0(Y);let G=S;S=Y;try{let X=z();if(!Object.is(F,X))F=X;J=Z.version}finally{S=G}};U();let H=function(){if(J!==Z.version)U();return J0(Z),F};return Object.defineProperty(H,"value",{get(){return H()}}),H[W0]=!0,H.peek=()=>{if(J!==Z.version)U();return F},H}var w0=Symbol("mutable");function M(z){return{value:z,[w0]:!0}}function y(z){return z!==null&&typeof z==="object"&&z[w0]===!0}var _0=Symbol("reactive-proxy"),Z0=Symbol("raw");function K0(z){return z!==null&&typeof z==="object"&&_0 in z}function u(z,Z=!1){let F=new Map,J=new WeakMap;function Y(G){let X=F.get(G);if(!X)X={version:0,subs:new Set},F.set(G,X);return X}if(Z===!1||Z instanceof Set&&Z.size===0){let G=!1;for(let X in z)if(y(z[X])){G=!0;break}if(Array.isArray(z)&&!G){for(let X=0;X<z.length;X++)if(y(z[X])){G=!0;break}}if(!G){if(Array.isArray(z))for(let X=0;X<z.length;X++){let I=z[X];if(I&&typeof I==="object"&&!y(I)&&!K0(I))z[X]=u(I,!1)}else for(let X in z){let I=z[X];if(I&&typeof I==="object"&&!y(I)&&!K0(I))z[X]=u(I,!1)}Object.freeze(z)}}return new Proxy(z,{get(G,X,I){if(X===Z0||X==="$raw")return G;if(X===_0)return!0;let O=Y(X);J0(O);let _=Reflect.get(G,X,I);if(y(_)){let W=J.get(_);if(W?.mutable)return W.mutable;let $=_.value;if($!==null&&typeof $==="object"){let s=u($,!0);if(!W)W={},J.set(_,W);return W.mutable=s,s}return $}if(_!==null&&typeof _==="object"&&!K0(_)){let W=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(X),$=J.get(_);if($){let l=W?$.mutable:$.readonly;if(l)return l}let s=u(_,W);if(!$)$={},J.set(_,$);if(W)$.mutable=s;else $.readonly=s;return s}return _},set(G,X,I,O){let _=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(X),W=Reflect.get(G,X,O);if(!_&&y(W)){if(W.value===null||typeof W.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(X);_=!0}}if(!_)return!1;let $=I!==null&&typeof I==="object"&&Z0 in I?I[Z0]:I,s=Array.isArray(G)&&X==="length";if(Object.is(W,$)&&!s)return!0;if(Reflect.set(G,X,$,O),W!==null&&typeof W==="object")J.delete(W);let l=F.get(X);if(l)X0(l);return!0},has(G,X){if(X===_0||X===Z0||X==="$raw")return!0;return Reflect.has(G,X)},ownKeys(G){return Reflect.ownKeys(G)},getOwnPropertyDescriptor(G,X){return Reflect.getOwnPropertyDescriptor(G,X)},deleteProperty(G,X){let I=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(X);if(!I){let W=Reflect.get(G,X);if(y(W)){if(W.value===null||typeof W.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(X);I=!0}}}if(!I)return!1;let O=Reflect.has(G,X),_=Reflect.deleteProperty(G,X);if(O&&_){let W=F.get(X);if(W)X0(W)}return _}})}function K(z,...Z){if(typeof z==="function")return c0(z);if(z!==null&&typeof z==="object"&&!y(z))return u(z,new Set(Z));if(y(z)){if(typeof z.value==="object"&&z.value!==null)return u(z.value,!0);return A0(z.value,!1)}return A0(z,!0)}var W0=Symbol("signal");function C(z){return typeof z==="function"&&z[W0]===!0}var Q0=[];function k(z){Q0.push(z)}function E(){Q0.pop()}function A(){return Q0[Q0.length-1]??document.body}function j0(z,Z){let F=document.createComment("Each");A().appendChild(F);let J=[];h(()=>{for(let H of J)H.parentNode?.removeChild(H);J=[];let Y=typeof z==="function"&&!Array.isArray(z)?z():z,U=document.createDocumentFragment();k(U);try{for(let H=0;H<Y.length;H++)Z(Y[H],H)}finally{E()}J=Array.from(U.childNodes),F.parentNode?.insertBefore(U,F.nextSibling)})}var o0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),q0=new WeakMap,M0=new Set;function r0(z){let{target:Z,type:F}=z;while(Z){let J=q0.get(Z);if(J&&J[F]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:Z}),J[F](z),z.cancelBubble)break}Z=Z.parentElement}}function D0(z,Z,F){if(o0.has(Z)){if(!M0.has(Z))document.addEventListener(Z,r0,{capture:!1,passive:!1}),M0.add(Z);let J=q0.get(z);if(!J)J={},q0.set(z,J);J[Z]=F}else z.addEventListener(Z,F)}if(typeof window<"u")window.__eventHandlerMap=q0;function L(z){return(Z,F)=>{let J=document.createElement(z),Y,U;if(Z===void 0);else if(B(Z))U=Z;else if(w(Z)){if(Y=Z,F!==void 0)U=F}if(Y)P(J,Y);let H=[],G=(X)=>H.push(X);if(U){let X=document.createDocumentFragment();k(X);try{U(J,G)}finally{E()}J.appendChild(X)}if(A().appendChild(J),H.length>0)requestAnimationFrame(()=>{for(let X of H)X()});return J}}function q(z){return(Z,F,J)=>{let Y=document.createElement(z),U,H,G;if(Z===void 0);else if(n(Z)){if(U=Z,F===void 0);else if(B(F))G=F;else if(w(F)){if(H=F,J!==void 0)G=J}}else if(B(Z))G=Z;else if(w(Z)){if(H=Z,F!==void 0&&B(F))G=F}if(U!==void 0)c(Y,U);if(H)P(Y,H);let X=[],I=(O)=>X.push(O);if(G){let O=document.createDocumentFragment();k(O);try{G(Y,I)}finally{E()}Y.appendChild(O)}if(A().appendChild(Y),X.length>0)requestAnimationFrame(()=>{for(let O of X)O()});return Y}}function a(z){return(Z,F,J)=>{let Y=document.createElement(z),U,H,G,X;if(Z===void 0);else if(n(Z)){if(U=Z,F===void 0);else if(B0(F))H=F;else if(B(F))X=F;else if(w(F)){if(G=F,J!==void 0)X=J}}else if(B(Z))X=Z;else if(w(Z)){if(G=Z,F!==void 0&&B(F))X=F}if(U!==void 0)c(Y,U);if(H)D0(Y,"click",H);if(G)P(Y,G);let I=[],O=(_)=>I.push(_);if(X){let _=document.createDocumentFragment();k(_);try{X(Y,O)}finally{E()}Y.appendChild(_)}if(A().appendChild(Y),I.length>0)requestAnimationFrame(()=>{for(let _ of I)_()});return Y}}function V(z){return(Z)=>{let F=document.createElement(z);if(Z)P(F,Z);return A().appendChild(F),F}}function V0(){return(z,Z,F)=>{let J=document.createElement("img"),Y,U,H;if(z===void 0);else if(typeof z==="string"&&T0(z)){if(Y=z,Z===void 0);else if(typeof Z==="string"){if(U=Z,F!==void 0)H=F}else if(w(Z))H=Z}else if(w(z))H=z;if(Y!==void 0)J.src=Y;if(U!==void 0)J.alt=U;if(H)P(J,H);return A().appendChild(J),J}}function P0(){return(z,Z,F)=>{let J=document.createElement("a"),Y,U,H,G;if(z===void 0);else if(typeof z==="string"&&C0(z)){if(Y=z,Z===void 0);else if(n(Z)){if(U=Z,F!==void 0)H=F}else if(w(Z))H=Z}else if(B(z))G=z;else if(w(z)){if(H=z,Z!==void 0&&B(Z))G=Z}if(Y!==void 0)J.href=Y;if(U!==void 0)c(J,U);if(H)P(J,H);let X=[],I=(O)=>X.push(O);if(G){let O=document.createDocumentFragment();k(O);try{G(J,I)}finally{E()}J.appendChild(O)}if(A().appendChild(J),X.length>0)requestAnimationFrame(()=>{for(let O of X)O()});return J}}function n(z){return typeof z==="string"||typeof z==="number"||C(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function B0(z){if(typeof z!=="function")return!1;if(C(z))return!1;return z.length<=1}function C0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function T0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var R0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function l0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function a0(z,Z,F){switch(Z){case"value":if("value"in z)z.value=String(F??"");break;case"checked":if("checked"in z)z.checked=Boolean(F);break;case"selected":if("selected"in z)z.selected=Boolean(F);break;case"muted":if("muted"in z)z.muted=Boolean(F);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(F??0);break;case"volume":if("volume"in z)z.volume=Number(F??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(F);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(F??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(F);break;case"textContent":z.textContent=String(F??"");break;case"innerText":z.innerText=String(F??"");break}}function k0(z,Z,F){if(Z==="class"||Z==="className"||Z==="classList")t0(z,F);else if(Z==="style")z1(z,F);else if(l0(Z))a0(z,Z,F);else if(typeof F==="boolean")if(F)z.setAttribute(R0[Z]??Z,"");else z.removeAttribute(R0[Z]??Z);else z.setAttribute(R0[Z]??Z,String(F))}function P(z,Z){for(let F in Z){let J=Z[F];if(J===null||J===void 0)continue;if(F.startsWith("on")&&typeof J==="function"){let Y=F.slice(2).toLowerCase();D0(z,Y,J)}else if(C(J))h(()=>k0(z,F,J.value));else k0(z,F,J)}}function t0(z,Z){if(typeof Z==="string")z.className=Z;else if(Array.isArray(Z))z.className=Z.filter(Boolean).join(" ");else if(typeof Z==="object"&&Z!==null){let F=!1;for(let Y in Z)if(C(Z[Y])){F=!0;break}let J=()=>{let Y=[];for(let U in Z){let H=Z[U];if(C(H)?H.value:H)Y.push(U)}z.className=Y.join(" ")};if(F)h(J);else J()}}function e0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function O0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let Z=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${Z} / ${z.alpha})`:`color(${z.space} ${Z})`}case"color-mix":{let Z=typeof z.color1==="object"?O0(z.color1):z.color1,F=typeof z.color2==="object"?O0(z.color2):z.color2,J=z.percentage1!==void 0?`${z.percentage1}%`:"",Y=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${Z} ${J}, ${F} ${Y})`}}}function E0(z){if(z===null||z===void 0)return"";if(e0(z))return O0(z);return String(z)}function x0(z,Z,F){if(Z.startsWith("--")){z.setProperty(Z,F);return}if(Z.startsWith("webkit")||Z.startsWith("moz")||Z.startsWith("ms")||Z.startsWith("o")){let J=Z.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(J,F);return}try{z[Z]=F}catch{z.setProperty(Z,F)}}function z1(z,Z){if(typeof Z==="string")z.setAttribute("style",Z);else if(typeof Z==="object"&&Z!==null){let F=!1;for(let J in Z)if(C(Z[J])){F=!0;break}if(F)h(()=>{for(let J in Z){let Y=Z[J],U=C(Y)?Y.value:Y;x0(z.style,J,E0(U))}});else for(let J in Z){let Y=Z[J];x0(z.style,J,E0(Y))}}}function c(z,Z){if(C(Z))h(()=>{z.textContent=String(Z.value)});else z.textContent=String(Z)}function w(z){return typeof z==="object"&&z!==null&&!C(z)&&!Array.isArray(z)}function B(z){return typeof z==="function"&&!C(z)}var d=P0(),N0=V0(),m=a("button"),s1=a("summary"),m1=a("option"),v1=a("optgroup"),h0=q("h1"),d0=q("h2"),t=q("h3"),e=q("h4"),b1=q("h5"),g1=q("h6"),o=q("p"),j=q("div"),p1=q("article"),G0=q("section"),u1=q("aside"),y0=q("header"),S0=q("footer"),i1=q("main"),n1=q("blockquote"),c1=q("figcaption"),H0=q("pre"),o1=q("address"),N=q("span"),r1=q("strong"),l1=q("em"),a1=q("small"),t1=q("mark"),e1=q("code"),z5=q("samp"),Z5=q("kbd"),F5=q("var"),J5=q("i"),X5=q("b"),Y5=q("u"),Q5=q("s"),j5=q("del"),q5=q("ins"),D5=q("sub"),G5=q("sup"),H5=q("abbr"),U5=q("cite"),L5=q("dfn"),f5=q("q"),I5=q("time"),K5=q("data"),_5=q("bdi"),W5=q("bdo"),R5=q("ruby"),O5=q("rp"),N5=q("rt"),A5=q("label"),$5=q("legend"),w5=q("output"),M5=q("caption"),B5=q("td"),V5=q("th"),g=q("li"),T5=q("dd"),P5=q("dt"),C5=q("title"),k5=V("input"),E5=V("br"),x5=V("hr"),h5=V("meta"),d5=V("link"),y5=V("area"),S5=V("base"),s5=V("col"),m5=V("embed"),v5=V("source"),b5=V("track"),g5=V("wbr"),U0=L("ul"),p5=L("ol"),u5=L("menu"),i5=L("table"),n5=L("tbody"),c5=L("thead"),o5=L("tfoot"),r5=L("tr"),l5=L("colgroup"),a5=L("form"),t5=L("fieldset"),e5=L("details"),zz=L("dialog"),s0=L("nav"),Zz=L("figure"),Fz=L("select"),Jz=L("datalist"),Xz=L("dl"),Yz=L("audio"),Qz=L("video"),jz=L("picture"),qz=L("iframe"),Dz=L("object"),Gz=L("canvas"),Hz=L("map"),Uz=L("body"),Lz=L("head"),fz=L("html"),Iz=L("hgroup"),Kz=L("template"),_z=L("slot"),Wz=L("noscript"),Rz=L("script"),Oz=L("style"),Nz=L("textarea"),Az=L("meter"),$z=L("progress"),wz=L("search");var Z1=()=>{if(typeof localStorage<"u"&&localStorage.getItem("fia-theme"))return localStorage.getItem("fia-theme");if(typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark";return"dark"},r=K(M({current:Z1()}));h(()=>{let z=r.current;if(typeof localStorage<"u")localStorage.setItem("fia-theme",z);if(typeof document<"u"){if(document.documentElement.setAttribute("data-theme",z),!document.getElementById("fia-theme-styles")){let Z=document.createElement("style");Z.id="fia-theme-styles",Z.textContent=`
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
            `,document.head.appendChild(Z)}if(z==="dark")document.body.classList.add("dark"),document.body.classList.remove("light");else document.body.classList.add("light"),document.body.classList.remove("dark")}});var m0=()=>{r.current=r.current==="dark"?"light":"dark"};var v0=()=>s0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{j({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{N({style:{color:"var(--mongo-green)"},textContent:"fia"})}),j({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{d({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),d({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),m({style:{background:"none",border:"none",cursor:"pointer",padding:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:K(()=>r.current==="dark"?"var(--text-primary)":"var(--mongo-green)")},onclick:m0},()=>{N({textContent:K(()=>r.current==="dark"?"\uD83C\uDF19":"☀️")})}),d({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var b0=()=>y0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{h0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{j({textContent:"Bare Metal JavaScript"}),j({class:"text-gradient",textContent:"No JSX. Value Native."})}),o({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.8",position:"relative",zIndex:"1",display:"flex",flexWrap:"wrap",gap:"0.5rem 1.5rem",justifyContent:"center",alignItems:"center"}},()=>{["Almost Native DOM","Signals Immutable by Design","No JSX","No Virtual DOM","No Dependencies"].forEach((Z)=>{N({style:{display:"inline-flex",alignItems:"center",gap:"0.5rem"}},()=>{N({style:{color:"var(--mongo-green)",fontSize:"0.8em"},textContent:"✦"}),N({textContent:Z})})})}),j({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{m({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),d({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),j({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),j({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),j({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),j({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),j({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function L0(z,Z=10){let F,J=()=>{F=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},Y=(H)=>{if(!F)F=z.getBoundingClientRect();let G=H.clientX-F.left,X=H.clientY-F.top,I=F.width/2,O=F.height/2,_=(X-O)/O*-Z,W=(G-I)/I*Z;z.style.transform=`
            perspective(1000px)
            rotateX(${_}deg)
            rotateY(${W}deg)
            scale3d(1.02, 1.02, 1.02)
        `},U=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",J),z.addEventListener("mousemove",Y),z.addEventListener("mouseleave",U),()=>{z.removeEventListener("mouseenter",J),z.removeEventListener("mousemove",Y),z.removeEventListener("mouseleave",U)}}var T=(z)=>{A().appendChild(document.createTextNode(z))},g0=()=>j({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{j({style:{borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{L0(z,5),j({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{j({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),j({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),j({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let Z=(Y)=>N({style:{color:"var(--syntax-keyword)"},textContent:Y}),F=(Y)=>N({style:{color:"var(--syntax-function)"},textContent:Y}),J=(Y)=>N({style:{color:"var(--syntax-string)"},textContent:Y});H0({style:{transform:"translateZ(40px)"}},()=>{j(()=>{Z("import"),T(" { $, div, button, Mut } "),Z("from"),J(' "fia"'),T(";")}),T(" "),j(()=>{Z("const"),T(" count = "),F("$"),T("("),F("Mut"),T("(0));")}),T(" "),j(()=>{F("button"),T("("),J('"Increment"'),T(", () => count.value++);")}),T(" "),j(()=>{F("div"),T("("),F("$"),T("(() => "),J("`Count: ${count.value}`"),T("));")})})})});var v=(z,Z,F)=>j({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(J)=>{L0(J,15),j({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:F}),t({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),o({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:Z})}),p0=()=>G0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{v("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),v("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),v("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),v("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),v("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),v("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),v("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),v("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var u0=()=>S0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{j({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{j({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var f0=(z)=>{let Z=K(M(0));j({style:{marginBottom:"1.5rem"}},()=>{j({style:{display:"flex",gap:"4px",borderBottom:"1px solid #e0e0e0",marginBottom:"1rem"}},()=>{j0(z,(F,J)=>{m({textContent:F.label,style:{padding:"8px 16px",background:K(()=>Z.value===J?"#2563eb":"transparent"),color:K(()=>Z.value===J?"white":"#666"),border:"none",borderBottom:K(()=>Z.value===J?"2px solid #2563eb":"2px solid transparent"),cursor:"pointer",fontSize:"14px",fontWeight:K(()=>Z.value===J?"600":"400"),transition:"all 0.2s"},onclick:()=>Z.value=J})})}),j({style:{position:"relative"}},()=>{j0(z,(F,J)=>{j({style:{display:K(()=>Z.value===J?"block":"none"),background:"#1e1e1e",color:"#d4d4d4",padding:"1rem",borderRadius:"4px",overflow:"auto",fontFamily:"monospace",fontSize:"14px",whiteSpace:"pre"}},()=>{j({textContent:F.code})})})})})};var p=(z)=>{A().appendChild(document.createTextNode(z))},F1=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((F)=>{if(F.startsWith("//"))N({style:{color:"var(--syntax-comment)"},textContent:F});else if(F.startsWith('"')||F.startsWith("'")||F.startsWith("`"))N({style:{color:"var(--syntax-string)"},textContent:F});else if(["const","import","from","function","return","if","else","true","false"].includes(F))N({style:{color:"var(--syntax-keyword)"},textContent:F});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(F))N({style:{color:"var(--syntax-function)"},textContent:F});else p(F)})},D=(z)=>j({class:"code-block animate-fade-up",style:{borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{j({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{j({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{j({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),j({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),j({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let Z=K(M(!1));m({textContent:K(()=>Z.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:K(()=>Z.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),Z.value=!0,setTimeout(()=>Z.value=!1,2000)}})}),H0({style:{margin:"0",overflowX:"auto"}},()=>{F1(z)})}),x=(z,Z,F)=>{G0({id:Z,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{j({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{j({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),d0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),F()})},R=(z,Z)=>{j({style:{marginBottom:"2.5rem"}},()=>{t({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),Z()})},f=(z,Z)=>{j({style:{marginBottom:"1.5rem"}},()=>{e({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),Z()})},Q=(z)=>o({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>p(z)),z0=(z)=>U0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((Z)=>g(Z))}),b=(z,Z="info")=>j({style:{background:Z==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${Z==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:Z==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>p(z)),I0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow"},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],J1=()=>{let z=K(M("intro")),Z=()=>{let F=window.scrollY+150;for(let J=I0.length-1;J>=0;J--){let Y=document.getElementById(I0[J].id);if(Y&&Y.offsetTop<=F){z.value=I0[J].id;break}}};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",Z),Z()},0);return j({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{j({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{t({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),U0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{I0.forEach((F)=>{g({style:{marginBottom:"0.5rem"}},()=>{d({href:`#${F.id}`,style:{color:K(()=>z.value===F.id?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:K(()=>z.value===F.id?"600":"400"),borderLeft:K(()=>z.value===F.id?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:F.title,onclick:(J)=>{J.preventDefault();let Y=document.getElementById(F.id);if(Y){let H=Y.offsetTop-100;window.scrollTo({top:H,behavior:"smooth"}),z.value=F.id}}})})})})})})},i0=()=>j({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{J1(),j({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{j({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{d({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{N0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),d({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{N0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),x("Introduction","intro",()=>{Q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),x("Why Fia?","why-fia",()=>{Q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),U0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{g({style:{marginBottom:"0.5rem"}},()=>{N({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),p("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),g({style:{marginBottom:"0.5rem"}},()=>{N({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),p("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),g({style:{marginBottom:"0.5rem"}},()=>{N({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),p("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),g({style:{marginBottom:"0.5rem"}},()=>{N({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),p("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),x("Getting Started","getting-started",()=>{R("Prerequisites",()=>{Q("Fia is compatible with any modern JavaScript runtime."),z0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),R("Installation",()=>{Q("Fia is published on JSR. Install it using your preferred package manager:"),j({style:{marginBottom:"1rem"}},()=>{e({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),D("deno add jsr:@fia/core")}),j({style:{marginBottom:"1rem"}},()=>{e({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),Q('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),Q("2. Install (aliased as 'fia'):"),D("bun add fia@npm:@jsr/fia__core")}),j({style:{marginBottom:"1rem"}},()=>{e({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),D("npx jsr add @fia/core")}),b("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),R("Updating",()=>{Q("To update to the latest version, run the installation command again (or use your package manager's update command)."),D(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),R("Quick Start",()=>{Q("Create your first reactive app in seconds."),D(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),R("Mounting",()=>{Q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),D(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),x("Element API","element-api",()=>{Q("Fia elements have a simple, consistent API. Functions match HTML tag names."),D(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),f("Event Handlers",()=>{Q("Event handlers are delegated automatically for performance."),D(`button("Click me", () => console.log("clicked!"));

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),f("Nesting Elements",()=>{Q("Use a callback function to nest elements."),D(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),f("Void Elements",()=>{Q("Elements like input, img, br only accept props."),D(`input({ type: "email", placeholder: "you@example.com" });
img("/photo.jpg", "Photo");
br();`)}),f("onMount Callback",()=>{Q("Access layout properties after the element is in the DOM."),D(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),x("Element Factory Types","element-factory-types",()=>{Q("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),R("Standard Elements (4 overloads)",()=>{Q("Used for semantic structure elements. Click each tab to see the different patterns for creating an article:"),f0([{label:"Empty",code:`// Overload 1: Empty element
article();`},{label:"Props Only",code:`// Overload 2: Props only
article({ 
  id: "post-1", 
  class: "article",
  role: "article"
});`},{label:"Children",code:`// Overload 3: Children callback only
article(() => {
  h2("Article Title");
  p("Article content goes here...");
});`},{label:"Props + Children",code:`// Overload 4: Props + children (most common) ⭐
article({ class: "post" }, () => {
  h2("Article Title");
  p("Article body...");
  footer("Published: 2024");
});`}]),b("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),R("Text Elements (11 overloads)",()=>{Q("Optimized for elements that commonly hold text content. Click each tab to see different ways to create the same heading:"),f0([{label:"Empty",code:`// Overload 1: Empty element
h1();`},{label:"Props Only",code:`// Overload 2: Props only
h1({ 
  class: "title", 
  style: { color: "blue", fontSize: "32px" } 
});`},{label:"Children",code:`// Overload 3: Children callback
h1(() => {
  span("Welcome ");
  strong("User");
});`},{label:"Props + Children",code:`// Overload 4: Props + children
h1({ class: "hero" }, () => {
  span("Welcome ", { class: "greeting" });
  strong("User");
});`},{label:"Text Content",code:`// Overload 5: Text content shorthand ⭐
h1("Welcome User");

// Also works with signals:
const user = $(Mut("User"));
h1($(() => \`Welcome \${user.value}\`));`},{label:"Text + Props",code:`// Overload 6: Text + props ⭐
h1("Welcome User", { 
  class: "hero", 
  id: "main-heading" 
});`},{label:"Text + Children",code:`// Overload 7: Text + children
h1("Welcome", () => {
  strong(" User");
});`},{label:"All Three",code:`// Overload 8: Text + props + children ⭐
h1("Welcome", { class: "hero" }, () => {
  strong(" User");
});`},{label:"onMount",code:`// Overload 9-11: With onMount callback
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
});`}]),b("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),R("Interactive Elements (10 overloads)",()=>{Q("Special factories for interactive elements with convenient text + click handler shorthand:"),f0([{label:"Text + Click ⭐⭐",code:`// Text + click handler shorthand
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
});`}]),b("Elements: button, summary, option, optgroup.")}),R("Void Elements (1 overload)",()=>{Q("Self-closing elements that cannot have children."),D(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),b("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),R("Type Safety Benefits",()=>{Q("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),D(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),x("Reactivity","reactivity",()=>{R("Signals",()=>{Q("Signals are the primitive units of reactivity."),D(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),R("Reactive Stores",()=>{Q("Fia stores are immutable by default for predictability."),D(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),b("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),b("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),R("Computed Values",()=>{Q("Computed signals automatically track dependencies and update when they change."),D(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),R("Effects",()=>{Q("Use $e() to run side effects when dependencies change."),D(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),x("Immutability","immutability",()=>{Q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),R("Data Types & Behavior",()=>{f("1. Primitives (String, Number, Boolean)",()=>{Q("Primitives are immutable by default. To make them mutable, use Mut."),D(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),f("2. Objects",()=>{Q("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),D(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),Q("Mutable Objects:"),D(`// Option A: Specific keys
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
// unless the parent key is also mutable.`)}),f("Secure Immutability by Design",()=>{Q("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),D(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),b("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),f("3. Arrays",()=>{Q("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),D(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),Q("Mutable Arrays:"),D(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),f("4. Nested Objects (Deep Reactivity)",()=>{Q("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),D(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),x("Control Flow","control-flow",()=>{R("Show",()=>{Q("Conditionally render content that updates when the condition changes."),D('Show(() => isVisible.value, () => div("Hello!"));')}),R("Each",()=>{Q("Reactive list rendering that re-renders efficiently."),D(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li(item));`)}),R("Match (2 overloads)",()=>{Q("Reactive pattern matching for switch/case logic. Match has two overloads based on whether a default case is provided."),f("Overload 1: With default case '_' (returns Signal<R>)",()=>{Q("When you provide a default '_' case, the result is never undefined:"),D(`// ✅ Signal<string> (no undefined!)
const message: Signal<string> = Match(status, {
  "loading": () => "Loading...",
  "success": () => "Done!",
  "error": () => "Failed!",
  _: () => "Unknown"  // Default case eliminates undefined
});

// Works as TextContent (requires Signal<string | number>)
p(Match(currentTab, {
  "0": () => "Home",
  "1": () => "About", 
  "2": () => "Contact",
  _: () => "404"
}));`)}),f("Overload 2: Without default case (returns Signal<R | undefined>)",()=>{Q("Without a default case, the result can be undefined if no case matches:"),D(`// Signal<string | undefined>
const message = Match(status, {
  "loading": () => "Loading...",
  "success": () => "Done!"
  // No default - returns undefined if status is neither
});

// Use with Show to handle undefined
Show(() => message.value !== undefined, () => {
  p(message.value!);
});`)}),f("Pass signals directly",()=>{Q("Match accepts both signals and getter functions:"),D(`const activeTab = $(Mut(0));

// ✅ Pass signal directly
Match(activeTab, {
  "0": () => div("Home"),
  "1": () => div("About")
});

// ✅ Or use getter function
Match(() => activeTab.value, {
  "0": () => div("Home"),
  "1": () => div("About")
});`)}),f("String key normalization",()=>{Q("All keys are automatically converted to strings for consistent matching:"),D(`const count = $(Mut(0));

// Boolean values → string keys
Match(isActive, {
  "true": () => "Active",   // Matches boolean true
  "false": () => "Inactive" // Matches boolean false
});

// Number values → string keys  
Match(count, {
  "0": () => "None",
  "1": () => "One",
  "2": () => "Two",
  _: () => "Many"
});`)})})}),x("Component Composition","components",()=>{Q("In Fia, components are just functions. There is no special class or type."),R("Basic Component",()=>{D(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),R("Children & Layouts",()=>{Q("To create wrapper components, pass a callback function as a child prop."),D(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),x("Performance","performance",()=>{Q("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),R("Event Delegation",()=>{Q("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),D(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),f("How it works",()=>{z0(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),f("Benefits",()=>{z0(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),D(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),R("Automatic Fragment Batching",()=>{Q("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),D(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),f("How it works",()=>{z0(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),f("Benefits",()=>{z0(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),D(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),R("Fine-Grained Reactivity",()=>{Q("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),D(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),R("Best Practices",()=>{f("1. Batch Multiple Updates",()=>{D(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),f("2. Use peek() for Non-Reactive Reads",()=>{D(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),f("3. Memoize Expensive Computations",()=>{D(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),x("Examples","examples",()=>{R("\uD83D\uDFE2 Beginner",()=>{f("1. Hello World",()=>{Q("The simplest possible Fia code."),D('h1("Hello, World!");')}),f("2. Counter",()=>{Q("Signals hold reactive state."),D(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),f("3. Toggle",()=>{Q("Computed signals derive values from other signals."),D(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
Show(visible, () => p("Now you see me!"));`)}),f("4. Input Binding",()=>{Q("Two-way binding is manual but explicit."),D('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),f("5. List Rendering (Static)",()=>{Q("For simple static lists, forEach works fine."),D(`const items = ["Apple", "Banana", "Cherry"];
ul(() => Each(items, li));`)})}),R("\uD83D\uDFE1 Intermediate",()=>{f("6. Reactive Store Counter",()=>{Q("Objects passed to $() become reactive stores."),D(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),f("7. Conditional Classes",()=>{Q("Computed signals work in class props too."),D(`const active = $(Mut(false));
button($(() => active.value ? "Deactivate" : "Activate"), () => active.value = !active.value);`)}),f("8. Form Handling",()=>{Q("Reactive stores are perfect for forms."),D(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),f("9. Computed Values",()=>{Q("Track dependencies automatically."),D('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),f("10. Dynamic Styling",()=>{Q("Reactive styles allow theming."),D(`const theme = $(Mut("light"));

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
});`)})}),R("\uD83D\uDD34 Advanced",()=>{f("11. Control Flow Combo (Each + Show + Match)",()=>{Q("A complete task manager combining all control flow components:"),D(`// Task manager example combining Each, Show, and Match
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
});`)}),f("12. Todo App",()=>{Q("A complete todo app using Each."),D(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),f("12. Tabs Component",()=>{Q("Track active index and conditionally render."),D(`const tabs = ["Home", "About", "Contact"];
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
});`)}),f("13. Async Data Fetching",()=>{Q("Use Match for loading states."),D(`const state = $(Mut({
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
});`)}),f("14. Modal Dialog",()=>{Q("Modal patterns with explicit types."),D(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var n0=()=>{let z=K(M(0)),Z=K(M(0)),F=K(M(0));return document.addEventListener("mousemove",(J)=>{z.value=J.clientX,Z.value=J.clientY,F.value=1}),document.addEventListener("mouseout",()=>{F.value=0}),j({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:K(()=>`translate(${z.value-200}px, ${Z.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:K(()=>F.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var X1=()=>j({id:"landing-page"},()=>{n0(),v0(),b0(),g0(),p0(),i0(),u0()});X1();
