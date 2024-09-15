"use client"

import { createContext, useEffect, useState } from "react"

import { clearVisitedAndPath, initializeGrid } from "@/lib/pathfinding/grid"
import { randomizeArray } from "@/lib/sorting"
import type {
  AlgorithmType,
  ArrayItem,
  Grid,
  GridDimensions,
  MazeAlgorithmType,
  PathFindingAlgorithmType,
  SortingAlgorithmType,
  Status,
  VisualizerContextType,
} from "@/lib/types"

export const VisualizerContext = createContext<VisualizerContextType | null>(
  null
)

export const VisualizerProvider = ({
  children,
}: Readonly<React.PropsWithChildren>) => {
  const [algorithmType, setAlgorithmType] =
    useState<AlgorithmType>("pathfinding")
  const [delay, setDelay] = useState(0)
  const [output, setOutput] = useState<string[]>([])
  const [startTime, setStartTime] = useState(0)
  const [status, setStatus] = useState<Status>("idle")

  const [pathFindingAlgorithm, setPathFindingAlgorithm] =
    useState<PathFindingAlgorithmType>("dijkstra")
  const [mazeAlgorithm, setMazeAlgorithm] =
    useState<MazeAlgorithmType>("random")
  const [gridDimensions, setGridDimensions] = useState<
    GridDimensions | undefined
  >()
  const [grid, setGrid] = useState<Grid>([])

  const [sortingAlgorithm, setSortingAlgorithm] =
    useState<SortingAlgorithmType>("selection")
  const [array, setArray] = useState<ArrayItem[]>([])
  const [arrayLength, setArrayLength] = useState(50)

  useEffect(() => {
    if (algorithmType === "sorting") setArray(randomizeArray(arrayLength))
    else if (gridDimensions) setGrid(initializeGrid(gridDimensions))
  }, [algorithmType, arrayLength, gridDimensions])

  useEffect(() => {
    if (status === "running") setStartTime(performance.now())
    if (status === "completed") {
      const elapsed = performance.now() - startTime
      const elapsedParsed =
        elapsed >= 1000
          ? `${(elapsed / 1000).toFixed(2)}s`
          : `${elapsed.toFixed(2)}ms`
      setOutput((prev) => [...prev, `Visualized in: ${elapsedParsed}`])
    }
  }, [status])

  const resetVisualizer = () => {
    if (algorithmType === "sorting") setArray(randomizeArray(arrayLength))
    else setGrid(clearVisitedAndPath)
    setOutput([])
    setStartTime(0)
    setStatus("idle")
  }

  return (
    <VisualizerContext.Provider
      value={{
        algorithmType,
        delay,
        output,
        status,
        pathFindingAlgorithm,
        mazeAlgorithm,
        gridDimensions,
        grid,
        sortingAlgorithm,
        array,
        arrayLength,
        setAlgorithmType,
        setDelay,
        addOutput: (message: string) => setOutput((prev) => [...prev, message]),
        setStatus,
        resetVisualizer,
        setPathFindingAlgorithm,
        setMazeAlgorithm,
        setGridDimensions,
        setGrid,
        setSortingAlgorithm,
        setArray,
        setArrayLength,
      }}
    >
      {children}
    </VisualizerContext.Provider>
  )
}
