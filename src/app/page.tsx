"use client"

import { useIsLargeViewPort } from "@/hooks/useIsLargeViewport"
import { useMounted } from "@/hooks/useMounted"
import { cn } from "@/lib/utils"

import { Sidebar } from "@/components/sidebar"
import { SmallViewportCard } from "@/components/small-viewport-card"
import { Visualizer } from "@/components/visualizer"
import { VisualizerProvider } from "@/components/visualizer-provider"

export default function Home() {
  const mounted = useMounted()
  const isLargeViewport = useIsLargeViewPort()

  return (
    <article
      className={cn(
        "flex min-h-screen",
        !isLargeViewport && "items-center justify-center"
      )}
    >
      {!mounted ? null : (
        <VisualizerProvider>
          {isLargeViewport ? (
            <>
              <Sidebar />
              <Visualizer />
            </>
          ) : (
            <SmallViewportCard />
          )}
        </VisualizerProvider>
      )}
    </article>
  )
}
