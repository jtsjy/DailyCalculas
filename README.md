# 每日一极，每日一积

Buildless static site. Self-hosted KaTeX. Serve `dist/` over HTTP.

The home page displays one limit and one integral for the current Asia/Shanghai calendar date. Eight mathematical structures per category rotate daily with changing integer parameters. Problems are generated deterministically; the finite parameter cycle eventually repeats, and no external AI or scheduling service is needed. Midnight, visibility, and page restore refresh the home page. Answer URLs retain their problem date.

Run `node verify.cjs` to check all parameterized formulas and dates. Vendored KaTeX assets are copied from the pinned npm package; include its license.
