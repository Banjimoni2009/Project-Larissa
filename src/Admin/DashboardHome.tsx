import { useState } from "react"
import { Link } from "react-router-dom"
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronDown,
  Clock3,
  Eye,
  homeImageContainer1,
  homeImageContainer2,
  homeImageContainer3,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  TrendingDown,
  TrendingUp,
} from "../imports"
import AdminDialog from "./AdminDialog"

const stats = [
  { label: "Total properties", value: "160", note: "8% from last month", positive: true },
  { label: "Available units", value: "120", note: "5% from last month", positive: false },
  { label: "Upcoming tours", value: "45", note: "12% from last month", positive: true },
  { label: "New request", value: "21", note: "20% from last month", positive: true },
]

const tourRequests = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 30 },
  { month: "Mar", value: 24 },
  { month: "Apr", value: 30 },
  { month: "May", value: 38 },
  { month: "Jun", value: 31 },
  { month: "Jul", value: 31 },
  { month: "Aug", value: 45 },
  { month: "Sep", value: 55 },
]

const properties = [
  { image: homeImageContainer2, name: "Liora Estate", type: "Type A · 3 Bedroom", units: 34, percent: "28.3%" },
  { image: homeImageContainer1, name: "Nava Heights", type: "Type B · 3 Bedroom", units: 26, percent: "21.7%" },
  { image: homeImageContainer3, name: "Aruna Residence", type: "Type A · 3 Bedroom", units: 22, percent: "18.3%" },
  { image: homeImageContainer2, name: "Velora Park", type: "Type A · 2 Bedroom", units: 20, percent: "16.7%" },
  { image: homeImageContainer3, name: "Seraya Grove", type: "Type C · 4 Bedroom", units: 18, percent: "15.0%" },
]

const latestRequests = [
  { initials: "AK", name: "Amina Kalu", property: "Aruna Residence", unit: "Type A · 3 Bedroom", email: "amina.kalu@email.com", phone: "+234 803 456 7890", date: "Wed, June 25, 2025", time: "10:30 AM" },
  { initials: "TO", name: "Tunde Okafor", property: "Liora Estate", unit: "Type C · 4 Bedroom", email: "tunde.okafor@email.com", phone: "+234 805 228 1048", date: "Tue, June 24, 2025", time: "02:15 PM" },
]

const barData = [
  { property: "Liora Estate", value: 42 },
  { property: "Nava Heights", value: 36 },
  { property: "Aruna Residence", value: 28 },
  { property: "Velora Park", value: 22 },
  { property: "Seraya Grove", value: 18 },
]

const inquiries = [
  { label: "Answered", count: 180, color: "bg-[#9eaa3a]" },
  { label: "Pending", count: 45, color: "bg-[#d6b64d]" },
  { label: "Escalated", count: 15, color: "bg-[#d8d8d4]" },
]

const chartX = (index: number) => 52 + index * 80
const chartY = (value: number) => 188 - (value / 60) * 160

function SectionHeading({
  title,
  subtitle,
  link,
  to,
  action,
}: {
  title: string
  subtitle?: string
  link?: string
  to?: string
  action?: () => void
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        <h2 className="text-[12px] font-semibold text-[#333329]">{title}</h2>
        {subtitle ? <p className="mt-1 text-[10px] text-[#929288]">{subtitle}</p> : null}
      </div>
      {link && to ? (
        <Link to={to} className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium text-[#686d48] hover:text-[#45482f]">
          {link}<ArrowRight size={12} />
        </Link>
      ) : null}
      {link && action ? (
        <button type="button" onClick={action} className="inline-flex shrink-0 items-center gap-1 text-[10px] font-medium text-[#686d48] hover:text-[#45482f]">
          {link}<ArrowRight size={12} />
        </button>
      ) : null}
    </div>
  )
}

function TourRequestLineChart() {
  const [activePoint, setActivePoint] = useState<number | null>(null)
  const points = tourRequests.map((item, index) => `${chartX(index)},${chartY(item.value)}`)
  const linePath = `M ${points.join(" L ")}`
  const areaPath = `${linePath} L ${chartX(tourRequests.length - 1)},188 L ${chartX(0)},188 Z`
  const active = activePoint === null ? null : tourRequests[activePoint]
  const activeX = activePoint === null ? 0 : chartX(activePoint)
  const activeY = active === null ? 0 : chartY(active.value)

  return (
    <div className="h-[205px] w-full">
      <svg viewBox="0 0 760 212" role="img" aria-label="Tour requests by month" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="tour-area-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a5ad69" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#a5ad69" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 10, 20, 30, 40, 50, 60].map((value) => {
          const y = chartY(value)
          return (
          <g key={y}>
            <line x1="46" x2="740" y1={y} y2={y} stroke="#eeeee8" strokeDasharray="3 5" />
            <text x="8" y={y + 3} fontSize="9" fill="#a2a297">{value}</text>
          </g>
          )
        })}
        <path d={areaPath} fill="url(#tour-area-gradient)" />
        <path d={linePath} fill="none" stroke="#89934e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {active ? (
          <g aria-hidden="true">
            <line x1={activeX} x2={activeX} y1="28" y2="188" stroke="#b7bd8a" strokeDasharray="3 4" />
            <line x1="46" x2={activeX} y1={activeY} y2={activeY} stroke="#b7bd8a" strokeDasharray="3 4" />
            <rect x="2" y={activeY - 9} width="28" height="18" rx="9" fill="#34352c" />
            <text x="16" y={activeY + 3} textAnchor="middle" fontSize="8" fill="#ffffff">{active.value}</text>
            <rect x={Math.min(Math.max(activeX - 52, 42), 628)} y={Math.max(activeY - 68, 2)} width="104" height="55" rx="3" fill="#222222" />
            <text x={Math.min(Math.max(activeX, 94), 680)} y={Math.max(activeY - 48, 21)} textAnchor="middle" fontSize="8" fill="#ffffff">{active.month}, 2025</text>
            <text x={Math.min(Math.max(activeX, 94), 680)} y={Math.max(activeY - 29, 40)} textAnchor="middle" fontSize="9" fontWeight="600" fill="#ffffff">{active.value} Tour request</text>
          </g>
        ) : null}
        {tourRequests.map((point, index) => (
          <g key={point.month}>
            <text x={chartX(index)} y="207" fontSize="9" textAnchor="middle" fill="#99998f">{point.month}</text>
            <circle
              cx={chartX(index)}
              cy={chartY(point.value)}
              r={activePoint === index ? 4.5 : 3}
              fill={activePoint === index ? "#ffffff" : "#f8f8f4"}
              stroke="#89934e"
              strokeWidth="1.5"
              tabIndex={0}
              aria-label={`${point.month}: ${point.value} tour requests`}
              onMouseEnter={() => setActivePoint(index)}
              onMouseLeave={() => setActivePoint(null)}
              onFocus={() => setActivePoint(index)}
              onBlur={() => setActivePoint(null)}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}

export default function DashboardHome() {
  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(properties[0].name)

  return (
    <div className="page-enter space-y-4">
      <section className="flex flex-col items-stretch justify-end gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => setPropertyDialogOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-[#e4e4dc] bg-white px-3 py-2 text-[10px] font-medium text-[#55554c] transition hover:bg-[#f8f8f4]"
        >
          <Building2 size={13} />
          Property
          <ChevronDown size={12} />
        </button>
        <Link
          to="/dashboard/properties"
          state={{ openAddProperty: true }}
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#56593b] px-3 py-2 text-[10px] font-medium text-white transition hover:bg-[#45482f]"
        >
          <Plus size={13} />
          Add property
        </Link>
      </section>

      <section aria-label="Property statistics" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, positive }) => (
          <article key={label} className="rounded-md border border-[#e9e9e3] bg-white px-4 py-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-medium text-[#84847a]">{label}</span>
              <MoreHorizontal size={15} strokeWidth={1.7} className="text-[#929579]" />
            </div>
            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="text-[25px] font-semibold leading-none tracking-tight text-[#303027]">{value}</p>
              <p className={`mb-0.5 flex items-center gap-1 text-[9px] font-medium ${positive ? "text-[#758139]" : "text-[#d24238]"}`}>
                {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {note}
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.7fr_1fr]">
        <article className="rounded-md border border-[#e9e9e3] bg-white p-4">
          <SectionHeading title="Tour requests" subtitle="Requests for property tours over the last 9 months" link="View requests" to="/dashboard/requests" />
          <div className="mb-1 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[9px] text-[#77776d]"><i className="size-2 rounded-full bg-[#89934e]" />Tour requests</span>
            <button type="button" className="inline-flex items-center gap-2 rounded border border-[#e8e8e1] px-2 py-1 text-[9px] text-[#77776d]">
              Last 9 months <ChevronDown size={11} />
            </button>
          </div>
          <TourRequestLineChart />
        </article>

        <article className="rounded-md border border-[#e9e9e3] bg-white p-4">
          <SectionHeading title="Available units" subtitle="Available units across all communities" />
          <div className="mb-3 flex items-end gap-2 border-b border-[#efefe9] pb-3">
            <strong className="text-[25px] font-semibold leading-none text-[#303027]">120</strong>
            <span className="mb-0.5 text-[9px] text-[#929288]">available of 160 total units</span>
          </div>
          <div className="mb-3 flex h-2 gap-1 overflow-hidden rounded-full" aria-label="Available units by community">
            {properties.map((property) => (
              <span key={property.name} className="h-full rounded-full bg-[#aab35d]" style={{ width: property.percent }} />
            ))}
          </div>
          <div className="space-y-2.5">
            {properties.map((property) => (
              <button
                type="button"
                key={property.name}
                onClick={() => {
                  setSelectedProperty(property.name)
                  setPropertyDialogOpen(true)
                }}
                className="group flex w-full items-center gap-2 text-left"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-[#aab35d]" />
                <span className="min-w-0 flex-1 truncate text-[9px] font-medium text-[#55554c] group-hover:text-[#555a34]">{property.name}</span>
                <span className="shrink-0 text-[9px] text-[#8a8a80]">{property.units}</span>
                <span className="w-10 shrink-0 text-right text-[9px] text-[#8a8a80]">{property.percent}</span>
              </button>
            ))}
          </div>
          <Link to="/dashboard/units" className="mt-4 flex items-center justify-center rounded border border-[#e8e8e1] py-2 text-[9px] font-medium text-[#686d48] hover:bg-[#f8f8f4]">
            Manage unit inventory
          </Link>
        </article>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.25fr_1fr_1fr]">
        <article className="rounded-md border border-[#e9e9e3] bg-white p-4">
          <SectionHeading title="Latest request" link="See all" to="/dashboard/requests" />
          <div className="space-y-3">
            {latestRequests.map((request) => (
              <div key={request.name} className="rounded border border-[#efefe9] p-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#f0f1e7] text-[9px] font-semibold text-[#686d48]">{request.initials}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[10px] font-semibold text-[#44443b]">{request.name}</p>
                    <p className="mt-0.5 truncate text-[9px] text-[#96968c]">{request.property} · {request.unit}</p>
                  </div>
                  <Link to="/dashboard/requests" aria-label={`View ${request.name}'s request`} className="rounded p-1.5 text-[#89897f] hover:bg-[#f5f5f0] hover:text-[#56593b]"><Eye size={13} /></Link>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[8px] text-[#77776d]">
                  <span className="inline-flex items-center gap-1"><Mail size={10} />{request.email}</span>
                  <span className="inline-flex items-center gap-1"><Phone size={10} />{request.phone}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#f0f0eb] pt-2 text-[8px] text-[#8a8a80]">
                  <span>{request.date}</span><span>{request.time}</span>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-[#e9e9e3] bg-white p-4">
          <SectionHeading title="Tour requests" subtitle="Requests by community" link="Open calendar" to="/dashboard/calendar" />
          <div className="flex h-[190px] items-end justify-around gap-2 border-b border-[#efefe9] px-1">
            {barData.map((item) => (
              <div key={item.property} className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-1.5" title={`${item.property}: ${item.value} requests`}>
                <span className="text-[8px] text-[#99998f] opacity-0 transition group-hover:opacity-100">{item.value}</span>
                <span className={`w-full max-w-7 rounded-t-sm ${item.property === "Nava Heights" ? "bg-[#929d48]" : "bg-[#e2e5d2] group-hover:bg-[#c8ce9e]"}`} style={{ height: `${item.value * 2.4}px` }} />
                <span className="w-full truncate text-center text-[8px] text-[#8d8d83]">{item.property.split(" ")[0]}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-md border border-[#e9e9e3] bg-white p-4">
          <SectionHeading title="Customer inquiries" link="View all" to="/dashboard/requests" />
          <div className="flex items-center justify-center gap-4 py-1">
            <div className="relative grid size-[110px] shrink-0 place-items-center rounded-full" style={{ background: "conic-gradient(#9eaa3a 0 75%, #d6b64d 75% 93.75%, #d8d8d4 93.75% 100%)" }}>
              <div className="grid size-[76px] place-items-center rounded-full bg-white text-center">
                <span><strong className="block text-[19px] font-semibold leading-none text-[#36362e]">240</strong><small className="text-[8px] text-[#99998f]">Total inquiries</small></span>
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-2.5">
              {inquiries.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-[9px]">
                  <i className={`size-2 shrink-0 rounded-full ${item.color}`} />
                  <span className="min-w-0 flex-1 truncate text-[#77776d]">{item.label}</span>
                  <span className="font-semibold text-[#45453c]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[9px] text-[#85857b]">
            <Clock3 size={11} />
            Updated a few minutes ago
          </div>
        </article>
      </section>

      <AdminDialog
        open={propertyDialogOpen}
        onClose={() => setPropertyDialogOpen(false)}
        title="Select a property"
        description="Choose a community to review unit availability."
        width="max-w-2xl"
      >
        <div className="grid gap-4 sm:grid-cols-[150px_1fr]">
          <div className="space-y-1">
            <p className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-wide text-[#99998f]">Communities</p>
            {properties.map((property) => (
              <button
                type="button"
                key={property.name}
                onClick={() => setSelectedProperty(property.name)}
                className={`w-full rounded px-2.5 py-2 text-left text-[10px] ${selectedProperty === property.name ? "bg-[#f1f2e8] font-semibold text-[#56593b]" : "text-[#77776d] hover:bg-[#f8f8f5]"}`}
              >
                {property.name}
              </button>
            ))}
          </div>
          <div className="rounded border border-[#e9e9e3] p-3">
            {properties.filter((property) => property.name === selectedProperty).map((property) => (
              <div key={property.name}>
                <img src={property.image} alt="" className="h-32 w-full rounded object-cover" />
                <div className="mt-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-[12px] font-semibold text-[#393930]">{property.name}</h3>
                    <p className="mt-1 text-[9px] text-[#929288]">{property.type}</p>
                  </div>
                  <span className="rounded-full bg-[#f1f2e8] px-2 py-1 text-[9px] font-medium text-[#656b42]">{property.units} available</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#efefe9] pt-3">
                  <span className="text-[9px] text-[#77776d]">3 bedrooms · 2 bathrooms · 2,500 sq ft</span>
                  <Link to="/dashboard/properties" onClick={() => setPropertyDialogOpen(false)} className="inline-flex items-center gap-1 text-[9px] font-medium text-[#686d48] hover:text-[#45482f]">Property details <ArrowUpRight size={11} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminDialog>
    </div>
  )
}
