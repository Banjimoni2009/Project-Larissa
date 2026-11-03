import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./Components/Nav"
import Landing from "./Pages/Landing"
import Properties from "./Pages/Properties"
import Amenities from "./Pages/Amenities"
import Gallery from "./Pages/Gallery"
import Blogs from "./Pages/Blogs"
import ContactUs from "./Pages/ContactUs"
import RequestTour from "./Pages/RequestTour"
import { createContext, useState } from "react"
export const ThemeContext = createContext({});

function App() {
  const [theme, setTheme] = useState(false);

  return (
    <ThemeContext value={{theme,setTheme}}>
      <BrowserRouter >
        <Nav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacts" element={<ContactUs />} />
          <Route path="/tour" element={<RequestTour />} />
        </Routes>
      </BrowserRouter>

    </ThemeContext>

  )
}

export default App