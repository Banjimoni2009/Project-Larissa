import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Bed,
  ChevronDown,
  MapPin,
  Menu,
  TreePine,
  X,
  homeVector as vector,
  homeImageContainer3 as lioraImage,
  homeImageContainer4 as navaImage,
  homeImageContainer2 as arunaImage,
  homeImageContainer1 as veloraImage,
  homeMain as serayaImage,
} from '../imports'

const properties = [
  {
    name: 'Liora estate',
    image: lioraImage,
    description: 'Modern homes with bright, open spaces and peaceful green surroundings.',
    bedrooms: '2-4 Bedroom options',
  },
  {
    name: 'Nava heights',
    image: navaImage,
    description: 'Thoughtfully planned homes with room for your family to grow.',
    bedrooms: '2-4 Bedroom options',
  },
  {
    name: 'Aruna residence',
    image: arunaImage,
    description: 'Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive.',
    bedrooms: '2-4 Bedroom options',
  },
  {
    name: 'Velora park',
    image: veloraImage,
    description: 'Contemporary homes close to community parks and everyday essentials.',
    bedrooms: '3-4 Bedroom options',
  },
  {
    name: 'Seraya grove',
    image: serayaImage,
    description: 'A welcoming neighborhood with comfortable homes and landscaped streets.',
    bedrooms: '2-4 Bedroom options',
  },
]

function Nav() {
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false)
  const [selectedPropertyIndex, setSelectedPropertyIndex] = useState(2)

  const selectedProperty = properties[selectedPropertyIndex]

  function closeMenus() {
    setIsMenuOpen(false)
    setIsPropertiesOpen(false)
  }

  return (
    <nav className='relative z-50 bg-white px-4 py-4 text-[#56593B] shadow md:px-15'>
      <div className='flex items-center justify-between font-semibold'>
        <Link to='/' onClick={closeMenus} className='flex items-center gap-3'>
          <img src={vector} alt="" />
          <p>Serenia</p>
        </Link>

        {/* Button for opening the links on small screens */}
        <button
          type='button'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          className='rounded p-2 md:hidden'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Main links shown on desktop */}
        <div className='hidden items-center gap-5 md:flex'>
          <div
            className='flex items-center gap-1'
            onMouseEnter={() => setIsPropertiesOpen(true)}
          >
            <NavLink
              to='/properties'
              onClick={closeMenus}
              className={({ isActive }) =>
                `py-1 ${isActive ? 'underline underline-offset-8 decoration-1' : ''}`
              }
            >
              Properties
            </NavLink>
            <button
              type='button'
              onClick={() => setIsPropertiesOpen(true)}
              aria-label='Open properties menu'
              aria-expanded={isPropertiesOpen}
              className='rounded p-1 hover:bg-gray-100'
            >
              <ChevronDown size={14} />
            </button>
          </div>
          <NavLink
            to='/amenities'
            onClick={closeMenus}
            className={({ isActive }) =>
              isActive ? 'underline underline-offset-8 decoration-1' : ''
            }
          >
            Amenities
          </NavLink>
          <NavLink
            to='/gallery'
            onClick={closeMenus}
            className={({ isActive }) =>
              `flex items-center gap-1 py-1 ${isActive ? 'underline underline-offset-8 decoration-1' : ''}`
            }
          >
            Gallery
            <ChevronDown size={14} />
          </NavLink>
          <NavLink
            to='/blogs'
            onClick={closeMenus}
            className={({ isActive }) =>
              isActive ? 'underline underline-offset-8 decoration-1' : ''
            }
          >
            Blogs
          </NavLink>
        </div>

        <div className='hidden items-center gap-5 md:flex'>
          <NavLink
            to='/contacts'
            onClick={closeMenus}
            className={({ isActive }) =>
              isActive ? 'underline underline-offset-8 decoration-1' : ''
            }
          >
            Contact us
          </NavLink>
          <NavLink
            to='/tour'
            state={{ backgroundLocation: location }}
            onClick={closeMenus}
            className={({ isActive }) =>
              `bg-gray-200 px-3 py-2 ${isActive ? 'underline underline-offset-4 decoration-1' : ''}`
            }
          >
            Request tour
          </NavLink>
          <NavLink
            to='/login'
            onClick={closeMenus}
            className={({ isActive }) =>
              `py-1 ${isActive ? 'underline underline-offset-8 decoration-1' : ''}`
            }
          >
            Login
          </NavLink>
        </div>
      </div>

      {/* Dark, blurred background behind the properties menu */}
      {isPropertiesOpen && (
        <button
          type='button'
          aria-label='Close properties menu'
          onClick={() => setIsPropertiesOpen(false)}
          className='fixed inset-x-0 bottom-0 top-14 z-40 hidden bg-black/35 backdrop-blur-md md:block'
        />
      )}

      {/* Properties menu floats over the page instead of moving it down */}
      {isPropertiesOpen && selectedProperty && (
        <div
          className='absolute left-1/2 top-full z-50 hidden w-[min(820px,calc(100vw-32px))] -translate-x-1/2 bg-white shadow-xl md:grid md:grid-cols-[1fr_1fr_1fr]'
        >
          <div className='flex flex-col'>
            {properties.map((property, index) => (
              <button
                key={property.name}
                type='button'
                onMouseEnter={() => setSelectedPropertyIndex(index)}
                onFocus={() => setSelectedPropertyIndex(index)}
                onClick={() => setSelectedPropertyIndex(index)}
                className={`flex flex-1 items-center justify-center gap-1 border-b border-gray-200 px-3 py-4 text-center text-sm last:border-b-0 ${
                  selectedPropertyIndex === index
                    ? 'font-semibold text-[#171717]'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                {property.name}
                <sup className='text-[10px] text-gray-400'>0{index + 1}</sup>
              </button>
            ))}
          </div>

          <img
            src={selectedProperty.image}
            alt={`${selectedProperty.name} homes`}
            className='h-full min-h-65 w-full object-cover'
          />

          <div className='flex flex-col justify-between gap-6 p-6'>
            <div>
              <h2 className='text-xl font-medium text-[#171717]'>{selectedProperty.name}</h2>
              <p className='mt-2 text-sm leading-5 text-gray-600'>{selectedProperty.description}</p>
            </div>
            <div className='space-y-3 text-xs text-gray-700'>
              <p className='flex items-center gap-2'>
                <Bed size={15} />
                {selectedProperty.bedrooms}
              </p>
              <p className='flex items-center gap-2'>
                <TreePine size={15} />
                Family-friendly facilities
              </p>
              <p className='flex items-center gap-2'>
                <MapPin size={15} />
                Easy access to main boulevard
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile links open in a dropdown under the navigation bar */}
      {isMenuOpen && (
        <div className='absolute left-0 right-0 top-full z-50 flex flex-col gap-1 border-t border-gray-200 bg-white px-4 py-3 shadow-lg md:hidden'>
          <NavLink
            to='/properties'
            onClick={closeMenus}
            className={({ isActive }) =>
              `flex items-center justify-between rounded px-3 py-3 hover:bg-gray-100 ${
                isActive ? 'underline underline-offset-4 decoration-1' : ''
              }`
            }
          >
            Properties
            <ChevronDown size={16} />
          </NavLink>
          <NavLink
            to='/amenities'
            onClick={closeMenus}
            className={({ isActive }) =>
              `rounded px-3 py-3 hover:bg-gray-100 ${isActive ? 'underline underline-offset-4 decoration-1' : ''}`
            }
          >
            Amenities
          </NavLink>
          <NavLink
            to='/gallery'
            onClick={closeMenus}
            className={({ isActive }) =>
              `flex items-center justify-between rounded px-3 py-3 hover:bg-gray-100 ${
                isActive ? 'underline underline-offset-4 decoration-1' : ''
              }`
            }
          >
            Gallery
            <ChevronDown size={16} />
          </NavLink>
          <NavLink
            to='/blogs'
            onClick={closeMenus}
            className={({ isActive }) =>
              `rounded px-3 py-3 hover:bg-gray-100 ${isActive ? 'underline underline-offset-4 decoration-1' : ''}`
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to='/contacts'
            onClick={closeMenus}
            className={({ isActive }) =>
              `rounded px-3 py-3 hover:bg-gray-100 ${isActive ? 'underline underline-offset-4 decoration-1' : ''}`
            }
          >
            Contact us
          </NavLink>
          <NavLink
            to='/tour'
            state={{ backgroundLocation: location }}
            onClick={closeMenus}
            className={({ isActive }) =>
              `mt-2 rounded bg-gray-200 px-3 py-3 text-center ${
                isActive ? 'underline underline-offset-4 decoration-1' : ''
              }`
            }
          >
            Request tour
          </NavLink>
          <NavLink
            to='/login'
            onClick={closeMenus}
            className={({ isActive }) =>
              `rounded px-3 py-3 hover:bg-gray-100 ${isActive ? 'underline underline-offset-4 decoration-1' : ''}`
            }
          >
            Login
          </NavLink>
        </div>
      )}
    </nav>
  )
}

export default Nav

