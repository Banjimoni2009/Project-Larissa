import { useEffect, useRef, type ReactNode } from "react"
import { X } from "../imports"

type AdminDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
  width?: string
  showHeader?: boolean
  position?: "center" | "right"
}

export default function AdminDialog({
  open,
  onClose,
  title,
  description,
  children,
  width = "max-w-lg",
  showHeader = true,
  position = "center",
}: AdminDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-label={showHeader ? undefined : title || "Search dashboard"}
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.preventDefault()
          onClose()
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className={`${position === "right" ? "ml-auto mr-0 h-dvh max-h-dvh w-[min(100%,450px)] max-w-none" : `m-auto w-[calc(100%-2rem)] ${width}`} border-0 bg-transparent p-0 text-[#303027] shadow-none backdrop:bg-black/35 backdrop:backdrop-blur-sm`}
    >
      <section className={`${position === "right" ? "h-full max-h-dvh overflow-y-auto rounded-none" : "max-h-[90dvh] overflow-y-auto rounded-2xl"} bg-white shadow-2xl`}>
        {showHeader ? (
          <header className="flex items-start justify-between gap-5 border-b border-[#ededE7] px-6 py-5">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
              {description ? (
                <p className="mt-1 text-sm leading-5 text-[#77776d]">{description}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-lg p-2 text-[#77776d] transition hover:bg-[#f4f4ef] hover:text-[#303027]"
            >
              <X size={18} />
            </button>
          </header>
        ) : null}
        <div className={showHeader ? "px-6 py-5" : ""}>{children}</div>
      </section>
    </dialog>
  )
}
