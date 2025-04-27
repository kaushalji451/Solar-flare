import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithGoogle } from "../firebase/authService";
import { toast,ToastContainer,Bounce } from "react-toastify";
const Signin = () => {
  const navigate = useNavigate(); // To redirect users after login

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithGoogle();
      if (user) {
        let responce = await fetch("http://localhost:8080/user/check", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        let result = await responce.json();
        if (result === "user does not exist") {
          toast("user not exist please signup");
          setTimeout(() => {
            navigate("/signup");
          }, 3000);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      alert(error.message);
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
      <div className="flex gap-14 pt-15">
        <div className="flex justify-center py-10 w-1/2 ">
          <div className=" border h-[89vh]  rounded-2xl  border-slate-300 shadow-2xl shadow-slate-500 w-full mx-10 lg:mx-25">
            <h2 className="text-4xl font-bold text-center pt-8">Login</h2>
            <p className="text-center pt-4">
              {" "}
              Welcome Back Signin to your Account{" "}
            </p>
            <div className="pt-8">
              <form className="max-w-sm mx-auto">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="12345678"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* more option  */}
            <div className="flex flex-col  items-center mx-14 gap-2">
              <p>OR</p>
              <div
                className=" border border-slate-400 w-full  rounded-full p-1 flex justify-center items-center gap-2 px-4 "
                onClick={handleSignin}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/eziplgef.json"
                  trigger="hover"
                ></lord-icon>
                <p className="font-semibold">Sign in with Google</p>
              </div>
              <div className=" border border-slate-400 w-full  rounded-full p-1 flex justify-center items-center gap-2 px-4 ">
                <lord-icon
                  src="https://cdn.lordicon.com/oemjpisw.json"
                  trigger="hover"
                ></lord-icon>
                <p className="font-semibold">Sign in with Facebook</p>
              </div>
              <div className=" border border-slate-400 w-full  rounded-full p-1 flex justify-center items-center gap-2 px-4 ">
                <lord-icon
                  src="https://cdn.lordicon.com/wgtaryar.json"
                  trigger="hover"
                ></lord-icon>
                <p className="font-semibold">Sign in with Instagram</p>
              </div>
              <p className="text-center mt-4">
                Don,t have an Account ?
                <span className="border-b text-blue-400">
                  <Link to="/signup"> Sign up</Link>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2  ">
          <img src="./signuppageimg.webp" alt="" className="h-screen" />
        </div>
      </div>
    </>
  );
};

export default Signin;
