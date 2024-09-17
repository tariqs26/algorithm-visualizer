import type { pathFinder } from "./pathfinding"
import type { mazeGenerator } from "./pathfinding/maze"
import type { sorter } from "./sorting"

export type AlgorithmType = "sorting" | "pathfinding"

export type PathFindingAlgorithmType = keyof typeof pathFinder

export type PathFindingAlgorithm = (
  grid: Grid,
  delay: number,
  setGrid: (grid: Grid) => void
) => Promise<{ newGrid: Grid; target: Cell }>

export type MazeAlgorithmType = keyof typeof mazeGenerator

type CellType = "empty" | "start" | "target" | "wall" | "visited" | "path"

export type Cell = {
  type: CellType
  row: number
  col: number
  previous?: Cell
}

export type DistanceCell = Cell & { distance: number }

export type AStarCell = Cell & { fScore: number; gScore: number }

export type GridDimensions = { rows: number; cols: number }

export type Grid<T extends Cell = Cell> = T[][]

export type SortingAlgorithmType = keyof typeof sorter

export type SortingAlgorithm = (context: VisualizerContextType) => Promise<void>

type ArrayItem = {
  height: number
  isSorted: boolean
  isSwapping?: boolean
}

type Status = "idle" | "running" | "completed"

export type VisualizerState = {
  algorithmType: AlgorithmType
  delay: number
  output: string[]
  startTime: number
  status: Status
  pathFindingAlgorithm: PathFindingAlgorithmType
  mazeAlgorithm: MazeAlgorithmType
  gridDimensions: GridDimensions | undefined
  grid: Grid
  sortingAlgorithm: SortingAlgorithmType
  array: ArrayItem[]
  arrayLength: number
}

export type VisualizerAction =
  | { type: "SET_ALGORITHM_TYPE"; payload: AlgorithmType }
  | { type: "SET_DELAY"; payload: number }
  | { type: "ADD_OUTPUT"; payload: string }
  | { type: "SET_START_TIME"; payload: number }
  | { type: "SET_STATUS"; payload: Status }
  | { type: "SET_PATH_FINDING_ALGORITHM"; payload: PathFindingAlgorithmType }
  | { type: "SET_MAZE_ALGORITHM"; payload: MazeAlgorithmType }
  | { type: "SET_GRID_DIMENSIONS"; payload: GridDimensions | undefined }
  | { type: "SET_GRID"; payload: Grid }
  | { type: "DRAW_GRID_WALL"; payload: Pick<Cell, "row" | "col"> }
  | { type: "SET_SORTING_ALGORITHM"; payload: SortingAlgorithmType }
  | { type: "SET_ARRAY"; payload: ArrayItem[] }
  | { type: "SET_ARRAY_LENGTH"; payload: number }
  | { type: "RESET_VISUALIZER" | "RANDOMIZE_ARRAY" | "SORT_ARRAY" }

export type VisualizerContextType = {
  state: VisualizerState
  dispatch: React.Dispatch<VisualizerAction>
}
