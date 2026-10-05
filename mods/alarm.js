// Real-world alarm - "stop playing at HH:MM". Overlay-only.
Fluffface.register({
  id: 'alarm', name: 'Alarm', version: '1.0.0', author: 'Fluffface',
  description: 'Set a real-world time and the cat nudges you when you hit it — handy for "just one more hour".',
  enabledByDefault: false, position: { x: 0.5, y: 0.14 },
  mount(api) {
    api.css(`
      .al{width:210px;text-align:center}.al-h{padding:9px 12px}
      .al-b{padding:0 12px 12px;display:flex;flex-direction:column;gap:8px}
      .al input{background:#000;border:1px solid var(--line);color:var(--white);font:15px var(--mono);padding:7px;text-align:center}
      .al button{background:var(--red);border:1px solid var(--red-hi);color:#fff;font:11px var(--mono);padding:7px;cursor:pointer}
      .al-s{color:var(--muted);font-size:12px;min-height:16px}
    `);
    api.el.innerHTML = `<div class="ff-card al"><div class="al-h"><span class="ff-title">alarm</span></div>
      <div class="al-b"><input type="time" data-time><button data-set>set alarm</button><div class="al-s" data-s></div></div></div>`;
    const timeEl = api.el.querySelector('[data-time]'), sEl = api.el.querySelector('[data-s]');
    let target = api.load()?.target || null;
    let fired = false;
    if (target) { timeEl.value = target; sEl.textContent = `alarm at ${target}`; }
    api.el.querySelector('[data-set]').addEventListener('click', () => {
      if (!timeEl.value) return;
      target = timeEl.value; fired = false; api.save({ target });
      sEl.textContent = `alarm at ${target}`;
    });
    api.every(5000, () => {
      if (!target || fired) return;
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      if (hhmm === target) { fired = true; api.notify(`⏰ it’s ${target} — maybe time to log off ฅ`, 12000); sEl.textContent = 'alarm went off'; }
    });
  }
});
