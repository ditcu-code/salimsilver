"use client"

import { cn } from "@/lib/utils"
import { AnimatePresence, m as motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import * as React from "react"

const AccordionContext = React.createContext<{
  openItem: string | null
  setOpenItem: (value: string | null) => void
}>({
  openItem: null,
  setOpenItem: () => {},
})

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

export function Accordion({ children, className }: AccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null)

  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  // Pass the value down to children implicitly via context or just wrap them
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      return React.cloneElement(child, { itemValue: value })
    }
    return child
  })

  return <div className={cn("border-b", className)}>{childrenWithProps}</div>
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
  itemValue?: string // Injected by Item
}

export function AccordionTrigger({ children, className, itemValue }: AccordionTriggerProps) {
  const { openItem, setOpenItem } = React.useContext(AccordionContext)
  const isOpen = openItem === itemValue

  return (
    <button
      onClick={() => setOpenItem(isOpen ? null : itemValue!)}
      className={cn(
        "flex w-full flex-1 items-center justify-between py-4 font-medium transition-all hover:underline",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")}
      />
    </button>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
  itemValue?: string // Injected by Item
}

export function AccordionContent({ children, className, itemValue }: AccordionContentProps) {
  const { openItem } = React.useContext(AccordionContext)
  const isOpen = openItem === itemValue

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className={cn("pt-0 pb-4", className)}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
