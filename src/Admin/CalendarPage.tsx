import { useMemo, useState, type FormEvent } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Plus,
} from "../imports"
import AdminDialog from "./AdminDialog"
import RequestWorkspaceTabs from "./RequestWorkspaceTabs"

type Tour = { day: number; month: number; year: number; time: string; name: string; property: string; color: string }

const initialTours: Tour[] = [
  { day: 4, month: 5, year: 2025, time: "10:30 AM", name: "Amina Kalu", property: "Aruna Residence · Type A", color: "bg-[#68734c]" },
  { day: 8, month: 5, year: 2025, time: "01:00 PM", name: "Chika Nwosu", property: "Nava Heights · Type B", color: "bg-[#d6b64d]" },
  { day: 12, month: 5, year: 2025, time: "11:00 AM", name: "Bola Adebayo", property: "Aruna Residence · Type B", color: "bg-[#89934e]" },
  { day: 17, month: 5, year: 2025, time: "03:30 PM", name: "Ngozi Eze", property: "Liora Estate · Type C", color: "bg-[#d6b64d]" },
  { day: 21, month: 5, year: 2025, time: "09:30 AM", name: "Femi Johnson", property: "Velora Park · Type A", color: "bg-[#68734c]" },
  { day: 25, month: 5, year: 2025, time: "10:30 AM", name: "Tunde Okafor", property: "Liora Estate · Type C", color: "bg-[#d6b64d]" },
]

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const dateInputClass = "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-[#777c59]"

export default function CalendarPage() {
  const [month, setMonth] = useState(new Date(2025, 5, 1))
  const [tours, setTours] = useState(initialTours)
  const [focusedDay, setFocusedDay] = useState(25)
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [createdMessage, setCreatedMessage] = useState("")
  const [formError, setFormError] = useState("")

  const cells = useMemo(() => {
    const firstWeekday = new Date(month.getFullYear(), month.getMonth(), 1).getDay()
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    const previousMonthDays = new Date(month.getFullYear(), month.getMonth(), 0).getDate()
    return Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - firstWeekday + 1
      if (dayNumber < 1) return { day: previousMonthDays + dayNumber, inMonth: false }
      if (dayNumber > daysInMonth) return { day: dayNumber - daysInMonth, inMonth: false }
      return { day: dayNumber, inMonth: true }
    })
  }, [month])

  function changeMonth(direction: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + direction, 1))
    setFocusedDay(1)
  }

  function addTour(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const property = String(data.get("property") ?? "").trim()
    const time = String(data.get("time") ?? "")
    if (selectedDay === null || !name || !property || !time) {
      setFormError("Enter a contact, property, and time for this appointment.")
      return
    }
    setTours((current) => [...current, { day: selectedDay, month: month.getMonth(), year: month.getFullYear(), time, name, property, color: "bg-[#89934e]" }])
    setCreatedMessage(`Tour added for ${name} on ${monthNames[month.getMonth()]} ${selectedDay}.`)
    setFormError("")
    setSelectedDay(null)
    form.reset()
  }

  return (
    <div className="page-enter space-y-5">
      <RequestWorkspaceTabs />
      <section className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div><h2 className="text-[13px] font-semibold text-[#333329]">Schedule</h2><p className="mt-1 text-[10px] text-[#929288]">Calendar view of scheduled appointments.</p></div>
        <button type="button" onClick={() => { setFormError(""); setSelectedDay(focusedDay) }} className="inline-flex items-center justify-center gap-2 rounded-md bg-[#56593b] px-3 py-2 text-[10px] font-medium text-white hover:bg-[#45482f]"><Plus size={13} /> Add appointment</button>
      </section>
      {createdMessage ? <div role="status" className="flex items-center justify-between rounded-md border border-[#e5e8d6] bg-[#f5f6ef] px-4 py-3 text-[10px] text-[#56593b]">{createdMessage}<button type="button" onClick={() => setCreatedMessage("")} aria-label="Dismiss confirmation" className="ml-3 font-semibold">×</button></div> : null}
      <article className="overflow-hidden rounded-md border border-[#e9e9e3] bg-white">
          <div className="flex items-center justify-between border-b border-[#ededE7] px-4 py-4 sm:px-5">
            <div><h3 className="text-[12px] font-semibold text-[#393930]">{monthNames[month.getMonth()]} {month.getFullYear()}</h3><p className="mt-1 text-[9px] text-[#929288]">{tours.length} scheduled tours</p></div>
            <div className="flex items-center gap-2"><button type="button" onClick={() => { setMonth(new Date(2025, 5, 1)); setFocusedDay(25) }} className="rounded border border-[#e5e5de] px-2.5 py-1.5 text-[9px] font-medium text-[#66665d] hover:bg-[#fafaf7]">Today</button><button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="rounded border border-[#e5e5de] p-1.5 text-[#77776d] hover:bg-[#fafaf7]"><ArrowLeft size={13} /></button><button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="rounded border border-[#e5e5de] p-1.5 text-[#77776d] hover:bg-[#fafaf7]"><ArrowRight size={13} /></button></div>
          </div>
          <div className="grid grid-cols-7 border-b border-[#ededE7] bg-[#fafaf8] text-center text-[9px] font-medium text-[#77776d]">{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => <div key={day} className="py-2.5">{day}</div>)}</div>
          <div className="grid grid-cols-7">
            {cells.map((cell, index) => {
              const dayTours = cell.inMonth ? tours.filter((tour) => tour.day === cell.day && tour.month === month.getMonth() && tour.year === month.getFullYear()) : []
              return (
                <button key={`${cell.day}-${index}`} type="button" onClick={() => cell.inMonth && setFocusedDay(cell.day)} aria-label={cell.inMonth ? `${monthNames[month.getMonth()]} ${cell.day}${dayTours.length ? `, ${dayTours.length} appointments` : ""}` : "Outside current month"}                 className={`min-h-[82px] border-b border-r border-[#ededE7] p-1.5 text-left transition hover:bg-[#f7f8f2] sm:min-h-[112px] sm:p-2 ${cell.inMonth ? "bg-white" : "bg-[#fafaf8] text-[#c5c5bd]"}`}>
                  <span className={`ml-auto grid size-6 place-items-center rounded-full text-[10px] ${cell.inMonth && cell.day === focusedDay ? "bg-[#56593b] font-semibold text-white" : ""}`}>{cell.day}</span>
                  <span className="mt-1 block space-y-1">
                    {dayTours.slice(0, 2).map((tour) => <span key={`${tour.name}-${tour.time}`} className={`block truncate rounded px-1.5 py-1 text-[8px] font-medium text-white sm:text-[9px] ${tour.color}`}>{tour.time} · {tour.name}</span>)}
                    {dayTours.length > 2 ? <span className="block px-1 text-[8px] text-slate-500">+{dayTours.length - 2} more</span> : null}
                  </span>
                </button>
              )
            })}
          </div>
      </article>
      <AdminDialog open={selectedDay !== null} onClose={() => setSelectedDay(null)} title="Add an appointment" description={selectedDay !== null ? `${monthNames[month.getMonth()]} ${selectedDay}, ${month.getFullYear()}` : undefined}>
        <form onSubmit={addTour} className="space-y-4">
          <label className="block text-xs font-medium">Contact name<input name="name" required placeholder="Enter the visitor's name" className={dateInputClass} /></label>
          <label className="block text-xs font-medium">Property<input name="property" required placeholder="e.g. Aruna Residence · Type A" className={dateInputClass} /></label>
          <label className="block text-xs font-medium">Time<select name="time" required defaultValue="" className={`${dateInputClass} bg-white`}><option value="" disabled>Select a time</option><option>09:30 AM</option><option>10:30 AM</option><option>01:00 PM</option><option>03:30 PM</option></select></label>
          {formError ? <p role="alert" className="text-xs text-red-600">{formError}</p> : null}
          <div className="flex justify-end gap-3 pt-1"><button type="button" onClick={() => setSelectedDay(null)} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50">Cancel</button><button type="submit" className="rounded-lg bg-[#56593b] px-4 py-2.5 text-xs font-medium text-white hover:bg-[#45482f]">Add appointment</button></div>
        </form>
      </AdminDialog>
    </div>
  )
}
