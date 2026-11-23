import { ArrowLeft, ArrowRight, ArrowUpRight, Bed, Search } from "lucide-react"
import Buttons from "../Components/Buttons"
import LandingImg from '../assets/images/Home Image/Main Image.png'
import Award from '../assets/images/Home Image/gold-award-laurel-wreath-accessories-decoration-chandelier 1.png'
import Signature from '../assets/images/Home Image/Image.png'
import HandHeart from '../assets/images/Home Image/hand-heart-fill.png'
import Triangle2 from '../assets/images/Home Image/Facilities icon.png'
import Home from '../assets/images/Home Image/Preference Icon.png'
import Access from '../assets/images/Home Image/Access icon.png'
import Black from '../assets/images/Home Image/Group.png'
import Golf from '../assets/images/Home Image/Image (1).png'
import Logo1 from '../assets/images/Home Image/Logo.png'
import Logo2 from '../assets/images/Home Image/logo-24.png'
import Logo3 from '../assets/images/Home Image/logo-19.png'
import Logo4 from '../assets/images/Home Image/logo-18.png'
import Logo5 from '../assets/images/Home Image/logo-21.png'
import Logo6 from '../assets/images/Home Image/logo-24.png'
import Bathroom from '../assets/images/Home Image/Rectangle 109.png'
import Dinning from '../assets/images/Home Image/Rectangle 109 (1).png'
import Palour from '../assets/images/Home Image/Rectangle 109 (2).png'
import Rooftop from '../assets/images/Home Image/Rectangle 109 (3).png'
import Workspace from '../assets/images/Home Image/Rectangle 109 (4).png'
import Bedroom from '../assets/images/Home Image/Rectangle 109 (5).png'
import Stairs from '../assets/images/Home Image/Rectangle 109 (6).png'
// import Backyard from '../assets/images/Amenities Image/Image (6).png'
import Interiors from '../assets/images/Home Image/Rectangle 109 (7).png'
import { Link } from "react-router-dom"
import FAQ from "../Components/FAQ"
import Footer from "../Components/Footer"

function Landing() {
  return (
    <div className="bg-gray-200">
      {/* 1ST Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* TIme sect */}
        <div className="space-y-6 sm:space-y-10 text-wrap h-fit bg-white p-6 sm:p-10 shadow">
          <div className="bg-[#FFF8EB] w-fit max-w-full text-[#926100] font-semibold p-1 flex gap-2">
            <img src={Award} alt="" />
            <p>Winner of the IPA 2025</p>
          </div>
          <p className="text-4xl sm:text-6xl lg:text-7xl font-medium max-w-full">Timeless <br /> living modern touch.</p>
          <p className="max-w-full sm:max-w-100">Explore thoughtfully designed residences that combine comfort, style, and a sense of belonging.</p>
        </div>
        {/* Prefer sect */}
        <div className="bg-white h-fit my-4 mx-4 sm:my-8 sm:mx-8 lg:my-10 lg:mx-10 shadow">
          {/* preference tab */}
          <div className="flex text-lg p-5 gap-2 shadow ">
            <img src={Home} alt="" className="
            h-7 " />
            <span className="font-medium text-stone-500">Find your house preference</span>
          </div>
          {/* Dropdown tab */}
          <div className="p-4 sm:p-5 space-y-5">
            {/* cluster */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shadow">
              <div className="">
                <label htmlFor="cluster" >Cluster</label>
                <div className="">
                  <select name="cluster" id="cluster" className="shadow p-3 sm:p-5 w-full ">
                    <option value="">Adrenia park</option>
                    <option value="">Hails park</option>
                    <option value="">Velora</option>
                  </select>
                </div>

              </div>
              {/* Price range */}
              <div>
                <label htmlFor="Price">Price range</label>
                <select name="price" id="price" className="shadow p-3 sm:p-5 w-full">
                  <option className="truncate" value="$85.000-$120">$85.000-$120</option>
                </select>
              </div>
              {/* Bedroom */}
              <div className="">
                <label htmlFor="bedroom">Bedroom</label>
                <div>
                  <select name="bedroom" id="bedroom" className="shadow p-3 sm:p-5 w-full">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Result */}
            <div>
              <label htmlFor="address">Address</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* Address */}

                <div className="sm:col-start-1 sm:col-end-3 flex shadow p-2 w-full gap-2 min-w-0">
                  <Search className="shrink-0" />
                  <input type="text" placeholder="Enter address" className="min-w-0 w-full" />
                </div>

                {/* Show result */}
                <div className="sm:col-start-3 sm:col-end-4">
                  <Buttons btnText="Show the result" btnStyle="bg-[#56593B] text-white text-base sm:text-xl shadow p-2 w-full" linkUrl='/' />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      {/* 2ND Section */}
      <div>
        <div>
          <img src={LandingImg} alt="Modern Serenia homes at sunset" className="w-full" />
        </div>
      </div>
      {/* Discover section */}
      <div className="flex justify-center items-center">
        <div className="w-full max-w-250 px-4 py-8 text-center text-4xl sm:text-6xl lg:text-7xl font-medium">
          <p className="">Discover signature communities</p>
        </div>
      </div>
      {/* Signature */}
      <div className="bg-white p-3 m-4 sm:m-8 lg:m-20 grid grid-cols-1 lg:grid-cols-2">
        {/* Container img */}
        <div className="">
          <img src={Signature} alt="Contemporary homes in the Aruna residence community" className="w-full" />
        </div>
        {/* HandHeart sect */}
        <div className="space-y-8 sm:space-y-12 mt-6 sm:mt-10 mx-3 sm:mx-5">
          {/* Top Layer */}
          <div>
            {/* HH img */}
            <div className="bg-[#FFF8EB] max-w-50 text-[#926100] font-semibold p-1 flex gap-2">
              <img src={HandHeart} alt="" />
              <p>The modern comfort</p>
            </div>
            {/* Aruna text */}
            <p className="text-4xl sm:text-5xl lg:text-6xl font-medium">Aruna residence</p>
            <p className="text-base sm:text-xl">Spacious homes with minimalist design, surrounded by lush parks and playgrounds — the perfect place for families to grow and thrive.</p>
          </div>
          {/* Bottom Layer */}
          <div>
            {/* Facilities */}
            <div className="">
              <div className="flex gap-4 p-1">
                <Bed />
                <p>2-4 Bedroom facilities</p>
              </div>
              <div className="flex gap-4 p-1">
                <img src={Triangle2} alt="" />
                <p>Family friendly facilities</p>
              </div>
              <div className="flex gap-4 p-1">
                <img src={Access} alt="" />
                <p>Easy access to the main boulevard</p>
              </div>
            </div>
            <div className="flex justify-between p-5 shadow">
              {/* Price Text */}
              <div>
                <p>Starts from</p>
                <p className="text-xl font-bold">$85,000</p>
              </div>
              <div>
                {/* <Buttons btnText="Discover" btnStyle="bg-gray-200" linkUrl="/"/> */}
                <button className="bg-gray-200 m-2 p-2 text-sm font-semibold flex rounded">Discover <ArrowUpRight /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-end ">
        <ArrowLeft className="bg-white p-1 rounded " />
        <ArrowRight className="bg-white p-1 rounded " />
      </div>
      {/* Black house Container */}
      <div className="bg-[#000000e9] text-white">
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 p-6 sm:p-10 lg:p-20">
            <p className="text-4xl sm:text-6xl lg:text-7xl">Shaping the timeless of the living spaces</p>
          <div>
            <p className="text-xs">With a vision to redefine urban living, Serenia brings together world-class design, trusted quality, and thoughtful planning. Each development is more than just a home — it is a vibrant community where families grow and memories are made. <br /><br />Guided by innovation and sustainability, Serenia continuously strives to deliver living spaces that harmonize comfort, accessibility, and long-term value.</p>
              <div className="flex flex-wrap gap-3 sm:gap-5 pt-6 sm:pt-10">
              <Buttons btnText="View our vision" btnStyle="bg-white text-[#4b48489d]" linkUrl="/" />
              <Buttons btnText="Explore community" btnStyle="bg-[#4b48486d]" linkUrl="/" />
            </div>
          </div>
        </div>
        <img src={Black} alt="" className="w-full" />
      </div>
      {/* Text below Black img */}
      <p className="p-6 sm:p-10 text-center text-3xl sm:text-5xl font-medium">Facility & Amenities</p>

      {/* Facility img */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* img */}
        <img src={Golf} alt="" className="w-full" />
        <div className=''>
          <div className="grid justify-center items-center border-b-2 border-gray-400">
            <p className="p-5 sm:p-10 justify-baseline inline-flex font-semibold text-gray-500">Sports Facilities <span className="text-xs">01</span></p>
          </div>
          <div className="grid justify-center items-center border-b-2 border-gray-400">
            <p className="p-5 sm:p-10 justify-baseline inline-flex text-lg font-semibold ">The Lifestyle Center <span className="text-sm">02</span></p>
          </div>
          <div className="grid justify-center items-center border-b-2 border-gray-400">
            <p className="p-5 sm:p-10 justify-baseline inline-flex text-xl font-semibold ">Children's playground <span className="text-sm">03</span></p>
          </div>
          <div className="grid justify-center items-center border-b-2 border-gray-400">
            <p className="p-5 sm:p-10 justify-baseline inline-flex text-xl sm:text-3xl font-semibold ">Golf Central Playground <span className="text-lg">04</span></p>
          </div>
          <div className="grid justify-center items-center border-b-2 border-gray-400">
            <p className="p-5 sm:p-10 justify-baseline inline-flex text-xl font-semibold ">Retail & Lifestyle Center <span className="text-sm">05</span></p>
          </div>
          <div className="grid justify-center items-center border-b-2 border-gray-400">
            <p className="p-5 sm:p-10 justify-baseline inline-flex text-lg font-semibold ">Cluster clubhouse <span className="text-sm">06</span></p>
          </div>
          <div className="grid justify-center items-center border-gray-400">
            <p className="p-5 sm:p-10 justify-baseline inline-flex font-semibold text-gray-500">Jogging track <span className="text-xs">07</span></p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 m-4 sm:m-8 lg:m-15 shadow">
        <div className="col-span-2 lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-4 p-5 sm:p-8 lg:ml-10 lg:mb-10 lg:mr-30">
          <div className="lg:mt-40">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-semibold max-w-full lg:max-w-100">Our rewards & global recognition</p>
          </div>
          <div className="mt-10">
            <p>Our achievement are recognized not only locally but also on the international stage. From prestigous industry awards to global certifications, each recognition reflects our commitment to  excellence, innovation and quality that meets world-class standards.</p>
          </div>
          <div className="mt-10 lg:mt-20 space-y-5">
            <p className="text-xl sm:text-2xl font-semibold">More than 20 years, we known as</p>
            <div className="flex gap-2">
              <img src={Award} alt="" />
              <p>The best housing in Asia</p>
            </div>
            <div className="flex gap-2">
              <img src={Award} alt="" />
              <p>Housing with the most optimal resource management</p>
            </div>
            <div className="flex gap-2">
              <img src={Award} alt="" />
              <p> Housing with an eco-friendly concept</p>
            </div>
            <div className="flex gap-2">
              <img src={Award} alt="" />
              <p>Housing with the most demand in 2023</p>
            </div>
          </div>
        </div>
        <div className="shadow flex justify-center items-center p-4"><img src={Logo1} alt="" className="max-w-full" /></div>
        <div className="shadow flex justify-center items-center p-4"><img src={Logo2} alt="" className="max-w-full" /></div>
        <div className="shadow flex justify-center items-center p-4"><img src={Logo3} alt="" className="max-w-full" /></div>
        <div className="shadow flex justify-center items-center p-4"><img src={Logo4} alt="" className="max-w-full" /></div>
        <div className="shadow flex justify-center items-center p-4"><img src={Logo5} alt="" className="max-w-full" /></div>
        <div className="shadow flex justify-center items-center p-4"><img src={Logo6} alt="" className="max-w-full" /></div>
      </div>
      <div className="bg-black">
        <div className="">
          <p className="text-white text-5xl font-semibold text-center p-10">Our gallery</p>
          <p className="text-white text-center text-sm">Temukan berbagai keindahan dari serenia dalam <br />gallery kami, baik itu exterior maupun interior</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 m-4 sm:m-8 lg:m-20 gap-5">
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Bathroom</p>
            <img src={Bathroom} alt="" className="w-full" />
          </div>
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Kitchen & Dining</p>
            <img src={Dinning} alt="" className="w-full" />
          </div>
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Family room</p>
            <img src={Palour} alt="" className="w-full" />
          </div>
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Rooftop</p>
            <img src={Rooftop} alt="" className="w-full" />
          </div>
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Workspace</p>
            <img src={Workspace} alt="" className="w-full" />
          </div>
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Bedroom</p>
            <img src={Bedroom} alt="" className="w-full" />
          </div>
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Stairs</p>
            <img src={Stairs} alt="" className="w-full" />
          </div>
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Backyard</p>
            <img src={Interiors} alt="" className="w-full" />
          </div>
          <div>
            <p className="text-white text-center text-xl font-semibold p-5 bg-[#4b48486d]">Interiors</p>
            <img src={Interiors} alt="" className="w-full" />
          </div>
        </div>
        <div>
          <p className="text-white text-xl font-semibold text-center">And there are many other gallery <br />categories and photos, discover <br /> now</p>
          <div className="mx-4 sm:mx-auto sm:max-w-150 py-8 sm:py-10" >
            <Link to="/gallery" className="text-[#feffff] bg-[#9f9b9b80] text-xl font-semibold text-center flex justify-center items-center p-3 ">
              <p>View all gallery</p>
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
      <FAQ/>
      <Footer/>

    </div>
  )
}

export default Landing