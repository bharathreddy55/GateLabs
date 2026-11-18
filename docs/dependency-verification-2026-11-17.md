# Dependency verification — 17 November 2026

Both the complete npm dependency tree and production-only audit report **0 vulnerabilities** after updating Firebase/Vite, applying the compatible patched `@grpc/grpc-js` override and removing the deployment CLI from test dependencies.

The Firestore tests now launch the official emulator v1.22.0 directly, using its pinned SHA-256 checksum from Firebase CLI v15.36.0's published emulator metadata. Cached binaries are verified before use; a first run downloads only from Google's official Firebase emulator bucket. The launcher binds to localhost port 18080 and project `demo-gatelabs`, rejects an occupied port and stops the process after tests. Java 21+ is required. This removes the unused CLI dependency tree instead of forcing incompatible transitive upgrades.

The declared runtime is Node.js >=24.12, matching Firebase's engine requirement; CI requests the latest Node 24. The local environment currently runs 24.11.1 and emits an engine warning even though the exercised checks pass. Use the declared version for development and deployment.

Verified commands: `npm audit`, `npm audit --omit=dev`, `npm test`, `npm run build`, `npm run test:browser:all`, `npm run test:rules`. An advisory audit is a point-in-time check, not a guarantee that every dependency or emulator binary is free of defects.

References: [Vite migration guide](https://vite.dev/guide/migration), [Firebase release notes](https://firebase.google.com/support/release-notes/js), [pinned emulator metadata](https://github.com/firebase/firebase-tools/blob/v15.36.0/src/emulator/downloadableEmulatorInfo.json).
