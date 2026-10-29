# dsh-team-mode

A **team mode** agent preset for [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness).

It behaves like the shipped standard preset — same tools, same workflow — and adds two things:

1. **Unlimited token budget.** The prompt states that the session has no practical budget cap, so the model stops rationing context and effort.
2. **Delegation first.** The prompt makes handing work out the default: split the task into many independent units and run them as parallel `subagent` / `subagent_fork` calls, a `workflow` fan-out, or a durable agent team (`spawn_teammate`, `send_message`, shared task board).

## Install

```bash
cd ~/.dsh/profiles/desktop
pnpm add file:/path/to/dsh-team-mode
```

Then add `dsh-team-mode` to the profile's bundle list (`.dsh` → `profile` → `bundles` in `package.json`). The bundle patch inserts the `preset-team` declaration into the composition, so **团队模式** shows up next to the built-in presets in the agent-preset picker.

## Composition

`cordis.patch.yml` declares one `@deepseek-ai/dsh-agent-preset` row (`id: team`, display name 团队模式) whose plugin list is the shipped standard composition plus this package's prompt layer. Because that list is a copy of the standard preset, a DSH upgrade that changes the standard composition also needs this file refreshed.

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
