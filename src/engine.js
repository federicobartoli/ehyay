import { defaultReply, docs } from "./knowledge-base.js";

const ignoredMatchTokens = new Set([
  "a",
  "an",
  "and",
  "app",
  "build",
  "code",
  "create",
  "debug",
  "fix",
  "for",
  "from",
  "generate",
  "help",
  "i",
  "in",
  "make",
  "me",
  "my",
  "of",
  "on",
  "please",
  "project",
  "set",
  "setup",
  "solve",
  "the",
  "to",
  "up",
  "use",
  "using",
  "with",
  "write"
]);

const actionIntentTokens = new Set([
  "build",
  "create",
  "debug",
  "fix",
  "generate",
  "make",
  "solve",
  "write"
]);

export function normalize(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.+#/\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenize(value) {
  return normalize(value)
    .split(" ")
    .filter(Boolean);
}

export function tokenizeForMatching(value) {
  return tokenize(value).filter(
    (token) => token.length > 1 && !ignoredMatchTokens.has(token)
  );
}

export function hasActionIntent(value) {
  return tokenize(value).some((token) => actionIntentTokens.has(token));
}

export function getEntryById(id) {
  return docs.find((entry) => entry.id === id) ?? null;
}

function phraseScore(query, term) {
  if (!query || !term) {
    return 0;
  }

  if (query === term) {
    return 8;
  }

  if (query.includes(term)) {
    return 4;
  }

  return 0;
}

export function scoreDoc(tokens, normalizedQuery, entry) {
  const entryTerms = entry.terms.map(normalize);
  let score = 0;

  for (const term of entryTerms) {
    score += phraseScore(normalizedQuery, term);
  }

  for (const token of tokens) {
    for (const term of entryTerms) {
      if (token === term) {
        score += 3;
        continue;
      }

      if (term.includes(token) || token.includes(term)) {
        score += 1;
      }
    }
  }

  return score;
}

export function findMatches(query) {
  const normalizedQuery = normalize(query);
  const tokens = tokenizeForMatching(query);

  if (tokens.length === 0) {
    return [];
  }

  return docs
    .map((entry) => ({
      ...entry,
      score: scoreDoc(tokens, normalizedQuery, entry)
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (left.score === right.score) {
        return left.label.localeCompare(right.label);
      }

      return right.score - left.score;
    })
    .slice(0, 3);
}

export function formatEntry(entry) {
  const primaryLink = entry.links[0];
  const lines = [entry.label + ":", entry.intro];

  if (primaryLink) {
    lines.push(primaryLink.url);
  }

  return lines.join("\n");
}

export function resolvePrimaryEntry(query, matches) {
  const topMatch = matches[0];

  if (!topMatch) {
    return null;
  }

  if (hasActionIntent(query) && topMatch.rootId) {
    return getEntryById(topMatch.rootId) ?? topMatch;
  }

  return topMatch;
}

export function getPrerequisiteEntries(entry) {
  return (entry?.startWith ?? [])
    .map((id) => getEntryById(id))
    .filter(Boolean);
}

export function extractKeyword(query, matches) {
  const primary = resolvePrimaryEntry(query, matches);
  return primary?.label ?? null;
}

export function help() {
  return [
    "ehyay",
    "",
    "a fake terminal ai agent.",
    "it does not replace understanding. it returns you to it.",
    "",
    "usage:",
    "  ehyay          open companion mode",
    "  ehyay <topic>  one-shot docs",
    "",
    "examples:",
    "  ehyay",
    "  ehyay react forms",
    "  ehyay docker volumes",
    "  ehyay postgres joins"
  ].join("\n");
}

export function formatDefaultReply() {
  const lines = [defaultReply.intro, defaultReply.followUp];

  for (const link of defaultReply.links) {
    lines.push(link.url);
  }

  return lines.join("\n");
}

export function render(input) {
  if (!input || input === "--help" || input === "-h") {
    return help();
  }

  const matches = findMatches(input);

  if (matches.length === 0) {
    return formatDefaultReply();
  }

  const primary = resolvePrimaryEntry(input, matches);
  const keyword = primary?.label ?? extractKeyword(input, matches);
  const prerequisites = getPrerequisiteEntries(primary);
  const sections = [`keyword: ${keyword}`, "", "this is the doc.", "", formatEntry(primary)];

  if (prerequisites.length > 0) {
    sections.push("");
    sections.push("start here first.");
    sections.push("");
    sections.push(prerequisites.map(formatEntry).join("\n\n"));
  }

  return sections.join("\n");
}
