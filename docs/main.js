var _=void 0,g=0,F0=0,B=void 0;function y(f){if(_)f.subs.add(_),_.deps.add(f)}function b(f){f.version=++g;let F=[...f.subs];for(let M of F)if(F0>0){if(!B)B=new Set;B.add(M)}else M.execute()}function k(f){for(let F of f.deps)F.subs.delete(f);f.deps.clear()}function V(f){let F=!0,M={execute(){if(!F)return;k(M);let L=_;_=M;try{f()}finally{_=L}},deps:new Set,cleanup(){F=!1,k(M)}};return M.execute(),()=>M.cleanup()}function O0(f){let F={version:g,subs:new Set},M=f,L=function(D){if(arguments.length>0){if(!Object.is(M,D))M=D,b(F);return}return y(F),M};return Object.defineProperty(L,"value",{get(){return y(F),M},set(D){if(!Object.is(M,D))M=D,b(F)}}),L[o]=!0,L.peek=()=>M,L}function R0(f){let F={version:g,subs:new Set},M,L=-1,D={execute(){F.version=++g;let q=[...F.subs];for(let Q of q)if(F0>0){if(!B)B=new Set;B.add(Q)}else Q.execute()},deps:new Set,cleanup(){k(D)}},H=()=>{k(D);let q=_;_=D;try{let Q=f();if(!Object.is(M,Q))M=Q;L=F.version}finally{_=q}};H();let X=function(){if(L!==F.version)H();return y(F),M};return Object.defineProperty(X,"value",{get(){return X()}}),X[o]=!0,X.peek=()=>{if(L!==F.version)H();return M},X}var n=Symbol("reactive-proxy"),h=Symbol("raw");function A0(f){return f!==null&&typeof f==="object"&&n in f}function M0(f){let F=new Map,M=new WeakMap;function L(H){let X=F.get(H);if(!X)X={version:0,subs:new Set},F.set(H,X);return X}return new Proxy(f,{get(H,X,q){if(X===h||X==="$raw")return H;if(X===n)return!0;let Q=L(X);y(Q);let I=Reflect.get(H,X,q);if(I!==null&&typeof I==="object"&&!A0(I)){let w=M.get(I);if(!w)w=M0(I),M.set(I,w);return w}return I},set(H,X,q,Q){let I=Reflect.get(H,X,Q),w=q!==null&&typeof q==="object"&&h in q?q[h]:q,u=Array.isArray(H)&&X==="length";if(Object.is(I,w)&&!u)return!0;if(Reflect.set(H,X,w,Q),I!==null&&typeof I==="object")M.delete(I);let C=F.get(X);if(C)b(C);return!0},has(H,X){if(X===n||X===h||X==="$raw")return!0;return Reflect.has(H,X)},ownKeys(H){return Reflect.ownKeys(H)},getOwnPropertyDescriptor(H,X){return Reflect.getOwnPropertyDescriptor(H,X)},deleteProperty(H,X){let q=Reflect.has(H,X),Q=Reflect.deleteProperty(H,X);if(q&&Q){let I=F.get(X);if(I)b(I)}return Q}})}function $(f,...F){if(typeof f==="function")return R0(f);if(f!==null&&typeof f==="object")return M0(f);return O0(f)}var o=Symbol("signal");function R(f){return typeof f==="function"&&f[o]===!0}var d=[];function c(f){d.push(f)}function r(){d.pop()}function A(){return d[d.length-1]??document.body}var T0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),E=new WeakMap,z0=new Set;function B0(f){let{target:F,type:M}=f;while(F){let L=E.get(F);if(L&&L[M]){if(Object.defineProperty(f,"currentTarget",{configurable:!0,value:F}),L[M](f),f.cancelBubble)break}F=F.parentElement}}function L0(f,F,M){if(T0.has(F)){if(!z0.has(F))document.addEventListener(F,B0,{capture:!1,passive:!1}),z0.add(F);let L=E.get(f);if(!L)L={},E.set(f,L);L[F]=M}else f.addEventListener(F,M)}if(typeof window<"u")window.__eventHandlerMap=E;var a={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function x0(f){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(f)}function s0(f,F,M){switch(F){case"value":if("value"in f)f.value=String(M??"");break;case"checked":if("checked"in f)f.checked=Boolean(M);break;case"selected":if("selected"in f)f.selected=Boolean(M);break;case"muted":if("muted"in f)f.muted=Boolean(M);break;case"currentTime":if("currentTime"in f)f.currentTime=Number(M??0);break;case"volume":if("volume"in f)f.volume=Number(M??1);break;case"indeterminate":if("indeterminate"in f)f.indeterminate=Boolean(M);break;case"defaultValue":if("defaultValue"in f)f.defaultValue=String(M??"");break;case"defaultChecked":if("defaultChecked"in f)f.defaultChecked=Boolean(M);break;case"textContent":f.textContent=String(M??"");break;case"innerText":f.innerText=String(M??"");break}}function Z0(f,F,M){if(F==="class")V0(f,M);else if(F==="style")C0(f,M);else if(x0(F))s0(f,F,M);else if(typeof M==="boolean")if(M)f.setAttribute(a[F]??F,"");else f.removeAttribute(a[F]??F);else f.setAttribute(a[F]??F,String(M))}function Y0(f,F){for(let M in F){let L=F[M];if(L===null||L===void 0)continue;if(M.startsWith("on")&&typeof L==="function"){let D=M.slice(2).toLowerCase();L0(f,D,L)}else if(R(L))V(()=>Z0(f,M,L.value));else Z0(f,M,L)}}function V0(f,F){if(typeof F==="string")f.className=F;else if(typeof F==="object"&&F!==null){let M=!1;for(let D in F)if(R(F[D])){M=!0;break}let L=()=>{let D=[];for(let H in F){let X=F[H];if(R(X)?X.value:X)D.push(H)}f.className=D.join(" ")};if(M)V(L);else L()}}function P0(f){return typeof f==="object"&&f!==null&&"type"in f&&typeof f.type==="string"}function t(f){switch(f.type){case"rgb":return f.a!==void 0?`rgba(${f.r}, ${f.g}, ${f.b}, ${f.a})`:`rgb(${f.r}, ${f.g}, ${f.b})`;case"hsl":return f.a!==void 0?`hsla(${f.h}, ${f.s}%, ${f.l}%, ${f.a})`:`hsl(${f.h}, ${f.s}%, ${f.l}%)`;case"hwb":return f.a!==void 0?`hwb(${f.h} ${f.w}% ${f.b}% / ${f.a})`:`hwb(${f.h} ${f.w}% ${f.b}%)`;case"oklch":return f.a!==void 0?`oklch(${f.l}% ${f.c} ${f.h} / ${f.a})`:`oklch(${f.l}% ${f.c} ${f.h})`;case"lab":return f.alpha!==void 0?`lab(${f.l}% ${f.a} ${f.b} / ${f.alpha})`:`lab(${f.l}% ${f.a} ${f.b})`;case"lch":return f.alpha!==void 0?`lch(${f.l}% ${f.c} ${f.h} / ${f.alpha})`:`lch(${f.l}% ${f.c} ${f.h})`;case"oklab":return f.alpha!==void 0?`oklab(${f.l}% ${f.a} ${f.b} / ${f.alpha})`:`oklab(${f.l}% ${f.a} ${f.b})`;case"hex":return f.value;case"color":{let F=f.components.join(" ");return f.alpha!==void 0?`color(${f.space} ${F} / ${f.alpha})`:`color(${f.space} ${F})`}case"color-mix":{let F=typeof f.color1==="object"?t(f.color1):f.color1,M=typeof f.color2==="object"?t(f.color2):f.color2,L=f.percentage1!==void 0?`${f.percentage1}%`:"",D=f.percentage2!==void 0?`${f.percentage2}%`:"";return`color-mix(${f.method}, ${F} ${L}, ${M} ${D})`}}}function H0(f){if(f===null||f===void 0)return"";if(P0(f))return t(f);return String(f)}function X0(f,F,M){if(F.startsWith("--")){f.setProperty(F,M);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let L=F.replace(/([A-Z])/g,"-$1").toLowerCase();f.setProperty(L,M);return}try{f[F]=M}catch{f.setProperty(F,M)}}function C0(f,F){if(typeof F==="string")f.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let M=!1;for(let L in F)if(R(F[L])){M=!0;break}if(M)V(()=>{for(let L in F){let D=F[L],H=R(D)?D.value:D;X0(f.style,L,H0(H))}});else for(let L in F){let D=F[L];X0(f.style,L,H0(D))}}}function z(f){return(F,M)=>{let L=document.createElement(f),D,H;if(F===void 0);else if(g0(F))H=F;else if(h0(F)){if(D=F,M!==void 0)H=M}if(D)Y0(L,D);let X=[],q=(Q)=>X.push(Q);if(H){let Q=document.createDocumentFragment();c(Q);try{H(L,q)}finally{r()}L.appendChild(Q)}if(A().appendChild(L),X.length>0)requestAnimationFrame(()=>{for(let Q of X)Q()});return L}}function K(f){return(F)=>{let M=document.createElement(f);if(F)Y0(M,F);return A().appendChild(M),M}}function h0(f){return typeof f==="object"&&f!==null&&!R(f)&&!Array.isArray(f)}function g0(f){return typeof f==="function"&&!R(f)}var O=z("a"),i0=z("abbr"),v0=z("address"),u0=K("area"),n0=z("article"),o0=z("aside"),c0=z("audio"),r0=z("b"),a0=K("base"),t0=z("bdi"),l0=z("bdo"),e0=z("blockquote"),f1=z("body"),F1=K("br"),m=z("button"),M1=z("canvas"),z1=z("caption"),L1=z("cite"),Z1=z("code"),H1=K("col"),X1=z("colgroup"),Y1=z("data"),J1=z("datalist"),D1=z("dd"),Q1=z("del"),U1=z("details"),q1=z("dfn"),I1=z("dialog"),Z=z("div"),W1=z("dl"),j1=z("dt"),G1=z("em"),K1=K("embed"),$1=z("fieldset"),N1=z("figcaption"),w1=z("figure"),J0=z("footer"),_1=z("form"),D0=z("h1"),Q0=z("h2"),S=z("h3"),P=z("h4"),O1=z("h5"),R1=z("h6"),A1=z("head"),U0=z("header"),T1=z("hgroup"),B1=K("hr"),x1=z("html"),s1=z("i"),V1=z("iframe"),l=K("img"),P1=K("input"),C1=z("ins"),h1=z("kbd"),g1=z("label"),y1=z("legend"),x=z("li"),b1=K("link"),k1=z("main"),d1=z("map"),E1=z("mark"),m1=z("menu"),S1=K("meta"),p1=z("meter"),q0=z("nav"),i1=z("noscript"),v1=z("object"),u1=z("ol"),n1=z("optgroup"),o1=z("option"),c1=z("output"),s=z("p"),r1=z("picture"),p=z("pre"),a1=z("progress"),t1=z("q"),l1=z("rp"),e1=z("rt"),f5=z("ruby"),F5=z("s"),M5=z("samp"),z5=z("script"),L5=z("search"),i=z("section"),Z5=z("select"),H5=z("slot"),X5=z("small"),Y5=K("source"),j=z("span"),J5=z("strong"),D5=z("style"),Q5=z("sub"),U5=z("summary"),q5=z("sup"),I5=z("table"),W5=z("tbody"),j5=z("td"),G5=z("template"),K5=z("textarea"),$5=z("tfoot"),N5=z("th"),w5=z("thead"),_5=z("time"),O5=z("title"),R5=z("tr"),A5=K("track"),T5=z("u"),e=z("ul"),B5=z("var"),x5=z("video"),s5=K("wbr");var I0=()=>q0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{Z({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{j({style:{color:"var(--mongo-green)"},textContent:"fia"})}),Z({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{O({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),O({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),O({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var W0=()=>U0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px",position:"relative"}},()=>{D0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em",position:"relative",zIndex:"1"}},()=>{Z({textContent:"Build High-Performance UIs"}),Z({class:"text-gradient",textContent:"Without the Virtual DOM"})}),s({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6",position:"relative",zIndex:"1"},textContent:"Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."}),Z({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)",position:"relative",zIndex:"1"}},()=>{m({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),O({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})}),Z({class:"animate-float",style:{position:"absolute",top:"10%",left:"5%",width:"60px",height:"60px",borderRadius:"1rem",background:"linear-gradient(135deg, var(--mongo-green), var(--mongo-forest))",opacity:"0.2",boxShadow:"0 10px 30px rgba(0,237,100,0.2)",zIndex:"0",transform:"rotate(45deg)"}}),Z({class:"animate-float-delayed",style:{position:"absolute",bottom:"10%",right:"5%",width:"80px",height:"80px",borderRadius:"50%",border:"2px solid var(--mongo-green)",opacity:"0.1",zIndex:"0"}}),Z({class:"animate-float",style:{position:"absolute",top:"15%",right:"15%",width:"20px",height:"20px",borderRadius:"50%",background:"var(--mongo-green)",opacity:"0.2",boxShadow:"0 0 20px var(--mongo-green)",zIndex:"0",animationDelay:"1s"}}),Z({class:"animate-float-delayed",style:{position:"absolute",bottom:"25%",left:"10%",width:"120px",height:"120px",borderRadius:"50%",background:"radial-gradient(circle, var(--mongo-green) 0%, transparent 70%)",opacity:"0.1",zIndex:"0",filter:"blur(20px)",animationDelay:"2s"}}),Z({class:"animate-float",style:{position:"absolute",top:"45%",right:"8%",width:"40px",height:"40px",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"8px",transform:"rotate(15deg) translateZ(-20px)",opacity:"0.3",zIndex:"0",animationDelay:"3s"}})});function v(f,F=10){let M,L=()=>{M=f.getBoundingClientRect(),f.style.transition="transform 0.1s ease-out"},D=(X)=>{if(!M)M=f.getBoundingClientRect();let q=X.clientX-M.left,Q=X.clientY-M.top,I=M.width/2,w=M.height/2,u=(Q-w)/w*-F,C=(q-I)/I*F;f.style.transform=`
            perspective(1000px)
            rotateX(${u}deg)
            rotateY(${C}deg)
            scale3d(1.02, 1.02, 1.02)
        `},H=()=>{f.style.transition="transform 0.5s ease-out",f.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"};return f.addEventListener("mouseenter",L),f.addEventListener("mousemove",D),f.addEventListener("mouseleave",H),()=>{f.removeEventListener("mouseenter",L),f.removeEventListener("mousemove",D),f.removeEventListener("mouseleave",H)}}var G=(f)=>{A().appendChild(document.createTextNode(f))},j0=()=>Z({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{Z({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6",transformStyle:"preserve-3d"}},(f)=>{v(f,5),Z({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7",transform:"translateZ(20px)"}},()=>{Z({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),Z({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),Z({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let F=(H)=>j({style:{color:"var(--syntax-keyword)"},textContent:H}),M=(H)=>j({style:{color:"var(--syntax-function)"},textContent:H}),L=(H)=>j({style:{color:"var(--syntax-string)"},textContent:H}),D=(H)=>j({style:{color:"var(--syntax-comment)"},textContent:H});p({style:{transform:"translateZ(40px)"}},()=>{Z(()=>{F("import"),G(" { $, div, button } "),F("from"),L(' "fia"'),G(";")}),G(" "),Z(()=>{F("const"),G(" count = "),M("$"),G("(0);")}),G(" "),Z(()=>{M("div"),G("(() => {")}),Z({style:{paddingLeft:"1.5rem"}},()=>{M("button"),G("({ ")}),Z({style:{paddingLeft:"3rem"}},()=>{Z({textContent:"onclick: () => count.value++,"})}),Z({style:{paddingLeft:"3rem"}},()=>{G("textContent: "),L('"Increment"')}),Z({style:{paddingLeft:"1.5rem"}},()=>{G("});")}),G(" "),Z({style:{paddingLeft:"1.5rem"}},()=>{D("// Updates are surgical - no VDOM diffing")}),Z({style:{paddingLeft:"1.5rem"}},()=>{M("div"),G("({ "),G("textContent"),G(": "),M("$"),G("(() => "),L("`Count: ${count.value}`"),G(") });")}),Z({textContent:"});"})})})});var f0=(f,F,M)=>Z({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.1s ease-out",transformStyle:"preserve-3d"}},(L)=>{v(L,15),Z({style:{fontSize:"2.5rem",marginBottom:"1rem",transform:"translateZ(20px)"},textContent:M}),S({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600",transform:"translateZ(10px)"},textContent:f}),s({style:{color:"var(--text-secondary)",lineHeight:"1.6",transform:"translateZ(5px)"},textContent:F})}),G0=()=>i({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{f0("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),f0("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),f0("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var K0=()=>J0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{Z({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{Z({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var T=(f)=>{A().appendChild(document.createTextNode(f))},y0=(f)=>{f.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((M)=>{if(M.startsWith("//"))j({style:{color:"var(--syntax-comment)"},textContent:M});else if(M.startsWith('"')||M.startsWith("'")||M.startsWith("`"))j({style:{color:"var(--syntax-string)"},textContent:M});else if(["const","import","from","function","return","if","else","true","false"].includes(M))j({style:{color:"var(--syntax-keyword)"},textContent:M});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(M))j({style:{color:"var(--syntax-function)"},textContent:M});else T(M)})},J=(f)=>Z({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{Z({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{Z({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{Z({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),Z({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),Z({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=$(!1);m({textContent:$(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:$(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(f),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),p({style:{margin:"0",overflowX:"auto"}},()=>{y0(f)})}),N=(f,F,M)=>{i({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{Z({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{Z({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),Q0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:f})}),M()})},W=(f,F)=>{Z({style:{marginBottom:"2.5rem"}},()=>{S({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:f}),F()})},U=(f,F)=>{Z({style:{marginBottom:"1.5rem"}},()=>{P({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:f}),F()})},Y=(f)=>s({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>T(f)),$0=(f)=>e({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{f.forEach((F)=>x({textContent:F}))}),N0=(f,F="info")=>Z({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>T(f)),w0=()=>Z({id:"docs",class:"container",style:{maxWidth:"800px",margin:"0 auto",paddingBottom:"var(--spacing-xl)"}},()=>{Z({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{O({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{l({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),O({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{l({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),N("Introduction","intro",()=>{Y("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),N("Why Fia?","why-fia",()=>{Y("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),e({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{x({style:{marginBottom:"0.5rem"}},()=>{j({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),T("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),x({style:{marginBottom:"0.5rem"}},()=>{j({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),T("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),x({style:{marginBottom:"0.5rem"}},()=>{j({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),T("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),x({style:{marginBottom:"0.5rem"}},()=>{j({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),T("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),N("Getting Started","getting-started",()=>{W("Prerequisites",()=>{Y("Fia is compatible with any modern JavaScript runtime."),$0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),W("Installation",()=>{Y("Fia is published on JSR. Install it using your preferred package manager:"),Z({style:{marginBottom:"1rem"}},()=>{P({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),J("deno add jsr:@fia/core")}),Z({style:{marginBottom:"1rem"}},()=>{P({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),Y('1. Create .npmrc file: echo "@jsr:registry=https://npm.jsr.io" > .npmrc'),Y("2. Install (aliased as 'fia'):"),J("bun add fia@npm:@jsr/fia__core")}),Z({style:{marginBottom:"1rem"}},()=>{P({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),J("npx jsr add @fia/core")}),N0("The 'bun' command above automatically aliases the package to 'fia'. For Node.js/Deno, mapping to 'fia' in package.json/deno.json is recommended for cleaner imports.","info")}),W("Updating",()=>{Y("To update to the latest version, run the installation command again (or use your package manager's update command)."),J(`# Deno
deno add jsr:@fia/core

# Bun
bun add fia@npm:@jsr/fia__core

# Node.js
npx jsr add @fia/core`)}),W("Quick Start",()=>{Y("Create your first reactive app in seconds."),J(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),W("Mounting",()=>{Y("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),J(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),N("Element API","element-api",()=>{Y("Fia elements have a simple, consistent API. Functions match HTML tag names."),J(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),U("Text Content",()=>{Y("Use the native textContent prop for static or reactive text."),J(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),U("Event Handlers",()=>{Y("Event handlers are delegated automatically for performance."),J(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),U("Nesting Elements",()=>{Y("Use a callback function to nest elements."),J(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),U("Void Elements",()=>{Y("Elements like input, img, br only accept props."),J(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),U("onMount Callback",()=>{Y("Access layout properties after the element is in the DOM."),J(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),N("Reactivity","reactivity",()=>{W("Signals",()=>{Y("Signals are the primitive units of reactivity."),J(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),W("Reactive Stores",()=>{Y("Fia stores are immutable by default for predictability."),J(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),N0("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),W("Computed Values",()=>{Y("Computed signals automatically track dependencies and update when they change."),J(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),W("Effects",()=>{Y("Use $e() to run side effects when dependencies change."),J(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),N("Immutability","immutability",()=>{Y("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),W("Working with Immutable State",()=>{Y("When a store is immutable, you update state by replacing objects, not mutating properties."),J(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),N("Control Flow","control-flow",()=>{W("Show",()=>{Y("Conditionally render content that updates when the condition changes."),J('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),W("Each",()=>{Y("Reactive list rendering that re-renders efficiently."),J(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),W("Match",()=>{Y("Reactive pattern matching for switch/case logic."),J(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),N("Component Composition","components",()=>{Y("In Fia, components are just functions. There is no special class or type."),W("Basic Component",()=>{J(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),W("Children & Layouts",()=>{Y("To create wrapper components, pass a callback function as a child prop."),J(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),N("SVG","svg",()=>{Y("Fia supports SVG elements with full type safety."),J(`import { svg, svgCircle } from "fia";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),N("Performance","performance",()=>{$0(["Event Delegation: Single listener per event type.","Automatic Batching: DOM updates are batched via standard event loop microtasks.","Fragment Insertion: Children are collected in DocumentFragments before insertion."])}),N("Examples","examples",()=>{W("\uD83D\uDFE2 Beginner",()=>{U("1. Hello World",()=>{Y("The simplest possible Fia code."),J('h1({ textContent: "Hello, World!" });')}),U("2. Counter",()=>{Y("Signals hold reactive state."),J(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),U("3. Toggle",()=>{Y("Computed signals derive values from other signals."),J(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),U("4. Input Binding",()=>{Y("Two-way binding is manual but explicit."),J('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),U("5. List Rendering (Static)",()=>{Y("For simple static lists, forEach works fine."),J(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),W("\uD83D\uDFE1 Intermediate",()=>{U("6. Reactive Store Counter",()=>{Y("Objects passed to $() become reactive stores."),J(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),U("7. Conditional Classes",()=>{Y("Computed signals work in class props too."),J(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),U("8. Form Handling",()=>{Y("Reactive stores are perfect for forms."),J(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),U("9. Computed Values",()=>{Y("Track dependencies automatically."),J('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),U("10. Dynamic Styling",()=>{Y("Reactive styles allow theming."),J(`const theme = $("light");

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
});`)})}),W("\uD83D\uDD34 Advanced",()=>{U("11. Todo App",()=>{Y("A complete todo app using Each."),J(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),U("12. Tabs Component",()=>{Y("Track active index and conditionally render."),J(`const tabs = ["Home", "About", "Contact"];
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
});`)}),U("13. Async Data Fetching",()=>{Y("Use Match for loading states."),J(`const state = $({
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
});`)}),U("14. Modal Dialog",()=>{Y("Modal patterns with explicit types."),J(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})});var _0=()=>{let f=$(0),F=$(0),M=$(0);return document.addEventListener("mousemove",(L)=>{f.value=L.clientX,F.value=L.clientY,M.value=1}),document.addEventListener("mouseout",()=>{M.value=0}),Z({style:{position:"fixed",top:"0",left:"0",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle, rgba(0, 237, 100, 0.15) 0%, transparent 60%)",transform:$(()=>`translate(${f.value-200}px, ${F.value-200}px)`),pointerEvents:"none",zIndex:"9999",mixBlendMode:"screen",filter:"blur(30px)",opacity:$(()=>M.value.toString()),transition:"opacity 0.3s ease",willChange:"transform"}})};var b0=()=>Z({id:"landing-page"},()=>{_0(),I0(),W0(),j0(),G0(),w0(),K0()});b0();
