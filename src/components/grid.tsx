import { useEffect, useRef, useState } from "react"

import { CELL_SIZE } from "@/lib/constants"
import { isStartOrTarget } from "@/lib/pathfinding/grid"
import type { Cell } from "@/lib/types"
import { cn, makeOdd } from "@/lib/utils"

import { useMounted } from "@/hooks/useMounted"
import { useVisualizer } from "@/hooks/useVisualizer"
import { GridCell } from "./grid-cell"

export const Grid = () => {
  const gridRef = useRef<HTMLDivElement | null>(null)
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [active, setActive] = useState<Cell | undefined>(undefined)
  const [over, setOver] = useState<Cell | undefined>(undefined)
  const { state, dispatch } = useVisualizer()
  const mounted = useMounted()

  useEffect(() => {
    const resizeEventListener = () => {
      if (!gridRef.current) return
      const rect = gridRef.current.getBoundingClientRect()
      const height = Math.round(rect.height) - 2 * CELL_SIZE
      const width = Math.round(rect.width) - 2 * CELL_SIZE
      const rows = makeOdd(Math.floor(height / CELL_SIZE))
      const cols = makeOdd(Math.floor(width / CELL_SIZE))
      dispatch({ type: "SET_GRID_DIMENSIONS", payload: { rows, cols } })
    }
    if (mounted) resizeEventListener()
    window.addEventListener("resize", resizeEventListener)
    return () => window.removeEventListener("resize", resizeEventListener)
  }, [mounted])

  const handleMouseDown = (cell: Cell) => {
    if (state.status !== "idle") return
    if (isStartOrTarget(cell)) {
      setActive(cell)
      return
    }
    setIsMouseDown(true)
    dispatch({ type: "DRAW_GRID_WALL", payload: cell })
  }

  const handleMouseEnter = (cell: Cell) => {
    if (!isMouseDown || isStartOrTarget(cell) || state.status !== "idle") return
    dispatch({ type: "DRAW_GRID_WALL", payload: cell })
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
    setActive(undefined)
    setOver(undefined)
  }

  const handleDragEnter = (cell: Cell) => {
    if (active === undefined) return
    if (cell.type === active.type) return
    if (isStartOrTarget(cell)) return
    setOver(cell)
  }

  const handleDragEnd = () => {
    if (active === undefined || over === undefined) return
    const grid = [...state.grid]
    grid[active.row][active.col].type = "empty"
    grid[over.row][over.col].type = active.type
    dispatch({ type: "SET_GRID", payload: [...grid] })
    setActive(undefined)
    setOver(undefined)
  }

  return (
    <div
      ref={gridRef}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      className="bg-muted/50 flex h-full w-[calc(100vw-18.2rem)] backdrop-blur"
      onDragEnd={handleDragEnd}
    >
      <div className="m-auto">
        {state.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell) => (
              <div
                key={`${cell.row}-${cell.col}`}
                className={cn(
                  "border-muted-foreground/30 border first:border-l-2 last:border-r-2",
                  rowIndex === state.grid.length - 1 && "border-b-2",
                  rowIndex === 0 && "border-t-2",
                  cell.type === "wall" &&
                    "border-neutral-800 dark:border-neutral-600"
                )}
              >
                <GridCell
                  handleMouseDown={handleMouseDown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseUp}
                  handleDragEnter={handleDragEnter}
                  active={active}
                  disabled={state.status !== "idle"}
                  {...cell}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
