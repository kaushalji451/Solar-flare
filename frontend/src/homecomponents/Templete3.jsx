import React from 'react'
import { Link } from 'react-router-dom'
const Templete3 = () => {
  return (
    <div>
       <div className=" pt-10 min-lg:mx-20 mx-6">
          <h1 className="font-semibold text-3xl">Most Popular Services</h1>
          <div className="flex gap-5 overflow-auto pt-5 ">
            <Link to={`/product/?categery=Ac`}>
            <div className="   border border-slate-400  bg-slate-100 rounded-xl flex flex-col items-center justify-between h-65 w-67">
              <p className="pt-2 font-semibold text-xl">Ac Repair & Service</p>
              <img src="/acimg.png" alt="" className="w-50 rounded-xl pb-2  " />
            </div>
            </Link>
            <Link to={`/product/?categery=Ro`}>
            <div className="   border border-slate-400 bg-slate-100 rounded-xl  flex flex-col items-center justify-between h-65 w-67">
              <p className="pt-2 font-semibold text-xl">
                Water Purifier Repair
              </p>
              <img src="/roimg.png" alt="" className="w-45 rounded-xl pb-2  " />
            </div>
            </Link>
            <Link to={`/product/?categery=Washing machine`}>
            <div className="   border border-slate-400 bg-slate-100  rounded-xl flex flex-col items-center justify-between h-65 w-67">
              <p className="pt-2 font-semibold text-xl">
                Washing Machine Repair
              </p>
              <img
                src="/washinimg.png"
                alt=""
                className="w-35 rounded-xl pb-2 "
              />
            </div>
            </Link>
            <Link to={`/product/?categery=Refrigerator`}>
            <div className="   border border-slate-400 bg-slate-100  rounded-xl flex flex-col items-center justify-between h-65 w-67">
              <p className="pt-2 font-semibold text-xl">Refrigerator Repair</p>
              <img
                src="/frigeimg.png"
                alt=""
                className="w-47 rounded-xl pb-2 "
              />
            </div>
            </Link>
            <Link to={`/product/?categery=Chimney`}>
            <div className="  border border-slate-400 bg-slate-100  rounded-xl flex flex-col items-center justify-between h-65 w-67">
              <p className="pt-2 font-semibold text-xl">Chimny Repair</p>
              <img
                src="/chimniimg.png"
                alt=""
                className="w-50 rounded-xl pb-2 "
              />
            </div>
            </Link>
            <Link to={`/product/?categery=microwave`}>
            <div className="  border border-slate-400 bg-slate-100  rounded-xl flex flex-col items-center justify-between h-65 w-67">
              <p className="pt-2 font-semibold text-xl">Microwave Repair</p>
              <img
                src="/microwaveimg.png"
                alt=""
                className="w-70 rounded-xl pb-2 "
              />
            </div>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Templete3
