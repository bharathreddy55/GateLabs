# Firestore permissions

`firestore.rules` permits owners to read/write their own attempt documents and user study-time document. Attempt queries must constrain `userId` to the signed-in UID. Student question publication is denied; only a trusted server-assigned `publisher` custom claim can write the optional Firestore question collection. Public study banks are static versioned files. Unmatched collections are denied.

Run `npm run test:rules` with Java 21+ installed. This uses project `demo-gatelabs` and never touches production. Tests cover anonymous/cross-user reads, ownership transfer, writes/deletes, constrained queries and publisher permissions.

Rules are repository configuration until deployed. After checking the selected Firebase project, an authorized operator must deploy them and run real signup, sign-in, password reset and two-user sync checks in a test project before release. Do not claim that repository tests establish the current production rule state.
