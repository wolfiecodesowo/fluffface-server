// XP & enchanting reference (Bedrock). Static.
Fluffface.register({
  id: 'xp-guide', name: 'XP Guide', version: '1.0.0', author: 'Fluffface',
  description: 'XP sources, how much ores give, and the levels you need for enchanting.',
  enabledByDefault: false, position: { x: 0.74, y: 0.12 },
  mount(api) {
    const sections = [
      ['enchanting', [
        ['Full power table', 'needs 15 bookshelves + level 30'],
        ['Anvil / grindstone', 'combine & rename gear (costs levels)']
      ]],
      ['best xp sources', [
        ['Ender Dragon (first kill)', '~12,000 xp'],
        ['Breeding / fishing', 'steady, afk-friendly'],
        ['Mob/XP farm', 'spawner or mob grinder'],
        ['Smelting / ore mining', 'passive while you work']
      ]],
      ['ore xp (each)', [
        ['Diamond / Emerald', '3 - 7'], ['Nether Quartz / Lapis', '2 - 5'],
        ['Redstone', '1 - 5'], ['Coal', '0 - 2']
      ]]
    ];
    api.css(`
      .xg{width:270px}.xg-h{padding:9px 12px}.xg-l{max-height:50vh;overflow-y:auto;padding:0 12px 10px}
      .xg-s{color:var(--red-hi);font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin:8px 0 2px}
      .xg-r{display:flex;justify-content:space-between;gap:10px;padding:4px 0;border-top:1px solid var(--line);font-size:12px}
      .xg-r b{color:var(--white);font-weight:400} .xg-r span{color:var(--muted);text-align:right}
    `);
    api.el.innerHTML = `<div class="ff-card xg"><div class="xg-h"><span class="ff-title">xp</span></div><div class="xg-l">${
      sections.map(([t, rows]) => `<div class="xg-s">${t}</div>` + rows.map(([k, v]) => `<div class="xg-r"><b>${k}</b><span>${v}</span></div>`).join('')).join('')
    }</div></div>`;
  }
});
