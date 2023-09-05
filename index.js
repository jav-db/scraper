(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}})();const q="modulepreload",F=function(e){return"/"+e},_={},y=function(t,n,a){if(!n||n.length===0)return t();const o=document.getElementsByTagName("link");return Promise.all(n.map(r=>{if(r=F(r),r in _)return;_[r]=!0;const s=r.endsWith(".css"),i=s?'[rel="stylesheet"]':"";if(!!a)for(let l=o.length-1;l>=0;l--){const w=o[l];if(w.href===r&&(!s||w.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${i}`))return;const u=document.createElement("link");if(u.rel=s?"stylesheet":q,s||(u.as="script",u.crossOrigin=""),u.href=r,document.head.appendChild(u),s)return new Promise((l,w)=>{u.addEventListener("load",l),u.addEventListener("error",()=>w(new Error(`Unable to preload CSS for ${r}`)))})})).then(()=>t()).catch(r=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=r,window.dispatchEvent(s),!s.defaultPrevented)throw r})};const $=async(e=window.location.hostname)=>{switch(e){case"moodyz.com":case"s1s1s1.com":case"ideapocket.com":case"attackers.net":case"av-e-body.com":case"wanz-factory.com":case"premium-beauty.com":case"kirakira-av.com":case"madonna-av.com":case"bibian-av.com":case"oppai-av.com":case"fitch-av.com":case"bi-av.com":case"mvg.jp":case"dasdas.jp":case"honnaka.jp":case"rookie-av.jp":case"tameikegoro.jp":case"kawaiikawaii.jp":case"befreebe.com":case"mko-labo.net":case"muku.tv":return await y(()=>import("./sites/modern-214c01c5.js"),[])}return null};let T=await $();const D=(e,t)=>t.some(n=>e instanceof n);let O,S;function X(){return O||(O=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function z(){return S||(S=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const j=new WeakMap,E=new WeakMap,C=new WeakMap,I=new WeakMap,h=new WeakMap;function Q(e){const t=new Promise((n,a)=>{const o=()=>{e.removeEventListener("success",r),e.removeEventListener("error",s)},r=()=>{n(d(e.result)),o()},s=()=>{a(e.error),o()};e.addEventListener("success",r),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&j.set(n,e)}).catch(()=>{}),h.set(t,e),t}function H(e){if(E.has(e))return;const t=new Promise((n,a)=>{const o=()=>{e.removeEventListener("complete",r),e.removeEventListener("error",s),e.removeEventListener("abort",s)},r=()=>{n(),o()},s=()=>{a(e.error||new DOMException("AbortError","AbortError")),o()};e.addEventListener("complete",r),e.addEventListener("error",s),e.addEventListener("abort",s)});E.set(e,t)}let P={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return E.get(e);if(t==="objectStoreNames")return e.objectStoreNames||C.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return d(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function A(e){P=e(P)}function J(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const a=e.call(p(this),t,...n);return C.set(a,t.sort?t.sort():[t]),d(a)}:z().includes(e)?function(...t){return e.apply(p(this),t),d(j.get(this))}:function(...t){return d(e.apply(p(this),t))}}function Y(e){return typeof e=="function"?J(e):(e instanceof IDBTransaction&&H(e),D(e,X())?new Proxy(e,P):e)}function d(e){if(e instanceof IDBRequest)return Q(e);if(I.has(e))return I.get(e);const t=Y(e);return t!==e&&(I.set(e,t),h.set(t,e)),t}const p=e=>h.get(e);function G(e,t,{blocked:n,upgrade:a,blocking:o,terminated:r}={}){const s=indexedDB.open(e,t),i=d(s);return a&&s.addEventListener("upgradeneeded",c=>{a(d(s.result),c.oldVersion,c.newVersion,d(s.transaction),c)}),n&&s.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),i.then(c=>{r&&c.addEventListener("close",()=>r()),o&&c.addEventListener("versionchange",u=>o(u.oldVersion,u.newVersion,u))}).catch(()=>{}),i}const Z=["get","getKey","getAll","getAllKeys","count"],ee=["put","add","delete","clear"],b=new Map;function R(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(b.get(t))return b.get(t);const n=t.replace(/FromIndex$/,""),a=t!==n,o=ee.includes(n);if(!(n in(a?IDBIndex:IDBObjectStore).prototype)||!(o||Z.includes(n)))return;const r=async function(s,...i){const c=this.transaction(s,o?"readwrite":"readonly");let u=c.store;return a&&(u=u.index(i.shift())),(await Promise.all([u[n](...i),o&&c.done]))[0]};return b.set(t,r),r}A(e=>({...e,get:(t,n,a)=>R(t,n)||e.get(t,n,a),has:(t,n)=>!!R(t,n)||e.has(t,n)}));const te=["continue","continuePrimaryKey","advance"],k={},v=new WeakMap,V=new WeakMap,ne={get(e,t){if(!te.includes(t))return e[t];let n=k[t];return n||(n=k[t]=function(...a){v.set(this,V.get(this)[t](...a))}),n}};async function*re(...e){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...e)),!t)return;t=t;const n=new Proxy(t,ne);for(V.set(n,t),h.set(n,p(t));t;)yield n,t=await(v.get(n)||t.continue()),v.delete(n)}function M(e,t){return t===Symbol.asyncIterator&&D(e,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&D(e,[IDBIndex,IDBObjectStore])}A(e=>({...e,get(t,n,a){return M(t,n)?re:e.get(t,n,a)},has(t,n){return M(t,n)||e.has(t,n)}}));const f="pages",B="queue",W="type",N="updated",L="status",oe=IDBKeyRange.lowerBound(new Date),se=IDBKeyRange.bound([0,""],[0,"￿"]),ae=1;let ce="scraper",m=null;const g=async()=>m||(m=await G(ce,ae,{upgrade(e){const t=e.createObjectStore(f,{keyPath:"url"});t.createIndex(L,["status","ctype"]),t.createIndex(W,"ptype"),t.createIndex(N,"date"),t.createIndex(B,"q")}}),m),x=async()=>(await g()).transaction(f,"readwrite"),U=async()=>(await g()).transaction(f,"readonly"),K=async e=>(await g()).put(f,e),ie=async e=>(await g()).add(f,e),ue=async()=>{const e=await U(),t=await e.store.count(),n=await e.store.index(B).count(),a=await e.store.index(N).count(oe),o=await e.store.index(L).count(se);return await e.done,{total:t,queue:n,done:o,updated:a}},de=async e=>{if(!e)return;const t=await x();await t.store.clear();for(const n of e)await t.store.add({url:n,q:0});await t.done},De=async()=>{const e=await x(),t=await e.store.index(B).openCursor();if(!t)return await e.done,null;const n=t.value;return delete n.q,await t.update({...n,status:1,ctype:"?"}),await e.done,n},le=async(e="text/html")=>{const t=await x(),n=IDBKeyRange.bound([2,e],[2,e+"￿"]),a=await t.store.index(L).openCursor(n);if(!a)return await t.done,null;const o=a.value;return await a.update({...o,status:3}),await t.done,o},fe=async e=>{if(!e?.length)return{};const t=await U(),n=t.store.index(W),a=await Promise.all(e.map(o=>n.count(o)));return await t.done,Object.fromEntries(e.map((o,r)=>[o,a[r]]))};async function*we(){let e=!0;const t=()=>{},n=new DOMParser;for(;;){const a=await le();if(!a){yield null;continue}e=!0;const o=async(r,s)=>{e=!1;const i={...a,...r,status:0};if(await K(i),s){const c=i.url;for(const[u,l]of s)await ie({url:u,ref:c,...l}).catch(t)}};yield{update:o,url:a.newURL??a.url,doc:n.parseFromString(a.body,"text/html")},e&&await o(null)}}const me="self.addEventListener('message',e=>import(e.data),{once:!0})",pe=new Blob([me],{type:"application/javascript"}),ye=URL.createObjectURL(pe),he=e=>{const t=new Worker(ye,{type:"module"});return t.postMessage(e),t},ge=(e=1)=>{const t=import.meta.resolve("./workerCrawler.js"),n=Array.from({length:e||1},(r,s)=>he(t)),a=r=>{for(const s of n)s.postMessage(JSON.stringify(r))};return{workers:n,send:a,stop:()=>{a({action:"stop"}),setTimeout(()=>{for(const r of n)r.terminate()},999)},start:r=>a({action:"start",...r})}},Ie=e=>{if(!e?.processPage)throw new Error("no processor");const t={},n={},a=()=>(ue().then(s=>Object.assign(n,s)),e.countTypes&&fe(e.countTypes).then(s=>Object.assign(t,s)),{stats:n,counts:t}),o=ge(2);async function*r(){o.start({origin:window.origin}),await new Promise(i=>setTimeout(i,500));let s=0;for await(const i of we()){if(!i){if(await new Promise(u=>setTimeout(u,100)),++s,s>100)break;continue}yield i.url,s=0;const c=e.processPage(i.url,i.doc);c&&await i.update(c.page,c.queue)}o.stop(),a()}return{run:r,crawler:o,updateStats:a,init:async()=>{for(const s of e.startURLs)await K({url:s,q:0})},reset:()=>de(e.startURLs)}},Ee=Ie(T),{createApp:be}=await y(()=>import("./vue.runtime.esm-bundler-3944646b.js"),["vue.runtime.esm-bundler-3944646b.js","runtime-core.esm-bundler-35391e07.js"]);T?y(()=>import("./App-b81f0d88.js"),["App-b81f0d88.js","runtime-core.esm-bundler-35391e07.js"]).then(e=>be(e.default).mount("#app")):(document.querySelector("#app").innerHTML=`${window.location.hostname}`,y(()=>import("./workerCrawler.js"),[]));export{K as a,Ee as c,T as m,De as p};
