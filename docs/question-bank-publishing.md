# Publishing study questions

Student reads fetch the versioned `/questions/index.json` and only matching subject shards. Repeat queries reuse cached content. Reads never seed or scan Firestore. Uploaded questions stay in the signed-in account's local custom bank and backup; they cannot publish into the shared bank.

Run `node scripts/build-question-bank.mjs` after reviewing and committing source content. The generator deliberately reads committed Git content, validates typed keys, quarantines incomplete records and creates stable IDs. Review the generated diff and commit `public/questions` with the publishing change. Content keys still require subject expert review; structural validation is not certification.
