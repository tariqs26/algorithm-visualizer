import { useContext } from "react"
import { VisualizerContext } from "@/components/visualizer-provider"

export const useVisualizer = () => {
  const context = useContext(VisualizerContext)

  if (context === null)
    throw new Error("useVisualizer must be used within a VisualizerProvider")

  return context
}
