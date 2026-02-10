var $=void 0,h=0,l=0,T=void 0;function g(z){if($)z.subs.add($),$.deps.add(z)}function b(z){z.version=++h;let F=[...z.subs];for(let H of F)if(l>0){if(!T)T=new Set;T.add(H)}else H.execute()}function k(z){for(let F of z.deps)F.subs.delete(z);z.deps.clear()}function P(z){let F=!0,H={execute(){if(!F)return;k(H);let U=$;$=H;try{z()}finally{$=U}},deps:new Set,cleanup(){F=!1,k(H)}};return H.execute(),()=>H.cleanup()}function N0(z){let F={version:h,subs:new Set},H=z,U=function(I){if(arguments.length>0){if(!Object.is(H,I))H=I,b(F);return}return g(F),H};return Object.defineProperty(U,"value",{get(){return g(F),H},set(I){if(!Object.is(H,I))H=I,b(F)}}),U[v]=!0,U.peek=()=>H,U}function $0(z){let F={version:h,subs:new Set},H,U=-1,I={execute(){F.version=++h;let G=[...F.subs];for(let j of G)if(l>0){if(!T)T=new Set;T.add(j)}else j.execute()},deps:new Set,cleanup(){k(I)}},J=()=>{k(I);let G=$;$=I;try{let j=z();if(!Object.is(H,j))H=j;U=F.version}finally{$=G}};J();let q=function(){if(U!==F.version)J();return g(F),H};return Object.defineProperty(q,"value",{get(){return q()}}),q[v]=!0,q.peek=()=>{if(U!==F.version)J();return H},q}var p=Symbol("reactive-proxy"),C=Symbol("raw");function _0(z){return z!==null&&typeof z==="object"&&p in z}function e(z){let F=new Map,H=new WeakMap;function U(J){let q=F.get(J);if(!q)q={version:0,subs:new Set},F.set(J,q);return q}return new Proxy(z,{get(J,q,G){if(q===C||q==="$raw")return J;if(q===p)return!0;let j=U(q);g(j);let X=Reflect.get(J,q,G);if(X!==null&&typeof X==="object"&&!_0(X)){let A=H.get(X);if(!A)A=e(X),H.set(X,A);return A}return X},set(J,q,G,j){let X=Reflect.get(J,q,j),A=G!==null&&typeof G==="object"&&C in G?G[C]:G,L0=Array.isArray(J)&&q==="length";if(Object.is(X,A)&&!L0)return!0;if(Reflect.set(J,q,A,j),X!==null&&typeof X==="object")H.delete(X);let t=F.get(q);if(t)b(t);return!0},has(J,q){if(q===p||q===C||q==="$raw")return!0;return Reflect.has(J,q)},ownKeys(J){return Reflect.ownKeys(J)},getOwnPropertyDescriptor(J,q){return Reflect.getOwnPropertyDescriptor(J,q)},deleteProperty(J,q){let G=Reflect.has(J,q),j=Reflect.deleteProperty(J,q);if(G&&j){let X=F.get(q);if(X)b(X)}return j}})}function B(z,...F){if(typeof z==="function")return $0(z);if(z!==null&&typeof z==="object")return e(z);return N0(z)}var v=Symbol("signal");function O(z){return typeof z==="function"&&z[v]===!0}var y=[];function i(z){y.push(z)}function u(){y.pop()}function w(){return y[y.length-1]??document.body}var O0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),s=new WeakMap,z0=new Set;function w0(z){let{target:F,type:H}=z;while(F){let U=s.get(F);if(U&&U[H]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:F}),U[H](z),z.cancelBubble)break}F=F.parentElement}}function F0(z,F,H){if(O0.has(F)){if(!z0.has(F))document.addEventListener(F,w0,{capture:!1,passive:!1}),z0.add(F);let U=s.get(z);if(!U)U={},s.set(z,U);U[F]=H}else z.addEventListener(F,H)}if(typeof window<"u")window.__eventHandlerMap=s;var n={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function A0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function R0(z,F,H){switch(F){case"value":if("value"in z)z.value=String(H??"");break;case"checked":if("checked"in z)z.checked=Boolean(H);break;case"selected":if("selected"in z)z.selected=Boolean(H);break;case"muted":if("muted"in z)z.muted=Boolean(H);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(H??0);break;case"volume":if("volume"in z)z.volume=Number(H??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(H);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(H??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(H);break;case"textContent":z.textContent=String(H??"");break;case"innerText":z.innerText=String(H??"");break}}function f0(z,F,H){if(F==="class")T0(z,H);else if(F==="style")x0(z,H);else if(A0(F))R0(z,F,H);else if(typeof H==="boolean")if(H)z.setAttribute(n[F]??F,"");else z.removeAttribute(n[F]??F);else z.setAttribute(n[F]??F,String(H))}function W0(z,F){for(let H in F){let U=F[H];if(U===null||U===void 0)continue;if(H.startsWith("on")&&typeof U==="function"){let I=H.slice(2).toLowerCase();F0(z,I,U)}else if(O(U))P(()=>f0(z,H,U.value));else f0(z,H,U)}}function T0(z,F){if(typeof F==="string")z.className=F;else if(typeof F==="object"&&F!==null){let H=!1;for(let I in F)if(O(F[I])){H=!0;break}let U=()=>{let I=[];for(let J in F){let q=F[J];if(O(q)?q.value:q)I.push(J)}z.className=I.join(" ")};if(H)P(U);else U()}}function B0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function c(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let F=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${F} / ${z.alpha})`:`color(${z.space} ${F})`}case"color-mix":{let F=typeof z.color1==="object"?c(z.color1):z.color1,H=typeof z.color2==="object"?c(z.color2):z.color2,U=z.percentage1!==void 0?`${z.percentage1}%`:"",I=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${F} ${U}, ${H} ${I})`}}}function H0(z){if(z===null||z===void 0)return"";if(B0(z))return c(z);return String(z)}function U0(z,F,H){if(F.startsWith("--")){z.setProperty(F,H);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let U=F.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(U,H);return}try{z[F]=H}catch{z.setProperty(F,H)}}function x0(z,F){if(typeof F==="string")z.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let H=!1;for(let U in F)if(O(F[U])){H=!0;break}if(H)P(()=>{for(let U in F){let I=F[U],J=O(I)?I.value:I;U0(z.style,U,H0(J))}});else for(let U in F){let I=F[U];U0(z.style,U,H0(I))}}}function f(z){return(F,H)=>{let U=document.createElement(z),I,J;if(F===void 0);else if(P0(F))J=F;else if(V0(F)){if(I=F,H!==void 0)J=H}if(I)W0(U,I);let q=[],G=(j)=>q.push(j);if(J){let j=document.createDocumentFragment();i(j);try{J(U,G)}finally{u()}U.appendChild(j)}if(w().appendChild(U),q.length>0)requestAnimationFrame(()=>{for(let j of q)j()});return U}}function L(z){return(F)=>{let H=document.createElement(z);if(F)W0(H,F);return w().appendChild(H),H}}function V0(z){return typeof z==="object"&&z!==null&&!O(z)&&!Array.isArray(z)}function P0(z){return typeof z==="function"&&!O(z)}var _=f("a"),m0=f("abbr"),p0=f("address"),v0=L("area"),i0=f("article"),u0=f("aside"),n0=f("audio"),c0=f("b"),o0=L("base"),a0=f("bdi"),r0=f("bdo"),t0=f("blockquote"),l0=f("body"),e0=L("br"),E=f("button"),z1=f("canvas"),F1=f("caption"),f1=f("cite"),H1=f("code"),U1=L("col"),W1=f("colgroup"),q1=f("data"),I1=f("datalist"),Q1=f("dd"),Z1=f("del"),J1=f("details"),j1=f("dfn"),D1=f("dialog"),W=f("div"),G1=f("dl"),K1=f("dt"),M1=f("em"),X1=L("embed"),Y1=f("fieldset"),L1=f("figcaption"),N1=f("figure"),q0=f("footer"),$1=f("form"),I0=f("h1"),Q0=f("h2"),S=f("h3"),Z0=f("h4"),_1=f("h5"),O1=f("h6"),w1=f("head"),J0=f("header"),A1=f("hgroup"),R1=L("hr"),T1=f("html"),B1=f("i"),x1=f("iframe"),o=L("img"),V1=L("input"),P1=f("ins"),C1=f("kbd"),h1=f("label"),g1=f("legend"),x=f("li"),b1=L("link"),k1=f("main"),y1=f("map"),s1=f("mark"),E1=f("menu"),S1=L("meta"),d1=f("meter"),j0=f("nav"),m1=f("noscript"),p1=f("object"),v1=f("ol"),i1=f("optgroup"),u1=f("option"),n1=f("output"),V=f("p"),c1=f("picture"),d=f("pre"),o1=f("progress"),a1=f("q"),r1=f("rp"),t1=f("rt"),l1=f("ruby"),e1=f("s"),zz=f("samp"),Fz=f("script"),fz=f("search"),m=f("section"),Hz=f("select"),Uz=f("slot"),Wz=f("small"),qz=L("source"),K=f("span"),Iz=f("strong"),Qz=f("style"),Zz=f("sub"),Jz=f("summary"),jz=f("sup"),Dz=f("table"),Gz=f("tbody"),Kz=f("td"),Mz=f("template"),Xz=f("textarea"),Yz=f("tfoot"),Lz=f("th"),Nz=f("thead"),$z=f("time"),_z=f("title"),Oz=f("tr"),wz=L("track"),Az=f("u"),a=f("ul"),Rz=f("var"),Tz=f("video"),Bz=L("wbr");var D0=()=>j0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{W({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{K({style:{color:"var(--mongo-green)"},textContent:"fia"})}),W({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{_({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),_({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),_({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var G0=()=>J0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px"}},()=>{I0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em"}},()=>{W({textContent:"Build High-Performance UIs"}),W({class:"text-gradient",textContent:"Without the Virtual DOM"})}),V({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6"},textContent:"Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."}),W({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)"}},()=>{E({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),_({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})})});var Y=(z)=>{w().appendChild(document.createTextNode(z))},K0=()=>W({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{W({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6"}},()=>{W({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7"}},()=>{W({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),W({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),W({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let z=(I)=>K({style:{color:"var(--syntax-keyword)"},textContent:I}),F=(I)=>K({style:{color:"var(--syntax-function)"},textContent:I}),H=(I)=>K({style:{color:"var(--syntax-string)"},textContent:I}),U=(I)=>K({style:{color:"var(--syntax-comment)"},textContent:I});d(()=>{W(()=>{z("import"),Y(" { $, div, button } "),z("from"),H(' "fia"'),Y(";")}),Y(" "),W(()=>{z("const"),Y(" count = "),F("$"),Y("(0);")}),Y(" "),W(()=>{F("div"),Y("(() => {")}),W({style:{paddingLeft:"1.5rem"}},()=>{F("button"),Y("({ ")}),W({style:{paddingLeft:"3rem"}},()=>{Y("onclick: () => count.value++,")}),W({style:{paddingLeft:"3rem"}},()=>{Y("textContent: "),H('"Increment"')}),W({style:{paddingLeft:"1.5rem"}},()=>{Y("});")}),Y(" "),W({style:{paddingLeft:"1.5rem"}},()=>{U("// Updates are surgical - no VDOM diffing")}),W({style:{paddingLeft:"1.5rem"}},()=>{F("div"),Y("(() => "),H("`Count: ${count.value}`"),Y(");")}),W({textContent:"});"})})})});var r=(z,F,H)=>W({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.2s ease, background 0.2s ease"}},(U)=>{U.onmouseenter=()=>{U.style.transform="translateY(-5px)",U.style.background="rgba(255,255,255,0.05)"},U.onmouseleave=()=>{U.style.transform="translateY(0)",U.style.background="rgba(255,255,255,0.03)"},W({style:{fontSize:"2.5rem",marginBottom:"1rem"},textContent:H}),S({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600"},textContent:z}),V({style:{color:"var(--text-secondary)",lineHeight:"1.6"},textContent:F})}),M0=()=>m({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{r("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),r("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),r("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var X0=()=>q0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{W({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{W({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var R=(z)=>{w().appendChild(document.createTextNode(z))},C0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((H)=>{if(H.startsWith("//"))K({style:{color:"var(--syntax-comment)"},textContent:H});else if(H.startsWith('"')||H.startsWith("'")||H.startsWith("`"))K({style:{color:"var(--syntax-string)"},textContent:H});else if(["const","import","from","function","return","if","else","true","false"].includes(H))K({style:{color:"var(--syntax-keyword)"},textContent:H});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(H))K({style:{color:"var(--syntax-function)"},textContent:H});else R(H)})},Z=(z)=>W({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{W({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{W({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{W({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),W({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),W({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=B(!1);E({textContent:B(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:B(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),d({style:{margin:"0",overflowX:"auto"}},()=>{C0(z)})}),N=(z,F,H)=>{m({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{W({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{W({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),Q0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),H()})},M=(z,F)=>{W({style:{marginBottom:"2.5rem"}},()=>{S({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),F()})},D=(z,F)=>{W({style:{marginBottom:"1.5rem"}},()=>{Z0({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),F()})},Q=(z)=>V({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>R(z)),h0=(z)=>a({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((F)=>x({textContent:F}))}),g0=(z,F="info")=>W({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>R(z)),Y0=()=>W({id:"docs",class:"container",style:{maxWidth:"800px",margin:"0 auto",paddingBottom:"var(--spacing-xl)"}},()=>{W({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{_({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{o({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),_({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{o({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),N("Introduction","intro",()=>{Q("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),N("Why Fia?","why-fia",()=>{Q("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),a({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{x({style:{marginBottom:"0.5rem"}},()=>{K({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),R("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),x({style:{marginBottom:"0.5rem"}},()=>{K({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),R("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),x({style:{marginBottom:"0.5rem"}},()=>{K({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),R("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),x({style:{marginBottom:"0.5rem"}},()=>{K({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),R("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),N("Getting Started","getting-started",()=>{M("Installation",()=>{Q("Import directly from JSR. No build step required."),Z('import { $, div, h1, button, p } from "jsr:@fia/core";')}),M("Quick Start",()=>{Q("Create your first reactive app in seconds."),Z(`import { $, div, h1, button, p } from "jsr:@fia/core";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),M("Mounting",()=>{Q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),Z(`import { mount, div } from "@fia/core";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),N("Element API","element-api",()=>{Q("Fia elements have a simple, consistent API. Functions match HTML tag names."),Z(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),D("Text Content",()=>{Q("Use the native textContent prop for static or reactive text."),Z(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),D("Event Handlers",()=>{Q("Event handlers are delegated automatically for performance."),Z(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),D("Nesting Elements",()=>{Q("Use a callback function to nest elements."),Z(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),D("Void Elements",()=>{Q("Elements like input, img, br only accept props."),Z(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),D("onMount Callback",()=>{Q("Access layout properties after the element is in the DOM."),Z(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),N("Reactivity","reactivity",()=>{M("Signals",()=>{Q("Signals are the primitive units of reactivity."),Z(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),M("Reactive Stores",()=>{Q("Fia stores are immutable by default for predictability."),Z(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),g0("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),M("Computed Values",()=>{Q("Computed signals automatically track dependencies and update when they change."),Z(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),M("Effects",()=>{Q("Use $e() to run side effects when dependencies change."),Z(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),N("Immutability","immutability",()=>{Q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),M("Working with Immutable State",()=>{Q("When a store is immutable, you update state by replacing objects, not mutating properties."),Z(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),N("Control Flow","control-flow",()=>{M("Show",()=>{Q("Conditionally render content that updates when the condition changes."),Z('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),M("Each",()=>{Q("Reactive list rendering that re-renders efficiently."),Z(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),M("Match",()=>{Q("Reactive pattern matching for switch/case logic."),Z(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),N("Component Composition","components",()=>{Q("In Fia, components are just functions. There is no special class or type."),M("Basic Component",()=>{Z(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),M("Children & Layouts",()=>{Q("To create wrapper components, pass a callback function as a child prop."),Z(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),N("SVG","svg",()=>{Q("Fia supports SVG elements with full type safety."),Z(`import { svg, svgCircle } from "@fia/core";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),N("Performance","performance",()=>{h0(["Event Delegation: Single listener per event type.","Automatic Batching: DOM updates are batched via standard event loop microtasks.","Fragment Insertion: Children are collected in DocumentFragments before insertion."])}),N("Examples","examples",()=>{M("\uD83D\uDFE2 Beginner",()=>{D("1. Hello World",()=>{Q("The simplest possible Fia code."),Z('h1({ textContent: "Hello, World!" });')}),D("2. Counter",()=>{Q("Signals hold reactive state."),Z(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),D("3. Toggle",()=>{Q("Computed signals derive values from other signals."),Z(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),D("4. Input Binding",()=>{Q("Two-way binding is manual but explicit."),Z('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),D("5. List Rendering (Static)",()=>{Q("For simple static lists, forEach works fine."),Z(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),M("\uD83D\uDFE1 Intermediate",()=>{D("6. Reactive Store Counter",()=>{Q("Objects passed to $() become reactive stores."),Z(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),D("7. Conditional Classes",()=>{Q("Computed signals work in class props too."),Z(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),D("8. Form Handling",()=>{Q("Reactive stores are perfect for forms."),Z(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),D("9. Computed Values",()=>{Q("Track dependencies automatically."),Z('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),D("10. Dynamic Styling",()=>{Q("Reactive styles allow theming."),Z(`const theme = $("light");

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
});`)})}),M("\uD83D\uDD34 Advanced",()=>{D("11. Todo App",()=>{Q("A complete todo app using Each."),Z(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),D("12. Tabs Component",()=>{Q("Track active index and conditionally render."),Z(`const tabs = ["Home", "About", "Contact"];
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
});`)}),D("13. Async Data Fetching",()=>{Q("Use Match for loading states."),Z(`const state = $({
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
});`)}),D("14. Modal Dialog",()=>{Q("Modal patterns with explicit types."),Z(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})});var b0=()=>W({id:"landing-page"},()=>{D0(),G0(),K0(),M0(),Y0(),X0()});b0();
