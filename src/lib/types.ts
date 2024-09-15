import type { pathFinder } from "./pathfinding"
import type { mazeGenerator } from "./pathfinding/maze"
import type { sorter } from "./sorting"

export type AlgorithmType = "sorting" | "pathfinding"

export type PathFindingAlgorithmType = keyof typeof pathFinder

export type PathFindingAlgorithm = (
  context: VisualizerContextType
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

export type ArrayItem = {
  height: number
  isSorted: boolean
  isSwapping?: boolean
}

export type Status = "idle" | "running" | "completed"

export type Dispatch<T> = React.Dispatch<React.SetStateAction<T>>

export type VisualizerContextType = {
  algorithmType: AlgorithmType
  delay: number
  output: string[]
  status: Status
  pathFindingAlgorithm: PathFindingAlgorithmType
  mazeAlgorithm: MazeAlgorithmType
  gridDimensions: GridDimensions | undefined
  grid: Grid
  sortingAlgorithm: SortingAlgorithmType
  array: ArrayItem[]
  arrayLength: number
  setAlgorithmType: Dispatch<AlgorithmType>
  setDelay: Dispatch<number>
  addOutput: (message: string) => void
  setStatus: Dispatch<Status>
  resetVisualizer: () => void
  setPathFindingAlgorithm: Dispatch<PathFindingAlgorithmType>
  setMazeAlgorithm: Dispatch<MazeAlgorithmType>
  setGridDimensions: Dispatch<GridDimensions | undefined>
  setGrid: Dispatch<Grid>
  setSortingAlgorithm: Dispatch<SortingAlgorithmType>
  setArray: Dispatch<ArrayItem[]>
  setArrayLength: Dispatch<number>
}
