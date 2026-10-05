// Speedrun / session timer with splits. Overlay-only; you press the buttons.
Fluffface.register({
  id: 'speedrun-timer', name: 'Speedrun Timer', version: '1.0.0', author: 'Fluffface',
  description: 'Start/stop a timer and drop splits (Nether, Fortress, Bastion, End...). You control it with the buttons.',
  enabledByDefault: false, position: { x: 0.015, y: 0.3 },
  mount(api) {
    api.css(`
      .sr{width:220px}.sr-h{padding:9px 12px}
      .sr-t{font-size:30px;text-align:center;letter-spacing:.04em;padding:2px 0 8px;font-variant-numeric:tabular-nums}
      .sr-b{display:flex;gap:6px;padding:0 12px 10px}
      .sr-b button{flex:1;background:#000;border:1px solid var(--line);color:var(--white);font:11px var(--mono);padding:7px;cursor:pointer}
      .sr-b button.go{background:var(--red);border-color:var(--red-hi)}
      .sr-l{border-top:1px solid var(--line);max-height:30vh;overflow-y:auto;padding:6px 12px}
      .sr-l div{display:flex;justify-content:space-between;color:var(--muted);font-size:12px;padding:2px 0}
      .sr-l b{color:var(--white);font-weight:400;font-variant-numeric:tabular-nums}
    `);
    api.el.innerHTML=`<div class="ff-card sr"><div class="sr-h"><span class="ff-title">splits</span></div>
      <div class="sr-t" data-t>0:00.0</div>
      <div class="sr-b"><button class="go" data-go>start</button><button data-split>split</button><button data-reset>reset</button></div>
      <div class="sr-l" data-l></div></div>`;
    const tEl=api.el.querySelector('[data-t]'),goBtn=api.el.querySelector('[data-go]'),lEl=api.el.querySelector('[data-l]');
    let running=false,start=0,acc=0,splits=[];
    const fmt=ms=>{const s=ms/1000;const m=Math.floor(s/60);return `${m}:${String(Math.floor(s%60)).padStart(2,'0')}.${Math.floor((s%1)*10)}`;};
    const now=()=>acc+(running?performance.now()-start:0);
    api.every(100,()=>{tEl.textContent=fmt(now());});
    goBtn.addEventListener('click',()=>{
      if(running){acc=now();running=false;goBtn.textContent='start';goBtn.classList.add('go');}
      else{start=performance.now();running=true;goBtn.textContent='stop';goBtn.classList.remove('go');}
    });
    api.el.querySelector('[data-split]').addEventListener('click',()=>{
      splits.push(now());
      lEl.innerHTML=splits.map((s,i)=>`<div><span>split ${i+1}</span><b>${fmt(s)}</b></div>`).reverse().join('');
    });
    api.el.querySelector('[data-reset]').addEventListener('click',()=>{
      running=false;acc=0;splits=[];goBtn.textContent='start';goBtn.classList.add('go');lEl.innerHTML='';tEl.textContent='0:00.0';
    });
  }
});
