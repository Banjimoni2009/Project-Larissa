import { useState, type ReactNode } from "react"
import { Minus, Plus } from "lucide-react"

type FaqItem = {
  question: string
  answer: ReactNode
}

const faqs: FaqItem[] = [
  {
    question: "What types of properties does Serenia offer?",
    answer: (
      <>
        <p>We provide a wide range of properties, including:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li><strong>Residential Homes</strong> - exclusive housing with modern design.</li>
          <li><strong>Apartments</strong> - vertical living with complete facilities.</li>
          <li><strong>Commercial Spaces</strong> - shops, houses and business areas in prime locations.</li>
          <li><strong>Integrated Townships</strong> - complete with malls, green parks, schools, and lifestyle facilities.</li>
        </ul>
      </>
    ),
  },
  { question: "Where are Serenia's projects located?", answer: "Add your answer here." },
  { question: "What are the benefits of owning a Serenia property?", answer: "Add your answer here." },
  { question: "How can I purchase a Serenia property?", answer: "Add your answer here." },
  { question: "Does Serenia offer financing or mortgage options?", answer: "Add your answer here." },
  { question: "Is Serenia suitable for both living and investment?", answer: "Add your answer here." },
  { question: "Does Serenia manage public facilities within its townships?", answer: "Add your answer here." },
  { question: "Are there any promotions or special payment plans?", answer: "Add your answer here." },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="bg-gray-50 px-5 py-12 text-gray-900 md:py-16">
      {/* FAQ heading and accordion list */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 md:gap-8">
        <h2 className="max-w-56 text-center text-3xl leading-tight font-medium md:text-4xl">
          Frequently asked questions
        </h2>

        <div className="w-full divide-y divide-gray-200 border-y border-gray-200 px-4 md:px-8">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const answerId = `faq-answer-${index}`

            return (
              <div key={faq.question} className="py-3">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56593B] md:text-base"
                >
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-gray-300 text-base leading-none"
                  >
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={answerId}
                    className="mt-3 text-sm leading-relaxed text-gray-600"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ