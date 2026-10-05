// Pomodoro focus timer - for grind sessions. Overlay-only.
Fluffface.register({
  id: 'pomodoro', name: 'Focus Timer', version: '1.0.0', author: 'Fluffface',
  description: 'A focus/break countdown for long grind or build sessions, with a gentle toast at each switch.',
  enabledByDefault: false, position: { x: 0.5, y: 0.08 },
  settings: {
    focus: { type: 'number', label: 'Focus minutes', default: 25, min: 1, max: 180 },
    brk: { type: 'number', label: 'Break minutes', default: 5, min: 1, max: 60 }
  },
  mount(api) {
    const F = Number(api.settings.focus) * 60000, B = Number(api.settings.brk) * 60000;
    api.css(`
      .pm{width:200px;text-align:center}.pm-h{padding:9px 12px}
      .pm-ph{font-size:11px;letter-spacing:.16em;text-transform:uppercase}
      .pm-ph.focus{color:var(--red-hi)} .pm-ph.brk{color:#6be38f}
      .pm-t{font-size:32px;font-variant-numeric:tabular-nums;padding:2px 0 8px}
      .pm-b{display:flex;gap:6px;padding:0 12px 10px}
      .pm-b button{flex:1;background:#000;border:1px solid var(--line);color:var(--white);font:11px var(--mono);padding:7px;cursor:pointer}
      .pm-b button.go{background:var(--red);border-color:var(--red-hi)}
    `);
    api.el.innerHTML=`<div class="ff-card pm"><div class="pm-h"><span class="ff-title">focus</span></div>
      <div class="pm-ph focus" data-ph>focus</div><div class="pm-t" data-t></div>
      <div class="pm-b"><button class="go" data-go>start</button><button data-reset>reset</button></div></div>`;
    const phEl=api.el.querySelector('[data-ph]'),tEl=api.el.querySelector('[data-t]'),goBtn=api.el.querySelector('[data-go]');
    let phase='focus',left=F,running=false,lastTick=0;
    const fmt=ms=>{const s=Math.max(0,Math.ceil(ms/1000));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;};
    const setPhase=p=>{phase=p;left=p==='focus'?F:B;phEl.textContent=p==='focus'?'focus':'break';phEl.className='pm-ph '+(p==='focus'?'focus':'brk');};
    const render=()=>{tEl.textContent=fmt(left);};
    setPhase('focus');render();
    goBtn.addEventListener('click',()=>{running=!running;lastTick=performance.now();goBtn.textContent=running?'pause':'start';goBtn.classList.toggle('go',!running);});
    api.el.querySelector('[data-reset]').addEventListener('click',()=>{running=false;goBtn.textContent='start';goBtn.classList.add('go');setPhase('focus');render();});
    api.every(250,()=>{
      if(!running)return;const n=performance.now();left-=n-lastTick;lastTick=n;
      if(left<=0){const next=phase==='focus'?'break':'focus';api.notify(next==='break'?'break time ฅ stretch + water':'back to it, you got this ♡',7000);setPhase(next);}
      render();
    });
  }
});
