// AI recipe / how-to lookup. Type an item, get the Bedrock recipe via fluff.ai.
Fluffface.register({
  id: 'recipe-lookup', name: 'Recipe Lookup', version: '1.0.0', author: 'Fluffface',
  description: 'Type any item and get its Bedrock crafting/smelting/brewing recipe, powered by the AI. Needs an API key.',
  enabledByDefault: false, position: { x: 0.76, y: 0.4 },
  mount(api) {
    api.css(`
      .rl{width:300px}.rl-h{padding:9px 12px}
      .rl-f{display:flex;border-top:1px solid var(--line)}
      .rl-f input{flex:1;background:transparent;border:0;outline:none;color:var(--white);font:13px var(--mono);padding:10px 12px}
      .rl-f input::placeholder{color:#6f6f78}
      .rl-f button{background:var(--red);border:0;color:#fff;font:700 12px var(--mono);padding:0 14px;cursor:pointer}
      .rl-f button:disabled{opacity:.4}
      .rl-o{border-top:1px solid var(--line);padding:10px 12px;color:var(--white);white-space:pre-wrap;word-wrap:break-word;user-select:text;max-height:36vh;overflow-y:auto;display:none}
      .rl-o.show{display:block}.rl-o.err{color:#ff9a9a}
      .rl.busy .ff-title::before{animation:rl-b .6s infinite alternate}@keyframes rl-b{to{opacity:.2}}
    `);
    api.el.innerHTML=`<div class="ff-card rl"><div class="rl-h"><span class="ff-title">recipe lookup</span></div>
      <div class="rl-o" data-o></div>
      <form class="rl-f"><input maxlength="60" placeholder="beacon, tnt, respawn anchor..."><button type="submit">find</button></form></div>`;
    const box=api.el.querySelector('.rl'),out=api.el.querySelector('[data-o]'),form=api.el.querySelector('form'),input=form.querySelector('input'),btn=form.querySelector('button');
    form.addEventListener('submit',async e=>{
      e.preventDefault();const q=input.value.trim();if(!q)return;btn.disabled=true;
      out.className='rl-o show';out.textContent='...';box.classList.add('busy');
      const r=await api.ask([{role:'user',content:`Give the Minecraft Bedrock recipe for "${q}". List exact ingredients and the grid/arrangement. If it's smelted or brewed, say so. Be brief.`}]);
      box.classList.remove('busy');btn.disabled=false;
      if(r.error){out.className='rl-o show err';out.textContent=r.error;}else out.textContent=r.text;
    });
    api.onEditMode(on=>{if(on)setTimeout(()=>input.focus(),30);});
  }
});
