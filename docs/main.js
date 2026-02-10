var N=void 0,g=0,e=0,T=void 0;function y(z){if(N)z.subs.add(N),N.deps.add(z)}function b(z){z.version=++g;let F=[...z.subs];for(let U of F)if(e>0){if(!T)T=new Set;T.add(U)}else U.execute()}function k(z){for(let F of z.deps)F.subs.delete(z);z.deps.clear()}function P(z){let F=!0,U={execute(){if(!F)return;k(U);let W=N;N=U;try{z()}finally{N=W}},deps:new Set,cleanup(){F=!1,k(U)}};return U.execute(),()=>U.cleanup()}function _0(z){let F={version:g,subs:new Set},U=z,W=function(Q){if(arguments.length>0){if(!Object.is(U,Q))U=Q,b(F);return}return y(F),U};return Object.defineProperty(W,"value",{get(){return y(F),U},set(Q){if(!Object.is(U,Q))U=Q,b(F)}}),W[i]=!0,W.peek=()=>U,W}function O0(z){let F={version:g,subs:new Set},U,W=-1,Q={execute(){F.version=++g;let M=[...F.subs];for(let j of M)if(e>0){if(!T)T=new Set;T.add(j)}else j.execute()},deps:new Set,cleanup(){k(Q)}},J=()=>{k(Q);let M=N;N=Q;try{let j=z();if(!Object.is(U,j))U=j;W=F.version}finally{N=M}};J();let q=function(){if(W!==F.version)J();return y(F),U};return Object.defineProperty(q,"value",{get(){return q()}}),q[i]=!0,q.peek=()=>{if(W!==F.version)J();return U},q}var v=Symbol("reactive-proxy"),h=Symbol("raw");function w0(z){return z!==null&&typeof z==="object"&&v in z}function z0(z){let F=new Map,U=new WeakMap;function W(J){let q=F.get(J);if(!q)q={version:0,subs:new Set},F.set(J,q);return q}return new Proxy(z,{get(J,q,M){if(q===h||q==="$raw")return J;if(q===v)return!0;let j=W(q);y(j);let Y=Reflect.get(J,q,M);if(Y!==null&&typeof Y==="object"&&!w0(Y)){let A=U.get(Y);if(!A)A=z0(Y),U.set(Y,A);return A}return Y},set(J,q,M,j){let Y=Reflect.get(J,q,j),A=M!==null&&typeof M==="object"&&h in M?M[h]:M,N0=Array.isArray(J)&&q==="length";if(Object.is(Y,A)&&!N0)return!0;if(Reflect.set(J,q,A,j),Y!==null&&typeof Y==="object")U.delete(Y);let t=F.get(q);if(t)b(t);return!0},has(J,q){if(q===v||q===h||q==="$raw")return!0;return Reflect.has(J,q)},ownKeys(J){return Reflect.ownKeys(J)},getOwnPropertyDescriptor(J,q){return Reflect.getOwnPropertyDescriptor(J,q)},deleteProperty(J,q){let M=Reflect.has(J,q),j=Reflect.deleteProperty(J,q);if(M&&j){let Y=F.get(q);if(Y)b(Y)}return j}})}function B(z,...F){if(typeof z==="function")return O0(z);if(z!==null&&typeof z==="object")return z0(z);return _0(z)}var i=Symbol("signal");function O(z){return typeof z==="function"&&z[i]===!0}var s=[];function u(z){s.push(z)}function n(){s.pop()}function w(){return s[s.length-1]??document.body}var A0=new Set(["click","dblclick","input","change","keydown","keyup","keypress","mousedown","mouseup","mouseover","mouseout","mousemove","touchstart","touchend","touchmove","focusin","focusout","submit"]),E=new WeakMap,F0=new Set;function R0(z){let{target:F,type:U}=z;while(F){let W=E.get(F);if(W&&W[U]){if(Object.defineProperty(z,"currentTarget",{configurable:!0,value:F}),W[U](z),z.cancelBubble)break}F=F.parentElement}}function H0(z,F,U){if(A0.has(F)){if(!F0.has(F))document.addEventListener(F,R0,{capture:!1,passive:!1}),F0.add(F);let W=E.get(z);if(!W)W={},E.set(z,W);W[F]=U}else z.addEventListener(F,U)}if(typeof window<"u")window.__eventHandlerMap=E;var c={className:"class",htmlFor:"for",httpEquiv:"http-equiv",acceptCharset:"accept-charset",accessKey:"accesskey",autoCapitalize:"autocapitalize",autoComplete:"autocomplete",autoFocus:"autofocus",autoPlay:"autoplay",colSpan:"colspan",contentEditable:"contenteditable",crossOrigin:"crossorigin",dateTime:"datetime",defaultChecked:"checked",defaultValue:"value",encType:"enctype",enterKeyHint:"enterkeyhint",fetchPriority:"fetchpriority",formAction:"formaction",formEnctype:"formenctype",formMethod:"formmethod",formNoValidate:"formnovalidate",formTarget:"formtarget",hrefLang:"hreflang",inputMode:"inputmode",isMap:"ismap",maxLength:"maxlength",minLength:"minlength",noModule:"nomodule",noValidate:"novalidate",playsInline:"playsinline",readOnly:"readonly",referrerPolicy:"referrerpolicy",rowSpan:"rowspan",srcDoc:"srcdoc",srcLang:"srclang",srcSet:"srcset",tabIndex:"tabindex",useMap:"usemap",itemScope:"itemscope",itemType:"itemtype",itemId:"itemid",itemProp:"itemprop",itemRef:"itemref",popoverTarget:"popovertarget",popoverTargetAction:"popovertargetaction",shadowRootMode:"shadowrootmode",shadowRootDelegatesFocus:"shadowrootdelegatesfocus",shadowRootClonable:"shadowrootclonable",shadowRootSerializable:"shadowrootserializable",controlsList:"controlslist",disablePictureInPicture:"disablepictureinpicture",disableRemotePlayback:"disableremoteplayback",allowFullscreen:"allowfullscreen",attributionSrc:"attributionsrc",elementTiming:"elementtiming"};function T0(z){return["value","checked","selected","muted","currentTime","volume","indeterminate","defaultValue","defaultChecked","textContent","innerText"].includes(z)}function B0(z,F,U){switch(F){case"value":if("value"in z)z.value=String(U??"");break;case"checked":if("checked"in z)z.checked=Boolean(U);break;case"selected":if("selected"in z)z.selected=Boolean(U);break;case"muted":if("muted"in z)z.muted=Boolean(U);break;case"currentTime":if("currentTime"in z)z.currentTime=Number(U??0);break;case"volume":if("volume"in z)z.volume=Number(U??1);break;case"indeterminate":if("indeterminate"in z)z.indeterminate=Boolean(U);break;case"defaultValue":if("defaultValue"in z)z.defaultValue=String(U??"");break;case"defaultChecked":if("defaultChecked"in z)z.defaultChecked=Boolean(U);break;case"textContent":z.textContent=String(U??"");break;case"innerText":z.innerText=String(U??"");break}}function U0(z,F,U){if(F==="class")x0(z,U);else if(F==="style")P0(z,U);else if(T0(F))B0(z,F,U);else if(typeof U==="boolean")if(U)z.setAttribute(c[F]??F,"");else z.removeAttribute(c[F]??F);else z.setAttribute(c[F]??F,String(U))}function q0(z,F){for(let U in F){let W=F[U];if(W===null||W===void 0)continue;if(U.startsWith("on")&&typeof W==="function"){let Q=U.slice(2).toLowerCase();H0(z,Q,W)}else if(O(W))P(()=>U0(z,U,W.value));else U0(z,U,W)}}function x0(z,F){if(typeof F==="string")z.className=F;else if(typeof F==="object"&&F!==null){let U=!1;for(let Q in F)if(O(F[Q])){U=!0;break}let W=()=>{let Q=[];for(let J in F){let q=F[J];if(O(q)?q.value:q)Q.push(J)}z.className=Q.join(" ")};if(U)P(W);else W()}}function V0(z){return typeof z==="object"&&z!==null&&"type"in z&&typeof z.type==="string"}function o(z){switch(z.type){case"rgb":return z.a!==void 0?`rgba(${z.r}, ${z.g}, ${z.b}, ${z.a})`:`rgb(${z.r}, ${z.g}, ${z.b})`;case"hsl":return z.a!==void 0?`hsla(${z.h}, ${z.s}%, ${z.l}%, ${z.a})`:`hsl(${z.h}, ${z.s}%, ${z.l}%)`;case"hwb":return z.a!==void 0?`hwb(${z.h} ${z.w}% ${z.b}% / ${z.a})`:`hwb(${z.h} ${z.w}% ${z.b}%)`;case"oklch":return z.a!==void 0?`oklch(${z.l}% ${z.c} ${z.h} / ${z.a})`:`oklch(${z.l}% ${z.c} ${z.h})`;case"lab":return z.alpha!==void 0?`lab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`lab(${z.l}% ${z.a} ${z.b})`;case"lch":return z.alpha!==void 0?`lch(${z.l}% ${z.c} ${z.h} / ${z.alpha})`:`lch(${z.l}% ${z.c} ${z.h})`;case"oklab":return z.alpha!==void 0?`oklab(${z.l}% ${z.a} ${z.b} / ${z.alpha})`:`oklab(${z.l}% ${z.a} ${z.b})`;case"hex":return z.value;case"color":{let F=z.components.join(" ");return z.alpha!==void 0?`color(${z.space} ${F} / ${z.alpha})`:`color(${z.space} ${F})`}case"color-mix":{let F=typeof z.color1==="object"?o(z.color1):z.color1,U=typeof z.color2==="object"?o(z.color2):z.color2,W=z.percentage1!==void 0?`${z.percentage1}%`:"",Q=z.percentage2!==void 0?`${z.percentage2}%`:"";return`color-mix(${z.method}, ${F} ${W}, ${U} ${Q})`}}}function W0(z){if(z===null||z===void 0)return"";if(V0(z))return o(z);return String(z)}function f0(z,F,U){if(F.startsWith("--")){z.setProperty(F,U);return}if(F.startsWith("webkit")||F.startsWith("moz")||F.startsWith("ms")||F.startsWith("o")){let W=F.replace(/([A-Z])/g,"-$1").toLowerCase();z.setProperty(W,U);return}try{z[F]=U}catch{z.setProperty(F,U)}}function P0(z,F){if(typeof F==="string")z.setAttribute("style",F);else if(typeof F==="object"&&F!==null){let U=!1;for(let W in F)if(O(F[W])){U=!0;break}if(U)P(()=>{for(let W in F){let Q=F[W],J=O(Q)?Q.value:Q;f0(z.style,W,W0(J))}});else for(let W in F){let Q=F[W];f0(z.style,W,W0(Q))}}}function H(z){return(F,U)=>{let W=document.createElement(z),Q,J;if(F===void 0);else if(h0(F))J=F;else if(C0(F)){if(Q=F,U!==void 0)J=U}if(Q)q0(W,Q);let q=[],M=(j)=>q.push(j);if(J){let j=document.createDocumentFragment();u(j);try{J(W,M)}finally{n()}W.appendChild(j)}if(w().appendChild(W),q.length>0)requestAnimationFrame(()=>{for(let j of q)j()});return W}}function L(z){return(F)=>{let U=document.createElement(z);if(F)q0(U,F);return w().appendChild(U),U}}function C0(z){return typeof z==="object"&&z!==null&&!O(z)&&!Array.isArray(z)}function h0(z){return typeof z==="function"&&!O(z)}var _=H("a"),m0=H("abbr"),p0=H("address"),v0=L("area"),i0=H("article"),u0=H("aside"),n0=H("audio"),c0=H("b"),o0=L("base"),r0=H("bdi"),a0=H("bdo"),l0=H("blockquote"),t0=H("body"),e0=L("br"),S=H("button"),z1=H("canvas"),F1=H("caption"),H1=H("cite"),U1=H("code"),W1=L("col"),f1=H("colgroup"),q1=H("data"),I1=H("datalist"),Q1=H("dd"),Z1=H("del"),J1=H("details"),j1=H("dfn"),D1=H("dialog"),f=H("div"),G1=H("dl"),K1=H("dt"),M1=H("em"),X1=L("embed"),Y1=H("fieldset"),L1=H("figcaption"),$1=H("figure"),I0=H("footer"),N1=H("form"),Q0=H("h1"),Z0=H("h2"),d=H("h3"),C=H("h4"),_1=H("h5"),O1=H("h6"),w1=H("head"),J0=H("header"),A1=H("hgroup"),R1=L("hr"),T1=H("html"),B1=H("i"),x1=H("iframe"),r=L("img"),V1=L("input"),P1=H("ins"),C1=H("kbd"),h1=H("label"),g1=H("legend"),x=H("li"),y1=L("link"),b1=H("main"),k1=H("map"),s1=H("mark"),E1=H("menu"),S1=L("meta"),d1=H("meter"),j0=H("nav"),m1=H("noscript"),p1=H("object"),v1=H("ol"),i1=H("optgroup"),u1=H("option"),n1=H("output"),V=H("p"),c1=H("picture"),m=H("pre"),o1=H("progress"),r1=H("q"),a1=H("rp"),l1=H("rt"),t1=H("ruby"),e1=H("s"),zz=H("samp"),Fz=H("script"),Hz=H("search"),p=H("section"),Uz=H("select"),Wz=H("slot"),fz=H("small"),qz=L("source"),X=H("span"),Iz=H("strong"),Qz=H("style"),Zz=H("sub"),Jz=H("summary"),jz=H("sup"),Dz=H("table"),Gz=H("tbody"),Kz=H("td"),Mz=H("template"),Xz=H("textarea"),Yz=H("tfoot"),Lz=H("th"),$z=H("thead"),Nz=H("time"),_z=H("title"),Oz=H("tr"),wz=L("track"),Az=H("u"),a=H("ul"),Rz=H("var"),Tz=H("video"),Bz=L("wbr");var D0=()=>j0({class:"container animate-fade-up delay-100",style:{display:"flex",justifyContent:"space-between",alignItems:"center",height:"100px"}},()=>{f({style:{fontSize:"1.5rem",fontWeight:"700",display:"flex",alignItems:"center",gap:"0.5rem",cursor:"pointer"}},()=>{X({style:{color:"var(--mongo-green)"},textContent:"fia"})}),f({style:{display:"flex",gap:"2rem",alignItems:"center"}},()=>{_({href:"#features",style:{fontWeight:"500"},textContent:"Features"}),_({href:"#docs",style:{fontWeight:"500"},textContent:"Docs"}),_({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"0.5rem 1.25rem",fontSize:"0.9rem"},textContent:"GitHub"})})});var G0=()=>J0({class:"container",style:{padding:"var(--spacing-xl) 0",textAlign:"center",maxWidth:"900px"}},()=>{Q0({style:{fontSize:"4.5rem",lineHeight:"1.1",marginBottom:"var(--spacing-md)",fontWeight:"800",letterSpacing:"-0.02em"}},()=>{f({textContent:"Build High-Performance UIs"}),f({class:"text-gradient",textContent:"Without the Virtual DOM"})}),V({style:{fontSize:"1.25rem",color:"var(--text-secondary)",marginBottom:"var(--spacing-lg)",maxWidth:"800px",margin:"0 auto var(--spacing-lg)",lineHeight:"1.6"},textContent:"Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely."}),f({style:{display:"flex",gap:"1rem",justifyContent:"center",marginTop:"var(--spacing-lg)"}},()=>{S({class:"btn btn-primary",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"Get Started"}),_({href:"https://github.com/o-sofos/fia",target:"_blank",class:"btn btn-outline",style:{padding:"1rem 2rem",fontSize:"1.1rem"},textContent:"View Source"})})});var K=(z)=>{w().appendChild(document.createTextNode(z))},K0=()=>f({class:"container animate-fade-up delay-200",style:{margin:"var(--spacing-xl) auto",maxWidth:"800px"}},()=>{f({style:{background:"var(--mongo-forest)",borderRadius:"1rem",padding:"2rem",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",border:"1px solid var(--mongo-slate)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.95rem",overflow:"hidden",lineHeight:"1.6"}},()=>{f({style:{display:"flex",gap:"0.5rem",marginBottom:"1.5rem",opacity:"0.7"}},()=>{f({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ff5f56"}}),f({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#ffbd2e"}}),f({style:{width:"12px",height:"12px",borderRadius:"50%",background:"#27c93f"}})});let z=(Q)=>X({style:{color:"var(--syntax-keyword)"},textContent:Q}),F=(Q)=>X({style:{color:"var(--syntax-function)"},textContent:Q}),U=(Q)=>X({style:{color:"var(--syntax-string)"},textContent:Q}),W=(Q)=>X({style:{color:"var(--syntax-comment)"},textContent:Q});m(()=>{f(()=>{z("import"),K(" { $, div, button } "),z("from"),U(' "fia"'),K(";")}),K(" "),f(()=>{z("const"),K(" count = "),F("$"),K("(0);")}),K(" "),f(()=>{F("div"),K("(() => {")}),f({style:{paddingLeft:"1.5rem"}},()=>{F("button"),K("({ ")}),f({style:{paddingLeft:"3rem"}},()=>{K("onclick: () => count.value++,")}),f({style:{paddingLeft:"3rem"}},()=>{K("textContent: "),U('"Increment"')}),f({style:{paddingLeft:"1.5rem"}},()=>{K("});")}),K(" "),f({style:{paddingLeft:"1.5rem"}},()=>{W("// Updates are surgical - no VDOM diffing")}),f({style:{paddingLeft:"1.5rem"}},()=>{F("div"),K("({ "),K("textContent"),K(": "),F("$"),K("(() => "),U("`Count: ${count.value}`"),K(") });")}),f({textContent:"});"})})})});var l=(z,F,U)=>f({style:{padding:"2rem",background:"rgba(255,255,255,0.03)",borderRadius:"1rem",border:"1px solid rgba(255,255,255,0.05)",transition:"transform 0.2s ease, background 0.2s ease"}},(W)=>{W.onmouseenter=()=>{W.style.transform="translateY(-5px)",W.style.background="rgba(255,255,255,0.05)"},W.onmouseleave=()=>{W.style.transform="translateY(0)",W.style.background="rgba(255,255,255,0.03)"},f({style:{fontSize:"2.5rem",marginBottom:"1rem"},textContent:U}),d({style:{fontSize:"1.25rem",marginBottom:"0.75rem",color:"var(--mongo-green)",fontWeight:"600"},textContent:z}),V({style:{color:"var(--text-secondary)",lineHeight:"1.6"},textContent:F})}),M0=()=>p({id:"features",class:"container",style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"2rem",marginBottom:"var(--spacing-xl)",paddingTop:"var(--spacing-lg)"}},()=>{l("Zero Virtual DOM","Fia updates the DOM directly. No diffing, no overhead, no reconciliation cost. Just pure performance.","⚡️"),l("Fine-Grained Reactivity","Signals track dependencies automatically. Only what changes updates.","\uD83C\uDFAF"),l("Type Safe","Built with TypeScript, for TypeScript. Enjoy full autocomplete and type inference for all HTML attributes and events.","\uD83D\uDEE1️")});var X0=()=>I0({style:{borderTop:"1px solid var(--mongo-slate)",marginTop:"auto",padding:"var(--spacing-lg) 0",background:"rgba(0,0,0,0.2)"}},()=>{f({class:"container",style:{textAlign:"center",color:"var(--text-secondary)",fontSize:"0.9rem"}},()=>{f({style:{marginBottom:"1rem"},textContent:"© 2026 Fia Framework. Open Source under MIT License."})})});var R=(z)=>{w().appendChild(document.createTextNode(z))},g0=(z)=>{z.split(/(\/\/.*|\".*?\"|\bconst\b|\bimport\b|\bfrom\b|\bfunction\b|\breturn\b|\bdiv\b|\bbutton\b|\bh1\b|\bp\b|\bul\b|\bli\b|\binput\b|\bspan\b|\bmap\b|\bfilter\b|\bconsole\b|\blog\b|\btrue\b|\bfalse\b|\bif\b|\belse\b|\bShow\b|\bEach\b|\bMatch\b)/g).forEach((U)=>{if(U.startsWith("//"))X({style:{color:"var(--syntax-comment)"},textContent:U});else if(U.startsWith('"')||U.startsWith("'")||U.startsWith("`"))X({style:{color:"var(--syntax-string)"},textContent:U});else if(["const","import","from","function","return","if","else","true","false"].includes(U))X({style:{color:"var(--syntax-keyword)"},textContent:U});else if(["div","button","h1","p","ul","li","input","span","console","log","map","filter","Show","Each","Match"].includes(U))X({style:{color:"var(--syntax-function)"},textContent:U});else R(U)})},Z=(z)=>f({class:"code-block animate-fade-up",style:{background:"var(--mongo-forest)",borderRadius:"0.75rem",padding:"1.5rem",margin:"1.5rem 0",border:"1px solid var(--mongo-slate)",boxShadow:"0 10px 30px rgba(0,0,0,0.3)",fontFamily:"'JetBrains Mono', monospace",fontSize:"0.9rem",lineHeight:"1.6",overflow:"hidden"}},()=>{f({style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}},()=>{f({style:{display:"flex",gap:"0.5rem",opacity:"0.6"}},()=>{f({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ff5f56"}}),f({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#ffbd2e"}}),f({style:{width:"10px",height:"10px",borderRadius:"50%",background:"#27c93f"}})});let F=B(!1);S({textContent:B(()=>F.value?"Copied!":"Copy"),style:{background:"transparent",border:"1px solid var(--mongo-slate)",color:B(()=>F.value?"var(--mongo-green)":"var(--text-secondary)"),borderRadius:"4px",padding:"2px 8px",fontSize:"0.75rem",cursor:"pointer",transition:"all 0.2s",opacity:"0.8"},onclick:()=>{navigator.clipboard.writeText(z),F.value=!0,setTimeout(()=>F.value=!1,2000)}})}),m({style:{margin:"0",overflowX:"auto"}},()=>{g0(z)})}),$=(z,F,U)=>{p({id:F,class:"animate-fade-up",style:{marginBottom:"var(--spacing-xl)",scrollMarginTop:"120px"}},()=>{f({style:{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"1.5rem"}},()=>{f({style:{width:"4px",height:"32px",background:"var(--mongo-green)",borderRadius:"2px"}}),Z0({style:{fontSize:"2rem",color:"var(--mongo-white)",letterSpacing:"-0.5px"},textContent:z})}),U()})},G=(z,F)=>{f({style:{marginBottom:"2.5rem"}},()=>{d({style:{fontSize:"1.5rem",marginBottom:"1rem",color:"var(--mongo-green)"},textContent:z}),F()})},D=(z,F)=>{f({style:{marginBottom:"1.5rem"}},()=>{C({style:{fontSize:"1.2rem",marginBottom:"0.75rem",color:"var(--mongo-white)",fontWeight:"600"},textContent:z}),F()})},I=(z)=>V({style:{marginBottom:"1rem",lineHeight:"1.8",color:"var(--text-secondary)",fontSize:"1.05rem"}},()=>R(z)),Y0=(z)=>a({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)",lineHeight:"1.8"}},()=>{z.forEach((F)=>x({textContent:F}))}),L0=(z,F="info")=>f({style:{background:F==="warning"?"rgba(255, 189, 46, 0.1)":"rgba(0, 237, 100, 0.05)",borderLeft:`4px solid ${F==="warning"?"#ffbd2e":"var(--mongo-green)"}`,padding:"1rem",borderRadius:"0 0.5rem 0.5rem 0",marginBottom:"1.5rem",color:F==="warning"?"#ffbd2e":"var(--mongo-green)"}},()=>R(z)),$0=()=>f({id:"docs",class:"container",style:{maxWidth:"800px",margin:"0 auto",paddingBottom:"var(--spacing-xl)"}},()=>{f({style:{display:"flex",gap:"0.5rem",marginBottom:"2rem",marginTop:"1rem"}},()=>{_({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{r({src:"https://jsr.io/badges/@fia/core",alt:"jsr-badge"})}),_({href:"https://jsr.io/@fia/core",target:"_blank"},()=>{r({src:"https://jsr.io/badges/@fia/core/score",alt:"score-badge"})})}),$("Introduction","intro",()=>{I("Fia is a lightweight, framework-agnostic library designed for high-performance UI development. By leveraging fine-grained signals, Fia bypasses the overhead of a Virtual DOM to update the DOM directly and precisely.")}),$("Why Fia?","why-fia",()=>{I("While modern web development is often bogged down by complex reconciliation processes, Fia focuses on surgical precision."),a({style:{marginLeft:"1.5rem",marginBottom:"1.5rem",color:"var(--text-secondary)"}},()=>{x({style:{marginBottom:"0.5rem"}},()=>{X({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"True Fine-Grained Reactivity: "}),R("Only the parts of the DOM that actually change are updated. No component re-renders, no VDOM diffing—just targeted updates.")}),x({style:{marginBottom:"0.5rem"}},()=>{X({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"End-to-End Type Safety: "}),R("Built from the ground up with TypeScript, Fia ensures your signals and effects are predictable and catch errors at compile time, not runtime.")}),x({style:{marginBottom:"0.5rem"}},()=>{X({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Zero-Abstraction Feel: "}),R("Fia stays out of your way. It provides the reactive primitives you need to build powerful interfaces without forcing a heavy framework architecture on you.")}),x({style:{marginBottom:"0.5rem"}},()=>{X({style:{color:"var(--mongo-white)",fontWeight:"600"},textContent:"Minimal Footprint: "}),R("Designed for developers who value bundle size and execution speed, Fia provides a lean reactive core that scales from small widgets to full-scale applications.")})})}),$("Getting Started","getting-started",()=>{G("Prerequisites",()=>{I("Fia is compatible with any modern JavaScript runtime."),Y0(["Node.js (v18.0.0+)","Bun (v1.0.0+)","Deno (v1.30.0+)"])}),G("Installation",()=>{I("Fia is published on JSR. Install it using your preferred package manager:"),f({style:{marginBottom:"1rem"}},()=>{C({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Deno"}),Z("deno add jsr:@fia/core")}),f({style:{marginBottom:"1rem"}},()=>{C({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Bun"}),Z("bun add jsr:@fia/core")}),f({style:{marginBottom:"1rem"}},()=>{C({style:{color:"var(--mongo-white)",marginBottom:"0.5rem"},textContent:"Node.js (npm/yarn/pnpm)"}),Z("npx jsr add @fia/core")}),L0(`The examples below use "fia" as the package name. To enable this shorten import, modify your package.json dependency to alias the package:

"dependencies": {
  "fia": "npm:@jsr/fia__core"
}`,"info")}),G("Updating",()=>{I("To update to the latest version, run the installation command again (or use your package manager's update command)."),Z(`# Deno
deno add jsr:@fia/core

# Bun
bun add jsr:@fia/core

# Node.js
npx jsr add @fia/core`)}),G("Quick Start",()=>{I("Create your first reactive app in seconds."),Z(`import { $, div, h1, button, p } from "fia";

// Reactive store for state
const state = $({ count: 0 }, "count");

div({ class: "app" }, () => {
  h1({ textContent: "Counter App" });
  p({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),G("Mounting",()=>{I("For Single Page Apps (SPAs), use the mount helper to attach to a root element."),Z(`import { mount, div } from "fia";

const App = () => div(() => {
  // Your app structure
});

mount(App, "#app"); // Clears #app and mounts App`)})}),$("Element API","element-api",()=>{I("Fia elements have a simple, consistent API. Functions match HTML tag names."),Z(`el()                      // Empty element
el({ props })             // Props only
el(() => { ... })         // Children only
el({ props }, () => { })  // Props + children`),D("Text Content",()=>{I("Use the native textContent prop for static or reactive text."),Z(`// Static text
h1({ textContent: "Hello World" });

// Reactive text
const name = $("Evan");
p({ textContent: name });

// Computed text
p({ textContent: $(() => \`Hello, \${name.value}!\`) });`)}),D("Event Handlers",()=>{I("Event handlers are delegated automatically for performance."),Z(`button({
  textContent: "Click me",
  onclick: () => console.log("clicked!"),
});

input({
  type: "text",
  oninput: (e) => console.log(e.currentTarget.value),
});`)}),D("Nesting Elements",()=>{I("Use a callback function to nest elements."),Z(`div({ class: "card" }, () => {
  h1({ textContent: "Title" });
  p({ textContent: "Description" });
});`)}),D("Void Elements",()=>{I("Elements like input, img, br only accept props."),Z(`input({ type: "email", placeholder: "you@example.com" });
img({ src: "/photo.jpg", alt: "Photo" });
br();`)}),D("onMount Callback",()=>{I("Access layout properties after the element is in the DOM."),Z(`div((el, onMount) => {
  el.style.height = "100vh";
  onMount(() => {
    console.log(el.offsetHeight);
  });
});`)})}),$("Reactivity","reactivity",()=>{G("Signals",()=>{I("Signals are the primitive units of reactivity."),Z(`const count = $(0);
console.log(count.value); // 0
count.value++;`)}),G("Reactive Stores",()=>{I("Fia stores are immutable by default for predictability."),Z(`// Immutable Store
const config = $({ theme: "dark" });
// config.theme = "light"; // Error!

// Mutable Store (Opt-in)
const state = $({ count: 0 }, "count");
state.count++; // Works!`),L0("Destructuring breaks reactivity. Always access properties directly: state.count","warning")}),G("Computed Values",()=>{I("Computed signals automatically track dependencies and update when they change."),Z(`const count = $(0);
const doubled = $(() => count.value * 2);`)}),G("Effects",()=>{I("Use $e() to run side effects when dependencies change."),Z(`$e(() => {
  console.log("Count changed to:", count.value);
});`)})}),$("Immutability","immutability",()=>{I("Fia embraces an Immutable-by-Default philosophy for state management. This differs from many other signals-based frameworks but aligns with functional programming principles."),G("Working with Immutable State",()=>{I("When a store is immutable, you update state by replacing objects, not mutating properties."),Z(`const state = $({ 
  user: { name: "Evan", score: 10 } 
}, "user"); // 'user' key is mutable

// Correct: Replace the object
state.user = { ...state.user, score: state.user.score + 1 };`)})}),$("Control Flow","control-flow",()=>{G("Show",()=>{I("Conditionally render content that updates when the condition changes."),Z('Show(() => isVisible.value, () => div({ textContent: "Hello!" }));')}),G("Each",()=>{I("Reactive list rendering that re-renders efficiently."),Z(`const items = $({ list: ["Apple", "Banana"] });
Each(() => items.list, item => li({ textContent: item }));`)}),G("Match",()=>{I("Reactive pattern matching for switch/case logic."),Z(`Match(() => status.value, {
  loading: () => p({ textContent: "Loading..." }),
  success: () => div({ textContent: "Data loaded!" }),
  _: () => p({ textContent: "Unknown state" }),
});`)})}),$("Component Composition","components",()=>{I("In Fia, components are just functions. There is no special class or type."),G("Basic Component",()=>{Z(`function Button(props: { text: string }) {
  return button({
    textContent: props.text,
    class: "btn-primary"
  });
}`)}),G("Children & Layouts",()=>{I("To create wrapper components, pass a callback function as a child prop."),Z(`function Card(props, children) {
  return div({ class: "card" }, () => {
    children();
  });
}`)})}),$("SVG","svg",()=>{I("Fia supports SVG elements with full type safety."),Z(`import { svg, svgCircle } from "fia";

svg({ width: 100, height: 100 }, () => {
  svgCircle({ cx: 50, cy: 50, r: 40, fill: "red" });
});`)}),$("Performance","performance",()=>{Y0(["Event Delegation: Single listener per event type.","Automatic Batching: DOM updates are batched via standard event loop microtasks.","Fragment Insertion: Children are collected in DocumentFragments before insertion."])}),$("Examples","examples",()=>{G("\uD83D\uDFE2 Beginner",()=>{D("1. Hello World",()=>{I("The simplest possible Fia code."),Z('h1({ textContent: "Hello, World!" });')}),D("2. Counter",()=>{I("Signals hold reactive state."),Z(`const count = $(0);
button({ textContent: "+", onclick: () => count.value++ });
p({ textContent: count });`)}),D("3. Toggle",()=>{I("Computed signals derive values from other signals."),Z(`const visible = $(true);
button({ textContent: "Toggle", onclick: () => visible.value = !visible.value });
div({ style: { display: $(() => visible.value ? "block" : "none") } }, () => {
  p({ textContent: "Now you see me!" });
});`)}),D("4. Input Binding",()=>{I("Two-way binding is manual but explicit."),Z('const name = $("");\ninput({ type: "text", oninput: (e) => name.value = e.currentTarget.value });\np({ textContent: $(() => `Hello, ${name.value || "stranger"}!`) });')}),D("5. List Rendering (Static)",()=>{I("For simple static lists, forEach works fine."),Z(`const items = ["Apple", "Banana", "Cherry"];
ul(() => items.forEach(item => li({ textContent: item })));`)})}),G("\uD83D\uDFE1 Intermediate",()=>{D("6. Reactive Store Counter",()=>{I("Objects passed to $() become reactive stores."),Z(`const state = $({ count: 0 }, "count");

div(() => {
  h1({ textContent: $(() => \`Count: \${state.count}\`) });
  button({ textContent: "+", onclick: () => state.count++ });
  button({ textContent: "-", onclick: () => state.count-- });
});`)}),D("7. Conditional Classes",()=>{I("Computed signals work in class props too."),Z(`const active = $(false);

button({
  textContent: "Toggle Active",
  class: $(() => active.value ? "btn active" : "btn"),
  onclick: () => active.value = !active.value,
});`)}),D("8. Form Handling",()=>{I("Reactive stores are perfect for forms."),Z(`const formData = $({ email: "", password: "" }, "email", "password");

form({ onsubmit: (e) => { e.preventDefault(); console.log(formData); } }, () => {
  input({ type: "email", oninput: (e) => formData.email = e.currentTarget.value });
  input({ type: "password", oninput: (e) => formData.password = e.currentTarget.value });
  button({ textContent: "Submit", type: "submit" });
});`)}),D("9. Computed Values",()=>{I("Track dependencies automatically."),Z('const state = $({ price: 100, quantity: 2 }, "quantity");\nconst total = $(() => state.price * state.quantity);\n\ndiv(() => {\n  p({ textContent: $(() => `Price: $${state.price}`) });\n  p({ textContent: $(() => `Qty: ${state.quantity}`) });\n  p({ textContent: $(() => `Total: $${total.value}`) });\n  button({ textContent: "Add", onclick: () => state.quantity++ });\n});')}),D("10. Dynamic Styling",()=>{I("Reactive styles allow theming."),Z(`const theme = $("light");

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
});`)})}),G("\uD83D\uDD34 Advanced",()=>{D("11. Todo App",()=>{I("A complete todo app using Each."),Z(`const todos = $({ items: [] as string[], input: "" }, "items", "input");

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
});`)}),D("12. Tabs Component",()=>{I("Track active index and conditionally render."),Z(`const tabs = ["Home", "About", "Contact"];
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
});`)}),D("13. Async Data Fetching",()=>{I("Use Match for loading states."),Z(`const state = $({
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
});`)}),D("14. Modal Dialog",()=>{I("Modal patterns with explicit types."),Z(`const modal = $<{ open: boolean; title: string }, "open" | "title">({ open: false, title: "" }, "open", "title");

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
});`)})})})});var y0=()=>f({id:"landing-page"},()=>{D0(),G0(),K0(),M0(),$0(),X0()});y0();
