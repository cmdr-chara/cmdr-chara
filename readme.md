<div align="center">
  <img src="assets/chara-wink-dialogue-red-green.gif" width="420" alt="Animated Undertale-style dialogue box for cmdr-chara" />

  <h1>Open-Source Software Developer</h1>

  <p>Building desktop and full-stack applications, developer tooling, and reliable release systems.</p>
  <p>Open to software engineering roles · public work under <strong>cmdr-chara</strong></p>

  <p>
    <a href="#featured-engineering">Featured Work</a> ·
    <a href="#open-source">Open Source</a> ·
    <a href="#capabilities">Capabilities</a> ·
    <a href="#more-work">More Work</a>
  </p>
</div>

---

## Featured Engineering

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://github.com/cmdr-chara/deltamod">
        <img src="https://raw.githubusercontent.com/cmdr-chara/deltamod/DeltaMaster/art/readme/deltamod-app-tour.gif" width="100%" alt="Deltamod Community application tour" />
      </a>
      <br /><br />
      <a href="https://github.com/cmdr-chara/deltamod"><strong>Deltamod Community</strong></a><br />
      A substantially evolved community fork for DELTARUNE, UNDERTALE, and other GameMaker games. Work spans isolated profiles, staged migration, transactional patching, native integrations, security hardening, checksum verification, and cross-platform releases.
      <br /><br />
      <code>Rust</code> <code>Tauri v2</code> <code>TypeScript</code> <code>Release Engineering</code>
    </td>
    <td width="50%" valign="top">
      <a href="https://github.com/cmdr-chara/UndertaleModTool/tree/winui-preview">
        <img src="https://raw.githubusercontent.com/cmdr-chara/UndertaleModTool/winui-preview/images/readme/undertalemodtool-resource-tour.gif" width="100%" alt="UndertaleModTool WinUI 3 resource browsing tour" />
      </a>
      <br /><br />
      <a href="https://github.com/cmdr-chara/UndertaleModTool/tree/winui-preview"><strong>UndertaleModTool — WinUI 3 Preview</strong></a><br />
      Windows-native modernization fork of UndertaleModTool with redesigned resource browsing, richer sprite and texture inspection, embedded audio playback, preview caching, and a WinUI 3 shell over the established GameMaker tooling stack. The branch README now includes compact tours of the resource, code, and WinUI surfaces.
      <br /><br />
      <code>C#</code> <code>.NET</code> <code>WinUI 3</code> <code>Windows App SDK</code>
    </td>
  </tr>
</table>

<table>
  <tr>
    <td width="44%" valign="middle">
      <a href="https://github.com/Emanuele-web04/synara">
        <img src="https://raw.githubusercontent.com/Emanuele-web04/synara/main/assets/prod/synara-hero.jpeg" width="100%" alt="Synara desktop workspace" />
      </a>
    </td>
    <td width="56%" valign="middle">
      <a href="https://github.com/Emanuele-web04/synara"><strong>Synara — Upstream Contributor</strong></a><br /><br />
      Contributor with <strong>72 merged pull requests</strong> to a local-first desktop workspace for coding agents. Work spans provider integrations, server and web reliability, security hardening, concurrency, state migrations, browser behavior, and focused regression coverage.
      <br /><br />
      <code>TypeScript</code> <code>ACP</code> <code>Provider Integration</code> <code>Reliability</code>
      <br /><br />
      <a href="https://github.com/Emanuele-web04/synara/pulls?q=is%3Apr+author%3Acmdr-chara">View upstream pull requests →</a>
    </td>
  </tr>
</table>

### Selected Engineering

<table>
  <tr>
    <td width="50%" valign="top">
      <a href="https://github.com/cmdr-chara/codex-toolkit"><strong>Codex Toolkit</strong></a><br /><br />
      Automatic workflow routing for <strong>21 Codex skills and 6 agents</strong>, covering repository intelligence, bug finding, implementation, completion gates, multi-agent coordination, and release verification.
      <br /><br />
      <code>Python</code> <code>Agents</code> <code>Validation</code> <code>CI</code>
    </td>
    <td width="50%" valign="top">
      <a href="https://github.com/cmdr-chara/LeaveFlow"><strong>LeaveFlow</strong></a><br /><br />
      Multi-service leave management product with role-based access, a Django REST API, PostgreSQL, Vue and TypeScript, Redis Streams, authenticated SSE, Docker Compose, Kubernetes manifests, health checks, and automated tests.
      <br /><br />
      <code>Python</code> <code>TypeScript</code> <code>PostgreSQL</code> <code>Docker</code> <code>Kubernetes</code>
    </td>
  </tr>
</table>

---

## Open Source

**76 merged pull requests outside personal repositories**, including 72 in Synara and accepted work in Zed, Guppylang, TestSprite CLI, and OpenCode.

- **Zed:** merged [agent UI wrapping fix #63656](https://github.com/zed-industries/zed/pull/63656), keeping long `ask_user` options readable; current Rust work also includes tested PRs for [preview-tab navigation #63706](https://github.com/zed-industries/zed/pull/63706) and [Helix-style window operations #63698](https://github.com/zed-industries/zed/pull/63698).
- **Synara:** merged provider, backend reliability, frontend state, security, CLI, diagnostics, and documentation work — including [DeepSeek Harness support #723](https://github.com/Emanuele-web04/synara/pull/723), [concurrent credential-write safety #886](https://github.com/Emanuele-web04/synara/pull/886), [HTTP Retry-After validation #885](https://github.com/Emanuele-web04/synara/pull/885), and [cross-window storage synchronization #890](https://github.com/Emanuele-web04/synara/pull/890).
- **Quantinuum / Guppy:** merged [unitaryHACK contribution #1801](https://github.com/Quantinuum/guppylang/pull/1801), replacing random QAOA parameter sampling with SciPy optimization in the example workflow.
- **TestSprite CLI:** merged [buffered prompt-input fix #118](https://github.com/TestSprite/testsprite-cli/pull/118), preserving queued answers correctly across sequential prompts and line-ending variants.

<details>
<summary><strong>More upstream work</strong></summary>
<br />

- [OpenCode #8240](https://github.com/anomalyco/opencode/pull/8240): merged Undertale and Deltarune built-in themes.
- Ongoing Synara work spans ACP/provider integrations, Windows and WSL execution, diagnostics, reliability, and architecture.

</details>

---

## Engineering Workflow

I use coding agents as part of a controlled engineering loop: inspect the existing architecture, define a bounded change, review the generated diff, add focused regression coverage, and run the repository's lint, type, test, build, and CI gates. Agent output is treated as a draft until the evidence supports it.

Recent Zed and Synara contributions apply this workflow to desktop UI behavior, navigation state, keymaps, concurrency, HTTP protocol handling, security boundaries, durable state migrations, streaming correctness, and cross-platform behavior.

---

## Capabilities

<p align="center">
  <img src="assets/tech/rust.png" height="34" alt="Rust" />&nbsp;&nbsp;
  <img src="assets/tech/typescript.png" height="34" alt="TypeScript" />&nbsp;&nbsp;
  <img src="assets/tech/csharp.png" height="34" alt="C sharp" />&nbsp;&nbsp;
  <img src="assets/tech/python.png" height="34" alt="Python" />&nbsp;&nbsp;
  <img src="assets/tech/go.png" height="34" alt="Go" />
</p>

| Area | Tools and technologies |
| --- | --- |
| **Desktop & cross-platform** | Tauri v2, WinUI 3 / .NET, Electron, Flutter |
| **Web & backend** | TypeScript, React, Vue, Vite, Node.js, Django REST, REST API design, PHP |
| **Data & platform** | SQLite, PostgreSQL, Redis Streams, Docker, Kubernetes, Prometheus, GitHub Actions |
| **Quality & delivery** | cargo test, pytest, Vitest, Playwright, structured logging, reproducible builds, release automation |

<details>
<summary><strong>Additional technologies</strong></summary>
<br />

C++, JavaScript, Elixir/OTP, PowerShell, SQL, Dart, GameMaker Language, Arduino and ESP32, Kustomize, and REST API design.

</details>

---

## More Work

<details>
<summary><strong>Projects and experiments</strong></summary>
<br />

- [OpenJobScout](https://github.com/cmdr-chara/open-job-scout) — local-first job discovery, verification, ranking, and application tracking with transparent scoring, SQLite persistence, and Python/Rust runtimes.
- [LocaleGuard](https://github.com/cmdr-chara/localeguard) — browser-only JSON localization QA for structural drift, placeholders, markup, escapes, and GameMaker control markers.
- [Smart Building Controller](https://github.com/cmdr-chara/smart-building-controller) — Flutter app, authenticated PHP backend, ESP32 bridge, Arduino modules, and physical sensors/actuators.
- [UTDR SoupGen Enhanced](https://github.com/cmdr-chara/UTDR-SoupGen) — GameMaker textbox tooling with safer imports, recovery, GIF export, and Windows builds.
- [Deltarune Italian Pack](https://github.com/cmdr-chara/DeltaruneItalianPack) — maintained localization pack with reproducible release automation.
- [PulseDock](https://github.com/cmdr-chara/PulseDock) — concurrent Go service monitor with Prometheus metrics and structured logs.

</details>

---

## Activity

<p align="center">
  <img width="78%" src="https://raw.githubusercontent.com/cmdr-chara/cmdr-chara/output/profile-stats.svg" alt="cmdr-chara GitHub statistics" />
</p>

<details>
<summary><strong>Contribution graph</strong></summary>
<br />

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/cmdr-chara/cmdr-chara/output/github-contribution-grid-snake-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/cmdr-chara/cmdr-chara/output/github-contribution-grid-snake.svg" />
  <img alt="GitHub contribution snake" src="https://raw.githubusercontent.com/cmdr-chara/cmdr-chara/output/github-contribution-grid-snake.svg" />
</picture>

</details>

<details>
<summary><strong>Outside code</strong></summary>
<br />

Game aesthetics, localization, worldbuilding, and Fractured Hope.

Facing Demons Chara sprite by Jude. Textbox rendered with [Demirramon's generator](https://www.demirramon.com/generators/undertale_text_box_generator).

</details>

---

<p align="center">Issues and pull requests are welcome.</p>

```text
* you feel a strange presence.
* it fills you with determination.
```
