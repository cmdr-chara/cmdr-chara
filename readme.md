<div align="center">
  <img src="assets/chara-wink-dialogue-red-green.gif" width="420" alt="Chara in an animated Undertale-style dialogue box" />

  <h1>cmdr-chara · Chara</h1>

  <p><strong>Software developer · Desktop apps, developer tools, and open source</strong></p>
  <p>I build tools for modding games, understanding networks, and working with coding agents.</p>

  <p>
    Open to software engineering roles<br />
    <a href="mailto:249489759+cmdr-chara@users.noreply.github.com">249489759+cmdr-chara@users.noreply.github.com</a> · <strong>@cmdr-chara</strong>
  </p>

  <p>
    <a href="#selected-projects">Projects</a> ·
    <a href="#open-source">Upstream contributions</a> ·
    <a href="#how-i-work">How I work</a> ·
    <a href="#more-to-explore">More to explore</a>
  </p>
</div>

## Selected projects

### [Deltamod Community](https://github.com/cmdr-chara/deltamod)

A community mod-manager fork for DELTARUNE, UNDERTALE, and other supported GameMaker games. Isolated profiles, staged patching, and recovery paths keep mod setups manageable.

<p align="center">
  <a href="https://github.com/cmdr-chara/deltamod#see-it-in-action">
    <img src="https://raw.githubusercontent.com/cmdr-chara/deltamod/DeltaMaster/art/readme/deltamod-app-tour.gif" width="820" alt="Deltamod browsing installed mods, game installations, and collections" />
  </a>
</p>

`Rust` · `Tauri` · `TypeScript` · [Download](https://github.com/cmdr-chara/deltamod/releases/latest) · [Source](https://github.com/cmdr-chara/deltamod)

*Windows and macOS packages are unsigned; macOS packages are not notarized.*

### [speedtest-cli](https://github.com/cmdr-chara/speedtest-cli)

A terminal network lab for throughput, latency under load, DNS, and connection history. A keyboard-driven dashboard, baseline comparisons, eight languages, and script-friendly output.

<p align="center">
  <a href="https://github.com/cmdr-chara/speedtest-cli#see-it-in-action">
    <img src="https://raw.githubusercontent.com/cmdr-chara/speedtest-cli/determination/docs/images/readme/home.png" width="820" alt="speedtest-cli terminal dashboard; development UI with illustrative test data, not measured connection speeds" />
  </a>
</p>

`Rust` · `TUI` · `JSON / CSV` · [Download](https://github.com/cmdr-chara/speedtest-cli/releases/latest) · [Source](https://github.com/cmdr-chara/speedtest-cli)

*Development screenshot with illustrative data, not measured connection speeds. Published releases may differ.*

### [Codex Toolkit](https://github.com/cmdr-chara/codex-toolkit)

Reusable skills and specialist agents for repository investigation, debugging, implementation, and release verification. Includes automatic routing, validation, and release-pinned updates that preserve user-authored instructions.

`Python` · `Node.js` · `Codex` · [Get started](https://github.com/cmdr-chara/codex-toolkit#install-once) · [Source](https://github.com/cmdr-chara/codex-toolkit)

### [UndertaleModTool · WinUI preview](https://github.com/cmdr-chara/UndertaleModTool/tree/winui-preview)

An experimental frontend fork with resource browsing, media inspection, and preview caching over the existing GameMaker tooling stack. Maintenance focuses on stability and compatibility—not replacing upstream.

`C#` · `.NET` · `WinUI 3` · [See the preview](https://github.com/cmdr-chara/UndertaleModTool/tree/winui-preview#screenshots) · [Source](https://github.com/cmdr-chara/UndertaleModTool/tree/winui-preview)

**Full-stack work:** [LeaveFlow](https://github.com/cmdr-chara/LeaveFlow) is a leave-management demo with role-scoped approvals and live notifications. Vue/TypeScript and Django REST sit alongside PostgreSQL, Redis Streams, and a supervised Elixir/OTP worker, with Docker and local Kubernetes deployment.

## Open source

I contribute upstream as well as maintaining my own projects and community forks. These are **merged contributions**, with links to the actual changes:

| Project | Selected contributions |
| --- | --- |
| **[Zed](https://github.com/zed-industries/zed)** | [Unicode-aware skill validation](https://github.com/zed-industries/zed/pull/63766), [keyboard preview-tab behavior](https://github.com/zed-industries/zed/pull/63758), and [wrapping for long answer options](https://github.com/zed-industries/zed/pull/63656). |
| **[Synara](https://github.com/Emanuele-web04/synara)** | [Concurrent credential-write safety](https://github.com/Emanuele-web04/synara/pull/886) and [cross-window settings synchronization](https://github.com/Emanuele-web04/synara/pull/890), alongside [broader provider and reliability work](https://github.com/Emanuele-web04/synara/pulls?q=is%3Apr+author%3Acmdr-chara+is%3Amerged). |
| **[Guppy · Quantinuum](https://github.com/Quantinuum/guppylang)** | Replaced random parameter sampling with [SciPy optimization](https://github.com/Quantinuum/guppylang/pull/1801) in a QAOA example. |
| **[TestSprite CLI](https://github.com/TestSprite/testsprite-cli)** | [Buffered input handling](https://github.com/TestSprite/testsprite-cli/pull/118) that preserves queued answers across sequential prompts. |
| **[OpenCode](https://github.com/anomalyco/opencode)** | [Built-in Undertale and Deltarune themes](https://github.com/anomalyco/opencode/pull/8240). |

[Browse merged upstream pull requests →](https://github.com/search?q=is%3Apr+is%3Amerged+author%3Acmdr-chara+-user%3Acmdr-chara&type=pullrequests)

## How I work

I use coding agents for implementation and investigation, then review the diff and validate changes with focused regression tests and the repository's checks. I care about recovery paths, cross-platform behavior, and making releases understandable—not just getting a happy-path demo running.

### Toolbox

| Focus | Technologies used in my projects |
| --- | --- |
| **Desktop & tooling** | Rust, Tauri, C#, .NET, WinUI 3, Python, Go |
| **Web & backend** | TypeScript, React, Vue, Node.js, Django REST, Elixir/OTP |
| **Data & delivery** | SQLite, PostgreSQL, Redis Streams, Docker, Kubernetes, GitHub Actions |
| **Testing** | cargo test, pytest, Vitest, Playwright |

## More to explore

<details>
<summary><strong>More projects, localization, and experiments</strong></summary>

- [OpenJobScout](https://github.com/cmdr-chara/open-job-scout) — local-first job discovery, verification, ranking, and application tracking.
- [LocaleGuard](https://github.com/cmdr-chara/localeguard) — browser-only JSON localization QA for structure, placeholders, markup, and GameMaker control markers.
- [Smart Building Controller](https://github.com/cmdr-chara/smart-building-controller) — Flutter, an authenticated PHP backend, ESP32/Arduino modules, and physical sensors.
- [UTDR SoupGen Enhanced](https://github.com/cmdr-chara/UTDR-SoupGen) — GameMaker textbox tooling with import safeguards, recovery, and GIF export.
- [Deltarune Italian Pack](https://github.com/cmdr-chara/DeltaruneItalianPack) — a maintained localization pack with reproducible release automation.
- [PulseDock](https://github.com/cmdr-chara/PulseDock) — a concurrent Go service monitor with Prometheus metrics and structured logs.
- [UTDR Dataset Toolkit](https://huggingface.co/datasets/cmdr-chara/utdr-dataset-toolkit) — public validators, synthetic examples, and methodology for a private SFT/RAG corpus; the corpus itself is not distributed.

</details>

<details>
<summary><strong>GitHub activity</strong></summary>

<p align="center">
  <img src="https://raw.githubusercontent.com/cmdr-chara/cmdr-chara/output/profile-stats.svg" width="780" alt="Automatically generated GitHub activity statistics for cmdr-chara" />
</p>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/cmdr-chara/cmdr-chara/output/github-contribution-grid-snake-dark.svg" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/cmdr-chara/cmdr-chara/output/github-contribution-grid-snake.svg" />
  <img src="https://raw.githubusercontent.com/cmdr-chara/cmdr-chara/output/github-contribution-grid-snake.svg" alt="Animated contribution graph for cmdr-chara" />
</picture>

</details>

<details>
<summary><strong>Beyond code & artwork credits</strong></summary>

Game aesthetics, localization, worldbuilding, and [Fractured Hope](https://github.com/cmdr-chara/fractured-hope).

Facing Demons Chara sprite by Jude. Textbox rendered with [Demirramon's generator](https://www.demirramon.com/generators/undertale_text_box_generator).

</details>

---

```text
* you feel a strange presence.
* it fills you with determination.
```
