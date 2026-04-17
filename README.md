# ehyay

**A fake terminal AI agent. It does not help you build. It sends you back to the docs.**

```txt
╭─ ehyay · focused · c2 · d0 ─────────────────────────╮
│  /\_/\                                               │
│ ( o.o )   javascript first. then react.              │
│   > ^ <                                              │
╰──────────────────────────────────────────────────────╯
```

## Try it, right now

```bash
npx ehyay react forms
npx ehyay "build a react app"     # ehyay will not build it
npx ehyay                         # companion mode
```

## Install

```bash
npm install -g ehyay
ehyay docker volumes
```

## What it does

You ask it to build something. It refuses. It tells you what to read first.

```txt
$ ehyay "build a react app with forms"

( o.o )  javascript first. then react.

keyword: react

this is the doc.

react:
start with the source.
https://react.dev/learn

start here first.

javascript:
language first.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
```

No code. No scaffolding. No implementation.
Just the page you should have read.

## Why

AI can point you in a direction. It should not replace understanding.

`ehyay` is the joke version of that statement, shipped as a CLI.
The mascot has moods. It tracks your `clarity` and your `drift`. It is not impressed.

## Companion mode

```bash
ehyay
```

- type a topic.
- `/help` lists commands.
- `/pet` redraws the cat.
- `/exit` or `Ctrl+C` leaves.

## Knows about

javascript · typescript · react · vue · svelte · angular · next.js · node ·
python · django · flask · fastapi · rust · go · java · kotlin · swift ·
sql · postgres · mysql · sqlite · redis · mongodb · prisma ·
docker · kubernetes · terraform · aws · nginx · linux · bash · vim · ssh ·
html · css · tailwind · graphql · rest · vite · webpack · testing · regex ·
git · anthropic · openai.

## License

MIT.
