# Algorithm Visualizer

A web application for visualizing popular pathfinding and sorting algorithms built with [Next.js](https://nextjs.org/), [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), and [Tailwind CSS](https://tailwindcss.com/).

![Algorithm Visualizer](./src/app/opengraph-image.jpg)

## Features

### General

- Light/dark mode
- Adjustable visualization speed

### Pathfinding

- **Visualize:** Dijkstra's, A\* Search, Greedy Best-First Search, Depth-First Search (DFS) and Breadth-First Search (BFS)
- Interactive and resizable grid for drawing walls and dragging start/end nodes
- Generate and visualize mazes using **pseudo-random**, **binary tree**, or **recursive backtracking** algorithms

### Sorting

- **Visualize:** Bubble Sort, Selection Sort, Insertion Sort, Merge Sort and Quick Sort
- Randomize the array
- Customize array size

## Getting Started

To set up the project locally, follow these steps:

1. **Clone repo and navigate to the project directory:**

   ```bash
   git clone https://github.com/tariqs26/algorithm-visualizer.git
   cd algorithm-visualizer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The app will run on http://localhost:3000.

## Available Scripts

Inside the project directory, you can run the following scripts:

| Command          | Description                     |
| ---------------- | ------------------------------- |
| `npm run dev`    | Starts the development server   |
| `npm run build`  | Builds the app for production   |
| `npm run start`  | Runs the production server      |
| `npm run lint`   | Lints the code using ESLint     |
| `npm run format` | Formats the code using Prettier |
