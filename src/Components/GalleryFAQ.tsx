import { useState } from "react"
import { Minus, Plus } from "../imports"

type GalleryFaqItem = {
  question: string
  answer: string
}

// Gallery-specific questions and answers.
const galleryFaqs: GalleryFaqItem[] = [
  {
    question: "Are the furniture and decorations in the gallery included in the purchase?",
    answer: "The standard package includes the house structure and built-in features only. Furniture and decorations shown in the gallery are for illustration purposes and are not part of the purchase.",
  },
  {
    question: "Will the property I purchase look exactly like the gallery images?",
    answer: "Gallery images show the design direction and available finishes. Final details may vary according to the selected unit, cluster, and package.",
  },
  {
    question: "Can I visit a show unit to see the interiors in person?",
    answer: "Yes. You can schedule a visit and our team will arrange a guided show-unit tour.",
  },
  {
    question: "Can I request changes to the kitchen, bedroom, or living room layout?",
    answer: "Layout changes may be available for selected units before construction is completed. Contact our team for package details.",
  },
  {
    question: "Do you provide different design themes for the interiors?",
    answer: "Selected Serenia homes include flexible interior themes and finish options. Availability depends on the unit and cluster.",
  },
]

function GalleryFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="px-5 py-16 md:py-20">
      <h2 className="mx-auto max-w-md text-center text-3xl leading-tight font-medium md:text-4xl">
        FAQs after our<br />customer sees gallery
      </h2>

      <div className="mx-auto mt-10 max-w-3xl border-t border-[#ededed]">
        {galleryFaqs.map((faq, index) => {
          const isOpen = openIndex === index
          const answerId = `gallery-faq-answer-${index}`

          return (
            <div key={faq.question} className="border-b border-[#ededed]">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={answerId}
                className="flex w-full items-center justify-between gap-5 px-4 py-5 text-left text-sm font-semibold md:text-base"
              >
                {faq.question}
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-[#ddd]"
                >
                  {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                </span>
              </button>

              {isOpen && (
                <p id={answerId} className="px-4 pb-5 text-sm leading-6 text-[#666]">
                  {faq.answer}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default GalleryFAQ
