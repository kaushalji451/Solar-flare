import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import PaymentButton from "../components/PaymentButton";
const Checkout = () => {
  const [arr, setarr] = useState([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  let totalnewPrice = arr.reduce((sum, item) => sum + item.newprice, 0);
  let totaloldPrice = arr.reduce((sum, item) => sum + item.oldprice, 0);
  let amountWithTax = Number((totalnewPrice / 15).toFixed(0));
  let totalAmount = totalnewPrice + amountWithTax;  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}cart/${id}`)
      .then((responce) => {
        return responce.json();
      })
      .then((data) => {
        setarr(data);
      });
  }, [arr]);

  // cart item delete
  let handleDelete = async (id) => {
    let responce = await fetch(`${import.meta.env.VITE_BACKEND_URL}cart/${id}`, {
      method: "DELETE",
    });
    let result = await responce.json();
    if (result) {
      toast("Serive Removed Successfully");
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
      <div className="py-20 flex justify-center max-lg:flex-col min-xl:gap-10 gap-4 items-center">
        <div className="border  border-slate-300 rounded-2xl bg-slate-100 min-lg:w-1/2 max-lg:w-1/2 mx-10 flex flex-col items-center max-md:w-[90%]  ">
          <div className="mx-4 py-4  border-b border-slate-300 w-full flex flex-col items-center justify-center">
            {arr &&
              arr.map((data) => (
                <div className=" flex justify-around border w-[70%] max-sm:w-[90%] py-2 my-2 items-center border-slate-500 border-dotted rounded-2xl bg-white">
                  <h3 className="w-1/3">{data.title}</h3>
                  <div className="border border-slate-400 flex items-center gap-3 py-1 rounded-xl px-2">
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete(data._id)}
                    >
                      -
                    </button>
                    <p>1</p>
                    <button className="text-slate-500 opacity-50">+</button>
                  </div>
                  <div className="text-sm">
                    <p>&#8377;{data.newprice}</p>
                    <p className="text-zinc-500 line-through">
                      &#8377;{data.oldprice}
                    </p>
                  </div>
                </div>
              ))}
          </div>
          {/* avoid calling before rech */}
          <div className="flex items-center my-2 py-2 px-4 max-sm:px-2 text-center gap-2 border min-md:mx-14 mx-8 rounded-2xl justify-center border-slate-200 bg-white">
            <p>Avoiding calling before reaching the location</p>
          </div>
          {/* offers */}
          <div className="flex items-center cursor-pointer border w-[80%]  max-sm:w-[90%] border-slate-300 rounded-xl px-8 gap-2 py-2 bg-white">
            <lord-icon
              src="https://cdn.lordicon.com/jxynfsur.json"
              trigger="hover"
              colors="primary:#ffffff,secondary:#30e849"
            ></lord-icon>
            <p className="font-semibold ">Coupens for you</p>
          </div>
          <div className="border border-slate-300 w-[80%] max-sm:w-[90%] my-4 rounded-xl px-4 py-4">
            <h1 className="font-semibold text-xl min-md:text-2xl max-sm:py-4 ">Payment Summery</h1>
            <div className="flex justify-between py-1">
              <p>Item total</p>
              <p>
                <span className="text-zinc-400 line-through px-1">
                  &#8377;{totaloldPrice}
                </span>
                &#8377;{totalnewPrice}
              </p>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-400">
              <p>Taxes and Fee</p>
              <p>&#8377;{amountWithTax}</p>
            </div>
            <div className="flex justify-between py-1 font-semibold border-b border-slate-400">
              <p>Total Amount</p>
              <p>&#8377;{totalAmount}</p>
            </div>
            <div className="flex justify-between py-1 font-semibold border-b border-slate-400">
              <p>Amount to pay</p>
              <p>&#8377;{totalAmount}</p>
            </div>

            <div className="py-6">
              <p className="font-semibold">
                Add a tip to thank the professional
              </p>
              <div className="flex gap-2 py-4 max-sm:flex-col">
                <button className="px-6 py-1 border bg-white border-slate-400 rounded-lg cursor-pointer" onClick={()=>handleClick(50)}>
                  &#8377;50
                </button>
                <button className="px-6 py-1 border bg-white border-slate-400 rounded-lg cursor-pointer" onClick={()=>handleClick(75)}>
                  &#8377;75
                </button>
                <button className="px-6 py-1 border bg-white border-slate-400 rounded-lg cursor-pointer" onClick={()=>handleClick(100)}>
                  &#8377;100
                </button>
              </div>
            </div>
            <p>100% of the tip goes to the professional</p>
          </div>
        </div>
        <div className="border border-slate-300 bg-slate-100 rounded-2xl min-lg:mx-10 mx-4  max-md:w-[90%] min-lg:w-1/3 py-10 px-5">
          <p className="pb-4 px-8  text-center">Saving &#8377;{totaloldPrice-totalAmount} on this order</p>
          <div className="h-full flex flex-col  w-full items-center">
            <div className="flex flex-col gap-2">
              <div className="border border-slate-300 bg-white rounded-2xl py-2 px-4 ">
                <p className="font-semibold">Send booking details to </p>
                <p>+91 7408451423</p>
              </div>
              <div className="flex justify-between border max-sm:flex-col max-sm:gap-5 bg-white border-slate-300 rounded-2xl py-4 px-4">
                <div>
                  <h1 className="font-semibold">Address </h1>
                  <p>Home - 546, New Rahemm Nagar, Lucknow</p>
                </div>
                <button className=" px-4 rounded-xl border border-slate-300 h-10  bg-blue-600 text-white  font-semibold">
                  Edit
                </button>
              </div>
              <div className="border border-slate-300 rounded-2xl px-4 py-3">
                <h1 className="font-semibold">Slot</h1>
                <div className="py-2 pb-4">
                  <div className="flex gap-2 max-sm:flex-col ">
                    <button className="px-6 py-1 border bg-white border-zinc-400 rounded-lg cursor-pointer">
                      08:00
                    </button>
                    <button className="px-6 py-1 border bg-white border-zinc-400 rounded-lg cursor-pointer">
                      12:00
                    </button>
                    <button className="px-6 py-1 border bg-white border-zinc-400 rounded-lg cursor-pointer">
                      04:00
                    </button>
                    <button className="px-6 py-1 border bg-white border-zinc-400 rounded-lg cursor-pointer">
                      Any Time
                    </button>
                  </div>
                </div>
                <div className="flex justify-center  min-md:w-1/2">
                  <button className="bg-blue-800 rounded-2xl py-2 px-2 w-full text-white">
                    Select time & date
                  </button>
                </div>
              </div>
            </div>
            {/* total */}
            <div className="flex justify-between items-center py-4 px-2 mt-6 border border-slate-400 rounded-2xl mb-4 w-[90%] max-md:w-2/3 max-sm:w-full bg-white">
              <h1 className="text-xl">Amount to pay</h1>
              <div>
                <p className="font-semibold text-2xl">&#8377;{totalAmount}</p>
                <p className="border-b w-fit border-dotted font-semibold text-sm pt-2">
                  View breakup
                </p>
              </div>
            </div>
            <div className="flex justify-center min:md:w-full w-2/3 pb-4">
                <PaymentButton amount={totalAmount}/>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
