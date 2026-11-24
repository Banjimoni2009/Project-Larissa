import { useEffect, useRef } from "react"
import { Bath, BedDouble, ChevronRight, CookingPot, groundFloorPanorama, Sofa, Trees, Utensils, X } from "../imports"

type GroundFloorDialogProps = {
  open: boolean
  onClose: () => void
  selectedRoom: number
  onSelectRoom: (room: number) => void
}

const rooms = [
  { id: 2, label: "Kitchen", detail: "A practical modern kitchen with clean finishes.", Icon: CookingPot },
  { id: 4, label: "Dining room", detail: "A bright dining area beside the windows.", Icon: Utensils },
  { id: 3, label: "Family room", detail: "A comfortable place to relax with family.", Icon: Sofa },
  { id: 5, label: "Bathroom", detail: "A calm, functional space with refined details.", Icon: Bath },
  { id: 1, label: "Bedroom", detail: "A quiet and comfortable private retreat.", Icon: BedDouble },
  { id: 6, label: "Front yard", detail: "A welcoming green entry to your home.", Icon: Trees },
]

export default function GroundFloorDialog({
  open,
  onClose,
  selectedRoom,
  onSelectRoom,
}: GroundFloorDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const activeRoom = rooms.find((room) => room.id === selectedRoom) ?? rooms[2]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      aria-labelledby="ground-floor-dialog-title"
      className="m-auto w-[calc(100%-2rem)] max-w-3xl border-0 bg-transparent p-0 text-slate-900 shadow-none backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <section className="overflow-hidden rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#777a55]">Aruna residence · Type-A</p>
            <h2 id="ground-floor-dialog-title" className="mt-1 text-xl font-semibold">Ground floor plan</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close floor plan" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
            <X size={19} />
          </button>
        </header>
        <div className="grid gap-6 p-6 md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-60 overflow-hidden rounded-xl bg-slate-100">
            <img src={groundFloorPanorama} alt="Panoramic ground floor interior" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-5 left-5 text-white">
              <p className="text-xs uppercase tracking-[0.15em] text-white/75">Selected room</p>
              <p className="mt-1 text-2xl font-medium">{activeRoom.label}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Explore the rooms</h3>
            <p className="mt-1 text-sm text-slate-500">Choose a space to view its details in the 360 preview.</p>
            <div className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-100">
              {rooms.map(({ id, label, detail, Icon }) => {
                const isSelected = selectedRoom === id
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      onSelectRoom(id)
                      onClose()
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50 ${isSelected ? "bg-[#f5f5ef]" : ""}`}
                  >
                    <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${isSelected ? "bg-[#e4e6d6] text-[#56593b]" : "bg-slate-100 text-slate-600"}`}>
                      <Icon size={17} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium">{label}</span>
                      <span className="mt-0.5 block truncate text-xs text-slate-500">{detail}</span>
                    </span>
                    <ChevronRight size={16} className="shrink-0 text-slate-400" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </dialog>
  )
}
