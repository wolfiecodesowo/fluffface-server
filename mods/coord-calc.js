// Nether <-> Overworld coordinate converter. Pure math, no game access.
Fluffface.register({
  id: 'coord-calc', name: 'Coord Converter', version: '1.0.0', author: 'Fluffface',
  description: 'Type a coordinate and it converts Overworld <-> Nether (the 8:1 ratio) for lining up portals.',
  enabledByDefault: false, position: { x: 0.5, y: 0.2 },
  mount(api) {
    api.css(`
      .cc{width:250px}.cc-h{padding:9px 12px}
      .cc-b{padding:0 12px 12px;display:flex;flex-direction:column;gap:8px}
      .cc-row{display:flex;gap:6px}
      .cc input{flex:1;min-width:0;background:#000;border:1px solid var(--line);color:var(--white);font:13px var(--mono);padding:7px}
      .cc-seg{display:flex;border:1px solid var(--line)}
      .cc-seg button{flex:1;background:none;border:0;color:var(--muted);padding:6px;font:11px var(--mono);cursor:pointer}
      .cc-seg button.on{background:var(--red);color:#fff}
      .cc-out{border-top:1px solid var(--line);padding-top:8px;color:var(--white);font-size:15px;text-align:center}
      .cc-out b{color:var(--red-hi)}
    `);
    api.el.innerHTML=`<div class="ff-card cc"><div class="cc-h"><span class="ff-title">coords</span></div>
      <div class="cc-b">
        <div class="cc-seg"><button class="on" data-m="o2n">OW &rarr; Nether</button><button data-m="n2o">Nether &rarr; OW</button></div>
        <div class="cc-row"><input data-x placeholder="X" inputmode="numeric"><input data-z placeholder="Z" inputmode="numeric"></div>
        <div class="cc-out" data-out>enter X and Z</div>
      </div></div>`;
    let mode='o2n';
    const x=api.el.querySelector('[data-x]'),z=api.el.querySelector('[data-z]'),out=api.el.querySelector('[data-out]');
    const calc=()=>{
      const xv=parseFloat(x.value),zv=parseFloat(z.value);
      if(Number.isNaN(xv)||Number.isNaN(zv)){out.textContent='enter X and Z';return;}
      const f=mode==='o2n'?(n=>Math.round(n/8)):(n=>Math.round(n*8));
      out.innerHTML=`<b>${f(xv)}</b> , <b>${f(zv)}</b>`;
    };
    api.el.querySelectorAll('.cc-seg button').forEach(b=>b.addEventListener('click',()=>{
      mode=b.dataset.m;api.el.querySelectorAll('.cc-seg button').forEach(o=>o.classList.toggle('on',o===b));calc();
    }));
    x.addEventListener('input',calc);z.addEventListener('input',calc);
  }
});
