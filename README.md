# Student Finance Tracker

A responsive and accessible personal finance tracking application designed to help students manage expenses, monitor spending habits, and make informed financial decisions.

The application is built using **HTML5, CSS3, and vanilla JavaScript**, without external frameworks.

## Live Demo

**Live Website:** [Student Finance Tracker](https://jlouange.github.io/student-finance-tracker/)

**GitHub Repository:** [View Source Code](https://github.com/jlouange/student-finance-tracker)

**Demo Video:** [video link]

---

## Project Overview

Students often struggle to monitor daily expenses and manage limited budgets.

The Student Finance Tracker addresses this problem by providing a simple interface for recording transactions, categorizing spending, monitoring expenses, and reviewing financial trends.

The application stores information locally in the browser, allowing users to manage their finances without creating an account.

### Project Objectives

- Help students monitor daily expenses.
- Provide clear financial statistics.
- Support spending limits and budget awareness.
- Enable searching and sorting of transactions.
- Demonstrate responsive web design and accessibility.
- Apply regular expressions for validation and searching.
- Implement browser-based data persistence.

---

## Features

### 1. Transaction Management

- Add new transactions.
- Edit existing transactions inline.
- Delete transactions with confirmation.
- Automatically generate unique transaction IDs.
- Maintain creation and modification timestamps.
- Validate transaction information before saving.

### 2. Dashboard

The dashboard displays:

- Total number of transactions.
- Total spending.
- Highest-spending category.
- Spending trends over the last seven days.
- Spending cap information.

Statistics update automatically when transactions change.

### 3. Regex Search and Sorting

Users can search transaction descriptions using regular expressions.

Features include:

- Live regex search.
- Case-insensitive search toggle.
- Safe handling of invalid regex patterns.
- Highlighting matched text using `<mark>`.
- Sorting transactions by date, description, and amount.

### 4. Spending Cap

Users can configure a spending limit.

The application displays:

- Remaining spending allowance.
- A warning when spending reaches 80% of the cap.
- An exceeded-limit message when spending goes beyond the cap.

Messages use ARIA live regions for accessibility.

### 5. Category Management

Default categories:

- Food
- Books
- Transport
- Entertainment
- Fees
- Other

Users can add, rename, and remove categories.

Renaming a category updates the associated transactions.

### 6. Currency Settings

The application supports:

- Rwandan Franc (RWF)
- US Dollar (USD)
- Euro (EUR)

Users can configure exchange rates manually.

Transaction amounts are stored internally in RWF, while displayed amounts can be converted to the selected currency.

### 7. Data Persistence

The application uses `localStorage` to preserve:

- Transactions
- Spending limits
- Categories
- Currency settings
- Theme preferences

Users can also export and import transaction data using JSON files.

Imported records are validated before loading.

**Important:** Importing valid JSON replaces existing transactions after confirmation. Export your current records before importing another file.

### 8. Dark Mode

Users can switch between Light Mode and Dark Mode.

The application saves the selected theme in `localStorage`, ensuring that the preference remains after refreshing.

---

## Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic page structure |
| CSS3 | Styling and responsive layouts |
| JavaScript | Application functionality |
| Regular Expressions | Input validation and searching |
| localStorage | Browser data persistence |
| JSON | Import and export functionality |
| Git | Version control |
| GitHub | Source code hosting |
| GitHub Pages | Website deployment |

---

## Project Structure

```text
student-finance-tracker/
│
├── index.html
├── tests.html
├── seed.json
├── README.md
│
├── styles/
│   ├── style.css
│   └── responsive.css
│
├── scripts/
│   ├── main.js
│   ├── state.js
│   ├── storage.js
│   ├── validators.js
│   ├── records.js
│   ├── search.js
│   ├── dashboard.js
│   ├── settings.js
│   └── ui.js
│
└── docs/
    └── M1-design-notes.md
```

---

## Data Model

Each transaction follows this structure:

```json
{
  "id": 1,
  "description": "Lunch at cafeteria",
  "amount": 2500,
  "category": "Food",
  "date": "2026-10-17",
  "createdAt": "2026-10-17T10:00:00.000Z",
  "updatedAt": "2026-10-17T10:00:00.000Z"
}
```

### Field Descriptions

| Field | Description |
|-------|-------------|
| `id` | Unique transaction identifier |
| `description` | Transaction description |
| `amount` | Amount spent, stored in RWF |
| `category` | Spending category |
| `date` | Transaction date |
| `createdAt` | Record creation timestamp |
| `updatedAt` | Last modification timestamp |

---

## Regular Expression Catalog

The application implements multiple validation rules, including an advanced regex pattern using a backreference.

### 1. Description Validation

```regex
^\S(?:.*\S)?$
```

**Purpose:** Prevent leading and trailing whitespace.

Valid example:

```text
Lunch at cafeteria
```

Invalid examples:

```text
 Lunch
Lunch 
```

### 2. Repeated Whitespace Detection

```regex
\s{2,}
```

**Purpose:** Detect consecutive whitespace characters that should be rejected.

Valid example:

```text
Lunch at cafeteria
```

Invalid example:

```text
Lunch  at cafeteria
```

### 3. Amount Validation

```regex
^(0|[1-9]\d*)(\.\d{1,2})?$
```

**Purpose:** Validate nonnegative numbers with up to two decimal places.

Valid examples:

```text
2500
2500.50
0.75
```

Invalid examples:

```text
-100
12.345
abc
```

### 4. Date Validation

```regex
^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$
```

**Purpose:** Validate dates written in YYYY-MM-DD format.

Valid example:

```text
2026-10-17
```

Invalid examples:

```text
2026-13-17
17-10-2026
```

The application also checks calendar validity.

### 5. Category Validation

```regex
^[A-Za-z]+(?:[ -][A-Za-z]+)*$
```

**Purpose:** Allow alphabetic category names containing spaces or hyphens.

Valid examples:

```text
Food
School Fees
Personal-Care
```

Invalid examples:

```text
Food123
Books!
```

### 6. Advanced Regex — Duplicate Word Detection

```regex
\b(\w+)\s+\1\b
```

The expression uses the case-insensitive `i` flag in JavaScript.

**Purpose:** Detect consecutive repeated words.

Examples:

| Input | Result |
|-------|--------|
| `Lunch Lunch` | Duplicate detected |
| `Coffee coffee` | Duplicate detected |
| `Books Books` | Duplicate detected |
| `Lunch at cafeteria` | Valid |
| `Coffee with friends` | Valid |

**Explanation:**

- `\b` identifies a word boundary.
- `(\w+)` captures a word.
- `\s+` matches one or more whitespace characters.
- `\1` matches the previously captured word.
- `i` enables case-insensitive matching.

This demonstrates the use of an advanced regex backreference.

---

## Live Regex Search

The search field allows users to enter regex patterns.

Examples:

| Pattern | Description |
|---------|-------------|
| `Lunch` | Search for Lunch |
| `^Lunch` | Descriptions starting with Lunch |
| `Lunch$` | Descriptions ending with Lunch |
| `coffee\|tea` | Search for coffee or tea |
| `\b(\w+)\s+\1\b` | Find duplicate consecutive words |

Invalid expressions are handled using `try/catch`, preventing the application from crashing.

Matching text is highlighted using `<mark>` elements.

---

## Accessibility Features

The application includes several accessibility improvements.

### Semantic HTML

The page uses semantic HTML elements:

- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`

### Keyboard Navigation

Users can navigate the application using the keyboard.

| Keyboard Shortcut | Action |
|-------------------|--------|
| `Tab` | Move to the next interactive element |
| `Shift + Tab` | Move to the previous element |
| `Enter` | Activate a focused button or link |
| `Space` | Activate buttons and checkboxes |
| `Arrow Keys` | Navigate native dropdown options |

### Additional Accessibility Features

- Skip-to-content link.
- Visible keyboard focus indicators.
- Labels associated with form controls.
- ARIA live regions for dynamic status messages.
- Clear validation feedback.
- Accessible transaction tables.
- Responsive layouts.
- Light and Dark Mode contrast considerations.
- Reduced-motion support where implemented.

---

## Responsive Design

The application uses a mobile-first approach.

It combines:

- CSS Flexbox.
- CSS Grid.
- Media queries.
- Relative sizing units.
- Responsive containers.
- Flexible navigation.
- Horizontally scrollable transaction tables on narrow screens.

### Tested Viewport Widths

| Viewport | Result |
|----------|--------|
| 360px | No document-level horizontal overflow |
| 390px | No document-level horizontal overflow |
| 768px | No document-level horizontal overflow |
| 1024px | No document-level horizontal overflow |

The application was also tested using Firefox Responsive Design Mode.

---

## Installation and Setup

### Requirements

- A modern web browser.
- Git (optional).
- VS Code or another text editor (optional).
- Live Server or another local HTTP server.

### 1. Clone the Repository

```bash
git clone https://github.com/jlouange/student-finance-tracker.git
```

### 2. Open the Project

```bash
cd student-finance-tracker
```

### 3. Run the Application

Open the project with VS Code and launch Live Server.

Alternatively, start a Python HTTP server:

```bash
python3 -m http.server 8000
```

Open:

```text
http://localhost:8000/
```

---

## Testing

The project includes a browser-based validation test page.

Open:

```text
http://localhost:8000/tests.html
```

The tests cover description, amount, date, category, and other validation behavior.

### Manual Testing

The application has been tested for:

- Adding transactions.
- Editing transactions.
- Deleting transactions.
- Sorting records.
- Regex searching.
- Invalid regex handling.
- Updating dashboard statistics.
- JSON import and export.
- Rejecting malformed JSON imports.
- Data persistence after refresh.
- Keyboard navigation.
- Responsive layouts.
- Dark Mode functionality.

---

## Sample Data

The `seed.json` file contains sample transactions for testing.

To load sample data:

1. Open the application.
2. Navigate to Records.
3. Select Import JSON.
4. Choose `seed.json`.
5. Confirm the import.

**Warning:** Importing replaces the current transaction list. Export a backup first if you want to preserve existing records.

---

## Deployment

The project is deployed using GitHub Pages.

**Live URL:**

https://jlouange.github.io/student-finance-tracker/

**Deployment configuration:**

- Source: Deploy from a branch.
- Branch: `main`.
- Directory: `/(root)`.



---

## Author and Contact

**Jean Louange MUSHUMBA**

GitHub: [jlouange](https://github.com/jlouange)

Email: j.mushumba@alustudent.com

---

## License

No license has been specified for this repository.
