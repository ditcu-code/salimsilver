"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import {
  animate,
  motion,
  HTMLMotionProps,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"

import { cn } from "@/lib/utils"

const bentoGridVariants = cva(
  "relative grid gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
  {
    variants: {
      variant: {
        default: `
          grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]
          [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3
          [&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block
          [&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block
          [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
          [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
        `,
        threeCells: `
          grid-cols-2 grid-rows-2
          [&>*:first-child]:col-span-2
      `,
        fourCells: `
        grid-cols-3 grid-rows-2
        [&>*:first-child]:col-span-1
        [&>*:nth-child(2)]:col-span-2
        [&>*:nth-child(3)]:col-span-2
      `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}
const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)
function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (!context) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScroll Component"
    )
  }
  return context
}
const ContainerScroll = ({
  children,
  className,
  onProgressChange,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { onProgressChange?: (value: number) => void }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    onProgressChange?.(latest)
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  )
})
BentoGrid.displayName = "BentoGrid"

const BentoCell = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    const translate = useTransform(
      scrollYProgress,
      [0, 0.9],
      ["0%", "-35%"],
      { clamp: true }
    )
    const baseScale = useTransform(
      scrollYProgress,
      [0, 0.9],
      [1, 0.5],
      { clamp: true }
    )
    const appearProgress = useMotionValue(0)

    React.useEffect(() => {
      const controls = animate(appearProgress, 1, {
        duration: 0.8,
        ease: "easeOut",
      })

      return () => controls.stop()
    }, [appearProgress])

    const appearScale = useTransform(appearProgress, [0, 1], [0.9, 1])
    const opacity = useTransform(appearProgress, [0, 1], [0, 1])
    const scale = useTransform(
      [baseScale, appearScale],
      ([scrollValue, appearValue]) => Number(scrollValue) * Number(appearValue)
    )

    return (
      <motion.div
        ref={ref}
        className={cn("will-change-transform", className)}
        style={{
          translate,
          scale,
          opacity,
          ...style,
        }}
        {...props}
      ></motion.div>
    )
  }
)
BentoCell.displayName = "BentoCell"

interface ContainerScaleProps extends HTMLMotionProps<"div"> {
  appearAt?: number
}

const ContainerScale = React.forwardRef<HTMLDivElement, ContainerScaleProps>(
  ({ className, style, appearAt, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext()
    const clampedAppearAt =
      typeof appearAt === "number"
        ? Math.min(Math.max(appearAt, 0), 1)
        : undefined

    const opacityRange =
      clampedAppearAt !== undefined
        ? [Math.max(0, clampedAppearAt - 0.05), Math.min(1, clampedAppearAt + 0.05)]
        : [0, 0.5]
    const opacityOutput = clampedAppearAt !== undefined ? [0, 1] : [1, 0]

    const scaleRange =
      clampedAppearAt !== undefined
        ? [Math.max(0, clampedAppearAt - 0.05), Math.min(1, clampedAppearAt + 0.25)]
        : [0, 0.5]
    const scaleOutput = clampedAppearAt !== undefined ? [0.9, 1] : [1, 0]

    const opacity = useTransform(scrollYProgress, opacityRange, opacityOutput, {
      clamp: true,
    })
    const scale = useTransform(scrollYProgress, scaleRange, scaleOutput, {
      clamp: true,
    })

    const position = useTransform(scrollYProgress, (pos) =>
      pos >= 0.6 ? "absolute" : "fixed"
    )

    return (
      <motion.div
        ref={ref}
        className={cn("left-1/2 top-1/2 size-fit will-change-transform", className)}
        style={{
          translate: "-50% -50%",
          scale,
          position,
          opacity,
          ...style,
        }}
        {...props}
      />
    )
  }
)
ContainerScale.displayName = "ContainerScale"

interface ScrollAnimationProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  className?: string
  scrollProgress?: MotionValue<number>
}

export function ScrollAnimation({
  children,
  className,
  scrollProgress,
  ...props
}: ScrollAnimationProps) {
  const { scrollYProgress } = useScroll()
  const progress = scrollProgress || scrollYProgress

  return (
    <motion.div
      className={className}
      style={{
        y: useTransform(progress, [0, 1], [0, -100]),
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxImageProps extends HTMLMotionProps<"div"> {
  src: string
  alt: string
  className?: string
  scrollProgress?: MotionValue<number>
  position?: number
}

export function ParallaxImage({
  src,
  alt,
  className,
  scrollProgress,
  position = 0,
  ...props
}: ParallaxImageProps) {
  const { scrollYProgress } = useScroll()
  const progress = scrollProgress || scrollYProgress

  return (
    <motion.div
      className={className}
      style={{
        y: useTransform(progress, [0, 1], [0, -100 * position]),
      }}
      {...props}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </motion.div>
  )
}

export { ContainerScroll, BentoGrid, BentoCell, ContainerScale }
