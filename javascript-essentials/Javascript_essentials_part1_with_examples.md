# JavaScript Essentials - Part 1

A quick reference covering the JavaScript fundamentals you have learned so far.

> 💡 **Study guide (plain edition):** quizzes are simple Q&A lists, flashcards are bullets, and every answer is shown openly — no HTML/CSS. For the clickable version see `Javascript_essentials_part1_interactive.md`.

---

### 🗺 Your path through the 3-part series

```
Part 1  Core language  →  Part 2  Async/OOP/Modules  →  Part 3  MERN Bridge
(let, loops, functions,        (promises, async/await,          (Map/Set, generators, regex,
 objects, arrays, closures)     classes, error handling)         DOM, fetch, Node core)
```
You are here: **Part 1 — Core**. When you finish, move to [Part 2](Javascript_essentials_part2_with_examples.md) (Async/OOP) then [Part 3](Javascript_essentials_part3_with_examples.md) (MERN Bridge).

---

## Table of Contents

1. [Variables: `let`, `const`, `var`](#1-variables-let-const-var)
2. [Conditions: `if...else` and `switch`](#2-conditions-ifelse-and-switch)
3. [Loops: `while`, `do...while`, `for`](#3-loops-while-dowhile-for)
4. [Logical Operators](#4-logical-operators)
5. [Data Types](#5-data-types)
6. [Mutable vs Immutable](#6-mutable-vs-immutable)
7. [Operators](#7-operators)
8. [Functions and Arrow Functions](#8-functions-and-arrow-functions)
9. [Arrays and Methods](#9-arrays-and-methods)
10. [Strings and Common Methods](#10-strings-and-common-methods)
11. [Objects](#11-objects)
12. [Symbols Cheat Sheet](#12-symbols-cheat-sheet)
13. [Common Pitfalls](#13-common-pitfalls)
14. [Practice Exercises](#14-practice-exercises)
15. [Challenges](#15-challenges)
16. [Answer Key](#16-answer-key)

**📈 Your progress** — tick as you go:

- [ ] Sections 1–6 (basics)
- [ ] Sections 7–12 (core toolkit)
- [ ] Section 13 (pitfalls)
- [ ] Exercises 1–10 attempted
- [ ] Challenges 1–9 attempted
- [ ] All answers checked

---

## 📋 Quick Reference Summary

### Variables & scope

| Keyword | Scope    | Reassign? | Use when          |
|---------|----------|-----------|-------------------|
| `let`   | Block    | Yes       | value will change |
| `const` | Block    | No        | default choice    |
| `var`   | Function | Yes       | avoid in new code |

### Truthy vs falsy

**Falsy (only 6):** `false`, `0`, `""` (empty string), `null`, `undefined`, `NaN` — everything else is truthy (including `"0"`, `[]`, `{}`).

### Golden rules

1. Use `const` by default — `let` only when the value must change.
2. Always compare with `===` / `!==` — never `==` / `!=`.
3. Strings are immutable; arrays and objects are mutable.
4. `sort()` on numbers needs a compare function: `.sort((a, b) => a - b)`.
5. Every `switch` case needs a `break` (or `return`).

### 🃏 Flashcards (Q&A)

- 🃏 `let` vs `const`? — `const` locks the *binding* — you can't reassign it, but contents of objects/arrays CAN still change. Default to `const`.

- 🃏 `==` vs `===`? — `==` converts types first (`"5" == 5` → `true`). `===` checks type AND value. Always use `===`.

- 🃏 `map` vs `forEach`? — `map` returns a **new array** of transformed items. `forEach` returns `undefined` — for side effects only.

- 🃏 `slice` vs `splice`? — `slice` copies a portion (original untouched). `splice` changes the array **in place**.

- 🃏 Spread vs Rest (`...`)? — On the **left** of `=` → **rest** (collects into an array/object). In literals & calls → **spread** (expands out).

- 🃏 `null` vs `undefined`? — `undefined` = never assigned a value. `null` = intentionally empty (you assigned it).

- 🃏 `??` vs `||`? — `||` falls back on ANY falsy value (so `0` and `""` get skipped!). `??` only falls back on `null`/`undefined`.

- 🃏 Are strings mutable? — No — every string method returns a **new string**; the original is untouched.

- 🃏 What is a closure? — A function that remembers the variables of the place where it was created — even after the outer function has returned.

- 🃏 How do you test for `NaN`? — `Number.isNaN(x)`. Never `x === NaN` — that is always `false`!

### 🗂️ Mini cheat lists

**Array methods**

```text
map(fn)      transform each item → new array
filter(fn)   keep matches → new array
reduce(fn,0) fold to a single value
find(fn)     first match or undefined
at(-1)       last item (negative index!)
```

**String methods**

```text
slice(a,b)   copy a part → new string
split(sep)   string → array of pieces
trim()       strip whitespace
padStart(n)  pad from the left
replace(a,b) replace first match
```

### 🧩 Real-world scenario (what this part builds toward)

Imagine you are building a **React shopping cart**. Before you can touch React, every line of this part shows up daily:

- **`const` vs `let`** → cart items are `const` (never reassigned), but the running *total* is a `let`.
- **Loops** -> rendering a list of items uses `for...of` or `.map()`.
- **Functions / arrow functions** → every React component is just a function.
- **Arrays & methods** → `.map()`, `.filter()`, `.reduce()` compute the cart total and filtered views.
- **Objects & strings** → product data and formatting prices/lookup fields.
- **Truthy/falsy** → `if (user)` guards empty states.

Each concept below is a building block of that one real feature. Know them once, and you'll recognize them in *every* MERN app.
## 1. Variables: `let`, `const`, `var`

> 🚩 **Why it matters:** everything you write — React state, cart totals, API data — starts with choosing `const` vs `let` correctly.

| Keyword  | Scope          | Reassign? | Notes                          |
|----------|----------------|-----------|--------------------------------|
| `let`    | Block          | Yes       | Use when the value will change |
| `const`  | Block          | No        | Use by default                 |
| `var`    | Function       | Yes       | Older style, avoid in new code |

### Basic Examples

```javascript
let name = "Rohit";
name = "Amit"; // allowed

const age = 25;
// age = 26; // Error: cannot reassign const

const person = { name: "Rohit" };
person.name = "Amit"; // allowed (modifying content)
// person = {}; // Error: cannot reassign
```

### Real-world Examples

#### E-commerce: Managing cart items

```javascript
// Quantity can change
let cartQuantity = 3;
cartQuantity = 5; // ✅ Allowed

// Product info doesn't change once created
const product = {
  id: 101,
  name: "Laptop",
  price: 50000
};
// product = { id: 102 }; // ❌ Error: cannot reassign

// Array of items can be modified
let cartItems = [];
cartItems.push(product); // ✅ Allowed
```

#### User authentication: Session management

```javascript
// Session token is constant
const sessionToken = "abc123xyz789";
// sessionToken = "def456"; // ❌ Error

// User status can change
let isLoggedIn = false;
isLoggedIn = true; // ✅ Allowed after login

// User profile object exists but content changes
const user = {
  id: 1,
  email: "user@example.com",
  lastLogin: null
};
user.lastLogin = new Date(); // ✅ Allowed
user.email = "newemail@example.com"; // ✅ Allowed
```

### More Examples

#### Simple: Swapping values with a temp variable

```javascript
let x = 1;
let y = 2;

const temp = x;   // remember x
x = y;            // x becomes 2
y = temp;         // y becomes 1

console.log(x, y); // 2 1
```

#### Complicated: `const` with an array of mutable items

```javascript
const cartItems = [];

// The binding (cartItems) can't be reassigned...
// cartItems = ["x"]; // ❌ Error

// ...but we CAN modify the array's contents
cartItems.push({ id: 101, name: "Keyboard", qty: 1 });
cartItems.push({ id: 102, name: "Mouse", qty: 2 });

console.log(cartItems.length); // 2
// cartItems = []; // ❌ Error (not allowed - const binding)
```

#### Complicated: Scoping with `let` vs `var` inside a block

```javascript
if (true) {
  var functionScoped = "var";   // leaks out of the block
  let blockScoped = "let";      // stays inside the block
}

console.log(functionScoped); // "var" (works - var is function-scoped)
// console.log(blockScoped); // ❌ ReferenceError (let is block-scoped)
```

### 🧪 Self-Test — Variables

**Q1. What does `const` actually prevent?**

- ❌ Changing an object's contents — that is still allowed!
- ✅ Reassigning the variable to a new value — the binding is locked, not the content.

**Q2. What is `let x = "5" + 3;`?**

- ✅ `"53"` (a string) — `+` with a string concatenates instead of adding.
- ❌ `8` — only `- * / %` would coerce the string to a number.

---

## 2. Conditions: `if...else` and `switch`

> 🚩 **Why it matters:** rendering logged-in vs logged-out UI, validation, access control — all conditional logic starts here.

### `if...else`

```javascript
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

if (score >= 90) {
  console.log("Grade A");
} else if (score >= 80) {
  console.log("Grade B");
} else {
  console.log("Grade C");
}
```

### `switch`

```javascript
switch (day) {
  case "Monday":
    console.log("Start of week");
    break;
  case "Friday":
    console.log("Almost weekend");
    break;
  default:
    console.log("Regular day");
}
```

### Real-world: E-commerce Order Status

```javascript
const orderStatus = "shipped";

switch (orderStatus) {
  case "pending":
    console.log("Order received, payment processing...");
    break;
  case "confirmed":
    console.log("Payment successful, preparing shipment...");
    break;
  case "shipped":
    console.log("Order on the way, tracking: TRK123456");
    break;
  case "delivered":
    console.log("Order delivered! Please rate your experience");
    break;
  case "cancelled":
    console.log("Order cancelled, refund initiated");
    break;
  default:
    console.log("Unknown status, please contact support");
}
```

### Real-world: Banking - Account Approval

```javascript
const creditScore = 650;
const income = 50000;
const employmentYears = 2;

if (creditScore >= 750 && income >= 30000) {
  console.log("Premium account approved, interest rate: 5%");
} else if (creditScore >= 700 && income >= 25000 && employmentYears >= 1) {
  console.log("Standard account approved, interest rate: 7%");
} else if (creditScore >= 650 && income >= 20000) {
  console.log("Basic account approved, interest rate: 10%");
} else {
  console.log("Application rejected");
}
```

### Real-world: Restaurant Reservation - Discount Logic

```javascript
const dayOfWeek = "Tuesday";
const numberOfGuests = 8;
const mealTime = "lunch";

let discount = 0;

if (mealTime === "lunch" && numberOfGuests >= 5) {
  discount = 0.15; // 15% lunch group discount
} else if (dayOfWeek === "Monday" || dayOfWeek === "Tuesday") {
  discount = 0.10; // 10% weekday special
} else if (numberOfGuests >= 10) {
  discount = 0.20; // 20% for large groups
}

const basePrice = 3000;
const finalPrice = basePrice * (1 - discount);
console.log(`Final: ₹${finalPrice}`); // ₹2550
```

### More Examples

#### Simple: Chained conditions (if / else if / else)

```javascript
const marks = 74;

if (marks >= 90) {
  console.log("Grade A");
} else if (marks >= 80) {
  console.log("Grade B");
} else if (marks >= 70) {
  console.log("Grade C");
} else {
  console.log("Below C");
}
// Grade C
```

#### Complicated: Switch with shared case (grouping)

```javascript
const month = "April";

switch (month) {
  case "December":
  case "January":
  case "February":
    console.log("Winter");
    break;
  case "March":
  case "April":
  case "May":
    console.log("Spring");
    break;
  default:
    console.log("Other season");
}
// Spring
```

#### Complicated: Nested conditions for a booking system

```javascript
const booking = {
  seatsAvailable: true,
  isWeekend: false,
  hasDiscountCode: true
};

let price = 500;

if (booking.seatsAvailable) {
  if (booking.isWeekend) {
    price += 150;                       // weekend surcharge
  } else if (booking.hasDiscountCode) {
    price *= 0.9;                       // 10% off on weekdays
  }
  console.log(`Final ticket price: ₹${price}`); // ₹450
} else {
  console.log("No seats available");
}
```

### 🧪 Self-Test — Conditions

**Q1. What happens if you forget `break` in a `switch` case?**

- ✅ Execution "falls through" into the next case — even if it doesn't match!
- ❌ JavaScript throws an error — it's silent and logical, which is what makes it dangerous.

**Q2. When is `switch` nicer than `if...else if`?**

- ✅ Comparing one value against many fixed options — cleaner and easier to scan.
- ❌ When conditions are ranges — `score >= 40` style checks fit `if` better.

---

## 3. Loops: `while`, `do...while`, `for`

> 🚩 **Why it matters:** rendering lists, processing rows, pagination — looping is how you touch many items with one idea.

### `while` - Basic Example

> Syntax: `while (condition) { ... }`
> Checks the condition **first**.

```javascript
let i = 0;
while (i < 3) {
  console.log(i); // 0, 1, 2
  i++;
}
```

### `while` - Real-world: Password Validation Loop

```javascript
let attempts = 0;
let isPasswordCorrect = false;
const correctPassword = "secret123";

while (attempts < 3 && !isPasswordCorrect) {
  const entered = prompt(`Attempt ${attempts + 1}/3: Enter password`);

  if (entered === correctPassword) {
    isPasswordCorrect = true;
    console.log("Access granted!");
  } else {
    attempts++;
    console.log(`Wrong password. ${3 - attempts} attempts left`);
  }
}

if (!isPasswordCorrect) {
  console.log("Account locked due to too many failed attempts");
}
```

### `do...while` - Basic Example

> Syntax: `do { ... } while (condition);`
> Runs the body **at least once**, then checks the condition.

```javascript
let j = 0;
do {
  console.log(j); // 0, 1, 2
  j++;
} while (j < 3);
```

### `do...while` - Real-world: Menu Selection

```javascript
let userChoice;

do {
  console.log("\n=== MENU ===");
  console.log("1. View Account");
  console.log("2. Transfer Money");
  console.log("3. Withdraw");
  console.log("4. Exit");

  userChoice = prompt("Enter choice (1-4):");

  switch (userChoice) {
    case "1":
      console.log("Account Balance: ₹50,000");
      break;
    case "2":
      console.log("Processing transfer...");
      break;
    case "3":
      console.log("Processing withdrawal...");
      break;
    case "4":
      console.log("Thank you for banking with us!");
      break;
    default:
      console.log("Invalid choice, please try again");
  }
} while (userChoice !== "4");
```

### `for` - Basic Example

> Syntax: `for (initial; condition; update) { ... }`

```javascript
for (let k = 0; k < 3; k++) {
  console.log(k); // 0, 1, 2
}
```

### `for` - Real-world: Processing Monthly Transactions

```javascript
const transactions = [
  { date: "2024-01-05", amount: 5000, type: "credit" },
  { date: "2024-01-10", amount: 2000, type: "debit" },
  { date: "2024-01-15", amount: 3000, type: "credit" },
  { date: "2024-01-20", amount: 1000, type: "debit" }
];

let totalCredit = 0;
let totalDebit = 0;

for (let i = 0; i < transactions.length; i++) {
  const txn = transactions[i];

  if (txn.type === "credit") {
    totalCredit += txn.amount;
  } else {
    totalDebit += txn.amount;
  }

  console.log(`${txn.date}: ${txn.type.toUpperCase()} ₹${txn.amount}`);
}

console.log(`\nTotal Credits: ₹${totalCredit}`);
console.log(`Total Debits: ₹${totalDebit}`);
console.log(`Net: ₹${totalCredit - totalDebit}`);
```

### `for...of` - Modern Loop for Arrays

```javascript
const fruits = ["apple", "banana", "mango"];

for (const fruit of fruits) {
  console.log(fruit); // apple, banana, mango
}
```

### `for...of` - Real-world: Calculating Total Bill

```javascript
const cartItems = [
  { product: "Keyboard", price: 5000, quantity: 1 },
  { product: "Mouse", price: 800, quantity: 2 },
  { product: "Monitor", price: 15000, quantity: 1 }
];

let totalBill = 0;

for (const item of cartItems) {
  const itemTotal = item.price * item.quantity;
  totalBill += itemTotal;

  console.log(`${item.product}: ₹${item.price} × ${item.quantity} = ₹${itemTotal}`);
}

const tax = totalBill * 0.18;
const finalAmount = totalBill + tax;

console.log(`\nSubtotal: ₹${totalBill}`);
console.log(`GST (18%): ₹${tax.toFixed(2)}`);
console.log(`Total: ₹${finalAmount.toFixed(2)}`);
```

### `for...in` - Loop Through Object Keys

```javascript
const person = {
  name: "Rohit",
  age: 25,
  city: "Delhi",
  job: "Developer"
};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

### More Examples

#### Simple: `break` and `continue`

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 2) continue;   // skip 2
  if (i === 5) break;      // stop at 5
  console.log(i);          // 0, 1, 3, 4
}
```

#### Complicated: Nested loop with labeled `break`

```javascript
const seats = [
  ["A1", "A2", "A3"],
  ["B1", "B2", "B3"],
  ["C1", "C2", "C3"]
];

let found = false;
outer:
for (const row of seats) {
  for (const seat of row) {
    if (seat === "B2") {
      console.log(`Found seat: ${seat}`); // Found seat: B2
      found = true;
      break outer;   // exit BOTH loops
    }
  }
}
console.log(found); // true
```

#### Complicated: while loop reading user input countdown

```javascript
let attempts = 3;
while (attempts > 0) {
  console.log(`Trying... ${attempts} left`);
  attempts--;   // 3, 2, 1
}
console.log("Locked!");   // runs after loop ends
```

### 🧪 Self-Test — Loops

**Q1. How many times does a `do...while` loop run at minimum?**

- ✅ Once — the condition is checked *after* the body runs.
- ❌ Zero — that's plain `while`, which can skip the body entirely.

**Q2. What does `continue` do inside a loop?**

- ✅ Skips the rest of the current iteration and jumps to the next one.
- ❌ Exits the loop completely — that's `break`.

**Q3. `for...in` vs `for...of` — which one for arrays?**

- ✅ `for...of` — it gives the **values** (`for...in` gives indexes/keys).
- ❌ Either — `for...in` on arrays gives string indexes and can surprise you.

---

### 🎯 Which loop should I use?

| Situation | Use | Example |
|---|---|---|
| Fixed steps, or you need the index | `for` | `for (let i = 0; i < 10; i++)` |
| Loop an array/string of **values** | `for...of` | `for (const item of cart)` |
| Loop an object's **keys** | `for...in` | `for (const key in settings)` |
| Run while a condition holds (check first) | `while` | password retries |
| Run at least once, check later | `do...while` | menus, prompt loops |
| Transform without a loop keyword | array methods | `.forEach / .map / .filter` |

> 💡 Rule of thumb: **arrays → `for...of`**, **objects → `for...in`**, everything else → `for`/`while`.

## 4. Logical Operators

> 🚩 **Why it matters:** `&&`, `||`, and `!` combine conditions — and `||`/`&&` double as clever defaulting in React.

| Operator | Meaning                                    |
|----------|--------------------------------------------|
| `&&`     | AND: both must be true                     |
| `\|\|`   | OR: at least one must be true              |
| `!`      | NOT: reverses a boolean                    |
| `??`     | Nullish coalescing: fallback for null/undefined |
| `?.`     | Optional chaining: safe property access    |

```javascript
console.log(true && false);  // false
console.log(true || false);  // true
console.log(!true);          // false

const user = null;
console.log(user ?? "Guest"); // "Guest"
console.log(user?.name);      // undefined
```

### Real-world: Complex Logical Operations

#### Permission Checking (AND operator)

```javascript
const user = {
  isAdmin: false,
  isActive: true,
  email: "user@example.com"
};

// All conditions must be true
if (user.isAdmin && user.isActive && user.email) {
  console.log("User has full access");
} else {
  console.log("Access denied");
}
// Output: Access denied (isAdmin is false)
```

#### Account Eligibility (OR operator)

```javascript
const customer = {
  isPremium: false,
  totalSpent: 45000,
  referralCount: 3,
  joinedMonthsAgo: 2
};

// At least one condition must be true
const isEligibleForDiscount =
  customer.isPremium ||
  customer.totalSpent >= 50000 ||
  customer.referralCount >= 5;

console.log(isEligibleForDiscount); // false
```

#### Combining AND and OR

```javascript
const booking = {
  paymentConfirmed: true,
  isWeekend: false,
  seatsAvailable: true,
  userHasVoucher: true
};

// Complex logic: booking confirmed AND (weekend special OR has voucher) AND seats available
const canProceedBooking =
  booking.paymentConfirmed &&
  (booking.isWeekend || booking.userHasVoucher) &&
  booking.seatsAvailable;

console.log(canProceedBooking); // true
```

#### Using Nullish Coalescing for Defaults

```javascript
const userSettings = {
  theme: null,
  language: undefined,
  fontSize: 14,
  notifications: false
};

const theme = userSettings.theme ?? "light";
const language = userSettings.language ?? "en";
const fontSize = userSettings.fontSize ?? 12;
const notifications = userSettings.notifications ?? true;

console.log({theme, language, fontSize, notifications});
// { theme: "light", language: "en", fontSize: 14, notifications: false }
// Note: notifications is still false (not overridden) because false is a value, not null/undefined
```

#### Optional Chaining for Safe Navigation

```javascript
const response = {
  data: {
    user: {
      profile: {
        avatar: "https://example.com/avatar.jpg"
      }
    }
  }
};

// Without optional chaining (risky)
// console.log(response.data.user.profile.avatar); // Works but fails if any property is null

// With optional chaining (safe)
console.log(response?.data?.user?.profile?.avatar); // "https://example.com/avatar.jpg"
console.log(response?.data?.products?.list?.items); // undefined (safely returns undefined)
```

### More Examples

#### Simple: Truthy vs falsy values

```javascript
// Falsy values → 0, "", null, undefined, NaN, false
// Everything else is truthy

console.log(!!"hello");  // true  (non-empty string)
console.log(!!"");       // false (empty string)
console.log(!!0);        // false
console.log(!!100);      // true
console.log(!!undefined); // false
console.log(!![]);       // true  (empty array is truthy!)
```

#### Complicated: Short-circuit returns the actual value

```javascript
// && and || return one of the operands, not necessarily true/false

console.log("a" || "b");      // "a"     (first truthy)
console.log(""  || "b");      // "b"     (first falsy → fallback)
console.log("a" && "b");      // "b"     (last value if all truthy)
console.log(0 || "fallback"); // "fallback"

// Real-world: default value instead of if/else
const user = { name: "Rohit" };
const name = user.name || "Guest";   // "Rohit"
const missing = user.city || "Unknown"; // "Unknown"
console.log(name, missing);

// Guard: only run action if a value exists
const process = (n) => `process(${n})`;
console.log(user.id && process(user.id));  // undefined (no id, short-circuits)
```

### 🧪 Self-Test — Logical Operators & Data Types

**Q1. What does `typeof []` return?**

- ✅ `"object"` — arrays are objects; use `Array.isArray()` to check for an array.
- ❌ `"array"` — that type does not exist in `typeof`.

**Q2. What is `"5" * 2`?**

- ✅ `10` — `*` coerces the string to a number.
- ❌ `"55"` — only `+` concatenates.

**Q3. What does `0 || "default"` return, and what does `0 ?? "default"` return?**

- ✅ `0 || "default"` → `"default"` (0 is falsy!), but `0 ?? "default"` → `0` — `??` only falls back on `null`/`undefined`.

---

## 5. Data Types

> 🚩 **Why it matters:** knowing what a value *is* (number, string, object…) stops most type bugs before they start.

### Primitives (immutable)

- `string`
- `number`
- `bigint`
- `boolean`
- `undefined`
- `null`
- `symbol`

### Reference Types (mutable)

- `object`
- `array`
- `function`

```javascript
console.log(typeof "Hello"); // "string"
console.log(typeof 25);      // "number"
console.log(typeof {});      // "object"
console.log(typeof []);      // "object" (arrays are objects)
console.log(typeof null);    // "object" (quirk in JS)
```

### Real-world: Type Checking

```javascript
// Check if value is a number
function isValidAge(age) {
  return typeof age === "number" && age > 0 && age < 150;
}

console.log(isValidAge(25));   // true
console.log(isValidAge("25")); // false

// Check if value is an array
function processData(data) {
  if (Array.isArray(data)) {
    return data.map(item => item * 2);
  } else if (typeof data === "number") {
    return data * 2;
  }
  return null;
}

console.log(processData(5));      // 10
console.log(processData([1, 2])); // [2, 4]
```

### More Examples

#### Simple: Type conversion

```javascript
const price = "100";
console.log(Number(price));       // 100 (string → number)
console.log(Number(price) + 1);   // 101
console.log(String(25));          // "25" (number → string)
console.log(Boolean(0));          // false (0 is falsy)
console.log(Boolean("hello"));    // true (non-empty string is truthy)
```

#### Complicated: Converting user input safely

```javascript
function safeNumber(input) {
  const converted = Number(input);
  return Number.isNaN(converted) ? 0 : converted; // fallback on NaN
}

console.log(safeNumber("250"));    // 250
console.log(safeNumber("abc"));    // 0 (NaN → fallback)
console.log(safeNumber("12.5"));   // 12.5
console.log(safeNumber(""));       // 0 (Number("") is 0, not NaN!)
```

#### Complicated: typeof pitfalls

```javascript
console.log(typeof null);   // "object"  (famous bug, by design)
console.log(typeof []);     // "object"  (arrays are objects)
console.log(typeof function () {}); // "function"
console.log(Array.isArray([]));     // true (the reliable check)
console.log(Array.isArray({}));     // false
```

### NaN — the "not a number" number

> `NaN` appears whenever a conversion or math operation fails. It is **type `"number"`**, never equals itself, and needs `Number.isNaN()` to detect.

```javascript
console.log(typeof NaN);           // "number" (surprise!)
console.log(NaN === NaN);          // false — NaN is never equal to itself

const bad = Number("abc");         // NaN
console.log(bad);                  // NaN
console.log(Number.isNaN(bad));    // true ✅ — the correct way to test

// parseInt / parseFloat read numbers from the START of a string
console.log(parseInt("42px"));     // 42  (stops at the first non-digit)
console.log(parseInt("px42"));     // NaN (must start with a digit)
console.log(parseFloat("3.5rem")); // 3.5 (keeps decimals, unlike parseInt)
```

---

### 🧪 Self-Test — Data Types

**Q1. `NaN === NaN` — what does it return, and what's the right check?**

- ✅ `false` — and the right check is `Number.isNaN(x)`.
- ❌ `true` — that's exactly the trap: NaN is never equal to itself.

**Q2. What do `parseInt("42px")` and `parseInt("px42")` return?**

- ✅ `42` and `NaN` — parseInt reads digits from the START only.
- ❌ `42` and `42` — parsing doesn't skip leading junk.

## 6. Mutable vs Immutable

> 🚩 **Why it matters:** React re-renders rely on snapshots — mutating arrays/objects in place is the #1 cause of "UI won't update" bugs.

### Primitive assignment copies the value

```javascript
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (unchanged)
console.log(b); // 20
```

### Object assignment copies the reference

```javascript
let p1 = { name: "Rohit" };
let p2 = p1;
p2.name = "Amit";
console.log(p1.name); // "Amit" (both point to same object)
```

### `const` does not freeze the contents

```javascript
const p3 = { name: "Rohit" };
p3.name = "Amit"; // ✅ allowed (modifying content)
// p3 = {}; // ❌ Error (reassigning variable)
```

### Copying objects

```javascript
let copy1 = { ...p1 };                 // shallow copy
let copy2 = Object.assign({}, p1);     // shallow copy
let deepCopy = structuredClone(p1);    // deep copy
```

### `Object.freeze` — actually lock the contents

> `const` protects the binding, not the contents. To make contents read-only, freeze them (shallow — nested objects stay editable).

```javascript
const config = Object.freeze({ theme: "dark", retries: 3 });

config.theme = "light";      // silently ignored (throws in strict mode)
console.log(config.theme);   // "dark"

// const alone does NOT do this:
const settings = { lang: "en" };
settings.lang = "hi";        // ✅ allowed — const ≠ frozen
console.log(settings.lang);  // "hi"
```

### Real-world: User Profile - Shallow Copy Problem

```javascript
const originalUser = {
  name: "Rohit",
  contact: { email: "rohit@example.com", phone: "9876543210" }
};

// Shallow copy affects nested objects
const userCopy = { ...originalUser };
userCopy.contact.email = "new@example.com";
console.log(originalUser.contact.email); // "new@example.com" (affected!)

// Deep copy preserves the original
const userDeep = structuredClone(originalUser);
userDeep.contact.email = "another@example.com";
console.log(originalUser.contact.email); // "new@example.com" (still unchanged by userDeep)
```

### Real-world: E-commerce Cart Mutation

```javascript
const originalCart = [
  { id: 1, product: "Laptop", quantity: 1 },
  { id: 2, product: "Mouse", quantity: 2 }
];

// Direct reference modifies the original
const cart1 = originalCart;
cart1[0].quantity = 10;
console.log(originalCart[0].quantity); // 10

// Copy each item so nested objects are independent
const cart2 = originalCart.map(item => ({ ...item }));
cart2[0].quantity = 5;
console.log(originalCart[0].quantity); // 10 (unchanged by cart2)
```

### More Examples

#### Simple: Primitive is copied, object is shared

```javascript
let num = 5;
let anotherNum = num;      // copies the value 5
anotherNum = 99;
console.log(num);          // 5 (unchanged)

const config = { retries: 3 };
const alias = config;      // both point to the SAME object
alias.retries = 10;
console.log(config.retries); // 10 (changed via alias!)
```

#### Complicated: Passing into functions

```javascript
let counter = 0;
const tryToChange = (n) => { n = 100; };   // receives a copy
tryToChange(counter);
console.log(counter); // 0 (unchanged — primitives pass by value)

const settings = { theme: "light" };
const changeTheme = (obj) => { obj.theme = "dark"; }; // receives the reference
changeTheme(settings);
console.log(settings.theme); // "dark" (changed — objects pass by reference)

// Object.freeze blocks mutation
const frozen = Object.freeze({ score: 10 });
// frozen.score = 20; // ❌ silently ignored (or throws in strict mode)
console.log(frozen.score); // 10
```

---

## 7. Operators

> 🚩 **Why it matters:** `+`, `===`, `??`, spread — the everyday tools for transforming values and combining data.

### Arithmetic Operators

```javascript
console.log(10 + 3);  // 13
console.log(10 - 3);  // 7
console.log(10 * 3);  // 30
console.log(10 / 3);  // 3.333...
console.log(10 % 3);  // 1   (remainder)
console.log(2 ** 3);  // 8   (power)
```

### Assignment Operators

```javascript
let score = 10;
score += 5;   // score = score + 5 → 15
score -= 3;   // score = score - 3 → 12
score *= 2;   // score = score * 2 → 24
score /= 4;   // score = score / 4 → 6

console.log(score); // 6
```

### Comparison Operators

| Operator | Meaning                          | Example           |
|----------|----------------------------------|-------------------|
| `===`    | Strict equality (value and type) | `5 === "5"` → false |
| `!==`    | Strict inequality                | `5 !== "5"` → true |
| `==`     | Loose equality (avoid)           | `5 == "5"` → true |
| `!=`     | Loose inequality                 | `5 != "5"` → false |
| `<`, `>` | Less/Greater than                | `3 < 5` → true |
| `<=`, `>=` | Less/Greater or equal           | `5 <= 5` → true |

### Ternary Operator

> Syntax: `condition ? valueIfTrue : valueIfFalse`

```javascript
let result = age >= 18 ? "Adult" : "Minor";

// Nested ternary
const category = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
```

### Real-world: Discount Calculator with Ternary

```javascript
const purchaseAmount = 5000;
const customerType = "gold";
const isMonthEnd = true;

const discount = purchaseAmount > 10000 ? 0.20 :
                 purchaseAmount > 5000 ? 0.15 :
                 customerType === "gold" ? 0.10 : 0;

const additionalDiscount = isMonthEnd ? 0.05 : 0;
const finalDiscount = discount + additionalDiscount;
const finalAmount = purchaseAmount * (1 - finalDiscount);

console.log(`Original: ₹${purchaseAmount}`);
console.log(`Discount: ${(finalDiscount * 100).toFixed(1)}%`);
console.log(`Final: ₹${finalAmount}`);
```

### Increment and Decrement

```javascript
let count = 5;
count++;      // 6 (post-increment)
count--;      // 5 (post-decrement)
++count;      // 6 (pre-increment)
--count;      // 5 (pre-decrement)
```

### Real-world: Loop Counter with Operators

```javascript
const inventory = [
  { product: "Laptop", stock: 10 },
  { product: "Mouse", stock: 50 },
  { product: "Keyboard", stock: 30 }
];

for (let i = 0; i < inventory.length; i++) {
  const item = inventory[i];
  const status = item.stock > 0 ? "In Stock" : "Out of Stock";
  const stockLevel = item.stock <= 10 ? "Low Stock" : "Good Stock";

  console.log(`${item.product}: ${status} (${stockLevel})`);
}
```

### Spread Operator

```javascript
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { name: "Rohit" };
const obj2 = { ...obj1, age: 25 }; // { name: "Rohit", age: 25 }
```

### Other Operators

```javascript
typeof 25;           // "number"
typeof "hello";      // "string"
typeof true;         // "boolean"

const obj = { a: 1 };
delete obj.a;        // true (property deleted)

"name" in obj;       // true/false (check if key exists)
```

### Math — the built-in calculator

> `Math` is a global object full of helpers — no import needed. `**` is the power operator (`Math.pow` does the same).

```javascript
console.log(Math.round(4.5));   // 5    (nearest, .5 rounds up)
console.log(Math.floor(4.9));   // 4    (always down)
console.log(Math.ceil(4.1));    // 5    (always up)
console.log(Math.trunc(-4.9));  // -4   (just chops the decimals)
console.log(Math.abs(-7));      // 7
console.log(Math.max(3, 9, 2)); // 9
console.log(Math.min(3, 9, 2)); // 2
console.log(2 ** 10);           // 1024 (power — also Math.pow(2, 10))

// Random: Math.random() gives 0 to <1. Dice roll 1–6:
const dice = Math.floor(Math.random() * 6) + 1;
console.log(dice);              // e.g. 4

// Rounding for display — toFixed returns a STRING:
console.log((123.456).toFixed(2)); // "123.46"
```

### More Examples

#### Simple: Modulo for even/odd

```javascript
const n = 7;
console.log(n % 2 === 0 ? "even" : "odd"); // "odd"
```

#### Complicated: Combining operators for a checkout total

```javascript
let total = 0;

total += 500;          // + assignment
total *= 2;            // → 1000 (double)
total -= 120;          // → 880
total /= 4;            // → 220

console.log(total);          // 220
console.log(total ** 2);     // 48400 (power)
console.log(total % 3);      // 1 (remainder)
console.log(total >= 200 && total < 300); // true (comparison + logical)
```

### 🧪 Self-Test — Operators

**Q1. What does `7 % 2` return, and what is it good for?**

- ✅ `1` — the remainder. Perfect for even/odd checks and cycling through indexes.

**Q2. What is `2 ** 10`?**

- ✅ `1024` — the exponent (power) operator.
- ❌ `20` — that would be `2 * 10`.

---

### ⚖️ Operator precedence — who wins when they mix?

> Rule of thumb: **arithmetic → comparison → logical**. When unsure, add parentheses — they always win.

| Priority | Operators | Example | Result |
|---|---|---|---|
| 1st | `( )` parentheses | `(2 + 3) * 4` | `20` |
| 2nd | `**` power | `2 ** 3 * 2` | `16` (power first) |
| 3rd | `* / %` | `2 + 4 / 2` | `4` (division first) |
| 4th | `+ -` | `1 + 2 * 3` | `7` |
| 5th | `> < >= <=` | `1 + 1 > 1` | `true` (math first) |
| 6th | `=== !== == !=` | `1 + 1 === 2` | `true` |
| 7th | `&&` | `true || false && false` | `true` (`&&` tighter) |
| 8th | `||` | `true || false` | `true` |

> ⚠️ **`??` can't be mixed** with `&&` or `||` without parentheses — SyntaxError. Wrap it: `(a || b) ?? c`.

> Assignment (`=`, `+=`…) and ternary sit at the very bottom.

## 8. Functions and Arrow Functions

> 🚩 **Why it matters:** every React component and every event handler is just a function — this is the core shape of React.

### Function Declaration - Basic

```javascript
function greet(name) {
  return `Hello, ${name}`;
}

console.log(greet("Rohit")); // "Hello, Rohit"
```

### Function Expression

```javascript
const greet2 = function (name) {
  return `Hello, ${name}`;
};

console.log(greet2("Amit")); // "Hello, Amit"
```

### Arrow Function - Basic

```javascript
const greet3 = (name) => `Hello, ${name}`;
```

### Return Rules - Critical!

```javascript
// ✅ Implicit return (one line, no braces)
const add1 = (a, b) => a + b;

// ✅ Explicit return (with braces and return keyword)
const add2 = (a, b) => {
  return a + b;
};

// ❌ WRONG: braces but no return (returns undefined)
const add3 = (a, b) => {
  a + b; // NOT returned!
};
```

### Real-world: E-commerce Pricing Calculator

```javascript
// Function with multiple conditions
function calculateFinalPrice(basePrice, quantity, customerType) {
  let discount = 0;

  // Bulk discount
  if (quantity >= 10) {
    discount += 0.10;
  }

  // Customer type discount
  if (customerType === "gold") {
    discount += 0.05;
  } else if (customerType === "silver") {
    discount += 0.03;
  }

  const finalPrice = basePrice * quantity * (1 - discount);
  return {
    basePrice,
    quantity,
    subtotal: basePrice * quantity,
    discount: discount * 100,
    finalPrice: finalPrice.toFixed(2)
  };
}

const order = calculateFinalPrice(500, 15, "gold");
console.log(order);
// {
//   basePrice: 500,
//   quantity: 15,
//   subtotal: 7500,
//   discount: 15,
//   finalPrice: "6375.00"
// }
```

### Real-world: Password Validation (Arrow Function)

```javascript
const isValidPassword = (password) => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  return hasMinLength && hasUppercase && hasNumber && hasSpecial;
};

console.log(isValidPassword("Weak123")); // false
console.log(isValidPassword("Strong@123")); // true
```

### Real-world: Complex Data Processing

```javascript
function analyzeGrades(students) {
  let totalScore = 0;
  let topStudent = null;
  let topScore = 0;

  for (const student of students) {
    totalScore += student.grade;

    if (student.grade > topScore) {
      topScore = student.grade;
      topStudent = student;
    }
  }

  const average = totalScore / students.length;

  return {
    average: average.toFixed(2),
    topStudent: topStudent.name,
    topScore: topScore,
    passCount: students.filter(s => s.grade >= 40).length,
    failCount: students.filter(s => s.grade < 40).length
  };
}

const students = [
  { name: "Rohit", grade: 85 },
  { name: "Priya", grade: 92 },
  { name: "Amit", grade: 35 },
  { name: "Neha", grade: 78 }
];

console.log(analyzeGrades(students));
// {
//   average: "72.50",
//   topStudent: "Priya",
//   topScore: 92,
//   passCount: 3,
//   failCount: 1
// }
```

### Default Parameters

```javascript
const greet5 = (name = "Guest") => `Hello, ${name}`;

console.log(greet5()); // "Hello, Guest"
console.log(greet5("Rohit")); // "Hello, Rohit"
```

### Higher-order Function: Function as Parameter

```javascript
const applyOperation = (a, b, operation) => {
  return operation(a, b);
};

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(applyOperation(5, 3, add)); // 8
console.log(applyOperation(5, 3, multiply)); // 15
```

### Rest Parameters

```javascript
const sumAll = (...numbers) => numbers.reduce((total, n) => total + n, 0);

console.log(sumAll(1, 2));          // 3
console.log(sumAll(1, 2, 3, 4, 5)); // 15
```

#### Simple: Rest with a first argument

```javascript
const buildList = (category, ...items) => `${category}: ${items.join(", ")}`;
console.log(buildList("fruits", "apple", "mango")); // "fruits: apple, mango"
```

#### Complicated: Function returning a function (factory)

```javascript
const makeDiscounter = (percent) => (price) => price * (1 - percent);

const tenPercentOff = makeDiscounter(0.10);
const halfPrice = makeDiscounter(0.50);

console.log(tenPercentOff(1000)); // 900
console.log(halfPrice(1000));     // 500
```

### Recursion (function calling itself)

```javascript
const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

console.log(factorial(5)); // 120 (5*4*3*2*1)
console.log(factorial(6)); // 720

// Complicated: Flatten a nested array with recursion
const deepFlatten = (arr) =>
  arr.reduce(
    (result, item) => result.concat(Array.isArray(item) ? deepFlatten(item) : item),
    []
  );

console.log(deepFlatten([1, [2, [3, [4]]]])); // [1, 2, 3, 4]
```

### Hoisting — what exists before its line runs

> Function **declarations** are hoisted — usable earlier in the file. `let`/`const` are not: using them before their line throws (the *temporal dead zone*).

```javascript
sayHi(); // "Hi!" ✅ works — the whole declaration is hoisted to the top

function sayHi() {
  console.log("Hi!");
}

// Arrow functions stored in const behave like any const:
// greet(); // ❌ ReferenceError — can't use before its line
const greet = () => console.log("Hello!");
greet(); // "Hello!"
```

### Closures — a function remembers where it was born

> A closure is a function that keeps access to the variables of the place where it was created — even after the outer function has returned. You already used one: `makeDiscounter` remembered `percent`.

```javascript
const makeCounter = () => {
  let count = 0;          // private — nothing outside can touch it
  return () => ++count;   // this inner function "closes over" count
};

const next = makeCounter();
console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3

// A new counter starts fresh — closures don't share state:
const other = makeCounter();
console.log(other()); // 1
console.log(next());  // 4 (next still remembers its own count)
```

### 🧪 Self-Test — Functions

**Q1. What does `const f = (x) => { x * 2 };` return when called?**

- ✅ `undefined` — with `{}` braces you must write `return` yourself.
- ❌ `x * 2` — without `return`, the block's result is thrown away.

**Q2. Two counters made from the same factory — do they share their count?**

- ✅ No — each call to the factory creates a fresh closure with its own private `count`.
- ❌ Yes — closures would share one variable.

**Q3. Which can be called before its line appears in the file?**

- ✅ A function **declaration** — it is hoisted to the top.
- ❌ A `const` arrow function — it sits in the temporal dead zone until its line.

---

### 🧰 `Set` — instant de-duplication

> A `Set` holds **unique** values. Spread it back into an array and duplicates vanish — the fastest de-dup (this is what Challenge C3 needs).

```javascript
const mixed = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(mixed)];
console.log(unique);              // [1, 2, 3]
console.log(new Set(mixed).size); // 3
console.log(new Set(mixed).has(2)); // true
```

## 9. Arrays and Methods

> 🚩 **Why it matters:** `map`/`filter`/`reduce` power 90% of React list rendering and data shaping — the most used tool in the stack.

```javascript
let numbers = [1, 2, 3, 4, 5];
console.log(numbers[0]); // 1
```

### Methods reference

| Method     | Syntax                                      | Purpose                            |
|------------|---------------------------------------------|------------------------------------|
| `push`     | `array.push(item)`                          | Add to end                         |
| `pop`      | `array.pop()`                               | Remove from end                    |
| `unshift`  | `array.unshift(item)`                       | Add to beginning                   |
| `shift`    | `array.shift()`                             | Remove from beginning              |
| `splice`   | `array.splice(start, deleteCount, newItem)` | Add/remove/replace at any index    |
| `slice`    | `array.slice(start, end)`                   | Copy portion (no mutation)         |
| `includes` | `array.includes(value)`                     | Check if value exists              |
| `indexOf`  | `array.indexOf(value)`                      | Find index, returns `-1` if absent |
| `lastIndexOf` | `array.lastIndexOf(value)`               | Last index of value, or `-1`       |
| `at`       | `array.at(index)`                          | Value at index (supports negative) |
| `fill`     | `array.fill(value, start?, end?)`          | Fill with value (mutates)          |
| `Array.from`| `Array.from(iterable, mapFn?)`            | Create array from iterable         |
| `keys` / `values` / `entries` | `array.keys()` etc.                | Iterate indexes / values / pairs   |
| `join`     | `array.join(separator?)`                    | Convert to string                  |
| `concat`   | `array.concat(otherArray)`                  | Combine arrays                     |
| `forEach`  | `array.forEach((el, i?) => {})`             | Loop (no return)                   |
| `map`      | `array.map(el => newValue)`                 | New array with transformed values  |
| `filter`   | `array.filter(el => condition)`             | Keep elements that match           |
| `find`     | `array.find(el => condition)`               | First match                        |
| `findIndex`| `array.findIndex(el => condition)`          | Index of first match               |
| `some`     | `array.some(el => condition)`               | True if at least one matches       |
| `every`    | `array.every(el => condition)`              | True if all match                  |
| `sort`     | `array.sort(compareFn?)`                    | Sort in place                      |
| `reverse`  | `array.reverse()`                           | Reverse in place                   |
| `flat`     | `array.flat(depth?)`                        | Flatten nested arrays              |
| `flatMap`  | `array.flatMap(el => newValue)`             | Map then flatten one level         |
| `findLast` / `findLastIndex` | `array.findLast(fn)`                        | Last match (searches from the end) |
| `toSorted` / `toReversed` | `array.toSorted(cmp)`                       | Sorted / reversed **copy** (no mutation) |
| `with`     | `array.with(index, value)`                  | Copy with one index replaced       |
| `reduce`   | `array.reduce((acc, cur) => ..., init)`     | Reduce to a single value           |

### Methods that mutate

- `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`

### Methods that return new results

- `slice`, `concat`, `map`, `filter`, `find`, `findIndex`,
  `findLast`, `findLastIndex`, `includes`, `indexOf`, `some`, `every`,
  `reduce`, `flat`, `flatMap`, `join`, `toSorted`, `toReversed`, `with`

```javascript
// ES2023: change a copy, keep the original intact
const scores = [30, 10, 20];
console.log(scores.toSorted());    // [10, 20, 30]
console.log(scores.toReversed());  // [20, 10, 30]
console.log(scores.with(1, 99));   // [30, 99, 20]
console.log(scores);               // [30, 10, 20] — untouched ✅

const names = ["Rohit", "Amit", "Priya"];
console.log(names.findLast((n) => n.length > 3)); // "Priya" (last match)
```

### Examples

```javascript
let doubled = numbers.map((n) => n * 2);
let evens = numbers.filter((n) => n % 2 === 0);
let sum = numbers.reduce((total, n) => total + n, 0);

numbers.sort((a, b) => a - b);
numbers.reverse();
```

### Utility

```javascript
Array.isArray([1, 2]); // true
Array.isArray({});      // false
```

---

### Array Method Examples

A single sample array used in most of the examples below:

```javascript
const marks = [20, 40, 50, 35, 60, 15];
```

#### `push`

> Syntax: `array.push(item1, item2, ...)`
> Adds items to the **end** of the array. Changes the **existing array**. Returns the new length.

```javascript
const fruits = ["apple", "banana"];
fruits.push("mango");
console.log(fruits); // ["apple", "banana", "mango"]
```

#### `pop`

> Syntax: `array.pop()`
> Removes the **last** item from the array. Changes the **existing array**. Returns the removed item.

```javascript
const colors = ["red", "green", "blue"];
const removed = colors.pop();
console.log(colors, removed); // ["red", "green"], "blue"
```

#### `unshift`

> Syntax: `array.unshift(item1, item2, ...)`
> Adds items to the **beginning** of the array. Changes the **existing array**. Returns the new length.

```javascript
const numbers = [2, 3, 4];
numbers.unshift(1);
console.log(numbers); // [1, 2, 3, 4]
```

#### `shift`

> Syntax: `array.shift()`
> Removes the **first** item from the array. Changes the **existing array**. Returns the removed item.

```javascript
const queue = ["first", "second", "third"];
queue.shift();
console.log(queue); // ["second", "third"]
```

#### `splice`

> Syntax: `array.splice(startIndex, deleteCount, item1?, item2?, ...)`
> Adds, removes, or replaces items at any index. Changes the **existing array**. Returns the removed items.

```javascript
const sample1 = [10, 20, 30, 40];
sample1.splice(1, 1);
console.log(sample1); // [10, 30, 40]  (remove)

const sample2 = [10, 20, 30];
sample2.splice(2, 0, 99);
console.log(sample2); // [10, 20, 99, 30]  (insert)

const sample3 = [10, 20, 30];
sample3.splice(0, 1, 100);
console.log(sample3); // [100, 20, 30]  (replace)
```

#### `slice`

> Syntax: `array.slice(startIndex?, endIndex?)`
> Copies a portion of the array into a **new array**. The original array is **not changed**.

```javascript
const letters = ["a", "b", "c", "d"];
const sliced = letters.slice(1, 3);
console.log(sliced, letters); // ["b", "c"], original unchanged
```

#### `includes`

> Syntax: `array.includes(value, fromIndex?)`
> Checks whether the array contains a value. Returns `true` or `false`. Original array is not changed.

```javascript
console.log(marks.includes(40));  // true
console.log(marks.includes(999)); // false
```

#### `indexOf`

> Syntax: `array.indexOf(value, fromIndex?)`
> Finds the **first index** of a value. Returns the index, or `-1` if not found. Original array is not changed.

```javascript
const items = ["pen", "book", "pen", "laptop"];
console.log(items.indexOf("pen"));   // 0
console.log(items.indexOf("phone")); // -1
```

#### `join`

> Syntax: `array.join(separator?)`
> Joins all items into a **new string** using a separator. Original array is not changed.

```javascript
const tags = ["html", "css", "js"];
console.log(tags.join(", ")); // "html, css, js"
```

#### `concat` and spread

> Syntax: `array.concat(array2, array3, ...)`
> Spread syntax: `[...array1, ...array2]`
> Combines arrays into a **new array**. Original arrays are not changed.

```javascript
const groupA = [1, 2];
const groupB = [3, 4];
console.log(groupA.concat(groupB));        // [1, 2, 3, 4]
console.log([...groupA, ...groupB]);       // [1, 2, 3, 4]
```

#### `forEach`

> Syntax: `array.forEach((element, index?, array?) => { ... })`
> Runs a function on each item. Does **not** return a new array. Used for side effects like printing.

```javascript
marks.forEach((mark) => {
  if (mark >= 40) {
    console.log(`Pass: ${mark}`);
  } else {
    console.log(`Fail: ${mark}`);
  }
});
```

#### `map`

> Syntax: `array.map((element, index?, array?) => newValue)`
> Creates a **new array** with each item transformed. Original array is not changed.

```javascript
const doubled = marks.map((mark) => mark * 2);
console.log(doubled); // [40, 80, 100, 70, 120, 30]
```

#### `filter`

> Syntax: `array.filter((element, index?, array?) => condition)`
> Creates a **new array** with items that pass the condition. Original array is not changed.

```javascript
const passing = marks.filter((mark) => mark >= 40);
console.log(passing); // [40, 50, 60]
```

#### `find`

> Syntax: `array.find((element, index?, array?) => condition)`
> Returns the **first item** that matches the condition, or `undefined`. Original array is not changed.

```javascript
const firstHigh = marks.find((mark) => mark >= 40);
console.log(firstHigh); // 40
```

#### `findIndex`

> Syntax: `array.findIndex((element, index?, array?) => condition)`
> Returns the **index of the first match**, or `-1` if not found. Original array is not changed.

```javascript
const highIndex = marks.findIndex((mark) => mark >= 40);
console.log(highIndex); // 1
```

#### `some`

> Syntax: `array.some((element, index?, array?) => condition)`
> Returns `true` if **at least one** item matches. Original array is not changed.

```javascript
console.log(marks.some((mark) => mark > 50)); // true
```

#### `every`

> Syntax: `array.every((element, index?, array?) => condition)`
> Returns `true` only if **all** items match. Original array is not changed.

```javascript
console.log(marks.every((mark) => mark > 0)); // true
```

#### `sort`

> Syntax: `array.sort(compareFn?)`
> Compare: `(a, b) => a - b` for ascending, `b - a` for descending.
> Sorts the **existing array in place**. Returns the same array.

```javascript
const random = [40, 1, 100, 5];
console.log([...random].sort((a, b) => a - b)); // [1, 5, 40, 100]
console.log([...random].sort((a, b) => b - a)); // [100, 40, 5, 1]
```

#### `reverse`

> Syntax: `array.reverse()`
> Reverses the order in the **existing array**. Returns the same array.

```javascript
const reverseNumbers = [1, 2, 3, 4];
reverseNumbers.reverse();
console.log(reverseNumbers); // [4, 3, 2, 1]
```

#### `flat`

> Syntax: `array.flat(depth?)`
> Flattens nested arrays into a **new array**. Original array is not changed.

```javascript
const nested = [1, [2, 3], [4, [5, 6]]];
console.log(nested.flat());   // [1, 2, 3, 4, [5, 6]]
console.log(nested.flat(2));  // [1, 2, 3, 4, 5, 6]
```

#### `flatMap`

> Syntax: `array.flatMap((element, index?, array?) => newValue)`
> Maps each item, then flattens the result by one level into a **new array**. Original array is not changed.

```javascript
const sentences = ["Hello world", "Good morning"];
const words = sentences.flatMap((s) => s.split(" "));
console.log(words); // ["Hello", "world", "Good", "morning"]
```

#### `reduce` (sum)

> Syntax: `array.reduce((accumulator, current, index?, array?) => ..., initialValue)`
> Combines all items into a **single value**. Can return a number, string, array, or object.

```javascript
const total = marks.reduce((sum, mark) => sum + mark, 0);
console.log(total); // 220
```

#### `reduce` (build object)

> Same syntax as above. Initial value can be an object `{}`.
> Builds a **new object** as the final result.

```javascript
const wordList = ["a", "b", "a", "c", "b", "a"];
const counts = wordList.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
console.log(counts); // { a: 3, b: 2, c: 1 }
```

#### Chaining methods together

```javascript
const result = marks
  .filter((mark) => mark >= 40)
  .map((mark) => mark + 5)
  .reduce((sum, mark) => sum + mark, 0);

console.log(result); // 165
```

#### `forEach` vs `map`

```javascript
// forEach: no new array
const sideEffects = [];
marks.forEach((m) => sideEffects.push(m * 2));

// map: new array
const doubled2 = marks.map((m) => m * 2);
```

#### Sorting products by price

```javascript
const products = [
  { name: "Phone", price: 1200 },
  { name: "Watch", price: 200 },
  { name: "Laptop", price: 1500 }
];

const byPrice = [...products].sort((a, b) => b.price - a.price);
console.log(byPrice.map((p) => p.name)); // ["Laptop", "Phone", "Watch"]
```

#### Cleaning messy data

```javascript
const mixed = [80, 45, null, 30, undefined, 70, "absent", 90];
const cleanTotal = mixed
  .filter((m) => typeof m === "number" && !isNaN(m))
  .map((m) => (m < 40 ? 40 : m))
  .reduce((sum, m) => sum + m, 0);
console.log(cleanTotal); // 325
```

### Array Destructuring

#### Simple: Destructuring basics

```javascript
const [first, second] = ["apple", "banana", "mango"];
console.log(first, second); // "apple" "banana"
```

#### Complicated: Skipping, defaults, and rest

```javascript
const languages = ["HTML", "CSS", "JS", "Python"];

// Skip, default, and gather the rest
const [, second, third = "none", ...others] = languages;
console.log(second, third, others); // "CSS" "JS" ["Python"]

// Swap two variables (no temp variable needed)
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2 1
```

#### Complicated: Flattening nested arrays

```javascript
const nested = [[1, 2], [3, [4]], [5]];
console.log(nested.flat());   // [1, 2, 3, [4], 5]
console.log(nested.flat(2));  // [1, 2, 3, 4, 5]

// Practical: UI tags from a list of products
const products = [
  { name: "Laptop", tags: ["tech", "work"] },
  { name: "Mouse", tags: ["tech", "gaming"] }
];
const allTags = products.map((p) => p.tags).flat();
console.log(allTags); // ["tech", "work", "tech", "gaming"]

// Same with flatMap (shorter)
const allTags2 = products.flatMap((p) => p.tags);
console.log(allTags2); // ["tech", "work", "tech", "gaming"]
```

### More Examples

#### `.at()` — read with negative index

> Returns the item at an index. Supports negative values (`-1` = last item).

```javascript
const arrAt = [10, 20, 30, 40];
console.log(arrAt.at(0));   // 10
console.log(arrAt.at(-1));  // 40
console.log(arrAt.at(-2));  // 30
console.log(arrAt.at(9));   // undefined (out of range)
```

#### `.lastIndexOf()`

> Like `indexOf`, but returns the **last** position of a value, or `-1`.

```javascript
const items2 = ["a", "b", "a", "c"];
console.log(items2.lastIndexOf("a")); // 2
console.log(items2.lastIndexOf("z")); // -1
```

#### `.fill()`

> Fills the array (or a range) with a value. **Mutates** the array.

```javascript
const filled = new Array(4).fill("x");
console.log(filled); // ["x", "x", "x", "x"]

const nums2 = [1, 2, 3, 4];
nums2.fill(0, 1, 3);       // start=1, end=3
console.log(nums2);        // [1, 0, 0, 4]
```

#### `Array.from()`

> Creates a new array from any iterable (Set, string, arguments, ...).

```javascript
const fromSet = Array.from(new Set([1, 2, 2, 3]));
console.log(fromSet); // [1, 2, 3]  (duplicates removed)

const fromString = Array.from("hello");
console.log(fromString); // ["h", "e", "l", "l", "o"]

// Optional map function
const fromMap = Array.from([1, 2, 3], (n) => n * 2);
console.log(fromMap); // [2, 4, 6]
```

#### `keys()`, `values()`, `entries()`

> Loop helpers that return iterators over indexes, values, or index/value pairs.

```javascript
const chars = ["x", "y"];

console.log([...chars.keys()]);       // [0, 1]
console.log([...chars.values()]);     // ["x", "y"]
console.log([...chars.entries()]);    // [[0, "x"], [1, "y"]]

// Practical: index + value in a loop
for (const [index, value] of chars.entries()) {
  console.log(`${index}: ${value}`);  // "0: x" then "1: y"
}
```

### Real-world: Student Grade Analysis

```javascript
const students = [
  { id: 1, name: "Rohit", marks: [85, 78, 92] },
  { id: 2, name: "Priya", marks: [95, 88, 90] },
  { id: 3, name: "Amit", marks: [45, 50, 40] },
  { id: 4, name: "Neha", marks: [88, 92, 85] }
];

// Calculate average for each student
const studentAverages = students.map((student) => ({
  name: student.name,
  average: (student.marks.reduce((sum, m) => sum + m, 0) / student.marks.length).toFixed(2)
}));

console.log(studentAverages);
// [
//   { name: "Rohit", average: "85.00" },
//   { name: "Priya", average: "91.00" },
//   { name: "Amit", average: "45.00" },
//   { name: "Neha", average: "88.33" }
// ]

// Find students who passed (average >= 50)
const passedStudents = studentAverages.filter((s) => parseFloat(s.average) >= 50);
console.log(passedStudents.length); // 3

// Get top performer
const topStudent = studentAverages.reduce((top, current) =>
  parseFloat(current.average) > parseFloat(top.average) ? current : top
);
console.log(topStudent); // { name: "Priya", average: "91.00" }
```

### Real-world: E-commerce Cart Processing

```javascript
const cart = [
  { product: "Keyboard", price: 5000, quantity: 1, discount: 0.05 },
  { product: "Mouse", price: 800, quantity: 2, discount: 0.10 },
  { product: "Monitor", price: 15000, quantity: 1, discount: 0.0 }
];

// Calculate subtotal for each item
const itemTotals = cart.map((item) => ({
  product: item.product,
  itemTotal: item.price * item.quantity,
  discountAmount: (item.price * item.quantity * item.discount).toFixed(2),
  finalPrice: (item.price * item.quantity * (1 - item.discount)).toFixed(2)
}));

console.log(itemTotals);
// [
//   { product: "Keyboard", itemTotal: 5000, discountAmount: "250.00", finalPrice: "4750.00" },
//   { product: "Mouse", itemTotal: 1600, discountAmount: "160.00", finalPrice: "1440.00" },
//   { product: "Monitor", itemTotal: 15000, discountAmount: "0.00", finalPrice: "15000.00" }
// ]

// Calculate total
const cartTotal = cart.reduce((total, item) => {
  const itemFinalPrice = item.price * item.quantity * (1 - item.discount);
  return total + itemFinalPrice;
}, 0);

const tax = cartTotal * 0.18;
const grandTotal = cartTotal + tax;

console.log(`\nCart Total: ₹${cartTotal.toFixed(2)}`);
console.log(`GST (18%): ₹${tax.toFixed(2)}`);
console.log(`Grand Total: ₹${grandTotal.toFixed(2)}`);
```

### Real-world: Finding Duplicates and Counts

```javascript
const orders = [
  { id: 101, product: "Laptop", quantity: 1 },
  { id: 102, product: "Mouse", quantity: 3 },
  { id: 103, product: "Laptop", quantity: 2 },
  { id: 104, product: "Keyboard", quantity: 1 },
  { id: 105, product: "Mouse", quantity: 1 }
];

// Count products ordered
const productCounts = orders.reduce((counts, order) => {
  counts[order.product] = (counts[order.product] || 0) + order.quantity;
  return counts;
}, {});

console.log(productCounts);
// { Laptop: 3, Mouse: 4, Keyboard: 1 }

// Find most ordered product
const mostOrdered = Object.entries(productCounts).sort((a, b) => b[1] - a[1])[0];
console.log(`Most ordered: ${mostOrdered[0]} (${mostOrdered[1]} units)`);
// Most ordered: Mouse (4 units)
```

### 🧪 Self-Test — Arrays

**Q1. Does `marks.map(m => m * 2)` change the original `marks` array?**

- ✅ No — `map` returns a brand-new array; the original stays exactly the same.
- ❌ Yes — only `push`, `pop`, `splice`, `sort`, `reverse`, `fill` etc. mutate in place.

**Q2. What does `[1, 10, 2].sort()` return?**

- ✅ `[1, 10, 2]` — sorted as STRINGS ("1" < "10" < "2")! Fix: `.sort((a, b) => a - b)`.

**Q3. What does `[].filter(...)` return when nothing matches?**

- ✅ An empty array `[]` — never `null` or `undefined`, so chaining is always safe.

## 10. Strings and Common Methods

> 🚩 **Why it matters:** formatting prices, URLs, names, and user input — string methods do the everyday cleanup in every app.

Strings are **immutable** in JavaScript. Every method that "changes" a string actually returns a **new string**; the original is not modified.

```javascript
let firstName = "Rohit";
let lastName = "Kumar";
let fullName = firstName + " " + lastName;
let greeting = `Hello, ${firstName}!`;
```

### Quick reference table

| Method                     | Purpose                              | Returns          |
|----------------------------|--------------------------------------|------------------|
| `.length`                  | Number of characters                 | number           |
| `.toUpperCase()`           | Convert to uppercase                 | new string       |
| `.toLowerCase()`           | Convert to lowercase                 | new string       |
| `.trim()`                  | Remove whitespace from both ends     | new string       |
| `.trimStart()`             | Remove whitespace from start         | new string       |
| `.trimEnd()`               | Remove whitespace from end           | new string       |
| `.includes(sub)`           | Check if substring exists            | true/false       |
| `.startsWith(sub)`         | Check if it starts with substring    | true/false       |
| `.endsWith(sub)`           | Check if it ends with substring      | true/false       |
| `.indexOf(sub)`            | Position of first occurrence         | index or -1      |
| `.lastIndexOf(sub)`        | Position of last occurrence          | index or -1      |
| `.slice(start, end?)`      | Extract part of string               | new string       |
| `.substring(start, end?)`  | Extract part (no negatives)          | new string       |
| `.substr(start, length?)`  | Extract by length (deprecated)      | new string       |
| `.replace(old, new)`       | Replace first match                  | new string       |
| `.replaceAll(old, new)`    | Replace all matches                  | new string       |
| `.split(separator?)`       | Split into array                     | array            |
| `.concat(other)`           | Join strings                         | new string       |
| `.repeat(count)`           | Repeat string N times                | new string       |
| `.padStart(len, pad?)`     | Pad to length at start               | new string       |
| `.padEnd(len, pad?)`       | Pad to length at end                 | new string       |
| `.charAt(index)`           | Character at index                   | string           |
| `.charCodeAt(index)`       | Unicode of character                 | number           |
| `.at(index)`               | Character at index (supports `-1`)   | string           |
| `.match(regex)`            | Match against regex                  | array or null    |
| `.search(regex)`           | Index of regex match                 | index or -1      |
| `.localeCompare(other)`    | Compare strings for sorting          | number           |

### Template literals — build strings the modern way

> Backtick strings do three things quotes can't: interpolate expressions with `${}`, span multiple lines, and read much cleaner. You've seen them all through this book — now you know the name.

```javascript
const name = "Rohit";
const cartTotal = 499.5;

// 1. Interpolation — ANY expression inside ${ }
console.log(`Hi ${name}!`);                                 // "Hi Rohit!"
console.log(`Total: ₹${cartTotal}`);                        // "Total: ₹499.5"
console.log(`With GST: ₹${(cartTotal * 1.18).toFixed(2)}`); // "With GST: ₹589.41"

// 2. Multi-line — no \n, no concatenation
const receipt = `
=== Receipt ===
Customer: ${name}
Total:    ₹${cartTotal.toFixed(2)}
`;
console.log(receipt);

// 3. Expressions, not just variables
const items = ["pen", "book"];
console.log(`You have ${items.length} item(s): ${items.join(", ")}`);
// "You have 2 item(s): pen, book"
```

### Examples

#### `.length`

> Returns the **number of characters**. Original string is not changed.

```javascript
const text = "Hello";
console.log(text.length); // 5
```

#### `.toUpperCase()` and `.toLowerCase()`

> Return a **new string** with the case changed. Original is not modified.

```javascript
const city = "Delhi";
console.log(city.toUpperCase()); // "DELHI"
console.log(city.toLowerCase()); // "delhi"
console.log(city);               // "Delhi"
```

#### `.trim()`, `.trimStart()`, `.trimEnd()`

> Return a **new string** with whitespace removed. Useful for cleaning user input.

```javascript
const input = "  hello  ";
console.log(input.trim());       // "hello"
console.log(input.trimStart());  // "hello  "
console.log(input.trimEnd());    // "  hello"
```

#### `.includes()`

> Returns `true` or `false` depending on whether the substring exists. Case-sensitive.

```javascript
const sentence = "I love JavaScript";
console.log(sentence.includes("Java"));     // true
console.log(sentence.includes("java"));     // false
```

#### `.startsWith()` and `.endsWith()`

> Useful for checking prefixes and suffixes like file extensions or URL parts.

```javascript
const filename = "report.pdf";
console.log(filename.startsWith("report")); // true
console.log(filename.endsWith(".pdf"));     // true
```

#### `.indexOf()` and `.lastIndexOf()`

> Return the **first or last position** of a substring. Return `-1` if not found.

```javascript
const phrase = "banana";
console.log(phrase.indexOf("a"));       // 1
console.log(phrase.lastIndexOf("a"));   // 5
console.log(phrase.indexOf("z"));       // -1
```

#### `.slice()`

> Extracts part of a string into a **new string**. Supports negative indexes.

```javascript
const name = "JavaScript";
console.log(name.slice(0, 4));   // "Java"
console.log(name.slice(4));      // "Script"
console.log(name.slice(-3));     // "ipt"
```

#### `.substring()`

> Similar to `slice`, but does **not** accept negative indexes. Negative values are treated as `0`.

```javascript
const name = "JavaScript";
console.log(name.substring(0, 4)); // "Java"
console.log(name.substring(4));    // "Script"
```

#### `.replace()` and `.replaceAll()`

> Replace the **first** or **all** matches. By default the search is case-sensitive.

```javascript
const text = "Hello World";
console.log(text.replace("World", "JS"));     // "Hello JS"
console.log(text.replaceAll("l", "L"));       // "HeLLo WorLd"

// Case-insensitive with regex
console.log(text.replace(/world/i, "JS"));    // "Hello JS"
```

#### `.split()`

> Splits the string into a **new array** using a separator.

```javascript
const csv = "apple,banana,mango";
console.log(csv.split(","));      // ["apple", "banana", "mango"]

const word = "hello";
console.log(word.split(""));      // ["h", "e", "l", "l", "o"]

const sentence = "I love JS";
console.log(sentence.split(" "));  // ["I", "love", "JS"]

```

#### `.concat()`

> Joins two or more strings. `+` is usually simpler.

```javascript
const first = "Hello";
const result = first.concat(" ", "World");
console.log(result); // "Hello World"
```

#### `.repeat()`

> Repeats the string N times. Returns a **new string**.

```javascript
console.log("ha".repeat(3)); // "hahaha"
```

#### `.padStart()` and `.padEnd()`

> Pad the string to a target length. Useful for aligning IDs or numbers.

```javascript
const id = "7";
console.log(id.padStart(4, "0")); // "0007"
console.log(id.padEnd(4, "*"));   // "7***"
```

#### `.localeCompare()`

> The right way to compare/sort strings — respects case and accented letters, unlike `<` or a plain `.sort()`.

```javascript
console.log("a".localeCompare("b")); // -1 (a sorts first)
console.log("b".localeCompare("a")); // 1  (b sorts after)
console.log("é".localeCompare("e")); // 1  (accent-aware)

// Default .sort() puts ALL capitals first; localeCompare fixes it:
console.log(["apple", "Banana", "cherry"].sort()); // ["Banana", "apple", "cherry"] 😕
console.log(["apple", "Banana", "cherry"].sort((a, b) => a.localeCompare(b)));
// ["apple", "Banana", "cherry"] ✅
```

#### `.charAt()` and `.charCodeAt()`

> Get a single character or its Unicode code.

```javascript
const word = "Hello";
console.log(word.charAt(0));       // "H"
console.log(word.charCodeAt(0));   // 72
```

#### `.at()`

> Like `charAt`, but **supports negative indexes**.

```javascript
const word = "Hello";
console.log(word.at(-1)); // "o"
console.log(word.at(0));  // "H"
```

#### `.match()` and `.search()`

> Work with regular expressions. `.match` returns matches as an array, `.search` returns the index.

```javascript
const text = "Order #1234 placed";
console.log(text.match(/\d+/));    // ["1234"]
console.log(text.search(/\d+/));   // 7
```

### More Examples

#### `.substring()` vs `.slice()` — negative indexes

```javascript
console.log("hello".slice(-2));       // "lo"   (slice supports negatives)
console.log("hello".substring(-2));   // "hello" (substring treats -2 as 0)
console.log("hello".substring(1, 3)); // "el"   (can swap start/end)
```

#### `.match()` with the global flag

```javascript
const matchText = "a1 b2 c3";
console.log(matchText.match(/\d/g)); // ["1", "2", "3"]  (all digits, not just first)
```

#### `.replace()` with a function — reformatting a date

```javascript
const dateStr = "2024-05-06";
const reformattedDate = dateStr.replace(
  /(\d{4})-(\d{2})-(\d{2})/,
  (match, year, month, day) => `${day}/${month}/${year}`
);
console.log(reformattedDate); // "06/05/2024"
```

#### `.split()` with regex and limit

```javascript
console.log("one, two; three".split(/[,;]\s*/)); // ["one", "two", "three"]
console.log("a-b-c-d".split("-", 2));            // ["a", "b"]
```

#### `.search()` returns `-1` when not found

```javascript
console.log("no digits here".search(/\d/)); // -1
```

#### Combining string methods on user input

```javascript
const messyInput = "  Hello World  ";
console.log(messyInput.trim().includes("World")); // true

const orderId = "7";
console.log(orderId.padStart(3, "0")); // "007"

console.log("ab".repeat(2).split("")); // ["a", "b", "a", "b"]
```

#### Real-world snippets

##### Validate email shape

```javascript
const email = "user@example.com";
console.log(email.includes("@") && email.endsWith(".com")); // true
```

##### Get file extension

```javascript
const file = "photo.png";
const ext = file.slice(file.lastIndexOf(".") + 1);
console.log(ext); // "png"
```

##### Capitalize first letter

```javascript
const word = "javascript";
const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
console.log(capitalized); // "Javascript"
```

##### Convert CSV line to array of values

```javascript
const line = "name,age,city";
const values = line.split(",");
console.log(values); // ["name", "age", "city"]
```

##### Mask part of a phone number

```javascript
const phone = "9876543210";
const masked = phone.slice(0, 4) + "*".repeat(4) + phone.slice(-2);
console.log(masked); // "9876****10"
```

##### Count words in a sentence

```javascript
const sentence = "I love JavaScript";
const count = sentence.split(" ").length;
console.log(count); // 3
```

##### Truncate long text

```javascript
const longText = "This is a very long description";
const short = longText.length > 15 ? longText.slice(0, 15) + "..." : longText;
console.log(short); // "This is a very ..."
```

#### Simple: Reversing a string

```javascript
const word = "JavaScript";
const reversed = word.split("").reverse().join("");
console.log(reversed); // "tpircSavaJ"
```

#### Complicated: Extracting and transforming parts

```javascript
const invoice = "INV-2024-0042";

// Split into parts
const parts = invoice.split("-");
console.log(parts); // ["INV", "2024", "0042"]

// Rebuild in a different format
const reformatted = `${parts[2]}/${parts[1]}`;
console.log(reformatted); // "0042/2024"

// Replace + pad combined
const invoiceNum = invoice.slice(-4);
console.log(invoiceNum.padStart(6, "0")); // "000042"
```

#### Complicated: Email domain extraction with fallback

```javascript
const emails = ["rohit@example.com", "invalid-email", "priya@company.co.in"];

emails.forEach((email) => {
  if (email.includes("@") && !email.startsWith("@") && !email.endsWith("@")) {
    const domain = email.slice(email.indexOf("@") + 1);
    console.log(`${email}  ->  domain: ${domain}`);
  } else {
    console.log(`${email}  ->  invalid`);
  }
});
// "rohit@example.com  ->  domain: example.com"
// "invalid-email  ->  invalid"
// "priya@company.co.in  ->  domain: company.co.in"
```

### Advanced Real-world Examples

#### URL Slug Generation

```javascript
const title = "Best JavaScript Learning Tips 2024";

const slug = title
  .toLowerCase()
  .trim()
  .replace(/[^\w\s-]/g, "")  // Remove special characters
  .replace(/\s+/g, "-")        // Replace spaces with hyphens
  .replace(/-+/g, "-");        // Replace multiple hyphens with single

console.log(slug); // "best-javascript-learning-tips-2024"
```

#### Password Strength Validator

```javascript
function validatePasswordStrength(password) {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*]/.test(password)
  };

  const passedChecks = Object.values(checks).filter(Boolean).length;

  return {
    isValid: passedChecks >= 4,
    strength: passedChecks <= 2 ? "Weak" : passedChecks === 3 ? "Medium" : "Strong",
    checks: checks
  };
}

console.log(validatePasswordStrength("Pass@123"));
// { isValid: true, strength: "Strong", checks: { ... } }
```

#### Email Parsing

```javascript
const email = "john.doe@company.co.uk";

const [username, domain] = email.split("@");
const [subdomain, ...extension] = domain.split(".");

console.log({
  username,      // "john.doe"
  domain,        // "company.co.uk"
  subdomain,     // "company"
  extension: extension.join(".") // "co.uk"
});
```

#### Query String Parser

```javascript
const queryString = "?name=Rohit&age=25&city=Delhi";

const params = queryString
  .slice(1)  // Remove "?"
  .split("&")
  .reduce((obj, pair) => {
    const [key, value] = pair.split("=");
    obj[key] = decodeURIComponent(value);
    return obj;
  }, {});

console.log(params); // { name: "Rohit", age: "25", city: "Delhi" }
```

#### Text Statistics

```javascript
const text = "JavaScript is awesome. JavaScript is powerful. JavaScript is fun!";

const wordCount = text.split(/\s+/).length;
const sentenceCount = text.split(/[.!?]+/).filter(s => s.trim()).length;
const characterCount = text.replace(/\s/g, "").length;
const averageWordLength = (text.replace(/\s/g, "").length / wordCount).toFixed(2);

console.log({
  wordCount,           // 9
  sentenceCount,       // 3
  characterCount,      // 57
  averageWordLength    // "6.33"
});
```

### Split only once — `"i-l-s"` → `["i", "l-s"]`

`split("-", 2)` **drops** the rest (`["i","l"]`) — it does not keep it together. To split at only the **first** separator:

```javascript
// Way 1 (recommended): split + rest + join
const input = "i-l-s";
const [first, ...restParts] = input.split("-");
console.log([first, restParts.join("-")]); // ["i", "l-s"]

// Way 2: indexOf + slice
const idx = input.indexOf("-");
console.log([input.slice(0, idx), input.slice(idx + 1)]); // ["i", "l-s"]

// Edge case: no separator at all
const [head, ...tail] = "abc".split("-");
console.log([head, tail.join("-")]); // ["abc", ""]
```

> 💡 **Real-world:** parse settings like `"color=blue"` this way — the value itself may contain `=`, so split on the **first** one only.

```javascript
const setting = "color=blue";
const eqIndex = setting.indexOf("=");
console.log([setting.slice(0, eqIndex), setting.slice(eqIndex + 1)]);
// ["color", "blue"]
```

### 🧪 Self-Test — Strings

**Q1. What does `"hello"[-1]` return?**

- ✅ `undefined` — negative indexes don't work with `[]`; use `.at(-1)` instead.

**Q2. After `const s = " hi ".trim();` — what is `s`, and did `" hi "` change?**

- ✅ `s` is `"hi"`, and the original string is unchanged — strings are immutable; methods return new strings.

**Q3. What does `"a-b-c".split("-", 2)` return?**

- ✅ `["a", "b"]` — the limit *drops* the rest, it does NOT keep "b-c" together. Use split + rest to split once.

---

## 11. Objects

> 🚩 **Why it matters:** JSON — the format of every API — *is* JS objects; reading/writing them is how you talk to any server.

### Basic Object Operations

```javascript
let student = {
  name: "Rohit",
  age: 25,
  course: "JS"
};

console.log(student.name);    // dot notation
console.log(student["name"]); // bracket notation

student.city = "Delhi";
student.age = 26;

delete student.course;

"name" in student; // true
```

### `for...in` loop

```javascript
for (let key in student) {
  console.log(key, student[key]);
}
// Output:
// name Rohit
// age 26
// city Delhi
```

### Built-in helpers

```javascript
Object.keys(student);   // ["name", "age", "city"]
Object.values(student); // ["Rohit", 26, "Delhi"]
Object.entries(student);
// [["name", "Rohit"], ["age", 26], ["city", "Delhi"]]
```

#### 🔁 Loop over entries the modern way

`Object.entries` + `for...of` + destructuring:

```javascript
const student = { name: "Rohit", age: 26, city: "Delhi" };
for (const [key, value] of Object.entries(student)) {
  console.log(key + ": " + value);
}
// name: Rohit
// age: 26
// city: Delhi
```

### Methods and `this`

> A method is a function stored in an object. Inside a shorthand method, `this` means **"the object before the dot"** at call time.

```javascript
const account = {
  owner: "Rohit",
  balance: 1000,
  // shorthand method — no ": function" needed
  deposit(amount) {
    this.balance += amount;   // this === account
    return this.balance;
  },
  describe() {
    return `${this.owner} has ₹${this.balance}`;
  }
};

console.log(account.deposit(500)); // 1500
console.log(account.describe());   // "Rohit has ₹1500"

// ⚠️ Arrow functions do NOT get their own `this` —
// use shorthand/regular methods when you need it.
```

### Copying

```javascript
let copy1 = { ...student };
let copy2 = Object.assign({}, student);
```

### Real-world: User Authentication Object

```javascript
const user = {
  id: 12345,
  email: "user@example.com",
  password: "hashed_password",
  profile: {
    firstName: "Rohit",
    lastName: "Kumar",
    avatar: "https://example.com/avatar.jpg",
    bio: "JavaScript Developer"
  },
  settings: {
    theme: "dark",
    notifications: true,
    language: "en"
  },
  createdAt: new Date("2023-01-15"),
  lastLogin: new Date(),
  isActive: true
};

// Access nested properties
console.log(user.profile.firstName);  // "Rohit"
console.log(user.settings.theme);     // "dark"

// Update nested property
user.settings.theme = "light";
user.lastLogin = new Date();

// Check multiple conditions
const isValidUser = user.isActive && user.email.includes("@");
console.log(isValidUser); // true
```

### Real-world: E-commerce Product Object

```javascript
const product = {
  id: "PROD-001",
  name: "Wireless Keyboard",
  price: 3500,
  currency: "INR",
  stock: 150,
  category: "Electronics",
  subcategory: "Input Devices",
  description: "Premium mechanical keyboard with RGB lighting",
  specifications: {
    brand: "TechPro",
    color: "Black",
    switchType: "MechSwitch",
    layout: "Full Size",
    connectivity: "Wireless",
    batteryLife: "40 hours"
  },
  pricing: {
    original: 5000,
    discount: 0.30,
    finalPrice: 3500,
    taxRate: 0.18
  },
  ratings: {
    average: 4.5,
    count: 2145,
    distribution: {
      5: 1500,
      4: 450,
      3: 150,
      2: 30,
      1: 15
    }
  },
  images: [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg",
    "https://example.com/img3.jpg"
  ],
  inStock: true,
  reviews: [
    { user: "John", rating: 5, comment: "Excellent keyboard!" },
    { user: "Sarah", rating: 4, comment: "Good quality, minor issues" }
  ]
};

// Calculate final price with tax
const finalPriceWithTax = product.pricing.finalPrice * (1 + product.pricing.taxRate);
console.log(`Final Price: ₹${finalPriceWithTax.toFixed(2)}`); // ₹4130.00

// Calculate average rating from distribution
const totalRatings = Object.values(product.ratings.distribution).reduce((a, b) => a + b, 0);
console.log(`Total Reviews: ${totalRatings}`); // 2145
```

### Real-world: Order Processing Object

```javascript
const order = {
  orderId: "ORD-2024-001",
  customer: {
    id: "CUST-001",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543210",
    address: {
      street: "123 MG Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    }
  },
  items: [
    { productId: "PROD-001", name: "Keyboard", price: 3500, quantity: 1 },
    { productId: "PROD-002", name: "Mouse", price: 1200, quantity: 2 },
    { productId: "PROD-003", name: "Monitor", price: 12000, quantity: 1 }
  ],
  pricing: {
    subtotal: 0,
    taxRate: 0.18,
    shippingCost: 200,
    discount: 0,
    total: 0
  },
  status: "pending",
  payment: {
    method: "credit_card",
    status: "completed",
    transactionId: "TXN-12345"
  },
  shippingDetails: {
    method: "express",
    estimatedDelivery: new Date("2024-01-25"),
    trackingNumber: "TRACK123456"
  },
  createdAt: new Date(),
  updatedAt: new Date()
};

// Calculate subtotal
order.pricing.subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

// Calculate total with tax and shipping
order.pricing.total = order.pricing.subtotal + (order.pricing.subtotal * order.pricing.taxRate) + order.pricing.shippingCost - order.pricing.discount;

console.log(order.pricing);
// { subtotal: 17900, taxRate: 0.18, shippingCost: 200, discount: 0, total: 21322 }

// Get order summary
const orderSummary = {
  orderId: order.orderId,
  customerName: order.customer.name,
  itemCount: order.items.length,
  status: order.status,
  total: order.pricing.total,
  shippingAddress: `${order.customer.address.street}, ${order.customer.address.city}`
};

console.log(orderSummary);
```

### Real-world: Merging Objects (Shallow and Deep)

```javascript
const userDefaults = {
  theme: "light",
  language: "en",
  notifications: true
};

const userPreferences = {
  theme: "dark",
  fontSize: 14
};

// Merge with spread operator (shallow)
const mergedSettings = { ...userDefaults, ...userPreferences };
console.log(mergedSettings);
// { theme: "dark", language: "en", notifications: true, fontSize: 14 }

// Object.assign
const merged2 = Object.assign({}, userDefaults, userPreferences);
console.log(merged2); // Same result as above
```

### Real-world: Extracting Data from Objects

```javascript
const userData = {
  id: 1,
  name: "Rohit",
  email: "rohit@example.com",
  profile: { bio: "Developer", location: "Delhi" },
  settings: { theme: "dark", notifications: true }
};

// Extract specific keys
const { name, email } = userData;
console.log(name, email); // "Rohit" "rohit@example.com"

// Extract nested property
const { profile: { bio } } = userData;
console.log(bio); // "Developer"

// Get all values for display
const displayInfo = Object.entries(userData)
  .filter(([key]) => !key.includes("settings"))
  .map(([key, value]) => `${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`);

console.log(displayInfo);
// ["id: 1", "name: Rohit", "email: rohit@example.com", ...]
```

### More Examples

#### Simple: Computed property keys

```javascript
const langKey = "language";
const userPrefs = {
  [langKey]: "English",       // key comes from a variable
  theme: "dark"
};
console.log(userPrefs.language); // "English"
```

#### Complicated: Destructuring with default values

```javascript
const settings = { theme: "dark", fontSize: 14 };

// Pull values out, with a fallback if a key is missing
const { theme = "light", fontSize = 12, notifications = true } = settings;
console.log(theme, fontSize, notifications);
// "dark", 14, true  (notifications was missing, so default applied)

// Rename while destructuring
const { theme: colorScheme } = settings;
console.log(colorScheme); // "dark"
```

#### Complicated: Nested destructuring with rest

```javascript
const apiResponse = {
  status: 200,
  data: {
    id: 55,
    profile: { name: "Rohit", city: "Delhi" }
  }
};

const {
  status,
  data: { id, profile: { name } },
  ...meta
} = apiResponse;

console.log(status, id, name); // 200, 55, "Rohit"
console.log(meta); // {} (nothing left over)
```

#### Complicated: Checking if a key exists

```javascript
const product = { id: 101, name: "Laptop" };

console.log("name" in product);  // true
console.log("price" in product); // false

// Guard before accessing (avoids 'undefined' surprise)
if ("price" in product) {
  console.log(product.price);
} else {
  console.log("price key missing"); // runs
}
```

### 🧪 Self-Test — Objects

**Q1. Inside a method, what does `this` refer to?**

- ✅ The object **before the dot** at call time — `account.deposit()` makes `this` = `account`.
- ❌ The function itself / the global object — `this` is decided by the call, not the definition.

**Q2. What does `Object.keys({ a: 1, b: 2 })` return?**

- ✅ `["a", "b"]` — an array of the keys.
- ❌ `[1, 2]` — that's `Object.values`.

**Q3. When is bracket notation required instead of a dot?**

- ✅ When the key is dynamic or has spaces — `user["first name"]`, `user[keyName]`.
- ❌ Never — dot always works — it fails on keys with spaces or from variables.

---

## 12. Symbols Cheat Sheet

| Symbol           | Purpose                                  |
|------------------|------------------------------------------|
| `()`             | Parameters, conditions, function calls   |
| `{}`             | Code block, function body, or object     |
| `[]`             | Array literal or index/property access   |
| `=>`             | Defines an arrow function                |
| `...`            | Spread or rest operator                  |
| `? :`            | Ternary: short `if...else`               |
| `??`             | Nullish coalescing                       |
| `?.`             | Optional chaining                        |
| `&&` `\|\|` `!`  | Logical AND, OR, NOT                     |
| `=` `+=` `-=` ... | Assignment operators                     |
| `===` `!==`      | Strict equality / inequality             |
| `typeof`         | Check datatype                           |
| `**`          | Power (exponent): `2 ** 10`             | number           |
| `delete`         | Remove an object property                |

### Symbols in action - combined example

```javascript
const user = { name: "Rohit", prefs: { theme: null } };

// Arrow (=>) + template literal () + optional chaining (?.) + nullish (??)
const themeLabel = (u) => `${u.name} uses ${u.prefs?.theme ?? "light"} theme`;
console.log(themeLabel(user)); // "Rohit uses light theme"

// Spread (...) to copy an object
const copy = { ...user, prefs: { ...user.prefs, lang: "en" } };
console.log(copy); // { name: "Rohit", prefs: { theme: null, lang: "en" } }

// Ternary (? :) + typeof
const price = "150";
console.log(typeof price === "number" ? "number" : "string"); // "string"
```

### Rest vs Spread — the two faces of `...`

| Where `...` appears | Name | What it does |
|---------------------|------|--------------|
| Left of `=` (destructuring, params) | **Rest** | Collects remaining values **into** an array/object |
| Right side (literals, calls) | **Spread** | Pulls values **out** to spread them somewhere else |

```javascript
// REST — collecting
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);                    // 1 [2,3,4]

const sum = (...nums) => nums.reduce((t, n) => t + n, 0);
console.log(sum(1, 2, 3, 4));               // 10

const { name, ...details } = { name: "Rohit", age: 25, city: "Delhi" };
console.log(name, details);                 // "Rohit" { age: 25, city: "Delhi" }

// SPREAD — expanding
console.log([1, 2, ...[3, 4, 5]]);          // [1,2,3,4,5]
const original = [1, 2, 3];
const copy = [...original];
console.log(copy, copy === original);       // [1,2,3] false (new array, same values)

const base = { theme: "dark" };
const merged = { ...base, fontSize: 16, lang: "en" };
console.log(merged);                        // {"theme":"dark","fontSize":16,"lang":"en"}
```

## 13. Common Pitfalls

> 🚩 **Why it matters:** these are the classic bugs that confuse beginners — recognizing them saves hours of head-scratching.

> 🚨 **The #1 trap:** `[10, 1, 2].sort()` sorts numbers as **strings**. Always pass a compare function: `.sort((a, b) => a - b)`.

### 1. `=` vs `===` (assignment inside a condition)

```javascript
let z = 1;
if ((z = 0)) {        // ⚠️ assigns 0, then checks truthiness
  console.log("truthy");
} else {
  console.log("falsy, z =", z); // falsy, z = 0  (z was overwritten!)
}
```

### 2. Sorting numbers without a compare function

```javascript
const nums = [1, 10, 2, 30];
console.log(nums.sort());                  // [1, 10, 2, 30]  (string order!)
console.log([...nums].sort((a, b) => a - b)); // [1, 2, 10, 30]  ✅
```

### 3. `push` returns the new length, not the array

```javascript
const list = [1, 2];
const result = list.push(3);
console.log(result);        // 3  (the length!)
list.push(3);               // correct usage: ignore the return, use `list`
console.log(list);          // [1, 2, 3]
```

### 4. Missing `break` in `switch` (fall-through)

```javascript
const fruit = "apple";
switch (fruit) {
  case "banana":
    console.log("Banana selected");
  case "apple":
    console.log("Apple selected"); // runs — AND falls through (no break!)
  case "mango":
    console.log("Mango selected"); // also runs!
    break;
  default:
    console.log("Unknown");
}
// Apple selected
// Mango selected   ← "mango" case ran even though fruit is "apple"
```

### 5. Floating-point precision

```javascript
console.log(0.1 + 0.2);               // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);       // false
console.log((0.1 + 0.2).toFixed(2));  // "0.30" ✅
```

### 6. `map` without a `return` (arrow with `{}` needs `return`)

```javascript
const nums2 = [1, 2, 3];
console.log(nums2.map((n) => { n * 2 }));  // [undefined, undefined, undefined]
const fixed = nums2.map((n) => { return n * 2; }); // or just (n) => n * 2
console.log(fixed);                        // [2, 4, 6] ✅
```

### 7. `const` does NOT freeze objects/arrays

```javascript
const colors = ["red"];
colors.push("yellow");
console.log(colors.join(" ")); // "red yellow" — const only locks the binding
```

### 8. `typeof null` is `"object"` (a historical bug)

```javascript
console.log(typeof null); // "object" — use value === null to check
```

### 9. Reading an out-of-bounds index gives `undefined` (no error!)

```javascript
const arr = [1, 2, 3];
console.log(arr[10]); // undefined — silent!
```

### 10. `charAt(-1)` doesn't work — use `.at(-1)`

```javascript
const word = "abc";
console.log(word.charAt(-1)); // ""   (empty string, no error)
console.log(word.at(-1));     // "c" ✅ (negative index supported)
```

### 11. `==` coerces types — `===` does not

```javascript
console.log("5" === 5);  // false ✅ (different types)
console.log("5" == 5);   // true  (string "5" converted to number)
console.log(0 == false); // true  (another coercion surprise)
```

### 12. `NaN` is never equal to itself — test with `Number.isNaN()`

```javascript
const result = Number("abc");
console.log(result === NaN);        // false — ALWAYS false, even for real NaN!
console.log(Number.isNaN(result));  // true ✅ the reliable check
```

### 13. `sort()` and `reverse()` mutate the original — copy first

```javascript
const original = [3, 1, 2];
const sorted = [...original].sort((a, b) => a - b); // copy → then sort
console.log(sorted);   // [1, 2, 3]
console.log(original); // [3, 1, 2] ✅ untouched

// Or use the ES2023 non-mutating versions:
console.log(original.toSorted((a, b) => a - b)); // [1, 2, 3]
```

## 14. Practice Exercises

> 🚩 **Why it matters:** short reps move knowledge from "seen it" to "can build with it."

> ✍️ **How to use:** write your solution below each TODO, run it with Node, and compare with the **Expected** output. Full solutions are in [Section 16](#16-answer-key) — no peeking until you have tried!

### Ex 1 — Split once (arrays + rest)

```javascript
// TODO: split "a-b-c-d" at the FIRST "-" only
const input = "a-b-c-d";
// Expected: ["a", "b-c-d"]
```

### Ex 2 — Split once when the value contains `=`

```javascript
// TODO: split into key and FULL value (value itself contains "=")
const setting = "color=blue=dark";
// Expected: ["color", "blue=dark"]
```

### Ex 3 — Parse an email

```javascript
// TODO: extract the username and the domain
const email = "rohit.g@example.com";
// Expected: username "rohit.g", domain "example.com"
```

### Ex 4 — Reformat a date

```javascript
// TODO: convert "2026-08-31" to "31/08/2026"
const date = "2026-08-31";
// Expected: "31/08/2026"
```

### Ex 5 — Rest parameters

```javascript
// TODO: write sumAny(...) that adds ANY number of arguments
// Expected: sumAny(1, 2, 3, 4) → 10
```

### Ex 6 — Spread into Math.max

```javascript
// TODO: find the largest number WITHOUT a loop
const scores = [3, 9, 2];
// Expected: 9
```

### Ex 7 — Merge + dedupe + sort

```javascript
// TODO: combine both arrays — no duplicates, sorted
const a = [1, 2, 3];
const b = [3, 4];
// Expected: [1, 2, 3, 4]
```

### Ex 8 — Map to HTML list items

```javascript
// TODO: turn each language into an <li> item
const langs = ["HTML", "CSS"];
// Expected: ["<li>HTML</li>", "<li>CSS</li>"]
```

### Ex 9 — Copy an object and override a key (no mutation!)

```javascript
// TODO: create a NEW object with role "admin" — original must stay "viewer"
const user = { name: "Rohit", role: "viewer" };
// Expected: original {name "Rohit", role "viewer"}, copy {name "Rohit", role "admin"}
```

### Ex 10 — Drop the first element without mutating

```javascript
// TODO: return [20, 30, 40] — original must stay unchanged
const queue = [10, 20, 30, 40];
// Expected: [20, 30, 40], original [10, 20, 30, 40]
```

## 15. Challenges

> 🚩 **Why it matters:** graded tasks mirror real coding — a safe place to make and fix mistakes.

> 🔥 **Level up:** each challenge mixes 2–4 concepts from earlier sections. Try them before opening the [Answer Key](#16-answer-key).

### C1 — Cart total (map + reduce + operators)

```javascript
// TODO: total = sum of (price × qty), applying discount when present (0.1 = 10%)
const cart = [
  { name: "Keyboard", price: 500, qty: 2, discount: 0.1 },
  { name: "Mouse", price: 300, qty: 3 },
  { name: "Monitor", price: 1500, qty: 1 }
];
// Expected: 3300
```

### C2 — Longest word (split + reduce)

```javascript
// TODO: find the longest word; on a tie keep the FIRST one
const sentence = "The quick brown fox jumps over the lazy dog";
// Expected: "quick"
```

### C3 — Merge + dedupe + sort (spread + Set + sort)

```javascript
// TODO: merge into one sorted array with no duplicates
const arrA = [3, 1, 2];
const arrB = [2, 5, 4];
// Expected: [1, 2, 3, 4, 5]
```

### C4 — Palindrome checker (strings + conditions)

```javascript
// TODO: return true if the word reads the same reversed
// Expected: isPalindrome("madam") → true, isPalindrome("hello") → false
```

### C5 — Word frequency (split + reduce + object)

```javascript
// TODO: count how many times each word appears (case-insensitive)
const text = "The cat and the dog and the bird";
// Expected: { the: 3, cat: 1, and: 2, dog: 1, bird: 1 }
```

### C6 — FizzBuzz (loop + ternary)

```javascript
// TODO: 1..15 → multiples of 3 "Fizz", of 5 "Buzz", of both "FizzBuzz"
// Expected: [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

### C7 — Group by category (reduce building an object)

```javascript
// TODO: group product names by their category
const items = [
  { name: "Apple", cat: "food" },
  { name: "Laptop", cat: "tech" },
  { name: "Bread", cat: "food" },
  { name: "Phone", cat: "tech" }
];
// Expected: { food: ["Apple", "Bread"], tech: ["Laptop", "Phone"] }
```

### C8 — Flatten + sum (flat + reduce)

```javascript
// TODO: fully flatten AND sum in one pipeline
const nested = [1, [2, [3, [4, 5]]]];
// Expected: [1, 2, 3, 4, 5] and 15
```

### C9 — Email with `+tag` (split-once thinking!)

```javascript
// TODO: parse "rohit.dev+news@example.com" into parts
const email = "rohit.dev+news@example.com";
// Expected: { username: "rohit.dev", tag: "news", domain: "example.com" }
```

## 16. Answer Key

> 🚩 **Why it matters:** comparing your answer to the canonical one is where the real learning happens.

> 🙈 **Only look after you have tried!** Solutions are shown openly below each question.

### ✅ Ex 1 — Split once

```javascript
const input = "a-b-c-d";
const [first, ...restParts] = input.split("-");
console.log([first, restParts.join("-")]); // ["a", "b-c-d"]
```

### ✅ Ex 2 — Split once with `=` in the value

```javascript
const setting = "color=blue=dark";
const eq = setting.indexOf("=");
console.log([setting.slice(0, eq), setting.slice(eq + 1)]); // ["color", "blue=dark"]
```

### ✅ Ex 3 — Parse an email

```javascript
const email = "rohit.g@example.com";
const [username, domain] = email.split("@");
console.log(username, domain); // rohit.g example.com
```

### ✅ Ex 4 — Reformat a date

```javascript
const date = "2026-08-31";
const [y, m, d] = date.split("-");
console.log([d, m, y].join("/")); // 31/08/2026
```

### ✅ Ex 5 — Rest parameters

```javascript
const sumAny = (...nums) => nums.reduce((total, n) => total + n, 0);
console.log(sumAny(1, 2, 3, 4)); // 10
```

### ✅ Ex 6 — Spread into Math.max

```javascript
const scores = [3, 9, 2];
console.log(Math.max(...scores)); // 9
```

### ✅ Ex 7 — Merge + dedupe + sort

```javascript
const a = [1, 2, 3];
const b = [3, 4];
console.log([...new Set([...a, ...b])].sort((x, y) => x - y)); // [1, 2, 3, 4]
```

### ✅ Ex 8 — Map to HTML list items

```javascript
const langs = ["HTML", "CSS"];
console.log(langs.map((lang) => `<li>${lang}</li>`));
// ["<li>HTML</li>", "<li>CSS</li>"]
```

### ✅ Ex 9 — Copy + override (no mutation)

```javascript
const user = { name: "Rohit", role: "viewer" };
const admin = { ...user, role: "admin" };
console.log(user, admin);
// {name:"Rohit",role:"viewer"} {name:"Rohit",role:"admin"}
```

### ✅ Ex 10 — Drop first without mutating

```javascript
const queue = [10, 20, 30, 40];
const withoutFirst = queue.slice(1);
console.log(withoutFirst, queue); // [20,30,40] [10,20,30,40]
```

### ✅ C1 — Cart total

```javascript
const cart = [
  { name: "Keyboard", price: 500, qty: 2, discount: 0.1 },
  { name: "Mouse", price: 300, qty: 3 },
  { name: "Monitor", price: 1500, qty: 1 }
];

const total = cart
  .map((item) => item.price * item.qty * (1 - (item.discount ?? 0)))
  .reduce((sum, line) => sum + line, 0);

console.log(total); // 3300
```

### ✅ C2 — Longest word

```javascript
const sentence = "The quick brown fox jumps over the lazy dog";
const longest = sentence
  .split(" ")
  .reduce((best, word) => (word.length > best.length ? word : best));
console.log(longest); // quick (first max wins on ties)
```

### ✅ C3 — Merge + dedupe + sort

```javascript
const arrA = [3, 1, 2];
const arrB = [2, 5, 4];
console.log([...new Set([...arrA, ...arrB])].sort((a, b) => a - b));
// [1, 2, 3, 4, 5]
```

### ✅ C4 — Palindrome checker

```javascript
const isPalindrome = (word) => word === word.split("").reverse().join("");
console.log(isPalindrome("madam"), isPalindrome("hello")); // true false
```

### ✅ C5 — Word frequency

```javascript
const text = "The cat and the dog and the bird";
const counts = text
  .toLowerCase()
  .split(" ")
  .reduce((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1; // ?? avoids treating a missing key as 0-vs-falsy bug
    return acc; // remember: a {} arrow body NEEDS return (Pitfall 6!)
  }, {});
console.log(counts); // {"the":3,"cat":1,"and":2,"dog":1,"bird":1}
```

### ✅ C6 — FizzBuzz

```javascript
const result = [];
for (let i = 1; i <= 15; i++) {
  result.push(i % 15 === 0 ? "FizzBuzz" : i % 3 === 0 ? "Fizz" : i % 5 === 0 ? "Buzz" : i);
}
console.log(result);
// [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

### ✅ C7 — Group by category

```javascript
const items = [
  { name: "Apple", cat: "food" },
  { name: "Laptop", cat: "tech" },
  { name: "Bread", cat: "food" },
  { name: "Phone", cat: "tech" }
];

const grouped = items.reduce((acc, item) => {
  (acc[item.cat] ??= []).push(item.name); // create array if missing, then push
  return acc;
}, {});
console.log(grouped); // {"food":["Apple","Bread"],"tech":["Laptop","Phone"]}
```

### ✅ C8 — Flatten + sum

```javascript
const nested = [1, [2, [3, [4, 5]]]];
const flat = nested.flat(Infinity); // Infinity flattens every level
console.log(flat, flat.reduce((s, n) => s + n, 0)); // [1,2,3,4,5] 15
```

### ✅ C9 — Email with `+tag`

```javascript
const email = "rohit.dev+news@example.com";
const [localPart, domain] = email.split("@");           // split once at @
const [username, tag = null] = localPart.split("+");    // split once at +
console.log({ username, tag, domain });
// {"username":"rohit.dev","tag":"news","domain":"example.com"}
// (tag is null when there is no "+tag" part)
```

---

**JavaScript Essentials — Part 1 (Study Edition)** 🎉

Made for hands-on learning — quizzes, flashcards, exercises & challenges.
