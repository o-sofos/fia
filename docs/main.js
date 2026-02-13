var y=void 0,o=0,G0=0,d=void 0;function r(z){if(y)z.subs.add(y),y.deps.add(z)}function a(z){z.version=++o;let F=[...z.subs];for(let f of F)if(G0>0){if(!d)d=new Set;d.add(f)}else f.execute()}function l(z){for(let F of z.deps)F.subs.delete(z);z.deps.clear()}function b(z){let F=!0,f={execute(){if(!F)return;l(f);let Z=y;y=f;try{z()}finally{y=Z}},deps:new Set,cleanup(){F=!1,l(f)}};return f.execute(),()=>f.cleanup()}function E0(z){let F={version:o,subs:new Set},f=z,Z=function(X){if(arguments.length>0){if(!Object.is(f,X))f=X,a(F);return}return r(F),f};return Object.defineProperty(Z,"value",{get(){return r(F),f},set(X){if(!Object.is(f,X))f=X,a(F)}}),Z[Q0]=!0,Z.peek=()=>f,Z}function k0(z){let F={version:o,subs:new Set},f,Z=-1,X={execute(){F.version=++o;let H=[...F.subs];for(let G of H)if(G0>0){if(!d)d=new Set;d.add(G)}else G.execute()},deps:new Set,cleanup(){l(X)}},Y=()=>{l(X);let H=y;y=X;try{let G=z();if(!Object.is(f,G))f=G;Z=F.version}finally{y=H}};Y();let J=function(){if(Z!==F.version)Y();return r(F),f};return Object.defineProperty(J,"value",{get(){return J()}}),J[Q0]=!0,J.peek=()=>{if(Z!==F.version)Y();return f},J}var W0=Symbol("reactive-proxy"),c=Symbol("raw");function d0(z){return z!==null&&typeof z==="object"&&W0 in z}function H0(z){let F=new Map,f=new WeakMap;function Z(Y){let J=F.get(Y);if(!J)J={version:0,subs:new Set},F.set(Y,J);return J}return new Proxy(z,{get(Y,J,H){if(J===c||J==="$raw")return Y;if(J===W0)return!0;let G=Z(J);r(G);let j=Reflect.get(Y,J,H);if(j!==null&&typeof j==="object"&&!d0(j)){let M=f.get(j);if(!M)M=H0(j),f.set(j,M);return M}return j},set(Y,J,H,G){let j=Reflect.get(Y,J,G),M=H!==null&&typeof H==="object"&&c in H?H[c]:H,T=Array.isArray(Y)&&J==="length";if(Object.is(j,M)&&!T)return!0;if(Reflect.set(Y,J,M,G),j!==null&&typeof j==="object")f.delete(j);let n=F.get(J);if(n)a(n);return!0},has(Y,J){if(J===W0||J===c||J==="$raw")return!0;return Reflect.has(Y,J)},ownKeys(Y){return Reflect.ownKeys(Y)},getOwnPropertyDescriptor(Y,J){return Reflect.getOwnPropertyDescriptor(Y,J)},deleteProperty(Y,J){let H=Reflect.has(Y,J),G=Reflect.deleteProperty(Y,J);if(H&&G){let j=F.get(J);if(j)a(j)}return G}})}function I(z,...F){if(typeof z==="function")return k0(z);if(z!==null&&typeof z==="object")return H0(z);return E0(z)}var Q0=Symbol("signal");function V(z){return typeof z==="function"&&z[Q0]===!0}var t=[];function C(z){t.push(z)}function h(){t.pop()}function $(){return t[t.length-1]??document.body}var b0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),e=new WeakMap,K0=new Set;function m0(z){let{target:F,type:f}=z;while(F){let Z=e.get(F);if(Z&&Z[f]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:F}),Z[f](z),z.cancelBubble)break}F=F.parentElement}}function z0(z,F,f){if(b0.has(F)){if(!K0.has(F))document.addEventListener(F,m0,{capture:!1,passive:!1}),K0.add(F);let Z=e.get(z);if(!Z)Z={},e.set(z,Z);Z[F]=f}else z.addEventListener(F,f)}if(typeof window<"u")window.__eventHandlerMap=e;function D(z){return(F,f)=>{let Z=document.createElement(z),X,Y;if(F===void 0);else if(R(F))Y=F;else if(N(F)){if(X=F,f!==void 0)Y=f}if(X)A(Z,X);let J=[],H=(G)=>J.push(G);if(Y){let G=document.createDocumentFragment();C(G);try{Y(Z,H)}finally{h()}Z.appendChild(G)}if($().appendChild(Z),J.length>0)requestAnimationFrame(()=>{for(let G of J)G()});return Z}}function Q(z){return(F,f,Z)=>{let X=document.createElement(z),Y,J,H;if(F===void 0);else if(m(F)){if(Y=F,f===void 0);else if(R(f))H=f;else if(N(f)){if(J=f,Z!==void 0)H=Z}}else if(R(F))H=F;else if(N(F)){if(J=F,f!==void 0&&R(f))H=f}if(Y!==void 0)S(X,Y);if(J)A(X,J);let G=[],j=(M)=>G.push(M);if(H){let M=document.createDocumentFragment();C(M);try{H(X,j)}finally{h()}X.appendChild(M)}if($().appendChild(X),G.length>0)requestAnimationFrame(()=>{for(let M of G)M()});return X}}function v(z){return(F,f,Z)=>{let X=document.createElement(z),Y,J,H,G;if(F===void 0);else if(m(F)){if(Y=F,f===void 0);else if(L0(f))J=f;else if(R(f))G=f;else if(N(f)){if(H=f,Z!==void 0)G=Z}}else if(R(F))G=F;else if(N(F)){if(H=F,f!==void 0&&R(f))G=f}if(Y!==void 0)S(X,Y);if(J)z0(X,"click",J);if(H)A(X,H);let j=[],M=(T)=>j.push(T);if(G){let T=document.createDocumentFragment();C(T);try{G(X,M)}finally{h()}X.appendChild(T)}if($().appendChild(X),j.length>0)requestAnimationFrame(()=>{for(let T of j)T()});return X}}function O(z){return(F)=>{let f=document.createElement(z);if(F)A(f,F);return $().appendChild(f),f}}function j0(){return(z,F,f)=>{let Z=document.createElement("img"),X,Y,J;if(z===void 0);else if(typeof z==="string"&&M0(z)){if(X=z,F===void 0);else if(typeof F==="string"){if(Y=F,f!==void 0)J=f}else if(N(F))J=F}else if(N(z))J=z;if(X!==void 0)Z.src=X;if(Y!==void 0)Z.alt=Y;if(J)A(Z,J);return $().appendChild(Z),Z}}function $0(){return(z,F,f)=>{let Z=document.createElement("a"),X,Y,J,H;if(z===void 0);else if(typeof z==="string"&&I0(z)){if(X=z,F===void 0);else if(m(F)){if(Y=F,f!==void 0)J=f}else if(N(F))J=F}else if(R(z))H=z;else if(N(z)){if(J=z,F!==void 0&&R(F))H=F}if(X!==void 0)Z.href=X;if(Y!==void 0)S(Z,Y);if(J)A(Z,J);let G=[],j=(M)=>G.push(M);if(H){let M=document.createDocumentFragment();C(M);try{H(Z,j)}finally{h()}Z.appendChild(M)}if($().appendChild(Z),G.length>0)requestAnimationFrame(()=>{for(let M of G)M()});return Z}}function m(z){return typeof z==="string"||typeof z==="number"||V(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function L0(z){if(typeof z!=="function")return!1;if(V(z))return!1;return z.length<=1}function I0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function M0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var U0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function S0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function p0(z,F,f){switch(F){case"value":if("value"in z)z.value=String(f??"");break;case"checked":if("checked"in z)z.checked=Boolean(f);break;case"selected":if("selected"in z)z.selected=Boolean(f);break;case"muted":if("muted"in z)z.muted=Boolean(f);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(f??0);break;case"volume":if("volume"in z)z.volume=Number(f??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(f);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(f??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(f);break;case"textContent":z.textContent=String(f??"");break;case"innerText":z.innerText=String(f??"");break}}function w0(z,F,f){if(F==="class"||F==="className"||F==="classList")v0(z,f);else if(F==="style")i0(z,f);else if(S0(F))p0(z,F,f);else if(typeof f==="boolean")if(f)z.setAttribute(U0[F]??F,"");else z.removeAttribute(U0[F]??F);else z.setAttribute(U0[F]??F,String(f))}function A(z,F){for(let f in F){let Z=F[f];if(Z===null||Z===void 0)continue;if(f.startsWith("on")&&typeof Z==="function"){let X=f.slice(2).toLowerCase();z0(z,X,Z)}else if(V(Z))b(()=>w0(z,f,Z.value));else w0(z,f,Z)}}function v0(z,F){if(typeof F==="string")z.className=F;else if(Array.isArray(F))z.className=F.filter(Boolean).join(" ");else if(typeof F==="object"&&F!==null){let f=!1;for(let X in F)if(V(F[X])){f=!0;break}let Z=()=>{let X=[];for(let Y in F){let J=F[Y];if(V(J)?J.value:J)X.push(Y)}z.className=X.join(" ")};if(f)b(Z);else Z()}}function g0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function q0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let F=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${F} / ${z.alpha})`:`color(${z.space} ${F})`}case"color-mix":{let F=typeof z.color1==="object"?q0(z.color1):z.color1,f=typeof z.color2==="object"?q0(z.color2):z.color2,Z=z.percentage1!==void 0?`${z.percentage1}%`:"",X=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${F} ${Z}, ${f} ${X})`}}}function _0(z){if(z===null||z===void 0)return"";if(g0(z))return q0(z);return String(z)}function N0(z,F,f){if(F.startsWith("--")){z.setProperty(F,f);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let Z=F.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(Z,f);return}try{z[F]=f}catch{z.setProperty(F,f)}}function i0(z,F){if(typeof F==="string")z.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let f=!1;for(let Z in F)if(V(F[Z])){f=!0;break}if(f)b(()=>{for(let Z in F){let X=F[Z],Y=V(X)?X.value:X;N0(z.style,Z,_0(Y))}});else for(let Z in F){let X=F[Z];N0(z.style,Z,_0(X))}}}function S(z,F){if(V(F))b(()=>{z.textContent=String(F.value)});else z.textContent=String(F)}function N(z){return typeof z==="object"&&z!==null&&!V(z)&&!Array.isArray(z)}function R(z){return typeof z==="function"&&!V(z)}var P=$0(),D0=j0(),F0=v("button"),O1=v("summary"),A1=v("option"),B1=v("optgroup"),R0=Q("h1"),O0=Q("h2"),g=Q("h3"),i=Q("h4"),V1=Q("h5"),T1=Q("h6"),p=Q("p"),W=Q("div"),P1=Q("article"),f0=Q("section"),y1=Q("aside"),A0=Q("header"),B0=Q("footer"),C1=Q("main"),h1=Q("blockquote"),s1=Q("figcaption"),Z0=Q("pre"),x1=Q("address"),w=Q("span"),E1=Q("strong"),k1=Q("em"),d1=Q("small"),b1=Q("mark"),m1=Q("code"),S1=Q("samp"),p1=Q("kbd"),v1=Q("var"),g1=Q("i"),i1=Q("b"),u1=Q("u"),n1=Q("s"),c1=Q("del"),o1=Q("ins"),r1=Q("sub"),a1=Q("sup"),l1=Q("abbr"),t1=Q("cite"),e1=Q("dfn"),z5=Q("q"),F5=Q("time"),f5=Q("data"),Z5=Q("bdi"),J5=Q("bdo"),X5=Q("ruby"),Y5=Q("rp"),W5=Q("rt"),Q5=Q("label"),U5=Q("legend"),q5=Q("output"),D5=Q("caption"),G5=Q("td"),H5=Q("th"),E=Q("li"),K5=Q("dd"),L5=Q("dt"),j5=Q("title"),M5=O("input"),$5=O("br"),I5=O("hr"),w5=O("meta"),_5=O("link"),N5=O("area"),R5=O("base"),O5=O("col"),A5=O("embed"),B5=O("source"),V5=O("track"),T5=O("wbr"),J0=D("ul"),P5=D("ol"),y5=D("menu"),C5=D("table"),h5=D("tbody"),s5=D("thead"),x5=D("tfoot"),E5=D("tr"),k5=D("colgroup"),d5=D("form"),b5=D("fieldset"),m5=D("details"),S5=D("dialog"),V0=D("nav"),p5=D("figure"),v5=D("select"),g5=D("datalist"),i5=D("dl"),u5=D("audio"),n5=D("video"),c5=D("picture"),o5=D("iframe"),r5=D("object"),a5=D("canvas"),l5=D("map"),t5=D("body"),e5=D("head"),zz=D("html"),Fz=D("hgroup"),fz=D("template"),Zz=D("slot"),Jz=D("noscript"),Xz=D("script"),Yz=D("style"),Wz=D("textarea"),Qz=D("meter"),Uz=D("progress"),qz=D("search");var T0=()=>V0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{W({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{w({style:{color:"var(--mongo-green)"},textContent:"fia"})}),W({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{P({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),P({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),P({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var P0=()=>A0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{R0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{W({textContent:"Build High-Performance UIs"}),W({class:"text-gradient",textContent:"Without the Virtual DOM"})}),p({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6",position:"relative",zIndex:"1"},textContent:"Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."}),W({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{F0({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),P({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),W({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),W({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),W({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),W({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),W({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function X0(z,F=10){let f,Z=()=>{f=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},X=(J)=>{if(!f)f=z.getBoundingClientRect();let H=J.clientX-f.left,G=J.clientY-f.top,j=f.width/2,M=f.height/2,T=(G-M)/M*-F,n=(H-j)/j*F;z.style.transform=`
            perspective(1000px)
            rotateX(${T}deg)
            rotateY(${n}deg)
            scale3d(1.02, 1.02, 1.02)
        `},Y=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",Z),z.addEventListener("mousemove",X),z.addEventListener("mouseleave",Y),()=>{z.removeEventListener("mouseenter",Z),z.removeEventListener("mousemove",X),z.removeEventListener("mouseleave",Y)}}var _=(z)=>{$().appendChild(document.createTextNode(z))},y0=()=>W({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{W({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{X0(z,5),W({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{W({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),W({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),W({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let F=(Y)=>w({style:{color:"var(--syntax-keyword)"},textContent:Y}),f=(Y)=>w({style:{color:"var(--syntax-function)"},textContent:Y}),Z=(Y)=>w({style:{color:"var(--syntax-string)"},textContent:Y}),X=(Y)=>w({style:{color:"var(--syntax-comment)"},textContent:Y});Z0({style:{transform:"translateZ(40px)"}},()=>{W(()=>{F("import"),_(" { $, div, button } "),F("from"),Z(' "fia"'),_(";")}),_(" "),W(()=>{F("const"),_(" count = "),f("$"),_("(0);")}),_(" "),W(()=>{f("div"),_("(() => {")}),W({style:{paddingLeft:"1.5rem"}},()=>{f("button"),_("({ ")}),W({style:{paddingLeft:"3rem"}},()=>{W({textContent:"onclick: () => count.value++,"})}),W({style:{paddingLeft:"3rem"}},()=>{_("textContent: "),Z('"Increment"')}),W({style:{paddingLeft:"1.5rem"}},()=>{_("});")}),_(" "),W({style:{paddingLeft:"1.5rem"}},()=>{X("// Updates are surgical - no VDOM diffing")}),W({style:{paddingLeft:"1.5rem"}},()=>{f("div"),_("({ "),_("textContent"),_(": "),f("$"),_("(() => "),Z("`Count: ${count.value}`"),_(") });")}),W({textContent:"});"})})})});var x=(z,F,f)=>W({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(Z)=>{X0(Z,15),W({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:f}),g({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),p({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:F})}),C0=()=>f0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{x("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),x("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),x("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),x("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),x("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),x("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),x("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),x("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var h0=()=>B0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{W({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{W({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var k=(z)=>{$().appendChild(document.createTextNode(z))},u0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((f)=>{if(f.startsWith("//"))w({style:{color:"var(--syntax-comment)"},textContent:f});else if(f.startsWith('"')||f.startsWith("'")||f.startsWith("`"))w({style:{color:"var(--syntax-string)"},textContent:f});else if(["const","import","from","function","return","if","else","true","false"].includes(f))w({style:{color:"var(--syntax-keyword)"},textContent:f});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(f))w({style:{color:"var(--syntax-function)"},textContent:f});else k(f)})},q=(z)=>W({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{W({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{W({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{W({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),W({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),W({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=I(!1);F0({textContent:I(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:I(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),Z0({style:{margin:"0",overflowX:"auto"}},()=>{u0(z)})}),B=(z,F,f)=>{f0({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{W({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{W({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),O0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),f()})},K=(z,F)=>{W({style:{marginBottom:"2.5rem"}},()=>{g({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),F()})},L=(z,F)=>{W({style:{marginBottom:"1.5rem"}},()=>{i({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),F()})},U=(z)=>p({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>k(z)),u=(z)=>J0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((F)=>E({textContent:F}))}),s=(z,F="info")=>W({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>k(z)),Y0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow"},{id:"components",title:"Components"},{id:"svg",title:"SVG"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],n0=()=>{let z=I("intro"),F=()=>{let f=window.scrollY+150;for(let Z=Y0.length-1;Z>=0;Z--){let X=document.getElementById(Y0[Z].id);if(X&&X.offsetTop<=f){z.value=Y0[Z].id;break}}};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",F),F()},0);return W({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{W({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{g({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),J0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{Y0.forEach((f)=>{E({style:{marginBottom:"0.5rem"}},()=>{P({href:`#${f.id}`,style:{color:I(()=>z.value===f.id?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:I(()=>z.value===f.id?"600":"400"),borderLeft:I(()=>z.value===f.id?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:f.title,onclick:(Z)=>{Z.preventDefault();let X=document.getElementById(f.id);if(X){let J=X.offsetTop-100;window.scrollTo({top:J,behavior:"smooth"}),z.value=f.id}}})})})})})})},s0=()=>W({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{n0(),W({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{W({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{P({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{D0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),P({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{D0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),B("Introduction","intro",()=>{U("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),B("Why Fia?","why-fia",()=>{U("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),J0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{E({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),k("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),E({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),k("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),E({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),k("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),E({style:{marginBottom:"0.5rem"}},()=>{w({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),k("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),B("Getting Started","getting-started",()=>{K("Prerequisites",()=>{U("Fia is compatible with any modern JavaScript runtime."),u(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),K("Installation",()=>{U("Fia is published on JSR. Install it using your preferred package manager:"),W({style:{marginBottom:"1rem"}},()=>{i({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),q("deno add jsr:@fia/core")}),W({style:{marginBottom:"1rem"}},()=>{i({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),U('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),U("2. Install (aliased as 'fia'):"),q("bun add fia@npm:@jsr/fia__core")}),W({style:{marginBottom:"1rem"}},()=>{i({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),q("npx jsr add @fia/core")}),s("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),K("Updating",()=>{U("To update to the latest version, run the installation command again (or use your package manager's update command)."),q(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),K("Quick Start",()=>{U("Create your first reactive app in seconds."),q(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),K("Mounting",()=>{U("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),q(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),B("Element API","element-api",()=>{U("Fia elements have a simple, consistent API. Functions match HTML tag names."),q(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),L("Text Content",()=>{U("Use the native textContent prop for static or reactive text."),q(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),L("Event Handlers",()=>{U("Event handlers are delegated automatically foon this pager performance."),q(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),L("Nesting Elements",()=>{U("Use a callback function to nest elements."),q(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),L("Void Elements",()=>{U("Elements like input, img, br only accept props."),q(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),L("onMount Callback",()=>{U("Access layout properties after the element is in the DOM."),q(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),B("Element Factory Types","element-factory-types",()=>{U("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),K("Standard Elements (4 overloads)",()=>{U("Used for semantic structure elements. These factories support the base patterns:"),q(`// 1. Empty element
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
});`),s("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),K("Text Elements (11 overloads)",()=>{U("Optimized for elements that commonly hold text content with convenient text-first syntax."),q(`// All standard overloads plus text shortcuts:

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
});`),s("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),K("Interactive Elements (10 overloads)",()=>{U("Special factories for interactive elements with text + click handler shorthand."),q(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`),s("Elements: button, summary, option, optgroup.")}),K("Void Elements (1 overload)",()=>{U("Self-closing elements that cannot have children."),q(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),s("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),K("Type Safety Benefits",()=>{U("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),q(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),B("Reactivity","reactivity",()=>{K("Signals",()=>{U("Signals are the primitive units of reactivity."),q(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),K("Reactive Stores",()=>{U("Fia stores are immutable by default for predictability."),q(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),s("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),K("Computed Values",()=>{U("Computed signals automatically track dependencies and update when they change."),q(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),K("Effects",()=>{U("Use $e() to run side effects when dependencies change."),q(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),B("Immutability","immutability",()=>{U("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),K("Working with Immutable State",()=>{U("When a store is immutable, you update state by replacing objects, not mutating properties."),q(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),B("Control Flow","control-flow",()=>{K("Show",()=>{U("Conditionally render content that updates when the condition changes."),q('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),K("Each",()=>{U("Reactive list rendering that re-renders efficiently."),q(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),K("Match",()=>{U("Reactive pattern matching for switch/case logic."),q(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),B("Component Composition","components",()=>{U("In Fia, components are just functions. There is no special class or type."),K("Basic Component",()=>{q(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),K("Children & Layouts",()=>{U("To create wrapper components, pass a callback function as a child prop."),q(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),B("SVG","svg",()=>{U("Fia supports SVG elements with full type safety."),q(`import { svg, svgCircle } from "fia";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),B("Performance","performance",()=>{U("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),K("Event Delegation",()=>{U("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),q(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),L("How it works",()=>{u(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),L("Benefits",()=>{u(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),q(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),K("Automatic Fragment Batching",()=>{U("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),q(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1({ textContent: "Title" });    // → Fragment
  p({ textContent: "Para 1" });     // → Fragment
  p({ textContent: "Para 2" });     // → Fragment
});
// Single appendChild(fragment)`),L("How it works",()=>{u(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),L("Benefits",()=>{u(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),q(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),K("Fine-Grained Reactivity",()=>{U("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),q(`const count = $(0);

// Only the <p> text updates when count changes
div(() => {
  p({ textContent: $(() => \`Count: \${count.value}\`) }); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`),L("Performance Comparison",()=>{s("React/Vue: Virtual DOM diff → Entire component tree"),s("Svelte: Compile-time → Block scope"),s("Fia: Direct signal subscription → Single element","info")})}),K("Best Practices",()=>{L("1. Batch Multiple Updates",()=>{q(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),L("2. Use peek() for Non-Reactive Reads",()=>{q(`const count = $(0);
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),L("3. Memoize Expensive Computations",()=>{q(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),B("Examples","examples",()=>{K("\uD83D\uDFE2 Beginner",()=>{L("1. Hello World",()=>{U("The simplest possible Fia code."),q('h1({ textContent: "Hello, World!" });')}),L("2. Counter",()=>{U("Signals hold reactive state."),q(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),L("3. Toggle",()=>{U("Computed signals derive values from other signals."),q(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),L("4. Input Binding",()=>{U("Two-way binding is manual but explicit."),q('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),L("5. List Rendering (Static)",()=>{U("For simple static lists, forEach works fine."),q(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),K("\uD83D\uDFE1 Intermediate",()=>{L("6. Reactive Store Counter",()=>{U("Objects passed to $() become reactive stores."),q(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),L("7. Conditional Classes",()=>{U("Computed signals work in class props too."),q(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),L("8. Form Handling",()=>{U("Reactive stores are perfect for forms."),q(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),L("9. Computed Values",()=>{U("Track dependencies automatically."),q('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),L("10. Dynamic Styling",()=>{U("Reactive styles allow theming."),q(`const theme = $("light");

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
});`)})}),K("\uD83D\uDD34 Advanced",()=>{L("11. Todo App",()=>{U("A complete todo app using Each."),q(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),L("12. Tabs Component",()=>{U("Track active index and conditionally render."),q(`const tabs = ["Home", "About", "Contact"];
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
});`)}),L("13. Async Data Fetching",()=>{U("Use Match for loading states."),q(`const state = $({
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
});`)}),L("14. Modal Dialog",()=>{U("Modal patterns with explicit types."),q(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})})});var x0=()=>{let z=I(0),F=I(0),f=I(0);return document.addEventListener("mousemove",(Z)=>{z.value=Z.clientX,F.value=Z.clientY,f.value=1}),document.addEventListener("mouseout",()=>{f.value=0}),W({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:I(()=>`translate(${z.value-200}px, ${F.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:I(()=>f.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var c0=()=>W({id:"landing-page"},()=>{x0(),T0(),P0(),y0(),C0(),s0(),h0()});c0();
