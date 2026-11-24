import { useEffect, useMemo, useRef, useState } from "react"
import type { FormEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Clock3, X } from "../imports"

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const fieldClassName = "mt-1 w-full border border-[#dedede] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#56593B]"
const labelClassName = "block text-xs font-medium text-[#333]"

function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

function RequestTour() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const [visibleMonth, setVisibleMonth] = useState(() => new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dateError, setDateError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const calendarDays = useMemo(() => {
    const firstWeekday = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), 1).getDay()
    return Array.from({ length: 42 }, (_, index) =>
      new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index - firstWeekday + 1),
    )
  }, [visibleMonth])

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  function closeDialog() {
    const state = location.state as { backgroundLocation?: unknown } | null
    if (state?.backgroundLocation) navigate(-1)
    else navigate("/")
  }

  function changeMonth(direction: number) {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + direction, 1))
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedDate) {
      setDateError(true)
      return
    }
    setDateError(false)
    setSubmitted(true)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="request-tour-title"
      onCancel={(event) => {
        event.preventDefault()
        closeDialog()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) closeDialog()
      }}
      className="fixed inset-0 m-auto max-h-[min(94vh,900px)] w-[min(920px,calc(100vw-24px))] max-w-none overflow-hidden border-0 bg-white p-0 text-[#222] shadow-2xl backdrop:bg-black/55"
    >
      <div className="flex max-h-[min(94vh,900px)] flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-[#e7e7e7] px-5 py-4 sm:px-7">
          <h1 id="request-tour-title" className="text-sm font-semibold">Request tour</h1>
          <button type="button" onClick={closeDialog} aria-label="Close request tour" className="p-1 text-[#777] hover:text-black">
            <X size={18} />
          </button>
        </header>

        <form onSubmit={submitRequest} className="flex min-h-0 flex-1 flex-col">
          <div className="grid min-h-0 flex-1 overflow-y-auto md:grid-cols-[0.95fr_1.05fr]">
            <section aria-label="Choose a date and time" className="space-y-3 bg-[#fafafa] p-4 sm:p-6">
              <div className="bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#e8e8e8] px-5 py-4 text-sm text-[#666]">
                  <CalendarDays size={17} />
                  <span>{selectedDate ? selectedDate.toLocaleDateString(undefined, { dateStyle: "long" }) : "Select date"}</span>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="p-2 text-[#777] hover:bg-gray-100">
                      <ChevronLeft size={17} />
                    </button>
                    <p className="text-sm font-medium">
                      {visibleMonth.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                    </p>
                    <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="p-2 text-[#777] hover:bg-gray-100">
                      <ChevronRight size={17} />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 text-center">
                    {weekDays.map((day) => (
                      <span key={day} className="py-2 text-xs text-[#858585]">{day}</span>
                    ))}
                    {calendarDays.map((date) => {
                      const isCurrentMonth = date.getMonth() === visibleMonth.getMonth()
                      const isSelected = selectedDate !== null && dateKey(date) === dateKey(selectedDate)
                      const isPast = date < today
                      return (
                        <button
                          key={dateKey(date)}
                          type="button"
                          aria-label={date.toLocaleDateString(undefined, { dateStyle: "full" })}
                          disabled={!isCurrentMonth || isPast}
                          onClick={() => {
                            setSelectedDate(date)
                            setDateError(false)
                          }}
                          aria-pressed={isSelected}
                          className={`mx-auto my-0.5 flex aspect-square w-full max-w-10 items-center justify-center text-sm ${
                            isSelected
                              ? "bg-[#56593B] text-white"
                              : isCurrentMonth && !isPast
                                ? "hover:bg-[#f0f1e9]"
                                : "text-[#b9b9b9]"
                          }`}
                        >
                          {String(date.getDate()).padStart(2, "0")}
                        </button>
                      )
                    })}
                  </div>
                  {dateError && <p role="alert" className="mt-2 text-xs text-red-600">Please select a tour date.</p>}
                </div>
              </div>

              <div className="bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-[#e8e8e8] px-5 py-4 text-sm text-[#666]">
                  <Clock3 size={17} />
                  <span>Select time</span>
                </div>
                <div className="p-4 sm:p-5">
                  <label htmlFor="tour-time" className={labelClassName}>Preferred time</label>
                  <div className="relative">
                    <select id="tour-time" name="time" required defaultValue="" className={`${fieldClassName} appearance-none pr-9`}>
                      <option value="" disabled>Select time</option>
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                      <option>11:00 AM</option>
                      <option>01:00 PM</option>
                      <option>02:00 PM</option>
                      <option>03:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-3 p-4 sm:p-6">
              <label className={labelClassName}>
                Full name
                <input name="name" type="text" autoComplete="name" placeholder="Enter your name" required className={fieldClassName} />
              </label>

              <label className={labelClassName}>
                Email address
                <input name="email" type="email" autoComplete="email" placeholder="Enter your email" required className={fieldClassName} />
              </label>

              <label className={labelClassName}>
                Phone number
                <div className="flex">
                  <select name="countryCode" aria-label="Country calling code" defaultValue="+1" className="mt-1 border border-r-0 border-[#dedede] bg-white px-2 text-sm outline-none focus:border-[#56593B]">
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+62">🇮🇩 +62</option>
                  </select>
                  <input name="phone" type="tel" autoComplete="tel-national" placeholder="Enter your number" required className={`${fieldClassName} min-w-0`} />
                </div>
              </label>

              <label className={labelClassName}>
                Cluster
                <div className="relative">
                  <select name="cluster" required defaultValue="" className={`${fieldClassName} appearance-none pr-9`}>
                    <option value="" disabled>Select cluster</option>
                    <option>Aruna residence</option>
                    <option>Liora estate</option>
                    <option>Nava heights</option>
                    <option>Velora park</option>
                    <option>Seraya grove</option>
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className={labelClassName}>
                  Property type
                  <div className="relative">
                    <select name="propertyType" required defaultValue="" className={`${fieldClassName} appearance-none pr-8`}>
                      <option value="" disabled>Select type</option>
                      <option>House</option>
                      <option>Apartment</option>
                      <option>Townhouse</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
                  </div>
                </label>
                <label className={labelClassName}>
                  Unit
                  <div className="relative">
                    <select name="unit" required defaultValue="" className={`${fieldClassName} appearance-none pr-8`}>
                      <option value="" disabled>Select unit</option>
                      <option>Type A</option>
                      <option>Type B</option>
                      <option>Type C</option>
                    </select>
                    <ChevronDown size={16} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" />
                  </div>
                </label>
              </div>

              <label className={labelClassName}>
                Note
                <textarea name="note" rows={3} placeholder="Enter message" className={`${fieldClassName} resize-y`} />
              </label>
            </section>
          </div>

          <footer className="flex shrink-0 flex-col items-end gap-2 border-t border-[#e7e7e7] px-5 py-4 sm:px-7">
            {submitted && (
              <p role="status" className="w-full text-right text-sm text-[#56593B]">
                Your tour request has been submitted. We’ll be in touch soon.
              </p>
            )}
            <button type="submit" className="bg-[#56593B] px-6 py-3 text-sm font-medium text-white hover:bg-[#45482f]">
              Submit
            </button>
          </footer>
        </form>
      </div>
    </dialog>
  )
}

export default RequestTour
