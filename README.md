# dsh-team-mode — 许愿模式 / Wish mode

A **wish mode** agent preset for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).

The user states a wish; the preset makes the agent deliver something better than the obvious minimum:

1. **Unlimited budget.** The prompt states the session has no practical token cap, so the model stops rationing context and effort.
2. **The whole toolset.** Use every available tool deliberately (files, shell, web, browser/preview, image generation, skills, MCP), chained together instead of stopping at the first result.
3. **Outside resources.** Search and read current documentation, prior art, standards and design references, pull in real data and assets, and cite what was used.
4. **Aggressive delegation.** Many parallel subagents, workflow fan-outs and durable teammates instead of serial work.
5. **Crafted, original delivery.** Spend a deliberate step on the concept, choose a direction with character, and review the result against the wish before calling it done.

## Install

```bash
cd ~/.dsh/profiles/desktop
pnpm add file:/path/to/dsh-team-mode
```

Then add `dsh-team-mode` to the profile's bundle list (`.dsh` → `profile` → `bundles` in `package.json`). The bundle patch inserts the `preset-team` declaration (display name 许愿模式) into the composition, so it shows up next to the built-in presets in the agent-preset picker.

## Composition

`cordis.patch.yml` declares one `@deepseek-ai/dsh-agent-preset` row whose plugin list is the shipped standard composition plus this package's prompt layer. Because that list is a copy of the standard preset, a DSH upgrade that changes the standard composition also needs this file refreshed. The internal preset id stays `team` so sessions that already selected the mode keep resolving.

## Configuration

The prompt layer accepts optional config on its preset row:

```yaml
          - id: team-mode-policy
            name: dsh-team-mode
            config:
              instructions: |-
                Custom guidance that replaces the built-in text.
              order: 601
```
