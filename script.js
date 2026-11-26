"use strict";
function resolveTheme(preference,systemDark){return preference==="dark"||preference==="light"?preference:systemDark?"dark":"light";}
function normalizePreference(value){return ["light","dark","system"].includes(value)?value:"system";}
if(typeof module!=="undefined"&&module.exports)module.exports={resolveTheme,normalizePreference};
if(typeof document!=="undefined")document.addEventListener("DOMContentLoaded",()=>{
const key="theme-studio-preference",root=document.documentElement,media=window.matchMedia("(prefers-color-scheme: dark)"),get=id=>document.getElementById(id),select=get("theme-select"),toggle=get("theme-toggle");
let preference="system",canPersist=true;
try{preference=normalizePreference(localStorage.getItem(key)||localStorage.getItem("theme"));}catch{canPersist=false;}
function apply(){const resolved=resolveTheme(preference,media.matches);root.dataset.theme=resolved;select.value=preference;get("theme-status").textContent="Active: "+resolved+(preference==="system"?" (system)":" (manual)")+(canPersist?".":". Storage unavailable; this session only.");}
function choose(value){preference=normalizePreference(value);try{localStorage.setItem(key,preference);}catch{canPersist=false;}apply();}
select.addEventListener("change",()=>choose(select.value));toggle.addEventListener("click",()=>choose(resolveTheme(preference,media.matches)==="dark"?"light":"dark"));
const onSystemChange=()=>{if(preference==="system")apply();};if(media.addEventListener)media.addEventListener("change",onSystemChange);else if(media.addListener)media.addListener(onSystemChange);
let clicks=0;get("demo-action").addEventListener("click",()=>{clicks++;get("action-status").textContent="Action tested "+clicks+" time"+(clicks===1?"":"s")+".";});
const details=get("details-toggle");details.addEventListener("click",()=>{const expanded=details.getAttribute("aria-expanded")==="true";details.setAttribute("aria-expanded",String(!expanded));get("details").hidden=expanded;details.textContent=expanded?"Show design details":"Hide design details";});
for(const id of ["theme-select","theme-toggle","demo-action","details-toggle"])get(id).disabled=false;apply();
});
