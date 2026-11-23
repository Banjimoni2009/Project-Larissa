  
import { useState } from 'react'
import {
  Bath,
  BedDouble,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Copy,
  House,
  MapPin,
  MoreVertical,
  Play,
  Ruler,
  Share2,
  X,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../../Components/Footer'
import ArunaImage from '../../assets/images/Properties image/Image (7).png'
import LioraImage from '../../assets/images/Properties image/Image (10).png'
import NavaImage from '../../assets/images/Properties image/Image (8).png'
import VeloraImage from '../../assets/images/Properties image/Image (6).png'
import SerayaImage from '../../assets/images/Properties image/Image (4).png'
import BedroomImage from '../../assets/images/Home Image/Rectangle 109 (5).png'
import BathroomImage from '../../assets/images/Home Image/Rectangle 109.png'
import LivingRoomImage from '../../assets/images/Home Image/Rectangle 109 (2).png'
import KitchenImage from '../../assets/images/Gallery images/Image (4).png'
import KitchenImageTwo from '../../assets/images/Gallery images/Image (17).png'
import BedroomImageTwo from '../../assets/images/Gallery images/Image (7).png'
import OutdoorImage from '../../assets/images/Amenities Image/Image (4).png'
import PoolImage from '../../assets/images/Amenities Image/Image (3).png'

type DetailProperty = {
  name: string
  slug: string
  location: string
  price: string
  heroImages: string[]
}

const properties: Record<string, DetailProperty> = {
  'aruna-residence': {
    name: 'Aruna residence',
    slug: 'aruna-residence',
    location: 'Central',
    price: '$135,000',
    heroImages: [ArunaImage, LioraImage, NavaImage, VeloraImage, SerayaImage],
  },
  'liora-estate': {
    name: 'Liora estate',
    slug: 'liora-estate',
    location: 'North',
    price: '$120,000',
    heroImages: [LioraImage, ArunaImage, NavaImage, VeloraImage, SerayaImage],
  },
  'nava-heights': {
    name: 'Nava heights',
    slug: 'nava-heights',
    location: 'West',
    price: '$98,000',
    heroImages: [NavaImage, ArunaImage, LioraImage, VeloraImage, SerayaImage],
  },
  'velora-park': {
    name: 'Velora park',
    slug: 'velora-park',
    location: 'East',
    price: '$105,000',
    heroImages: [VeloraImage, ArunaImage, LioraImage, NavaImage, SerayaImage],
  },
  'seraya-grove': {
    name: 'Seraya grove',
    slug: 'seraya-grove',
    location: 'South',
    price: '$95,000',
    heroImages: [SerayaImage, ArunaImage, LioraImage, NavaImage, VeloraImage],
  },
}

const galleryPhotos = [
  { src: ArunaImage, category: 'Outside', alt: 'Aruna residence exterior' },
  { src: LioraImage, category: 'Outside', alt: 'Contemporary home exterior' },
  { src: BedroomImage, category: 'Bedroom', alt: 'Serene bedroom interior' },
  { src: BedroomImageTwo, category: 'Bedroom', alt: 'Bright bedroom with a garden view' },
  { src: BathroomImage, category: 'Bathroom', alt: 'Modern bathroom vanity' },
  { src: KitchenImage, category: 'Kitchen', alt: 'Modern kitchen counters' },
  { src: KitchenImageTwo, category: 'Kitchen', alt: 'Warm contemporary kitchen' },
  { src: OutdoorImage, category: 'Backyard', alt: 'Landscaped community park' },
  { src: PoolImage, category: 'Backyard', alt: 'Community swimming pool' },
  { src: LivingRoomImage, category: 'Family room', alt: 'Family room with a garden view' },
]

const galleryCategories = ['Outside', 'Bedroom', 'Bathroom', 'Kitchen', 'Backyard', 'Family room']

const specificationSections = [
  {
    title: 'Interior Features',
    items: [
      ['Flooring', 'Polished 60×60 cm granite tiles throughout living and dining areas'],
      ['Lighting', 'LED fixtures with dimmable switches in living room and bedrooms'],
      ['Appliances', 'Induction built-in electric stove, range hood, and sink in an open-concept kitchen'],
      ['Design Details', 'Warm neutral palette, large corner windows for generous natural light'],
      ['Smart Elements', 'Wi-Fi enabled smart lighting control and keyless smart door lock system'],
    ],
  },
  {
    title: 'Property & Layout',
    items: [
      ['Bedrooms', 'Three comfortable bedrooms across two floors'],
      ['Bathrooms', 'Two bathrooms with modern fixtures'],
      ['Living spaces', 'Open-plan living, dining, and kitchen areas'],
    ],
  },
  {
    title: 'Construction & Materials',
    items: [
      ['Structure', 'Reinforced concrete frame'],
      ['Windows', 'Powder-coated aluminum frames with clear glazing'],
      ['Finishes', 'Durable, low-maintenance interior and exterior finishes'],
    ],
  },
  {
    title: 'Utilities & Green Energy',
    items: [
      ['Water', 'Individual water meter and efficient fixtures'],
      ['Energy', 'LED lighting and energy-efficient appliances'],
      ['Connectivity', 'Fiber-ready internet connection'],
    ],
  },
  {
    title: 'Community & Amenities',
    items: [
      ['Security', 'Gated community with 24-hour security'],
      ['Outdoor spaces', 'Landscaped parks and walking paths'],
      ['Family facilities', 'Community spaces and children’s play areas'],
    ],
  },
]

const nearbyPlaces = [
  { name: 'Greenfield International School', distance: '2.1 km · 5 min drive', icon: 'school' },
  { name: 'Selhurst Mall & Lifestyle Center', distance: '3.4 km · 10 min drive', icon: 'shopping' },
  { name: 'Royal Care Hospital', distance: '4.6 km · 12 min drive', icon: 'health' },
  { name: 'Selhurst Central Station', distance: '2.7 km · 7 min drive', icon: 'transit' },
]

type FloorPlanProps = {
  floor: 'Ground floor' | 'Upper floor'
}

function FloorPlan({ floor }: FloorPlanProps) {
  const rooms = floor === 'Ground floor'
    ? [
      { x: 18, y: 20, width: 170, height: 145, name: 'Living room', number: 4 },
      { x: 188, y: 20, width: 118, height: 90, name: 'Kitchen', number: 2 },
      { x: 188, y: 110, width: 118, height: 95, name: 'Dining', number: 5 },
      { x: 18, y: 165, width: 170, height: 92, name: 'Bedroom', number: 1 },
      { x: 306, y: 20, width: 92, height: 92, name: 'Bath', number: 3 },
      { x: 306, y: 112, width: 92, height: 145, name: 'Entry', number: 6 },
    ]
    : [
      { x: 18, y: 20, width: 170, height: 135, name: 'Bedroom 1', number: 1 },
      { x: 188, y: 20, width: 118, height: 95, name: 'Bedroom 2', number: 2 },
      { x: 306, y: 20, width: 92, height: 95, name: 'Bath', number: 3 },
      { x: 188, y: 115, width: 210, height: 90, name: 'Landing', number: 4 },
      { x: 18, y: 155, width: 170, height: 102, name: 'Bedroom 3', number: 5 },
      { x: 188, y: 205, width: 210, height: 52, name: 'Balcony', number: 6 },
    ]

  return (
    <svg
      viewBox='0 0 416 277'
      role='img'
      aria-label={`${floor} layout`}
      className='h-full w-full'
    >
      <rect x='9' y='11' width='398' height='255' rx='4' fill='#f4f1e9' />
      {rooms.map((room) => (
        <g key={room.name}>
          <rect
            x={room.x}
            y={room.y}
            width={room.width}
            height={room.height}
            fill={room.number % 2 === 0 ? '#eee8db' : '#f8f6f0'}
            stroke='#8c8b7c'
            strokeWidth='3'
          />
          <circle cx={room.x + 18} cy={room.y + 18} r='11' fill='#626446' />
          <text x={room.x + 18} y={room.y + 22} textAnchor='middle' fontSize='10' fill='#fff'>
            {room.number}
          </text>
          <text
            x={room.x + room.width / 2}
            y={room.y + room.height / 2 + 4}
            textAnchor='middle'
            fontSize='11'
            fill='#56564d'
          >
            {room.name}
          </text>
        </g>
      ))}
    </svg>
  )
}

function LocationMap() {
  return (
    <svg viewBox='0 0 440 280' role='img' aria-label='Map of the Aruna residence neighborhood' className='h-full w-full'>
      <rect width='440' height='280' fill='#f0f1ec' />
      <path d='M-10 48 124 105 170 77 251 126 450 78' fill='none' stroke='#dbe7d4' strokeWidth='38' />
      <path d='M-15 232 84 182 154 214 257 170 456 212' fill='none' stroke='#d8e9eb' strokeWidth='30' />
      <path d='M50 -10 102 66 83 126 132 185 108 290M285 -10 265 52 307 113 285 165 330 290M-10 145 100 130 170 151 245 116 458 137' fill='none' stroke='#fff' strokeWidth='19' />
      <path d='M50 -10 102 66 83 126 132 185 108 290M285 -10 265 52 307 113 285 165 330 290M-10 145 100 130 170 151 245 116 458 137' fill='none' stroke='#d5d4cb' strokeWidth='2' />
      <path d='M-10 48 124 105 170 77 251 126 450 78M-15 232 84 182 154 214 257 170 456 212' fill='none' stroke='#fff' strokeWidth='3' />
      <rect x='15' y='20' width='50' height='34' rx='4' fill='#dbe8d6' />
      <rect x='360' y='146' width='55' height='40' rx='4' fill='#dbe8d6' />
      <circle cx='218' cy='142' r='19' fill='#626446' />
      <path d='M218 132a7 7 0 0 0-7 7c0 5 7 12 7 12s7-7 7-12a7 7 0 0 0-7-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z' fill='#fff' />
      <text x='234' y='165' fontSize='10' fill='#424438'>Aruna residence</text>
      <circle cx='110' cy='82' r='7' fill='#fff' stroke='#72745a' strokeWidth='2' />
      <circle cx='335' cy='93' r='7' fill='#fff' stroke='#72745a' strokeWidth='2' />
      <circle cx='143' cy='229' r='7' fill='#fff' stroke='#72745a' strokeWidth='2' />
    </svg>
  )
}

function PropertyDetails() {
  const { slug = 'aruna-residence' } = useParams()
  const property = properties[slug]
  const [heroImageIndex, setHeroImageIndex] = useState(0)
  const [galleryCategory, setGalleryCategory] = useState('Bedroom')
  const [selectedGallerySrc, setSelectedGallerySrc] = useState('')
  const [openSpecification, setOpenSpecification] = useState('Interior Features')
  const [floor, setFloor] = useState<FloorPlanProps['floor']>('Ground floor')
  const [shareOpen, setShareOpen] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  if (!property) {
    return (
      <main className='grid min-h-[60vh] place-content-center gap-4 bg-[#f7f7f5] px-5 text-center'>
        <h1 className='text-2xl font-medium'>Property not found</h1>
        <Link to='/properties' className='text-sm text-[#626446] underline underline-offset-4'>
          Return to all clusters
        </Link>
      </main>
    )
  }

  const currentGallery = galleryPhotos.filter((photo) => photo.category === galleryCategory)
  const activeGalleryPhoto =
    currentGallery.find((photo) => photo.src === selectedGallerySrc) ?? currentGallery[0]
  const heroImage = property.heroImages[heroImageIndex] ?? property.heroImages[0]

  async function copyPageLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setShareMessage('Link copied')
    } catch {
      setShareMessage('Copy was unavailable. Copy the page address from your browser.')
    }
  }

  function chooseGalleryCategory(category: string) {
    setGalleryCategory(category)
    setSelectedGallerySrc('')
  }

  return (
    <div className='bg-[#f7f7f5] text-[#20211c]'>
      {/* Breadcrumbs and page actions */}
      <div className='mx-auto flex max-w-375 items-center justify-between gap-3 px-4 py-3 md:px-10'>
        <div className='flex min-w-0 items-center gap-2 overflow-hidden text-[11px] text-[#777]'>
          <Link to='/properties' className='shrink-0 hover:text-[#56593b]'>All clusters</Link>
          <ChevronRight size={13} className='shrink-0' />
          <span className='truncate'>{property.name}</span>
          <ChevronRight size={13} className='shrink-0' />
          <span className='shrink-0 rounded-full bg-[#ecece4] px-2 py-1 text-[10px] text-[#55563f]'>Type A</span>
        </div>

        <div className='relative flex shrink-0 items-center gap-2'>
          <button
            type='button'
            onClick={() => {
              setShareOpen((open) => !open)
              setShareMessage('')
            }}
            aria-expanded={shareOpen}
            className='flex items-center gap-2 border border-[#e7e7e3] bg-white px-3 py-2 text-xs hover:bg-[#f4f4f1]'
          >
            <Share2 size={14} /> Share
          </button>
          <button
            type='button'
            onClick={() => setShareOpen((open) => !open)}
            aria-label='More property actions'
            aria-expanded={shareOpen}
            className='border border-[#e7e7e3] bg-white p-2 hover:bg-[#f4f4f1]'
          >
            <MoreVertical size={15} />
          </button>
          {shareOpen && (
            <div className='absolute right-0 top-full z-20 mt-2 w-52 border border-[#e7e7e3] bg-white p-2 shadow-lg'>
              <button
                type='button'
                onClick={copyPageLink}
                className='flex w-full items-center gap-2 px-2 py-2 text-left text-xs hover:bg-[#f5f5f2]'
              >
                {shareMessage === 'Link copied' ? <Check size={14} /> : <Copy size={14} />}
                Copy property link
              </button>
              {shareMessage && <p role='status' className='px-2 py-1 text-[10px] text-[#626446]'>{shareMessage}</p>}
            </div>
          )}
        </div>
      </div>

      {/* Large exterior image with selectable property photos */}
      <section className='mx-auto max-w-375 px-2 md:px-4'>
        <div className='relative h-65 overflow-hidden bg-[#e6e5df] sm:h-90 lg:h-130'>
          <img src={heroImage} alt={`${property.name} Type A exterior`} className='h-full w-full object-cover' />
          <div className='absolute inset-x-0 bottom-0 flex items-end justify-center bg-linear-to-t from-black/60 to-transparent px-4 pb-5 pt-16'>
            <div className='flex max-w-full items-center gap-1 overflow-x-auto rounded-sm border border-white/40 bg-black/30 p-1.5 backdrop-blur-sm'>
              {property.heroImages.map((image, index) => (
                <button
                  key={image}
                  type='button'
                  onClick={() => setHeroImageIndex(index)}
                  aria-label={`Show property photo ${index + 1}`}
                  aria-pressed={heroImageIndex === index}
                  className={`h-12 w-14 shrink-0 overflow-hidden border-2 sm:h-16 sm:w-20 ${
                    heroImageIndex === index ? 'border-white' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={image} alt='' className='h-full w-full object-cover' />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property overview and payment sidebar */}
      <main className='mx-auto grid max-w-375 grid-cols-1 gap-3 px-2 py-3 md:px-4 lg:grid-cols-[minmax(0,2fr)_minmax(280px,0.86fr)]'>
        <div className='min-w-0 space-y-3'>
          <section className='bg-white p-4 md:p-6'>
            <div className='flex flex-wrap items-start justify-between gap-3'>
              <div>
                <h1 className='text-2xl font-semibold tracking-tight md:text-3xl'>{property.name} - Type A</h1>
                <p className='mt-1 text-xs text-[#777]'>
                  Serenia Residences, Harmony Street No. 12, Selhurst, London, England
                </p>
              </div>
              <Link
                to='/tour'
                className='flex items-center gap-2 bg-[#f3f3f0] px-3 py-2 text-[11px] font-medium hover:bg-[#e9e9e3]'
              >
                12 unit available <ChevronRight size={14} />
              </Link>
            </div>

            <div className='mt-5 grid grid-cols-2 border-l border-t border-[#ecece8] sm:grid-cols-3'>
              {[
                { title: 'Land & building size', value: '6 × 15 m', icon: <Ruler size={15} /> },
                { title: 'House style', value: 'Modern minimalist', icon: <House size={15} /> },
                { title: 'Total floor', value: 'Double floor', icon: <House size={15} /> },
                { title: 'Bedrooms', value: '3 bedrooms', icon: <BedDouble size={15} /> },
                { title: 'Bathrooms', value: '2 bathrooms', icon: <Bath size={15} /> },
                { title: 'Cluster', value: property.name, icon: <MapPin size={15} /> },
              ].map((fact) => (
                <div key={fact.title} className='flex min-h-16.5 items-center gap-3 border-b border-r border-[#ecece8] px-3 py-2.5'>
                  <span className='text-[#626446]'>{fact.icon}</span>
                  <div>
                    <p className='text-[10px] text-[#777]'>{fact.title}</p>
                    <p className='mt-1 text-xs font-medium'>{fact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className='bg-white p-4 md:p-6'>
            <h2 className='text-sm font-semibold'>About properties</h2>
            <p className='mt-3 text-[11px] leading-5 text-[#666]'>
              {property.name} offers modern residences designed for comfortable everyday living. Thoughtful layouts bring
              natural light into open living spaces, while quality finishes and practical storage make each home easy to
              enjoy. The residence is part of a welcoming neighborhood, close to schools, shopping, parks, and convenient
              transport connections. Designed with families in mind, each home balances privacy, comfort, and access to
              community amenities. <a href='#specifications' className='font-semibold text-[#626446] underline underline-offset-2'>Read more</a>
            </p>
          </section>

          {/* Neighborhood map and nearby destinations */}
          <section className='bg-white p-4 md:p-6'>
            <h2 className='text-sm font-semibold'>Locations</h2>
            <div className='mt-3 grid gap-3 sm:grid-cols-2'>
              <div className='h-52 overflow-hidden border border-[#ecece8] sm:h-60'>
                <LocationMap />
              </div>
              <div className='border border-[#ecece8] px-3'>
                <h3 className='py-3 text-xs font-semibold'>This residence is near with:</h3>
                {nearbyPlaces.map((place) => (
                  <div key={place.name} className='flex items-center justify-between gap-3 border-t border-dashed border-[#e9e9e5] py-3'>
                    <div className='min-w-0'>
                      <p className='truncate text-[11px] font-medium'>{place.name}</p>
                      <p className='mt-1 text-[10px] text-[#888]'>{place.distance}</p>
                    </div>
                    <MapPin size={14} className='shrink-0 text-[#777]' />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Image gallery with category filters */}
          <section className='bg-white p-4 md:p-6'>
            <h2 className='text-sm font-semibold'>Gallery</h2>
            <div className='mt-3 flex overflow-x-auto border-b border-[#e9e9e5]'>
              {galleryCategories.map((category) => (
                <button
                  key={category}
                  type='button'
                  onClick={() => chooseGalleryCategory(category)}
                  className={`shrink-0 px-4 py-2.5 text-[10px] ${
                    galleryCategory === category
                      ? 'border-b-2 border-[#626446] font-semibold text-[#4c4e35]'
                      : 'text-[#777] hover:text-[#333]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className='mt-3 grid h-62.5 grid-cols-[minmax(0,1fr)_88px] gap-2 sm:h-90 sm:grid-cols-[minmax(0,1fr)_120px]'>
              {activeGalleryPhoto ? (
                <img src={activeGalleryPhoto.src} alt={activeGalleryPhoto.alt} className='h-full w-full object-cover' />
              ) : (
                <div className='grid place-content-center bg-[#f1f1ed] text-xs text-[#777]'>No photos in this gallery yet.</div>
              )}
              <div className='flex min-h-0 flex-col gap-2 overflow-y-auto'>
                {currentGallery.map((photo) => (
                  <button
                    key={photo.src}
                    type='button'
                    onClick={() => setSelectedGallerySrc(photo.src)}
                    aria-label={`View ${photo.alt}`}
                    aria-pressed={activeGalleryPhoto?.src === photo.src}
                    className={`min-h-0 flex-1 overflow-hidden border-2 ${
                      activeGalleryPhoto?.src === photo.src ? 'border-[#626446]' : 'border-transparent'
                    }`}
                  >
                    <img src={photo.src} alt='' className='h-full w-full object-cover' />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Expandable specifications */}
          <section id='specifications' className='bg-white p-4 md:p-6'>
            <h2 className='mb-3 text-sm font-semibold'>Full specifications</h2>
            <div className='space-y-2'>
              {specificationSections.map((section) => {
                const isOpen = openSpecification === section.title
                return (
                  <div key={section.title} className='border border-[#e8e8e4]'>
                    <button
                      type='button'
                      onClick={() => setOpenSpecification(isOpen ? '' : section.title)}
                      aria-expanded={isOpen}
                      className='flex w-full items-center justify-between px-3 py-3 text-left text-xs font-medium hover:bg-[#fafaf8]'
                    >
                      {section.title}
                      <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <dl className='space-y-2 border-t border-[#e8e8e4] px-3 py-3'>
                        {section.items.map(([label, value]) => (
                          <div key={label} className='grid grid-cols-[100px_1fr] gap-2 text-[10px] leading-4 sm:grid-cols-[130px_1fr]'>
                            <dt className='text-[#777]'>{label}</dt>
                            <dd className='text-[#45453f]'>• {value}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* Floor plan selector and room guide */}
          <section className='bg-white p-4 md:p-6'>
            <h2 className='text-sm font-semibold'>Floor plan</h2>
            <div className='mt-3 grid gap-4 lg:grid-cols-2'>
              <div>
                <div className='mb-2 flex bg-[#f2f2ef] p-1'>
                  {(['Ground floor', 'Upper floor'] as const).map((level) => (
                    <button
                      key={level}
                      type='button'
                      onClick={() => setFloor(level)}
                      aria-pressed={floor === level}
                      className={`flex-1 px-2 py-2 text-[10px] ${
                        floor === level ? 'bg-white font-semibold shadow-sm' : 'text-[#777]'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <div className='h-64 bg-[#faf9f6] p-2'>
                  <FloorPlan floor={floor} />
                </div>
              </div>
              <ol className='divide-y divide-dashed divide-[#e6e6e2] border border-[#ecece8] px-3'>
                {[
                  ['Bedroom', 'Private and bright sleeping space for rest'],
                  ['Kitchen', 'Functional modern kitchen for cooking'],
                  ['Family room', 'Spacious living area for gathering'],
                  ['Dining area', 'Cozy dining spot for meals'],
                  ['Sliding door', 'Wide access to fresh air and light'],
                  ['Balcony', 'Relaxing outdoor corner with a view'],
                ].map(([title, detail], index) => (
                  <li key={title} className='flex items-start gap-3 py-3'>
                    <span className='grid h-6 w-6 shrink-0 place-content-center rounded-full bg-[#f1f1ee] text-[10px] text-[#68694f]'>
                      {index + 1}
                    </span>
                    <div>
                      <p className='text-[11px] font-medium'>{title}</p>
                      <p className='mt-1 text-[10px] text-[#777]'>{detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>

        {/* Payment information and 3D room preview */}
        <aside className='space-y-3'>
          <section className='bg-white p-4 md:p-5'>
            <h2 className='text-sm font-semibold'>Price &amp; payment</h2>
            <div className='mt-3 border border-[#e9e9e5] p-3'>
              <p className='text-[10px] text-[#777]'>Type A price</p>
              <p className='mt-1 text-2xl font-semibold text-[#626446]'>{property.price}</p>
            </div>
            <dl className='mt-2 divide-y divide-[#ecece8]'>
              {[
                ['Monthly installment', 'From $750 / month'],
                ['Down payment', 'Min. 20%'],
                ['Loan tenure', '10 / 15 / 20 years'],
                ['Interest rate', '5% fixed (first 3 years)'],
                ['Payment methods', 'Bank transfer'],
                ['Additional fees', 'Notary, tax, admin'],
                ['Special offers', 'Free legal fee'],
              ].map(([label, value]) => (
                <div key={label} className='flex items-center justify-between gap-3 py-3 text-[10px]'>
                  <dt className='text-[#777]'>{label}</dt>
                  <dd className='text-right font-medium'>{value}</dd>
                </div>
              ))}
            </dl>
            <Link
              to='/tour'
              className='mt-2 flex w-full items-center justify-center gap-2 bg-[#626446] px-4 py-3 text-xs font-semibold text-white hover:bg-[#50523a]'
            >
              <CalendarDays size={14} /> Schedule a tour
            </Link>
            <a href='#specifications' className='mt-2 block w-full bg-[#f0f0ed] px-4 py-3 text-center text-xs hover:bg-[#e7e7e2]'>
              View more detail
            </a>
          </section>

          <section className='bg-white p-4 md:p-5'>
            <h2 className='text-sm font-semibold'>3D Preview</h2>
            <div className='relative mt-3 h-44 overflow-hidden bg-[#e9e5df]'>
              <img src={LivingRoomImage} alt='Interior preview of a Serenia living room' className='h-full w-full object-cover' />
              <div className='absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/65 via-transparent to-transparent p-3 text-white'>
                <button
                  type='button'
                  onClick={() => setShowPreview(true)}
                  aria-label='Open room preview'
                  className='absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-content-center rounded-full bg-white/90 text-[#626446]'
                >
                  <Play size={18} fill='currentColor' />
                </button>
                <p className='text-xs font-semibold'>Great experience</p>
                <p className='mt-1 text-[10px]'>Explore the living space before you buy.</p>
              </div>
            </div>
            <button
              type='button'
              onClick={() => setShowPreview(true)}
              className='mt-2 w-full bg-[#f0f0ed] px-4 py-3 text-xs hover:bg-[#e7e7e2]'
            >
              Try room preview
            </button>
          </section>
        </aside>
      </main>

      <Footer />

      {showPreview && (
        <div
          className='fixed inset-0 z-60 grid place-items-center bg-black/75 p-4'
          role='dialog'
          aria-modal='true'
          aria-label='Room preview'
          onClick={() => setShowPreview(false)}
        >
          <div className='relative w-full max-w-4xl bg-white p-3' onClick={(event) => event.stopPropagation()}>
            <button
              type='button'
              onClick={() => setShowPreview(false)}
              aria-label='Close room preview'
              className='absolute right-5 top-5 z-10 rounded-full bg-white p-2 shadow'
            >
              <X size={18} />
            </button>
            <img src={LivingRoomImage} alt='Living room interior preview' className='max-h-[80vh] w-full object-contain' />
            <p className='px-2 py-3 text-sm font-medium'>Living room preview · {property.name}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default PropertyDetails