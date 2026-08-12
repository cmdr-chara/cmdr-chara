<div align="center">
  <img src="assets/chara-wink-dialogue-red-green.gif" width="360" alt="Animated Undertale-style dialogue box: Backend and platform development; open source and AI data; still determined." />

  <p>
    <strong>cmdr-chara</strong><br />
    backend · platform · developer tooling · Italy / CET
  </p>

  <p>
    <a href="#current-save">current work</a> ·
    <a href="#save-points">projects</a> ·
    <a href="#quest-log">open source</a> ·
    <a href="#inventory">stack</a>
  </p>
</div>

<p align="center">
  <sub>Facing Demons Chara sprite by Jude · textbox rendered with <a href="https://www.demirramon.com/generators/undertale_text_box_generator">Demirramon's generator</a></sub>
</p>

---

## CHECK

I'm a junior backend and platform developer with **3+ years of hands-on project work**. I build services, desktop tooling, and local-first utilities, mostly with **Rust, Go, Python, and TypeScript**.

I like software with visible boundaries: tests that catch real regressions, CI that proves the build, documentation that explains the awkward parts, and operations that can be reproduced on another machine.

> Based in Italy, EU citizen, and open to remote junior roles in backend, platform engineering, and developer tooling.

## CURRENT SAVE

- Migrating [**Deltamod Community**](https://github.com/cmdr-chara/deltamod/tree/wip/tauri-beta) toward a Rust and Tauri v2 core while keeping its existing users and GameMaker workflows in mind.
- Building an [**enhanced UTDR SoupGen branch**](https://github.com/cmdr-chara/UTDR-SoupGen/tree/codex/enhanced-soupgen) with safer storage, ZIP handling, GIF export, and an automated GameMaker build.
- Maintaining the finished tools below and fixing the parts that only show up after people actually use them.

## SAVE POINTS

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://github.com/cmdr-chara/deltamod"><strong>Deltamod Community</strong></a><br />
      Cross-platform GameMaker mod manager with transactional installs, archive validation, automated tests, and beta releases for Windows, macOS, and Linux.<br /><br />
      <code>Rust</code> <code>Tauri</code> <code>Electron</code> <code>TypeScript</code> <code>Playwright</code>
    </td>
    <td width="50%" valign="top">
      <a href="https://github.com/cmdr-chara/open-job-scout"><strong>OpenJobScout</strong></a><br />
      Local-first CLI for finding, verifying, ranking, and tracking jobs. Rules stay inspectable and application data stays in SQLite on the user's machine.<br /><br />
      <code>Python</code> <code>SQLite</code> <code>CLI</code> <code>pytest</code> <code>CI</code>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <a href="https://cmdr-chara.github.io/localeguard/"><strong>LocaleGuard</strong></a> · <a href="https://github.com/cmdr-chara/localeguard">source</a><br />
      Browser-based JSON localization preflight. It catches broken placeholders, markup, escapes, structure, and GameMaker-style control markers without uploading files.<br /><br />
      <code>TypeScript</code> <code>React</code> <code>Vite</code> <code>Vitest</code> <code>GitHub Pages</code>
    </td>
    <td width="50%" valign="top">
      <a href="https://github.com/cmdr-chara/codex-toolkit"><strong>Codex Toolkit</strong></a><br />
      Fifteen installable Codex skills, six optional agents, cross-platform setup helpers, offline validation, and smoke tests for real repository work.<br /><br />
      <code>Python</code> <code>agents</code> <code>automation</code> <code>validation</code> <code>tooling</code>
    </td>
  </tr>
</table>

<details>
<summary><strong>More systems work</strong></summary>

- [**LeaveFlow**](https://github.com/cmdr-chara/LeaveFlow): role-aware leave workflows, Django REST, Vue, PostgreSQL, Redis Streams, an Elixir/OTP worker, authenticated SSE, Docker, and Kubernetes/Kustomize.
- [**PulseDock**](https://github.com/cmdr-chara/PulseDock): concurrent Go service monitor with bounded workers, connection reuse, structured logs, Prometheus metrics, rolling uptime and p95 reporting, and graceful shutdown.
- [**UTDR Dataset Toolkit**](https://huggingface.co/datasets/cmdr-chara/utdr-dataset-toolkit): public documentation and synthetic samples for a private SFT/RAG data pipeline, including provenance boundaries, split-leakage controls, and sealed evaluation cases.
- [**Smart Building Controller**](https://github.com/cmdr-chara/smart-building-controller): awarded school project connecting a Flutter app to PHP and ESP32/Arduino services for building automation.

</details>

## QUEST LOG

| Status | Upstream contribution | Result |
| :---: | --- | --- |
| `BOUNTY` | [unitaryHACK 2026 · `Quantinuum/guppylang` #1801](https://github.com/Quantinuum/guppylang/pull/1801) | Integrated `scipy.optimize.minimize` into the QAOA MaxCut example, passed review and 11 automated checks, and earned the Guppy/HUGR/TKET bounty. |
| `MERGED` | [`TestSprite/testsprite-cli` #118](https://github.com/TestSprite/testsprite-cli/pull/118) | Preserved buffered input across sequential CLI prompts and added regression coverage for piped input, EOF, CRLF, and secret prompts. |
| `ACTIVE` | [`Emanuele-web04/synara`](https://github.com/Emanuele-web04/synara/pulls?q=is%3Apr+author%3Acmdr-chara+is%3Amerged) | Multiple merged PRs improving UI reliability, provider recovery, live activity, thread-state handling, and regression coverage. |
| `MERGED` | [`anomalyco/opencode` #8240](https://github.com/anomalyco/opencode/pull/8240) | Added Undertale and Deltarune themes to the open-source coding agent. |

## INVENTORY

| Area | Tools I use |
| --- | --- |
| Languages | `Rust` · `Go` · `Python` · `TypeScript` · `SQL` · `Dart` |
| Backend and data | `REST APIs` · `Django REST` · `Node.js` · `PostgreSQL` · `SQLite` · `Redis Streams` |
| Desktop and web | `Tauri v2` · `Electron` · `React` · `Vue 3` · `Flutter` · `Vite` |
| Platform | `Docker` · `Kubernetes` · `Kustomize` · `Prometheus` · `GitHub Actions` |
| Quality | `pytest` · `Vitest` · `Playwright` · `CI/CD` · structured logging · reproducible builds |

<details>
<summary><strong>OPEN SECRET FILE</strong></summary>

```text
- you opened it.
- nice.

outside the terminal:
- game aesthetics
- localization
- worldbuilding
- Fractured Hope
```

</details>

---

<p align="center">
  Found something useful? Issues and pull requests are welcome.<br />
  <sub>A star helps me see which projects people want me to keep improving.</sub>
</p>

```text
* you feel a strange presence.
* it fills you with determination.
```
