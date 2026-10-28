# Habitly — Habit Tracker

Habitly is a simple, responsive habit tracker designed to help users build consistent routines through small daily actions.

## Features

- **Habit dashboard:** View total habits, completed habits, and daily progress.
- **Add habits:** Create habits with a name, category, and frequency.
- **Search and filters:** Find habits by name, category, status, and frequency.
- **Sort habits:** Organize habits by name, category, or completion status.
- **Track progress:** Mark habits as completed or incomplete.
- **Delete and undo:** Delete habits and restore them using the undo option.
- **User feedback:** Loading skeletons, empty states, error handling, validation messages, and success notifications.
- **Responsive design:** Layouts designed for desktop and mobile screens.
- **Keyboard accessibility:** Visible focus indicators and keyboard-operable controls.

## Technologies Used

- React
- JavaScript
- HTML
- CSS
- Vite
- JSON sample data

## Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/).

### Installation

1. Clone this repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project folder:

   ```bash
   cd habitly-habit-tracker
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal.

### Production Build

To create a production build, run:

```bash
npm run build
```

## Design Decisions

Habitly uses a simple green-and-white colour palette to create a calm, encouraging experience. Habit cards, clear status labels, and progress indicators help users understand their routine quickly. Responsive layouts keep the main actions accessible on smaller screens.

## UX Problem Identified and Fixed

The dashboard initially placed the loading skeleton too far down the page, making the loading state difficult to notice. I moved the skeleton closer to the dashboard statistics so users can see immediate feedback when opening My Habits. I also added clear validation messages, error recovery, and an undo option to make habit management easier and less error-prone.

## Project Links

- **GitHub Repository:** https://github.com/RBkavinraja/habitly-habit-tracker.
- **Live Demo:** https://habitly-habit-tracker-ten.vercel.app.

## Note

Habitly is a frontend assignment project that uses sample JSON data. The pricing plans are illustrative and do not process payments.