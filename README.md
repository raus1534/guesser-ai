# Guesser

This is an AI-based image guessing app that allows users to upload or capture images, and the app attempts to guess the content of the image. The app utilizes [Google’s Gemini API](https://ai.google.dev/gemini-api) to analyze images and displays results with animations and interactive elements.

## Features

- Provides AI-powered guesses based on the uploaded or captured image content.
- Supports image capture directly from the user’s webcam.
- Animates image analysis with engaging effects.
- Celebrates correct guesses with confetti animations.

## Technologies Used

- **Next.js**: For server-side rendering and optimized front-end performance.
- **React**: For building the user interface.
- **TypeScript**: Ensures type safety across the codebase.
- **@google/generative-ai**: For image analysis and guessing.
- **@headlessui/react & @react-spring/web**: Provides accessible UI components and smooth animations.
- **Framer Motion**: Adds fluid animations to the user experience.
- **React Webcam**: Enables capturing images directly within the app.
- **React Confetti**: Celebrates correct guesses with confetti animations.
- **Tailwind CSS & class-variance-authority**: For styling and customizable design themes.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/raus1534/guesser-ai.git
```

### 2. Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`GOOGLE_API_KEY`

### 3. Run Locally

```bash
npm run dev
```
