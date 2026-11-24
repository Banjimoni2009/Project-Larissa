import { Link } from "react-router-dom"
import { notFoundIllustration } from "../imports"

export default function NotFound() {
  return (
    <main className="page-enter flex min-h-[72vh] flex-col items-center justify-center bg-white px-5 py-14 text-center text-[#171717]">
      <img src={notFoundIllustration} alt="404 - page not found" className="max-h-64 w-full max-w-lg object-contain" />
      <h1 className="mt-6 text-3xl font-medium tracking-tight">This page isn&apos;t here</h1>
      <p className="mt-2 max-w-md text-sm leading-6 text-[#777]">The page may have moved, or the link may be incorrect. Let&apos;s get you back to Serenia.</p>
      <Link to="/" className="mt-6 bg-[#56593B] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#45482f]">Back to home</Link>
    </main>
  )
}
