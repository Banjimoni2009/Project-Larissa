import { useMemo, useState, type FormEvent } from "react"
import { useLocation } from "react-router-dom"
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Phone,
  Search,
  UserRound,
} from "../imports"
import AdminDialog from "./AdminDialog"
import RequestWorkspaceTabs from "./RequestWorkspaceTabs"

type RequestRecord = {
  id: string
  name: string
  email: string
  phone: string
  property: string
  unit: string
  kind: "Property tour" | "General inquiry"
  date: string
  status: "New" | "Scheduled" | "Contacted"
}

const initialRequests: RequestRecord[] = [
  { id: "SR-1048", name: "Amina Kalu", email: "amina.kalu@email.com", phone: "+234 803 456 7890", property: "Aruna Residence", unit: "Type A · 3 Bedroom", kind: "Property tour", date: "25 Jun, 10:30 AM", status: "New" },
  { id: "SR-1047", name: "Tunde Okafor", email: "tunde.okafor@email.com", phone: "+234 805 228 1048", property: "Liora Estate", unit: "Type C · 4 Bedroom", kind: "General inquiry", date: "24 Jun, 02:15 PM", status: "Contacted" },
  { id: "SR-1046", name: "Chika Nwosu", email: "chika.nwosu@email.com", phone: "+234 809 571 3320", property: "Nava Heights", unit: "Type B · 3 Bedroom", kind: "Property tour", date: "26 Jun, 01:00 PM", status: "Scheduled" },
  { id: "SR-1045", name: "Bola Adebayo", email: "bola.adebayo@email.com", phone: "+234 802 617 9054", property: "Aruna Residence", unit: "Type B · 4 Bedroom", kind: "Property tour", date: "27 Jun, 11:00 AM", status: "New" },
  { id: "SR-1044", name: "Femi Johnson", email: "femi.johnson@email.com", phone: "+234 806 118 2241", property: "Velora Park", unit: "Type A · 3 Bedroom", kind: "General inquiry", date: "23 Jun, 09:45 AM", status: "Contacted" },
  { id: "SR-1043", name: "Ngozi Eze", email: "ngozi.eze@email.com", phone: "+234 807 220 3105", property: "Liora Estate", unit: "Type B · 3 Bedroom", kind: "Property tour", date: "28 Jun, 03:30 PM", status: "Scheduled" },
  { id: "SR-1042", name: "David Ojo", email: "david.ojo@email.com", phone: "+234 814 112 7890", property: "Aruna Residence", unit: "Type A · 3 Bedroom", kind: "General inquiry", date: "22 Jun, 04:10 PM", status: "New" },
]

const statusClass: Record<RequestRecord["status"], string> = {
  New: "bg-[#f7f1df] text-[#957a2f]",
  Scheduled: "bg-[#f0f2e4] text-[#626a3d]",
  Contacted: "bg-[#eff2e3] text-[#5b6240]",
}

function initials(name: string) {
  return name.split(" ").map((part) => part[0]).join("")
}

export default function RequestsPage() {
  const [requests, setRequests] = useState(initialRequests)
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All statuses")
  const [kindFilter, setKindFilter] = useState("All requests")
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectedRequest, setSelectedRequest] = useState<RequestRecord | null>(null)
  const [scheduleRequest, setScheduleRequest] = useState<RequestRecord | null>(null)
  const [scheduleMonth, setScheduleMonth] = useState(new Date(2025, 5, 1))
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduledMessage, setScheduledMessage] = useState("")
  const [scheduleError, setScheduleError] = useState("")
  const { search } = useLocation()
  const isBrochureView = new URLSearchParams(search).get("view") === "brochure"

  const filteredRequests = useMemo(() => requests.filter((request) => {
    const matchesText = `${request.name} ${request.email} ${request.property} ${request.id}`.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === "All statuses" || request.status === statusFilter
    const matchesKind = kindFilter === "All requests" || request.kind === kindFilter
    return matchesText && matchesStatus && matchesKind
  }), [requests, query, statusFilter, kindFilter])

  const visibleIds = filteredRequests.map((request) => request.id)
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id))
  const scheduleCells = useMemo(() => {
    const firstWeekday = new Date(scheduleMonth.getFullYear(), scheduleMonth.getMonth(), 1).getDay()
    const daysInMonth = new Date(scheduleMonth.getFullYear(), scheduleMonth.getMonth() + 1, 0).getDate()
    const previousMonthDays = new Date(scheduleMonth.getFullYear(), scheduleMonth.getMonth(), 0).getDate()
    return Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - firstWeekday + 1
      if (dayNumber < 1) return { day: previousMonthDays + dayNumber, inMonth: false }
      if (dayNumber > daysInMonth) return { day: dayNumber - daysInMonth, inMonth: false }
      return { day: dayNumber, inMonth: true }
    })
  }, [scheduleMonth])

  function startSchedule(request: RequestRecord | null) {
    setScheduleError("")
    setScheduleDate("")
    setScheduleMonth(new Date(2025, 5, 1))
    setScheduleRequest(request)
  }

  function toggleAllVisible() {
    setSelectedIds((current) => allVisibleSelected
      ? current.filter((id) => !visibleIds.includes(id))
      : [...new Set([...current, ...visibleIds])])
  }

  function scheduleTour(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!scheduleRequest) return
    const form = event.currentTarget
    const formData = new FormData(form)
    const date = String(formData.get("date") ?? "")
    const time = String(formData.get("time") ?? "")
    if (!date || !time) {
      setScheduleError("Choose a date and time before confirming the tour.")
      return
    }

    setRequests((current) => current.map((request) => request.id === scheduleRequest.id
      ? { ...request, status: "Scheduled", date: `${new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}, ${time}` }
      : request))
    setScheduledMessage(`Tour scheduled for ${scheduleRequest.name}.`)
    setScheduleError("")
    setScheduleRequest(null)
    form.reset()
  }

  return (
    <div className="page-enter space-y-5">
      <RequestWorkspaceTabs />
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-[13px] font-semibold text-[#333329]">{isBrochureView ? "Request brochure" : "Request list"}</h2>
          <p className="mt-1 text-[10px] text-[#929288]">{isBrochureView ? "Brochure requests" : "Manage incoming property and tour requests."}</p>
        </div>
        <button type="button" onClick={() => startSchedule(requests[0] ?? null)} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#56593b] px-3 py-2 text-[10px] font-medium text-white hover:bg-[#45482f]">
          <CalendarDays size={13} />Assign to date
        </button>
      </section>

      {scheduledMessage ? (
        <div role="status" className="flex items-center justify-between rounded-md border border-[#e5e8d6] bg-[#f5f6ef] px-4 py-3 text-[10px] text-[#56593b]">
          {scheduledMessage}<button type="button" onClick={() => setScheduledMessage("")} aria-label="Dismiss confirmation" className="ml-3 font-semibold">×</button>
        </div>
      ) : null}

      {selectedIds.length > 0 && !isBrochureView ? (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-[#e3e5d7] bg-[#f5f6ef] px-4 py-2.5">
          <span className="text-[10px] font-medium text-[#56593b]">{selectedIds.length} selected</span>
          <button type="button" onClick={() => startSchedule(requests.find((request) => request.id === selectedIds[0]) ?? null)} className="inline-flex items-center gap-1.5 rounded border border-[#dedfce] bg-white px-2.5 py-1.5 text-[9px] font-medium text-[#56593b] hover:bg-[#fafaf7]">
            <CalendarDays size={12} />Assign to date
          </button>
          <button type="button" onClick={() => setSelectedIds([])} className="ml-auto text-[9px] text-[#77776d] hover:text-[#45453c]">Clear selection</button>
        </div>
      ) : null}

      <section className="overflow-hidden rounded-md border border-[#e9e9e3] bg-white">
        <div className="flex flex-col gap-3 border-b border-[#ededE7] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-[11px] font-semibold text-[#45453c]">{isBrochureView ? "Brochure requests" : "All requests"}</h3>
            <span className="rounded-full bg-[#f3f3ef] px-2 py-0.5 text-[9px] text-[#77776d]">{isBrochureView ? 0 : filteredRequests.length}</span>
          </div>
          {!isBrochureView ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#96968c]" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Search requests" placeholder="Search request" className="w-full rounded border border-[#e8e8e1] py-2 pl-8 pr-3 text-[10px] outline-none focus:border-[#a5aa77] sm:w-48" />
              </label>
              <label className="relative">
                <Filter size={12} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[#89897f]" />
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter requests by status" className="w-full appearance-none rounded border border-[#e8e8e1] bg-white py-2 pl-7 pr-7 text-[10px] outline-none sm:w-36">
                  <option>All statuses</option><option>New</option><option>Scheduled</option><option>Contacted</option>
                </select>
                <ChevronDown size={12} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#89897f]" />
              </label>
            </div>
          ) : null}
        </div>
        {!isBrochureView ? (
          <>
            <div className="flex flex-wrap items-center gap-4 border-b border-[#ededE7] px-4 py-2.5">
              {["All requests", "Property tour", "General inquiry"].map((kind) => (
                <button key={kind} type="button" onClick={() => setKindFilter(kind)} className={`text-[9px] transition ${kindFilter === kind ? "font-semibold text-[#56593b]" : "text-[#929288] hover:text-[#45453c]"}`}>{kind}</button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1130px] text-left">
                <thead className="bg-[#fafaf8] text-[8px] uppercase tracking-[0.08em] text-[#8e8e84]">
                  <tr>
                    <th className="w-10 px-4 py-3"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAllVisible} aria-label="Select all requests" className="accent-[#747b4b]" /></th>
                    <th className="px-3 py-3 font-medium">Name</th><th className="px-3 py-3 font-medium">Email</th><th className="px-3 py-3 font-medium">Community</th><th className="px-3 py-3 font-medium">Type &amp; Unit</th><th className="px-3 py-3 font-medium">Date</th><th className="px-3 py-3 font-medium">Time</th><th className="px-3 py-3 font-medium">Status</th><th className="px-3 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0eb]">
                  {filteredRequests.map((request) => {
                    const [date, time] = request.date.split(", ")
                    const checked = selectedIds.includes(request.id)
                    return (
                      <tr key={request.id} className={`cursor-pointer text-[9px] transition hover:bg-[#fafaf7] ${checked ? "bg-[#f7f8f2]" : ""}`} onClick={() => setSelectedRequest(request)}>
                        <td className="px-4 py-3.5" onClick={(event) => event.stopPropagation()}>
                          <input type="checkbox" checked={checked} onChange={() => setSelectedIds((current) => checked ? current.filter((id) => id !== request.id) : [...current, request.id])} aria-label={`Select ${request.name}`} className="accent-[#747b4b]" />
                        </td>
                        <td className="whitespace-nowrap px-3 py-3.5"><div className="flex items-center gap-2"><span className="grid size-7 place-items-center rounded-full bg-[#f0f1e7] text-[8px] font-semibold text-[#686d48]">{initials(request.name)}</span><span className="font-medium text-[#45453c]">{request.name}</span></div></td>
                        <td className="whitespace-nowrap px-3 py-3.5 text-[#77776d]">{request.email}</td>
                        <td className="whitespace-nowrap px-3 py-3.5 text-[#55554c]">{request.property}</td>
                        <td className="whitespace-nowrap px-3 py-3.5 text-[#77776d]">{request.unit}</td>
                        <td className="whitespace-nowrap px-3 py-3.5 text-[#77776d]">{date}</td>
                        <td className="whitespace-nowrap px-3 py-3.5 text-[#77776d]">{time}</td>
                        <td className="px-3 py-3.5"><span className={`rounded-full px-2 py-1 text-[8px] font-medium ${statusClass[request.status]}`}>{request.status}</span></td>
                        <td className="px-3 py-3.5" onClick={(event) => event.stopPropagation()}><button type="button" onClick={() => setSelectedRequest(request)} aria-label={`Open ${request.name} request`} className="rounded p-1.5 text-[#85857b] hover:bg-[#f0f1e7] hover:text-[#56593b]"><MoreHorizontal size={15} /></button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              {filteredRequests.length === 0 ? <p className="px-5 py-10 text-center text-[10px] text-[#8e8e84]">No requests match your filters.</p> : null}
            </div>
            <div className="flex items-center justify-between border-t border-[#ededE7] px-4 py-3 text-[9px] text-[#929288]"><span>Showing {filteredRequests.length} requests</span><span>Page 1 of 1</span></div>
          </>
        ) : (
          <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center">
            <span className="grid size-10 place-items-center rounded-full bg-[#f3f3ef] text-[#7d8065]"><Check size={18} /></span>
            <p className="mt-3 text-[11px] font-medium text-[#45453c]">No brochure requests</p>
            <p className="mt-1 max-w-xs text-[9px] leading-4 text-[#929288]">Brochure requests will appear here when they are submitted.</p>
          </div>
        )}
      </section>

      <AdminDialog
        open={selectedRequest !== null}
        onClose={() => setSelectedRequest(null)}
        title="Request details"
        description={selectedRequest ? `Request ${selectedRequest.id}` : undefined}
        position="right"
      >
        {selectedRequest ? (
          <div className="space-y-5">
            <div className="flex items-center gap-3 border-b border-[#ededE7] pb-5">
              <span className="grid size-11 place-items-center rounded-full bg-[#f0f1e7] text-[11px] font-semibold text-[#686d48]">{initials(selectedRequest.name)}</span>
              <div className="min-w-0 flex-1"><p className="truncate text-[12px] font-semibold text-[#393930]">{selectedRequest.name}</p><p className="mt-1 text-[9px] text-[#929288]">{selectedRequest.kind} · {selectedRequest.date}</p></div>
              <span className={`rounded-full px-2 py-1 text-[8px] font-medium ${statusClass[selectedRequest.status]}`}>{selectedRequest.status}</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5"><Mail size={14} className="mt-0.5 text-[#88887e]" /><div><p className="text-[9px] text-[#929288]">Email address</p><p className="mt-1 break-all text-[10px] font-medium text-[#45453c]">{selectedRequest.email}</p></div></div>
              <div className="flex items-start gap-2.5"><Phone size={14} className="mt-0.5 text-[#88887e]" /><div><p className="text-[9px] text-[#929288]">Phone number</p><p className="mt-1 text-[10px] font-medium text-[#45453c]">{selectedRequest.phone}</p></div></div>
              <div className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 text-[#88887e]" /><div><p className="text-[9px] text-[#929288]">Property of interest</p><p className="mt-1 text-[10px] font-medium text-[#45453c]">{selectedRequest.property}</p><p className="mt-1 text-[9px] text-[#77776d]">{selectedRequest.unit}</p></div></div>
              <div className="flex items-start gap-2.5"><UserRound size={14} className="mt-0.5 text-[#88887e]" /><div><p className="text-[9px] text-[#929288]">Request ID</p><p className="mt-1 text-[10px] font-medium text-[#45453c]">{selectedRequest.id}</p></div></div>
            </div>
            <div className="rounded-md border border-[#ededE7] p-3"><div className="flex items-center gap-2 text-[10px] font-semibold text-[#45453c]"><MessageCircle size={13} className="text-[#88887e]" />Request message</div><p className="mt-2 text-[9px] leading-5 text-[#77776d]">I would like to learn more about this property and arrange a convenient time to speak with your team.</p></div>
            <div className="flex gap-2 border-t border-[#ededE7] pt-4">
              <a href={`mailto:${selectedRequest.email}`} className="flex flex-1 items-center justify-center gap-1.5 rounded border border-[#e5e5de] px-3 py-2.5 text-[9px] font-medium text-[#55554c] hover:bg-[#fafaf7]"><Mail size={12} />Email</a>
              <a href={`tel:${selectedRequest.phone.replace(/\s/g, "")}`} className="flex flex-1 items-center justify-center gap-1.5 rounded border border-[#e5e5de] px-3 py-2.5 text-[9px] font-medium text-[#55554c] hover:bg-[#fafaf7]"><Phone size={12} />Call</a>
            </div>
            <button type="button" onClick={() => { startSchedule(selectedRequest); setSelectedRequest(null) }} className="flex w-full items-center justify-center gap-2 rounded bg-[#56593b] px-4 py-2.5 text-[10px] font-medium text-white hover:bg-[#45482f]"><CalendarDays size={13} />Assign to date</button>
          </div>
        ) : null}
      </AdminDialog>

      <AdminDialog open={scheduleRequest !== null} onClose={() => setScheduleRequest(null)} title="Assign to date" description={scheduleRequest ? `Schedule a visit for ${scheduleRequest.name}.` : undefined}>
        {scheduleRequest ? (
          <form onSubmit={scheduleTour} className="space-y-4">
            <div className="rounded-md bg-[#f7f8f2] p-3 text-[10px]"><p className="font-semibold text-[#45453c]">{scheduleRequest.property}</p><p className="mt-1 text-[#77776d]">{scheduleRequest.unit} · {scheduleRequest.name}</p></div>
            <div className="rounded-md border border-[#e8e8e1] p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-[10px] font-semibold text-[#45453c]">Select a date</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-medium text-[#77776d]">{scheduleMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                  <button type="button" aria-label="Previous month" onClick={() => setScheduleMonth((month) => new Date(month.getFullYear(), month.getMonth() - 1, 1))} className="rounded p-1 text-[#77776d] hover:bg-[#f5f5f0]"><ChevronLeft size={13} /></button>
                  <button type="button" aria-label="Next month" onClick={() => setScheduleMonth((month) => new Date(month.getFullYear(), month.getMonth() + 1, 1))} className="rounded p-1 text-[#77776d] hover:bg-[#f5f5f0]"><ChevronRight size={13} /></button>
                </div>
              </div>
              <div role="grid" aria-label="Select tour date" className="grid grid-cols-7 gap-1 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`} role="columnheader" className="py-1 text-[8px] font-medium text-[#99998f]">{day}</span>)}
                {scheduleCells.map((cell, index) => {
                  const dateValue = `${scheduleMonth.getFullYear()}-${String(scheduleMonth.getMonth() + 1).padStart(2, "0")}-${String(cell.day).padStart(2, "0")}`
                  const selected = scheduleDate === dateValue
                  return (
                    <button key={`${cell.day}-${index}`} type="button" role="gridcell" disabled={!cell.inMonth} aria-pressed={selected} onClick={() => setScheduleDate(dateValue)} className={`mx-auto grid size-7 place-items-center rounded-full text-[9px] transition ${selected ? "bg-[#56593b] font-semibold text-white" : cell.inMonth ? "text-[#55554c] hover:bg-[#f0f1e7]" : "text-[#c7c7bf]"}`}>
                      {cell.day}
                    </button>
                  )
                })}
              </div>
              <input name="date" type="hidden" value={scheduleDate} />
            </div>
            <label className="block text-[10px] font-medium text-[#55554c]">Preferred time<select name="time" required defaultValue="" className="mt-1.5 w-full rounded border border-[#e8e8e1] bg-white px-3 py-2.5 text-[10px] outline-none focus:border-[#a5aa77]"><option value="" disabled>Select a time</option><option>10:00 AM</option><option>10:30 AM</option><option>12:00 PM</option><option>01:00 PM</option><option>03:30 PM</option></select></label>
            {scheduleError ? <p role="alert" className="text-[10px] text-red-600">{scheduleError}</p> : null}
            <div className="flex justify-end gap-2 border-t border-[#ededE7] pt-4"><button type="button" onClick={() => setScheduleRequest(null)} className="rounded border border-[#e5e5de] px-4 py-2.5 text-[10px] font-medium text-[#66665d] hover:bg-[#fafaf7]">Cancel</button><button type="submit" className="rounded bg-[#56593b] px-4 py-2.5 text-[10px] font-medium text-white hover:bg-[#45482f]">Confirm</button></div>
          </form>
        ) : null}
      </AdminDialog>
    </div>
  )
}
