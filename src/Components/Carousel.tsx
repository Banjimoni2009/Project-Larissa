import { useEffect, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"

export type CarouselSlide = {
  image: string
  title: string
  description: string
  alt: string
}

type CarouselProps = {
  slides: CarouselSlide[]
  label?: string
  autoplayMs?: number
}

export default function Carousel({ slides, label = "Featured homes", autoplayMs = 5000 }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const syncActiveSlide = () => setActiveSlide(emblaApi.selectedScrollSnap())
    emblaApi.on("select", syncActiveSlide)
    syncActiveSlide()
    return () => {
      emblaApi.off("select", syncActiveSlide)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || slides.length < 2) return
    const timer = window.setInterval(() => emblaApi.scrollNext(), autoplayMs)
    return () => window.clearInterval(timer)
  }, [autoplayMs, emblaApi, slides.length])

  return (
    <div className="absolute inset-0" role="region" aria-label={label} aria-roledescription="carousel">
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {slides.map((slide, index) => (
            <article
              key={slide.title}
              className="embla__slide relative h-full"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
            >
              <img src={slide.image} alt={slide.alt} className="absolute inset-0 h-full w-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/75" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 p-6 text-white sm:p-8 lg:p-7 xl:p-10">
                <div className="max-w-[65%]">
                  <h2 className="text-xl font-semibold sm:text-2xl">{slide.title}</h2>
                  <p className="mt-1.5 text-xs leading-5 text-white/90 sm:text-sm">{slide.description}</p>
                </div>
                <div className="flex shrink-0 gap-2" aria-label="Choose a home photo">
                  {slides.map((dot, dotIndex) => (
                    <button
                      key={dot.title}
                      type="button"
                      onClick={() => emblaApi?.scrollTo(dotIndex)}
                      aria-label={`Show photo ${dotIndex + 1}: ${dot.title}`}
                      aria-current={activeSlide === dotIndex ? "true" : undefined}
                      className={`h-1 w-6 rounded-full transition-all duration-200 hover:scale-y-150 active:scale-y-75 sm:w-9 ${activeSlide === dotIndex ? "bg-white" : "bg-white/45 hover:bg-white/75"}`}
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
