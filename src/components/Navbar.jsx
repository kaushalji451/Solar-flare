import React, { useContext,useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/authContext";
import { logoutUser } from "../firebase/authService";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [arruser, setarruser] = useState(null);
  const [owner ,setowner] = useState("false");

 useEffect(() =>{
 let checkuser = async()=>{
  if (user) {
    let responce = await fetch("http://localhost:8080/user/check", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let result = await responce.json();
    setarruser(result);
  }
  // is owner check
  if(user?.email){
   fetch(`http://localhost:8080/isowner?email=${user.email}`)
   .then((responce)=>{
     return responce.json();
   })
   .then((data)=>{
     if(data == "this is owner"){
       setowner("true");
      }
     else{
       setowner(false);
     }
   })
 }
 }
 checkuser();
 }, [user])

 return (
//  <h1>hello</h1>
    <>
      <nav className="border-b z-50 border-slate-300 h-16 fixed w-full bg-white flex justify-between items-center px-10">
        <div className="flex gap-5">
          <div className="flex gap-2 h-16 items-center ps-10 ">
            <Link to="/">
              <img src="/uc_logo.webp" alt="" className="h-8 w-8 rounded-md" />
            </Link>
            <Link to="/">
              <h2 className="font-bold text-xl w-33">SolarFlare</h2>
            </Link>
          </div>
          <div className="flex gap-4 text-lg items-center text-slate-500">
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
          {owner == "true" && user &&  <Link to="/newproduct">
            <p className="hover:text-black">Create new product</p>
          </Link>}
          </div>
        </div>
        <div className="flex gap-20 pe-10">
          <div>
            {/* search option */}

            <form className="flex items-center max-w-sm mx-auto">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
          <div className="flex gap-4 items-center justify-center">
            {/* shoping cart */}
           {arruser &&  <Link to={`/checkout?id=${arruser[0]._id}`}>
            <lord-icon
              src="https://cdn.lordicon.com/pbrgppbb.json"
              trigger="hover"
            ></lord-icon>
            </Link>}
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
                  {/* dsfdsfdfdgfgggggggggggggg */}
                  {user &&  arruser!=null && arruser[0].name }
                </li>

                <li>
                  <Link
                    to="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
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
