// Best-enchantments-per-item reference (Bedrock). Static data.
Fluffface.register({
  id: 'enchant-guide', name: 'Enchant Guide', version: '1.0.0', author: 'Fluffface',
  description: 'The go-to max enchantments for each tool, weapon and armor piece.',
  enabledByDefault: false, position: { x: 0.74, y: 0.12 },
  mount(api) {
    const data = [
      ['Sword', 'Sharpness V, Looting III, Fire Aspect II, Unbreaking III, Mending'],
      ['Axe', 'Sharpness V (or Efficiency V), Unbreaking III, Mending'],
      ['Pickaxe', 'Efficiency V, Fortune III OR Silk Touch, Unbreaking III, Mending'],
      ['Shovel / Hoe', 'Efficiency V, Unbreaking III, Mending (Silk Touch optional)'],
      ['Bow', 'Power V, Flame, Punch II, Infinity OR Mending, Unbreaking III'],
      ['Crossbow', 'Quick Charge III, Multishot OR Piercing IV, Unbreaking III, Mending'],
      ['Trident', 'Impaling V, Loyalty III OR Riptide III, Channeling, Unbreaking III'],
      ['Helmet', 'Protection IV, Respiration III, Aqua Affinity, Unbreaking III, Mending'],
      ['Chestplate', 'Protection IV, Unbreaking III, Mending'],
      ['Leggings', 'Protection IV, Unbreaking III, Mending'],
      ['Boots', 'Protection IV, Feather Falling IV, Depth Strider III, Soul Speed III, Mending'],
      ['Elytra', 'Unbreaking III, Mending'],
      ['Shield', 'Unbreaking III, Mending']
    ];
    api.css(`
      .eg{width:290px}.eg-h{padding:9px 12px}
      .eg-l{max-height:50vh;overflow-y:auto;padding:0 12px 10px}
      .eg-r{padding:6px 0;border-top:1px solid var(--line)}
      .eg-r b{display:block;color:var(--red-hi);font-weight:400;font-size:12.5px}
      .eg-r span{color:var(--muted);font-size:12px}
    `);
    api.el.innerHTML=`<div class="ff-card eg"><div class="eg-h"><span class="ff-title">enchants</span></div>
      <div class="eg-l">${data.map(([k,v])=>`<div class="eg-r"><b>${k}</b><span>${v}</span></div>`).join('')}</div></div>`;
  }
});
