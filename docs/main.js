var C=void 0,c=0,L0=0,s=void 0;function o(z){if(C)z.subs.add(C),C.deps.add(z)}function r(z){z.version=++c;let Z=[...z.subs];for(let F of Z)if(L0>0){if(!s)s=new Set;s.add(F)}else F.execute()}function a(z){for(let Z of z.deps)Z.subs.delete(z);z.deps.clear()}function b(z){let Z=!0,F={execute(){if(!Z)return;a(F);let X=C;C=F;try{z()}finally{C=X}},deps:new Set,cleanup(){Z=!1,a(F)}};return F.execute(),()=>F.cleanup()}function k0(z){let Z={version:c,subs:new Set},F=z,X=function(f){if(arguments.length>0){if(!Object.is(F,f))F=f,r(Z);return}return o(Z),F};return Object.defineProperty(X,"value",{get(){return o(Z),F},set(f){if(!Object.is(F,f))F=f,r(Z)}}),X[Q0]=!0,X.peek=()=>F,X}function s0(z){let Z={version:c,subs:new Set},F,X=-1,f={execute(){Z.version=++c;let j=[...Z.subs];for(let L of j)if(L0>0){if(!s)s=new Set;s.add(L)}else L.execute()},deps:new Set,cleanup(){a(f)}},J=()=>{a(f);let j=C;C=f;try{let L=z();if(!Object.is(F,L))F=L;X=Z.version}finally{C=j}};J();let Y=function(){if(X!==Z.version)J();return o(Z),F};return Object.defineProperty(Y,"value",{get(){return Y()}}),Y[Q0]=!0,Y.peek=()=>{if(X!==Z.version)J();return F},Y}var J0=Symbol("reactive-proxy"),n=Symbol("raw");function b0(z){return z!==null&&typeof z==="object"&&J0 in z}function j0(z){let Z=new Map,F=new WeakMap;function X(J){let Y=Z.get(J);if(!Y)Y={version:0,subs:new Set},Z.set(J,Y);return Y}return new Proxy(z,{get(J,Y,j){if(Y===n||Y==="$raw")return J;if(Y===J0)return!0;let L=X(Y);o(L);let M=Reflect.get(J,Y,j);if(M!==null&&typeof M==="object"&&!b0(M)){let D=F.get(M);if(!D)D=j0(M),F.set(M,D);return D}return M},set(J,Y,j,L){let M=Reflect.get(J,Y,L),D=j!==null&&typeof j==="object"&&n in j?j[n]:j,T=Array.isArray(J)&&Y==="length";if(Object.is(M,D)&&!T)return!0;if(Reflect.set(J,Y,D,L),M!==null&&typeof M==="object")F.delete(M);let u=Z.get(Y);if(u)r(u);return!0},has(J,Y){if(Y===J0||Y===n||Y==="$raw")return!0;return Reflect.has(J,Y)},ownKeys(J){return Reflect.ownKeys(J)},getOwnPropertyDescriptor(J,Y){return Reflect.getOwnPropertyDescriptor(J,Y)},deleteProperty(J,Y){let j=Reflect.has(J,Y),L=Reflect.deleteProperty(J,Y);if(j&&L){let M=Z.get(Y);if(M)r(M)}return L}})}function I(z,...Z){if(typeof z==="function")return s0(z);if(z!==null&&typeof z==="object")return j0(z);return k0(z)}var Q0=Symbol("signal");function V(z){return typeof z==="function"&&z[Q0]===!0}var l=[];function y(z){l.push(z)}function h(){l.pop()}function $(){return l[l.length-1]??document.body}var d0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),t=new WeakMap,G0=new Set;function S0(z){let{target:Z,type:F}=z;while(Z){let X=t.get(Z);if(X&&X[F]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:Z}),X[F](z),z.cancelBubble)break}Z=Z.parentElement}}function e(z,Z,F){if(d0.has(Z)){if(!G0.has(Z))document.addEventListener(Z,S0,{capture:!1,passive:!1}),G0.add(Z);let X=t.get(z);if(!X)X={},t.set(z,X);X[Z]=F}else z.addEventListener(Z,F)}if(typeof window<"u")window.__eventHandlerMap=t;function H(z){return(Z,F)=>{let X=document.createElement(z),f,J;if(Z===void 0);else if(N(Z))J=Z;else if(R(Z)){if(f=Z,F!==void 0)J=F}if(f)A(X,f);let Y=[],j=(L)=>Y.push(L);if(J){let L=document.createDocumentFragment();y(L);try{J(X,j)}finally{h()}X.appendChild(L)}if($().appendChild(X),Y.length>0)requestAnimationFrame(()=>{for(let L of Y)L()});return X}}function U(z){return(Z,F,X)=>{let f=document.createElement(z),J,Y,j;if(Z===void 0);else if(d(Z)){if(J=Z,F===void 0);else if(N(F))j=F;else if(R(F)){if(Y=F,X!==void 0)j=X}}else if(N(Z))j=Z;else if(R(Z)){if(Y=Z,F!==void 0&&N(F))j=F}if(J!==void 0)S(f,J);if(Y)A(f,Y);let L=[],M=(D)=>L.push(D);if(j){let D=document.createDocumentFragment();y(D);try{j(f,M)}finally{h()}f.appendChild(D)}if($().appendChild(f),L.length>0)requestAnimationFrame(()=>{for(let D of L)D()});return f}}function v(z){return(Z,F,X)=>{let f=document.createElement(z),J,Y,j,L;if(Z===void 0);else if(d(Z)){if(J=Z,F===void 0);else if(K0(F))Y=F;else if(N(F))L=F;else if(R(F)){if(j=F,X!==void 0)L=X}}else if(N(Z))L=Z;else if(R(Z)){if(j=Z,F!==void 0&&N(F))L=F}if(J!==void 0)S(f,J);if(Y)e(f,"click",Y);if(j)A(f,j);let M=[],D=(T)=>M.push(T);if(L){let T=document.createDocumentFragment();y(T);try{L(f,D)}finally{h()}f.appendChild(T)}if($().appendChild(f),M.length>0)requestAnimationFrame(()=>{for(let T of M)T()});return f}}function O(z){return(Z)=>{let F=document.createElement(z);if(Z)A(F,Z);return $().appendChild(F),F}}function M0(){return(z,Z,F)=>{let X=document.createElement("img"),f,J,Y;if(z===void 0);else if(typeof z==="string"&&D0(z)){if(f=z,Z===void 0);else if(typeof Z==="string"){if(J=Z,F!==void 0)Y=F}else if(R(Z))Y=Z}else if(R(z))Y=z;if(f!==void 0)X.src=f;if(J!==void 0)X.alt=J;if(Y)A(X,Y);return $().appendChild(X),X}}function $0(){return(z,Z,F)=>{let X=document.createElement("a"),f,J,Y,j;if(z===void 0);else if(typeof z==="string"&&I0(z)){if(f=z,Z===void 0);else if(d(Z)){if(J=Z,F!==void 0)Y=F}else if(R(Z))Y=Z}else if(N(z))j=z;else if(R(z)){if(Y=z,Z!==void 0&&N(Z))j=Z}if(f!==void 0)X.href=f;if(J!==void 0)S(X,J);if(Y)A(X,Y);let L=[],M=(D)=>L.push(D);if(j){let D=document.createDocumentFragment();y(D);try{j(X,M)}finally{h()}X.appendChild(D)}if($().appendChild(X),L.length>0)requestAnimationFrame(()=>{for(let D of L)D()});return X}}function d(z){return typeof z==="string"||typeof z==="number"||V(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function K0(z){if(typeof z!=="function")return!1;if(V(z))return!1;return z.length<=1}function I0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function D0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var U0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function m0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function v0(z,Z,F){switch(Z){case"value":if("value"in z)z.value=String(F??"");break;case"checked":if("checked"in z)z.checked=Boolean(F);break;case"selected":if("selected"in z)z.selected=Boolean(F);break;case"muted":if("muted"in z)z.muted=Boolean(F);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(F??0);break;case"volume":if("volume"in z)z.volume=Number(F??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(F);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(F??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(F);break;case"textContent":z.textContent=String(F??"");break;case"innerText":z.innerText=String(F??"");break}}function _0(z,Z,F){if(Z==="class"||Z==="className"||Z==="classList")p0(z,F);else if(Z==="style")i0(z,F);else if(m0(Z))v0(z,Z,F);else if(typeof F==="boolean")if(F)z.setAttribute(U0[Z]??Z,"");else z.removeAttribute(U0[Z]??Z);else z.setAttribute(U0[Z]??Z,String(F))}function A(z,Z){for(let F in Z){let X=Z[F];if(X===null||X===void 0)continue;if(F.startsWith("on")&&typeof X==="function"){let f=F.slice(2).toLowerCase();e(z,f,X)}else if(V(X))b(()=>_0(z,F,X.value));else _0(z,F,X)}}function p0(z,Z){if(typeof Z==="string")z.className=Z;else if(Array.isArray(Z))z.className=Z.filter(Boolean).join(" ");else if(typeof Z==="object"&&Z!==null){let F=!1;for(let f in Z)if(V(Z[f])){F=!0;break}let X=()=>{let f=[];for(let J in Z){let Y=Z[J];if(V(Y)?Y.value:Y)f.push(J)}z.className=f.join(" ")};if(F)b(X);else X()}}function g0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function W0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let Z=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${Z} / ${z.alpha})`:`color(${z.space} ${Z})`}case"color-mix":{let Z=typeof z.color1==="object"?W0(z.color1):z.color1,F=typeof z.color2==="object"?W0(z.color2):z.color2,X=z.percentage1!==void 0?`${z.percentage1}%`:"",f=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${Z} ${X}, ${F} ${f})`}}}function w0(z){if(z===null||z===void 0)return"";if(g0(z))return W0(z);return String(z)}function R0(z,Z,F){if(Z.startsWith("--")){z.setProperty(Z,F);return}if(Z.startsWith("webkit")||Z.startsWith("moz")||Z.startsWith("ms")||Z.startsWith("o")){let X=Z.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(X,F);return}try{z[Z]=F}catch{z.setProperty(Z,F)}}function i0(z,Z){if(typeof Z==="string")z.setAttribute("style",Z);else if(typeof Z==="object"&&Z!==null){let F=!1;for(let X in Z)if(V(Z[X])){F=!0;break}if(F)b(()=>{for(let X in Z){let f=Z[X],J=V(f)?f.value:f;R0(z.style,X,w0(J))}});else for(let X in Z){let f=Z[X];R0(z.style,X,w0(f))}}}function S(z,Z){if(V(Z))b(()=>{z.textContent=String(Z.value)});else z.textContent=String(Z)}function R(z){return typeof z==="object"&&z!==null&&!V(z)&&!Array.isArray(z)}function N(z){return typeof z==="function"&&!V(z)}var P=$0(),q0=M0(),z0=v("button"),O1=v("summary"),A1=v("option"),B1=v("optgroup"),N0=U("h1"),O0=U("h2"),p=U("h3"),g=U("h4"),V1=U("h5"),T1=U("h6"),m=U("p"),Q=U("div"),P1=U("article"),Z0=U("section"),C1=U("aside"),A0=U("header"),B0=U("footer"),y1=U("main"),h1=U("blockquote"),x1=U("figcaption"),F0=U("pre"),E1=U("address"),_=U("span"),k1=U("strong"),s1=U("em"),b1=U("small"),d1=U("mark"),S1=U("code"),m1=U("samp"),v1=U("kbd"),p1=U("var"),g1=U("i"),i1=U("b"),u1=U("u"),n1=U("s"),c1=U("del"),o1=U("ins"),r1=U("sub"),a1=U("sup"),l1=U("abbr"),t1=U("cite"),e1=U("dfn"),z5=U("q"),Z5=U("time"),F5=U("data"),X5=U("bdi"),Y5=U("bdo"),f5=U("ruby"),J5=U("rp"),Q5=U("rt"),U5=U("label"),W5=U("legend"),q5=U("output"),H5=U("caption"),L5=U("td"),j5=U("th"),E=U("li"),G5=U("dd"),K5=U("dt"),M5=U("title"),D5=O("input"),$5=O("br"),I5=O("hr"),_5=O("meta"),w5=O("link"),R5=O("area"),N5=O("base"),O5=O("col"),A5=O("embed"),B5=O("source"),V5=O("track"),T5=O("wbr"),X0=H("ul"),P5=H("ol"),C5=H("menu"),y5=H("table"),h5=H("tbody"),x5=H("thead"),E5=H("tfoot"),k5=H("tr"),s5=H("colgroup"),b5=H("form"),d5=H("fieldset"),S5=H("details"),m5=H("dialog"),V0=H("nav"),v5=H("figure"),p5=H("select"),g5=H("datalist"),i5=H("dl"),u5=H("audio"),n5=H("video"),c5=H("picture"),o5=H("iframe"),r5=H("object"),a5=H("canvas"),l5=H("map"),t5=H("body"),e5=H("head"),zz=H("html"),Zz=H("hgroup"),Fz=H("template"),Xz=H("slot"),Yz=H("noscript"),fz=H("script"),Jz=H("style"),Qz=H("textarea"),Uz=H("meter"),Wz=H("progress"),qz=H("search");var T0=()=>V0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{Q({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{_({style:{color:"var(--mongo-green)"},textContent:"fia"})}),Q({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{P({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),P({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),P({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var P0=()=>A0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{N0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{Q({textContent:"Build High-Performance UIs"}),Q({class:"text-gradient",textContent:"Without the Virtual DOM"})}),m({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6",position:"relative",zIndex:"1"},textContent:"Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."}),Q({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{z0({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),P({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),Q({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),Q({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),Q({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),Q({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),Q({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function Y0(z,Z=10){let F,X=()=>{F=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},f=(Y)=>{if(!F)F=z.getBoundingClientRect();let j=Y.clientX-F.left,L=Y.clientY-F.top,M=F.width/2,D=F.height/2,T=(L-D)/D*-Z,u=(j-M)/M*Z;z.style.transform=`
            perspective(1000px)
            rotateX(${T}deg)
            rotateY(${u}deg)
            scale3d(1.02, 1.02, 1.02)
        `},J=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",X),z.addEventListener("mousemove",f),z.addEventListener("mouseleave",J),()=>{z.removeEventListener("mouseenter",X),z.removeEventListener("mousemove",f),z.removeEventListener("mouseleave",J)}}var w=(z)=>{$().appendChild(document.createTextNode(z))},C0=()=>Q({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{Q({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{Y0(z,5),Q({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{Q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),Q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),Q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let Z=(J)=>_({style:{color:"var(--syntax-keyword)"},textContent:J}),F=(J)=>_({style:{color:"var(--syntax-function)"},textContent:J}),X=(J)=>_({style:{color:"var(--syntax-string)"},textContent:J}),f=(J)=>_({style:{color:"var(--syntax-comment)"},textContent:J});F0({style:{transform:"translateZ(40px)"}},()=>{Q(()=>{Z("import"),w(" { $, div, button } "),Z("from"),X(' "fia"'),w(";")}),w(" "),Q(()=>{Z("const"),w(" count = "),F("$"),w("(0);")}),w(" "),Q(()=>{F("div"),w("(() => {")}),Q({style:{paddingLeft:"1.5rem"}},()=>{F("button"),w("({ ")}),Q({style:{paddingLeft:"3rem"}},()=>{Q({textContent:"onclick: () => count.value++,"})}),Q({style:{paddingLeft:"3rem"}},()=>{w("textContent: "),X('"Increment"')}),Q({style:{paddingLeft:"1.5rem"}},()=>{w("});")}),w(" "),Q({style:{paddingLeft:"1.5rem"}},()=>{f("// Updates are surgical - no VDOM diffing")}),Q({style:{paddingLeft:"1.5rem"}},()=>{F("div"),w("({ "),w("textContent"),w(": "),F("$"),w("(() => "),X("`Count: ${count.value}`"),w(") });")}),Q({textContent:"});"})})})});var H0=(z,Z,F)=>Q({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(X)=>{Y0(X,15),Q({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:F}),p({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),m({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:Z})}),y0=()=>Z0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{H0("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),H0("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),H0("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var h0=()=>B0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{Q({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{Q({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var k=(z)=>{$().appendChild(document.createTextNode(z))},u0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((F)=>{if(F.startsWith("//"))_({style:{color:"var(--syntax-comment)"},textContent:F});else if(F.startsWith('"')||F.startsWith("'")||F.startsWith("`"))_({style:{color:"var(--syntax-string)"},textContent:F});else if(["const","import","from","function","return","if","else","true","false"].includes(F))_({style:{color:"var(--syntax-keyword)"},textContent:F});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(F))_({style:{color:"var(--syntax-function)"},textContent:F});else k(F)})},q=(z)=>Q({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{Q({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{Q({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{Q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),Q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),Q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let Z=I(!1);z0({textContent:I(()=>Z.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:I(()=>Z.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),Z.value=!0,setTimeout(()=>Z.value=!1,2000)}})}),F0({style:{margin:"0",overflowX:"auto"}},()=>{u0(z)})}),B=(z,Z,F)=>{Z0({id:Z,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{Q({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{Q({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),O0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),F()})},G=(z,Z)=>{Q({style:{marginBottom:"2.5rem"}},()=>{p({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),Z()})},K=(z,Z)=>{Q({style:{marginBottom:"1.5rem"}},()=>{g({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),Z()})},W=(z)=>m({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>k(z)),i=(z)=>X0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((Z)=>E({textContent:Z}))}),x=(z,Z="info")=>Q({style:{background:Z==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${Z==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:Z==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>k(z)),f0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow"},{id:"components",title:"Components"},{id:"svg",title:"SVG"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],n0=()=>{let z=I("intro"),Z=()=>{let F=window.scrollY+150;for(let X=f0.length-1;X>=0;X--){let f=document.getElementById(f0[X].id);if(f&&f.offsetTop<=F){z.value=f0[X].id;break}}};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",Z),Z()},0);return Q({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{Q({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{p({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),X0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{f0.forEach((F)=>{E({style:{marginBottom:"0.5rem"}},()=>{P({href:`#${F.id}`,style:{color:I(()=>z.value===F.id?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:I(()=>z.value===F.id?"600":"400"),borderLeft:I(()=>z.value===F.id?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:F.title,onclick:(X)=>{X.preventDefault();let f=document.getElementById(F.id);if(f){let Y=f.offsetTop-100;window.scrollTo({top:Y,behavior:"smooth"}),z.value=F.id}}})})})})})})},x0=()=>Q({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{n0(),Q({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{Q({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{P({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{q0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),P({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{q0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),B("Introduction","intro",()=>{W("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),B("Why Fia?","why-fia",()=>{W("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),X0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{E({style:{marginBottom:"0.5rem"}},()=>{_({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),k("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),E({style:{marginBottom:"0.5rem"}},()=>{_({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),k("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),E({style:{marginBottom:"0.5rem"}},()=>{_({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),k("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),E({style:{marginBottom:"0.5rem"}},()=>{_({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),k("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),B("Getting Started","getting-started",()=>{G("Prerequisites",()=>{W("Fia is compatible with any modern JavaScript runtime."),i(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),G("Installation",()=>{W("Fia is published on JSR. Install it using your preferred package manager:"),Q({style:{marginBottom:"1rem"}},()=>{g({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),q("deno add jsr:@fia/core")}),Q({style:{marginBottom:"1rem"}},()=>{g({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),W('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),W("2. Install (aliased as 'fia'):"),q("bun add fia@npm:@jsr/fia__core")}),Q({style:{marginBottom:"1rem"}},()=>{g({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),q("npx jsr add @fia/core")}),x("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),G("Updating",()=>{W("To update to the latest version, run the installation command again (or use your package manager's update command)."),q(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),G("Quick Start",()=>{W("Create your first reactive app in seconds."),q(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),G("Mounting",()=>{W("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),q(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),B("Element API","element-api",()=>{W("Fia elements have a simple, consistent API. Functions match HTML tag names."),q(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),K("Text Content",()=>{W("Use the native textContent prop for static or reactive text."),q(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),K("Event Handlers",()=>{W("Event handlers are delegated automatically foon this pager performance."),q(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),K("Nesting Elements",()=>{W("Use a callback function to nest elements."),q(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),K("Void Elements",()=>{W("Elements like input, img, br only accept props."),q(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),K("onMount Callback",()=>{W("Access layout properties after the element is in the DOM."),q(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),B("Element Factory Types","element-factory-types",()=>{W("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),G("Standard Elements (4 overloads)",()=>{W("Used for semantic structure elements. These factories support the base patterns:"),q(`// 1. Empty element
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
});`),x("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),G("Text Elements (11 overloads)",()=>{W("Optimized for elements that commonly hold text content with convenient text-first syntax."),q(`// All standard overloads plus text shortcuts:

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
});`),x("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),G("Interactive Elements (10 overloads)",()=>{W("Special factories for interactive elements with text + click handler shorthand."),q(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`),x("Elements: button, summary, option, optgroup.")}),G("Void Elements (1 overload)",()=>{W("Self-closing elements that cannot have children."),q(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),x("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),G("Type Safety Benefits",()=>{W("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),q(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),B("Reactivity","reactivity",()=>{G("Signals",()=>{W("Signals are the primitive units of reactivity."),q(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),G("Reactive Stores",()=>{W("Fia stores are immutable by default for predictability."),q(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),x("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),G("Computed Values",()=>{W("Computed signals automatically track dependencies and update when they change."),q(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),G("Effects",()=>{W("Use $e() to run side effects when dependencies change."),q(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),B("Immutability","immutability",()=>{W("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),G("Working with Immutable State",()=>{W("When a store is immutable, you update state by replacing objects, not mutating properties."),q(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),B("Control Flow","control-flow",()=>{G("Show",()=>{W("Conditionally render content that updates when the condition changes."),q('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),G("Each",()=>{W("Reactive list rendering that re-renders efficiently."),q(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),G("Match",()=>{W("Reactive pattern matching for switch/case logic."),q(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),B("Component Composition","components",()=>{W("In Fia, components are just functions. There is no special class or type."),G("Basic Component",()=>{q(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),G("Children & Layouts",()=>{W("To create wrapper components, pass a callback function as a child prop."),q(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),B("SVG","svg",()=>{W("Fia supports SVG elements with full type safety."),q(`import { svg, svgCircle } from "fia";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),B("Performance","performance",()=>{W("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),G("Event Delegation",()=>{W("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),q(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),K("How it works",()=>{i(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),K("Benefits",()=>{i(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),q(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),G("Automatic Fragment Batching",()=>{W("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),q(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1({ textContent: "Title" });    // → Fragment
  p({ textContent: "Para 1" });     // → Fragment
  p({ textContent: "Para 2" });     // → Fragment
});
// Single appendChild(fragment)`),K("How it works",()=>{i(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),K("Benefits",()=>{i(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),q(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),G("Fine-Grained Reactivity",()=>{W("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),q(`const count = $(0);

// Only the <p> text updates when count changes
div(() => {
  p({ textContent: $(() => \`Count: \${count.value}\`) }); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`),K("Performance Comparison",()=>{x("React/Vue: Virtual DOM diff → Entire component tree"),x("Svelte: Compile-time → Block scope"),x("Fia: Direct signal subscription → Single element","info")})}),G("Best Practices",()=>{K("1. Batch Multiple Updates",()=>{q(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),K("2. Use peek() for Non-Reactive Reads",()=>{q(`const count = $(0);
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),K("3. Memoize Expensive Computations",()=>{q(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),B("Examples","examples",()=>{G("\uD83D\uDFE2 Beginner",()=>{K("1. Hello World",()=>{W("The simplest possible Fia code."),q('h1({ textContent: "Hello, World!" });')}),K("2. Counter",()=>{W("Signals hold reactive state."),q(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),K("3. Toggle",()=>{W("Computed signals derive values from other signals."),q(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),K("4. Input Binding",()=>{W("Two-way binding is manual but explicit."),q('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),K("5. List Rendering (Static)",()=>{W("For simple static lists, forEach works fine."),q(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),G("\uD83D\uDFE1 Intermediate",()=>{K("6. Reactive Store Counter",()=>{W("Objects passed to $() become reactive stores."),q(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),K("7. Conditional Classes",()=>{W("Computed signals work in class props too."),q(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),K("8. Form Handling",()=>{W("Reactive stores are perfect for forms."),q(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),K("9. Computed Values",()=>{W("Track dependencies automatically."),q('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),K("10. Dynamic Styling",()=>{W("Reactive styles allow theming."),q(`const theme = $("light");

div({
  style: {
    background: $(() => theme.value === "dark" ? "#222" : "#fff"),
    color: $(() => theme.value === "dark" ? "#fff" : "#222"),
    padding: "2rem",
  }
}, () => {
  button({ textContent: "Toggle Theme", onclick: () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }});
});`)})}),G("\uD83D\uDD34 Advanced",()=>{K("11. Todo App",()=>{W("A complete todo app using Each."),q(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

div(() => {
  input({
    type: "text",
    value: $(() => todos.input),
    oninput: (e) => todos.input = e.currentTarget.value,
  });
  button({
    textContent: "Add",
    onclick: () => {
      if (todos.input.trim()) {
        todos.items = [...todos.items, todos.input];
        todos.input = "";
      }
    },
  });
  ul(() => {
    Each(() => todos.items, (item, i) => {
      li(() => {
        span({ textContent: item });
        button({
          textContent: "×",
          onclick: () => todos.items = todos.items.filter((_, j) => j !== i),
        });
      });
    });
  });
});`)}),K("12. Tabs Component",()=>{W("Track active index and conditionally render."),q(`const tabs = ["Home", "About", "Contact"];
const active = $(0);

div(() => {
  div({ class: "tabs" }, () => {
    tabs.forEach((tab, i) => {
      button({
        textContent: tab,
        class: $(() => active.value === i ? "active" : ""),
        onclick: () => active.value = i,
      });
    });
  });
  div({ class: "content" }, () => {
    // Match returns a signal!
    p({
      textContent: Match(() => active.value, {
        0: () => "Welcome to the Home page!",
        1: () => "About Fia Framework...",
        2: () => "Contact us at hello@fia.dev",
      })
    });
  });
});`)}),K("13. Async Data Fetching",()=>{W("Use Match for loading states."),q(`const state = $({
  status: "loading" as "loading" | "success" | "error",
  users: [] as string[]
}, "status", "users");

fetch("/api/users")
  .then(r => r.json())
  .then(users => {
    state.users = users;
    state.status = "success";
  })
  .catch(() => state.status = "error");

div(() => {
  Match(() => state.status, {
    loading: () => p({ textContent: "Loading..." }),
    error: () => p({ textContent: "Failed to load users" }),
    success: () => ul(() => Each(() => state.users, u => li({ textContent: u }))),
  });
});`)}),K("14. Modal Dialog",()=>{W("Modal patterns with explicit types."),q(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

function openModal(title: string) {
  modal.title = title;
  modal.open = true;
}

button({ textContent: "Open Modal", onclick: () => openModal("Hello!") });

div({
  class: "modal-backdrop",
  style: { display: $(() => modal.open ? "flex" : "none") },
  onclick: () => modal.open = false,
}, () => {
  div({
    class: "modal",
    onclick: (e) => e.stopPropagation(),
  }, () => {
    h2({ textContent: $(() => modal.title) });
    button({ textContent: "Close", onclick: () => modal.open = false });
  });
});`)})})})})});var E0=()=>{let z=I(0),Z=I(0),F=I(0);return document.addEventListener("mousemove",(X)=>{z.value=X.clientX,Z.value=X.clientY,F.value=1}),document.addEventListener("mouseout",()=>{F.value=0}),Q({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:I(()=>`translate(${z.value-200}px, ${Z.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:I(()=>F.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var c0=()=>Q({id:"landing-page"},()=>{E0(),T0(),P0(),C0(),y0(),x0(),h0()});c0();
