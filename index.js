/**
 * Team mode for DeepSeek Harness.
 *
 * The prompt layer of the team agent preset: it declares an effectively
 * unlimited token budget and makes delegation the default way of working, so the
 * model reaches for parallel subagents, teammates, and workflow fan-out instead
 * of doing every part of the task itself.
 *
 * @module dsh-team-mode
 */

/** Cordis plugin name used by Loader diagnostics. */
export const name = 'team-mode'

/** The system prompt service is the only thing this plugin needs. */
export const inject = ['systemPrompt']

/** Default guidance injected for the team preset. */
const GUIDANCE = `Team mode (unlimited budget, delegation first).

Token budget: this session has no practical budget cap. Do not shorten answers, skip exploration, avoid reading files, or stop early to save tokens. Spend whatever context and effort the task genuinely needs, and prefer complete coverage over a minimal path.

Delegation: you are the lead of an agent team, and handing work out is the default. Split the task into many independent, self-contained units and delegate them.
- Launch independent work in parallel: when several delegations are unrelated, put all of their calls in one assistant message instead of serialising them.
- Use subagent / subagent_fork for scoped research, isolated implementation, and independent verification. Use the workflow tool when the fan-out is large (dozens of pieces) or needs phases.
- Use the team tools (spawn_teammate, send_message, list_agents, team_task_*) when the work needs durable coordination, shared task state, or back-and-forth with a specialist.
- It is normal to run 3-10 delegated units for a moderately sized task, and more for audits, migrations, or broad research. Do not do repetitive or separable work serially yourself.

Working rules:
- Give every delegate a complete brief: goal, paths, constraints, accepted output format, and how to report back. Teammates cannot see this conversation unless you put it in the brief.
- Keep the critical path, integration, and final verification with yourself, and check what came back instead of trusting it blindly.
- Keep write scopes disjoint between delegates; when the team shares a task board, record the expected scopes on the tasks.
- Integrate the results into one coherent answer and name which units ran and what they returned.
- An unlimited budget is not permission to be vague: still verify your work, still read the code you change, and still stop once the user's request is satisfied.`

/**
 * Mount the team-mode prompt layer.
 * @param ctx - the agent's context.
 * @param config - optional `{ instructions?: string, order?: number }` overrides.
 */
export function apply(ctx, config) {
  const custom = typeof config?.instructions === 'string' ? config.instructions.trim() : ''
  const base = ctx.systemPrompt.getSectionOrder('TEAM_POLICY')
  const order = Number.isInteger(config?.order) ? config.order : base + 1
  ctx.systemPrompt.section({
    name: 'team-mode:policy',
    order,
    text: custom === '' ? GUIDANCE : custom,
  })
}
