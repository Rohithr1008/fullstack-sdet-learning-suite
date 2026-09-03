# Phase 2 Components Library

This file contains ready-to-use HTML/CSS/JavaScript components for Phase 2 features.
Copy and paste these into the interactive markdown as needed.

---

## 1. JavaScript Sandbox / Code Runner 🔧

```html
<!-- ============ PHASE 2: JavaScript Sandbox ============ -->

## 🔧 JavaScript Interactive Sandbox

**Try it:** Edit the code below and click "Run Code" to see the output instantly!

<div class="sandbox-container" style="background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px; margin: 16px 0;">
  <div style="margin-bottom: 10px;">
    <strong>📝 Enter JavaScript code:</strong>
    <textarea 
      id="sandboxCode" 
      placeholder="const arr = [1,2,3]; console.log(arr.push(4));"
      style="width: 100%; height: 120px; padding: 10px; font-family: 'Courier New', monospace; font-size: 13px; border: 1px solid #cbd5e0; border-radius: 6px; display: block; margin-top: 8px; background: #fff;"
    ></textarea>
  </div>
  
  <div style="display: flex; gap: 8px; margin: 10px 0;">
    <button onclick="runSandboxCode()" style="padding: 8px 16px; background: #2b6cb0; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1;">▶️ Run Code</button>
    <button onclick="clearSandboxCode()" style="padding: 8px 16px; background: #718096; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">Clear</button>
  </div>
  
  <div style="margin-top: 10px;">
    <strong>📤 Output:</strong>
    <pre id="sandboxOutput" style="background: #0f1622; color: #e2e8f0; padding: 12px; border-radius: 6px; border: 1px solid #2d3748; min-height: 60px; max-height: 300px; overflow-y: auto; font-family: 'Courier New', monospace; font-size: 13px; margin-top: 8px;">// Output will appear here</pre>
  </div>
</div>

<script>
let originalLog = console.log;
let outputBuffer = [];

function runSandboxCode() {
  const code = document.getElementById('sandboxCode').value;
  const output = document.getElementById('sandboxOutput');
  
  outputBuffer = [];
  
  // Intercept console.log
  console.log = function(...args) {
    const formatted = args.map(arg => {
      if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
      return String(arg);
    }).join(' ');
    outputBuffer.push(formatted);
  };
  
  try {
    eval(code);
    output.innerHTML = outputBuffer.length > 0 
      ? outputBuffer.join('\n') 
      : '(no output)';
    output.style.color = '#68d391';
  } catch(error) {
    output.innerHTML = `❌ Error: ${error.message}\n${error.stack}`;
    output.style.color = '#fc8181';
  }
  
  console.log = originalLog;
}

function clearSandboxCode() {
  document.getElementById('sandboxCode').value = '';
  document.getElementById('sandboxOutput').innerHTML = '// Output will appear here';
  document.getElementById('sandboxOutput').style.color = '#e2e8f0';
}

// Allow Ctrl+Enter to run code
document.getElementById('sandboxCode')?.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'Enter') runSandboxCode();
});
</script>
```

---

## 2. Hoisting Visualizer 📊

```html
<!-- ============ PHASE 2: Hoisting Visualizer ============ -->

## 📊 Interactive Hoisting Visualizer

**Understand hoisting:** JavaScript processes your code in two phases. See how variables and functions are handled!

<div class="hoisting-visualizer" style="background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px; margin: 16px 0;">
  
  <div style="display: flex; gap: 8px; margin-bottom: 14px;">
    <button onclick="showHoistingPhase(1)" id="btn-phase1" style="padding: 8px 14px; background: #2b6cb0; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1;">Phase 1: Creation</button>
    <button onclick="showHoistingPhase(2)" id="btn-phase2" style="padding: 8px 14px; background: #718096; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600; flex: 1;">Phase 2: Execution</button>
  </div>

  <div id="hoistingCode" style="background: #0f1622; color: #e2e8f0; padding: 12px; border-radius: 6px; font-family: 'Courier New', monospace; font-size: 13px; margin-bottom: 14px;">
    <div id="hoistingPhase1" style="display: block;">
      <strong>📋 Phase 1: Creation (Variables & Functions Hoisted)</strong><br>
      <code>
        var x = undefined  <span style="color: #fc8181;">← hoisted but not assigned</span><br>
        let y = ✋ TDZ     <span style="color: #fc8181;">← temporal dead zone</span><br>
        function sum() {}  <span style="color: #68d391;">← fully hoisted!</span>
      </code>
    </div>
    
    <div id="hoistingPhase2" style="display: none;">
      <strong>▶️ Phase 2: Execution (Code Runs Top to Bottom)</strong><br>
      <code>
        var x = 5          <span style="color: #68d391;">← assignment happens</span><br>
        let y = 10         <span style="color: #68d391;">← assignment happens</span><br>
        sum()              <span style="color: #68d391;">← can call here!</span>
      </code>
    </div>
  </div>

  <div id="hoistingExpl" style="background: #ebf8ff; border-left: 4px solid #2b6cb0; padding: 10px; border-radius: 4px; font-size: 14px;">
    <p id="hoistingText"></p>
  </div>
</div>

<script>
function showHoistingPhase(phase) {
  document.getElementById('hoistingPhase1').style.display = phase === 1 ? 'block' : 'none';
  document.getElementById('hoistingPhase2').style.display = phase === 2 ? 'block' : 'none';
  
  document.getElementById('btn-phase1').style.background = phase === 1 ? '#2b6cb0' : '#718096';
  document.getElementById('btn-phase2').style.background = phase === 2 ? '#2b6cb0' : '#718096';
  
  const explanations = {
    1: '<strong>Phase 1 - Creation:</strong> JavaScript scans your code and creates variables. Functions are fully hoisted (ready to use). <code>var</code> variables get <code>undefined</code>. <code>let</code> and <code>const</code> go into the Temporal Dead Zone (TDZ) — they exist but you can\'t access them yet.',
    2: '<strong>Phase 2 - Execution:</strong> Your code runs line by line. Assignments happen now. Variables and functions are now accessible. This is why you can call a function BEFORE it\'s declared (if it was hoisted), but not a <code>var</code> before assignment.'
  };
  
  document.getElementById('hoistingText').innerHTML = explanations[phase];
}

// Initialize
showHoistingPhase(1);
</script>
```

---

## 3. Type Coercion Interactive Flowchart 🔀

```html
<!-- ============ PHASE 2: Type Coercion Flowchart ============ -->

## 🔀 Type Coercion: What Actually Happens?

**Interactive Guide:** Click on each scenario to see when and how JavaScript coerces types.

<div class="coercion-flowchart" style="background: #f7f9fc; border: 2px solid #4299e1; border-radius: 10px; padding: 14px; margin: 16px 0;">
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
    
    <div onclick="showCoercionExample('concat')" style="padding: 12px; background: #fff; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      <strong>🔗 String Concatenation (+)</strong>
      <div style="font-size: 12px; color: #718096; margin-top: 6px;">When one operand is a string</div>
    </div>
    
    <div onclick="showCoercionExample('subtract')" style="padding: 12px; background: #fff; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      <strong>🔢 Numeric Operations (- * / %)</strong>
      <div style="font-size: 12px; color: #718096; margin-top: 6px;">Coerce strings to numbers</div>
    </div>
    
    <div onclick="showCoercionExample('comparison')" style="padding: 12px; background: #fff; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      <strong>⚖️ Loose Comparison (==)</strong>
      <div style="font-size: 12px; color: #718096; margin-top: 6px;">Different types? Coerce first!</div>
    </div>
    
    <div onclick="showCoercionExample('strict')" style="padding: 12px; background: #fff; border: 1px solid #cbd5e0; border-radius: 6px; cursor: pointer; transition: all 0.2s;">
      <strong>✅ Strict Comparison (===)</strong>
      <div style="font-size: 12px; color: #718096; margin-top: 6px;">No coercion, no surprises!</div>
    </div>
    
  </div>
  
  <div id="coercionResult" style="margin-top: 14px; padding: 12px; background: #ebf8ff; border-left: 4px solid #2b6cb0; border-radius: 4px; display: none;">
    <p id="coercionText"></p>
    <pre id="coercionCode" style="background: #0f1622; color: #e2e8f0; padding: 10px; border-radius: 4px; margin-top: 8px; font-size: 12px; overflow-x: auto;"></pre>
  </div>
  
</div>

<script>
function showCoercionExample(type) {
  const result = document.getElementById('coercionResult');
  const text = document.getElementById('coercionText');
  const code = document.getElementById('coercionCode');
  
  const examples = {
    concat: {
      title: '🔗 String Concatenation with +',
      explanation: 'When ONE operand is a string, the + operator converts the other to a string and concatenates.',
      code: '"5" + 3      // Result: "53" (string)\n5 + "3"      // Result: "53" (string)\n"Hello" + 1  // Result: "Hello1" (string)'
    },
    subtract: {
      title: '🔢 Numeric Operations',
      explanation: 'The -, *, /, % operators coerce both operands to numbers. Strings that look like numbers become numbers!',
      code: '"5" - 3      // Result: 2 (number)\n"10" * "2"   // Result: 20 (number)\n"5" / "5"    // Result: 1 (number)\n"abc" - 3    // Result: NaN (can\'t convert "abc")'
    },
    comparison: {
      title: '⚖️ Loose Comparison (==)',
      explanation: 'The == operator coerces types when comparing different types. This can lead to unexpected results!',
      code: '"5" == 5     // Result: true (coerced to same type)\n0 == false   // Result: true (false coerced to 0)\n"" == false  // Result: true (both coerce to falsy)\nnull == undefined // Result: true (special case)'
    },
    strict: {
      title: '✅ Strict Comparison (===)',
      explanation: 'The === operator never coerces. If types differ, it\'s false. This is what you should ALWAYS use!',
      code: '"5" === 5    // Result: false (different types)\n0 === false  // Result: false (different types)\n5 === 5      // Result: true (same type & value)\nnull === undefined // Result: false (different types)'
    }
  };
  
  const example = examples[type];
  text.innerHTML = `<strong>${example.title}</strong><br>${example.explanation}`;
  code.textContent = example.code;
  result.style.display = 'block';
}
</script>
```

---

## 4. Worked Example: Array Methods (map, filter, reduce) 📖

```html
<!-- ============ PHASE 2: Worked Example - Array Methods ============ -->

## 📖 Worked Example: Using `map()` to Transform

**Problem:** You have an array of prices. Calculate the price with 10% tax applied.

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 1: Understand the Problem</strong></summary>

We start with:
```javascript
const prices = [100, 200, 50];
// We want: [110, 220, 55] (each price increased by 10%)
```

We need to:
1. Take each price
2. Multiply by 1.1 (add 10%)
3. Return a new array with the results

`map()` is perfect for this!

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 2: Map Anatomy</strong></summary>

```javascript
array.map((item) => {
  // 'item' = current element
  // return the transformed value
  return item * 1.1;
});
// Returns: [110, 220, 55]
```

Key points:
- `map()` runs the function once PER ITEM
- You must RETURN the new value
- `map()` returns a NEW array (original unchanged)

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 3: Complete Solution</strong></summary>

```javascript
const prices = [100, 200, 50];

const withTax = prices.map(price => price * 1.1);

console.log(withTax); // [110, 220, 55]
console.log(prices);  // [100, 200, 50] (original unchanged!)
```

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 4: Try These Variations</strong></summary>

```javascript
// Variation 1: Create objects with price and tax
const priceDetails = prices.map(price => ({
  original: price,
  tax: price * 0.1,
  total: price * 1.1
}));

// Variation 2: String currency format
const formatted = prices.map(price => `$${(price * 1.1).toFixed(2)}`);
// Result: ["$110.00", "$220.00", "$55.00"]

// Variation 3: Apply discount then tax
const discounted = prices
  .map(price => price * 0.9)    // 10% off
  .map(price => price * 1.1);   // 10% tax
```

</details>
```

---

## 5. Worked Example: Closures (Function Factory) 📖

```html
<!-- ============ PHASE 2: Worked Example - Closures ============ -->

## 📖 Worked Example: Closures — Making a Counter

**Problem:** Create a counter that increments each time it's called. Each counter should be independent.

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 1: Understand the Problem</strong></summary>

We want:
```javascript
const counter1 = makeCounter();
const counter2 = makeCounter();

counter1();  // 1
counter1();  // 2
counter1();  // 3

counter2();  // 1 (separate counter!)
counter2();  // 2
```

Each counter is independent and remembers its own count. This is a **closure**.

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 2: Approach</strong></summary>

To create a closure:
1. Make a function that has a variable (count)
2. Return a function from inside it
3. The returned function can access and modify the count
4. Each call to the outer function creates a new closure

```
makeCounter() {
  count = 0  ← This is "remembered"
  return () => {
    count++    ← Inner function can access it
    return count
  }
}
```

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 3: Complete Solution</strong></summary>

```javascript
function makeCounter() {
  let count = 0;  // This will be "remembered" by the inner function
  
  return function() {
    count++;
    return count;
  };
}

const counter1 = makeCounter();
console.log(counter1());  // 1
console.log(counter1());  // 2
console.log(counter1());  // 3

const counter2 = makeCounter();  // Different closure!
console.log(counter2());  // 1 (starts fresh)
```

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 4: Try These Variations</strong></summary>

```javascript
// Variation 1: Start from a custom value
function makeCounter(start = 0) {
  let count = start;
  return () => ++count;
}

const counter = makeCounter(10);
console.log(counter());  // 11
console.log(counter());  // 12

// Variation 2: Add reset functionality
function makeCounterWithReset() {
  let count = 0;
  return {
    increment: () => ++count,
    reset: () => { count = 0; return count; }
  };
}

const cnt = makeCounterWithReset();
console.log(cnt.increment());  // 1
console.log(cnt.increment());  // 2
console.log(cnt.reset());      // 0

// Variation 3: Decrement too
function makeCounterBoth(start = 0) {
  let count = start;
  return {
    up: () => ++count,
    down: () => --count,
    value: () => count
  };
}
```

</details>
```

---

## 6. Worked Example: Reduce (Summing) 📖

```html
<!-- ============ PHASE 2: Worked Example - Reduce ============ -->

## 📖 Worked Example: Array Reduce — Sum Scores

**Problem:** You have an array of student scores. Calculate the total.

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 1: Understand the Problem</strong></summary>

We start with:
```javascript
const scores = [85, 90, 78, 92];
// We want: 85 + 90 + 78 + 92 = 345 (the total)
```

`reduce()` is perfect for combining all items into one value.

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 2: Reduce Anatomy</strong></summary>

```javascript
array.reduce((accumulator, item) => {
  // accumulator = running total
  // item = current element
  // return the new total
}, initialValue);
```

Example breakdown:
```
Iteration 1: acc=0,      score=85  → 0 + 85 = 85
Iteration 2: acc=85,     score=90  → 85 + 90 = 175
Iteration 3: acc=175,    score=78  → 175 + 78 = 253
Iteration 4: acc=253,    score=92  → 253 + 92 = 345
Result: 345
```

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 3: Complete Solution</strong></summary>

```javascript
const scores = [85, 90, 78, 92];

const total = scores.reduce((sum, score) => sum + score, 0);

console.log(total);  // 345
```

That's it! The `0` at the end is the starting value.

</details>

<details style="background: #fff; border: 1px solid #cbd5e0; border-radius: 8px; padding: 12px; margin: 10px 0;">
<summary style="cursor: pointer; font-weight: 600; color: #2b6cb0;"><strong>Step 4: Try These Variations</strong></summary>

```javascript
// Variation 1: Find average
const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
// 345 / 4 = 86.25

// Variation 2: Find highest score
const highest = scores.reduce((max, score) => score > max ? score : max, 0);
// Result: 92

// Variation 3: Convert array to object
const gradeList = scores.reduce((acc, score, index) => {
  acc['student' + (index + 1)] = score;
  return acc;
}, {});
// Result: {student1: 85, student2: 90, student3: 78, student4: 92}

// Variation 4: Sum only passing scores (>= 80)
const passingTotal = scores.reduce((sum, score) => 
  score >= 80 ? sum + score : sum, 0);
// Result: 85 + 90 + 92 = 267
```

</details>
```

---

## 7. Enhanced Flashcard Format (Spaced Repetition Ready)

```html
<!-- Cards can have metadata for spaced repetition -->

<div class="flashcard" data-difficulty="easy" data-topic="variables">
  <details>
    <summary>🃏 What is the difference between <code>let</code> and <code>const</code>?</summary>
    <div class="back" style="margin-top: 10px; padding: 10px; background: #f0fff4; border-radius: 4px;">
      <strong>Answer:</strong> 
      <code>let</code> allows reassignment, <code>const</code> doesn't. Both are block-scoped. Use <code>const</code> by default, <code>let</code> only when the value will change.
    </div>
  </details>
</div>

<script>
// For future spaced repetition tracking:
// Cards with data-difficulty can be sorted/filtered
// Cards can track "last-shown" date for SRS algorithm
// localStorage can save: card-id, score (0-5), last-shown-date
</script>
```

---

**All components ready to copy into the interactive markdown!**
