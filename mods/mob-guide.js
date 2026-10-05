// Mob tips & weaknesses (Bedrock). Static reference.
Fluffface.register({
  id: 'mob-guide', name: 'Mob Guide', version: '1.0.0', author: 'Fluffface',
  description: 'Quick weaknesses and tips for the mobs that actually cause trouble.',
  enabledByDefault: false, position: { x: 0.74, y: 0.12 },
  mount(api) {
    const mobs = [
      ['Creeper', 'Hit & step back. Cats/ocelots scare them. Charged = struck by lightning.'],
      ['Skeleton', 'Undead — use Smite. Close the gap so it can’t kite you.'],
      ['Zombie / Husk', 'Undead — Smite. They call friends; don’t get swarmed.'],
      ['Spider / Cave Spider', 'Bane of Arthropods. Cave spiders poison — bring milk.'],
      ['Enderman', 'Don’t look at its body. Water/rain hurts it; fight under a 2-high roof.'],
      ['Blaze', 'Snowballs & Fire Resistance. Use cover from its fireballs.'],
      ['Warden', 'Sneak, don’t make noise. You can’t really fight it — run or wool the sculk.'],
      ['Piglin', 'Wear gold so they stay neutral. Never open chests near them.'],
      ['Ravager (raids)', 'Shields + mobility. Milk clears Bad Omen before you enter town.']
    ];
    api.css(`
      .mg{width:280px}.mg-h{padding:9px 12px}.mg-l{max-height:50vh;overflow-y:auto;padding:0 12px 10px}
      .mg-r{padding:6px 0;border-top:1px solid var(--line)}
      .mg-r b{display:block;color:var(--red-hi);font-weight:400;font-size:12.5px} .mg-r span{color:var(--muted);font-size:12px}
    `);
    api.el.innerHTML = `<div class="ff-card mg"><div class="mg-h"><span class="ff-title">mobs</span></div><div class="mg-l">${
      mobs.map(([k, v]) => `<div class="mg-r"><b>${k}</b><span>${v}</span></div>`).join('')
    }</div></div>`;
  }
});
