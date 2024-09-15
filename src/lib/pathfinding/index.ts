import type { PathFindingAlgorithm, VisualizerContextType } from "../types"
import { sleep } from "../utils"
import { aStar, bfs, dfs, dijkstra, greedy } from "./algorithms"
import { isStartOrTarget } from "./grid"

export const runPathFindingAlgorithm = async (
  context: VisualizerContextType,
  algorithm: PathFindingAlgorithm
) => {
  context.setStatus("running")
  const { newGrid, target } = await algorithm(context)

  const path = []
  for (let current = target; current.previous; current = current.previous)
    if (!isStartOrTarget(current)) path.unshift(current)

  for (const cell of path) {
    cell.type = "path"
    context.setGrid([...newGrid])
    await sleep(context.delay)
  }

  context.setStatus("completed")
}

export const pathFinder = {
  dijkstra: { algorithm: dijkstra, label: "Dijkstra's" },
  "a-star": { algorithm: aStar, label: "A* Search" },
  greedy: { algorithm: greedy, label: "Greedy Best First" },
  dfs: { algorithm: dfs, label: "DFS" },
  bfs: { algorithm: bfs, label: "BFS" },
}
