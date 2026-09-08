<div align="center">
  <h1>Chara</h1>

  <p><strong>Software developer · Full-stack applications, desktop software, and developer tools</strong></p>
  <p>I build applications, investigate bugs, and contribute fixes to existing codebases.</p>

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

My public work includes independent projects, community forks, and **merged contributions to Zed, Synara, Guppy, TestSprite CLI, and OpenCode**. The projects below show application development; the [upstream fixes](#open-source) show how I work within other teams' codebases.

## Selected projects

### [LeaveFlow](https://github.com/cmdr-chara/LeaveFlow) · Full-stack application

An independent leave-management demo: employees request time off, while managers review approvals and team availability. My implementation covers team-scoped permissions, date and balance validation, a Vue interface, and a Django REST API.

**Engineering focus:** notifications are published after successful database commits, then deduplicated through Redis Streams and a supervised Elixir/OTP worker. The repository includes automated tests, Docker Compose setup, and documented production-hardening trade-offs.

`TypeScript` · `Python` · `Vue` · `Django REST` · `PostgreSQL`

[Screenshots](https://github.com/cmdr-chara/LeaveFlow#product-walkthrough) · [Run locally](https://github.com/cmdr-chara/LeaveFlow#run-the-demo) · [Tests](https://github.com/cmdr-chara/LeaveFlow#verification) · [Scope & trade-offs](https://github.com/cmdr-chara/LeaveFlow#scope-and-trade-offs)

### [speedtest-cli](https://github.com/cmdr-chara/speedtest-cli) · Rust developer tooling

A terminal network lab for comparing throughput, latency under load, DNS, and connection history. My work includes a keyboard-driven dashboard, baseline comparisons, eight interface languages, and plain-text, JSON, and CSV output.

**Engineering focus:** cancellation and deadlines, concurrent storage safeguards, regression coverage, and native release packages for Windows, Linux, and macOS. The documentation explains how results are measured and where platform limitations apply.

`Rust` · `Terminal UI` · `Cross-platform` · `Release automation`

[Download](https://github.com/cmdr-chara/speedtest-cli/releases/latest) · [User guide](https://github.com/cmdr-chara/speedtest-cli/blob/determination/docs/usage.md) · [Verification reports](https://github.com/cmdr-chara/speedtest-cli/blob/determination/docs/verification.md)

<details>
<summary>Preview the dashboard</summary>

<p align="center">
  <a href="https://github.com/cmdr-chara/speedtest-cli#see-it-in-action">
    <img src="https://raw.githubusercontent.com/cmdr-chara/speedtest-cli/determination/docs/images/readme/home.png" width="820" alt="speedtest-cli dashboard with illustrative development data, not measured connection speeds" />
  </a>
</p>

*Development screenshot with illustrative data. Published releases may differ.*

</details>

### [Deltamod Community](https://github.com/cmdr-chara/deltamod) · Desktop application

A community-maintained mod-manager fork for DELTARUNE, UNDERTALE, and other supported GameMaker games. My work on the fork spans isolated profiles, native filesystem safeguards, and cross-platform packaging.

**Engineering focus:** supported patching operations use staging, verification, and rollback paths to help recover from failed installations. Upstream and third-party attribution are preserved.

`Rust` · `Tauri` · `TypeScript` · `Desktop delivery`

[Download](https://github.com/cmdr-chara/deltamod/releases/latest) · [Compatibility](https://github.com/cmdr-chara/deltamod#supported-games-and-platforms) · [Fork & attribution](https://github.com/cmdr-chara/deltamod#about-this-community-fork)

*Windows and macOS packages are unsigned; macOS packages are not notarized.*

<details>
<summary>Watch the application tour</summary>

<p align="center">
  <a href="https://github.com/cmdr-chara/deltamod#see-it-in-action">
    <img src="https://raw.githubusercontent.com/cmdr-chara/deltamod/DeltaMaster/art/readme/deltamod-app-tour.gif" width="820" alt="Deltamod browsing installed mods, game installations, and collections" />
  </a>
</p>

</details>

### [Codex Toolkit](https://github.com/cmdr-chara/codex-toolkit) · Engineering workflows

Reusable skills and specialist agents for investigation, implementation, and release verification. My work includes routing validation, installer and update checks, and safeguards that preserve user-authored instructions. Updates follow published releases rather than unreleased commits.

`Python` · `Node.js` · `Validation` · `CI`

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

**Applications:** Rust, TypeScript, Python, C#, Vue, React, Django REST, Tauri, .NET / WinUI 3.<br />
**Data & delivery:** PostgreSQL, SQLite, Redis Streams, Elixir/OTP, Docker, GitHub Actions; local Kubernetes deployments.<br />
**Testing:** cargo test, pytest, Vitest, Playwright.

## Working together

I'm looking for software engineering opportunities in **full-stack development, desktop applications, and developer tooling**. I'm happy to walk through a feature, a bug investigation, or a release trade-off from the work above.

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
