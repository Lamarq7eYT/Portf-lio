import{r as n,j as e,O as g,K as y}from"./vendor-B63R6yd9.js";import"./syntaxHighlighter-TA_ZlDK7.js";import{S as f,o as b}from"./vendor-syntax-BapogmBF.js";const w=`// Risk scoring - payload analysis
const score = await aegisNative.calculateRisk({
  ip: req.ip,
  sessionId: req.session.id,
  payload: req.body,
  route: req.url,
});

if (score >= RISK_BLOCK_THRESHOLD) {
  throw new ForbiddenError('High-risk request blocked');
}`,p=[{label:"AegisCore - Risk Scoring",language:"typescript",code:w,typo:{match:"const score",wrong:"cosnt score"}},{label:"Three.js - Particle System",language:"typescript",code:`const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(COUNT * 3);

for (let i = 0; i < COUNT; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particles = new THREE.Points(geometry, material);
scene.add(particles);`},{label:"Rust - Payload Normalizer",language:"rust",code:`#[napi]
pub fn normalize_payload(input: String) -> Result<String> {
    let decoded = urlencoding::decode(&input)
        .map_err(|error| Error::from_reason(error.to_string()))?;

    let canonical = decoded
        .trim()
        .to_lowercase();

    Ok(canonical)
}`}],v=({snippet:t,reducedMotion:i})=>{const[d,o]=n.useState(i?t.code:""),[c,s]=n.useState(!1),r=n.useRef(null);return n.useEffect(()=>{if(r.current&&window.clearTimeout(r.current),i){o(t.code);return}let a=0,l=!1,u=!1;const m=t.typo?t.code.indexOf(t.typo.match):-1,x=m>=0&&t.typo?m+t.typo.match.length:-1;o(""),s(!1);const h=window.setInterval(()=>{if(!l){if(t.typo&&!u&&a===x){l=!0,u=!0,o(`${t.code.slice(0,m)}${t.typo.wrong}`),s(!0),r.current=window.setTimeout(()=>{o(t.code.slice(0,a)),s(!1),l=!1},420);return}a+=1,o(t.code.slice(0,a)),a>=t.code.length&&window.clearInterval(h)}},32);return()=>{window.clearInterval(h),r.current&&window.clearTimeout(r.current)}},[i,t]),e.jsx("div",{className:`code-window min-h-[28rem] overflow-hidden border border-border bg-void/80 ${c?"typing-error":""}`,children:e.jsx(f,{language:t.language,style:b,customStyle:{padding:"1.25rem",background:"transparent",minHeight:"28rem"},wrapLongLines:!0,children:d})})},S=({reducedMotion:t})=>{const[i,d]=n.useState(0),[o,c]=n.useState(0),s=p[i];return e.jsxs("section",{id:"live-code","data-timeline-section":!0,"data-timeline-label":"Live code",className:"relative min-h-screen overflow-hidden px-5 py-24 md:px-10",children:[e.jsx("div",{className:"absolute inset-0 grid-fade opacity-20","aria-hidden":"true"}),e.jsxs("div",{className:"relative z-10 mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsx("p",{className:"font-mono text-xs uppercase text-hacker",children:"[live code area]"}),e.jsx("h2",{className:"font-display text-4xl font-extrabold leading-tight text-slate-100 md:text-6xl",children:"Watch the craft compile in real time."}),e.jsx("p",{className:"max-w-xl text-base leading-8 text-slate-300",children:"These snippets are not filler. They mirror the way Llew thinks: security gates, rendering systems, native code, and the occasional typo caught before it ships."}),e.jsx("div",{className:"flex flex-wrap gap-2",children:p.map((r,a)=>e.jsxs("button",{type:"button",onClick:()=>{d(a),c(l=>l+1)},className:`inline-flex h-10 items-center gap-2 border px-3 font-mono text-[0.68rem] uppercase transition ${i===a?"border-hacker text-hacker":"border-border text-muted hover:border-cyan hover:text-cyan"}`,children:[e.jsx(g,{size:14,"aria-hidden":"true"}),r.label]},r.label))}),e.jsx("button",{type:"button",onClick:()=>c(r=>r+1),className:"grid h-10 w-10 place-items-center border border-border text-muted transition hover:border-hacker hover:text-hacker","aria-label":"Replay active snippet",title:"Replay active snippet",children:e.jsx(y,{size:16,"aria-hidden":"true"})})]}),e.jsxs("div",{className:"terminal-shell overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-border px-4 py-3 font-mono text-[0.68rem] uppercase text-muted",children:[e.jsx("span",{children:s.label}),e.jsx("span",{className:"text-hacker",children:"typing"})]}),e.jsx(v,{snippet:s,reducedMotion:t},`${s.label}-${o}`)]})]})]})};export{S as LiveCode};
