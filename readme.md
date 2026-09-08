<div align="center">
  <h1>Chara</h1>

  <p><strong>Software developer · Desktop software, developer tools, and full-stack applications</strong></p>
  <p>I build and ship user-facing tools, investigate bugs, and contribute fixes to existing codebases.</p>

  <p><strong>Open to software engineering roles</strong><br />
    Rust · TypeScript · Python · C#
  </p>

  <p>
    <a href="#selected-projects">Projects</a> ·
    <a href="#open-source">Merged contributions</a> ·
    <a href="#how-i-work">How I work</a> ·
    <a href="#working-together">Hiring</a>
  </p>
</div>

My flagship projects are **Deltamod Community** and **speedtest-cli**. They show the kind of work I enjoy most: desktop software, developer tooling, reliability, recovery paths, and cross-platform delivery. I also build full-stack applications and contribute fixes upstream to projects including Zed, Synara, Guppy, TestSprite CLI, and OpenCode.

## Selected projects

### [Deltamod Community](https://github.com/cmdr-chara/deltamod) · Desktop application

A community-maintained mod manager for DELTARUNE, UNDERTALE, and other supported GameMaker games. My work on the fork spans isolated profiles, transactional install and recovery flows, native filesystem safeguards, and cross-platform packaging.

<p align="center">
  <a href="https://github.com/cmdr-chara/deltamod#see-it-in-action">
    <img src="https://raw.githubusercontent.com/cmdr-chara/deltamod/DeltaMaster/art/readme/deltamod-app-tour.gif" width="840" alt="Deltamod browsing installed mods, game installations, and collections" />
  </a>
</p>

**Engineering focus:** supported patching operations use staging, verification, and rollback paths so failed installations have a defined recovery path. The project ships native packages across Windows, Linux, Intel Mac, and Apple Silicon Mac, with platform limitations documented rather than hidden.

`Rust` · `Tauri` · `TypeScript` · `Desktop delivery`

[Download](https://github.com/cmdr-chara/deltamod/releases/latest) · [See it in action](https://github.com/cmdr-chara/deltamod#see-it-in-action) · [Compatibility](https://github.com/cmdr-chara/deltamod#supported-games-and-platforms) · [Fork & attribution](https://github.com/cmdr-chara/deltamod#about-this-community-fork)

*Windows and macOS packages are unsigned; macOS packages are not notarized.*

### [speedtest-cli](https://github.com/cmdr-chara/speedtest-cli) · Rust developer tooling

A terminal network lab for throughput, latency under load, bufferbloat, DNS, and connection history. I built a keyboard-driven dashboard, baseline comparisons, eight interface languages, and plain-text, JSON, and CSV output for automation.

<p align="center">
  <a href="https://github.com/cmdr-chara/speedtest-cli#see-it-in-action">
    <img src="https://raw.githubusercontent.com/cmdr-chara/speedtest-cli/determination/docs/images/readme/home.png" width="840" alt="speedtest-cli dashboard with illustrative development data, not measured connection speeds" />
  </a>
</p>

**Engineering focus:** cancellation and deadlines, concurrent storage safeguards, regression coverage, measurement semantics, and native release packages for Windows, Linux, and macOS. Verification reports keep tested behavior separate from platform or dependency limitations.

`Rust` · `Terminal UI` · `Networking` · `Cross-platform` · `Release automation`

[Download](https://github.com/cmdr-chara/speedtest-cli/releases/latest) · [See it in action](https://github.com/cmdr-chara/speedtest-cli#see-it-in-action) · [User guide](https://github.com/cmdr-chara/speedtest-cli/blob/determination/docs/usage.md) · [Verification reports](https://github.com/cmdr-chara/speedtest-cli/blob/determination/docs/verification.md)

*Development screenshot with illustrative data, not measured connection speeds. Published releases may differ.*

### [LeaveFlow](https://github.com/cmdr-chara/LeaveFlow) · Full-stack application

An independent leave-management demo: employees request time off while managers review approvals and team availability. My implementation covers team-scoped permissions, date and balance validation, a Vue interface, and a Django REST API.

<p align="center">
  <a href="https://github.com/cmdr-chara/LeaveFlow#product-walkthrough">
    <img src="https://raw.githubusercontent.com/cmdr-chara/LeaveFlow/main/docs/screenshots/employee-dashboard.png" width="840" alt="LeaveFlow employee dashboard showing leave balance and requests" />
  </a>
</p>

**Engineering focus:** notifications are published after successful database commits, then deduplicated through Redis Streams and a supervised Elixir/OTP worker. The repository includes automated tests, Docker Compose setup, local Kubernetes deployment, observability, and documented production-hardening trade-offs.

`TypeScript` · `Python` · `Vue` · `Django REST` · `PostgreSQL` · `Redis`

[Product walkthrough](https://github.com/cmdr-chara/LeaveFlow#product-walkthrough) · [Run locally](https://github.com/cmdr-chara/LeaveFlow#run-the-demo) · [Tests](https://github.com/cmdr-chara/LeaveFlow#verification) · [Scope & trade-offs](https://github.com/cmdr-chara/LeaveFlow#scope-and-trade-offs)

### [Codex Toolkit](https://github.com/cmdr-chara/codex-toolkit) · Engineering workflows

Reusable skills and specialist agents for repository investigation, debugging, implementation, and release verification. My work includes automatic workflow routing, validation, installer and update checks, and safeguards that preserve user-authored instructions.

<p align="center">
  <a href="https://github.com/cmdr-chara/codex-toolkit">
    <img src="https://raw.githubusercontent.com/cmdr-chara/codex-toolkit/main/.github/assets/codex-toolkit-social-preview.png" width="840" alt="Codex Toolkit overview: inspect, change, and prove" />
  </a>
</p>

`Python` · `Node.js` · `Agents` · `Validation` · `CI`

[Get started](https://github.com/cmdr-chara/codex-toolkit#install-once) · [Workflow design](https://github.com/cmdr-chara/codex-toolkit#common-workflows) · [Validation](https://github.com/cmdr-chara/codex-toolkit#validation)

## Open source

Selected **merged** fixes, with the problem, change, and verification visible in each pull request:

**Zed · Rust** — Fixed valid multibyte skill descriptions being rejected by a byte-based length limit. The change covers validation, warnings, the UI counter, and imported-description truncation. [PR #63766](https://github.com/zed-industries/zed/pull/63766)

**Synara · TypeScript** — Isolated temporary files during concurrent credential writes, with a regression exercising 16 simultaneous writes under a fixed clock. Also fixed stale cross-window settings after local storage is cleared. [PR #886](https://github.com/Emanuele-web04/synara/pull/886) · [PR #890](https://github.com/Emanuele-web04/synara/pull/890)

**TestSprite CLI · TypeScript** — Preserved buffered answers across sequential prompts, including CRLF and end-of-input cases, with regression tests. [PR #118](https://github.com/TestSprite/testsprite-cli/pull/118)

<details>
<summary>More merged contributions</summary>

- **Zed:** [keyboard preview-tab behavior #63758](https://github.com/zed-industries/zed/pull/63758) and [wrapping long answer options #63656](https://github.com/zed-industries/zed/pull/63656).
- **Guppy / Quantinuum:** replaced random parameter sampling with [SciPy optimization in a QAOA example #1801](https://github.com/Quantinuum/guppylang/pull/1801).
- **OpenCode:** added [built-in Undertale and Deltarune themes #8240](https://github.com/anomalyco/opencode/pull/8240).
- **Synara:** [broader provider, reliability, and frontend contributions](https://github.com/Emanuele-web04/synara/pulls?q=is%3Apr+author%3Acmdr-chara+is%3Amerged).

</details>

[Browse merged upstream pull requests →](https://github.com/search?q=is%3Apr+is%3Amerged+author%3Acmdr-chara+-user%3Acmdr-chara&type=pullrequests)

## How I work

I start with the user need or a reproducible failure, inspect the existing architecture, and keep changes scoped. I use focused regression tests and the repository's lint, type, test, and build checks, and document recovery paths and remaining limitations.

Coding agents are part of my implementation and investigation workflow. I review their output and take responsibility for the design decisions, final diff, and verification.

**Desktop & tooling:** Rust, Tauri, C#, .NET / WinUI 3, Python, Go.<br />
**Web & backend:** TypeScript, Vue, React, Node.js, Django REST, Elixir/OTP.<br />
**Data & delivery:** PostgreSQL, SQLite, Redis Streams, Docker, Kubernetes, GitHub Actions.<br />
**Testing:** cargo test, pytest, Vitest, Playwright.

## Working together

I'm looking for software engineering opportunities in **desktop applications, developer tooling, and full-stack development**. I'm happy to walk through a feature, bug investigation, architecture decision, or release trade-off from the work above.

For hiring conversations, please use the contact details shared with my application or résumé.

## More to explore

<details>
<summary><strong>More projects, localization, and experiments</strong></summary>

- [UndertaleModTool · WinUI preview](https://github.com/cmdr-chara/UndertaleModTool/tree/winui-preview) — experimental C#/.NET frontend fork with resource browsing, media inspection, and preview caching. Maintenance focuses on stability and compatibility, not replacing upstream.
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

<p align="center">
  <img src="assets/chara-wink-dialogue-red-green.gif" width="360" alt="Chara in an animated Undertale-style dialogue box" />
</p>

```text
* you feel a strange presence.
* it fills you with determination.
```
