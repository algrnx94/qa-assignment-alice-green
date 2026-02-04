## Quick Start (Local)

- Install dependencies:
1. npm install
2. npm start

- Run the Playwright tests:

   npx playwright test

- Show HTML report:

   npx playwright show-report

## How tests run in CI/CD

- Trigger: run on every PR and on pushes to `main` branches.
- .yml file already includes both dependencies and PW, verifying local is loaded
- Typical job steps (GitHub Actions / other CI):
  1. Checkout code
  2. `npm ci`
  3. `npx playwright install --with-deps`
  4. Run tests: `npx playwright test --reporter=html`
  5. Upload artifacts: `playwright-report/`, screenshots, videos, traces

## Handling Flaky Tests

- Capture diagnostics on failure: screenshots, videos, traces, and network logs for every retry/failure.
- Tag flaky tests with `@flaky` and quarantine them until root-cause is fixed.
- Track flakiness metrics (flake rate per test) and require triage when thresholds are exceeded.
- Prioritize fixes for flakes affecting gating/smoke tests.

## Parallel Execution

- Use Playwright workers (`workers` config or `--workers`) and CI sharding/matrix for scale.
- Ensure tests are independent and do not share resources (distinct test users/namespaces per worker).
- Keep per-test setup/teardown fast and avoid long-running global setup to enable efficient parallelism.

## Release Blocking

**Block release when:**
- Any **smoke/critical** tests fail reproducibly after configured retries (authentication, core flows).
- Backend/API issues that compromise data integrity, security, or core functionality.

**Do NOT block release when:**
- A single intermittent/flaky test fails but passes after retry; quarantine and triage instead.
- Non-critical cosmetic UI issues that do not affect core functionality (track as non-blocking bugs).
