import {
  extractKeyword,
  getPrerequisiteEntries,
  hasActionIntent,
  resolvePrimaryEntry
} from "./engine.js";

const reset = "\u001b[0m";
const colors = {
  border: "\u001b[38;5;240m",
  title: "\u001b[38;5;223m",
  accent: "\u001b[38;5;179m",
  subtle: "\u001b[38;5;244m",
  text: "\u001b[38;5;252m",
  prompt: "\u001b[38;5;216m",
  calm: "\u001b[38;5;180m",
  focused: "\u001b[38;5;215m",
  curious: "\u001b[38;5;222m",
  patient: "\u001b[38;5;187m",
  puzzled: "\u001b[38;5;209m"
};

const faces = {
  calm:    ["( -.- )", "( -_- )", "( -.- )", "(  .  )"],
  focused: ["( o.o )", "( O.O )", "( o.o )", "( -.- )"],
  curious: ["( ^.^ )", "( ^-^ )", "( o.^ )", "( -.- )"],
  patient: ["( u.u )", "( -_- )", "( u.u )", "(  .  )"],
  puzzled: ["( ?.? )", "( ?_? )", "( o.o )", "( -.- )"]
};

const EARS = " /\\_/\\ ";
const WHISKERS = "  > ^ <";
const INNER = 52;

function paint(text, color, useColor) {
  return useColor && color ? `${color}${text}${reset}` : text;
}

function strip(s) {
  return s.replace(/\u001b\[[0-9;]*m/g, "");
}

function padRight(content, width) {
  const gap = Math.max(0, width - strip(content).length);
  return content + " ".repeat(gap);
}

function moodColor(mood) {
  return colors[mood] ?? colors.calm;
}

function titleBar(safeMood, state, useColor) {
  const border = (s) => paint(s, colors.border, useColor);
  const title = paint("ehyay", colors.title, useColor);
  const sep = paint("·", colors.subtle, useColor);
  const moodTag = paint(safeMood, moodColor(safeMood), useColor);
  const clarity = paint(`c${state.clarity}`, colors.accent, useColor);
  const drift = paint(`d${state.drift}`, colors.subtle, useColor);
  const head = [title, sep, moodTag, sep, clarity, sep, drift].join(" ");
  const headVisible = strip(head).length;
  const dashCount = Math.max(2, INNER + 2 - headVisible - 4);
  return border("╭─ ") + head + border(` ${"─".repeat(dashCount)}╮`);
}

function frame(rows, safeMood, state, useColor) {
  const border = (s) => paint(s, colors.border, useColor);
  const top = titleBar(safeMood, state, useColor);
  const bot = border(`╰${"─".repeat(INNER + 2)}╯`);
  const wall = border("│");
  const body = rows.map((row) => `${wall} ${padRight(row, INNER)} ${wall}`);
  return [top, ...body, bot].join("\n");
}

export function createSessionState() {
  return { clarity: 0, drift: 0, lastMood: "calm", frame: 0 };
}

function matchLine({ keyword, firstStep, hasAction }) {
  if (firstStep) return `${firstStep} first. then ${keyword}.`;
  if (hasAction) return `${keyword}. not the build.`;
  return `${keyword}. begin there.`;
}

function describeMatch(query, matches, hasAction) {
  const primary = resolvePrimaryEntry(query, matches);
  return {
    mood: matches.length > 1 ? "focused" : "curious",
    line: matchLine({
      keyword: extractKeyword(query, matches),
      firstStep: getPrerequisiteEntries(primary)[0]?.label,
      hasAction
    })
  };
}

function describeMiss(query, hasAction) {
  if (hasAction) return { mood: "patient", line: "smaller. name the tool." };
  if (query.trim().split(/\s+/).length <= 1) {
    return { mood: "puzzled", line: "one more word helps." };
  }
  return { mood: "puzzled", line: "be more specific." };
}

export function describeQuery(query, matches) {
  const hasAction = hasActionIntent(query);
  return matches[0] ? describeMatch(query, matches, hasAction) : describeMiss(query, hasAction);
}

export function updateSessionState(state, description, matches) {
  return {
    clarity: state.clarity + (matches.length > 0 ? 1 : 0),
    drift: state.drift + (matches.length === 0 ? 1 : 0),
    lastMood: description.mood,
    frame: (state.frame + 1) % 4
  };
}

export function renderMascotPanel({ mood, line, state, phase = 0, useColor = false }) {
  const safeMood = faces[mood] ? mood : "calm";
  const color = moodColor(safeMood);
  const face = faces[safeMood][phase % 4];
  const gap = "   ";
  const lineText = paint(line ?? "", colors.text, useColor);

  const rows = [
    paint(EARS, color, useColor),
    `${paint(face, color, useColor)}${gap}${lineText}`,
    paint(WHISKERS, color, useColor)
  ];

  return frame(rows, safeMood, state, useColor);
}

export function renderMoodLine({ mood, line }, useColor = false) {
  const safeMood = faces[mood] ? mood : "calm";
  const color = moodColor(safeMood);
  const face = faces[safeMood][0];
  const bold = useColor ? "\u001b[1m" : "";
  return paint(`${bold}${face}  ${line}`, color, useColor);
}

export function renderThinking(useColor = false) {
  const face = faces.patient[1];
  return paint(`${face}  thinking…`, colors.subtle, useColor);
}

export function renderIntroPanel(state, useColor = false) {
  return renderMascotPanel({
    mood: "calm",
    line: "not your coding agent.",
    state,
    phase: 0,
    useColor
  });
}

export function renderWelcome(state) {
  return [
    renderMascotPanel({ mood: "calm", line: "source first.", state }),
    "",
    "type a topic. /help for commands. /exit to leave."
  ].join("\n");
}

export function renderSessionHelp() {
  return [
    "commands:",
    "  /help  show commands",
    "  /pet   greet ehyay",
    "  /exit  leave the session",
    "",
    "examples:  react forms · docker volumes · postgres joins"
  ].join("\n");
}

export function renderPromptEcho(inputValue = "", useColor = false) {
  return `${paint("ask>", colors.prompt, useColor)} ${paint(inputValue, colors.text, useColor)}`;
}

export function renderLiveScene({
  mood,
  line,
  state,
  inputValue = "",
  phase = 0,
  useColor = false
}) {
  const prompt = renderPromptEcho(inputValue, useColor);
  return [
    renderMascotPanel({ mood, line, state, phase, useColor }),
    "",
    prompt
  ].join("\n");
}

export function countPanelLines(panel) {
  return panel.split("\n").length;
}
