import React from "react";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
const Review = (params) => {
  const [formdata, setformdata] = useState({
    rating: "",
    comment: "",
  });

  let handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  let handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let responce = await fetch(`${import.meta.env.VITE_BACKEND_URL}/product/review/${params.id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      let result = responce.json();
      {
        result && toast("Success, your review was created ");
        e.target.reset();
      }
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
      <div className="mt-6 border bg-slate-100 border-slate-300 rounded-2xl py-4 w-100 ">
        <h1 className="font-semibold text-2xl ps-10">Write a review</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col px-5 gap-2 py-4">
            <label htmlFor="rating" className="font-semibold">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              className="bg-white rounded-xl h-10"
              placeholder="Rate use between 1 to 5"
              min={1}
              max={5}
              onChange={handleChange}
            />
            <label htmlFor="comment" className="font-semibold">
              Comment
            </label>
            <textarea
              name="comment"
              id="comment"
              className="bg-white rounded-xl "
              placeholder="Write a comment about our service"
              rows={4}
              onChange={handleChange}
            ></textarea>
            {/* submit button */}
            <div className="w-full flex justify-center py-2">
              <button
                type="submit"
                class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-1/2"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Review;
