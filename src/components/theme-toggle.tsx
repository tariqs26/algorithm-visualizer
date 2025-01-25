import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="[&>svg]:size-5"
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
