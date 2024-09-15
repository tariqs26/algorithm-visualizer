import { useContext } from "react"
import { VisualizerContext } from "@/components/providers/visualizer"

export const useVisualizer = () => {
  const context = useContext(VisualizerContext)

  if (context === null)
    throw new Error("useVisualizer must be used within a VisualizerProvider")

  return context
}
