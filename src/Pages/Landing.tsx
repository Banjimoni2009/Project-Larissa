import { Bed, Search } from "lucide-react"
import Buttons from "../Components/Buttons"
import LandingImg from '../assets/images/Main Image.png'
import Award from '../assets/images/gold-award-laurel-wreath-accessories-decoration-chandelier 1.png'
import Signature from '../assets/images/Image Container (2).png'
import HandHeart from '../assets/images/hand-heart-fill.png'
import Triangle2 from '../assets/images/Facilities icon.png'
import Home from '../assets/images/Preference Icon.png'
import Access from '../assets/images/Access icon.png'

function Landing() {
  return (
    <div className="bg-gray-200">
      {/* 1ST Section */}
      <div className="grid grid-cols-2">
        {/* TIme sect */}
        <div className="space-y-10 text-wrap h-fit bg-white p-10">
          <div className="bg-amber-50 p-2 text-sm w-fit flex text-amber-900">
            <img src={Award} alt="" />
            <p>Winner of the IPA 2025</p>
          </div>
          <p className="text-7xl font-medium w-120">Timeless <br /> living modern touch.</p>
          <p className="w-100">Explore thoroughly designed resident that combine comfort style and a sense of belonging</p>
        </div>
        {/* Prefer sect */}
        <div className="bg-white h-fit my-10 mx-10 ">
          {/* preference tab */}
          <div className="flex text-lg p-5 gap-2 border-b border-gray-200">
            <img src={Home} alt="" className="
            h-7 " />
            <span className="font-medium text-stone-500">Find your house preference</span>
          </div>
          {/* Dropdown tab */}
          <div className="p-5 space-y-5">
            {/* cluster */}
            <div className="grid grid-cols-3 gap-2">
              <div className="">
                <label htmlFor="cluster" >Cluster</label>
                <div className="">
                  <select name="cluster" id="cluster" className="border-2 p-5 border-gray-200 ">
                    <option value="">Adrenia park</option>
                    <option value="">Hails park</option>
                    <option value="">Velora</option>
                  </select>
                </div>

              </div>
              {/* Price range */}
              <div>
                <label htmlFor="Price">Price range</label>
                <select name="price" id="price" className="border-2 p-5 border-gray-200">
                  <option className="truncate" value="$85.000-$120">$85.000-$120</option>
                </select>
              </div>
              {/* Bedroom */}
              <div className="">
                <label htmlFor="bedroom">Bedroom</label>
                <div>
                  <select name="bedroom" id="bedroom" className="w-full border-2 p-5 border-gray-200">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Result */}
            <div>
              <div className="grid grid-cols-3">
                {/* Address */}
                <div className="col-start-1 col-end-3">
                  <label htmlFor="address">Address</label>
                  <div className="flex p-5 border border-gray-200 gap-2">
                    <Search />
                    <input type="text" placeholder="Enter address" className="w-fit" />
                  </div>
                </div>
                {/* Show result */}
                <div className="col-start-3 col-end-4 mr-5">
                  <Buttons btnText="Show the result" btnStyle="bg-[#56593B] text-white text-xl p-5 w-full" linkUrl='/' />
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
      {/* 2ND Section */}
      <div>
        <div>
          <img src={LandingImg} alt="" className="w-full" />
        </div>
      </div>
      {/* Discover section */}
      <div className="flex justify-center items-center">
        <div className="w-250 text-center text-7xl font-medium">
          <p className="">Discover signature communities</p>
        </div>
      </div>
      {/* Signature */}
      <div className="bg-white p-3 m-30 grid grid-cols-2">
        {/* Container img */}
        <div className="">
          <img src={Signature} alt="" className="w-full" />
        </div>
        {/* HandHeart sect */}
        <div className="m-10">
          {/* HH img */}
          <div className="text-amber-900 font-medium flex w-fit bg-amber-50 p-2">
            <img src={HandHeart} alt="" />
            <p>The modern comfort</p>
          </div>
          <p className="text-6xl font-medium">Aruna residence</p>
          <p className="text-xl">Spacious homes minimalist xesign, surrounde by lush parks and playgrounds - the perfect place for families to grow and thrive</p>
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
              <p>Easy access to main bouleyard</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Landing