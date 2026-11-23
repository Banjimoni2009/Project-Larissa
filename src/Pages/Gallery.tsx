
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Footer from "../Components/Footer"
import GalleryFAQ from "../Components/GalleryFAQ"

import image4 from "../assets/images/Gallery images/Image (4).png"
import image5 from "../assets/images/Gallery images/Image (5).png"
import image6 from "../assets/images/Gallery images/Image (6).png"
import image7 from "../assets/images/Gallery images/Image (7).png"
import image8 from "../assets/images/Gallery images/Image (8).png"
import image9 from "../assets/images/Gallery images/Image (9).png"
import image10 from "../assets/images/Gallery images/Image (10).png"
import image11 from "../assets/images/Gallery images/Image (11).png"
import image12 from "../assets/images/Gallery images/Image (12).png"
import image13 from "../assets/images/Gallery images/Image (13).png"
import image14 from "../assets/images/Gallery images/Image (14).png"
import image15 from "../assets/images/Gallery images/Image (15).png"
import image16 from "../assets/images/Gallery images/Image (16).png"
import image17 from "../assets/images/Gallery images/Image (17).png"
import imageContainer from "../assets/images/Gallery images/Image Container.png"

// Labels used by both the category tabs and the cluster dropdown.
const categories = [
  "Outlook",
  "Park",
  "Bedroom",
  "Rooftop",
  "Playground",
  "Kitchen",
  "Bathroom",
  "Family room",
  "Clubhouse",
  "Street",
]

const galleryItems = [
  { src: imageContainer, category: "Kitchen", featured: "Nova Insights - Type B", tall: true },
  { src: image4, category: "Kitchen" },
  { src: image5, category: "Bathroom" },
  { src: image6, category: "Kitchen" },
  { src: image7, category: "Bedroom" },
  { src: image8, category: "Bathroom" },
  { src: image9, category: "Family room" },
  { src: image10, category: "Kitchen" },
  { src: image11, category: "Kitchen" },
  { src: image12, category: "Outlook" },
  { src: image13, category: "Bathroom" },
  { src: image14, category: "Clubhouse" },
  { src: image15, category: "Bedroom" },
  { src: image16, category: "Rooftop" },
  { src: image17, category: "Kitchen" },
]

function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All clusters")

  let visibleItems = galleryItems

  if (activeCategory !== "All clusters") {
    visibleItems = galleryItems.filter((item) => item.category === activeCategory)
  }

  // Make one list for each gallery column.
  const firstColumn = []
  const secondColumn = []
  const thirdColumn = []

  for (let index = 0; index < visibleItems.length; index++) {
    if (index % 3 === 0) {
      firstColumn.push(visibleItems[index])
    } else if (index % 3 === 1) {
      secondColumn.push(visibleItems[index])
    } else {
      thirdColumn.push(visibleItems[index])
    }
  }

  return (
    <main className="bg-white text-[#171717]">
      {/* Page heading and cluster filter */}
      <section className="mx-auto max-w-[1500px] px-5 py-10 md:px-10 md:py-14">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-medium tracking-tight md:text-5xl">Our gallery</h1>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#626262]">
              Explore our community&apos;s charm with elegant homes and amenities, perfect for your family&apos;s comfort.
            </p>
          </div>
          <label className="hidden shrink-0 flex-col gap-1 text-xs sm:flex">
            <span>Clusters</span>
            <span className="relative">
              <select
                value={activeCategory}
                onChange={(event) => setActiveCategory(event.target.value)}
                className="h-9 w-44 appearance-none border border-[#dedede] bg-white px-3 pr-9 text-sm outline-none"
              >
                <option>All clusters</option>
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </span>
          </label>
        </div>
      </section>

      {/* Horizontally scrollable category tabs */}
      <section className="border-y border-[#efefef]">
        <div className="mx-auto flex max-w-[1500px] overflow-x-auto px-5 md:px-10">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`h-12 shrink-0 px-5 text-xs transition-colors ${
                activeCategory === category
                  ? "border-b-2 border-[#56593B] font-semibold text-[#56593B]"
                  : "text-[#777] hover:text-[#171717]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Responsive masonry gallery */}
      <section className="mx-auto max-w-[1500px] px-2 py-4 md:px-8 md:py-6">
        {visibleItems.length === 0 ? (
          <p className="py-20 text-center text-sm text-[#777]">No gallery images in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-3">
              {firstColumn.map((item) => (
                <figure key={item.src} className="relative overflow-hidden bg-[#ececec]">
                  <img
                    src={item.src}
                    alt={`${item.category} at Serenia`}
                    className={item.tall ? "h-[560px] w-full object-cover" : "h-[360px] w-full object-cover"}
                  />
                  {item.featured && (
                    <figcaption className="absolute bottom-5 left-4 flex items-center gap-2 rounded-sm bg-white px-3 py-2 text-xs font-semibold shadow">
                      <span className="h-2 w-2 rounded-full bg-[#56593B]" />
                      {item.featured}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {secondColumn.map((item) => (
                <figure key={item.src} className="relative overflow-hidden bg-[#ececec]">
                  <img
                    src={item.src}
                    alt={`${item.category} at Serenia`}
                    className="h-[360px] w-full object-cover"
                  />
                </figure>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {thirdColumn.map((item) => (
                <figure key={item.src} className="relative overflow-hidden bg-[#ececec]">
                  <img
                    src={item.src}
                    alt={`${item.category} at Serenia`}
                    className="h-[360px] w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Gallery-specifi FAQ component */}
      <GalleryFAQ />

      <Footer />
    </main>
  )
}

export default Gallery