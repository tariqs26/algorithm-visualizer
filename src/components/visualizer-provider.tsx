"use client"

import { createContext, useEffect, useReducer } from "react"
import { initializeGrid } from "@/lib/pathfinding/grid"
import type { VisualizerContextType, VisualizerState } from "@/lib/types"
import { reducer } from "./reducer"

export const VisualizerContext = createContext<VisualizerContextType | null>(
  null
)

const initialState: VisualizerState = {
  algorithmType: "pathfinding",
  delay: 0,
  output: [],
  startTime: 0,
  status: "idle",
  pathFindingAlgorithm: "dijkstra",
  mazeAlgorithm: "random",
  gridDimensions: undefined,
  grid: [],
  sortingAlgorithm: "selection",
  array: [],
  arrayLength: 50,
}

export const VisualizerProvider = ({
  children,
}: Readonly<React.PropsWithChildren>) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (state.algorithmType === "sorting") dispatch({ type: "RANDOMIZE_ARRAY" })
    else if (state.gridDimensions)
      dispatch({
        type: "SET_GRID",
        payload: initializeGrid(state.gridDimensions),
      })
  }, [state.algorithmType, state.gridDimensions])

  useEffect(() => {
    if (state.status === "running")
      dispatch({ type: "SET_START_TIME", payload: performance.now() })
    if (state.status === "completed") {
      const elapsed = performance.now() - state.startTime
      const elapsedParsed =
        elapsed >= 1000
          ? `${(elapsed / 1000).toFixed(2)}s`
          : `${elapsed.toFixed(2)}ms`
      dispatch({
        type: "ADD_OUTPUT",
        payload: `Visualized in: ${elapsedParsed}`,
      })
    }
  }, [state.status])

  return (
    <VisualizerContext.Provider value={{ state, dispatch }}>
      {children}
    </VisualizerContext.Provider>
  )
}
