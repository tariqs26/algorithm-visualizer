import { siteConfig } from "@/config/site"
import { MIN_VIEWPORT_HEIGHT, MIN_VIEWPORT_WIDTH } from "@/lib/constants"

export const SmallViewportCard = () => (
  <section className="m-4 max-w-xl rounded-xl border p-4 shadow-md">
    <h2 className="mb-2 flex items-center justify-between text-2xl font-bold tracking-tight">
      {siteConfig.title}
    </h2>
    <p className="mb-6">
      Please open this page on a device with a larger screen or increase your
      viewport size. Due to the nature of this application, smaller viewports
      are not supported.
    </p>
    <div className="mb-2 aspect-video overflow-auto rounded-xl border">
      <video
        className="h-full w-full object-cover"
        controls
        poster="/og-image.jpg"
      >
        <source src="/preview.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
    <span className="text-sm text-muted-foreground">
      Minimum supported viewport size is {MIN_VIEWPORT_WIDTH}px width and{" "}
      {MIN_VIEWPORT_HEIGHT}px height.
    </span>
  </section>
)
