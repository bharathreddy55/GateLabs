# Performance and interaction improvements — 18 November 2026

Common navigation now shares one cloud history read for 30 seconds, while device results are merged on each request. Concurrent callers share the pending request. Save, delete, backup restore, account changes, reconnection, returning to the tab and another tab's result-storage changes invalidate it. Offline failures can retry; an invalidated request cannot repopulate the cache. Known offline sessions skip cloud reads/writes immediately and retain pending device saves.

Exam workspaces load paper content and history in parallel. Overlapping renders share the paper download, and ready-status validation/section coverage are reused for unchanged loaded papers. Imported paper validation at the ingestion boundary still runs normally.

Formula search filters existing cards instead of rebuilding the page. Input focus, cursor position, rendered math and open explanations survive searches. Empty results have a clear message. Navigation shows its loading state before downloading a route module, and stale route errors cannot overwrite a newer page.

Startup loads only the solid/regular icon styles used by the app. Analytics starts during idle time and cannot make authentication fall back to mock mode when unsupported. The unused legacy mock-question seed and bulk JSON loader were removed; published study content still comes from the validated subject shards.

## Measurements

Uncompressed production asset sizes from the previous local build and the optimized build:

| Asset | Before | After |
| --- | ---: | ---: |
| Initial stylesheet | 200,698 bytes | 183,906 bytes |
| Firebase SDK chunk | 589,356 bytes | 579,971 bytes |
| Application entry | 53,472 bytes | 53,877 bytes |

The small entry increase adds history coordination and immediate navigation feedback. The stylesheet shrinks about 8.4%. These are build measurements, not a production Lighthouse score or a claim about every device's loading time.

A controlled fixture making three sequential reads with an artificial 100 ms cloud delay reduced cloud requests from three to one (about 323 ms to 105 ms locally). This demonstrates avoided repeated waits; it does not measure live Firebase latency. Raw measurements are in [the performance artifact](../artifacts/performance/optimization-2026-11-18.json).

## Verification

29 unit tests cover cache coalescing, expiration, account separation, mutation invalidation, offline retries, late results, storage, parsing and scoring. Five browser suites cover exam workflows, navigation, auth restoration, math/PDF/archive operations and all 15 routes. Added browser assertions verify that search retains the same cards/input/open explanation and that a delayed route module shows its loading state immediately. The production build passes.

Auth, cloud and provider boundaries in browser tests use fixtures. Live Firebase latency, Lighthouse and device-specific responsiveness have not been measured.
