# AGENTS.md

## Quote Template Layout QA

For customer-facing quote templates:

- Normalize vertical spacing with shared gap systems instead of stacked one-off margins.
- Do not apply `white-space: pre-line` to container cards or layout wrappers.
- Hide empty containers so they do not create visual gaps.
- Prefer parent `gap` systems over mixed parent gaps plus child `margin-top` unless the separation is intentionally different.
- When two stacked sections should feel consistent, verify the rendered spacing in a browser instead of relying on stylesheet inspection alone.
- If a section feels too loose, inspect for inherited whitespace, default margins, empty-but-rendered blocks, and duplicated spacing from both parent and child rules.

## Required Quote QA Pass

Before closing any quote-template styling task:

- Open the affected quote in a real browser.
- Check desktop and mobile widths.
- Inspect the spacing around every section you changed.
- Verify no empty blocks are still taking up space.
- Keep stacked right-rail modules on a consistent spacing rhythm unless the design intentionally calls for a larger separation.
