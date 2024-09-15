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
  const { grid, status, setGrid, setGridDimensions } = useVisualizer()
  const mounted = useMounted()

  useEffect(() => {
    const resizeEventListener = () => {
      if (!gridRef.current) return
      const rect = gridRef.current.getBoundingClientRect()
      const height = Math.round(rect.height) - 2 * CELL_SIZE
      const width = Math.round(rect.width) - 2 * CELL_SIZE
      const rows = makeOdd(Math.floor(height / CELL_SIZE))
      const cols = makeOdd(Math.floor(width / CELL_SIZE))
      setGridDimensions({ rows, cols })
    }
    if (mounted) resizeEventListener()
    window.addEventListener("resize", resizeEventListener)
    return () => window.removeEventListener("resize", resizeEventListener)
  }, [mounted])

  const handleMouseDown = (cell: Cell) => {
    if (status !== "idle") return
    if (isStartOrTarget(cell)) {
      setActive(cell)
      return
    }
    setIsMouseDown(true)
    grid[cell.row][cell.col].type = cell.type === "empty" ? "wall" : "empty"
    setGrid([...grid])
  }

  const handleMouseEnter = (cell: Cell) => {
    if (
      !isMouseDown ||
      cell.type === "start" ||
      cell.type === "target" ||
      status !== "idle"
    )
      return
    grid[cell.row][cell.col].type = cell.type === "empty" ? "wall" : "empty"
    setGrid([...grid])
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
    console.log(over.row, over.col)
    grid[active.row][active.col].type = "empty"
    grid[over.row][over.col].type = active.type
    setGrid([...grid])
    setActive(undefined)
    setOver(undefined)
  }

  return (
    <div
      ref={gridRef}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      className="flex h-full w-[calc(100vw-18.2rem)] bg-muted/50 backdrop-blur"
      onDragEnd={handleDragEnd}
    >
      <div className="m-auto">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "border border-muted-foreground/30 first:border-l-2 last:border-r-2",
                  rowIndex === grid.length - 1 && "border-b-2",
                  rowIndex === 0 && "border-t-2",
                  cell.type === "wall" &&
                    "border-neutral-800 dark:border-neutral-600"
                )}
              >
                <GridCell
                  key={`${rowIndex}-${colIndex}`}
                  handleMouseDown={handleMouseDown}
                  handleMouseEnter={handleMouseEnter}
                  handleMouseLeave={handleMouseUp}
                  handleDragEnter={handleDragEnter}
                  active={active}
                  disabled={status !== "idle"}
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
