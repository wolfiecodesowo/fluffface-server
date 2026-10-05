// Checklist - prep/build to-dos that tick off and save between sessions.
Fluffface.register({
  id: 'checklist', name: 'Checklist', version: '1.0.0', author: 'Fluffface',
  description: 'A tick-box list for prep or builds (saved between sessions). Add and edit it in interact mode.',
  enabledByDefault: false, position: { x: 0.02, y: 0.5 },
  mount(api) {
    api.css(`
      .cl{width:230px}.cl-h{padding:9px 12px}
      .cl-l{max-height:40vh;overflow-y:auto;padding:0 12px}
      .cl-i{display:flex;align-items:center;gap:8px;padding:5px 0;border-top:1px solid var(--line);font-size:12.5px}
      .cl-i .bx{width:15px;height:15px;border:1px solid var(--line);flex-shrink:0;cursor:pointer;display:grid;place-items:center;color:var(--red-hi);font-size:11px}
      .cl-i.done span{color:var(--muted);text-decoration:line-through}
      .cl-i span{flex:1;word-break:break-word}
      .cl-i .x{background:none;border:0;color:#555;cursor:pointer;display:none}
      body.edit .cl-i .x{display:block}
      .cl-f{display:none;border-top:1px solid var(--line)}
      body.edit .cl-f{display:flex}
      .cl-f input{flex:1;background:transparent;border:0;outline:none;color:var(--white);font:12.5px var(--mono);padding:9px 12px}
      .cl-f button{background:var(--red);border:0;color:#fff;padding:0 12px;cursor:pointer}
    `);
    api.el.innerHTML=`<div class="ff-card cl"><div class="cl-h"><span class="ff-title">checklist</span></div>
      <div class="cl-l" data-l></div>
      <form class="cl-f"><input maxlength="80" placeholder="add item..."><button type="submit">+</button></form></div>`;
    const lEl=api.el.querySelector('[data-l]'),form=api.el.querySelector('form'),input=form.querySelector('input');
    let items=Array.isArray(api.load())?api.load():[];
    const save=()=>api.save(items);
    const render=()=>{
      lEl.innerHTML='';
      items.forEach((it,i)=>{
        const row=document.createElement('div');row.className='cl-i'+(it.done?' done':'');
        row.innerHTML=`<div class="bx">${it.done?'x':''}</div><span></span><button class="x">&times;</button>`;
        row.querySelector('span').textContent=it.text;
        row.querySelector('.bx').addEventListener('click',()=>{it.done=!it.done;save();render();});
        row.querySelector('.x').addEventListener('click',()=>{items.splice(i,1);save();render();});
        lEl.append(row);
      });
    };
    form.addEventListener('submit',e=>{e.preventDefault();const t=input.value.trim();if(!t)return;items.push({text:t,done:false});input.value='';save();render();input.focus();});
    render();
  }
});
