// Food reference - hunger & saturation (Bedrock). Static, sorted by saturation.
Fluffface.register({
  id: 'food-guide', name: 'Food Guide', version: '1.0.0', author: 'Fluffface',
  description: 'Best foods by saturation (how long they keep you full) and hunger restored.',
  enabledByDefault: false, position: { x: 0.74, y: 0.12 },
  mount(api) {
    const food = [
      ['Golden Carrot', '6', '14.4'], ['Cooked Porkchop', '8', '12.8'], ['Steak', '8', '12.8'],
      ['Cooked Salmon', '6', '9.6'], ['Cooked Mutton', '6', '9.6'], ['Golden Apple', '4', '9.6'],
      ['Cooked Chicken', '6', '7.2'], ['Cooked Cod', '5', '6.0'], ['Bread', '5', '6.0'],
      ['Baked Potato', '5', '6.0'], ['Carrot', '3', '3.6'], ['Apple', '4', '2.4'],
      ['Sweet Berries', '2', '0.4'], ['Cookie', '2', '0.4']
    ];
    api.css(`
      .fg{width:250px}.fg-h{padding:9px 12px}
      .fg-hd{display:flex;justify-content:space-between;color:var(--red-hi);font-size:10.5px;letter-spacing:.06em;padding:0 12px 4px}
      .fg-l{max-height:48vh;overflow-y:auto;padding:0 12px 10px}
      .fg-r{display:flex;justify-content:space-between;padding:4px 0;border-top:1px solid var(--line);font-size:12.5px}
      .fg-r b{color:var(--white);font-weight:400} .fg-r i{font-style:normal;color:var(--muted);width:38px;text-align:right}
    `);
    api.el.innerHTML=`<div class="ff-card fg"><div class="fg-h"><span class="ff-title">food</span></div>
      <div class="fg-hd"><span>item</span><span>hunger&nbsp;&nbsp;sat</span></div>
      <div class="fg-l">${food.map(([n,h,s])=>`<div class="fg-r"><b>${n}</b><span><i>${h}</i><i>${s}</i></span></div>`).join('')}</div></div>`;
  }
});
