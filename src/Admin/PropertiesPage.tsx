

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  homeImageContainer1,
  homeImageContainer2,
  homeImageContainer3,
  homeImageContainer4,
  MapPin,
  Plus,
  Search,
} from "../imports"
import AdminDialog from "./AdminDialog"

type PropertyRecord = {
  name: string
  area: string
  type: string
  units: number
  available: number
  status: "Active" | "Draft"
  image: string
}

const initialProperties: PropertyRecord[] = [
  { name: "Aruna Residence", area: "Lekki-Epe Expressway, Lagos", type: "Residential", units: 48, available: 18, status: "Active", image: homeImageContainer2 },
  { name: "Liora Estate", area: "Sangotedo, Lagos", type: "Residential", units: 36, available: 12, status: "Active", image: homeImageContainer1 },
  { name: "Nava Heights", area: "Ajah, Lagos", type: "Residential", units: 28, available: 8, status: "Active", image: homeImageContainer3 },
  { name: "Velora Park", area: "Ibeju-Lekki, Lagos", type: "Residential", units: 32, available: 6, status: "Active", image: homeImageContainer4 },
  { name: "Seraya Grove", area: "Epe, Lagos", type: "Residential", units: 16, available: 4, status: "Draft", image: homeImageContainer2 },
]

const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#777c59] focus:ring-2 focus:ring-[#777c59]/15"

export default function PropertiesPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const community = new URLSearchParams(location.search).get("community")
  const [properties, setProperties] = useState(initialProperties)
  const [searchTerm, setSearchTerm] = useState("")
  const query = community ?? searchTerm
  const [statusFilter, setStatusFilter] = useState("All statuses")
  // Opens property creation from dashboard.
  const [formOpen, setFormOpen] = useState(() => {
    const routeState = location.state as { openAddProperty?: boolean } | null
    return routeState?.openAddProperty === true
  })
  const [selectedProperty, setSelectedProperty] = useState<PropertyRecord | null>(null)
  const [formError, setFormError] = useState("")

  useEffect(() => {
    const routeState = location.state as { openAddProperty?: boolean } | null
    if (routeState?.openAddProperty) {
      navigate(location.pathname, { replace: true, state: null })
    }
  }, [location.pathname, location.state, navigate])

  const filteredProperties = useMemo(() => properties.filter((property) => {
    const matchesText = `${property.name} ${property.area}`.toLowerCase().includes(query.toLowerCase())
    return matchesText && (statusFilter === "All statuses" || property.status === statusFilter)
  }), [properties, query, statusFilter])

  const propertyStats = [
    { label: "Total properties", amount: properties.length.toString(), Icon: Building2 },
    { label: "Total units", amount: properties.reduce((sum, item) => sum + item.units, 0).toString(), Icon: Building2 },
    { label: "Available units", amount: properties.reduce((sum, item) => sum + item.available, 0).toString(), Icon: ArrowUpRight },
  ]

  function addProperty(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const area = String(data.get("location") ?? "").trim()
    const units = Number(data.get("units") ?? 0)
    if (!name || !area || !Number.isFinite(units) || units < 1) {
      setFormError("Enter a property name, location, and a unit count greater than zero.")
      return
    }

    setProperties((current) => [
      { name, area, type: "Residential", units, available: units, status: "Draft", image: homeImageContainer1 },
      ...current,
    ])
    setFormError("")
    setFormOpen(false)
    form.reset()
  }

  return (
    <div className="page-enter space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs text-slate-500">Manage the communities and homes in your portfolio.</p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">{community ?? "Property management"}</h2>
        </div>
        <button type="button" onClick={() => { setFormError(""); setFormOpen(true) }} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#56593b] px-4 py-2.5 text-xs font-medium text-white transition hover:bg-[#45482f]">
          <Plus size={16} /> Add property
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {propertyStats.map(({ label, amount, Icon }) => (
          <article key={label} className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-5">
            <div><p className="text-xs text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold">{amount}</p></div>
            <span className="grid size-10 place-items-center rounded-lg bg-[#eff0e6] text-[#626748]"><Icon size={18} /></span>
          </article>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h3 className="text-sm font-semibold">All properties <span className="ml-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">{filteredProperties.length}</span></h3>
            <p className="mt-1 text-[11px] text-slate-500">Keep track of your property portfolio.</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input value={query} onChange={(event) => { setSearchTerm(event.target.value); if (community) navigate(location.pathname, { replace: true }) }} aria-label="Search properties" placeholder="Search properties" className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#777c59] sm:w-48" />
            </label>
            <label className="relative">
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by status" className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs outline-none focus:border-[#777c59] sm:w-36">
                <option>All statuses</option><option>Active</option><option>Draft</option>
              </select>
              <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="bg-slate-50/80 text-[10px] uppercase tracking-[0.08em] text-slate-500">
              <tr><th className="px-5 py-3 font-medium">Property</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Total units</th><th className="px-4 py-3 font-medium">Availability</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Action</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProperties.map((property) => (
                <tr key={property.name} className="hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img src={property.image} alt="" className="size-11 rounded-lg object-cover" />
                      <div><p className="text-xs font-semibold text-slate-900">{property.name}</p><p className="mt-1 flex items-center gap-1 text-[10px] text-slate-500"><MapPin size={11} />{property.area}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">{property.type}</td>
                  <td className="px-4 py-3.5 text-xs font-medium text-slate-700">{property.units}</td>
                  <td className="px-4 py-3.5"><span className="text-xs font-medium text-slate-700">{property.available} <span className="font-normal text-slate-400">available</span></span></td>
                  <td className="px-4 py-3.5"><span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${property.status === "Active" ? "bg-[#eff4e8] text-[#5b724a]" : "bg-slate-100 text-slate-500"}`}>{property.status}</span></td>
                  <td className="px-4 py-3.5"><button type="button" onClick={() => setSelectedProperty(property)} className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[#56593b] hover:bg-[#f1f2eb]">View details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProperties.length === 0 ? <p className="px-5 py-10 text-center text-sm text-slate-500">No properties match your search.</p> : null}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-[10px] text-slate-500"><span>Showing {filteredProperties.length} properties</span><span>Page 1 of 1</span></div>
      </section>

      <AdminDialog open={formOpen} onClose={() => setFormOpen(false)} title="Add a property" description="Create a community in your Serenia portfolio.">
        <form onSubmit={addProperty} className="space-y-4">
          <label className="block text-xs font-medium text-slate-700">Property name<input name="name" required placeholder="e.g. Aruna Residence" className={`${inputClass} mt-1.5`} /></label>
          <label className="block text-xs font-medium text-slate-700">Location<input name="location" required placeholder="Area, city" className={`${inputClass} mt-1.5`} /></label>
          <label className="block text-xs font-medium text-slate-700">Number of units<input name="units" type="number" min="1" required placeholder="Enter unit count" className={`${inputClass} mt-1.5`} /></label>
          {formError ? <p role="alert" className="text-xs text-red-600">{formError}</p> : null}
          <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setFormOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-lg bg-[#56593b] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#45482f]">Create property</button></div>
        </form>
      </AdminDialog>

      <AdminDialog open={selectedProperty !== null} onClose={() => setSelectedProperty(null)} title={selectedProperty?.name ?? "Property details"} description={selectedProperty?.area}>
        {selectedProperty ? (
          <div>
            <img src={selectedProperty.image} alt={`${selectedProperty.name} homes`} className="h-48 w-full rounded-xl object-cover" />
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-[10px] text-slate-500">Total units</p><p className="mt-1 text-lg font-semibold">{selectedProperty.units}</p></div>
              <div className="rounded-lg bg-slate-50 p-3"><p className="text-[10px] text-slate-500">Available now</p><p className="mt-1 text-lg font-semibold">{selectedProperty.available}</p></div>
            </div>
            <button type="button" onClick={() => setSelectedProperty(null)} className="mt-5 w-full rounded-lg bg-[#56593b] py-2.5 text-xs font-medium text-white hover:bg-[#45482f]">Done</button>
          </div>
        ) : null}
      </AdminDialog>
    </div>
  )
}
