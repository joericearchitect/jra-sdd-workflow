# Devin (Cognition) — evaluation against the autonomous SDD goal

Date: 2026-09-03

**Question asked.** Is Devin a good choice for the goal of running from a
feature specification to a merged implementation autonomously, using
spec-driven development and a multi-agent harness? Prompted by
[Fable 5.1 in Devin and Why It's Cheaper than Opus 5](https://devin.ai/blog/fable-5-1).

**Short answer.** Devin does the *execution* half of that goal well and sells
it as a product. It does not do the *governance* half — the specification
lifecycle, the artifact quality rules, the evidence gates — and it never
will, because that half is deliberately yours. Buying Devin today would not
solve the problem that ended the previous attempt, and would add a
consumption-based bill to a workflow that has not yet been proven by hand.
The recommendation is **not now**: steal three specific ideas from Devin for
free, prove the manual loop, and revisit Devin (or a cheaper equivalent) only
as a hired *worker* for the apply phase, never as the framework.

Detail, evidence and alternatives below.

---

## 1. How Devin actually works

Devin is a hosted AI software engineer sold by Cognition. There are now three
products under the name, and the difference between them matters more than
anything else in this document.

### 1a. Devin cloud sessions — the original product

You give Devin a task. It gets its own virtual machine in Cognition's cloud
with a shell, a code editor and a browser. It works, then opens a pull
request. You watch and interrupt through a session view, Slack, Linear or
Jira.

The parts worth knowing:

- **Planning mode.** Before doing work, a sub-agent reads the repository and
  works out which files matter, then posts a plan — current state of the
  code, proposed implementation, edge cases, a confidence estimate — and
  waits. Every practitioner review found says the same thing: *do not skip
  this checkpoint*. Letting it run past an unreviewed plan is how people
  waste money.
- **Knowledge.** A library of notes about your repositories, conventions and
  constraints. Each note has trigger conditions; Devin pulls in matching
  notes automatically at the start of a session. This is Cognition's
  persistent memory feature. It lives in their system, not your git history.
- **Playbooks.** A reusable template for a repeated procedure — Cognition
  describes one as "a custom system prompt for a repeated task", with the
  steps and the success criteria written down once. Functionally this is the
  same idea as a skill file.
- **Managed child sessions.** A coordinator session can break a large job
  into pieces and spin up child Devins, each in its own VM, each with its own
  prompt, playbook and **spend limit**. The coordinator monitors them,
  messages them, and can pause or kill them. This is the closest thing Devin
  has to what you were building.
- **Scheduled sessions.** Cron-style recurring runs — nightly test triage,
  weekly maintenance.
- **An API.** `https://api.devin.ai/v3/organizations/*`, bearer-token auth,
  covering sessions, knowledge, playbooks and secrets. You can create and
  drive sessions from a script or a CI job. The docs point self-serve users
  at the Teams quick start, which suggests the org API is a Teams-and-above
  feature — worth confirming before relying on it.
- **Session analysis.** Devin will review its own past sessions and tell you
  why they succeeded or failed.

### 1b. Devin CLI ("Devin for Terminal") and Devin Desktop

Cognition also ships a local agent that runs on your machine, and a desktop
IDE (Devin Desktop is the rebranded Windsurf). These are a completely
different shape from the cloud sessions — they look and behave very much like
Claude Code:

| Surface | Where it lives |
|---|---|
| Always-on instructions | `AGENTS.md` (also accepts `AGENT.md`, `CLAUDE.md`) |
| Skills (slash commands / auto-invoked) | `.devin/skills/<name>/SKILL.md` |
| Custom subagents (own prompt, tools, model) | `.devin/agents/` |
| Hooks — run a shell command or an LLM prompt on lifecycle events | `.devin/hooks.v1.json` |
| MCP servers | `.devin/config.json`, `.devin/mcp_config.json` |
| Permissions gating agent capabilities | config files |
| Plugins — bundle skills + rules + hooks + subagents + MCP | installed from a GitHub repo, git URL or local path |

Plugins can be governed: an organization can declare required, optional and
forbidden plugin lists at enterprise, org, repository and user level.

The `.local.` variants of these files are automatically gitignored.

### 1c. Devin Fusion — the harness described in the blog post you sent

This is the interesting part, and it is a direct comment on a design decision
already made in this repository.

Cognition's position is that ordinary model routing does not work: *"Routers
often over-fit to specific benchmarks"* and pass evaluations while failing to
"write code you'd actually merge." Their answer, Fusion, runs **two full
agents side by side**:

- a **frontier agent** that keeps ownership of planning, ambiguity and final
  review, and delegates;
- a cheaper **sidekick agent** that does the grunt work — exploring the
  codebase, writing code, writing tests, fixing lint.

Both are complete agents with their own tools and their own context. Two
details make it work:

1. **Routing happens mid-task, not up front.** Lightweight classifiers watch
   execution and signal when work should shift back to the smart model —
   because task difficulty often is not visible from the original prompt.
2. **Switches are timed to be free.** Handing work between models normally
   costs a full context re-send. Fusion switches during context compaction,
   which was going to invalidate the cache anyway, so the switch is
   effectively free. Each agent also keeps its own cached context.

Reported results, on FrontierCode 1.1 Extended (Cognition's numbers, dated
2026-08-07):

| Configuration | Score | Cost |
|---|---|---|
| Devin Fusion | 63.1 | $1.35 |
| Opus 5 (medium) | 63.6 | $3.51 |
| Fable 5 (xhigh) | 64.9 | $10.53 |

Cognition also reports that **88% of their own merged pull requests were
driven entirely by the automated Fusion router**.

The Fable 5.1 post extends this: Cognition moved all Devin's Opus 5 traffic
to Fable 5.1 on launch day, saying it "matched or edged out Fable 5 in our
testing at a lower cost per task, and with the new cache read pricing a
Fable-class model is finally economical for the workloads we'd kept on Opus,
starting with code review." They report Fable-level intelligence being 54%
cheaper thanks to the cache-read price change, Fusion matching Fable 5.1 on
FrontierCode at 47% lower cost, and users seeing 10–25% savings on real work.

The underlying model-price change is Anthropic's, not Cognition's: Fable 5.1
is $10 per million input tokens, $50 per million output, with **cache reads
dropping 75% to $0.25 per million** — which is what makes an
expensive-model-plus-cheap-model harness economical in the first place.

> **Caveat on sourcing.** `devin.ai` rate-limited every direct fetch attempt
> (HTTP 429, repeatedly, from two different clients plus a reader proxy), and
> no Wayback Machine snapshot of the page exists. The Fable 5.1 quotes above
> come from a search index of that page and are verbatim, but the page itself
> was not read end to end. The Fusion architecture and benchmark table come
> from [cognition.com/blog/devin-fusion](https://cognition.com/blog/devin-fusion),
> which was read directly. The underlying model price — $10 / $50 per million
> with the cache-read drop — was confirmed against
> [Anthropic's own Fable 5.1 announcement](https://www.anthropic.com/claude-fable-and-mythos-5-1).

### 1d. What Cognition themselves say about multi-agent designs

Worth reading before building anything: Cognition published
[Don't Build Multi-Agents](https://cognition.com/blog/dont-build-multi-agents).
Their argument is that parallel multi-agent systems are fragile, that
context-sharing failures dominate, and that a well-engineered single agent
usually beats them. Their more recent refinement: the setups that do work all
share one property — **one main loop carries the state, and subagents are
stateless workers with narrow scope.**

Note that Fusion obeys exactly this rule. The frontier agent is the single
stateful loop; the sidekick is a narrow worker.

This is a warning shot for the goal as stated. "Multi-agent harness" as an
aim, rather than as a consequence, is the shape the vendor with the most
experience of it publicly recommends against.

---

## 2. Is anyone using OpenSpec or SDD with Devin?

**On paper, yes. In visible practice, no.**

- **OpenSpec supports Devin.** The tool ID is `devin`, which targets **Devin
  Desktop (formerly Windsurf)**, writing to `.devin/skills/` and
  `.devin/workflows/`. `--tools windsurf` still works for backward
  compatibility. Note the limitation OpenSpec documents: *the Devin local
  agent supports skills only, not workflows* — workflow invocation is Desktop
  only.
- **GitHub Spec Kit supports Devin**, listing "Devin for Terminal" among its
  29 named integrations.
- **Both of those are the local products.** Neither integrates with Devin's
  autonomous cloud sessions, which is the part of Devin that would matter for
  the goal.
- No public write-up was found of anyone running an OpenSpec lifecycle
  through Devin's cloud agent. Devin's own answer to "how do I make the agent
  follow a repeatable process" is Playbooks plus Knowledge, which is a
  parallel, proprietary, hosted version of what this repository keeps in git.

So the honest position: the *file-level* integration exists and would take
minutes to wire up. The *lifecycle-level* integration does not exist anywhere,
in this repository or in public, and would be yours to build regardless of
which vendor you pick.

---

## 3. Commercial status and cost

Devin is a **commercial, closed-source product**. There is no open-source
core, no self-hosting for the cloud agent.

Cognition runs two separate billing systems.

### Self-serve (the relevant one for a solo developer)

From Cognition's own documentation:

| Plan | Price | Members |
|---|---|---|
| Free | $0 | 1 |
| Pro | $20 / month | 1 |
| Max | $200 / month | 1 |
| Teams | $80 / month minimum ($40 per full seat) | unlimited |

- Pro and Teams full seats get "a daily and weekly usage quota that covers
  Devin sessions, Devin CLI, and Devin Desktop." Max gets a much larger
  weekly quota with **no daily cap**.
- Past your quota you buy **prepaid on-demand credits**. They roll over
  month to month and never expire.
- Teams flex seats are free and draw from the shared credit pool.
- Cognition's documentation does **not** publish the quota amounts or the
  per-unit overage rate. That is a real gap for planning purposes.

### Enterprise

Billed in **ACUs (Agent Compute Units)** at a rate set in the order form —
contact sales, no published price. Cognition notes that enterprise ACUs
behave differently from self-serve usage: the enterprise agent "adheres more
strictly to task planning and end-to-end testing."

### What actually consumes budget

Usage accrues from the number and complexity of actions Devin takes —
planning, context gathering, execution, browser actions, code execution —
plus VM time and bandwidth. Specifically:

- **You are not charged** while Devin waits for your response, waits for a
  test suite to run, or clones and sets up repositories.
- Devin **sleeps automatically** after roughly 0.1 ACU of inactivity, and
  consumes nothing while asleep.
- Windows sessions cost about **9% more** than equivalent Linux sessions.
- Cognition's own cost-control advice: well-scoped tasks, short focused
  interactions, split large projects across sessions, one topic per session.

### A number to treat with suspicion

Third-party pricing aggregators widely report **$2.25 per ACU** on a "Core"
plan and **$2.00 per ACU** on a $500/month Team plan, with **one ACU ≈ 15
minutes of agent work**. None of that appears in Cognition's current
documentation, and it contradicts the documented self-serve structure (which
bills in dollars and credits, not ACUs). Treat those figures as stale or as
enterprise-only. If ACU cost matters to a decision, get it from a quote, not
from a blog.

### What this means for a single developer

Entry cost is genuinely low — there is a Free tier, and Pro is $20/month,
which includes cloud sessions. That is not the problem.

The problem is **shape**. The cost model rewards short, well-scoped,
frequently-checkpointed tasks. A long unattended run across explore → propose
→ apply → verify is precisely the highest-consumption shape there is, and it
is the shape the goal describes. Meanwhile the features you would actually
need to orchestrate that — the API, coordinator sessions, per-child spend
limits — sit at Teams and above.

Put plainly: the cheap plan is not the autonomous plan, and the autonomous
plan is billed by how much the agent thrashes.

---

## 4. How well does Devin support harness engineering?

Using Martin Fowler's framing — a harness is **guides** (rules given up
front, preventing bad output) plus **sensors** (checks after the fact,
catching it) — with the principle that cheap deterministic checks should run
constantly and expensive model-judged checks should be reserved for
checkpoints.

The answer splits cleanly, and the split is the whole story.

### Devin cloud sessions: weak. The harness is theirs.

You get configuration surfaces, not control:

| You can | You cannot |
|---|---|
| Supply guides via Knowledge notes and Playbooks | Author a gate that blocks a phase transition on your own validator's exit code |
| Require plan approval before execution | See or own the run's state machine |
| Cap spend per child session | Get an event ledger you can audit or replay |
| Create and poll sessions over the API | Enforce anything deterministically inside the agent's loop |
| Run your CI on the pull request it opens | Guarantee a step ran, rather than being told it did |

That last row is the important one. Your only *real* deterministic sensor on
cloud Devin is the CI that runs on the pull request at the end. Everything in
between is Cognition's loop, and you are trusting its report. That is exactly
the "evidence over assertion" problem this repository was built to solve,
reintroduced at the vendor boundary.

### Devin CLI / Desktop: strong, and roughly at parity with Claude Code.

Hooks on lifecycle events (including before a tool runs) are a genuine place
to put a deterministic gate. Permissions gate capabilities. Custom subagents
give you narrow workers with their own prompts and models. Skills give you
guides. Plugins give you distribution, with org-level required/forbidden
governance — which is more than Claude Code offers out of the box.

### The trap

**The Devin product with the best harness surface is the one that is not
autonomous, and the Devin product that is autonomous is the one where the
harness is least yours.** You cannot get both from Devin. If you adopt cloud
Devin for autonomy, you are trading away the deterministic enforcement that
was the entire point.

---

## 5. Where Devin could fit *this* repository

Ordered from clearly in-bounds to clearly out.

### Fits well — a fourth assistant adapter (small, reversible, cheap)

This repository already keeps thin per-assistant adapters under `.claude/`,
`.cline/`, `.continue/` and `.agents/` that point at shared canonical
instructions. Devin CLI and Devin Desktop read `AGENTS.md` and
`.devin/skills/`. Adding a `.devin/` adapter is the same work as the existing
ones, costs nothing, and does not violate any standing constraint. OpenSpec
already generates it: `--tools devin`.

This is the only Devin-related change worth making right now, and only if you
actually intend to drive a phase with Devin's local agent.

### Could fit later — a hired executor for the apply phase

The one shape where paying Cognition would make sense:

```
OpenSpec change (yours) → Devin session via API → PR → your CI gates → merge
```

Your repository keeps the specification, the artifact quality rules, the
linkage validator and the evidence. Devin is a worker that turns an agreed
task list into a pull request. The gate is your CI, on the PR, where you can
actually enforce it.

Note what this means: **Devin would be replacing the `apply` phase only** —
the phase your own README already assigns to the *cheap* model. You would be
paying a premium to outsource the deliberately-cheap part of the workflow.
That is worth doing only if the value is the isolated VM and the parallelism,
not the intelligence.

### Does not fit — Devin as the framework

Three direct conflicts with constraints this repository already committed to:

1. **"Assistant-neutral by construction. No phase depends on a capability
   unique to one tool or model."** Devin's actual value is Playbooks,
   Knowledge, coordinator sessions and its hosted VM. None of that ports.
   Adopting it as the framework breaks the constraint outright.
2. **"Manual first — no automation of a step until it has been run manually
   ten times."** Devin is an autonomous runner. Adopting it is skipping
   directly to the end state, against a rule written specifically because
   skipping to the end state failed last time.
3. **"Supporting machinery stays small relative to what it supports."** Devin
   does not reduce the machinery; it *relocates* it. You still build the
   lifecycle, the artifact rules, the linkage validation, the evidence model
   — none of which Devin has any concept of — and now you also maintain an
   API integration, a session-state mapping, a credential path, and a
   dependency on a vendor's roadmap.

---

## 6. Recommendation

**Do not adopt Devin now.** Not because it is bad — Fusion is genuinely good
engineering and the benchmark-per-dollar numbers are real — but because it
does not address why the last attempt failed.

The previous framework failed by building roughly 115,000 lines of apparatus
to support 1,700 lines of product: too much machinery, too early, before the
core loop was proven. Adopting Devin right now would be the same mistake in a
different costume — swapping homegrown complexity for vendor complexity while
the manual workflow still has not been run ten times, and adding a
consumption bill on top.

There is also a plain logical gap in the premise. "It sounds like Devin
supports that" is half right. Devin supports **task → pull request**
autonomously. It does not support **specification → lifecycle → evidenced
delivery**. Nobody sells that. That part is yours whichever tool executes the
code, which means the tool choice is not actually the load-bearing decision
right now.

### Take these three things from Devin for free, today

1. **Plan approval as a hard checkpoint.** The single most-repeated lesson
   from real Devin users is that skipping plan review burns money and
   produces plausible-but-wrong work. Your `propose` phase is already this
   checkpoint. Devin's field experience is independent confirmation that it
   is the right place to spend a human's attention — and an argument against
   ever automating past it, even later.
2. **Fusion's model-split principle, sharpened.** Your README already assigns
   frontier models to explore/propose and cheap models to apply/verify.
   Cognition arrived at the same split from production data — expensive model
   owns *planning, ambiguity and final review*; cheap model owns *exploration,
   code, tests, lint*. Two refinements worth absorbing: (a) note that "final
   review" sits on the expensive side in their split but on the cheap side in
   yours — reconsider that; (b) their warning that fixed up-front routing
   under-performs because difficulty is not visible from the prompt. Your
   phase-boundary routing is a fixed router. It is a defensible one, because
   phases differ in kind rather than in guessed difficulty — but expect to
   need an escape hatch that promotes a stuck apply-phase task back to the
   frontier model.
3. **Their multi-agent warning.** One stateful main loop, narrow stateless
   workers. If a multi-agent shape returns to this project, that is the shape
   — and it should arrive because a single agent demonstrably could not do
   the job, not as a starting design.

### If and when you want a cloud agent, try these first

Cheapest-to-prove first. The thing to prove is one loop: *hand an agreed,
specified change to a cloud agent, get a pull request back, let your own CI
be the gate.* If that loop does not hold, no vendor fixes it.

| Option | Cost | Why it is on the list |
|---|---|---|
| **What you already have** — Claude Code + Cline/Continue + DeepSeek | Existing subscriptions | Hooks, skills, subagents and dynamic workflows with resume are already available, already assistant-neutral, no new bill. Genuinely the best fit for the next phase. |
| **Google Jules** | Free — 15 tasks/day, 3 concurrent | Zero-cost way to test the delegate-to-a-cloud-VM shape. Paid tiers ride on Google AI Pro at $19.99/mo. |
| **GitHub Copilot coding agent** | Pro $10/mo, 300 premium requests | Assign an issue, get a PR — and it runs *inside GitHub*, where your issues, PRs and CI already are. Least integration work of anything here. |
| **OpenHands** | Open source, self-hostable; free individual cloud tier | The real open-source Devin equivalent. Model-agnostic, runs autonomous agents against a whole codebase, no lock-in. This is the one to trial if you want cloud autonomy without a vendor. |
| **SWE-agent** | Open source | Research-grade issue → patch, YAML-configured. Good building block, not a lifecycle. |
| **Aider** | BYO API key | Already in your README. Scriptable and the cheapest per token. |
| **Devin** | Free / $20 / $200 / $80+ | Revisit only after the loop above is proven, and only for its coordinator, per-child spend caps and scheduling — the things nothing else on this list has. |

And from the previous round of research, still standing: if durable
orchestration eventually becomes necessary, **do not hand-roll it**. Adopt a
durable-execution engine or the host's own resume primitive. That conclusion
is unchanged by anything in this document.

---

## Sources

Devin — primary (Cognition):
- [Devin Fusion — Cognition](https://cognition.com/blog/devin-fusion)
- [Don't Build Multi-Agents — Cognition](https://cognition.com/blog/dont-build-multi-agents)
- [Fable 5.1 in Devin and Why It's Cheaper than Opus 5 — Devin blog](https://devin.ai/blog/fable-5-1) *(rate-limited; quoted via search index)*
- [Billing — Devin Docs](https://docs.devin.ai/admin/billing)
- [Self-serve plans — Devin Docs](https://docs.devin.ai/admin/billing/self-serve)
- [Usage — Devin Docs](https://docs.devin.ai/admin/billing/usage)
- [API Overview — Devin Docs](https://docs.devin.ai/api-reference/overview)
- [Advanced Capabilities — Devin Docs](https://docs.devin.ai/work-with-devin/advanced-capabilities)
- [CLI Extensibility Overview — Devin Docs](https://docs.devin.ai/cli/extensibility)
- [Plugins — Devin Docs](https://docs.devin.ai/cli/extensibility/plugins/overview)
- [Rules & AGENTS.md — Devin Docs](https://docs.devin.ai/cli/extensibility/rules)

Models:
- [Introducing Claude Fable 5.1 and Claude Mythos 5.1 — Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-1)

Spec-driven development tooling:
- [OpenSpec supported tools](https://github.com/Fission-AI/OpenSpec/blob/main/docs/supported-tools.md)
- [OpenSpec](https://github.com/Fission-AI/OpenSpec)
- [GitHub Spec Kit](https://github.com/github/spec-kit)
- [OpenSpec vs Spec Kit — Hashrocket](https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team)

Alternatives:
- [OpenHands pricing](https://www.openhands.dev/pricing)
- [The 6 Best Open-Source Devin Alternatives in 2026 — OpenHands](https://www.openhands.dev/blog/devin-ai-alternatives)
- [GitHub Copilot premium requests — GitHub Docs](https://docs.github.com/en/billing/concepts/product-billing/github-copilot-premium-requests)
- [Google Jules pricing 2026 — HackUp](https://hackup.ai/ai-plans/jules/)

Secondary / treat as directional only:
- [Devin Pricing 2026 — usecarly](https://www.usecarly.com/blog/devin-pricing/) *(source of the $2.25/ACU and ~15-min-per-ACU figures, unconfirmed by Cognition)*
- [Devin Fusion — eesel AI](https://www.eesel.ai/blog/devin-fusion)
- [Inside Devin's Workflow — easycoding.tools](https://easycoding.tools/blog/en/inside-devin-s-workflow-tool-use-planning-and-autonomy)

## Caveats

- Desk research only. Devin was not trialled, no session was run, no cost was
  measured against a real change in this repository.
- `devin.ai` returned HTTP 429 to every direct fetch. The Fable 5.1 post is
  quoted from a search index rather than read in full.
- Cognition does not publish self-serve quota amounts or overage rates. Any
  cost projection for a solo developer is therefore an estimate, not a
  calculation.
- Benchmark numbers are the vendor's own, on the vendor's own benchmark
  (FrontierCode), and were not independently reproduced.
