import { useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bed,
  Building2,
  ChevronDown,
  Leaf,
  MapPin,
  Ruler,
  ShieldCheck,
  Trees,
  homeImage2 as typeAExterior,
  homeImage4 as typeAExteriorAlt,
  propertyImage7 as arunaHero,
  propertyImage6 as arunaCommunity,
  propertyImage10 as typeBImage,
  propertyImage6 as typeCImage,
  amenities4 as parkImage,
  amenities2 as joggingImage,
  amenities5 as playgroundImage,
} from "../imports"
import Footer from "../Components/Footer"
import Brochure from "../Components/Brochure"


const homeTypes = [
  {
    name: "Aruna Type-A",
    description: "Compact & efficient living — minimal housing for practical family living.",
    image: typeAExterior,
    alternateImages: [typeAExterior, typeAExteriorAlt, arunaHero],
    landArea: "2,500 ft²",
    buildingArea: "1,250 ft²",
    bedrooms: "3 Bedrooms",
    bathrooms: "2 Bathrooms",
    carpet: "Per floor",
    floors: "2 floors",
  },
  {
    name: "Aruna Type-B",
    description: "Spacious & stylish layout — perfect for growing families who need more room and modern comfort.",
    image: typeBImage,
    alternateImages: [typeBImage, typeCImage, typeAExterior],
    landArea: "2,500 ft²",
    buildingArea: "1,600 ft²",
    bedrooms: "4 Bedrooms",
    bathrooms: "3 Bathrooms",
    carpet: "Per floor",
    floors: "2 floors",
  },
  {
    name: "Aruna Type-C",
    description: "Premium & spacious design — perfect for larger households seeking luxury and comfort.",
    image: typeCImage,
    alternateImages: [typeCImage, typeAExterior, typeBImage],
    landArea: "3,200 ft²",
    buildingArea: "2,100 ft²",
    bedrooms: "4 Bedrooms",
    bathrooms: "4 Bathrooms",
    carpet: "Per floor",
    floors: "2 floors",
  },
]

const reasons = [
  {
    title: "Green living environment",
    description: "Surrounded by landscaped parks and open spaces, offering fresh air and a healthier lifestyle.",
    icon: Leaf,
  },
  {
    title: "Modern minimalist design",
    description: "Homes designed for comfort and functionality, blending aesthetics with practical living.",
    icon: Building2,
  },
  {
    title: "Family-oriented lifestyle",
    description: "Safe, pedestrian-friendly environments that nurture connection, growth, and togetherness.",
    icon: Trees,
  },
]

const facilities = [
  { title: "Landscaped Parks", description: "Green spaces filled with trees and walking paths.", image: parkImage },
  { title: "Jogging track", description: "Dedicated paths for running and walking.", image: joggingImage },
  { title: "Central Playground", description: "A welcoming play area for children and families.", image: playgroundImage },
]

const highlights = [
  ["Greenfield International School", "5 min drive"],
  ["Serenity Mall & Lifestyle Center", "8 min drive"],
  ["Riverside Medical Center", "10 min drive"],
  ["Serenity Central Station", "7 min drive"],
]

function Aruna() {
  const location = useLocation()
  const [activeSlides, setActiveSlides] = useState<Record<string, number>>({})
  const [openHighlight, setOpenHighlight] = useState<number | null>(null)
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)
  const facilitiesRef = useRef<HTMLDivElement>(null)

  function changeSlide(homeName: string, direction: number, imageCount: number) {
    setActiveSlides((slides) => ({
      ...slides,
      [homeName]: ((slides[homeName] ?? 0) + direction + imageCount) % imageCount,
    }))
  }

  return (
    <main className="bg-white text-[#171717]">
      <section className="relative">
        <img
          src={arunaHero}
          alt="Aruna residence homes"
          className="h-[270px] w-full object-cover object-center sm:h-[340px] lg:h-[440px]"
        />
        <div className="absolute inset-x-4 bottom-0 mx-auto grid max-w-5xl translate-y-1/2 grid-cols-1 border border-[#eeeeee] bg-white shadow-sm sm:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-center p-5 sm:p-7">
            <div className="mb-3 flex items-center gap-2 text-[9px] text-[#777]">
              <Link to="/properties" className="hover:text-[#171717]">All clusters</Link>
              <span>/</span>
              <span className="bg-[#f5f5f5] px-2 py-1 text-[#171717]">Aruna residence</span>
            </div>
            <h1 className="text-3xl font-medium leading-tight sm:text-4xl">Aruna<br className="hidden sm:block" /> residence</h1>
            <p className="mt-2 text-[10px] text-[#777]">Starts from <span className="font-semibold text-[#171717]">$85,000</span></p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#eeeeee] p-5 text-[9px] sm:border-l sm:border-t-0 sm:p-6">
            <p className="flex items-center gap-2 text-[#777]"><Bed size={12} /> Bed rooms</p>
            <p className="text-right">2-4 bedroom options</p>
            <p className="flex items-center gap-2 text-[#777]"><MapPin size={12} /> Location</p>
            <p className="text-right">North Serenia, main park area</p>
            <p className="flex items-center gap-2 text-[#777]"><Building2 size={12} /> Property type</p>
            <p className="text-right">Residential cluster</p>
            <p className="flex items-center gap-2 text-[#777]"><ShieldCheck size={12} /> Availability</p>
            <p className="text-right">Ready to explore</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-32 max-w-5xl px-5 sm:mt-36">
        <img
          src={arunaCommunity}
          alt="Contemporary homes in the Aruna community"
          className="h-[190px] w-full object-cover sm:h-[280px] lg:h-[350px]"
        />
      </section>

      <section className="mx-auto max-w-xl px-5 py-12 text-center sm:py-16">
        <p className="mx-auto mb-3 w-fit bg-[#fff8e8] px-2 py-1 text-[9px] font-semibold text-[#a36b11]">The modern comfort</p>
        <h2 className="text-2xl font-medium leading-tight sm:text-3xl">
          Aruna Residence offers modern residences with an elegant touch,
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#888]">
          designed to provide maximum comfort for families. With functional layouts, optimal natural lighting, and high-quality materials.
        </p>
        <button type="button" onClick={() => setIsBrochureOpen(true)} className="mt-5 inline-flex items-center gap-1 bg-[#f5f5f5] px-4 py-2 text-[10px] font-medium hover:bg-[#56593B] hover:text-white">
          Request brochure <ArrowUpRight size={12} />
        </button>
      </section>

      <section className="bg-[#f8f8f8] py-12 sm:py-16">
        <div className="mx-auto max-w-375 px-5 md:px-10">
          <div className="mb-6 flex items-end justify-between gap-6">
            <h2 className="text-2xl font-medium leading-tight sm:text-3xl">Available<br />home types</h2>
            <p className="hidden max-w-56 text-[9px] leading-4 text-[#777] sm:block">
              Find the type of house that suits your needs. The clusters are the best place for a better experience, more than just a home.
            </p>
          </div>

          <div className="space-y-4">
            {homeTypes.map((home) => {
              const activeSlide = activeSlides[home.name] ?? 0
              const currentImage = home.alternateImages[activeSlide]

              return (
                <article key={home.name} className="grid grid-cols-1 gap-3 bg-white p-3 shadow-sm md:grid-cols-2">
                  <div className="flex flex-col p-2 sm:p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-medium">
                          {home.name === "Aruna Type-A" ? (
                            <Link to="/properties/aruna/type-a" className="hover:text-[#56593B]">{home.name}</Link>
                          ) : home.name}
                        </h3>
                        <p className="mt-1 max-w-xs text-[9px] leading-4 text-[#777]">{home.description}</p>
                      </div>
                      {home.name === "Aruna Type-A" ? (
                        <Link to="/properties/aruna/type-a" className="flex shrink-0 items-center gap-1 bg-[#fff7e4] px-2 py-1 text-[8px] text-[#a56e12]">
                          12 unit available <ArrowUpRight size={9} />
                        </Link>
                      ) : (
                        <span className="shrink-0 bg-[#fff7e4] px-2 py-1 text-[8px] text-[#a56e12]">12 unit available</span>
                      )}
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[9px] text-[#777]">
                      <span className="flex items-center gap-2"><Ruler size={11} />Land area</span><span className="text-right text-[#171717]">{home.landArea}</span>
                      <span className="flex items-center gap-2"><Building2 size={11} />Building area</span><span className="text-right text-[#171717]">{home.buildingArea}</span>
                      <span className="flex items-center gap-2"><Bed size={11} />Bedrooms</span><span className="text-right text-[#171717]">{home.bedrooms}</span>
                      <span className="flex items-center gap-2"><ShieldCheck size={11} />Bathrooms</span><span className="text-right text-[#171717]">{home.bathrooms}</span>
                      <span className="flex items-center gap-2"><Ruler size={11} />Carpet</span><span className="text-right text-[#171717]">{home.carpet}</span>
                      <span className="flex items-center gap-2"><Building2 size={11} />Floors</span><span className="text-right text-[#171717]">{home.floors}</span>
                    </div>

                    <div className="mt-auto flex gap-2 pt-5">
                      <Link to="/tour" state={{ backgroundLocation: location }} className="flex flex-1 items-center justify-center gap-2 bg-[#56593B] px-3 py-2.5 text-[9px] font-semibold text-white hover:bg-[#42452d]">
                        Schedule tour
                      </Link>
                      <Link to="/gallery" className="flex flex-1 items-center justify-center gap-2 bg-[#f3f3f3] px-3 py-2.5 text-[9px] font-medium hover:bg-[#e9e9e9]">
                        Preview 360°
                      </Link>
                    </div>
                  </div>

                  <div className="relative min-h-[260px] overflow-hidden sm:min-h-[300px]">
                    {home.name === "Aruna Type-A" ? (
                      <Link to="/properties/aruna/type-a" className="absolute inset-0 z-10" aria-label={`Open ${home.name} details`}>
                        <img src={currentImage} alt={`${home.name} exterior`} className="h-full w-full object-cover" />
                      </Link>
                    ) : (
                      <img src={currentImage} alt={`${home.name} exterior`} className="absolute inset-0 h-full w-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => changeSlide(home.name, -1, home.alternateImages.length)}
                      aria-label={`Previous ${home.name} photo`}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 hover:bg-white"
                    >
                      <ArrowLeft size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => changeSlide(home.name, 1, home.alternateImages.length)}
                      aria-label={`Next ${home.name} photo`}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 hover:bg-white"
                    >
                      <ArrowRight size={14} />
                    </button>
                    <div className="absolute inset-x-0 bottom-0 flex gap-1 bg-gradient-to-t from-black/50 to-transparent p-3 pt-8">
                      {home.alternateImages.map((image, index) => (
                        <button
                          key={`${home.name}-${index}`}
                          type="button"
                          onClick={() => setActiveSlides((slides) => ({ ...slides, [home.name]: index }))}
                          aria-label={`Show ${home.name} photo ${index + 1}`}
                          aria-pressed={activeSlide === index}
                          className={`h-10 w-12 overflow-hidden border ${activeSlide === index ? "border-white" : "border-white/40"}`}
                        >
                          <img src={image} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#111111] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-375 px-5 md:px-10">
          <h2 className="max-w-xs text-3xl font-medium leading-tight">The reasons why<br />you must choose<br />this cluster</h2>
          <div className="mt-7 grid grid-cols-1 items-center gap-3 md:grid-cols-3">
            {reasons.map((reason, index) => {
              const Icon = reason.icon
              return (
                <article key={reason.title} className={`min-h-40 bg-[#202020] p-5 ${index === 1 ? "md:mt-12" : index === 2 ? "md:mt-24" : ""}`}>
                  <Icon size={20} className="text-[#b8c17a]" />
                  <h3 className="mt-7 text-xs font-medium">{reason.title}</h3>
                  <p className="mt-2 text-[9px] leading-4 text-[#aaa]">{reason.description}</p>
                  <Link to="/amenities" className="mt-4 inline-flex items-center gap-1 bg-[#333] px-2.5 py-1.5 text-[8px] hover:bg-[#444]">
                    Learn more <ArrowUpRight size={10} />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-375 gap-8 px-5 py-12 md:grid-cols-2 md:px-10 md:py-16">
        <div>
          <p className="mb-3 w-fit bg-[#fff8e8] px-2 py-1 text-[9px] font-semibold text-[#a36b11]">Serenia location</p>
          <h2 className="text-3xl font-medium leading-tight">Discover the<br />Aruna residence</h2>
          <p className="mt-3 max-w-xs text-[10px] leading-5 text-[#777]">
            Serenia Residences, Harmony Street No. 12,<br />Southville, England.
          </p>
        </div>

        <div className="divide-y divide-[#eeeeee]">
          {highlights.map(([name, distance], index) => (
            <div key={name}>
              <button
                type="button"
                onClick={() => setOpenHighlight(openHighlight === index ? null : index)}
                aria-expanded={openHighlight === index}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span>
                  <span className="block text-[10px] font-medium">{name}</span>
                  <span className="mt-1 block text-[8px] text-[#888]">{distance} from Aruna residence</span>
                </span>
                <ChevronDown size={13} className={`shrink-0 transition-transform ${openHighlight === index ? "rotate-180" : ""}`} />
              </button>
              {openHighlight === index && (
                <p className="pb-4 text-[9px] leading-4 text-[#777]">
                  Convenient access from the Aruna residence community.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="relative h-[260px] overflow-hidden border-y border-[#eeeeee] bg-[#eee9d9] sm:h-[340px]" aria-label="Map of the Aruna residence area">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(24deg, transparent 46%, #fff 47%, #fff 49%, transparent 50%), linear-gradient(112deg, transparent 35%, #fff 36%, #fff 38%, transparent 39%), linear-gradient(165deg, transparent 62%, #fff 63%, #fff 65%, transparent 66%), linear-gradient(72deg, transparent 19%, #fff 20%, #fff 22%, transparent 23%), linear-gradient(135deg, transparent 77%, #fff 78%, #fff 80%, transparent 81%)",
          }}
        />
        <div className="absolute -left-10 top-8 h-20 w-64 rotate-12 rounded-[50%] bg-[#b7d8df]/80" />
        <div className="absolute right-[12%] top-[15%] h-24 w-32 rotate-12 rounded-[35%] bg-[#cdd8a2]/80" />
        <div className="absolute left-[24%] top-[54%] h-4 w-4 rounded-full border-4 border-white bg-[#56593B] shadow-md sm:left-[42%]" />
        <MapPin size={23} className="absolute left-[24%] top-[46%] -translate-x-1/2 text-[#56593B] sm:left-[42%]" />
      </section>

      <section className="mx-auto max-w-375 px-5 py-12 md:px-10 md:py-16">
        <h2 className="mx-auto max-w-xs text-center text-2xl font-medium leading-tight sm:text-3xl">
          Facility &amp;<br />amenities in this<br />cluster
        </h2>
        <div ref={facilitiesRef} className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2">
          {facilities.map((facility) => (
            <article key={facility.title} className="w-[85%] shrink-0 snap-start border border-[#eeeeee] bg-white p-3 sm:w-[calc(33.333%-11px)]">
              <h3 className="text-xs font-medium">{facility.title}</h3>
              <p className="mt-1 text-[9px] text-[#777]">{facility.description}</p>
              <img src={facility.image} alt={facility.title} className="mt-3 h-44 w-full object-cover sm:h-52" />
            </article>
          ))}
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            aria-label="Previous facilities"
            onClick={() => facilitiesRef.current?.scrollBy({ left: -320, behavior: "smooth" })}
            className="border border-[#eeeeee] p-2 hover:bg-[#f5f5f5]"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            type="button"
            aria-label="Next facilities"
            onClick={() => facilitiesRef.current?.scrollBy({ left: 320, behavior: "smooth" })}
            className="border border-[#eeeeee] p-2 hover:bg-[#f5f5f5]"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <Footer />
      {isBrochureOpen && <Brochure onClose={() => setIsBrochureOpen(false)} />}
    </main>
  )
}

export default Aruna
