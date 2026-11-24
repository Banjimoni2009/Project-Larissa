import { Link, useLocation } from "react-router-dom"

const tabs: { label: string; to: string; matches: (pathname: string, search: string) => boolean }[] = [
  { label: "Request list", to: "/dashboard/requests", matches: (pathname: string, search: string) => pathname === "/dashboard/requests" && !search.includes("view=brochure") },
  { label: "Request brochure", to: "/dashboard/requests?view=brochure", matches: (pathname: string, search: string) => pathname === "/dashboard/requests" && search.includes("view=brochure") },
  { label: "Schedule", to: "/dashboard/calendar", matches: (pathname: string) => pathname === "/dashboard/calendar" },
]

export default function RequestWorkspaceTabs() {
  const { pathname, search } = useLocation()

  return (
    <nav aria-label="Request workspace" className="flex items-center gap-6 border-b border-[#e9e9e3]">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          to={tab.to}
          className={`border-b-2 px-1 pb-3 text-[11px] font-medium transition ${tab.matches(pathname, search) ? "border-[#89934e] text-[#45482f]" : "border-transparent text-[#85857b] hover:text-[#45453c]"}`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  )
}
