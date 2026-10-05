// Potion brewing reference (Bedrock). Static data.
Fluffface.register({
  id: 'brewing-guide', name: 'Brewing Guide', version: '1.0.0', author: 'Fluffface',
  description: 'Every base potion recipe plus the redstone/glowstone/gunpowder modifiers.',
  enabledByDefault: false, position: { x: 0.74, y: 0.12 },
  mount(api) {
    const base = [
      ['Awkward (base)', 'Water + Nether Wart'], ['Healing', 'Awkward + Glistering Melon'],
      ['Regeneration', 'Awkward + Ghast Tear'], ['Strength', 'Awkward + Blaze Powder'],
      ['Swiftness', 'Awkward + Sugar'], ['Fire Resistance', 'Awkward + Magma Cream'],
      ['Night Vision', 'Awkward + Golden Carrot'], ['Water Breathing', 'Awkward + Pufferfish'],
      ['Leaping', 'Awkward + Rabbit’s Foot'], ['Poison', 'Awkward + Spider Eye'],
      ['Turtle Master', 'Awkward + Turtle Shell'], ['Slow Falling', 'Awkward + Phantom Membrane'],
      ['Weakness', 'Water + Fermented Spider Eye']
    ];
    const mods = [['Redstone', 'longer duration'], ['Glowstone', 'stronger effect'], ['Fermented Spider Eye', 'corrupt / invert'], ['Gunpowder', 'make it a splash potion'], ['Dragon’s Breath', 'make it lingering']];
    api.css(`
      .bg{width:270px}.bg-h{padding:9px 12px}
      .bg-l{max-height:48vh;overflow-y:auto;padding:0 12px 10px}
      .bg-s{color:var(--red-hi);font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin:8px 0 2px}
      .bg-r{display:flex;justify-content:space-between;gap:10px;padding:4px 0;border-top:1px solid var(--line);font-size:12px}
      .bg-r b{color:var(--white);font-weight:400;white-space:nowrap} .bg-r span{color:var(--muted);text-align:right}
    `);
    const rows = a => a.map(([k,v])=>`<div class="bg-r"><b>${k}</b><span>${v}</span></div>`).join('');
    api.el.innerHTML=`<div class="ff-card bg"><div class="bg-h"><span class="ff-title">brewing</span></div>
      <div class="bg-l"><div class="bg-s">potions</div>${rows(base)}<div class="bg-s">modifiers</div>${rows(mods)}</div></div>`;
  }
});
