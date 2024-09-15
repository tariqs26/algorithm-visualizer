import type {
  AStarCell,
  Cell,
  DistanceCell,
  Grid,
  PathFindingAlgorithm,
} from "../types"
import { sleep } from "../utils"
import { getNeighbours, getStartAndTarget, heuristic } from "./grid"
import { MinPriorityQueue } from "./min-priority-queue"

const dijkstra: PathFindingAlgorithm = async ({ grid, delay, setGrid }) => {
  const newGrid: Grid<DistanceCell> = grid.map((row) =>
    row.map((cell) => ({ ...cell, distance: Number.POSITIVE_INFINITY }))
  )
  const { start, target } = getStartAndTarget(newGrid)
  start.distance = 0

  const priorityQueue = new MinPriorityQueue<DistanceCell>()
  priorityQueue.enqueue(start, start.distance)

  const visited = new Set<DistanceCell>()

  while (!priorityQueue.isEmpty()) {
    const current = priorityQueue.dequeue()!
    if (visited.has(current)) continue
    visited.add(current)

    if (current === target) break
    if (current.type !== "start") current.type = "visited"

    for (const neighbour of getNeighbours(newGrid, current)) {
      if (visited.has(neighbour)) continue
      const tentativeDistance = current.distance + 1
      if (tentativeDistance < neighbour.distance) {
        neighbour.distance = tentativeDistance
        neighbour.previous = current
        priorityQueue.enqueue(neighbour, neighbour.distance)
      }
    }

    setGrid([...newGrid])
    await sleep(delay)
  }

  return { newGrid, target }
}

const aStar: PathFindingAlgorithm = async ({ grid, delay, setGrid }) => {
  const newGrid: Grid<AStarCell> = grid.map((row) =>
    row.map((cell) => ({
      ...cell,
      fScore: Number.POSITIVE_INFINITY,
      gScore: Number.POSITIVE_INFINITY,
    }))
  )
  const { start, target } = getStartAndTarget(newGrid)
  start.gScore = 0
  start.fScore = heuristic(start, target)

  const openSet = new MinPriorityQueue<AStarCell>()
  openSet.enqueue(start, start.fScore)
  const closedSet = new Set<AStarCell>()

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue()!
    if (closedSet.has(current)) continue
    closedSet.add(current)
    if (current === target) break

    if (current.type !== "start") current.type = "visited"

    for (const neighbour of getNeighbours(newGrid, current)) {
      if (closedSet.has(neighbour)) continue

      const tentativeGScore = current.gScore + 1
      if (tentativeGScore < neighbour.gScore) {
        neighbour.previous = current
        neighbour.gScore = tentativeGScore
        neighbour.fScore = neighbour.gScore + heuristic(neighbour, target)
        openSet.enqueue(neighbour, neighbour.fScore)
      }
    }

    setGrid([...newGrid])
    await sleep(delay)
  }

  return { newGrid, target }
}

const greedy: PathFindingAlgorithm = async ({ grid, delay, setGrid }) => {
  const newGrid: Grid<DistanceCell> = grid.map((row) =>
    row.map((cell) => ({ ...cell, distance: Number.POSITIVE_INFINITY }))
  )
  const { start, target } = getStartAndTarget(newGrid)

  const priorityQueue = new MinPriorityQueue<DistanceCell>()
  priorityQueue.enqueue(start, heuristic(start, target))

  const visited = new Set<DistanceCell>()

  while (!priorityQueue.isEmpty()) {
    const current = priorityQueue.dequeue()!
    if (visited.has(current)) continue
    visited.add(current)
    if (current === target) break
    if (current.type !== "start") current.type = "visited"

    for (const neighbour of getNeighbours(newGrid, current)) {
      if (visited.has(neighbour)) continue
      neighbour.previous = current
      neighbour.distance = heuristic(neighbour, target)
      priorityQueue.enqueue(neighbour, neighbour.distance)
    }

    setGrid([...newGrid])
    await sleep(delay)
  }

  return { newGrid, target }
}

const dfs: PathFindingAlgorithm = async ({ grid, delay, setGrid }) => {
  const newGrid = [...grid]
  const { start, target } = getStartAndTarget(newGrid)

  const stack: Cell[] = [start]
  const visited = new Set<Cell>()

  while (stack.length > 0) {
    const current = stack.pop()!
    if (visited.has(current)) continue
    visited.add(current)

    if (current === target) break
    if (current.type !== "start") current.type = "visited"

    for (const neighbour of getNeighbours(newGrid, current)) {
      if (visited.has(neighbour)) continue
      neighbour.previous = current
      stack.push(neighbour)
    }

    setGrid([...newGrid])
    await sleep(delay)
  }

  return { newGrid, target }
}

const bfs: PathFindingAlgorithm = async ({ grid, delay, setGrid }) => {
  const newGrid = [...grid]
  const { start, target } = getStartAndTarget(newGrid)

  const queue: Cell[] = [start]
  const visited = new Set<Cell>()

  while (queue.length > 0) {
    const current = queue.shift()!
    if (visited.has(current)) continue
    visited.add(current)

    if (current === target) break
    if (current.type !== "start") current.type = "visited"

    for (const neighbour of getNeighbours(newGrid, current)) {
      if (visited.has(neighbour)) continue
      neighbour.previous = current
      queue.push(neighbour)
    }

    setGrid([...newGrid])
    await sleep(delay)
  }

  return { newGrid, target }
}

export { aStar, bfs, dfs, dijkstra, greedy }
