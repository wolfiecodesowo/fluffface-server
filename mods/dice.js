// Dice / random picker - coin flip, d6/d20, compass direction, yes/no.
Fluffface.register({
  id: 'dice', name: 'Dice & Picker', version: '1.0.0', author: 'Fluffface',
  description: 'Coin flip, dice, a random compass direction, or yes/no - for when you can’t decide.',
  enabledByDefault: false, position: { x: 0.5, y: 0.6 },
  mount(api) {
    const pick = a => a[Math.floor(Math.random()*a.length)];
    const modes = {
      coin: () => pick(['Heads', 'Tails']),
      d6: () => 'd6: ' + (1+Math.floor(Math.random()*6)),
      d20: () => 'd20: ' + (1+Math.floor(Math.random()*20)),
      dir: () => 'Go ' + pick(['North (-Z)', 'South (+Z)', 'East (+X)', 'West (-X)']),
      yn: () => pick(['Yes', 'No', 'Maybe'])
    };
    api.css(`
      .dc{width:210px;text-align:center}.dc-h{padding:9px 12px}
      .dc-out{font-size:22px;font-weight:700;padding:4px 10px 10px;min-height:30px;color:var(--red-hi)}
      .dc-b{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 12px;justify-content:center}
      .dc-b button{background:#000;border:1px solid var(--line);color:var(--white);font:11px var(--mono);padding:7px 10px;cursor:pointer}
      .dc-b button:hover{border-color:var(--red-hi)}
    `);
    api.el.innerHTML=`<div class="ff-card dc"><div class="dc-h"><span class="ff-title">decide</span></div>
      <div class="dc-out" data-out>?</div>
      <div class="dc-b">
        <button data-m="coin">coin</button><button data-m="d6">d6</button><button data-m="d20">d20</button>
        <button data-m="dir">direction</button><button data-m="yn">yes/no</button>
      </div></div>`;
    const out=api.el.querySelector('[data-out]');
    api.el.querySelectorAll('.dc-b button').forEach(b=>b.addEventListener('click',()=>{
      out.textContent='...';setTimeout(()=>{out.textContent=modes[b.dataset.m]();},120);
    }));
  }
});
