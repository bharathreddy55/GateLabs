# Dependency verification — 17 November 2026

Production dependency audit: **0 advisories** after upgrading Firebase/Vite and applying the compatible patched `@grpc/grpc-js` override. The build and emulator permission tests pass with the updated SDK. The declared runtime is Node.js >=24.12, matching Firebase's engine requirement; CI requests the latest Node 24. The local environment currently runs 24.11.1 and emits an engine warning even though the exercised checks pass.

The full development dependency tree still reports 14 moderate advisories through Firebase CLI tooling (glob/minimatch/uuid/OpenTelemetry and dependent packages). No high or critical advisories remain. These are unresolved; do not call the full dependency tree clean. npm proposes older major Firebase CLI versions for some transitive fixes. Those downgrades were not applied without a compatibility review. Recheck upstream patches before release and limit CLI use to trusted repository inputs.

Commands: `npm audit --omit=dev`, `npm audit`, `npm test`, `npm run build`, `npm run test:browser:all`, `npm run test:rules`.

Migration references: [Vite migration guide](https://vite.dev/guide/migration), [Firebase release notes](https://firebase.google.com/support/release-notes/js).
