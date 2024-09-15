import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { useVisualizer } from "@/hooks/useVisualizer"
import { Grid } from "./grid"
import { Github } from "lucide-react"
import { Button } from "./ui/button"

export const Visualizer = () => {
  const { algorithmType, array } = useVisualizer()

  return (
    <main className="flex-1 p-4">
      <h1 className="mb-4 flex items-center gap-4 text-2xl font-bold tracking-tight">
        {siteConfig.title}{" "}
        <Button asChild size="icon" variant="secondary" className="size-8">
          <a
            href="https://github.com/tariqs26/algorithm-visualizer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} />
          </a>
        </Button>
      </h1>
      <section className="h-[calc(100vh-5rem)] border">
        {algorithmType === "sorting" ? (
          <div className="flex h-full items-end bg-muted/50 p-2 backdrop-blur">
            {array.map((item, index) => (
              <div
                key={index}
                className="mx-px w-full"
                style={{ height: `${item.height}px` }}
              >
                <div
                  className={cn(
                    "h-full w-full rounded-t-md border transition-all",
                    item.isSorted
                      ? "bg-green-600"
                      : item.isSwapping
                        ? "bg-orange-600"
                        : "bg-blue-600"
                  )}
                />
              </div>
            ))}
          </div>
        ) : (
          <Grid />
        )}
      </section>
    </main>
  )
}
