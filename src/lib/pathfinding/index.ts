import type {
  Grid,
  PathFindingAlgorithm,
  VisualizerContextType,
} from "../types"
import { sleep } from "../utils"
import { aStar, bfs, dfs, dijkstra, greedy } from "./algorithms"
import { isStartOrTarget } from "./grid"

export const runPathFindingAlgorithm = async (
  { state, dispatch }: VisualizerContextType,
  algorithm: PathFindingAlgorithm
) => {
  dispatch({ type: "SET_STATUS", payload: "running" })
  const { newGrid, target } = await algorithm(
    state.grid,
    state.delay,
    (grid: Grid) => {
      dispatch({ type: "SET_GRID", payload: grid })
    }
  )

  const path = []
  for (let current = target; current.previous; current = current.previous)
    if (!isStartOrTarget(current)) path.unshift(current)

  for (const cell of path) {
    cell.type = "path"
    dispatch({ type: "SET_GRID", payload: [...newGrid] })
    await sleep(state.delay)
  }

  dispatch({ type: "SET_STATUS", payload: "completed" })
}

export const pathFinder = {
  dijkstra: { algorithm: dijkstra, label: "Dijkstra's" },
  "a-star": { algorithm: aStar, label: "A* Search" },
  greedy: { algorithm: greedy, label: "Greedy Best First" },
  dfs: { algorithm: dfs, label: "DFS" },
  bfs: { algorithm: bfs, label: "BFS" },
}
