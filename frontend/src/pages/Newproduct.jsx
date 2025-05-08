  import React from "react";
  import { Link } from "react-router-dom";
  import { useState } from "react";
  import { ToastContainer, toast, Bounce } from "react-toastify";
  const Newproduct = () => {
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

    let handleSubmit = async (e) => {
      try {
        e.preventDefault();
      let responce =  await fetch(`${import.meta.env.VITE_BACKEND_URL}/product`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formdata),
        });
        let result = responce.json();
        {result &&  toast("Success your new service was created ");
          e.target.reset();
        };
        
      } catch (error) {
        console.log(error);
      }
    };

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
        <div className="py-20  flex justify-center">
          <div className="border py-4 border-slate-300 rounded-2xl shadow-2xl shadow-slate-500 w-[90%] min-md:w-1/2 ">
            <h1 className="font-bold text-3xl max-sm:text-xl text-center pt-2 min-md:ps-10">
              Create A New Service
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col w-[80%] gap-2 mx-auto pb-10 pt-5">
                {/* title */}
                <label htmlFor="title" className="font-semibold">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="bg-white rounded-xl h-10"
                  placeholder="Enter your service title"
                  onChange={handleChange}
                />
                {/* image url */}
                <label htmlFor="image" className="font-semibold">Image Url</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="bg-white rounded-xl h-10"
                  placeholder="Enter your service image"
                  onChange={handleChange}
                />

                <div className="flex gap-3 max-sm:flex-col">
                  {/* old price */}
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="oldprice" className="font-semibold">Old Price</label>
                    <input
                      type="number"
                      id="oldprice"
                      name="oldprice"
                      className="bg-white rounded-xl h-10"
                      placeholder="Enter your service old price"
                      onChange={handleChange}
                    />
                  </div>
                  {/* new price */}
                  <div className="flex flex-col w-full gap-1">
                    <label htmlFor="newprice" className="font-semibold">New Price</label>
                    <input
                      type="number"
                      id="title"
                      name="newprice"
                      className="bg-white rounded-xl h-10"
                      placeholder="Enter your service new price"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-between gap-3 max-sm:flex-col">
                  {/* categery  */}
                  <select
                    name="categery"
                    id="categery"
                    className="w-full rounded-xl"
                    onChange={handleChange}
                  >
                    <option value="">Select your Categery</option>
                    <option value="Ac">Ac</option>
                    <option value="Water purifier">Water purifier</option>
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="Washing Machine">Washing Machine</option>
                    <option value="Microwave">Microwave</option>
                    <option value="Chimney">Chimney</option>
                  </select>
                  {/* subcategery */}
                  <select
                    name="subcategery"
                    id=""
                    className="w-full rounded-xl"
                    onChange={handleChange}
                  >
                    <option value="">Select your Subcategery</option>
                    <option value="Servie">Servie</option>
                    <option value="Reapir">Reapir</option>
                    <option value="Installation/uninstallation">
                      Installation/uninstallation
                    </option>
                  </select>
                </div>
                {/* description */}
                <label htmlFor="description" className="font-semibold">Description</label>
                <textarea
                  name="description"
                  id="description"
                  className="bg-white rounded-xl "
                  placeholder="Write a description about your service"
                  rows={4}
                  onChange={handleChange}
                ></textarea>
                {/* submit button */}
                <div className="w-full flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-1/2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  };

  export default Newproduct;
