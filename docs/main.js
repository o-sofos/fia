var s=void 0,j0=0,T0=0,i=void 0;function q0(z){if(s)z.subs.add(s),s.deps.add(z)}function G0(z){z.version=++j0;let Z=[...z.subs];for(let J of Z)if(T0>0){if(!i)i=new Set;i.add(J)}else J.execute()}function U0(z){for(let Z of z.deps)Z.subs.delete(z);z.deps.clear()}function b(z){let Z=!0,J={execute(){if(!Z)return;U0(J);let X=s;s=J;try{z()}finally{s=X}},deps:new Set,cleanup(){Z=!1,U0(J)}};return J.execute(),()=>J.cleanup()}function V0(z,Z=!1){let J={version:j0,subs:new Set},X=z,Q=function(D){if(arguments.length>0){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(X,D))X=D,G0(J);return}return q0(J),X};return Object.defineProperty(Q,"value",{get(){return q0(J),X},set(D){if(Z)throw TypeError("Cannot update a read-only signal.");if(!Object.is(X,D))X=D,G0(J)}}),Q[O0]=!0,Q.peek=()=>X,Q}function e0(z){let Z={version:j0,subs:new Set},J,X=-1,Q={execute(){Z.version=++j0;let j=[...Z.subs];for(let Y of j)if(T0>0){if(!i)i=new Set;i.add(Y)}else Y.execute()},deps:new Set,cleanup(){U0(Q)}},D=()=>{U0(Q);let j=s;s=Q;try{let Y=z();if(!Object.is(J,Y))J=Y;X=Z.version}finally{s=j}};D();let H=function(){if(X!==Z.version)D();return q0(Z),J};return Object.defineProperty(H,"value",{get(){return H()}}),H[O0]=!0,H.peek=()=>{if(X!==Z.version)D();return J},H}var P0=Symbol("mutable");function V(z){return{value:z,[P0]:!0}}function v(z){return z!==null&&typeof z==="object"&&z[P0]===!0}var A0=Symbol("reactive-proxy"),Q0=Symbol("raw");function I0(z){return z!==null&&typeof z==="object"&&A0 in z}function c(z,Z=!1){let J=new Map,X=new WeakMap;function Q(j){let Y=J.get(j);if(!Y)Y={version:0,subs:new Set},J.set(j,Y);return Y}if(Z===!1||Z instanceof Set&&Z.size===0){let j=!1;for(let Y in z)if(v(z[Y])){j=!0;break}if(Array.isArray(z)&&!j){for(let Y=0;Y<z.length;Y++)if(v(z[Y])){j=!0;break}}if(!j){if(Array.isArray(z))for(let Y=0;Y<z.length;Y++){let _=z[Y];if(_&&typeof _==="object"&&!v(_)&&!I0(_))z[Y]=c(_,!1)}else for(let Y in z){let _=z[Y];if(_&&typeof _==="object"&&!v(_)&&!I0(_))z[Y]=c(_,!1)}Object.freeze(z)}}return new Proxy(z,{get(j,Y,_){if(Y===Q0||Y==="$raw")return j;if(Y===A0)return!0;let R=Q(Y);q0(R);let L=Reflect.get(j,Y,_);if(v(L)){let f=X.get(L);if(f?.mutable)return f.mutable;let O=L.value;if(O!==null&&typeof O==="object"){let M=c(O,!0);if(!f)f={},X.set(L,f);return f.mutable=M,M}return O}if(L!==null&&typeof L==="object"&&!I0(L)){let f=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(Y),O=X.get(L);if(O){let K=f?O.mutable:O.readonly;if(K)return K}let M=c(L,f);if(!O)O={},X.set(L,O);if(f)O.mutable=M;else O.readonly=M;return M}return L},set(j,Y,_,R){let L=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(Y),f=Reflect.get(j,Y,R);if(!L&&v(f)){if(f.value===null||typeof f.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(Y);L=!0}}if(!L)return!1;let O=_!==null&&typeof _==="object"&&Q0 in _?_[Q0]:_,M=Array.isArray(j)&&Y==="length";if(Object.is(f,O)&&!M)return!0;if(Reflect.set(j,Y,O,R),f!==null&&typeof f==="object")X.delete(f);let K=J.get(Y);if(K)G0(K);return!0},has(j,Y){if(Y===A0||Y===Q0||Y==="$raw")return!0;return Reflect.has(j,Y)},ownKeys(j){return Reflect.ownKeys(j)},getOwnPropertyDescriptor(j,Y){return Reflect.getOwnPropertyDescriptor(j,Y)},deleteProperty(j,Y){let _=typeof Z==="boolean"&&Z||Z instanceof Set&&Z.has(Y);if(!_){let f=Reflect.get(j,Y);if(v(f)){if(f.value===null||typeof f.value!=="object"){if(Z===!1)Z=new Set;if(Z instanceof Set)Z.add(Y);_=!0}}}if(!_)return!1;let R=Reflect.has(j,Y),L=Reflect.deleteProperty(j,Y);if(R&&L){let f=J.get(Y);if(f)G0(f)}return L}})}function A(z,...Z){if(typeof z==="function")return e0(z);if(z!==null&&typeof z==="object"&&!v(z))return c(z,new Set(Z));if(v(z)){if(typeof z.value==="object"&&z.value!==null)return c(z.value,!0);return V0(z.value,!1)}return V0(z,!0)}var O0=Symbol("signal");function S(z){return typeof z==="function"&&z[O0]===!0}var D0=[];function h(z){D0.push(z)}function k(){D0.pop()}function N(){return D0[D0.length-1]??document.body}function F0(z,Z,J){let X=document.createComment("Each");N().appendChild(X);let Q=[],D=new Map;b(()=>{let H=typeof z==="function"&&!Array.isArray(z)?z():z,j=[],Y=new Map,_=new Set;for(let L=0;L<H.length;L++){let f=H[L],O=J?J(f,L):L;if(_.has(O))console.warn(`[Each] Duplicate key: "${O}". Keys must be unique.`);_.add(O);let M=D.get(O);if(M&&(!J||M.item===f))j.push(M),Y.set(O,M);else{let K=document.createDocumentFragment();h(K);try{Z(f,L)}finally{k()}let z0=Array.from(K.childNodes),$0={key:O,item:f,nodes:z0};if(j.push($0),Y.set(O,$0),M)for(let u of M.nodes)u.parentNode?.removeChild(u)}}for(let L of Q)if(!Y.has(L.key))for(let f of L.nodes)f.parentNode?.removeChild(f);let R=X;for(let L of j){let f=L.nodes[0];if(!f)continue;if(R.nextSibling!==f){let M=X.parentNode;if(!M)continue;for(let K of L.nodes)M.insertBefore(K,R.nextSibling)}R=L.nodes[L.nodes.length-1]||R}Q=j,D.clear();for(let[L,f]of Y)D.set(L,f)})}var z1=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),H0=new WeakMap,C0=new Set;function Z1(z){let{target:Z,type:J}=z;while(Z){let X=H0.get(Z);if(X&&X[J]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:Z}),X[J](z),z.cancelBubble)break}Z=Z.parentElement}}function L0(z,Z,J){if(z1.has(Z)){if(!C0.has(Z))document.addEventListener(Z,Z1,{capture:!1,passive:!1}),C0.add(Z);let X=H0.get(z);if(!X)X={},H0.set(z,X);X[Z]=J}else z.addEventListener(Z,J)}if(typeof window<"u")window.__eventHandlerMap=H0;function $(z){return(Z,J)=>{let X=document.createElement(z),Q,D;if(Z===void 0);else if(T(Z))D=Z;else if(B(Z)){if(Q=Z,J!==void 0)D=J}if(Q)y(X,Q);let H=[],j=(Y)=>H.push(Y);if(D){let Y=document.createDocumentFragment();h(Y);try{D(X,j)}finally{k()}X.appendChild(Y)}if(N().appendChild(X),H.length>0)requestAnimationFrame(()=>{for(let Y of H)Y()});return X}}function F(z){return(Z,J,X)=>{let Q=document.createElement(z),D,H,j;if(Z===void 0);else if(o(Z)){if(D=Z,J===void 0);else if(T(J))j=J;else if(B(J)){if(H=J,X!==void 0)j=X}}else if(T(Z))j=Z;else if(B(Z)){if(H=Z,J!==void 0&&T(J))j=J}if(D!==void 0)n(Q,D);if(H)y(Q,H);let Y=[],_=(R)=>Y.push(R);if(j){let R=document.createDocumentFragment();h(R);try{j(Q,_)}finally{k()}Q.appendChild(R)}if(N().appendChild(Q),Y.length>0)requestAnimationFrame(()=>{for(let R of Y)R()});return Q}}function J0(z){return(Z,J,X)=>{let Q=document.createElement(z),D,H,j,Y;if(Z===void 0);else if(o(Z)){if(D=Z,J===void 0);else if(E0(J))H=J;else if(T(J))Y=J;else if(B(J)){if(j=J,X!==void 0)Y=X}}else if(T(Z))Y=Z;else if(B(Z)){if(j=Z,J!==void 0&&T(J))Y=J}if(D!==void 0)n(Q,D);if(H)L0(Q,"click",H);if(j)y(Q,j);let _=[],R=(L)=>_.push(L);if(Y){let L=document.createDocumentFragment();h(L);try{Y(Q,R)}finally{k()}Q.appendChild(L)}if(N().appendChild(Q),_.length>0)requestAnimationFrame(()=>{for(let L of _)L()});return Q}}function P(z){return(Z)=>{let J=document.createElement(z);if(Z)y(J,Z);return N().appendChild(J),J}}function x0(){return(z,Z,J)=>{let X=document.createElement("img"),Q,D,H;if(z===void 0);else if(typeof z==="string"&&y0(z)){if(Q=z,Z===void 0);else if(typeof Z==="string"){if(D=Z,J!==void 0)H=J}else if(B(Z))H=Z}else if(B(z))H=z;if(Q!==void 0)X.src=Q;if(D!==void 0)X.alt=D;if(H)y(X,H);return N().appendChild(X),X}}function S0(){return(z,Z,J)=>{let X=document.createElement("a"),Q,D,H,j;if(z===void 0);else if(typeof z==="string"&&h0(z)){if(Q=z,Z===void 0);else if(o(Z)){if(D=Z,J!==void 0)H=J}else if(B(Z))H=Z}else if(T(z))j=z;else if(B(z)){if(H=z,Z!==void 0&&T(Z))j=Z}if(Q!==void 0)X.href=Q;if(D!==void 0)n(X,D);if(H)y(X,H);let Y=[],_=(R)=>Y.push(R);if(j){let R=document.createDocumentFragment();h(R);try{j(X,_)}finally{k()}X.appendChild(R)}if(N().appendChild(X),Y.length>0)requestAnimationFrame(()=>{for(let R of Y)R()});return X}}function o(z){return typeof z==="string"||typeof z==="number"||S(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function E0(z){if(typeof z!=="function")return!1;if(S(z))return!1;return z.length<=1}function h0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function y0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var w0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function J1(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function X1(z,Z,J){switch(Z){case"value":if("value"in z)z.value=String(J??"");break;case"checked":if("checked"in z)z.checked=Boolean(J);break;case"selected":if("selected"in z)z.selected=Boolean(J);break;case"muted":if("muted"in z)z.muted=Boolean(J);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(J??0);break;case"volume":if("volume"in z)z.volume=Number(J??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(J);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(J??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(J);break;case"textContent":z.textContent=String(J??"");break;case"innerText":z.innerText=String(J??"");break}}function k0(z,Z,J){if(Z==="class"||Z==="className"||Z==="classList")Y1(z,J);else if(Z==="style")j1(z,J);else if(J1(Z))X1(z,Z,J);else if(typeof J==="boolean")if(J)z.setAttribute(w0[Z]??Z,"");else z.removeAttribute(w0[Z]??Z);else z.setAttribute(w0[Z]??Z,String(J))}function y(z,Z){for(let J in Z){let X=Z[J];if(X===null||X===void 0)continue;if(J.startsWith("on")&&typeof X==="function"){let Q=J.slice(2).toLowerCase();L0(z,Q,X)}else if(S(X))b(()=>k0(z,J,X.value));else k0(z,J,X)}}function Y1(z,Z){if(typeof Z==="string")z.className=Z;else if(Array.isArray(Z))z.className=Z.filter(Boolean).join(" ");else if(typeof Z==="object"&&Z!==null){let J=!1;for(let Q in Z)if(S(Z[Q])){J=!0;break}let X=()=>{let Q=[];for(let D in Z){let H=Z[D];if(S(H)?H.value:H)Q.push(D)}z.className=Q.join(" ")};if(J)b(X);else X()}}function Q1(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function M0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let Z=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${Z} / ${z.alpha})`:`color(${z.space} ${Z})`}case"color-mix":{let Z=typeof z.color1==="object"?M0(z.color1):z.color1,J=typeof z.color2==="object"?M0(z.color2):z.color2,X=z.percentage1!==void 0?`${z.percentage1}%`:"",Q=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${Z} ${X}, ${J} ${Q})`}}}function m0(z){if(z===null||z===void 0)return"";if(Q1(z))return M0(z);return String(z)}function b0(z,Z,J){if(Z.startsWith("--")){z.setProperty(Z,J);return}if(Z.startsWith("webkit")||Z.startsWith("moz")||Z.startsWith("ms")||Z.startsWith("o")){let X=Z.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(X,J);return}try{z[Z]=J}catch{z.setProperty(Z,J)}}function j1(z,Z){if(typeof Z==="string")z.setAttribute("style",Z);else if(typeof Z==="object"&&Z!==null){let J=!1;for(let X in Z)if(S(Z[X])){J=!0;break}if(J)b(()=>{for(let X in Z){let Q=Z[X],D=S(Q)?Q.value:Q;b0(z.style,X,m0(D))}});else for(let X in Z){let Q=Z[X];b0(z.style,X,m0(Q))}}}function n(z,Z){if(S(Z))b(()=>{z.textContent=String(Z.value)});else z.textContent=String(Z)}function B(z){return typeof z==="object"&&z!==null&&!S(z)&&!Array.isArray(z)}function T(z){return typeof z==="function"&&!S(z)}var C=S0(),N0=x0(),p=J0("button"),c1=J0("summary"),i1=J0("option"),o1=J0("optgroup"),v0=F("h1"),s0=F("h2"),X0=F("h3"),Y0=F("h4"),n1=F("h5"),r1=F("h6"),r=F("p"),G=F("div"),l1=F("article"),f0=F("section"),a1=F("aside"),g0=F("header"),p0=F("footer"),t1=F("main"),e1=F("blockquote"),z5=F("figcaption"),_0=F("pre"),Z5=F("address"),I=F("span"),J5=F("strong"),X5=F("em"),Y5=F("small"),Q5=F("mark"),j5=F("code"),q5=F("samp"),G5=F("kbd"),U5=F("var"),D5=F("i"),F5=F("b"),H5=F("u"),L5=F("s"),f5=F("del"),_5=F("ins"),K5=F("sub"),W5=F("sup"),R5=F("abbr"),$5=F("cite"),I5=F("dfn"),A5=F("q"),O5=F("time"),w5=F("data"),M5=F("bdi"),N5=F("bdo"),B5=F("ruby"),V5=F("rp"),T5=F("rt"),P5=F("label"),C5=F("legend"),E5=F("output"),x5=F("caption"),y5=F("td"),S5=F("th"),g=F("li"),h5=F("dd"),k5=F("dt"),m5=F("title"),b5=P("input"),v5=P("br"),s5=P("hr"),g5=P("meta"),p5=P("link"),d5=P("area"),u5=P("base"),c5=P("col"),i5=P("embed"),o5=P("source"),n5=P("track"),r5=P("wbr"),l=$("ul"),l5=$("ol"),a5=$("menu"),t5=$("table"),e5=$("tbody"),zz=$("thead"),Zz=$("tfoot"),Jz=$("tr"),Xz=$("colgroup"),Yz=$("form"),Qz=$("fieldset"),jz=$("details"),qz=$("dialog"),d0=$("nav"),Gz=$("figure"),Uz=$("select"),Dz=$("datalist"),Fz=$("dl"),Hz=$("audio"),Lz=$("video"),fz=$("picture"),_z=$("iframe"),Kz=$("object"),Wz=$("canvas"),Rz=$("map"),$z=$("body"),Iz=$("head"),Az=$("html"),Oz=$("hgroup"),wz=$("template"),Mz=$("slot"),Nz=$("noscript"),Bz=$("script"),Vz=$("style"),Tz=$("textarea"),Pz=$("meter"),Cz=$("progress"),Ez=$("search");var q1=()=>{if(typeof localStorage<"u"&&localStorage.getItem("fia-theme"))return localStorage.getItem("fia-theme");if(typeof window<"u"&&window.matchMedia("(prefers-color-scheme: dark)").matches)return"dark";return"dark"},a=A(V({current:q1()}));b(()=>{let z=a.current;if(typeof localStorage<"u")localStorage.setItem("fia-theme",z);if(typeof document<"u"){if(document.documentElement.setAttribute("data-theme",z),!document.getElementById("fia-theme-styles")){let Z=document.createElement("style");Z.id="fia-theme-styles",Z.textContent=`
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
            `,document.head.appendChild(Z)}if(z==="dark")document.body.classList.add("dark"),document.body.classList.remove("light");else document.body.classList.add("light"),document.body.classList.remove("dark")}});var u0=()=>{a.current=a.current==="dark"?"light":"dark"};var c0=()=>d0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{G({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{I({style:{color:"var(--mongo-green)"},textContent:"fia"})}),G({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{C({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),C({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),p({style:{background:"none",border:"none",cursor:"pointer",padding:"0.5rem",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:A(()=>a.current==="dark"?"var(--text-primary)":"var(--mongo-green)")},onclick:u0},()=>{I({textContent:A(()=>a.current==="dark"?"\uD83C\uDF19":"☀️")})}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var i0=()=>g0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{v0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{G({textContent:"Bare Metal JavaScript"}),G({class:"text-gradient",textContent:"No JSX. Value Native."})}),r({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.8",position:"relative",zIndex:"1",display:"flex",flexWrap:"wrap",gap:"0.5rem 1.5rem",justifyContent:"center",alignItems:"center"}},()=>{["Almost Native DOM","Signals Immutable by Design","No JSX","No Virtual DOM","No Dependencies"].forEach((Z)=>{I({style:{display:"inline-flex",alignItems:"center",gap:"0.5rem"}},()=>{I({style:{color:"var(--mongo-green)",fontSize:"0.8em"},textContent:"✦"}),I({textContent:Z})})})}),G({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{p({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),C({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),G({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),G({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),G({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),G({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),G({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function K0(z,Z=10){let J,X=()=>{J=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},Q=(H)=>{if(!J)J=z.getBoundingClientRect();let j=H.clientX-J.left,Y=H.clientY-J.top,_=J.width/2,R=J.height/2,L=(Y-R)/R*-Z,f=(j-_)/_*Z;z.style.transform=`
            perspective(1000px)
            rotateX(${L}deg)
            rotateY(${f}deg)
            scale3d(1.02, 1.02, 1.02)
        `},D=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",X),z.addEventListener("mousemove",Q),z.addEventListener("mouseleave",D),()=>{z.removeEventListener("mouseenter",X),z.removeEventListener("mousemove",Q),z.removeEventListener("mouseleave",D)}}var E=(z)=>{N().appendChild(document.createTextNode(z))},o0=()=>G({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{G({style:{borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{K0(z,5),G({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),G({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let Z=(Q)=>I({style:{color:"var(--syntax-keyword)"},textContent:Q}),J=(Q)=>I({style:{color:"var(--syntax-function)"},textContent:Q}),X=(Q)=>I({style:{color:"var(--syntax-string)"},textContent:Q});_0({style:{transform:"translateZ(40px)"}},()=>{G(()=>{Z("import"),E(" { $, div, button, Mut } "),Z("from"),X(' "fia"'),E(";")}),E(" "),G(()=>{Z("const"),E(" count = "),J("$"),E("("),J("Mut"),E("(0));")}),E(" "),G(()=>{J("button"),E("("),X('"Increment"'),E(", () => count.value++);")}),E(" "),G(()=>{J("div"),E("("),J("$"),E("(() => "),X("`Count: ${count.value}`"),E("));")})})})});var d=(z,Z,J)=>G({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(X)=>{K0(X,15),G({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:J}),X0({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),r({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:Z})}),n0=()=>f0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{d("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),d("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),d("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),d("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),d("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),d("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),d("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),d("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var r0=()=>p0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{G({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{G({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var G1=(z)=>{N().appendChild(document.createTextNode(z))},W0=(z)=>{let R=new Set(["const","let","var","import","from","export","default","function","return","if","else","for","while","do","switch","case","break","continue","new","delete","typeof","instanceof","class","extends","implements","interface","type","enum","async","await","yield","throw","try","catch","finally","true","false","null","undefined","void","this","super","of","in","as"]),L=new Set(["string","number","boolean","object","any","never","unknown","Array","Promise","Map","Set","Record","Partial","Required","Signal","Mut","MaybeSignal"]),f=new Set(["div","button","h1","h2","h3","h4","h5","h6","p","ul","ol","li","input","span","section","article","nav","form","table","tr","td","th","a","img","pre","code","header","footer","main","aside","label","select","option","textarea","strong","em","canvas","video","audio","console","document","window","navigator","Show","Each","Match","$","Mut","setTimeout","setInterval","requestAnimationFrame","map","filter","forEach","reduce","find","some","every","push","pop","splice","slice","join","split","JSON","Math","Object","Number","String"]),O=/\/\/[^\n]*|\/\*[\s\S]*?\*\/|`(?:[^`\\]|\\.)*`|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|=>|[{}()\[\];,.]|\b\d+(?:\.\d+)?\b|\b[a-zA-Z_$][a-zA-Z0-9_$]*\b|[+\-*/%=!<>&|?:~^]+|\s+|./g,M=z.match(O)||[];M.forEach((K,z0)=>{if(K.startsWith("//")||K.startsWith("/*"))I({style:{color:"var(--syntax-comment)",fontStyle:"italic"},textContent:K});else if(K.startsWith("`"))K.split(/(\$\{[^}]*\})/).forEach((u)=>{if(u.startsWith("${")){I({style:{color:"#89ddff"},textContent:"${"});let Z0=u.slice(2,-1);if(f.has(Z0)||R.has(Z0))I({style:{color:f.has(Z0)?"var(--syntax-function)":"var(--syntax-keyword)"},textContent:Z0});else I({style:{color:"var(--text-primary)"},textContent:Z0});I({style:{color:"#89ddff"},textContent:"}"})}else I({style:{color:"var(--syntax-string)"},textContent:u})});else if(K.startsWith('"')||K.startsWith("'"))I({style:{color:"var(--syntax-string)"},textContent:K});else if(K==="=>")I({style:{color:"#89ddff"},textContent:K});else if(/^\d+(\.\d+)?$/.test(K))I({style:{color:"#f78c6c"},textContent:K});else if(R.has(K))I({style:{color:"var(--syntax-keyword)",fontStyle:K==="this"?"italic":"normal"},textContent:K});else if(L.has(K))I({style:{color:"#ffcb6b"},textContent:K});else if(/^[a-zA-Z_$]/.test(K)&&M[z0+1]?.trim()==="(")if(f.has(K))I({style:{color:"var(--syntax-function)"},textContent:K});else I({style:{color:"var(--syntax-function)"},textContent:K});else if(f.has(K))I({style:{color:"var(--syntax-function)"},textContent:K});else if(z0>0&&M[z0-1]==="."&&/^[a-zA-Z_$]/.test(K))I({style:{color:"#82aaff"},textContent:K});else if(/^[{}()\[\];,.]$/.test(K))I({style:{color:"#89ddff"},textContent:K});else if(/^[+\-*/%=!<>&|?:~^]+$/.test(K))I({style:{color:"#89ddff"},textContent:K});else G1(K)})};var R0=(z)=>{let Z=A(V(0));G({style:{marginBottom:"1.5rem"}},()=>{G({style:{display:"flex",gap:"4px",borderBottom:"1px solid #e0e0e0",marginBottom:"1rem"}},()=>{F0(z,(J,X)=>{p({textContent:J.label,style:{padding:"8px 16px",background:A(()=>Z.value===X?"#2563eb":"transparent"),color:A(()=>Z.value===X?"white":"#666"),border:"none",borderBottom:A(()=>Z.value===X?"2px solid #2563eb":"2px solid transparent"),cursor:"pointer",fontSize:"14px",fontWeight:A(()=>Z.value===X?"600":"400"),transition:"all 0.2s"},onclick:()=>Z.value=X})})}),G({style:{position:"relative"}},()=>{F0(z,(J,X)=>{G({style:{display:A(()=>Z.value===X?"block":"none"),background:"#1e1e1e",color:"#d4d4d4",padding:"1rem",borderRadius:"4px",overflow:"auto",fontFamily:"monospace",fontSize:"14px",whiteSpace:"pre"}},()=>{W0(J.code)})})})})};var e=(z)=>{N().appendChild(document.createTextNode(z))},U=(z)=>G({class:"code-block animate-fade-up",style:{borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{G({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{G({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),G({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let Z=A(V(!1));p({textContent:A(()=>Z.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:A(()=>Z.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),Z.value=!0,setTimeout(()=>Z.value=!1,2000)}})}),_0({style:{margin:"0",overflowX:"auto"}},()=>{W0(z)})}),U1=(z)=>{let Z=document.createElement("div");Z.textContent=z,Object.assign(Z.style,{position:"fixed",bottom:"2rem",left:"50%",transform:"translateX(-50%) translateY(20px)",background:"var(--mongo-green)",color:"var(--mongo-dark)",padding:"0.75rem 1.5rem",borderRadius:"8px",fontWeight:"600",fontSize:"0.875rem",zIndex:"9999",opacity:"0",transition:"opacity 0.3s, transform 0.3s",pointerEvents:"none",boxShadow:"0 4px 20px rgba(0, 237, 100, 0.3)"}),document.body.appendChild(Z),requestAnimationFrame(()=>{Z.style.opacity="1",Z.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{Z.style.opacity="0",Z.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>Z.remove(),300)},2000)},B0=(z)=>{C({href:`#${z}`,ariaLabel:"Link to this section",style:{opacity:"0",marginLeft:"0.5rem",color:"var(--text-tertiary)",textDecoration:"none",fontSize:"0.75em",transition:"opacity 0.2s, color 0.2s",cursor:"pointer",flexShrink:"0"},className:"anchor-link",textContent:"\uD83D\uDD17",onclick:(Z)=>{Z.preventDefault(),history.replaceState(null,"",`#${z}`);let J=window.location.href;navigator.clipboard.writeText(J).then(()=>{U1("✓ Link copied to clipboard")});let X=document.getElementById(z);if(X){let D=X.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:D,behavior:"smooth"})}}})},m=(z,Z,J)=>{f0({id:Z,class:"animate-fade-up heading-group",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{G({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{G({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),s0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z}),B0(Z)}),J()})},w=(z,Z,J)=>{let X=typeof Z==="string"?Z:z.toLowerCase().replace(/\s+/g,"-"),Q=typeof Z==="function"?Z:J;G({class:"heading-group",style:{marginBottom:"3rem",paddingBottom:"2rem",borderBottom:"1px solid var(--border-subtle)"}},()=>{G({style:{display:"flex",alignItems:"center",marginBottom:"1.5rem"}},()=>{X0({id:X,style:{color:"var(--mongo-green)",fontSize:"1.5rem",scrollMarginTop:"120px"},textContent:z}),B0(X)}),Q()})},W=(z,Z,J)=>{let X=typeof Z==="string"?Z:z.toLowerCase().replace(/\s+/g,"-"),Q=typeof Z==="function"?Z:J;G({class:"heading-group",style:{marginBottom:"1.5rem"}},()=>{G({style:{display:"flex",alignItems:"center",marginBottom:"0.75rem"}},()=>{Y0({id:X,style:{fontSize:"1.2rem",color:"var(--mongo-white)",fontWeight:"600",scrollMarginTop:"120px"},textContent:z}),B0(X)}),Q()})},q=(z)=>r({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>e(z)),t=(z)=>l({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((Z)=>g(Z))}),x=(z,Z="info")=>G({style:{background:Z==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${Z==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:Z==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>e(z)),l0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow",children:[{id:"control-flow-show",title:"Show"},{id:"control-flow-each",title:"Each"},{id:"control-flow-match",title:"Match",children:[{id:"match-strings",title:"Strings"},{id:"match-booleans",title:"Booleans"},{id:"match-numbers",title:"Numbers"}]}]},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],D1=()=>{let z=A(V("intro")),Z=[];for(let X of l0)if(Z.push(X.id),X.children){for(let Q of X.children)if(Z.push(Q.id),Q.children)for(let D of Q.children)Z.push(D.id)}let J=()=>{let X=window.scrollY+150,Q=Z[0];for(let D of Z){let H=document.getElementById(D);if(H){if(H.getBoundingClientRect().top+window.scrollY<=X)Q=D}}z.value=Q};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",J),J()},0);return G({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{G({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{X0({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),l({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{let X=(Q)=>{let D=[];if(Q.children)for(let H of Q.children)D.push(H.id),D.push(...X(H));return D};l0.forEach((Q)=>{let D=X(Q),H=()=>z.value===Q.id||D.includes(z.value);g({style:{marginBottom:"0.5rem"}},()=>{if(C({href:`#${Q.id}`,style:{color:A(()=>H()?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:A(()=>H()?"600":"400"),borderLeft:A(()=>H()?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:Q.title,onclick:(j)=>{j.preventDefault();let Y=document.getElementById(Q.id);if(Y){let R=Y.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:R,behavior:"smooth"}),z.value=Q.id}}}),Q.children)l({style:{listStyle:"none",padding:"0",marginTop:"0.5rem"}},()=>{Q.children.forEach((j)=>{g({style:{marginBottom:"0.25rem"}},()=>{if(C({href:`#${j.id}`,style:{color:A(()=>z.value===j.id?"var(--mongo-green)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.8rem",display:"block",padding:"0.25rem 0 0.25rem 1.5rem",transition:"color 0.2s",fontWeight:A(()=>z.value===j.id?"600":"400")},textContent:j.title,onclick:(Y)=>{Y.preventDefault();let _=document.getElementById(j.id);if(_){let L=_.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:L,behavior:"smooth"})}z.value=j.id}}),j.children)l({style:{listStyle:"none",padding:"0",marginTop:"0.25rem"}},()=>{j.children.forEach((Y)=>{g({style:{marginBottom:"0.25rem"}},()=>{C({href:`#${Y.id}`,style:{color:A(()=>z.value===Y.id?"var(--mongo-green)":"var(--text-tertiary)"),textDecoration:"none",fontSize:"0.75rem",display:"block",padding:"0.25rem 0 0.25rem 3rem",transition:"color 0.2s",fontWeight:A(()=>z.value===Y.id?"600":"400")},textContent:Y.title,onclick:(_)=>{_.preventDefault();let R=document.getElementById(Y.id);if(R){let f=R.getBoundingClientRect().top+window.scrollY-100;window.scrollTo({top:f,behavior:"smooth"})}z.value=Y.id}})})})})})})})})})})})})},a0=()=>G({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{D1(),G({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{G({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{N0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),C({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{N0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),m("Introduction","intro",()=>{q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),m("Why Fia?","why-fia",()=>{q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),l({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{g({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),e("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),g({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),e("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),g({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),e("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),g({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),e("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),m("Getting Started","getting-started",()=>{w("Prerequisites",()=>{q("Fia is compatible with any modern JavaScript runtime."),t(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),w("Installation",()=>{q("Fia is published on JSR. Install it using your preferred package manager:"),G({style:{marginBottom:"1rem"}},()=>{Y0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),U("deno add jsr:@fia/core")}),G({style:{marginBottom:"1rem"}},()=>{Y0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),q('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),q("2. Install (aliased as 'fia'):"),U("bun add fia@npm:@jsr/fia__core")}),G({style:{marginBottom:"1rem"}},()=>{Y0({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),U("npx jsr add @fia/core")}),x("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),w("Updating",()=>{q("To update to the latest version, run the installation command again (or use your package manager's update command)."),U(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),w("Quick Start",()=>{q("Create your first reactive app in seconds."),U(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),w("Mounting",()=>{q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),U(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),m("Element API","element-api",()=>{q("Fia elements have a simple, consistent API. Functions match HTML tag names."),U(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),W("Event Handlers",()=>{q("Event handlers are delegated automatically for performance."),U(`button("Click me", () => console.log("clicked!"));

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),W("Nesting Elements",()=>{q("Use a callback function to nest elements."),U(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),W("Void Elements",()=>{q("Elements like input, img, br only accept props."),U(`input({ type: "email", placeholder: "you@example.com" });
img("/photo.jpg", "Photo");
br();`)}),W("onMount Callback",()=>{q("Access layout properties after the element is in the DOM."),U(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),m("Element Factory Types","element-factory-types",()=>{q("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),w("Standard Elements",()=>{q("Used for semantic structure elements. Click each tab to see the different patterns for creating an article:"),R0([{label:"Empty",code:`// Empty element
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
});`}]),x("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),w("Text Elements",()=>{q("Optimized for elements that commonly hold text content. Click each tab to see different ways to create the same heading:"),R0([{label:"Empty",code:`// Empty element
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
});`}]),x("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),w("Interactive Elements",()=>{q("Special factories for interactive elements with convenient text + click handler shorthand:"),R0([{label:"Text + Click ",code:`// Text + click handler shorthand
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
});`}]),x("Elements: button, summary, option, optgroup.")}),w("Void Elements",()=>{q("Self-closing elements that cannot have children."),U(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),x("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),w("Type Safety Benefits",()=>{q("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),U(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),m("Reactivity","reactivity",()=>{w("Signals",()=>{q("Signals are the primitive units of reactivity."),U(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),w("Reactive Stores",()=>{q("Fia stores are immutable by default for predictability."),U(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),x("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),x("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),w("Computed Values",()=>{q("Computed signals automatically track dependencies and update when they change."),U(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),w("Effects",()=>{q("Use $e() to run side effects when dependencies change."),U(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),m("Immutability","immutability",()=>{q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),w("Data Types & Behavior",()=>{W("1. Primitives (String, Number, Boolean)",()=>{q("Primitives are immutable by default. To make them mutable, use Mut."),U(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),W("2. Objects",()=>{q("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),U(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),q("Mutable Objects:"),U(`// Option A: Specific keys
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
// unless the parent key is also mutable.`)}),W("Secure Immutability by Design",()=>{q("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),U(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),x("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),W("3. Arrays",()=>{q("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),U(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),q("Mutable Arrays:"),U(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),W("4. Nested Objects (Deep Reactivity)",()=>{q("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),U(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),m("Control Flow","control-flow",()=>{w("Show","control-flow-show",()=>{q("Conditionally render content that updates when the condition changes."),U('Show(() => isVisible.value, () => div("Hello!"));')}),w("Each","control-flow-each",()=>{q("High-performance keyed list rendering with efficient reconciliation. Minimizes DOM operations by reusing existing nodes instead of recreating them."),W("Basic Usage",()=>{q("Simple list rendering without key function:"),U(`const items = $({ list: ["Apple", "Banana", "Cherry"] });

// Re-renders when list changes
Each(() => items.list, (item, index) => {
  li({ textContent: \`\${index + 1}. \${item}\` });
});`)}),W("With Key Function (Recommended)",()=>{q("For dynamic lists (add/remove/reorder), use a key function to preserve DOM nodes and component state:"),U(`const todos = $({ items: [
  { id: 1, text: "Learn Fia", completed: false },
  { id: 2, text: "Build app", completed: false }
] });

// Use stable ID as key
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
  (todo) => todo.id  // ✅ Key function
);

// Add item: Only creates 1 new node
todos.items = [...todos.items, { id: 3, text: "Deploy", completed: false }];`)}),W("Performance Characteristics",()=>{q("Each uses keyed reconciliation to achieve O(1) performance for common operations:"),x("Add 1 item to 1000: O(1) - creates 1 node (~0.5ms)","info"),x("Remove 1 item from 1000: O(1) - removes 1 node (~0.3ms)","info"),x("Move/reorder items: O(1) - moves nodes (~0.2ms)","info"),x("Preserves: input focus, scroll position, component state","info"),U(`// Performance comparison
const items = Array(1000).fill(0).map((_, i) => ({ id: i, value: i }));

// Without key function:
// - Adding 1 item: Recreates all 1001 nodes (~150ms)
// - Input focus is lost

// With key function:
// - Adding 1 item: Creates 1 node (~0.5ms)
// - Input focus is preserved ✅`)}),W("Key Function Best Practices",()=>{q("Choose stable, unique keys for optimal performance:"),U(`// ✅ Good: Use database ID
(item) => item.id

// ✅ Good: Use UUID
(item) => item.uuid

// ✅ Good: Composite key
(item) => \`\${item.category}-\${item.slug}\`

// ❌ Bad: Index (defeats the purpose)
(item, index) => index

// ❌ Bad: Random number
(item) => Math.random()

// ❌ Bad: Non-unique field
(item) => item.category  // Multiple items can share category`)}),W("Real-World Example",()=>{q("Complete todo list with add, remove, and toggle functionality:"),U(`const state = $({
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
});`)}),W("Performance Tips",()=>{t(["Always use key function for lists that can be modified","Use stable IDs (database ID, UUID) as keys","Avoid using index as key unless list is append-only","Batch multiple updates with batch() for better performance","Key function is optional for simple, static lists"])})}),w("Match","control-flow-match",()=>{q("Reactive pattern matching for switch/case logic. Automatically updates rendering when the matched value changes."),q("Match accepts signals or getter functions, and returns Signal<R> with '_' default or Signal<R | undefined> without."),W("Strings","match-strings",()=>{q("Match exact string values:"),U(`const status = $(Mut("active"));

Match(status, {
  "active": () => span({ class: "success" }, () => t("Active")),
  "inactive": () => span({ class: "danger" }, () => t("Inactive")),
  "pending": () => span({ class: "warning" }, () => t("Pending")),
  _: () => span("Unknown")
});`)}),W("Booleans","match-booleans",()=>{q("Boolean values are automatically converted to string keys:"),U(`const isActive = $(Mut(true));

Match(isActive, {
  "true": () => "✅ Active",
  "false": () => "❌ Inactive"
});`)}),W("Numbers","match-numbers",()=>{q("Numbers support exact matching:"),U(`const count = $(Mut(2));

Match(count, {
  "0": () => "None",
  "1": () => "One",
  "2": () => "Two",
  _: () => "Many"
});`),q("For numeric values, Match also supports range-based comparisons using operators and interval notation:"),U(`const age = $(Mut(25));

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
});`),x("Range patterns only work with numeric values. Exact string matches are checked before range patterns.","info")})})}),m("Component Composition","components",()=>{q("In Fia, components are just functions. There is no special class or type."),w("Basic Component",()=>{U(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),w("Children & Layouts",()=>{q("To create wrapper components, pass a callback function as a child prop."),U(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),m("Performance","performance",()=>{q("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),w("Event Delegation",()=>{q("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),U(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),W("How it works",()=>{t(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),W("Benefits",()=>{t(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),U(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),w("Automatic Fragment Batching",()=>{q("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),U(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),W("How it works",()=>{t(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),W("Benefits",()=>{t(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),U(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),w("Fine-Grained Reactivity",()=>{q("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),U(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),w("Best Practices",()=>{W("1. Batch Multiple Updates",()=>{U(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),W("2. Use peek() for Non-Reactive Reads",()=>{U(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),W("3. Memoize Expensive Computations",()=>{U(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),m("Examples","examples",()=>{w("\uD83D\uDFE2 Beginner",()=>{W("1. Hello World",()=>{q("The simplest possible Fia code."),U('h1("Hello, World!");')}),W("2. Counter",()=>{q("Signals hold reactive state."),U(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),W("3. Toggle",()=>{q("Computed signals derive values from other signals."),U(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
Show(visible, () => p("Now you see me!"));`)}),W("4. Input Binding",()=>{q("Two-way binding is manual but explicit."),U('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),W("5. List Rendering (Static)",()=>{q("For simple static lists, forEach works fine."),U(`const items = ["Apple", "Banana", "Cherry"];
ul(() => Each(items, li));`)})}),w("\uD83D\uDFE1 Intermediate",()=>{W("6. Reactive Store Counter",()=>{q("Objects passed to $() become reactive stores."),U(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),W("7. Conditional Classes",()=>{q("Computed signals work in class props too."),U(`const active = $(Mut(false));
button($(() => active.value ? "Deactivate" : "Activate"), () => active.value = !active.value);`)}),W("8. Form Handling",()=>{q("Reactive stores are perfect for forms."),U(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),W("9. Computed Values",()=>{q("Track dependencies automatically."),U('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),W("10. Dynamic Styling",()=>{q("Reactive styles allow theming."),U(`const theme = $(Mut("light"));

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
});`)})}),w("\uD83D\uDD34 Advanced",()=>{W("11. Control Flow Combo (Each + Show + Match)",()=>{q("A complete task manager combining all control flow components:"),U(`// Task manager example combining Each, Show, and Match
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
});`)}),W("12. Todo App",()=>{q("A complete todo app using Each."),U(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),W("12. Tabs Component",()=>{q("Track active index and conditionally render."),U(`const tabs = ["Home", "About", "Contact"];
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
});`)}),W("13. Async Data Fetching",()=>{q("Use Match for loading states."),U(`const state = $(Mut({
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
});`)}),W("14. Modal Dialog",()=>{q("Modal patterns with explicit types."),U(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var t0=()=>{let z=A(V(0)),Z=A(V(0)),J=A(V(0));return document.addEventListener("mousemove",(X)=>{z.value=X.clientX,Z.value=X.clientY,J.value=1}),document.addEventListener("mouseout",()=>{J.value=0}),G({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:A(()=>`translate(${z.value-200}px, ${Z.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:A(()=>J.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var F1=()=>G({id:"landing-page"},()=>{t0(),c0(),i0(),o0(),n0(),a0(),r0()});F1();
