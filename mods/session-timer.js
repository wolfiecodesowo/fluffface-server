// Example SERVER mod: lives in server/mods, gets pushed to every player.
// Shows how long you've been playing and nudges you to take breaks.
Fluffface.register({
  id: 'session-timer',
  name: 'Session Timer',
  version: '1.0.0',
  author: 'John',
  description: 'How long you\'ve been playing, plus an optional stretch/water reminder.',
  position: { x: 0.45, y: 0.08 },
  settings: {
    remind: { type: 'number', label: 'Break reminder every (minutes, 0 = off)', default: 60, min: 0, max: 600 },
    message: { type: 'text', label: 'Reminder text', default: 'stretch ur paws + drink water :3' }
  },

  mount(api) {
    api.css(`
      .st { padding: 6px 12px; display: flex; gap: 10px; align-items: center; }
      .st b { font-size: 16px; letter-spacing: 0.04em; }
    `);
    api.el.innerHTML = '<div class="ff-card st"><span class="ff-title">session</span><b data-t>0:00</b></div>';
    const t = api.el.querySelector('[data-t]');
    const start = Date.now();
    let lastNudge = start;

    api.every(1000, () => {
      const sec = Math.floor((Date.now() - start) / 1000);
      const h = Math.floor(sec / 3600);
      const m = Math.floor((sec % 3600) / 60);
      const s = sec % 60;
      t.textContent = h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;

      const every = Number(api.settings.remind) * 60 * 1000;
      if (every > 0 && Date.now() - lastNudge >= every) {
        lastNudge = Date.now();
        api.notify(api.settings.message, 8000);
      }
    });
  }
});
