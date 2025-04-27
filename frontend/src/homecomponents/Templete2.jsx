import React from "react";
import { Link } from "react-router-dom";
const Templete2 = () => {
  return (
    <div>
      <div className=" pt-10 min-lg:mx-20 mx-6">
        <h1 className="font-semibold text-3xl">Applinces And Services</h1>
        <div className="flex gap-5 overflow-auto pt-5  ">
          <Link to={`/product/?categery=Ac`}>
            <div className=" border border-slate-400 bg-slate-100  rounded-xl flex flex-col items-center justify-between h-fit max-md:w-67 ">
              <img
                src="/cursoleimg/cursole1.png"
                alt=""
                className="w-100 rounded-xl"
              />
            </div>
          </Link>

          <Link to={`/product/?categery=Ro`}>
            <div className=" border border-slate-400 bg-slate-100  rounded-xl flex flex-col items-center justify-between h-fit max-md:w-67 ">
              <img
                src="/cursoleimg/cursole2.png"
                alt=""
                className="w-100 rounded-xl"
              />
            </div>
          </Link>

          <Link to={`/product/?categery=Washing machine`}>
            <div className=" border border-slate-400 bg-slate-100  rounded-xl flex flex-col items-center justify-between h-fit max-md:w-67 ">
              <img
                src="/cursoleimg/cursole3.png"
                alt=""
                className="w-100 rounded-xl"
              />
            </div>
          </Link>

          <Link to={`/product/?categery=Refrigerator`}>
            <div className=" border border-slate-400 bg-slate-100  rounded-xl flex flex-col items-center justify-between h-fit max-md:w-67 ">
              <img
                src="/cursoleimg/cursole4.png"
                alt=""
                className="w-100 rounded-xl"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Templete2;
