import { clearVisitedAndPath } from "@/lib/pathfinding/grid"
import { randomizeArray } from "@/lib/sorting"
import type { VisualizerAction, VisualizerState } from "@/lib/types"

export const reducer = (
  state: VisualizerState,
  action: VisualizerAction
): VisualizerState => {
  switch (action.type) {
    case "SET_ALGORITHM_TYPE":
      return { ...state, algorithmType: action.payload }
    case "SET_DELAY":
      return { ...state, delay: action.payload }
    case "ADD_OUTPUT":
      return { ...state, output: [...state.output, action.payload] }
    case "SET_START_TIME":
      return { ...state, startTime: action.payload }
    case "SET_STATUS":
      return { ...state, status: action.payload }
    case "SET_PATH_FINDING_ALGORITHM":
      return { ...state, pathFindingAlgorithm: action.payload }
    case "SET_MAZE_ALGORITHM":
      return { ...state, mazeAlgorithm: action.payload }
    case "SET_GRID_DIMENSIONS":
      return { ...state, gridDimensions: action.payload }
    case "SET_GRID":
      return { ...state, grid: action.payload }
    case "DRAW_GRID_WALL":
      return {
        ...state,
        grid: state.grid.map((row, i) =>
          row.map((cell, j) =>
            i === action.payload.row && j === action.payload.col
              ? { ...cell, type: cell.type === "empty" ? "wall" : "empty" }
              : cell
          )
        ),
      }
    case "SET_SORTING_ALGORITHM":
      return { ...state, sortingAlgorithm: action.payload }
    case "SET_ARRAY":
      return { ...state, array: action.payload }
    case "RANDOMIZE_ARRAY":
      return { ...state, array: randomizeArray(state.arrayLength) }
    case "SORT_ARRAY":
      return {
        ...state,
        array: state.array.map((item) => ({ ...item, isSorted: true })),
      }
    case "SET_ARRAY_LENGTH":
      return { ...state, arrayLength: action.payload }
    default:
      return {
        ...state,
        output: [],
        status: "idle",
        array:
          state.algorithmType === "sorting"
            ? randomizeArray(state.arrayLength)
            : state.array,
        grid:
          state.algorithmType === "pathfinding"
            ? clearVisitedAndPath(state.grid)
            : state.grid,
      }
  }
}
