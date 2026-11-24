import { useState } from "react"
import { ArrowUpRight, CalendarDays, Clock3, galleryImage10, galleryImage14, galleryImage7 } from "../imports"
import Footer from "../Components/Footer"

const articles = [
  { category: "Home & Living", title: "A thoughtful home begins with the details", date: "June 18, 2024", readTime: "5 min read", image: galleryImage10, summary: "Discover how natural light, considered materials, and flexible spaces can make everyday living feel more at ease." },
  { category: "Community", title: "Growing together in a connected neighborhood", date: "June 10, 2024", readTime: "4 min read", image: galleryImage7, summary: "A closer look at the shared places and everyday connections that help a community feel like home." },
  { category: "Guides", title: "What to consider when choosing your first home", date: "May 28, 2024", readTime: "6 min read", image: galleryImage14, summary: "From location and layout to future needs, these are the details to keep in mind during your home search." },
]

export default function Blogs() {
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[number] | null>(null)

  return (
    <main className="page-enter bg-white text-[#171717]">
      <section className="bg-[#f3f3ed] px-5 py-16 text-center sm:py-24">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#747952]">Serenia journal</p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl">Ideas for a life well lived.</h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#666]">Thoughtful perspectives on finding a home, creating a community, and making room for the moments that matter.</p>
      </section>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div><p className="text-xs text-[#777]">Stories and guides</p><h2 className="mt-1 text-2xl font-medium">Latest articles</h2></div>
          <span className="hidden text-xs text-[#777] sm:block">Curated by the Serenia team</span>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.title} className="group overflow-hidden border border-[#e8e8e4] bg-white">
              <button type="button" onClick={() => setSelectedArticle(article)} className="block w-full overflow-hidden text-left">
                <img src={article.image} alt="" className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </button>
              <div className="p-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.13em] text-[#747952]">{article.category}</span>
                <h3 className="mt-2 text-lg font-medium leading-6">{article.title}</h3>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#777]">{article.summary}</p>
                <div className="mt-4 flex items-center justify-between border-t border-[#eee] pt-3 text-[10px] text-[#888]">
                  <span className="flex items-center gap-1.5"><CalendarDays size={12} />{article.date}</span>
                  <span className="flex items-center gap-1.5"><Clock3 size={12} />{article.readTime}</span>
                </div>
                <button type="button" onClick={() => setSelectedArticle(article)} className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#56593b] hover:underline">Read article <ArrowUpRight size={14} /></button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
      {selectedArticle ? (
        <div role="presentation" onClick={() => setSelectedArticle(null)} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <article role="dialog" aria-modal="true" aria-labelledby="article-title" onClick={(event) => event.stopPropagation()} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white shadow-2xl">
            <img src={selectedArticle.image} alt="" className="h-64 w-full object-cover" />
            <div className="p-6 sm:p-8">
              <button type="button" onClick={() => setSelectedArticle(null)} className="float-right text-xs text-[#777] hover:text-black">Close</button>
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#747952]">{selectedArticle.category}</p>
              <h2 id="article-title" className="mt-2 max-w-xl text-2xl font-medium">{selectedArticle.title}</h2>
              <p className="mt-3 text-xs text-[#888]">{selectedArticle.date} · {selectedArticle.readTime}</p>
              <p className="mt-6 text-sm leading-7 text-[#555]">{selectedArticle.summary} Serenia homes are designed around the way people live: with welcoming shared spaces, thoughtful details, and room to make each day your own.</p>
            </div>
          </article>
        </div>
      ) : null}
    </main>
  )
}
