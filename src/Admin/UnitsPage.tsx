import { useMemo, useState, type FormEvent } from "react"
import {
  BedDouble,
  ChevronDown,
  homeImageContainer1,
  homeImageContainer2,
  homeImageContainer4,
  Plus,
  Search,
} from "../imports"
import AdminDialog from "./AdminDialog"

type UnitStatus = "Available" | "Reserved" | "Occupied"
type UnitRecord = { code: string; property: string; type: string; beds: number; price: string; status: UnitStatus; image: string }

const initialUnits: UnitRecord[] = [
  { code: "AR-03-012", property: "Aruna Residence", type: "Type A", beds: 3, price: "₦ 85,000,000", status: "Available", image: homeImageContainer2 },
  { code: "LI-02-008", property: "Liora Estate", type: "Type C", beds: 4, price: "₦ 112,000,000", status: "Reserved", image: homeImageContainer1 },
  { code: "NA-01-021", property: "Nava Heights", type: "Type B", beds: 3, price: "₦ 76,500,000", status: "Available", image: homeImageContainer4 },
  { code: "VE-04-005", property: "Velora Park", type: "Type A", beds: 3, price: "₦ 91,000,000", status: "Occupied", image: homeImageContainer1 },
  { code: "AR-02-019", property: "Aruna Residence", type: "Type B", beds: 4, price: "₦ 104,000,000", status: "Available", image: homeImageContainer2 },
]

export default function UnitsPage() {
  const [units, setUnits] = useState(initialUnits)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All statuses")
  const [addOpen, setAddOpen] = useState(false)
  const [formError, setFormError] = useState("")
  const filteredUnits = useMemo(() => units.filter((unit) => {
    const textMatch = `${unit.code} ${unit.property} ${unit.type}`.toLowerCase().includes(query.toLowerCase())
    return textMatch && (status === "All statuses" || unit.status === status)
  }), [query, status, units])

  function addUnit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const code = String(data.get("code") ?? "").trim()
    const property = String(data.get("property") ?? "").trim()
    const type = String(data.get("type") ?? "").trim()
    const beds = Number(data.get("beds") ?? 0)
    const price = String(data.get("price") ?? "").trim()
    if (!code || !property || !type || !Number.isFinite(beds) || beds < 1 || !price) {
      setFormError("Complete each field and enter at least one bedroom.")
      return
    }
    setUnits((current) => [{ code, property, type, beds, price, status: "Available", image: homeImageContainer1 }, ...current])
    setFormError("")
    setAddOpen(false)
    form.reset()
  }

  return (
    <div className="page-enter space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><p className="text-xs text-slate-500">Track unit availability, pricing, and reservations.</p><h2 className="mt-1 text-xl font-semibold tracking-tight">Unit inventory</h2></div>
        <button type="button" onClick={() => { setFormError(""); setAddOpen(true) }} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#56593b] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#45482f]"><Plus size={16} /> Add unit</button>
      </section>
      <section className="grid gap-4 sm:grid-cols-3">
        {[["All units", "160", "border-slate-200"], ["Available", "120", "border-[#e5e8d6]"], ["Reserved", "24", "border-[#eee4c6]"]].map(([label, value, border]) => <article key={label} className={`rounded-xl border ${border} bg-white p-5`}><p className="text-xs text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></article>)}
      </section>
      <section className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div><h3 className="text-sm font-semibold">Units <span className="ml-1 rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">{filteredUnits.length}</span></h3><p className="mt-1 text-[11px] text-slate-500">A list of units across all active properties.</p></div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search units" placeholder="Search units" className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#777c59] sm:w-48" /></label>
            <label className="relative"><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter units by status" className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-xs outline-none sm:w-36"><option>All statuses</option><option>Available</option><option>Reserved</option><option>Occupied</option></select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" /></label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-slate-50/80 text-[10px] uppercase tracking-[0.08em] text-slate-500"><tr><th className="px-5 py-3 font-medium">Unit</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Bedrooms</th><th className="px-4 py-3 font-medium">Price</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Action</th></tr></thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUnits.map((unit) => <tr key={unit.code} className="hover:bg-slate-50/60">
                <td className="px-5 py-3.5"><div className="flex items-center gap-3"><img src={unit.image} alt="" className="size-11 rounded-lg object-cover" /><div><p className="text-xs font-semibold">{unit.code}</p><p className="mt-1 text-[10px] text-slate-500">{unit.property}</p></div></div></td>
                <td className="px-4 py-3.5 text-xs text-slate-600">{unit.type}</td><td className="px-4 py-3.5"><span className="inline-flex items-center gap-1.5 text-xs text-slate-600"><BedDouble size={14} />{unit.beds}</span></td>
                <td className="px-4 py-3.5 text-xs font-medium">{unit.price}</td>
                <td className="px-4 py-3.5"><span className={`rounded-full px-2.5 py-1 text-[10px] font-medium ${unit.status === "Available" ? "bg-[#eff2e3] text-[#5b6240]" : unit.status === "Reserved" ? "bg-[#f7f1df] text-[#957a2f]" : "bg-slate-100 text-slate-500"}`}>{unit.status}</span></td>
                <td className="px-4 py-3.5"><button type="button" className="rounded-md px-2.5 py-1.5 text-xs font-medium text-[#56593b] hover:bg-[#f1f2eb]">View unit</button></td>
              </tr>)}
            </tbody>
          </table>
          {filteredUnits.length === 0 ? <p className="px-5 py-10 text-center text-sm text-slate-500">No units match your search.</p> : null}
        </div>
        <div className="border-t border-slate-100 px-5 py-3 text-[10px] text-slate-500">Showing {filteredUnits.length} units</div>
      </section>
      <AdminDialog open={addOpen} onClose={() => setAddOpen(false)} title="Add a unit" description="Add a home to your available inventory.">
        <form onSubmit={addUnit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-medium">Unit ID<input name="code" required placeholder="e.g. AR-03-012" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#777c59]" /></label>
            <label className="text-xs font-medium">Property<input name="property" required placeholder="Property name" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#777c59]" /></label>
            <label className="text-xs font-medium">Unit type<input name="type" required placeholder="e.g. Type A" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#777c59]" /></label>
            <label className="text-xs font-medium">Bedrooms<input name="beds" type="number" min="1" required placeholder="3" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#777c59]" /></label>
          </div>
          <label className="block text-xs font-medium">Price<input name="price" required placeholder="₦ 85,000,000" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#777c59]" /></label>
          {formError ? <p role="alert" className="text-xs text-red-600">{formError}</p> : null}
          <div className="flex justify-end gap-3 pt-1"><button type="button" onClick={() => setAddOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-lg bg-[#56593b] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#45482f]">Add unit</button></div>
        </form>
      </AdminDialog>
    </div>
  )
}
