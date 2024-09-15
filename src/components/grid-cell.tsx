import { Milestone, Target } from "lucide-react"

import { CELL_SIZE } from "@/lib/constants"
import { isStartOrTarget } from "@/lib/pathfinding/grid"
import type { Cell } from "@/lib/types"
import { cn } from "@/lib/utils"

type MouseHandler = (cell: Cell) => void

type GridCellProps = Readonly<
  Cell & {
    active?: Cell
    disabled: boolean
    handleMouseDown: MouseHandler
    handleMouseEnter: MouseHandler
    handleMouseLeave: () => void
    handleDragEnter: MouseHandler
  }
>

export const GridCell = (cell: GridCellProps) => (
  <div
    onMouseDown={() => cell.handleMouseDown(cell)}
    onMouseEnter={() => cell.handleMouseEnter(cell)}
    onMouseUp={cell.handleMouseLeave}
    onDragEnter={() => cell.handleDragEnter(cell)}
    draggable={isStartOrTarget(cell)}
    className={cn(
      "flex items-center justify-center transition-all",
      !cell.disabled &&
        (isStartOrTarget(cell)
          ? "hover:cursor-move"
          : "transition-none hover:cursor-pointer"),
      cell.disabled && "cursor-not-allowed",
      cell.type === "start" && "bg-green-600 text-white",
      cell.type === "target" && "bg-red-600 text-white",
      cell.type === "wall" && "animate-wall bg-neutral-800 dark:bg-neutral-600",
      cell.type === "visited" && "animate-visited bg-cyan-500",
      cell.type === "path" && "animate-path bg-green-600",
      cell.active?.type === cell.type && "ring-2 ring-blue-500"
    )}
    style={{ width: CELL_SIZE, height: CELL_SIZE }}
  >
    {cell.type === "start" && <Milestone />}
    {cell.type === "target" && <Target />}
  </div>
)
