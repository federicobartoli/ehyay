#!/usr/bin/env node

import { findMatches, render } from "./engine.js";
import { startInteractiveSession } from "./interactive.js";
import { describeQuery, renderMoodLine } from "./mascot.js";

async function main() {
  const input = process.argv.slice(2).join(" ").trim();

  if (!input) {
    if (!process.stdin.isTTY || !process.stdout.isTTY) {
      console.log(render("--help"));
      return;
    }
    await startInteractiveSession();
    return;
  }

  if (input === "--help" || input === "-h") {
    console.log(render("--help"));
    return;
  }

  const matches = findMatches(input);
  const description = describeQuery(input, matches);
  const useColor = Boolean(process.stdout.isTTY);

  console.log(renderMoodLine(description, useColor));
  console.log("");
  console.log(render(input));
}

await main();
