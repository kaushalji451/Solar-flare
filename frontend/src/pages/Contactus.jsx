import React from 'react'
import { useState } from 'react';
import { toast,ToastContainer,Bounce } from 'react-toastify';
const Contactus = () => {
 const [formdata, setformdata] = useState({
    title: "",
    image: "",
    description: "",
    oldprice: "",
    newprice: "",
    categery: "",
    subcategery: "",
  });

  let handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

let handleSubmit = (e)=>{
    e.preventDefault();
    toast("we will contact you soon");
    e.target.reset();
}

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="py-20  flex justify-center  ">
        <div className="border py-4 border-slate-300 rounded-2xl shadow-2xl h-fit shadow-slate-500  w-[90%] min-md:w-1/2">
          <h1 className="font-bold text-3xl text-center pt-2 ps-10">
           Contact Us
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[80%] gap-2 mx-auto pb-10 pt-5">
              {/* name */}
              <label htmlFor="name" className="font-semibold">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-white rounded-xl h-10"
                placeholder="Enter your name"
                onChange={handleChange}
                required
                
              />

              {/* phone no */}
              <label htmlFor="name" className="font-semibold">Phone Number</label>
              <input
                type="number"
                id="phoneno"
                name="phoneno"
                className="bg-white rounded-xl h-10"
                placeholder="Enter your Phone Number"
                onChange={handleChange}
                required
              />

              {/* description */}
              <label htmlFor="description" className="font-semibold">Description</label>
              <textarea
                name="description"
                id="description"
                className="bg-white rounded-xl "
                placeholder="Write a resion to contact us"
                rows={4}
                onChange={handleChange}
                required
              ></textarea>
              {/* submit button */}
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-1/2 max-sm:mt-10"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Contactus
