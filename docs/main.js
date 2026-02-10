var D=void 0,h=0,t=0,T=void 0;function g(z){if(D)z.subs.add(D),D.deps.add(z)}function k(z){z.version=++h;let W=[...z.subs];for(let q of W)if(t>0){if(!T)T=new Set;T.add(q)}else q.execute()}function y(z){for(let W of z.deps)W.subs.delete(z);z.deps.clear()}function P(z){let W=!0,q={execute(){if(!W)return;y(q);let H=D;D=q;try{z()}finally{D=H}},deps:new Set,cleanup(){W=!1,y(q)}};return q.execute(),()=>q.cleanup()}function _0(z){let W={version:h,subs:new Set},q=z,H=function(Z){if(arguments.length>0){if(!Object.is(q,Z))q=Z,k(W);return}return g(W),q};return Object.defineProperty(H,"value",{get(){return g(W),q},set(Z){if(!Object.is(q,Z))q=Z,k(W)}}),H[v]=!0,H.peek=()=>q,H}function D0(z){let W={version:h,subs:new Set},q,H=-1,Z={execute(){W.version=++h;let X=[...W.subs];for(let G of X)if(t>0){if(!T)T=new Set;T.add(G)}else G.execute()},deps:new Set,cleanup(){y(Z)}},F=()=>{y(Z);let X=D;D=Z;try{let G=z();if(!Object.is(q,G))q=G;H=W.version}finally{D=X}};F();let Q=function(){if(H!==W.version)F();return g(W),q};return Object.defineProperty(Q,"value",{get(){return Q()}}),Q[v]=!0,Q.peek=()=>{if(H!==W.version)F();return q},Q}var p=Symbol("reactive-proxy"),C=Symbol("raw");function N0(z){return z!==null&&typeof z==="object"&&p in z}function e(z){let W=new Map,q=new WeakMap;function H(F){let Q=W.get(F);if(!Q)Q={version:0,subs:new Set},W.set(F,Q);return Q}return new Proxy(z,{get(F,Q,X){if(Q===C||Q==="$raw")return F;if(Q===p)return!0;let G=H(Q);g(G);let f=Reflect.get(F,Q,X);if(f!==null&&typeof f==="object"&&!N0(f)){let R=q.get(f);if(!R)R=e(f),q.set(f,R);return R}return f},set(F,Q,X,G){let f=Reflect.get(F,Q,G),R=X!==null&&typeof X==="object"&&C in X?X[C]:X,$0=Array.isArray(F)&&Q==="length";if(Object.is(f,R)&&!$0)return!0;if(Reflect.set(F,Q,R,G),f!==null&&typeof f==="object")q.delete(f);let l=W.get(Q);if(l)k(l);return!0},has(F,Q){if(Q===p||Q===C||Q==="$raw")return!0;return Reflect.has(F,Q)},ownKeys(F){return Reflect.ownKeys(F)},getOwnPropertyDescriptor(F,Q){return Reflect.getOwnPropertyDescriptor(F,Q)},deleteProperty(F,Q){let X=Reflect.has(F,Q),G=Reflect.deleteProperty(F,Q);if(X&&G){let f=W.get(Q);if(f)k(f)}return G}})}function B(z,...W){if(typeof z==="function")return D0(z);if(z!==null&&typeof z==="object")return e(z);return _0(z)}var v=Symbol("signal");function O(z){return typeof z==="function"&&z[v]===!0}var b=[];function i(z){b.push(z)}function u(){b.pop()}function w(){return b[b.length-1]??document.body}var O0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),s=new WeakMap,z0=new Set;function w0(z){let{target:W,type:q}=z;while(W){let H=s.get(W);if(H&&H[q]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:W}),H[q](z),z.cancelBubble)break}W=W.parentElement}}function W0(z,W,q){if(O0.has(W)){if(!z0.has(W))document.addEventListener(W,w0,{capture:!1,passive:!1}),z0.add(W);let H=s.get(z);if(!H)H={},s.set(z,H);H[W]=q}else z.addEventListener(W,q)}if(typeof window<"u")window.__eventHandlerMap=s;var n={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function R0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function A0(z,W,q){switch(W){case"value":if("value"in z)z.value=String(q??"");break;case"checked":if("checked"in z)z.checked=Boolean(q);break;case"selected":if("selected"in z)z.selected=Boolean(q);break;case"muted":if("muted"in z)z.muted=Boolean(q);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(q??0);break;case"volume":if("volume"in z)z.volume=Number(q??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(q);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(q??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(q);break;case"textContent":z.textContent=String(q??"");break;case"innerText":z.innerText=String(q??"");break}}function U0(z,W,q){if(W==="class")T0(z,q);else if(W==="style")x0(z,q);else if(R0(W))A0(z,W,q);else if(typeof q==="boolean")if(q)z.setAttribute(n[W]??W,"");else z.removeAttribute(n[W]??W);else z.setAttribute(n[W]??W,String(q))}function I0(z,W){for(let q in W){let H=W[q];if(H===null||H===void 0)continue;if(q.startsWith("on")&&typeof H==="function"){let Z=q.slice(2).toLowerCase();W0(z,Z,H)}else if(O(H))P(()=>U0(z,q,H.value));else U0(z,q,H)}}function T0(z,W){if(typeof W==="string")z.className=W;else if(typeof W==="object"&&W!==null){let q=!1;for(let Z in W)if(O(W[Z])){q=!0;break}let H=()=>{let Z=[];for(let F in W){let Q=W[F];if(O(Q)?Q.value:Q)Z.push(F)}z.className=Z.join(" ")};if(q)P(H);else H()}}function B0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function c(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let W=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${W} / ${z.alpha})`:`color(${z.space} ${W})`}case"color-mix":{let W=typeof z.color1==="object"?c(z.color1):z.color1,q=typeof z.color2==="object"?c(z.color2):z.color2,H=z.percentage1!==void 0?`${z.percentage1}%`:"",Z=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${W} ${H}, ${q} ${Z})`}}}function q0(z){if(z===null||z===void 0)return"";if(B0(z))return c(z);return String(z)}function H0(z,W,q){if(W.startsWith("--")){z.setProperty(W,q);return}if(W.startsWith("webkit")||W.startsWith("moz")||W.startsWith("ms")||W.startsWith("o")){let H=W.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(H,q);return}try{z[W]=q}catch{z.setProperty(W,q)}}function x0(z,W){if(typeof W==="string")z.setAttribute("style",W);else if(typeof W==="object"&&W!==null){let q=!1;for(let H in W)if(O(W[H])){q=!0;break}if(q)P(()=>{for(let H in W){let Z=W[H],F=O(Z)?Z.value:Z;H0(z.style,H,q0(F))}});else for(let H in W){let Z=W[H];H0(z.style,H,q0(Z))}}}function U(z){return(W,q)=>{let H=document.createElement(z),Z,F;if(W===void 0);else if(P0(W))F=W;else if(V0(W)){if(Z=W,q!==void 0)F=q}if(Z)I0(H,Z);let Q=[],X=(G)=>Q.push(G);if(F){let G=document.createDocumentFragment();i(G);try{F(H,X)}finally{u()}H.appendChild(G)}if(w().appendChild(H),Q.length>0)requestAnimationFrame(()=>{for(let G of Q)G()});return H}}function $(z){return(W)=>{let q=document.createElement(z);if(W)I0(q,W);return w().appendChild(q),q}}function V0(z){return typeof z==="object"&&z!==null&&!O(z)&&!Array.isArray(z)}function P0(z){return typeof z==="function"&&!O(z)}var N=U("a"),m0=U("abbr"),p0=U("address"),v0=$("area"),i0=U("article"),u0=U("aside"),n0=U("audio"),c0=U("b"),a0=$("base"),o0=U("bdi"),r0=U("bdo"),l0=U("blockquote"),t0=U("body"),e0=$("br"),S=U("button"),z1=U("canvas"),W1=U("caption"),U1=U("cite"),q1=U("code"),H1=$("col"),I1=U("colgroup"),Q1=U("data"),Z1=U("datalist"),J1=U("dd"),j1=U("del"),F1=U("details"),G1=U("dfn"),K1=U("dialog"),I=U("div"),X1=U("dl"),Y1=U("dt"),M1=U("em"),f1=$("embed"),L1=U("fieldset"),$1=U("figcaption"),_1=U("figure"),Q0=U("footer"),D1=U("form"),Z0=U("h1"),J0=U("h2"),E=U("h3"),j0=U("h4"),N1=U("h5"),O1=U("h6"),w1=U("head"),F0=U("header"),R1=U("hgroup"),A1=$("hr"),T1=U("html"),B1=U("i"),x1=U("iframe"),a=$("img"),V1=$("input"),P1=U("ins"),C1=U("kbd"),h1=U("label"),g1=U("legend"),x=U("li"),k1=$("link"),y1=U("main"),b1=U("map"),s1=U("mark"),S1=U("menu"),E1=$("meta"),d1=U("meter"),G0=U("nav"),m1=U("noscript"),p1=U("object"),v1=U("ol"),i1=U("optgroup"),u1=U("option"),n1=U("output"),V=U("p"),c1=U("picture"),d=U("pre"),a1=U("progress"),o1=U("q"),r1=U("rp"),l1=U("rt"),t1=U("ruby"),e1=U("s"),zz=U("samp"),Wz=U("script"),Uz=U("search"),m=U("section"),qz=U("select"),Hz=U("slot"),Iz=U("small"),Qz=$("source"),Y=U("span"),Zz=U("strong"),Jz=U("style"),jz=U("sub"),Fz=U("summary"),Gz=U("sup"),Kz=U("table"),Xz=U("tbody"),Yz=U("td"),Mz=U("template"),fz=U("textarea"),Lz=U("tfoot"),$z=U("th"),_z=U("thead"),Dz=U("time"),Nz=U("title"),Oz=U("tr"),wz=$("track"),Rz=U("u"),o=U("ul"),Az=U("var"),Tz=U("video"),Bz=$("wbr");var K0=()=>G0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{I({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{Y({style:{color:"var(--mongo-green)"},textContent:"fia"})}),I({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{N({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),N({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),N({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var X0=()=>F0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px"}},()=>{Z0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em"}},()=>{I({textContent:"Build High-Performance UIs"}),I({class:"text-gradient",textContent:"Without the Virtual DOM"})}),V({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"600px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6"},textContent:"Fia is a generic, type-safe reactive library. It uses fine-grained signals to update the DOM directly, delivering 0ms overhead and maximum battery life."}),I({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)"}},()=>{S({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),N({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})})});var L=(z)=>{w().appendChild(document.createTextNode(z))},Y0=()=>I({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{I({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6"}},()=>{I({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7"}},()=>{I({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),I({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),I({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let z=(Z)=>Y({style:{color:"var(--syntax-keyword)"},textContent:Z}),W=(Z)=>Y({style:{color:"var(--syntax-function)"},textContent:Z}),q=(Z)=>Y({style:{color:"var(--syntax-string)"},textContent:Z}),H=(Z)=>Y({style:{color:"var(--syntax-comment)"},textContent:Z});d(()=>{I(()=>{z("import"),L(" { $, div, button } "),z("from"),q(' "fia"'),L(";")}),L(" "),I(()=>{z("const"),L(" count = "),W("$"),L("(0);")}),L(" "),I(()=>{W("div"),L("(() => {")}),I({style:{paddingLeft:"1.5rem"}},()=>{W("button"),L("({ ")}),I({style:{paddingLeft:"3rem"}},()=>{L("onclick: () => count.value++,")}),I({style:{paddingLeft:"3rem"}},()=>{L("textContent: "),q('"Increment"')}),I({style:{paddingLeft:"1.5rem"}},()=>{L("});")}),L(" "),I({style:{paddingLeft:"1.5rem"}},()=>{H("// Updates are surgical - no VDOM diffing")}),I({style:{paddingLeft:"1.5rem"}},()=>{W("div"),L("(() => "),q("`Count: ${count.value}`"),L(");")}),I({textContent:"});"})})})});var r=(z,W,q)=>I({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.2s ease, background 0.2s ease"}},(H)=>{H.onmouseenter=()=>{H.style.transform="translateY(-5px)",H.style.background="rgba(255,255,255,0.05)"},H.onmouseleave=()=>{H.style.transform="translateY(0)",H.style.background="rgba(255,255,255,0.03)"},I({style:{fontSize:"2.5rem",marginBottom:"1rem"},textContent:q}),E({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600"},textContent:z}),V({style:{color:"var(--text-secondary)",lineHeight:"1.6"},textContent:W})}),M0=()=>m({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{r("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),r("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),r("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var f0=()=>Q0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{I({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{I({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var A=(z)=>{w().appendChild(document.createTextNode(z))},C0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((q)=>{if(q.startsWith("//"))Y({style:{color:"var(--syntax-comment)"},textContent:q});else if(q.startsWith('"')||q.startsWith("'")||q.startsWith("`"))Y({style:{color:"var(--syntax-string)"},textContent:q});else if(["const","import","from","function","return","if","else","true","false"].includes(q))Y({style:{color:"var(--syntax-keyword)"},textContent:q});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(q))Y({style:{color:"var(--syntax-function)"},textContent:q});else A(q)})},j=(z)=>I({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{I({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{I({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{I({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),I({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),I({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let W=B(!1);S({textContent:B(()=>W.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:B(()=>W.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),W.value=!0,setTimeout(()=>W.value=!1,2000)}})}),d({style:{margin:"0",overflowX:"auto"}},()=>{C0(z)})}),_=(z,W,q)=>{m({id:W,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{I({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{I({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),J0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),q()})},M=(z,W)=>{I({style:{marginBottom:"2.5rem"}},()=>{E({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),W()})},K=(z,W)=>{I({style:{marginBottom:"1.5rem"}},()=>{j0({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),W()})},J=(z)=>V({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>A(z)),h0=(z)=>o({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((W)=>x({textContent:W}))}),g0=(z,W="info")=>I({style:{background:W==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${W==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:W==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>A(z)),L0=()=>I({id:"docs",class:"container",style:{maxWidth:"800px",margin:"0 auto",paddingBottom:"var(--spacing-xl)"}},()=>{I({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{N({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{a({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),N({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{a({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),_("Getting Started","getting-started",()=>{M("Installation",()=>{J("Import directly from JSR. No build step required."),j('import { $, div, h1, button, p } from "jsr:@fia/core";')}),M("Quick Start",()=>{J("Create your first reactive app in seconds."),j(`import { $, div, h1, button, p } from "jsr:@fia/core";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),M("Mounting",()=>{J("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),j(`import { mount, div } from "@fia/core";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),_("Philosophy","philosophy",()=>{J("Most frameworks add layers of abstraction between you and the DOM. Fia gives you just enough to be productive:"),o({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{x({style:{marginBottom:"0.5rem"}},()=>{Y({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Reactive values"}),A(" - $() creates signals for primitives, reactive stores for objects")}),x({style:{marginBottom:"0.5rem"}},()=>{Y({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Direct DOM"}),A(" - No virtual DOM, no diffing, just native browser APIs")}),x({style:{marginBottom:"0.5rem"}},()=>{Y({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"~6KB gzipped"}),A(" - Lightweight with zero dependencies")}),x({style:{marginBottom:"0.5rem"}},()=>{Y({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Fully typed"}),A(" - Complete TypeScript support with autocomplete")})})}),_("Element API","element-api",()=>{J("Fia elements have a simple, consistent API. Functions match HTML tag names."),j(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),K("Text Content",()=>{J("Use the native textContent prop for static or reactive text."),j(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),K("Event Handlers",()=>{J("Event handlers are delegated automatically for performance."),j(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),K("Nesting Elements",()=>{J("Use a callback function to nest elements."),j(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),K("Void Elements",()=>{J("Elements like input, img, br only accept props."),j(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),K("onMount Callback",()=>{J("Access layout properties after the element is in the DOM."),j(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),_("Reactivity","reactivity",()=>{M("Signals",()=>{J("Signals are the primitive units of reactivity."),j(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),M("Reactive Stores",()=>{J("Fia stores are immutable by default for predictability."),j(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),g0("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),M("Computed Values",()=>{J("Computed signals automatically track dependencies and update when they change."),j(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),M("Effects",()=>{J("Use $e() to run side effects when dependencies change."),j(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),_("Immutability","immutability",()=>{J("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),M("Working with Immutable State",()=>{J("When a store is immutable, you update state by replacing objects, not mutating properties."),j(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),_("Control Flow","control-flow",()=>{M("Show",()=>{J("Conditionally render content that updates when the condition changes."),j('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),M("Each",()=>{J("Reactive list rendering that re-renders efficiently."),j(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),M("Match",()=>{J("Reactive pattern matching for switch/case logic."),j(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),_("Component Composition","components",()=>{J("In Fia, components are just functions. There is no special class or type."),M("Basic Component",()=>{j(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),M("Children & Layouts",()=>{J("To create wrapper components, pass a callback function as a child prop."),j(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),_("SVG","svg",()=>{J("Fia supports SVG elements with full type safety."),j(`import { svg, svgCircle } from "@fia/core";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),_("Performance","performance",()=>{h0(["Event Delegation: Single listener per event type.","Automatic Batching: DOM updates are batched via standard event loop microtasks.","Fragment Insertion: Children are collected in DocumentFragments before insertion."])}),_("Examples","examples",()=>{M("\uD83D\uDFE2 Beginner",()=>{K("1. Hello World",()=>{J("The simplest possible Fia code."),j('h1({ textContent: "Hello, World!" });')}),K("2. Counter",()=>{J("Signals hold reactive state."),j(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),K("3. Toggle",()=>{J("Computed signals derive values from other signals."),j(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),K("4. Input Binding",()=>{J("Two-way binding is manual but explicit."),j('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),K("5. List Rendering (Static)",()=>{J("For simple static lists, forEach works fine."),j(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),M("\uD83D\uDFE1 Intermediate",()=>{K("6. Reactive Store Counter",()=>{J("Objects passed to $() become reactive stores."),j(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),K("7. Conditional Classes",()=>{J("Computed signals work in class props too."),j(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),K("8. Form Handling",()=>{J("Reactive stores are perfect for forms."),j(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),K("9. Computed Values",()=>{J("Track dependencies automatically."),j('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),K("10. Dynamic Styling",()=>{J("Reactive styles allow theming."),j(`const theme = $("light");

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
});`)})}),M("\uD83D\uDD34 Advanced",()=>{K("11. Todo App",()=>{J("A complete todo app using Each."),j(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),K("12. Tabs Component",()=>{J("Track active index and conditionally render."),j(`const tabs = ["Home", "About", "Contact"];
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
});`)}),K("13. Async Data Fetching",()=>{J("Use Match for loading states."),j(`const state = $({
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
});`)}),K("14. Modal Dialog",()=>{J("Modal patterns with explicit types."),j(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})});var k0=()=>I({id:"landing-page"},()=>{K0(),X0(),Y0(),M0(),L0(),f0()});k0();
