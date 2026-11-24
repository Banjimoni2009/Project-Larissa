
import { useState } from "react"
import {
  ArrowUpRight,
  Bed,
  ChevronDown,
  MapPin,
  Search,
  TreePine,
  propertyImage10 as lioraImage,
  propertyImage8 as navaImage,
  propertyImage7 as arunaImage,
  propertyImage6 as veloraImage,
  propertyImage4 as serayaImage,
} from "../imports"
import { Link } from "react-router-dom"
import Footer from "../Components/Footer"

const properties = [
  {
    name: "Liora estate",
    location: "Liora estate",
    image: lioraImage,
    label: "Elegant living, redefined",
    description: "Premium cluster with modern architecture, a private clubhouse, and 24/7 security — offering both style and peace of mind for residents.",
    bedrooms: "3-5 Bedroom options",
    facilities: "Private gym & 24/7 security",
    access: "Near lifestyle center",
    price: 120000,
  },
  {
    name: "Nava heights",
    location: "Nava heights",
    image: navaImage,
    label: "Nature meets lifestyle",
    description: "Designed for eco-living with wide open spaces, scenic jogging tracks, and elevated views that bring nature closer to home.",
    bedrooms: "2-4 Bedroom options",
    facilities: "Wide roads & open spaces",
    access: "Scenic jogging tracks",
    price: 98000,
  },
  {
    name: "Aruna residence",
    location: "Aruna residence",
    image: arunaImage,
    label: "The modern comfort",
    description: "Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive.",
    bedrooms: "2-4 Bedroom options",
    facilities: "Family-friendly facilities",
    access: "Easy access to main boulevard",
    price: 85000,
  },
  {
    name: "Velora park",
    location: "Velora park",
    image: veloraImage,
    label: "Dynamic living, urban vibe",
    description: "Contemporary cluster with stylish facades, pocket parks, and direct access to shopping and dining hubs.",
    bedrooms: "2-4 Bedroom options",
    facilities: "Pocket parks & community spaces",
    access: "Trendy design homes",
    price: 105000,
  },
  {
    name: "Seraya grove",
    location: "Seraya grove",
    image: serayaImage,
    label: "Living with natural touch",
    description: "A vibrant cluster blending modern housing with lush greenery, close to schools and community spaces.",
    bedrooms: "3-4 Bedroom options",
    facilities: "Central park & kids area",
    access: "Easy access to public facilities",
    price: 95000,
  },
]

function Properties() {
  const [query, setQuery] = useState("")
  const [location, setLocation] = useState("All location")
  const [priceRange, setPriceRange] = useState("All price")

  const visibleProperties = properties.filter((property) => {
    const matchesQuery = property.name.toLowerCase().includes(query.trim().toLowerCase())
    const matchesLocation = location === "All location" || property.location === location
    const matchesPrice =
      priceRange === "All price" ||
      (priceRange === "Under $100,000" && property.price < 100000) ||
      (priceRange === "$100,000 and above" && property.price >= 100000)

    return matchesQuery && matchesLocation && matchesPrice
  })

  return (
    <main className="bg-white text-[#171717]">
      <section className="mx-auto max-w-375 px-5 pb-10 pt-12 text-center md:px-10 md:pb-14 md:pt-16">
        <h1 className="mx-auto max-w-107.5 text-4xl leading-[1.05] font-medium tracking-tight md:text-5xl">
          Every community<br />have their unique
        </h1>
        <p className="mx-auto mt-5 max-w-md text-xs leading-5 text-[#626262] md:text-sm">
          Explore thoughtfully designed residences that combine<br className="hidden md:block" /> comfort, style, and a sense of belonging.
        </p>
      </section>

      <section className="bg-[#fafafa]">
        <div className="mx-auto max-w-375 px-5 py-7 md:px-10 md:py-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4">
              <label className="flex h-9 items-center gap-2 border border-[#eeeeee] bg-white px-3 text-[#777]">
                Location:
                <span className="relative text-[#171717]">
                  <select
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    aria-label="Filter by location"
                    className="appearance-none bg-transparent py-1 pr-4 outline-none"
                  >
                    <option>All location</option>
                    {properties.map((property) => <option key={property.name}>{property.location}</option>)}
                  </select>
                  <ChevronDown size={11} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </span>
              </label>

              <label className="flex h-9 items-center gap-2 border border-[#eeeeee] bg-white px-3 text-[#777]">
                Price:
                <span className="relative text-[#171717]">
                  <select
                    value={priceRange}
                    onChange={(event) => setPriceRange(event.target.value)}
                    aria-label="Filter by price"
                    className="appearance-none bg-transparent py-1 pr-4 outline-none"
                  >
                    <option>All price</option>
                    <option>Under $100,000</option>
                    <option>$100,000 and above</option>
                  </select>
                  <ChevronDown size={11} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" />
                </span>
              </label>
            </div>

            <label className="relative w-full bg-white md:w-52">
              <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cluster name"
                aria-label="Search cluster name"
                className="h-9 w-full border border-[#eeeeee] pl-9 pr-3 text-xs outline-none placeholder:text-[#999] focus:border-[#56593B]"
              />
            </label>
          </div>

          <div className="space-y-4">
            {visibleProperties.map((property) => (
              <article key={property.name} className="grid overflow-hidden bg-white shadow-sm md:grid-cols-2">
                <div className="relative min-h-60 overflow-hidden p-1.5 md:min-h-75">
                  <img
                    src={property.image}
                    alt={`${property.name} homes`}
                    className="h-full min-h-60 w-full object-cover md:min-h-75"
                  />
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1">
                    {[0, 1, 2].map((dot) => (
                      <span key={dot} className={`h-1.5 w-1.5 rounded-full ${dot === 0 ? "bg-white" : "bg-white/55"}`} />
                    ))}
                  </div>
                </div>

                <div className="flex min-h-75 flex-col justify-between">
                  <div className="px-5 pb-5 pt-5 md:px-6 md:pb-4">
                    <p className="mb-2 inline-flex items-center gap-2 bg-[#fff8e8] px-2 py-1 text-[9px] font-medium text-[#966000]">
                      <span className="h-1.5 w-1.5 rotate-45 bg-[#d79500]" />
                      {property.label}
                    </p>
                    <h2 className="text-xl font-medium">{property.name}</h2>
                    <p className="mt-2 max-w-110 text-xs leading-5 text-[#626262]">{property.description}</p>

                    <div className="mt-5 space-y-2 text-[10px] text-[#555]">
                      <p className="flex items-center gap-2"><Bed size={12} />{property.bedrooms}</p>
                      <p className="flex items-center gap-2"><TreePine size={12} />{property.facilities}</p>
                      <p className="flex items-center gap-2"><MapPin size={12} />{property.access}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#eeeeee] px-5 py-3.5 md:px-6">
                    <div>
                      <p className="text-[9px] text-[#999]">Starts from</p>
                      <p className="text-lg font-semibold">${property.price.toLocaleString("en-US")}</p>
                    </div>
                    <Link
                      to="/properties/aruna"
                      className="flex items-center gap-1 bg-[#f5f5f5] px-3 py-2 text-[10px] font-medium hover:bg-[#56593B] hover:text-white"
                    >
                      Discover <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}

            {visibleProperties.length === 0 && (
              <p className="bg-white px-4 py-12 text-center text-sm text-[#777]">No clusters match your filters.</p>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Properties