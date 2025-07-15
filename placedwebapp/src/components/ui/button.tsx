import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-text-sm font-medium transition-normal disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-error/20 dark:aria-invalid:ring-error/40 aria-invalid:border-error",
  {
    variants: {
      variant: {
        default:
          "bg-brand-navy text-text-inverse shadow-button hover:bg-brand-navy/80",
        destructive:
          "bg-error text-error-foreground shadow-button hover:bg-error/90 focus-visible:ring-error/20 dark:focus-visible:ring-error/40",
        outline:
          "border border-border text-text-secondary bg-surface shadow-button hover:bg-background-subtle hover:text-text-primary",
        secondary:
          "bg-secondary text-secondary-foreground shadow-button hover:bg-secondary/80",
        cta:
          "bg-cta text-cta-foreground shadow-button hover:bg-cta-hover border-0 font-semibold",
        accent:
          "bg-accent text-accent-foreground shadow-button hover:bg-accent-dark",
        ghost:
          "hover:bg-background-subtle hover:text-text-primary",
        link: "text-accent underline-offset-4 hover:text-accent-dark hover:underline",
        search: "bg-interactive/60 border border-border rounded-lg shadow-sm flex items-center justify-between p-2",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 px-0 py-1 has-[>svg]:px-0",
        sm: "h-8 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-lg px-6 has-[>svg]:px-4",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
