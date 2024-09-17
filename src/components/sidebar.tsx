import { useState } from "react"
import { Dice5, Loader2, Play, RotateCcw, WandSparkles } from "lucide-react"

import { pathFinder, runPathFindingAlgorithm } from "@/lib/pathfinding"
import { clearWalls } from "@/lib/pathfinding/grid"
import { mazeGenerator } from "@/lib/pathfinding/maze"
import { sorter } from "@/lib/sorting"
import type {
  AlgorithmType,
  Grid,
  MazeAlgorithmType,
  PathFindingAlgorithmType,
  SortingAlgorithmType,
} from "@/lib/types"

import { useVisualizer } from "@/hooks/useVisualizer"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Slider } from "./ui/slider"

export const Sidebar = () => {
  const [mazeGenerating, setMazeGenerating] = useState(false)
  const { state, dispatch } = useVisualizer()
  const {
    algorithmType,
    sortingAlgorithm,
    pathFindingAlgorithm,
    mazeAlgorithm,
    grid,
    arrayLength,
    output,
    delay,
    status,
  } = state

  const disabledControls = status !== "idle" || mazeGenerating

  const formatDelay = () => {
    if (delay <= 20) return "Very Fast"
    if (delay <= 40) return "Fast"
    if (delay <= 60) return "Medium"
    if (delay <= 80) return "Slow"
    return "Very Slow"
  }

  const handleGenerateMaze = () => {
    const maze = mazeGenerator[mazeAlgorithm]
    if (maze.label === "Random")
      dispatch({ type: "SET_GRID", payload: maze.algorithm(grid) })
    else {
      setMazeGenerating(true)
      maze
        .algorithm(grid, delay, (grid: Grid) => {
          dispatch({ type: "SET_GRID", payload: grid })
        })
        .then(() => setMazeGenerating(false))
    }
  }

  const handleStartVisualization = () => {
    let label = ""
    if (algorithmType === "sorting") {
      sorter[sortingAlgorithm].algorithm({ state, dispatch }).then(() => {
        dispatch({ type: "SET_STATUS", payload: "completed" })
      })
      label = sorter[sortingAlgorithm].label
    } else {
      runPathFindingAlgorithm(
        { state, dispatch },
        pathFinder[pathFindingAlgorithm].algorithm
      )
      label = pathFinder[pathFindingAlgorithm].label
    }
    dispatch({ type: "ADD_OUTPUT", payload: `Started: ${label}` })
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col gap-y-4 border-r bg-muted p-4">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Settings</h2>
        <ThemeToggle />
      </header>
      <fieldset>
        <Label className="mb-2 block" htmlFor="visualization-type">
          Visualization Type
        </Label>
        <Select
          name="visualization-type"
          value={algorithmType}
          onValueChange={(value: AlgorithmType) =>
            dispatch({ type: "SET_ALGORITHM_TYPE", payload: value })
          }
          disabled={disabledControls}
        >
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select algorithm type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pathfinding">Pathfinding</SelectItem>
            <SelectItem value="sorting">Sorting</SelectItem>
          </SelectContent>
        </Select>
      </fieldset>
      {algorithmType === "sorting" ? (
        <>
          <fieldset>
            <Label className="mb-2 block" htmlFor="sorting-algorithms">
              Algorithm
            </Label>
            <Select
              value={sortingAlgorithm}
              onValueChange={(value: SortingAlgorithmType) =>
                dispatch({ type: "SET_SORTING_ALGORITHM", payload: value })
              }
              disabled={disabledControls}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select sorting algorithm" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(sorter).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </fieldset>
          <fieldset>
            <Label htmlFor="array-length" className="mb-2 block">
              Array Length ({arrayLength})
            </Label>
            <Slider
              name="array-length"
              value={[arrayLength]}
              onValueChange={(value) =>
                dispatch({ type: "SET_ARRAY_LENGTH", payload: value[0] })
              }
              min={20}
              max={80}
              step={5}
              disabled={disabledControls}
            />
          </fieldset>
        </>
      ) : (
        <>
          <fieldset>
            <Label className="mb-2 block" htmlFor="pathfinding-algorithms">
              Algorithm
            </Label>
            <Select
              name="pathfinding-algorithms"
              value={pathFindingAlgorithm}
              onValueChange={(value: PathFindingAlgorithmType) =>
                dispatch({ type: "SET_PATH_FINDING_ALGORITHM", payload: value })
              }
              disabled={disabledControls}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select pathfinding algorithm" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(pathFinder).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </fieldset>
          <fieldset>
            <Label className="mb-2 block" htmlFor="maze-generation">
              Maze Type
            </Label>
            <Select
              name="maze-generation"
              value={mazeAlgorithm}
              onValueChange={(value: MazeAlgorithmType) =>
                dispatch({ type: "SET_MAZE_ALGORITHM", payload: value })
              }
              disabled={disabledControls}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select maze generation" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(mazeGenerator).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="mt-2 flex gap-2">
              <Button
                size="sm"
                className="w-full"
                variant="destructive"
                disabled={disabledControls}
                onClick={() => {
                  dispatch({ type: "SET_GRID", payload: clearWalls(grid) })
                }}
              >
                Clear Walls
              </Button>
              <Button
                size="sm"
                className="w-full"
                disabled={disabledControls}
                onClick={handleGenerateMaze}
              >
                {mazeGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <WandSparkles className="mr-2 h-4 w-4" />
                )}
                {mazeGenerating ? "Generating..." : "Generate Maze"}
              </Button>
            </div>
          </fieldset>
        </>
      )}
      <fieldset>
        <Label htmlFor="speed" className="mb-3 block">
          Speed ({formatDelay()})
        </Label>
        <Slider
          name="speed"
          value={[100 - delay]}
          onValueChange={(value) =>
            dispatch({ type: "SET_DELAY", payload: 100 - value[0] })
          }
          min={0}
          max={100}
          disabled={disabledControls}
        />
      </fieldset>
      {algorithmType === "sorting" && (
        <Button
          onClick={() => dispatch({ type: "RANDOMIZE_ARRAY" })}
          disabled={disabledControls}
        >
          <Dice5 className="mr-2 h-4 w-4" />
          Randomize Array
        </Button>
      )}
      <Button
        onClick={() => dispatch({ type: "RESET_VISUALIZER" })}
        variant="destructive"
        disabled={status !== "completed"}
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
      <Button onClick={handleStartVisualization} disabled={disabledControls}>
        {status === "running" ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Play className="mr-2 h-4 w-4" />
        )}
        {status === "running" ? "Visualizing..." : "Start Visualization"}
      </Button>
      <div className="mt-2">
        <h3 className="mb-1 text-lg font-bold">Output</h3>
        {output.length === 0 && (
          <p className="text-sm font-medium text-muted-foreground">
            Log messages will appear here
          </p>
        )}
        {output.map((line, index) => (
          <p key={line} className="text-sm font-medium text-muted-foreground">
            <span className="mr-1 text-blue-600 dark:text-blue-400">
              [{index + 1}]
            </span>
            {line}
          </p>
        ))}
      </div>
    </aside>
  )
}
