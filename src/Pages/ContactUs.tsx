import { ContactRound, Mail, Phone } from "lucide-react"
import HeroImage from "../assets/images/Home Image/Hero Image.png"

function ContactUs() {
  return (
    <main className="bg-gray-100">
      {/* Hero image section */}
      <section aria-label="Serenia community">
        <img
          src={HeroImage}
          alt="Serenia residential community"
          className="h-64 w-full object-cover sm:h-80 lg:h-112"
        />
      </section>

      {/* Contact introduction, contact details, and message form */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-2 md:px-8 lg:gap-16 lg:py-16">
        {/* Introduction and contact details */}
        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold text-[#24251D] sm:text-5xl lg:text-6xl">
              Let&apos;s connect with us
            </h1>
            <p className="max-w-xl leading-7 text-gray-600">
              Discover Serenia up close. Whether you want to ask a question or
              schedule a private tour, our team is ready to assist you.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:sereniasupport@serenia.com"
              className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <Mail aria-hidden="true" className="shrink-0 text-[#56593B]" />
              <span>
                <span className="block font-medium text-gray-800">
                  Email address
                </span>
                <span className="break-all text-sm text-gray-600">
                  sereniasupport@serenia.com
                </span>
              </span>
            </a>

            <a
              href="tel:+13453345005"
              className="flex items-center gap-4 rounded-lg bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <Phone aria-hidden="true" className="shrink-0 text-[#56593B]" />
              <span>
                <span className="block font-medium text-gray-800">
                  Phone number
                </span>
                <span className="text-sm text-gray-600">
                  (+1) 345 - 3345 - 005
                </span>
              </span>
            </a>
          </div>
        </div>

        {/* Quick contact form */}
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 p-5">
            <ContactRound aria-hidden="true" className="text-[#56593B]" />
            <h2 className="text-xl font-semibold text-gray-800">
              Quick contact
            </h2>
          </div>

          <form className="space-y-5 p-5 sm:p-7">
            <div>
              <label
                htmlFor="fullname"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                className="w-full rounded border border-gray-300 px-3 py-2.5 outline-none focus:border-[#56593B] focus:ring-2 focus:ring-[#56593B]/20"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className="w-full rounded border border-gray-300 px-3 py-2.5 outline-none focus:border-[#56593B] focus:ring-2 focus:ring-[#56593B]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Enter your number"
                  className="w-full rounded border border-gray-300 px-3 py-2.5 outline-none focus:border-[#56593B] focus:ring-2 focus:ring-[#56593B]/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message"className="mb-2 block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full resize-y rounded border border-gray-300 px-3 py-2.5 outline-none focus:border-[#56593B] focus:ring-2 focus:ring-[#56593B]/20"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded bg-[#56593B] px-4 py-3 font-medium text-white transition-colors hover:bg-[#44472f] focus:outline-none focus:ring-2 focus:ring-[#56593B] focus:ring-offset-2"
            >
              Submit
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default ContactUs
