import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  ArrowUpRight,
  Bath,
  Bed,
  Building2,
  Check,
  ChevronRight,
  Copy,
  House,
  MapPin,
  Maximize2,
  Ruler,
  Share2,
  Sofa,
  homeImage2 as typeAExterior,
  homeImage4 as exteriorAlt,
  propertyImage7 as exteriorStreet,
  homeRectangle1095 as bedroomImage,
  homeRectangle1091 as diningImage,
  homeRectangle1092 as livingImage,
  homeRectangle1094 as workspaceImage,
  homeRectangle1097 as interiorImage,
  amenities4 as parkImage,
} from "../imports"
import Footer from "../Components/Footer"

const heroImages = [typeAExterior, exteriorAlt, exteriorStreet]
const galleryCategories = ["Outside", "Bedroom", "Bathroom", "Kitchen", "Backyard", "Family room", "Street"] as const
type GalleryCategory = (typeof galleryCategories)[number]

const galleryImages: Record<GalleryCategory, string[]> = {
  Outside: [typeAExterior, exteriorAlt, exteriorStreet],
  Bedroom: [bedroomImage, interiorImage, workspaceImage],
  Bathroom: [interiorImage, bedroomImage],
  Kitchen: [diningImage, livingImage, workspaceImage],
  Backyard: [parkImage, exteriorStreet],
  "Family room": [livingImage, interiorImage, bedroomImage],
  Street: [exteriorStreet, typeAExterior, exteriorAlt],
}

const overviewDetails = [
  { icon: Ruler, title: "Land & building size", value: "2,500 ft²" },
  { icon: House, title: "House style", value: "Modern minimalist" },
  { icon: Building2, title: "Total floor", value: "Double floor" },
  { icon: Bed, title: "Bedrooms", value: "3 bedrooms" },
  { icon: Bath, title: "Bathrooms", value: "2 bathrooms" },
  { icon: MapPin, title: "Cluster", value: "Aruna residence" },
]

const specifications = [
  {
    title: "Interior Features",
    details: [
      ["Flooring", "Polished 60x60 cm granite tiles throughout living and dining areas."],
      ["Lighting", "LED fixtures with dimmable switches in living room and bedrooms."],
      ["Appliances", "Built-in electric stove, range hood, and sink in an open-concept kitchen."],
      ["Design Details", "Vaulted living area and large windows for natural light."],
      ["Smart Elements", "Smart lighting controls and keyless door lock system."],
    ],
  },
  {
    title: "Property & Layout",
    details: [
      ["Bedrooms", "Three comfortable bedrooms, including a primary suite."],
      ["Bathrooms", "Two full bathrooms with contemporary fixtures."],
      ["Living areas", "Open-plan living and dining space connected to the kitchen."],
    ],
  },
  {
    title: "Construction & Materials",
    details: [
      ["Structure", "Reinforced concrete structure with durable exterior finishes."],
      ["Windows", "Large windows designed to bring in natural light."],
      ["Finishes", "Modern, easy-care finishes for everyday family living."],
    ],
  },
  {
    title: "Utilities & Green Energy",
    details: [
      ["Energy", "Efficient lighting and ventilation throughout the home."],
      ["Water", "Water-efficient fixtures and a dedicated utility area."],
    ],
  },
  {
    title: "Community & Amenities",
    details: [
      ["Neighborhood", "Access to landscaped parks, jogging paths, and shared spaces."],
      ["Security", "Managed entry and neighborhood security."],
    ],
  },
]

const nearbyPlaces = [
  ["Greenfield International School", "2.1 km · 5 min drive"],
  ["Serenity Mall & Lifestyle Center", "3.4 km · 10 min drive"],
  ["Royal Care Hospital", "4.6 km · 12 min drive"],
  ["Serenity Central Station", "2.7 km · 8 min drive"],
]

const groundFloorRooms = ["Living room", "Kitchen", "Dining area", "Bedroom", "Bathroom", "Entry"]
const upperFloorRooms = ["Bedroom 1", "Bedroom 2", "Primary suite", "Bathroom", "Family lounge", "Balcony"]

function ArunatypeA() {
  const location = useLocation()
  const [activeHeroImage, setActiveHeroImage] = useState(0)
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("Bedroom")
  const [activeGalleryImage, setActiveGalleryImage] = useState(0)
  const [openSpecification, setOpenSpecification] = useState("Interior Features")
  const [activeFloor, setActiveFloor] = useState<"Ground floor" | "Upper floor">("Ground floor")
  const [shareMessage, setShareMessage] = useState("")

  const currentGallery = galleryImages[activeCategory]
  const floorRooms = activeFloor === "Ground floor" ? groundFloorRooms : upperFloorRooms

  async function copyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareMessage("Link copied")
    } catch {
      setShareMessage("Unable to copy link")
    }
  }

  return (
    <main className="bg-[#f8f8f8] text-[#171717]">
      <div className="mx-auto max-w-[1500px] px-4 md:px-8">
        <div className="flex min-h-11 items-center justify-between gap-3 text-[9px] text-[#777]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
            <Link to="/properties" className="hover:text-[#171717]">All clusters</Link>
            <ChevronRight size={10} />
            <Link to="/properties/aruna" className="hover:text-[#171717]">Aruna residence</Link>
            <ChevronRight size={10} />
            <span className="bg-[#eeeeee] px-2 py-1 text-[#171717]">Type-A</span>
          </nav>
          <button type="button" onClick={copyPageLink} className="flex items-center gap-1.5 bg-white px-3 py-1.5 hover:bg-[#eeeeee]" aria-live="polite">
            {shareMessage === "Link copied" ? <Check size={11} /> : <Share2 size={11} />}
            {shareMessage || "Share"}
            <Copy size={10} />
          </button>
        </div>

        <section>
          <div className="relative h-[310px] overflow-hidden bg-[#e6e6e6] sm:h-[430px] lg:h-[520px]">
            <img src={heroImages[activeHeroImage]} alt="Aruna Type A exterior" className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/50 to-transparent p-4">
              <span className="text-[9px] text-white">Aruna Type-A · Exterior view</span>
              <div className="flex gap-1.5">
                {heroImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveHeroImage(index)}
                    aria-label={`Show exterior photo ${index + 1}`}
                    aria-pressed={activeHeroImage === index}
                    className={`h-12 w-14 overflow-hidden border sm:h-14 sm:w-16 ${activeHeroImage === index ? "border-white" : "border-white/40"}`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-2 h-px bg-[#d6d6d6]" />
        </section>

        <div className="grid gap-3 py-3 lg:grid-cols-[minmax(0,1.9fr)_minmax(250px,0.82fr)]">
          <div className="space-y-3">
            <section className="bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h1 className="text-xl font-medium">Aruna - Type A</h1>
                  <p className="mt-1 text-[9px] text-[#777]">Serenia Residences, Harmony Street No. 12, Southville, London, England</p>
                </div>
                <span className="bg-[#f1f1f1] px-3 py-2 text-[9px] font-medium">12 unit available <ArrowUpRight size={10} className="ml-1 inline" /></span>
              </div>

              <div className="mt-4 grid grid-cols-2 border-l border-t border-[#eeeeee] sm:grid-cols-3">
                {overviewDetails.map(({ icon: Icon, title, value }) => (
                  <div key={title} className="flex min-h-14 items-center gap-2 border-b border-r border-[#eeeeee] px-3 py-2">
                    <Icon size={12} className="shrink-0 text-[#56593B]" />
                    <div>
                      <p className="text-[8px] text-[#777]">{title}</p>
                      <p className="mt-0.5 text-[9px] font-medium">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <h2 className="text-xs font-semibold">About properties</h2>
              <p className="mt-2 text-[9px] leading-[1.65] text-[#666]">
                Aruna Residence offers modern homes with minimalist design that blend with the green surroundings, providing comfort for dynamic families. Each home features an open layout that maximizes natural light and air circulation. A spacious living room connects directly to the backyard, supporting a healthy and harmonious lifestyle.
              </p>
              <p className="mt-2 text-[9px] leading-[1.65] text-[#666]">
                The primary bedroom features a private balcony, while the modern open-concept kitchen creates a natural gathering place. Aruna Type-A is designed for families seeking a practical home with contemporary style and access to neighborhood amenities.
              </p>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <h2 className="text-xs font-semibold">Locations</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-[1.05fr_1fr]">
                <div className="relative min-h-44 overflow-hidden bg-[#eee9d9]" aria-label="Map of the Aruna residence area">
                  <svg viewBox="0 0 480 280" className="absolute inset-0 h-full w-full" role="img" aria-label="Illustrated neighborhood map">
                    <rect width="480" height="280" fill="#eee9d9" />
                    <path d="M0 50L120 0h80L30 280H0zM315 0h58L245 280h-55zM440 0h40v80l-130 200h-70z" fill="#d2dfb6" />
                    <path d="M-20 240L490 45M-5 100L435 300M90-10l190 300M350-20L80 300M-20 165L490 195" stroke="#fff" strokeWidth="13" fill="none" />
                    <path d="M-20 240L490 45M-5 100L435 300M90-10l190 300M350-20L80 300M-20 165L490 195" stroke="#d7d1bd" strokeWidth="1.5" fill="none" />
                    <path d="M20 20l70 18M145 70l80 20M315 122l100 24M35 210l95 20M300 225l95 18M210 40l-30 70M420 190l-40 55" stroke="#fff" strokeWidth="6" fill="none" />
                    <circle cx="238" cy="142" r="13" fill="#56593B" stroke="white" strokeWidth="5" />
                  </svg>
                  <MapPin size={16} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[130%] text-[#56593B]" />
                </div>
                <div className="divide-y divide-[#eeeeee] border border-[#eeeeee] px-3">
                  <p className="py-2 text-[9px] font-medium">This residence is near with:</p>
                  {nearbyPlaces.map(([name, distance]) => (
                    <div key={name} className="flex items-center justify-between gap-2 py-2">
                      <div><p className="text-[9px] font-medium">{name}</p><p className="mt-0.5 text-[8px] text-[#888]">{distance}</p></div>
                      <MapPin size={11} className="shrink-0 text-[#777]" />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold">Gallery</h2>
                <Link to="/properties/aruna" className="text-[9px] text-[#777] hover:text-[#171717]">Aruna residence <ArrowUpRight size={10} className="inline" /></Link>
              </div>
              <div className="mt-3 flex overflow-x-auto border-y border-[#eeeeee]">
                {galleryCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setActiveCategory(category)
                      setActiveGalleryImage(0)
                    }}
                    className={`min-w-fit flex-1 px-3 py-2 text-[8px] ${activeCategory === category ? "border-b-2 border-[#56593B] font-semibold" : "text-[#777]"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-[minmax(0,2fr)_minmax(90px,0.55fr)] gap-2">
                <button type="button" onClick={() => setActiveGalleryImage((index) => (index + 1) % currentGallery.length)} className="relative min-h-52 overflow-hidden bg-[#f0f0f0] text-left sm:min-h-64">
                  <img src={currentGallery[activeGalleryImage]} alt={`${activeCategory} view of Aruna Type A`} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-black/55 px-2 py-1 text-[8px] text-white">Next photo <ArrowUpRight size={10} className="ml-1 inline" /></span>
                </button>
                <div className="grid grid-rows-2 gap-2">
                  {currentGallery.slice(0, 2).map((image, index) => (
                    <button key={`${activeCategory}-${image}`} type="button" onClick={() => setActiveGalleryImage(index)} className={`min-h-24 overflow-hidden border-2 ${activeGalleryImage === index ? "border-[#56593B]" : "border-transparent"}`}>
                      <img src={image} alt={`${activeCategory} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section id="specifications" className="bg-white p-4 shadow-sm">
              <h2 className="text-xs font-semibold">Full specifications</h2>
              <div className="mt-3 space-y-2">
                {specifications.map((section) => {
                  const isOpen = openSpecification === section.title
                  return (
                    <div key={section.title} className="border border-[#e5e5e5]">
                      <button
                        type="button"
                        onClick={() => setOpenSpecification(isOpen ? "" : section.title)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[9px] font-medium"
                      >
                        {section.title}
                        <span className="flex h-4 w-4 items-center justify-center bg-[#f1f1f1] text-[#777]">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="border-t border-[#e5e5e5] px-3 py-2">
                          {section.details.map(([label, detail]) => (
                            <div key={label} className="grid grid-cols-[90px_1fr] gap-3 py-1.5 text-[8px] leading-4">
                              <span className="text-[#555]">• {label}</span>
                              <span className="text-[#666]">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xs font-semibold">Floor plan</h2>
                <div className="flex bg-[#f1f1f1] p-0.5">
                  {(["Ground floor", "Upper floor"] as const).map((floor) => (
                    <button key={floor} type="button" onClick={() => setActiveFloor(floor)} className={`px-3 py-1.5 text-[8px] ${activeFloor === floor ? "bg-white font-medium shadow-sm" : "text-[#777]"}`}>
                      {floor}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-3 grid gap-4 border border-[#eeeeee] p-3 sm:grid-cols-[1fr_0.9fr]">
                <div className="grid min-h-56 grid-cols-3 grid-rows-3 gap-1 bg-[#e8dfd0] p-1">
                  {floorRooms.map((room, index) => (
                    <div key={room} className={`flex flex-col items-center justify-center border border-[#c7bca9] bg-[#f7f3eb] p-1 text-center ${index === 0 || index === 2 ? "col-span-2" : ""}`}>
                      {index === 0 ? <Sofa size={15} className="mb-1 text-[#80735f]" /> : index === 1 ? <Bed size={15} className="mb-1 text-[#80735f]" /> : <House size={13} className="mb-1 text-[#80735f]" />}
                      <span className="text-[7px] font-medium">{room}</span>
                    </div>
                  ))}
                </div>
                <ol className="space-y-2">
                  {floorRooms.map((room, index) => (
                    <li key={room} className="flex items-start gap-2 border-b border-dashed border-[#eeeeee] pb-2 last:border-b-0">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#f1f1f1] text-[8px]">{index + 1}</span>
                      <span><span className="block text-[9px] font-medium">{room}</span><span className="mt-0.5 block text-[8px] leading-3 text-[#888]">Designed for comfortable everyday living.</span></span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>

          <aside className="space-y-3">
            <section className="bg-white p-4 shadow-sm">
              <h2 className="text-xs font-semibold">Price &amp; payment</h2>
              <div className="mt-3 border border-[#eeeeee] p-3">
                <p className="text-[8px] text-[#888]">Total price</p>
                <p className="mt-1 text-2xl font-semibold text-[#56593B]">$135,000</p>
              </div>
              <div className="divide-y divide-[#eeeeee]">
                {[
                  ["Monthly installment", "From $750 / month"],
                  ["Down Payment", "Min. 20%"],
                  ["Loan Tenure", "10 / 15 / 20 years"],
                  ["Interest Rate", "5% fixed (first 3 years)"],
                  ["Payment Methods", "Bank Transfer"],
                  ["Additional Fees", "Notary, Tax, Admin"],
                  ["Special Offers", "Free Legal Fee"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-3 py-2.5 text-[8px]">
                    <span className="text-[#777]">{label}</span>
                    <span className="text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <Link to="/tour" state={{ backgroundLocation: location }} className="mt-2 flex w-full items-center justify-center gap-2 bg-[#56593B] py-2.5 text-[9px] font-semibold text-white hover:bg-[#42452d]">
                <Building2 size={11} /> Schedule a tour
              </Link>
              <a href="#specifications" className="mt-2 block w-full bg-[#f1f1f1] py-2 text-center text-[9px] hover:bg-[#e8e8e8]">View more detail</a>
            </section>

            <section className="bg-white p-4 shadow-sm">
              <h2 className="text-xs font-semibold">3D Preview</h2>
              <div className="group relative mt-3 overflow-hidden">
                <img src={livingImage} alt="Aruna Type A living room" className="h-40 w-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                  <p className="text-[10px] font-medium">Great experience</p>
                  <p className="mt-1 text-[8px]">Get a 3D preview with this feature before you buy it.</p>
                </div>
                <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#56593B] group-hover:bg-white">
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <Link to="/properties/aruna/type-a/ground-floor" className="mt-2 flex w-full items-center justify-center gap-2 bg-[#f1f1f1] py-2 text-[9px] hover:bg-[#e8e8e8]">
                <Maximize2 size={10} /> Try 360 preview
              </Link>
            </section>
          </aside>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ArunatypeA