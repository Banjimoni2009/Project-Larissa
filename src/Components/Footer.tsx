import { Link } from "react-router-dom";
import FooterImage from "../assets/images/Home Image/Image Container (4).png";
import Logo from "../assets/images/Home Image/Vector.png";

const linkGroups = [
  { title: "Company", links: ["About us", "Careers", "Press & Media", "Opportunity"] },
  { title: "Services", links: ["Property listings", "Progress tracking", "Virtual tours", "Consultation"] },
  { title: "Resources", links: ["Blog & articles", "FAQs", "Guides & Tutorials", "Help Center"] },
  { title: "Legal", links: ["Privacy Policy", "Terms & Conditions", "Cookie policy", "Disclaimer"] },
];

export default function Footer() {
  return (
    <footer className="text-white">
      {/* ================= BLACK PART: call to action ================= */}
      <section className="bg-[#111111]">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between md:px-10 md:py-16">
          {/* Left: heading + buttons */}
          <div className="flex max-w-md flex-col gap-6">
            <p className="text-4xl leading-tight font-medium md:text-5xl">
              Create rare moments with your family now
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/tour"
                className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-[#1c1c1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a227]"
              >
                Schedule a tour
              </Link>
              <Link
                to="/properties"
                className="rounded-md bg-[#3a3a3a] px-5 py-3 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a227]"
              >
                View clusters
              </Link>
            </div>
          </div>

          {/* Right: house image inside the striped frame */}
          <div className="flex h-72 w-full items-center justify-center bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,#ffffff1f_8px,#ffffff1f_9px)] md:h-80 md:w-md">
            <img
              src={FooterImage}
              alt="A Serenia home"
              className="h-64 w-48 object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= ASH PART: contact, subscribe, links ================= */}
      <section className="bg-[#262626]">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 md:px-10">
          {/* Top row: logo + contact on the left, subscribe on the right */}
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-2 font-bold">
                <img src={Logo} alt="" className="h-5 w-5" />
                Serenia
              </div>
              <p className="text-sm text-[#bbb]">
                sereniasupport@serenia.com
                <br />
                (+1) 345 - 3345 - 005
              </p>
            </div>

            <div className="flex max-w-md flex-col gap-4 md:w-1/2">
              <p className="text-2xl leading-snug font-medium md:text-3xl">
                Subscribe to get the latest information from us
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-2 sm:flex-row"
              >
                <input
                  type="email"
                  name="email"
                  aria-label="Email address"
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-[#444] bg-[#1b1b1b] px-3 py-2.5 text-sm text-white placeholder:text-[#888] focus-visible:outline-2 focus-visible:outline-[#c9a227]"
                />
                <button
                  type="submit"
                  className="rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-[#1c1c1a]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 border-t border-[#444] pt-8 text-sm md:grid-cols-4">
            {linkGroups.map((group, i) => (
              <div key={`${group.title}-${i}`} className="flex flex-col gap-2">
                <p className="text-xs text-[#888]">{group.title}</p>
                {group.links.map((label) => (
                  <a key={label} href="#" className="text-[#ddd] hover:underline">
                    {label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}