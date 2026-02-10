var P=void 0;function s(z){for(let U of z.deps)U.subs.delete(z);z.deps.clear()}function R(z){let U=!0,q={execute(){if(!U)return;s(q);let H=P;P=q;try{z()}finally{P=H}},deps:new Set,cleanup(){U=!1,s(q)}};return q.execute(),()=>q.cleanup()}var _0=Symbol("reactive-proxy"),D0=Symbol("raw");var I0=Symbol("signal");function L(z){return typeof z==="function"&&z[I0]===!0}var A=[];function C(z){A.push(z)}function h(){A.pop()}function f(){return A[A.length-1]??document.body}var Q0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),T=new WeakMap,d=new Set;function Z0(z){let{target:U,type:q}=z;while(U){let H=T.get(U);if(H&&H[q]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:U}),H[q](z),z.cancelBubble)break}U=U.parentElement}}function m(z,U,q){if(Q0.has(U)){if(!d.has(U))document.addEventListener(U,Z0,{capture:!1,passive:!1}),d.add(U);let H=T.get(z);if(!H)H={},T.set(z,H);H[U]=q}else z.addEventListener(U,q)}if(typeof window<"u")window.__eventHandlerMap=T;var g={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function J0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function j0(z,U,q){switch(U){case"value":if("value"in z)z.value=String(q??"");break;case"checked":if("checked"in z)z.checked=Boolean(q);break;case"selected":if("selected"in z)z.selected=Boolean(q);break;case"muted":if("muted"in z)z.muted=Boolean(q);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(q??0);break;case"volume":if("volume"in z)z.volume=Number(q??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(q);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(q??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(q);break;case"textContent":z.textContent=String(q??"");break;case"innerText":z.innerText=String(q??"");break}}function p(z,U,q){if(U==="class")F0(z,q);else if(U==="style")K0(z,q);else if(J0(U))j0(z,U,q);else if(typeof q==="boolean")if(q)z.setAttribute(g[U]??U,"");else z.removeAttribute(g[U]??U);else z.setAttribute(g[U]??U,String(q))}function u(z,U){for(let q in U){let H=U[q];if(H===null||H===void 0)continue;if(q.startsWith("on")&&typeof H==="function"){let J=q.slice(2).toLowerCase();m(z,J,H)}else if(L(H))R(()=>p(z,q,H.value));else p(z,q,H)}}function F0(z,U){if(typeof U==="string")z.className=U;else if(typeof U==="object"&&U!==null){let q=!1;for(let J in U)if(L(U[J])){q=!0;break}let H=()=>{let J=[];for(let $ in U){let _=U[$];if(L(_)?_.value:_)J.push($)}z.className=J.join(" ")};if(q)R(H);else H()}}function G0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function k(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let U=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${U} / ${z.alpha})`:`color(${z.space} ${U})`}case"color-mix":{let U=typeof z.color1==="object"?k(z.color1):z.color1,q=typeof z.color2==="object"?k(z.color2):z.color2,H=z.percentage1!==void 0?`${z.percentage1}%`:"",J=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${U} ${H}, ${q} ${J})`}}}function v(z){if(z===null||z===void 0)return"";if(G0(z))return k(z);return String(z)}function i(z,U,q){if(U.startsWith("--")){z.setProperty(U,q);return}if(U.startsWith("webkit")||U.startsWith("moz")||U.startsWith("ms")||U.startsWith("o")){let H=U.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(H,q);return}try{z[U]=q}catch{z.setProperty(U,q)}}function K0(z,U){if(typeof U==="string")z.setAttribute("style",U);else if(typeof U==="object"&&U!==null){let q=!1;for(let H in U)if(L(U[H])){q=!0;break}if(q)R(()=>{for(let H in U){let J=U[H],$=L(J)?J.value:J;i(z.style,H,v($))}});else for(let H in U){let J=U[H];i(z.style,H,v(J))}}}function W(z){return(U,q)=>{let H=document.createElement(z),J,$;if(U===void 0);else if(Y0(U))$=U;else if(X0(U)){if(J=U,q!==void 0)$=q}if(J)u(H,J);let _=[],E=(N)=>_.push(N);if($){let N=document.createDocumentFragment();C(N);try{$(H,E)}finally{h()}H.appendChild(N)}if(f().appendChild(H),_.length>0)requestAnimationFrame(()=>{for(let N of _)N()});return H}}function X(z){return(U)=>{let q=document.createElement(z);if(U)u(q,U);return f().appendChild(q),q}}function X0(z){return typeof z==="object"&&z!==null&&!L(z)&&!Array.isArray(z)}function Y0(z){return typeof z==="function"&&!L(z)}var M=W("a"),B0=W("abbr"),x0=W("address"),V0=X("area"),P0=W("article"),C0=W("aside"),h0=W("audio"),g0=W("b"),k0=X("base"),y0=W("bdi"),b0=W("bdo"),S0=W("blockquote"),E0=W("body"),s0=X("br"),n=W("button"),d0=W("canvas"),m0=W("caption"),p0=W("cite"),v0=W("code"),i0=X("col"),u0=W("colgroup"),n0=W("data"),c0=W("datalist"),a0=W("dd"),o0=W("del"),r0=W("details"),l0=W("dfn"),t0=W("dialog"),I=W("div"),e0=W("dl"),z1=W("dt"),W1=W("em"),U1=X("embed"),q1=W("fieldset"),H1=W("figcaption"),I1=W("figure"),c=W("footer"),Q1=W("form"),a=W("h1"),o=W("h2"),B=W("h3"),r=W("h4"),Z1=W("h5"),J1=W("h6"),j1=W("head"),l=W("header"),F1=W("hgroup"),G1=X("hr"),K1=W("html"),X1=W("i"),Y1=W("iframe"),y=X("img"),$1=X("input"),M1=W("ins"),L1=W("kbd"),f1=W("label"),_1=W("legend"),O=W("li"),D1=X("link"),N1=W("main"),O1=W("map"),w1=W("mark"),R1=W("menu"),A1=X("meta"),T1=W("meter"),t=W("nav"),B1=W("noscript"),x1=W("object"),V1=W("ol"),P1=W("optgroup"),C1=W("option"),h1=W("output"),w=W("p"),g1=W("picture"),x=W("pre"),k1=W("progress"),y1=W("q"),b1=W("rp"),S1=W("rt"),E1=W("ruby"),s1=W("s"),d1=W("samp"),m1=W("script"),p1=W("search"),V=W("section"),v1=W("select"),i1=W("slot"),u1=W("small"),n1=X("source"),F=W("span"),c1=W("strong"),a1=W("style"),o1=W("sub"),r1=W("summary"),l1=W("sup"),t1=W("table"),e1=W("tbody"),zz=W("td"),Wz=W("template"),Uz=W("textarea"),qz=W("tfoot"),Hz=W("th"),Iz=W("thead"),Qz=W("time"),Zz=W("title"),Jz=W("tr"),jz=X("track"),Fz=W("u"),b=W("ul"),Gz=W("var"),Kz=W("video"),Xz=X("wbr");var e=()=>t({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{I({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{F({style:{color:"var(--mongo-green)"},textContent:"fia"})}),I({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{M({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),M({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),M({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var z0=()=>l({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px"}},()=>{a({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em"}},()=>{I({textContent:"Build High-Performance UIs"}),I({class:"text-gradient",textContent:"Without the Virtual DOM"})}),w({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"600px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6"},textContent:"Fia is a generic, type-safe reactive library. It uses fine-grained signals to update the DOM directly, delivering 0ms overhead and maximum battery life."}),I({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)"}},()=>{n({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),M({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})})});var K=(z)=>{f().appendChild(document.createTextNode(z))},W0=()=>I({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{I({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6"}},()=>{I({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7"}},()=>{I({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),I({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),I({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let z=(J)=>F({style:{color:"var(--syntax-keyword)"},textContent:J}),U=(J)=>F({style:{color:"var(--syntax-function)"},textContent:J}),q=(J)=>F({style:{color:"var(--syntax-string)"},textContent:J}),H=(J)=>F({style:{color:"var(--syntax-comment)"},textContent:J});x(()=>{I(()=>{z("import"),K(" { $, div, button } "),z("from"),q(' "fia"'),K(";")}),K(" "),I(()=>{z("const"),K(" count = "),U("$"),K("(0);")}),K(" "),I(()=>{U("div"),K("(() => {")}),I({style:{paddingLeft:"1.5rem"}},()=>{U("button"),K("({ ")}),I({style:{paddingLeft:"3rem"}},()=>{K("onclick: () => count.value++,")}),I({style:{paddingLeft:"3rem"}},()=>{K("textContent: "),q('"Increment"')}),I({style:{paddingLeft:"1.5rem"}},()=>{K("});")}),K(" "),I({style:{paddingLeft:"1.5rem"}},()=>{H("// Updates are surgical - no VDOM diffing")}),I({style:{paddingLeft:"1.5rem"}},()=>{U("div"),K("(() => "),q("`Count: ${count.value}`"),K(");")}),I({textContent:"});"})})})});var S=(z,U,q)=>I({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.2s ease, background 0.2s ease"}},(H)=>{H.onmouseenter=()=>{H.style.transform="translateY(-5px)",H.style.background="rgba(255,255,255,0.05)"},H.onmouseleave=()=>{H.style.transform="translateY(0)",H.style.background="rgba(255,255,255,0.03)"},I({style:{fontSize:"2.5rem",marginBottom:"1rem"},textContent:q}),B({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600"},textContent:z}),w({style:{color:"var(--text-secondary)",lineHeight:"1.6"},textContent:U})}),U0=()=>V({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{S("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),S("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),S("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var q0=()=>c({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{I({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{I({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var D=(z)=>{f().appendChild(document.createTextNode(z))},$0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((q)=>{if(q.startsWith("//"))F({style:{color:"var(--syntax-comment)"},textContent:q});else if(q.startsWith('"')||q.startsWith("'")||q.startsWith("`"))F({style:{color:"var(--syntax-string)"},textContent:q});else if(["const","import","from","function","return","if","else","true","false"].includes(q))F({style:{color:"var(--syntax-keyword)"},textContent:q});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(q))F({style:{color:"var(--syntax-function)"},textContent:q});else D(q)})},Z=(z)=>I({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{I({style:{display:"flex",gap:"0.5rem",marginBottom:"1rem",opacity:"0.6"}},()=>{I({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),I({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),I({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})}),x({style:{margin:"0",overflowX:"auto"}},()=>{$0(z)})}),Y=(z,U,q)=>{V({id:U,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{I({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{I({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),o({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),q()})},G=(z,U)=>{I({style:{marginBottom:"2.5rem"}},()=>{B({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),U()})},j=(z,U)=>{I({style:{marginBottom:"1.5rem"}},()=>{r({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),U()})},Q=(z)=>w({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>D(z)),M0=(z)=>b({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((U)=>O({textContent:U}))}),L0=(z,U="info")=>I({style:{background:U==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${U==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:U==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>D(z)),H0=()=>I({id:"docs",class:"container",style:{maxWidth:"800px",margin:"0 auto",paddingBottom:"var(--spacing-xl)"}},()=>{I({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{M({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{y({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),M({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{y({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),Y("Getting Started","getting-started",()=>{G("Installation",()=>{Q("Import directly from JSR. No build step required."),Z('import { $, div, h1, button, p } from "jsr:@fia/core";')}),G("Quick Start",()=>{Q("Create your first reactive app in seconds."),Z(`import { $, div, h1, button, p } from "jsr:@fia/core";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),G("Mounting",()=>{Q("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),Z(`import { mount, div } from "@fia/core";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),Y("Philosophy","philosophy",()=>{Q("Most frameworks add layers of abstraction between you and the DOM. Fia gives you just enough to be productive:"),b({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{O({style:{marginBottom:"0.5rem"}},()=>{F({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Reactive values"}),D(" - $() creates signals for primitives, reactive stores for objects")}),O({style:{marginBottom:"0.5rem"}},()=>{F({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Direct DOM"}),D(" - No virtual DOM, no diffing, just native browser APIs")}),O({style:{marginBottom:"0.5rem"}},()=>{F({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"~6KB gzipped"}),D(" - Lightweight with zero dependencies")}),O({style:{marginBottom:"0.5rem"}},()=>{F({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Fully typed"}),D(" - Complete TypeScript support with autocomplete")})})}),Y("Element API","element-api",()=>{Q("Fia elements have a simple, consistent API. Functions match HTML tag names."),Z(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),j("Text Content",()=>{Q("Use the native textContent prop for static or reactive text."),Z(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),j("Event Handlers",()=>{Q("Event handlers are delegated automatically for performance."),Z(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),j("Nesting Elements",()=>{Q("Use a callback function to nest elements."),Z(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),j("Void Elements",()=>{Q("Elements like input, img, br only accept props."),Z(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),j("onMount Callback",()=>{Q("Access layout properties after the element is in the DOM."),Z(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),Y("Reactivity","reactivity",()=>{G("Signals",()=>{Q("Signals are the primitive units of reactivity."),Z(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),G("Reactive Stores",()=>{Q("Fia stores are immutable by default for predictability."),Z(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),L0("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),G("Computed Values",()=>{Q("Computed signals automatically track dependencies and update when they change."),Z(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),G("Effects",()=>{Q("Use $e() to run side effects when dependencies change."),Z(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),Y("Immutability","immutability",()=>{Q("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),G("Working with Immutable State",()=>{Q("When a store is immutable, you update state by replacing objects, not mutating properties."),Z(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),Y("Control Flow","control-flow",()=>{G("Show",()=>{Q("Conditionally render content that updates when the condition changes."),Z('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),G("Each",()=>{Q("Reactive list rendering that re-renders efficiently."),Z(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),G("Match",()=>{Q("Reactive pattern matching for switch/case logic."),Z(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),Y("Component Composition","components",()=>{Q("In Fia, components are just functions. There is no special class or type."),G("Basic Component",()=>{Z(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),G("Children & Layouts",()=>{Q("To create wrapper components, pass a callback function as a child prop."),Z(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),Y("SVG","svg",()=>{Q("Fia supports SVG elements with full type safety."),Z(`import { svg, svgCircle } from "@fia/core";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),Y("Performance","performance",()=>{M0(["Event Delegation: Single listener per event type.","Automatic Batching: DOM updates are batched via standard event loop microtasks.","Fragment Insertion: Children are collected in DocumentFragments before insertion."])}),Y("Examples","examples",()=>{G("\uD83D\uDFE2 Beginner",()=>{j("1. Hello World",()=>{Q("The simplest possible Fia code."),Z('h1({ textContent: "Hello, World!" });')}),j("2. Counter",()=>{Q("Signals hold reactive state."),Z(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),j("3. Toggle",()=>{Q("Computed signals derive values from other signals."),Z(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),j("4. Input Binding",()=>{Q("Two-way binding is manual but explicit."),Z('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),j("5. List Rendering (Static)",()=>{Q("For simple static lists, forEach works fine."),Z(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),G("\uD83D\uDFE1 Intermediate",()=>{j("6. Reactive Store Counter",()=>{Q("Objects passed to $() become reactive stores."),Z(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),j("7. Conditional Classes",()=>{Q("Computed signals work in class props too."),Z(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),j("8. Form Handling",()=>{Q("Reactive stores are perfect for forms."),Z(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),j("9. Computed Values",()=>{Q("Track dependencies automatically."),Z('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),j("10. Dynamic Styling",()=>{Q("Reactive styles allow theming."),Z(`const theme = $("light");

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
});`)})}),G("\uD83D\uDD34 Advanced",()=>{j("11. Todo App",()=>{Q("A complete todo app using Each."),Z(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),j("12. Tabs Component",()=>{Q("Track active index and conditionally render."),Z(`const tabs = ["Home", "About", "Contact"];
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
});`)}),j("13. Async Data Fetching",()=>{Q("Use Match for loading states."),Z(`const state = $({
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
});`)}),j("14. Modal Dialog",()=>{Q("Modal patterns with explicit types."),Z(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})});var f0=()=>I({id:"landing-page"},()=>{e(),z0(),W0(),U0(),H0(),q0()});f0();
