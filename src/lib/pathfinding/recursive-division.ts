import type { Dispatch, Grid } from "../types"
import { sleep } from "../utils"
import { clearWalls, isStartOrTarget } from "./grid"

const randomInt = (min: number, max: number) =>
  Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min)
  )

export const constructBorder = async (
  grid: Grid,
  delay: number,
  setGrid: Dispatch<Grid>
) => {
  const newGrid: Grid = clearWalls(grid)

  const shape = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 },
  ]

  let row = 0
  let col = 0
  let iterations = 0

  for (let i = 0; i < shape.length; i++) {
    const direction = shape[i]

    while (
      row + direction.x >= 0 &&
      row + direction.x < newGrid.length &&
      col + direction.y >= 0 &&
      col + direction.y < newGrid[0].length
    ) {
      iterations++
      row += direction.x
      col += direction.y
      const cell = newGrid[row][col]
      if (!isStartOrTarget(cell)) {
        cell.type = "wall"
        setGrid([...newGrid])
        if (iterations % 3 === 0) await sleep(delay)
      }
    }

    if (row < 0) row = 0
    if (row >= newGrid.length) row = newGrid.length - 1
    if (col < 0) col = 0
    if (col >= newGrid[0].length) col = newGrid[0].length - 1
  }

  return newGrid
}

type RecursiveDivisionParams = {
  grid: Grid
  delay: number
  row: number
  col: number
  height: number
  width: number
  setGrid: Dispatch<Grid>
}

const horizontalDivision = async ({
  grid,
  delay,
  row,
  col,
  height,
  width,
  setGrid,
}: RecursiveDivisionParams) => {
  const newWall = row + randomInt(0, height - 1) * 2 + 1
  const newPassage = col + randomInt(0, width - 1) * 2

  for (let i = 0; i < 2 * width - 1; i++)
    if (newPassage !== col + i && !isStartOrTarget(grid[newWall][col + i])) {
      grid[newWall][col + i].type = "wall"
      setGrid([...grid])
      await sleep(delay)
    }

  await Promise.all([
    recursiveDivision({
      grid,
      delay,
      row,
      col,
      height: (newWall - row + 1) / 2,
      width,
      setGrid,
    }),
    recursiveDivision({
      grid,
      delay,
      row: newWall + 1,
      col,
      height: height - (newWall - row + 1) / 2,
      width,
      setGrid,
    }),
  ])
}

const verticalDivision = async ({
  grid,
  delay,
  row,
  col,
  height,
  width,
  setGrid,
}: RecursiveDivisionParams) => {
  const newWall = col + randomInt(0, width - 1) * 2 + 1
  const newPassage = row + randomInt(0, height) * 2

  for (let i = 0; i < 2 * height - 1; i++)
    if (newPassage !== row + i && !isStartOrTarget(grid[row + i][newWall])) {
      grid[row + i][newWall].type = "wall"
      setGrid([...grid])
      await sleep(delay)
    }

  await Promise.all([
    recursiveDivision({
      grid,
      delay,
      row,
      col,
      height,
      width: (newWall - col + 1) / 2,
      setGrid,
    }),
    recursiveDivision({
      grid,
      delay,
      row,
      col: newWall + 1,
      height,
      width: width - (newWall - col + 1) / 2,
      setGrid,
    }),
  ])
}

export const recursiveDivision = async (params: RecursiveDivisionParams) => {
  const { width, height } = params
  if (height < 2 || width < 2) return
  if (height > width) await horizontalDivision(params)
  else await verticalDivision(params)
}
