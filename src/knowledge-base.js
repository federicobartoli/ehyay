export const docs = [
  {
    id: "javascript",
    terms: ["javascript", "js", "promise", "promises", "async", "await", "fetch", "array", "arrays"],
    label: "javascript",
    intro: "language first.",
    links: [
      {
        label: "mdn javascript guide",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
      },
      {
        label: "javascript.info",
        url: "https://javascript.info/"
      }
    ]
  },
  {
    id: "react",
    terms: ["react", "jsx", "hooks", "useeffect", "usestate", "component", "components"],
    label: "react",
    intro: "start with the source.",
    startWith: ["javascript"],
    links: [
      {
        label: "react docs",
        url: "https://react.dev/learn"
      }
    ]
  },
  {
    id: "react-forms",
    rootId: "react",
    terms: ["form", "forms", "input", "inputs", "controlled", "uncontrolled"],
    label: "react forms",
    intro: "forms are quiet until they break.",
    startWith: ["javascript", "react"],
    links: [
      {
        label: "react input reference",
        url: "https://react.dev/reference/react-dom/components/input"
      },
      {
        label: "react textarea reference",
        url: "https://react.dev/reference/react-dom/components/textarea"
      },
      {
        label: "react select reference",
        url: "https://react.dev/reference/react-dom/components/select"
      }
    ]
  },
  {
    id: "next",
    terms: ["next", "nextjs", "next.js", "app-router", "server-components"],
    label: "next.js",
    intro: "do not begin with snippets.",
    startWith: ["javascript", "react"],
    links: [
      {
        label: "next.js docs",
        url: "https://nextjs.org/docs"
      }
    ]
  },
  {
    id: "node",
    terms: ["node", "nodejs", "node.js", "npm", "pnpm", "yarn"],
    label: "node.js",
    intro: "runtime first. magic later.",
    startWith: ["javascript"],
    links: [
      {
        label: "node.js docs",
        url: "https://nodejs.org/en/docs"
      },
      {
        label: "npm docs",
        url: "https://docs.npmjs.com/"
      }
    ]
  },
  {
    id: "typescript",
    terms: ["typescript", "ts", "tsconfig", "typing", "types", "generics"],
    label: "typescript",
    intro: "types are slower. that is often good.",
    startWith: ["javascript"],
    links: [
      {
        label: "typescript handbook",
        url: "https://www.typescriptlang.org/docs/"
      }
    ]
  },
  {
    id: "tailwind",
    terms: ["tailwind", "tailwindcss", "utility classes", "utilities"],
    label: "tailwind",
    intro: "class names are still language.",
    startWith: ["html", "css"],
    links: [
      {
        label: "tailwind docs",
        url: "https://tailwindcss.com/docs"
      }
    ]
  },
  {
    id: "docker",
    terms: ["docker", "container", "containers", "compose", "image", "images"],
    label: "docker",
    intro: "read this before the next copy paste.",
    links: [
      {
        label: "docker docs",
        url: "https://docs.docker.com/"
      }
    ]
  },
  {
    id: "docker-volumes",
    rootId: "docker",
    terms: ["volume", "volumes", "bind", "mount", "mounts"],
    label: "docker storage",
    intro: "state deserves attention.",
    startWith: ["docker"],
    links: [
      {
        label: "docker volumes",
        url: "https://docs.docker.com/engine/storage/volumes/"
      },
      {
        label: "bind mounts",
        url: "https://docs.docker.com/engine/storage/bind-mounts/"
      }
    ]
  },
  {
    id: "sql",
    terms: ["sql", "select", "where", "group", "having", "order", "join", "joins"],
    label: "sql",
    intro: "query language first.",
    links: [
      {
        label: "mdn sql guide",
        url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/SQL"
      }
    ]
  },
  {
    id: "postgres",
    terms: ["postgres", "postgresql", "sql", "query", "queries", "join", "joins", "index", "indexes"],
    label: "postgresql",
    intro: "ask the database what it is doing.",
    startWith: ["sql"],
    links: [
      {
        label: "postgres docs",
        url: "https://www.postgresql.org/docs/"
      },
      {
        label: "using explain",
        url: "https://www.postgresql.org/docs/current/using-explain.html"
      }
    ]
  },
  {
    id: "git",
    terms: ["git", "rebase", "merge", "commit", "branch", "branches"],
    label: "git",
    intro: "history is part of the work.",
    links: [
      {
        label: "git docs",
        url: "https://git-scm.com/doc"
      },
      {
        label: "pro git",
        url: "https://git-scm.com/book/en/v2"
      }
    ]
  },
  {
    id: "python",
    terms: ["python", "pip", "venv", "poetry", "uv"],
    label: "python",
    intro: "environment first.",
    links: [
      {
        label: "python docs",
        url: "https://docs.python.org/3/"
      },
      {
        label: "packaging guide",
        url: "https://packaging.python.org/"
      }
    ]
  },
  {
    id: "css",
    terms: ["css", "flex", "grid", "selector", "selectors", "layout"],
    label: "css",
    intro: "layout is not a side quest.",
    startWith: ["html"],
    links: [
      {
        label: "mdn css",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS"
      }
    ]
  },
  {
    id: "html",
    terms: ["html", "semantic", "semantics", "accessibility", "a11y", "aria"],
    label: "html and accessibility",
    intro: "the structure comes before the styling.",
    links: [
      {
        label: "mdn html",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML"
      },
      {
        label: "mdn accessibility",
        url: "https://developer.mozilla.org/en-US/docs/Web/Accessibility"
      }
    ]
  },
  {
    id: "rust",
    terms: ["rust", "cargo", "ownership", "borrow", "borrowck"],
    label: "rust",
    intro: "the compiler is the teacher.",
    links: [
      { label: "the rust book", url: "https://doc.rust-lang.org/book/" }
    ]
  },
  {
    id: "go",
    terms: ["go", "golang", "goroutine", "goroutines", "channel", "channels"],
    label: "go",
    intro: "boring on purpose.",
    links: [
      { label: "tour of go", url: "https://go.dev/tour/welcome/1" }
    ]
  },
  {
    id: "java",
    terms: ["java", "jvm", "spring", "maven", "gradle"],
    label: "java",
    intro: "verbose is a choice.",
    links: [
      { label: "java tutorials", url: "https://dev.java/learn/" }
    ]
  },
  {
    id: "kotlin",
    terms: ["kotlin", "ktor", "coroutine", "coroutines"],
    label: "kotlin",
    intro: "the jvm, quieter.",
    startWith: ["java"],
    links: [
      { label: "kotlin docs", url: "https://kotlinlang.org/docs/home.html" }
    ]
  },
  {
    id: "swift",
    terms: ["swift", "swiftui", "ios", "xcode"],
    label: "swift",
    intro: "the apple stack is a stack.",
    links: [
      { label: "swift book", url: "https://docs.swift.org/swift-book/" }
    ]
  },
  {
    id: "vue",
    terms: ["vue", "vuejs", "vue.js", "composition", "pinia"],
    label: "vue",
    intro: "reactive without the ceremony.",
    startWith: ["javascript"],
    links: [
      { label: "vue guide", url: "https://vuejs.org/guide/introduction.html" }
    ]
  },
  {
    id: "svelte",
    terms: ["svelte", "sveltekit", "runes"],
    label: "svelte",
    intro: "compile-time, not runtime.",
    startWith: ["javascript"],
    links: [
      { label: "svelte docs", url: "https://svelte.dev/docs" }
    ]
  },
  {
    id: "angular",
    terms: ["angular", "rxjs", "ng", "directive", "directives"],
    label: "angular",
    intro: "typescript all the way down.",
    startWith: ["typescript"],
    links: [
      { label: "angular docs", url: "https://angular.dev/overview" }
    ]
  },
  {
    id: "express",
    terms: ["express", "expressjs", "middleware", "router"],
    label: "express",
    intro: "it is just a function.",
    startWith: ["node"],
    links: [
      { label: "express docs", url: "https://expressjs.com/en/starter/installing.html" }
    ]
  },
  {
    id: "fastapi",
    terms: ["fastapi", "pydantic", "uvicorn"],
    label: "fastapi",
    intro: "types first. endpoints after.",
    startWith: ["python"],
    links: [
      { label: "fastapi docs", url: "https://fastapi.tiangolo.com/" }
    ]
  },
  {
    id: "django",
    terms: ["django", "orm", "drf", "rest-framework"],
    label: "django",
    intro: "batteries. included.",
    startWith: ["python"],
    links: [
      { label: "django docs", url: "https://docs.djangoproject.com/en/stable/" }
    ]
  },
  {
    id: "flask",
    terms: ["flask", "werkzeug", "jinja"],
    label: "flask",
    intro: "small, on purpose.",
    startWith: ["python"],
    links: [
      { label: "flask docs", url: "https://flask.palletsprojects.com/" }
    ]
  },
  {
    id: "redis",
    terms: ["redis", "cache", "caching", "pubsub", "ioredis"],
    label: "redis",
    intro: "memory has rules.",
    links: [
      { label: "redis docs", url: "https://redis.io/docs/latest/" }
    ]
  },
  {
    id: "mongodb",
    terms: ["mongo", "mongodb", "mongoose", "nosql", "document"],
    label: "mongodb",
    intro: "schemas are still real.",
    links: [
      { label: "mongodb manual", url: "https://www.mongodb.com/docs/manual/" }
    ]
  },
  {
    id: "mysql",
    terms: ["mysql", "mariadb"],
    label: "mysql",
    intro: "sql. with footguns.",
    startWith: ["sql"],
    links: [
      { label: "mysql manual", url: "https://dev.mysql.com/doc/" }
    ]
  },
  {
    id: "sqlite",
    terms: ["sqlite", "sqlite3"],
    label: "sqlite",
    intro: "the file is the database.",
    startWith: ["sql"],
    links: [
      { label: "sqlite docs", url: "https://www.sqlite.org/docs.html" }
    ]
  },
  {
    id: "prisma",
    terms: ["prisma", "schema.prisma"],
    label: "prisma",
    intro: "the schema is the source.",
    startWith: ["sql", "node"],
    links: [
      { label: "prisma docs", url: "https://www.prisma.io/docs" }
    ]
  },
  {
    id: "kubernetes",
    terms: ["kubernetes", "k8s", "kubectl", "pod", "pods", "deployment", "helm"],
    label: "kubernetes",
    intro: "you probably do not need it yet.",
    startWith: ["docker"],
    links: [
      { label: "kubernetes docs", url: "https://kubernetes.io/docs/home/" }
    ]
  },
  {
    id: "terraform",
    terms: ["terraform", "tf", "iac", "hcl", "opentofu"],
    label: "terraform",
    intro: "describe, do not click.",
    links: [
      { label: "terraform docs", url: "https://developer.hashicorp.com/terraform/docs" }
    ]
  },
  {
    id: "aws",
    terms: ["aws", "amazon", "s3", "ec2", "lambda", "iam"],
    label: "aws",
    intro: "read the bill, then the docs.",
    links: [
      { label: "aws docs", url: "https://docs.aws.amazon.com/" }
    ]
  },
  {
    id: "graphql",
    terms: ["graphql", "apollo", "relay", "schema", "resolver", "resolvers"],
    label: "graphql",
    intro: "rest, but you name the shape.",
    links: [
      { label: "graphql learn", url: "https://graphql.org/learn/" }
    ]
  },
  {
    id: "rest",
    terms: ["rest", "restful", "api", "apis", "http", "endpoint", "endpoints"],
    label: "rest and http",
    intro: "http is not a library. it is the spec.",
    links: [
      { label: "mdn http", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP" }
    ]
  },
  {
    id: "vite",
    terms: ["vite", "rollup", "bundler"],
    label: "vite",
    intro: "bundle later. ship now.",
    startWith: ["node"],
    links: [
      { label: "vite guide", url: "https://vitejs.dev/guide/" }
    ]
  },
  {
    id: "webpack",
    terms: ["webpack", "loader", "loaders", "chunk", "chunks"],
    label: "webpack",
    intro: "old, but honest.",
    startWith: ["node"],
    links: [
      { label: "webpack concepts", url: "https://webpack.js.org/concepts/" }
    ]
  },
  {
    id: "testing",
    terms: ["test", "tests", "testing", "unit", "integration", "jest", "vitest", "pytest", "playwright"],
    label: "testing",
    intro: "write one before the bug.",
    links: [
      { label: "testing library", url: "https://testing-library.com/docs/" }
    ]
  },
  {
    id: "regex",
    terms: ["regex", "regexp", "regular", "expression", "expressions"],
    label: "regex",
    intro: "slower to debug than to write.",
    links: [
      { label: "regex101", url: "https://regex101.com/" }
    ]
  },
  {
    id: "bash",
    terms: ["bash", "shell", "zsh", "sh", "script", "scripting"],
    label: "bash",
    intro: "your shell has a manual.",
    links: [
      { label: "bash reference", url: "https://www.gnu.org/software/bash/manual/bash.html" }
    ]
  },
  {
    id: "linux",
    terms: ["linux", "unix", "man", "cli", "terminal"],
    label: "linux",
    intro: "the man page knew it already.",
    links: [
      { label: "tldr pages", url: "https://tldr.sh/" }
    ]
  },
  {
    id: "vim",
    terms: ["vim", "neovim", "nvim"],
    label: "vim",
    intro: "modal. on purpose.",
    links: [
      { label: "vim cheatsheet", url: "https://vim.rtorr.com/" }
    ]
  },
  {
    id: "nginx",
    terms: ["nginx", "reverse-proxy", "proxy"],
    label: "nginx",
    intro: "config is the program.",
    links: [
      { label: "nginx docs", url: "https://nginx.org/en/docs/" }
    ]
  },
  {
    id: "ssh",
    terms: ["ssh", "openssh", "scp", "sshd"],
    label: "ssh",
    intro: "the key is not a password.",
    links: [
      { label: "openssh manual", url: "https://man.openbsd.org/ssh" }
    ]
  },
  {
    id: "anthropic",
    terms: ["anthropic", "claude", "claude-code", "claude.ai"],
    label: "anthropic api",
    intro: "read your own docs.",
    links: [
      { label: "anthropic docs", url: "https://docs.anthropic.com/" }
    ]
  },
  {
    id: "openai",
    terms: ["openai", "gpt", "chatgpt"],
    label: "openai api",
    intro: "the endpoint is the spec.",
    links: [
      { label: "openai platform", url: "https://platform.openai.com/docs" }
    ]
  },
  {
    id: "ai-agents",
    terms: ["ai", "agent", "agents", "llm", "llms", "copilot", "cursor"],
    label: "ai coding agents",
    intro: "the agent does not replace understanding.",
    links: [
      { label: "mdn web docs", url: "https://developer.mozilla.org/" }
    ]
  }
];

export const defaultReply = {
  intro: "no shortcut found.",
  followUp: "name the tool, framework, or concept. then start with the source.",
  links: [
    {
      label: "mdn web docs",
      url: "https://developer.mozilla.org/"
    },
    {
      label: "devdocs",
      url: "https://devdocs.io/"
    }
  ]
};
