const ENDPOINTS = [
  {id:"turnstile", path:"/api/turnstile", name:"Turnstile", desc:"Solve Turnstile through the minimal fake-page flow.", group:"Token", fields:[
    {k:"sitekey", label:"Sitekey", type:"text", req:true, ph:"0x4AAAAAA…"},
    {k:"siteurl", label:"Site URL", type:"url", req:true, ph:"https://example.com"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:45, min:10, max:120},
    {k:"action", label:"Action", type:"text", ph:"login (optional)"}
  ]},
  {id:"turnstile-max", path:"/api/turnstile-max", name:"Turnstile Max", desc:"Run Turnstile on the supplied target page.", group:"Browser", fields:[
    {k:"url", label:"Target URL", type:"url", req:true, ph:"https://example.com/page"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:60, min:10, max:120},
    {k:"proxy", label:"Proxy", type:"text", ph:"optional"}
  ]},
  {id:"captchav3", path:"/api/captchav3", name:"reCAPTCHA v3", desc:"Request a reCAPTCHA v3 token.", group:"Token", fields:[
    {k:"sitekey", label:"Sitekey", type:"text", req:true, ph:"6Le…"},
    {k:"siteurl", label:"Site URL", type:"url", req:true, ph:"https://example.com"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:30, min:10, max:60}
  ]},
  {id:"altcha", path:"/api/altcha", name:"Altcha", desc:"Solve an Altcha proof-of-work challenge.", group:"PoW", fields:[
    {k:"challengeurl", label:"Challenge URL", type:"url", ph:"https://example.com/challenge"},
    {k:"challenge", label:"Challenge JSON", type:"textarea", ph:'{"algorithm":"SHA-256","challenge":"…"}'},
    {k:"max", label:"Max number", type:"number", ph:"optional"},
    {k:"start", label:"Start number", type:"number", ph:"optional"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:60}
  ]},
  {id:"friendly", path:"/api/friendly", name:"FriendlyCaptcha", desc:"Solve FriendlyCaptcha v1 proof-of-work.", group:"PoW", fields:[
    {k:"sitekey", label:"Sitekey", type:"text", req:true, ph:"FCM…"},
    {k:"puzzleEndpoint", label:"Puzzle endpoint", type:"url", ph:"optional"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:180}
  ]},
  {id:"hcaptcha", path:"/api/hcaptcha", name:"hCaptcha", desc:"Best-effort browser flow for checkbox/invisible challenges.", group:"Browser", fields:[
    {k:"sitekey", label:"Sitekey", type:"text", req:true, ph:"UUID…"},
    {k:"siteurl", label:"Site URL", type:"url", req:true, ph:"https://example.com"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:60},
    {k:"rqdata", label:"rqdata", type:"textarea", ph:"optional enterprise value"},
    {k:"size", label:"Size", type:"select", opts:["normal","compact","invisible"], val:"normal"},
    {k:"invisible", label:"Invisible", type:"checkbox", val:false},
    {k:"hl", label:"Language", type:"text", ph:"en"},
    {k:"theme", label:"Theme", type:"select", opts:["light","dark"], val:"light"},
    {k:"host", label:"Host", type:"text", ph:"optional"},
    {k:"endpoint", label:"Endpoint", type:"url", ph:"optional"},
    {k:"assethost", label:"Asset host", type:"url", ph:"optional"},
    {k:"imghost", label:"Image host", type:"url", ph:"optional"},
    {k:"reportapi", label:"Report API", type:"url", ph:"optional"},
    {k:"debug", label:"Debug", type:"checkbox", val:false}
  ]},
  {id:"aliyun", path:"/api/aliyun", name:"Aliyun", desc:"Run the Aliyun Captcha 2.0 flow with explicit parameters.", group:"Browser", fields:[
    {k:"sceneId", label:"Scene ID", type:"text", req:true, ph:"XXXX"},
    {k:"prefix", label:"Prefix", type:"text", req:true, ph:"xxxxxx"},
    {k:"region", label:"Region", type:"select", opts:["sgp","cn"], val:"sgp"},
    {k:"language", label:"Language", type:"select", opts:["en","cn","tw"], val:"en"},
    {k:"mode", label:"Mode", type:"select", opts:["popup","embed","float"], val:"popup"},
    {k:"sdkUrl", label:"SDK URL", type:"url", ph:"optional"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:120, min:20, max:300},
    {k:"debug", label:"Debug", type:"checkbox", val:false}
  ]},
  {id:"aliyun-extract", path:"/api/aliyun-extract", name:"Aliyun Extract", desc:"Inspect a target page for Aliyun captcha parameters.", group:"Detector", fields:[
    {k:"url", label:"Target URL", type:"url", req:true, ph:"https://example.com/login"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:30, min:10, max:90}
  ]},
  {id:"kasada", path:"/api/kasada", name:"Kasada", desc:"Capture Kasada session headers/cookies from a target page.", group:"Browser", fields:[
    {k:"url", label:"Target URL", type:"url", req:true, ph:"https://example.com"},
    {k:"timeout", label:"Navigation timeout (s)", type:"number", val:30, min:5, max:90},
    {k:"waitTime", label:"Wait time (s)", type:"number", val:15, min:1, max:60}
  ]},
  {id:"cloudflare", path:"/api/cloudflare", name:"Cloudflare", desc:"Run the configured Cloudflare challenge flow.", group:"Browser", fields:[
    {k:"url", label:"Target URL", type:"url", req:true, ph:"https://example.com"},
    {k:"headless", label:"Headless", type:"checkbox", val:true},
    {k:"proxy", label:"Proxy", type:"text", ph:"optional"},
    {k:"proxyFile", label:"Proxy file", type:"text", ph:"optional"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:30}
  ]},
  {id:"waf-session", path:"/api/waf-session", name:"WAF Session", desc:"Fetch cookies and headers from a rendered page session.", group:"Browser", fields:[
    {k:"url", label:"Target URL", type:"url", req:true, ph:"https://example.com"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:60, min:10, max:120},
    {k:"proxy", label:"Proxy", type:"text", ph:"optional"}
  ]},
  {id:"source", path:"/api/source", name:"Rendered Source", desc:"Return HTML after the target page has been rendered.", group:"Browser", fields:[
    {k:"url", label:"Target URL", type:"url", req:true, ph:"https://example.com"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:60, min:10, max:120},
    {k:"proxy", label:"Proxy", type:"text", ph:"optional"}
  ]},
  {id:"get-sitekey", path:"/api/get-sitekey", name:"Sitekey Detector", desc:"Detect and classify captcha sitekeys on a rendered page.", group:"Detector", fields:[
    {k:"url", label:"Target URL", type:"url", req:true, ph:"https://example.com/login"},
    {k:"timeout", label:"Timeout (s)", type:"number", val:30, min:10, max:90}
  ]}
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
let current = ENDPOINTS[0], lastResponse = null, lastStatus = null;
const saved = JSON.parse(localStorage.getItem("captchax-history") || "[]");

function escapeHtml(v){
  return String(v ?? "").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function renderEndpointList(filter=""){
  const q=filter.toLowerCase();
  const items=ENDPOINTS.filter(e=>(e.name+" "+e.path+" "+e.group).toLowerCase().includes(q));
  $("#routeCount").textContent=items.length;
  $("#endpointList").innerHTML=items.map(e=>`
    <button class="endpoint ${e.id===current.id?'selected':''}" data-id="${e.id}">
      <span class="endpoint-dot ${e.group.toLowerCase()}"></span>
      <span class="endpoint-copy"><strong>${escapeHtml(e.name)}</strong><small>${escapeHtml(e.path)}</small></span>
      <span class="chev">›</span>
    </button>`).join("") || `<div class="no-results">No endpoints match.</div>`;
  $$(".endpoint").forEach(b=>b.addEventListener("click",()=>selectEndpoint(b.dataset.id)));
}
function fieldHtml(f){
  const req=f.req?' required':'';
  const value=f.val!==undefined ? f.val : "";
  if(f.type==="checkbox") return `<label class="field check-field"><input data-key="${f.k}" type="checkbox" ${value?'checked':''}><span><b>${escapeHtml(f.label)}</b><small>Send as boolean</small></span></label>`;
  if(f.type==="select") return `<label class="field"><span>${escapeHtml(f.label)}${f.req?' <em>*</em>':''}</span><select data-key="${f.k}"${req}>${f.opts.map(o=>`<option ${o===value?'selected':''}>${escapeHtml(o)}</option>`).join("")}</select></label>`;
  if(f.type==="textarea") return `<label class="field full"><span>${escapeHtml(f.label)}${f.req?' <em>*</em>':''}</span><textarea data-key="${f.k}" placeholder="${escapeHtml(f.ph||"")}"${req}>${escapeHtml(value)}</textarea></label>`;
  return `<label class="field"><span>${escapeHtml(f.label)}${f.req?' <em>*</em>':''}</span><input data-key="${f.k}" type="${f.type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(f.ph||"")}"${req}${f.min!==undefined?` min="${f.min}"`:''}${f.max!==undefined?` max="${f.max}"`:''}></label>`;
}
function selectEndpoint(id){
  current=ENDPOINTS.find(e=>e.id===id)||ENDPOINTS[0];
  $("#routeName").textContent=current.path;
  $("#routeDesc").textContent=current.desc;
  $("#formFields").innerHTML=current.fields.map(fieldHtml).join("");
  renderEndpointList($("#endpointSearch").value);
  $("#responseTitle").textContent="Ready";
  $("#responseMeta").textContent="No request yet";
  $("#responseBox").className="response-box empty";
  $("#responseBox").innerHTML=`<div class="empty-state"><div class="empty-icon">{ }</div><strong>Ready for ${escapeHtml(current.name)}</strong><span>Configure the fields and run the request.</span></div>`;
  $("#copyBtn").disabled=true;
}
function collectPayload(){
  const payload={};
  current.fields.forEach(f=>{
    const el=$(`[data-key="${f.k}"]`);
    if(!el) return;
    if(f.type==="checkbox"){ if(el.checked || f.k==="headless") payload[f.k]=el.checked; return; }
    const raw=el.value.trim();
    if(!raw) return;
    if(["timeout","max","start","waitTime"].includes(f.k)) payload[f.k]=Number(raw);
    else if(f.k==="challenge"){
      try { payload[f.k]=JSON.parse(raw); } catch { payload[f.k]=raw; }
    } else payload[f.k]=raw;
  });
  return payload;
}
function pretty(v){ return JSON.stringify(v,null,2); }
function showResponse(data,status,duration){
  lastResponse=data; lastStatus=status;
  const ok=status>=200 && status<300 && data?.success!==false;
  $("#responseTitle").textContent=ok?"Success":"Request failed";
  $("#responseMeta").textContent=`HTTP ${status}${duration?` · ${duration}s`:""}`;
  $("#responseBox").className="response-box";
  $("#responseBox").innerHTML=`<div class="response-status ${ok?'ok':'bad'}"><span>${ok?'✓':'!'}</span>${ok?'Completed':'Failed'}</div><pre>${escapeHtml(pretty(data))}</pre>`;
  $("#copyBtn").disabled=false;
  saved.unshift({endpoint:current.path,time:new Date().toISOString(),ok,status});
  saved.splice(12); localStorage.setItem("captchax-history",JSON.stringify(saved));
}
async function runRequest(ev){
  ev?.preventDefault();
  const btn=$("#runBtn"), hint=$("#requestHint"), started=performance.now();
  if(!$("#requestForm").reportValidity()) return;
  const payload=collectPayload();
  btn.disabled=true; btn.querySelector("span").textContent="Running…";
  hint.textContent="Request in progress. Browser-backed endpoints may take a while.";
  $("#responseBox").className="response-box loading";
  $("#responseBox").innerHTML=`<div class="loader"><span></span><strong>Waiting for API</strong><small>${escapeHtml(current.path)}</small></div>`;
  try{
    const res=await fetch(current.path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
    const text=await res.text();
    let data; try{data=JSON.parse(text)}catch{data={success:false,error:text||"Non-JSON response"}}
    showResponse(data,res.status,((performance.now()-started)/1000).toFixed(2));
    hint.textContent=res.ok?"Request completed.":"The API returned an error; inspect the response above.";
  }catch(err){
    showResponse({success:false,error:err.message},0,((performance.now()-started)/1000).toFixed(2));
    hint.textContent="Could not reach the API. Check that the server is running.";
  }finally{
    btn.disabled=false; btn.querySelector("span").textContent="Run request";
  }
}
async function getHealth(){
  try{
    const res=await fetch("/api/health",{cache:"no-store"}), data=await res.json();
    $("#apiState").className="status-pill online"; $("#apiState").innerHTML="<i></i>API online";
    $("#version").textContent=data.nodeVersion||"—";
    const slot=(data.browser||{}); $("#browserSlot").textContent=slot.holders ? `Busy · ${slot.queued||0} queued` : "Ready";
    renderHealth(data);
    return data;
  }catch{
    $("#apiState").className="status-pill offline"; $("#apiState").innerHTML="<i></i>API offline";
    $("#browserSlot").textContent="—"; return null;
  }
}
function metric(label,value,sub=""){
  return `<div class="metric card"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong>${sub?`<small>${escapeHtml(sub)}</small>`:""}</div>`;
}
function renderHealth(d){
  $("#healthGrid").innerHTML=[
    metric("RAM usage",d.ram?.usagePercent||"—",`${d.ram?.used||"—"} / ${d.ram?.total||"—"}`),
    metric("CPU",d.cpu?.cores?`${d.cpu.cores} cores`:"—",d.cpu?.model||"—"),
    metric("Disk",d.disk?.usagePercent||"—",`${d.disk?.used||"—"} used · ${d.disk?.free||"—"} free`),
    metric("Swap",d.swap?.usagePercent||"—",`${d.swap?.used||"—"} / ${d.swap?.total||"—"}`),
    metric("Node",d.nodeVersion||"—",`${d.platform||"—"} · ${d.arch||"—"}`),
    metric("Browser slot",d.browser?.holders?"Busy":"Available",d.browser?`${d.browser.holders||0}/${d.browser.max||1} holder · ${d.browser.queued||0} queued`:"—")
  ].join("");
}
function renderDocs(){
  $("#docsList").innerHTML=ENDPOINTS.map(e=>`<article class="doc card"><div class="doc-top"><div><span class="method">POST</span><code>${escapeHtml(e.path)}</code></div><span class="tag">${escapeHtml(e.group)}</span></div><h3>${escapeHtml(e.name)}</h3><p>${escapeHtml(e.desc)}</p><div class="chips">${e.fields.map(f=>`<span>${escapeHtml(f.k)}${f.req?' *':''}</span>`).join("")}</div></article>`).join("");
}
function setPage(page){
  $$(".tab").forEach(t=>t.classList.toggle("active",t.dataset.page===page));
  $$(".page").forEach(p=>p.classList.toggle("active",p.id===page+"Page"));
  if(page==="health") getHealth();
}
$("#endpointSearch").addEventListener("input",e=>renderEndpointList(e.target.value));
$("#requestForm").addEventListener("submit",runRequest);
$("#resetBtn").addEventListener("click",()=>selectEndpoint(current.id));
$("#refreshHealth").addEventListener("click",getHealth);
$("#copyBtn").addEventListener("click",async()=>{
  if(lastResponse) { await navigator.clipboard.writeText(pretty(lastResponse)); $("#copyBtn").textContent="Copied"; setTimeout(()=>$("#copyBtn").textContent="Copy JSON",1000); }
});
$$(".tab").forEach(t=>t.addEventListener("click",()=>setPage(t.dataset.page)));
document.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter"){e.preventDefault();$("#requestForm").requestSubmit()}});
$("#themeBtn").addEventListener("click",()=>{
  document.documentElement.classList.toggle("light");
  localStorage.setItem("captchax-theme",document.documentElement.classList.contains("light")?"light":"dark");
});
if(localStorage.getItem("captchax-theme")==="light") document.documentElement.classList.add("light");
renderEndpointList(); selectEndpoint("turnstile"); renderDocs(); getHealth();
setInterval(getHealth,30000);
