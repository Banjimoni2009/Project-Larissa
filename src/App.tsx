import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom"
import Nav from "./Components/Nav"
import Landing from "./Pages/Landing"
import Properties from "./Pages/Properties"
import Amenities from "./Pages/Amenities"
import Gallery from "./Pages/Gallery"

import ContactUs from "./Pages/ContactUs"
import RequestTour from "./Pages/RequestTour"
import Aruna from "./Pages/Aruna"
import ArunatypeA from "./Pages/ArunatypeA"
import Login from "./Auth/Login"
import ForgotPW from "./Auth/ForgotPW"
import PasswordReset from "./Auth/ResetPW"
import PasswordUpdated from "./Auth/Updated"
import Blogs from "./Pages/Blogs"
import NotFound from "./Pages/NotFound"
import GroundFloor from "./Pages/GroundFloor"
import DashboardLayout from "./Admin/DashboardLayout"
import DashboardHome from "./Admin/DashboardHome"
import PropertiesPage from "./Admin/PropertiesPage"
import UnitsPage from "./Admin/UnitsPage"
import RequestsPage from "./Admin/RequestsPage"
import CalendarPage from "./Admin/CalendarPage"

function PropertiesLayout() {
  return <Outlet />
}

function AppRoutes() {
  const location = useLocation()
  const backgroundLocation = (location.state as { backgroundLocation?: typeof location } | null)?.backgroundLocation
  const isAuthPage = ["/login", "/forgot-password", "/reset-password", "/password-updated"].includes(location.pathname)
  const isDashboardPage = location.pathname.startsWith("/dashboard")
  const isFloorPlan = location.pathname.endsWith("/ground-floor")

  return (
    <>
      {!isAuthPage && !isDashboardPage && !isFloorPlan && <Nav />}
      <Routes location={backgroundLocation || location}>

        <Route path="/" element={<Landing />} />
        <Route path="/properties" element={<PropertiesLayout />}>
          <Route index element={<Properties />} />
          <Route path="aruna" element={<Aruna />} />
          <Route path="aruna/type-a" element={<ArunatypeA />} />
          <Route path="aruna/type-a/ground-floor" element={<GroundFloor />} />
        </Route>

        <Route path="/amenities" element={<Amenities />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contacts" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPW />} />
        <Route path="/reset-password" element={<PasswordReset />} />
        <Route path="/password-updated" element={<PasswordUpdated />} />
        {/* Dashboard children share their layout. */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="units" element={<UnitsPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
        {!backgroundLocation && <Route path="/tour" element={<RequestTour />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route path="/tour" element={<RequestTour />} />
        </Routes>
      )}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App