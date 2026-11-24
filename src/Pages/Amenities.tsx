import { useState, type ReactNode } from "react"
import {
  amenityBasketballCourt,
  amenityClusterPool,
  amenityCommunityPark,
  amenityGarden,
  amenityGardenLawn,
  amenityGym,
  amenityPlayground,
  amenityPool,
  amenityPromenade,
  amenityRestaurant,
  amenityTennisCourt,
  Minus,
  Plus,
} from "../imports"
import Facilities from "../Components/Facilities"

type HeroImage = {
  src: string
  label: string
  className: string
}

type HeroColumn = {
  id: string
  direction: "up" | "down"
  duration: string
  images: HeroImage[]
}

type Cluster = {
  name: string
  cardClass: string
  titleClass: string
  items: { title: string; description: ReactNode; image?: string }[]
}

const heroColumns: HeroColumn[] = [
  {
    id: 'col-1',
    direction: 'up',
    duration: '34s',
    images: [
      { src: amenityTennisCourt, label: "Championship Tennis Court", className: "w-[17.5rem]" },
      { src: amenityBasketballCourt, label: "Outdoor Basketball Court", className: "w-[17.5rem]" },
      { src: amenityGym, label: "Wellness & Fitness Studio", className: "w-[17.5rem]" },
    ],
  },
  {
    id: 'col-2',
    direction: 'down',
    duration: '40s',
    images: [
      { src: amenityGym, label: "Wellness & Fitness Studio", className: "w-[22.5rem]" },
      { src: amenityPlayground, label: "Kids Creative Play Zone", className: "w-[22.5rem]" },
      { src: amenityPool, label: "Resort Horizon Pool", className: "w-[22.5rem]" },
    ],
  },
  {
    id: 'col-3',
    direction: 'up',
    duration: '44s',
    images: [
      { src: amenityRestaurant, label: "Artisan Dining & Cafe", className: "w-[22.5rem]" },
      { src: amenityCommunityPark, label: "Central Community Park", className: "w-[22.5rem]" },
      { src: amenityPromenade, label: "Scenic Jogging Promenade", className: "w-[22.5rem]" },
    ],
  },
  {
    id: 'col-4',
    direction: 'down',
    duration: '38s',
    images: [
      { src: amenityPromenade, label: "Scenic Jogging Promenade", className: "w-[22.5rem]" },
      { src: amenityGardenLawn, label: "Botanical Lawn & Fairway", className: "w-[22.5rem]" },
      { src: amenityPlayground, label: "Kids Creative Play Zone", className: "w-[22.5rem]" },
    ],
  },
  {
    id: 'col-5',
    direction: 'up',
    duration: '34s',
    images: [
      { src: amenityPool, label: "Resort Horizon Pool", className: "w-[22.5rem]" },
      { src: amenityGarden, label: "Landscaped Garden Walk", className: "w-[17.5rem]" },
      { src: amenityBasketballCourt, label: "Outdoor Basketball Court", className: "w-[17.5rem]" },
    ],
  },
]

const staggeredOffsets = [
  "h-[41.25rem]",
  "h-[41.25rem] mt-[12.25rem]",
  "h-[41.25rem] mt-0 sm:mt-[18.75rem]",
  "h-[41.25rem] mt-[12.25rem]",
  "h-[41.25rem]",
]

const clustersData: Cluster[] = [
  {
    name: 'Liora estate',
    cardClass: "bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10",
    titleClass: "text-2xl font-medium text-gray-900 sm:text-3xl",
    items: [
      {
        title: 'Infinity Swimming Pool',
        description:
          "A stylish pool that blends seamlessly with the horizon, offering breathtaking scenic views. It’s designed for both relaxation and leisure swims, creating a serene atmosphere where you can unwind and enjoy moments of tranquility.",
        image: amenityClusterPool,
      },
      {
        title: "Residents' Lounge & Coffee Corner",
        description:
          'A cozy communal space with freshly brewed coffee, comfortable seating, and quiet corners for reading or casual meetups.',
      },
      {
        title: "Children's Creative Playground",
        description:
          'An imaginative outdoor play zone equipped with safe, modern structures designed to inspire active play.',
      },
      {
        title: 'Private Jogging Loop',
        description:
          'A dedicated tree-lined running and walking track circling the cluster for peaceful morning and evening exercise.',
      },
    ],
  },
  {
    name: 'Nava heights',
    cardClass: "bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10",
    titleClass: "text-2xl font-bold text-gray-900",
    items: [
      {
        title: 'Sky Deck Viewing Terrace',
        description:
          'An elevated panoramic terrace overlooking the surrounding greenery and skyline.',
      },
      {
        title: 'Rooftop Yoga & Wellness Area',
        description:
          'An open-air wellness deck crafted for sunrise stretching, meditation, and group yoga sessions.',
      },
      {
        title: 'Indoor Gym & Fitness Studio',
        description:
          'Fully equipped with cardio machines, free weights, and functional training gear for residents.',
      },
      {
        title: 'BBQ & Outdoor Dining Pavilion',
        description:
          'Shaded outdoor grilling stations and dining tables ideal for weekend family gatherings.',
      },
    ],
  },
  {
    name: 'Aruna residence',
    cardClass: "bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10",
    titleClass: "text-2xl font-medium text-gray-900 sm:text-3xl",
    items: [
      {
        title: 'Central Playground with Smart Play Equipment',
        description:
          'Interactive and safe play installations situated at the heart of the Aruna neighborhood.',
      },
      {
        title: 'Multipurpose Community Hall',
        description:
          'A spacious indoor venue for neighborhood events, workshops, and private celebrations.',
      },
      {
        title: 'Mini Market & Daily Needs Kiosk',
        description:
          'Convenient access to fresh groceries and everyday household essentials right inside the cluster.',
      },
      {
        title: 'Cycling Track',
        description:
          'A smooth, dedicated bicycle path connecting residential lanes to green open parks.',
      },
    ],
  },
  {
    name: 'Velora park',
    cardClass: "bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10",
    titleClass: "text-2xl font-bold text-gray-900",
    items: [
      {
        title: 'Basketball Court',
        description:
          'A full-sized outdoor court built with high-grip surfacing for casual shootarounds and friendly matches.',
      },
      {
        title: 'Skate & Roller Park',
        description:
          'Smooth ramps and rails tailored for skaters and inline enthusiasts of all skill levels.',
      },
      {
        title: 'Open Green Amphitheater',
        description:
          'Tiered grassy seating for outdoor movie nights, acoustic performances, and community talks.',
      },
      {
        title: 'Community Garden Plots',
        description:
          'Shared planter beds where neighbors can grow herbs, flowers, and organic produce together.',
      },
    ],
  },
  {
    name: 'Seraya grove',
    cardClass: "bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-10",
    titleClass: 'text-2xl font-bold text-gray-900',
    items: [
      {
        title: 'Exclusive Clubhouse',
        description:
          'A private residents-only social hub featuring lounge seating, meeting rooms, and concierge support.',
      },
      {
        title: 'Reading Pavilion & Library Corner',
        description:
          'A tranquil garden pavilion stocked with curated books and quiet study nooks.',
      },
      {
        title: 'Pet-Friendly Park',
        description:
          'A fenced, landscaped green lawn with agility features and shaded benches for pets and owners.',
      },
      {
        title: "Outdoor Swimming Pool with Kids' Splash Area",
        description:
          'A resort-style lap pool paired with a shallow, supervised splash zone for younger children.',
      },
    ],
  },
]

function Amenities() {
  const [isPaused, setIsPaused] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    "Liora estate-0": true,
  })

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <main className="bg-stone-50">
      <title>Amenities - Serenia Real Estate</title>
      <style>{`
        @keyframes sereniaScrollUp {
          0% {
            transform: translate3d(0, 0%, 0);
          }
          100% {
            transform: translate3d(0, -50%, 0);
          }
        }

        @keyframes sereniaScrollDown {
          0% {
            transform: translate3d(0, -50%, 0);
          }
          100% {
            transform: translate3d(0, 0%, 0);
          }
        }

        .serenia-marquee-up {
          animation-name: sereniaScrollUp;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .serenia-marquee-down {
          animation-name: sereniaScrollDown;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .serenia-marquee-mask {
          -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 88%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 10%,
            black 88%,
            transparent 100%
          );
        }

        @media (prefers-reduced-motion: reduce) {
          .serenia-marquee-up,
          .serenia-marquee-down {
            animation: none !important;
          }
        }
      `}</style>

      <section className="max-w-full overflow-hidden pt-16 pb-12 text-center">
        <h1 className="mx-auto max-w-2xl px-4 text-4xl font-medium leading-[1.1] tracking-tight text-gray-900 sm:text-6xl lg:px-0 lg:text-7xl">
          Facilities
          <br />
          designed around
          <br />
          your needs
        </h1>
        <p className="mx-auto mt-6 max-w-lg px-4 text-[15px] leading-relaxed text-gray-800 sm:px-0 sm:text-[17px]">
          Discover thoughtfully planned amenities and modern <br className="hidden sm:block" /> facilities designed to support a
          vibrant, comfortable, <br className="hidden sm:block" /> and connected lifestyle within Serenia.
        </p>

        <section
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false)
            setHoveredCard(null)
          }}
          className="serenia-marquee-mask flex h-[42rem] w-full justify-center gap-3 overflow-hidden sm:h-[52rem]"
        >
          {heroColumns.map((column, colIdx) => {
            const loopedImages = [...column.images, ...column.images]
            const animClass =
              column.direction === 'down' ? 'serenia-marquee-down' : 'serenia-marquee-up'

            return (
              <div
                key={column.id}
                className={`${staggeredOffsets[colIdx]} ${colIdx === 2 ? "block" : "hidden sm:block"} overflow-hidden`}
              >
                <div
                  style={{
                    animationDuration: column.duration,
                    animationPlayState: isPaused ? 'paused' : 'running',
                  }}
                  className={`${animClass} flex flex-col space-y-5 will-change-transform`}
                >
                  {loopedImages.map((img, imgIdx) => {
                    const cardId = `${column.id}-${imgIdx}`
                    const isDimmed = hoveredCard !== null && hoveredCard !== cardId

                    return (
                      <div
                        key={cardId}
                        onMouseEnter={() => setHoveredCard(cardId)}
                        className={`group relative shrink-0 overflow-hidden bg-stone-200/60 shadow-sm transition-all duration-500 ease-out ${
                          isDimmed ? "opacity-65 scale-[0.99]" : "opacity-100"
                        }`}
                      >
                        <img
                          src={img.src}
                          className={`${img.className} block transition-transform duration-700 ease-out group-hover:scale-105`}
                          alt={img.label}
                        />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/75 via-black/30 to-transparent px-4 py-3 text-left opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                          <span className="text-xs font-medium tracking-wide text-white">
                            {img.label}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </section>
      </section>

      <section className="-mt-40 max-w-full bg-stone-50 pt-20">
        <div className="mb-16 text-center">
          <h2 className="px-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            General facilities
          </h2>
          <p className="text-md mx-auto mt-5 max-w-sm px-4 leading-relaxed text-gray-800">
            Facilities and amenities available in all types of clusters, from Type-A to Type-C
          </p>
        </div>
        <Facilities />
        <section className="border-t border-gray-100 bg-[#f9f9f9] px-6 py-20 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <h2 className="max-w-sm text-start text-4xl font-medium leading-tight tracking-tight text-gray-900 lg:text-4xl">
                Exclusive <br /> facilities in each <br /> cluster
              </h2>
              <p className="max-w-xs text-start text-xs leading-relaxed text-gray-500">
                Every cluster is thoughtfully designed with its own set of facilities, ensuring
                comfort and convenience for residents in every neighborhood.
              </p>
            </div>

            <div className="space-y-12">
              {clustersData.map((cluster) => (
                <div key={cluster.name} className={cluster.cardClass}>
                  <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                    <div className="pt-2 lg:col-span-4">
                      <h3 className={cluster.titleClass}>{cluster.name}</h3>
                    </div>
                    <div className="overflow-hidden border border-gray-200/80 bg-white shadow-sm lg:col-span-8">
                      {cluster.items.map((item, idx) => {
                        const key = `${cluster.name}-${idx}`
                        const isOpen = !!openAccordions[key]
                        const isLast = idx === cluster.items.length - 1

                        return isOpen ? (
                          <div
                            key={key}
                            className={`p-6 transition-colors duration-200 ${!isLast ? "border-b border-gray-100" : ""}`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleAccordion(key)}
                              aria-expanded="true"
                              className="mb-3 flex w-full items-center justify-between gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#424d31]"
                            >
                              <span className="text-xl font-medium text-gray-900 sm:text-3xl">{item.title}</span>
                              <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-700 transition-colors hover:bg-stone-200">
                                <Minus className="h-3.5 w-3.5" />
                              </span>
                            </button>
                            <div id={`amenity-${key}`}>
                              <p className="mb-4 max-w-xl text-justify text-sm leading-relaxed text-gray-500">
                                {item.description}
                              </p>
                              {item.image && (
                                <div className="h-[16.25rem] w-full overflow-hidden bg-stone-100">
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <button
                            key={key}
                            type="button"
                            onClick={() => toggleAccordion(key)}
                            aria-expanded="false"
                            className={`group flex cursor-pointer items-center justify-between px-6 py-4 transition-colors duration-200 ${
                              !isLast ? "border-b border-gray-100" : ""
                            } w-full text-left hover:bg-stone-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#424d31]`}
                          >
                            <span className="text-sm font-semibold text-gray-800 transition-transform duration-200 group-hover:translate-x-1">
                              {item.title}
                            </span>
                            <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-stone-100 text-stone-700 transition-colors group-hover:bg-[#424d31] group-hover:text-white">
                              <Plus className="h-3.5 w-3.5" />
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default Amenities