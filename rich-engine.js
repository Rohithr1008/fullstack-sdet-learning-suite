const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\rohit\\Documents\\learning-projects';

// Generator helper for Javascript-Essentials style rich study apps
function generateRichStudyApp(config) {
  const { title, partName, partNum, folder, prevFile, nextFile, sections, flashcards } = config;

  const sectionsHtml = sections.map((sec, idx) => {
    const sNum = idx + 1;
    return `
<h2 id="s${sNum}">${sNum}. ${sec.title} <span class="est-time">⏱ ~${sec.time || 15} min</span></h2>
<div class="why">🚩 <strong>Why it matters:</strong> ${sec.why}</div>
<p>${sec.explanation}</p>

${sec.diagram ? `<div class="why" style="background:#edf2f7;border-left-color:#4a5568;color:#2d3748;"><strong>📊 Visual Concept:</strong><br>${sec.diagram}</div>` : ''}

${sec.code ? `
<div class="code-header"><span>Complete Example</span><button class="copy-btn" onclick="copyCode(this)">Copy</button></div>
<pre><code>${sec.code}</code></pre>
` : ''}

${sec.annotations ? sec.annotations.map(ann => `<div class="line-annotation"><code>${ann.code}</code> — ${ann.text}</div>`).join('') : ''}

${sec.sandbox ? sec.sandbox : ''}

<div class="spotbug">
  <details>
    <summary>🐞 Spot the Bug / Edge Case in this topic</summary>
    <p><strong>Common Pitfall:</strong> ${sec.bug.pitfall}</p>
    <p class="quiz-correct"><strong>Fix:</strong> ${sec.bug.fix}</p>
  </details>
</div>

<div class="predict">
  <details>
    <summary>🔮 Predict the Output / Behavior</summary>
    <p><strong>Scenario:</strong> ${sec.predict.q}</p>
    <p class="quiz-correct"><strong>Answer:</strong> ${sec.predict.a}</p>
  </details>
</div>

<div class="quiz-box">
  <h3>🧪 Knowledge Check</h3>
  <details>
    <summary>Question: ${sec.quiz.q}</summary>
    <p class="quiz-correct">✅ <strong>Answer:</strong> ${sec.quiz.a}</p>
    <p><em>Rationale:</em> ${sec.quiz.rationale}</p>
  </details>
</div>

<div class="mark"><button type="button" class="mark-btn" data-sec="${sNum}" onclick="toggleSection(${sNum})">Mark Section ${sNum} Complete</button></div>
`;
  }).join('\n<hr style="border:none;border-top:1px solid var(--border);margin:30px 0;">\n');

  const flashcardsJson = JSON.stringify(flashcards);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — ${partName}</title>
  <style>
    :root {
      --bg: #0f172a;
      --card: #1e293b;
      --border: #334155;
      --text: #f8fafc;
      --accent: #38bdf8;
      --accent-hover: #0284c7;
      --success: #4ade80;
      --warning: #facc15;
      --code-bg: #090d16;
      --muted: #94a3b8;
    }
    body { font-family: 'Segoe UI', system-ui, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 20px; line-height: 1.7; }
    .container { max-width: 960px; margin: 0 auto; }
    h1 { color: var(--accent); border-bottom: 2px solid var(--border); padding-bottom: 12px; font-size: 2.2rem; }
    h2 { color: #7dd3fc; margin-top: 36px; font-size: 1.5rem; }
    .est-time { font-size: 0.85rem; background: var(--border); color: #94a3b8; padding: 4px 12px; border-radius: 12px; font-weight: normal; margin-left: 8px; }
    .why { background: rgba(56, 189, 248, 0.1); border-left: 4px solid var(--accent); padding: 14px 18px; border-radius: 6px; margin: 16px 0; font-weight: 500; }
    pre { background: var(--code-bg); border: 1px solid var(--border); border-radius: 8px; padding: 16px; font-family: monospace; color: #7dd3fc; overflow-x: auto; font-size: 0.95rem; }
    .code-header { display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 6px 14px; border-radius: 8px 8px 0 0; font-size: 0.85rem; color: #94a3b8; border: 1px solid var(--border); border-bottom: none; }
    .copy-btn { background: #334155; color: #fff; border: none; padding: 4px 10px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
    .line-annotation { background: #131c2e; border-left: 3px solid #38bdf8; padding: 8px 12px; margin: 6px 0; font-size: 0.9rem; color: #cbd5e1; }
    .line-annotation code { color: #facc15; }
    .quiz-box { background: #162032; border: 2px solid #0284c7; border-radius: 10px; padding: 16px; margin: 20px 0; }
    .quiz-box details { background: #0f172a; border: 1px solid var(--border); border-radius: 6px; padding: 10px 14px; margin-top: 8px; }
    .quiz-box summary { cursor: pointer; font-weight: bold; color: #38bdf8; }
    .quiz-correct { color: #4ade80; }
    .spotbug details, .predict details { background: #1e293b; border: 1px solid var(--border); border-radius: 8px; padding: 12px; margin: 12px 0; }
    .spotbug summary, .predict summary { cursor: pointer; font-weight: bold; color: #facc15; }
    .mark-btn { background: #16a34a; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; margin-top: 10px; }
    .mark-btn.done { background: #475569; }
    
    /* Panel / Flashcards / Boost */
    .panel { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 18px; margin: 20px 0; }
    .partnav { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; background: #1e293b; color: #e2e8f0; padding: 12px 18px; border-radius: 8px; margin-bottom: 24px; font-size: 0.95rem; }
    .partnav a { color: #38bdf8; text-decoration: none; font-weight: 600; }
    .toolbar { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; background: #1e293b; padding: 10px 16px; border-radius: 8px; }
    .toolbar button { padding: 6px 14px; border-radius: 6px; border: 1px solid var(--border); background: #0f172a; color: #fff; cursor: pointer; font-weight: 600; }
    #progressBar { font-weight: bold; color: #38bdf8; margin: 14px 0; }
    
    /* Focus & Dark Mode */
    body.focus-mode .partnav, body.focus-mode .toolbar, body.focus-mode #boostBar, body.focus-mode #srPanel { display: none !important; }
    .focus-banner { display: none; background: #0284c7; color: #fff; text-align: center; padding: 8px; font-weight: bold; border-radius: 6px; margin-bottom: 16px; }
    body.focus-mode .focus-banner { display: block !important; }
    
    /* Certificate */
    .certificate { display: none; background: linear-gradient(135deg, #1e293b, #0f172a); border: 3px solid #facc15; border-radius: 14px; padding: 28px; text-align: center; margin: 30px 0; }
    .certificate.unlocked { display: block; }
  </style>
</head>
<body id="mainContent">

  <div class="partnav">
    <a href="../index.html">🏠 Master Index</a> |
    ${prevFile ? `<a href="${prevFile}">◀ Prev Part</a> |` : ''}
    <strong>${partName}</strong>
    ${nextFile ? `| <a href="${nextFile}">Next Part ▶</a>` : ''}
  </div>

  <div class="focus-banner">🧘 Focus Mode Active — All Distractions Hidden</div>

  <div class="toolbar">
    <span>📐 Size:</span>
    <button onclick="document.body.className=''">Default</button>
    <button onclick="document.body.classList.add('font-sm')">A-</button>
    <button onclick="document.body.classList.add('font-lg')">A+</button>
    <button onclick="document.body.classList.toggle('focus-mode')">🧘 Toggle Focus Mode</button>
  </div>

  <div class="container">
    <h1>${title} — ${partName}</h1>
    <p>Comprehensive interactive guide with real-world examples, line-by-line breakdowns, and quizzes.</p>
    
    <div id="progressBar">📊 Progress: 0/${sections.length} sections completed (0%)</div>
    
    <div id="boostBar" class="panel" style="display:flex;gap:16px;align-items:center;justify-content:space-between;flex-wrap:wrap;">
      <span>⚡ <strong>Streak: <span id="streakCount">1 Day</span></strong></span>
      <span>⭐ <strong>XP: <span id="xpCount">0 XP</span></strong></span>
      <button onclick="surpriseMe()" style="background:#0284c7;color:#fff;border:none;padding:6px 14px;border-radius:6px;cursor:pointer;font-weight:bold;">🎲 Surprise Question</button>
    </div>

    <!-- FLASHCARD DRILL -->
    <div id="srPanel" class="panel">
      <h3 style="margin-top:0;color:#38bdf8;">🃏 Spaced Repetition Flashcard Drill</h3>
      <p id="cardQ">Click 'Start Review' to begin flashcard testing.</p>
      <p id="cardA" style="display:none;color:#4ade80;font-weight:bold;margin-top:10px;"></p>
      <div style="margin-top:12px;">
        <button id="cardBtn" onclick="nextCard()" style="background:#38bdf8;color:#0f172a;border:none;padding:8px 16px;border-radius:6px;font-weight:bold;cursor:pointer;">Start Review</button>
      </div>
    </div>

    <!-- SECTIONS -->
    ${sectionsHtml}

    <!-- CERTIFICATE -->
    <div id="certificate" class="certificate">
      <h2>🏆 Certificate of Completion</h2>
      <p>Congratulations! You have completed 100% of <strong>${title} — ${partName}</strong>!</p>
      <p style="font-size:1.2rem;color:#facc15;font-weight:bold;">Verified Mastery: ${sections.length}/${sections.length} Sections Passed</p>
    </div>
  </div>

  <script>
    const flashcards = ${flashcardsJson};
    let cardIdx = -1;
    let completedSet = new Set();
    let xp = 0;

    function copyCode(btn) {
      const code = btn.closest('.code-header').nextElementSibling.innerText;
      navigator.clipboard.writeText(code);
      btn.innerText = 'Copied!';
      setTimeout(() => btn.innerText = 'Copy', 2000);
    }

    function toggleSection(sNum) {
      const btn = document.querySelector(\`[data-sec="\${sNum}"]\`);
      if (completedSet.has(sNum)) {
        completedSet.delete(sNum);
        btn.innerText = \`Mark Section \${sNum} Complete\`;
        btn.classList.remove('done');
      } else {
        completedSet.add(sNum);
        btn.innerText = \`✅ Section \${sNum} Completed!\`;
        btn.classList.add('done');
        xp += 50;
        document.getElementById('xpCount').innerText = xp + ' XP';
      }
      updateProgress();
    }

    function updateProgress() {
      const total = ${sections.length};
      const count = completedSet.size;
      const pct = Math.round((count / total) * 100);
      document.getElementById('progressBar').innerText = \`📊 Progress: \${count}/\${total} sections completed (\${pct}%)\`;
      if (count === total) {
        document.getElementById('certificate').classList.add('unlocked');
      }
    }

    function nextCard() {
      const q = document.getElementById('cardQ');
      const a = document.getElementById('cardA');
      const btn = document.getElementById('cardBtn');

      if (a.style.display === 'none' && cardIdx >= 0) {
        a.style.display = 'block';
        btn.innerText = 'Next Flashcard ▶';
      } else {
        cardIdx = (cardIdx + 1) % flashcards.length;
        q.innerText = 'Q: ' + flashcards[cardIdx].q;
        a.innerText = 'A: ' + flashcards[cardIdx].a;
        a.style.display = 'none';
        btn.innerText = 'Show Answer 👁';
      }
    }

    function surpriseMe() {
      const sec = Math.floor(Math.random() * ${sections.length}) + 1;
      document.getElementById('s' + sec).scrollIntoView({ behavior: 'smooth' });
    }
  </script>
</body>
</html>`;
}

module.exports = { generateRichStudyApp };
console.log('Rich Study App Engine module created successfully!');
