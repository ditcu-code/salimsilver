import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-motion"
import { cn } from "@/lib/utils"

export interface FAQItem {
  question: string
  answer: string
  value?: string
}

interface FaqSectionProps {
  items: FAQItem[]
  className?: string
  title?: string
}

export function FaqSection({
  items,
  className,
  title = "Frequently Asked Questions",
}: FaqSectionProps) {
  return (
    <section className={cn(className)}>
      {title && <h2 className="mb-6 text-2xl font-semibold">{title}</h2>}
      <Accordion className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={item.value || `item-${index}`} value={item.value || `item-${index}`}>
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
