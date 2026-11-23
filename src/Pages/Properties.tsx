import { useMemo, useState } from 'react'
import { ArrowUpRight, Bed, MapPin, Search, TreePine } from 'lucide-react'
import { Link } from 'react-router-dom'
import Dropdown from '../assets/images/Home Image/arrow-down-s-fill.png'
import HandHeart from '../assets/images/Home Image/hand-heart-fill.png'
import LioraImage from '../assets/images/Properties image/Image (10).png'
import NavaImage from '../assets/images/Properties image/Image (8).png'
import ArunaImage from '../assets/images/Properties image/Image (7).png'
import VeloraImage from '../assets/images/Properties image/Image (6).png'
import SerayaImage from '../assets/images/Properties image/Image (4).png'
import Footer from '../Components/Footer'

type Property = {
  name: string
  slug: string
  image: string
  location: string
  badge: string
  description: string
  bedrooms: string
  price: number
  priceLabel: string
}

const properties: Property[] = [
  {
    name: 'Liora estate',
    slug: 'liora-estate',
    image: LioraImage,
    location: 'North',
    badge: 'Elegant living, redefined',
    description: 'Premium cluster with modern architecture, a private clubhouse, and 24/7 security — offering both style and peace of mind for residents.',
    bedrooms: '3-5 Bedroom options',
    price: 120000,
    priceLabel: '$120,000',
  },
  {
    name: 'Nava heights',
    slug: 'nava-heights',
    image: NavaImage,
    location: 'West',
    badge: 'Nature meets lifestyle',
    description: 'Designed for eco-living with wide open spaces, scenic landscaping, and elevated views that bring nature closer to home.',
    bedrooms: '2-4 Bedroom options',
    price: 98000,
    priceLabel: '$98,000',
  },
  {
    name: 'Aruna residence',
    slug: 'aruna-residence',
    image: ArunaImage,
    location: 'Central',
    badge: 'The modern comfort',
    description: 'Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive.',
    bedrooms: '2-4 Bedroom options',
    price: 85000,
    priceLabel: '$85,000',
  },
  {
    name: 'Velora park',
    slug: 'velora-park',
    image: VeloraImage,
    location: 'East',
    badge: 'Dynamic living, urban vibe',
    description: 'Contemporary cluster with stylish facades, pocket parks, and direct access to shopping and dining hubs.',
    bedrooms: '2-3 Bedroom options',
    price: 105000,
    priceLabel: '$105,000',
  },
  {
    name: 'Seraya grove',
    slug: 'seraya-grove',
    image: SerayaImage,
    location: 'South',
    badge: 'Living with natural touch',
    description: 'A vibrant cluster blending modern housing with lush greenery, close to schools and community spaces.',
    bedrooms: '3-4 Bedroom options',
    price: 95000,
    priceLabel: '$95,000',
  },
]

function Properties() {
  const [location, setLocation] = useState('All location')
  const [price, setPrice] = useState('All price')
  const [search, setSearch] = useState('')

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesLocation = location === 'All location' || property.location === location
      const matchesPrice =
        price === 'All price' ||
        (price === 'Under $100k' && property.price < 100000) ||
        (price === '$100k and above' && property.price >= 100000)
      const matchesSearch = property.name.toLowerCase().includes(search.trim().toLowerCase())
      return matchesLocation && matchesPrice && matchesSearch
    })
  }, [location, price, search])

  return (
    <div className='bg-[#f0f0f0]'>
      {/* Page introduction: presents the properties page heading and short description. */}
      <header className='bg-white px-5 py-12 text-center shadow-sm md:py-16'>
        <h1 className='mx-auto max-w-xl text-4xl leading-tight font-medium text-[#171717] md:text-6xl'>
          Every community<br />have their unique
        </h1>
        <p className='mx-auto mt-5 max-w-md text-xs leading-5 text-[#555] md:text-sm'>
          Explore thoughtfully designed residences that combine comfort, style, and a sense of belonging.
        </p>
      </header>

      {/* Main content: contains the property filters and responsive property-card list. */}
      <main className='mx-auto max-w-6xl px-4 py-8 md:px-10 md:py-10'>
        {/* Filter controls: allows users to filter properties by location, price, or name. */}
        <div className='mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
          {/* Location and price dropdown filters. */}
          <div className='flex flex-wrap gap-3'>
            <label className='flex items-center gap-1 bg-white px-3 py-2 text-xs shadow-sm'>
              <span className='text-[#777]'>Location:</span>
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className='appearance-none bg-transparent pr-5 text-sm outline-none'
                aria-label='Filter by location'
              >
                {['All location', 'North', 'West', 'Central', 'East', 'South'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <img src={Dropdown} alt='' className='-ml-5 h-4 w-4 pointer-events-none' />
            </label>

            <label className='flex items-center gap-1 bg-white px-3 py-2 text-xs shadow-sm'>
              <span className='text-[#777]'>Price:</span>
              <select
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                className='appearance-none bg-transparent pr-5 text-sm outline-none'
                aria-label='Filter by price'
              >
                {['All price', 'Under $100k', '$100k and above'].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <img src={Dropdown} alt='' className='-ml-5 h-4 w-4 pointer-events-none' />
            </label>
          </div>

          {/* Search input: filters the displayed cards by cluster name. */}
          <label className='flex items-center gap-2 bg-white px-3 py-2 text-[#777] shadow-sm'>
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              type='search'
              placeholder='Search cluster name'
              className='w-full text-sm outline-none placeholder:text-[#777] md:w-52'
            />
          </label>
        </div>

        {/* Property list: maps the property data into individual responsive cards. */}
        <div className='space-y-4'>
          {filteredProperties.map((property) => (
            // Each article represents one property and separates the image from its details.
            <article
              key={property.name}
              className='grid  bg-white shadow-sm md:h-105 md:grid-cols-2 md:p-2'
            >
              {/* Property image: preserves the full image within a responsive card area. */}
              <img
                src={property.image}
                alt={`${property.name} homes`}
                className='aspect-square w-full bg-white md:aspect-auto md:h-full md:min-h-0'
              />

              {/* Property details: contains the badge, name, description, facilities, and price. */}
              <div className='flex min-h-72 flex-col px-5 py-5 md:min-h-0 md:px-7 md:py-5'>
                {/* Information section: displays the cluster identity and main description. */}
                <div>
                  <div className='mb-2 flex w-fit items-center gap-1.5 bg-[#fff8ea] px-2 py-1 text-[10px] font-semibold text-[#926100]'>
                    <img src={HandHeart} alt='' className='h-3 w-3' />
                    {property.badge}
                  </div>
                  <h2 className='text-2xl font-medium text-[#171717]'>{property.name}</h2>
                  <p className='mt-2 max-w-md text-xs leading-4 text-[#555]'>{property.description}</p>
                </div>

                {/* Facilities section: lists bedroom, lifestyle, and access information. */}
                <div className='mt-4 space-y-1.5 text-[11px] text-[#555] md:mt-auto md:pt-3'>
                  <p className='flex items-center gap-2'><Bed size={14} />{property.bedrooms}</p>
                  <p className='flex items-center gap-2'><TreePine size={14} />Family-friendly facilities</p>
                  <p className='flex items-center gap-2'><MapPin size={14} />Easy access to main boulevard</p>
                </div>

                {/* Price footer: keeps the starting price and Discover button at the bottom of the card. */}
                <div className='mt-5 flex items-end justify-between border-t border-[#ececec] pt-3 md:mt-3'>
                  <div>
                    <p className='text-[10px] text-[#777]'>Starts from</p>
                    <p className='text-lg font-bold text-[#171717]'>{property.priceLabel}</p>
                  </div>
                  <Link
                    to={`/properties/${property.slug}`}
                    className='flex items-center gap-1.5 rounded-sm bg-[#eeeeec] px-3 py-2 text-xs font-semibold text-[#333] transition hover:bg-[#ddd]'
                  >
                    Discover <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {filteredProperties.length === 0 && (
            <div className='bg-white px-5 py-16 text-center text-sm text-[#777]'>
              No properties match your filters.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Properties
