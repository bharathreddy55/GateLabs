# Proposed Solutions to Project Flaws (Excluding API Key Exposure)

This file details the step-by-step solutions to address the flagged issues in the GATE Prep Platform codebase.

---

## 1. Solve Flaw 1: Update API Model Name (`gemini-2.5-flash` to `gemini-1.5-flash`)
We will change the endpoint references in all pages and Node scripts to query the verified `gemini-1.5-flash` model.

### Files to Modify:
1. **[Practice.js](file:///c:/Users/bhara/OneDrive/Desktop/DESKTOP/SUBJECTS/Free_mocks/src/pages/Practice.js#L757)**:
   ```diff
   -const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
   +const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
   ```
2. **[Assistant.js](file:///c:/Users/bhara/OneDrive/Desktop/DESKTOP/SUBJECTS/Free_mocks/src/pages/Assistant.js#L213)**:
   ```diff
   -const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
   +const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
   ```
3. **[parse_pdfs_to_json.js](file:///c:/Users/bhara/OneDrive/Desktop/DESKTOP/SUBJECTS/Free_mocks/scripts/parse_pdfs_to_json.js#L47)**:
   ```diff
   -const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
   +const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
   ```

---

## 2. Solve Flaw 2: Fix Intrusive Dark Mode Overrides
We will remove root-level theme modification calls during mock tests. This prevents stripping the `.dark` class from the `html` element.

### Files to Modify:
1. **[MockTest.js](file:///c:/Users/bhara/OneDrive/Desktop/DESKTOP/SUBJECTS/Free_mocks/src/pages/MockTest.js)**:
   - Remove `document.documentElement.classList.remove('dark')` from the test initialization.
   - Remove the theme restoration block on exam completion.
2. **[main.js](file:///c:/Users/bhara/OneDrive/Desktop/DESKTOP/SUBJECTS/Free_mocks/src/main.js)**:
   - Remove theme restoration block from navigation guard check.

---

## 3. Solve Flaw 3: Upgrade Fallback Regex Parser
We will replace the mock parser in `Practice.js` with a logic-driven sentence extractor that parses actual text segments ending in `?` and dynamically injects them into the fallback questions.

### Files to Modify:
1. **[Practice.js](file:///c:/Users/bhara/OneDrive/Desktop/DESKTOP/SUBJECTS/Free_mocks/src/pages/Practice.js#L831-L890)**:
   - Add helper logic to scan for questions (`/([^.!?]+ \?)/g`) and dynamically populate the question title and subject/topic keys.

---

## 4. Solve Flaw 5: Lazy Load Text Ingestion Globbing
We will switch Vite's glob import to lazy mode (`eager: false`) to avoid loading all txt file assets at the platform's initial page load.

### Files to Modify:
1. **[firebase.js](file:///c:/Users/bhara/OneDrive/Desktop/DESKTOP/SUBJECTS/Free_mocks/src/config/firebase.js#L586)**:
   ```diff
   -const txtModules = import.meta.glob('../../public/pyqs/*.txt', { query: '?url', import: 'default', eager: true });
   +const txtModules = import.meta.glob('../../public/pyqs/*.txt', { query: '?url', import: 'default', eager: false });
   ```
   - Change parsing inside `loadTextQuestions()` to resolve the promise.

---

## 5. Solve Flaw 6: Calculator Draggable Boundary Checks
We will add boundary constraints inside the calculator drag event listener to prevent it from going off the viewport screen boundaries.

### Files to Modify:
1. **[MockTest.js](file:///c:/Users/bhara/OneDrive/Desktop/DESKTOP/SUBJECTS/Free_mocks/src/pages/MockTest.js#L767-L785)**:
   - Restrict `newLeft` and `newTop` based on window sizing parameters.
