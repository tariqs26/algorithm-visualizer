import type { Cell, Grid, GridDimensions } from "../types"

export const isStartOrTarget = (cell: Cell) =>
  cell.type === "start" || cell.type === "target"

export const heuristic = (cell: Cell, target: Cell) =>
  (cell.row - target.row) ** 2 + (cell.col - target.col) ** 2

export const getStartAndTarget = <T extends Cell>(grid: Grid<T>) => {
  let start: T | undefined
  let target: T | undefined

  for (const row of grid)
    for (const cell of row) {
      if (cell.type === "start") start = cell
      if (cell.type === "target") target = cell
    }

  if (!start || !target) throw new Error("Missing start or target cell")

  return { start, target }
}

export const getNeighbours = <T extends Cell>(grid: Grid<T>, cell: T) => {
  const { row, col } = cell
  const neighbours: T[] = []
  if (row > 0) neighbours.push(grid[row - 1][col])
  if (row < grid.length - 1) neighbours.push(grid[row + 1][col])
  if (col > 0) neighbours.push(grid[row][col - 1])
  if (col < grid[0].length - 1) neighbours.push(grid[row][col + 1])
  return neighbours.filter((neighbour) => neighbour.type !== "wall")
}

export const initializeGrid = (gridDimensions?: GridDimensions) => {
  if (!gridDimensions) throw new Error("Missing grid dimensions")
  const { rows, cols } = gridDimensions

  const grid: Grid = Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({ type: "empty", row, col }))
  )

  grid[1][1].type = "start"
  grid[rows - 2][cols - 2].type = "target"

  return grid
}

export const clearWalls = (grid: Grid): Grid =>
  grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      type: cell.type === "wall" ? "empty" : cell.type,
    }))
  )

export const clearVisitedAndPath = (grid: Grid): Grid =>
  grid.map((row) =>
    row.map((cell) =>
      isStartOrTarget(cell) || cell.type === "wall"
        ? cell
        : { ...cell, type: "empty" as const }
    )
  )
