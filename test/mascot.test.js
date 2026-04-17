import test from "node:test";
import assert from "node:assert/strict";

import {
  countPanelLines,
  createSessionState,
  describeQuery,
  renderLiveScene,
  renderMascotPanel,
  renderWelcome,
  updateSessionState
} from "../src/mascot.js";

test("renders the welcome screen with the mascot", () => {
  const output = renderWelcome(createSessionState());

  assert.match(output, /ehyay/);
  assert.match(output, /source first\./);
  assert.match(output, /type a topic\./);
});

test("nudges vague action prompts toward specificity", () => {
  const description = describeQuery("fix my code", []);

  assert.equal(description.mood, "patient");
  assert.match(description.line, /name the tool\./);
});

test("guides action prompts toward prerequisites when available", () => {
  const description = describeQuery("build a react app with forms", [
    { id: "react-forms", label: "react forms", rootId: "react" },
    { id: "react", label: "react", startWith: ["javascript"] }
  ]);

  assert.equal(description.mood, "focused");
  assert.match(description.line, /javascript first\. then react\./);
});

test("tracks clarity and drift across the session", () => {
  const initialState = createSessionState();
  const nextState = updateSessionState(initialState, { mood: "focused" }, [{ id: "react" }]);
  const finalState = updateSessionState(nextState, { mood: "puzzled" }, []);

  assert.deepEqual(finalState, {
    clarity: 1,
    drift: 1,
    lastMood: "puzzled",
    frame: 2
  });
});

test("can render a colored panel for terminal mode", () => {
  const output = renderMascotPanel({
    mood: "focused",
    line: "not building it.",
    state: createSessionState(),
    phase: 1,
    useColor: true
  });

  assert.match(output, /\u001b\[38;5;/);
  assert.match(output, /ehyay/);
  assert.match(output, /not building it\./);
  assert.equal(countPanelLines(output), 5);
});

test("can render a live scene with the prompt", () => {
  const output = renderLiveScene({
    mood: "calm",
    line: "source first.",
    state: createSessionState(),
    inputValue: "build a react app",
    phase: 2,
    useColor: false
  });

  assert.match(output, /ask> build a react app/);
  assert.match(output, /ehyay/);
});
