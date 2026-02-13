var C=void 0,n=0,q0=0,b=void 0;function o(z){if(C)z.subs.add(C),C.deps.add(z)}function c(z){z.version=++n;let Z=[...z.subs];for(let F of Z)if(q0>0){if(!b)b=new Set;b.add(F)}else F.execute()}function r(z){for(let Z of z.deps)Z.subs.delete(z);z.deps.clear()}function k(z){let Z=!0,F={execute(){if(!Z)return;r(F);let X=C;C=F;try{z()}finally{C=X}},deps:new Set,cleanup(){Z=!1,r(F)}};return F.execute(),()=>F.cleanup()}function b0(z){let Z={version:n,subs:new Set},F=z,X=function(f){if(arguments.length>0){if(!Object.is(F,f))F=f,c(Z);return}return o(Z),F};return Object.defineProperty(X,"value",{get(){return o(Z),F},set(f){if(!Object.is(F,f))F=f,c(Z)}}),X[L0]=!0,X.peek=()=>F,X}function k0(z){let Z={version:n,subs:new Set},F,X=-1,f={execute(){Z.version=++n;let j=[...Z.subs];for(let H of j)if(q0>0){if(!b)b=new Set;b.add(H)}else H.execute()},deps:new Set,cleanup(){r(f)}},L=()=>{r(f);let j=C;C=f;try{let H=z();if(!Object.is(F,H))F=H;X=Z.version}finally{C=j}};L();let Y=function(){if(X!==Z.version)L();return o(Z),F};return Object.defineProperty(Y,"value",{get(){return Y()}}),Y[L0]=!0,Y.peek=()=>{if(X!==Z.version)L();return F},Y}var f0=Symbol("reactive-proxy"),u=Symbol("raw");function S0(z){return z!==null&&typeof z==="object"&&f0 in z}function H0(z){let Z=new Map,F=new WeakMap;function X(L){let Y=Z.get(L);if(!Y)Y={version:0,subs:new Set},Z.set(L,Y);return Y}return new Proxy(z,{get(L,Y,j){if(Y===u||Y==="$raw")return L;if(Y===f0)return!0;let H=X(Y);o(H);let G=Reflect.get(L,Y,j);if(G!==null&&typeof G==="object"&&!S0(G)){let K=F.get(G);if(!K)K=H0(G),F.set(G,K);return K}return G},set(L,Y,j,H){let G=Reflect.get(L,Y,H),K=j!==null&&typeof j==="object"&&u in j?j[u]:j,P=Array.isArray(L)&&Y==="length";if(Object.is(G,K)&&!P)return!0;if(Reflect.set(L,Y,K,H),G!==null&&typeof G==="object")F.delete(G);let i=Z.get(Y);if(i)c(i);return!0},has(L,Y){if(Y===f0||Y===u||Y==="$raw")return!0;return Reflect.has(L,Y)},ownKeys(L){return Reflect.ownKeys(L)},getOwnPropertyDescriptor(L,Y){return Reflect.getOwnPropertyDescriptor(L,Y)},deleteProperty(L,Y){let j=Reflect.has(L,Y),H=Reflect.deleteProperty(L,Y);if(j&&H){let G=Z.get(Y);if(G)c(G)}return H}})}function I(z,...Z){if(typeof z==="function")return k0(z);if(z!==null&&typeof z==="object")return H0(z);return b0(z)}var L0=Symbol("signal");function V(z){return typeof z==="function"&&z[L0]===!0}var a=[];function y(z){a.push(z)}function h(){a.pop()}function $(){return a[a.length-1]??document.body}var d0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),l=new WeakMap,j0=new Set;function s0(z){let{target:Z,type:F}=z;while(Z){let X=l.get(Z);if(X&&X[F]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:Z}),X[F](z),z.cancelBubble)break}Z=Z.parentElement}}function t(z,Z,F){if(d0.has(Z)){if(!j0.has(Z))document.addEventListener(Z,s0,{capture:!1,passive:!1}),j0.add(Z);let X=l.get(z);if(!X)X={},l.set(z,X);X[Z]=F}else z.addEventListener(Z,F)}if(typeof window<"u")window.__eventHandlerMap=l;function q(z){return(Z,F)=>{let X=document.createElement(z),f,L;if(Z===void 0);else if(R(Z))L=Z;else if(N(Z)){if(f=Z,F!==void 0)L=F}if(f)A(X,f);let Y=[],j=(H)=>Y.push(H);if(L){let H=document.createDocumentFragment();y(H);try{L(X,j)}finally{h()}X.appendChild(H)}if($().appendChild(X),Y.length>0)requestAnimationFrame(()=>{for(let H of Y)H()});return X}}function Q(z){return(Z,F,X)=>{let f=document.createElement(z),L,Y,j;if(Z===void 0);else if(S(Z)){if(L=Z,F===void 0);else if(R(F))j=F;else if(N(F)){if(Y=F,X!==void 0)j=X}}else if(R(Z))j=Z;else if(N(Z)){if(Y=Z,F!==void 0&&R(F))j=F}if(L!==void 0)d(f,L);if(Y)A(f,Y);let H=[],G=(K)=>H.push(K);if(j){let K=document.createDocumentFragment();y(K);try{j(f,G)}finally{h()}f.appendChild(K)}if($().appendChild(f),H.length>0)requestAnimationFrame(()=>{for(let K of H)K()});return f}}function v(z){return(Z,F,X)=>{let f=document.createElement(z),L,Y,j,H;if(Z===void 0);else if(S(Z)){if(L=Z,F===void 0);else if(G0(F))Y=F;else if(R(F))H=F;else if(N(F)){if(j=F,X!==void 0)H=X}}else if(R(Z))H=Z;else if(N(Z)){if(j=Z,F!==void 0&&R(F))H=F}if(L!==void 0)d(f,L);if(Y)t(f,"click",Y);if(j)A(f,j);let G=[],K=(P)=>G.push(P);if(H){let P=document.createDocumentFragment();y(P);try{H(f,K)}finally{h()}f.appendChild(P)}if($().appendChild(f),G.length>0)requestAnimationFrame(()=>{for(let P of G)P()});return f}}function O(z){return(Z)=>{let F=document.createElement(z);if(Z)A(F,Z);return $().appendChild(F),F}}function K0(){return(z,Z,F)=>{let X=document.createElement("img"),f,L,Y;if(z===void 0);else if(typeof z==="string"&&M0(z)){if(f=z,Z===void 0);else if(typeof Z==="string"){if(L=Z,F!==void 0)Y=F}else if(N(Z))Y=Z}else if(N(z))Y=z;if(f!==void 0)X.src=f;if(L!==void 0)X.alt=L;if(Y)A(X,Y);return $().appendChild(X),X}}function D0(){return(z,Z,F)=>{let X=document.createElement("a"),f,L,Y,j;if(z===void 0);else if(typeof z==="string"&&$0(z)){if(f=z,Z===void 0);else if(S(Z)){if(L=Z,F!==void 0)Y=F}else if(N(Z))Y=Z}else if(R(z))j=z;else if(N(z)){if(Y=z,Z!==void 0&&R(Z))j=Z}if(f!==void 0)X.href=f;if(L!==void 0)d(X,L);if(Y)A(X,Y);let H=[],G=(K)=>H.push(K);if(j){let K=document.createDocumentFragment();y(K);try{j(X,G)}finally{h()}X.appendChild(K)}if($().appendChild(X),H.length>0)requestAnimationFrame(()=>{for(let K of H)K()});return X}}function S(z){return typeof z==="string"||typeof z==="number"||V(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function G0(z){if(typeof z!=="function")return!1;if(V(z))return!1;return z.length<=1}function $0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function M0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var J0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function m0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function v0(z,Z,F){switch(Z){case"value":if("value"in z)z.value=String(F??"");break;case"checked":if("checked"in z)z.checked=Boolean(F);break;case"selected":if("selected"in z)z.selected=Boolean(F);break;case"muted":if("muted"in z)z.muted=Boolean(F);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(F??0);break;case"volume":if("volume"in z)z.volume=Number(F??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(F);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(F??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(F);break;case"textContent":z.textContent=String(F??"");break;case"innerText":z.innerText=String(F??"");break}}function I0(z,Z,F){if(Z==="class"||Z==="className"||Z==="classList")p0(z,F);else if(Z==="style")i0(z,F);else if(m0(Z))v0(z,Z,F);else if(typeof F==="boolean")if(F)z.setAttribute(J0[Z]??Z,"");else z.removeAttribute(J0[Z]??Z);else z.setAttribute(J0[Z]??Z,String(F))}function A(z,Z){for(let F in Z){let X=Z[F];if(X===null||X===void 0)continue;if(F.startsWith("on")&&typeof X==="function"){let f=F.slice(2).toLowerCase();t(z,f,X)}else if(V(X))k(()=>I0(z,F,X.value));else I0(z,F,X)}}function p0(z,Z){if(typeof Z==="string")z.className=Z;else if(Array.isArray(Z))z.className=Z.filter(Boolean).join(" ");else if(typeof Z==="object"&&Z!==null){let F=!1;for(let f in Z)if(V(Z[f])){F=!0;break}let X=()=>{let f=[];for(let L in Z){let Y=Z[L];if(V(Y)?Y.value:Y)f.push(L)}z.className=f.join(" ")};if(F)k(X);else X()}}function g0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function Q0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let Z=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${Z} / ${z.alpha})`:`color(${z.space} ${Z})`}case"color-mix":{let Z=typeof z.color1==="object"?Q0(z.color1):z.color1,F=typeof z.color2==="object"?Q0(z.color2):z.color2,X=z.percentage1!==void 0?`${z.percentage1}%`:"",f=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${Z} ${X}, ${F} ${f})`}}}function _0(z){if(z===null||z===void 0)return"";if(g0(z))return Q0(z);return String(z)}function w0(z,Z,F){if(Z.startsWith("--")){z.setProperty(Z,F);return}if(Z.startsWith("webkit")||Z.startsWith("moz")||Z.startsWith("ms")||Z.startsWith("o")){let X=Z.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(X,F);return}try{z[Z]=F}catch{z.setProperty(Z,F)}}function i0(z,Z){if(typeof Z==="string")z.setAttribute("style",Z);else if(typeof Z==="object"&&Z!==null){let F=!1;for(let X in Z)if(V(Z[X])){F=!0;break}if(F)k(()=>{for(let X in Z){let f=Z[X],L=V(f)?f.value:f;w0(z.style,X,_0(L))}});else for(let X in Z){let f=Z[X];w0(z.style,X,_0(f))}}}function d(z,Z){if(V(Z))k(()=>{z.textContent=String(Z.value)});else z.textContent=String(Z)}function N(z){return typeof z==="object"&&z!==null&&!V(z)&&!Array.isArray(z)}function R(z){return typeof z==="function"&&!V(z)}var T=D0(),U0=K0(),e=v("button"),O1=v("summary"),A1=v("option"),B1=v("optgroup"),N0=Q("h1"),R0=Q("h2"),p=Q("h3"),g=Q("h4"),V1=Q("h5"),P1=Q("h6"),s=Q("p"),J=Q("div"),T1=Q("article"),z0=Q("section"),C1=Q("aside"),O0=Q("header"),A0=Q("footer"),y1=Q("main"),h1=Q("blockquote"),x1=Q("figcaption"),Z0=Q("pre"),E1=Q("address"),_=Q("span"),b1=Q("strong"),k1=Q("em"),S1=Q("small"),d1=Q("mark"),s1=Q("code"),m1=Q("samp"),v1=Q("kbd"),p1=Q("var"),g1=Q("i"),i1=Q("b"),u1=Q("u"),n1=Q("s"),o1=Q("del"),c1=Q("ins"),r1=Q("sub"),a1=Q("sup"),l1=Q("abbr"),t1=Q("cite"),e1=Q("dfn"),z5=Q("q"),Z5=Q("time"),F5=Q("data"),X5=Q("bdi"),Y5=Q("bdo"),f5=Q("ruby"),L5=Q("rp"),J5=Q("rt"),Q5=Q("label"),U5=Q("legend"),W5=Q("output"),q5=Q("caption"),H5=Q("td"),j5=Q("th"),x=Q("li"),G5=Q("dd"),K5=Q("dt"),M5=Q("title"),D5=O("input"),$5=O("br"),I5=O("hr"),_5=O("meta"),w5=O("link"),N5=O("area"),R5=O("base"),O5=O("col"),A5=O("embed"),B5=O("source"),V5=O("track"),P5=O("wbr"),F0=q("ul"),T5=q("ol"),C5=q("menu"),y5=q("table"),h5=q("tbody"),x5=q("thead"),E5=q("tfoot"),b5=q("tr"),k5=q("colgroup"),S5=q("form"),d5=q("fieldset"),s5=q("details"),m5=q("dialog"),B0=q("nav"),v5=q("figure"),p5=q("select"),g5=q("datalist"),i5=q("dl"),u5=q("audio"),n5=q("video"),o5=q("picture"),c5=q("iframe"),r5=q("object"),a5=q("canvas"),l5=q("map"),t5=q("body"),e5=q("head"),zz=q("html"),Zz=q("hgroup"),Fz=q("template"),Xz=q("slot"),Yz=q("noscript"),fz=q("script"),Lz=q("style"),Jz=q("textarea"),Qz=q("meter"),Uz=q("progress"),Wz=q("search");var V0=()=>B0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{J({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{_({style:{color:"var(--mongo-green)"},textContent:"fia"})}),J({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{T({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),T({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),T({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var P0=()=>O0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{N0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{J({textContent:"Build High-Performance UIs"}),J({class:"text-gradient",textContent:"Without the Virtual DOM"})}),s({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6",position:"relative",zIndex:"1"},textContent:"Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."}),J({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{e({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),T({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),J({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),J({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),J({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),J({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),J({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function X0(z,Z=10){let F,X=()=>{F=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},f=(Y)=>{if(!F)F=z.getBoundingClientRect();let j=Y.clientX-F.left,H=Y.clientY-F.top,G=F.width/2,K=F.height/2,P=(H-K)/K*-Z,i=(j-G)/G*Z;z.style.transform=`
            perspective(1000px)
            rotateX(${P}deg)
            rotateY(${i}deg)
            scale3d(1.02, 1.02, 1.02)
        `},L=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",X),z.addEventListener("mousemove",f),z.addEventListener("mouseleave",L),()=>{z.removeEventListener("mouseenter",X),z.removeEventListener("mousemove",f),z.removeEventListener("mouseleave",L)}}var w=(z)=>{$().appendChild(document.createTextNode(z))},T0=()=>J({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{J({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{X0(z,5),J({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{J({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),J({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),J({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let Z=(L)=>_({style:{color:"var(--syntax-keyword)"},textContent:L}),F=(L)=>_({style:{color:"var(--syntax-function)"},textContent:L}),X=(L)=>_({style:{color:"var(--syntax-string)"},textContent:L}),f=(L)=>_({style:{color:"var(--syntax-comment)"},textContent:L});Z0({style:{transform:"translateZ(40px)"}},()=>{J(()=>{Z("import"),w(" { $, div, button } "),Z("from"),X(' "fia"'),w(";")}),w(" "),J(()=>{Z("const"),w(" count = "),F("$"),w("(0);")}),w(" "),J(()=>{F("div"),w("(() => {")}),J({style:{paddingLeft:"1.5rem"}},()=>{F("button"),w("({ ")}),J({style:{paddingLeft:"3rem"}},()=>{J({textContent:"onclick: () => count.value++,"})}),J({style:{paddingLeft:"3rem"}},()=>{w("textContent: "),X('"Increment"')}),J({style:{paddingLeft:"1.5rem"}},()=>{w("});")}),w(" "),J({style:{paddingLeft:"1.5rem"}},()=>{f("// Updates are surgical - no VDOM diffing")}),J({style:{paddingLeft:"1.5rem"}},()=>{F("div"),w("({ "),w("textContent"),w(": "),F("$"),w("(() => "),X("`Count: ${count.value}`"),w(") });")}),J({textContent:"});"})})})});var W0=(z,Z,F)=>J({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(X)=>{X0(X,15),J({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:F}),p({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),s({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:Z})}),C0=()=>z0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{W0("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),W0("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),W0("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var y0=()=>A0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{J({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{J({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var E=(z)=>{$().appendChild(document.createTextNode(z))},u0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((F)=>{if(F.startsWith("//"))_({style:{color:"var(--syntax-comment)"},textContent:F});else if(F.startsWith('"')||F.startsWith("'")||F.startsWith("`"))_({style:{color:"var(--syntax-string)"},textContent:F});else if(["const","import","from","function","return","if","else","true","false"].includes(F))_({style:{color:"var(--syntax-keyword)"},textContent:F});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(F))_({style:{color:"var(--syntax-function)"},textContent:F});else E(F)})},W=(z)=>J({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{J({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{J({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{J({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),J({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),J({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let Z=I(!1);e({textContent:I(()=>Z.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:I(()=>Z.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),Z.value=!0,setTimeout(()=>Z.value=!1,2000)}})}),Z0({style:{margin:"0",overflowX:"auto"}},()=>{u0(z)})}),B=(z,Z,F)=>{z0({id:Z,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{J({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{J({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),R0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),F()})},M=(z,Z)=>{J({style:{marginBottom:"2.5rem"}},()=>{p({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),Z()})},D=(z,Z)=>{J({style:{marginBottom:"1.5rem"}},()=>{g({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),Z()})},U=(z)=>s({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>E(z)),h0=(z)=>F0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((Z)=>x({textContent:Z}))}),m=(z,Z="info")=>J({style:{background:Z==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${Z==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:Z==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>E(z)),Y0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow"},{id:"components",title:"Components"},{id:"svg",title:"SVG"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],n0=()=>{let z=I("intro"),Z=()=>{let F=window.scrollY+150;for(let X=Y0.length-1;X>=0;X--){let f=document.getElementById(Y0[X].id);if(f&&f.offsetTop<=F){z.value=Y0[X].id;break}}};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",Z),Z()},0);return J({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{J({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{p({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"},textContent:"On This Page"}),F0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{Y0.forEach((F)=>{x({style:{marginBottom:"0.5rem"}},()=>{T({href:`#${F.id}`,style:{color:I(()=>z.value===F.id?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:I(()=>z.value===F.id?"600":"400"),borderLeft:I(()=>z.value===F.id?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:F.title,onclick:(X)=>{X.preventDefault();let f=document.getElementById(F.id);if(f){let Y=f.offsetTop-100;window.scrollTo({top:Y,behavior:"smooth"}),z.value=F.id}}})})})})})})},x0=()=>J({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{n0(),J({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{J({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{T({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{U0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),T({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{U0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),B("Introduction","intro",()=>{U("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),B("Why Fia?","why-fia",()=>{U("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),F0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{x({style:{marginBottom:"0.5rem"}},()=>{_({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),E("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),x({style:{marginBottom:"0.5rem"}},()=>{_({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),E("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),x({style:{marginBottom:"0.5rem"}},()=>{_({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),E("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),x({style:{marginBottom:"0.5rem"}},()=>{_({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),E("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),B("Getting Started","getting-started",()=>{M("Prerequisites",()=>{U("Fia is compatible with any modern JavaScript runtime."),h0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),M("Installation",()=>{U("Fia is published on JSR. Install it using your preferred package manager:"),J({style:{marginBottom:"1rem"}},()=>{g({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),W("deno add jsr:@fia/core")}),J({style:{marginBottom:"1rem"}},()=>{g({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),U('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),U("2. Install (aliased as 'fia'):"),W("bun add fia@npm:@jsr/fia__core")}),J({style:{marginBottom:"1rem"}},()=>{g({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),W("npx jsr add @fia/core")}),m("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),M("Updating",()=>{U("To update to the latest version, run the installation command again (or use your package manager's update command)."),W(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),M("Quick Start",()=>{U("Create your first reactive app in seconds."),W(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),M("Mounting",()=>{U("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),W(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),B("Element API","element-api",()=>{U("Fia elements have a simple, consistent API. Functions match HTML tag names."),W(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),D("Text Content",()=>{U("Use the native textContent prop for static or reactive text."),W(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),D("Event Handlers",()=>{U("Event handlers are delegated automatically for performance."),W(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),D("Nesting Elements",()=>{U("Use a callback function to nest elements."),W(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),D("Void Elements",()=>{U("Elements like input, img, br only accept props."),W(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),D("onMount Callback",()=>{U("Access layout properties after the element is in the DOM."),W(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),B("Element Factory Types","element-factory-types",()=>{U("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),M("Standard Elements (4 overloads)",()=>{U("Used for semantic structure elements. These factories support the base patterns:"),W(`// 1. Empty element
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
});`),m("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),M("Text Elements (11 overloads)",()=>{U("Optimized for elements that commonly hold text content with convenient text-first syntax."),W(`// All standard overloads plus text shortcuts:

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
});`),m("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),M("Interactive Elements (10 overloads)",()=>{U("Special factories for interactive elements with text + click handler shorthand."),W(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`),m("Elements: button, summary, option, optgroup.")}),M("Void Elements (1 overload)",()=>{U("Self-closing elements that cannot have children."),W(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),m("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),M("Type Safety Benefits",()=>{U("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),W(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),B("Reactivity","reactivity",()=>{M("Signals",()=>{U("Signals are the primitive units of reactivity."),W(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),M("Reactive Stores",()=>{U("Fia stores are immutable by default for predictability."),W(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),m("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),M("Computed Values",()=>{U("Computed signals automatically track dependencies and update when they change."),W(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),M("Effects",()=>{U("Use $e() to run side effects when dependencies change."),W(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),B("Immutability","immutability",()=>{U("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),M("Working with Immutable State",()=>{U("When a store is immutable, you update state by replacing objects, not mutating properties."),W(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),B("Control Flow","control-flow",()=>{M("Show",()=>{U("Conditionally render content that updates when the condition changes."),W('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),M("Each",()=>{U("Reactive list rendering that re-renders efficiently."),W(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),M("Match",()=>{U("Reactive pattern matching for switch/case logic."),W(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),B("Component Composition","components",()=>{U("In Fia, components are just functions. There is no special class or type."),M("Basic Component",()=>{W(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),M("Children & Layouts",()=>{U("To create wrapper components, pass a callback function as a child prop."),W(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),B("SVG","svg",()=>{U("Fia supports SVG elements with full type safety."),W(`import { svg, svgCircle } from "fia";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),B("Performance","performance",()=>{h0(["Event Delegation: Single listener per event type.","Automatic Batching: DOM updates are batched via standard event loop microtasks.","Fragment Insertion: Children are collected in DocumentFragments before insertion."])}),B("Examples","examples",()=>{M("\uD83D\uDFE2 Beginner",()=>{D("1. Hello World",()=>{U("The simplest possible Fia code."),W('h1({ textContent: "Hello, World!" });')}),D("2. Counter",()=>{U("Signals hold reactive state."),W(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),D("3. Toggle",()=>{U("Computed signals derive values from other signals."),W(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),D("4. Input Binding",()=>{U("Two-way binding is manual but explicit."),W('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),D("5. List Rendering (Static)",()=>{U("For simple static lists, forEach works fine."),W(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),M("\uD83D\uDFE1 Intermediate",()=>{D("6. Reactive Store Counter",()=>{U("Objects passed to $() become reactive stores."),W(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),D("7. Conditional Classes",()=>{U("Computed signals work in class props too."),W(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),D("8. Form Handling",()=>{U("Reactive stores are perfect for forms."),W(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),D("9. Computed Values",()=>{U("Track dependencies automatically."),W('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),D("10. Dynamic Styling",()=>{U("Reactive styles allow theming."),W(`const theme = $("light");

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
});`)})}),M("\uD83D\uDD34 Advanced",()=>{D("11. Todo App",()=>{U("A complete todo app using Each."),W(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),D("12. Tabs Component",()=>{U("Track active index and conditionally render."),W(`const tabs = ["Home", "About", "Contact"];
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
});`)}),D("13. Async Data Fetching",()=>{U("Use Match for loading states."),W(`const state = $({
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
});`)}),D("14. Modal Dialog",()=>{U("Modal patterns with explicit types."),W(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})})});var E0=()=>{let z=I(0),Z=I(0),F=I(0);return document.addEventListener("mousemove",(X)=>{z.value=X.clientX,Z.value=X.clientY,F.value=1}),document.addEventListener("mouseout",()=>{F.value=0}),J({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:I(()=>`translate(${z.value-200}px, ${Z.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:I(()=>F.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var o0=()=>J({id:"landing-page"},()=>{E0(),V0(),P0(),T0(),C0(),x0(),y0()});o0();
