import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/authContext";
import { logoutUser } from "../firebase/authService";
import { useSharedState } from "./context/shrareState";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [arruser, setarruser] = useState(null);
  const [owner, setowner] = useState("false");
  useEffect(() => {
    const checkUser = async () => {
      if (user) {
        try {
          // Check if user exists in DB
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/check`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
          });
          const result = await res.json();
          setarruser(result || []);

          // Check if user is the owner
          const ownerRes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/isowner?email=${user.email}`
          );
          const ownerData = await ownerRes.text();
          setowner(ownerData === "this is owner");
        } catch (error) {
          console.error("Error in Navbar useEffect:", error);
        }
      }
    };

    checkUser();
  }, [user]);

  // const [drop, setdrop] = useState(false);
  const {dropdown,setdropdown} = useSharedState();
  let handleDropDown = ()=>{
    if(dropdown === false){
      setdropdown(true);
    }else{
      setdropdown(false);
    }
  }
  return (
    <>
      <nav className="border-b z-50 border-slate-300 h-16 fixed w-full bg-white flex justify-between items-center min-md:px-20">
        <div className="flex gap-5">
          <div className="flex gap-2 h-16 items-center min-md:ps-10 ps-4 ">
            <Link to="/">
              <img src="/uc_logo.webp" alt="" className="h-8 w-8 rounded-md" />
            </Link>
            <Link to="/">
              <h2 className="font-bold text-xl min-md:w-33">SolarFlare</h2>
            </Link>
          </div>
          <div className="hidden md:block ">
           <div className="flex items-center justify-center gap-4 text-lg text-slate-600 h-full">
           <Link to="/">
              <p className="hover:text-black">Home</p>
            </Link>
            {/* <Link to="/about"> */}
            <p className=" text-slate-200">About</p>
            {/* </Link> */}
            <Link to="product/?categery=Ac">
              <p className="hover:text-black">Services</p>
            </Link>
            <Link to="/contact">
              <p className="hover:text-black">Contact Us</p>
            </Link>
           </div>
          </div>
        </div>
        <div className="flex gap-20 min-md:pe-10 pe-4">
          <div className="flex gap-4 items-center justify-center">
            {/* shoping cart */}
            {arruser === null || arruser.length > 0 && (
              <Link to={`/checkout?id=${arruser[0]._id}`}>
                <lord-icon
                  src="https://cdn.lordicon.com/pbrgppbb.json"
                  trigger="hover"
                ></lord-icon>
              </Link>
            )}
            {/* user  */}



           <div className="flex flex-col ">
             <button onClick={handleDropDown}>
              {/* user logo */}
              <lord-icon
                src="https://cdn.lordicon.com/hrjifpbq.json"
                trigger="hover"
              ></lord-icon>
            </button>

            {/* <!-- Dropdown menu --> */}
            {dropdown === true && <div className="absolute mt-8 max-md:-ms-30 -ms-10   bg-slate-200 rounded-md border border-slate-500 w-40">
              <ul
              >
                <li className="border-b w-full px-4 rounded-md border-slate-600 ">
                  {user &&  arruser != null && arruser.length > 0  && arruser[0].name}
                </li>

                <li className="border-b w-full px-4 rounded-md border-slate-600 ">
                  <Link
                    to="#"
                    className=""
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="border-b w-full px-4 rounded-md border-slate-600 ">
                  <Link
                    to="/orders"
                    className=""
                  >
                    Orders
                  </Link>
                </li>
               <li>
               {owner == "true" && user && (
              <Link to="/newproduct"  className="border-b w-full px-4 rounded-md border-slate-600 ">
                <p className="">Create new product</p>
              </Link>
            )}
               </li>

                {!user && (
                  <div>
                    <li className="border-b w-full px-4 rounded-md border-slate-600 ">
                      <Link
                        to="/signin"
                        className=""
                      >
                        Login
                      </Link>
                    </li>
                    <li  className=" w-full px-4 rounded-md  ">
                      <Link
                        to="/signup"
                        className=""
                      >
                        Signup
                      </Link>
                    </li>
                  </div>
                )}
                {/* signout */}
                {user && (
                  <li  className=" w-full px-4 rounded-md  ">
                    <button
                      className=""
                      onClick={logoutUser}
                    >
                      Sign out
                    </button>
                  </li>
                )}
              </ul>
            </div>}
           </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
