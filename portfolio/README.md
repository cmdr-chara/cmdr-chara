# Chara · Waterfall

A small playable portfolio with Frisk exploring Waterfall and Chara presenting projects in a shop. English and Italian are available throughout the game. You can switch language while reading a conversation.

[Open the portfolio](https://cmdr-chara.github.io/cmdr-chara/) · [Read the profile](https://github.com/cmdr-chara)

## Controls

- Arrow keys or WASD: move.
- Z or Enter: interact and advance completed text.
- X: reveal text or go back. Escape also leaves a long shop conversation.
- C: inventory and stats. L or IT / EN: language.
- M: audio. F: fullscreen. Phones have touch controls.

The shop's Projects menu opens project stories and repository links. Talk includes the presentation, tools, contact link and conversations about the shop. The profile README also lists projects and contributions directly, so playing is optional.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000 --directory portfolio
```

Open http://localhost:8000. The site is static and needs no installation or build step.

## Browser storage and attribution

Gameplay progress, language and audio preferences are stored in the visitor's browser. The portfolio has no contact form, analytics script or application backend. External project and credit links open their respective sites.

This is an independent fan portfolio. Original game assets, the shop illustration and music belong to their respective authors; see [credits](CREDITS.md). This directory contains only the standalone overworld and its required media.
