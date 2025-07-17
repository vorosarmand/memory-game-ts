# Memory Game

A modern, responsive memory card game built with React, TypeScript, and Redux Toolkit. Test your memory by matching pairs of animal emoji cards within the time limit!

## Features

- 🎮 **Customizable Game Settings**: Adjust number of card pairs, time limit, and allowed mistakes
- ⏱️ **Timer System**: Countdown timer with real-time updates
- 🎯 **Match Tracking**: Keep track of matches and mistakes
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎉 **Victory Celebrations**: Confetti animation for winning games
- 🔧 **Form Validation**: Robust input validation with error handling
- 🎨 **Modern UI**: Clean design with Tailwind CSS and custom fonts

## Tech Stack

- **Frontend**: React 19, TypeScript
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4
- **Icons**: FontAwesome
- **Testing**: Jest
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd memory-game-ts
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests

## Game Rules

1. **Setup**: Configure your name, number of card pairs (1-50), time limit (10-99 seconds), and allowed mistakes (0-99)
2. **Gameplay**: Click cards to flip them and find matching pairs
3. **Winning**: Match all pairs before time runs out and within your mistake limit
4. **Losing**: Game ends if time runs out or you exceed your mistake limit

## Testing

The project includes comprehensive tests for form validation and game logic:

```bash
npm test
```

## Configuration

Game settings are validated with the following constraints:

- **Player Name**: 4-16 characters
- **Card Pairs**: 1-50 pairs
- **Time Limit**: 10-99 seconds
- **Allowed Mistakes**: 0-99 mistakes
