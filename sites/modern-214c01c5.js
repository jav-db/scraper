const f=window.origin,g=t=>t.startsWith("/works/detail/")?"video":t.startsWith("/actress/detail/")?"actress":t.startsWith("/works/list/date/")?"list:video:date":t.startsWith("/works/list/")?"list:video:tag":t.startsWith("/actress")?"list:actress":"misc",y=new Map([["list:video:date",1],["video",3],["list:actress",4],["actress",6],["list:video:tag",8],["misc",9]]),m="modern",p=["/works/date","/actress"],h=["list:video:date","list:video:tag","actress","video"],v=(t,e)=>{const i=new Map;for(const r of e.links){if(!r.href||r.href.startsWith("javascript"))continue;const{pathname:d,origin:o,searchParams:s}=new URL(r.href);if(o!==f)continue;const a=s.get("page"),c=`${d}${a?`?page=${a}`:""}`;if(i.has(c))continue;const l=g(c),u=(a?1:0)+(y.get(l)||0);i.set(c,{q:u,ptype:l})}const n=e.querySelector("main")??e.body;return{queue:i,page:{body:n.innerHTML.replace(/\s+/g," ").trim()}}};function*w(t){for(const e of t.querySelectorAll("div.c-card"))yield{url:e.querySelector("a.img")?.href,title:e.querySelector("p.text")?.innerText?.trim(),img:e.querySelector("img")?.dataset.src}}function*q(t){for(const e of t.querySelectorAll("img.swiper-lazy")){const i=e.dataset?.src;i&&(yield i)}}function*S(t){for(const e of t.querySelectorAll("div.p-workPage__table > div.item")){const i=e.querySelector("div.th")?.innerText?.trim(),n=e.querySelector("div.td")?.innerText?.trim();if(!i||!n)continue;const r=[...e.querySelectorAll("div.td a")].map(s=>({url:s.href,name:s.innerText.trim()}));if(r.length){yield[i,r];continue}const o=[...e.querySelector("div.td p")?.childNodes??[]].find(s=>s.nodeType===Node.TEXT_NODE).nodeValue.trim();o&&(yield[i,o])}}const T=async()=>{};export{h as countTypes,T as exportPages,w as getVideoCards,q as getVideoImages,S as getVideoInfo,m as name,v as processPage,p as startURLs};