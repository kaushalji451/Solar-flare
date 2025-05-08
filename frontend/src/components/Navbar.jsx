import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/authContext";
import { logoutUser } from "../firebase/authService";
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
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              type="button"
            >
              {/* user logo */}
              <lord-icon
                src="https://cdn.lordicon.com/hrjifpbq.json"
                trigger="hover"
              ></lord-icon>
            </button>

            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdownHover"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownHoverButton"
              >
                <li className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ">
                  {user &&  arruser != null && arruser.length > 0  && arruser[0].name}
                </li>

                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
               <li>
               {owner == "true" && user && (
              <Link to="/newproduct">
                <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Create new product</p>
              </Link>
            )}
               </li>

                {!user && (
                  <div>
                    <li>
                      <Link
                        to="/signin"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Signup
                      </Link>
                    </li>
                  </div>
                )}
                {/* signout */}
                {user && (
                  <li>
                    <button
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={logoutUser}
                    >
                      Sign out
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
