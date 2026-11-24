import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  adminAvatar,
  adminLogoutDoor,
  Bell,
  BookOpenText,
  ChevronDown,
  CircleHelp,
  FileImage,
  House,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Search,
  Settings,
  X,
  homeVector,
} from "../imports"
import AdminDialog from "./AdminDialog"
import DashboardSearchDialog from "./DashboardSearchDialog"

const communities = ["Liora Estate", "Nava Heights", "Aruna Residence", "Velora Park", "Seraya Grove"]

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/properties": "Properties",
  "/dashboard/units": "Unit inventory",
  "/dashboard/requests": "Request list",
  "/dashboard/calendar": "Request list",
}

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [propertiesOpen, setPropertiesOpen] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const pageTitle = pageTitles[location.pathname] ?? "Dashboard"
  const selectedCommunity = new URLSearchParams(location.search).get("community")

  useEffect(() => {
    function openSearch(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "f") {
        event.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener("keydown", openSearch)
    return () => window.removeEventListener("keydown", openSearch)
  }, [])

  function signOut() {
    setLogoutOpen(false)
    navigate("/login")
  }

  function closeNavigation() {
    setMobileNavOpen(false)
  }

  return (
    <div className="min-h-dvh bg-[#f8f8f5] text-[#20201d]">
      {mobileNavOpen ? (
        <button
          type="button"
          onClick={closeNavigation}
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
        />
      ) : null}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[232px] flex-col border-r border-[#e9e9e3] bg-white text-[#34342c] transition-transform duration-200 lg:translate-x-0 ${mobileNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[64px] items-center justify-between border-b border-[#efefe9] px-5">
          <Link to="/" className="flex items-center gap-2.5" aria-label="Serenia home">
            <img src={homeVector} alt="" className="size-6 object-contain" />
            <span className="text-[15px] font-semibold tracking-wide text-[#4f5235]">Serenia</span>
          </Link>
          <button type="button" onClick={closeNavigation} aria-label="Close menu" className="rounded-lg p-2 text-[#77776d] hover:bg-[#f4f4ef] lg:hidden">
            <X size={18} />
          </button>
        </div>

        <div className="px-4 pt-4">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex w-full items-center gap-2 rounded-md border border-[#e8e8e1] bg-[#fbfbf9] px-3 py-2 text-left text-[10px] text-[#909084] hover:border-[#d9dacd]"
          >
            <Search size={14} className="shrink-0" />
            <span className="flex-1">Search anything</span>
            <kbd className="rounded border border-[#e8e8e1] bg-white px-1 py-0.5 text-[8px]">Ctrl F</kbd>
          </button>
        </div>

        <nav aria-label="Dashboard navigation" className="flex-1 overflow-y-auto px-3 py-5">
          <p className="px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#a2a297]">Menu</p>
          <div className="space-y-1">
            <NavLink
              to="/dashboard"
              end
              onClick={closeNavigation}
              className={({ isActive }) => `flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-[11px] transition ${isActive ? "border-[#90994a] bg-[#f5f6ef] font-semibold text-[#56593b]" : "border-transparent text-[#727269] hover:bg-[#f8f8f5] hover:text-[#404036]"}`}
            >
              <LayoutDashboard size={16} strokeWidth={1.8} /><span>Dashboard</span>
            </NavLink>
            <NavLink
              to="/dashboard/requests"
              onClick={closeNavigation}
              className={({ isActive }) => `flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-[11px] transition ${isActive && location.pathname === "/dashboard/requests" ? "border-[#90994a] bg-[#f5f6ef] font-semibold text-[#56593b]" : "border-transparent text-[#727269] hover:bg-[#f8f8f5] hover:text-[#404036]"}`}
            >
              <ListChecks size={16} strokeWidth={1.8} /><span className="flex-1">Request lists</span>
              <span className="rounded-full bg-[#f0f1e7] px-1.5 py-0.5 text-[9px] text-[#666a47]">8</span>
            </NavLink>
            <div>
              <div className="flex items-center">
                <NavLink
                  to="/dashboard/properties"
                  onClick={closeNavigation}
                  className={({ isActive }) => `flex flex-1 items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-[11px] transition ${isActive ? "border-[#90994a] bg-[#f5f6ef] font-semibold text-[#56593b]" : "border-transparent text-[#727269] hover:bg-[#f8f8f5] hover:text-[#404036]"}`}
                >
                  <House size={16} strokeWidth={1.8} /><span>Properties</span>
                </NavLink>
                <button type="button" aria-label={propertiesOpen ? "Collapse properties" : "Expand properties"} aria-expanded={propertiesOpen} onClick={() => setPropertiesOpen((open) => !open)} className="mr-2 rounded p-1.5 text-[#8b8b80] hover:bg-[#f5f5f0]">
                  <ChevronDown size={14} className={`transition-transform ${propertiesOpen ? "" : "-rotate-90"}`} />
                </button>
              </div>
              {propertiesOpen ? (
                <div className="ml-[21px] mt-1 space-y-0.5 border-l border-[#e9e9e3] pl-3">
                  {communities.map((community) => (
                    <Link
                      key={community}
                      to={`/dashboard/properties?community=${encodeURIComponent(community)}`}
                      onClick={closeNavigation}
                      className={`block truncate rounded px-2.5 py-2 text-[10px] transition ${selectedCommunity === community ? "bg-[#f5f6ef] font-medium text-[#56593b]" : "text-[#77776d] hover:bg-[#f8f8f5] hover:text-[#404036]"}`}
                    >
                      {community}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <p className="mt-7 px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#a2a297]">Others</p>
          <div className="space-y-1">
            <Link to="/blogs" onClick={closeNavigation} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[11px] text-[#727269] transition hover:bg-[#f8f8f5] hover:text-[#404036]">
              <BookOpenText size={16} strokeWidth={1.8} />Blogs
            </Link>
            <Link to="/gallery" onClick={closeNavigation} className="flex items-center gap-3 rounded-md px-3 py-2.5 text-[11px] text-[#727269] transition hover:bg-[#f8f8f5] hover:text-[#404036]">
              <FileImage size={16} strokeWidth={1.8} />Gallery
            </Link>
          </div>
          <div className="mt-7">
            <p className="px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#a2a297]">Preferences</p>
            <button type="button" className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[11px] text-[#727269] transition hover:bg-[#f8f8f5] hover:text-[#404036]">
              <Settings size={16} strokeWidth={1.8} />Settings
            </button>
          </div>
        </nav>

        <button type="button" onClick={() => setLogoutOpen(true)} className="mx-4 mb-4 flex items-center gap-2 border-t border-[#ededE7] px-3 pt-4 text-left text-[11px] font-medium text-[#d44337] hover:text-[#b92f26]">
          <LogOut size={15} />Log out
        </button>
      </aside>

      <div className="min-h-dvh lg:pl-[232px]">
        <header className="sticky top-0 z-20 flex h-[64px] items-center justify-between gap-4 border-b border-[#e9e9e3] bg-white/95 px-4 backdrop-blur md:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button type="button" onClick={() => setMobileNavOpen(true)} aria-label="Open dashboard menu" className="rounded-lg p-2 text-[#66665d] hover:bg-[#f5f5f0] lg:hidden">
              <Menu size={18} />
            </button>
            <div className="min-w-0">
              <p className="hidden text-[9px] font-medium text-[#a0a095] sm:block">Serenia</p>
              <h1 className="truncate text-[14px] font-semibold text-[#303027] sm:mt-0.5">{pageTitle}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button type="button" aria-label="Help" className="hidden rounded-md p-2 text-[#77776d] hover:bg-[#f5f5f0] sm:block"><CircleHelp size={16} /></button>
            <button type="button" aria-label="Notifications" className="relative rounded-md p-2 text-[#77776d] hover:bg-[#f5f5f0]">
              <Bell size={16} />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[#9eaa3a] ring-2 ring-white" />
            </button>
            <span className="hidden h-6 border-l border-[#e9e9e3] sm:block" />
            <button type="button" onClick={() => setLogoutOpen(true)} aria-label="Open account actions" className="flex items-center gap-2 rounded-lg text-left">
              <img src={adminAvatar} alt="" className="size-7 rounded-full object-cover" />
              <span className="hidden md:block">
                <span className="block text-[10px] font-medium text-[#333329]">Harrison</span>
                <span className="block text-[9px] text-[#919187]">Administrator</span>
              </span>
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-[1600px] px-4 py-5 md:px-6 md:py-6">
          <Outlet />
        </main>
      </div>

      <DashboardSearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AdminDialog open={logoutOpen} onClose={() => setLogoutOpen(false)} title="Sure you want to log out?" width="max-w-sm">
        <div className="flex flex-col items-center py-1 text-center">
          <img src={adminLogoutDoor} alt="" className="mb-3 h-[72px] w-[72px] object-contain" />
          <p className="max-w-sm text-[12px] leading-5 text-[#77776d]">Are you sure you want to log out?</p>
          <div className="mt-5 flex w-full flex-col gap-2">
            <button type="button" onClick={signOut} className="w-full rounded-sm bg-[#d84034] px-4 py-2 text-[11px] font-semibold text-white hover:bg-[#c2352b]">Yes, log me out</button>
            <button type="button" onClick={() => setLogoutOpen(false)} className="w-full rounded-sm bg-[#f0f0ed] px-4 py-2 text-[11px] font-medium text-[#55554c] hover:bg-[#e6e6e1]">No, keep me here</button>
          </div>
        </div>
      </AdminDialog>
    </div>
  )
}
