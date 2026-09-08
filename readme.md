<div align="center">
  <img src="assets/chara-wink-dialogue-red-green.gif" width="420" alt="Chara in an animated Undertale-style dialogue box" />

  <h1>Chara</h1>

  <p><strong>Desktop software · Developer tools · Open source</strong></p>
  <p>Rust · TypeScript · Python · C#</p>

  <p><strong>Open to software engineering roles</strong></p>

  <p>
    <a href="#flagship-work">Flagship work</a> ·
    <a href="#more-engineering">More engineering</a> ·
    <a href="#open-source">Open source</a> ·
    <a href="#how-i-build">How I build</a>
  </p>
</div>

I like software with sharp edges: mod managers that patch real game files, network tools that measure connections under load, and bugs in existing codebases that need a reproducible cause—not a guess.

My flagship projects are **Deltamod Community** and **speedtest-cli**. I also build local-first and full-stack applications, developer workflows, and contribute fixes upstream to projects including Zed, Synara, Guppy, TestSprite CLI, and OpenCode.

---

## Flagship work

### [Deltamod Community](https://github.com/cmdr-chara/deltamod)

**A cross-platform mod manager for DELTARUNE, UNDERTALE, and other supported GameMaker games.**

<p align="center">
  <a href="https://github.com/cmdr-chara/deltamod#see-it-in-action">
    <img src="https://raw.githubusercontent.com/cmdr-chara/deltamod/DeltaMaster/art/readme/deltamod-app-tour.gif" width="880" alt="Deltamod browsing installed mods, game installations, and collections" />
  </a>
</p>

I maintain the community fork across the application, native layer, recovery model, tests, and release system.

- **Safer patching:** supported installs use staging, verification, and rollback paths instead of treating game files as disposable.
- **Separate setups:** installations, profiles, and collections keep incompatible mods or game versions isolated.
- **Native delivery:** packages target Windows, Linux, Intel Mac, and Apple Silicon Mac, with platform limitations documented explicitly.
- **Real integrations:** compatible content can come from GameBanana, ModDB, Nexus Mods, or local archives.

`Rust` · `Tauri v2` · `TypeScript` · `Desktop` · `Release engineering`

[**Download**](https://github.com/cmdr-chara/deltamod/releases/latest) · [See it in action](https://github.com/cmdr-chara/deltamod#see-it-in-action) · [Compatibility](https://github.com/cmdr-chara/deltamod#supported-games-and-platforms) · [Source & attribution](https://github.com/cmdr-chara/deltamod#about-this-community-fork)

> Windows and macOS packages are currently unsigned; macOS packages are not notarized.

---

### [speedtest-cli](https://github.com/cmdr-chara/speedtest-cli)

**A Rust terminal network lab for throughput, latency under load, bufferbloat, DNS, and connection history.**

<p align="center">
  <a href="https://github.com/cmdr-chara/speedtest-cli#see-it-in-action">
    <img src="https://raw.githubusercontent.com/cmdr-chara/speedtest-cli/determination/docs/images/readme/live-demo.gif" width="880" alt="speedtest-cli running a live throughput and latency measurement in its terminal dashboard" />
  </a>
</p>

I built it to answer more useful questions than “how many Mbps do I have?”

- **Network quality:** throughput sits beside idle and loaded latency, jitter, bufferbloat, and explained workload grades.
- **Diagnosis:** DNS inspection and benchmarking, Wi-Fi information, HTTP stability checks, ICMP loss testing, and LAN testing live in the same tool.
- **Useful history:** saved runs, baselines, comparisons, trends, and script-friendly plain-text, JSON, and CSV output.
- **Defensive behavior:** cancellation, deadlines, concurrent storage safeguards, regression coverage, and documented measurement limitations.
- **Cross-platform releases:** native archives for Windows, Linux, Apple Silicon macOS, and Intel macOS; the interface ships in eight languages.

`Rust` · `Terminal UI` · `Networking` · `Cross-platform` · `Automation`

[**Source-available**](https://github.com/cmdr-chara/speedtest-cli/blob/determination/LICENSE) · Current source revisions use a custom license; the previously published v0.6.0 release remains MIT.

[**Download**](https://github.com/cmdr-chara/speedtest-cli/releases/latest) · [See it in action](https://github.com/cmdr-chara/speedtest-cli#see-it-in-action) · [User guide](https://github.com/cmdr-chara/speedtest-cli/blob/determination/docs/usage.md) · [Verification evidence](https://github.com/cmdr-chara/speedtest-cli/blob/determination/docs/verification.md)

> Demo visuals use deterministic illustrative data, not measurements of my own connection. Published releases may differ from current development UI.

---

## More engineering

### [OpenJobScout](https://github.com/cmdr-chara/open-job-scout) · Local-first job search tooling

**Find, verify, rank, and track jobs locally without sending your application history to a hosted OpenJobScout service.**

<p align="center">
  <a href="https://github.com/cmdr-chara/open-job-scout#demo">
    <img src="https://raw.githubusercontent.com/cmdr-chara/open-job-scout/main/docs/assets/openjobscout-demo.gif" width="760" alt="OpenJobScout terminal walkthrough using fictional job listings" />
  </a>
</p>

I built OpenJobScout around inspectable behavior instead of opaque matching claims. Search sources feed a local SQLite tracker; configurable rules explain ranking, public links and ATS listings can be re-verified, and manual application states survive crawler refreshes.

- **Local-first state:** configuration, notes, application history, and the tracker stay on the user's machine; there is no OpenJobScout account or hosted tracker.
- **Verification semantics:** discovery, `recheck`, `closed`, and `stale` have distinct meanings, with durable history recording automatic and manual transitions.
- **Failure isolation:** discovery sources fail independently, optional Firecrawl support is explicit opt-in, and `doctor` checks configuration, storage, schema integrity, permissions, and dependencies.
- **Two runtimes:** the Python CLI remains supported while the native Rust binary uses the same SQLite tracker schema and is the native release target.

`Rust` · `Python` · `SQLite` · `CLI` · `Local-first` · `Cross-platform`

[Demo](https://github.com/cmdr-chara/open-job-scout#demo) · [Quick start](https://github.com/cmdr-chara/open-job-scout#quick-start) · [Review workflow](https://github.com/cmdr-chara/open-job-scout#the-everyday-review-loop) · [Privacy model](https://github.com/cmdr-chara/open-job-scout#privacy-and-network-use)

> Alpha software: listings should still be confirmed on the employer's official careers page before applying.

### [LeaveFlow](https://github.com/cmdr-chara/LeaveFlow) · Full-stack application

A leave-management demo covering the complete path from authentication and balance validation to manager decisions and live notifications.

<p align="center">
  <a href="https://github.com/cmdr-chara/LeaveFlow#product-walkthrough">
    <img src="https://raw.githubusercontent.com/cmdr-chara/LeaveFlow/main/docs/screenshots/employee-dashboard.png" width="760" alt="LeaveFlow employee dashboard showing leave balance, upcoming leave, and recent requests" />
  </a>
</p>

The frontend is Vue/TypeScript over Django REST and PostgreSQL. Domain events are published only after successful database commits, processed through Redis Streams by a supervised Elixir/OTP worker, deduplicated, persisted, and delivered over authenticated SSE. The repository includes automated tests, Docker Compose, local Kubernetes deployment, observability, and an explicit production-hardening section.

`TypeScript` · `Python` · `Vue` · `Django REST` · `PostgreSQL` · `Redis` · `Elixir/OTP`

[Walkthrough](https://github.com/cmdr-chara/LeaveFlow#product-walkthrough) · [Run locally](https://github.com/cmdr-chara/LeaveFlow#run-the-demo) · [Verification](https://github.com/cmdr-chara/LeaveFlow#verification) · [Trade-offs](https://github.com/cmdr-chara/LeaveFlow#scope-and-trade-offs)

### [Codex Toolkit](https://github.com/cmdr-chara/codex-toolkit) · Engineering workflows

Reusable specialist workflows and agents for repository investigation, debugging, implementation, and release verification.

<p align="center">
  <a href="https://github.com/cmdr-chara/codex-toolkit">
    <img src="https://raw.githubusercontent.com/cmdr-chara/codex-toolkit/main/.github/assets/codex-toolkit-social-preview.png" width="760" alt="Codex Toolkit overview: Inspect, Change, Prove" />
  </a>
</p>

The toolkit routes work to the smallest applicable specialist, validates its own structure and workflows, preserves user-authored instructions during installation, and pins automatic updates to published releases instead of unreleased commits.

`Python` · `Node.js` · `Agents` · `Validation` · `CI`

[Get started](https://github.com/cmdr-chara/codex-toolkit#install-once) · [Workflow design](https://github.com/cmdr-chara/codex-toolkit#common-workflows) · [Validation](https://github.com/cmdr-chara/codex-toolkit#validation)

<details>
<summary><strong>Another desktop experiment: UndertaleModTool · WinUI 3</strong></summary>

<br />

[**UndertaleModTool · WinUI preview**](https://github.com/cmdr-chara/UndertaleModTool/tree/winui-preview) is an experimental Windows-native frontend fork built over the established UndertaleModLib / Underanalyzer stack. It explores resource browsing, filtering, sprite and texture inspection, embedded audio, preview caching, and modern Windows UI patterns.

<p align="center">
  <a href="https://github.com/cmdr-chara/UndertaleModTool/tree/winui-preview#screenshots">
    <img src="https://raw.githubusercontent.com/cmdr-chara/UndertaleModTool/winui-preview/images/readme/undertalemodtool-resource-tour.gif" width="760" alt="UndertaleModTool WinUI preview browsing GameMaker resources" />
  </a>
</p>

`C#` · `.NET` · `WinUI 3` · `Windows App SDK`

The branch is intentionally an experiment; current maintenance prioritizes stability and compatibility rather than positioning it as an upstream replacement.

</details>

---

## Open source

I like fixes where the failure mode can be explained and the regression can be pinned down. Selected **merged** upstream work:

- **[Zed · Rust](https://github.com/zed-industries/zed/pull/63766)** — fixed valid multibyte Agent Skill descriptions being rejected because length was counted in UTF-8 bytes instead of characters; covered validation, warnings, UI counting, and import truncation.
- **[Synara · TypeScript](https://github.com/Emanuele-web04/synara/pull/886)** — fixed concurrent credential writes sharing a temporary path; the regression launches 16 simultaneous writes under a fixed clock. I also fixed [cross-window state remaining stale after `localStorage.clear()`](https://github.com/Emanuele-web04/synara/pull/890).
- **[TestSprite CLI · TypeScript](https://github.com/TestSprite/testsprite-cli/pull/118)** — fixed prompt input losing already-buffered answers across sequential prompts, including CRLF and end-of-input cases.

<details>
<summary><strong>More merged contributions</strong></summary>

<br />

- **Zed:** [keyboard project-panel opens now honor the preview-tab setting](https://github.com/zed-industries/zed/pull/63758) and [long `ask_user` options wrap instead of being truncated](https://github.com/zed-industries/zed/pull/63656).
- **Guppy / Quantinuum:** replaced random QAOA parameter sampling with [SciPy optimization](https://github.com/Quantinuum/guppylang/pull/1801) in the example workflow.
- **OpenCode:** added [built-in Undertale and Deltarune themes](https://github.com/anomalyco/opencode/pull/8240).
- **Synara:** [browse my merged provider, reliability, security, backend, and frontend contributions](https://github.com/Emanuele-web04/synara/pulls?q=is%3Apr+author%3Acmdr-chara+is%3Amerged).

</details>

[Browse merged upstream pull requests →](https://github.com/search?q=is%3Apr+is%3Amerged+author%3Acmdr-chara+-user%3Acmdr-chara&type=pullrequests)

---

## How I build

```text
reproduce → inspect → scope → implement → regression-test → validate → document → ship
```

I start with the user need or a reproducible failure, inspect the existing architecture, and try to change the smallest surface that actually owns the behavior. I run the repository's lint, type, test, build, and CI gates that apply, and I document recovery paths or remaining limitations when they matter.

Coding agents are part of my implementation and investigation workflow. I review their output and take responsibility for the architecture decisions, final diff, tests, and claims made about the result.

| Area | Technologies I use in public work |
| --- | --- |
| **Desktop & tooling** | Rust, Tauri, C#, .NET / WinUI 3, Python, Go |
| **Web & backend** | TypeScript, Vue, React, Node.js, Django REST, Elixir/OTP |
| **Data & delivery** | PostgreSQL, SQLite, Redis Streams, Docker, Kubernetes, GitHub Actions |
| **Testing** | cargo test, pytest, Vitest, Playwright |

---

## Working together

I'm looking for software engineering opportunities in **desktop applications, developer tooling, and full-stack development**. The best interview material on this page is the real work: I can walk through a feature, a bug investigation, an architecture decision, a failed approach, or a release trade-off from the projects above.

For hiring conversations, please use the contact details shared with my application or résumé.

<details>
<summary><strong>More projects, localization, and experiments</strong></summary>

<br />

- [LocaleGuard](https://github.com/cmdr-chara/localeguard) — browser-only JSON localization QA for structural drift, placeholders, markup, escapes, and GameMaker control markers.
- [Smart Building Controller](https://github.com/cmdr-chara/smart-building-controller) — Flutter app, authenticated PHP backend, ESP32 bridge, Arduino modules, and physical sensors/actuators.
- [UTDR SoupGen Enhanced](https://github.com/cmdr-chara/UTDR-SoupGen) — GameMaker textbox tooling with safer imports, recovery, GIF export, and Windows builds.
- [Deltarune Italian Pack](https://github.com/cmdr-chara/DeltaruneItalianPack) — maintained localization pack with reproducible release automation.
- [PulseDock](https://github.com/cmdr-chara/PulseDock) — concurrent Go service monitor with Prometheus metrics and structured logs.
- [UTDR Dataset Toolkit](https://huggingface.co/datasets/cmdr-chara/utdr-dataset-toolkit) — public validators, synthetic examples, and methodology for a private SFT/RAG corpus; the source corpus and private evaluation cases are not distributed.

</details>

<details>
<summary><strong>GitHub activity</strong></summary>

<br />

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

<br />

Game aesthetics, localization, worldbuilding, and [Fractured Hope](https://github.com/cmdr-chara/fractured-hope).

Facing Demons Chara sprite by Jude. Textbox rendered with [Demirramon's generator](https://www.demirramon.com/generators/undertale_text_box_generator).

</details>

---

```text
* you feel a strange presence.
* it fills you with determination.
```
