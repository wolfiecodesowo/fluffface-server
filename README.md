# Fluffface update server

Upload everything in this folder to your host (e.g. the `fluffface-server` GitHub Pages repo).

- `manifest.json`: list of server mods + checksums. Rebuild it with `npm run publish-mods` every time you change `mods/`.
- `mods/`: the mod files every player gets
- `app/`: client installer + `latest.yml` for auto-updates (filled by `npm run release`)
