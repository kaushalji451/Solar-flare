import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className=" bg-zinc-100 ">
        <div className="2xl:px-20 pt-10 flex flex-col">
          <div className="flex gap-2 h-16 items-center ps-10 ">
            <img src="/uc_logo.webp" alt="" className="h-8 w-8 rounded-md" />
            <h2 className="font-bold text-xl w-33">SolarFlare</h2>
          </div>
          {/* items */}
          <div className=" flex justify-between  min-sm:px-10 px-5 pt-5  mb-2">
            <div className="">
              <h1 className="font-semibold text-xl px-4">Company</h1>
              <ul className="text-zinc-500 cursor-pointer flex flex-col max-[433px]:ps-10 gap-2 ps-5 pt-2 ">
                <li>About Us</li>
                <li>Private Policy</li>
                <li>Term & Condition</li>
                <li>Our Imapct</li>
                <li>Careers</li>
              </ul>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-xl ">For Customers</h1>
              <ul className="text-zinc-500 pt-2 cursor-pointer">
                <li>Reviews</li>
                <li>Categery near you</li>
                <li>Blog</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div className="">
              <h1 className="font-semibold text-xl">Social Links</h1>
              {/* icons socials */}
              <div className="flex gap-2 pt-4 max-[433px]:flex-col items-center">
                <div className="bg-white rounded-full pt-1 px-1 flex justify-center w-fit items-center  ">
                  <Link to="https://www.instagram.com/abhishekkaushal2879/">
                  <lord-icon
                    src="https://cdn.lordicon.com/wbuzyhjx.json"
                    trigger="hover"
                  ></lord-icon>
                  </Link>
                </div>
                <div className="bg-white rounded-full  pt-1 px-1 flex justify-center w-fit items-center">
                  <Link to="https://www.facebook.com">
                  <lord-icon
                    src="https://cdn.lordicon.com/oemjpisw.json"
                    trigger="hover"
                  ></lord-icon>
                  </Link>
                </div>
                <div className="bg-white rounded-full pt-1 px-1 flex justify-center w-fit items-center ">
                  <Link to="https://www.twitter.com">
                  <lord-icon
                    src="https://cdn.lordicon.com/jrraywny.json"
                    trigger="hover"
                  ></lord-icon>
                  </Link>
                </div>
                <div className="bg-white rounded-full pt-1 px-1 flex justify-center w-fit items-center ">
                  <Link to="https://www.linkedin.com">
                  <lord-icon
                    src="https://cdn.lordicon.com/nwqudhei.json"
                    trigger="hover"
                  ></lord-icon>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* copyright */}
          <div className="border-t max-md:text-center min-md:ps-10 border-zinc-400 ">
            <p className="text-zinc-600">&copy;copyright 2025 SolarFlare. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
