import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { arunaMain, arunaTypeBMain, CalendarDays, FileText, House, MapPin, Search } from "../imports"
import AdminDialog from "./AdminDialog"

type SearchCategory = "All" | "Property only" | "Request only" | "Blogs only"

const categories: SearchCategory[] = ["All", "Property only", "Request only", "Blogs only"]

const propertyResults = [
  { title: "Aruna Type-A", location: "Aruna residence", image: arunaMain, units: "3 bedroom · 2,500 sq ft" },
  { title: "Aruna Type-B", location: "Aruna residence", image: arunaTypeBMain, units: "4 bedroom · 3,100 sq ft" },
]

const requestResults = [
  { name: "Amina Kalu", property: "Aruna Residence · Type A", date: "June 25, 2025" },
  { name: "Tunde Okafor", property: "Liora Estate · Type C", date: "June 24, 2025" },
]

const blogResults = [
  { title: "A thoughtful home begins with the details", date: "June 18, 2024" },
  { title: "Growing together in a connected neighborhood", date: "June 10, 2024" },
]

export default function DashboardSearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [category, setCategory] = useState<SearchCategory>("All")
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()

  const visibleProperties = useMemo(
    () => propertyResults.filter((item) => `${item.title} ${item.location}`.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  )
  const visibleRequests = useMemo(
    () => requestResults.filter((item) => `${item.name} ${item.property}`.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  )
  const visibleBlogs = useMemo(
    () => blogResults.filter((item) => item.title.toLowerCase().includes(normalizedQuery)),
    [normalizedQuery],
  )

  return (
    <AdminDialog open={open} onClose={onClose} title="" showHeader={false} width="max-w-3xl">
      <section className="overflow-hidden rounded-xl border border-[#e9e9e3] bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#ededE7] px-4 py-3">
          <Search size={16} className="shrink-0 text-[#8b8b80]" />
          <input
            autoFocus={open}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search all dashboard content"
            placeholder="Search anything"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-[#a3a39b]"
          />
          <button type="button" onClick={onClose} className="rounded border border-[#e8e8e1] px-2 py-1 text-[9px] text-[#77776d] hover:bg-[#f8f8f5]">Esc</button>
        </div>
        <div className="grid min-h-[360px] sm:grid-cols-[150px_1fr]">
          <nav aria-label="Search categories" className="border-b border-[#ededE7] bg-[#fbfbf9] p-2 sm:border-b-0 sm:border-r">
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setCategory(item)}
                className={`mb-1 flex w-full items-center justify-between rounded px-3 py-2.5 text-left text-[10px] ${category === item ? "bg-[#f0f1e7] font-semibold text-[#56593b]" : "text-[#77776d] hover:bg-white"}`}
              >
                {item}<span className="text-[9px] text-[#99998f]">›</span>
              </button>
            ))}
          </nav>
          <div className="max-h-[55dvh] overflow-y-auto p-4">
            {(category === "All" || category === "Property only") ? (
              <section className="mb-5">
                <h2 className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-[#57574e]"><House size={13} />Properties</h2>
                <div className="grid gap-2 sm:grid-cols-2">
                  {visibleProperties.map((property) => (
                    <Link key={property.title} to="/dashboard/properties" onClick={onClose} className="flex min-w-0 items-center gap-2 rounded border border-[#ededE7] p-2 transition hover:bg-[#fafaf7]">
                      <img src={property.image} alt="" className="size-12 shrink-0 rounded object-cover" />
                      <span className="min-w-0">
                        <span className="block truncate text-[10px] font-semibold text-[#45453c]">{property.title}</span>
                        <span className="mt-1 flex items-center gap-1 text-[9px] text-[#88887e]"><MapPin size={10} />{property.location}</span>
                        <span className="mt-1 block truncate text-[8px] text-[#99998f]">{property.units}</span>
                      </span>
                    </Link>
                  ))}
                  {visibleProperties.length === 0 ? <p className="col-span-2 py-3 text-[10px] text-[#99998f]">No matching properties.</p> : null}
                </div>
              </section>
            ) : null}
            {(category === "All" || category === "Request only") ? (
              <section className="mb-5">
                <h2 className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-[#57574e]"><CalendarDays size={13} />Requests</h2>
                <div className="divide-y divide-[#ededE7] rounded border border-[#ededE7] px-3">
                  {visibleRequests.map((request) => (
                    <Link key={request.name} to="/dashboard/requests" onClick={onClose} className="flex items-center justify-between gap-3 py-2.5 hover:text-[#56593b]">
                      <span className="min-w-0"><span className="block truncate text-[10px] font-medium">{request.name}</span><span className="mt-1 block truncate text-[9px] text-[#88887e]">{request.property}</span></span>
                      <span className="shrink-0 text-[9px] text-[#88887e]">{request.date}</span>
                    </Link>
                  ))}
                  {visibleRequests.length === 0 ? <p className="py-3 text-[10px] text-[#99998f]">No matching requests.</p> : null}
                </div>
              </section>
            ) : null}
            {(category === "All" || category === "Blogs only") ? (
              <section>
                <h2 className="mb-2 flex items-center gap-2 text-[10px] font-semibold text-[#57574e]"><FileText size={13} />Blogs</h2>
                <div className="divide-y divide-[#ededE7] rounded border border-[#ededE7] px-3">
                  {visibleBlogs.map((blog) => (
                    <Link key={blog.title} to="/blogs" onClick={onClose} className="flex items-center justify-between gap-3 py-2.5 hover:text-[#56593b]">
                      <span className="min-w-0 truncate text-[10px] font-medium">{blog.title}</span>
                      <span className="shrink-0 text-[9px] text-[#88887e]">{blog.date}</span>
                    </Link>
                  ))}
                  {visibleBlogs.length === 0 ? <p className="py-3 text-[10px] text-[#99998f]">No matching blog posts.</p> : null}
                </div>
              </section>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#ededE7] px-4 py-2.5 text-[9px] text-[#99998f]">
          <span>Search properties, requests, and blogs</span><button type="button" onClick={onClose} className="font-medium text-[#686d48] hover:text-[#45482f]">Close</button>
        </div>
      </section>
    </AdminDialog>
  )
}
