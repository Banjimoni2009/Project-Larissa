import { useEffect, useRef, useState } from "react"
import type { FormEvent } from "react"
import { BarChart3, BookOpenText, ChevronDown, House, Mail, MessageCircle, X } from "../imports"

interface BrochureProps {
  onClose: () => void
}

const clusters = ["Aruna residence", "Liora estate", "Nava heights", "Velora park", "Seraya grove"]
const brochureOptions = [
  { value: "full", label: "Full brochure", Icon: BookOpenText },
  { value: "floorplan", label: "Floorplan Only", Icon: BarChart3 },
  { value: "pricing", label: "Pricing Sheet", Icon: House },
]

const inputClassName = "mt-1 w-full border border-[#d8d8d8] bg-white px-3 py-3 text-sm outline-none placeholder:text-[#858585] focus:border-[#56593B]"
const selectedClassName = "border-[#b9bc95] bg-[#f7f7f1] text-[#56593B]"

function Brochure({ onClose }: BrochureProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [selectedTypes, setSelectedTypes] = useState(["full", "floorplan"])
  const [sendVia, setSendVia] = useState<"email" | "whatsapp">("email")
  const [typeError, setTypeError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  function toggleType(value: string) {
    setSelectedTypes((current) =>
      current.includes(value) ? current.filter((type) => type !== value) : [...current, value],
    )
    setTypeError(false)
    setSubmitted(false)
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (selectedTypes.length === 0) {
      setTypeError(true)
      return
    }
    setSubmitted(true)
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="brochure-title"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      className="fixed inset-0 m-auto max-h-[min(94vh,900px)] w-[min(520px,calc(100vw-24px))] max-w-none overflow-hidden border-0 bg-white p-0 text-[#171717] shadow-2xl backdrop:bg-black/60"
    >
      <div className="flex max-h-[min(94vh,900px)] flex-col">
        <header className="flex shrink-0 items-center justify-between border-b border-[#e7e7e7] px-6 py-5">
          <h2 id="brochure-title" className="text-base font-medium">Brochure request</h2>
          <button type="button" onClick={onClose} aria-label="Close brochure request" className="p-1 text-[#777] hover:text-black">
            <X size={18} />
          </button>
        </header>

        <form onSubmit={submitRequest} className="min-h-0 flex-1 overflow-y-auto">
          <div className="space-y-4 px-6 py-5">
            <label className="block text-sm">
              Full name
              <input name="name" type="text" autoComplete="name" placeholder="Enter your name" required className={inputClassName} />
            </label>

            <label className="block text-sm">
              Email address
              <input name="email" type="email" autoComplete="email" placeholder="Enter your email" required className={inputClassName} />
            </label>

            <label className="block text-sm">
              Phone number
              <div className="mt-1 flex">
                <select
                  name="countryCode"
                  aria-label="Country calling code"
                  defaultValue="+1"
                  className="border border-r-0 border-[#d8d8d8] bg-white px-2 text-sm outline-none focus:border-[#56593B]"
                >
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                  <option value="+62">🇮🇩 +62</option>
                </select>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel-national"
                  placeholder="Enter your number"
                  required
                  className={`${inputClassName} mt-0 min-w-0`}
                />
              </div>
            </label>

            <label className="block text-sm">
              Cluster
              <div className="relative">
                <select name="cluster" required defaultValue="" className={`${inputClassName} appearance-none pr-10`}>
                  <option value="" disabled>Select cluster</option>
                  {clusters.map((cluster) => <option key={cluster}>{cluster}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </label>

            <fieldset>
              <legend className="mb-2 text-sm">Brochure type</legend>
              <div className="grid grid-cols-3 gap-3">
                {brochureOptions.map(({ value, label, Icon }) => {
                  const isSelected = selectedTypes.includes(value)
                  return (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleType(value)}
                      className={`flex min-h-[86px] flex-col items-center justify-center gap-2 border px-2 py-3 text-center text-xs transition-colors ${
                        isSelected ? selectedClassName : "border-[#d8d8d8] hover:bg-gray-50"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{label}</span>
                    </button>
                  )
                })}
              </div>
              {typeError && <p role="alert" className="mt-2 text-xs text-red-600">Select at least one brochure type.</p>}
            </fieldset>

            <fieldset>
              <legend className="mb-2 text-sm">Send via</legend>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  aria-pressed={sendVia === "email"}
                  onClick={() => setSendVia("email")}
                  className={`flex min-h-[86px] flex-col items-center justify-center gap-2 border text-sm ${
                    sendVia === "email" ? selectedClassName : "border-[#d8d8d8] hover:bg-gray-50"
                  }`}
                >
                  <Mail size={18} />
                  <span>Email</span>
                </button>
                <button
                  type="button"
                  aria-pressed={sendVia === "whatsapp"}
                  onClick={() => setSendVia("whatsapp")}
                  className={`flex min-h-[86px] flex-col items-center justify-center gap-2 border text-sm ${
                    sendVia === "whatsapp" ? selectedClassName : "border-[#d8d8d8] hover:bg-gray-50"
                  }`}
                >
                  <MessageCircle size={18} />
                  <span>Whatsapp</span>
                </button>
              </div>
              <input type="hidden" name="sendVia" value={sendVia} />
              <input type="hidden" name="brochureTypes" value={selectedTypes.join(",")} />
            </fieldset>
          </div>

          <footer className="sticky bottom-0 flex shrink-0 flex-col gap-2 border-t border-[#e7e7e7] bg-white px-6 py-5">
            {submitted && (
              <p role="status" className="text-center text-sm text-[#56593B]">
                Your brochure request has been submitted.
              </p>
            )}
            <button type="submit" className="w-full bg-[#56593B] px-4 py-3.5 text-sm font-medium text-white hover:bg-[#45482f]">
              Submit request
            </button>
          </footer>
        </form>
      </div>
    </dialog>
  )
}

export default Brochure
