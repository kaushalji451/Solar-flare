import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { signInWithGoogle,loginUser } from "../firebase/authService";
const Signup = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      navigate("/user");
    }
  };

  return (
    <>
     <div className="flex min-md:gap-0 gap-14 pt-15">
            <div className="flex justify-center py-10 w-[100%] min-md:w-1/2">
              <div className=" border rounded-2xl border-slate-300 shadow-2xl shadow-slate-500 w-full  min-xl:mx-25 mx-6 max-md:mx-20 max-sm:mx-4">
                <h2 className="text-4xl font-bold text-center pt-8">Signup</h2>
                <p className="text-center pt-4">
                  {" "}
                  Create your new Account
                </p>
                <div className="min-md:pt-8">
                  <form className="max-w-sm mx-auto">
                    <div className="mb-2 px-2">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-5 px-2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="12345678"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="mx-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
                </div>
    
                {/* more option  */}
                <div className="flex flex-col  items-center mx-20 max-lg:mx-4 gap-2">
                  <p>OR</p>
                  <div
                    className=" border border-slate-400 w-full  rounded-full p-1 flex justify-center items-center gap-2 px-4 "
                    onClick={handleGoogleSignIn}
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/eziplgef.json"
                      trigger="hover"
                    ></lord-icon>
                    <p className="font-semibold">Sign up with Google</p>
                  </div>
                  <div className=" border border-slate-400 w-full  rounded-full p-1 flex justify-center items-center gap-2 px-4 ">
                    <lord-icon
                      src="https://cdn.lordicon.com/oemjpisw.json"
                      trigger="hover"
                    ></lord-icon>
                    <p className="font-semibold">Sign up with Facebook</p>
                  </div>
                  <div className=" border border-slate-400 w-full  rounded-full p-1 flex justify-center items-center gap-2 px-4 ">
                    <lord-icon
                      src="https://cdn.lordicon.com/wgtaryar.json"
                      trigger="hover"
                    ></lord-icon>
                    <p className="font-semibold">Sign up with Instagram</p>
                  </div>
                  <p className="text-center mt-4 mb-10">
                     have an Account ?
                    <span className="border-b text-blue-400">
                      <Link to="/signin"> Sign in</Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2  md:block hidden ">
              <img src="./signuppageimg.webp" alt="" className="h-screen" />
            </div>
          </div>
    </>
  );
};

export default Signup;
