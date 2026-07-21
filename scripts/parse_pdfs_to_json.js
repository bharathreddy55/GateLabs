const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const https = require('https');

// Helper to parse arguments
function getArg(name) {
  const index = process.argv.indexOf(name);
  if (index !== -1 && index + 1 < process.argv.length) {
    return process.argv[index + 1];
  }
  return null;
}

const apiKey = getArg('--api-key') || process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('\x1b[31mError: Gemini API Key is required.\x1b[0m');
  console.log('Please supply it using the --api-key argument or set the GEMINI_API_KEY environment variable.');
  console.log('Example: node scripts/parse_pdfs_to_json.js --api-key AIzaSy...');
  process.exit(1);
}

const pyqsDir = path.join(__dirname, '../public/pyqs');
const outputFile = path.join(pyqsDir, 'questions.json');

// Ensure target directories exist
if (!fs.existsSync(pyqsDir)) {
  console.error(`Error: Directory not found: ${pyqsDir}`);
  process.exit(1);
}

// Fetch all PDF files except dummy
const pdfFiles = fs.readdirSync(pyqsDir)
  .filter(file => file.endsWith('.pdf') && file !== 'dummy.pdf');

if (pdfFiles.length === 0) {
  console.log('No PDF files found in public/pyqs/ directory.');
  process.exit(0);
}

console.log(`Found ${pdfFiles.length} PDF files in catalog: ${pdfFiles.join(', ')}`);

// Call Gemini API to parse text chunk
function callGemini(text) {
  return new Promise((resolve, reject) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const payload = JSON.stringify({
      contents: [{
        role: 'user',
        parts: [
          {
            text: `You are a professional GATE computer science instructor.
You are given text extracted from a study guide or past exam.
Perform the following:
1. Identify any multiple-choice questions (MCQs) in the text and extract them exactly.
2. For each question, construct a valid JSON object matching this schema exactly:
{
  "subject": "Name of GATE CS Subject. It MUST be EXACTLY one of: 'Engineering Mathematics', 'Digital Logic', 'Computer Organization & Architecture (COA)', 'Programming & Data Structures', 'Algorithms', 'Theory of Computation (TOC)', 'Compiler Design', 'Operating Systems', 'Databases (DBMS)', 'Computer Networks (CN)', 'General Aptitude'",
  "topic": "General Syllabus Topic name (e.g. 'Deadlocks', 'Regular Expressions')",
  "difficulty": "Easy", "Medium", or "Hard",
  "marks": 1 or 2,
  "year": null or number,
  "question": "The question text, formatted clearly. Use simple notation.",
  "options": [
    "Option A text",
    "Option B text",
    "Option C text",
    "Option D text"
  ],
  "correctAnswer": 0, 1, 2, or 3 (0-indexed index of correct option),
  "explanation": "Extensive step-by-step logical solution explaining why this option is correct."
}
Return ONLY a valid JSON array of these objects. Do not wrap it in markdown code blocks or add any other text.`
          },
          { text: "SOURCE TEXT CONTEXT:\n" + text }
        ]
      }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const req = https.request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const data = JSON.parse(body);
            const textResult = data.candidates?.[0]?.content?.parts?.[0]?.text;
            resolve(JSON.parse(textResult.trim()));
          } catch (e) {
            reject(new Error(`Failed to parse response body as JSON: ${e.message}`));
          }
        } else {
          reject(new Error(`HTTP status code ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// Main logic
async function run() {
  let existingQuestions = [];
  if (fs.existsSync(outputFile)) {
    try {
      existingQuestions = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    } catch (e) {
      console.warn('Warning: Could not parse existing questions.json, starting fresh.');
    }
  }

  const existingTitles = new Set(existingQuestions.map(q => q.question.trim()));
  let addedCount = 0;

  for (const file of pdfFiles) {
    console.log(`\nProcessing file: ${file}...`);
    const filePath = path.join(pyqsDir, file);
    const dataBuffer = fs.readFileSync(filePath);
    
    try {
      const data = await pdfParse(dataBuffer);
      console.log(`Extracted ${data.text.length} characters of raw text from ${file}.`);
      
      // Split text into chunks of roughly 12000 characters to fit context limits comfortably
      const chunkSize = 12000;
      const chunks = [];
      for (let i = 0; i < data.text.length; i += chunkSize) {
        chunks.push(data.text.substring(i, i + chunkSize));
      }

      console.log(`Split text into ${chunks.length} chunks for AI extraction.`);
      
      for (let i = 0; i < chunks.length; i++) {
        console.log(`Sending chunk ${i + 1}/${chunks.length} to Gemini...`);
        try {
          const questions = await callGemini(chunks[i]);
          if (Array.isArray(questions)) {
            let chunkAdded = 0;
            questions.forEach(q => {
              if (q.question && !existingTitles.has(q.question.trim())) {
                q.id = 'gate_ext_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4);
                existingQuestions.push(q);
                existingTitles.add(q.question.trim());
                chunkAdded++;
                addedCount++;
              }
            });
            console.log(`Extracted and added ${chunkAdded} unique questions from chunk ${i + 1}.`);
          }
        } catch (err) {
          console.error(`Error parsing chunk ${i + 1}:`, err.message);
        }
      }
    } catch (err) {
      console.error(`Error parsing PDF ${file}:`, err.message);
    }
  }

  if (addedCount > 0) {
    fs.writeFileSync(outputFile, JSON.stringify(existingQuestions, null, 2), 'utf8');
    console.log(`\n\x1b[32mSuccess: Extracted and saved ${addedCount} new questions to ${outputFile}\x1b[0m`);
  } else {
    console.log('\nNo new questions extracted.');
  }
}

run();
