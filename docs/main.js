var E=void 0,z0=0,R0=0,p=void 0;function F0(z){if(E)z.subs.add(E),E.deps.add(z)}function f0(z){z.version=++z0;let F=[...z.subs];for(let f of F)if(R0>0){if(!p)p=new Set;p.add(f)}else f.execute()}function Z0(z){for(let F of z.deps)F.subs.delete(z);z.deps.clear()}function u(z){let F=!0,f={execute(){if(!F)return;Z0(f);let Z=E;E=f;try{z()}finally{E=Z}},deps:new Set,cleanup(){F=!1,Z0(f)}};return f.execute(),()=>f.cleanup()}function _0(z,F=!1){let f={version:z0,subs:new Set},Z=z,X=function(H){if(arguments.length>0){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(Z,H))Z=H,f0(f);return}return F0(f),Z};return Object.defineProperty(X,"value",{get(){return F0(f),Z},set(H){if(F)throw TypeError("Cannot update a read-only signal.");if(!Object.is(Z,H))Z=H,f0(f)}}),X[$0]=!0,X.peek=()=>Z,X}function p0(z){let F={version:z0,subs:new Set},f,Z=-1,X={execute(){F.version=++z0;let G=[...F.subs];for(let J of G)if(R0>0){if(!p)p=new Set;p.add(J)}else J.execute()},deps:new Set,cleanup(){Z0(X)}},H=()=>{Z0(X);let G=E;E=X;try{let J=z();if(!Object.is(f,J))f=J;Z=F.version}finally{E=G}};H();let j=function(){if(Z!==F.version)H();return F0(F),f};return Object.defineProperty(j,"value",{get(){return j()}}),j[$0]=!0,j.peek=()=>{if(Z!==F.version)H();return f},j}var W0=Symbol("mutable");function y(z){return{value:z,[W0]:!0}}function h(z){return z!==null&&typeof z==="object"&&z[W0]===!0}var L0=Symbol("reactive-proxy"),e=Symbol("raw");function U0(z){return z!==null&&typeof z==="object"&&L0 in z}function g(z,F=!1){let f=new Map,Z=new WeakMap;function X(G){let J=f.get(G);if(!J)J={version:0,subs:new Set},f.set(G,J);return J}if(F===!1||F instanceof Set&&F.size===0){let G=!1;for(let J in z)if(h(z[J])){G=!0;break}if(Array.isArray(z)&&!G){for(let J=0;J<z.length;J++)if(h(z[J])){G=!0;break}}if(!G){if(Array.isArray(z))for(let J=0;J<z.length;J++){let L=z[J];if(L&&typeof L==="object"&&!h(L)&&!U0(L))z[J]=g(L,!1)}else for(let J in z){let L=z[J];if(L&&typeof L==="object"&&!h(L)&&!U0(L))z[J]=g(L,!1)}Object.freeze(z)}}return new Proxy(z,{get(G,J,L){if(J===e||J==="$raw")return G;if(J===L0)return!0;let _=X(J);F0(_);let I=Reflect.get(G,J,L);if(h(I)){let N=Z.get(I);if(N?.mutable)return N.mutable;let W=I.value;if(W!==null&&typeof W==="object"){let k=g(W,!0);if(!N)N={},Z.set(I,N);return N.mutable=k,k}return W}if(I!==null&&typeof I==="object"&&!U0(I)){let N=typeof F==="boolean"&&F||F instanceof Set&&F.has(J),W=Z.get(I);if(W){let c=N?W.mutable:W.readonly;if(c)return c}let k=g(I,N);if(!W)W={},Z.set(I,W);if(N)W.mutable=k;else W.readonly=k;return k}return I},set(G,J,L,_){let I=typeof F==="boolean"&&F||F instanceof Set&&F.has(J),N=Reflect.get(G,J,_);if(!I&&h(N)){if(N.value===null||typeof N.value!=="object"){if(F===!1)F=new Set;if(F instanceof Set)F.add(J);I=!0}}if(!I)return!1;let W=L!==null&&typeof L==="object"&&e in L?L[e]:L,k=Array.isArray(G)&&J==="length";if(Object.is(N,W)&&!k)return!0;if(Reflect.set(G,J,W,_),N!==null&&typeof N==="object")Z.delete(N);let c=f.get(J);if(c)f0(c);return!0},has(G,J){if(J===L0||J===e||J==="$raw")return!0;return Reflect.has(G,J)},ownKeys(G){return Reflect.ownKeys(G)},getOwnPropertyDescriptor(G,J){return Reflect.getOwnPropertyDescriptor(G,J)},deleteProperty(G,J){let L=typeof F==="boolean"&&F||F instanceof Set&&F.has(J);if(!L){let N=Reflect.get(G,J);if(h(N)){if(N.value===null||typeof N.value!=="object"){if(F===!1)F=new Set;if(F instanceof Set)F.add(J);L=!0}}}if(!L)return!1;let _=Reflect.has(G,J),I=Reflect.deleteProperty(G,J);if(_&&I){let N=f.get(J);if(N)f0(N)}return I}})}function w(z,...F){if(typeof z==="function")return p0(z);if(z!==null&&typeof z==="object"&&!h(z))return g(z,new Set(F));if(h(z)){if(typeof z.value==="object"&&z.value!==null)return g(z.value,!0);return _0(z.value,!1)}return _0(z,!0)}var $0=Symbol("signal");function P(z){return typeof z==="function"&&z[$0]===!0}var J0=[];function d(z){J0.push(z)}function s(){J0.pop()}function R(){return J0[J0.length-1]??document.body}var u0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),X0=new WeakMap,w0=new Set;function i0(z){let{target:F,type:f}=z;while(F){let Z=X0.get(F);if(Z&&Z[f]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:F}),Z[f](z),z.cancelBubble)break}F=F.parentElement}}function Y0(z,F,f){if(u0.has(F)){if(!w0.has(F))document.addEventListener(F,i0,{capture:!1,passive:!1}),w0.add(F);let Z=X0.get(z);if(!Z)Z={},X0.set(z,Z);Z[F]=f}else z.addEventListener(F,f)}if(typeof window<"u")window.__eventHandlerMap=X0;function U(z){return(F,f)=>{let Z=document.createElement(z),X,H;if(F===void 0);else if(M(F))H=F;else if(A(F)){if(X=F,f!==void 0)H=f}if(X)T(Z,X);let j=[],G=(J)=>j.push(J);if(H){let J=document.createDocumentFragment();d(J);try{H(Z,G)}finally{s()}Z.appendChild(J)}if(R().appendChild(Z),j.length>0)requestAnimationFrame(()=>{for(let J of j)J()});return Z}}function Y(z){return(F,f,Z)=>{let X=document.createElement(z),H,j,G;if(F===void 0);else if(i(F)){if(H=F,f===void 0);else if(M(f))G=f;else if(A(f)){if(j=f,Z!==void 0)G=Z}}else if(M(F))G=F;else if(A(F)){if(j=F,f!==void 0&&M(f))G=f}if(H!==void 0)n(X,H);if(j)T(X,j);let J=[],L=(_)=>J.push(_);if(G){let _=document.createDocumentFragment();d(_);try{G(X,L)}finally{s()}X.appendChild(_)}if(R().appendChild(X),J.length>0)requestAnimationFrame(()=>{for(let _ of J)_()});return X}}function r(z){return(F,f,Z)=>{let X=document.createElement(z),H,j,G,J;if(F===void 0);else if(i(F)){if(H=F,f===void 0);else if(O0(f))j=f;else if(M(f))J=f;else if(A(f)){if(G=f,Z!==void 0)J=Z}}else if(M(F))J=F;else if(A(F)){if(G=F,f!==void 0&&M(f))J=f}if(H!==void 0)n(X,H);if(j)Y0(X,"click",j);if(G)T(X,G);let L=[],_=(I)=>L.push(I);if(J){let I=document.createDocumentFragment();d(I);try{J(X,_)}finally{s()}X.appendChild(I)}if(R().appendChild(X),L.length>0)requestAnimationFrame(()=>{for(let I of L)I()});return X}}function B(z){return(F)=>{let f=document.createElement(z);if(F)T(f,F);return R().appendChild(f),f}}function A0(){return(z,F,f)=>{let Z=document.createElement("img"),X,H,j;if(z===void 0);else if(typeof z==="string"&&M0(z)){if(X=z,F===void 0);else if(typeof F==="string"){if(H=F,f!==void 0)j=f}else if(A(F))j=F}else if(A(z))j=z;if(X!==void 0)Z.src=X;if(H!==void 0)Z.alt=H;if(j)T(Z,j);return R().appendChild(Z),Z}}function B0(){return(z,F,f)=>{let Z=document.createElement("a"),X,H,j,G;if(z===void 0);else if(typeof z==="string"&&V0(z)){if(X=z,F===void 0);else if(i(F)){if(H=F,f!==void 0)j=f}else if(A(F))j=F}else if(M(z))G=z;else if(A(z)){if(j=z,F!==void 0&&M(F))G=F}if(X!==void 0)Z.href=X;if(H!==void 0)n(Z,H);if(j)T(Z,j);let J=[],L=(_)=>J.push(_);if(G){let _=document.createDocumentFragment();d(_);try{G(Z,L)}finally{s()}Z.appendChild(_)}if(R().appendChild(Z),J.length>0)requestAnimationFrame(()=>{for(let _ of J)_()});return Z}}function i(z){return typeof z==="string"||typeof z==="number"||P(z)&&(typeof z.peek()==="string"||typeof z.peek()==="number")}function O0(z){if(typeof z!=="function")return!1;if(P(z))return!1;return z.length<=1}function V0(z){if(typeof z!=="string")return!1;return/^(\/|#|https?:|mailto:|tel:|\.\.?\/)/.test(z)}function M0(z){if(typeof z!=="string")return!1;return/^(\/|https?:|data:image\/|blob:|\.\.?\/)/.test(z)||/\.(jpg|jpeg|png|gif|svg|webp|avif|ico|bmp)$/i.test(z)}var I0={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function n0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function o0(z,F,f){switch(F){case"value":if("value"in z)z.value=String(f??"");break;case"checked":if("checked"in z)z.checked=Boolean(f);break;case"selected":if("selected"in z)z.selected=Boolean(f);break;case"muted":if("muted"in z)z.muted=Boolean(f);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(f??0);break;case"volume":if("volume"in z)z.volume=Number(f??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(f);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(f??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(f);break;case"textContent":z.textContent=String(f??"");break;case"innerText":z.innerText=String(f??"");break}}function T0(z,F,f){if(F==="class"||F==="className"||F==="classList")c0(z,f);else if(F==="style")l0(z,f);else if(n0(F))o0(z,F,f);else if(typeof f==="boolean")if(f)z.setAttribute(I0[F]??F,"");else z.removeAttribute(I0[F]??F);else z.setAttribute(I0[F]??F,String(f))}function T(z,F){for(let f in F){let Z=F[f];if(Z===null||Z===void 0)continue;if(f.startsWith("on")&&typeof Z==="function"){let X=f.slice(2).toLowerCase();Y0(z,X,Z)}else if(P(Z))u(()=>T0(z,f,Z.value));else T0(z,f,Z)}}function c0(z,F){if(typeof F==="string")z.className=F;else if(Array.isArray(F))z.className=F.filter(Boolean).join(" ");else if(typeof F==="object"&&F!==null){let f=!1;for(let X in F)if(P(F[X])){f=!0;break}let Z=()=>{let X=[];for(let H in F){let j=F[H];if(P(j)?j.value:j)X.push(H)}z.className=X.join(" ")};if(f)u(Z);else Z()}}function r0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function N0(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let F=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${F} / ${z.alpha})`:`color(${z.space} ${F})`}case"color-mix":{let F=typeof z.color1==="object"?N0(z.color1):z.color1,f=typeof z.color2==="object"?N0(z.color2):z.color2,Z=z.percentage1!==void 0?`${z.percentage1}%`:"",X=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${F} ${Z}, ${f} ${X})`}}}function P0(z){if(z===null||z===void 0)return"";if(r0(z))return N0(z);return String(z)}function C0(z,F,f){if(F.startsWith("--")){z.setProperty(F,f);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let Z=F.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(Z,f);return}try{z[F]=f}catch{z.setProperty(F,f)}}function l0(z,F){if(typeof F==="string")z.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let f=!1;for(let Z in F)if(P(F[Z])){f=!0;break}if(f)u(()=>{for(let Z in F){let X=F[Z],H=P(X)?X.value:X;C0(z.style,Z,P0(H))}});else for(let Z in F){let X=F[Z];C0(z.style,Z,P0(X))}}}function n(z,F){if(P(F))u(()=>{z.textContent=String(F.value)});else z.textContent=String(F)}function A(z){return typeof z==="object"&&z!==null&&!P(z)&&!Array.isArray(z)}function M(z){return typeof z==="function"&&!P(z)}var x=B0(),K0=A0(),Q0=r("button"),C1=r("summary"),x1=r("option"),h1=r("optgroup"),x0=Y("h1"),h0=Y("h2"),l=Y("h3"),a=Y("h4"),E1=Y("h5"),d1=Y("h6"),o=Y("p"),D=Y("div"),s1=Y("article"),q0=Y("section"),k1=Y("aside"),E0=Y("header"),d0=Y("footer"),y1=Y("main"),S1=Y("blockquote"),m1=Y("figcaption"),D0=Y("pre"),b1=Y("address"),O=Y("span"),v1=Y("strong"),g1=Y("em"),p1=Y("small"),u1=Y("mark"),i1=Y("code"),n1=Y("samp"),o1=Y("kbd"),c1=Y("var"),r1=Y("i"),l1=Y("b"),a1=Y("u"),t1=Y("s"),e1=Y("del"),z5=Y("ins"),F5=Y("sub"),f5=Y("sup"),Z5=Y("abbr"),J5=Y("cite"),X5=Y("dfn"),Y5=Y("q"),Q5=Y("time"),q5=Y("data"),D5=Y("bdi"),G5=Y("bdo"),H5=Y("ruby"),j5=Y("rp"),U5=Y("rt"),L5=Y("label"),$5=Y("legend"),I5=Y("output"),N5=Y("caption"),K5=Y("td"),_5=Y("th"),b=Y("li"),R5=Y("dd"),W5=Y("dt"),w5=Y("title"),O5=B("input"),A5=B("br"),M5=B("hr"),B5=B("meta"),V5=B("link"),T5=B("area"),P5=B("base"),C5=B("col"),x5=B("embed"),h5=B("source"),E5=B("track"),d5=B("wbr"),G0=U("ul"),s5=U("ol"),k5=U("menu"),y5=U("table"),S5=U("tbody"),m5=U("thead"),b5=U("tfoot"),v5=U("tr"),g5=U("colgroup"),p5=U("form"),u5=U("fieldset"),i5=U("details"),n5=U("dialog"),s0=U("nav"),o5=U("figure"),c5=U("select"),r5=U("datalist"),l5=U("dl"),a5=U("audio"),t5=U("video"),e5=U("picture"),zz=U("iframe"),Fz=U("object"),fz=U("canvas"),Zz=U("map"),Jz=U("body"),Xz=U("head"),Yz=U("html"),Qz=U("hgroup"),qz=U("template"),Dz=U("slot"),Gz=U("noscript"),Hz=U("script"),jz=U("style"),Uz=U("textarea"),Lz=U("meter"),$z=U("progress"),Iz=U("search");var k0=()=>s0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{D({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{O({style:{color:"var(--mongo-green)"},textContent:"fia"})}),D({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{x({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),x({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),x({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var y0=()=>E0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{x0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{D({textContent:"Bare Metal JavaScript"}),D({class:"text-gradient",textContent:"No JSX. Value Native."})}),o({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6",position:"relative",zIndex:"1"},textContent:"Fia is a thin abstraction layer over the native DOM. Build high-performance UIs with fine-grained signals and standard JavaScript—no weird JSX, no Virtual DOM, and absolutely zero dependencies."}),D({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{Q0({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),x({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),D({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),D({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),D({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),D({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),D({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function H0(z,F=10){let f,Z=()=>{f=z.getBoundingClientRect(),z.style.transition="transform 0.1s ease-out"},X=(j)=>{if(!f)f=z.getBoundingClientRect();let G=j.clientX-f.left,J=j.clientY-f.top,L=f.width/2,_=f.height/2,I=(J-_)/_*-F,N=(G-L)/L*F;z.style.transform=`
            perspective(1000px)
            rotateX(${I}deg)
            rotateY(${N}deg)
            scale3d(1.02, 1.02, 1.02)
        `},H=()=>{z.style.transition="transform 0.5s ease-out",z.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return z.addEventListener("mouseenter",Z),z.addEventListener("mousemove",X),z.addEventListener("mouseleave",H),()=>{z.removeEventListener("mouseenter",Z),z.removeEventListener("mousemove",X),z.removeEventListener("mouseleave",H)}}var V=(z)=>{R().appendChild(document.createTextNode(z))},S0=()=>D({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{D({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(z)=>{H0(z,5),D({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{D({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),D({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),D({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let F=(X)=>O({style:{color:"var(--syntax-keyword)"},textContent:X}),f=(X)=>O({style:{color:"var(--syntax-function)"},textContent:X}),Z=(X)=>O({style:{color:"var(--syntax-string)"},textContent:X});D0({style:{transform:"translateZ(40px)"}},()=>{D(()=>{F("import"),V(" { $, div, button, Mut } "),F("from"),Z(' "fia"'),V(";")}),V(" "),D(()=>{F("const"),V(" count = "),f("$"),V("("),f("Mut"),V("(0));")}),V(" "),D(()=>{f("button"),V("("),Z('"Increment"'),V(", () => count.value++);")}),V(" "),D(()=>{f("div"),V("("),f("$"),V("(() => "),Z("`Count: ${count.value}`"),V("));")})})})});var S=(z,F,f)=>D({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(Z)=>{H0(Z,15),D({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:f}),l({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:z}),o({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:F})}),m0=()=>q0({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{S("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡"),S("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),S("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️"),S("Accessibility First","WCAG compliance built-in. Advanced ARIA types with literal values and role-specific attribute suggestions.","♿"),S("Zero Dependencies","No npm packages. No supply chain risk. No version conflicts. Just pure JavaScript.","\uD83D\uDCE6"),S("Tiny Bundle","Only ~6KB gzipped. Smaller than most utility libraries. Fast to download, fast to parse.","⚖️"),S("Event Delegation","Single delegated listener per event type.","\uD83C\uDFAA"),S("Fragment Batching","Automatic DocumentFragment batching. No more intermediate nodes or layout thrashing.","\uD83D\uDE80")});var b0=()=>d0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{D({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{D({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var v=(z)=>{R().appendChild(document.createTextNode(z))},a0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((f)=>{if(f.startsWith("//"))O({style:{color:"var(--syntax-comment)"},textContent:f});else if(f.startsWith('"')||f.startsWith("'")||f.startsWith("`"))O({style:{color:"var(--syntax-string)"},textContent:f});else if(["const","import","from","function","return","if","else","true","false"].includes(f))O({style:{color:"var(--syntax-keyword)"},textContent:f});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(f))O({style:{color:"var(--syntax-function)"},textContent:f});else v(f)})},q=(z)=>D({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{D({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{D({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{D({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),D({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),D({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=w(y(!1));Q0({textContent:w(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:w(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),D0({style:{margin:"0",overflowX:"auto"}},()=>{a0(z)})}),C=(z,F,f)=>{q0({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{D({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{D({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),h0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),f()})},K=(z,F)=>{D({style:{marginBottom:"2.5rem"}},()=>{l({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),F()})},$=(z,F)=>{D({style:{marginBottom:"1.5rem"}},()=>{a({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),F()})},Q=(z)=>o({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>v(z)),t=(z)=>G0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((F)=>b(F))}),m=(z,F="info")=>D({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>v(z)),j0=[{id:"intro",title:"Introduction"},{id:"why-fia",title:"Why Fia?"},{id:"getting-started",title:"Getting Started"},{id:"element-api",title:"Element API"},{id:"element-factory-types",title:"Element Factory Types"},{id:"reactivity",title:"Reactivity"},{id:"immutability",title:"Immutability"},{id:"control-flow",title:"Control Flow"},{id:"components",title:"Components"},{id:"performance",title:"Performance"},{id:"examples",title:"Examples"}],t0=()=>{let z=w(y("intro")),F=()=>{let f=window.scrollY+150;for(let Z=j0.length-1;Z>=0;Z--){let X=document.getElementById(j0[Z].id);if(X&&X.offsetTop<=f){z.value=j0[Z].id;break}}};if(typeof window<"u")setTimeout(()=>{window.addEventListener("scroll",F),F()},0);return D({class:"toc-container",style:{position:"sticky",top:"120px",height:"fit-content",maxHeight:"calc(100vh - 140px)",overflowY:"auto",paddingRight:"1rem",width:"220px",flexShrink:"0"}},()=>{D({style:{borderLeft:"2px solid var(--mongo-slate)",paddingLeft:"1rem"}},()=>{l({style:{fontSize:"0.875rem",color:"var(--text-secondary)",marginBottom:"1rem",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:"600"}}),G0({style:{listStyle:"none",padding:"0",margin:"0"}},()=>{j0.forEach((f)=>{b({style:{marginBottom:"0.5rem"}},()=>{x({href:`#${f.id}`,style:{color:w(()=>z.value===f.id?"var(--mongo-green)":"var(--text-secondary)"),textDecoration:"none",fontSize:"0.875rem",display:"block",padding:"0.25rem 0",transition:"color 0.2s",fontWeight:w(()=>z.value===f.id?"600":"400"),borderLeft:w(()=>z.value===f.id?"2px solid var(--mongo-green)":"2px solid transparent"),paddingLeft:"0.5rem",marginLeft:"-0.5rem"},textContent:f.title,onclick:(Z)=>{Z.preventDefault();let X=document.getElementById(f.id);if(X){let j=X.offsetTop-100;window.scrollTo({top:j,behavior:"smooth"}),z.value=f.id}}})})})})})})},v0=()=>D({id:"docs",class:"container",style:{display:"flex",gap:"3rem",maxWidth:"1400px",margin:"0 auto",paddingBottom:"var(--spacing-xl)",paddingLeft:"2rem",paddingRight:"2rem"}},()=>{t0(),D({style:{flex:"1",minWidth:"0",maxWidth:"800px"}},()=>{D({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{x({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{K0({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),x({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{K0({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),C("Introduction","intro",()=>{Q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),C("Why Fia?","why-fia",()=>{Q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),G0({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{b({style:{marginBottom:"0.5rem"}},()=>{O({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),v("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),b({style:{marginBottom:"0.5rem"}},()=>{O({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),v("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),b({style:{marginBottom:"0.5rem"}},()=>{O({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),v("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),b({style:{marginBottom:"0.5rem"}},()=>{O({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),v("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),C("Getting Started","getting-started",()=>{K("Prerequisites",()=>{Q("Fia is compatible with any modern JavaScript runtime."),t(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),K("Installation",()=>{Q("Fia is published on JSR. Install it using your preferred package manager:"),D({style:{marginBottom:"1rem"}},()=>{a({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),q("deno add jsr:@fia/core")}),D({style:{marginBottom:"1rem"}},()=>{a({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),Q('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),Q("2. Install (aliased as 'fia'):"),q("bun add fia@npm:@jsr/fia__core")}),D({style:{marginBottom:"1rem"}},()=>{a({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),q("npx jsr add @fia/core")}),m("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),K("Updating",()=>{Q("To update to the latest version, run the installation command again (or use your package manager's update command)."),q(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),K("Quick Start",()=>{Q("Create your first reactive app in seconds."),q(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $(Mut({ count: 0 }));

div({ class: "app" }, () => {
  h1("Counter App");
  p(() => \`Count: \${state.count}\`);
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),K("Mounting",()=>{Q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),q(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),C("Element API","element-api",()=>{Q("Fia elements have a simple, consistent API. Functions match HTML tag names."),q(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),$("Text Content",()=>{Q("Use the native textContent prop for static or reactive text."),q(`// Static text
h1("Hello World");

// Reactive text
const name = $("Evan");
p(name);

// Computed text
p(() => \`Hello, \${name.value}!\`);`)}),$("Event Handlers",()=>{Q("Event handlers are delegated automatically for performance."),q(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),$("Nesting Elements",()=>{Q("Use a callback function to nest elements."),q(`div({ class: "card" }, () => {
  h1("Title");
  p("Description");
});`)}),$("Void Elements",()=>{Q("Elements like input, img, br only accept props."),q(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),$("onMount Callback",()=>{Q("Access layout properties after the element is in the DOM."),q(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),C("Element Factory Types","element-factory-types",()=>{Q("Fia provides different element factory types optimized for specific use cases. Each factory type has its own set of overloads tailored to common usage patterns."),K("Standard Elements (4 overloads)",()=>{Q("Used for semantic structure elements. These factories support the base patterns:"),q(`// 1. Empty element
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
});`),m("Elements: article, section, nav, form, ul, ol, table, canvas, video, and more.")}),K("Text Elements (11 overloads)",()=>{Q("Optimized for elements that commonly hold text content with convenient text-first syntax."),q(`// All standard overloads plus text shortcuts:

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
});`),m("Elements: h1-h6, p, div, span, label, li, td, th, strong, em, code, and more.")}),K("Interactive Elements (10 overloads)",()=>{Q("Special factories for interactive elements with text + click handler shorthand."),q(`// All text element overloads plus click shorthand:

// 9. Text + click handler shorthand (special!)
button("Delete", () => {
  console.log("Delete clicked!");
});

// Equivalent full props version:
button({
  textContent: "Delete",
  onclick: () => console.log("Delete clicked!"),
  class: "btn-danger"
});`),m("Elements: button, summary, option, optgroup.")}),K("Void Elements (1 overload)",()=>{Q("Self-closing elements that cannot have children."),q(`// Props only (or empty)
input();
input({ type: "email", placeholder: "you@example.com" });
br();
hr({ style: { margin: "2rem 0" } });
img({ src: "/photo.jpg", alt: "Description" });`),m("Elements: input, br, hr, img, area, base, col, link, meta, and more.")}),K("Type Safety Benefits",()=>{Q("All factories provide full TypeScript support with autocomplete, event type inference, and ARIA attribute validation."),q(`// TypeScript knows this is an HTMLInputElement
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
});`)})}),C("Reactivity","reactivity",()=>{K("Signals",()=>{Q("Signals are the primitive units of reactivity."),q(`const count = $(Mut(0));
console.log(count.value); // 0
count.value++;`)}),K("Reactive Stores",()=>{Q("Fia stores are immutable by default for predictability."),q(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $(Mut({ count: 0 }));
state.count++; // Works!`),m("Destructuring breaks reactivity. Always access properties directly: state.count","warning"),m("Immutable stores are physically frozen with Object.freeze(). Any attempt to mutate them via $raw or other means will fail.","info")}),K("Computed Values",()=>{Q("Computed signals automatically track dependencies and update when they change."),q(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),K("Effects",()=>{Q("Use $e() to run side effects when dependencies change."),q(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),C("Immutability","immutability",()=>{Q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),K("Data Types & Behavior",()=>{$("1. Primitives (String, Number, Boolean)",()=>{Q("Primitives are immutable by default. To make them mutable, use Mut."),q(`// ❌ Error: Read-only
const count = $(0);
// count.value = 1;

// ✅ Valid: Replace value (if using a distinct signal)
const name = $("Evan");
// name.value can't be set, but you can create a new signal

// ✅ Valid: Mutable Primitive
const score = $(Mut(0));
score.value = 10;`)}),$("2. Objects",()=>{Q("Objects are shallowly immutable by default. You cannot add, remove, or change properties."),q(`const user = $({ name: "Evan", age: 30 });

// ❌ Error: Read-only property
// user.age = 31;

// ✅ Valid: Replace entire object
// This triggers updates for all changed properties
const userSignal = $(Mut({ name: "Evan" })); // If the signal itself is mutable
// OR with stores, you often replace nested objects in a parent store.`),Q("Mutable Objects:"),q(`// Option A: Specific keys
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
// unless the parent key is also mutable.`)}),$("Secure Immutability by Design",()=>{Q("Fia's reactive stores are designed to prevent accidental leaks of reactivity. When you spread a store, you get a plain object snapshot, not a reactive clone."),q(`const original = $({ name: "Evan", details: { age: 30 } });
const snapshot = { ...original };

// To create a truly independent reactive copy:
const clone = $({ ...original }); // New store with copied values`),m("This behavior ensures you never accidentally pass reactivity where a plain value was expected, maintaining explicit data flow.","info")}),$("3. Arrays",()=>{Q("Arrays are immutable by default. Methods that mutate (push, pop, splice, sort) are typed to not exist or error."),q(`const list = $({ items: [1, 2, 3] });
`+`// ❌ Error: Property 'push' does not exist on type 'readonly number[]'
`+`// list.items.push(4);

`+`// ✅ Valid: Replace array
`+"// list.items = [...list.items, 4]; // Only works if 'items' key is mutable"),Q("Mutable Arrays:"),q(`const todos = $(Mut({ list: [] as string[] }));

`+`// ✅ Valid: Mutation methods work
`+`todos.list.push("Buy milk");
todos.list.splice(0, 1);`)}),$("4. Nested Objects (Deep Reactivity)",()=>{Q("Deeply nested objects inherit the mutability context of their parent property assignment, but by default, Fia encourages replacing nested objects."),q(`const app = $(Mut({
  settings: {
    notifications: { email: true }
  }
}));

`+`// ✅ Valid: Traverse and mutate (because app was wrapped in Mut)
`+`app.settings.notifications.email = false;

`+`// ℹ️ Pattern: Immutable Tree with Mutable Root
`+`// If 'settings' wasn't mutable, you'd do:
// app.settings = { ...app.settings, notifications: { ... } };`)})})}),C("Control Flow","control-flow",()=>{K("Show",()=>{Q("Conditionally render content that updates when the condition changes."),q('Show(() => isVisible.value, () => div("Hello!"));')}),K("Each",()=>{Q("Reactive list rendering that re-renders efficiently."),q(`const items = $({ list: ["Apple", "Banana"] });
Each(items.list, item => li(item));`)}),K("Match",()=>{Q("Reactive pattern matching for switch/case logic."),q(`Match(() => status.value, {
  loading: () => p("Loading..."),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),C("Component Composition","components",()=>{Q("In Fia, components are just functions. There is no special class or type."),K("Basic Component",()=>{q(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),K("Children & Layouts",()=>{Q("To create wrapper components, pass a callback function as a child prop."),q(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),C("Performance","performance",()=>{Q("Fia achieves exceptional performance through three core optimizations: event delegation, automatic batching, and fine-grained reactivity."),K("Event Delegation",()=>{Q("Traditional frameworks attach individual event listeners to each element. Fia uses a single delegated listener per event type."),q(`// Traditional approach (100 listeners!)
for (let i = 0; i < 100; i++) {
  button.addEventListener('click', handler);
}

// Fia's approach (1 listener!)
document.body
  └── 1 click handler (delegated)
      └── WeakMap<Element, Handler>`),$("How it works",()=>{t(["One global listener per event type (click, input, etc.)","Handlers stored in WeakMap<Element, Handler>","Automatic cleanup when elements are removed","Dynamic elements work without rebinding"])}),$("Benefits",()=>{t(["Memory efficient: 100 buttons = 1 listener (not 100)","Faster event dispatch: Single lookup","No memory leaks from forgotten listeners","Works with dynamically created elements"])}),q(`// Create 1,000 buttons - still only 1 click listener!
ul(() => {
  for (let i = 0; i < 1000; i++) {
    li(() => {
      button(\`Button \${i}\`, () => console.log(\`Clicked \${i}\`));
    });
  }
});`)}),K("Automatic Fragment Batching",()=>{Q("Each DOM insertion triggers browser reflow. Fia batches all children into a single insertion using DocumentFragment."),q(`// Traditional approach (3 reflows!)
container.appendChild(h1);  // Reflow #1
container.appendChild(p1);  // Reflow #2
container.appendChild(p2);  // Reflow #3

// Fia's approach (1 reflow!)
div(() => {
  h1("Title");    // → Fragment
  p("Para 1");     // → Fragment
  p("Para 2");     // → Fragment
});
// Single appendChild(fragment)`),$("How it works",()=>{t(["Children callback creates a DocumentFragment","All child elements append to fragment (in-memory)","Complete fragment inserted in one operation","Browser performs one reflow instead of multiple"])}),$("Benefits",()=>{t(["Single reflow: N insertions = 1 reflow (not N)","Faster rendering with 10+ children","Automatic - no manual optimization needed","Composable with nested structures"])}),q(`// Fia automatically batches 100 elements
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
// Traditional: 102 reflows`)}),K("Fine-Grained Reactivity",()=>{Q("Virtual DOM frameworks re-render entire component trees. Fia updates only the changed elements."),q(`const count = $(Mut(0));

// Only the <p> text updates when count changes
div(() => {
  p(() => \`Count: \${count.value}\`); // ← Updates
  button("+", () => count.value++); // ← Never re-renders
});`)}),K("Best Practices",()=>{$("1. Batch Multiple Updates",()=>{q(`import { batch } from "fia";

batch(() => {
  state.name = "Alice";
  state.age = 30;
  state.active = true;
}); // Triggers one effect run`)}),$("2. Use peek() for Non-Reactive Reads",()=>{q(`const count = $(Mut(0));
const threshold = $(10);

$e(() => {
  // Only subscribes to count, not threshold
  if (count.value > threshold.peek()) {
    console.log("Threshold exceeded!");
  }
});`)}),$("3. Memoize Expensive Computations",()=>{q(`// Bad: Re-computes on every access
const doubled = count.value * 2;

// Good: Computed once, cached until count changes
const doubled = $(() => count.value * 2);`)})})}),C("Examples","examples",()=>{K("\uD83D\uDFE2 Beginner",()=>{$("1. Hello World",()=>{Q("The simplest possible Fia code."),q('h1("Hello, World!");')}),$("2. Counter",()=>{Q("Signals hold reactive state."),q(`const count = $(Mut(0));
button("+", () => count.value++);
p(count);`)}),$("3. Toggle",()=>{Q("Computed signals derive values from other signals."),q(`const visible = $(Mut(true));
button("Toggle", () => visible.value = !visible.value);
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p("Now you see me!");
});`)}),$("4. Input Binding",()=>{Q("Two-way binding is manual but explicit."),q('const name = $(Mut(""));\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np($(() => `Hello, ${name.value || "stranger"}!`));')}),$("5. List Rendering (Static)",()=>{Q("For simple static lists, forEach works fine."),q(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li(item)));`)})}),K("\uD83D\uDFE1 Intermediate",()=>{$("6. Reactive Store Counter",()=>{Q("Objects passed to $() become reactive stores."),q(`const state = $(Mut({ count: 0 }));

div(() => {
  h1($(() => \`Count: \${state.count}\`));
  button("+", () => state.count++);
  button("-", () => state.count--);
});`)}),$("7. Conditional Classes",()=>{Q("Computed signals work in class props too."),q(`const active = $(Mut(false));

button("Toggle Active", {
  class: $(() => active.value ? "btn active" : "btn")
}, () => active.value = !active.value);`)}),$("8. Form Handling",()=>{Q("Reactive stores are perfect for forms."),q(`const formData = $(Mut({ email: "", password: "" }));

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button("Submit", { type: "submit" });
});`)}),$("9. Computed Values",()=>{Q("Track dependencies automatically."),q('const state = $(Mut({ price: 100, quantity: 2 }));\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p($(() => `Price: $${state.price}`));\n  p($(() => `Qty: ${state.quantity}`));\n  p($(() => `Total: $${total.value}`));\n  button("Add", () => state.quantity++);\n});')}),$("10. Dynamic Styling",()=>{Q("Reactive styles allow theming."),q(`const theme = $(Mut("light"));

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
});`)})}),K("\uD83D\uDD34 Advanced",()=>{$("11. Todo App",()=>{Q("A complete todo app using Each."),q(`const todos = $(Mut({ items: [] as string[], input: "" }));

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
});`)}),$("12. Tabs Component",()=>{Q("Track active index and conditionally render."),q(`const tabs = ["Home", "About", "Contact"];
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
});`)}),$("13. Async Data Fetching",()=>{Q("Use Match for loading states."),q(`const state = $(Mut({
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
});`)}),$("14. Modal Dialog",()=>{Q("Modal patterns with explicit types."),q(`const modal = $(Mut({ open: false, title: "" }));

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
});`)})})})})});var g0=()=>{let z=w(y(0)),F=w(y(0)),f=w(y(0));return document.addEventListener("mousemove",(Z)=>{z.value=Z.clientX,F.value=Z.clientY,f.value=1}),document.addEventListener("mouseout",()=>{f.value=0}),D({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:w(()=>`translate(${z.value-200}px, ${F.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:w(()=>f.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var e0=()=>D({id:"landing-page"},()=>{g0(),k0(),y0(),S0(),m0(),v0(),b0()});e0();
