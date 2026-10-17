# M1 — Project Specification and Wireframes

## Project Name

Student Finance Tracker

## 1. Problem Statement

University students often manage limited financial resources and may struggle to monitor expenses effectively.

Without a clear record of spending, it becomes difficult to identify unnecessary expenses, monitor budgets, and make informed financial decisions.

The Student Finance Tracker provides an accessible web application for recording expenses, categorizing transactions, and analyzing spending patterns.

## 2. Target Users

The application is designed primarily for university students who want to:

- Record daily expenses.
- Monitor their spending.
- Organize transactions into categories.
- Set spending limits.
- Understand their financial habits.

## 3. Project Objectives

The application aims to:

1. Provide a responsive financial tracking interface.
2. Validate transaction data using regular expressions.
3. Support transaction creation, editing, and deletion.
4. Display useful financial statistics.
5. Store data locally in the browser.
6. Support JSON import and export.
7. Provide accessible navigation and feedback.
8. Allow basic currency conversion.

## 4. Functional Requirements

### Transaction Management

- Add transactions.
- Edit existing transactions.
- Delete transactions.
- Assign categories.
- Record dates and timestamps.

### Dashboard

- Display total transactions.
- Calculate total spending.
- Identify the top spending category.
- Display seven-day spending trends.
- Show spending cap status.

### Search and Sorting

- Perform live regex searches.
- Highlight matching descriptions.
- Handle invalid regex patterns.
- Sort by amount, date, and description.

### Settings

- Configure spending caps.
- Add, rename, and remove categories.
- Select display currency.
- Set manual exchange rates.
- Switch between Light and Dark Mode.

### Persistence

- Save transactions using localStorage.
- Preserve settings between sessions.
- Import valid JSON data.
- Export transactions as JSON.

## 5. Data Model

Each transaction contains:

```javascript
{
    id: 1,
    description: "Lunch at cafeteria",
    amount: 2500,
    category: "Food",
    date: "2026-10-17",
    createdAt: "2026-10-17T10:00:00.000Z",
    updatedAt: "2026-10-17T10:00:00.000Z"
}
```

## 6. Mobile Wireframe

```text
┌────────────────────────────┐
│    STUDENT FINANCE         │
│         TRACKER            │
├────────────────────────────┤
│ Dashboard | Records | ...  │
├────────────────────────────┤
│                            │
│         DASHBOARD          │
│                            │
│ ┌────────────────────────┐ │
│ │ Total Transactions     │ │
│ │          12            │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Total Spending         │ │
│ │       RWF ...          │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Top Category           │ │
│ │        Food            │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │  Seven-Day Chart       │ │
│ │  ▂ ▆ ▃ ▇ ▅ ▂ ▄         │ │
│ └────────────────────────┘ │
│                            │
│ ┌────────────────────────┐ │
│ │ Spending Cap           │ │
│ │ Remaining: RWF ...     │ │
│ └────────────────────────┘ │
│                            │
├────────────────────────────┤
│          RECORDS           │
│                            │
│ [ Search Transactions ]    │
│ [ Sort Records        ▼]   │
│ [Import]        [Export]   │
│                            │
│ [Scrollable Records →]     │
│                            │
├────────────────────────────┤
│        ADD RECORD          │
│                            │
│ Description                │
│ [______________________]   │
│                            │
│ Amount                     │
│ [______________________]   │
│                            │
│ Category                   │
│ [Select Category       ▼]  │
│                            │
│ Date                       │
│ [______________________]   │
│                            │
│       [Add Record]         │
│                            │
├────────────────────────────┤
│         SETTINGS           │
│                            │
│ Spending Cap               │
│ Category Management        │
│ Currency Settings          │
│ Appearance                 │
│                            │
├────────────────────────────┤
│           ABOUT            │
└────────────────────────────┘
```

## 7. Desktop Wireframe

```text
┌─────────────────────────────────────────────────────────────────┐
│                       STUDENT FINANCE TRACKER                 │
├─────────────────────────────────────────────────────────────────┤
│ Dashboard | Records | Add Record | Settings | About            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                           DASHBOARD                             │
│                                                                 │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ │
│ │ Total Records    │ │ Total Spending   │ │ Top Category     │ │
│ │      12          │ │     RWF ...      │ │      Food        │ │
│ └──────────────────┘ └──────────────────┘ └──────────────────┘ │
│                                                                 │
│ ┌────────────────────────────┐ ┌──────────────────────────────┐│
│ │   Seven-Day Chart          │ │  Spending Cap                ││
│ │                            │ │  Remaining: RWF ...          ││
│ │   ▂  ▆  ▃  ▇  ▅  ▂  ▄     │ │                              ││
│ └────────────────────────────┘ └──────────────────────────────┘│
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                            RECORDS                              │
│                                                                 │
│ [Regex Search] [Case Toggle] [Sort ▼] [Import] [Export]          │
│                                                                 │
│ Description       Amount        Category       Date      Actions│
│ --------------------------------------------------------------- │
│ Lunch             2500          Food           ...       Edit   │
│ Bus               1000          Transport      ...       Edit   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                         ADD RECORD                              │
│                                                                 │
│ Description | Amount | Category | Date | Add Record             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                           SETTINGS                              │
│                                                                 │
│ Spending Cap | Categories | Currency | Appearance               │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                            ABOUT                                │
└─────────────────────────────────────────────────────────────────┘
```

## 8. Accessibility Plan

### Semantic HTML

Use semantic HTML5 elements:

- Header
- Navigation
- Main
- Sections
- Articles
- Footer

### Keyboard Accessibility

- Ensure interactive controls are reachable using Tab.
- Provide visible focus indicators.
- Support native keyboard interaction with buttons and inputs.
- Provide a skip-to-content link.

### ARIA and Feedback

- Use ARIA live regions for dynamic messages.
- Announce spending cap updates.
- Provide clear validation feedback.
- Ensure form controls have accessible labels.

### Visual Accessibility

- Maintain readable text contrast.
- Support Light and Dark Mode.
- Use responsive font sizes and spacing.
- Respect reduced-motion preferences where applicable.

## 9. Responsive Design Plan

Use mobile-first CSS.

### Breakpoints

| Screen Width | Layout |
|--------------|--------|
| Approximately 360px | Mobile |
| Approximately 768px | Tablet |
| Approximately 1024px | Desktop |

### Responsive Techniques

- CSS Grid
- Flexbox
- Media queries
- Relative units
- Flexible containers
- Scrollable records table on mobile

## 10. Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Regular Expressions
- localStorage
- JSON
- Git and GitHub
- GitHub Pages

## 11. Success Criteria

The project is successful when:

- Users can create, edit, and delete records.
- Invalid inputs are rejected.
- Search and sorting work correctly.
- Dashboard statistics update automatically.
- Data persists after refreshing.
- Import/export works with validation.
- Keyboard navigation is functional.
- The layout adapts to mobile and desktop screens.
- The website is accessible through GitHub Pages.

---

**Note:** These design notes document the project's specification and layout choices. They are not presented as timestamped evidence of planning completed before implementation.
