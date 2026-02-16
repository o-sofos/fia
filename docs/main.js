var m=void 0,X0=0,A0=0,i=void 0;function Y0(z){if(m)z.subs.add(m),m.deps.add(z)}function F0(z){z.version=++X0;let Z=[...z.subs];for(let J of Z)if(A0>0){if(!i)i=new Set;i.add(J)}else J.execute()}function Q0(z){for(let Z of z.deps)Z.subs.delete(z);z.deps.clear()}function S(z){let Z=!0,J={execute(){if(!Z)return;Q0(J);let X=m;m=J;try{z()}finally{m=X}},deps:new Set,cleanup(){Z=!1,Q0(J)}};return J.execute(),()=>J.cleanup()}function $0(z,Z=!1){let J={version:X0,subs:new Set},X=z,Y=function(H){if(arguments.length>0){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(X,H))X=H,F0(J);return}return Y0(J),X};return Object.defineProperty(Y,"value",{get(){return Y0(J),X},set(H){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(X,H))X=H,F0(J)}}),Y[W0]=!0,Y.peek=()=>X,Y}function n0(z){let Z={version:X0,subs:new Set},J,X=-1,Y={execute(){Z.version=++X0;let Q=[...Z.subs];for(let F of Q)if(A0>0){if(!i)i=new Set;i.add(F)}else F.execute()},deps:new Set,cleanup(){Q0(Y)}},H=()=>{Q0(Y);let Q=m;m=Y;try{let F=z();if(!Object.is(J,F))J=F;X=Z.version}finally{m=Q}};H();let U=function(){if(X!==Z.version)H();return Y0(Z),J};return Object.defineProperty(U,"value",{get(){return U()}}),U[W0]=!0,U.peek=()=>{if(X!==Z.version)H();return J},U}var O0=Symbol("mutable");function M(z){return{value:z,[O0]:!0}}function h(z){return z!==null&&typeof z==="object"&&z[O0]===!0}var _0=Symbol("reactive-proxy"),J0=Symbol("raw");function K0(z){return z!==null&&typeof z==="object"&&_0 in z}function u(z,Z=!1){let J=new Map,X=new WeakMap;function Y(Q){let F=J.get(Q);if(!F)F={version:0,subs:new Set},J.set(Q,F);return F}if(Z===!1||Z instanceof Set&&Z.size===0){let Q=!1;for(let F in z)if(h(z[F])){Q=!0;break}if(Array.isArray(z)&&!Q){for(let F=0;F<z.length;F++)if(h(z[F])){Q=!0;break}}if(!Q){if(Array.isArray(z))for(let F=0;F<z.length;F++){let f=z[F];if(f&&typeof f==="object"&&!h(f)&&!K0(f))z[F]=u(f,!1)}else for(let F in z){let f=z[F];if(f&&typeof f==="object"&&!h(f)&&!K0(f))z[F]=u(f,!1)}Object.freeze(z)}}return new Proxy(z,{get(Q,F,f){if(F===J0||F==="$raw")return Q;if(F===_0)return!0;let W=Y(F);Y0(W);let R=Reflect.get(Q,F,f);if(h(R)){let N=X.get(R);if(N?.mutable)return N.mutable;let A=R.value;if(A!==null&&typeof A==="object"){let v=u(A,!0);if(!N)N={},X.set(R,N);return N.mutable=v,v}return A}if(R!==null&&typeof R==="object"&&!K0(R)){let N=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(F),A=X.get(R);if(A){let a=N?A.mutable:A.readonly;if(a)return a}let v=u(R,N);if(!A)A={},X.set(R,A);if(N)A.mutable=v;else A.readonly=v;return v}return R},set(Q,F,f,W){let R=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(F),N=Reflect.get(Q,F,W);if(!R&&h(N)){if(N.value===null||typeof N.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(F);R=!0}}if(!R)return!1;let A=f!==null&&typeof f==="object"&&J0 in f?f[J0]:f,v=Array.isArray(Q)&&F==="length";if(Object.is(N,A)&&!v)return!0;if(Reflect.set(Q,F,A,W),N!==null&&typeof N==="object")X.delete(N);let a=J.get(F);if(a)F0(a);return!0},has(Q,F){if(F===_0||F===J0||F==="$raw")return!0;return Reflect.has(Q,F)},ownKeys(Q){return Reflect.ownKeys(Q)},getOwnPropertyDescriptor(Q,F){return Reflect.getOwnPropertyDescriptor(Q,F)},deleteProperty(Q,F){let f=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(F);if(!f){let N=Reflect.get(Q,F);if(h(N)){if(N.value===null||typeof N.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(F);f=!0}}}if(!f)return!1;let W=Reflect.has(Q,F),R=Reflect.deleteProperty(Q,F);if(W&&R){let N=J.get(F);if(N)F0(N)}return R}})}function _(z,...Z){if(typeof z==="function")return n0(z);if(z!==null&&typeof z==="object"&&!h(z))return u(z,new Set(Z));if(h(z)){if(typeof z.value==="object"&&z.value!==null)return u(z.value,!0);return $0(z.value,!1)}return $0(z,!0)}var W0=Symbol("signal");function E(z){return typeof z==="function"&&z[W0]===!0}var j0=[];function k(z){j0.push(z)}function x(){j0.pop()}function $(){return j0[j0.length-1]??document.body}function q0(z,Z){let J=document.createComment("Each");$().appendChild(J);let X=[];S(()=>{for(let U of X)U.parentNode?.removeChild(U);X=[];let Y=typeof z==="function"&&!Array.isArray(z)?z():z,H=document.createDocumentFragment();k(H);try{for(let U=0;U<Y.length;U++)Z(Y[U],U)}finally{x()}X=Array.from(H.childNodes),J.parentNode?.insertBefore(H,J.nextSibling)})}var r0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),G0=new WeakMap,M0=new Set;function l0(z){let{target:Z,type:J}=z;while(Z){let X=G0.get(Z);if(X&&X[J]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:Z}),X[J](z),z.cancelBubble)break}Z=Z.parentElement}}function H0(z,Z,J){if(r0.has(Z)){if(!M0.has(Z))document.addEventListener(Z,l0,{capture:!1,passive:!1}),M0.add(Z);let X=G0.get(z);if(!X)X={},G0.set(z,X);X[Z]=J}else z.addEventListener(Z,J)}if(typeof window<"u")window.__eventHandlerMap=G0;function L(z){return(Z,J)=>{let X=document.createElement(z),Y,H;if(Z===void 0);else if(B(Z))H=Z;else if(O(Z)){if(Y=Z,J!==void 0)H=J}if(Y)C(X,Y);let U=[],Q=(F)=>U.push(F);if(H){let F=document.createDocumentFragment();k(F);try{H(X,Q)}finally{x()}X.appendChild(F)}if($().appendChild(X),U.length>0)requestAnimationFrame(()=>{for(let F of U)F()});return X}}function G(z){return(Z,J,X)=>{let Y=document.createElement(z),H,U,Q;if(Z===void 0);else if(o(Z)){if(H=Z,J===void 0);else if(B(J))Q=J;else if(O(J)){if(U=J,X!==void 0)Q=X}}else if(B(Z))Q=Z;else if(O(Z)){if(U=Z,J!==void 0&&B(J))Q=J}if(H!==void 0)c(Y,H);if(U)C(Y,U);let F=[],f=(W)=>F.push(W);if(Q){let W=document.createDocumentFragment();k(W);try{Q(Y,f)}finally{x()}Y.appendChild(W)}if($().appendChild(Y),F.length>0)requestAnimationFrame(()=>{for(let W of F)W()});return Y}}function t(z){return(Z,J,X)=>{let Y=document.createElement(z),H,U,Q,F;if(Z===void 0);else if(o(Z)){if(H=Z,J===void 0);else if(B0(J))U=J;else if(B(J))F=J;else if(O(J)){if(Q=J,X!==void 0)F=X}}else if(B(Z))F=Z;else if(O(Z)){if(Q=Z,J!==void 0&&B(J))F=J}if(H!==void 0)c(Y,H);if(U)H0(Y,"click",U);if(Q)C(Y,Q);let f=[],W=(R)=>f.push(R);if(F){let R=document.createDocumentFragment();k(R);try{F(Y,W)}finally{x()}Y.appendChild(R)}if($().appendChild(Y),f.length>0)requestAnimationFrame(()=>{for(let R of f)R()});return Y}}function V(z){return(Z)=>{let J=document.createElement(z);if(Z)C(J,Z);return $().appendChild(J),J}}function V0(){return(z,Z,J)=>{let X=document.createElement("img"),Y,H,U;if(z===void 0);else if(typeof z==="string"&&T0(z)){if(Y=z,Z===void 0);else if(typeof Z==="string"){if(H=Z,J!==void 0)U=J}else if(O(Z))U=Z}else if(O(z))U=z;if(Y!==void 0)X.src=Y;if(H!==void 0)X.alt=H;if(U)C(X,U);return $().appendChild(X),X}}function P0(){return(z,Z,J)=>{let X=document.createElement("a"),Y,H,U,Q;if(z===void 0);else if(typeof z==="string"&&C0(z)){if(Y=z,Z===void 0);else if(o(Z)){if(H=Z,J!==void 0)U=J}else if(O(Z))U=Z}else if(B(z))Q=z;else if(O(z)){if(U=z,Z!==void 0&&B(Z))Q=Z}if(Y!==void 0)X.href=Y;if(H!==void 0)c(X,H);if(U)C(X,U);let F=[],f=(W)=>F.push(W);if(Q){let W=document.createDocumentFragment();k(W);try{Q(X,f)}finally{x()}X.appendChild(W)}if($().appendChild(X),F.length>0)requestAnimationFrame(()=>{for(let W of F)W()});return X}}function o(z){return typeof z==="string"||typeof z==="number"||E(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function B0(z){if(typeof z!=="function")return!1;if(E(z))return!1;return z.length<=1}function C0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function T0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var R0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function a0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function t0(z,Z,J){switch(Z){case"value":if("value"in z)z.value=String(J??"");break;case"checked":if("checked"in z)z.checked=Boolean(J);break;case"selected":if("selected"in z)z.selected=Boolean(J);break;case"muted":if("muted"in z)z.muted=Boolean(J);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(J??0);break;case"volume":if("volume"in z)z.volume=Number(J??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(J);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(J??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(J);break;case"textContent":z.textContent=String(J??"");break;case"innerText":z.innerText=String(J??"");break}}function E0(z,Z,J){if(Z==="class"||Z==="className"||Z==="classList")e0(z,J);else if(Z==="style")Z1(z,J);else if(a0(Z))t0(z,Z,J);else if(typeof J==="boolean")if(J)z.setAttribute(R0[Z]??Z,"");else z.removeAttribute(R0[Z]??Z);else z.setAttribute(R0[Z]??Z,String(J))}function C(z,Z){for(let J in Z){let X=Z[J];if(X===null||X===void 0)continue;if(J.startsWith("on")&&typeof X==="function"){let Y=J.slice(2).toLowerCase();H0(z,Y,X)}else if(E(X))S(()=>E0(z,J,X.value));else E0(z,J,X)}}function e0(z,Z){if(typeof Z==="string")z.className=Z;else if(Array.isArray(Z))z.className=Z.filter(Boolean).join(" ");else if(typeof Z==="object"&&Z!==null){let J=!1;for(let Y in Z)if(E(Z[Y])){J=!0;break}let X=()=>{let Y=[];for(let H in Z){let U=Z[H];if(E(U)?U.value:U)Y.push(H)}z.className=Y.join(" ")};if(J)S(X);else X()}}function z1(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function N0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let Z=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${Z} / ${z.alpha})`:`color(${z.space} ${Z})`}case"color-mix":{let Z=typeof z.color1==="object"?N0(z.color1):z.color1,J=typeof z.color2==="object"?N0(z.color2):z.color2,X=z.percentage1!==void 0?`${z.percentage1}%`:"",Y=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${Z} ${X}, ${J} ${Y})`}}}function k0(z){if(z===null||z===void 0)return"";if(z1(z))return N0(z);return String(z)}function x0(z,Z,J){if(Z.startsWith("--")){z.setProperty(Z,J);return}if(Z.startsWith("webkit")||Z.startsWith("moz")||Z.startsWith("ms")||Z.startsWith("o")){let X=Z.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(X,J);return}try{z[Z]=J}catch{z.setProperty(Z,J)}}function Z1(z,Z){if(typeof Z==="string")z.setAttribute("style",Z);else if(typeof Z==="object"&&Z!==null){let J=!1;for(let X in Z)if(E(Z[X])){J=!0;break}if(J)S(()=>{for(let X in Z){let Y=Z[X],H=E(Y)?Y.value:Y;x0(z.style,X,k0(H))}});else for(let X in Z){let Y=Z[X];x0(z.style,X,k0(Y))}}}function c(z,Z){if(E(Z))S(()=>{z.textContent=String(Z.value)});else z.textContent=String(Z)}function O(z){return typeof z==="object"&&z!==null&&!E(z)&&!Array.isArray(z)}function B(z){return typeof z==="function"&&!E(z)}var T=P0(),I0=V0(),g=t("button"),v1=t("summary"),g1=t("option"),p1=t("optgroup"),y0=G("h1"),S0=G("h2"),e=G("h3"),z0=G("h4"),d1=G("h5"),u1=G("h6"),n=G("p"),j=G("div"),i1=G("article"),U0=G("section"),o1=G("aside"),h0=G("header"),m0=G("footer"),c1=G("main"),n1=G("blockquote"),r1=G("figcaption"),D0=G("pre"),l1=G("address"),w=G("span"),a1=G("strong"),t1=G("em"),e1=G("small"),z5=G("mark"),Z5=G("code"),J5=G("samp"),X5=G("kbd"),Y5=G("var"),F5=G("i"),Q5=G("b"),j5=G("u"),q5=G("s"),G5=G("del"),H5=G("ins"),U5=G("sub"),D5=G("sup"),f5=G("abbr"),L5=G("cite"),K5=G("dfn"),_5=G("q"),W5=G("time"),R5=G("data"),N5=G("bdi"),I5=G("bdo"),w5=G("ruby"),$5=G("rp"),A5=G("rt"),O5=G("label"),M5=G("legend"),B5=G("output"),V5=G("caption"),T5=G("td"),P5=G("th"),b=G("li"),C5=G("dd"),E5=G("dt"),k5=G("title"),x5=V("input"),y5=V("br"),S5=V("hr"),h5=V("meta"),m5=V("link"),b5=V("area"),s5=V("base"),v5=V("col"),g5=V("embed"),p5=V("source"),d5=V("track"),u5=V("wbr"),r=L("ul"),i5=L("ol"),o5=L("menu"),c5=L("table"),n5=L("tbody"),r5=L("thead"),l5=L("tfoot"),a5=L("tr"),t5=L("colgroup"),e5=L("form"),zz=L("fieldset"),Zz=L("details"),Jz=L("dialog"),b0=L("nav"),Xz=L("figure"),Yz=L("select"),Fz=L("datalist"),Qz=L("dl"),jz=L("audio"),qz=L("video"),Gz=L("picture"),Hz=L("iframe"),Uz=L("object"),Dz=L("canvas"),fz=L("map"),Lz=L("body"),Kz=L("head"),_z=L("html"),Wz=L("hgroup"),Rz=L("template"),Nz=L("slot"),Iz=L("noscript"),wz=L("script"),$z=L("style"),Az=L("textarea"),Oz=L("meter"),Mz=L("progress"),Bz=L("search");var J1=()=>{if(typeof localStorage<"u"&&localStorage.getItem("fia-theme"))return localStorage.getItem("fia-theme");if(typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark";return"dark"},l=_(M({current:J1()}));S(()=>{let z=l.current;if(typeof localStorage<"u")localStorage.setItem("fia-theme",z);if(typeof document<"u"){if(document.documentElement.setAttribute("data-theme",z),!document.getElementById("fia-theme-styles")){let Z=document.createElement("style");Z.id="fia-theme-styles",Z.textContent=`
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
            `,document.head.appendChild(Z)}if(z==="dark")document.body.classList.add("dark"),document.body.classList.remove("light");else document.body.classList.add("light"),document.body.classList.remove("dark")}});var s0=()=>{l.current=l.current==="dark"?"light":"dark"};var v0=()=>b0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{j({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{w({style:{color:"var(--mongo-green)"},textContent:"fia"})}),j({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{T({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),T({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),g({style:{background:"none",border:"none",cursor:"pointer",padding:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:_(()=>l.current==="dark"?"var(--text-primary)":"var(--mongo-green)")},onclick:s0},()=>{w({textContent:_(()=>l.current==="dark"?"\uD83C\uDF19":"☀️")})}),T({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var g0=()=>h0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{y0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{j({textContent:"Bare Metal JavaScript"}),j({class:"text-gradient",textContent:"No JSX. Value Native."})}),n({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.8",position:"relative",zIndex:"1",display:"flex",flexWrap:"wrap",gap:"0.5rem 1.5rem",justifyContent:"center",alignItems:"center"}},()=>{["Almost Native DOM","Signals Immutable by Design","No JSX","No Virtual DOM","No Dependencies"].forEach((Z)=>{w({style:{display:"inline-flex",alignItems:"center",gap:"0.5rem"}},()=>{w({style:{color:"var(--mongo-green)",fontSize:"0.8em"},textContent:"✦"}),w({textContent:Z})})})}),j({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{g({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),T({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),j({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),j({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),j({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),j({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),j({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function f0(z,Z=10){let J,X=()=>{J=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},Y=(U)=>{if(!J)J=z.getBoundingClientRect();let Q=U.clientX-J.left,F=U.clientY-J.top,f=J.width/2,W=J.height/2,R=(F-W)/W*-Z,N=(Q-f)/f*Z;z.style.transform=`
            perspective(1000px)
            rotateX(${R}deg)
            rotateY(${N}deg)
            scale3d(1.02, 1.02, 1.02)
        `},H=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",X),z.addEventListener("mousemove",Y),z.addEventListener("mouseleave",H),()=>{z.removeEventListener("mouseenter",X),z.removeEventListener("mousemove",Y),z.removeEventListener("mouseleave",H)}}var P=(z)=>{$().appendChild(document.createTextNode(z))},p0=()=>j({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{j({style:{borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{f0(z,5),j({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{j({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),j({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),j({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let Z=(Y)=>w({style:{color:"var(--syntax-keyword)"},textContent:Y}),J=(Y)=>w({style:{color:"var(--syntax-function)"},textContent:Y}),X=(Y)=>w({style:{color:"var(--syntax-string)"},textContent:Y});D0({style:{transform:"translateZ(40px)"}},()=>{j(()=>{Z("import"),P(" { $, div, button, Mut } "),Z("from"),X(' "fia"'),P(";")}),P(" "),j(()=>{Z("const"),P(" count = "),J("$"),P("("),J("Mut"),P("(0));")}),P(" "),j(()=>{J("button"),P("("),X('"Increment"'),P(", () => count.value++);")}),P(" "),j(()=>{J("div"),P("("),J("$"),P("(() => "),X("`Count: ${count.value}`"),P("));")})})})});var p=(z,Z,J)=>j({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(X)=>{f0(X,15),j({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:J}),e({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),n({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:Z})}),d0=()=>U0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{p("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),p("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),p("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),p("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),p("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),p("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),p("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),p("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var u0=()=>m0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{j({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{j({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var L0=(z)=>{let Z=_(M(0));j({style:{marginBottom:"1.5rem"}},()=>{j({style:{display:"flex",gap:"4px",borderBottom:"1px solid #e0e0e0",marginBottom:"1rem"}},()=>{q0(z,(J,X)=>{g({textContent:J.label,style:{padding:"8px 16px",background:_(()=>Z.value===X?"#2563eb":"transparent"),color:_(()=>Z.value===X?"white":"#666"),border:"none",borderBottom:_(()=>Z.value===X?"2px solid #2563eb":"2px solid transparent"),cursor:"pointer",fontSize:"14px",fontWeight:_(()=>Z.value===X?"600":"400"),transition:"all 0.2s"},onclick:()=>Z.value=X})})}),j({style:{position:"relative"}},()=>{q0(z,(J,X)=>{j({style:{display:_(()=>Z.value===X?"block":"none"),background:"#1e1e1e",color:"#d4d4d4",padding:"1rem",borderRadius:"4px",overflow:"auto",fontFamily:"monospace",fontSize:"14px",whiteSpace:"pre"}},()=>{j({textContent:J.code})})})})})};var d=(z)=>{$().appendChild(document.createTextNode(z))},X1=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((J)=>{if(J.startsWith("//"))w({style:{color:"var(--syntax-comment)"},textContent:J});else if(J.startsWith('"')||J.startsWith("'")||J.startsWith("`"))w({style:{color:"var(--syntax-string)"},textContent:J});else if(["const","import","from","function","return","if","else","true","false"].includes(J))w({style:{color:"var(--syntax-keyword)"},textContent:J});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(J))w({style:{color:"var(--syntax-function)"},textContent:J});else d(J)})},D=(z)=>j({class:"code-block animate-fade-up",style:{borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{j({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{j({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{j({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),j({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),j({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let Z=_(M(!1));g({textContent:_(()=>Z.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:_(()=>Z.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),Z.value=!0,setTimeout(()=>Z.value=!1,2000)}})}),D0({style:{margin:"0",overflowX:"auto"}},()=>{X1(z)})}),Y1=(z)=>{let Z=document.createElement("div");Z.textContent=z,Object.assign(Z.style,{position:"fixed",bottom:"2rem",left:"50%",transform:"translateX(-50%) translateY(20px)",background:"var(--mongo-green)",color:"var(--mongo-dark)",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:"600",fontSize:"0.875rem",zIndex:"9999",opacity:"0",transition:"opacity 0.3s, transform 0.3s",pointerEvents:"none",boxShadow:"0 4px 20px rgba(0, 237, 100, 0.3)"}),document.body.appendChild(Z),requestAnimationFrame(()=>{Z.style.opacity="1",Z.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{Z.style.opacity="0",Z.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>Z.remove(),300)},2000)},w0=(z)=>{T({href:`#${z}`,ariaLabel:"Link to this section",style:{opacity:"0",marginLeft:"0.5rem",color:"var(--text-tertiary)",textDecoration:"none",fontSize:"0.75em",transition:"opacity 0.2s, color 0.2s",cursor:"pointer",flexShrink:"0"},className:"anchor-link",textContent:"\uD83D\uDD17",onclick:(Z)=>{Z.preventDefault(),history.replaceState(null,"",`#${z}`);let J=window.location.href;navigator.clipboard.writeText(J).then(()=>{Y1("✓ Link copied to clipboard")});let X=document.getElementById(z);if(X){let H=X.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:H,behavior:"smooth"})}}})},y=(z,Z,J)=>{U0({id:Z,class:"animate-fade-up heading-group",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{j({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{j({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),S0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z}),w0(Z)}),J()})},I=(z,Z,J)=>{let X=typeof Z==="string"?Z:z.toLowerCase().replace(/\s+/g,"-"),Y=typeof Z==="function"?Z:J;j({class:"heading-group",style:{marginBottom:"3rem",paddingBottom:"2rem",borderBottom:"1px solid var(--border-subtle)"}},()=>{j({style:{display:"flex",alignItems:"center",marginBottom:"1.5rem"}},()=>{e({id:X,style:{color:"var(--mongo-green)",fontSize:"1.5rem",scrollMarginTop:"120px"},textContent:z}),w0(X)}),Y()})},K=(z,Z,J)=>{let X=typeof Z==="string"?Z:z.toLowerCase().replace(/\s+/g,"-"),Y=typeof Z==="function"?Z:J;j({class:"heading-group",style:{marginBottom:"1.5rem"}},()=>{j({style:{display:"flex",alignItems:"center",marginBottom:"0.75rem"}},()=>{z0({id:X,style:{fontSize:"1.2rem",color:"var(--mongo-white)",fontWeight:"600",scrollMarginTop:"120px"},textContent:z}),w0(X)}),Y()})},q=(z)=>n({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>d(z)),Z0=(z)=>r({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((Z)=>b(Z))}),s=(z,Z="info")=>j({style:{background:Z==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${Z==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:Z==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>d(z)),i0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow",children:[{id:"control-flow-show",title:"Show"},{id:"control-flow-each",title:"Each"},{id:"control-flow-match",title:"Match",children:[{id:"match-strings",title:"Strings"},{id:"match-booleans",title:"Booleans"},{id:"match-numbers",title:"Numbers"}]}]},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],F1=()=>{let z=_(M("intro")),Z=[];for(let X of i0)if(Z.push(X.id),X.children){for(let Y of X.children)if(Z.push(Y.id),Y.children)for(let H of Y.children)Z.push(H.id)}let J=()=>{let X=window.scrollY+150,Y=Z[0];for(let H of Z){let U=document.getElementById(H);if(U){if(U.getBoundingClientRect().top+window.scrollY<=X)Y=H}}z.value=Y};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",J),J()},0);return j({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{j({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{e({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),r({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{let X=(Y)=>{let H=[];if(Y.children)for(let U of Y.children)H.push(U.id),H.push(...X(U));return H};i0.forEach((Y)=>{let H=X(Y),U=()=>z.value===Y.id||H.includes(z.value);b({style:{marginBottom:"0.5rem"}},()=>{if(T({href:`#${Y.id}`,style:{color:_(()=>U()?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:_(()=>U()?"600":"400"),borderLeft:_(()=>U()?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:Y.title,onclick:(Q)=>{Q.preventDefault();let F=document.getElementById(Y.id);if(F){let W=F.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:W,behavior:"smooth"}),z.value=Y.id}}}),Y.children)r({style:{listStyle:"none",padding:"0",marginTop:"0.5rem"}},()=>{Y.children.forEach((Q)=>{b({style:{marginBottom:"0.25rem"}},()=>{if(T({href:`#${Q.id}`,style:{color:_(()=>z.value===Q.id?"var(--mongo-green)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.8rem",display:"block",padding:"0.25rem 0 0.25rem 1.5rem",transition:"color 0.2s",fontWeight:_(()=>z.value===Q.id?"600":"400")},textContent:Q.title,onclick:(F)=>{F.preventDefault();let f=document.getElementById(Q.id);if(f){let R=f.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:R,behavior:"smooth"})}z.value=Q.id}}),Q.children)r({style:{listStyle:"none",padding:"0",marginTop:"0.25rem"}},()=>{Q.children.forEach((F)=>{b({style:{marginBottom:"0.25rem"}},()=>{T({href:`#${F.id}`,style:{color:_(()=>z.value===F.id?"var(--mongo-green)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.75rem",display:"block",padding:"0.25rem 0 0.25rem 3rem",transition:"color 0.2s",fontWeight:_(()=>z.value===F.id?"600":"400")},textContent:F.title,onclick:(f)=>{f.preventDefault();let W=document.getElementById(F.id);if(W){let N=W.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:N,behavior:"smooth"})}z.value=F.id}})})})})})})})})})})})})},o0=()=>j({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{F1(),j({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{j({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{T({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{I0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),T({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{I0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),y("Introduction","intro",()=>{q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),y("Why Fia?","why-fia",()=>{q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),r({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{b({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),d("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),b({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),d("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),b({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),d("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),b({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),d("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),y("Getting Started","getting-started",()=>{I("Prerequisites",()=>{q("Fia is compatible with any modern JavaScript runtime."),Z0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),I("Installation",()=>{q("Fia is published on JSR. Install it using your preferred package manager:"),j({style:{marginBottom:"1rem"}},()=>{z0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),D("deno add jsr:@fia/core")}),j({style:{marginBottom:"1rem"}},()=>{z0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),q('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),q("2. Install (aliased as 'fia'):"),D("bun add fia@npm:@jsr/fia__core")}),j({style:{marginBottom:"1rem"}},()=>{z0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),D("npx jsr add @fia/core")}),s("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),I("Updating",()=>{q("To update to the latest version, run the installation command again (or use your package manager's update command)."),D(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),I("Quick Start",()=>{q("Create your first reactive app in seconds."),D(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),I("Mounting",()=>{q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),D(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),y("Element API","element-api",()=>{q("Fia elements have a simple, consistent API. Functions match HTML tag names."),D(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),K("Event Handlers",()=>{q("Event handlers are delegated automatically for performance."),D(`button("Click me", () => console.log("clicked!"));

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),K("Nesting Elements",()=>{q("Use a callback function to nest elements."),D(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),K("Void Elements",()=>{q("Elements like input, img, br only accept props."),D(`input({ type: "email", placeholder: "you@example.com" });
img("/photo.jpg", "Photo");
br();`)}),K("onMount Callback",()=>{q("Access layout properties after the element is in the DOM."),D(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),y("Element Factory Types","element-factory-types",()=>{q("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),I("Standard Elements (4 overloads)",()=>{q("Used for semantic structure elements. Click each tab to see the different patterns for creating an article:"),L0([{label:"Empty",code:`// Overload 1: Empty element
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
});`}]),s("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),I("Text Elements (11 overloads)",()=>{q("Optimized for elements that commonly hold text content. Click each tab to see different ways to create the same heading:"),L0([{label:"Empty",code:`// Overload 1: Empty element
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
});`}]),s("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),I("Interactive Elements (10 overloads)",()=>{q("Special factories for interactive elements with convenient text + click handler shorthand:"),L0([{label:"Text + Click ⭐⭐",code:`// Text + click handler shorthand
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
});`}]),s("Elements: button, summary, option, optgroup.")}),I("Void Elements (1 overload)",()=>{q("Self-closing elements that cannot have children."),D(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),s("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),I("Type Safety Benefits",()=>{q("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),D(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),y("Reactivity","reactivity",()=>{I("Signals",()=>{q("Signals are the primitive units of reactivity."),D(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),I("Reactive Stores",()=>{q("Fia stores are immutable by default for predictability."),D(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),s("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),s("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),I("Computed Values",()=>{q("Computed signals automatically track dependencies and update when they change."),D(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),I("Effects",()=>{q("Use $e() to run side effects when dependencies change."),D(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),y("Immutability","immutability",()=>{q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),I("Data Types & Behavior",()=>{K("1. Primitives (String, Number, Boolean)",()=>{q("Primitives are immutable by default. To make them mutable, use Mut."),D(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),K("2. Objects",()=>{q("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),D(`const user = $({ name: "Evan", age: 30 });

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
    notifications: Mut(true), // Mutable Primitive: can be replaced
    theme: "dark"             // Read-only
  }
});
user.settings.notifications = false; // Works!

// Note: Mut({}) on an object makes its *properties* mutable,
// unless the parent key is also mutable.`)}),K("Secure Immutability by Design",()=>{q("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),D(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),s("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),K("3. Arrays",()=>{q("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),D(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),q("Mutable Arrays:"),D(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),K("4. Nested Objects (Deep Reactivity)",()=>{q("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),D(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),y("Control Flow","control-flow",()=>{I("Show","control-flow-show",()=>{q("Conditionally render content that updates when the condition changes."),D('Show(() => isVisible.value, () => div("Hello!"));')}),I("Each","control-flow-each",()=>{q("Reactive list rendering that re-renders efficiently."),D(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li(item));`)}),I("Match","control-flow-match",()=>{q("Reactive pattern matching for switch/case logic. Automatically updates rendering when the matched value changes."),q("Match accepts signals or getter functions, and returns Signal<R> with '_' default or Signal<R | undefined> without."),K("Strings","match-strings",()=>{q("Match exact string values:"),D(`const status = $(Mut("active"));

Match(status, {
  "active": () => span({ class: "success" }, () => t("Active")),
  "inactive": () => span({ class: "danger" }, () => t("Inactive")),
  "pending": () => span({ class: "warning" }, () => t("Pending")),
  _: () => span("Unknown")
});`)}),K("Booleans","match-booleans",()=>{q("Boolean values are automatically converted to string keys:"),D(`const isActive = $(Mut(true));

Match(isActive, {
  "true": () => "✅ Active",
  "false": () => "❌ Inactive"
});`)}),K("Numbers","match-numbers",()=>{q("Numbers support exact matching:"),D(`const count = $(Mut(2));

Match(count, {
  "0": () => "None",
  "1": () => "One",
  "2": () => "Two",
  _: () => "Many"
});`),q("For numeric values, Match also supports range-based comparisons using operators and interval notation:"),D(`const age = $(Mut(25));

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
});`),s("Range patterns only work with numeric values. Exact string matches are checked before range patterns.","info")})})}),y("Component Composition","components",()=>{q("In Fia, components are just functions. There is no special class or type."),I("Basic Component",()=>{D(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),I("Children & Layouts",()=>{q("To create wrapper components, pass a callback function as a child prop."),D(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),y("Performance","performance",()=>{q("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),I("Event Delegation",()=>{q("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),D(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),K("How it works",()=>{Z0(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),K("Benefits",()=>{Z0(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),D(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),I("Automatic Fragment Batching",()=>{q("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),D(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),K("How it works",()=>{Z0(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),K("Benefits",()=>{Z0(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),D(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),I("Fine-Grained Reactivity",()=>{q("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),D(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),I("Best Practices",()=>{K("1. Batch Multiple Updates",()=>{D(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),K("2. Use peek() for Non-Reactive Reads",()=>{D(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),K("3. Memoize Expensive Computations",()=>{D(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),y("Examples","examples",()=>{I("\uD83D\uDFE2 Beginner",()=>{K("1. Hello World",()=>{q("The simplest possible Fia code."),D('h1("Hello, World!");')}),K("2. Counter",()=>{q("Signals hold reactive state."),D(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),K("3. Toggle",()=>{q("Computed signals derive values from other signals."),D(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
Show(visible, () => p("Now you see me!"));`)}),K("4. Input Binding",()=>{q("Two-way binding is manual but explicit."),D('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),K("5. List Rendering (Static)",()=>{q("For simple static lists, forEach works fine."),D(`const items = ["Apple", "Banana", "Cherry"];
ul(() => Each(items, li));`)})}),I("\uD83D\uDFE1 Intermediate",()=>{K("6. Reactive Store Counter",()=>{q("Objects passed to $() become reactive stores."),D(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),K("7. Conditional Classes",()=>{q("Computed signals work in class props too."),D(`const active = $(Mut(false));
button($(() => active.value ? "Deactivate" : "Activate"), () => active.value = !active.value);`)}),K("8. Form Handling",()=>{q("Reactive stores are perfect for forms."),D(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),K("9. Computed Values",()=>{q("Track dependencies automatically."),D('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),K("10. Dynamic Styling",()=>{q("Reactive styles allow theming."),D(`const theme = $(Mut("light"));

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
});`)})}),I("\uD83D\uDD34 Advanced",()=>{K("11. Control Flow Combo (Each + Show + Match)",()=>{q("A complete task manager combining all control flow components:"),D(`// Task manager example combining Each, Show, and Match
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
});`)}),K("12. Todo App",()=>{q("A complete todo app using Each."),D(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),K("12. Tabs Component",()=>{q("Track active index and conditionally render."),D(`const tabs = ["Home", "About", "Contact"];
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
});`)}),K("13. Async Data Fetching",()=>{q("Use Match for loading states."),D(`const state = $(Mut({
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
});`)}),K("14. Modal Dialog",()=>{q("Modal patterns with explicit types."),D(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var c0=()=>{let z=_(M(0)),Z=_(M(0)),J=_(M(0));return document.addEventListener("mousemove",(X)=>{z.value=X.clientX,Z.value=X.clientY,J.value=1}),document.addEventListener("mouseout",()=>{J.value=0}),j({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:_(()=>`translate(${z.value-200}px, ${Z.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:_(()=>J.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var Q1=()=>j({id:"landing-page"},()=>{c0(),v0(),g0(),p0(),d0(),o0(),u0()});Q1();
