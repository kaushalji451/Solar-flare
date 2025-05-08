import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/authContext";
import { ToastContainer,Bounce, toast } from "react-toastify";
const Userdata = () => {
  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    house: "",
    street: "",
    city: "",
    state: "",
  });
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user != null) {
      setformdata((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    let responce = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    let result =await responce.json();
    if(result!= "user added"){
      toast("this user is allredy exist please login");
      setTimeout(()=>{
        navigate("/signin");
      },3000);
    }else{
      toast("Signup successfully");
      setTimeout(()=>{
        navigate("/");
      },3000);
    }
  };

  let handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
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
      <div className="flex justify-center items-center h-screen pt-10">
        <div className="border py-4 border-slate-300 rounded-2xl shadow-2xl shadow-slate-500 min-lg:w-1/2 w-2/3 max-sm:w-full ">
          <h1 className="font-bold text-3xl text-center pt-2 ps-10">
            Tell more about you
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[80%] gap-2 mx-auto pb-10 pt-5">
              {/* Name */}
              <label htmlFor="Name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                className="bg-white rounded-xl h-10"
                placeholder="Enter your Name"
                value={formdata.name}
                onChange={handleChange}
                required
              />
              <div className="flex gap-2 max-md:flex-col">
                {/* email  */}
                <div className="flex flex-col w-full ">
                  <label htmlFor="email" className="font-semibold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="bg-white rounded-xl h-10"
                    placeholder="Enter your email"
                    value={formdata.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* password  */}
                <div className="flex flex-col">
                  <label htmlFor="password" className="font-semibold">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="bg-white rounded-xl h-10"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    min={6}
                    required
                  />
                </div>
              </div>
              {/* phoneno  */}
              <label htmlFor="phoneno" className="font-semibold">
                Phone Number
              </label>
              <input
                type="number"
                id="phoneno"
                name="phoneno"
                className="bg-white rounded-xl h-10"
                placeholder="Enter your Phone Number"
                onChange={handleChange}
                required
              />
              {/* house name area name */}
              <div className="flex gap-2 max-md:flex-col">
                {/* house name  */}
                <div className="flex flex-col min-md:w-1/2 gap-2">
                  <label htmlFor="house" className="font-semibold">
                    House Name
                  </label>
                  <input
                    type="text"
                    id="house"
                    name="house"
                    className="bg-white rounded-xl h-10"
                    placeholder="Enter your house name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col min-md:w-1/2 gap-2">
                  {/* area name  */}
                  <label htmlFor="street" className="font-semibold">
                    Street Name
                  </label>
                  <input
                    type="text"
                    id="street"
                    name="street"
                    className="bg-white rounded-xl h-10"
                    placeholder="Enter your street name"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* city state */}
              <div className="flex gap-2 max-md:flex-col">
                {/* city name  */}
                <div className="flex flex-col min-md:w-1/2 gap-2">
                  <label htmlFor="city" className="font-semibold">
                    City Name
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    className="bg-white rounded-xl h-10"
                    placeholder="Enter your city"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col min-md:w-1/2 gap-2">
                  {/* state name  */}
                  <label htmlFor="state" className="font-semibold">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    className="bg-white rounded-xl h-10"
                    placeholder="Enter your state"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* submit button */}
              <div className="w-full flex justify-center py-4">
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

export default Userdata;
