var $=void 0,h=0,l=0,T=void 0;function g(z){if($)z.subs.add($),$.deps.add(z)}function b(z){z.version=++h;let F=[...z.subs];for(let W of F)if(l>0){if(!T)T=new Set;T.add(W)}else W.execute()}function k(z){for(let F of z.deps)F.subs.delete(z);z.deps.clear()}function P(z){let F=!0,W={execute(){if(!F)return;k(W);let f=$;$=W;try{z()}finally{$=f}},deps:new Set,cleanup(){F=!1,k(W)}};return W.execute(),()=>W.cleanup()}function N0(z){let F={version:h,subs:new Set},W=z,f=function(I){if(arguments.length>0){if(!Object.is(W,I))W=I,b(F);return}return g(F),W};return Object.defineProperty(f,"value",{get(){return g(F),W},set(I){if(!Object.is(W,I))W=I,b(F)}}),f[v]=!0,f.peek=()=>W,f}function $0(z){let F={version:h,subs:new Set},W,f=-1,I={execute(){F.version=++h;let K=[...F.subs];for(let j of K)if(l>0){if(!T)T=new Set;T.add(j)}else j.execute()},deps:new Set,cleanup(){k(I)}},J=()=>{k(I);let K=$;$=I;try{let j=z();if(!Object.is(W,j))W=j;f=F.version}finally{$=K}};J();let q=function(){if(f!==F.version)J();return g(F),W};return Object.defineProperty(q,"value",{get(){return q()}}),q[v]=!0,q.peek=()=>{if(f!==F.version)J();return W},q}var p=Symbol("reactive-proxy"),C=Symbol("raw");function _0(z){return z!==null&&typeof z==="object"&&p in z}function e(z){let F=new Map,W=new WeakMap;function f(J){let q=F.get(J);if(!q)q={version:0,subs:new Set},F.set(J,q);return q}return new Proxy(z,{get(J,q,K){if(q===C||q==="$raw")return J;if(q===p)return!0;let j=f(q);g(j);let Y=Reflect.get(J,q,K);if(Y!==null&&typeof Y==="object"&&!_0(Y)){let A=W.get(Y);if(!A)A=e(Y),W.set(Y,A);return A}return Y},set(J,q,K,j){let Y=Reflect.get(J,q,j),A=K!==null&&typeof K==="object"&&C in K?K[C]:K,L0=Array.isArray(J)&&q==="length";if(Object.is(Y,A)&&!L0)return!0;if(Reflect.set(J,q,A,j),Y!==null&&typeof Y==="object")W.delete(Y);let t=F.get(q);if(t)b(t);return!0},has(J,q){if(q===p||q===C||q==="$raw")return!0;return Reflect.has(J,q)},ownKeys(J){return Reflect.ownKeys(J)},getOwnPropertyDescriptor(J,q){return Reflect.getOwnPropertyDescriptor(J,q)},deleteProperty(J,q){let K=Reflect.has(J,q),j=Reflect.deleteProperty(J,q);if(K&&j){let Y=F.get(q);if(Y)b(Y)}return j}})}function B(z,...F){if(typeof z==="function")return $0(z);if(z!==null&&typeof z==="object")return e(z);return N0(z)}var v=Symbol("signal");function O(z){return typeof z==="function"&&z[v]===!0}var y=[];function i(z){y.push(z)}function u(){y.pop()}function w(){return y[y.length-1]??document.body}var O0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),s=new WeakMap,z0=new Set;function w0(z){let{target:F,type:W}=z;while(F){let f=s.get(F);if(f&&f[W]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:F}),f[W](z),z.cancelBubble)break}F=F.parentElement}}function F0(z,F,W){if(O0.has(F)){if(!z0.has(F))document.addEventListener(F,w0,{capture:!1,passive:!1}),z0.add(F);let f=s.get(z);if(!f)f={},s.set(z,f);f[F]=W}else z.addEventListener(F,W)}if(typeof window<"u")window.__eventHandlerMap=s;var n={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function A0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function R0(z,F,W){switch(F){case"value":if("value"in z)z.value=String(W??"");break;case"checked":if("checked"in z)z.checked=Boolean(W);break;case"selected":if("selected"in z)z.selected=Boolean(W);break;case"muted":if("muted"in z)z.muted=Boolean(W);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(W??0);break;case"volume":if("volume"in z)z.volume=Number(W??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(W);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(W??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(W);break;case"textContent":z.textContent=String(W??"");break;case"innerText":z.innerText=String(W??"");break}}function H0(z,F,W){if(F==="class")T0(z,W);else if(F==="style")x0(z,W);else if(A0(F))R0(z,F,W);else if(typeof W==="boolean")if(W)z.setAttribute(n[F]??F,"");else z.removeAttribute(n[F]??F);else z.setAttribute(n[F]??F,String(W))}function U0(z,F){for(let W in F){let f=F[W];if(f===null||f===void 0)continue;if(W.startsWith("on")&&typeof f==="function"){let I=W.slice(2).toLowerCase();F0(z,I,f)}else if(O(f))P(()=>H0(z,W,f.value));else H0(z,W,f)}}function T0(z,F){if(typeof F==="string")z.className=F;else if(typeof F==="object"&&F!==null){let W=!1;for(let I in F)if(O(F[I])){W=!0;break}let f=()=>{let I=[];for(let J in F){let q=F[J];if(O(q)?q.value:q)I.push(J)}z.className=I.join(" ")};if(W)P(f);else f()}}function B0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function c(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let F=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${F} / ${z.alpha})`:`color(${z.space} ${F})`}case"color-mix":{let F=typeof z.color1==="object"?c(z.color1):z.color1,W=typeof z.color2==="object"?c(z.color2):z.color2,f=z.percentage1!==void 0?`${z.percentage1}%`:"",I=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${F} ${f}, ${W} ${I})`}}}function W0(z){if(z===null||z===void 0)return"";if(B0(z))return c(z);return String(z)}function f0(z,F,W){if(F.startsWith("--")){z.setProperty(F,W);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let f=F.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(f,W);return}try{z[F]=W}catch{z.setProperty(F,W)}}function x0(z,F){if(typeof F==="string")z.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let W=!1;for(let f in F)if(O(F[f])){W=!0;break}if(W)P(()=>{for(let f in F){let I=F[f],J=O(I)?I.value:I;f0(z.style,f,W0(J))}});else for(let f in F){let I=F[f];f0(z.style,f,W0(I))}}}function H(z){return(F,W)=>{let f=document.createElement(z),I,J;if(F===void 0);else if(P0(F))J=F;else if(V0(F)){if(I=F,W!==void 0)J=W}if(I)U0(f,I);let q=[],K=(j)=>q.push(j);if(J){let j=document.createDocumentFragment();i(j);try{J(f,K)}finally{u()}f.appendChild(j)}if(w().appendChild(f),q.length>0)requestAnimationFrame(()=>{for(let j of q)j()});return f}}function L(z){return(F)=>{let W=document.createElement(z);if(F)U0(W,F);return w().appendChild(W),W}}function V0(z){return typeof z==="object"&&z!==null&&!O(z)&&!Array.isArray(z)}function P0(z){return typeof z==="function"&&!O(z)}var _=H("a"),m0=H("abbr"),p0=H("address"),v0=L("area"),i0=H("article"),u0=H("aside"),n0=H("audio"),c0=H("b"),o0=L("base"),a0=H("bdi"),r0=H("bdo"),t0=H("blockquote"),l0=H("body"),e0=L("br"),E=H("button"),z1=H("canvas"),F1=H("caption"),H1=H("cite"),W1=H("code"),f1=L("col"),U1=H("colgroup"),q1=H("data"),I1=H("datalist"),Q1=H("dd"),Z1=H("del"),J1=H("details"),j1=H("dfn"),G1=H("dialog"),U=H("div"),K1=H("dl"),D1=H("dt"),X1=H("em"),Y1=L("embed"),M1=H("fieldset"),L1=H("figcaption"),N1=H("figure"),q0=H("footer"),$1=H("form"),I0=H("h1"),Q0=H("h2"),S=H("h3"),Z0=H("h4"),_1=H("h5"),O1=H("h6"),w1=H("head"),J0=H("header"),A1=H("hgroup"),R1=L("hr"),T1=H("html"),B1=H("i"),x1=H("iframe"),o=L("img"),V1=L("input"),P1=H("ins"),C1=H("kbd"),h1=H("label"),g1=H("legend"),x=H("li"),b1=L("link"),k1=H("main"),y1=H("map"),s1=H("mark"),E1=H("menu"),S1=L("meta"),d1=H("meter"),j0=H("nav"),m1=H("noscript"),p1=H("object"),v1=H("ol"),i1=H("optgroup"),u1=H("option"),n1=H("output"),V=H("p"),c1=H("picture"),d=H("pre"),o1=H("progress"),a1=H("q"),r1=H("rp"),t1=H("rt"),l1=H("ruby"),e1=H("s"),zz=H("samp"),Fz=H("script"),Hz=H("search"),m=H("section"),Wz=H("select"),fz=H("slot"),Uz=H("small"),qz=L("source"),D=H("span"),Iz=H("strong"),Qz=H("style"),Zz=H("sub"),Jz=H("summary"),jz=H("sup"),Gz=H("table"),Kz=H("tbody"),Dz=H("td"),Xz=H("template"),Yz=H("textarea"),Mz=H("tfoot"),Lz=H("th"),Nz=H("thead"),$z=H("time"),_z=H("title"),Oz=H("tr"),wz=L("track"),Az=H("u"),a=H("ul"),Rz=H("var"),Tz=H("video"),Bz=L("wbr");var G0=()=>j0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{U({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{D({style:{color:"var(--mongo-green)"},textContent:"fia"})}),U({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{_({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),_({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),_({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var K0=()=>J0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px"}},()=>{I0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em"}},()=>{U({textContent:"Build High-Performance UIs"}),U({class:"text-gradient",textContent:"Without the Virtual DOM"})}),V({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"600px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6"},textContent:"Fia is a generic, type-safe reactive library. It uses fine-grained signals to update the DOM directly, delivering 0ms overhead and maximum battery life."}),U({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)"}},()=>{E({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),_({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})})});var M=(z)=>{w().appendChild(document.createTextNode(z))},D0=()=>U({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{U({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6"}},()=>{U({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7"}},()=>{U({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),U({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),U({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let z=(I)=>D({style:{color:"var(--syntax-keyword)"},textContent:I}),F=(I)=>D({style:{color:"var(--syntax-function)"},textContent:I}),W=(I)=>D({style:{color:"var(--syntax-string)"},textContent:I}),f=(I)=>D({style:{color:"var(--syntax-comment)"},textContent:I});d(()=>{U(()=>{z("import"),M(" { $, div, button } "),z("from"),W(' "fia"'),M(";")}),M(" "),U(()=>{z("const"),M(" count = "),F("$"),M("(0);")}),M(" "),U(()=>{F("div"),M("(() => {")}),U({style:{paddingLeft:"1.5rem"}},()=>{F("button"),M("({ ")}),U({style:{paddingLeft:"3rem"}},()=>{M("onclick: () => count.value++,")}),U({style:{paddingLeft:"3rem"}},()=>{M("textContent: "),W('"Increment"')}),U({style:{paddingLeft:"1.5rem"}},()=>{M("});")}),M(" "),U({style:{paddingLeft:"1.5rem"}},()=>{f("// Updates are surgical - no VDOM diffing")}),U({style:{paddingLeft:"1.5rem"}},()=>{F("div"),M("(() => "),W("`Count: ${count.value}`"),M(");")}),U({textContent:"});"})})})});var r=(z,F,W)=>U({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.2s ease, background 0.2s ease"}},(f)=>{f.onmouseenter=()=>{f.style.transform="translateY(-5px)",f.style.background="rgba(255,255,255,0.05)"},f.onmouseleave=()=>{f.style.transform="translateY(0)",f.style.background="rgba(255,255,255,0.03)"},U({style:{fontSize:"2.5rem",marginBottom:"1rem"},textContent:W}),S({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600"},textContent:z}),V({style:{color:"var(--text-secondary)",lineHeight:"1.6"},textContent:F})}),X0=()=>m({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{r("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),r("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),r("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var Y0=()=>q0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{U({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{U({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var R=(z)=>{w().appendChild(document.createTextNode(z))},C0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((W)=>{if(W.startsWith("//"))D({style:{color:"var(--syntax-comment)"},textContent:W});else if(W.startsWith('"')||W.startsWith("'")||W.startsWith("`"))D({style:{color:"var(--syntax-string)"},textContent:W});else if(["const","import","from","function","return","if","else","true","false"].includes(W))D({style:{color:"var(--syntax-keyword)"},textContent:W});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(W))D({style:{color:"var(--syntax-function)"},textContent:W});else R(W)})},Z=(z)=>U({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{U({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{U({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{U({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),U({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),U({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=B(!1);E({textContent:B(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:B(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),d({style:{margin:"0",overflowX:"auto"}},()=>{C0(z)})}),N=(z,F,W)=>{m({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{U({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{U({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),Q0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),W()})},X=(z,F)=>{U({style:{marginBottom:"2.5rem"}},()=>{S({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),F()})},G=(z,F)=>{U({style:{marginBottom:"1.5rem"}},()=>{Z0({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),F()})},Q=(z)=>V({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>R(z)),h0=(z)=>a({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((F)=>x({textContent:F}))}),g0=(z,F="info")=>U({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>R(z)),M0=()=>U({id:"docs",class:"container",style:{maxWidth:"800px",margin:"0 auto",paddingBottom:"var(--spacing-xl)"}},()=>{U({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{_({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{o({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),_({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{o({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),N("Introduction","intro",()=>{Q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),N("Why Fia?","why-fia",()=>{Q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),a({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{x({style:{marginBottom:"0.5rem"}},()=>{D({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),R("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),x({style:{marginBottom:"0.5rem"}},()=>{D({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),R("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),x({style:{marginBottom:"0.5rem"}},()=>{D({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),R("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),x({style:{marginBottom:"0.5rem"}},()=>{D({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),R("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),N("Getting Started","getting-started",()=>{X("Installation",()=>{Q("Import directly from JSR. No build step required."),Z('import { $, div, h1, button, p } from "jsr:@fia/core";')}),X("Quick Start",()=>{Q("Create your first reactive app in seconds."),Z(`import { $, div, h1, button, p } from "jsr:@fia/core";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),X("Mounting",()=>{Q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),Z(`import { mount, div } from "@fia/core";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),N("Element API","element-api",()=>{Q("Fia elements have a simple, consistent API. Functions match HTML tag names."),Z(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),G("Text Content",()=>{Q("Use the native textContent prop for static or reactive text."),Z(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),G("Event Handlers",()=>{Q("Event handlers are delegated automatically for performance."),Z(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),G("Nesting Elements",()=>{Q("Use a callback function to nest elements."),Z(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),G("Void Elements",()=>{Q("Elements like input, img, br only accept props."),Z(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),G("onMount Callback",()=>{Q("Access layout properties after the element is in the DOM."),Z(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),N("Reactivity","reactivity",()=>{X("Signals",()=>{Q("Signals are the primitive units of reactivity."),Z(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),X("Reactive Stores",()=>{Q("Fia stores are immutable by default for predictability."),Z(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),g0("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),X("Computed Values",()=>{Q("Computed signals automatically track dependencies and update when they change."),Z(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),X("Effects",()=>{Q("Use $e() to run side effects when dependencies change."),Z(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),N("Immutability","immutability",()=>{Q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),X("Working with Immutable State",()=>{Q("When a store is immutable, you update state by replacing objects, not mutating properties."),Z(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),N("Control Flow","control-flow",()=>{X("Show",()=>{Q("Conditionally render content that updates when the condition changes."),Z('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),X("Each",()=>{Q("Reactive list rendering that re-renders efficiently."),Z(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),X("Match",()=>{Q("Reactive pattern matching for switch/case logic."),Z(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),N("Component Composition","components",()=>{Q("In Fia, components are just functions. There is no special class or type."),X("Basic Component",()=>{Z(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),X("Children & Layouts",()=>{Q("To create wrapper components, pass a callback function as a child prop."),Z(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),N("SVG","svg",()=>{Q("Fia supports SVG elements with full type safety."),Z(`import { svg, svgCircle } from "@fia/core";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),N("Performance","performance",()=>{h0(["Event Delegation: Single listener per event type.","Automatic Batching: DOM updates are batched via standard event loop microtasks.","Fragment Insertion: Children are collected in DocumentFragments before insertion."])}),N("Examples","examples",()=>{X("\uD83D\uDFE2 Beginner",()=>{G("1. Hello World",()=>{Q("The simplest possible Fia code."),Z('h1({ textContent: "Hello, World!" });')}),G("2. Counter",()=>{Q("Signals hold reactive state."),Z(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),G("3. Toggle",()=>{Q("Computed signals derive values from other signals."),Z(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),G("4. Input Binding",()=>{Q("Two-way binding is manual but explicit."),Z('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),G("5. List Rendering (Static)",()=>{Q("For simple static lists, forEach works fine."),Z(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),X("\uD83D\uDFE1 Intermediate",()=>{G("6. Reactive Store Counter",()=>{Q("Objects passed to $() become reactive stores."),Z(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),G("7. Conditional Classes",()=>{Q("Computed signals work in class props too."),Z(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),G("8. Form Handling",()=>{Q("Reactive stores are perfect for forms."),Z(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),G("9. Computed Values",()=>{Q("Track dependencies automatically."),Z('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),G("10. Dynamic Styling",()=>{Q("Reactive styles allow theming."),Z(`const theme = $("light");

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
});`)})}),X("\uD83D\uDD34 Advanced",()=>{G("11. Todo App",()=>{Q("A complete todo app using Each."),Z(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),G("12. Tabs Component",()=>{Q("Track active index and conditionally render."),Z(`const tabs = ["Home", "About", "Contact"];
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
});`)}),G("13. Async Data Fetching",()=>{Q("Use Match for loading states."),Z(`const state = $({
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
});`)}),G("14. Modal Dialog",()=>{Q("Modal patterns with explicit types."),Z(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})});var b0=()=>U({id:"landing-page"},()=>{G0(),K0(),D0(),X0(),M0(),Y0()});b0();
