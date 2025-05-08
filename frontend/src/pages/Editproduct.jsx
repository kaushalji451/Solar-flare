import React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
const Editproduct = () => {
  const [formdata, setformdata] = useState({});
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when route changes
  }, []);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/product/${id}`)
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        setformdata(data);
      });
  }, []);

  let handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    let responce = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/edit/${formdata._id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    let result = responce.json();
    {
      result && toast("your data was updated redirect in 3s "); 
      setTimeout(()=>{
        navigate(`/item/?id=${formdata._id}`);
      },3000)
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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
        <div className="border py-4 w-[80%] min-lg:w-1/2 border-slate-300 rounded-2xl shadow-2xl shadow-slate-500  ">
          <h1 className="font-bold text-3xl text-center pt-2 min-md:ps-10">
            Edit your service
          </h1>

          <form onSubmit={handleSubmit} className="flex justify-center">
            <div className="flex flex-col w-[90%]   gap-2  pb-10 pt-5">
              {/* title */}
              <label htmlFor="title" className="font-semibold">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="bg-white rounded-xl h-10"
                placeholder="Enter your service title"
                onChange={handleChange}
                value={formdata.title}
              />
              {/* image url */}
              <label htmlFor="image" className="font-semibold">
                Image Url
              </label>
              <input
                type="text"
                id="image"
                name="image"
                className="bg-white rounded-xl h-10"
                placeholder="Enter your service image"
                onChange={handleChange}
                value={formdata.image}
              />

              <div className="flex gap-3 max-sm:flex-col">
                {/* old price */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="oldprice" className="font-semibold">
                    Oldprice
                  </label>
                  <input
                    type="number"
                    id="oldprice"
                    name="oldprice"
                    className="bg-white rounded-xl h-10"
                    placeholder="Enter your service old price"
                    onChange={handleChange}
                    value={formdata.oldprice}
                  />
                </div>
                {/* new price */}
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="newprice" className="font-semibold">
                    Newprice
                  </label>
                  <input
                    type="number"
                    id="title"
                    name="newprice"
                    className="bg-white rounded-xl h-10"
                    placeholder="Enter your service new price"
                    onChange={handleChange}
                    value={formdata.newprice}
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-between max-sm:flex-col gap-3">
                {/* categery  */}
                <select
                  name="categery"
                  id="categery"
                  className="w-full rounded-xl"
                  onChange={handleChange}
                >
                  <option>{formdata.categery}</option>
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
                  <option value="">{formdata.subcategery}</option>
                  <option value="Servie">Servie</option>
                  <option value="Reapir">Reapir</option>
                  <option value="Installation/uninstallation">
                    Installation/uninstallation
                  </option>
                </select>
              </div>
              {/* description */}
              <label htmlFor="description" className="font-semibold">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="bg-white rounded-xl "
                placeholder="Write a description about your service"
                rows={4}
                onChange={handleChange}
                value={formdata.description}
              ></textarea>
              {/* submit button */}
              <div className="w-full flex justify-center max-sm:pt-6">
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

export default Editproduct;
