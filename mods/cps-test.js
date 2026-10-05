// CPS tester - click the pad as fast as you can; shows current and best CPS.
// Counts clicks inside its own box only; nothing to do with the game.
Fluffface.register({
  id: 'cps-test', name: 'CPS Test', version: '1.0.0', author: 'Fluffface',
  description: 'A click pad that measures your clicks-per-second and your best burst. Good for warming up.',
  enabledByDefault: false, position: { x: 0.5, y: 0.35 },
  mount(api) {
    api.css(`
      .ct{width:210px;text-align:center}.ct-h{padding:9px 12px}
      .ct-pad{margin:0 12px 10px;border:1px dashed var(--line);border-radius:8px;padding:16px 8px;cursor:pointer;user-select:none}
      .ct-pad:active{background:rgba(139,0,0,.3)}
      .ct-big{font-size:34px;font-weight:700;font-variant-numeric:tabular-nums}
      .ct-sub{color:var(--muted);font-size:12px}
      .ct-best{border-top:1px solid var(--line);padding:8px 12px;color:var(--muted);font-size:12px;display:flex;justify-content:space-between}
      .ct-best b{color:var(--red-hi);font-weight:400}
      .ct-r{background:none;border:0;color:var(--muted);cursor:pointer;font:11px var(--mono)}
    `);
    api.el.innerHTML=`<div class="ff-card ct"><div class="ct-h"><span class="ff-title">cps test</span></div>
      <div class="ct-pad" data-pad><div class="ct-big" data-big>0</div><div class="ct-sub">click here fast</div></div>
      <div class="ct-best"><span>best: <b data-best>0</b> cps</span><button class="ct-r" data-reset>reset</button></div></div>`;
    const big=api.el.querySelector('[data-big]'),bestEl=api.el.querySelector('[data-best]');
    let clicks=[],best=0;
    api.el.querySelector('[data-pad]').addEventListener('pointerdown',()=>clicks.push(performance.now()));
    api.el.querySelector('[data-reset]').addEventListener('click',()=>{best=0;bestEl.textContent='0';});
    api.every(100,()=>{
      const n=performance.now();clicks=clicks.filter(t=>n-t<1000);
      const c=clicks.length;big.textContent=c;if(c>best){best=c;bestEl.textContent=c;}
    });
  }
});
