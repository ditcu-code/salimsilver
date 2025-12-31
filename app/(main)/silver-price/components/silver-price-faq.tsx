import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-motion"
import { cn } from "@/lib/utils"

interface SilverPriceFaqProps {
  className?: string
}

import { FAQ_ITEMS } from "../constants"

export function SilverPriceFaq({ className }: SilverPriceFaqProps) {
  return (
    <section className={cn(className)}>
      <h2 className="mb-6 text-2xl font-semibold">Frequently Asked Questions</h2>
      <Accordion className="w-full">
        {FAQ_ITEMS.map((item) => (
          <AccordionItem key={item.value} value={item.value}>
            <AccordionTrigger className="cursor-pointer text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
