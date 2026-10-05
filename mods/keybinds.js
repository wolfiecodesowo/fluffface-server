// Bedrock default controls cheat-sheet. Static reference.
Fluffface.register({
  id: 'keybinds', name: 'Controls Cheat-Sheet', version: '1.0.0', author: 'Fluffface',
  description: 'Default Minecraft Bedrock (keyboard & mouse) controls, in a scrollable list.',
  enabledByDefault: false, position: { x: 0.02, y: 0.1 },
  mount(api) {
    const rows = [
      ['Move', 'W A S D'], ['Jump', 'Space'], ['Sneak', 'Shift'], ['Sprint', 'Ctrl / double-W'],
      ['Inventory', 'E'], ['Drop item', 'Q'], ['Break / attack', 'Left click'], ['Use / place', 'Right click'],
      ['Pick block', 'Middle click'], ['Hotbar', '1 - 9'], ['Chat', 'T'], ['Command', '/'],
      ['Perspective', 'F5'], ['Fullscreen', 'F11'], ['Pause', 'Esc']
    ];
    api.css(`
      .kb{width:230px}.kb-h{padding:9px 12px}
      .kb-l{max-height:46vh;overflow-y:auto;padding:0 12px 10px}
      .kb-r{display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-top:1px solid var(--line);font-size:12.5px}
      .kb-r span{color:var(--muted)} .kb-r b{color:var(--white);font-weight:400}
    `);
    api.el.innerHTML = `<div class="ff-card kb"><div class="kb-h"><span class="ff-title">controls</span></div>
      <div class="kb-l">${rows.map(([k,v])=>`<div class="kb-r"><span>${k}</span><b>${v}</b></div>`).join('')}</div></div>`;
  }
});
