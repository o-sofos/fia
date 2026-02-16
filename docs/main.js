var v=void 0,Y0=0,V0=0,i=void 0;function F0(z){if(v)z.subs.add(v),v.deps.add(z)}function Q0(z){z.version=++Y0;let Z=[...z.subs];for(let J of Z)if(V0>0){if(!i)i=new Set;i.add(J)}else J.execute()}function j0(z){for(let Z of z.deps)Z.subs.delete(z);z.deps.clear()}function m(z){let Z=!0,J={execute(){if(!Z)return;j0(J);let X=v;v=J;try{z()}finally{v=X}},deps:new Set,cleanup(){Z=!1,j0(J)}};return J.execute(),()=>J.cleanup()}function B0(z,Z=!1){let J={version:Y0,subs:new Set},X=z,Y=function(G){if(arguments.length>0){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(X,G))X=G,Q0(J);return}return F0(J),X};return Object.defineProperty(Y,"value",{get(){return F0(J),X},set(G){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(X,G))X=G,Q0(J)}}),Y[$0]=!0,Y.peek=()=>X,Y}function t0(z){let Z={version:Y0,subs:new Set},J,X=-1,Y={execute(){Z.version=++Y0;let Q=[...Z.subs];for(let F of Q)if(V0>0){if(!i)i=new Set;i.add(F)}else F.execute()},deps:new Set,cleanup(){j0(Y)}},G=()=>{j0(Y);let Q=v;v=Y;try{let F=z();if(!Object.is(J,F))J=F;X=Z.version}finally{v=Q}};G();let U=function(){if(X!==Z.version)G();return F0(Z),J};return Object.defineProperty(U,"value",{get(){return U()}}),U[$0]=!0,U.peek=()=>{if(X!==Z.version)G();return J},U}var T0=Symbol("mutable");function B(z){return{value:z,[T0]:!0}}function b(z){return z!==null&&typeof z==="object"&&z[T0]===!0}var I0=Symbol("reactive-proxy"),X0=Symbol("raw");function N0(z){return z!==null&&typeof z==="object"&&I0 in z}function u(z,Z=!1){let J=new Map,X=new WeakMap;function Y(Q){let F=J.get(Q);if(!F)F={version:0,subs:new Set},J.set(Q,F);return F}if(Z===!1||Z instanceof Set&&Z.size===0){let Q=!1;for(let F in z)if(b(z[F])){Q=!0;break}if(Array.isArray(z)&&!Q){for(let F=0;F<z.length;F++)if(b(z[F])){Q=!0;break}}if(!Q){if(Array.isArray(z))for(let F=0;F<z.length;F++){let L=z[F];if(L&&typeof L==="object"&&!b(L)&&!N0(L))z[F]=u(L,!1)}else for(let F in z){let L=z[F];if(L&&typeof L==="object"&&!b(L)&&!N0(L))z[F]=u(L,!1)}Object.freeze(z)}}return new Proxy(z,{get(Q,F,L){if(F===X0||F==="$raw")return Q;if(F===I0)return!0;let _=Y(F);F0(_);let $=Reflect.get(Q,F,L);if(b($)){let W=X.get($);if(W?.mutable)return W.mutable;let O=$.value;if(O!==null&&typeof O==="object"){let E=u(O,!0);if(!W)W={},X.set($,W);return W.mutable=E,E}return O}if($!==null&&typeof $==="object"&&!N0($)){let W=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(F),O=X.get($);if(O){let K=W?O.mutable:O.readonly;if(K)return K}let E=u($,W);if(!O)O={},X.set($,O);if(W)O.mutable=E;else O.readonly=E;return E}return $},set(Q,F,L,_){let $=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(F),W=Reflect.get(Q,F,_);if(!$&&b(W)){if(W.value===null||typeof W.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(F);$=!0}}if(!$)return!1;let O=L!==null&&typeof L==="object"&&X0 in L?L[X0]:L,E=Array.isArray(Q)&&F==="length";if(Object.is(W,O)&&!E)return!0;if(Reflect.set(Q,F,O,_),W!==null&&typeof W==="object")X.delete(W);let K=J.get(F);if(K)Q0(K);return!0},has(Q,F){if(F===I0||F===X0||F==="$raw")return!0;return Reflect.has(Q,F)},ownKeys(Q){return Reflect.ownKeys(Q)},getOwnPropertyDescriptor(Q,F){return Reflect.getOwnPropertyDescriptor(Q,F)},deleteProperty(Q,F){let L=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(F);if(!L){let W=Reflect.get(Q,F);if(b(W)){if(W.value===null||typeof W.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(F);L=!0}}}if(!L)return!1;let _=Reflect.has(Q,F),$=Reflect.deleteProperty(Q,F);if(_&&$){let W=J.get(F);if(W)Q0(W)}return $}})}function I(z,...Z){if(typeof z==="function")return t0(z);if(z!==null&&typeof z==="object"&&!b(z))return u(z,new Set(Z));if(b(z)){if(typeof z.value==="object"&&z.value!==null)return u(z.value,!0);return B0(z.value,!1)}return B0(z,!0)}var $0=Symbol("signal");function y(z){return typeof z==="function"&&z[$0]===!0}var q0=[];function S(z){q0.push(z)}function k(){q0.pop()}function A(){return q0[q0.length-1]??document.body}function G0(z,Z){let J=document.createComment("Each");A().appendChild(J);let X=[];m(()=>{for(let U of X)U.parentNode?.removeChild(U);X=[];let Y=typeof z==="function"&&!Array.isArray(z)?z():z,G=document.createDocumentFragment();S(G);try{for(let U=0;U<Y.length;U++)Z(Y[U],U)}finally{k()}X=Array.from(G.childNodes),J.parentNode?.insertBefore(G,J.nextSibling)})}var e0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),U0=new WeakMap,P0=new Set;function z1(z){let{target:Z,type:J}=z;while(Z){let X=U0.get(Z);if(X&&X[J]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:Z}),X[J](z),z.cancelBubble)break}Z=Z.parentElement}}function D0(z,Z,J){if(e0.has(Z)){if(!P0.has(Z))document.addEventListener(Z,z1,{capture:!1,passive:!1}),P0.add(Z);let X=U0.get(z);if(!X)X={},U0.set(z,X);X[Z]=J}else z.addEventListener(Z,J)}if(typeof window<"u")window.__eventHandlerMap=U0;function f(z){return(Z,J)=>{let X=document.createElement(z),Y,G;if(Z===void 0);else if(V(Z))G=Z;else if(M(Z)){if(Y=Z,J!==void 0)G=J}if(Y)x(X,Y);let U=[],Q=(F)=>U.push(F);if(G){let F=document.createDocumentFragment();S(F);try{G(X,Q)}finally{k()}X.appendChild(F)}if(A().appendChild(X),U.length>0)requestAnimationFrame(()=>{for(let F of U)F()});return X}}function D(z){return(Z,J,X)=>{let Y=document.createElement(z),G,U,Q;if(Z===void 0);else if(c(Z)){if(G=Z,J===void 0);else if(V(J))Q=J;else if(M(J)){if(U=J,X!==void 0)Q=X}}else if(V(Z))Q=Z;else if(M(Z)){if(U=Z,J!==void 0&&V(J))Q=J}if(G!==void 0)o(Y,G);if(U)x(Y,U);let F=[],L=(_)=>F.push(_);if(Q){let _=document.createDocumentFragment();S(_);try{Q(Y,L)}finally{k()}Y.appendChild(_)}if(A().appendChild(Y),F.length>0)requestAnimationFrame(()=>{for(let _ of F)_()});return Y}}function e(z){return(Z,J,X)=>{let Y=document.createElement(z),G,U,Q,F;if(Z===void 0);else if(c(Z)){if(G=Z,J===void 0);else if(C0(J))U=J;else if(V(J))F=J;else if(M(J)){if(Q=J,X!==void 0)F=X}}else if(V(Z))F=Z;else if(M(Z)){if(Q=Z,J!==void 0&&V(J))F=J}if(G!==void 0)o(Y,G);if(U)D0(Y,"click",U);if(Q)x(Y,Q);let L=[],_=($)=>L.push($);if(F){let $=document.createDocumentFragment();S($);try{F(Y,_)}finally{k()}Y.appendChild($)}if(A().appendChild(Y),L.length>0)requestAnimationFrame(()=>{for(let $ of L)$()});return Y}}function T(z){return(Z)=>{let J=document.createElement(z);if(Z)x(J,Z);return A().appendChild(J),J}}function E0(){return(z,Z,J)=>{let X=document.createElement("img"),Y,G,U;if(z===void 0);else if(typeof z==="string"&&x0(z)){if(Y=z,Z===void 0);else if(typeof Z==="string"){if(G=Z,J!==void 0)U=J}else if(M(Z))U=Z}else if(M(z))U=z;if(Y!==void 0)X.src=Y;if(G!==void 0)X.alt=G;if(U)x(X,U);return A().appendChild(X),X}}function y0(){return(z,Z,J)=>{let X=document.createElement("a"),Y,G,U,Q;if(z===void 0);else if(typeof z==="string"&&S0(z)){if(Y=z,Z===void 0);else if(c(Z)){if(G=Z,J!==void 0)U=J}else if(M(Z))U=Z}else if(V(z))Q=z;else if(M(z)){if(U=z,Z!==void 0&&V(Z))Q=Z}if(Y!==void 0)X.href=Y;if(G!==void 0)o(X,G);if(U)x(X,U);let F=[],L=(_)=>F.push(_);if(Q){let _=document.createDocumentFragment();S(_);try{Q(X,L)}finally{k()}X.appendChild(_)}if(A().appendChild(X),F.length>0)requestAnimationFrame(()=>{for(let _ of F)_()});return X}}function c(z){return typeof z==="string"||typeof z==="number"||y(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function C0(z){if(typeof z!=="function")return!1;if(y(z))return!1;return z.length<=1}function S0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function x0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var w0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function Z1(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function J1(z,Z,J){switch(Z){case"value":if("value"in z)z.value=String(J??"");break;case"checked":if("checked"in z)z.checked=Boolean(J);break;case"selected":if("selected"in z)z.selected=Boolean(J);break;case"muted":if("muted"in z)z.muted=Boolean(J);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(J??0);break;case"volume":if("volume"in z)z.volume=Number(J??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(J);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(J??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(J);break;case"textContent":z.textContent=String(J??"");break;case"innerText":z.innerText=String(J??"");break}}function k0(z,Z,J){if(Z==="class"||Z==="className"||Z==="classList")X1(z,J);else if(Z==="style")F1(z,J);else if(Z1(Z))J1(z,Z,J);else if(typeof J==="boolean")if(J)z.setAttribute(w0[Z]??Z,"");else z.removeAttribute(w0[Z]??Z);else z.setAttribute(w0[Z]??Z,String(J))}function x(z,Z){for(let J in Z){let X=Z[J];if(X===null||X===void 0)continue;if(J.startsWith("on")&&typeof X==="function"){let Y=J.slice(2).toLowerCase();D0(z,Y,X)}else if(y(X))m(()=>k0(z,J,X.value));else k0(z,J,X)}}function X1(z,Z){if(typeof Z==="string")z.className=Z;else if(Array.isArray(Z))z.className=Z.filter(Boolean).join(" ");else if(typeof Z==="object"&&Z!==null){let J=!1;for(let Y in Z)if(y(Z[Y])){J=!0;break}let X=()=>{let Y=[];for(let G in Z){let U=Z[G];if(y(U)?U.value:U)Y.push(G)}z.className=Y.join(" ")};if(J)m(X);else X()}}function Y1(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function A0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let Z=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${Z} / ${z.alpha})`:`color(${z.space} ${Z})`}case"color-mix":{let Z=typeof z.color1==="object"?A0(z.color1):z.color1,J=typeof z.color2==="object"?A0(z.color2):z.color2,X=z.percentage1!==void 0?`${z.percentage1}%`:"",Y=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${Z} ${X}, ${J} ${Y})`}}}function h0(z){if(z===null||z===void 0)return"";if(Y1(z))return A0(z);return String(z)}function m0(z,Z,J){if(Z.startsWith("--")){z.setProperty(Z,J);return}if(Z.startsWith("webkit")||Z.startsWith("moz")||Z.startsWith("ms")||Z.startsWith("o")){let X=Z.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(X,J);return}try{z[Z]=J}catch{z.setProperty(Z,J)}}function F1(z,Z){if(typeof Z==="string")z.setAttribute("style",Z);else if(typeof Z==="object"&&Z!==null){let J=!1;for(let X in Z)if(y(Z[X])){J=!0;break}if(J)m(()=>{for(let X in Z){let Y=Z[X],G=y(Y)?Y.value:Y;m0(z.style,X,h0(G))}});else for(let X in Z){let Y=Z[X];m0(z.style,X,h0(Y))}}}function o(z,Z){if(y(Z))m(()=>{z.textContent=String(Z.value)});else z.textContent=String(Z)}function M(z){return typeof z==="object"&&z!==null&&!y(z)&&!Array.isArray(z)}function V(z){return typeof z==="function"&&!y(z)}var P=y0(),O0=E0(),g=e("button"),i1=e("summary"),c1=e("option"),o1=e("optgroup"),b0=D("h1"),v0=D("h2"),z0=D("h3"),Z0=D("h4"),n1=D("h5"),r1=D("h6"),n=D("p"),q=D("div"),l1=D("article"),H0=D("section"),a1=D("aside"),s0=D("header"),p0=D("footer"),t1=D("main"),e1=D("blockquote"),z5=D("figcaption"),L0=D("pre"),Z5=D("address"),R=D("span"),J5=D("strong"),X5=D("em"),Y5=D("small"),F5=D("mark"),Q5=D("code"),j5=D("samp"),q5=D("kbd"),G5=D("var"),U5=D("i"),D5=D("b"),H5=D("u"),L5=D("s"),f5=D("del"),K5=D("ins"),_5=D("sub"),W5=D("sup"),R5=D("abbr"),N5=D("cite"),I5=D("dfn"),$5=D("q"),w5=D("time"),A5=D("data"),O5=D("bdi"),M5=D("bdo"),B5=D("ruby"),V5=D("rp"),T5=D("rt"),P5=D("label"),C5=D("legend"),E5=D("output"),x5=D("caption"),y5=D("td"),S5=D("th"),s=D("li"),k5=D("dd"),h5=D("dt"),m5=D("title"),b5=T("input"),v5=T("br"),s5=T("hr"),p5=T("meta"),g5=T("link"),d5=T("area"),u5=T("base"),i5=T("col"),c5=T("embed"),o5=T("source"),n5=T("track"),r5=T("wbr"),r=f("ul"),l5=f("ol"),a5=f("menu"),t5=f("table"),e5=f("tbody"),zz=f("thead"),Zz=f("tfoot"),Jz=f("tr"),Xz=f("colgroup"),Yz=f("form"),Fz=f("fieldset"),Qz=f("details"),jz=f("dialog"),g0=f("nav"),qz=f("figure"),Gz=f("select"),Uz=f("datalist"),Dz=f("dl"),Hz=f("audio"),Lz=f("video"),fz=f("picture"),Kz=f("iframe"),_z=f("object"),Wz=f("canvas"),Rz=f("map"),Nz=f("body"),Iz=f("head"),$z=f("html"),wz=f("hgroup"),Az=f("template"),Oz=f("slot"),Mz=f("noscript"),Bz=f("script"),Vz=f("style"),Tz=f("textarea"),Pz=f("meter"),Cz=f("progress"),Ez=f("search");var Q1=()=>{if(typeof localStorage<"u"&&localStorage.getItem("fia-theme"))return localStorage.getItem("fia-theme");if(typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark";return"dark"},l=I(B({current:Q1()}));m(()=>{let z=l.current;if(typeof localStorage<"u")localStorage.setItem("fia-theme",z);if(typeof document<"u"){if(document.documentElement.setAttribute("data-theme",z),!document.getElementById("fia-theme-styles")){let Z=document.createElement("style");Z.id="fia-theme-styles",Z.textContent=`
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
            `,document.head.appendChild(Z)}if(z==="dark")document.body.classList.add("dark"),document.body.classList.remove("light");else document.body.classList.add("light"),document.body.classList.remove("dark")}});var d0=()=>{l.current=l.current==="dark"?"light":"dark"};var u0=()=>g0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{q({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{R({style:{color:"var(--mongo-green)"},textContent:"fia"})}),q({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{P({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),P({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),g({style:{background:"none",border:"none",cursor:"pointer",padding:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:I(()=>l.current==="dark"?"var(--text-primary)":"var(--mongo-green)")},onclick:d0},()=>{R({textContent:I(()=>l.current==="dark"?"\uD83C\uDF19":"☀️")})}),P({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var i0=()=>s0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{b0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{q({textContent:"Bare Metal JavaScript"}),q({class:"text-gradient",textContent:"No JSX. Value Native."})}),n({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.8",position:"relative",zIndex:"1",display:"flex",flexWrap:"wrap",gap:"0.5rem 1.5rem",justifyContent:"center",alignItems:"center"}},()=>{["Almost Native DOM","Signals Immutable by Design","No JSX","No Virtual DOM","No Dependencies"].forEach((Z)=>{R({style:{display:"inline-flex",alignItems:"center",gap:"0.5rem"}},()=>{R({style:{color:"var(--mongo-green)",fontSize:"0.8em"},textContent:"✦"}),R({textContent:Z})})})}),q({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{g({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),P({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),q({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),q({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),q({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),q({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),q({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function f0(z,Z=10){let J,X=()=>{J=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},Y=(U)=>{if(!J)J=z.getBoundingClientRect();let Q=U.clientX-J.left,F=U.clientY-J.top,L=J.width/2,_=J.height/2,$=(F-_)/_*-Z,W=(Q-L)/L*Z;z.style.transform=`
            perspective(1000px)
            rotateX(${$}deg)
            rotateY(${W}deg)
            scale3d(1.02, 1.02, 1.02)
        `},G=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",X),z.addEventListener("mousemove",Y),z.addEventListener("mouseleave",G),()=>{z.removeEventListener("mouseenter",X),z.removeEventListener("mousemove",Y),z.removeEventListener("mouseleave",G)}}var C=(z)=>{A().appendChild(document.createTextNode(z))},c0=()=>q({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{q({style:{borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{f0(z,5),q({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let Z=(Y)=>R({style:{color:"var(--syntax-keyword)"},textContent:Y}),J=(Y)=>R({style:{color:"var(--syntax-function)"},textContent:Y}),X=(Y)=>R({style:{color:"var(--syntax-string)"},textContent:Y});L0({style:{transform:"translateZ(40px)"}},()=>{q(()=>{Z("import"),C(" { $, div, button, Mut } "),Z("from"),X(' "fia"'),C(";")}),C(" "),q(()=>{Z("const"),C(" count = "),J("$"),C("("),J("Mut"),C("(0));")}),C(" "),q(()=>{J("button"),C("("),X('"Increment"'),C(", () => count.value++);")}),C(" "),q(()=>{J("div"),C("("),J("$"),C("(() => "),X("`Count: ${count.value}`"),C("));")})})})});var d=(z,Z,J)=>q({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(X)=>{f0(X,15),q({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:J}),z0({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),n({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:Z})}),o0=()=>H0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{d("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),d("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),d("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),d("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),d("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),d("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),d("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),d("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var n0=()=>p0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{q({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{q({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var j1=(z)=>{A().appendChild(document.createTextNode(z))},K0=(z)=>{let _=new Set(["const","let","var","import","from","export","default","function","return","if","else","for","while","do","switch","case","break","continue","new","delete","typeof","instanceof","class","extends","implements","interface","type","enum","async","await","yield","throw","try","catch","finally","true","false","null","undefined","void","this","super","of","in","as"]),$=new Set(["string","number","boolean","object","any","never","unknown","Array","Promise","Map","Set","Record","Partial","Required","Signal","Mut","MaybeSignal"]),W=new Set(["div","button","h1","h2","h3","h4","h5","h6","p","ul","ol","li","input","span","section","article","nav","form","table","tr","td","th","a","img","pre","code","header","footer","main","aside","label","select","option","textarea","strong","em","canvas","video","audio","console","document","window","navigator","Show","Each","Match","$","Mut","setTimeout","setInterval","requestAnimationFrame","map","filter","forEach","reduce","find","some","every","push","pop","splice","slice","join","split","JSON","Math","Object","Number","String"]),O=/\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|=>|[{}()\[\];,.]|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[+\-*/%=!<>&|?:~^]+|\s+|./g,E=z.match(O)||[];E.forEach((K,W0)=>{if(K.startsWith("//")||K.startsWith("/*"))R({style:{color:"var(--syntax-comment)",fontStyle:"italic"},textContent:K});else if(K.startsWith("`"))K.split(/(\$\{[^}]*\})/).forEach((R0)=>{if(R0.startsWith("${")){R({style:{color:"#89ddff"},textContent:"${"});let t=R0.slice(2,-1);if(W.has(t)||_.has(t))R({style:{color:W.has(t)?"var(--syntax-function)":"var(--syntax-keyword)"},textContent:t});else R({style:{color:"var(--text-primary)"},textContent:t});R({style:{color:"#89ddff"},textContent:"}"})}else R({style:{color:"var(--syntax-string)"},textContent:R0})});else if(K.startsWith('"')||K.startsWith("'"))R({style:{color:"var(--syntax-string)"},textContent:K});else if(K==="=>")R({style:{color:"#89ddff"},textContent:K});else if(/^\d+(\.\d+)?$/.test(K))R({style:{color:"#f78c6c"},textContent:K});else if(_.has(K))R({style:{color:"var(--syntax-keyword)",fontStyle:K==="this"?"italic":"normal"},textContent:K});else if($.has(K))R({style:{color:"#ffcb6b"},textContent:K});else if(/^[a-zA-Z_$]/.test(K)&&E[W0+1]?.trim()==="(")if(W.has(K))R({style:{color:"var(--syntax-function)"},textContent:K});else R({style:{color:"var(--syntax-function)"},textContent:K});else if(W.has(K))R({style:{color:"var(--syntax-function)"},textContent:K});else if(W0>0&&E[W0-1]==="."&&/^[a-zA-Z_$]/.test(K))R({style:{color:"#82aaff"},textContent:K});else if(/^[{}()\[\];,.]$/.test(K))R({style:{color:"#89ddff"},textContent:K});else if(/^[+\-*/%=!<>&|?:~^]+$/.test(K))R({style:{color:"#89ddff"},textContent:K});else j1(K)})};var _0=(z)=>{let Z=I(B(0));q({style:{marginBottom:"1.5rem"}},()=>{q({style:{display:"flex",gap:"4px",borderBottom:"1px solid #e0e0e0",marginBottom:"1rem"}},()=>{G0(z,(J,X)=>{g({textContent:J.label,style:{padding:"8px 16px",background:I(()=>Z.value===X?"#2563eb":"transparent"),color:I(()=>Z.value===X?"white":"#666"),border:"none",borderBottom:I(()=>Z.value===X?"2px solid #2563eb":"2px solid transparent"),cursor:"pointer",fontSize:"14px",fontWeight:I(()=>Z.value===X?"600":"400"),transition:"all 0.2s"},onclick:()=>Z.value=X})})}),q({style:{position:"relative"}},()=>{G0(z,(J,X)=>{q({style:{display:I(()=>Z.value===X?"block":"none"),background:"#1e1e1e",color:"#d4d4d4",padding:"1rem",borderRadius:"4px",overflow:"auto",fontFamily:"monospace",fontSize:"14px",whiteSpace:"pre"}},()=>{K0(J.code)})})})})};var a=(z)=>{A().appendChild(document.createTextNode(z))},H=(z)=>q({class:"code-block animate-fade-up",style:{borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{q({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{q({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let Z=I(B(!1));g({textContent:I(()=>Z.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:I(()=>Z.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),Z.value=!0,setTimeout(()=>Z.value=!1,2000)}})}),L0({style:{margin:"0",overflowX:"auto"}},()=>{K0(z)})}),q1=(z)=>{let Z=document.createElement("div");Z.textContent=z,Object.assign(Z.style,{position:"fixed",bottom:"2rem",left:"50%",transform:"translateX(-50%) translateY(20px)",background:"var(--mongo-green)",color:"var(--mongo-dark)",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:"600",fontSize:"0.875rem",zIndex:"9999",opacity:"0",transition:"opacity 0.3s, transform 0.3s",pointerEvents:"none",boxShadow:"0 4px 20px rgba(0, 237, 100, 0.3)"}),document.body.appendChild(Z),requestAnimationFrame(()=>{Z.style.opacity="1",Z.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{Z.style.opacity="0",Z.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>Z.remove(),300)},2000)},M0=(z)=>{P({href:`#${z}`,ariaLabel:"Link to this section",style:{opacity:"0",marginLeft:"0.5rem",color:"var(--text-tertiary)",textDecoration:"none",fontSize:"0.75em",transition:"opacity 0.2s, color 0.2s",cursor:"pointer",flexShrink:"0"},className:"anchor-link",textContent:"\uD83D\uDD17",onclick:(Z)=>{Z.preventDefault(),history.replaceState(null,"",`#${z}`);let J=window.location.href;navigator.clipboard.writeText(J).then(()=>{q1("✓ Link copied to clipboard")});let X=document.getElementById(z);if(X){let G=X.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:G,behavior:"smooth"})}}})},h=(z,Z,J)=>{H0({id:Z,class:"animate-fade-up heading-group",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{q({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{q({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),v0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z}),M0(Z)}),J()})},w=(z,Z,J)=>{let X=typeof Z==="string"?Z:z.toLowerCase().replace(/\s+/g,"-"),Y=typeof Z==="function"?Z:J;q({class:"heading-group",style:{marginBottom:"3rem",paddingBottom:"2rem",borderBottom:"1px solid var(--border-subtle)"}},()=>{q({style:{display:"flex",alignItems:"center",marginBottom:"1.5rem"}},()=>{z0({id:X,style:{color:"var(--mongo-green)",fontSize:"1.5rem",scrollMarginTop:"120px"},textContent:z}),M0(X)}),Y()})},N=(z,Z,J)=>{let X=typeof Z==="string"?Z:z.toLowerCase().replace(/\s+/g,"-"),Y=typeof Z==="function"?Z:J;q({class:"heading-group",style:{marginBottom:"1.5rem"}},()=>{q({style:{display:"flex",alignItems:"center",marginBottom:"0.75rem"}},()=>{Z0({id:X,style:{fontSize:"1.2rem",color:"var(--mongo-white)",fontWeight:"600",scrollMarginTop:"120px"},textContent:z}),M0(X)}),Y()})},j=(z)=>n({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>a(z)),J0=(z)=>r({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((Z)=>s(Z))}),p=(z,Z="info")=>q({style:{background:Z==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${Z==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:Z==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>a(z)),r0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow",children:[{id:"control-flow-show",title:"Show"},{id:"control-flow-each",title:"Each"},{id:"control-flow-match",title:"Match",children:[{id:"match-strings",title:"Strings"},{id:"match-booleans",title:"Booleans"},{id:"match-numbers",title:"Numbers"}]}]},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],G1=()=>{let z=I(B("intro")),Z=[];for(let X of r0)if(Z.push(X.id),X.children){for(let Y of X.children)if(Z.push(Y.id),Y.children)for(let G of Y.children)Z.push(G.id)}let J=()=>{let X=window.scrollY+150,Y=Z[0];for(let G of Z){let U=document.getElementById(G);if(U){if(U.getBoundingClientRect().top+window.scrollY<=X)Y=G}}z.value=Y};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",J),J()},0);return q({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{q({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{z0({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),r({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{let X=(Y)=>{let G=[];if(Y.children)for(let U of Y.children)G.push(U.id),G.push(...X(U));return G};r0.forEach((Y)=>{let G=X(Y),U=()=>z.value===Y.id||G.includes(z.value);s({style:{marginBottom:"0.5rem"}},()=>{if(P({href:`#${Y.id}`,style:{color:I(()=>U()?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:I(()=>U()?"600":"400"),borderLeft:I(()=>U()?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:Y.title,onclick:(Q)=>{Q.preventDefault();let F=document.getElementById(Y.id);if(F){let _=F.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:_,behavior:"smooth"}),z.value=Y.id}}}),Y.children)r({style:{listStyle:"none",padding:"0",marginTop:"0.5rem"}},()=>{Y.children.forEach((Q)=>{s({style:{marginBottom:"0.25rem"}},()=>{if(P({href:`#${Q.id}`,style:{color:I(()=>z.value===Q.id?"var(--mongo-green)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.8rem",display:"block",padding:"0.25rem 0 0.25rem 1.5rem",transition:"color 0.2s",fontWeight:I(()=>z.value===Q.id?"600":"400")},textContent:Q.title,onclick:(F)=>{F.preventDefault();let L=document.getElementById(Q.id);if(L){let $=L.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:$,behavior:"smooth"})}z.value=Q.id}}),Q.children)r({style:{listStyle:"none",padding:"0",marginTop:"0.25rem"}},()=>{Q.children.forEach((F)=>{s({style:{marginBottom:"0.25rem"}},()=>{P({href:`#${F.id}`,style:{color:I(()=>z.value===F.id?"var(--mongo-green)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.75rem",display:"block",padding:"0.25rem 0 0.25rem 3rem",transition:"color 0.2s",fontWeight:I(()=>z.value===F.id?"600":"400")},textContent:F.title,onclick:(L)=>{L.preventDefault();let _=document.getElementById(F.id);if(_){let W=_.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:W,behavior:"smooth"})}z.value=F.id}})})})})})})})})})})})})},l0=()=>q({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{G1(),q({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{q({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{P({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{O0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),P({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{O0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),h("Introduction","intro",()=>{j("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),h("Why Fia?","why-fia",()=>{j("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),r({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{s({style:{marginBottom:"0.5rem"}},()=>{R({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),a("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),s({style:{marginBottom:"0.5rem"}},()=>{R({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),a("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),s({style:{marginBottom:"0.5rem"}},()=>{R({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),a("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),s({style:{marginBottom:"0.5rem"}},()=>{R({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),a("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),h("Getting Started","getting-started",()=>{w("Prerequisites",()=>{j("Fia is compatible with any modern JavaScript runtime."),J0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),w("Installation",()=>{j("Fia is published on JSR. Install it using your preferred package manager:"),q({style:{marginBottom:"1rem"}},()=>{Z0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),H("deno add jsr:@fia/core")}),q({style:{marginBottom:"1rem"}},()=>{Z0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),j('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),j("2. Install (aliased as 'fia'):"),H("bun add fia@npm:@jsr/fia__core")}),q({style:{marginBottom:"1rem"}},()=>{Z0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),H("npx jsr add @fia/core")}),p("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),w("Updating",()=>{j("To update to the latest version, run the installation command again (or use your package manager's update command)."),H(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),w("Quick Start",()=>{j("Create your first reactive app in seconds."),H(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),w("Mounting",()=>{j("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),H(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),h("Element API","element-api",()=>{j("Fia elements have a simple, consistent API. Functions match HTML tag names."),H(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),N("Event Handlers",()=>{j("Event handlers are delegated automatically for performance."),H(`button("Click me", () => console.log("clicked!"));

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),N("Nesting Elements",()=>{j("Use a callback function to nest elements."),H(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),N("Void Elements",()=>{j("Elements like input, img, br only accept props."),H(`input({ type: "email", placeholder: "you@example.com" });
img("/photo.jpg", "Photo");
br();`)}),N("onMount Callback",()=>{j("Access layout properties after the element is in the DOM."),H(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),h("Element Factory Types","element-factory-types",()=>{j("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),w("Standard Elements",()=>{j("Used for semantic structure elements. Click each tab to see the different patterns for creating an article:"),_0([{label:"Empty",code:`// Overload 1: Empty element
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
});`}]),p("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),w("Text Elements",()=>{j("Optimized for elements that commonly hold text content. Click each tab to see different ways to create the same heading:"),_0([{label:"Empty",code:`// Overload 1: Empty element
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
});`}]),p("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),w("Interactive Elements",()=>{j("Special factories for interactive elements with convenient text + click handler shorthand:"),_0([{label:"Text + Click ⭐⭐",code:`// Text + click handler shorthand
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
});`}]),p("Elements: button, summary, option, optgroup.")}),w("Void Elements",()=>{j("Self-closing elements that cannot have children."),H(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),p("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),w("Type Safety Benefits",()=>{j("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),H(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),h("Reactivity","reactivity",()=>{w("Signals",()=>{j("Signals are the primitive units of reactivity."),H(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),w("Reactive Stores",()=>{j("Fia stores are immutable by default for predictability."),H(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),p("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),p("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),w("Computed Values",()=>{j("Computed signals automatically track dependencies and update when they change."),H(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),w("Effects",()=>{j("Use $e() to run side effects when dependencies change."),H(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),h("Immutability","immutability",()=>{j("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),w("Data Types & Behavior",()=>{N("1. Primitives (String, Number, Boolean)",()=>{j("Primitives are immutable by default. To make them mutable, use Mut."),H(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),N("2. Objects",()=>{j("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),H(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),j("Mutable Objects:"),H(`// Option A: Specific keys
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
// unless the parent key is also mutable.`)}),N("Secure Immutability by Design",()=>{j("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),H(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),p("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),N("3. Arrays",()=>{j("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),H(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),j("Mutable Arrays:"),H(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),N("4. Nested Objects (Deep Reactivity)",()=>{j("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),H(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),h("Control Flow","control-flow",()=>{w("Show","control-flow-show",()=>{j("Conditionally render content that updates when the condition changes."),H('Show(() => isVisible.value, () => div("Hello!"));')}),w("Each","control-flow-each",()=>{j("Reactive list rendering that re-renders efficiently."),H(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li(item));`)}),w("Match","control-flow-match",()=>{j("Reactive pattern matching for switch/case logic. Automatically updates rendering when the matched value changes."),j("Match accepts signals or getter functions, and returns Signal<R> with '_' default or Signal<R | undefined> without."),N("Strings","match-strings",()=>{j("Match exact string values:"),H(`const status = $(Mut("active"));

Match(status, {
  "active": () => span({ class: "success" }, () => t("Active")),
  "inactive": () => span({ class: "danger" }, () => t("Inactive")),
  "pending": () => span({ class: "warning" }, () => t("Pending")),
  _: () => span("Unknown")
});`)}),N("Booleans","match-booleans",()=>{j("Boolean values are automatically converted to string keys:"),H(`const isActive = $(Mut(true));

Match(isActive, {
  "true": () => "✅ Active",
  "false": () => "❌ Inactive"
});`)}),N("Numbers","match-numbers",()=>{j("Numbers support exact matching:"),H(`const count = $(Mut(2));

Match(count, {
  "0": () => "None",
  "1": () => "One",
  "2": () => "Two",
  _: () => "Many"
});`),j("For numeric values, Match also supports range-based comparisons using operators and interval notation:"),H(`const age = $(Mut(25));

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
});`),p("Range patterns only work with numeric values. Exact string matches are checked before range patterns.","info")})})}),h("Component Composition","components",()=>{j("In Fia, components are just functions. There is no special class or type."),w("Basic Component",()=>{H(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),w("Children & Layouts",()=>{j("To create wrapper components, pass a callback function as a child prop."),H(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),h("Performance","performance",()=>{j("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),w("Event Delegation",()=>{j("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),H(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),N("How it works",()=>{J0(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),N("Benefits",()=>{J0(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),H(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),w("Automatic Fragment Batching",()=>{j("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),H(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),N("How it works",()=>{J0(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),N("Benefits",()=>{J0(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),H(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),w("Fine-Grained Reactivity",()=>{j("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),H(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),w("Best Practices",()=>{N("1. Batch Multiple Updates",()=>{H(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),N("2. Use peek() for Non-Reactive Reads",()=>{H(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),N("3. Memoize Expensive Computations",()=>{H(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),h("Examples","examples",()=>{w("\uD83D\uDFE2 Beginner",()=>{N("1. Hello World",()=>{j("The simplest possible Fia code."),H('h1("Hello, World!");')}),N("2. Counter",()=>{j("Signals hold reactive state."),H(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),N("3. Toggle",()=>{j("Computed signals derive values from other signals."),H(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
Show(visible, () => p("Now you see me!"));`)}),N("4. Input Binding",()=>{j("Two-way binding is manual but explicit."),H('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),N("5. List Rendering (Static)",()=>{j("For simple static lists, forEach works fine."),H(`const items = ["Apple", "Banana", "Cherry"];
ul(() => Each(items, li));`)})}),w("\uD83D\uDFE1 Intermediate",()=>{N("6. Reactive Store Counter",()=>{j("Objects passed to $() become reactive stores."),H(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),N("7. Conditional Classes",()=>{j("Computed signals work in class props too."),H(`const active = $(Mut(false));
button($(() => active.value ? "Deactivate" : "Activate"), () => active.value = !active.value);`)}),N("8. Form Handling",()=>{j("Reactive stores are perfect for forms."),H(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),N("9. Computed Values",()=>{j("Track dependencies automatically."),H('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),N("10. Dynamic Styling",()=>{j("Reactive styles allow theming."),H(`const theme = $(Mut("light"));

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
});`)})}),w("\uD83D\uDD34 Advanced",()=>{N("11. Control Flow Combo (Each + Show + Match)",()=>{j("A complete task manager combining all control flow components:"),H(`// Task manager example combining Each, Show, and Match
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
});`)}),N("12. Todo App",()=>{j("A complete todo app using Each."),H(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),N("12. Tabs Component",()=>{j("Track active index and conditionally render."),H(`const tabs = ["Home", "About", "Contact"];
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
});`)}),N("13. Async Data Fetching",()=>{j("Use Match for loading states."),H(`const state = $(Mut({
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
});`)}),N("14. Modal Dialog",()=>{j("Modal patterns with explicit types."),H(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var a0=()=>{let z=I(B(0)),Z=I(B(0)),J=I(B(0));return document.addEventListener("mousemove",(X)=>{z.value=X.clientX,Z.value=X.clientY,J.value=1}),document.addEventListener("mouseout",()=>{J.value=0}),q({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:I(()=>`translate(${z.value-200}px, ${Z.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:I(()=>J.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var U1=()=>q({id:"landing-page"},()=>{a0(),u0(),i0(),c0(),o0(),l0(),n0()});U1();
