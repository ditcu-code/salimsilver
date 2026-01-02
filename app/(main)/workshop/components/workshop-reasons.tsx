import { Gem, Landmark, Medal } from "lucide-react"

const reasons = [
  {
    icon: Medal,
    title: "Guided by Masters",
    description:
      "Your masterpiece will be guided by experienced artisans with decades of expertise, ensuring quality and tradition in every step.",
  },
  {
    icon: Landmark,
    title: "Historic Venue",
    description:
      "Create in the same authentic studio where our family legacy began over a century ago, surrounded by living history.",
  },
  {
    icon: Gem,
    title: "Authentic Experience",
    description:
      "Immerse yourself in true Javanese heritage and take home a piece of history crafted by your own hands.",
  },
]

export function WorkshopReasons() {
  return (
    <section className="bg-stone-50 pt-16 pb-8 dark:bg-neutral-900/50">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="group flex flex-col items-center text-center md:items-start md:text-left"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 dark:bg-neutral-800">
                <reason.icon className="h-8 w-8 text-stone-900 dark:text-stone-100" />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold text-neutral-900 dark:text-neutral-50">
                {reason.title}
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
