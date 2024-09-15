import { useEffect, useState } from "react"
import { MIN_VIEWPORT_HEIGHT, MIN_VIEWPORT_WIDTH } from "@/lib/constants"

export const useIsLargeViewPort = () => {
  const [isLargeViewport, setIsLargeViewport] = useState(false)

  useEffect(() => {
    const checkViewportSize = () => {
      setIsLargeViewport(
        window.innerWidth >= MIN_VIEWPORT_WIDTH &&
          window.innerHeight >= MIN_VIEWPORT_HEIGHT
      )
    }

    checkViewportSize()
    window.addEventListener("resize", checkViewportSize)

    return () => window.removeEventListener("resize", checkViewportSize)
  }, [])

  return isLargeViewport
}
