var T=void 0,u=0,q0=0,x=void 0;function n(f){if(T)f.subs.add(T),T.deps.add(f)}function c(f){f.version=++u;let z=[...f.subs];for(let Z of z)if(q0>0){if(!x)x=new Set;x.add(Z)}else Z.execute()}function o(f){for(let z of f.deps)z.subs.delete(f);f.deps.clear()}function E(f){let z=!0,Z={execute(){if(!z)return;o(Z);let F=T;T=Z;try{f()}finally{T=F}},deps:new Set,cleanup(){z=!1,o(Z)}};return Z.execute(),()=>Z.cleanup()}function x0(f){let z={version:u,subs:new Set},Z=f,F=function(L){if(arguments.length>0){if(!Object.is(Z,L))Z=L,c(z);return}return n(z),Z};return Object.defineProperty(F,"value",{get(){return n(z),Z},set(L){if(!Object.is(Z,L))Z=L,c(z)}}),F[X0]=!0,F.peek=()=>Z,F}function E0(f){let z={version:u,subs:new Set},Z,F=-1,L={execute(){z.version=++u;let j=[...z.subs];for(let W of j)if(q0>0){if(!x)x=new Set;x.add(W)}else W.execute()},deps:new Set,cleanup(){o(L)}},Y=()=>{o(L);let j=T;T=L;try{let W=f();if(!Object.is(Z,W))Z=W;F=z.version}finally{T=j}};Y();let X=function(){if(F!==z.version)Y();return n(z),Z};return Object.defineProperty(X,"value",{get(){return X()}}),X[X0]=!0,X.peek=()=>{if(F!==z.version)Y();return Z},X}var F0=Symbol("reactive-proxy"),i=Symbol("raw");function b0(f){return f!==null&&typeof f==="object"&&F0 in f}function H0(f){let z=new Map,Z=new WeakMap;function F(Y){let X=z.get(Y);if(!X)X={version:0,subs:new Set},z.set(Y,X);return X}return new Proxy(f,{get(Y,X,j){if(X===i||X==="$raw")return Y;if(X===F0)return!0;let W=F(X);n(W);let G=Reflect.get(Y,X,j);if(G!==null&&typeof G==="object"&&!b0(G)){let K=Z.get(G);if(!K)K=H0(G),Z.set(G,K);return K}return G},set(Y,X,j,W){let G=Reflect.get(Y,X,W),K=j!==null&&typeof j==="object"&&i in j?j[i]:j,P=Array.isArray(Y)&&X==="length";if(Object.is(G,K)&&!P)return!0;if(Reflect.set(Y,X,K,W),G!==null&&typeof G==="object")Z.delete(G);let g=z.get(X);if(g)c(g);return!0},has(Y,X){if(X===F0||X===i||X==="$raw")return!0;return Reflect.has(Y,X)},ownKeys(Y){return Reflect.ownKeys(Y)},getOwnPropertyDescriptor(Y,X){return Reflect.getOwnPropertyDescriptor(Y,X)},deleteProperty(Y,X){let j=Reflect.has(Y,X),W=Reflect.deleteProperty(Y,X);if(j&&W){let G=z.get(X);if(G)c(G)}return W}})}function O(f,...z){if(typeof f==="function")return E0(f);if(f!==null&&typeof f==="object")return H0(f);return x0(f)}var X0=Symbol("signal");function V(f){return typeof f==="function"&&f[X0]===!0}var r=[];function C(f){r.push(f)}function y(){r.pop()}function M(){return r[r.length-1]??document.body}var k0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),a=new WeakMap,W0=new Set;function S0(f){let{target:z,type:Z}=f;while(z){let F=a.get(z);if(F&&F[Z]){if(Object.defineProperty(f,"currentTarget",{configurable:!0,value:z}),F[Z](f),f.cancelBubble)break}z=z.parentElement}}function l(f,z,Z){if(k0.has(z)){if(!W0.has(z))document.addEventListener(z,S0,{capture:!1,passive:!1}),W0.add(z);let F=a.get(f);if(!F)F={},a.set(f,F);F[z]=Z}else f.addEventListener(z,Z)}if(typeof window<"u")window.__eventHandlerMap=a;function H(f){return(z,Z)=>{let F=document.createElement(f),L,Y;if(z===void 0);else if(N(z))Y=z;else if(w(z)){if(L=z,Z!==void 0)Y=Z}if(L)A(F,L);let X=[],j=(W)=>X.push(W);if(Y){let W=document.createDocumentFragment();C(W);try{Y(F,j)}finally{y()}F.appendChild(W)}if(M().appendChild(F),X.length>0)requestAnimationFrame(()=>{for(let W of X)W()});return F}}function J(f){return(z,Z,F)=>{let L=document.createElement(f),Y,X,j;if(z===void 0);else if(b(z)){if(Y=z,Z===void 0);else if(N(Z))j=Z;else if(w(Z)){if(X=Z,F!==void 0)j=F}}else if(N(z))j=z;else if(w(z)){if(X=z,Z!==void 0&&N(Z))j=Z}if(Y!==void 0)k(L,Y);if(X)A(L,X);let W=[],G=(K)=>W.push(K);if(j){let K=document.createDocumentFragment();C(K);try{j(L,G)}finally{y()}L.appendChild(K)}if(M().appendChild(L),W.length>0)requestAnimationFrame(()=>{for(let K of W)K()});return L}}function v(f){return(z,Z,F)=>{let L=document.createElement(f),Y,X,j,W;if(z===void 0);else if(b(z)){if(Y=z,Z===void 0);else if(j0(Z))X=Z;else if(N(Z))W=Z;else if(w(Z)){if(j=Z,F!==void 0)W=F}}else if(N(z))W=z;else if(w(z)){if(j=z,Z!==void 0&&N(Z))W=Z}if(Y!==void 0)k(L,Y);if(X)l(L,"click",X);if(j)A(L,j);let G=[],K=(P)=>G.push(P);if(W){let P=document.createDocumentFragment();C(P);try{W(L,K)}finally{y()}L.appendChild(P)}if(M().appendChild(L),G.length>0)requestAnimationFrame(()=>{for(let P of G)P()});return L}}function R(f){return(z)=>{let Z=document.createElement(f);if(z)A(Z,z);return M().appendChild(Z),Z}}function G0(){return(f,z,Z)=>{let F=document.createElement("img"),L,Y,X;if(f===void 0);else if(typeof f==="string"&&K0(f)){if(L=f,z===void 0);else if(typeof z==="string"){if(Y=z,Z!==void 0)X=Z}else if(w(z))X=z}else if(w(f))X=f;if(L!==void 0)F.src=L;if(Y!==void 0)F.alt=Y;if(X)A(F,X);return M().appendChild(F),F}}function $0(){return(f,z,Z)=>{let F=document.createElement("a"),L,Y,X,j;if(f===void 0);else if(typeof f==="string"&&D0(f)){if(L=f,z===void 0);else if(b(z)){if(Y=z,Z!==void 0)X=Z}else if(w(z))X=z}else if(N(f))j=f;else if(w(f)){if(X=f,z!==void 0&&N(z))j=z}if(L!==void 0)F.href=L;if(Y!==void 0)k(F,Y);if(X)A(F,X);let W=[],G=(K)=>W.push(K);if(j){let K=document.createDocumentFragment();C(K);try{j(F,G)}finally{y()}F.appendChild(K)}if(M().appendChild(F),W.length>0)requestAnimationFrame(()=>{for(let K of W)K()});return F}}function b(f){return typeof f==="string"||typeof f==="number"||V(f)&&(typeof f.peek()==="string"||typeof f.peek()==="number")}function j0(f){if(typeof f!=="function")return!1;if(V(f))return!1;return f.length<=1}function D0(f){if(typeof f!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(f)}function K0(f){if(typeof f!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(f)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(f)}var Y0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function d0(f){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(f)}function m0(f,z,Z){switch(z){case"value":if("value"in f)f.value=String(Z??"");break;case"checked":if("checked"in f)f.checked=Boolean(Z);break;case"selected":if("selected"in f)f.selected=Boolean(Z);break;case"muted":if("muted"in f)f.muted=Boolean(Z);break;case"currentTime":if("currentTime"in f)f.currentTime=Number(Z??0);break;case"volume":if("volume"in f)f.volume=Number(Z??1);break;case"indeterminate":if("indeterminate"in f)f.indeterminate=Boolean(Z);break;case"defaultValue":if("defaultValue"in f)f.defaultValue=String(Z??"");break;case"defaultChecked":if("defaultChecked"in f)f.defaultChecked=Boolean(Z);break;case"textContent":f.textContent=String(Z??"");break;case"innerText":f.innerText=String(Z??"");break}}function M0(f,z,Z){if(z==="class"||z==="className"||z==="classList")v0(f,Z);else if(z==="style")g0(f,Z);else if(d0(z))m0(f,z,Z);else if(typeof Z==="boolean")if(Z)f.setAttribute(Y0[z]??z,"");else f.removeAttribute(Y0[z]??z);else f.setAttribute(Y0[z]??z,String(Z))}function A(f,z){for(let Z in z){let F=z[Z];if(F===null||F===void 0)continue;if(Z.startsWith("on")&&typeof F==="function"){let L=Z.slice(2).toLowerCase();l(f,L,F)}else if(V(F))E(()=>M0(f,Z,F.value));else M0(f,Z,F)}}function v0(f,z){if(typeof z==="string")f.className=z;else if(Array.isArray(z))f.className=z.filter(Boolean).join(" ");else if(typeof z==="object"&&z!==null){let Z=!1;for(let L in z)if(V(z[L])){Z=!0;break}let F=()=>{let L=[];for(let Y in z){let X=z[Y];if(V(X)?X.value:X)L.push(Y)}f.className=L.join(" ")};if(Z)E(F);else F()}}function p0(f){return typeof f==="object"&&f!==null&&"type"in f&&typeof f.type==="string"}function L0(f){switch(f.type){case"rgb":return f.a!==void 0?`rgba(${f.r}, ${f.g}, ${f.b}, ${f.a})`:`rgb(${f.r}, ${f.g}, ${f.b})`;case"hsl":return f.a!==void 0?`hsla(${f.h}, ${f.s}%, ${f.l}%, ${f.a})`:`hsl(${f.h}, ${f.s}%, ${f.l}%)`;case"hwb":return f.a!==void 0?`hwb(${f.h} ${f.w}% ${f.b}% / ${f.a})`:`hwb(${f.h} ${f.w}% ${f.b}%)`;case"oklch":return f.a!==void 0?`oklch(${f.l}% ${f.c} ${f.h} / ${f.a})`:`oklch(${f.l}% ${f.c} ${f.h})`;case"lab":return f.alpha!==void 0?`lab(${f.l}% ${f.a} ${f.b} / ${f.alpha})`:`lab(${f.l}% ${f.a} ${f.b})`;case"lch":return f.alpha!==void 0?`lch(${f.l}% ${f.c} ${f.h} / ${f.alpha})`:`lch(${f.l}% ${f.c} ${f.h})`;case"oklab":return f.alpha!==void 0?`oklab(${f.l}% ${f.a} ${f.b} / ${f.alpha})`:`oklab(${f.l}% ${f.a} ${f.b})`;case"hex":return f.value;case"color":{let z=f.components.join(" ");return f.alpha!==void 0?`color(${f.space} ${z} / ${f.alpha})`:`color(${f.space} ${z})`}case"color-mix":{let z=typeof f.color1==="object"?L0(f.color1):f.color1,Z=typeof f.color2==="object"?L0(f.color2):f.color2,F=f.percentage1!==void 0?`${f.percentage1}%`:"",L=f.percentage2!==void 0?`${f.percentage2}%`:"";return`color-mix(${f.method}, ${z} ${F}, ${Z} ${L})`}}}function I0(f){if(f===null||f===void 0)return"";if(p0(f))return L0(f);return String(f)}function _0(f,z,Z){if(z.startsWith("--")){f.setProperty(z,Z);return}if(z.startsWith("webkit")||z.startsWith("moz")||z.startsWith("ms")||z.startsWith("o")){let F=z.replace(/([A-Z])/g,"-$1").toLowerCase();f.setProperty(F,Z);return}try{f[z]=Z}catch{f.setProperty(z,Z)}}function g0(f,z){if(typeof z==="string")f.setAttribute("style",z);else if(typeof z==="object"&&z!==null){let Z=!1;for(let F in z)if(V(z[F])){Z=!0;break}if(Z)E(()=>{for(let F in z){let L=z[F],Y=V(L)?L.value:L;_0(f.style,F,I0(Y))}});else for(let F in z){let L=z[F];_0(f.style,F,I0(L))}}}function k(f,z){if(V(z))E(()=>{f.textContent=String(z.value)});else f.textContent=String(z)}function w(f){return typeof f==="object"&&f!==null&&!V(f)&&!Array.isArray(f)}function N(f){return typeof f==="function"&&!V(f)}var h=$0(),J0=G0(),t=v("button"),N1=v("summary"),R1=v("option"),O1=v("optgroup"),w0=J("h1"),N0=J("h2"),e=J("h3"),p=J("h4"),A1=J("h5"),B1=J("h6"),S=J("p"),Q=J("div"),V1=J("article"),f0=J("section"),P1=J("aside"),R0=J("header"),O0=J("footer"),T1=J("main"),C1=J("blockquote"),y1=J("figcaption"),z0=J("pre"),h1=J("address"),I=J("span"),s1=J("strong"),x1=J("em"),E1=J("small"),b1=J("mark"),k1=J("code"),S1=J("samp"),d1=J("kbd"),m1=J("var"),v1=J("i"),p1=J("b"),g1=J("u"),i1=J("s"),u1=J("del"),n1=J("ins"),c1=J("sub"),o1=J("sup"),r1=J("abbr"),a1=J("cite"),l1=J("dfn"),t1=J("q"),e1=J("time"),f5=J("data"),z5=J("bdi"),Z5=J("bdo"),F5=J("ruby"),X5=J("rp"),Y5=J("rt"),L5=J("label"),J5=J("legend"),Q5=J("output"),U5=J("caption"),q5=J("td"),H5=J("th"),d=J("li"),W5=J("dd"),j5=J("dt"),G5=J("title"),K5=R("input"),$5=R("br"),D5=R("hr"),M5=R("meta"),I5=R("link"),_5=R("area"),w5=R("base"),N5=R("col"),R5=R("embed"),O5=R("source"),A5=R("track"),B5=R("wbr"),Q0=H("ul"),V5=H("ol"),P5=H("menu"),T5=H("table"),C5=H("tbody"),y5=H("thead"),h5=H("tfoot"),s5=H("tr"),x5=H("colgroup"),E5=H("form"),b5=H("fieldset"),k5=H("details"),S5=H("dialog"),A0=H("nav"),d5=H("figure"),m5=H("select"),v5=H("datalist"),p5=H("dl"),g5=H("audio"),i5=H("video"),u5=H("picture"),n5=H("iframe"),c5=H("object"),o5=H("canvas"),r5=H("map"),a5=H("body"),l5=H("head"),t5=H("html"),e5=H("hgroup"),ff=H("template"),zf=H("slot"),Zf=H("noscript"),Ff=H("script"),Xf=H("style"),Yf=H("textarea"),Lf=H("meter"),Jf=H("progress"),Qf=H("search");var B0=()=>A0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{Q({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{I({style:{color:"var(--mongo-green)"},textContent:"fia"})}),Q({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{h({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),h({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),h({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var V0=()=>R0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{w0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{Q({textContent:"Build High-Performance UIs"}),Q({class:"text-gradient",textContent:"Without the Virtual DOM"})}),S({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6",position:"relative",zIndex:"1"},textContent:"Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."}),Q({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{t({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),h({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),Q({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),Q({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),Q({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),Q({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),Q({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function Z0(f,z=10){let Z,F=()=>{Z=f.getBoundingClientRect(),f.style.transition="transform 0.1s ease-out"},L=(X)=>{if(!Z)Z=f.getBoundingClientRect();let j=X.clientX-Z.left,W=X.clientY-Z.top,G=Z.width/2,K=Z.height/2,P=(W-K)/K*-z,g=(j-G)/G*z;f.style.transform=`
            perspective(1000px)
            rotateX(${P}deg)
            rotateY(${g}deg)
            scale3d(1.02, 1.02, 1.02)
        `},Y=()=>{f.style.transition="transform 0.5s ease-out",f.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return f.addEventListener("mouseenter",F),f.addEventListener("mousemove",L),f.addEventListener("mouseleave",Y),()=>{f.removeEventListener("mouseenter",F),f.removeEventListener("mousemove",L),f.removeEventListener("mouseleave",Y)}}var _=(f)=>{M().appendChild(document.createTextNode(f))},P0=()=>Q({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{Q({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(f)=>{Z0(f,5),Q({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{Q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),Q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),Q({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let z=(Y)=>I({style:{color:"var(--syntax-keyword)"},textContent:Y}),Z=(Y)=>I({style:{color:"var(--syntax-function)"},textContent:Y}),F=(Y)=>I({style:{color:"var(--syntax-string)"},textContent:Y}),L=(Y)=>I({style:{color:"var(--syntax-comment)"},textContent:Y});z0({style:{transform:"translateZ(40px)"}},()=>{Q(()=>{z("import"),_(" { $, div, button } "),z("from"),F(' "fia"'),_(";")}),_(" "),Q(()=>{z("const"),_(" count = "),Z("$"),_("(0);")}),_(" "),Q(()=>{Z("div"),_("(() => {")}),Q({style:{paddingLeft:"1.5rem"}},()=>{Z("button"),_("({ ")}),Q({style:{paddingLeft:"3rem"}},()=>{Q({textContent:"onclick: () => count.value++,"})}),Q({style:{paddingLeft:"3rem"}},()=>{_("textContent: "),F('"Increment"')}),Q({style:{paddingLeft:"1.5rem"}},()=>{_("});")}),_(" "),Q({style:{paddingLeft:"1.5rem"}},()=>{L("// Updates are surgical - no VDOM diffing")}),Q({style:{paddingLeft:"1.5rem"}},()=>{Z("div"),_("({ "),_("textContent"),_(": "),Z("$"),_("(() => "),F("`Count: ${count.value}`"),_(") });")}),Q({textContent:"});"})})})});var U0=(f,z,Z)=>Q({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(F)=>{Z0(F,15),Q({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:Z}),e({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:f}),S({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:z})}),T0=()=>f0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{U0("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),U0("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),U0("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var C0=()=>O0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{Q({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{Q({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var s=(f)=>{M().appendChild(document.createTextNode(f))},i0=(f)=>{f.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((Z)=>{if(Z.startsWith("//"))I({style:{color:"var(--syntax-comment)"},textContent:Z});else if(Z.startsWith('"')||Z.startsWith("'")||Z.startsWith("`"))I({style:{color:"var(--syntax-string)"},textContent:Z});else if(["const","import","from","function","return","if","else","true","false"].includes(Z))I({style:{color:"var(--syntax-keyword)"},textContent:Z});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(Z))I({style:{color:"var(--syntax-function)"},textContent:Z});else s(Z)})},q=(f)=>Q({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{Q({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{Q({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{Q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),Q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),Q({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let z=O(!1);t({textContent:O(()=>z.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:O(()=>z.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(f),z.value=!0,setTimeout(()=>z.value=!1,2000)}})}),z0({style:{margin:"0",overflowX:"auto"}},()=>{i0(f)})}),B=(f,z,Z)=>{f0({id:z,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{Q({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{Q({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),N0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:f})}),Z()})},$=(f,z)=>{Q({style:{marginBottom:"2.5rem"}},()=>{e({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:f}),z()})},D=(f,z)=>{Q({style:{marginBottom:"1.5rem"}},()=>{p({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:f}),z()})},U=(f)=>S({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>s(f)),y0=(f)=>Q0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{f.forEach((z)=>d({textContent:z}))}),m=(f,z="info")=>Q({style:{background:z==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${z==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:z==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>s(f)),h0=()=>Q({id:"docs",class:"container",style:{maxWidth:"800px",margin:"0 auto",paddingBottom:"var(--spacing-xl)"}},()=>{Q({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{h({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{J0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),h({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{J0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),B("Introduction","intro",()=>{U("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),B("Why Fia?","why-fia",()=>{U("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),Q0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{d({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),s("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),d({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),s("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),d({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),s("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),d({style:{marginBottom:"0.5rem"}},()=>{I({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),s("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),B("Getting Started","getting-started",()=>{$("Prerequisites",()=>{U("Fia is compatible with any modern JavaScript runtime."),y0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),$("Installation",()=>{U("Fia is published on JSR. Install it using your preferred package manager:"),Q({style:{marginBottom:"1rem"}},()=>{p({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),q("deno add jsr:@fia/core")}),Q({style:{marginBottom:"1rem"}},()=>{p({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),U('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),U("2. Install (aliased as 'fia'):"),q("bun add fia@npm:@jsr/fia__core")}),Q({style:{marginBottom:"1rem"}},()=>{p({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),q("npx jsr add @fia/core")}),m("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),$("Updating",()=>{U("To update to the latest version, run the installation command again (or use your package manager's update command)."),q(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),$("Quick Start",()=>{U("Create your first reactive app in seconds."),q(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),$("Mounting",()=>{U("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),q(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),B("Element API","element-api",()=>{U("Fia elements have a simple, consistent API. Functions match HTML tag names."),q(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),D("Text Content",()=>{U("Use the native textContent prop for static or reactive text."),q(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),D("Event Handlers",()=>{U("Event handlers are delegated automatically for performance."),q(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),D("Nesting Elements",()=>{U("Use a callback function to nest elements."),q(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),D("Void Elements",()=>{U("Elements like input, img, br only accept props."),q(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),D("onMount Callback",()=>{U("Access layout properties after the element is in the DOM."),q(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),B("Element Factory Types","element-factory-types",()=>{U("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),$("Standard Elements (4 overloads)",()=>{U("Used for semantic structure elements. These factories support the base patterns:"),q(`// 1. Empty element
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
});`),m("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),$("Text Elements (11 overloads)",()=>{U("Optimized for elements that commonly hold text content with convenient text-first syntax."),q(`// All standard overloads plus text shortcuts:

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
});`),m("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),$("Interactive Elements (10 overloads)",()=>{U("Special factories for interactive elements with text + click handler shorthand."),q(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`),m("Elements: button, summary, option, optgroup.")}),$("Void Elements (1 overload)",()=>{U("Self-closing elements that cannot have children."),q(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),m("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),$("Type Safety Benefits",()=>{U("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),q(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),B("Reactivity","reactivity",()=>{$("Signals",()=>{U("Signals are the primitive units of reactivity."),q(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),$("Reactive Stores",()=>{U("Fia stores are immutable by default for predictability."),q(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),m("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),$("Computed Values",()=>{U("Computed signals automatically track dependencies and update when they change."),q(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),$("Effects",()=>{U("Use $e() to run side effects when dependencies change."),q(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),B("Immutability","immutability",()=>{U("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),$("Working with Immutable State",()=>{U("When a store is immutable, you update state by replacing objects, not mutating properties."),q(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),B("Control Flow","control-flow",()=>{$("Show",()=>{U("Conditionally render content that updates when the condition changes."),q('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),$("Each",()=>{U("Reactive list rendering that re-renders efficiently."),q(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),$("Match",()=>{U("Reactive pattern matching for switch/case logic."),q(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),B("Component Composition","components",()=>{U("In Fia, components are just functions. There is no special class or type."),$("Basic Component",()=>{q(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),$("Children & Layouts",()=>{U("To create wrapper components, pass a callback function as a child prop."),q(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),B("SVG","svg",()=>{U("Fia supports SVG elements with full type safety."),q(`import { svg, svgCircle } from "fia";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),B("Performance","performance",()=>{y0(["Event Delegation: Single listener per event type.","Automatic Batching: DOM updates are batched via standard event loop microtasks.","Fragment Insertion: Children are collected in DocumentFragments before insertion."])}),B("Examples","examples",()=>{$("\uD83D\uDFE2 Beginner",()=>{D("1. Hello World",()=>{U("The simplest possible Fia code."),q('h1({ textContent: "Hello, World!" });')}),D("2. Counter",()=>{U("Signals hold reactive state."),q(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),D("3. Toggle",()=>{U("Computed signals derive values from other signals."),q(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),D("4. Input Binding",()=>{U("Two-way binding is manual but explicit."),q('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),D("5. List Rendering (Static)",()=>{U("For simple static lists, forEach works fine."),q(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),$("\uD83D\uDFE1 Intermediate",()=>{D("6. Reactive Store Counter",()=>{U("Objects passed to $() become reactive stores."),q(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),D("7. Conditional Classes",()=>{U("Computed signals work in class props too."),q(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),D("8. Form Handling",()=>{U("Reactive stores are perfect for forms."),q(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),D("9. Computed Values",()=>{U("Track dependencies automatically."),q('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),D("10. Dynamic Styling",()=>{U("Reactive styles allow theming."),q(`const theme = $("light");

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
});`)})}),$("\uD83D\uDD34 Advanced",()=>{D("11. Todo App",()=>{U("A complete todo app using Each."),q(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),D("12. Tabs Component",()=>{U("Track active index and conditionally render."),q(`const tabs = ["Home", "About", "Contact"];
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
});`)}),D("13. Async Data Fetching",()=>{U("Use Match for loading states."),q(`const state = $({
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
});`)}),D("14. Modal Dialog",()=>{U("Modal patterns with explicit types."),q(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})});var s0=()=>{let f=O(0),z=O(0),Z=O(0);return document.addEventListener("mousemove",(F)=>{f.value=F.clientX,z.value=F.clientY,Z.value=1}),document.addEventListener("mouseout",()=>{Z.value=0}),Q({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:O(()=>`translate(${f.value-200}px, ${z.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:O(()=>Z.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var u0=()=>Q({id:"landing-page"},()=>{s0(),B0(),V0(),P0(),T0(),h0(),C0()});u0();
