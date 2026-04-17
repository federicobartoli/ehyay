import * as readline from "node:readline";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

import { findMatches, render } from "./engine.js";
import {
  countPanelLines,
  createSessionState,
  describeQuery,
  renderIntroPanel,
  renderLiveScene,
  renderMascotPanel,
  renderMoodLine,
  renderPromptEcho,
  renderSessionHelp,
  renderThinking,
  renderWelcome,
  updateSessionState
} from "./mascot.js";

const FAREWELL = { mood: "patient", line: "enough for now." };
const BLANK = { mood: "patient", line: "a smaller question helps." };
const PET = { line: "still here." };
const HELP_LIVE = { line: "type the tool. not the hope." };

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function classify(answer) {
  if (!answer) return "blank";
  if (answer === "/help") return "help";
  if (answer === "/pet") return "pet";
  if (answer === "/exit") return "exit";
  return "ask";
}

function processAsk(answer, state) {
  const matches = findMatches(answer);
  const description = describeQuery(answer, matches);
  return {
    description,
    nextState: updateSessionState(state, description, matches),
    doc: render(answer)
  };
}

function clearRenderedLines(lineCount) {
  if (lineCount === 0) return;
  output.write("\r");
  if (lineCount > 1) output.write(`\u001b[${lineCount - 1}A`);
  output.write("\u001b[J");
}

async function animatePanel({ mood, line, state, cycles = 1 }) {
  if (!output.isTTY) {
    console.log(renderMascotPanel({ mood, line, state }));
    return;
  }

  let previousLineCount = 0;
  output.write("\u001b[?25l");

  try {
    for (let cycle = 0; cycle < cycles; cycle++) {
      for (const phase of [0, 1, 2, 3]) {
        const panel = renderMascotPanel({ mood, line, state, phase, useColor: true });
        clearRenderedLines(previousLineCount);
        output.write(panel);
        previousLineCount = countPanelLines(panel);
        await sleep(70);
      }
    }
  } finally {
    output.write("\u001b[?25h");
  }
}

function printBlock(...parts) {
  const content = parts.filter(Boolean).join("\n\n").trimEnd();
  if (content) output.write(`${content}\n\n`);
}

function readTTYPrompt({ mood, line, state }) {
  return new Promise((resolve) => {
    let inputValue = "";
    let phase = state.frame;
    let renderedLines = 0;

    const draw = () => {
      const scene = renderLiveScene({ mood, line, state, inputValue, phase, useColor: true });
      output.write("\u001b[?25l");
      clearRenderedLines(renderedLines);
      output.write(scene);
      output.write("\u001b[?25h");
      renderedLines = countPanelLines(scene);
    };

    const cleanup = () => {
      clearInterval(intervalId);
      input.off("keypress", onKeypress);
      output.write("\u001b[?25h");
      clearRenderedLines(renderedLines);
    };

    const onKeypress = (str, key = {}) => {
      if (key.ctrl && key.name === "c") {
        cleanup();
        resolve("/exit");
        return;
      }
      if (key.name === "return" || key.name === "enter") {
        cleanup();
        resolve(inputValue.trim());
        return;
      }
      if (key.name === "backspace") {
        inputValue = inputValue.slice(0, -1);
        draw();
        return;
      }
      if (key.name === "escape") {
        inputValue = "";
        draw();
        return;
      }
      if (key.ctrl || key.meta || !str) return;
      inputValue += str;
      draw();
    };

    const intervalId = setInterval(() => {
      phase = (phase + 1) % 4;
      draw();
    }, 180);

    input.on("keypress", onKeypress);
    draw();
  });
}

async function readPlainAnswer(session) {
  try {
    return (await session.question("\nyou> ")).trim();
  } catch (error) {
    if (error?.code === "ABORT_ERR") return "/exit";
    throw error;
  }
}

async function startPlainSession() {
  const session = createInterface({ input, output });
  let state = createSessionState();

  console.log(renderWelcome(state));

  try {
    while (true) {
      const answer = await readPlainAnswer(session);
      const kind = classify(answer);

      if (kind === "exit") {
        console.log("");
        console.log(renderMascotPanel({ ...FAREWELL, state }));
        break;
      }
      if (kind === "blank") {
        console.log("");
        console.log(renderMoodLine(BLANK));
        continue;
      }
      if (kind === "help") {
        console.log("");
        console.log(renderSessionHelp());
        continue;
      }
      if (kind === "pet") {
        console.log("");
        console.log(renderMascotPanel({ mood: state.lastMood, line: PET.line, state }));
        continue;
      }

      const { description, nextState, doc } = processAsk(answer, state);
      state = nextState;

      console.log("");
      console.log(renderMoodLine(description));
      console.log("");
      console.log(doc);
    }
  } finally {
    session.close();
  }
}

async function playIntro(state) {
  const panel = renderIntroPanel(state, true);
  output.write(panel);
  await sleep(900);
  clearRenderedLines(countPanelLines(panel));
}

async function thinkingPause() {
  output.write(renderThinking(true));
  await sleep(420);
  output.write("\r\u001b[2K");
}

async function startTTYSession() {
  let state = createSessionState();
  let live = { mood: "calm", line: "source first." };

  readline.emitKeypressEvents(input);
  input.setRawMode(true);

  try {
    await playIntro(state);
    while (true) {
      const answer = await readTTYPrompt({ ...live, state });
      const kind = classify(answer);

      if (kind === "exit") {
        await animatePanel({ ...FAREWELL, state });
        output.write("\n");
        break;
      }
      if (kind === "blank") {
        live = BLANK;
        continue;
      }
      if (kind === "help") {
        live = { mood: state.lastMood, line: HELP_LIVE.line };
        printBlock(renderSessionHelp());
        continue;
      }
      if (kind === "pet") {
        live = { mood: state.lastMood, line: PET.line };
        continue;
      }

      const { description, nextState, doc } = processAsk(answer, state);
      state = nextState;
      live = description;

      output.write(`${renderPromptEcho(answer, true)}\n\n`);
      await thinkingPause();
      printBlock(renderMoodLine(description, true), doc);
    }
  } finally {
    output.write("\u001b[?25h");
    input.setRawMode(false);
  }
}

export async function startInteractiveSession() {
  if (!input.isTTY || !output.isTTY) {
    await startPlainSession();
    return;
  }
  await startTTYSession();
}
