import type { Dispatch, Grid } from "../types"
import { sleep } from "../utils"
import { clearWalls, isStartOrTarget } from "./grid"
import { constructBorder, recursiveDivision } from "./recursive-division"

const generateRandomMaze = (grid: Grid) => {
  const newGrid = clearWalls(grid)

  for (let i = 0; i < grid.length; i++)
    for (let j = 0; j < grid[0].length; j++)
      if (Math.random() < 0.3 && newGrid[i][j].type === "empty")
        newGrid[i][j].type = "wall"

  return newGrid
}

const createWalls = async (
  grid: Grid,
  delay: number,
  setGrid: Dispatch<Grid>
) => {
  const newGrid: Grid = [...grid]

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if ((i % 2 === 0 || j % 2 === 0) && !isStartOrTarget(newGrid[i][j]))
        newGrid[i][j].type = "wall"
      else if (newGrid[i][j].type === "wall") newGrid[i][j].type = "empty"
    }
    setGrid([...newGrid])
    await sleep(delay)
  }

  return newGrid
}

const generateBinaryTreeMaze = async (
  grid: Grid,
  delay: number,
  setGrid: Dispatch<Grid>
) => {
  const newGrid = await createWalls(grid, delay, setGrid)

  let count = 0

  const conditionallySetEmpty = async (row: number, col: number) => {
    count++
    if (!isStartOrTarget(newGrid[row][col])) {
      newGrid[row][col].type = "empty"
      setGrid([...newGrid])
      if (count % 3 === 0) await sleep(delay)
    }
  }

  for (let row = 1; row < grid.length - 1; row += 2) {
    for (let col = 1; col < grid[0].length - 1; col += 2) {
      await conditionallySetEmpty(row, col)

      if (row > 2 && col > 2) {
        if (Math.random() < 0.5) await conditionallySetEmpty(row - 1, col)
        else await conditionallySetEmpty(row, col - 1)
      } else if (row > 2) await conditionallySetEmpty(row - 1, col)
      else if (col > 2) await conditionallySetEmpty(row, col - 1)
    }
  }

  setGrid([...newGrid])
}

export const generateRecursiveDivisionMaze = async (
  grid: Grid,
  delay: number,
  setGrid: Dispatch<Grid>
) => {
  const newGrid = await constructBorder(grid, delay, setGrid)
  await recursiveDivision({
    grid: newGrid,
    delay,
    row: 1,
    col: 1,
    height: Math.floor((newGrid.length - 1) / 2),
    width: Math.floor((newGrid[0].length - 1) / 2),
    setGrid,
  })
}

export const mazeGenerator = {
  random: { algorithm: generateRandomMaze, label: "Random" },
  "binary-tree": { algorithm: generateBinaryTreeMaze, label: "Binary Tree" },
  "recursive-division": {
    algorithm: generateRecursiveDivisionMaze,
    label: "Recursive Division",
  },
} as const
