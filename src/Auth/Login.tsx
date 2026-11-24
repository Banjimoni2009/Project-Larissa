import { useState, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, House, loginImage1 as loginCarousel, loginImage2 as loginCarousel2 } from "../imports"
import Carousel, { type CarouselSlide } from "../Components/Carousel"

const slides: CarouselSlide[] = [
  {
    image: loginCarousel,
    title: "Serenia House",
    description: "Every house is built with sincerity and enthusiasm to help families create moments together inside it.",
    alt: "Modern Serenia homes in the evening light",
  },
  {
    image: loginCarousel2,
    title: "A place to belong",
    description: "Thoughtfully designed homes and welcoming communities, made for the moments that matter.",
    alt: "A Serenia home surrounded by landscaped gardens",
  },
]

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")
    if (!email || !password) return
    navigate("/dashboard", { state: { email } })
  }

  return (
    <main className="grid min-h-screen bg-white text-[#171717] lg:grid-cols-2">
      <section aria-label="Serenia homes" className="relative hidden min-h-screen overflow-hidden bg-[#222] lg:block">
        <Link to="/" aria-label="Serenia home" className="absolute left-1/2 top-8 z-10 flex -translate-x-1/2 items-center gap-2 text-white">
          <House size={26} strokeWidth={2.5} />
          <span className="text-xl font-semibold tracking-tight">Serenia</span>
        </Link>
        <Carousel slides={slides} label="Serenia homes" />
      </section>

      <section className="relative flex min-h-screen items-center justify-center px-6 py-24 sm:px-12 lg:px-14 xl:px-20">
        <div className="mx-auto w-full max-w-[360px]">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back!</h1>
          <p className="mt-2 text-sm text-[#686868]">Please log in to manage your properties and clusters</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium">Email address</label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                required
                className="w-full border border-[#dedede] px-3 py-2.5 text-sm outline-none placeholder:text-[#858585] focus:border-[#56593B] focus:ring-2 focus:ring-[#56593B]/15"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-xs font-medium">Password</label>
              <div className="relative">
                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  className="w-full border border-[#dedede] px-3 py-2.5 pr-11 text-sm outline-none placeholder:text-[#858585] focus:border-[#56593B] focus:ring-2 focus:ring-[#56593B]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[#555] transition-transform duration-200 hover:scale-110 hover:text-[#171717] active:scale-95"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full bg-[#56593B] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#45482f] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#56593B]">
              Login now
            </button>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-[#56593B] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </form>
        </div>

        <p className="absolute inset-x-6 bottom-6 mx-auto max-w-[360px] text-center text-xs leading-5 text-[#777]">
          If you don&apos;t have an account, please{" "}
          <a href="mailto:sereniasupport@serenia.com?subject=Account%20access%20request" className="underline underline-offset-2 hover:text-[#56593B]">
            contact
          </a>{" "}
          the system administrator to request access.
        </p>
      </section>
    </main>
  )
}

export default Login
