import React from "react";
import { Link } from "react-router-dom";
const Templete1 = () => {
  return (
    <div>
      <div className="flex pb-20 justify-center border-b">
        <div className="min-md:w-1/2  flex justify-center">
          <div className=" min-md:w-[80  flex flex-col items-center">
            <h1 className="font-semibold text-3xl min:md:w-[80%] px-5 py-5">
              Convenient home services right to your doorstep.
            </h1>
            <div className="border rounded-2xl border-slate-400 shadow-2xl shadow-slate-400 w-[90%] pt-2 px-6 flex flex-col gap-3">
              <p className="text-xl font-semibold">Whats you loking for?</p>
              {/* ac and frige */}
              <div className=" flex gap-5 justify-center max-sm:flex-col items-center">
                <Link to={`/product/?categery=Ac`}>
                  <div className=" px-3 py-8  text-center max-w-50 max-h-40  flex flex-col justify-center items-center bg-slate-200 rounded-2xl hover:opacity-90 ">
                    <img src="/acimg.png" alt="" className="w-1/2 " />
                    <p>Ac Repair & Service</p>
                  </div>
                </Link>
                <Link to={`/product/?categery=Refrigerator`}>
                  <div className=" px-3 py-4 text-center max-w-50 max-h-40 flex flex-col justify-center items-center bg-slate-200 rounded-2xl hover:opacity-90">
                    <img src="/frigeimg.png" alt="" className="w-1/2" />
                    <p>Refrigerator Repair </p>
                  </div>
                </Link>
              </div>
              {/* {/* washing machine and ro */}
              <div className=" flex gap-5 justify-center max-sm:flex-col items-center">
                <Link to={`/product/?categery=Washing machine`}>
                  <div className="  px-3 py-4 text-center  max-w-50 flex flex-col justify-center items-center bg-slate-200 rounded-2xl hover:opacity-90 ">
                    <img src="/washinimg.png" alt="" className="w-20 " />
                    <p>Washing Machine Repair</p>
                  </div>
                </Link>
                <Link to={`/product/?categery=Ro`}>
                  <div className=" px-3 py-4 text-center max-w-50 max-h-40 flex flex-col justify-center items-center bg-slate-200 rounded-2xl hover:opacity-90">
                    <img src="/roimg.png" alt="" className="w-1/2" />
                    <p>Water Purifier Repair </p>
                  </div>
                </Link>
              </div>
              {/* microwave and chimni */}
              <div className=" flex gap-5 pb-4 justify-center max-sm:flex-col items-center">
                <Link to={`/product/?categery=microwave`}>
                  <div className=" px-3 text-center max-w-50 max-h-40 py-4 flex flex-col justify-center items-center bg-slate-200 rounded-2xl hover:opacity-90 ">
                    <img src="/microwaveimg.png" alt="" className="w-45 " />
                    <p>Microwave Repair</p>
                  </div>
                </Link>
                <Link to={`/product/?categery=Chimney`}>
                  <div className="  px-3 py-4 text-center max-w-50 max-h-40 flex flex-col justify-center items-center bg-slate-200 rounded-2xl hover:opacity-90">
                    <img src="/chimniimg.png" alt="" className="w-45 h-25" />
                    <p>Chimney Repair </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-[90vh] md:block hidden border rounded-2xl border-slate-400 flex justify-center items-center">
          <img
            src="/uctemp1.png"
            alt=""
            className="h-[85vh] w-130 rounded-xl border  border-slate-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Templete1;
