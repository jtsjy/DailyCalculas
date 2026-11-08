# 每日一极，每日一积

Buildless static site. Self-hosted KaTeX. Serve `dist/` over HTTP.

The home page displays one limit and one integral for the current Asia/Shanghai calendar date. Eight mathematical structures per category rotate daily with changing integer parameters. Problems are generated deterministically; the finite parameter cycle eventually repeats, and no external AI or scheduling service is needed. Midnight, visibility, and page restore refresh the home page. Answer URLs retain their problem date.

Run `node verify.cjs` to check all parameterized formulas and dates. Vendored KaTeX assets are copied from the pinned npm package; include its license.

## GitLab CI

The repository includes `.gitlab-ci.yml`, which replaces the default Auto DevOps pipeline. Each pipeline uses Node.js 22, installs the locked dependencies with `npm ci`, and runs `npm test`. Checks cover application syntax, LaTeX rendering, Chinese explanation coverage, and daily question changes. Successful jobs attach `dist/` as a downloadable artifact for one week.

To run the same checks locally:

```sh
npm ci --no-audit --no-fund
npm test
```

This pipeline validates the static website and does not publish to GitLab Pages or change the existing Sites deployment. It requires a GitLab runner able to pull `node:22-alpine` and install packages from the npm registry.
