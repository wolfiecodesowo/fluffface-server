// Mood Cat - drops a cute tip or bit of encouragement now and then.
Fluffface.register({
  id: 'mood-cat', name: 'Mood Cat', version: '1.0.0', author: 'Fluffface',
  description: 'Every so often the cat pops up with a Minecraft tip or a bit of encouragement. Pure vibes.',
  enabledByDefault: false, position: { x: 0.5, y: 0.5 },
  settings: { every: { type: 'number', label: 'Minutes between messages', default: 10, min: 1, max: 120 } },
  mount(api) {
    const lines = [
      'torch up those caves ฅ no sneaky creepers',
      'drink water irl too, champ ♡',
      'always carry a water bucket for lava oopsies',
      'name your pets so they don’t despawn :3',
      'F3+? nah just vibe. you got this',
      'build the thing. the perfect version is the one that exists',
      'golden carrots = best food, remember that',
      'back up your world sometimes, future you says ty',
      'press the interact key, ask me anything',
      'curfew check: how long you been on? stretch ur paws',
      'beds explode in the Nether. respawn anchors there instead',
      'you’re doing great. one block at a time'
    ];
    // this mod has no panel of its own - it just sends toasts
    api.el.style.display = 'none';
    const fire = () => api.notify(lines[Math.floor(Math.random() * lines.length)], 8000);
    let t = 0;
    api.every(15000, () => {
      t += 15000;
      if (t >= Number(api.settings.every) * 60000) { t = 0; fire(); }
    });
  }
});
