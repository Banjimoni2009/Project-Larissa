import {Link} from 'react-router-dom'
import vector from '../assets/images/Vector.png'
import Dropdown from '../assets/images/arrow-down-s-fill.png'


function Nav() {
  return (
    <nav className='flex justify-between px-15 p-5 bg-white font-semibold text-[#56593B] border border-gray-200 border-b-4'>
      <div className='flex gap-5'>
        <img src={vector} alt="" />
        <p>Serenia</p>
      </div>
      <div className='flex gap-5'>
        <Link to='/' className='flex'>
          <button>Properties</button>
          <img src={Dropdown} alt="" />
        </Link>
        <Link to=''>  
          <button>Amenities</button>
        </Link>
        <Link to='/' className='flex'>
          <button>Gallery</button>
          <img src={Dropdown} alt="" />
        </Link>
        
        <Link to='/'>
          <button>Blogs</button>
        </Link>
      </div>
      <div className='flex gap-5'>
        <Link to='/'>
          <button>Contact Us</button>
        </Link>
        <Link to='/'>
          <button>Request Tour</button>
        </Link>
      </div>
    </nav>
  )
}

export default Nav

// import {Link, useLocation} from 'react-router-dom'
// // import vector from '../assets/vector.png'

// function Nav() {
//   const currentPath = useLocation().pathname;
//   const appPages =[
//     {pageName: 'Properties', pageUrl: '/'},
//     {pageName: 'Amenities', pageUrl: '/amenities'},
//     {pageName: 'Gallery', pageUrl: '/gallery'},
//     {pageName: 'Blogs', pageUrl: '/blogs'},
//     {pageName: 'Contact Us', pageUrl: '/contacts'},
//     {pageName: 'Request Tour', pageUrl: '/tour'},
//   ]
//   return (
//     <nav className='flex gap-5 p-2 m-2 bg-white'>
//       <div>

//       </div>
//       {appPages.map((page)=>(
//         <Link to={page.pageUrl} className={`${currentPath === page.pageUrl && 'underline'}`}>{page.pageName}</Link>
//       ))}

      
//     </nav>
//   )
// }

// export default Nav