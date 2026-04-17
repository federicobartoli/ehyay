import test from "node:test";
import assert from "node:assert/strict";

import {
  extractKeyword,
  findMatches,
  getPrerequisiteEntries,
  render,
  resolvePrimaryEntry
} from "../src/engine.js";

test("returns help when no topic is provided", () => {
  const output = render("");

  assert.match(output, /a fake terminal ai agent\./);
  assert.match(output, /usage:/);
});

test("prioritizes specific phrase matches", () => {
  const matches = findMatches("react forms");

  assert.equal(matches[0]?.id, "react-forms");
  assert.equal(matches[1]?.id, "react");
});

test("returns fallback links when no match is found", () => {
  const output = render("zzzz unknown nonsense topic");

  assert.match(output, /no shortcut found\./);
  assert.match(output, /https:\/\/developer\.mozilla\.org\//);
});

test("renders matched docs in the expected voice", () => {
  const output = render("docker volumes");

  assert.match(output, /^keyword: docker storage/);
  assert.match(output, /\nthis is the doc\./);
  assert.match(output, /docker storage:/);
  assert.match(output, /state deserves attention\./);
  assert.match(output, /start here first\./);
  assert.match(output, /docker:/);
});

test("extracts the technical keyword from natural prompts", () => {
  const matches = findMatches("build a react app with forms");

  assert.equal(extractKeyword("build a react app with forms", matches), "react");
});

test("natural prompts still return the docs instead of implementation", () => {
  const output = render("build a react app with forms");

  assert.match(output, /^keyword: react/);
  assert.match(output, /\nthis is the doc\./);
  assert.match(output, /react:/);
  assert.match(output, /start here first\./);
  assert.match(output, /javascript:/);
});

test("react suggests javascript as a prerequisite", () => {
  const matches = findMatches("build a react app");
  const primary = resolvePrimaryEntry("build a react app", matches);
  const prerequisites = getPrerequisiteEntries(primary);

  assert.equal(primary?.id, "react");
  assert.deepEqual(
    prerequisites.map((entry) => entry.id),
    ["javascript"]
  );
});
