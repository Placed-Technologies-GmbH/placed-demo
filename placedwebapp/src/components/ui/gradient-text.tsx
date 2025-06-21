import { cn } from "@/lib/utils"
import * as React from "react"
import { HTMLAttributes } from "react"

interface GradientTextProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Array of colors for the gradient
   * @default ["#AFCBFF", "#050336", "#F0F2FF", "#E4FD57"]
   */
  colors?: string[]
  /**
   * Animation duration in seconds
   * @default 8
   */
  animationSpeed?: number
  /**
   * Show animated border
   * @default false
   */
  showBorder?: boolean
}

export function GradientText({
  children,
  className,
  colors = ["#AFCBFF", "#050336", "#F0F2FF", "#E4FD57"],
  animationSpeed = 8,
  showBorder = false,
  ...props
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(45deg, ${colors.join(", ")})`,
    backgroundSize: "300% 100%",
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center",
        "rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500",
        "overflow-hidden cursor-pointer",
        className
      )}
      style={{
        "--animation-duration": `${animationSpeed}s`,
      } as React.CSSProperties}
      {...props}
    >
      {showBorder && (
        <div
          className="absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient"
          style={{
            ...gradientStyle,
          }}
        >
          <div
            className="absolute inset-0 bg-background rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <span
        className="inline-block relative z-2 text-transparent bg-clip-text animate-gradient"
        style={{
          ...gradientStyle,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
        }}
      >
        {children}
      </span>
    </div>
  )
} 