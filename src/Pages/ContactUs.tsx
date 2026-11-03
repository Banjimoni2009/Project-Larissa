// import { useContext } from "react"
// import { MyContext } from "../App"
import { useContext, type Dispatch, type SetStateAction } from "react"
import { ThemeContext } from "../App"
import { Moon, Sun } from "lucide-react"

type ThemeContextValue = {
  theme: boolean
  setTheme: Dispatch<SetStateAction<boolean>>
}

function ContactUs() {
  // const projectName = useContext(MyContext)
  const appTheme = useContext(ThemeContext) as ThemeContextValue
  setTimeout(()=>{
         console.log('the theme is',appTheme.theme)
  },5000)

  return (
    <div>ContactUs
      {/* <p>controlled input for {}</p> */}
      <p className={`${appTheme.theme && 'text-red-400'}text-blue-500`}>the theme</p>
      <button onClick={()=> appTheme.setTheme(!appTheme.theme)}>
        {appTheme.theme ? <Sun/>:<Moon/>}
      </button>
    </div>
  )
}

export default ContactUs
